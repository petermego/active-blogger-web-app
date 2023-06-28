import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { useSelector } from "react-redux";

import "./Blog.css";
import { useState } from 'react';
import { addLike, removeLike } from '../../utils/Apis';
import { useEffect } from 'react';

const Blog = (props) => {
  const user = useSelector((state) => state.user);
  const [status, setStatus] = useState("regular");
  const [likes, setLikes] = useState(props.likes.length);
  let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(props.createdDate);

  const likeStatus = async () => {
    if (status === "regular") {
      await addLike(user.token, props.id, props.user._id);
      setLikes((prev) => prev = prev+1);
      setStatus("active");
    } else {
      await removeLike(user.token, props.id, props.user._id);
      setLikes((prev) => prev = prev-1);
      setStatus("regular");
    }
  };
  useEffect(() => {
    if (props.likes.includes(props.user._id)) {
      setStatus("active");
    }
  }, [props.user._id, props.likes])
  
  
  return (
    <VerticalTimelineElement className="blog">
      <div className="user-data">
        {props.user.imagePath ? (
          <img
            className="user-img"
            src={`http://localhost:8080/${props.user.imagePath}`}
            alt={props.user.firstName}
          />
        ) : (
          <div className="user-img">{props.user.firstName[0]}</div>
        )}
        <p>
          {props.user.firstName} {props.user.lastName}
        </p>
      </div>
      <p className="blog-body">{props.body}</p>
      {props.image ? (
        <img
          className="blog-img"
          src={`http://localhost:8080/${props.image}`}
          alt="blog"
        />
      ) : null}
      <div className="blog-rate">
        <div>
          <img onClick={() => likeStatus()} className={`${status}`} src="./arrow-up-solid.svg" alt="arrow up" />
          {<p>{likes}</p>}
        </div>
        <p className='comment'>Comments</p>
      </div>
      <p className="blog-date">
        {date.getDate()} {month[date.getMonth()]}
      </p>
    </VerticalTimelineElement>
  );
}
 
export default Blog;