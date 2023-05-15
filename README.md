# ICH Study 非遗研学

本项目是以留学生为主要服务群体，以民间工艺等中国传统文化为教学内容的研究平台

使用Vue3, Vite, Typescript, Pinia, Unocss, Element-plus, pnpm等技术栈实现

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


## 项目配置
### 目录结构
```tree
|-- .vscode                     // vscode插件、设置
|   |-- extensions.json         // 插件
|   |-- setting.json            // 设置
|-- public
|-- src
|   |-- api                     // 网络请求
|   |-- |-- types.d.ts
|   |-- |-- request.ts
|   |-- assets                  // 图片，字体等静态资源
|   |-- components              // 全局组件
|   |-- composables             // 组合式函数
|   |-- hooks                   // 组合式的函数hooks(内部状态)
|   |-- layouts                 // 布局组件
|   |-- locale                  // 多语言处理
|   |-- |-- index.ts
|   |-- |-- en-US.yml           // 英文翻译
|   |-- |-- zh-CN.yml           // 中文翻译
|   |-- router                  // vue-router路由
|   |-- stores                  // pinia状态管理
|   |-- styles                  // 全局样式
|   |-- |-- element.less
|   |-- |-- index.less
|   |-- |-- variables.less
|   |-- typings                 // TS类型声明
|   |   |-- auto-import.d.ts
|   |-- utils                   // 工具函数
|   |-- views                   // 页面
|   |-- App.vue                 // vue文件入口
|   |-- main.ts                 // 项目入口文件
|   |-- vite-env.d.ts           // vue相关类型
|-- .editorconfig               // 统一编辑器配置
|-- .env                        // 通用环境配置
|-- .eslintrc.json              // eslint配置文件
|-- .gitignore                  // 配置git记录时哪些文件忽略
|-- index.html
|-- package.json
|-- pnpm-lock.yaml
|-- README.md
|-- tsconfig.json               // TS配置
|-- tsconfig.node.json
|-- unocss.config.ts            // unocss配置
|-- vite.config.ts              // vite配置
```
