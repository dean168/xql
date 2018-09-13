import React, { Component } from 'react';

import Tooltip from 'antd/lib/tooltip';
import Button from 'antd/lib/button';

import 'antd/lib/button/style/css';
import 'antd/lib/tooltip/style/css';

import { subject } from '../providers/subject.provider';

import './design.toolbar.scss';


export default class DesignToolbar extends Component {

    render() {
        return (
            <div className="xql-design-toolbar">
                <Tooltip placement="top" title="Design Model">
                    <Button shape="circle" onClick={() => subject(this.props.subject).next({ type: 'model' })} icon="appstore" />
                </Tooltip>
            </div>
        )
    }
}