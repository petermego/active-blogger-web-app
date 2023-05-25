import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { Modal } from "../ui/Modal";
import { addBlog } from "../../utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user-slice";


const Home = () => {
  const [modalShow, setModalShow] = useState(false);
  const [img, setImg] = useState(null);
  const [spaceProblem, setSpaceProblem] = useState(false);
  const formInputRef = useRef();
  const [loading, setLoading] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    document.title = `Active | Home`;
  }, []);

  const onClose = () => {
    setModalShow(false);
  };

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!(formInputRef.current.value.trim().length >= 5)) {
      setSpaceProblem(true);
      setLoading(false);
      return;
    }
    setSpaceProblem(false);
    setModalShow(false);
    if (img) {
      const blog = {
        user: user.user,
        body: formInputRef.current.value,
        createdDate: new Date(),
        likes: [],
      };
      const formData = new FormData();
      formData.append("file", img);
      formData.append("blog", JSON.stringify(blog));
      
      const [response, status] = await addBlog(formData, user.token);
      switch (status) {
        case 403:
          dispatch(logout());
          navigate("/sign-in");
          break;
        case 401:
          dispatch(logout());
          navigate("/sign-in");
          break;
        case 500:
          break;
        default:
          break;
      }
      setLoading(false);
      return;
    } //TODO
    
    const formData = new FormData();
    formData.append('file', img);
    formData.append("user", user);
    formData.append("", user);
    const request = addBlog(user, { user,  });
    setLoading(false);
  };

  const modalFormHandler = () => {
    setModalShow(true);
  };

  return (
    <div className="feed">
      {loading && <div className="line"></div>}
      <div className="add-feed" onClick={modalFormHandler}>
        <span>+</span>
        <p>Share your experience</p>
      </div>
      {modalShow && (
        <Modal
          submitHandler={submitHandler}
          onClose={onClose}
          feed={"FORM"}
          inputRef={formInputRef}
          setImg={setImg}
          spaceProblem={spaceProblem}
        />
      )}
    </div>
  );
};

export default Home;
