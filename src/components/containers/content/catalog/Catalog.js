import React, {Component} from 'react';
import {Input, Search, Select} from "antd";
import CatalogHeader from "./CatalogHeader";
import {connect} from "react-redux";
import {renderData, renderItems} from "../../../../store/actions/mainActions";
import CatalogItem from "./CatalogItem";

class Catalog extends Component {

    state = {
      term: ''
    };

    componentDidMount() {
        this.props.renderItems();
        this.props.renderData();
    };

    searchHandler = event => {
        this.setState({term: event.target.value})
    };

    searchFilter = term => {
        return function(x) {
            return (x.name.toLowerCase()).includes(term.toLowerCase()) || !term
        }
    };

    setColor = value => {
        const check = this.props.items.filter(item => item.color === value)
        console.log(check)
    };

    render() {
        const { Option } = Select;
        const { Search } = Input;
        return (
            <div className={'Catalog'}>
                <CatalogHeader />
                <div className="Catalog__filters">
                    <div className="Catalog__filters_tabs">
                        <Select defaultValue="Тип">
                            <Option value="Basketball">Баскетбол</Option>
                            <Option value="Football">Футбол</Option>
                            <Option value="Run">Бег</Option>
                            <Option value="Casual">Повседневные</Option>
                        </Select>
                        <Select defaultValue="Цвет" onChange={this.setColor}>
                            <Option value="Black">Черный</Option>
                            <Option value="White">Белый</Option>
                            <Option value="Red">Красный</Option>
                            <Option value="Orange">Оранжевый</Option>
                            <Option value="Grey">Серый</Option>
                            <Option value="Green">Зеленый</Option>
                            <Option value="Yellow">Желтый</Option>
                        </Select>
                        <Select defaultValue="Размер">
                            <Option value="38">38</Option>
                            <Option value="39">39</Option>
                            <Option value="40">40</Option>
                            <Option value="41">41</Option>
                            <Option value="42">42</Option>
                            <Option value="43">43</Option>
                            <Option value="44">44</Option>
                            <Option value="44">45</Option>
                        </Select>
                    </div>
                    <div className="Catalog__filters_search">
                        <Search
                            placeholder="Поиск кроссовок"
                            onChange={this.searchHandler}
                        />
                    </div>
                </div>
                <div className="Catalog__content container-fluid">
                    <div className="row">
                        {this.props.items.filter(this.searchFilter(this.state.term)).map((item, index) => {
                            if (this.props.items.length !== 0) {
                                return (
                                    <CatalogItem
                                        key={item+index}
                                        id={item.key}
                                        name={item.name}
                                        sale={item.sale}
                                        type={item.type}
                                        color={item.color}
                                        size={item.size}
                                        price={item.price}
                                        url={item.url}
                                    />
                                )
                            } else {
                                return (
                                    <p>Тут пока-что ничего нет</p>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.mainReducer.items,
        personId: state.mainReducer.personId,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems()),
        renderData: () => dispatch(renderData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);