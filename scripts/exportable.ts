import { createExportableManifest } from "@pnpm/exportable-manifest";
import { readProjectManifestOnly } from "@pnpm/read-project-manifest";
import { writeFile } from "fs/promises";

(async () => {
  const projectDir = "packages/react"; // folder of "package.json" to be translated
  const distDir = "packages/react/dist"; // folder to save the translated one

  const manifest = await readProjectManifestOnly(projectDir);
  const exportable = await createExportableManifest(projectDir, manifest);
  await writeFile(`${distDir}/package.json`, JSON.stringify(exportable, undefined, 2));
})()
  .then(() => {})
  .catch(console.error);
