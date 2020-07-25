import React, {Component} from 'react';
import {Button, Table} from 'antd';
import {connect} from "react-redux";
import {renderData, renderItems} from "../../../store/actions/mainActions";

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
                title: 'Имя',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Телефон',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Информация',
                dataIndex: 'data',
                key: 'action',
                render: (text, record) => (
                    <Button onClick={() => this.goToUser(record.key)}>Показать</Button>
                ),
            },
        ];
        return (
            <div className={'ModerPanel'}>
                <div className="AdminPanel__header">
                    <p>Список пользователей</p>
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