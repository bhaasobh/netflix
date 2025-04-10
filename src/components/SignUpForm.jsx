
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SignIn.css'; 

const SignUpForm = () => {
  return (
    <div>
      <div className="frame61">
        <div className="frame68">
          <div className="frame67">
            <h1>Sign Up</h1>
            <div className="frame66">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
              <Link to="/">Back to Sign In</Link>
            </div>
          </div>
          <div className="frame65">
            <div className="frame64">
             
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

export default SignUpForm;
