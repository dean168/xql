import React, { Component } from 'react';

import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';

import { subject } from '../../../providers/subject.provider';
import * as api from '../../../providers/api.provider';

import './source.content.scss';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Driver',
    dataIndex: 'driverClassName',
}, {
    title: 'URL',
    dataIndex: 'url',
}, {
    title: 'User',
    dataIndex: 'username',
}, {
    title: 'Password',
    dataIndex: 'password',
}, {
    title: 'Max Active',
    dataIndex: 'maxActive',
}];

export default class SourceContent extends Component {

    state = {
        table: {
            selectedRowKeys: [],
            loading: false
        }
    };

    componentDidMount() {
        api.exchange({ method: 'post', url: 'xde/sources/list', data: { offset: 0, limit: 20 }, errorText: '服务请求失败' }).then(
            status => console.log('status: ', status),
            error => console.log('error: ', error)
        );
    }

    selectedRows = (selectedRowKeys) => {
    }

    render() {
        return (
            <div className="xs-content">
                <Table rowSelection={{ selectedRowKeys: this.state.table.selectedRowKeys, onChange: this.selectedRows }} columns={columns} dataSource={this.state.table.data} loading={this.state.table.loading} />
            </div>
        )
    }
}