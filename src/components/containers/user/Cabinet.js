import React, {Component} from 'react';
import {Badge, Descriptions, Button} from "antd";
import {connect} from "react-redux";
import {logout} from "../../../store/actions/authActions";
import {renderData} from "../../../store/actions/mainActions";
import {NavLink, withRouter} from "react-router-dom";
import {Form, Modal, Col} from "react-bootstrap";
import axios from 'axios';

class Cabinet extends Component {

    state = {
        showModal: false,
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
    };

    componentDidMount() {
      this.props.renderData();
    };

    logoutHandler = () => {
        this.props.logout();
        this.props.history.push("/login");
    };

    closeModal = () => {
        this.setState({showModal: false})
    };

    openModal = () => {
        this.setState({showModal: true})
    };

    setName = event => {
        this.setState({name: event.target.value})
    };
    setSurname = event => {
        this.setState({surname: event.target.value})
    };
    setEmail = event => {
        this.setState({email: event.target.value})
    };
    setPhone = event => {
        this.setState({phone: event.target.value})
    };
    setAddress = event => {
        this.setState({address: event.target.value})
    };

    editHandler = async event => {
        event.preventDefault();
        try {
            await axios.put(`https://colby-16cd8.firebaseio.com/persons/${localStorage.userId}/${this.props.personId}.json`, {
                name: this.state.name || this.props.personData.name,
                surname: this.state.surname || this.props.personData.surname,
                email: this.state.email || this.props.personData.email,
                phone: this.state.phone || this.props.personData.phone,
                address: this.state.address || this.props.personData.address,
            });
            this.setState({showModal: false});
            this.props.renderData();
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const validate =
            (((this.state.name === '')
                || (this.state.surname === '')
                || (this.state.email === '')
                || (this.state.phone === '')
                || (this.state.address === ''))
                && ((this.props.personData.name === '')
                    || (this.props.personData.surname === '')
                    || (this.props.personData.email === '')
                    || (this.props.personData.phone === '')
                    || (this.props.personData.address === '')));
        return (
            <div className={'Cabinet'}>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать карточку</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" defaultValue={this.props.personData.name} placeholder="Name" onChange={this.setName} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="surname">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" defaultValue={this.props.personData.surname} placeholder="Surname" onChange={this.setSurname} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={this.props.personData.email} placeholder="Email" onChange={this.setEmail} />
                            </Form.Group>

                            <Form.Group controlId="tel">
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="tel" defaultValue={this.props.personData.phone} placeholder="Phone" onChange={this.setPhone} />
                            </Form.Group>

                            <Form.Group controlId="address">
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control type="email" defaultValue={this.props.personData.address} placeholder="Address" onChange={this.setAddress} />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Закрыть
                        </Button>
                        {validate ?
                            <Button variant="primary" disabled>Сохранить изменения</Button> :
                            <Button variant="primary" onClick={this.editHandler}>Сохранить изменения</Button>
                        }
                    </Modal.Footer>
                </Modal>

                <div className="Cabinet__header">
                    <h5>Кабинет пользователя</h5>
                    <div>
                        <NavLink to={'/catalog'} style={{marginRight: '1rem', fontSize: '14px'}}>В каталог</NavLink>
                        <Button type={'primary'} style={{marginRight: '1rem'}} onClick={this.openModal}><i className="fa fa-pen"/></Button>
                        <Button type={'danger'} onClick={this.logoutHandler}>Выйти</Button>
                    </div>
                </div>
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Имя">{this.props.personData.name + ' ' + this.props.personData.surname}</Descriptions.Item>
                    <Descriptions.Item label="Email">{this.props.personData.email}</Descriptions.Item>
                    <Descriptions.Item label="Телефон">{this.props.personData.phone}</Descriptions.Item>
                    <Descriptions.Item label="Адрес" span={2}>{this.props.personData.address}</Descriptions.Item>
                    <Descriptions.Item label="Статус" span={4}>
                        <Badge status="processing" text="Online" color={'green'} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Заказы">
                        {this.props.orders.map((order, index) => {
                            if (this.props.orders.length !== 0) {
                                return (
                                    <div key={order+index} className={'card'} style={{padding: '1rem', marginBottom: '1rem'}}>
                                        <p><b>ID:</b> {order.orderId}</p>
                                        <p><b>Цена:</b> {order.totalPrice}$</p>
                                        {order.orderData.map((item, index) => {
                                            return (
                                                <div key={item+index} style={{paddingLeft: '1rem'}}>
                                                    <p><b>Товар: {index+1}</b></p>
                                                    <p>{item.name}, {item.color} цвет, {item.type}, {item.size} размера.</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            } else {
                                return (
                                    <p>Пока нет заказов</p>
                                )
                            }
                        })}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        personId: state.mainReducer.personId,
        personData: state.mainReducer.personData,
        orders: state.mainReducer.orders
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        renderData: () => dispatch(renderData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cabinet));