import React, { useContext } from 'react'
import logo from '../images/logo.png'
import '../fonts/Pretendard-Bold.ttf'
import {Link, useNavigate} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import '../css/header.css'
import { UserContext } from '../context/UserContext';
const Header = () => {
  const {user_id,setId,login} = useContext(UserContext);
  const nav = useNavigate();
  const Logout = () => {
    setId("");
  }
    return (
      <div className='header-container'>
        <img src={logo} alt="Logo" style={{ width: '130px', cursor: 'pointer'}} onClick={()=>nav("/")}/>
        <div className="navigation-links">
          <Link to="/upload" >체형 분석</Link>
          <Link to="/community">커뮤니티</Link>
        </div>
        <div className="user-links">
          {login == true ? 
          <Link to="/" style={{fontSize:'15px'}} onClick={Logout}>LOGOUT</Link>
          : <Link to="/login" style={{fontSize:'15px'}}>LOGIN</Link>}
          
          <span className='divider'>|</span>
          <FaRegUserCircle size="20" style={{ verticalAlign: 'text-bottom' }} onClick={()=>nav("/myPage")}/>
        </div>
        
      </div>
    );
  };

export default Header;