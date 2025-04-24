
import '../css/SignIn.css';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { Link } from 'react-router-dom';




const SignInForm = () => {

  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // you only need this once 🙂
  
    try {
      const res = await fetch(config.SERVER_API + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),

      });
  
      const data = await res.json();
  
      if (res.ok) {
        login({
          token: data.token,
          email: data.email,
          role: data.role,
          id:data.id,
          profiles: data.profiles
        });
  
      navigate('/whoiswatching');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };
  


  return (
    <div>
      <div className="frame61">
        <div className="frame68">
          <div className="frame67">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
      <div className="frame66">
        <input
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <a href="#">Forgot Password?</a>
      </div>
    </form>
          </div>
          <div className="frame65">
            <div className="frame64">
            <div className='checkRememberMe'>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
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
