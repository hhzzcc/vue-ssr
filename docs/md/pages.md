### 目录初始结构
```
docs                  - 文档
server                - 服务端代码
  build               - webpack构建，包括服务端渲染构建、spa构建、env注入
  dev                 - 开发环境需要的配置，如代码热更新
  template            - 打包用的模板
  index.js            - 服务入口
views
  www                 - 前端项目
    layout            - 通用布局
    mixins            - async-data.js (处理asyncData逻辑)
    router            - vue-router
    store             - vuex
    pages             - 页面
    app.js            - 服务端和客户端共用部分
    entry-client.js   - 客户端打包入口
    entry-server.js   - 服务端打包入口
```