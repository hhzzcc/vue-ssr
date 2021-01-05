const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { getBaseConfig } = require('./webpack-base-config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = getBaseConfig();
const isProduction = process.env.NODE_ENV === 'production';
const config = merge(baseConfig, {
    entry: path.resolve(__dirname, `../../views/${process.env.DIR}/entry-client.js`),
    plugins: [
        new VueSSRClientPlugin(),
    ]
});


if (!isProduction) {
    config.entry = ['webpack-hot-middleware/client', config.entry];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.ProgressPlugin());
}

module.exports = config;

