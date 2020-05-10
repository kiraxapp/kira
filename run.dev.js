//@ts-check

const { Run } = require('@kira/bundler');

Run.development({
  hmr: true,
  parseWithBabel: true,
  root: process.cwd(),
  customEnv: 'dev_env',
  loadConfig: 'dev_env',
});
