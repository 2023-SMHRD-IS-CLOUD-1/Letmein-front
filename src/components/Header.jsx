import React from 'react'
import logo from '../images/logo.png'

import {Link} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import '../css/header.css'
const Header = () => {
    return (
      <div className='header-container'>
        <img src={logo} alt="Logo" style={{ width: '130px' }} />
        <div className="navigation-links">
          <Link to="/avatar" style={{marginRight:'10px'}}>체형분석</Link>
          <Link to="/community">커뮤니티</Link>
        </div>
        <div className="user-links">
          <Link to="/login" style={{fontSize:'15px'}}>로그인</Link>
          <span className='divider'></span>
          <FaRegUserCircle size="20" style={{ verticalAlign: 'text-bottom' }}/>
        </div>
        
      </div>
    );
  };

export default Header;