import React, { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext';

const Join = () => {
  const {id,setId,pw,setPw, name, setName, email, setEmail,nick,setNick} = useContext(UserContext);
  const joinHandler = () =>{
    axios
    .post("http://localhost:8091/letmein/join",{
      user_id : id,
      user_pw : pw,
      user_email : email,
      user_name : name,
      user_nick : nick
    })
    .then((res)=>{
      console.log(res)
    })
  }     

  return (
    <div>
      <form onSubmit={joinHandler}>
      <div className='center-input'> 
      <p>아이디</p>
      <input type='text' placeholder='아이디' required onChange={(e)=>setId(e.target.value)}></input>
      <p>비밀번호</p>
      <input type='text' placeholder='비밀번호' required onChange={(e)=>setPw(e.target.value)}></input>
      <p>비밀번호 확인</p>
      <input type='text' placeholder='비밀번호 확인' required></input>
      <p>이름</p>
      <input type='text' placeholder='이름' required onChange={(e)=>setName(e.target.value)}></input>
      <p>닉네임</p>
      <input type='text' placeholder='닉네임' required onChange={(e)=>setNick(e.target.value)}></input>
      <p>이메일</p>
      <input type='text' placeholder='이메일' required onChange={(e)=>setEmail(e.target.value)}></input>
      <br/>
      <button type='submit' >회원가입</button>
      </div>
      </form>
    </div>
  )
}

export default Join