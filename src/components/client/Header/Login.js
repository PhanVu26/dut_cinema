import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";
import "./styles/LoginStyles.css";
import { actLoginAccountRequest } from "../../../actions/index";
import ForgotPassword from "./ForgotPassword";
import callApi from "../../../utils/ApiCallerServer";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleShow2 = this.handleShow2.bind(this);
    this.handleHide2 = this.handleHide2.bind(this);
    this.handleShow3 = this.handleShow3.bind(this);
    this.handleHide3 = this.handleHide3.bind(this);

    this.state = {
      isShow: false,
      isShow2: false,
      isShow3: false,
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
      email2: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      email3: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      password3: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      resetCode: {
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

  handleShow2() {
    this.setState({ isShow2: true });
  }

  handleHide2() {
    this.setState({ isShow2: false });
  }

  handleShow3() {
    this.setState({ isShow3: true });
  }

  handleHide3() {
    this.setState({ isShow3: false });
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

      actLoginAccountRequest(account)
        .then((res) => {
          let dataAccount = res.data;
          if (Object.keys(dataAccount).length !== 0) {
            localStorage.setItem("account", JSON.stringify(dataAccount));
            localStorage.setItem(
              "accessToken",
              JSON.stringify(res.data.accessToken)
            );
          }
          alert("Logged in successfully");
          this.setState({ isShow: false });
          switch (dataAccount.roleName) {
            case "Admin": {
              window.location.href = "/admin";
              break;
            }
            case "Movie Manager": {
              window.location.href = "/manager";
              break;
            }
            case "Theater Manager": {
              window.location.href = "/showtime-manager";
              break;
            }
            default:
              window.location.href = "/";
              break;
          }
        })
        .catch(function (error) {
          alert("Khong dung mat khau");
        });
    } else {
      alert("Vui l??ng nh???p ????ng ?????nh d???ng.");
    }
  };

  onSave2 = (e) => {
    e.preventDefault();
    let { email2 } = this.state;
    
    if (email2.value !== "" && email2.isValid === true) {
      let account = {
        email: email2.value,
      };
      callApi("auth/forgot-password", "POST", account)
        .then((res) => {
          alert("Vui l??ng ki???m tra Email.");
          this.handleHide2();
          this.handleShow3();
        })
        .catch((error) => {
          alert("Vui l??ng nh???p ????ng Email.");
        });
    } else {
      alert("Vui l??ng nh???p ????ng ?????nh d???ng.");
    }
  };

  onSave3 = (e) => {
    e.preventDefault();
    let { email3, password3, resetCode } = this.state;
    if (
      email3.value !== "" &&
      email3.isValid === true &&
      password3.value !== "" &&
      password3.isValid === true &&
      resetCode.value !== "" &&
      resetCode.isValid === true
    ) {
      let account = {
        resetPasswordCode: resetCode.value,
        email: email3.value,
        newPassword: password3.value,
      };
      callApi("auth/reset-password", "POST", account)
        .then((res) => {
          const x = res.data;
          alert("Reset password th??nh c??ng!");
          this.handleHide3();
          this.handleShow();
        })
        .catch((error) => {
          alert("Vui l??ng ki???m tra l???i th??ng tin nh???p v??o.");
        });
      // callApi("auth/forgot-password", "POST", account).then((res) => {
      //   alert("Vui l??ng ki???m tra Email.");
      //   this.handleHide2();
      //   this.handleShow3();
      // });
    } else {
      alert("Vui l??ng nh???p ????ng ?????nh d???ng.");
    }
  };

  render() {
    let { password, email, email2, email3, password3, resetCode } = this.state;

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
    return (
      <>
        <ButtonToolbar style={toolbar}>
          <div
            className="pl-2 text-secondary text-decoration-none"
            onClick={this.handleShow}
            style={link}
          >
            <i className="fas fa-user mr-1"></i> ????ng nh???p
          </div>
          <Modal
            {...this.props}
            show={this.state.isShow}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                ????NG NH???P
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui l??ng ????ng nh???p tr?????c khi mua v?? ????? t??ch lu??? ??i???m, c?? h???i
                    nh???n th??m nhi???u ??u ????i t??? ch????ng tr??nh th??nh vi??n Cinema.
                  </p>
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
                      placeholder="M???t kh???u"
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
                <div className="col-md-12" onClick={this.handleHide}>
                  {/* <a href="#" style={text}>
                  Qu??n m???t kh???u ?
                </a> */}
                  <div
                    className="pl-2 text-secondary text-decoration-none"
                    onClick={this.handleShow2}
                    style={link}
                  >
                    <i className="fas fa-user mr-1"></i> Qu??n m???t kh???u?
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="loginForm" style={Buttonn}>
                ????ng nh???p
              </Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>

        <ButtonToolbar style={toolbar}>
          {/* <div
            className="pl-2 text-secondary text-decoration-none"
            onClick={this.handleShow2}
            style={link}
          >
            <i className="fas fa-user mr-1"></i> Qu??n m???t kh???u?
          </div> */}
          <Modal
            {...this.props}
            show={this.state.isShow2}
            onHide={this.handleHide2}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                QU??N M???T KH???U
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui l??ng cung c???p email ????ng nh???p, ch??ng t??i s??? g???i m?? k??ch
                    ho???t cho b???n.
                  </p>
                </div>
              </div>
              <form onSubmit={this.onSave2} id="forgotPasswordForm">
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="email2"
                      className="form-control"
                      id="email2"
                      placeholder="Email"
                      name="email2"
                      value={email2.value}
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="email2"
                      isHidden={this.state.email2.isValid}
                      errorMessage={this.state.email2.errorMessage}
                    ></FormError>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="forgotPasswordForm" style={Buttonn}>
                C???p l???i m???t kh???u
              </Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>

        <ButtonToolbar style={toolbar}>
          {/* <div
            className="pl-2 text-secondary text-decoration-none"
            onClick={this.handleShow3}
            style={link}
          >
            <i className="fas fa-user mr-1"></i> ????ng nh???p
          </div> */}
          <Modal
            {...this.props}
            show={this.state.isShow3}
            onHide={this.handleHide3}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                QU??N M???T KH???U
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui l??ng cung c???p email ????ng nh???p, m?? code v?? password m???i,
                    ch??ng t??i s??? reset password cho b???n.
                  </p>
                </div>
              </div>
              <form onSubmit={this.onSave3} id="resetForm">
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="email3"
                      className="form-control"
                      id="email3"
                      placeholder="Email"
                      name="email3"
                      value={email3.value}
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="email3"
                      isHidden={this.state.email3.isValid}
                      errorMessage={this.state.email3.errorMessage}
                    ></FormError>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <input
                      type="resetCode"
                      className="form-control"
                      id="resetCode"
                      placeholder="Reset Code"
                      name="resetCode"
                      value={resetCode.value}
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="resetCode"
                      isHidden={this.state.resetCode.isValid}
                      errorMessage={this.state.resetCode.errorMessage}
                    ></FormError>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <input
                      type="password"
                      className="form-control"
                      id="password3"
                      placeholder="M???t kh???u"
                      name="password3"
                      value={password3.value}
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="password"
                      isHidden={this.state.password3.isValid}
                      errorMessage={this.state.password3.errorMessage}
                    ></FormError>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="resetForm" style={Buttonn}>
                Thay ?????i m???t kh???u
              </Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
      </>
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
  if (type === "email" || type === "email2" || type === "email3") {
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Email kh??ng ???????c ????? tr???ng.",
      };
    }
  }
  if (type === "resetCode") {
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Reset Code kh??ng ???????c ????? tr???ng.",
      };
    }
  }
  if (type === "password" || type === "password3") {
    // const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // const checkingResult = regexp.exec(checkingText);
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "M???t kh???u t??? 8 k?? t??? bao g???m ch??? v?? s???",
      };
    }
  }
};

export default Login;
