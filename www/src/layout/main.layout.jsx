import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';

import Layout, { Content } from 'antd/lib/layout';
import 'antd/lib/layout/style/css';

import Header from '../header/header.component';
import Footer from '../footer/footer.component';

import QueryLayout from '../query/query.layout';
import DesignLayout from '../design/design.layout';

import './main.layout.scss';


export default class MainLayout extends Component {

    constructor(props) {
        super(props);
        (location.hash != '#/query' && location.hash != '#/design') && (location.hash = '#/query');
    }

    render() {
        return (
            <Layout>
                <Header hash={location.hash} />
                <Content>
                    <Route path='/query' component={QueryLayout} />
                    <Route path='/design' component={DesignLayout} />
                </Content>
                <Footer />
            </Layout>
        )
    }
}