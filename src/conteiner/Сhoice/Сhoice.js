import React, { Component } from "react";
import "./Сhoice.css";
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";
import { studentSuccess } from '../../store/actions/Student';
import axios from "../../axios/axios";
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import Out from "../../component/Out/Out";
import { Redirect } from 'react-router-dom'

class Сhoice extends Component {
  state = {
    group: [],
    class: [],
    gid: "DEFAULT",
    sid: "DEFAULT",
  };

  componentDidMount() {
    document.title = "Выбор ученика";
    axios
      .get("/"+ this.props.match.params.id +"/classes")
      .then((response) => {
        this.setState({
          group: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const groupChangeHandler = (e) => {
      axios
        .get("/" + this.props.match.params.id + "/" + e.target.value + "/students")
        .then((response) => {
          // console.log(response.data);
          this.setState({
            class: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      this.setState({
        gid: e.target.value,
      });
      console.log(this.state);
      console.log(e.target.value, this.state.gid);
      document.querySelector("#fullName").style.display = "block";
    };

    const nameChangeHandler = (e) => {
      this.setState({
        sid: e.target.value,
      });
      console.log(e.target.value, this.state.sid);
      document.querySelector("button").style.display = "block";
    };

    const Vhod = (e) => {
      e.preventDefault()
      // console.log(this.props.match.params.id)
      // console.log(this.state.gid);
      // console.log(this.state.sid);
      axios
        .get("/" + this.props.match.params.id + "/" + this.state.gid + "/" + this.state.sid + '/auth')
        .then((response) => {
          console.log(response.data);
            var qwe = "modul";
            this.props.studentPage(qwe);
            this.props.history.push("/modul", { idSchool: this.props.match.params.id, idGroup: this.state.gid, idStudent: this.state.sid, token: response.data.token})
            // return <Redirect to="/modul" />
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div className={"loginForTest"}>
        <form id="form">
          <select
            name=""
            id="groupName"
            value={this.state.gid}
            onChange={groupChangeHandler}
          >
            <option value="DEFAULT" disabled="disabled">
              Выберите свой класс
            </option>
            {this.state.group.map((group) => {
              return (
                <option value={group.id} key={nanoid()}>
                  {group.name}
                </option>
              );
            })}
          </select>
          <select
            name=""
            id="fullName"
            defaultValue={"DEFAULT"}
            onChange={nameChangeHandler}
          >
            <option value="DEFAULT" disabled="disabled">
              Выберите ФИО
            </option>
            {this.state.class.map((item) => {
              return (
                <option value={item.id} key={nanoid()}>
                  {item.name +
                    " " +
                    item.last_name +
                    " " +
                    item.patrn}
                </option>
              );
            })}
          </select>
          {this.props.error ===
          "Этот студент уже авторизован на другом устройстве" ? (
            <React.Fragment>
              <p className="error">{this.props.error}</p>
            </React.Fragment>
          ) : null}
          {/* <Link to="/modul" onClick={Vhod}> */}
            <button onClick={Vhod}>Войти</button>
          {/* </Link> */}
        </form>
        <Out />
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

export default connect(mapStateToProps, mapDispatchToProps)(Сhoice);
