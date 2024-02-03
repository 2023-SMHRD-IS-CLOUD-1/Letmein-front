import React, { useContext, useState } from 'react'
import '../css/id.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
const Login = () => {
  const nav = useNavigate();
  const {id,setId,pw,setPw} = useContext(UserContext);

  return (
    <div className='id-container'>
      <div className='center-input'> 
      <form>
      <p>아이디</p>
      <input type='text' placeholder='아이디' onChange={(e)=>setId(e.target.value)} required></input><br/>
      <p>비밀번호</p>
      <input type='text' placeholder='비밀번호' onChange={(e)=>setPw(e.target.value)} required></input>
      <br/><br/>
      <br/><br/>
      <button type='submit' >로그인</button>
      </form>
      </div>
      <hr/>
      <div className='user-container'>
        <span onClick={()=>nav("/findId")}>아이디 찾기</span><span>|</span>
        <span onClick={()=>nav("/findPw")}>비밀번호 찾기</span><span>|</span>
        <span onClick={()=>nav("/join")}>회원가입</span>
      </div>
    </div>
  )
}

export default Login