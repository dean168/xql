import React, { Component } from 'react';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { subject } from '../../../providers/subject.provider';

import './design.toolbar.scss';


export default class DesignToolbar extends Component {

    render() {
        return (
            <div className="xs-toolbar">
                <Icon type="appstore" onClick={() => subject(this.props.subject).next({ type: 'model' })} title="design model" />
            </div>
        )
    }
}