import React, { Component } from "react";
import "./Reg.css";
import { connect } from "react-redux";
import { reg } from "../../store/actions/Auth";

class Reg extends Component {
  componentDidMount() {
    document.title = "Авторизация";
  }

  render() {
    const reg = (e) => {
      e.preventDefault();
      var email = document.querySelector("#email").value;
      var password = document.querySelector("#password").value;
      var repitPassword = document.querySelector("#repitPassword").value;
      this.props.reg(email, password, repitPassword);
    };

    if (this.props.code === 0) alert(this.props.description)

    return (
      <React.Fragment>
        <form className="regForm">
          <input id="email" type="email" placeholder="Почта" />
          {this.props.code === 403 ? (
            <React.Fragment>
              <p className="error">{this.props.description}</p>
            </React.Fragment>
          ) : null}
          {this.props.code === 405 ? (
            <React.Fragment>
              <p className="error">{this.props.description}</p>
            </React.Fragment>
          ) : null}
          <input id="password" type="password" placeholder="Пароль" />
          {this.props.code === 406 ? (
            <React.Fragment>
              <p className="error">{this.props.description}</p>
            </React.Fragment>
          ) : null}
          <input
            id="repitPassword"
            type="password"
            placeholder="Повторный пароль"
          />
          {this.props.code === 407 ? (
            <React.Fragment>
              <p className="error">{this.props.description}</p>
            </React.Fragment>
          ) : null}
          <div className="regbuttons">
            <button>Назад</button>
            <button onClick={reg}>Зарегестрироватся</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    description: state.auth.description,
    code: state.auth.code,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reg: (email, password, repitPassword) =>
      dispatch(reg(email, password, repitPassword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reg);
