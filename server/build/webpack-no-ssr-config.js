const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { getBaseConfig } = require('./webpack-base-config.js');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = getBaseConfig('no-ssr');

const isProduction = process.env.NODE_ENV === 'production';
const config = merge(baseConfig, {
    entry: path.resolve(__dirname, `../../views/${process.env.DIR}/entry-client.js`),
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: '[name].css'
        // }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../template/index-no-ssr.html'),
        })
    ]
});

if (!isProduction) {
    config.entry = ['webpack-hot-middleware/client', config.entry];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;

