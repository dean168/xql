import React, { Component } from 'react';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { subject } from '../../providers/subject.provider';

import './source.toolbar.scss';


export default class SourceToolbar extends Component {

    render() {
        let toolbar = undefined;
        if (this.props.mode == 'list') {
            toolbar = (
                <div className="xql-design-toolbar">
                    <Icon type="left-circle-o" onClick={() => subject(this.props.subject).next({ type: 'list.cancel' })} className="xql-design-but-icon" title="cancel" />
                    <Icon type="plus" onClick={() => subject(this.props.subject).next({ type: 'list.plus' })} className="xql-design-but-icon" title="add source" />
                    <Icon type="check-circle-o" onClick={() => subject(this.props.subject).next({ type: 'list.confirm' })} className="xql-design-but-icon" title="confirm selected" />
                </div>
            )
        } else if (this.props.mode == 'content') {
            toolbar = (
                <div className="xql-design-toolbar">
                    <Icon type="left-circle-o" onClick={() => subject(this.props.subject).next({ type: 'content.cancel' })} className="xql-design-but-icon" title="cancel" />
                    <Icon type="check-circle-o" onClick={() => subject(this.props.subject).next({ type: 'content.confirm' })} className="xql-design-but-icon" title="store source" />
                </div>
            )
        } else {
            throw 'undefined mode#' + this.props.mode;
        }
        return toolbar;
    }
}