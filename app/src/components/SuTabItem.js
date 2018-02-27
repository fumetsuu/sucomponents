import React, { Component } from 'react'

class SuTabItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDragging: props.isDragging,
            x: 0
        }
        this.defaultStyle = {
            padding: '10px 20px',
            display: 'inline-block',
            border: '1px solid grey',
            userSelect: 'none'
        }
        this.dragTab = this.dragTab.bind(this)
        this.dragTabMove = this.dragTabMove.bind(this)
        this.dragTabUp = this.dragTabUp.bind(this)
    }
    
        
    render() {
        let { tabClass, value, label  } = this.props
        return <div ref={tab => { this.self = tab }} className={tabClass} key={value} onMouseDown={this.dragTab} style={Object.assign({}, this.defaultStyle, {
            left: this.state.x+'px',
            position: this.state.isDragging ? 'absolute' : 'initial'
        })}>{label}</div>
    }

    componentDidMount() {
        document.body.addEventListener('mousemove', this.dragTabMove)
        document.body.addEventListener('mouseup', this.dragTabUp)
    }
    
    dragTab(e) {
        this.container = e.currentTarget.parentElement
        this.maxwidth = this.container.offsetWidth
        this.minwidth = this.container.offsetLeft
        this.setState({ isDragging: true, x: this.self.offsetLeft })
        this.tabsArray = Array.from(this.container.childNodes)
        var pos = this.tabsArray.indexOf(this.self)
        var who = { value: this.props.value, label: this.props.label }
        this.props.handleTabChange(who)
    }

    dragTabMove(e) {
        if(this.state.isDragging) {
            if(!(this.self.offsetLeft+this.self.offsetWidth >= this.maxwidth && e.movementX > 0) && !(this.self.offsetLeft <= this.minwidth && e.movementX < 0))
                    var deltaX = this.self.offsetLeft + e.movementX
                    this.setState({
                        x: deltaX
                    })
                    
                    if(e.movementX > 0 && this.self.nextElementSibling) {
                        var nsX = this.self.nextSibling.offsetLeft + this.self.nextSibling.clientWidth / 2
                        if(deltaX + this.self.offsetWidth >= nsX) {
                            var pos = this.tabsArray.indexOf(this.self.nextElementSibling)
                            this.props.handleDrag(pos, this.props)
                        }
                    }
                    if(e.movementX < 0 && this.self.previousElementSibling) {
                        var psX = this.self.previousElementSibling.offsetLeft + this.self.previousElementSibling.clientWidth / 2
                        if(deltaX <= psX) {
                            var pos = this.tabsArray.indexOf(this.self.previousElementSibling)
                            var who = { value: this.props.value, label: this.props.label }
                            this.props.handleDrag(pos, who)
                        }
                    }
        }
    }

    dragTabUp(e) {
        this.setState({ isDragging: false, x: 0 })
        var who = { value: this.props.value, label: this.props.label }
        this.props.handleUp(who)
    }
}


export default SuTabItem