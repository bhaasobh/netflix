
import React from 'react';
import { RiTranslate2 } from "react-icons/ri";

import '../css/Footer.css'

const Footer = () => {
  return (
    <div className="footer">
     
      <div className="footer-links">
  <ul>
    <li><p>
  Questions? Call <a href="tel:1-844-505-2993" className="footer-phone">1-844-505-2993</a>
</p>
</li>
    <li></li>
    <li></li>
    <li></li>
    <li><a href="#">FAQ</a></li>
    <li><a href="#">Help Center</a></li>
    <li><a href="#">Netflix Shop</a></li>
    <li><a href="#">Terms of Use</a></li>
   <li><a href="#">Privacy</a></li>
   <li><a href="#">Cookie Preferences</a></li>
   <li><a href="#">Corporate Information</a></li>
   <li><a href="#">Do Not Sell or Share My Personal Information</a></li>
    <li><a href="#">Ad Choices</a></li>
    
  </ul>
  <div className="footer-lang">
  <button className="lang-btn"><RiTranslate2 />English ▾</button>
</div>
</div>



    </div>
  );
};

export default Footer;
