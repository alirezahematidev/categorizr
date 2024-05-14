import fs from "node:fs/promises";

import glob from "fast-glob";

async function copy() {
  const files = await glob("**/dist/**/main.d.ts", { cwd: `packages/react`, absolute: true });

  await Promise.all(files.map((dts) => fs.copyFile(dts, dts.replace(/\.d\.ts$/, ".d.cts"))));
}

copy();
