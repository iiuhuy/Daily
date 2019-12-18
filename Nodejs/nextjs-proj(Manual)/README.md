# Next.js

## 目录结构

```bash
- .next # next.js 自动生成的
- component # 公用组件
- lib # 类库之类的
- pages # next.js 路由体系, 根据该目录访问
- static # 静态资源文件

```

# Authorize 认证

Github 认证流程:

- [Authorizing OAuth Apps](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

`GET https://github.com/login/oauth/authorize` 请求这个这参数, 然后在 url 后面加上 `client_id` 参数。就能进入认证流程。

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20191218234104.png"/>

