import React, { Component } from 'react';

import { observable, subject } from '../../providers/subject.provider';
import Toolbar from './toolbar/source.toolbar';
import Content from './content/source.content';

import './source.layout.scss';


export default class SourceLayout extends Component {

    constructor(props) {
        super(props);
        this.options = { toolbar: { subject: props.subject + '_' + Math.random() } };
    }

    componentWillMount() {
        this.options.toolbar.subscription = observable(this.options.toolbar.subject).subscribe(status => this.subscribe(this.options.toolbar.subject, status));
    }

    subscribe(type, status) {
        if (type == this.options.toolbar.subject) {
            if (status.type == 'plus') {
            } else {
                subject(this.props.subject).next({ type: 'toolbar', options: status });
            }
        }
    }

    componentWillUnmount() {
        this.options.toolbar.subscription && this.options.toolbar.subscription.unsubscribe();
    }

    render() {
        return (
            <div>
                <Toolbar subject={this.options.toolbar.subject} />
                <Content />
            </div>
        )
    }
}