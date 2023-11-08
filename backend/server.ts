import Koa from 'koa';
import Router from '@koa/router'
import serve from 'koa-static'
import apiRouter from './api/generated/apiRouter';
import bodyParser from 'koa-body';
import * as fs from 'fs';
import * as base64 from 'base64-js';
import {v4 as uuidv4} from 'uuid';

const app = new Koa();

// recording
app.use(async (ctx, next) => {
  const t0 = new Date();
  await next();
  const dt = + new Date() - t0.getTime();
  const {url, method, ip} = ctx.request;
  console.log(`${method} ${url} ${dt}ms from ${ip} at ${t0.toLocaleString()}`);
});

const imageRouter = new Router();
imageRouter.post('*', bodyParser({
  formLimit: '30mb',
  jsonLimit: '30mb',
  textLimit: '30mb',
}), async (ctx) => {
  try {
    const {imageName, image} = ctx.request.body;
    const rimg = image.match(/^data:image\/(.*?);base64,(.*)$/);
    // Your base64-encoded string
    const fileType = rimg?.[1] ?? '';
    const base64String = rimg?.[2] ?? '';
    const base64Data = base64.toByteArray(base64String);
    const binaryData = Buffer.from(base64Data); // Convert base64 string to byte
    const myuuid = uuidv4();
    const fileName = '../mnt/public/' + myuuid + '.' + fileType;
    fs.writeFile(fileName, binaryData, (err) => { // Write the binary data to a file using fs.writeFile
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log(`Binary data has been written to ${fileName}`);
      }
    });
    ctx.status = 200;
    ctx.res.setHeader('Content-Type', 'application/json');
    ctx.body = { uuid: myuuid };
  } catch (error) {
    console.error('Error processing request:', error);
    ctx.status = 500; // Internal Server Error
  }
});

app.use(imageRouter
  .prefix('/image')
  .routes()
);

// routing
app.use(apiRouter
  .prefix('/api/v1')
  .routes()
);

// get static files (ex: client looks for index.html)
app.use(serve('../mnt/dist'))

// get static files (ex: client looks for images)
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
