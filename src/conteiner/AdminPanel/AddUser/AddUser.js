import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from '../../../axios/axios';
import './AddUser.css'

class AddUser extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const createUser = (e) => {
            e.preventDefault()
            const dataReqest = new FormData()
            let lastname = document.querySelector('.lastname').value
            let firstname = document.querySelector('.firstname').value
            let middlename = document.querySelector('.middlename').value
            let login = document.querySelector('.login').value
            let password = document.querySelector('.password').value
            let type = document.querySelector('.type').value
            dataReqest.append('lastname', lastname)
            dataReqest.append('firstname', firstname)
            dataReqest.append('middlename', middlename)
            dataReqest.append('login', login)
            dataReqest.append('password', password)
            dataReqest.append('type', type)
            dataReqest.append('session', this.props.session)
            axios.post('/account/create', dataReqest)
            .then(response => {
                console.log(response.data)
                document.getElementById("createUser").reset()
            }).catch(err => {
                console.log(err)
            })
        }

        return (
            <React.Fragment>
                <div className="AddUser">
                    <h1>Добавление нового пользователся</h1>
                    <form id="createUser" className="createUser" >
                        <input className="lastname" placeholder='Фамилия'/>
                        <input className="firstname" placeholder='Имя'/>
                        <input className="middlename" placeholder='Отчество'/>
                        <input className="login" placeholder='Логин'/>
                        <input className="password" type='password' placeholder='Пароль'/>
                        <select className="type" defaultValue='DEFAULT'>
                            <option value='DEFAULT'  disabled="disabled">Выберите тип аккаунта</option>
                            <option value="teacher">Методист</option>
                            <option value="methodist">Учитель</option>
                        </select>
                        <button type="submit" onClick={createUser} >Создать</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
function mapDispatchToProps(state) {
    return {
        session: state.auth.session
    }
}

export default connect(mapDispatchToProps)(AddUser)