import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';
import emailjs from 'emailjs-com';
import { generateMessage, sendEmail, joinHandler, chkHandler } from '../authUtils';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const nav = useNavigate();
  const {user_id,setId,user_pw,setPw, user_name, setName, user_email, setEmail,user_nick,setNick} = useContext(UserContext);
  const [chkPw, setChkPw] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [msg , setMsg] = useState("");
  const [chk, setChk] = useState("");
  const [join, setJoin] = useState("");
  const [idChk, setIdChk] = useState("");
  const idInputRef = useRef(null);
  // 이메일 전송
  const handleGenerateMessage = () => {
    const newMessage = generateMessage();
    setMsg(newMessage);
    sendEmail(user_email, user_name, newMessage)
      .then((res) => {
        setIsEmailSent(true);
        console.log(msg)
      })
      .catch((error) => {
        console.error('이메일 전송 실패', error);
      });
  };
  
  // 회원가입
  const handleJoin = () => {
    axios.post("http://localhost:8090/letmein/join", {
      user_id: user_id,
      user_pw: user_pw,
      user_email: user_email,
      user_name: user_name,
      user_nick: user_nick
    })
    .then((res) => {
      nav("/login")
    })
    .catch((error) => {
      console.error('회원가입 실패', error);
    });
  };
  
  // 이메일 인증
  const msgCheck = () =>{
    setJoin("")
    console.log(chk)
    if(msg == chk){
      setJoin(<>
         <span>인증 성공!</span>
          <button type='submit' onClick={handleJoin}>회원가입</button>
      </>)
    }else{
      setJoin( <span>인증번호를 다시 확인해주세요</span>)
    }
  }
  // 아이디 중복 체크
  const idChek = () => {
    axios.post("http://localhost:8090/letmein/loginChk",{
      user_id:user_id
    }).then((res)=>{
      if(res.data == 0){
        setIdChk(<p >중복되는 아이디가 없습니다!</p>)
      }else{
        setIdChk(<span >중복되는 아이디가 존재합니다! 다시 입력해주세요!</span>)
        idInputRef.current.focus();
      }
    })
    .catch((error) => {
      console.error('실패',error)
    })
  }

  

  return (
    <div className='id-container'>
      <div className='center-input'> 
      <p>아이디</p>
      <input type='text' placeholder='아이디' name='user_id' required onChange={(e)=>setId(e.target.value)}  ref={idInputRef}></input>
      <p className='check' onClick={idChek}>아이디 중복 체크</p>
      {idChk}
      <p>비밀번호</p>
      <input type='password' placeholder='비밀번호' required onChange={(e)=>setPw(e.target.value)}></input>
      <p>비밀번호 확인</p>
      <input className='pw' type='password' placeholder='비밀번호 확인' required onChange={(e)=>setChkPw(e.target.value)}></input>
      {user_pw!=chkPw && chkPw!= ""?<span>비밀번호를 다시 입력해주세요</span>:""}
      <p>이름</p>
      <input className='pw' name='user_name' type='text' placeholder='이름' required onChange={(e)=>setName(e.target.value)}></input>
      <p>닉네임</p>
      <input type='text' placeholder='닉네임' required onChange={(e)=>setNick(e.target.value)}></input>
      <p>이메일</p>
      <input type='email' name='user_email' placeholder='이메일'  required onChange={(e)=>setEmail(e.target.value)}></input>
      <p className='check' onClick={handleGenerateMessage}>이메일 인증</p>
      <br/>
      {isEmailSent==true ?  <input type='text' placeholder='인증번호를 입력해주세요' onChange={(e)=>setChk(e.target.value)}></input>:null}
      {msg!= "" ? <p className='check' onClick={msgCheck}>인증번호 확인 </p>:null} 
      
      {chk != "" ? join : ""}
      </div>
    </div>
  )
}

export default Join