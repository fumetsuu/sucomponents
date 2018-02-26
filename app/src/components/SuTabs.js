import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SuTabItem from './SuTabItem'
/**
 * SuTabs component
 */
class SuTabs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsArray: [],
            selectedTab: this.props.tabs[0],
            isDragging: false,
            x: 0
        }
        this.defaultStyle = {
            padding: '10px 20px',
            display: 'inline-block',
            border: '1px solid grey',
            position: 'absolute',
            userSelect: 'none'
        }
        this.allTabsToState = this.allTabsToState.bind(this)
        this.renderTab = this.renderTab.bind(this)
    }

    renderTab(tabObject) {
        return <SuTabItem key={tabObject.value} value={tabObject.value} label={tabObject.label} tabClass={this.props.tabClass}/>
    }

    allTabsToState() {
        this.setState({
            tabsArray: this.props.tabs.map(tab => this.renderTab(tab))
        }) 
    }

    componentWillMount() {
        this.allTabsToState()
    }

    render() {
        return (
        <div className="su-tabs-container">
            {this.state.tabsArray}
        </div>
        )
    }
}

SuTabs.propTypes = {
    /**
     * array of tabs that should have unique values
     */
    tabs: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    })).isRequired,
    /**
     * className for not active tab
     */
    tabClass: PropTypes.string,
    /**
     * className for active tab
     */
    tabClassActive: PropTypes.string
}

SuTabs.defaultProps = {
    tabClass: '',
    tabClassActive: ''
}

export default SuTabs