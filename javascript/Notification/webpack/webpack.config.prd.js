/*
 * @authors :su south
 * @date    :2018-11-16
 * @description： webpacks配置文件 生产环境配置，，样式采用的mini-css-extract-plugin按需加载link
 */

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base');
var HtmlWebPackPlugin = require('html-webpack-plugin')
// var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var PreloadWebpackPlugin = require('preload-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var package = require('../package.json');
var CSS_BROWSERS = require('./postcss-browsers');


config.mode = "production";
config.optimization.minimize=false;
config.optimization.minimizer= [
	new UglifyJsPlugin({
		cache: true,
		parallel: true, //也可以指定 Number ,即最多并行运行数量
		sourceMap: true,
		uglifyOptions: {
			output: {
				comments: false,
			},
			compress: {
				warnings: false,
				drop_console:true,
			}
		},
	}),
];
config.module.rules.push({
	test: /\.(scss|css)$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: { minimize: true }
			},
			"css-loader?importLoaders=1",
			{
				loader: 'postcss-loader',
				options: {
					plugins: [
						require('autoprefixer')({
							browsers: CSS_BROWSERS,
						}),
					],
					minimize: true
				},
			},
			"sass-loader"
		]
})

config.plugins.push(new MiniCssExtractPlugin({
	filename: 'css/[name].css',
	chunkFilename: 'css/[id][chunkhash:8].css',
}));

config.plugins.push(new OptimizeCssAssetsPlugin({canPrint: false}));
config.plugins.push(new webpack.BannerPlugin(' \n @item:苏南的项目 \n @author:suSouth \n @date:'+new Date()+' \n @description:苏南正在编写的demo,QQ:912594095 \n @version:'+package.version+'  \n'));



config.plugins.push(new HtmlWebPackPlugin({
	filename: path.resolve(__dirname, '../assets/index.html'), //输出
	minify:{ //压缩HTML文件　
	removeComments:true, //移除HTML中的注释 
	collapseWhitespace:true //删除空白符与换行符
},
	template: path.resolve(__dirname,"../views/temp.html"),//输入
	// inlineSource:  '.(js|css)',// 插入到html的css、js文件都要内联
	// inject: false //是否能注入内容到 输出 的页面去
}));
config.plugins.push(new PreloadWebpackPlugin({
	rel: 'prefetch',
	as: 'script',
	// as(entry) {
	//   if (/\.css$/.test(entry)) return 'style';
	//   if (/\.woff$/.test(entry)) return 'font';
	//   if (/\.png$/.test(entry)) return 'image';
	//   return 'script';
	// },
	include: 'asyncChunks',
	fileBlacklist: [/\index.css|index.js|vendors.js/, /\.whatever/]
}))
config.plugins.push(new BundleAnalyzerPlugin());

 //复制文件
config.plugins.push(new CopyWebpackPlugin([
	 {
			from : path.resolve(__dirname, '../src/json'),//定义要拷贝的源目录   __dirname + ‘/src/public’
			to : path.resolve(__dirname, '../assets/json'),//定义要拷贝的目标目录  __dirname + ‘/dist’
		//  toType : 'dir'//file 或者 dir , 可选，默认是文件
		//  force : 强制覆盖先前的插件 , 可选 默认false
		//  context : 不知道作用 , 可选 默认 base context 可用 specific context
		//  flatten :只拷贝文件不管文件夹 , 默认是false
		//  ignore : 忽略拷贝指定的文件 ,可以用模糊匹配
	}
]));
module.exports = config;
