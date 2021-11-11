import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import axios from '../../../axios/axios'
import classes from './Result.module.css'
import { connect } from "react-redux";
import { studentPage } from "../../../store/actions/Auth";

class Results extends Component {
    state = {
        res: [],
        testName:  null
    }
    componentDidMount() {
        document.title = "Результат теста"
        this.setState({
            res: this.props.location.state.result,
            testName: this.props.location.state.nameTest
        })
    }
    render() {
        const studentpage = () => {
            var qwe = "modul";
            console.log('1');
            this.props.studentPage(qwe);
        };

        const textareaBlok = () => {
            document.querySelector('textarea').style.display = "block"
            document.getElementById('endTests').style.display = "block"
            document.getElementById('textareaBlok').style.display = "none"
        }

        const end = () => {
            studentpage()
            this.props.history.push("/modul", {
                idSchool: sessionStorage.getItem("idSchool"),
                idGroup: sessionStorage.getItem("idGroup"),
                idStudent: sessionStorage.getItem("idStudent"),
                token: sessionStorage.getItem("token"),
            });
        }

        const endReviewTest = () => {
            axios({
                url:
                  "/" +
                  sessionStorage.getItem("idSchool") +
                  "/" +
                  sessionStorage.getItem("idGroup") +
                  "/" +
                  sessionStorage.getItem("idStudent") +
                  "/send_review/",
                headers: {
                  "Content-Type": "application/json",
                },
                method: "post",
                data: {
                    token: sessionStorage.getItem("token"),
                    review_text: document.querySelector('textarea').value
                },
              })
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                });
        }

        return (
            <div className={classes.result}>
                <div className={classes.resTestInfo}>
                    <p>Название теста: <span>{this.state.testName}</span></p>
                </div>
                {this.state.res.map(item => {
                    return (
                        <div className={classes.resTest} key={nanoid()}>
                            <div className={classes.resAsnwerInfo} key={nanoid()}>
                                <p className={classes.exercise}  key={nanoid()}>Задания № <span  key={nanoid()}>{item.number}</span></p>
                                <div key={nanoid()}>
                                    <p  key={nanoid()}>Вопрос: <span>{item.questionText}</span></p>
                                    {/* <p>img</p> */}
                                </div>
                            </div>
                            <div className={classes.resAnswer}  key={nanoid()}>
                                {item.isCorrect
                                ? <p className={classes.resAnswerCor}  key={nanoid()}>Вы ответили правельно: <span  key={nanoid()}>{item.answerCorrect}</span></p>
                                : <React.Fragment>
                                    <p className={classes.resAnswerWorng}  key={nanoid()}>Вы ответили не правельно: <span key={nanoid()}>{item.answerGiven}</span></p>
                                    <p className={classes.resAnswerCor}  key={nanoid()}>Правельный ответ: <span key={nanoid()}>{item.answerCorrect}</span></p>
                                </React.Fragment>
                                }
                            </div>
                        </div>
                    )
                })}
                <div className={classes.buttons}>
                    <button onClick={textareaBlok} id="textareaBlok">Написать отзыв</button>
                    <textarea></textarea>
                    <button id="endTests" className={classes.endTests} onClick={endReviewTest}>Отправить отзыв</button>
                    <button onClick={end}>Вернутся к выбору теста</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
  }

function mapDispatchToProps(dispatch) {
    return {
        studentPage: (qwe) => dispatch(studentPage(qwe)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);