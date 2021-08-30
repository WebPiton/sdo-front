import React, { Component } from "react";
import "./Reg.css";

class Reg extends Component {
  state = {
    error: this.props.error,
  };

  componentDidMount() {
    document.title = "Регистрация";
  }

  render() {
    function validateEmail(maill) {
      var pattern =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(maill);
    }

    const pressHandler = async () => {
      const maill = document.querySelector('#email').value
      const password = document.querySelector('#password').value
      const repitPassword = document.querySelector('#repitPassword').value
      const name = document.querySelector('#name').value
      if (!validateEmail(maill)) {
        alert("Почта указанно не корректно");
        return false;
      }
      if (!password.trim() || password.length <= 5) {
        if (!password.trim()) {
          alert("Пароль не может быть пустым");
          return false;
        }
        if (password.length <= 5) {
          alert("Пароль меньше 6 символов");
          return false;
        }
        alert("Введите не корректный пароль");
        return false;
      }
      if (password != repitPassword) {
        alert("Повторный пароль введен не верно");
        return false;
      }
      if (!name.trim()) {
        alert('Введите имя');
      }
    };

    return (
      <React.Fragment>
        <form className='regForm'>
          <input id='email' placeholder='Почта' />
          <input id='password' placeholder='Пароль' />
          <input id='repitPassword' placeholder='Повторный пароль' />
          <input id='name' placeholder='Имя' />
          <div className='regbuttons'>
            <button>Назад</button>
            <button onClick={pressHandler}>Зарегестрироватся</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Reg;
