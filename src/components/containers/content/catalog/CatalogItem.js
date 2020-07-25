import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class CatalogItem extends Component {

    goToCurrentItem = () => {
        this.props.history.push({
            pathname: `/catalog/${this.props.id}`,
            state: {
                name: this.props.name,
                type: this.props.type,
                color: this.props.color,
                size: this.props.size,
                sale: this.props.sale,
                price: this.props.price,
                url: this.props.url
            }
        })
    };

    render() {
        const item = this.props;
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" onClick={this.goToCurrentItem}>
                <div className="Catalog__content_item">
                    {item.sale === '0' ? null :
                        <div className="sale">
                            <small>- {item.sale}%</small>
                        </div>
                    }
                    <img src={item.url} alt={item.name} />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <p className={'item-name'}>{item.name}</p>
                                <p className={'item-desc'}>{item.type}, {item.color} цвет, {item.size} размер</p>
                            </div>
                            <div className="col-3">
                                {item.sale === '0' ?
                                    <p className={'item-price'}>{item.price}$</p> :
                                    <div>
                                        <p className={'item-price'}>{Math.round(item.price-(item.price*(item.sale/100)))}$</p>
                                        <small className={'sale-price'}>{item.price}$</small>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CatalogItem);