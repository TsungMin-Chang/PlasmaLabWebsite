import Router from '@koa/router'
import * as fs from 'fs';
import * as base64 from 'base64-js';
import bodyParser from 'koa-body';
import {v4 as uuidv4} from 'uuid';

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
    const validImageType = ['jpg', 'jpeg', 'png'];
    if ( !validImageType.includes(fileType) ) {
      ctx.status = 400; // Bad Request
      return;
    }
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
    ctx.body = { uuid: myuuid + '.' + fileType };
  } catch (error) {
    console.error('Error processing request:', error);
    ctx.status = 500; // Internal Server Error
  }
});

export default imageRouter;