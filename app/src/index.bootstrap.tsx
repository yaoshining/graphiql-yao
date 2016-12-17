/**
 * Created by yaoshining on 2016/12/17.
 */
import '../styles/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as GraphiQL from 'graphiql';
import * as fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {
    return fetch('http://localhost:3000' + '/graphql', {
        method: 'post',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
}

setTimeout(function () {
    ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById('main'));
}, 0);
