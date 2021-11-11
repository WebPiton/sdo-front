import React, { Component } from 'react'
import './Events.css'

class Events extends Component {

    state = {
        display: false
    }

    componentDidMount() {
        document.title = 'Просмотр оценок';
    }

    render() {

        // Показ/скрытие доп. опций
        const showElem = () => {
                switch (this.state.display) {
                case false:
                    document.querySelector('.selectEl').style.display = 'grid';
                    this.setState({
                        display: true
                    })
                    break;

                case true:
                    document.querySelector('.selectEl').style.display = 'none';
                    this.setState({
                        display: false
                    })
                    break;
                default:
                    break
                }
        }

        // Поиск оценок и вывод результатов в таблицу с подсветкой ответов
        const resultSpan = () => {
            document.querySelector('.tableResults').style.display= 'block'

            var resultSpan = document.querySelectorAll('.resultSpan')
            var resultTd = document.querySelectorAll('.resultTd')
            for (var m of resultSpan){
                for (var i of resultTd){
                    if (i.textContent == 1){
                        i.style.background= "#00FF00"
                        m.style.visibility= "hidden";
                    } else if (i.textContent == 0){
                        i.style.background= "#FF0000"
                        m.style.visibility= "hidden";
                    }
                }
            }
        }

        return (
            <React.Fragment>
                <div className="Events">
                    <h1>Просмотр результатов</h1>
                    <div className="block">
                        <div className="leftBlock">
                            <p>Провести выбор по:</p>
                            <div className="selectEvent">
                                <select className="method-select">
                                    <option value="module">Модулю</option>
                                    <option value="class">Классу</option>
                                    <option value="date">Дате</option>
                                    <option value="student">Обучающемуся</option>
                                    <option value="all">Показать всё</option>
                                </select>
                                <select>
                                    <option>Комплекстная работа</option>
                                </select>
                            </div>
                            <p>Сортировка по:</p>
                            <select className="sortBy">
                                <option>Классу убыв.</option>
                                <option>Классу возр.</option>
                                <option>Дате убыв.</option>
                                <option>Дате возр</option>
                                <option>Модулю убыв.</option>
                                <option>Модулю возр.</option>
                                <option>Процент выполнения убыв.</option>
                                <option>Процент выполнения возр.</option>
                            </select>
                        </div>
                        <div className="rightBlock">
                            <button className="buttonShow" onClick={showElem}>Дополнительные опции:</button>
                            <div className="selectEl">
                                <select>
                                    <option>Показывать только результаты обучающегося</option>
                                </select>
                                <select>
                                    <option>Показывать только результаты класса</option>
                                </select>
                                <select>
                                    <option>Показывать результаты за день</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="search" onClick={resultSpan}>Провести поиск</button>
                    <hr/>
                    <div className="tableResults">
                        <p>Таблица результатов: <span></span></p>
                        <p>Кол-во учеников, выполнивших тест: <span></span></p>
                        <table>
                            <thead>
                                <tr>
                                    <th> ФИО студента </th>
                                    <th> Класс </th>
                                    <th> Дата выполнения </th>
                                    <th title="" className="tableHeadClickable" id="th_1"><p>1</p></th>
                                    <th title="" className="tableHeadClickable" id="th_2"><p>2</p></th>
                                    <th title="" className="tableHeadClickable" id="th_3"><p>3</p></th>
                                    <th title="" className="tableHeadClickable" id="th_4"><p>4</p></th>
                                    <th title="" className="tableHeadClickable" id="th_5"><p>5</p></th>
                                    <th title="" className="tableHeadClickable" id="th_6"><p>6</p></th>
                                    <th title="" className="tableHeadClickable" id="th_7"><p>7</p></th>
                                    <th title="" className="tableHeadClickable" id="th_8"><p>8</p></th>
                                    <th title="" className="tableHeadClickable" id="th_9"><p>9</p></th>
                                    <th title="" className="tableHeadClickable" id="th_10"><p>10</p></th>
                                    <th title="" className="tableHeadClickable" id="th_11"><p>11</p></th>
                                    <th title="" className="tableHeadClickable" id="th_12"><p>12</p></th>
                                    <th>Действия</th>
                                </tr>
                                <tr>
                                    <td><p>Вячеслав Старцев Олегович</p></td>
                                    <td><p>5Б Лицей</p></td>
                                    <td><p>2021-02-03</p></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="0">0</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="resultTd"><span className="resultSpan" value="1">1</span></td>
                                    <td className="buttonTable">
                                        <a  className="veiwlink" href="/panel/events" target="_blank"> Смотреть результат </a>
                                        {/* <a href="/panel/events"> Смотреть похожее </a> */}
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Events