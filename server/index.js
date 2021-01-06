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

        if (serverBundle && clientBundle) {
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
    renderer = createRenderer();
    // 文件直接从dist中拿
    app.use(function getFile(req, res, next) {
        const fileName = req.url.replace(/^\//, '');
        // 访问文件
        if (serverBundle.files[fileName]) {
            const filePath = path.resolve(__dirname, `../dist/${process.env.DIR}/` + fileName);
            return res.end(fs.readFileSync(filePath, 'utf-8'));
        }
        next();
    });
    log();
}

// 关闭服务端渲染
app.use(function noSsrRender(req, res, next) {
    if (req.url.includes('?__ssr=0') && noSsrBundle) {
        return res.end(noSsrBundle);
    }
    next();
});


// 服务端渲染
app.use(function ssrRedner(req, res) {
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

