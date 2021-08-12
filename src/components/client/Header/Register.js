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
        console.log(res);
        let notification = res.data.message;

        if (res.status !== 201) {
          alert("Register fail.");
        } else {
          this.setState({ isShow: false });
          alert(
            notification + ". Vui lòng kiểm tra email để tiến hành xác thực."
          );
          this.handleShow2();
        }
      });
    } else {
      alert("Vui Lòng điền đầy đủ thông tin và đúng định dạng");
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
            "Xác thực tài khoản thành công. Vui lòng đăng nhập để sử dụng!"
          );
          this.handleHide2();
        })
        .catch((error) => {
          alert("Vui lòng kiểm tra lại thông tin!");
        });
    } else {
      alert("Vui Lòng điền đầy đủ thông tin và đúng định dạng");
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
          alert("Gửi email thành công! Vui lòng kiểm tra email của bạn.");
          this.handleHide3();
          this.handleShow2();
        })
        .catch((error) => {
          alert("Vui lòng kiểm tra lại thông tin!");
        });
    } else {
      alert("Vui Lòng điền đầy đủ thông tin và đúng định dạng");
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
            Đăng Ký
          </div>
          <Modal
            {...this.props}
            show={this.state.isShow}
            onHide={this.handleHide}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                ĐĂNG KÝ
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
                      placeholder="Họ Tên"
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
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      id="rePassword"
                      placeholder="Xác nhận mật khẩu"
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
                      Tôi đã đọc và đồng ý với{" "}
                      <span style={text}> CHÍNH SÁCH </span> của chương trình.
                    </p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12" onClick={this.handleHide}>
                    {/* <a href="#" style={text}>
                  Quên mật khẩu ?
                </a> */}
                    <div
                      className="pl-2 text-secondary text-decoration-none"
                      onClick={this.handleShow2}
                      style={link}
                    >
                      <i className="fas fa-user mr-1"></i> Xác thực tài khoản
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="nameform" style={Buttonn}>
                Đăng Ký
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
            <i className="fas fa-user mr-1"></i> Đăng nhập
          </div> */}
          <Modal
            {...this.props}
            show={this.state.isShow2}
            onHide={this.handleHide2}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                XÁC THỰC TÀI KHOẢN
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui lòng kiểm tra email và nhập mã code để tiến hành xác
                    thực tài khoản.
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
                      placeholder="Mã xác thực"
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
                  Quên mật khẩu ?
                </a> */}
                  <div
                    className="pl-2 text-secondary text-decoration-none"
                    onClick={this.handleShow3}
                    style={link}
                  >
                    <i className="fas fa-user mr-1"></i> Gửi lại mã xác thực?
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" form="verifyForm" style={Buttonn}>
                Xác thực
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
            <i className="fas fa-user mr-1"></i> Đăng nhập
          </div> */}
          <Modal
            {...this.props}
            show={this.state.isShow3}
            onHide={this.handleHide3}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton style={modalHeader}>
              <Modal.Title id="contained-modal-title-lg" style={header}>
                GỬI LẠI MÃ XÁC THỰC
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <p style={text}>
                    Vui lòng nhập đúng email đã đăng ký để được cấp lại mã xác
                    thực.
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
      /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Không chứa số và kí tự đặc biệt.",
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
        errorMessage: "SĐT phải có 10 - 11 chữ số.",
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
        errorMessage: "Email không hợp lệ",
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
    //     errorMessage: "Mật khẩu từ 8 kí tự bao gồm chữ và số",
    //   };
    // }
    if (checkingText.length >= 8) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Mật khẩu tối thiểu 8 ký tự",
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
        errorMessage: "Mật khẩu không khớp",
      };
    }
  }
  if (type === "address" || type === "verifyCode") {
    if (checkingText !== "") {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Vui lòng không để trống thông tin",
      };
    }
  }
};

function FormError(props) {
  /* nếu isHidden = true, return null ngay từ đầu */
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
