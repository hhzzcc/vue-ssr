const fs = require('fs');
const path = require('path');
const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const config = require('./build/webpack-client-config');
const webpackHotUpdate = require('./webpack-hot-update');

let serverBundle = require(`../dist/${process.env.DIR}/vue-ssr-server-bundle.json`);
let clientBundle = require(`../dist/${process.env.DIR}/vue-ssr-client-manifest.json`);
let noSsrBundle = fs.readFileSync(path.resolve(__dirname, `../dist/${process.env.DIR}/index.html`), 'utf-8');

const createRenderer = () => {
    return createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, './template/index.html'), 'utf-8'),
        clientManifest: clientBundle
    });
}; 

let renderer = createRenderer();
let mfs = fs;
let files = clientBundle.all;

// 本地开发启用热更新
if (process.env.NODE_ENV === 'development') {
    const {
        webpackDevMiddleware,
		webpackHotMiddleware
    } = webpackHotUpdate(result => {
        serverBundle = result.serverBundle || serverBundle;
        clientBundle = result.clientBundle || clientBundle;
        noSsrBundle = result.noSsrBundle || noSsrBundle;
        mfs = result.mfs || mfs;
    
        if (result.serverBundle) {
            files = clientBundle.all;
        }
        
        renderer = createRenderer(result);
    });
    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware);
}


server.get('*', (req, res) => {
    const fileKey = files.find(f => '/' + f === req.url);
    // 访问文件
    if (fileKey) {
        const filePath = path.resolve(__dirname, `../dist/${process.env.DIR}/` + fileKey);
        return res.end(mfs.readFileSync(filePath, 'utf-8'));
    }

    if (req.url.includes('?__ssr=0') && noSsrBundle) {
        return res.end(noSsrBundle);
    }

    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            throw err;
        }
        else {
            res.type('html');
            res.end(html);
        }
        
    });

  });
  
  const port = 7777;
  server.listen(port, () => {
      console.log(`端口${port}启动成功`);
  });