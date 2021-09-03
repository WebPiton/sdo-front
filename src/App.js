import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { autoLogin } from "./store/actions/Auth";

import Main from "./conteiner/Main/Main";
import Layout from "./hoc/Layout/Layout";
import Auth from "./conteiner/Auth/Auth";
import Reg from "./conteiner/Reg/Reg";
import NotFound from "./conteiner/NotFound/NotFound";
import Personal from "./conteiner/Personal/Personal";
import Admin from "./conteiner/Admin/Admin";

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.autoLogin();
    }, 1);
  }

  render() {
    function routerType(type) {
      switch(type) {
        case 'default':
          return (
            <Switch>
              <Route path='/personal' exact component={Personal} />
              <Route path="*" component={NotFound} />
            </Switch>
          )
        case 'admin':
          return (
            <Switch>
              <Route path='/admin' exact component={Admin} />
              <Route path="*" component={NotFound} />
            </Switch>
          )
        default:
          return
      }
    }

    function routerUser(user, type) {
      switch (user) {
        case false:
          return (
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/auth" exact component={Auth} />
              <Route path="/reg" exact component={Reg} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
        case true:
          return (
            <Switch>
              <Route
                path="/auth"
                exact
                render={() =>
                  user ? <Redirect to="/" /> : <Redirect to="/auth" />
                }
              />
              <Route
                path="/reg"
                exact
                render={() =>
                  user ? <Redirect to="/" /> : <Redirect to="/reg" />
                }
              />
              <Route path="/" exact component={Main} />
              {routerType(type)}
            </Switch>
          );
        default:
          return (
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="*" component={NotFound} />
            </Switch>
          );
      }
    }
    return (
      <Layout>
        {routerUser(this.props.isAuthenticated, this.props.typeAccount)}
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    typeAccount: state.auth.typeAccount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
