import React, { Component } from "react";
import { connect } from "react-redux";
import "./Out.css";
import { studentPage } from "../../store/actions/Auth";

class Out extends Component {
  render() {
    const studentpage = () => {
        var qwe = "zone";
        this.props.studentPage(qwe);
      };

      const out = () => {
        studentpage();
        console.log("qwe");
        return (window.location = "/");
      };

    return (
      <React.Fragment>
        {this.props.page === "test" ? null : (
          <button className='out' onClick={out}>
            Главная
          </button>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.auth.studentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentPage: (qwe) => dispatch(studentPage(qwe))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Out);
