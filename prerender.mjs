import { readFile, writeFile } from "node:fs/promises";

const routes = ["/"];

const templatePath = new URL("./dist/index.html", import.meta.url);
const ssrEntryPath = new URL("./dist-ssr/entry-server.js", import.meta.url);

async function prerender() {
  let template;
  try {
    template = await readFile(templatePath, "utf-8");
  } catch (e) {
    throw new Error(
      `Could not read dist/index.html. Did you run the client build first? Original error: ${e instanceof Error ? e.message : String(e)}`
    );
  }

  let mod;
  try {
    mod = await import(ssrEntryPath.href);
  } catch (e) {
    throw new Error(
      `Could not import SSR bundle at dist-ssr/entry-server.js. Original error: ${e instanceof Error ? e.message : String(e)}`
    );
  }

  if (!mod || typeof mod.render !== "function") {
    throw new Error("SSR entry does not export a render(url) function.");
  }

  for (const url of routes) {
    const { html } = await mod.render(url);
    const out = template.replace("<!--app-html-->", html);

    if (url !== "/") {
      throw new Error(`Only '/' is supported in this prerender script, got route: ${url}`);
    }

    await writeFile(templatePath, out, "utf-8");
  }
}

prerender();
