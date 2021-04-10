import React, { Component } from "react";
import { connect } from "react-redux";
// import { actUpdateUserRequest } from "../../actions/action";

class InforUser extends Component {
  constructor(props, context) {
    super(props, context);
    let account = JSON.parse(localStorage.getItem("account"));
    this.state = {
      txtName: {
        value: account.userName,
        isInputValid: true,
        errorMessage: "",
      },
      txtPhone: {
        value: account.phone,
        isInputValid: true,
        errorMessage: "",
      },
      txtGender: account.gender,
      txtBirth: props.account.birth,
      txtEmail: {
        value: account.email,
      },
      getPassword: {
        value: account.password,
      },
      txtPassword: {
        value: "",
      },
      txtNewPassword: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtRePassword: {
        value: "",
        isInputValid: true,
        errorMessage: "",
      },
      txtAddress: {
        value: account.address,
        isInputValid: true,
        errorMessage: "",
      },
      isChecked: false,
      _id: account._id,
      currentStar: account.currentStar,
      targets: account.targets,
    };
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    const newState = { ...this.state[name] }; /* dummy object */
    newState.value = value;
    this.setState({ [name]: newState });
  };

  handleInputValidation = (event) => {
    const { name } = event.target;
    const { isInputValid, errorMessage } = validateInput(
      name,
      this.state[name].value,
      this.state.txtNewPassword.value
    );
    const newState = { ...this.state[name] }; /* dummy object */
    newState.isInputValid = isInputValid;
    newState.errorMessage = errorMessage;
    this.setState({ [name]: newState });
  };

  handleChangeGender = (event) => {
    this.setState({
      txtGender: event.target.value,
    });
  };

  toggleChange = (e) => {
    this.setState({
      isChecked: e.target.checked,
    });
  };
  handleChangeBirth = (event) => {
    this.setState({
      txtBirth: event.target.value,
    });
  };

  updateAccount = (account) => {
    let accountStorage = JSON.parse(localStorage.getItem("account"));

    accountStorage.userName = account.userName;
    accountStorage.phone = account.phone;
    accountStorage.userName = account.userName;
    accountStorage.gender = account.gender;
    accountStorage.birth = account.birth;
    accountStorage.password = account.password;
    accountStorage.address = account.address;

    localStorage.setItem("account", JSON.stringify(accountStorage));
  };

  onSave = (e) => {
    e.preventDefault();
    let {
      txtName,
      txtPhone,
      txtGender,
      txtPassword,
      getPassword,
      txtNewPassword,
      txtEmail,
      txtAddress,
      txtBirth,
      _id,
      targets,
      currentStar,
      isChecked,
    } = this.state;
    if (isChecked === true) {
      if (txtPassword.value !== getPassword.value) {
        alert("Mật khẩu Trước đó không đúng");
        return null;
      } else if (
        txtName.value !== "" &&
        txtName.isInputValid === true &&
        txtPhone.value !== "" &&
        txtPhone.isInputValid === true &&
        txtAddress.value !== "" &&
        txtAddress.isInputValid === true
      ) {
        let accountUser = {
          _id: _id,
          userName: txtName.value,
          email: txtEmail.value,
          phone: txtPhone.value,
          gender: txtGender,
          birth: txtBirth,
          password: txtNewPassword.value,
          address: txtAddress.value,
          currentStar: currentStar,
          targets: targets,
        };
        let result = window.confirm("bạn có muốn cập nhật ?");
        if (result === true) {
          this.props.onUpdateUser(accountUser);
          this.updateAccount(accountUser);
          alert("Lưu thông tin thành công");
        }
      }
    } else if (
      txtName.value !== "" &&
      txtName.isInputValid === true &&
      txtPhone.value !== "" &&
      txtPhone.isInputValid === true &&
      txtAddress.value !== "" &&
      txtAddress.isInputValid === true
    ) {
      let accountUser = {
        _id: _id,
        userName: txtName.value,
        email: txtEmail.value,
        phone: txtPhone.value,
        gender: txtGender,
        birth: txtBirth,
        password: getPassword.value,
        address: txtAddress.value,
        currentStar: currentStar,
        targets: targets,
      };
      let result = window.confirm("bạn có muốn cập nhật ?");
      if (result === true) {
        this.props.onUpdateUser(accountUser);
        this.updateAccount(accountUser);
        alert("Lưu thông tin thành công");
      }
    } else {
      alert("Vui Lòng điền đầy đủ thông tin và đúng định dạng");
    }
  };

  render() {
    let changePasswordHide = {
      display: "none",
    };
    let changePasswordUp = {
      display: "block",
    };
    let {
      txtName,
      txtPhone,
      txtGender,
      txtPassword,
      txtNewPassword,
      txtRePassword,
      txtEmail,
      txtAddress,
      txtBirth,
    } = this.state;
    return (
      <form onSubmit={this.onSave} id="nameform">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <label htmlFor="usr">Họ &amp; Tên</label>
              <input
                type="text"
                className="form-control"
                id="txtName"
                name="txtName"
                value={txtName.value}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
              />
              <FormError
                type="txtName"
                isHidden={this.state.txtName.isInputValid}
                errorMessage={this.state.txtName.errorMessage}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <label htmlFor="usr">Sao hiện tại</label>
              <input
                type="text"
                className="form-control"
                id="Star"
                value={this.props.account.currentStar}
                disabled
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <label htmlFor="usr">Chỉ tiêu 2020</label>
              <input
                type="text"
                className="form-control"
                id="targets"
                value={this.props.account.targets}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label>Ngày sinh</label>
              <input
                type="date"
                name="txtBirth"
                id="txtBirth"
                max="3000-12-31"
                min="1000-01-01"
                className="form-control"
                value={txtBirth}
                onChange={this.handleChangeBirth}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <label htmlFor="gender">Giới tính</label>
              <select
                className="form-control"
                id="gender"
                name="txtGender"
                value={txtGender}
                onChange={this.handleChangeGender}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="form-group">
              <label htmlFor="usr">Số điện thoại</label>
              <input
                type="number"
                className="form-control"
                id="txtPhone"
                name="txtPhone"
                value={txtPhone.value}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
              />
              <FormError
                type="txtPhone"
                isHidden={this.state.txtPhone.isInputValid}
                errorMessage={this.state.txtPhone.errorMessage}
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="txtAddress"
                id="txtAddress"
                className="form-control"
                value={txtAddress.value}
                onChange={this.handleInput}
                onBlur={this.handleInputValidation}
              />
              <FormError
                type="txtAddress"
                isHidden={this.state.txtAddress.isInputValid}
                errorMessage={this.state.txtAddress.errorMessage}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                value={txtEmail.value}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 col-lg-12">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={this.toggleChange}
                />
                Đổi mật khẩu
              </label>
            </div>
          </div>
        </div>
        <div
          className="row mt-2"
          style={this.state.isChecked ? changePasswordUp : changePasswordHide}
        >
          <div className="col-md-6 col-lg-6">
            <input
              type="password"
              name="txtPassword"
              id="password"
              className="form-control mt-3"
              placeholder="Mật khẩu hiện tại"
              value={txtPassword.value}
              onChange={this.handleInput}
            />
            <input
              type="password"
              name="txtNewPassword"
              id="newPassword"
              className="form-control mt-3"
              placeholder="Mật khẩu mới"
              value={txtNewPassword.value}
              onChange={this.handleInput}
              onBlur={this.handleInputValidation}
            />
            <FormError
              type="txtNewPassword"
              isHidden={this.state.txtNewPassword.isInputValid}
              errorMessage={this.state.txtNewPassword.errorMessage}
            />
            <input
              type="password"
              name="txtRePassword"
              id="rePassword"
              className="form-control mt-3"
              placeholder="Xác nhận mật khẩu"
              value={txtRePassword.value}
              onChange={this.handleInput}
              onBlur={this.handleInputValidation}
            />
            <FormError
              type="txtRePassword"
              isHidden={this.state.txtRePassword.isInputValid}
              errorMessage={this.state.txtRePassword.errorMessage}
            />
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-2 col-lg-2">
            <button
              type="submit"
              form="nameform"
              className="btn btn-success mb-5"
            >
              Lưu lại
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validateInput = (type, checkingText, pass) => {
  if (type === "txtName") {
    const regexp = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Không chứa số và kí tự đặc biệt.",
      };
    }
  }
  if (type === "txtPhone") {
    const regexp = /^\d{10,11}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "SĐT phải có 10 - 11 chữ số.",
      };
    }
  }

  if (type === "txtNewPassword") {
    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Mật khẩu từ 8 kí tự bao gồm chữ và số",
      };
    }
  }
  if (type === "txtRePassword") {
    let rePass = checkingText;
    if (pass === rePass) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Mật khẩu không khớp",
      };
    }
  }
  if (type === "txtAddress") {
    if (checkingText !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Mật khẩu từ 8 kí tự bao gồm chữ và số",
      };
    }
  }
};

function FormError(props) {
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUser: (user) => {
      //   dispatch(actUpdateUserRequest(user));
    },
  };
};
export default connect(null, mapDispatchToProps)(InforUser);
