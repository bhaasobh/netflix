import React from 'react';
import '../css/SignIn.css';

import { Link } from 'react-router-dom';

const SignInForm = () => {
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
              <a href="#">Forgot Password?</a>
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
              This page is protected by Google reCAPTCHA to ensure you’re not a bot. <a href="#">Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
