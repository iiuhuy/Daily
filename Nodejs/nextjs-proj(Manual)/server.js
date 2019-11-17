const Koa = require("koa");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// app.prepare().then(() => {
const server = new Koa();

// 处理异步的内容 async、koa2 async, generator -> 是 koa1 中的用法
server.use(async (ctx, next) => {
  ctx.body = "<span>Koa is render!<span>";
  await next(); // 如果需要执行下面的 中间件, 那么就需要执行 await next()，否则就会一直执行着当前的 中间件
});

server.use(async (ctx, next) => {
  ctx.body = "<span>Koa is render => 2!<span>";
});
// 中间件
// server.use(async (ctx, next) => {
//   await handle(ctx.req, ctx.res);
//   ctx.respond = false;
// });

server.listen(3000, () => {
  console.log("koa server listening 3000: http://localhos:3000");
});
// });
