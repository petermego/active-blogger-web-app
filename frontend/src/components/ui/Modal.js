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
          <form onSubmit={props.submitHandler}>
            <textarea
              ref={props.inputRef}
              required
              autoFocus
              maxLength="200"
              name="caption"
              cols="30"
              rows="4"
              placeholder="what's in your mind"
            />
            {props.spaceProblem && (
              <span style={{ color: "red" }}>you should write more than 5 letters</span>
            )}
            <input
              type="file"
              id="file"
              name="asset"
              accept="image/*"
              onChange={(e) => props.setImg(e.target.files[0])}
            />
            <label htmlFor="file">Choose a Photo</label>
            <input type="submit" value="Post" />
            <button onClick={props.onClose}>Close</button>
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
          inputRef={props.inputRef}
          setImg={props.setImg}
          submitHandler={props.submitHandler}
          spaceProblem={props.spaceProblem}
        />,
        portalElement
      )}
    </Fragment>
  );
};
