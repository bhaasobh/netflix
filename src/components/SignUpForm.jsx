import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignIn.css'; 
import config from '../config';



const isValidPassword = (password) => {
  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLength && hasLetter && hasNumber;
};


const SignUpForm = () => {


  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('user');


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isValidPassword(password)) {
    alert('הסיסמה חייבת להכיל לפחות 8 תווים, לפחות אות אחת ולפחות ספרה אחת.');
    return;
  }

  try {
    const response = await fetch(config.SERVER_API + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || 'ההרשמה הצליחה!');
    } else {
      alert(data.message || 'שגיאה בהרשמה');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('משהו השתבש...');
  }
};


  return (
    <div>
      <div className="frame61">
        <div className="frame68">
          <div className="frame67">
            <h1>Sign Up</h1>
            <div className="frame66">
            <form onSubmit={handleSubmit}>
  <input
    name="email"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
    name="password"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
<div className="role-select">
  <label className="radio-option">
    <input
      type="radio"
      name="role"
      value="admin"
      checked={role === 'admin'}
      onChange={(e) => setRole(e.target.value)}
    />
    <span>Admin</span>
  </label>

  <label className="radio-option">
    <input
      type="radio"
      name="role"
      value="user"
      checked={role === 'user'}
      onChange={(e) => setRole(e.target.value)}
    />
    <span>User</span>
  </label>
</div>

  <button type="submit">Sign Up</button>
</form>

              <Link to="/">Back to Sign In</Link>
            </div>
          </div>
          <div className="frame65">
            <div className="frame64"></div>
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
