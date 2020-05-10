//@ts-check

const { Run } = require('@kira/bundler');

Run.production({
  root: process.cwd(),
  customEnv: 'dev_env',
  loadConfig: 'dev_env',
})
  .then(() => {
    console.log('done');
  })
  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
