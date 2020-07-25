import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {message} from "antd";

class ModerEnter extends Component {

    state = {
        email: 'moder@colby.ru',
        password: '123456',

        checkE: '',
        checkP: ''
    };

    setEmail = e => {
        this.setState({checkE: e.target.value})
    };

    setPassword = e => {
        this.setState({checkP: e.target.value})
    };

    setError = () => {
        message.error('Неверные данные');
    };

    render() {
        return (
            <div className={'ModerEnter'}>
                <h2>Панель модератора</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="email" placeholder="Login" onChange={this.setEmail} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.setPassword} />
                    </Form.Group>
                    {(this.state.email === this.state.checkE) && (this.state.password === this.state.checkP) ?
                        <NavLink to={'/moderator/panel'}>
                            <Button variant={'primary'}>Войти в систему</Button>
                        </NavLink> :
                        <Button variant={'primary'} onClick={this.setError}>Войти в систему</Button>
                    }
                </Form>
            </div>
        );
    }
}

export default ModerEnter;