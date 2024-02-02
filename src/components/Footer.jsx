import React from 'react'
import WhiteLogo from '../images/whitelogo.png'
import '../css/header.css'
const Footer = () => {
  return (
    <div className='footer-container'>
      <img src={WhiteLogo} style={{width:'100px'}}></img>
      <br />
      <span style={{color : 'gray', fontSize : '10px'} }>Copyright by ⓒ Letmein ALL rights reserved</span>
    </div>
  )
}

export default Footer