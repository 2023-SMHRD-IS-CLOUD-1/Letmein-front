import React from 'react'
import '../css/upload.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TypeInfo = () => {
  const nav = useNavigate();
  // 체형 정보
  return (
    <div className='result-container'>
        <h1>분석이 완료되었습니다.</h1>
        <div className='result'>
        <h3>oo님의 분석결과는</h3>
        <h4>성별 : 여</h4>
        <h4>체형 : 역삼각형</h4>
        <h5 onClick={()=>nav("/typeDetail")}>역삼각형 체형이 궁금하시다면 클릭해보세요</h5>
        <h3>입니다.</h3>
        </div>
        <h4>분석 결과로 나만의 아바타를 제작해보세요</h4>
        <button onClick={()=>nav("/avatar")}>Go</button>
    </div>
  )
}

export default TypeInfo