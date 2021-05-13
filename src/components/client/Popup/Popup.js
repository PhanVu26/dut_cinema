import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Form,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import { FormGroup } from "@material-ui/core";

const PropsType = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onComfirm: PropTypes.func,
};

const PopupComfirm = ({ open, onClose, onComfirm, total }) => {
  const [formState, setFormState] = useState({});
  const handleChange = (e) => {
    e.persist();
    setFormState((formState) => ({
      ...formState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnClose = () => {
    setFormState({});
    onClose();
  };
  let title = total !== undefined ? "Thông tin thanh toán" : "Xác nhận xóa";
  return (
    <Modal isOpen={open} toggle={handleOnClose} id="exampleModalCenter">
      <ModalHeader toggle={handleOnClose}>{title}</ModalHeader>
      <ModalBody>
        {total !== undefined && (
          <Form>
            <FormGroup>
              <Label>{`Họ tên chủ tài khoản`}</Label>
              <Input
                type="text"
                name="title"
                value={formState.title === undefined ? "" : formState.title}
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label>{`Số tài khoản`}</Label>
              <Input
                type="text"
                name="numberSeri"
                value={
                  formState.numberSeri === undefined ? "" : formState.numberSeri
                }
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <Label>{`Số tiền thanh toán`}</Label>
              <Input
                type="text"
                disabled
                name="total"
                value={total}
                onChange={(event) => handleChange(event)}
              />
            </FormGroup>
          </Form>
        )}
        {total === undefined && <span>Bạn có chắc chắn muốn xóa?</span>}
      </ModalBody>
      <ModalFooter>
        <Button className="blue-dark" color="primary" onClick={onComfirm}>
          Xác nhận
        </Button>
        <Button color="secondary" onClick={handleOnClose}>
          close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
PopupComfirm.propTypes = PropsType;

export default PopupComfirm;
