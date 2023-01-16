import { Link, useNavigate } from "react-router-dom";
import { Fragment, useRef } from "react";

import Button from "../ui/Button";
import './Sign-up.css';
import { SignInReq } from "../../utils/Apis";

const SignIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigation = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const req = await SignInReq(emailRef.current.value, passwordRef.current.value);
    if (!req.error) {
      return navigation("/home");
    }
    console.log("error");
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
    </Fragment>
  );
}
 
export default SignIn;