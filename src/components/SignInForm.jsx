import React from 'react';
import '../css/SignIn.css';

import { Link } from 'react-router-dom';

const SignInForm = () => {
  const handleForgotPassword = () => {
    // Do something here, like:
    console.log('Forgot password clicked');
    // or navigate('/forgot-password');
    // or openModal();
  };
  return (
    <div>
      <div className="frame61">
        <div className="frame68">
          <div className="frame67">
            <h1>Sign In</h1>
            <div className="frame66">
              <input type="text" placeholder="Email or phone number" />
              <input type="password" placeholder="Password" />
              <button>Sign In</button>
              <button
  onClick={handleForgotPassword}
  style={{
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  }}
>
  Forgot Password?
</button>

            </div>
          </div>
          <div className="frame65">
            <div className="frame64">
                <div className='checkRememberMe'>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
              </div>
              <p>
                New to Netflix? <Link to="/signup">Sign up now.</Link>
              </p>
            </div>
            <p>
              This page is protected by Google reCAPTCHA to ensure you’re not a bot. <button
  onClick={handleForgotPassword}
  style={{
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    color: 'white',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  }}
>Learn more.</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
