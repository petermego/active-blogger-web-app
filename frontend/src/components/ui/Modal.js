import { Fragment } from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

const BackDrop = () => {
  return <div className="backdrop"></div>
};

const ModalOverlay = props => {
  return (
    <div className="modal">
      <div className="content">
        <p>{props.value}</p>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

export const Modal = props => {

  return (
    <Fragment>
      {createPortal(<BackDrop />, portalElement)}
      {createPortal(
        <ModalOverlay onClose={props.onClose} value={props.children} />,
        portalElement
      )}
    </Fragment>
  );
}