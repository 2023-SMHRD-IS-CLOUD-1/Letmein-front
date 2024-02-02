import React from 'react'

const Join = () => {
  return (
    <div>
      <div className='center-input'> 
      <p>아이디</p>
      <input type='text' placeholder='아이디'></input>
      <p>비밀번호</p>
      <input type='text' placeholder='비밀번호'></input>
      <p>비밀번호 확인</p>
      <input type='text' placeholder='비밀번호 확인'></input>
      <p>이름</p>
      <input type='text' placeholder='이름'></input>
      <p>닉네임</p>
      <input type='text' placeholder='닉네임'></input>
      <p>이메일</p>
      <input type='text' placeholder='이메일'></input>
      <br/><br/>
      <button>회원가입</button>
      </div>
    </div>
  )
}

export default Join