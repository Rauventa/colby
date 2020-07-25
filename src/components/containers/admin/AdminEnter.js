import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {message} from 'antd'

class AdminEnter extends Component {

    state = {
      email: 'admin@colby.ru',
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
            <div className="AdminEnter">
                <h2>Вход в админ панель</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="email" placeholder="Логин" onChange={this.setEmail} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" onChange={this.setPassword} />
                    </Form.Group>
                    {(this.state.email === this.state.checkE) && (this.state.password === this.state.checkP) ?
                        <NavLink to={'/admin/panel'}>
                            <Button variant={'primary'}>Войти в систему</Button>
                        </NavLink> :
                        <Button variant={'primary'} onClick={this.setError}>Войти в систему</Button>
                    }

                </Form>
            </div>
        );
    }
}

export default AdminEnter;