import React, { Component } from 'react';
import { render } from 'react-dom';
const remote = require('electron').remote

require("./styles/main.sass");

import SuTitlebar from './components/SuTitlebar/SuTitlebar.jsx'

export default class App extends Component {
    render() {
        return(
            <div>
                <SuTitlebar remote={remote} options={{ 
                    Title: 'SuComponents'
                }}/>
                <div className="title"> Hello </div>

            </div>
        );
    }
}