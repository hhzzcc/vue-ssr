const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const getBaseConfig = () => {

    return {
        mode: process.env.NODE_ENV,
        output: {
			filename: '[name].js',
			path: path.resolve(__dirname, `../../dist/${process.env.DIR}`),
		},
		// optimization: {
		// 	splitChunks: {
		// 		cacheGroups: {
		// 			vendors: {
		// 				test: /[\\/]node_modules[\\/]/,
		// 				name: 'vendors',
		// 				chunks: 'all'
		// 			}
		// 		}
		// 	},
		// },
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
			  	{
					test: /\.(css|less)$/,
					use: [
					  'vue-style-loader',
					  {
						loader: "css-loader",
						options: {
							esModule: false
						}
					  },
					  'less-loader'
					]
			  	},
				{
					test: /\.js$/,
					loader: 'babel-loader'
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 4096
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ['file-loader']
				}
			]
		},
		plugins: [
			new VueLoaderPlugin(),
	  	],
    };
};

module.exports = {
    getBaseConfig
};