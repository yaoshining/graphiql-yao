'use strict';
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(_path) {
    return {
        entry: {
            app: _path + '/app/src/index.bootstrap.tsx'
        },
        context: _path,
        debug: false,
        devtool: 'cheap-source-map',
        output: {
            path: 'dist',
            publicPath: '.',
            filename: '[name].js'
        },

        htmlLoader: {
            minimize: false
        },

        devServer: {
            outputPath: path.join(_path, 'dist')
        },
        plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: _path,
                verbose: true,
                dry: false
            })
        ]
    };
};