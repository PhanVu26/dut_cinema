import React from "react";
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

const PopupMovie = ({
  open,
  onClose,
  onComfirm,
  formState,
  handleChange,
  handleOnClose,
}) => {
  return (
    <Modal
      isOpen={open}
      toggle={handleOnClose}
      id="exampleModalCenter"
      style={{ width: "50%", maxWidth: "unset" }}
    >
      <ModalHeader toggle={handleOnClose}>
        {!formState.id ? "Tạo phim" : "Sửa phim"}
      </ModalHeader>
      <ModalBody style={{ background: "#f5f5f5" }}>
        <Form>
          <FormGroup>
            <Label>{`Tên phim`}</Label>
            <Input
              type="text"
              name="name"
              value={formState.name === undefined ? "" : formState.name}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Thể loại`}</Label>
            <Input
              type="text"
              name="type"
              value={formState.type === undefined ? "" : formState.type}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Thời lượng`}</Label>
            <Input
              type="text"
              name="time"
              value={formState.time === undefined ? "" : formState.time}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Quốc gia`}</Label>
            <Input
              type="text"
              name="nation"
              value={formState.nation === undefined ? "" : formState.nation}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Giá vé`}</Label>
            <Input
              type="text"
              name="price"
              value={formState.price === undefined ? "" : formState.price}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Ngày ra mắt`}</Label>
            <Input
              type="text"
              name="premiereDate"
              value={
                formState.premiereDate === undefined
                  ? ""
                  : formState.premiereDate
              }
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Diễn viên`}</Label>
            <Input
              type="text"
              name="actor"
              value={formState.actor === undefined ? "" : formState.actor}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Đạo diễn`}</Label>
            <Input
              type="text"
              name="author"
              value={formState.author === undefined ? "" : formState.author}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Ngày`}</Label>
            <Input
              type="text"
              name="date"
              value={formState.date === undefined ? "" : formState.date}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Slug movie`}</Label>
            <Input
              type="text"
              name="slug"
              value={formState.slug === undefined ? "" : formState.slug}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Giới thiệu`}</Label>
            <Input
              type="text"
              name="intro"
              value={formState.intro === undefined ? "" : formState.intro}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Ảnh 1`}</Label>
            <Input
              type="text"
              name="image"
              value={formState.image === undefined ? "" : formState.image}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Ảnh 2`}</Label>
            <Input
              type="text"
              name="imageInfo"
              value={
                formState.imageInfo === undefined ? "" : formState.imageInfo
              }
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
          <FormGroup>
            <Label>{`Video`}</Label>
            <Input
              type="text"
              name="video"
              value={formState.video === undefined ? "" : formState.video}
              onChange={(event) => handleChange(event)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="blue-dark" color="primary" onClick={onComfirm}>
          {!formState.id ? "Tạo" : "Sửa"}
        </Button>
        <Button color="secondary" onClick={handleOnClose}>
          close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
PopupMovie.propTypes = PropsType;

export default PopupMovie;
