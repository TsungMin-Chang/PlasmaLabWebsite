import Koa from 'koa';
import imageRouter from './api/image'
import apiRouter from './api/generated/apiRouter';
import serve from 'koa-static'

const app = new Koa();

// recording
app.use(async (ctx, next) => {
  const t0 = new Date();
  await next();
  const dt = + new Date() - t0.getTime();
  const {url, method, ip} = ctx.request;
  console.log(`${method} ${url} ${dt}ms from ${ip} at ${t0.toLocaleString()}`);
});

// image
app.use(imageRouter
  .prefix('/image')
  .routes()
);

// login, CRUD
app.use(apiRouter
  .prefix('/api/v1')
  .routes()
);

// static router - files (ex: index.html)
app.use(serve('../mnt/dist'))

// static router - files (ex: images)
app.use(serve('../mnt/public'))

app.listen(1724);

//const serverPath = '/var/run/plasma/api.sock';
//export default (async () => {
  //await fs.rm(serverPath, {force: true});
  //const server = app
    //.listen(serverPath, async () => {
       //await fs.chmod(serverPath, 0o777);
       //console.log(`API Server started: ${serverPath}`);
     //});
  //function onDestroy() {
    //console.log('Cleaning up...');
    //server.close();
    //process.exit(0);
  //}
  //process.on('SIGINT', onDestroy);
  //process.on('SIGTERM', onDestroy);
  //return app; // pass to server-dev.ts
//})();
