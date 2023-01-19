import { Link, useNavigate } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../ui/Button";
import './Sign-up.css';
import { SignInReq } from "../../utils/Apis";
import { Modal } from "../ui/Modal";
import { login } from "../../features/user-slice";

const SignIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigation = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const req = await SignInReq(emailRef.current.value, passwordRef.current.value);
      if (!req.error) {
        const { token, user } = req;
        dispatch(login(user));
        localStorage.setItem("user-info", JSON.stringify({user, token}));
        return navigation("/home");
      }
      setModalMessage(req.message);
      setModalShow(true);
      return;
    } catch (error) {
      setModalMessage(error);
      setModalShow(true);
      return;
    }
  };

  const modalCloseHandler = () => {
    setModalMessage("");
    setModalShow(false);
  };

  const style = {
    height: "30vh"
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler} style={style} className="flex center style">
        <div className='email input'>
          <input ref={emailRef} required type="email" name="email" placeholder="Enter your E-mail..." />
        </div>
        <div className='password input'>
          <input ref={passwordRef} required type="password" name="password" placeholder="Enter your password..." />
        </div>
        <Button type="input">Login</Button>
      </form>
      <Link className="register" to={"/sign-up"}>Sign up</Link>
      { modalShow && <Modal onClose={modalCloseHandler}>{modalMessage}</Modal> }
    </Fragment>
  );
}
 
export default SignIn;