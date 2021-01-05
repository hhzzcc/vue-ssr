const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const { getBaseConfig } = require('./webpack-base-config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const baseConfig = getBaseConfig();
module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname, `../../views/${process.env.DIR}/entry-server.js`),
    target: 'node',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        allowlist: [/\.css$/, /\?vue&type=style/]
    }),
    plugins: [
        new VueSSRServerPlugin(),
    ]
});