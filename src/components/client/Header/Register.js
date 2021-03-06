import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";
import { actRegisterUserRequest } from "../../../actions/index";
import callApi from "../../../utils/ApiCallerServer";

class Register extends Component {
  constructor(props, context) {
    super(props, context);
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
      name: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      email: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      password: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      rePassword: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      email2: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      verifyCode: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      email3: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
    };
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...this.state[name] }; /* dummy object */
    newState.value = value;
    this.setState({ [name]: newState });
  };

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

  handleInputValidation = (event) => {
    const { name } = event.target;
    const { isValid, errorMessage } = validateInput(
      name,
      this.state[name].value,
      this.state.password.value
    );
    const newState = { ...this.state[name] }; /* dummy object */
    newState.isValid = isValid;
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  onSave = (e) => {
    e.preventDefault();
    let { name, password, rePassword, email } = this.state;

    if (
      name.value !== "" &&
      name.isValid === true &&
      password.value !== "" &&
      password.isValid === true &&
      rePassword.value !== "" &&
      rePassword.isValid === true &&
      email.value !== "" &&
      email.isValid === true
    ) {
      let user = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      actRegisterUserRequest(user).then((res) => {
        
        let notification = res.data.message;

        if (res.status !== 201) {
          alert("Register fail.");
        } else {
          this.setState({ isShow: false });
          alert(
            notification + ". Vui l??ng ki???m tra email ????? ti???n h??nh x??c th???c."
          );
          this.handleShow2();
        }
      });
    } else {
      alert("Vui L??ng ??i???n ?????y ????? th??ng tin v?? ????ng ?????nh d???ng");
    }
  };

  onSave2 = (e) => {
    e.preventDefault();
    let { email2, verifyCode } = this.state;

    if (
      email2.value !== "" &&
      email2.isValid === true &&
      verifyCode.value !== "" &&
      verifyCode.isValid === true
    ) {
      let verifyInfo = {
        verifyEmailCode: verifyCode.value,
        email: email2.value,
      };

      callApi("auth/verify-email", "POST", verifyInfo)
        .then((res) => {
          const x = res.data;
          alert(
            "X??c th???c t??i kho???n th??nh c??ng. Vui l??ng ????ng nh???p ????? s??? d???ng!"
          );
          this.handleHide2();
        })
        .catch((error) => {
          alert("Vui l??ng ki???m tra l???i th??ng tin!");
        });
    } else {
      alert("Vui L??ng ??i???n ?????y ????? th??ng tin v?? ????ng ?????nh d???ng");
    }
  };

  onSave3 = (e) => {
    e.preventDefault();
    let { email3 } = this.state;

    if (email3.value !== "" && email3.isValid === true) {
      let resendEmail = {
        email: email3.value,
      };
      callApi("auth/resend-email", "POST", resendEmail)
        .then((res) => {
          const x = res.data;
          alert("G???i email th??nh c??ng! Vui l??ng ki???m tra email c???a b???n.");
          this.handleHide3();
          this.handleShow2();
        })
        .catch((error) => {
          alert("Vui l??ng ki???m tra l???i th??ng tin!");
        });
    } else {
      alert("Vui L??ng ??i???n ?????y ????? th??ng tin v?? ????ng ?????nh d???ng");
    }
  };

  render() {
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
      color: "#4267B2",
      fontSize: "14px",
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

    let { name, password, rePassword, email, email2, verifyCode, email3 } =
      this.state;
    return (
      <>
        <ButtonToolbar style={toolbar}>
          <div
            style={link}
            onClick={this.handleShow}
            className="text-secondary text-decoration-none"
          >
            ????ng K??
          </div>
          <Modal
            {...this.props}
            show={this.state.isShow}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                ????NG K??
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.onSave} id="nameform">
                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name.value}
                      placeholder="H??? T??n"
                      name="name"
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="name"
                      isHidden={this.state.name.isValid}
                      errorMessage={this.state.name.errorMessage}
                    />
                  </div>
                </div>

                <div className="row mt-3">
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
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
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
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      id="rePassword"
                      placeholder="X??c nh???n m???t kh???u"
                      name="rePassword"
                      value={rePassword.value}
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="rePassword"
                      isHidden={this.state.rePassword.isValid}
                      errorMessage={this.state.rePassword.errorMessage}
                    />
                  </div>
                </div>

                <div className="row text-center mt-3">
                  <div className="col-md-12">
                    <p>
                      T??i ???? ?????c v?? ?????ng ?? v???i{" "}
                      <span style={text}> CH??NH S??CH </span> c???a ch????ng tr??nh.
                    </p>
                  </div>
                </div>
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
                      <i className="fas fa-user mr-1"></i> X??c th???c t??i kho???n
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="nameform" style={Buttonn}>
                ????ng K??
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
            <i className="fas fa-user mr-1"></i> ????ng nh???p
          </div> */}
          <Modal
            {...this.props}
            show={this.state.isShow2}
            onHide={this.handleHide2}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                X??C TH???C T??I KHO???N
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui l??ng ki???m tra email v?? nh???p m?? code ????? ti???n h??nh x??c
                    th???c t??i kho???n.
                  </p>
                </div>
              </div>
              <form onSubmit={this.onSave2} id="verifyForm">
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
                <div className="row mt-3">
                  <div className="col-md-12">
                    <input
                      type="verifyCode"
                      className="form-control"
                      id="verifyCode"
                      placeholder="M?? x??c th???c"
                      name="verifyCode"
                      value={verifyCode.value}
                      onChange={this.handleInput}
                      onBlur={this.handleInputValidation}
                    />
                    <FormError
                      type="verifyCode"
                      isHidden={this.state.verifyCode.isValid}
                      errorMessage={this.state.verifyCode.errorMessage}
                    ></FormError>
                  </div>
                </div>
              </form>
              <div className="row mt-3">
                <div className="col-md-12" onClick={this.handleHide2}>
                  {/* <a href="#" style={text}>
                  Qu??n m???t kh???u ?
                </a> */}
                  <div
                    className="pl-2 text-secondary text-decoration-none"
                    onClick={this.handleShow3}
                    style={link}
                  >
                    <i className="fas fa-user mr-1"></i> G???i l???i m?? x??c th???c?
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="verifyForm" style={Buttonn}>
                X??c th???c
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
                G???I L???I M?? X??C TH???C
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui l??ng nh???p ????ng email ???? ????ng k?? ????? ???????c c???p l???i m?? x??c
                    th???c.
                  </p>
                </div>
              </div>
              <form onSubmit={this.onSave3} id="resendForm">
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
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="resendForm" style={Buttonn}>
                Resend
              </Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
      </>
    );
  }
}

const validateInput = (type, checkingText, pass) => {
  if (type === "name") {
    const regexp =
      /^[a-zA-Z_???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Kh??ng ch???a s??? v?? k?? t??? ?????c bi???t.",
      };
    }
  }
  if (type === "phone") {
    const regexp = /^\d{10,11}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "S??T ph???i c?? 10 - 11 ch??? s???.",
      };
    }
  }
  if (type === "email" || type === "email2" || type === "email3") {
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Email kh??ng h???p l???",
      };
    }
  }
  if (type === "password") {
    // const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // const checkingResult = regexp.exec(checkingText);
    // if (checkingResult !== null) {
    //   return { isValid: true, errorMessage: "" };
    // } else {
    //   return {
    //     isValid: false,
    //     errorMessage: "M???t kh???u t??? 8 k?? t??? bao g???m ch??? v?? s???",
    //   };
    // }
    if (checkingText.length >= 8) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "M???t kh???u t???i thi???u 8 k?? t???",
      };
    }
  }
  if (type === "rePassword") {
    let rePass = checkingText;
    if (pass === rePass) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "M???t kh???u kh??ng kh???p",
      };
    }
  }
  if (type === "address" || type === "verifyCode") {
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Vui l??ng kh??ng ????? tr???ng th??ng tin",
      };
    }
  }
};

function FormError(props) {
  /* n???u isHidden = true, return null ngay t??? ?????u */
  let color = {
    color: "red",
  };

  if (props.isHidden) {
    return null;
  }

  return (
    <div className="m-1" style={color}>
      {props.errorMessage}
    </div>
  );
}
export default Register;
