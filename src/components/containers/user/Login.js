import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {userAuth} from "../../../store/actions/authActions";
import {Alert} from "antd";

class Login extends Component {

    state = {
        email: '',
        password: ''
    };

    loginHandler = (event) => {
        event.preventDefault();
        this.props.userAuth(
            this.state.email,
            this.state.password,
            true
        );
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

    render() {
        return (
            <div className={'Login container-fluid'}>
                {this.props.message !== '' ?
                    <Alert message={this.props.message} banner closable type="error" /> :
                    null
                }
                <div className="Login__main row">
                    <Col lg={6} className={'Login__main_img'}>

                    </Col>
                    <Col lg={6} className={'Login__main_form'}>
                        <h3>Welcome back!</h3>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={this.setEmailHandler} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={this.setPasswordHandler} />
                            </Form.Group>
                            <Button variant="success" type="submit" onClick={this.loginHandler}>
                                Login
                            </Button>
                            <hr/>
                            <Button disabled variant="danger" type="submit" style={{marginBottom: '20px'}}>
                                Login with Google
                            </Button>
                            <Button disabled variant="primary" type="submit">
                                Login with Facebook
                            </Button>
                            <hr/>
                            <NavLink to={'/reset'} exact>
                                Forgot password?
                            </NavLink>
                            <NavLink to={'/reg'}>
                                Create an Account!
                            </NavLink>
                        </Form>
                    </Col>
                </div>
                {this.props.token ?
                    <Redirect to={'/cabinet'} /> :
                    <Redirect to={'/login'} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.authReducer.message,
        token: state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAuth: (email, password, isLogin) => dispatch(userAuth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);