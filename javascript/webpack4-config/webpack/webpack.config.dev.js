/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpacks配置文件 dev环境配置，主要开启了debug,热更新，样式采用的style方式
 */

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CSS_BROWSERS = require('./postcss-browsers');



config.devtool = 'eval-source-map';//cheap-module-eval-source-map
config.mode='development';
config.module.rules[0].use[0].options.presets.push('react-hmre');

//dev开发环境 css/scss 以style 插入样式 ，mini-css-extract-plugin插件不支持热更新
config.module.rules.push({
	test: /\.(scss|css)$/,
	use: [
		'style-loader',
		"css-loader",
		{loader: 'postcss-loader',options:{
			plugins: [require('autoprefixer')({browsers: CSS_BROWSERS,}),],sourceMap: true}
		},
		'sass-loader',
		//'less-loader'  如果你的习惯是使用less ,需要添加一个loader
	]
});

config.plugins.push(new webpack.HotModuleReplacementPlugin()); //热更新
config.devServer = {
	host: '0.0.0.0',
	port: 9089,
	// publicPath:"/",
	historyApiFallback: {
			index: '/views/index.html'
	},
	compress: true,
	noInfo: true,
	inline: true,
	hot: true,
	stats: {
		colors: true,
		chunks: false
	}
};

module.exports = config;