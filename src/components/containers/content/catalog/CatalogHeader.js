import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Badge} from "antd";
import {connect} from "react-redux";

class CatalogHeader extends Component {
    render() {
        return (
            <div className="Catalog__header">
                <NavLink to={'/'} exact><h3>Colby</h3></NavLink>
                <div className="Catalog__header_right">
                    {localStorage.userName !== undefined ?
                        <div className={'links'}>
                            <NavLink to={'/cabinet'}>{localStorage.userName}</NavLink>
                            <NavLink to={'/cart'}>
                                <Badge count={this.props.cart.length} className={'cart'}>
                                    <a href="/" className="head-example">
                                        <i className="fas fa-shopping-cart"/>
                                    </a>
                                </Badge>
                            </NavLink>
                        </div> :
                        <div className={'links'}>
                            <NavLink to={'/login'}><p>Войти</p></NavLink>
                            <NavLink to={'/reg'}><p>Зарегестрироваться</p></NavLink>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.mainReducer.cart
    }
}

export default connect(mapStateToProps)(CatalogHeader);