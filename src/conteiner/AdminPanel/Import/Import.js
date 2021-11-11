import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import './import.css'

class Imports extends Component {
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
        document.title = 'Импорт вопросов';
    }

    render() {

        const button = () => {
            document.querySelector(".table").style.display= 'block'
        }

        return (
            <React.Fragment>
                <div className="import">
                    <h1>Импорт вопросов</h1>
                    <div className="file">
                        <input type="file" name="file" id="file" className="inputfile" />
                        <label htmlFor="file">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                            </svg>
                            <span>Выберите файл</span>
                        </label>
                        <button className="send" onClick={button}>Отправить</button>
                    </div>
                    <hr/>
                    <div className="table">
                        <div className="newModule">
                            <select>
                                <option>Выберите предмет</option>
                            </select>
                            <input placeholder="Название модуля"/>
                            <input type="number" min="1" max="11" placeholder="Выберите класс"/>
                            <p id="fileName">Название файла: <span></span></p>
                        </div>
                        {
                            this.state.questions.map((question) => {
                                return (
                                    <div className="item" key={nanoid()}>
                                        <p style={{textAlign: 'center'}} key={nanoid()}>Задание №{question.numberQuestions} Вариант {question.varQuestion}</p>
                                        <p key={nanoid()}>{question.textQuestion}</p>
                                        {
                                            question.imgQuestion != null
                                            ? <img src={question.imgQuestion} alt="" key={nanoid()}/>
                                            : null
                                        }
                                        <input type="file" name="file" id="file" className="inputfile" />
                                        <label htmlFor="file">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                            </svg>
                                            <span>Выберите изображение</span>
                                        </label>
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

export default Imports