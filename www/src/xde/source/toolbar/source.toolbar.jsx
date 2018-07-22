import React, { Component } from 'react';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { subject } from '../../../providers/subject.provider';

import './source.toolbar.scss';


export default class SourceToolbar extends Component {

    render() {
        return (
            <div className="xs-toolbar">
                <Icon type="plus" onClick={() => subject(this.props.subject).next({ type: 'plus' })} title="add datasource" />
            </div>
        )
    }
}