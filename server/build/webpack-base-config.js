const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getBaseConfig = type => {
    const isServer = type === 'server';
	const isClient = !isServer;
	const isProduction = process.env.NODE_ENV === 'production';

    return {
        mode: process.env.NODE_ENV,
        output: {
			path: path.resolve(__dirname, `../../dist/${process.env.DIR}`, isServer ? 'server' : 'client'),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				// {
				// 	test: /\.js$/,
				// 	loader: 'babel-loader'
				// },
				// {
				// 	test: /\.(css|less)$/,
				// 	use: ['style-loader', 'css-loader', 'less-loader']
				// },
				// {
				// 	test: /\.(png|jpg|gif|svg)$/,
				// 	use: [
				// 		{
				// 			loader: 'url-loader',
				// 			options: {
				// 				limit: 4096
				// 			}
				// 		}
				// 	]
				// },
				// {
				// 	test: /\.(woff|woff2|eot|ttf|otf)$/,
				// 	use: ['file-loader']
				// }
			]
		},
		plugins: [
			new VueLoaderPlugin()
	  	],
    };
};

module.exports = {
    getBaseConfig
};