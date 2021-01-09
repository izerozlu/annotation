import FileSystem from 'fs';

import Koa from 'koa';
import Router, {IRouterContext} from 'koa-router';

const DATASET_PATH = `${__dirname}/../../data/dataset.json`;

const dataset = JSON.parse(FileSystem.readFileSync(DATASET_PATH, 'utf8'));
const router = new Router({ prefix: '/api/dataset' });

router.get('/', (context: IRouterContext, next: Koa.Next) => {
  context.body = dataset;
  next();
});

export default router;
