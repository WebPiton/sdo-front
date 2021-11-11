import React, { Component } from 'react'
import './Modul.css'
// import img from "../../../components/menu/dvr-24px.svg"
import { nanoid } from 'nanoid'

class Modul extends Component {
    state = {
        nameModule: 'Уравнения',
        numberQuestions: '36',
        questions: [
            {
                numberQuestions: '1',
                varQuestion: '1',
                imgQuestion: null,
                textQuestion: 'Решите уравнение . 3.1',
                answer1: 'A) 12;',
                answer2: 'B) 50;',
                answer3: 'C) 40;',
                answer4: 'D) 18;',
                correctAnswer: 'A) 12;'

            },
            {
                numberQuestions: '1',
                varQuestion: '1',
                imgQuestion: null,
                textQuestion: 'Решите уравнение . 3.1',
                answer1: 'A) 12;',
                answer2: 'B) 50;',
                answer3: 'C) 40;',
                answer4: 'D) 18;',
                correctAnswer: 'A) 12;'

            },
            {
                numberQuestions: '1',
                varQuestion: '1',
                imgQuestion: null,
                textQuestion: 'Решите уравнение . 3.1',
                answer1: 'A) 12;',
                answer2: 'B) 50;',
                answer3: 'C) 40;',
                answer4: 'D) 18;',
                correctAnswer: 'A) 12;'

            },
            {
                numberQuestions: '1',
                varQuestion: '1',
                imgQuestion: null,
                textQuestion: 'Решите уравнение . 3.1',
                answer1: 'A) 12;',
                answer2: 'B) 50;',
                answer3: 'C) 40;',
                answer4: 'D) 18;',
                correctAnswer: 'A) 12;'

            },
            {
                numberQuestions: '1',
                varQuestion: '1',
                imgQuestion: null,
                textQuestion: 'Решите уравнение . 3.1',
                answer1: 'A) 12;',
                answer2: 'B) 50;',
                answer3: 'C) 40;',
                answer4: 'D) 18;',
                correctAnswer: 'A) 12;'

            },
            {
                numberQuestions: '1',
                varQuestion: '1',
                imgQuestion: null,
                textQuestion: 'Решите уравнение . 3.1',
                answer1: 'A) 12;',
                answer2: 'B) 50;',
                answer3: 'C) 40;',
                answer4: 'D) 18;',
                correctAnswer: 'A) 12;'

            },
        ]
    }

    componentDidMount() {
        document.title = 'Просмотр тестов';
    }

    render() {
        return (
            <React.Fragment>
                <div className="Module">
                    <h1 className="home">Выбор модуля</h1>
                    <div className="selectMod">
                        <div className="class-select">
                            <p>Выбрать класс для тестирования</p>
                            <select>
                                <option>--Класс--</option>
                            </select>
                        </div>
                        <div className="thing-select">
                            <p>Выберите предмет</p>
                            <select>
                                <option>--Предмет--</option>
                            </select>
                        </div>
                        <div className="module-select">
                            <p>Выберите модуль</p>
                            <select>
                                <option>--Модуль--</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <div className="content">
                        <p>Название модуля: {this.state.nameModule}</p>
                        <p>Кол-во вопросов: {this.state.numberQuestions}</p>
                        <hr/>
                        {
                            this.state.questions.map((question, index) => {
                                return (
                                    <div className="item" key={nanoid()}>
                                        <p style={{textAlign: 'center'}} key={nanoid()}>Задание №{question.numberQuestions} Вариант {question.varQuestion}</p>
                                        <button className="changeQuestion">Изменить вопрос</button>
                                        <p key={nanoid()}>{question.textQuestion}</p>
                                        {
                                            question.imgQuestion != null
                                            ? <img src={question.imgQuestion} alt="" key={nanoid()}/>
                                            : null
                                        }
                                        <p>Варианты ответов:</p>
                                        <div className="answers" key={nanoid()}>
                                            <p key={nanoid()}>{question.answer1}</p>
                                            <p key={nanoid()}>{question.answer2}</p>
                                            <p key={nanoid()}>{question.answer3}</p>
                                            <p key={nanoid()}>{question.answer4}</p>
                                        </div>
                                        <p key={nanoid()}>Правильный ответ: {question.correctAnswer}</p>
                                        <hr/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Modul