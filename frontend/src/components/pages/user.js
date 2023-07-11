import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserInfo from "../ui/user-info";

import "./user.css";

const User = (props) => {
  const user = useSelector((state) => state.user);

  const userId = window.location.pathname.split("/")[2];

  useEffect(() => {
    document.title = `Active | ${user.user.firstName} ${user.user.lastName}`;
  }, [user]);

  if (userId === user.user._id) {
    return (
      <div className="user-container">
        <UserInfo
          sameUser={true}
          msgState={props.state}
          setError={props.setError}
          setMessage={props.setMessage}
          setCurrent={props.setCurrent}
        />
      </div>
    );
  }
};

export default React.memo(User);
