/**
 * Post-build step for the GitHub Pages export.
 *
 * Next writes the generated social cards as extension-less files
 * (`out/opengraph-image`), which is fine behind a server that sets a content
 * type but not on Pages, where a file with no extension is served as
 * application/octet-stream and crawlers reject it. Rename them to .png and
 * rewrite the references in the emitted HTML.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");

if (!fs.existsSync(OUT)) {
  console.error("postbuild: no out/ directory — run the export first");
  process.exit(1);
}

const renamed = [];

for (const name of ["opengraph-image", "twitter-image"]) {
  const from = path.join(OUT, name);
  const to = `${from}.png`;
  if (fs.existsSync(from) && !fs.existsSync(to)) {
    fs.renameSync(from, to);
    renamed.push(name);
  }
}

if (renamed.length === 0) {
  console.log("postbuild: no extension-less social cards to rename");
} else {
  const htmlFiles = [];

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) htmlFiles.push(full);
    }
  };
  walk(OUT);

  let touched = 0;
  for (const file of htmlFiles) {
    const before = fs.readFileSync(file, "utf8");
    // Only rewrite the bare route; already-suffixed URLs are left alone.
    const after = before.replace(
      /\/(opengraph-image|twitter-image)(?!\.png)(?=[?"&])/g,
      "/$1.png",
    );
    if (after !== before) {
      fs.writeFileSync(file, after);
      touched += 1;
    }
  }

  console.log(
    `postbuild: renamed ${renamed.join(", ")} and rewrote ${touched} html file(s)`,
  );
}
