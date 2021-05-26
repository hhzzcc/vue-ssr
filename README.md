## vue ssr框架
- 支持热更新、less
- 支持ssr和csr相互切换
- 支持asyncData钩子
- 支持vue全家桶

## Run Examples
[演示地址]|http://121.5.76.237:7777/

开发
```
yarn

yarn dev:www
```

访问
```
<!-- 使用服务端渲染 -->
http://localhost:7777

<!-- 不使用服务端渲染 -->
http://localhost:7777?__ssr=0
```

编译部署

```
yarn build:www

yarn start:www
```
