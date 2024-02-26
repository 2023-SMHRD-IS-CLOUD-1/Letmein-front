import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const ProfileEditor = () => {
  const nav = useNavigate();
  const { user_id} = useContext(UserContext);
  const [chkPw, setChkPw] = useState("");
  const [pw, setPW] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  useEffect(() => {
    axios.post("http://3.36.68.187:8090/letmein/login",{
      user_id : user_id
    })
    .then((res)=>{
      console.log(res)
      setName(res.data[0].user_name)
      setNick(res.data[0].user_nick)
      setEmail(res.data[0].user_email)
      setPW(res.data[0].user_pw)
      console.log(name, nick, email)
    }).catch((err)=>{
      console.error(err)
    })
  }, [])
 
  // 정보 수정
  const editHandler = () => {
    axios.post("/profileEditor", {
      user_id: user_id,
      user_pw: pw,
      user_name: name,
      user_nick: nick,
      user_email: email
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

  const backHandler = () =>{
    nav("/myPage")
  }

  return (
    <div className='edit-container'>
    <label htmlFor="pw"><RiLockPasswordFill style={{ fontSize: '20px', marginRight: '10px' }} />비밀번호</label>
    <input type='password' id='pw' onChange={(e) => setPW(e.target.value)} />
    <label htmlFor="pwchk"><RiLockPasswordFill style={{ fontSize: '20px', marginRight: '10px' }} />비밀번호 확인</label>
    <input type='password' id='pwchk' onChange={(e) => setChkPw(e.target.value)} />
    {pw !== chkPw && chkPw != "" ? <span style={{color:'red', marginBottom:"2px"}}>비밀번호가 일치하지 않습니다</span>:""}
    <br/>
    <label htmlFor="name"><FaUser style={{ fontSize: '20px', marginRight: '10px' }} />이름</label>
    <input type='text' id='name' defaultValue={name} onChange={(e) => setName(e.target.value)} />
    <label htmlFor="nick"><FaUser style={{ fontSize: '20px', marginRight: '10px' }} /> 닉네임 </label>
    <input type='text' id='nick' defaultValue={nick} onChange={(e) => setNick(e.target.value)} />
    <label htmlFor="email"><MdEmail style={{ fontSize: '20px', marginRight: '10px' }} />이메일</label>
    <input type='email' id='email' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
    <div className='edit-button'>
      <button onClick={editHandler}>수정</button>
      <button onClick={backHandler}>취소</button>
    </div>
  </div>
  
      

  )
}

export default ProfileEditor
