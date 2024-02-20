import React, { useState, useEffect } from 'react';
import main1 from '../images/Main.jpg';
import main2 from '../images/Main2.png';
import main3 from '../images/Main3.jpg';
import '../css/main.css';
import mainIntroduce from '../images/mainIntroduce.jpg'

const Main = () => {
  // 이미지 리스트와 현재 인덱스를 상태로 관리
  const [images] = useState([main1, main2, main3]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 다음 이미지로 이동하는 함수
  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    // 일정 시간마다 다음 이미지로 넘어가는 타이머 설정
    const interval = setInterval(goToNextSlide, 3000); // 3초마다 변경
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 제거
  }, [currentIndex]);

  return (
    <div className='main-contaiver'>
      <div style={{ position: 'relative', width: 'auto', marginTop: '20px' }}>
        <img src={images[currentIndex]} style={{ width: '100%' }} alt="Main" />
        <p className='overlay-text'>
          Meet your own<br/>
          fashion coordinator<br/>
          at Let Me In
        </p>
        <hr className='overlay-horizon'/>
        <button className='overlay-button-left' onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>&lt;</button>
        <button className='overlay-button-right' onClick={goToNextSlide}>&gt;</button>
        <div>
          <h1>FASHION</h1>
          <span></span>
         <img src={mainIntroduce} alt='메인 소개이미지' style={{maxWidth : '100%'}} />`
        </div>
      </div>
    </div>
  );
}

export default Main;
