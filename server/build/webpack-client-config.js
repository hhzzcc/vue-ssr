const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { getBaseConfig } = require('./webpack-base-config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = getBaseConfig('client');

const isProduction = process.env.NODE_ENV === 'production';
const config = merge(baseConfig, {
    entry: path.resolve(__dirname, `../../views/${process.env.DIR}/entry-client.js`),
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             },
    //             styles: {
    //                 name: 'styles',
    //                 test: /\.(css|less)$/,
    //                 chunks: 'all',
    //                 enforce: true
    //             }
    //         }
    //     },
    // },
    plugins: [
        new VueSSRClientPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css'
        // }),
    ]
});


if (!isProduction) {
    config.entry = ['webpack-hot-middleware/client', config.entry];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;

