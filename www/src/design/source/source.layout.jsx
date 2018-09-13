import React, { Component } from 'react';

import { observable, subject } from '../../providers/subject.provider';
import Toolbar from './source.toolbar';
import List from './source.list';
import Content from './source.content';

import './source.layout.scss';


export default class SourceLayout extends Component {

    constructor(props) {
        super(props);
        this.state = { mode: 'list' };
        this.options = {
            toolbar: { subject: props.subject + '_toolbar_' + Math.random() },
            list: { subject: props.subject + '_list_' + Math.random() },
            content: { subject: props.subject + '_content_' + Math.random() }
        };
    }

    componentWillMount() {
        this.options.toolbar.subscription = observable(this.options.toolbar.subject).subscribe(status => this.subscribe(this.options.toolbar.subject, status));
        this.options.list.subscription = observable(this.options.list.subject).subscribe(status => this.subscribe(this.options.list.subject, status));
        this.options.content.subscription = observable(this.options.content.subject).subscribe(status => this.subscribe(this.options.content.subject, status));
    }

    subscribe(type, status) {
        if (type == this.options.toolbar.subject) {
            if (status.type == 'list.plus') {
                this.setState({ mode: 'content' });
            } else if (status.type == 'list.confirm') {
                subject(this.props.subject).next({ type: 'confirm', source: this.options.selected });
            } else if (status.type == 'list.cancel') {
                subject(this.props.subject).next({ type: 'cancel', source: {} });
            } else if (status.type == 'content.cancel') {
                this.setState({ mode: 'list' });
            }
        } else if (type == this.options.list.subject) {
            if (status.type == 'list.selected') {
                this.options.selected = status.selected;
                console.log(this.options.selected)
            } else {
                throw 'undefined type#' + status.type;
            }
        } else if (type == this.options.content.subject) {
            if (status.type == 'content.store') {
                this.setState({ mode: 'list' });
            } else {
                throw 'undefined type#' + status.type;
            }
        } else {
            throw 'undefined type#' + type;
        }
    }

    componentWillUnmount() {
        this.options.toolbar.subscription && this.options.toolbar.subscription.unsubscribe();
        this.options.list.subscription && this.options.list.subscription.unsubscribe();
        this.options.content.subscription && this.options.content.subscription.unsubscribe();
    }

    render() {
        let body = undefined;
        if (this.state.mode == 'list') {
            body = (<List subject={this.options.list.subject} />);
        } else if (this.state.mode == 'content') {
            body = (<Content observable={this.options.toolbar.subject} subject={this.options.content.subject} />);
        } else {
            throw 'undefined mode#' + this.state.mode;
        }
        return (
            <div className="xql-design-source-layout">
                <Toolbar mode={this.state.mode} subject={this.options.toolbar.subject} />
                {body}
            </div>
        )
    }
}