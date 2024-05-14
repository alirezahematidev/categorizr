import fs from "node:fs/promises";

import glob from "fast-glob";

async function copy(...names: string[]) {
  Promise.all(
    names.map(async (name) => {
      const [dts] = await glob("dist/**/main.d.ts", { cwd: `packages/${name}`, absolute: true });

      await fs.copyFile(dts, dts.replace(/\.d\.ts$/, ".d.cts"));
    })
  );
}

copy("core", "react");
