import React, { Component } from "react";
import "./Test.css";
import Countdown from "react-countdown";
import Loader from "../../component/Loader/Loader";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";
import axios from "../../axios/axios";

class Test extends Component {
  state = {
    loader: false,
    header: [],
    questions: [],
    subjectName: "Математика",
    name: "Уравнение",
    timeToComplete: "45",
    numberOfQuestions: "6",
  };

  componentDidMount() {
    document.title = "Тест";
    axios({
      url:
        "/" +
        this.props.location.state.idSchool +
        "/" +
        this.props.location.state.idGroup +
        "/" +
        this.props.location.state.idStudent +
        "/start_test/" +
        this.props.location.state.id,
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      data: { token: this.props.location.state.token },
    }).then((result) => {
      this.setState({
        header: result.data.header,
        questions: result.data.questions,
        loader: true
      });
    }).catch((err) => {
      alert('Ошибка, страница будет перезагружена')
      window.location.reload()
      console.log(err);
    })
    var tests = document.querySelectorAll(".startTestItem");

    // if (tests.length <= this.state.numberOfQuestions) {
    //   setTimeout(() => {
    //     this.setState({ loader: true });
    //   }, 1000);
    // } else {
    //   setTimeout(() => {
    //     // window.location.reload()
    //   }, 1300);
    // }
  }

  render() {
    const studentpage = () => {
      var qwe = "modul";
      this.props.studentPage(qwe);
    };

    const Completionist = () => {
      let ans = document.querySelectorAll("input");
      let arr = [];
      for (var i = 0, length = ans.length; i < length; i++) {
        if (ans[i].checked) {
          arr.push({
            number: ans[i].name,
            variant: ans[i].getAttribute("variant"),
            answers: ans[i].value,
          });
        } else {
          arr.push({
            number: ans[i].name,
            variant: ans[i].getAttribute("variant"),
            answers: null,
          });
        }
      }

      axios({
        url:
          "/" +
          this.props.location.state.idSchool +
          "/" +
          this.props.location.state.idGroup +
          "/" +
          this.props.location.state.idStudent +
          "/end_test/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: {
          header: {
            module_id: this.state.header.id,
            student_token: this.props.location.state.token,
          },
          arr,
        },
      }).then((result) => {
        console.log(this.props.location.state);
        studentpage();
        this.props.history.push("/modul", {
          idSchool: this.props.location.state.idSchool,
          idGroup: this.props.location.state.idGroup,
          idStudent: this.props.location.state.idStudent,
          token: this.props.location.state.token,
        })
      }).catch((err) => {
          console.log(err);
        });
    };

    const vhode = (e) => {
      e.preventDefault();
      let ans = document.querySelectorAll("input");
      let arr = [];
      for (var i = 0, length = ans.length; i < length; i++) {
        if (ans[i].checked) {
          arr.push({
            number: ans[i].name,
            variant: ans[i].getAttribute("variant"),
            answers: ans[i].value,
          });
        } else {
          arr.push({
            number: ans[i].name,
            variant: ans[i].getAttribute("variant"),
            answers: null,
          });
        }
      }

      axios({
        url:
          "/" +
          this.props.location.state.idSchool +
          "/" +
          this.props.location.state.idGroup +
          "/" +
          this.props.location.state.idStudent +
          "/end_test/",
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        data: {
          header: {
            module_id: this.state.header.id,
            student_token: this.props.location.state.token,
          },
          arr,
        },
      }).then((result) => {
        console.log(this.props.location.state);
        studentpage();
        this.props.history.push("/modul", {
          idSchool: this.props.location.state.idSchool,
          idGroup: this.props.location.state.idGroup,
          idStudent: this.props.location.state.idStudent,
          token: this.props.location.state.token,
        })
      }).catch((err) => {
          console.log(err);
        });
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

    return (
      <div className="startTest">
        <form id="answer">
          {/* <Header name={this.props.name} group={this.props.group} /> */}
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
            <button onClick={vhode}>Завершить тест</button>
          </div>
          <div className="startTestContent">
            {this.state.questions.map((quiz) => {
              return (
                <div className="startTestItem" key={nanoid()}>
                  <h1 key={nanoid()} className="task">
                    Задание №{quiz.number}
                  </h1>
                  <p key={nanoid()} className="contentTask">
                    {quiz.text}
                  </p>
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
