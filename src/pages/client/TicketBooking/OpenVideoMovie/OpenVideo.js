import React from "react";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-uppercase"
        >
          {props.info.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="video"
            className="embed-responsive-item"
            src={props.info.video}
          ></iframe>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function OpenVideo(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ButtonToolbar>
      <p  variant="primary" onClick={() => setModalShow(true)}>
        <i className="far fa-play-circle play-video"></i>
      </p>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        info={props.info}
      />
    </ButtonToolbar>
  );
}

export default OpenVideo;
