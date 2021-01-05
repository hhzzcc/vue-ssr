const path = require('path');
const { merge } = require('webpack-merge');
const { getBaseConfig } = require('./webpack-base-config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = getBaseConfig('client');
module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname, `../../views/${process.env.DIR}/entry-client.js`),
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
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
    module: {
        rules: [
            {
                test:/\.less$/,
                use: ['style-loader','css-loader','less-loader']
            },
        ]
    },
    plugins: [
        new VueSSRClientPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].css'
        // }),
    ]
});