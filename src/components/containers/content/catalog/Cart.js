import React, {Component} from 'react';
import {connect} from "react-redux";
import CatalogHeader from "./CatalogHeader";
import {Breadcrumb, Button, Radio, Result} from "antd";
import {NavLink, withRouter} from "react-router-dom";
import axios from 'axios';
import {deleteCartItem} from "../../../../store/actions/mainActions";

class Cart extends Component {

    state = {
        cart: [],
        showOrder: false
    };

    componentDidMount() {
        const cart = this.props.cart.map((item) => {
            if (item.sale !== '0') {
                return {
                    total: Number(Math.round(item.price-(item.price*(item.sale/100))))
                }
            } else {
                return {
                    total: Number(item.price)
                }
            }
        });
        this.setState({cart})
    };

    deleteCartItem = (data) => {
      const cart = this.props.cart;
      this.props.deleteCartItem(cart, data);
      this.props.history.push('/cart');
    };

    takeOrder = async () => {
        const total =
            this.state.cart.reduce(function(a,b) {
                return a + b.total
            }, 0);
        try {
            await axios.post(`https://colby-16cd8.firebaseio.com/persons/${localStorage.userId}/${this.props.personId}/orders.json`, {
                orderData: this.props.cart,
                totalPrice: total
            });
            this.setState({showOrder: true})
        } catch (err) {
            console.log(err)
        }
    };


    render() {
        const total =
            this.state.cart.reduce(function(a,b) {
                return a + b.total
            }, 0);
        return (
            <div className={'Cart'}>
                <CatalogHeader />
                <Breadcrumb style={{padding: '2rem 2rem 0 2rem'}}>
                    <Breadcrumb.Item>
                        <NavLink to={'/catalog'}>Каталог</NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Корзина</Breadcrumb.Item>
                </Breadcrumb>
                {this.props.cart.length !== 0 ? this.props.cart.map((item, index) => {
                    return (
                            <div className={'card Cart__item'} style={{margin: '1rem 2rem'}}>
                                <div className="card-body" key={index+item}>
                                    <img src={item.url} alt=""/>
                                    <div className="Cart__item_content">
                                        <p>{item.name}</p>
                                        <p>{item.type}, {item.color} цвет, {item.size} размер</p>
                                        {item.sale === '0' ?
                                            <h5>{item.price}$</h5> :
                                            <h5>{Math.round(item.price-(item.price*(item.sale/100)))}$</h5>
                                        }
                                        <Button type={'danger'} onClick={() => this.deleteCartItem(item.name)}><i className={'fa fa-trash'}/></Button>
                                    </div>
                                </div>
                            </div>
                    )
                }) : <h3 style={{padding: '2rem'}}>Тут еще ничего нет</h3>}

                {this.props.cart.length !== 0 ?
                    <>
                        <Radio style={{padding: '1rem 2rem'}}>Я подтверждаю свои покупки</Radio>
                        <div className="Cart__footer">
                            <h5>Полная цена: {total}$</h5>
                            <Button type={'primary'} onClick={this.takeOrder}>Купить кроссовки</Button>
                        </div>
                    </> : null
                }

                {this.state.showOrder === true ?
                    <Result
                        status="success"
                        title="Вы успешно купили свои лучшие кроссовки!"
                        subTitle={`Цена заказа: ${total}$`}
                        extra={[
                            <NavLink to={'/catalog'}><Button type="primary">Перейти в каталог</Button></NavLink>,
                            <NavLink to={'/cabinet'}><Button>Профиль</Button></NavLink>,
                        ]}
                    /> : null
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.mainReducer.cart,
        personId: state.mainReducer.personId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteCartItem: (cart, data) => dispatch(deleteCartItem(cart, data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));