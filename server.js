const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const router = new Router();

const app = new Koa();
app.use(
  koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
    text: true,
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb',
    enableTypes: ['json', 'form', 'text'],
  }),
);

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    const n = await next();
    return n;
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set(
        'Access-Control-Allow-Headers',
        ctx.request.get('Access-Control-Request-Headers'),
      );
    }

    ctx.response.status = 204;
  }

  return true;
});

const recipes = [];
const files = {};

app.use(async (ctx, next) => {
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
  });

  await next();
});

router.get('/api/recipes', async (ctx, next) => {
  ctx.body = JSON.stringify(recipes);
  await next();
});

router.get('/api/recipes/:id', async (ctx, next) => {
  const recipe = recipes.find((item) => item.key === ctx.params.id);
  if (!recipe) {
    ctx.throw(404);
  }
  ctx.body = JSON.stringify(recipe)
  await next();
});
router.get('/api/recipes/:id/download', async (ctx, next) => {
  const file = files[ctx.params.id];
  if (!file) {
    ctx.throw(404);
  }

  ctx.response.set('content-type', file.type);
  ctx.body = fs.createReadStream(file.path);
  await next();
});

router.post('/api/user/login', async (ctx, next) => {
  const message = JSON.parse(ctx.request.body);
  const users = [
    { id: 1, mail: 'another@mail.ru', pass: '123' },
    { id: 2, mail: 'test@test.com', pass: 'test' },
  ];
  let response = users.filter(
    (elem) => !!(elem.mail === message.mail && elem.pass === message.pass),
  );
  response =
    response.length !== 0
      ? { id: response[0].id, mail: response[0].mail }
      : { message: 'Неправильая почта или пароль' };
  ctx.body = JSON.stringify(response);
  await next();
});

router.post('/api/recipes', async (ctx, next) => {
  const recipe = ctx.request.body;
  recipes.push(recipe);
  files[recipe.key] = ctx.request.files.fileRecipe;
  ctx.body = JSON.stringify(recipe);
  await next();
});

router.get('/api/favotites/recipes', async (ctx, next) => {
  ctx.body = JSON.stringify(
    recipes.filter((element) => element.favorite === 'true'),
  );
  await next();
});

router.post('/api/favorites/recipes/:id', async (ctx, next) => {
  recipes.forEach((element) => {
    if (element.key === ctx.params.id) {
      const elem = element;
      elem.favorite = 'true';
    }
  });
  ctx.body = 'ok';
  await next();
});

router.del('/api/favorites/recipes/:id', async (ctx, next) => {
  recipes.forEach((element) => {
    if (element.key === ctx.params.id) {
      const elem = element;
      elem.favorite = '';
    }
  });
  ctx.body = 'ok';
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
const port = process.env.PORT || 7071;
server.listen(port);
