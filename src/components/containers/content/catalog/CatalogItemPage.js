import React, {Component} from 'react';
import CatalogHeader from "./CatalogHeader";
import {NavLink, withRouter} from "react-router-dom";
import {Breadcrumb, message} from "antd";
import {connect} from "react-redux";
import {addToCart} from "../../../../store/actions/mainActions";
import {Button} from "react-bootstrap";

class CatalogItemPage extends Component {

    onCartAdd = () => {
        if (localStorage.userName !== undefined) {
            const data = this.props.location.state;
            const cart = [...this.props.cart];
            this.props.addToCart(data, cart);
            message.success('Item added to cart');
        } else {
            message.error('Enter the system, please');
        }
    };

    render() {
        const data = this.props.location.state;
        return (
            <div className={'CatalogItemPage'}>
                <CatalogHeader />
                <Breadcrumb style={{padding: '2rem 5rem'}}>
                    <Breadcrumb.Item>
                        <NavLink to={'/catalog'}>Каталог</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="CatalogItemPage__content container-fluid">
                    <div className="row">
                        <div className="col-xl-7 col-md-12 col-sm-12">
                            <div className="CatalogItemPage__content_img">
                                <img src={data.url} alt={data.name}/>
                            </div>
                        </div>
                        <div className="col-xl-5 col-md-12 col-sm-12">
                            <div className="CatalogItemPage__content_info container-fluid">
                                <div className="row">
                                    <div className="col-xl-8">
                                        <h5>{data.type}</h5>
                                        <h1>{data.name}</h1>
                                    </div>
                                    <div className="col-xl-4">
                                        {data.sale === '0' ?
                                            <p className={'item-price'}>{data.price}$</p> :
                                            <div>
                                                <p className={'item-price'}>{Math.round(data.price-(data.price*(data.sale/100)))}$</p>
                                                <small className={'sale-price'}>{data.price}$</small>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <Button type={'primary'} onClick={this.onCartAdd}>Добавить в корзину</Button>
                                <div className="desc">
                                    <p className={'item-desc'}>{data.type}, {data.color} цвет, {data.size} размер</p>
                                </div>
                            </div>
                        </div>
                    </div>
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

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (data, cart) => dispatch(addToCart(data, cart))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogItemPage));