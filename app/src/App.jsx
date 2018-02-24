import React, { Component } from 'react';
import { render } from 'react-dom';
const remote = require('electron').remote

require("./styles/main.sass");

import SuTitlebar from 'su-titlebar'
console.log(SuTitlebar)

export default class App extends Component {
    render() {
        return(
            <div>
                <SuTitlebar/>
            </div>
        );
    }
}