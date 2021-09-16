import React, { Component } from "react";
import "./Zone.css"
import { connect } from "react-redux"
import { studentPage } from '../../store/actions/Auth'
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "../../axios/axios";

class Zone extends Component {
  state = {
    zone: []
  }
  componentDidMount() {
    document.title = "Выбор района";
    axios.get('/get_all_mo')
      .then((response) => {
        const data = response.data;
        // console.log(data);
        // for (let i of data){
        //   console.log(i.mo);
        //   this.setState({
        //     zone: i.id
        //   })
        // }
        this.setState({
          zone: data
        })
      })
      .catch((err) => {
        // alert('Ошибка, страница будет перезагружена')
        // window.location.reload()
        console.log(err);
      })
  }

  render() {
    const studentpage = () => {
      var qwe = 'school'
      this.props.studentPage(qwe)
    }
    return (
      <div>
        <p>Зона</p>
        <div className='navlink'>
          {this.state.zone.map((i) => {
            return (
              <Link to={'/school/' + i.id} onClick={studentpage} className='link' key={nanoid()}>{i.name}</Link>
            )
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    studentPage: (qwe) => dispatch(studentPage(qwe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Zone)
