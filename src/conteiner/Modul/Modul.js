import React, { Component } from "react";
import "./Modul.css";
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";
import { nanoid } from "nanoid";
import Loader from "../../component/Loader/Loader";
import { Link } from "react-router-dom";
import Out from "../../component/Out/Out";
import axios from "../../axios/axios";

class Modul extends Component {
  state = {
    loading: true,
    tests: [],
  };

  componentDidMount() {
    document.title = "Выбор теста";
    setTimeout(() => {
      axios({
        url:
          "/" +
          sessionStorage.getItem("idSchool") +
          "/" +
          sessionStorage.getItem("idGroup") +
          "/" +
          sessionStorage.getItem("idStudent") +
          "/get_avaliable_tests",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      })
        .then((result) => {
          this.setState({
            tests: result.data,
            loading: false,
          });
        })
        .catch((err) => {
          alert("Ошибка, страница будет перезагружена");
          window.location.reload();
          console.log(err);
        });
    }, 10);
  }

  render() {
    const studentpage = () => {
      var qwe = "test";
      this.props.studentPage(qwe);
    };

    return (
      <React.Fragment>
        <div className="testSelection">
          <div className="testSelectionContent">
            {this.state.loading ? (
              <div className="loadmodul">
                <h1>Подождите загрузку</h1>
                <Loader />
              </div>
            ) : this.state.tests.length !== 0 ? (
              this.state.tests.map((item) => {
                return (
                  <div
                    className={
                      item.isCompleted === true
                        ? "testSelectionItemClose"
                        : "testSelectionItem"
                    }
                    key={nanoid()}
                  >
                    <Link
                      to={{
                        pathname: "/test",
                        state: {
                          id: item.id,
                          idSchool: sessionStorage.getItem("idSchool"),
                          idGroup: sessionStorage.getItem("idGroup"),
                          idStudent: sessionStorage.getItem("idStudent"),
                          token: sessionStorage.getItem("token"),
                        },
                      }}
                      onClick={studentpage}
                      key={nanoid()}
                    >
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
                      {item.isCompleted === true ? (
                        <p
                          className={
                            item.isCompleted === true ? "linkclose" : null
                          }
                          key={nanoid()}
                        >
                          Тест уже пройден
                        </p>
                      ) : (
                        <p key={nanoid()}>
                          Время на выполнение:{" "}
                          <span className="spanInfo" key={nanoid()}>
                            <span id="time" key={nanoid()}>
                              45 минут
                            </span>
                          </span>
                        </p>
                      )}
                    </Link>
                  </div>
                );
              })
            ) : (
              <h1 className="notest">Тестов нет</h1>
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
