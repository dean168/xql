import 'babel-polyfill';
import './index.html';
import './styles.css';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import * as config from './config';

import LoadingComponent from './components/loading/loading.component';

import MainLayout from './layout/main.layout';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { prepared: true };
    }

    routes = () => {
        return this.state.prepared ? (
            <Router>
                <Switch>
                    <Route path='/' component={MainLayout} />
                </Switch>
            </Router>
        ) : undefined;
    }

    render() {
        return (
            <div>
                {this.routes()}
                <LoadingComponent observable={config.components.loading.observable} />
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
