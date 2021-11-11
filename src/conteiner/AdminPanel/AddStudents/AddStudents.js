import React, { Component } from 'react'
import classes from './AddStudents.module.css'

class AddStudents extends Component {
    state = {
        add: 'school'
    }

    componentDidMount() {
        document.title = 'Добавление учеников';
    }

    render() {

        const add = (add) => {
            switch (add) {
                case 'zone':
                    return (
                        <p>Добавить район</p>
                    )
                case 'school':
                    return (
                        <React.Fragment>
                            <p>
                                Выберите район
                                <select>
                                    <option>Выберите район</option>
                                </select>
                            </p>
                        </React.Fragment>
                    )
                case 'student':
                    return (
                        <React.Fragment>
                            <p>
                                Выберите район
                                <select>
                                    <option>Выберите район</option>
                                </select>
                            </p>
                            <p>
                                Выберите школу
                                <select>
                                    <option>Выберите школу</option>
                                </select>
                            </p>
                            <p>
                                Выберите клас
                                <select>
                                    <option>Выберите класс</option>
                                </select>
                            </p>
                        </React.Fragment>
                    )
                default:
                    break;
            }
        }

        return (
            <div className={classes.addStudents}>
                {add(this.state.add)}
            </div>
        )
    }
}

export default AddStudents