import React, { Component } from 'react';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';
const { Header } = Layout;

import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';

import './header.component.scss';


export default class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { hash: props.hash };
    }

    click = (e) => {
        if (this.state.hash != e.key) {
            this.setState({ hash: e.key });
            location.hash = e.key;
        }
    }

    render() {
        return (
            <Header>
                <div className="xs-logo" />
                <Menu theme="dark" mode="horizontal" onClick={this.click} selectedKeys={[this.state.hash]} className="xs-menu">
                    <Menu.Item key="#/query">Query</Menu.Item>
                    <Menu.Item key="#/xde">XDE</Menu.Item>
                </Menu>
            </Header>
        )
    }
}