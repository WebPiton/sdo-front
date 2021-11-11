import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'
// import home from './home.png'
import Connect from './connect.png'
import AddStudents from './addStudents.png'
import AddUsers from './AddUsers.png'
import Event from './event.svg'
import Import from './import.png'
import Modul from './modul.png'
import EditStudents from './editUser.png'
import { connect } from 'react-redux'

class Menu extends Component {
    render() {

        function typeMenu(type) {
            switch (type) {
                case undefined:
                    return (
                        <React.Fragment>
                            <ul>
                                <Link to="/admin/connect"><img src={Connect} alt="Подключенные устройства" title="Подключенные устройства" /></Link>
                                <p>Подключенные устройства</p>
                            </ul>
                            <ul>
                                <Link to="/admin/import"><img src={Event} alt="Результат тестов" title="Результат тестов" /></Link>
                                <p>Результат тестов</p>
                            </ul>
                        </React.Fragment>
                    )
                case 'admin':
                    return (
                        <React.Fragment>
                            <ul>
                                <Link to="/admin/connect"><img src={Connect} alt="Подключенные устройства" title="Подключенные устройства" /></Link>
                                <p>Подключенные устройства</p>
                            </ul>
                            <ul>
                                <Link to="/admin/add-student"><img src={AddStudents} alt="Добавить ученика" title="Добавить ученика" /></Link>
                                <p>Добавить ученика</p>
                            </ul>
                            <ul>
                                <Link to="/admin/edit-students"><img src={EditStudents} alt="Изменить пользователя" title="Изменить пользователя" /></Link>
                                <p>Изменить ученика</p>
                            </ul>
                            <ul>
                                <Link to="/admin/add-user"><img src={AddUsers} alt="Добавить пользователя" title="Добавить пользователя" /></Link>
                                <p>Добавить пользователя</p>
                            </ul>
                            <ul>
                                <Link to="/admin/event"><img src={Event} alt="Результат тестов" title="Результат тестов" /></Link>
                                <p>Результат тестов</p>
                            </ul>
                            <ul>
                                <Link to="/admin/import"><img src={Import} alt="Добавить тест" title="Добавить тест" /></Link>
                                <p>Добавить тест</p>
                            </ul>
                            <ul>
                                <Link to="/admin/modul"><img src={Modul} alt="Выбор тест" title="Выбор тест" /></Link>
                                <p>Выборать тест</p>
                            </ul>
                        </React.Fragment>
                    )
                default:
                    break;
            }
        }

        return (
            <div className="Menu">
                <nav>
                    {typeMenu('admin')}
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