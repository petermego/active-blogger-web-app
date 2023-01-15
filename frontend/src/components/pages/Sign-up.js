import { useRef } from 'react';
import { redirect } from 'react-router-dom';

import './Sign-up.css';
import Button from './../ui/Button'
import { SignUpReq } from '../../utils/Apis';

const SignUp = () => {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const uniqueNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const submitHandler = (event) => {
    event.preventDefault();
    const req = SignUpReq(
      firstNameRef.current.value, 
      lastNameRef.current.value,
      uniqueNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    if (req.error) {
      console.log("error");
    }
    return redirect('/home');
  };

  return (
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
  );
}
 
export default SignUp;