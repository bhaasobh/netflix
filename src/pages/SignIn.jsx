// src/pages/SignIn.jsx
import React from 'react';
import SignInForm from '../components/SignInForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/SignIn.css';

const SignIn = () => {
  return (
    <div className="background">
      <div className="signin-page">
      <Header />
        <SignInForm />
        <Footer />
      </div>
    </div>
  );
};

export default SignIn;
