import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {userAuth} from "../../../store/actions/authActions";
import {Alert} from "antd";

class Registration extends Component {

    state = {
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: ''
    };


    registerHandler = (event) => {
        event.preventDefault();
        this.props.userAuth(
            this.state.email,
            this.state.password,
            false,
            this.state.name,
            this.state.surname
        );
    };

    setNameHandler = event => {
        const data = event.target.value;
        this.setState({
            name: data
        })
    };

    setSurnameHandler = event => {
        const data = event.target.value;
        this.setState({
            surname: data
        })
    };

    setEmailHandler = event => {
        const data = event.target.value;
        this.setState({
            email: data
        })
    };

    setPasswordHandler = event => {
        const data = event.target.value;
        this.setState({
            password: data
        })
    };

    repeatPasswordHandler = event => {
        const data = event.target.value;
        this.setState({
            repeatPassword: data
        })
    };

    render() {
        return (
            <div className={'Registration container-fluid'}>
                {this.props.message !== '' ?
                    <Alert message={this.props.message} banner closable type="error" /> :
                    null
                }
                <div className="Registration__main row">
                    <Col lg={5} className={'Registration__main_img'}/>
                    <Col lg={7} className={'Registration__main_form'}>
                        <h3>Создайте аккаунт!</h3>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="name">
                                    <Form.Control type="text" placeholder="Имя" onChange={this.setNameHandler}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="surname">
                                    <Form.Control type="text" placeholder="Фамилия" onChange={this.setSurnameHandler} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-mail" onChange={this.setEmailHandler} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Пароль" onChange={this.setPasswordHandler} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Повторите пароль" onChange={this.repeatPasswordHandler} />
                                </Form.Group>
                            </Form.Row>
                            {(this.state.name === '' || this.state.surname === '' || this.state.email === '' || this.state.password === '' || this.state.repeatPassword === '') || (this.state.password !== this.state.repeatPassword) || (this.state.password.length < 6) ?
                                <Button disabled variant="success" type="submit" onClick={this.registerHandler}>
                                    Создать аккаунт
                                </Button>
                                :
                                <Button variant="success" type="submit" onClick={this.registerHandler}>
                                    Создать аккаунт
                                </Button>
                            }
                            <hr/>
                            <Button disabled variant="danger" type="submit" style={{marginBottom: '20px'}}>
                                Зарагестрироваться с Google
                            </Button>
                            <Button disabled variant="primary" type="submit">
                                Зарагестрироваться с Facebook
                            </Button>
                            <hr/>
                            <NavLink to={'/reset'} exact>
                                Забыли пароль?
                            </NavLink>
                            <NavLink to={'/login'} exact>
                                Уже есть аккаунт? Войти!
                            </NavLink>
                        </Form>
                    </Col>
                </div>
                {this.props.isReg === true ?
                    <Redirect to={'/login'} /> :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReg: state.authReducer.isReg,
        message: state.authReducer.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAuth: (email, password, isLogin, name, surname) => dispatch(userAuth(email, password, isLogin, name, surname))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);