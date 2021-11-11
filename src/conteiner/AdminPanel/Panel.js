import React, { Component } from 'react'
import classes from './Panel.module.css'

class Panel extends Component {

    componentDidMount() {
        document.title = 'Панель преподователя';
    }

    render() {
        return (
            <React.Fragment>
                <main className={classes.main}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Panel