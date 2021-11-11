import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { autoPage } from "./store/actions/Auth";
import Layout from "./hoc/Layout/Layout";
import Menu from './component/Menu/Menu'

// Студент
import NotFound from "./conteiner/NotFound/NotFound";
import Zone from "./conteiner/Students/Zone/Zone";
import Modul from "./conteiner/Students/Modul/Modul";
import School from "./conteiner/Students/School/School";
import Test from "./conteiner/Students/Test/Test";
import Сhoice from './conteiner/Students/Сhoice/Сhoice'
import Results from './conteiner/Students/Result/Result'

// Админка
import Panel from './conteiner/AdminPanel/Panel'
import Connect from './conteiner/AdminPanel/Connection/Connection'
import AddStudent from './conteiner/AdminPanel/AddStudents/AddStudents'
import AddUser from './conteiner/AdminPanel/AddUser/AddUser'
import EditStudents from './conteiner/AdminPanel/EditStudent/EditStudent'
import Event from './conteiner/AdminPanel/Events/Events'
import ExportEstimates from './conteiner/AdminPanel/ExportEstimates/ExportEstimates'
import Import from './conteiner/AdminPanel/Import/Import'
import ModulAdmin from './conteiner/AdminPanel/Modul/Modul'

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.autoPage();
    }, 100);
    setInterval(() => {
      if (this.props.location.state !== undefined) {
        if (this.props.location.state.idZone !== undefined && sessionStorage.getItem("idZone") !== this.props.location.state.idZone) {
          sessionStorage.setItem("idZone", this.props.location.state.idZone);
        }
        if (this.props.location.state.idSchool !== undefined && sessionStorage.getItem("idSchool") !== this.props.location.state.idSchool) {
          sessionStorage.setItem("idSchool", this.props.location.state.idSchool);
        }
        if (this.props.location.state.idGroup !== undefined && sessionStorage.getItem("idGroup") !== this.props.location.state.idGroup) {
          sessionStorage.setItem("idGroup", this.props.location.state.idGroup);
        }
        if (this.props.location.state.idStudent !== undefined && sessionStorage.getItem("idStudent") !== this.props.location.state.idStudent) {
          sessionStorage.setItem("idStudent", this.props.location.state.idStudent);
        }
        if (this.props.location.state.token !== undefined && sessionStorage.getItem("token") !== this.props.location.state.token) {
          sessionStorage.setItem("token", this.props.location.state.token);
        }
        if (this.props.location.state.idTest !== undefined && sessionStorage.getItem("idTest") !== this.props.location.state.idTest) {
          sessionStorage.setItem("idTest", this.props.location.state.idTest);
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
    function adminRouter(){
      return (
        <Switch>
          <Route path="/admin" exact component={Panel} />
          <Route path="/admin/connect" exact component={Connect} />
          <Route path="/admin/add-student" exact component={AddStudent} />
          <Route path="/admin/add-user" exact component={AddUser} />
          <Route path="/admin/edit-students" exact component={EditStudents} />
          <Route path="/admin/event" exact component={Event} />
          <Route path="/admin/export-estimates" exact component={ExportEstimates} />
          <Route path="/admin/import" exact component={Import} />
          <Route path="/admin/modul" exact component={ModulAdmin} />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      );
    }

    function studentRouter(student) {
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
        case "result":
          return (
            <Switch>
              <Route path="/result" exact component={Results} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        default:
          return;
      }
    }

    return <Layout>
        {
          window.location.pathname.split('/')[1] === 'admin' ?
          <React.Fragment>
            <Menu /><Panel>{adminRouter()}</Panel>
          </React.Fragment>
            :
          studentRouter(this.props.student)
        }
      </Layout>;
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
