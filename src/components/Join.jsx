import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';
import emailjs from 'emailjs-com';
import { generateMessage, sendEmail, joinHandler, chkHandler } from '../authUtils';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, Input, InputLabel, InputAdornment, TextField } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
const Join = () => {
  const nav = useNavigate();
  const {user_id,setId,user_pw,setPw, user_name, setName, user_email, setEmail,user_nick,setNick} = useContext(UserContext);
  const [chkPw, setChkPw] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [msg , setMsg] = useState("");
  const [chk, setChk] = useState("");
  const [join, setJoin] = useState("");
  const [idChk, setIdChk] = useState(false);
  const [error, setError] = useState(false);
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
    axios.post("/join", {
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
          <p className='message'>인증이 완료되었습니다</p>
          <button type='submit' onClick={handleJoin}>회원가입</button>
      </>)
    }else{
      setJoin( <p className='message' style={{color:'red'}}>인증번호를 다시 확인해주세요</p>)
    }
  }
  // 아이디 중복 체크
  const idChek = () => {
    axios.post("loginChk",{
      user_id:user_id
    }).then((res)=>{
      if(res.data == 0){
        setIdChk(false)
      }else{
        setIdChk(true)
        idInputRef.current.focus();
      }
    })
    .catch((error) => {
      console.error('실패',error)
    })
  }


  return (
    <div className='join-container'>
      <div className='center-input'> 
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx-id" label="아이디" variant="standard" 
        onChange={(e)=>setId(e.target.value)} helperText={ [idChk ? "중복된 아이디 입니다": "", !user_id?"아이디를 입력해주세요":""]} 
        required ref={idInputRef} error={!user_id} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
    </Box>
    <p className='check' onClick={idChek}>아이디 중복 체크</p>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' , marginTop:'30px'}}>
      <LockRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx-pw" label="비밀번호" variant="standard" 
        onChange={(e)=>setPw(e.target.value)} required error={!user_pw} type='password'
        helperText={!user_pw ? "비밀번호를 입력해주세요":""} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop:'30px'}}>
      <LockRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx-chk-pw" label="비밀번호 확인" variant="standard" 
        type='password' onChange={(e)=>setChkPw(e.target.value)}
        helperText={user_pw!==chkPw && chkPw!== ""?"비밀번호를 다시 확인해주세요":""}
        required error={!chkPw} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}} />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop:'30px'}}>
      <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx-name" label="이름" variant="standard"  onChange={(e)=>setName(e.target.value)}
        required error={!user_name} helperText={!user_name ? "이름을 입력해주세요":""} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop:'30px'}}>
      <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx-nick" label="닉네임" variant="standard"  onChange={(e)=>setNick(e.target.value)}
        required error={!user_nick} helperText={!user_nick ? "닉네임을 입력해주세요":""}InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}} />
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop:'30px'}}>
      <MailRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField type='email' id="input-with-sx-email" label="이메일" variant="standard"  onChange={(e)=>setEmail(e.target.value)}
        required error={!user_email} helperText={!user_email ? "이메일을 입력해주세요":""} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}} />
    </Box>      
    <p className='check' onClick={handleGenerateMessage}>이메일 인증</p>
    {isEmailSent===true ?  <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop:'20px'}}>
      <MailRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="input-with-sx-chk-email" label="인증번호를 입력해주세요" variant="standard"  onChange={(e)=>setChk(e.target.value)}
        required error={!chk}  InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
    </Box>:null}

      {msg!= "" ? <p className='check' onClick={msgCheck}>인증번호 확인 </p>:null} 
      {chk != "" ? join : ""}
      </div>
    </div>
  )
}

export default Join