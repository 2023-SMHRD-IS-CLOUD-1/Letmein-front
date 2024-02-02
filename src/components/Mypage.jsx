import React from 'react'
import userImg from '../images/user.png'
import '../css/user.css'
import { useNavigate } from 'react-router-dom'

// 마이페이지 -> 작성 글 불러오기, (회원정보수정, 문의글 등록은 다른 컴포넌트로 추가하기)
const Mypage = () => {
  const nav = useNavigate();
  return (
    <div className='mypage-container'>
      <img src={userImg}></img>
      <h2>닉네임</h2>
      <h4>@userid</h4>
      <button onClick={()=>nav("/profileEditor")}>프로필 수정</button>
      <button>고객 문의</button>
      <div className='img-container'>

      </div>
    </div>
  )
}

export default Mypage