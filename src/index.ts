import Koa from 'koa';
import KoaBody from 'koa-body';
import KoaStatic from 'koa-static';
import koaSend from 'koa-send';

import ENVIRONMENT from './env';
import dataset from './routes/dataset';
import annotation from './routes/annotation';
import ionImage from './routes/ion-image';

const PORT = ENVIRONMENT.PORT;

const app: Koa = new Koa();

app.use(KoaBody());
app.use(dataset.routes());
app.use(annotation.routes());
app.use(ionImage.routes());

app.use(KoaStatic(__dirname + '/../web-app/dist'));
app.use(function* index() {
  yield koaSend(this, __dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log('Server is up port:', PORT);
});
