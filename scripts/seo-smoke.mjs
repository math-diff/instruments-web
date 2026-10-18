import assert from "node:assert/strict";

// Run against an already running server. No filesystem writes or form submissions.
// SEO_TEST_URL=http://127.0.0.1:3000 SEO_EXPECTED_SITE_URL=https://example.com node scripts/seo-smoke.mjs
const base = new URL(process.env.SEO_TEST_URL || "http://127.0.0.1:3000");
const canonicalOrigin = new URL(process.env.SEO_EXPECTED_SITE_URL || "https://jf-international.vercel.app").origin;
const expected = (path) => `${canonicalOrigin}${path}`;
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])]));
const markup = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const tags = (html, tag) => [...markup(html).matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map((match) => attrs(match[0]));
const canonical = (html) => tags(html, "link").filter((tag) => tag.rel === "canonical").map((tag) => tag.href);
const jsonLd = (html) => [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter((match) => attrs(match[1]).type === "application/ld+json")
  .flatMap((match) => {
    const parsed = JSON.parse(match[2]);
    return Array.isArray(parsed) ? parsed : parsed["@graph"] || [parsed];
  });
const input = (html, name) => tags(html, "input").find((tag) => tag.name === name);
const noindex = (html) => tags(html, "meta").some((tag) => tag.name === "robots" && /\bnoindex\b/.test(tag.content || ""));
const cases = [];
function test(name, run) { cases.push({ name, run }); }
async function page(path, status = 200) {
  const response = await fetch(new URL(path, base), {
    redirect: "manual",
    headers: { "Accept-Language": "zh-CN,zh;q=0.9", "User-Agent": "SEO-Smoke-Check/1.0" },
    signal: AbortSignal.timeout(60000),
  });
  const html = await response.text();
  assert.equal(response.status, status, `${path}: HTTP ${response.status}, expected ${status}`);
  return { response, html };
}
function checkEnglishLinks(html) {
  const links = tags(html, "a").map((tag) => tag.href).filter(Boolean);
  assert.ok(links.some((href) => href === "/en/pressure-gauges"), "Pressure topic must have an ordinary internal anchor");
  for (const href of links) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = new URL(href, base).pathname;
    if (/\.[a-z0-9]+$/i.test(path) || /^\/(?:api|_next|downloads|products\/[^/]+\.(?:jpg|png))\//.test(path)) continue;
    assert.match(path, /^\/(?:en|zh|fr|de|it|ru|ar|hi|sk|ms|sv|tr)(?:\/|$)/, `Unprefixed internal page link: ${href}`);
  }
}

test("English topic: canonical, language alternatives, server content", async () => {
  const { html } = await page("/en/pressure-gauges");
  assert.deepEqual(canonical(html), [expected("/en/pressure-gauges")]);
  const alternatives = tags(html, "link").filter((tag) => tag.hreflang);
  assert.ok(alternatives.some((tag) => tag.hreflang === "en"));
  for (const tag of alternatives) {
    assert.ok(["en", "x-default"].includes(tag.hreflang), `Unexpected topic hreflang: ${tag.hreflang}`);
    assert.equal(tag.href, expected("/en/pressure-gauges"));
  }
  assert.ok(!noindex(html));
  assert.match(markup(html), /JF-1541/);
});

test("Untranslated topics return 404", async () => {
  for (const path of ["/zh/pressure-gauges", "/fr/temperature-instruments", "/zh/level-instruments"]) await page(path, 404);
});

test("Pure English pressure category permanently redirects", async () => {
  const { response } = await page("/en/products?cat=pressure", 308);
  const target = new URL(response.headers.get("location"), base);
  assert.equal(target.pathname, "/en/pressure-gauges");
  assert.equal(target.searchParams.has("cat"), false);
});

test("Temperature and level topics have independent metadata and catalogue links", async () => {
  for (const [path, keyword, model] of [["/en/temperature-instruments", "Temperature", "JF-1550"], ["/en/level-instruments", "Level", "JF-1551"]]) {
    const { html } = await page(path);
    assert.deepEqual(canonical(html), [expected(path)]);
    assert.ok(!noindex(html));
    assert.ok(html.match(/<title>([^<]+)<\/title>/)?.[1].includes(keyword));
    assert.ok(markup(html).includes(model));
    const alternatives = tags(html, "link").filter((tag) => tag.hreflang);
    assert.deepEqual(alternatives.map((tag) => tag.hreflang).sort(), ["en", "x-default"]);
    assert.ok(tags(html, "meta").some((tag) => tag.property === "og:url" && tag.content === expected(path)));
    assert.ok(tags(html, "a").some((tag) => tag.href?.startsWith("/en/docs/")));
  }
});

test("New category redirects preserve unrelated query parameters", async () => {
  for (const [cat, path] of [["temperature", "/en/temperature-instruments"], ["level", "/en/level-instruments"]]) {
    const { response } = await page(`/en/products?cat=${cat}&utm_source=seo-check`, 308);
    const target = new URL(response.headers.get("location"), base);
    assert.equal(target.pathname, path);
    assert.equal(target.searchParams.get("utm_source"), "seo-check");
    assert.equal(target.searchParams.has("cat"), false);
    const { html } = await page(`/en/products?cat=${cat}&q=`);
    assert.ok(noindex(html));
    assert.deepEqual(canonical(html), [expected("/en/products")]);
  }
});

test("Search requests, including empty search, stay searchable and noindex", async () => {
  for (const path of ["/en/products?cat=pressure&q=JF-1541", "/en/products?cat=pressure&q=", "/en/products?q=pressure"]) {
    const { html } = await page(path);
    assert.ok(noindex(html), `${path}: missing noindex`);
    assert.deepEqual(canonical(html), [expected("/en/products")]);
  }
});

test("English homepage and topic use explicit locale paths", async () => {
  for (const path of ["/en", "/en/pressure-gauges"]) checkEnglishLinks((await page(path)).html);
});

test("Homepage has one primary heading and category topic entry links", async () => {
  const { html } = await page("/en");
  assert.equal((markup(html).match(/<h1\b/gi) || []).length, 1);
  assert.match(markup(html), /Pressure, temperature and level instruments/);
  assert.match(html.match(/<title>([^<]+)<\/title>/)?.[1] || "", /Industrial Pressure Gauges/);
  for (const path of ["/en/pressure-gauges", "/en/temperature-instruments", "/en/level-instruments"]) {
    assert.ok(tags(html, "a").some((tag) => tag.href === path));
  }
});

const gauges = [
  ["pressure-gauge", "JF-1541"],
  ["stainless-pressure-gauge", "JF-1545"],
  ["capsule-pressure-gauge", "JF-1543"],
  ["ammonia-pressure-gauge", "JF-1542"],
];
test("Four pressure products: metadata, breadcrumbs and model enquiry", async () => {
  for (const [slug, model] of gauges) {
    const path = `/en/products/${slug}`;
    const { html } = await page(path);
    assert.deepEqual(canonical(html), [expected(path)]);
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
    assert.ok(title?.includes(model), `${slug}: model missing in title`);
    assert.ok(tags(html, "meta").some((tag) => tag.name === "description" && tag.content?.length > 20));
    const crumbs = jsonLd(html).find((item) => item["@type"] === "BreadcrumbList");
    assert.ok(crumbs?.itemListElement?.some((item) => item.item === expected(path)), `${slug}: breadcrumb missing canonical item`);
    assert.ok(tags(html, "a").some((tag) => {
      if (!tag.href) return false;
      const url = new URL(tag.href, base);
      return url.pathname === "/en/contact" && url.searchParams.get("product") === slug;
    }), `${slug}: enquiry link lacks product slug`);
  }
});

test("Pressure sample specifications agree across all twelve languages", async () => {
  const sampleValues = [
    ["pressure-gauge", "0–1.6 MPa", "1.6"],
    ["stainless-pressure-gauge", "0–2.5 MPa", "1.6"],
    ["capsule-pressure-gauge", "0–10000 Pa", "2.5"],
    ["ammonia-pressure-gauge", "0–4 MPa / 0–580 psi", "1.6"],
  ];
  for (const locale of ["en", "zh", "fr", "de", "it", "ru", "ar", "hi", "sk", "ms", "sv", "tr"]) {
    for (const [slug, range, accuracy] of sampleValues) {
      const { html } = await page(`/${locale}/products/${slug}`);
      const table = markup(html).match(/<table\b[^>]*>([\s\S]*?)<\/table>/i)?.[1];
      assert.ok(table, `${locale}/${slug}: missing sample table`);
      const values = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) => {
        const cells = [...match[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)];
        return decode(cells[1]?.[1]?.replace(/<[^>]*>/g, "").trim() || "");
      });
      assert.equal(values[0], range, `${locale}/${slug}: range drift`);
      assert.equal(values[1], accuracy, `${locale}/${slug}: accuracy drift`);
      if (slug === "capsule-pressure-gauge") assert.doesNotMatch(table, /M20|316L|60 kPa/);
    }
  }
});

test("Pressure comparison and configuration details are visible server content", async () => {
  const { html } = await page("/en/pressure-gauges");
  for (const model of ["JF-1541", "JF-1545", "JF-1543", "JF-1542"]) assert.ok(markup(html).includes(model));
  assert.match(markup(html), /Photographed catalogue samples/);
  assert.match(markup(html), /dimensioned drawing/);
  const { html: product } = await page("/en/products/stainless-pressure-gauge");
  assert.doesNotMatch(markup(product), /All-stainless/);
  const productText = decode(markup(product).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ");
  assert.ok(productText.includes("Request a JF-1545 drawing and specification"), "Missing model-specific documentation enquiry link");
});

test("Valid enquiry preselection derives hidden metadata from catalogue", async () => {
  for (const [slug, model] of gauges) {
    const { html } = await page(`/en/contact?product=${slug}`);
    assert.equal(input(html, "product_slug")?.value, slug);
    assert.equal(input(html, "product_model")?.value, model);
    const source = input(html, "source_page")?.value;
    assert.ok(source, "Missing source_page");
    assert.equal(new URL(source, canonicalOrigin).href, expected(`/en/products/${slug}`));
    const selected = [...markup(html).matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/gi)].find((match) => /\bselected(?:\s|=|$)/.test(match[1]));
    assert.ok(selected && /pressure/i.test(decode(selected[2])), `${slug}: pressure category is not preselected`);
    assert.ok(markup(html).includes(model), `${slug}: selected model is not visible to the visitor`);
  }
});

test("Invalid product does not populate trusted form metadata", async () => {
  const marker = "seo-smoke-invalid-product";
  const { html } = await page(`/en/contact?product=${marker}&source_page=https%3A%2F%2Fevil.invalid&product_model=FAKE`);
  for (const field of ["product_slug", "product_model", "source_page"]) {
    assert.ok(!input(html, field)?.value, `Invalid request populated ${field}`);
  }
  assert.ok(!markup(html).includes(marker), "Invalid product echoed into document markup");
  assert.ok(!tags(html, "input").some((tag) => /evil\.invalid|FAKE/.test(tag.value || "")));
});

test("Topic inquiry accepts only the known source identifier", async () => {
  const { html } = await page("/en/contact?product=pressure-gauge&source=pressure-gauges");
  assert.equal(input(html, "source_page")?.value, expected("/en/pressure-gauges"));
  const other = await page("/en/contact?product=pressure-gauge&source=https://evil.invalid");
  assert.equal(input(other.html, "source_page")?.value, expected("/en/products/pressure-gauge"));
});

test("Direct success URL does not claim a delivered enquiry", async () => {
  const { html } = await page("/en/contact?success=1");
  const content = markup(html);
  assert.doesNotMatch(content, /Thank you\s*(?:—|&mdash;|-)\s*we(?:'|&#x27;|&#39;)ll be in touch within one business day/i);
  assert.doesNotMatch(content, /(?:message|enquiry|inquiry) (?:has been |was )?(?:successfully )?(?:sent|delivered)\s*[.!<]/i);
});

test("Sitemap lists the topic and excludes unpublished drafts/search", async () => {
  const { html: xml } = await page("/sitemap.xml");
  assert.ok(xml.includes(`<loc>${expected("/en/pressure-gauges")}</loc>`));
  for (const path of ["/en/temperature-instruments", "/en/level-instruments"]) assert.ok(xml.includes(`<loc>${expected(path)}</loc>`));
  assert.ok(!xml.includes("/zh/pressure-gauges"));
  for (const draft of ["npt-vs-bsp-pressure-gauge-connections", "pressure-gauge-vibration-pulsation", "editorial-drafts"]) assert.ok(!xml.includes(draft), `Draft appeared in sitemap: ${draft}`);
  assert.ok(!/<loc>[^<]*\?/.test(xml), "Query URL in sitemap");
});

test("French fallback document has English canonical", async () => {
  const { html } = await page("/fr/docs/getting-started");
  assert.deepEqual(canonical(html), [expected("/en/docs/getting-started")]);
});

test("Article JSON-LD uses real ISO dates and matching canonical", async () => {
  const { html } = await page("/en/blog/selecting-pressure-gauge");
  const article = jsonLd(html).find((item) => item["@type"] === "Article");
  assert.equal(article?.datePublished, "2025-01-15");
  assert.equal(article?.dateModified, "2026-10-18");
  assert.equal(article?.mainEntityOfPage, expected("/en/blog/selecting-pressure-gauge"));
  assert.ok(!article?.reviewedBy, "An unverified reviewer must not be invented");
});

test("Revised selection guides link to products and enquiry without unsupported claims", async () => {
  for (const locale of ["en", "zh"]) {
    const { html } = await page(`/${locale}/blog/selecting-pressure-gauge`);
    const article = markup(html).match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1];
    assert.ok(article);
    for (const [slug] of gauges) assert.ok(tags(article, "a").some((tag) => tag.href === `/${locale}/products/${slug}`));
    assert.ok(tags(article, "a").some((tag) => tag.href === `/${locale}/contact`));
    assert.doesNotMatch(article, /After-sales statistics|steam above ~60|正常工作压力位于量程的/);
    assert.ok(tags(article, "a").some((tag) => tag.href?.startsWith("https://www.wika.com/")));
  }
});

let failed = 0;
for (const { name, run } of cases) {
  try {
    await run();
    console.log(`PASS ${name}`);
  } catch (error) {
    failed++;
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
assert.equal(failed, 0, `${failed}/${cases.length} SEO smoke checks failed`);
console.log(`All ${cases.length} SEO smoke checks passed (${base.origin}).`);
