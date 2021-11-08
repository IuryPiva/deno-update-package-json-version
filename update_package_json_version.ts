const packageJson = JSON.parse(await Deno.readTextFile("./package.json"));
const { version } = packageJson;

const next = parseInt(version.split(".").pop() ?? "0") + 1;
const nextVersion = version.split(".").reverse();
nextVersion[0] = next.toString();
nextVersion.reverse();

await Deno.writeTextFile(
  "./package.json",
  JSON.stringify({ ...packageJson, version: nextVersion.join(".") }),
);

const p = Deno.run({
  cmd: ["deno", "fmt", "package.json"]
})

await p.status(); // (*1); wait here for child to finish
p.close();