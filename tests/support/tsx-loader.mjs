// Test-only module hooks so `node --test` can import the site's .tsx components:
// - "@/..." resolves to the project root (tsconfig paths), extensionless imports find .ts/.tsx;
// - .ts/.tsx files are compiled with the project's own TypeScript (no extra dependency);
// - next/link becomes a plain <a> (the real one needs the Next.js router).
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const EXTS = [".tsx", ".ts", "/index.tsx", "/index.ts"];
const LINK_STUB = new URL("./next-link-stub.mjs", import.meta.url).href;

function findFile(base) {
  if (/\.(tsx?|mjs|js)$/.test(base) && existsSync(base)) return base;
  for (const ext of EXTS) if (existsSync(base + ext)) return base + ext;
  return null;
}

export async function resolve(specifier, context, next) {
  if (specifier === "next/link") return { url: LINK_STUB, shortCircuit: true };
  if (specifier.startsWith("@/")) {
    const file = findFile(path.join(ROOT, specifier.slice(2)));
    if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    const parent = fileURLToPath(context.parentURL);
    if (!parent.includes(`${path.sep}node_modules${path.sep}`)) {
      const file = findFile(path.resolve(path.dirname(parent), specifier));
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
    }
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.startsWith("file:") && /\.tsx?$/.test(url) && !url.includes("/node_modules/")) {
    const source = await readFile(fileURLToPath(url), "utf8");
    const out = ts.transpileModule(source, {
      fileName: fileURLToPath(url),
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        verbatimModuleSyntax: false,
      },
    });
    return { format: "module", shortCircuit: true, source: out.outputText };
  }
  return next(url, context);
}
