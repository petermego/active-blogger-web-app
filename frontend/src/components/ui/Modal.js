import { Fragment } from "react";
import { createPortal } from "react-dom";

import "./Modal.css";

const BackDrop = () => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  if (props.feed === "FORM") {
    return (
      <div className="modal">
        <div className="content">
          <form onSubmit={props.onClose}>
            <textarea
              required
              autoFocus
              maxLength="200"
              name="caption"
              cols="30"
              rows="5"
              placeholder="what's in your mind"
            />
            <input type="file" name="asset" />
            <button>Post</button>
          </form>
        </div>
      </div>
    );
  }
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

export const Modal = (props) => {
  return (
    <Fragment>
      {createPortal(<BackDrop />, portalElement)}
      {createPortal(
        <ModalOverlay
          onClose={props.onClose}
          value={props.children}
          feed={props.feed}
        />,
        portalElement
      )}
    </Fragment>
  );
};
