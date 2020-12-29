const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const getBaseConfig = type => {
    const isServer = type === 'server';
	// const isClient = !isServer;
    return {
        mode: 'development',
        output: {
			path: path.resolve('dist/www', isServer ? 'server' : 'client'),
			publicPath: '/',
			filename: '[name].bundle.js'
		},
		module: {
	    	rules: [
	    		{
	    			test: /\.vue$/i,
	    			use: 'vue-loader',
	    		},
	    		// {
	    		// 	test: /\.less$/i,
	    		// 	loader: 'less-loader',
	    		// },
	    		// {
	    		// 	test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
	    		// 	use: [
	    		// 		{
	    		// 			loader: 'url-loader',
	    		// 		}
	    		// 	]
	    		// },
	    		// {
	    		// 	test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
	    		// 	use: [
	    		// 		{
	    		// 			loader: 'url-loader',
	    		// 		}
	    		// 	]
	    		// },
	    		// {
	    		// 	test: /\.(webm|mp4|ogv)$/i,
	    		// 	use: [
	    		// 		{
	    		// 			loader: 'file-loader',
	    		// 		}
	    		// 	]
	    		// }
			]
		},
		plugins: [
			new VueLoaderPlugin()
	  	]
    };
};

module.exports = {
    getBaseConfig
};