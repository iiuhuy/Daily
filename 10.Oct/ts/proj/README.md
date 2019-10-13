# README

## Init

```
$ cd proj
$ yarn
```

open `index.html`

## 结构组织我们的工程

```
proj/
├─ dist/
└─ src/
   └─ components/
```

TypeScript 文件会放在 src 文件夹里。

通过 TypeScript 编译器编译，然后经 webpack 处理，最后生成一个 `bundle.js` 文件放在 dist 目录下。

自定义的组件将会放在 `src/components` 文件夹下。

## 依赖

`typescript awesome-typescript-loader source-map-loader` 让 TypeScript 和 webpack 在一起良好地工作。

- `awesome-typescript-loader` 可以让 Webpack 使用 TypeScript 的标准配置文件 tsconfig.json 编译 TypeScript 代码
- `source-map-loader` 使用 TypeScript 输出的 sourcemap 文件来告诉 webpack 何时生成自己的 sourcemaps

> awesome-typescript-loader 并不是唯一的 TypeScript 加载器。 你还可以选择 ts-loader。 可以到 这里查看它们之间的区别。

## 添加 TypeScript 配置文件

创建一个 `tsconfig.json` 文件，包含了输入文件列表以及编译选项。

内容如下:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es6",
    "jsx": "react"
  },
  "include": ["./src/**/*"]
}
```

更多关于 [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 文件的说明。

## 开始写 Hello World

`src/components/Hello.tsx`

## Webpack 配置文件

根目录下创建 `webpack.config.js`
