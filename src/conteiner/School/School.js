import React, { Component } from "react";
import "./School.css";
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import Out from "../../component/Out/Out";
import axios from "../../axios/axios";

class School extends Component {
  state = {
    school: [],
  };
  componentDidMount() {
    document.title = "Школа";
    axios
      .get("/get_mo_schools/" + this.props.match.params.id)
      .then((response) => {
        const data = response.data;
        console.log(data);
        let arr = [];
        for (let i of data) {
          if (i.type !== "Иные") {
            arr.push(i);
          }
        }
        this.setState({
          school: arr,
        });
      })
      .catch((err) => {
        alert('Ошибка, страница будет перезагружена')
        window.location.reload()
        console.log(err);
      })
  }

  render() {
    const studentpage = () => {
      var qwe = "choice";
      this.props.studentPage(qwe);
    };
    return (
      <React.Fragment>
        <p>Школа</p>
        <div className="navlink">
          {this.state.school.map((item) => {
            return (
              <Link
                to={{ pathname: "/choice/" + item.id, state: { idSchool: item.id} }}
                onClick={studentpage}
                className="link"
                key={nanoid()}
              >
                {item.name_short}
              </Link>
            );
          })}
        </div>
        <Out />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentPage: (qwe) => dispatch(studentPage(qwe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(School);
