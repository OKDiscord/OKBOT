const { exec } = require("child_process");
const { sync: glob } = require("glob");
const path = require("path");

const bumpDeps = async (depsList, dev = false, workspace) => {
  for (const dependency in depsList) {
    await new Promise((res, rej) => {
      const _workspace = workspace ? `workspace ${workspace}` : "-W";
      const _devFlag = dev ? "-D" : "";

      const cmd = `yarn ${_workspace} add ${_devFlag} ${dependency}`;
      console.log(`$$ ${cmd}`);

      const e = exec(cmd);
      if (!e.stdout) return rej();

      e.stdout.pipe(process.stdout);
      e.stdout.on("end", res);
    });
  }
};

(async () => {
  const _root = require("./package.json");

  await bumpDeps(_root.dependencies, false);
  await bumpDeps(_root.devDependencies, true);

  if (_root.workspaces) {
    _root.workspaces.forEach(async (workspace) => {
      for (str of glob(workspace)) {
        const _pkg = require(path.join(__dirname, str, "package.json"));

        await bumpDeps(_pkg.dependencies, false, _pkg.name);
        await bumpDeps(_pkg.devDependencies, true, _pkg.name);
      }
    });
  }
})();
