
import React from 'react';
import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';
import Header from '../components/Header'

const SignUp = () => {
  return (
    <div className="background">
      <div className="signin-page">
      <Header />
        <SignUpForm />;
        <Footer />
        </div>
        </div>
  )
};

export default SignUp;
