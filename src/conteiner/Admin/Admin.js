import React, { Component } from "react";
import "./Admin.css"

class Admin extends Component {
  componentDidMount() {
    document.title = "Админ панель";
  }

  render() {
    return (
      <React.Fragment>
          <h1>Личный кабинет</h1>
      </React.Fragment>
    );
  }
}

export default Admin;
