const path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
ESLintPlugin = require('eslint-webpack-plugin');
;
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
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader:'style-loader',
                        options:{
                             insert:'head',
                        }
					},
					{
						loader:'css-loader',
						options: {
							modules: true,
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader'
					}
					
				]
			},
            {
              test: /\/normalize.css$/,
			  use: [
				{
					loader:'style-loader',
					options:{
						insert:'head',
					}
				},
				{
					loader:'css-loader',
					options: {
						modules: true,
						importLoaders: 1
					}
				},
				{
					loader: 'postcss-loader'
				}
			  ]
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
