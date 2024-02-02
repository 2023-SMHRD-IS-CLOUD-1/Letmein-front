import React from 'react'
import '../css/id.css'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const nav = useNavigate();
 
  return (
    <div className='id-container'>
      <div className='center-input'> 
      <p>아이디</p>
      <input type='text' placeholder='아이디'></input><br/>
      <p>비밀번호</p>
      <input type='text' placeholder='비밀번호'></input>
      <br/><br/>
      <button>로그인</button>
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