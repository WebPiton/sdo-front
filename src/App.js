import React, { Component } from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import { connect } from "react-redux";
import { autoLogin } from "./store/actions/Auth";
import Home from './conteiner/Home/Home'
import Auth from "./conteiner/Auth/Auth";
import Reg from "./conteiner/Reg/Reg";

class App extends Component {
  componentDidMount() {
    console.log(this.props.isAuthenticated);
    setInterval(() => {
      this.props.autoLogin();
    }, 1);
  }

  render() {
    const Main = () => {
      return (
        <Switch>
          <Route
            path='/' exact component={Home}
          />
        </Switch>
      )

    }

    function routerUser(user) {
      switch (user) {
        case false:
          return (
            <React.Fragment>
              <Main />
              <Switch>
                <Route path='/auth' exact component={Auth} />
                <Route path='/reg' exact component={Reg} />
              </Switch>
            </React.Fragment>

          );
        case true:
          return (<React.Fragment>
            <Main />
            <Switch>
              <Route
                path='/auth'
                exact
                render={() =>
                  user ? <Redirect to='/' /> : <Redirect to='/auth' />
                }
              />
              <Route
                path='/reg'
                exact
                render={() =>
                  user ? <Redirect to='/' /> : <Redirect to='/reg' />
                }
              />
            </Switch>
          </React.Fragment>);
        default:
          break;
      }
    }
    return <Layout>{routerUser(this.props.isAuthenticated)}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
