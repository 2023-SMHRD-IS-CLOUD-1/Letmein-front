import React, { useContext } from 'react'
import logo from '../images/logo.png'
import '../fonts/Pretendard-Bold.ttf'
import {Link, useNavigate} from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import '../css/header.css'
import { UserContext } from '../context/UserContext';
import FadeMenu from './FadeMenu';

const Header = () => {
  const {user_id,setId,login, setLogin} = useContext(UserContext);
  
  const nav = useNavigate();
  const Logout = () => {
    setLogin(false);
    sessionStorage.setItem('user', false);
  }
    return (
      <div className='header-container'>
        <img src={logo} alt="Logo" style={{ width: '160px', cursor: 'pointer'}} onClick={()=>nav("/")}/>
        <div className="navigation-links">
          <Link to="/community" style={{ marginTop:'12px' ,fontSize:'20px'}}  > 커뮤니티</Link>
          <FadeMenu/>
        </div>
        <div className="user-links">
          {login == true ? 
          <Link to="/" style={{fontSize:'16px'}} onClick={Logout}>LOGOUT</Link>
          : <Link to="/login" style={{fontSize:'17px'}}>LOGIN</Link>}
          
          <span className='divider'>|</span>
          {user_id === 'ADMIN' && login ?
          <FaRegUserCircle size="20" style={{ verticalAlign: 'text-bottom' }} onClick={()=>nav("/admin")}/>
           : ""}
          { user_id !== 'ADMIN' && login ? <FaRegUserCircle size="20" style={{ verticalAlign: 'text-bottom' }} onClick={()=>nav("/myPage")}/> 
          : ""}
          {!login ?<FaRegUserCircle size="20" style={{ verticalAlign: 'text-bottom' }} onClick={()=>alert("로그인 해주세요")}/> :""}
        </div>
      </div>
    );
  };

export default Header;