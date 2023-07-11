import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { Modal } from "../ui/Modal";
import { addBlog, addExperience, getAllBlogs } from "../../utils/Apis";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user-slice";
import {
  VerticalTimeline
} from "react-vertical-timeline-component";
import Blog from "../ui/Blog";

const Home = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [img, setImg] = useState(null);
  const [spaceProblem, setSpaceProblem] = useState(false);
  const [blogs, setBlogs] = useState([]);
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
      const [data] = await getAllBlogs(user.token);
      const convertedData = data.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          body={blog.body}
          image={blog.image}
          likes={blog.likes}
          user={blog.user}
          comments={blog.comments}
          createdDate={blog.createdDate}
        />
      ));
      setBlogs(convertedData);
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
    const [data] = await getAllBlogs(user.token);
    const convertedData = data.map((blog) => (
      <Blog
        key={blog._id}
        id={blog._id}
        body={blog.body}
        image={blog.image}
        likes={blog.likes}
        user={blog.user}
        comments={blog.comments}
        createdDate={blog.createdDate}
      />
    ));
    setBlogs(convertedData);
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
      const convertedData = data.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          body={blog.body}
          image={blog.image}
          likes={blog.likes}
          user={blog.user}
          comments={blog.comments}
          createdDate={blog.createdDate}
        />
      ));
      setBlogs(convertedData);
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
      <div className="timeline">
        <VerticalTimeline>
          {blogs.length ? blogs : <p className="empty">There's no blogs yet</p>}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default React.memo(Home);
