import React, { Component } from 'react';

import { topping } from '../components/topping/topping.component';

import DesignLayout from './design/design.layout';
import ModelLayout from './model/model.layout';
import TableLayout from './table/table.layout';
import SourceLayout from './source/source.layout';

import { observable } from '../providers/subject.provider';


import './xde.layout.scss';


@topping
export default class XDELayout extends Component {

    constructor(props) {
        super(props);
        this.state = { mode: 'design' };
        this.options = { design: {}, model: {}, table: {}, source: {} };
    }

    componentWillMount() {
        this.options.design.subscription = observable(this.props.design.subject).subscribe(status => this.subscribe(this.props.design.subject, status));
        this.options.model.subscription = observable(this.props.model.subject).subscribe(status => this.subscribe(this.props.model.subject, status));
        this.options.table.subscription = observable(this.props.table.subject).subscribe(status => this.subscribe(this.props.table.subject, status));
        this.options.source.subscription = observable(this.props.source.subject).subscribe(status => this.subscribe(this.props.source.subject, status));
    }

    subscribe(subject, status) {
        if (subject == this.props.design.subject) {
            if (status.type == 'toolbar') {
                this.setState({ mode: status.options.type });
            }
        } else if (subject == this.props.model.subject) {
            if (status.type == 'toolbar') {
                this.setState({ mode: status.options.type });
            }
        } else if (subject == this.props.table.subject) {
            if (status.type == 'toolbar') {
                this.setState({ mode: status.options.type });
            }
        } else if (subject == this.props.source.subject) {
            if (status.type == 'toolbar') {
                this.setState({ mode: status.options.type });
            }
        }
    }

    componentWillUnmount() {
        this.options.design.subscription && this.options.design.subscription.unsubscribe();
        this.options.model.subscription && this.options.model.subscription.unsubscribe();
        this.options.table.subscription && this.options.table.subscription.unsubscribe();
        this.options.source.subscription && this.options.source.subscription.unsubscribe();
    }

    render() {
        if (this.state.mode == 'design') {
            return <DesignLayout subject={this.props.design.subject} />
        } else if (this.state.mode == 'model') {
            return <ModelLayout subject={this.props.model.subject} />
        } else if (this.state.mode == 'table') {
            return <TableLayout subject={this.props.table.subject} />
        } else if (this.state.mode == 'source') {
            return <SourceLayout subject={this.props.source.subject} />
        }
    }
}

XDELayout.defaultProps = {
    design: { subject: 'xde.design.subject' },
    model: { subject: 'xde.model.subject' },
    table: { subject: 'xde.table.subject' },
    source: { subject: 'xde.source.subject' }
};