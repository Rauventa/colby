import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div className={'Landing'}>
                <div className="Landing__content">
                    <h1>Col<span>by</span></h1>
                    <h5>Your style - our work</h5>
                    <NavLink to={'/catalog'}>
                        <Button variant="primary">Sneakers!</Button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Landing;