import React, { Component } from "react";
import "./Auth.css";
import { connect } from "react-redux";
import { auth } from "../../store/actions/Auth";

class Auth extends Component {
  state = {
    error: this.props.error,
  };

  componentDidMount() {
    document.title = "Авторизация";
  }

  render() {
    const auth = (e) => {
      e.preventDefault();
      var login = document.querySelector(".login").value;
      var password = document.querySelector(".password").value;
      this.props.auth(login, password);
    };

    return (
      <React.Fragment>
        <div className='Auth'>
          <form>
            <h1 style={{ margin: "auto", marginBottom: "10px" }}>
              Авторизация
            </h1>
            <input className='login' type='text' placeholder='Логин' />
            {this.props.error === "Параметр 'login' не был отправлен" ? (
              <React.Fragment>
                <p className='error'>Отсутствует логин</p>
              </React.Fragment>
            ) : null}
            {this.props.error === "Аккаунт с введённым логином отсутствует" ? (
              <React.Fragment>
                <p className='error'>{this.props.error}</p>
              </React.Fragment>
            ) : null}
            <input className='password' type='password' placeholder='Пароль' />
            {this.props.error === "Параметр 'password' не был отправлен" ? (
              <React.Fragment>
                <p className='error'>Отсутствует пароль</p>
              </React.Fragment>
            ) : null}
            {this.props.error === "Введён неверный пароль" ? (
              <React.Fragment>
                <p className='error'>{this.props.error}</p>
              </React.Fragment>
            ) : null}
            <button onClick={auth}>Войти</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
