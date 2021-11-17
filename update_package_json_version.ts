/**
 * Given a version number MAJOR.MINOR.PATCH, increment the:
 *
 * - MAJOR version when you make incompatible API changes,
 * - MINOR version when you add functionality in a backwards compatible manner, and
 * - PATCH version when you make backwards compatible bug fixes.
 *
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
 * deno run -A https://deno.land/x/update_package_json_version@0.0.3/run.ts [ --major | --minor | --patch ]
 */
export async function updatePackageJsonVersion() {
  const arg0 = Deno.args[0].replace("--", "").toLowerCase();
  type tierType = "major" | "minor" | "patch";
  const tierArray: tierType[] = ["major", "minor", "patch"];

  if (arg0 !== "major" && arg0 !== "minor" && arg0 !== "patch") {
    console.error(
      "Arg",
      arg0,
      "not supported. Please use",
      tierArray.map((tier) => `--${tier}`),
    );
    Deno.exit(1); // exits with failure code 1
  }

  const tier: tierType = arg0;
  console.info({ tier });

  const packageJson: { version: `${number}.${number}.${number}` } = JSON.parse(
    await Deno.readTextFile("./package.json"),
  );

  console.info("Old version:", packageJson.version);

  const [major, minor, patch] = packageJson.version.split(".").map((v) =>
    parseInt(v)
  );

  const versionObject = {
    major,
    minor,
    patch,
  };

  versionObject[tier]++;

  tierArray.slice(tierArray.indexOf(tier) + 1).forEach((prevTier) => {
    versionObject[prevTier] = 0;
  });

  const nextVersion =
    `${versionObject.major}.${versionObject.minor}.${versionObject.patch}`;

  console.info("Next version:", nextVersion);

  await Deno.writeTextFile(
    "./package.json",
    JSON.stringify({ ...packageJson, version: nextVersion }),
  );

  const p = Deno.run({
    cmd: ["deno", "fmt", "package.json"],
  });

  await p.status(); // (*1); wait here for child to finish
  p.close();
}
