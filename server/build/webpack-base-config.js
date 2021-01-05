const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProduction = process.env.NODE_ENV === 'production';
const getBaseConfig = type => {

    return {
        mode: process.env.NODE_ENV,
        output: {
			filename: '[name].js',
			path: path.resolve(__dirname, `../../dist/${process.env.DIR}`),
		},
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
							esModule: false  //默认为true 需要设置为false
						}
					  },
					  'less-loader'
					]
			  	}
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
			new VueLoaderPlugin(),
	  	],
    };
};

module.exports = {
    getBaseConfig
};