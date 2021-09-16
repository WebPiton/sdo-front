import React, { Component } from "react";
import "./NotFound.css"
import notfound from './studentmarket.jpg'
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";

class NotFound extends Component {
  componentDidMount() {
    document.title = "Такая страница не найдена";
  }

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
      <div className='notfound'>
        <img src={notfound} alt='notfound' />
        <p>Такой страницы не существует</p>
        {this.props.page === "test" ? null : (
          <button className='outnot' onClick={out}>
            Главная
          </button>
        )}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
