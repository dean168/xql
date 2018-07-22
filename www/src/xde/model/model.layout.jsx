import React, { Component } from 'react';

import { observable, subject } from '../../providers/subject.provider';
import Toolbar from './toolbar/model.toolbar';

import './model.layout.scss';


export default class ModelLayout extends Component {

    constructor(props) {
        super(props);
        this.options = { toolbar: { subject: props.subject + '_' + Math.random() } };
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
            <div>
                <Toolbar subject={this.options.toolbar.subject} />
            </div>
        )
    }
}