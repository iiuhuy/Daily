// const Koa = require("koa");
// const next = require("next");
// const Router = require("koa-router");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const router = new Router();
// const handle = app.getRequestHandler();

// // 例如 GET
// router.get("/test/:id", ctx => {
//   // id 是 koa-router 里面的东西. 而不是 koa 本身自带的东西
//   // ctx.body = `<p>request /test ${ctx.params.id}</p>`; // test
//   ctx.body = { success: true };
//   ctx.set("Content-Type", "application/json");
// });

// // app.prepare().then(() => {
// const server = new Koa();

// // 处理异步的内容 async、koa2 async, generator -> 是 koa1 中的用法
// server.use(async (ctx, next) => {
//   // const path = ctx.path; // path 根据请求的路径来获取到路径
//   // const method = ctx.method;
//   // ctx.body = `<span>Koa is render! </br>${path} </br> 请求方法: ${method}<span>`;
//   await next(); // 如果需要执行下面的 中间件, 那么就需要执行 await next()，否则就会一直执行着当前的 中间件
// });

// // 使用 router
// server.use(router.routes());

// // server.use(async (ctx, next) => {
// //   ctx.body = "<span>Koa is render => 2!<span>";
// // });

// // 中间件
// // server.use(async (ctx, next) => {
// //   await handle(ctx.req, ctx.res);
// //   ctx.respond = false;
// // });

// server.listen(3000, () => {
//   console.log("koa server listening 3000: http://localhos:3000");
// });
// // });

// =================================================================== //
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("koa server listening 3000: http://localhos:3000");
  });
});
