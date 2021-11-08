import { updatePackageJsonVersion } from "./update_package_json_version.ts";

/**
 * Updates your package.json semantic version according to tier provided.
 * tier = major | minor | patch
 * ```json
 * // package.json
 * {
 *  version: "major.minor.patch"
 * }
 * ```
 *
 * Run this on package.json folder:
 * deno run https://deno.land/x/update_package_json_version@0.0.2 [ --major | --minor | --patch ]
 */
async function mod() {
  await updatePackageJsonVersion()
}

mod()