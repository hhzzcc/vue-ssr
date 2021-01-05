const MFS = require('memory-fs');
const path = require('path');
const webpack = require('webpack');

const readFile = (fs, p) => {
	try {
		return fs.readFileSync(p, 'utf-8');
	} catch (e) {
		throw e;
	}
};

const watchClientBundle = callBack => {
	const config = require(path.resolve(__dirname, '../build/webpack-client-config.js'));
	const clientCompiler = webpack(config);

	const webpackDevMiddleware = require('webpack-dev-middleware')(clientCompiler, { publicPath: config.output.publicPath });
	const webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler, { heartbeat: 2000 });
	  
  	clientCompiler.plugin('done', stats => {
		stats = stats.toJson();
		const mfs = clientCompiler.outputFileSystem;
		const p = config.output.path + '/vue-ssr-client-manifest.json';
		const bundle = JSON.parse(readFile(mfs, p));
		callBack(bundle, mfs);
	});

	return {
		webpackDevMiddleware,
		webpackHotMiddleware
	};
};

const watchServerBundle = callBack => {
	const config = require(path.resolve(__dirname, '../build/webpack-server-config.js'));
	const compiler = webpack(config);
	const mfs = new MFS();
	compiler.outputFileSystem = mfs;
	compiler.watch({}, (err, stats) => {
		if (err) throw err;
		stats = stats.toJson();
		if (stats.errors.length) return;
		const p = config.output.path + '/vue-ssr-server-bundle.json';
		const bundle = JSON.parse(readFile(mfs, p));
		callBack(bundle, mfs);
	});
};

const watchNoSsrBundle = callBack => {
	const config = require(path.resolve(__dirname, '../build/webpack-no-ssr-config.js'));
	const compiler = webpack(config);
	const mfs = new MFS();
	compiler.outputFileSystem = mfs;
	compiler.watch({}, (err, stats) => {
		if (err) throw err;
		stats = stats.toJson();
		if (stats.errors.length) return;
		const p = config.output.path + '/index.html';
		const bundle = readFile(mfs, p);
		callBack(bundle, mfs);
	});
};

module.exports = function webpackHotUpdate(cb) {

	const {
		webpackDevMiddleware,
		webpackHotMiddleware
	} = watchClientBundle((clientBundle, mfs) => {
		cb({
			clientBundle,
			mfs
		});
	});

	watchServerBundle((serverBundle, mfs) => {
		cb({
			serverBundle,
			mfs
		});
	});

	watchNoSsrBundle((noSsrBundle, mfs) => {
		cb({
			noSsrBundle,
			mfs
		});
	})

	return {
		webpackDevMiddleware,
		webpackHotMiddleware
	};
};


