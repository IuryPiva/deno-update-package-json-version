import { formatPackageJson, updatePackageJsonVersion } from "./mod.ts";

if (import.meta.main) {
  await updatePackageJsonVersion();
  await formatPackageJson();
}
