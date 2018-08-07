import 'babel-polyfill';
import './index.html';
import './styles.css';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import * as config from './config';

import Loading from './components/loading/loading.component';

import MainLayout from './layout/main.layout';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { prepared: true };
    }

    routes = () => {
        return (
            <Router>
                <Switch>
                    <Route path='/' component={MainLayout} />
                </Switch>
            </Router>
        );
    }

    render() {
        return (
            this.state.prepared ? (
                <div>
                    <Loading subject={config.components.loading.subject} />
                    {this.routes()}
                </div>
            ) : (
                    <div>
                        <Loading subject={config.components.loading.subject} />
                    </div>
                )
        );
    }
}

render(<App />, document.getElementById('app'));
