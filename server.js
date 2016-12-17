/**
 * Created by yaoshining on 2016/12/17.
 */
const ENV = process.env.NODE_ENV;

const express = require('express');
const bodyParser = require('body-parser');
const {apolloExpress, graphiqlExpress} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');

const port = 3000;
const app = express();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./server.config');

const compiler = webpack(webpackConfig);

if(ENV !== 'production') {
    app.use(webpackDevMiddleware(compiler, {
        noInfo: false
    }));

    const hotMiddleware = require("webpack-hot-middleware")(compiler);

    app.use(hotMiddleware);

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' });
            cb();
        })
    });

}

const typeDefs = [`
type Query {
    hello: String
}

schema {
    query: Query
}
`];

const resolvers = {
    Query: {
        hello(root) {
            return 'world';
        }
    }
};

const schema = makeExecutableSchema({typeDefs, resolvers});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/test', (req, res) => {
    res.json({name: 'yaoshining'});
});

app.use('/graphql', bodyParser.json(), apolloExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});