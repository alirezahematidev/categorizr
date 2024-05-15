import fs from "node:fs/promises";

import glob from "fast-glob";

async function copy(name: string) {
  const files = await glob("**/dist/**/main.d.ts", { cwd: `packages/${name}`, absolute: true });

  await Promise.all(files.map((dts) => fs.copyFile(dts, dts.replace(/\.d\.ts$/, ".d.cts"))));
}

export default copy;
