import React, { Component } from 'react';
import { render } from 'react-dom';
const remote = require('electron').remote

require("./styles/main.sass");

import SuTitlebar from 'su-titlebar'
import SuTabs from './components/SuTabs'

const tabs = [
    {
        value: '0',
        label: 'testheyyyyyyyyy'
    },
    {
        value: '1',
        label: 'test tweoioooooo'
    }
]
export default class App extends Component {
    render() {
        return(
            <div className="wrapper">
                <SuTitlebar remote={remote} />
                <div className="content-area">
                    <SuTabs tabs={tabs} tabClass='su-tabs'/>
                </div>
            </div>
        );
    }
}