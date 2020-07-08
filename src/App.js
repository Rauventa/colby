import React, {Component} from 'react';
import './styles/styles.scss';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from "./components/HOC/Router";

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <Router />
            </div>
        );
    }
}

export default App;