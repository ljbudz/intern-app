import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "semantic-ui-react";

const modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss}>
      <Modal open onClick={e => e.stopPropagation()}>
        <Modal.Header>{props.title}</Modal.Header>
        <Modal.Content>{props.content}</Modal.Content>
        <Modal.Actions>{props.actions}</Modal.Actions>
      </Modal>
    </div>,
    document.querySelector("#modal")
  );
};

export default modal;
