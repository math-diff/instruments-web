/* eslint-disable @typescript-eslint/no-require-imports */
// Offline unit checks: transpile local TypeScript into an isolated CommonJS VM.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const cache = new Map();
function loadTs(filename) {
  if (cache.has(filename)) return cache.get(filename);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  }).outputText;
  const mod = { exports: {} };
  cache.set(filename, mod.exports);
  const localRequire = (specifier) => {
    assert.ok(specifier.startsWith("."), `Unexpected external dependency: ${specifier}`);
    return loadTs(path.resolve(path.dirname(filename), `${specifier}.ts`));
  };
  vm.runInNewContext(output, { module: mod, exports: mod.exports, require: localRequire, URL }, { filename });
  return mod.exports;
}

const { analyticsPath, analyticsProduct, analyticsReferrer, validMeasurementId } = loadTs(path.resolve(__dirname, "../src/lib/analytics.ts"));
const products = ["pressure-gauge", "stainless-pressure-gauge"];
let checks = 0;
function equals(actual, expected) { assert.equal(actual, expected); checks += 1; }

for (const allowed of ["/en", "/zh/contact", "/en/pressure-gauges", "/en/products/pressure-gauge", "/en/blog/selecting-pressure-gauge", "/en/docs/faq"]) {
  equals(analyticsPath(allowed, products), allowed);
}
equals(analyticsPath("/en/", products), "/en");
for (const rejected of [
  "/en/contact?email=buyer@example.com", "/en/contact#buyer@example.com",
  "/en/contact%3Femail=buyer", "/en/products/%70ressure-gauge",
  "/en/contact/buyer@example.com", "/en/products/buyer@example.com",
  "/en/products/unknown-product", "/en/blog/private-draft", "/en/docs/private-file",
  "/en/unknown", "/zz/contact", "/zh/pressure-gauges", "https://example.com/en/contact",
  "//example.com/en", "/en/../contact", "/en\\contact", "/en//contact", "/", "",
]) equals(analyticsPath(rejected, products), null);

equals(analyticsProduct("pressure-gauge", products), "pressure-gauge");
for (const rejected of [null, undefined, "", "buyer@example.com", "unknown", "pressure-gauge?email=x", "PRESSURE-GAUGE"]) {
  equals(analyticsProduct(rejected, products), undefined);
}
equals(validMeasurementId("G-ABC123XYZ"), "G-ABC123XYZ");
for (const rejected of [undefined, "", "G-", "G-abc", " G-ABC", "G-ABC ", "G-ABC?x=1", "G-ABC\n", "UA-123", "G-ABC/evil"]) {
  equals(validMeasurementId(rejected), null);
}
for (const host of ["google.com", "google.ae", "google.com.sa", "google.com.my", "google.com.sg", "google.co.th", "google.co.id", "bing.com"]) {
  equals(analyticsReferrer(`https://${host}/search?q=buyer%40example.com#secret`), `https://${host}`);
  equals(analyticsReferrer(`https://www.${host}/search?q=secret`), `https://www.${host}`);
}
equals(analyticsReferrer("http://www.google.com/search?q=private"), "https://www.google.com");
for (const referrer of [
  "https://google.com.evil.test/search?q=private", "https://evilgoogle.com", "https://evil.google.com",
  "https://buyer:secret@google.com", "https://google.com@evil.test", "https://127.0.0.1",
  "https://[::1]", "https://www.bing.com.evil.test", "https://www.google.com:8443",
  "ftp://google.com/search", "javascript:alert(1)", "//google.com/search", "", "not a URL",
]) equals(analyticsReferrer(referrer), "");
console.log(`Analytics sanitizer tests passed: ${checks} assertions; no network or Google tag used.`);
