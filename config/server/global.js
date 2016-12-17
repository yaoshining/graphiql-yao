'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_DEV = process.env.NODE_ENV || 'production';
const DEVELOPMENT = NODE_DEV !== 'production';
const sassLoader = 'css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true';
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = function(_path) {


    var webpackConfig = {

        entry: {
            app: [_path + '/app/src/index.bootstrap.tsx', hotMiddlewareScript]
        },

        output: {
            path: path.join(_path, 'dist'),
            filename: '[name].js',
            publicPath: '/'
        },

        resolve: {
            extensions: ['', '.ts', '.tsx', '.js'],
            modulesDirectories: ['node_modules', 'bower_components'],
            alias: {
                _appRoot:     path.join(_path, 'app', 'src'),
                _images:      path.join(_path, 'app', 'assets', 'images'),
                _stylesheets: path.join(_path, 'app', 'assets', 'styles')
            }
        },

        module: {
            loaders: [{
                test: /\.(ts|tsx)$/,
                exclude: [
                    path.resolve(_path, 'node_modules'),
                    path.resolve(_path, 'bower_components')
                ],
                loader: 'ts',
                query: {
                    cacheDirectory: true
                }
            }, {
                test: /\.(scss|sass)$/,
                loader: DEVELOPMENT ? ('style!' + sassLoader) : ExtractTextPlugin.extract('style', sassLoader)
            }, {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    "url?name=assets/fonts/[name]_[hash].[ext]"
                ]
            }, {
                test: /\.(png|jpe?g|svg|gif|ico)$/,
                loaders: [
                    'url?name=assets/images/[name].[hash].[ext]&limit=10000'
                ]
            }]
        },

        postcss: [autoprefixer({ browsers: ['last 5 versions'] })],

        plugins: [
            new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
            ),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['app']
            }),
            new ExtractTextPlugin('assets/styles/[name]' + (DEVELOPMENT ? '' : '.[chunkhash]') + '.css', { allChunks: true }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(_path, 'app', 'tpl-index.html'),
                chunksSortMode: function(a, b) {
                    var orders = ['app'];
                    if(orders.indexOf(a.names[0]) > orders.indexOf(b.names[0])) {
                        return 1;
                    } else if(orders.indexOf(a.names[0]) < orders.indexOf(b.names[0])) {
                        return -1;
                    }
                    return 0;
                }
            })
        ]
    };

    return webpackConfig;
};