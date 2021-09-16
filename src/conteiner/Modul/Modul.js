import React, { Component } from "react";
import "./Modul.css";
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";
import { nanoid } from "nanoid";
import Loader from '../../component/Loader/Loader'
import { Link } from 'react-router-dom'
import Out from "../../component/Out/Out";
import axios from '../../axios/axios'

class Modul extends Component {
  state = {
    loading: true,
    tests: [],
  };

  componentDidMount() {
    document.title = "Выбор теста";
      axios({
        url: "/"+ this.props.idSchool + "/"+ this.props.location.state.idGroup + "/"+ this.props.location.state.idStudent + "/get_avaliable_tests",
        headers: {
          "Content-Type": "application/json",
        },
        method: 'post',
        data: {'token': this.props.location.state.token}
      }).then(result => {
        this.setState({
          tests: result.data,
          loading: false
        })
      }).catch((err) => {
        alert('Ошибка, страница будет перезагружена')
        window.location.reload()
        console.log(err);
      })
  }

  render() {

    const studentpage = () => {
      var qwe = "test";
      this.props.studentPage(qwe);
    };

    return (
      <React.Fragment>
        <div className="testSelection">
          {/* <Header name={this.props.name} group={this.props.group} /> */}
          <div className="testSelectionContent">
            {this.state.loading ? (
              <div className='loadmodul'>
                {/* <h1>
                  Подождите загрузку
                </h1> */}
                <Loader />
              </div>
            ) : (
              this.state.tests.map((item) => {
                return (
                  <div className="testSelectionItem" key={nanoid()}>
                    <Link to={{ pathname: '/test', state: {id: item.id, idSchool: this.props.location.state.idSchool, idGroup: this.props.location.state.idGroup, idStudent: this.props.location.state.idStudent, token: this.props.location.state.token} }} onClick={studentpage} key={nanoid()}>
                      <p key={nanoid()}>
                        Название предмета:{" "}
                        <span className="spanInfo" key={nanoid()}>
                          {item.sbj}
                        </span>
                      </p>
                      <p key={nanoid()}>
                        Название теста:{" "}
                        <span className="spanInfo" key={nanoid()}>
                          {item.name}
                        </span>
                      </p>
                      <p key={nanoid()}>
                        Время на выполнение:{" "}
                        <span className="spanInfo" key={nanoid()}>
                          <span id="time" key={nanoid()}>
                            45
                          </span>{" "}
                          минут
                        </span>
                      </p>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <Out />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.student.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentPage: (qwe) => dispatch(studentPage(qwe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modul);
