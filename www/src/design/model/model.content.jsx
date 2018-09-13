import React from 'react';

import $ from 'jquery';

import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import 'antd/lib/message/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';

const { Option } = Select;

import MaskComponent from '../../components/mask/mask.component';

import { observable, subject, next } from '../../providers/subject.provider';
import * as api from '../../providers/api.provider';

import './model.content.scss';

export default class ModelContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: { visible: false } };
        this.options = {};
        if (this.props.designId) {
            // TODO
        } else {
        }
    }

    unmask(event) {
        if (this.state.detail.visible) {
            this.colstore({ type: 'cancel' });
        } else {
            throw 'undefined unmask event type#' + event.type;
        }
    }

    render() {
        return (
            <div className="xql-design-content xql-design-model-content">
                <TablesPanel />
                <RelationsPanel />
                <MaskComponent visible={this.state.detail.visible} subject={this.unmask.bind(this)} />
            </div>
        );
    }
}

class TablesPanel extends React.Component {
    render() {
        return (
            <div className="xql-design-tables-panel">
                <Select>
                    <Option value="rmb">RMB</Option>
                    <Option value="dollar">Dollar</Option>
                </Select>
            </div>
        )
    }
}

class RelationsPanel extends React.Component {
    render() {
        return (
            <div className="xql-design-relations-panel">
                relations-panel
            </div>
        )
    }
}