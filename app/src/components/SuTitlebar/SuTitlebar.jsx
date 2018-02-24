import React from 'react';

require('./style.sass')

class SuTitlebar extends React.Component {
    constructor(props) {
        super(props)
        this.remote = props.remote
        this.minimise = this.minimise.bind(this)
        this.maximise = this.maximise.bind(this)
        this.closeWindow = this.closeWindow.bind(this)
    }
    
    render() {
        let options = this.props.options || {}
        return (
            <div className="su-titlebar-container" style={{
                height: options.height || '28px',
                backgroundColor: options.bgColor || '#1a1a1e'
            }}>
                {options.titlebarContent || <div style={{width: 0}}/>}
                <div className="su-titlebar-dragarea" style={{ backgroundColor: options.bgColor || '#1a1a1e' }}>{options.Title||''}</div>
                <div className="window-control-buttons" style={{ backgroundColor: options.bgColor || '#1a1a1e' }}>
                    <div className="window-control-button window-control-button-min" onClick={this.minimise}/>
                    <div className="window-control-button window-control-button-max" onClick={this.maximise}/>
                    <div className="window-control-button window-control-button-close" onClick={this.closeWindow}/>
                </div>
            </div>
        )
    }

    minimise() {
        this.remote.getCurrentWindow().minimize()
    }

    maximise() {
        let window = this.remote.getCurrentWindow()
        if(window.isMaximized()) {
            window.unmaximize()
        } else {
            window.maximize()
        }
    }

    closeWindow() {
        this.remote.getCurrentWindow().close()
    }

}

export default SuTitlebar;
