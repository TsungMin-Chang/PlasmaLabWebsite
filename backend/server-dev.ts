import appPromise from './server';
import * as path from 'path';
import {oas} from 'koa-oas3';
appPromise.then(async app => app.use(await oas({
  file: path.join(__dirname, 'api/api.yml'),
  endpoint: '/api/api.json',
  uiEndpoint: '/api/doc/',
  validatePaths: [], // disable
})));
