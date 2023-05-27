import { useDispatch, useSelector } from "react-redux";
import UserInfo from "../ui/user-info";

import "./user.css";

const User = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userId = window.location.pathname.split("/")[2];

  if (userId === user.user._id) {
    return (
      <div className="user-container">
        <UserInfo sameUser={true} />
      </div>
    );
  }
};

export default User;
