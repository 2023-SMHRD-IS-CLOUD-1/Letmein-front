import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
const ProfileEditor = () => {
  const nav = useNavigate();
  const { user_id, user_pw, setPw, user_name, setName, user_email, setEmail, user_nick, setNick } = useContext(UserContext);
  const [chkPw, setChkPw] = useState("");

  const edliter = () => {
    axios.post("http://localhost:8090/letmein/profileEditor", {
      user_id: user_id,
      user_pw: user_pw,
      user_name: user_name,
      user_nick: user_nick,
      user_email: user_email
    })
      .then((res) => {
        console.log(res.data);
        alert("개인정보 수정 성공")
        nav("/myPage")
      })
      .catch((error) => {
        console.error('개인정보 수정 실패', error);
      });
  }
  return (
    <div className='id-container'>
      <div className='center-input'>
        <p>아이디</p>
        <input type='text' placeholder={user_id} name='user_id' disabled></input>
        <p>비밀번호</p>
        <input type='password' placeholder='비밀번호' required onChange={(e) => setPw(e.target.value)}></input>
        <p>비밀번호 확인</p>
        <input className='pw' type='password' placeholder='비밀번호 확인' required onChange={(e) => setChkPw(e.target.value)}></input>
        {user_pw != chkPw && chkPw != "" ? <span>비밀번호를 다시 입력해주세요</span> : ""}
        <p>이름</p>
        <input className='pw' name='user_name' type='text' placeholder='이름' required onChange={(e) => setName(e.target.value)}></input>
        <p>닉네임</p>
        <input type='text' placeholder='닉네임' required onChange={(e) => setNick(e.target.value)}></input>
        <p>이메일</p>
        <input type='email' name='user_email' placeholder='이메일' required onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <button type='submit' onClick={edliter}> 수정 완료 </button>
    </div>
  )
}

export default ProfileEditor

