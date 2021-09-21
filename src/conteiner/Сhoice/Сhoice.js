import React, { Component } from "react";
import "./Сhoice.css";
import { connect } from "react-redux";
import { studentPage } from "../../store/actions/Auth";
import axios from "../../axios/axios";
import { nanoid } from "nanoid";
import Out from "../../component/Out/Out";

class Сhoice extends Component {
  state = {
    group: [],
    class: [],
    gid: "DEFAULT",
    sid: "DEFAULT",
  };

  componentDidMount() {
    document.title = "Выбор ученика";
    setTimeout(() => {
      axios
        .get("/" + sessionStorage.getItem("idSchool") + "/classes")
        .then((response) => {
          this.setState({
            group: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 10);
  }

  render() {
    const groupChangeHandler = (e) => {
      axios
        .get(
          "/" +
            sessionStorage.getItem("idSchool") +
            "/" +
            e.target.value +
            "/students"
        )
        .then((response) => {
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
      document.querySelector("#fullName").style.display = "block";
      document.querySelector(".fullNamep").style.display = "block";
    };

    const nameChangeHandler = (e) => {
      this.setState({
        sid: e.target.value,
      });
      document.querySelector("button").style.display = "block";
    };

    const Vhod = (e) => {
      e.preventDefault();
      axios
        .get(
          "/" +
            sessionStorage.getItem("idSchool") +
            "/" +
            this.state.gid +
            "/" +
            this.state.sid +
            "/auth"
        )
        .then((response) => {
          var qwe = "modul";
          this.props.studentPage(qwe);
          this.props.history.push("/modul", {
            idSchool: sessionStorage.getItem("idSchool"),
            idGroup: this.state.gid,
            idStudent: this.state.sid,
            token: response.data.token,
          });
        })
        .catch((err) => {
          alert("Ошибка, страница будет перезагружена");
          window.location.reload();
          console.log(err);
        });
    };

    return (
      <div className={"loginForTest"}>
        <form id="form">
          <p className="groupNamep">Выберите свой класс</p>
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
          <p className="fullNamep">Выберите ФИО</p>
          <select
            name=""
            id="fullName"
            value={this.state.sid}
            onChange={nameChangeHandler}
          >
            <option value="DEFAULT" disabled="disabled">
              Выберите ФИО
            </option>
            {this.state.class.map((item) => {
              return (
                <option value={item.id} key={nanoid()}>
                  {item.name + " " + item.last_name + " " + item.patrn}
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
          <button onClick={Vhod}>Войти</button>
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
