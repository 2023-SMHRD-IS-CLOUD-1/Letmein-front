import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/codi.css'

// 코디 입혀보는 페이지
const Codi = () => {

  const [top, setTop] = useState([]);
  const [codiImgsrc, setCodiImgsrc] = useState("")
  const {type, setType, gender , setGender, changeType, setChangeType, clickedImageSrc} = useContext(UserContext);
  useEffect(()=>{
    // 상의 가져오기
    axios.post("/codiTop",{
      codi_gender : gender
    })
    .then((res)=>{
      console.log(res.data)
      if(type === '사다리꼴') {
        const filteredData = res.data.filter((item) => item.codi_type === "사다리꼴");
        setTop(filteredData)
    } else if(type == '삼각형') {
      const filteredData = res.data.filter((item) => item.codi_type === "삼각형");
      setTop(filteredData)
    } else if(type === '역삼각형') {
      const filteredData = res.data.filter((item) => item.codi_type === "역삼각형");
      setTop(filteredData)
    } else if(type === '직사각형') {
      const filteredData = res.data.filter((item) => item.codi_type === "직사각형");
      setTop(filteredData)
    } else if(type === '타원형') {
      const filteredData = res.data.filter((item) => item.codi_type === "타원형");
      setTop(filteredData)
    } else {
      const filteredData = res.data.filter((item)=> item.codi_type === "모래시계형")
      setTop(filteredData)
    }
    console.log("top",top)
    }).catch(()=>{
    })
  },[type, gender])

  // 여기에 파이썬 연결코드 짜기!!!!!!!!!!
 useEffect(()=>{
    console.log("의상선택",codiImgsrc)
    console.log("아바타선택",clickedImageSrc)
 },[codiImgsrc])

 // 슬라이더 설정
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
  };
  
  return (
    <div className='codi-container'>
      <div className='top-container'>
      <Slider {...settings}>
      {top.map((item, index) => (
        <div key={index}>
          <img
            style={{ width: '150px', height: '150px' }}
            src={`https://d1nypumamskciu.cloudfront.net/cloth/${item.codi_imgsrc}`}
            alt={`Slide ${index + 1}`}
            onClick={() => {
              setCodiImgsrc(item.codi_imgsrc);
            }}
      />
    </div>
  ))}
</Slider>

    </div>
    
    </div>
  )
}

export default Codi