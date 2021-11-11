import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios/axios'
import classes from './Connection.module.css'

class Connection extends Component {
    state = {
        students: []
    }

    componentDidMount() {
        document.title = 'Подключенные устройства';
        // setInterval(() => {
        //     axios.get('/admin/students?type=get&session=' + this.props.session)
        //     .then(response => {
        //         this.setState({
        //             students: response.data.data.sessions
        //         })
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // }, 5000);
    }

    render() {

        const disableAll = () => {
            axios.get('/admin/students?type=kickall&session=' + this.props.session)
            .then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
        }

        const disableStudent = (skey) => {
            // axios.get('/admin/students?type=kick&session=' + this.props.session + '&studkey=' + skey)
            // .then(response => {
            //     console.log(response.data);
            // }).catch(err => {
            //     console.log(err);
            // })
        }

        const zoneChange = (e) =>{
            document.getElementById("school").style.display = "flex";
            console.log(document.getElementById("zoneSelect").value);
        }

        const schoolChange = (e) =>{
            document.getElementById("classes").style.display = "flex";
            console.log(document.getElementById("schollSelect").value);
        }

        return (
            <React.Fragment>
                <div className={classes.Connection}>
                    <h1 className={classes.home}>Устройства</h1>
                    <div className={classes.conteiner}>
                        <div className={classes.control}>
                            <div className={classes.controlButton}>
                                <button className={classes.compound}>Обновить соединение</button>
                                <button className={classes.compound} onClick={disableAll}>Обнулить все соединение</button>
                            </div>
                            <div className={classes.controlSelect}>
                                <p className={classes.zone} id="zone">
                                    Показать все районы:
                                    <select id="zoneSelect" onChange={zoneChange}>
                                        <option>Показать все районы</option>
                                        <option value='1'>1</option>
                                    </select>
                                </p>
                                <p className={classes.school} id="school">
                                    Показать все школы:
                                    <select id="schollSelect" onChange={schoolChange}>
                                        <option>Показать все школы</option>
                                        <option value='1'>1</option>
                                    </select>
                                </p>
                                <p className={classes.classes} id="classes">
                                    Показать по классу:
                                    <select id="classesSelect">
                                        <option> Показывать все классы </option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div className={classes.container}>
                            {
                                this.state.students.length === 0
                                ? <h1 className={classes.noCon}>Нет соединений</h1>
                                : this.state.students.map((students) => {
                                    return (
                                        <div className={classes.item}  key={nanoid()}>
                                            <button className={classes.confirmed} onClick={() => disableStudent(students.skey)} key={nanoid()}>Подключен</button>
                                            <div style={{margin: "auto"}} key={nanoid()}>
                                                <p key={nanoid()}>ФИО: <span className={classes.fullName} key={nanoid()}>{students.firstnam} {students.lastname} {students.middlename}</span>, класс: <span className={classes.class} key={nanoid()}>{students.name}</span></p>
                                                <p key={nanoid()}>Результат: <span className={classes.result} key={nanoid()}>{students.result}</span></p>
                                                <p key={nanoid()}>{students.lastresult}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        session: state.auth.session
    }
}

export default connect(mapStateToProps)(Connection)