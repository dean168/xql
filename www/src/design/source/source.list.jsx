import React, { Component } from 'react';

import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';

import { subject } from '../../providers/subject.provider';
import * as api from '../../providers/api.provider';

import './source.list.scss';

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
    title: 'User Name',
    dataIndex: 'username',
}, {
    title: 'Password',
    dataIndex: 'password',
}, {
    title: 'Max Active',
    dataIndex: 'maxActive',
}];

export default class SourceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            pagination: { current: 1, pageSize: 10, onChange: this.changePagination },
            loading: false
        };
    }

    componentDidMount = () => { this.reload() };

    reload() {
        this.setState({ loading: true });
        api.exchange({
            method: 'post',
            url: 'xde/sources/list',
            data: {
                offset: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
                limit: this.state.pagination.pageSize
            },
            errorText: '服务请求失败',
            animate: false
        }).then(
            status => {
                for (var i = 0; i < status.result.length; i++) {
                    status.result[i].key = status.result[i].id;
                }
                this.setState({ data: status.result, pagination: { total: status.total }, loading: false });
            }
        );
    }

    selectedRows = (selectedRowKeys) => {
        this.setState({ selectedRowKeys: selectedRowKeys.length > 0 ? [selectedRowKeys[selectedRowKeys.length - 1]] : [] });
        subject(this.props.subject).next({ type: 'list.selected', selected: this.selectedByKey(selectedRowKeys) })
    }

    selectedByKey(selectedRowKeys) {
        if (selectedRowKeys.length == 0) {
            return {};
        }
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].key == selectedRowKeys[0]) {
                return this.state.data[i];
            }
        }
        return {};
    }

    changePagination = (current, pageSize) => {
        this.setState({ pagination: { current, pageSize } });
        this.reload();
    }

    render() {
        return (
            <div className="xql-design-content xql-design-source-list">
                <Table rowSelection={{ selectedRowKeys: this.state.selectedRowKeys, onChange: this.selectedRows }} columns={columns} dataSource={this.state.data} pagination={this.state.pagination} loading={this.state.loading} />
            </div>
        )
    }
}