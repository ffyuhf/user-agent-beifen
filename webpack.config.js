var path = require('path'),
styleLoader = [
	{ loader:'style-loader', options:{ insert:'head', } },
	{ loader:'css-loader', options: { modules: {
		exportLocalsConvention: "camelCase"
	}, importLoaders: 1 } },
	{ loader: 'postcss-loader' }
],
HtmlWebpackPlugin = require('html-webpack-plugin')/*,
ESLintPlugin = require('eslint-webpack-plugin')*/;

module.exports = {
	mode: /*'development'*/'production',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: styleLoader
			},
			{
				test: /\/normalize.css$/,
				use: styleLoader
			},
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			inject:'body',
			hash: false,
			compile: true,
			minify: true,
		}),
// 		new ESLintPlugin({
// 			fix: true,
// 			extensions: ['js'],
// 			exclude: '/node_modules/'
// 		}),
	],
}
