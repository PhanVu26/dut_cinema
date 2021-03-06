import React, { Component } from "react";
import { connect } from "react-redux";
import { actUpdateUserRequest } from "../../../actions/index";
import callApi from "../../../utils/ApiCallerServer";

class InforUser extends Component {
  constructor(props, context) {
    super(props, context);
    if (!localStorage.getItem("account")) {
      localStorage.setItem("account", JSON.stringify(""));
    }
    let account = JSON.parse(localStorage.getItem("account"));
    if (Object.keys(account).length === 0) {
      window.location.href = "/";
    }
    // 
    this.state = {
      txtName: {
        value: account.user.name,
        isInputValid: true,
        errorMessage: "",
      },
      age: {
        value: account.user.age || "",
        isInputValid: true,
        errorMessage: "",
      },
      // txtPhone: {
      //   value: account.phone,
      //   isInputValid: true,
      //   errorMessage: "",
      // },
      // txtGender: account.gender,
      // txtBirth: props.account.birth,
      txtEmail: {
        value: account.user.email,
      },
      txtPassword: {
        value: "",
        isInputValid: true,
        errorMessage: "",
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
      // txtAddress: {
      //   value: account.address,
      //   isInputValid: true,
      //   errorMessage: "",
      // },
      isChecked: false,
      _id: account.user.id,
      // currentStar: account.currentStar,
      // targets: account.targets,
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

  // handleChangeGender = (event) => {
  //   this.setState({
  //     txtGender: event.target.value,
  //   });
  // };

  toggleChange = (e) => {
    this.setState({
      isChecked: e.target.checked,
    });
  };
  // handleChangeBirth = (event) => {
  //   this.setState({
  //     txtBirth: event.target.value,
  //   });
  // };

  updateAccount = (account) => {
    let accountStorage = JSON.parse(localStorage.getItem("account"));
    
    accountStorage.user.name = account.name;
    accountStorage.user.age = account.age;
    // accountStorage.phone = account.phone;
    // accountStorage.userName = account.userName;
    // accountStorage.gender = account.gender;
    // accountStorage.birth = account.birth;
    // accountStorage.password = account.password;
    // accountStorage.address = account.address;

    localStorage.setItem("account", JSON.stringify(accountStorage));
  };

  onSave = (e) => {
    e.preventDefault();
    let {
      txtName,
      // txtPhone,
      // txtGender,
      txtPassword,
      age,
      txtNewPassword,
      txtRePassword,
      txtEmail,
      // txtAddress,
      // txtBirth,
      _id,
      // targets,
      // currentStar,
      isChecked,
    } = this.state;
    if (isChecked === true) {
      if (
        txtName.value !== "" &&
        txtName.isInputValid === true &&
        age.value !== "" &&
        age.isInputValid === true &&
        txtPassword.value != "" &&
        txtPassword.isInputValid === true &&
        txtNewPassword.value != "" &&
        txtNewPassword.isInputValid === true &&
        txtRePassword.value != "" &&
        txtRePassword.isInputValid === true
        // txtPhone.value !== "" &&
        // txtPhone.isInputValid === true &&
        // txtAddress.value !== "" &&
        // txtAddress.isInputValid === true
      ) {
        let accountUser = {
          name: txtName.value,
          age: parseInt(age.value),
          // phone: txtPhone.value,
          // gender: txtGender,
          // birth: txtBirth,
          password: txtNewPassword.value,
          // address: txtAddress.value,
          // currentStar: currentStar,
          // targets: targets,
        };
        let result = window.confirm("b???n c?? mu???n c???p nh???t ?");
        if (result === true) {
          const temp_account = {
            email: txtEmail.value,
            password: txtPassword.value,
          };
          callApi("auth/login", "POST", temp_account)
            .then((res) => {
              
              this.props.onUpdateUser(accountUser);
              this.updateAccount(accountUser);
              alert("L??u th??ng tin th??nh c??ng");
            })
            .catch((error) => {
              
              alert("Vui l??ng ki???m tra l???i th??ng tin");
            });
        }
      } else {
        alert("Vui L??ng ??i???n ?????y ????? th??ng tin v?? ????ng ?????nh d???ng");
      }
    } else if (
      txtName.value !== "" &&
      txtName.isInputValid === true &&
      age.value !== "" &&
      age.isInputValid === true
    ) {
      let accountUser = {
        name: txtName.value,
        age: parseInt(age.value),
      };
      let result = window.confirm("b???n c?? mu???n c???p nh???t ?");
      if (result === true) {
        this.props.onUpdateUser(accountUser);
        this.updateAccount(accountUser);
        alert("L??u th??ng tin th??nh c??ng");
      }
    } else {
      alert("Vui L??ng ??i???n ?????y ????? th??ng tin v?? ????ng ?????nh d???ng");
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
      // txtPhone,
      // txtGender,
      txtPassword,
      txtNewPassword,
      txtRePassword,
      txtEmail,
      age,
      // txtAddress,
      // txtBirth,
    } = this.state;
    return (
      <form onSubmit={this.onSave} id="nameform">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <label htmlFor="usr">H??? &amp; T??n</label>
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
          {/* <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <label htmlFor="usr">Sao hi???n t???i</label>
              <input
                type="text"
                className="form-control"
                id="Star"
                value={this.props.account.currentStar}
                disabled
              />
            </div>
          </div> */}
          {/* <div className="col-md-4 col-lg-2">
            <div className="form-group">
              <label htmlFor="usr">Ch??? ti??u 2020</label>
              <input
                type="text"
                className="form-control"
                id="targets"
                value={this.props.account.targets}
                disabled
              />
            </div>
          </div> */}
        </div>
        {/* <div className="row mt-3">
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label>Ng??y sinh</label>
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
              <label htmlFor="gender">Gi???i t??nh</label>
              <select
                className="form-control"
                id="gender"
                name="txtGender"
                value={txtGender}
                onChange={this.handleChangeGender}
              >
                <option value="Nam">Nam</option>
                <option value="N???">N???</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="form-group">
              <label htmlFor="usr">S??? ??i???n tho???i</label>
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
        </div> */}

        <div className="row mt-3">
          <div className="col-md-6 col-lg-6">
            <div className="form-group">
              <label>Tu???i</label>
              <input
                type="number"
                name="age"
                id="age"
                className="form-control"
                value={age.value}
                onChange={this.handleInput}
              />
            </div>
          </div>
          {/* <div className="col-md-6 col-lg-6">
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
          </div> */}
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
                ?????i m???t kh???u
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
              placeholder="M???t kh???u hi???n t???i"
              value={txtPassword.value}
              onChange={this.handleInput}
              onBlur={this.handleInputValidation}
            />
            <FormError
              type="txtPassword"
              isHidden={this.state.txtPassword.isInputValid}
              errorMessage={this.state.txtPassword.errorMessage}
            />
            <input
              type="password"
              name="txtNewPassword"
              id="newPassword"
              className="form-control mt-3"
              placeholder="M???t kh???u m???i"
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
              placeholder="X??c nh???n m???t kh???u"
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
              L??u l???i
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const validateInput = (type, checkingText, pass) => {
  if (type === "txtName") {
    const regexp =
      /^[a-zA-Z_???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ]+$/;
    const checkingResult = regexp.exec(checkingText);
    if (checkingResult !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "Kh??ng ch???a s??? v?? k?? t??? ?????c bi???t.",
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
        errorMessage: "S??T ph???i c?? 10 - 11 ch??? s???.",
      };
    }
  }

  if (type === "txtNewPassword" || type === "txtPassword") {
    // const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // const checkingResult = regexp.exec(checkingText);
    // if (checkingResult !== null) {
    //   return { isInputValid: true, errorMessage: "" };
    // } else {
    //   return {
    //     isInputValid: false,
    //     errorMessage: "M???t kh???u t??? 8 k?? t??? bao g???m ch??? v?? s???",
    //   };
    // }
    if (checkingText.length >= 8) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "M???t kh???u c?? ??t nh???t 8 k?? t???",
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
        errorMessage: "M???t kh???u kh??ng kh???p",
      };
    }
  }
  if (type === "txtAddress") {
    if (checkingText !== null) {
      return { isInputValid: true, errorMessage: "" };
    } else {
      return {
        isInputValid: false,
        errorMessage: "M???t kh???u t??? 8 k?? t??? bao g???m ch??? v?? s???",
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
      dispatch(actUpdateUserRequest(user));
    },
  };
};
export default connect(null, mapDispatchToProps)(InforUser);
