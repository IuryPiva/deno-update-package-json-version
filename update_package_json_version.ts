/**
 * Given a version number MAJOR.MINOR.PATCH, increment the:

  - MAJOR version when you make incompatible API changes,
  - MINOR version when you add functionality in a backwards compatible manner, and
  - PATCH version when you make backwards compatible bug fixes.

  run on same folder as package.json
  deno --allow-read --allow-write --allow-run  https://raw.githubusercontent.com/IuryPiva/deno-update-package-json-version/master/update_package_json_version.ts [ --major | --minor | --patch ]
 */

const arg0 = Deno.args[0].replace("--", "").toLowerCase();
type tierType = "major" | "minor" | "patch";

if (arg0 !== "major" && arg0 !== "minor" && arg0 !== "patch") {
  console.error("Arg", arg0, "not supported. Please use");
  Deno.exit(1); // exits with failure code 1
}

const tier: tierType = arg0;

const packageJson: { version: `${number}.${number}.${number}` } = JSON.parse(
  await Deno.readTextFile("./package.json"),
);

const [major, minor, patch] = packageJson.version.split(".").map(parseInt);
const versionObject = {
  major,
  minor,
  patch,
};
versionObject[tier]++;
const nextVersion = `${versionObject.major}.${versionObject.minor}.${versionObject.patch}`

await Deno.writeTextFile(
  "./package.json",
  JSON.stringify({ ...packageJson, version: nextVersion }),
);

const p = Deno.run({
  cmd: ["deno", "fmt", "package.json"],
});

await p.status(); // (*1); wait here for child to finish
p.close();
