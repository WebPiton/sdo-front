import React, { Component } from 'react'
import './EditStudent.css'
import axios from '../../../axios/axios'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'

class EditStudent extends Component {
    state = {
        groupName: [],
        fullName: [],
        сurrentStudent: [],
        gid: 'DEFAULT'
    }

    componentDidMount() {
        document.title = 'Редактирование ученика';
        axios.get('student/choice?type=group')
        .then(response => {
            this.setState({
                groupName: response.data.data.groups
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {

        const groupChangeHandler= (e) => {
            axios.get('student/choice?type=student&gid='+ e.target.value)
            .then(response => {
                // console.log(response.data.data);
                this.setState({
                    fullName: response.data.data.students
                })
            }).catch(err => {
                console.log(err);
            })

            this.setState({
                gid: e.target.value
            })
        }

        const nameChangeHandler = (e) => {
            if (e.target.value !== 'DEFAULT') {
                axios.get('/admin/student/get?session=' + this.props.session + '&sid=' + e.target.value)
                .then(response => {
                    console.log(response.data.data.data[0]);
                    let lastname = document.querySelector('.lastname')
                    let firstname = document.querySelector('.firstname')
                    let middlename = document.querySelector('.middlename')
                    let sid = document.querySelector('.sid')
                    lastname.value = response.data.data.data[0].lastname
                    firstname.value = response.data.data.data[0].firstname
                    middlename.value = response.data.data.data[0].middlename
                    sid.value = response.data.data.data[0].id
                }).catch(err => {
                    console.log(err);
                })
            }
        }

        const editStudent = (e) => {
            e.preventDefault()
            const dataReqest = new FormData()

            let lastname = document.querySelector('.lastname')
            let firstname = document.querySelector('.firstname')
            let middlename = document.querySelector('.middlename')
            let sid = document.querySelector('.sid')

            dataReqest.append('session', this.props.session)
            dataReqest.append('lastname', lastname.value)
            dataReqest.append('firstname', firstname.value)
            dataReqest.append('middlename', middlename.value)
            dataReqest.append('sid', sid.value)
            dataReqest.append('gid', this.state.gid)

            axios.post('/admin/student/edit', dataReqest)
            .then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
        }

        return (
            <React.Fragment>
                <div className="EditStudent">
                    <h1>Редактирование ученика</h1>
                    <div className="selectorStudent" >
                        <select name="" id="groupName" value={this.state.gid} onChange={groupChangeHandler}>
                            <option value='DEFAULT'  disabled="disabled">Выберите свой класс</option>
                            {this.state.groupName.map((group) => {
                                return (
                                    <option value={group.id}  key={nanoid()}>{group.name}</option>
                                )
                            })}
                        </select>
                        <select name="" id="fullName" defaultValue="DEFAULT" onChange={nameChangeHandler}>
                            <option value='DEFAULT'  disabled="disabled">Выберите ФИО</option>
                            {this.state.fullName.map((fullname) => {
                                return (
                                    <option value={fullname.id} key={nanoid()}>{fullname.lastname + ' '+ fullname.firstname + ' ' + fullname.middlename}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="editStudentInput">
                        <input type='text' className="lastname" placeholder="Фамилия" />
                        <input type='text' className="firstname" placeholder="Имя" />
                        <input type='text' className="middlename" placeholder="Отчество" />
                        <input type='text' className="sid" style={{display: 'none'}}/>
                    </div>
                    <button onClick={editStudent}>Изменить ученика</button>
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

export default connect(mapStateToProps)(EditStudent)