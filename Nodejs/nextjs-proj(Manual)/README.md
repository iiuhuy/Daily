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

`GET https://github.com/login/oauth/authorize` 请求这个这参数, 然后在 url 后面加上 `client_id` 参数。
`https://github.com/login/oauth/authorize?client_id=0754fc00a257ad4c4971`
就能进入认证流程。

<img src="https://raw.githubusercontent.com/AlvinMi/2019-Pic/master/2019/20191218234104.png"/>

后面再跟 repo，`https://github.com/login/oauth/authorize?client_id=0754fc00a257ad4c4971&&scope=repo`, 包含了 repo 所有的东西。[相关参数](https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes)

授权输入密码后，跳转到了 localhost:3000 并且携带了 code 参数：

`http://localhost:3000/auth?code=c202cd6820ca74404930`

这个 url 要跟注册 OAuth Apps 时候所填写的一样。

## 请求 token

- client_id、client_secret
- Code
- redirect_uri state

模拟一个 POST 请求: `POST https://github.com/login/oauth/access_token`

使用 Chrome 插件 [Rest API Testing](https://chrome.google.com/webstore/detail/talend-api-tester-free-ed/aejoelaoggembcahagimdiliamlcdmfm) 插件

填写 client_id、client_secret、Code 就能拿到 token。拿到 token 之后就能去请求个人信息。

`https://api.github.com/user`

## OAuth Code 如何保证安全？

- Code
- client_id
- client_secret
- redirect_uri(需要跟注册时候的 url 一样)
