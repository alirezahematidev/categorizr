import fs from "node:fs/promises";

import glob from "fast-glob";

async function copy() {
  const [dts] = await glob("dist/**/main.d.ts", { cwd: `packages/react`, absolute: true });

  await fs.copyFile(dts, dts.replace(/\.d\.ts$/, ".d.cts"));
}

copy();
