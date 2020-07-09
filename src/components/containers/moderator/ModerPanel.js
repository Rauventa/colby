import React, {Component} from 'react';
import {Table} from 'antd';
import {connect} from "react-redux";
import {renderData, renderItems} from "../../../store/actions/mainActions";
import {Button} from "react-bootstrap";

class ModerPanel extends Component {


    render() {
        const data = [
            {
                name: 'Alex Alecto',
                email: 'rauventa@gmail.com',
                phone: '89155337655',
                address: 'Moscow, Rizsky st. 15'
            }
        ];
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Data',
                dataIndex: 'data',
                key: 'action',
                render: (text, record) => (
                    <Button type={'primary'} onClick={() => this.goToUser(record.key)}>Show</Button>
                ),
            },
        ];
        return (
            <div className={'ModerPanel'}>
                <div className="AdminPanel__header">
                    <p>Users list</p>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.mainReducer.items,
        personId: state.mainReducer.personId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems()),
        renderData: () => dispatch(renderData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModerPanel);