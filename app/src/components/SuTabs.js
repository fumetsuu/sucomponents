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
            selectedTab: this.props.tabs[0]
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
        var tabClass = this.props.tabClass
        tabClass+=this.state.selectedTab.value==tabObject.value?' '+this.props.tabClassActive : ''
        return <SuTabItem key={tabObject.value} value={tabObject.value} label={tabObject.label} tabClass={tabClass} handleDrag={this.handleDrag.bind(this)} handleUp={this.handleUp.bind(this)} />
    }

    allTabsToState() {
        this.setState({
            tabsArray: this.props.tabs.map(tab => this.renderTab(tab))
        }) 
    }

    handleDrag(placeholderPosition, who) {
        if(this.props.onTabChange) {
            this.props.onTabChange(tabObject)
        }
        this.setState({ selectedTab: who }, () => {
            var replacementEl = this.renderTab(who)
            let newtabsarray = [...this.filterPlaceholdersOut(this.state.tabsArray, who).slice(0, placeholderPosition), replacementEl, ...this.filterPlaceholdersOut(this.state.tabsArray, who).slice(placeholderPosition)]
            this.setState({
                tabsArray: newtabsarray
            })
        })

    }

    handleUp(tabObject) {
        if(this.props.onDragChange) {
            this.props.onDragChange(this.state.tabsArray)
        }
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

    filterPlaceholdersOut(tabsArray, who) {
        var whoVal = who.value
        return tabsArray.filter(el => el.props.value != whoVal).map(el => {
            var tabObject = { value: el.props.value, label: el.props.label }
            return this.renderTab(tabObject)
        })
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