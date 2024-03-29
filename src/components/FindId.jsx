import React from 'react'
import '../css/id.css'

import { Box, FormControl, Input, InputLabel, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useEffect } from 'react';
import axios from 'axios';
import id from '../images/id.png';
// 아이디찾기
const FindId = () => {

  const [user_id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [chkEmail, setchkEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // 이메일 확인
  const chkEmailHandler = () => {
    axios.post("http://54.180.13.94:8090/letmein/FindEmail",{
      user_id : user_id
    }).then((res)=>{
      console.log(res.data)
      if(res.data[0].user_email === email){
        setchkEmail(true);
      } else{
        setchkEmail(false)
        setErrMsg("비밀번호를 다시 확인해주세요")
      }
    }).catch((err)=>{
      console.error(err)
    })
  }
  // 이메일 전송
  const EmailHandler = () => {
    axios.post("http://54.90.29.98:5000/email",{
      email:email,
      user_id : user_id
    })
  }

  return (
        <div className='find-container'>
          <img src={id} style={{width:'460px', height:'auto'}}></img>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom:'20px' }}>
        <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="이름을 입력해주세요" variant="standard" 
        style={{fontFamily:'Pretendard-Medium'}}
        onChange={(e)=>setID(e.target.value)} error={!user_id} required autoFocus={!user_id}
        helperText={!user_id ? '이름을 입력해주세요' : ''} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="이메일을 입력해주세요" variant="standard" 
        onChange={(e) => setEmail(e.target.value)} error={!email} autoFocus={!email}
        type='email' 
        required helperText={!email? '이메일을 입력해주세요' : ''} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
      </Box>
      <div className='find-email'>
      </div>
      {errMsg}
      {!chkEmail ? <button onClick={chkEmailHandler}>확인</button> :  <button onClick={EmailHandler}>확인</button>}
   
        </div>
  )
}

export default FindId