const fs = require('fs');
const path = require('path');
const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const webpackHotUpdate = require('./webpack-hot-update');

let serverBundle = require(`../dist/${process.env.DIR}/server/vue-ssr-server-bundle.json`);
let clientBundle = require(`../dist/${process.env.DIR}/client/vue-ssr-client-manifest.json`);

const createRenderer = () => {
    return createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, './template/index.html'), 'utf-8'),
        clientManifest: clientBundle
    });
}; 

let renderer = createRenderer();
let mfs = fs;
let files = Object.keys(serverBundle.files);

// 本地开发启用热更新
if (process.env.NODE_ENV === 'development') {
    const {
        webpackDevMiddleware,
		webpackHotMiddleware
    } = webpackHotUpdate(result => {
        serverBundle = result.serverBundle || serverBundle;
        clientBundle = result.clientBundle || clientBundle;
        mfs = result.mfs || mfs;
    
        if (result.serverBundle) {
            files = Object.keys(serverBundle.files);
        }
        
        renderer = createRenderer(result);
    });
    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware);
}


server.get('*', (req, res) => {
    const fileKey = files.find(f => '/' + f === req.url);
    // 访问文件直接访问文件
    if (fileKey) {
        const filePath = path.resolve(__dirname, `../dist/${process.env.DIR}/client/` + fileKey);
        console.log(filePath);
        return res.end(mfs.readFileSync(filePath, 'utf-8'));
    }

    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        res.type('html');
        res.end(html);
    });

  });
  
  const port = 7777;
  server.listen(port, () => {
      console.log(`端口${port}启动成功`);
  });