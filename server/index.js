const fs = require('fs');
const path = require('path');
const app = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const webpackHotUpdate = require('./dev/webpack-hot-update');
const port = 7777;

let serverBundle;
let clientBundle;
let noSsrBundle;
let renderer;
let mfs;
let files;

const createRenderer = () => {
    return createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, './template/index.html'), 'utf-8'),
        clientManifest: clientBundle
    });
};

// 控制台打印信息
const log = () => {
    setTimeout(() => { 
        process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
        console.log('\x1B[32mDone Compiled successfully\x1B[0m');
        console.log('You Can:');
        console.log('- Open Ssr:      ' + `\x1B[36mhttp://localhost:${port}\x1B[0m`);
        console.log('- Open No Ssr:   ' + `\x1B[36mhttp://localhost:${port}?__ssr=0\x1B[0m`);
    }, 0);
};

// 本地开发启用热更新
if (process.env.NODE_ENV === 'development') {
    webpackHotUpdate(app, result => {
        serverBundle = result.serverBundle || serverBundle;
        clientBundle = result.clientBundle || clientBundle;
        noSsrBundle = result.noSsrBundle || noSsrBundle;
        mfs = result.mfs || mfs;
    
        if (result.clientBundle) {
            files = clientBundle.all;
        }

        if (serverBundle && clientBundle) {
            files = clientBundle.all;
            renderer = createRenderer();
            log();
        }
    });
}
// 线上使用打包文件
else {
    serverBundle = require(`../dist/${process.env.DIR}/vue-ssr-server-bundle.json`);
    clientBundle = require(`../dist/${process.env.DIR}/vue-ssr-client-manifest.json`);
    noSsrBundle = fs.readFileSync(path.resolve(__dirname, `../dist/${process.env.DIR}/index.html`), 'utf-8');
    mfs = fs;
    files = clientBundle.all;
    renderer = createRenderer();
    log();
}



app.get('*', (req, res) => {
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

app.listen(port);