import React, { useContext, useState } from 'react'
import '../css/id.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import axios from 'axios'
const Login = () => {
  const nav = useNavigate();
  const {user_id,setId,user_pw,setPw, login, setLogin} = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const LoginHandler = () =>{
    axios.post("http://localhost:8090/letmein/login",{
      user_id : user_id,
      user_pw : user_pw
    })
    .then((res) => {
      console.log(res.data);
      if(res.data.length==0){
        alert("해당하는 아이디가 없습니다")
      } else if(res.data.length>0){
        if(res.data[0].user_pw !== user_pw){
          setErrorMessage('비밀번호가 다릅니다!');
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
      <p>아이디</p>
      <input type='text' className='id-input' placeholder='아이디' onChange={(e)=>setId(e.target.value)} required></input><br/>
      <p>비밀번호</p>
      <input type='password' className='pw-input' placeholder='비밀번호' onChange={(e)=>setPw(e.target.value)} required></input>
     
      {errorMessage && <span>{errorMessage}</span>}
      <button onClick={LoginHandler}>로그인</button>
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