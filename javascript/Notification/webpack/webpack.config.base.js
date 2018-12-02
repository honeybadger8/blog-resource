/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpacks配置文件 共用base
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CSS_BROWSERS = require('./postcss-browsers');
var path = require('path');

var babelConfig = {
	presets: [
		['env', {
			modules: false,
			targets: {
				browsers: CSS_BROWSERS,
			},
		}],
		'react',
		'stage-3',
		'es2015', 'stage-0'
	],
	plugins: [
		'transform-runtime',
		'add-module-exports',
		"transform-async-to-generator",
		"transform-decorators-legacy",
		"syntax-dynamic-import",
	],
};

var config = {

	entry: {
		index: ['./src/root.js'],
		vendors : ['react','react-dom','redux','react-router','classnames'],
	},
	devtool:false,
	mode : 'development',
	optimization: {
		minimize:false,
		namedModules: false,
		// runtimeChunk: true,
		removeEmptyChunks:true,
		splitChunks: {
			chunks: "async",
			maxInitialRequests:2,
			
		}
	},
	output: {
		path: path.resolve(__dirname, '../assets'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[chunkhash:8].js',
		publicPath: '/_tools_static_/',
	},
	resolve: {
		extensions: ['.js', '.jsx','.ts','.tsx', '.scss','.json','.css'],
		alias: {
			src :path.resolve(__dirname, '../src'),
		},
		modules: ['node_modules'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelConfig
					}
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader?limit=12&name=images/[name].[hash:8].[ext]',
					},
				],
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
						/*options:{ //也可以拆分来写
							publicPath:'fonts',
							name:'[name].[hash:8].[ext]'
						}*/
					},
				],
			},
		],
	},
	
	plugins: [
		new webpack.NoEmitOnErrorsPlugin()
	],
}


module.exports = config;