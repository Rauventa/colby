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
                        <Select defaultValue="Type">
                            <Option value="Basketball">Basketball</Option>
                            <Option value="Football">Football</Option>
                            <Option value="Run">Run</Option>
                            <Option value="Casual">Casual</Option>
                        </Select>
                        <Select defaultValue="Color" onChange={this.setColor}>
                            <Option value="Black">Black</Option>
                            <Option value="White">White</Option>
                            <Option value="Red">Red</Option>
                            <Option value="Orange">Orange</Option>
                            <Option value="Grey">Grey</Option>
                            <Option value="Green">Green</Option>
                            <Option value="Yellow">Yellow</Option>
                        </Select>
                        <Select defaultValue="Size">
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
                            placeholder="Search sneakers"
                            onChange={this.searchHandler}
                        />
                    </div>
                </div>
                <div className="Catalog__content container-fluid">
                    <div className="row">
                        {this.props.items.filter(this.searchFilter(this.state.term)).map((item, index) => {
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