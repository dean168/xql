import React, { Component } from 'react';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { subject } from '../../../providers/subject.provider';

import './table.toolbar.scss';


export default class TableToolbar extends Component {

    render() {
        return (
            <div className="xs-toolbar">
                <Icon type="database" onClick={() => subject(this.props.subject).next({ type: 'source' })} title="design source" />
            </div>
        )
    }
}