'use strict';
var webpack = require('webpack');

module.exports = function(_path) {
    return {
        context: _path,
        debug: true,
        devtool: 'cheap-source-map',
        output: {
            publicPath: 'http://localhost:3000/'
        },
        devServer: {
            contentBase: './dist',
            info: true,
            hot: true,
            inline: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    };
};