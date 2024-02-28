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
  const {type, setType, gender , setGender, changeType, setChangeType, clickedImageSrc, codi, setCodi, codiImgSrc, setCodiImgSrc, avatarName , setAvatarName, resultAvatar, setResultAvatar} = useContext(UserContext);
  const [name, setName] = useState("")
  useEffect(()=>{
    // 상의 가져오기
    axios.post("http://54.180.13.94:8090/letmein/codiTop",{
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

  const nameHandler = () => {
    if(avatarName == 1) {
      setName("man_1_1.jpg")
      } else if(avatarName == 2){
      setName("man_1_2.jpg")
      }  else if(avatarName == 3){
      setName("man_1_3.jpg")
      }  else if(avatarName == 4){
      setName("man_1_4.jpg")
      }  else if(avatarName == 5){
      setName("man_2_1.jpg")
      }  else if(avatarName == 6){
      setName("man_2_2.jpg")
      }  else if(avatarName == 7){
      setName("man_2_3.jpg")
      }  else if(avatarName == 8){
      setName("man_2_4.jpg")
      }  else if(avatarName == 9){
      setName("man_3_1.jpg")
      }  else if(avatarName == 10){
      setName("man_3_2.jpg")
      }  else if(avatarName == 11){
      setName("man_3_3.jpg")
      }  else if(avatarName == 12){
      setName("man_3_4.jpg")
      }  else if(avatarName == 13){
      setName("man_4_1.jpg")
      }  else if(avatarName == 14){
      setName("man_4_2.jpg")
      }  else if(avatarName == 15){
      setName("man_4_3.jpg")
      } else if(avatarName == 16){
        setName("man_4_4.jpg")
      }else if(avatarName == 17){
        setName("man_5_1.jpg")
      }else if(avatarName == 18){
        setName("man_5_2.jpg")
      }else if(avatarName == 19){
        setName("man_5_3.jpg")
      }else if(avatarName == 20){
        setName("man_5_4.jpg")
      }else if(avatarName == 21) {
        setName("woman_1_1.jpg")
      }else if(avatarName == 22) {
        setName("woman_1_2.jpg")
      }else if(avatarName == 23) {
        setName("woman_1_3.jpg")
      }else if(avatarName == 24) {
        setName('woman_1_4.jpg')
      }else if(avatarName == 25) {
        setName("woman_2_1.jpg")
      }else if(avatarName == 26) {
        setName("woman_2_2.jpg")
      }else if(avatarName == 27) {
        setName("woman_2_3.jpg")
      }else if(avatarName == 28) {
        setName("woman_2_4.jpg")
      }else if(avatarName == 29) {
        setName("woman_3_1.jpg")
      }else if(avatarName == 30) {
        setName("woman_3_2.jpg")
      }else if(avatarName == 31) {
        setName("woman_3_3.jpg")
      }else if(avatarName == 32) {
        setName("woman_3_4.jpg")
      }else if(avatarName == 33) {
        setName("woman_4_1.jpg")
      }else if(avatarName == 34) {
        setName("woman_4_2.jpg")
      }else if(avatarName == 35) {
        setName("woman_4_3.jpg")
      }else if(avatarName == 36) {
        setName("woman_4_4.jpg")
      }else if(avatarName == 37) {
        setName("woman_5_1.jpg")
      }else if(avatarName == 38) {
        setName("woman_5_2.jpg")
      }else if(avatarName == 39) {
        setName("woman_5_3.jpg")
      }
  }

  useEffect(()=>{
    console.log("클릭", avatarName)
    console.log(name)
    console.log("top", codiImgSrc)
    axios.post("http://15.165.72.217:5000/try2",{
      cloth : codiImgSrc,
      image : name
      }).then((res)=>{
        setResultAvatar(res.data)
        console.log(res)
      // 데이터 받아서 변경하기
      
    }).catch((err)=>{
      console.error("코디에러",err)
    }
    )
  },[name])
  // 여기에 파이썬 연결코드 짜기!!!!!!!!!!

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
              setCodiImgSrc(item.codi_imgsrc);
              nameHandler()
              setCodi(true)
              if(codi==true){
                setCodi(false)
              }
            }}
      />
    </div>
  ))}
</Slider>

    </div>
    
    </div>
  )
}
