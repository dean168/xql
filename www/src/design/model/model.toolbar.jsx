import React, { Component } from 'react';

import Tooltip from 'antd/lib/tooltip';
import Button from 'antd/lib/button';

import 'antd/lib/button/style/css';
import 'antd/lib/tooltip/style/css';

import { subject } from '../../providers/subject.provider';

import './model.toolbar.scss';


export default class ModelToolbar extends Component {

    render() {
        return (
            <div className="xql-design-toolbar">
                <Tooltip placement="top" title="Design Table">
                    <Button shape="circle" onClick={() => subject(this.props.subject).next({ type: 'table' })} icon="table" />
                </Tooltip>
            </div>
        )
    }
}