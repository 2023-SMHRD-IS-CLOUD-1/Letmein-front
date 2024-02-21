import React from 'react'
import '../css/upload.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TypeInfo = () => {
  const nav = useNavigate();
  // 체형 정보
  return (
    <div className='result-container'>
        <p style={{fontSize:'30px'}}>분석이 완료되었습니다.</p>
        <div className='result'>
        <p style={{fontSize:'24px'}}>oo님의 분석결과는</p>
        <p style={{fontSize:'20px'}}>성별 : 여</p>
        <p style={{fontSize:'20px'}}>체형 : 역삼각형</p>
        <p style={{fontSize:'17px', color:'#AE3A1E'}} onClick={()=>nav("/typeDetail")}>체형 정보가 궁금하시다면 "클릭"해보세요</p>
        <p style={{fontSize:'22px'}}>입니다.</p>
        </div>
        <p style={{fontSize:'20px'}}>분석 결과로 나만의 아바타를 제작해보세요</p>
        <button onClick={()=>nav("/avatar")}>Go</button>
    </div>
  )
}

export default TypeInfo