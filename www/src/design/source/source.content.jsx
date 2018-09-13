import React from 'react';

import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/message/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';

import { observable, subject } from '../../providers/subject.provider';
import * as api from '../../providers/api.provider';

import './source.content.scss';

const tips = {
    name: 'Type source name',
    driverClassName: 'Type source driver class name',
    url: 'Type source URL',
    username: 'Type source user name',
    password: 'Type source password',
    maxActive: 'Type source max active'
};

export default class SourceContent extends React.Component {

    componentWillMount() {
        this.subscription = observable(this.props.observable).subscribe(status => status.type == 'content.confirm' && this.store());
    }

    store() {
        let options = {
            name: this.refs.name.input.value,
            driverClassName: this.refs.driverClassName.input.value,
            url: this.refs.url.input.value,
            username: this.refs.username.input.value,
            password: this.refs.password.input.value,
            maxActive: this.refs.maxActive.input.value
        };
        if (this.valid(options)) {
            options.type = 1;
            api.exchange({ method: 'post', url: 'xde/sources/store', data: options, errorText: '服务请求失败' }).then(
                status => subject(this.props.subject).next({ type: 'content.store' })
            );
        }
    }

    valid(options) {
        for (var name in options) {
            if (!options[name]) {
                message.warning(tips[name]);
                return false;
            }
        }
        return true;
    }

    componentWillUnmount() {
        this.subscription && this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className="xql-design-content xql-design-source-content">
                <Row>
                    <Col span="24" className="xql-design-title">Create Source</Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        Name:
                    </Col>
                    <Col span="8">
                        <Input ref="name" placeholder={tips.name} />
                    </Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        Driver:
                    </Col>
                    <Col span="8">
                        <Input ref="driverClassName" placeholder={tips.driverClassName} />
                    </Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        URL:
                    </Col>
                    <Col span="8">
                        <Input ref="url" placeholder={tips.url} />
                    </Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        User Name:
                    </Col>
                    <Col span="8">
                        <Input ref="username" placeholder={tips.username} />
                    </Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        Password:
                    </Col>
                    <Col span="8">
                        <Input ref="password" type="password" placeholder={tips.password} />
                    </Col>
                </Row>
                <Row className="xql-design-form-group">
                    <Col span="8" className="xql-design-label">
                        Max Active:
                    </Col>
                    <Col span="8">
                        <Input ref="maxActive" placeholder={tips.maxActive} />
                    </Col>
                </Row>
            </div>
        );
    }
}
