import React, { Component } from "react";
import "./Main.css"

class Main extends Component {
  componentDidMount() {
    document.title = "Главная";
  }

  render() {
    return (
      <React.Fragment>
        <p>Hello world!</p>
      </React.Fragment>
    );
  }
}

export default Main;
