import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'
import home from './home.svg'
import { connect } from 'react-redux'

class Menu extends Component {
    render() {
        return (
            <div className="Menu">
                <nav>
                    {
                        this.props.atype === 'default'
                        ?
                            <React.Fragment>
                                <ul>
                                    <Link to="/personal"><img src={home} alt="Подключенные устройства" title="Подключенные устройства" /></Link>
                                    <p>Подключенные устройства</p>
                                </ul>
                            </React.Fragment>
                        : null
                    }
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        atype: state.auth.typeAccount
    }
}

export default connect(mapStateToProps)(Menu)