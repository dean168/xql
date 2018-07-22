import React, { Component } from 'react';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';
const { Footer } = Layout;

import './footer.component.scss';


export default class FooterComponent extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                XQL ©2018 Created by Dean
            </Footer>
        )
    }
}