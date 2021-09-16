import React, { Component } from "react";
import Out from "../../component/Out/Out";
import "./NotFound.css"
import notfound from './studentmarket.jpg'

class NotFound extends Component {
  componentDidMount() {
    document.title = "Такая страница не найдена";
  }

  render() {
    return (
      <div className='notfound'>
        <img src={notfound} alt='notfound' />
        <p>Такой страницы не существует</p>
        <Out />
      </div>
    );
  }
}

export default NotFound;
