import { Fragment, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Sign-up.css';
import Button from './../ui/Button'
import { SignUpReq } from '../../utils/Apis';

const SignUp = () => {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const uniqueNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const req = await SignUpReq(
      firstNameRef.current.value, 
      lastNameRef.current.value,
      uniqueNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    if (req.error) {
      console.log("error");
      return;
    }
    return navigate('/home');
  };

  return (
    <Fragment>
      <form className="flex center style" onSubmit={submitHandler}>
        <div className=" name">
          <input required type="text" ref={firstNameRef} name="fname" placeholder='Enter your first name...' />
          <input required type="text" ref={lastNameRef} name="lname" placeholder='Enter your last name...' />
        </div>
        <div className='username input'>
          <input required type="text" ref={uniqueNameRef} name="username" placeholder='Enter a unique name...' />
        </div>
        <div className='email input'>
          <input required type="text" ref={emailRef} name="email" placeholder='Enter your E-mail...' />
        </div>
        <div className='password input'>
          <input required type="text" ref={passwordRef} name="password" placeholder='Enter new password...' />
        </div>
        <Button type="input">Submit</Button>
      </form>
      <Link className="register" to={"/sign-in"}>Sign in</Link>
    </Fragment>
  );
}
 
export default SignUp;