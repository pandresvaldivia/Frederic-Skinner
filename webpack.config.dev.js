const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './js/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/bundle.[contenthash].js',
		assetModuleFilename: './assets/images/[name][contenthash][ext]',
	},
	devtool: 'source-map',
	mode: 'development',
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|webp|svg)$/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: './assets/fonts/[name][contenthash][ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			filename: './index.html',
			template: '../public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: './styles/[name].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'assets/images'),
					to: 'assets/images',
				},
				{
					from: path.resolve(__dirname, 'src', 'assets/favicon'),
					to: 'assets/favicon',
				},
			],
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		historyApiFallback: true,
		compress: true,
		port: 9000,
	},
};
