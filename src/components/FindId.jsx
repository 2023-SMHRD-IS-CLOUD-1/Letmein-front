import React from 'react'
import '../css/id.css'
// 아이디찾기
const FindId = () => {

  return (
      <div className='center-input'>
        <div className='id-container'>
      <p>이름</p>
      <input type='text' placeholder='이름'></input>
      <p>email</p>
      <input type='text' placeholder='이메일'></input>
      <br/>
      <button>확인</button>
        </div>
      </div>
  )
}

export default FindId