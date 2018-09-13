import React from 'react';

import $ from 'jquery';

import message from 'antd/lib/message';
import Tooltip from 'antd/lib/tooltip';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import 'antd/lib/message/style/css';
import 'antd/lib/tooltip/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';

const { TextArea } = Input;

import MaskComponent from '../components/mask/mask.component';

import { observable, subject, next } from '../providers/subject.provider';
import * as api from '../providers/api.provider';

import './design.content.scss';

const defaultOptions = {
    model: {},
    columns: [{ name: 'Column 1', exprs: '' }],
    filter: '',
    sort: '',
    offset: 0,
    limit: 20
};

export default class DesignContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: { visible: false } };
        this.options = {};
        if (this.props.designId) {
            // TODO
        } else {
            this.options.meta = defaultOptions;
            this.options.data = { result: [] };
        }
    }

    colconfig(options) {
        this.setState({ detail: { visible: true, offset: options.offset } });
    }

    colstore(event) {
        if (event.type == 'store') {
            $.extend(this.options.meta.columns[this.state.detail.offset], event.options);
        } else if (event.type == 'cancel') {
        } else if (event.type == 'delete') {
            this.options.meta.columns.splice(this.state.detail.offset, 1);
        } else {
            throw 'undefined event type#' + event.type;
        }
        this.setState({ detail: { visible: false } });
    }

    colcreate(options) {
        this.options.meta.columns.push({ name: 'Column ' + (options.offset + 1), exprs: '' });
        this.setState({ detail: { visible: true, offset: options.offset } });
    }

    unmask(event) {
        if (this.state.detail.visible) {
            this.colstore({ type: 'cancel' });
        } else {
            throw 'undefined unmask event type#' + event.type;
        }
    }

    render() {
        let columns = [];
        for (let i = 0; this.options.meta && i < this.options.meta.columns.length; i++) {
            columns.push(<ColContent key={i} config={this.colconfig.bind(this)} options={{ meta: this.options.meta.columns[i], data: this.options.data.result, offset: i, width: 8 }} />)
        }
        let idx = this.options.meta ? this.options.meta.columns.length : 0;
        columns.push(<ColPlus key={idx} create={this.colcreate.bind(this)} options={{ offset: idx, width: 8 }} />);
        return (
            <div className="xql-design-content">
                {columns}
                <MaskComponent visible={this.state.detail.visible} subject={this.unmask.bind(this)} />
                {this.state.detail.visible ? <ColDetail options={this.options.meta.columns[this.state.detail.offset]} subject={this.colstore.bind(this)} /> : undefined}
            </div>
        );
    }
}

class ColContent extends React.Component {
    render() {
        return (
            <div onClick={() => this.props.config({ offset: this.props.options.offset })} className="xql-design-column" style={{ 'width': this.props.options.width + 'rem', 'left': (this.props.options.offset * this.props.options.width) + 'rem' }}>
                <Tooltip placement="top" title={this.props.options.meta.name + (this.props.options.meta.exprs ? ': ' + this.props.options.meta.exprs : '')}>
                    <div className="bc-text-ellipsis xql-design-header">{this.props.options.meta.name}</div>
                </Tooltip>
            </div>
        )
    }
}

class ColPlus extends React.Component {
    render() {
        return (
            <div className="xql-design-column xql-design-plus" style={{ 'width': this.props.options.width + 'rem', 'left': (this.props.options.offset * this.props.options.width) + 'rem' }}>
                <div className="xql-design-header">
                    <Tooltip placement="top" title="Add Column">
                        <Button shape="circle" onClick={() => this.props.create({ offset: this.props.options.offset })} icon="plus" size="small" />
                    </Tooltip>
                </div>
            </div>
        )
    }
}

const cdtips = {
    name: 'Type column name',
    exprs: 'Type column exprs'
};

class ColDetail extends React.Component {

    valid(callback) {
        let options = {
            name: this.refs.name.input.value,
            exprs: this.refs.exprs.textAreaRef.value
        };
        for (var name in options) {
            if (!options[name]) {
                message.warning(cdtips[name]);
                return false;
            }
        }
        callback(options);
    }

    render() {
        return (
            <div className="xql-design-col-detail">
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        Name:
                    </Col>
                    <Col span="8">
                        <Input ref="name" placeholder={cdtips.name} defaultValue={this.props.options.name} />
                    </Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        Exprs:
                    </Col>
                    <Col span="8">
                        <TextArea ref="exprs" placeholder={cdtips.exprs} rows={6} defaultValue={this.props.options.exprs} />
                    </Col>
                </Row>
                <div className="xql-design-btn xql-design-btn-left">
                    <Tooltip placement="top" title="Cancel">
                        <Button shape="circle" onClick={() => next(this.props.subject, { type: 'cancel' })} icon="left" size="small" />
                    </Tooltip>
                </div>
                <div className="xql-design-btn xql-design-btn-check">
                    <Tooltip placement="top" title="Confirm">
                        <Button shape="circle" onClick={() => this.valid((options) => next(this.props.subject, { type: 'store', options }))} icon="check" size="small" />
                    </Tooltip>
                </div>
                <div className="xql-design-btn xql-design-btn-delete">
                    <Tooltip placement="top" title="Delete">
                        <Button shape="circle" onClick={() => next(this.props.subject, { type: 'delete' })} icon="delete" size="small" type="danger" />
                    </Tooltip>
                </div>
            </div>
        )
    }
}