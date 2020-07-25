import React, {Component} from 'react';
import {Button, message, Table} from 'antd';
import {Form, Modal, Col, ProgressBar} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";
import {handleChange, renderItems} from "../../../store/actions/mainActions";

class AdminPanel extends Component {

    state = {
        showAdd: false,
        showEdit: false,
        name: '',
        type: 'Повседневный',
        color: 'Черный',
        size: '40',
        sale: '',
        price: '',
        editKey: '',
        editName: '',
        editType: '',
        editColor: '',
        editSize: '',
        editSale: '',
        editPrice: '',
        items: []
    };

    componentDidMount() {
        this.props.renderItems()
    }

    onAddItem = () => {
      this.setState({showAdd: true})
    };

    onEditItem = (key, name, type, color, size, sale, price) => {
      this.setState({
          showEdit: true,
          editKey: key,
          editName: name,
          editType: type,
          editColor: color,
          editSize: size,
          editSale: sale,
          editPrice: price
      })
    };

    closeAddItem = () => {
        this.setState({showAdd: false})
    };

    closeEditItem = () => {
        this.setState({showEdit: false})
    };

    changeAddName = event => {
        this.setState({name: event.target.value});
    };
    changeAddType = event => {
        this.setState({type: event.target.value});
    };
    changeAddColor = event => {
        this.setState({color: event.target.value});
    };
    changeAddSize = event => {
        this.setState({size: event.target.value});
    };
    changeAddSale = event => {
        this.setState({sale: event.target.value});
    };
    changeAddPrice = event => {
        this.setState({price: event.target.value});
    };

    closeEditItem = () => {
        this.setState({showEdit: false})
    };

    changeEditName = event => {
        this.setState({editName: event.target.value});
    };
    changeEditType = event => {
        this.setState({editType: event.target.value});
    };
    changeEditSale = event => {
        this.setState({editSale: event.target.value});
    };
    changeEditColor = event => {
        this.setState({editColor: event.target.value});
    };
    changeEditSize = event => {
        this.setState({editSize: event.target.value});
    };
    changeEditPrice = event => {
        this.setState({editPrice: event.target.value});
    };

    deleteHandler = async id => {
        try {
            await axios.delete(`https://colby-16cd8.firebaseio.com/items/${id}.json`);
            this.props.renderItems();
            message.success('Товар успешно удален');
        } catch (e) {
            console.log(e)
        }
    };

    sendAddData = async () => {
        try  {
            await axios.post('https://colby-16cd8.firebaseio.com/items.json', {
                name: this.state.name || this.props.name,
                type: this.state.type || this.props.type,
                color: this.state.color || this.props.color,
                size: this.state.size || this.props.size,
                sale: this.state.sale || this.props.sale,
                price: this.state.price || this.props.price,
                url: this.props.url
            });
            this.setState({showAdd: false});
            message.success('Товар успешно добавлен');
            this.props.renderItems();
        } catch (e) {
            console.log(e)
        }
    };

    sendEditData = async () => {
        try  {
            await axios.put(`https://colby-16cd8.firebaseio.com/items/${this.state.editKey}.json`, {
                name: this.state.editName,
                type: this.state.editType,
                color: this.state.editColor,
                size: this.state.editSize,
                sale: this.state.editSale,
                price: this.state.editPrice,
                url: this.props.url
            });
            this.setState({showEdit: false});
            this.props.renderItems();
            message.success('Товар успешно отредактирован');
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const validator = (this.state.name === '') ||
            (this.state.type === '') ||
            (this.state.color === '') ||
            (this.state.size === '') ||
            (this.state.sale === '') ||
            (this.state.price === '');

        const columns = [
            {
                title: 'Название',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Тип',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {
                        text: 'Баскетбол',
                        value: 'Баскетбол',
                    },
                    {
                        text: 'Футбол',
                        value: 'Футбол',
                    },
                    {
                        text: 'Волейбол',
                        value: 'Волейбол',
                    },
                    {
                        text: 'Повседневный',
                        value: 'Повседневный',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.type.indexOf(value) === 0,
                sorter: (a, b) => a.type.length - b.type.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Цвет',
                dataIndex: 'color',
                key: 'color',
            },
            {
                title: 'Размер',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Скидка',
                dataIndex: 'sale',
                key: 'sale',
                sorter: (a, b) => a.sale - b.sale,
            },
            {
                title: 'Цена $',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'Действия',
                key: 'action',
                render: (text, record) => (
                    <div className={'actions'}>
                        <Button type={'danger'} onClick={() => this.deleteHandler(record.key)} style={{marginRight: '1rem'}}><i className={'fa fa-trash'} /></Button>
                        <Button type={'primary'} onClick={() => this.onEditItem(record.key, record.name, record.type, record.color, record.size, record.sale, record.price)}><i className={'fa fa-pen'} /></Button>
                    </div>
                ),
            },
        ];
        return (
            <div className="AdminPanel">
                <Modal show={this.state.showAdd} onHide={this.closeAddItem}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить новый товар</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.url !== '' ?
                            <img style={{width: '100%', marginBottom: '1rem'}} src={this.props.url} alt=""/> :
                            <img style={{width: '100%', marginBottom: '1rem'}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png"} alt=""/>
                        }
                        <Form.File
                            custom
                            id="avatar"
                            label="Select sneakers picture"
                            onChange={this.props.handleChange}
                        />
                        <ProgressBar style={{margin: '1rem 0'}} animated striped variant="success" now={this.props.progress} />
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control type={'text'} placeholder={'Введите название'} onChange={this.changeAddName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Тип</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.type} onChange={this.changeAddType}>
                                        <option value={'Баскетбол'}>Баскетбол</option>
                                        <option value={'Футбол'}>Футбол</option>
                                        <option value={'Волейбол'}>Волейбол</option>
                                        <option value={'Повседневный'}>Повседневный</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Цвет</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.color} onChange={this.changeAddColor}>
                                        <option value={'Черный'}>Черный</option>
                                        <option value={'Белый'}>Белый</option>
                                        <option value={'Оранжевый'}>Оранжевый</option>
                                        <option value={'Зеленый'}>Зеленый</option>
                                        <option value={'Желтый'}>Желтый</option>
                                        <option value={'Красный'}>Красный</option>
                                        <option value={'Серый'}>Серый</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Размер</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.size} onChange={this.changeAddSize} required>
                                        <option value={'38'}>38</option>
                                        <option value={'39'}>39</option>
                                        <option value={'40'}>40</option>
                                        <option value={'41'}>41</option>
                                        <option value={'42'}>42</option>
                                        <option value={'43'}>43</option>
                                        <option value={'44'}>44</option>
                                        <option value={'45'}>45</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Скидка</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Введите скидку'} onChange={this.changeAddSale} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Цена $</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Введите цену'} onChange={this.changeAddPrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeAddItem}>
                            Закрыть
                        </Button>
                        {validator ?
                            <Button variant="primary" disabled>
                                Добавить новый товар
                            </Button> :
                            <Button variant="primary" onClick={this.sendAddData}>
                                Добавить новый товар
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showEdit} onHide={this.closeEditItem}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать товар</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.url !== '' ?
                            <img style={{width: '100%', marginBottom: '1rem'}} src={this.props.url} alt=""/> :
                            <img style={{width: '100%', marginBottom: '1rem'}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1200px-Placeholder_no_text.svg.png"} alt=""/>
                        }
                        <Form.File
                            custom
                            id="avatar"
                            label="Select sneakers picture"
                            onChange={this.props.handleChange}
                        />
                        <ProgressBar style={{margin: '1rem 0'}} animated striped variant="success" now={this.props.progress} />
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control type={'text'} placeholder={'Введите название'} defaultValue={this.state.editName} onChange={this.changeEditName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Тип</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.editType} onChange={this.changeEditType}>
                                        <option value={'Баскетбол'}>Баскетбол</option>
                                        <option value={'Футбол'}>Футбол</option>
                                        <option value={'Волейбол'}>Волейбол</option>
                                        <option value={'Повседневный'}>Повседневный</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Цвет</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.editColor} onChange={this.changeEditColor}>
                                        <option value={'Черный'}>Черный</option>
                                        <option value={'Белый'}>Белый</option>
                                        <option value={'Оранжевый'}>Оранжевый</option>
                                        <option value={'Зеленый'}>Зеленый</option>
                                        <option value={'Желтый'}>Желтый</option>
                                        <option value={'Красный'}>Красный</option>
                                        <option value={'Серый'}>Серый</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Размер</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.editSize} onChange={this.changeEditSize} required>
                                        <option value={'38'}>38</option>
                                        <option value={'39'}>39</option>
                                        <option value={'40'}>40</option>
                                        <option value={'41'}>41</option>
                                        <option value={'42'}>42</option>
                                        <option value={'43'}>43</option>
                                        <option value={'44'}>44</option>
                                        <option value={'45'}>45</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Скидка</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Введите ссылку'} defaultValue={this.state.editSale} onChange={this.changeEditSale} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Цена $</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Введите цену'} defaultValue={this.state.editPrice} onChange={this.changeEditPrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeEditItem}>
                            Закрыть
                        </Button>
                        <Button type="primary" onClick={this.sendEditData}>
                            Редактировать товар
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="AdminPanel__header">
                    <p>Список товаров</p>
                    <Button type={'primary'} onClick={this.onAddItem}><i className={'fa fa-plus'} /></Button>
                </div>
                <div className="AdminPanel__content">
                    <Table columns={columns} dataSource={this.props.items} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.mainReducer.items,
        image: state.mainReducer.image,
        url: state.mainReducer.url,
        progress: state.mainReducer.progress,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems()),
        handleChange: (event) => dispatch(handleChange(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);