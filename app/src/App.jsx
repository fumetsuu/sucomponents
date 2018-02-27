import React, { Component } from 'react';
import { render } from 'react-dom';
const remote = require('electron').remote

require("./styles/main.sass");

import SuTitlebar from 'su-titlebar'
import SuTabs from './components/SuTabs'

const tabs = [
    {
        value: '1',
        label: 'ONE 1'
    },
    {
        value: '2',
        label: 'TWO 2'
    },
    {
        value: '3',
        label: 'THREE 3'
    },
    {
        value: '4',
        label: 'FOUR 4'
    }
]
export default class App extends Component {
    constructor(props) {
        super(props)
        this.handleTabChange = this.handleTabChange.bind(this)
    }
    
    render() {
        return(
            <div className="wrapper">
                <SuTitlebar remote={remote} />
                <div className="content-area">
                    <SuTabs tabs={tabs} tabClass='su-tabs' tabClassActive='su-tabs-active' onTabChange={this.handleTabChange}/>
                </div>
            </div>
        )
    }

    handleTabChange(selectedTab) {
        console.log(selectedTab)
    }
}