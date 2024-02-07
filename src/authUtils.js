import axios from 'axios'
import emailjs from 'emailjs-com';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// authUtils.js
export const generateMessage = () => {
    return Math.floor(Math.random() * 10) + 1;
  };
  
  export const sendEmail = (email, name, msg) => {
    const templateParams = {
      user_email: email,
      user_name: name,
      message: msg,
    };
  
    return emailjs.send('test-service', 'test-template', templateParams, 'MNNl2bASrPAB4shUI');
  };
 

  