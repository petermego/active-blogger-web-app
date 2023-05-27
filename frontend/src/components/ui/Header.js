import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { logout } from "../../features/user-slice";

import "./Header.css";

const Header = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading.isLoading);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  let message;

  if (props.msgState.error) {
    message = <div className="header-message error">
      <p>{props.msgState.message}</p>
      <button onClick={() => {
        props.setError(false);
        props.setCurrent(false);
        props.setMessage('');
      }}>X</button>
    </div>;
  } else {
    message = <div className="header-message normal">
      <p>{props.msgState.message}</p>
      <button onClick={() => {
        props.setCurrent(false);
        props.setMessage("");
      }}>X</button>
    </div>;
  }
  if (
    user &&
    (window.location.pathname === "/sign-in" ||
      window.location.pathname === "/sign-up")
  ) {
    return (
      <header className="flex pl-10 pr-10 z-40 bg-blackHeader text-5xl text-black font-serif w-100% justify-center items-center">
        <span>
          <Link to={"/home"}>ACTIVE</Link>
        </span>
      </header>
    );
  }
  return (
    <Fragment>
      {loading && <div className="scrolling-bar"></div>}
      {props.msgState.current && message}
      <header className="flex z-40 bg-blackHeader text-5xl text-black font-serif w-100% justify-between items-center">
        <span>
          <Link to={"/home"}>ACTIVE</Link>
        </span>
        <div className="search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
          </svg>
          <input type="text" placeholder="Search..." />
        </div>
        <nav className="user-info">
          <Link to={`/user/${user.user._id}`}>
            <PersonIcon />
          </Link>
          <LogoutIcon className="logout-icon" onClick={logoutHandler} />
        </nav>
        <div className="header-menu">
          <MenuIcon />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
