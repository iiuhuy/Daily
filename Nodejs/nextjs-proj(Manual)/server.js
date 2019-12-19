// =================================================================== //
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const session = require("koa-session");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});

const handle = app.getRequestHandler();

// 等 pages 下面的所有页面编译完成之后启动服务，响应请求
app.prepare().then(() => {
  // 实例化 Koa Server
  const server = new Koa();
  const router = new Router();

  server.keys = ["yuhui develop github next app"];
  const SESSION_CONFIG = {
    key: "jid"
    // store: {}
  };

  server.use(session(SESSION_CONFIG, server));

  // server.use(async (ctx, next) => {
  //   if (ctx.cookies.get("jid")) {
  //     ctx.session = {};
  //   }
  //   await next();
  // });

  // server.use(async (ctx, next) => {
  //   if (ctx.session.user) {
  //     ctx.session.user = {
  //       name: "YuHui",
  //       age: 18
  //     };
  //   } else {
  console.log("session is: ", ctx.session);
  //   }
  //   await next();
  // });

  server.use(router.routes());
  // 根据浏览器地址栏请求的 params 来进行相关 query 的配置
  router.get("/a/:id", async ctx => {
    const id = ctx.params.id;
    // await app.render(ctx.req, ctx.res, "/a", { id });
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id }
    });
    ctx.respond = false;
  });

  router.get("/set/user", async ctx => {
    // const id = ctx.params.id;
    // // await app.render(ctx.req, ctx.res, "/a", { id });
    // await handle(ctx.req, ctx.res, {
    //   pathname: "/a",
    //   query: { id }
    // });
    ctx.respond = false;
    ctx.session.user = {
      name: "YuHui",
      age: 18
    };
    ctx.body == "set session success";
  });

  // 通配符
  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    // hack 手段，兼容 node 底层的 req 和 res
    ctx.respond = false; // 不再使用内置的
  });

  // 使用中间件
  server.use(async (ctx, next) => {
    ctx.cookies.set("id", "userid_dex", {});
    ctx.res.statusCode = 200;
    await next();
  });

  // 监听端口
  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
