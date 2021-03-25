import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, ButtonToolbar } from "react-bootstrap";

class Register extends React.Component {


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
      txtName,
      txtPhone,
      txtGender,
      txtPassword,
      txtRePassword,
      txtEmail,
      txtAddress,
      txtBirth,
    } = this.state;
    return (
      <ButtonToolbar style={toolbar}>
        <div
          style={link}
          className="text-secondary text-decoration-none"
        >
          Đăng Ký
        </div>
        <Modal
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton style={modalHeader}>
            <Modal.Title id="contained-modal-title-lg" style={header}>
              ĐĂNG KÝ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="nameform">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={txtName.value}
                    placeholder="Họ Tên"
                    name="txtName"
                  />
                  
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Số điện thoại"
                    name="txtPhone"
                   
                  />
                  
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="txtGender"
                   
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
                    name="txtEmail"
           
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
                    name="txtPassword"
            
                  />
                  
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    id="rePassword"
                    placeholder="Xác nhận mật khẩu"
                    name="txtRePassword"
      
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
                    name="txtAddress"
      
                  />
                  
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <input
                    name="txtBirth"
               
                    type="date"
                    id="dayOfBirth"
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



export default Register;
