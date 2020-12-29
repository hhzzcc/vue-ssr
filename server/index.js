const fs = require('fs');
const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');

const serverBundle = require('../dist/www/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/www/client/vue-ssr-client-manifest.json');


const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync('./template/index.html', 'utf-8'),
    clientManifest
});

const files = Object.keys(serverBundle.files);

server.get('*', (req, res) => {

    const fileKey = files.find(f => '/' + f === req.url);
    if (fileKey) {
        const filePath = '../dist/www/client/' + fileKey;
        return res.end(fs.readFileSync(filePath, 'utf-8'));
    }

    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        res.type('html');
        res.end(html);
    });

  });
  
  server.listen(7777);