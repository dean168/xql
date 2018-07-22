import React, { Component } from 'react';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { subject } from '../../../providers/subject.provider';

import './model.toolbar.scss';


export default class ModelToolbar extends Component {

    render() {
        return (
            <div className="xs-toolbar">
                <Icon type="table" onClick={() => subject(this.props.subject).next({ type: 'table' })} title="design table" />
            </div>
        )
    }
}