import assert from "node:assert/strict";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const site = "https://xircons.dev";
const personId = `${site}/#person`;
const slugs = ["keptcarbon", "skillforce", "icas-cmu-hub", "chekdee", "zero-mock", "turnpro-skill-radar", "store.atelien", "deskcat"];
const paths = ["/", "/contact", "/privacy", "/terms", ...slugs.map((s) => `/project/${s}`)];

const get = async (path) => {
  const res = await fetch(base + path, { redirect: "manual" });
  return { path, res, html: await res.text() };
};
let pages, notFound, llms, sitemap;
try {
  pages = await Promise.all(paths.map(get));
  [notFound, llms, sitemap] = await Promise.all(["/this-does-not-exist", "/llms.txt", "/sitemap.xml"].map(get));
} catch (e) {
  console.error(`cannot reach ${base}: ${e.cause?.code ?? e.message}`);
  process.exit(1);
}
const [home] = pages;
const projects = pages.filter((p) => p.path.startsWith("/project/"));

const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1];
const title = (html) => html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
const meta = (html, key, value) =>
  tags(html, "meta").find((t) => attr(t, key) === value && attr(t, "content") !== undefined);
const canonicals = (html) => tags(html, "link").filter((t) => attr(t, "rel") === "canonical");
const jsonld = (html) =>
  [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => JSON.parse(m[1]));
const nodes = (html) => jsonld(html).flatMap((j) => j["@graph"] ?? [j]);
const each = (list, fn) => list.forEach((p) => { try { fn(p); } catch (e) { e.message = `${p.path}: ${e.message}`; throw e; } });

let failed = 0;
const check = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${name} ${String(e.message).split("\n")[0]}`);
  }
};

check("home-title", () => assert.equal(title(home.html), "Wuttikan Suksan (Xircons): Full-stack Developer in Chiang Mai"));
check("project-titles", () => each(projects, (p) => assert.match(title(p.html) ?? "", /^.+: .+ \| Xircons$/)));
check("title-length", () => each(pages, (p) => assert.ok((title(p.html) ?? "").length <= 60, `${title(p.html)?.length} chars`)));
check("desc-length", () =>
  each(pages, (p) => {
    const d = attr(meta(p.html, "name", "description") ?? "", "content");
    assert.ok(d !== undefined && d.length <= 160, `${d?.length} chars`);
  }));
check("canonical", () =>
  each(pages, (p) => {
    const c = canonicals(p.html);
    assert.equal(c.length, 1, `${c.length} canonical tags`);
    const href = attr(c[0], "href");
    const want = p.path === "/" ? [site, `${site}/`] : [site + p.path];
    assert.ok(want.includes(href), `got ${href}`);
  }));
check("og", () =>
  each(pages, (p) => {
    assert.equal(attr(meta(p.html, "property", "og:type") ?? "", "content"), "website");
    assert.ok(attr(meta(p.html, "property", "og:image") ?? "", "content"), "no og:image");
  }));
check("404", () => {
  assert.equal(notFound.res.status, 404);
  assert.equal(canonicals(notFound.html).length, 0, "has canonical");
  assert.equal(title(notFound.html), "Page not found | Xircons");
});
check("person-schema", () => {
  const p = nodes(home.html).find((n) => [n["@type"]].flat().includes("Person"));
  assert.ok(p, "no Person node");
  assert.equal(p["@id"], personId);
  assert.ok(String(p.image?.url ?? p.image).endsWith("/wuttikan/wuttikan-suksan.jpg"), "image");
  assert.equal(p.address?.addressLocality, "Chiang Mai");
  assert.equal(p.address?.addressCountry, "TH");
  assert.ok([p.knowsAbout].flat().filter(Boolean).length > 0, "knowsAbout empty");
  const same = [p.sameAs].flat().filter(Boolean);
  assert.ok(same.includes("https://www.linkedin.com/in/wuttikan-suksan"), "sameAs missing LinkedIn");
  assert.ok(same.includes("https://www.npmjs.com/~xirconsss"), "sameAs missing npm");
});
check("graph-context", () =>
  each(pages, (p) =>
    jsonld(p.html).forEach((j) =>
      (j["@graph"] ?? []).forEach((n) => assert.ok(!("@context" in n), `${n["@type"]} has @context`)))));
check("author-ref", () => {
  each(projects, (p) => {
    const n = nodes(p.html);
    const work = n.find((x) => [x["@type"]].flat().some((t) => ["CreativeWork", "SoftwareApplication"].includes(t)));
    assert.ok(work, "no work node");
    assert.deepEqual(work.author, { "@id": personId });
    const site_ = n.find((x) => x["@type"] === "WebSite");
    assert.ok(site_, "no WebSite node");
    assert.deepEqual(site_.publisher, { "@id": personId });
  });
});
check("no-placeholder", () => each(pages, (p) => assert.ok(!JSON.stringify(jsonld(p.html)).includes("placeholder.svg"))));
check("no-copykub", () => each(pages, (p) => assert.ok(!/copykub/i.test(p.html))));
check("intro", () => {
  const sub = home.html.match(/<p[^>]*>(I(?:&#x27;|')m Wuttikan Suksan[\s\S]*?)<\/p>/)?.[1];
  assert.ok(sub, "no About subhead");
  assert.ok(sub.includes("Chiang Mai"), "subhead lacks Chiang Mai");
  assert.ok(sub.includes("Next.js"), "subhead lacks Next.js");
});
check("lcp", () => {
  const img = tags(home.html, "img").find((t) => attr(t, "src")?.includes("xircons-full-nobg") || attr(t, "srcset")?.includes("xircons-full-nobg"));
  assert.ok(img, "no xircons-full-nobg img");
  assert.ok(/fetchpriority="high"/i.test(img), "no fetchpriority=high");
  const pre = tags(home.html, "link").filter((t) => attr(t, "rel") === "preload" && /wuttikan/.test(t));
  assert.equal(pre.length, 0, "wuttikan preloaded");
});
check("menu-inert", () =>
  assert.ok(tags(home.html, "aside").some((t) => /aria-hidden="true"/.test(t) && /\sinert(=|\s|>)/.test(t)), "no inert aria-hidden aside"));
check("llms", () => {
  assert.equal(llms.res.status, 200);
  assert.match(llms.res.headers.get("content-type") ?? "", /text\/plain/);
  assert.ok(llms.html.includes("Wuttikan Suksan"));
  assert.ok(llms.html.includes("/project/keptcarbon"));
});
check("sitemap", () => {
  assert.ok(!/<priority>/.test(sitemap.html), "has priority");
  assert.ok(!/<changefreq>/.test(sitemap.html), "has changefreq");
  assert.equal((sitemap.html.match(/<lastmod>/g) ?? []).length, 12, "lastmod count");
});
check("headers", () => {
  const h = home.res.headers;
  assert.equal(h.get("x-content-type-options"), "nosniff");
  assert.equal(h.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(h.get("x-frame-options"), "DENY");
});

process.exit(failed ? 1 : 0);
