import Koa from 'koa';
import {promises as fs} from 'fs';
// local module
import apiRouter from './api/generated/apiRouter';
import login from './login';
// import register from './register';
// config TODO
const serverPath = '/var/run/che/api.sock';

const app = new Koa();
// logging TODO
app.use(async (ctx, next) => {
  const t0 = new Date();
  await next();
  const dt = +new Date() - t0.getTime();
  const {url, method, ip} = ctx.request;
  console.log(`${method} ${url} ${dt}ms from ${ip} at ${t0.toLocaleString()}`);
});
// routers
// app.use(register.routes()); //TODO
app.use(login.routes());
app.use(apiRouter.prefix('/api/v1')
  .routes());

export default (async () => {
  await fs.rm(serverPath, {force: true});
  const server = app
    .listen(serverPath, async () => {
      await fs.chmod(serverPath, 0o777);
      console.log(`API Server started: ${serverPath}`);
    });
  function onDestroy() {
    console.log('Cleaning up...');
    server.close();
    process.exit(0);
  }
  process.on('SIGINT', onDestroy);
  process.on('SIGTERM', onDestroy);
  return app; // pass to server-dev.ts
})(); // TODO
