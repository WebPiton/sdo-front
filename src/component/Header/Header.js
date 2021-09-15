import React from 'react'
import classes from './Header.module.css'

const Header = props => {
    return (
        <div className={classes.Header}>
            <p className={classes.fullNamePar}>Вы вошли как: <span>{props.name}, {props.group}</span></p>
        </div>
    )
}

export default Header