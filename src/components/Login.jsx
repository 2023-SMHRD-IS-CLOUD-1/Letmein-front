import React, { useContext, useState } from 'react'
import '../css/id.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { Box, FormControl, Input, InputLabel, InputAdornment, TextField } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import id from '../images/id.png';
const Login = () => {
  const nav = useNavigate();
  const {user_id,setId,user_pw,setPw, login, setLogin} = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const LoginHandler = () =>{
    axios.post("http://54.180.13.94:8090/letmein/login",{
      user_id : user_id,
      user_pw : user_pw
    })
    .then((res) => {
      console.log(res.data);
      alert("로그인에 성공했습니다!")   
      nav("/")
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user_id', res.data.user_id);
      sessionStorage.setItem('user', res.data.user_id)
      setLogin(true);
      setId(res.data.user_id)
      console.log(user_id)
    })
    .catch((error) => {
      console.error('회원가입 실패', error);
    });
  }

  return (
    <div className='id-container'>
      <div className='center-input'> 
      <img src={id} style={{width:'460px', height:'auto'}}></img>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', fontFamily:'Pretendard-Medium' }}>
        <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="아이디를 입력해주세요" variant="standard" 
        style={{fontFamily:'Pretendard-Medium'}}
        onChange={(e)=>setId(e.target.value)} error={!user_id} required autoFocus={!user_id}
        helperText={!user_id ? '아이디를 입력해주세요' : ''} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with" label="비밀번호를 입력해주세요" variant="standard" 
        onChange={(e) => setPw(e.target.value)} error={!user_pw} autoFocus={!user_pw}
        type='password' 
        required helperText={!user_pw ? '비밀번호를 입력해주세요' : ''} InputLabelProps={{
          style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
      </Box>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={LoginHandler}>로그인</button>
      <hr/>
      <div className='user-container'>
        <span onClick={()=>nav("/findId")}>아이디 찾기</span><span>|</span>
        <span onClick={()=>nav("/join")}>회원가입</span>
      </div>
    </div>
  )
}

export default Login