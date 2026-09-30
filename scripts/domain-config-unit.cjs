/* eslint-disable @typescript-eslint/no-require-imports */
// Offline configuration checks. No DNS changes, network requests or env-file writes.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function loader(env = {}) {
  const cache = new Map();
  function loadTs(filename) {
    if (cache.has(filename)) return cache.get(filename);
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
      fileName: filename,
    }).outputText;
    const mod = { exports: {} };
    cache.set(filename, mod.exports);
    const localRequire = (specifier) => {
      if (specifier === "@next/mdx") return () => (config) => config;
      assert.ok(specifier.startsWith("."), `Unexpected external dependency: ${specifier}`);
      return loadTs(path.resolve(path.dirname(filename), `${specifier}.ts`));
    };
    vm.runInNewContext(output, { module: mod, exports: mod.exports, require: localRequire, URL, process: { env: { ...env } } }, { filename });
    return mod.exports;
  }
  return loadTs;
}

let checks = 0;
function equal(actual, expected) { assert.equal(actual, expected); checks++; }
function arrayEqual(actual, expected) { assert.deepEqual(Array.from(actual), expected); checks++; }
function ok(condition, message) { assert.ok(condition, message); checks++; }
const configPath = path.resolve(__dirname, "../src/lib/site-config.ts");
const defaults = loader()(configPath);
equal(defaults.siteOrigin(), "https://jf-international.vercel.app");
equal(defaults.siteOrigin("https://instruments.example"), "https://instruments.example");
equal(defaults.siteOrigin("https://instruments.example/"), "https://instruments.example");
for (const bad of [
  "http://instruments.example", "ftp://instruments.example", "https://user:secret@instruments.example",
  "https://user@instruments.example", "https://instruments.example/path", "https://instruments.example/?query=value",
  "https://instruments.example/#fragment", "not-a-url", "//instruments.example",
]) { assert.throws(() => defaults.siteOrigin(bad), undefined, `Accepted invalid origin: ${bad}`); checks++; }
arrayEqual(defaults.migrationHosts(), []);
arrayEqual(defaults.migrationHosts("bad..example,a.-b.example,-bad.example,example-.com"), []);
arrayEqual(defaults.migrationHosts("jf-international.vercel.app,JF-INTERNATIONAL.VERCEL.APP"), []);

const env = {
  NEXT_PUBLIC_SITE_URL: "https://instruments.example",
  SITE_REDIRECT_HOSTS: "www.instruments.example",
};
const loadNew = loader(env);
const migrated = loadNew(configPath);
arrayEqual(migrated.migrationHosts(), ["jf-international.vercel.app", "www.instruments.example"]);
arrayEqual(migrated.migrationHosts("instruments.example,WWW.INSTRUMENTS.EXAMPLE,www.instruments.example,, jf-international.vercel.app "), ["jf-international.vercel.app", "www.instruments.example"]);
arrayEqual(migrated.migrationHosts("https://evil.example,evil.example/path,user@evil.example,evil.example?x=1,evil.example:443,-evil.example,evil_example,evil.example-"), ["jf-international.vercel.app"]);

async function main() {
  const nextConfig = loadNew(path.resolve(__dirname, "../next.config.ts")).default;
  const redirects = await nextConfig.redirects();
  equal(redirects.length, 2);
  for (const redirect of redirects) {
    equal(redirect.source, "/:path*");
    equal(redirect.destination, "https://instruments.example/:path*");
    equal(redirect.permanent, true); // Next.js permanent redirects use HTTP 308.
    equal(redirect.has.length, 1);
    equal(redirect.has[0].type, "host");
    ok(redirect.has[0].value.includes("\\."), "Host literal dots must be escaped");
    const hostPattern = new RegExp(`^(?:${redirect.has[0].value})$`);
    ok(!hostPattern.test("instruments.example"), "Canonical host must not redirect to itself");
    ok(!hostPattern.test(redirect.has[0].value.replace(/\\\./g, "X")), "Host regex must not treat literal dots as wildcards");
  }
  arrayEqual(redirects.map((redirect) => redirect.has[0].value).sort(), ["jf-international\\.vercel\\.app", "www\\.instruments\\.example"].sort());
  const original = loader()(path.resolve(__dirname, "../next.config.ts")).default;
  equal((await original.redirects()).length, 0);
  console.log(`Domain configuration tests passed: ${checks} assertions; no DNS or network changes.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
