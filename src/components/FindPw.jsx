import React from 'react'

const FindPw = () => {
  return (
    <div>
      <div className='center-input'>
      <p>이름</p>
      <input type='text' placeholder='이름'></input>
      <p>아이디</p>
      <input type='text' placeholder='아이디'></input>
      <br/>
      <p>이메일</p>
      <input type='text' placeholder='이메일'></input>
      <br/>
      <button>확인</button>
      </div>
    </div>
  )
}

export default FindPw