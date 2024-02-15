import React, { useContext, useState } from 'react'
import '../css/id.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios'
import { Box, FormControl, Input, InputLabel, InputAdornment, TextField } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
const Login = () => {
  const nav = useNavigate();
  const {user_id,setId,user_pw,setPw, login, setLogin} = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const LoginHandler = () =>{
    axios.post("http://localhost:8090/letmein/login",{
      user_id : user_id,
      user_pw : user_pw
    })
    .then((res) => {
      console.log(res.data);
      if(!user_id){
        alert('아이디를 입력해주세요')
      }else if(!user_pw){
        alert('비밀번호를 입력해주세요')
      }
      else if(res.data.length==0){
        alert("해당하는 아이디가 없습니다")
      } else if(res.data.length>0){
        if(res.data[0].user_pw !== user_pw){
          setErrorMessage("비밀번호가 다릅니다!");
        }else if(res.data[0].user_pw === user_pw){
          setErrorMessage('');
          alert('로그인 성공'); 
          setLogin(true);
          nav("/")
        }
      }
    })
    .catch((error) => {
      console.error('회원가입 실패', error);
    });
  }

  return (
    <div className='id-container'>
      <div className='center-input'> 
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="아이디를 입력해주세요" variant="standard" 
        onChange={(e)=>setId(e.target.value)} error={!user_id} required autoFocus={!user_id}
        helperText={!user_id ? '아이디를 입력해주세요' : ''}/>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <PersonRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="비밀번호를 입력해주세요" variant="standard" 
        onChange={(e) => setPw(e.target.value)} error={!user_pw} autoFocus={!user_pw} 
        required helperText={!user_pw ? '비밀번호를 입력해주세요' : ''}/>
      </Box>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={LoginHandler}>로그인</button>
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