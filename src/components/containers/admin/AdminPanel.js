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
        type: 'Casual',
        color: 'Black',
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
            message.success('Item was successfully deleted');
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
            message.success('Item was successfully add');
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
            message.success('Item was successfully edited');
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
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                filters: [
                    {
                        text: 'Basketball',
                        value: 'Basketball',
                    },
                    {
                        text: 'Football',
                        value: 'Football',
                    },
                    {
                        text: 'Voleyball',
                        value: 'Voleyball',
                    },
                    {
                        text: 'Casual',
                        value: 'Casual',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.type.indexOf(value) === 0,
                sorter: (a, b) => a.type.length - b.type.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Color',
                dataIndex: 'color',
                key: 'color',
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Sale',
                dataIndex: 'sale',
                key: 'sale',
                sorter: (a, b) => a.sale - b.sale,
            },
            {
                title: 'Price $',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'Action',
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
                        <Modal.Title>Add new item</Modal.Title>
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
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type={'text'} placeholder={'Enter name'} onChange={this.changeAddName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.type} onChange={this.changeAddType}>
                                        <option value={'Basketball'}>Basketball</option>
                                        <option value={'Football'}>Football</option>
                                        <option value={'Voleyball'}>Voleyball</option>
                                        <option value={'Casual'}>Casual</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.color} onChange={this.changeAddColor}>
                                        <option value={'Black'}>Black</option>
                                        <option value={'White'}>White</option>
                                        <option value={'Orange'}>Orange</option>
                                        <option value={'Green'}>Green</option>
                                        <option value={'Yellow'}>Yellow</option>
                                        <option value={'Red'}>Red</option>
                                        <option value={'Grey'}>Grey</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Size</Form.Label>
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
                                    <Form.Label>Sale</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter sale'} onChange={this.changeAddSale} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Price $</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter price'} onChange={this.changeAddPrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeAddItem}>
                            Close
                        </Button>
                        {validator ?
                            <Button variant="primary" disabled>
                                Add new item
                            </Button> :
                            <Button variant="primary" onClick={this.sendAddData}>
                                Add new item
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showEdit} onHide={this.closeEditItem}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit current item</Modal.Title>
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
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type={'text'} placeholder={'Enter name'} defaultValue={this.state.editName} onChange={this.changeEditName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.editType} onChange={this.changeEditType}>
                                        <option value={'Basketball'}>Basketball</option>
                                        <option value={'Football'}>Football</option>
                                        <option value={'Voleyball'}>Voleyball</option>
                                        <option value={'Casual'}>Casual</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.editColor} onChange={this.changeEditColor}>
                                        <option value={'Black'}>Black</option>
                                        <option value={'White'}>White</option>
                                        <option value={'Orange'}>Orange</option>
                                        <option value={'Green'}>Green</option>
                                        <option value={'Yellow'}>Yellow</option>
                                        <option value={'Red'}>Red</option>
                                        <option value={'Grey'}>Grey</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Size</Form.Label>
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
                                    <Form.Label>Sale</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter sale'} defaultValue={this.state.editSale} onChange={this.changeEditSale} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Price $</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter price'} defaultValue={this.state.editPrice} onChange={this.changeEditPrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeEditItem}>
                            Close
                        </Button>
                        <Button type="primary" onClick={this.sendEditData}>
                            Edit item
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="AdminPanel__header">
                    <p>Items list</p>
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