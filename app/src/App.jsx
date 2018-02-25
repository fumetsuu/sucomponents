import React, { Component } from 'react';
import { render } from 'react-dom';
const remote = require('electron').remote

require("./styles/main.sass");

import SuTitlebar from 'su-titlebar'

import SuTabs from './components/SuTabs'
export default class App extends Component {
    render() {
        return(
            <div className="wrapper">
                <SuTitlebar remote={remote}/>
                <div className="content-area">
                    <SuTabs/>
                    <div style={{height: '1500px'}}>ohhh</div>
                </div>
            </div>
        );
    }
}