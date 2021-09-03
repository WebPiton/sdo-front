import React, { Component } from "react";
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
      </div>
    );
  }
}

export default NotFound;
