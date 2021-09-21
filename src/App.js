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
    setInterval(() => {
      if (this.props.location.state !== undefined) {
        if (this.props.location.state.idZone !== undefined && sessionStorage.getItem("idZone") !== this.props.location.state.idZone) {
          sessionStorage.setItem("idZone", this.props.location.state.idZone);
          // console.log(this.props.location.state.idZone);
        }
        if (this.props.location.state.idSchool !== undefined && sessionStorage.getItem("idSchool") !== this.props.location.state.idSchool) {
          sessionStorage.setItem("idSchool", this.props.location.state.idSchool);
          // console.log(this.props.location.state.idSchool);
        }
        if (this.props.location.state.idGroup !== undefined && sessionStorage.getItem("idGroup") !== this.props.location.state.idGroup) {
          sessionStorage.setItem("idGroup", this.props.location.state.idGroup);
          // console.log(this.props.location.state.idGroup);
        }
        if (this.props.location.state.idStudent !== undefined && sessionStorage.getItem("idStudent") !== this.props.location.state.idStudent) {
          sessionStorage.setItem("idStudent", this.props.location.state.idStudent);
          // console.log(this.props.location.state.idStudent);
        }
        if (this.props.location.state.token !== undefined && sessionStorage.getItem("token") !== this.props.location.state.token) {
          sessionStorage.setItem("token", this.props.location.state.token);
          // console.log(this.props.location.state.token);
        }
        if (this.props.location.state.idTest !== undefined && sessionStorage.getItem("idTest") !== this.props.location.state.idTest) {
          sessionStorage.setItem("idTest", this.props.location.state.idTest);
          // console.log(this.props.location.state.idTest);
        }
      } else {
        sessionStorage.removeItem("idZone");
        sessionStorage.removeItem("idSchool");
        sessionStorage.removeItem("idGroup");
        sessionStorage.removeItem("idStudent");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("idTest");
      }
    }, 0.1);
  }

  render() {
    // console.log(this.props.location.state.idSchool !== null && sessionStorage.getItem("idSchool") !== this.props.location.state.idSchool);
    // console.log(this.props.location.state !== undefined );
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
