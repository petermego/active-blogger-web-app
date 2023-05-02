import { useEffect, useState } from "react";

import "./Home.css";
import { Modal } from "../ui/Modal";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    document.title = `Active | Home`;
  }, []);

  const onClose = () => {
    setModalShow(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setModalShow(false);
  };

  const modalFormHandler = () => {
    setModalShow(true);
  };

  return (
    <div className="feed">
      <div className="add-feed" onClick={modalFormHandler}>
        <span>+</span>
        <p>Share your experience</p>
      </div>
      {modalShow && <Modal submitHandler={submitHandler} onClose={onClose} feed={"FORM"} />}
    </div>
  );
};

export default Home;
