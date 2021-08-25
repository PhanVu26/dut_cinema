import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";
import "./LoginStyle.css";
import * as actions from "../../actions/index";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      isShow: false,
      password: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      email: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
    };
  }

  handleShow() {
    this.setState({ isShow: true });
  }

  handleHide() {
    this.setState({ isShow: false });
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...this.state[name] }; /* dummy object */
    newState.value = value;
    this.setState({ [name]: newState });
  };

  handleInputValidation = (event) => {
    const { name } = event.target;
    const { isValid, errorMessage } = validateInput(
      name,
      this.state[name].value
    );
    const newState = { ...this.state[name] }; /* dummy object */
    newState.isValid = isValid;
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  onSave = (e) => {
    
    e.preventDefault();
    let { password, email } = this.state;
    
    if (
      password.value !== "" &&
      password.isValid === true &&
      email.value !== "" &&
      email.isValid === true
    ) {
      let account = {
        password: password.value,
        email: email.value,
      };

        actions.actLoginAccountRequest(account).then((res) => {
          let dataAccount = res.data;
          
            if (Object.keys(dataAccount).length !== 0) {
              localStorage.setItem("account", JSON.stringify(dataAccount));
            }
            // alert("Logged in successfully");
            
            switch(dataAccount.roleName){
              case "Admin":
                {
                  window.location.href = "/admin";
                  break;
                }
              case "Movie Manager":
                {
                  window.location.href = "/manager";
                  break;
                }  
              case "Theater Manager":
                {
                  window.location.href = "/showtime-manager";
                  break
                }  
              default:
                window.location.href = "/";
                break;  
            }
            // this.setState({ show: false });
            // window.location.reload();
        }).catch(function(error){
          alert("Khong dung mat khau")
        });
        // let response = null;
        // axios.post(`https://cinema-nestjs.herokuapp.com/auth/login`, account)
        //     .then(res => {
        //         response = res;
        //         
        //         const user = res.data.user;
        //         localStorage.setItem("account", JSON.stringify(res.data))
        //         
        //         
                
                
        //     })
            
    } else {
      alert("Vui lòng nhập đúng định dạng.");
    }
  };

  render() {
    

    let { password, email } = this.state;

    let toolbar = {
      display: "content",
    };
    let header = {
      color: "#4267B2",
      borderBottom: "2px solid #4267B2",
    };
    let modalHeader = {
      borderBottom: "none",
    };
    let text = {
      fontSize: "14px",
      color: "#a0a3a7",
    };
    let Buttonn = {
      backgroundColor: "#4267B2",
      border: "1px solid #4267B2",
    };
    let link = {
      display: "inline",
      fontSize: "14px",
      color: "#a0a3a7",
      cursor: "pointer",
    };
    const role = sessionStorage.getItem("role");
    
    if(role !== null){
      
      if(role == "Admin"){
        return <Redirect to = "/admin" />
      }else {
        return <Redirect to = "/manager" />
      }
    }
    
    return (
      <ButtonToolbar style={toolbar}>
        <div
          className="pl-2 text-secondary text-decoration-none"
          onClick={this.handleShow}
          style={link}
        >
          
        </div>
        <Modal
          {...this.props}
          show={true}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton style={modalHeader}>
            <Modal.Title id="contained-modal-title-lg" style={header}>
              ĐĂNG NHẬP
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
              </div>
            </div>
            <form onSubmit={this.onSave} id="loginForm">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="email"
                    isHidden={this.state.email.isValid}
                    errorMessage={this.state.email.errorMessage}
                  ></FormError>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu"
                    name="password"
                    value={password.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="password"
                    isHidden={this.state.password.isValid}
                    errorMessage={this.state.password.errorMessage}
                  ></FormError>
                </div>
              </div>
            </form>
            <div className="row mt-3">
              <div className="col-md-12">
                <a href="#" style={text}>
                  Quên mật khẩu ?
                </a>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="loginForm" style={Buttonn}>
              Đăng nhập
            </Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

function FormError(props) {
  if (props.isHidden) {
    return null;
  }
  return (
    <div className="m-1" style={{ color: "red" }}>
      {props.errorMessage}
    </div>
  );
}

const validateInput = (type, checkingText) => {
  if (type === "email") {
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Email không được để trống.",
      };
    }
  }
  if (type === "password") {
    // const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // const checkingResult = regexp.exec(checkingText);
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Mật khẩu từ 8 kí tự bao gồm chữ và số",
      };
    }
  }
};

export default Login;