import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.state = {
      isShow: false,
      name: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      phone: {
        value: "",
        isValid: true,
        errorMessage: "",
      },
      gender: "Nam",
      birth: "",
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
      address: {
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

  handleChangeGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };

  handleChangeBirth = (event) => {
    this.setState({
      birth: event.target.value,
    });
  };

  onSave = (e) => {
    e.preventDefault();
    let {
      name,
      phone,
      gender,
      password,
      rePassword,
      email,
      address,
      birth,
    } = this.state;

    if (
      name.value !== "" &&
      name.isValid === true &&
      phone.value !== "" &&
      phone.isValid === true &&
      password.value !== "" &&
      password.isValid === true &&
      rePassword.value !== "" &&
      rePassword.isValid === true &&
      email.value !== "" &&
      email.isValid === true &&
      address.value !== "" &&
      address.isValid === true
    ) {
      let user = {
        userName: name.value,
        email: email.value,
        phone: phone.value,
        gender: gender,
        birth: birth,
        password: password.value,
        address: address.value,
        currentStar: 0,
        targets: 0,
      };

      //   actRegisterUserRequest(user).then((res) => {
      //     let notification = res.data;

      //     if (!notification.success) {
      //       alert(notification.message);
      //     } else {
      //       this.setState({ show: false });
      //       alert(notification.message);
      //     }
      //   });
    } else {
      alert("Vui Lòng điền đầy đủ thông tin và đúng định dạng");
    }
  };

  render() {
    let toolbar = {
      display: "content",
    };
    let header = {
      color: "#f26b38",
      borderBottom: "2px solid #f26b38",
    };
    let modalHeader = {
      borderBottom: "none",
    };
    let text = {
      color: "#f26b38",
      fontSize: "14px",
    };
    let Buttonn = {
      backgroundColor: "#f26b38",
      border: "1px solid #f26b38",
    };
    let link = {
      display: "inline",
      fontSize: "14px",
      color: "#a0a3a7",
      cursor: "pointer",
    };

    let {
      name,
      phone,
      gender,
      password,
      rePassword,
      email,
      address,
      birth,
    } = this.state;
    return (
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
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Số điện thoại"
                    name="phone"
                    value={phone.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="phone"
                    isHidden={this.state.phone.isValid}
                    errorMessage={this.state.phone.errorMessage}
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="gender"
                      value={gender.value}
                      onChange={this.handleChangeGender}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Nam">Nam </option>
                      <option value="Nữ">Nữ </option>
                    </select>
                  </div>
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
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Địa chỉ"
                    name="address"
                    value={address.value}
                    onChange={this.handleInput}
                    onBlur={this.handleInputValidation}
                  />
                  <FormError
                    type="address"
                    isHidden={this.state.address.isValid}
                    errorMessage={this.state.address.errorMessage}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    name="birth"
                    value={birth}
                    onChange={this.handleChangeBirth}
                    type="date"
                    id="birth"
                    max="3000-12-31"
                    min="1000-01-01"
                    className="form-control"
                    placeholder="Ngày sinh"
                    required
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
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" form="nameform" style={Buttonn}>
              Đăng Ký
            </Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}

const validateInput = (type, checkingText, pass) => {
  if (type === "name") {
    const regexp = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
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
  if (type === "email") {
    const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Email không hợp lệ.",
      };
    }
  }
  if (type === "password") {
    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Mật khẩu từ 8 kí tự bao gồm chữ và số",
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
  if (type === "address") {
    if (checkingText !== null) {
      return { isValid: true, errorMessage: "" };
    } else {
      return {
        isValid: false,
        errorMessage: "Vui lòng nhập",
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
