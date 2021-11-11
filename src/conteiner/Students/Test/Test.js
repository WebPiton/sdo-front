import React, { Component } from "react";
import "./Test.css";
import Countdown from "react-countdown";
import Loader from "../../../component/Loader/Loader";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { studentPage } from "../../../store/actions/Auth";
import axios from "../../../axios/axios";
import Alert from "../../../component/Alert/Alert";

class Test extends Component {
  constructor() {
    super();
    this.state = {
      interpretedAlert: null,
      loader: false,
      header: [],
      questions: [],
      timeToComplete: "45",
    };
  }

  componentDidMount() {
    document.title = "Тест";
    setTimeout(() => {
      axios({
        url:
          "/" +
          sessionStorage.getItem("idSchool") +
          "/" +
          sessionStorage.getItem("idGroup") +
          "/" +
          sessionStorage.getItem("idStudent") +
          "/start_test/" +
          this.props.location.state.id,
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: { token: sessionStorage.getItem("token") },
      })
        .then((result) => {
          this.setState({
            header: result.data.header,
            questions: result.data.questions,
            loader: true,
          });
        })
        .catch((err) => {
          alert("Ошибка, страница будет перезагружена");
          window.location.reload();
          console.log(err);
        });
    }, 100);
  }

  declarativeAlert() {
    this.setState({ showDeclarative: true });
  }

  interpretedAlert(title) {
    const interpretedAlert = (
      <Alert
        onConfirmOrDismiss={() => this.setState({ interpretedAlert: null })}
        show={true}
        title={title}
        type={"success"}
        cancelButtonClass={"false"}
      />
    );
    this.setState({ interpretedAlert: interpretedAlert });
  }

  render() {
    const end = (e) => {
      let ans = document.querySelectorAll("input");
      let arr = [];
      let i = 0
      for ( i of ans ) {
        if (i.checked) {
          arr.push({
            number: i.name,
            variant: i.getAttribute("variant"),
            answers: i.value,
          })
        }
      }
      return arr
    }

    const studentpage = () => {
      var qwe = "result";
      this.props.studentPage(qwe);
    };

    const Completionist = () => {
      let arr = end()

      axios({
        url:
          "/" +
          sessionStorage.getItem("idSchool") +
          "/" +
          sessionStorage.getItem("idGroup") +
          "/" +
          sessionStorage.getItem("idStudent") +
          "/end_test/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: {
          header: {
            module_id: this.state.header.id,
            student_token: sessionStorage.getItem("token"),
          },
          arr,
        },
      })
        .then((res) => {
          studentpage();
          this.props.history.push("/result", {
            res
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const vhode = (e) => {
      e.preventDefault();
      const arr = end()
      axios({
        url:
          "/" +
          sessionStorage.getItem("idSchool") +
          "/" +
          sessionStorage.getItem("idGroup") +
          "/" +
          sessionStorage.getItem("idStudent") +
          "/end_test/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: {
          header: {
            module_id: this.state.header.id,
            student_token: sessionStorage.getItem("token"),
          },
          arr,
        },
      })
        .then((result) => {
          console.log(result);
          studentpage();
          this.props.history.push("/result", {
            result: result.data.res,
            nameTest: this.state.header.name
          });
        })
        // .catch((err) => {
        //   alert("Тест не отправлен");
        //   console.log(err);
        // });
    };

    document.body.style.overflow = "visible";

    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (this.state.loader === true) {
        if (completed) {
          Completionist();
          return <p>Время вышло</p>;
        } else {
          return (
            <React.Fragment>
              <p>
                Оставшееся время на выполнение:{" "}
                <span>
                  {hours}:{minutes}:{seconds}
                </span>
              </p>
            </React.Fragment>
          );
        }
      } else {
        document.body.style.overflow = "hidden";
        return (
          <div className="render">
            <div className="content">
              <h1>Подождите загрузку</h1>
              <Loader />
            </div>
          </div>
        );
      }
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    };

    return (
      <div className="startTest">
        <form id="answer" method="post" onKeyDown={handleKeyDown}>
          <div className="startTestInfo">
            <p>
              Название теста: <span>{this.state.header.name}</span>
            </p>
            <p>
              Кол-во вопросов: <span>{this.state.questions.length}</span>
            </p>
            <p>
              Время на выполнение:{" "}
              <span>{this.state.timeToComplete} минут</span>
            </p>
            <Countdown
              date={Date.now() + this.state.timeToComplete * 60000}
              renderer={renderer}
            />
            {this.state.interpretedAlert}
            <button type="submit" onClick={vhode}>
              Завершить тест
            </button>
          </div>
          <div className="startTestContent">
            {this.state.questions.map((quiz, index) => {
              return (
                <div className="startTestItem" key={nanoid()}>
                  <h1 key={nanoid()} className="task">
                    Задание № {index + 1}
                  </h1>
                  {quiz.image !== null ? (
                    <div className="exercise">
                      <p key={nanoid()} className="contentTask">
                        {quiz.text}
                      </p>
                      <img src={quiz.image} alt="" />
                    </div>
                  ) : (
                    <p key={nanoid()} className="contentTask">
                      {quiz.text}
                    </p>
                  )}

                  <div className="answerBlock">
                    <input
                      id={quiz.answ1 + quiz.number}
                      type="radio"
                      variant={quiz.variant}
                      name={quiz.number}
                      value={quiz.answ1}
                      required
                    />
                    <label htmlFor={quiz.answ1 + quiz.number}>
                      {" "}
                      {quiz.answ1}
                    </label>
                    <br />
                    <input
                      id={quiz.answ2 + quiz.number}
                      type="radio"
                      variant={quiz.variant}
                      name={quiz.number}
                      value={quiz.answ2}
                      required
                    />
                    <label htmlFor={quiz.answ2 + quiz.number}>
                      {" "}
                      {quiz.answ2}
                    </label>
                    <br />
                    <input
                      id={quiz.answ3 + quiz.number}
                      type="radio"
                      variant={quiz.variant}
                      name={quiz.number}
                      value={quiz.answ3}
                      required
                    />
                    <label htmlFor={quiz.answ3 + quiz.number}>
                      {" "}
                      {quiz.answ3}
                    </label>
                    <br />
                    <input
                      id={quiz.answ4 + quiz.number}
                      type="radio"
                      variant={quiz.variant}
                      name={quiz.number}
                      value={quiz.answ4}
                      required
                    />
                    <label htmlFor={quiz.answ4 + quiz.number}>
                      {" "}
                      {quiz.answ4}
                    </label>
                    <br />
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.student.name,
    group: state.student.group,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentPage: (qwe) => dispatch(studentPage(qwe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
