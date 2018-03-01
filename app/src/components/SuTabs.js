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
        this.allTabsToState = this.allTabsToState.bind(this)
        this.renderTab = this.renderTab.bind(this)
        this.handleKeyControl = this.handleKeyControl.bind(this)
        this.closeCurrentTab = this.closeCurrentTab.bind(this)
    }

    renderTab(tabObject) {
        var tabClass = this.props.tabClass
        tabClass+=this.state.selectedTab.value==tabObject.value?' '+this.props.tabClassActive : ''
        return <SuTabItem key={tabObject.value} value={tabObject.value} label={tabObject.label} tabClass={tabClass} handleDrag={this.handleDrag.bind(this)} handleUp={this.handleUp.bind(this)} handleTabChange={this.handleTabChange.bind(this)}/>
    }

    allTabsToState() {
        this.setState({
            tabsArray: this.props.tabs.map(tab => this.renderTab(tab))
        }) 
    }

    handleDrag(placeholderPosition, who) {
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

    handleTabChange(tabObject) {
        if(this.props.onTabChange) {
            this.props.onTabChange(tabObject)
        }
        this.setState({ selectedTab: tabObject }, () => {
            this.setState({
                tabsArray: this.filterPlaceholdersOut(this.state.tabsArray, {value:null})
            })
        })
    }

    componentWillMount() {
        this.allTabsToState()
    }

    componentDidMount() {
        window.addEventListener('keypress', this.handleKeyControl, true)
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.handleKeyControl, true)
    }

    render() {
        return (
        <div className="su-tabs-container" style={{
            display: 'flex',
            justifyContent: 'start'
        }}>
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

    handleKeyControl(e) {
        if(e.ctrlKey) {
            console.log(e.keyCode)
            switch(e.keyCode) {
                case 23: this.closeCurrentTab(); break;
                default: break;
            }
        }
    }

    closeCurrentTab() {
        console.log( 'hey')
        let { selectedTab, tabsArray } = this.state
        let newtabsarray = tabsArray.filter(tab => tab.value != selectedTab.value)
        if(this.props.onTabClose) {
            this.props.onTabClose(tabsArray, selectedTab)
            //returns current array before close and the tab that was closed
        }
        let newSelectedTab
        if(tabsArray.indexOf(selectedTab) == 0) {
            newSelectedTab = tabsArray[1]
        } else if(tabsArray.indexOf(selectedTab) == tabsArray.length-1) {
            newSelectedTab = tabsArray[tabsArray.length-2]
        } else {
            newSelectedTab = tabsArray[tabsArray.indexOf(selectedTab)+1]
        }
        console.log(newSelectedTab)
        this.setState({ tabsArray: newtabsarray }, () => {
            this.handleTabChange(newSelectedTab)
        })
    }
}

SuTabs.propTypes = {
    /**
     * array of tabs that should have unique valuess
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