var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					// vue-loader options go here
				}
			}, {
				test: /\.css/,
				loaders: [
					'style', 'css'
				],
				exclude: /node_modules/
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file?name=public/fonts/[name].[ext]'
			}, {
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue',
			'masonry': 'masonry-layout',
			'isotope': 'isotope-layout'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	devtool: '#eval-source-map',
	resolveLoader: {
		moduleExtensions: ['-loader']
	},
	plugins: [
		new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"})
	]
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({minimize: true})
	])
}
