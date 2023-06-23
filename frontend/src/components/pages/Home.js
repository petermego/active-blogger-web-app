import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { Modal } from "../ui/Modal";
import { addBlog, addExperience, getAllBlogs } from "../../utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user-slice";


const Home = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [img, setImg] = useState(null);
  const [spaceProblem, setSpaceProblem] = useState(false);
  const [blogs, setBlogs] = useState(null);
  const formInputRef = useRef();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    document.title = `Active | Home`;
  }, []);

  const onClose = () => {
    setModalShow(false);
  };

  const checkStatus = (response, status) => {
    switch (status) {
      case 201 || 200:
        props.setError(response.error);
        props.setMessage(response.message);
        props.setCurrent(true);
        break;
      case 403:
        dispatch(logout());
        navigate("/sign-in");
        props.setError(response.error);
        props.setMessage(response.message);
        props.setCurrent(true);
        break;
      case 401:
        dispatch(logout());
        navigate("/sign-in");
        props.setError(response.error);
        props.setMessage(response.message);
        props.setCurrent(true);
        break;
      case 500:
        props.setError(response.error);
        props.setMessage(response.message);
        props.setCurrent(true);
        break;
      default:
        break;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    if (!(formInputRef.current.value.trim().length >= 5)) {
      setSpaceProblem(true);
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
      checkStatus(response, status);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    const blog = {
      user: user.user,
      body: formInputRef.current.value,
      createdDate: new Date(),
      likes: [],
    };
    const formData = new FormData();
    formData.append("blog", JSON.stringify(blog));
    const [response, status] = await addExperience(formData, user.token);
    checkStatus(response, status);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const modalFormHandler = () => {
    setModalShow(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [data, status] = await getAllBlogs(user.token);
      if (status === 403 || status === 401) {
        localStorage.clear();
      }
      //TODO => convert data to blog
    }
    fetchData();
  }, [user]);

  return (
    <div className="feed">
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
          img={img}
          setImg={setImg}
          spaceProblem={spaceProblem}
        />
      )}
      <div className="timeline"></div>
    </div>
  );
};

export default Home;
