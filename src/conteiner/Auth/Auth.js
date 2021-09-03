import React, { Component } from "react";
import "./Auth.css";
import { connect } from "react-redux";
import { auth } from "../../store/actions/Auth";

class Auth extends Component {
  componentDidMount() {
    document.title = "Авторизация";
  }

  render() {
    const auth = (e) => {
      e.preventDefault();
      var email = document.querySelector(".email").value;
      var password = document.querySelector(".password").value;
      this.props.auth(email, password);
    };

    return (
      <React.Fragment>
        <div className="Auth">
          <form>
            <h1 style={{ margin: "auto", marginBottom: "10px" }}>
              Авторизация
            </h1>
            <input className="email" type="text" placeholder="Почта" />
            {this.props.code === 401 ? (
              <React.Fragment>
                <p className="error">{this.props.description}</p>
              </React.Fragment>
            ) : null}
            <input className="password" type="password" placeholder="Пароль" />
            {this.props.code === 402 ? (
              <React.Fragment>
                <p className="error">{this.props.description}</p>
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
    description: state.auth.description,
    code: state.auth.code,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
