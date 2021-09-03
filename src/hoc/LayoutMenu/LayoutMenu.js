import React, { Component } from 'react'
import classes from './LayoutMenu.module.css'
import Menu from '../../component/Menu/Menu'

class LayoutMenu extends Component {
    render() {
        return (
            <div className={classes.LayoutMenu}>
                <Menu />
                <main>
                    {
                        this.props.children
                    }
                </main>
            </div>
        )
    }
}

export default LayoutMenu