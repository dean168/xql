import React, { Component } from 'react';

import { observable, subject } from '../../providers/subject.provider';
import Toolbar from './model.toolbar';
import Content from './model.content';

import './model.layout.scss';


export default class ModelLayout extends Component {

    constructor(props) {
        super(props);
        this.options = {
            toolbar: { subject: props.subject + '_toolbar_' + Math.random() },
            content: { subject: props.subject + '_content_' + Math.random() }
        };
    }

    componentWillMount() {
        this.options.toolbar.subscription = observable(this.options.toolbar.subject).subscribe(status => this.subscribe(this.options.toolbar.subject, status));
    }

    subscribe(type, status) {
        if (type == this.options.toolbar.subject) {
            subject(this.props.subject).next({ type: 'toolbar', options: status });
        }
    }

    componentWillUnmount() {
        this.options.toolbar.subscription && this.options.toolbar.subscription.unsubscribe();
    }

    render() {
        return (
            <div className="xql-design-model-layout">
                <Toolbar subject={this.options.toolbar.subject} />
                <Content observable={this.options.toolbar.subject} subject={this.options.content.subject} />
            </div>
        )
    }
}