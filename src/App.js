import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { autoPage } from "./store/actions/Auth";
import Layout from "./hoc/Layout/Layout";

import NotFound from "./conteiner/NotFound/NotFound";
import Zone from "./conteiner/Zone/Zone";
import Modul from "./conteiner/Modul/Modul";
import School from "./conteiner/School/School";
import Test from "./conteiner/Test/Test";
import Сhoice from './conteiner/Сhoice/Сhoice'

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.autoPage();
    }, 100);
  }

  render() {
    function routerStudent(student) {
      switch (student) {
        case "zone":
          return (
            <Switch>
              <Route path="/" exact component={Zone} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        case "school":
          return (
            <Switch>
              <Route path="/school/:id" exact component={School} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        case "choice":
          return (
            <Switch>
              <Route path="/choice/:id" exact component={Сhoice} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        case "modul":
          return (
            <Switch>
              <Route path="/modul" exact component={Modul} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        case "test":
          return (
            <Switch>
              <Route path="/test" exact component={Test} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        default:
          return;
      }
    }

    return <Layout>{routerStudent(this.props.student)}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    student: state.auth.studentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoPage: () => dispatch(autoPage()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
