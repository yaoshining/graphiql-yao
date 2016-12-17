/**
 * Created by yaoshining on 2016/12/17.
 */
/**
 * Created by yaoshining on 2016/12/6.
 */
'use strict';
const webpackMerge = require('webpack-merge');


var _configs = {

    global: require(__dirname + '/config/server/global'),

    production: require(__dirname + '/config/server/env/production'),
    development: require(__dirname + '/config/server/env/development')
};

var _load = function () {
    var ENV = process.env.NODE_ENV
        ? process.env.NODE_ENV
        : 'production';

    return _configs && webpackMerge(
            _configs.global(__dirname),
            _configs[ENV](__dirname)
        );
};

module.exports = _load();