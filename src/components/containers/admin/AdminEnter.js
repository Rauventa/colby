import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class AdminEnter extends Component {
    render() {
        return (
            <div className="AdminEnter">
                <h2>Admin Enter</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="email" placeholder="Login" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <NavLink to={'/admin/panel'}>
                        <Button variant={'primary'}>Enter the system</Button>
                    </NavLink>
                </Form>
            </div>
        );
    }
}

export default AdminEnter;