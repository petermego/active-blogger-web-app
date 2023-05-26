import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Sign-up.css';
import Button from './../ui/Button'
import { SignUpReq } from '../../utils/Apis';
import { Modal } from '../ui/Modal';
import { login } from '../../features/user-slice';

const SignUp = () => {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const uniqueNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Active | Sign up";
    if (localStorage.length) return localStorage.clear();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const req = await SignUpReq(
        firstNameRef.current.value, 
        lastNameRef.current.value,
        uniqueNameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!req.error) {
        dispatch(login({user: req.user, token: req.token}));
        localStorage.clear();
        localStorage.setItem("user-info", JSON.stringify({ user: req.user, token: req.token }));
        return navigate('/home');
      }
      setModalMessage(req.message);
      setModalShow(true);
    } catch (error) {
      console.log(error);
      return;
    }
    return;
  };

  const modalCloseHandler = () => {
    setModalMessage("");
    setModalShow(false);
  };

  return (
    <Fragment>
      <form className="flex center style" onSubmit={submitHandler}>
        <div className="name" style={{ marginBottom: '2.2rem' }}>
          <input required type="text" ref={firstNameRef} name="fname" placeholder='Enter your first name...' />
          <input required type="text" ref={lastNameRef} name="lname" placeholder='Enter your last name...' />
        </div>
        <div className='email input'>
          <input required type="email" ref={emailRef} name="email" placeholder='Enter your E-mail...' />
        </div>
        <div className='password input'>
          <input required type="password" ref={passwordRef} name="password" placeholder='Enter new password...' />
        </div>
        <Button type="input">Submit</Button>
      </form>
      { modalShow && <Modal onClose={modalCloseHandler}>{modalMessage}</Modal> }
      <Link className="register" to={"/sign-in"}>Sign in</Link>
    </Fragment>
  );
}
 
export default SignUp;