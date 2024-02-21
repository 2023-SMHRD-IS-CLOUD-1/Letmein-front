import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/codi.css'
import model from '../images/model.png'
import Codi from './Codi'
const Avatar = () => {
const [imgWid , setImgWid] = useState(false)
const {gender, setGender , type, setType} = useContext(UserContext);
const [ava, setAva] = useState([]);
const imgHandler = () => {
  setImgWid(!imgWid);
}
// 아바타 불러오기 
  useEffect(()=> {
    setGender('0')
    setType("사다리꼴")
   axios.post("/avatar",{
    avatar_gender : gender
   }).then((res)=>{
    setAva(res.data)
   }).catch((err)=>{
     console.error(err)
   })
  },[gender])

  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  return (
    <div className='avatar-container'>
      <div className='avatar-codi'> 
      <img style={{width : !imgWid ? '200px' : '400px', marginLeft : !imgWid ? '0' :'40px' }} src={model} onClick={imgHandler}></img>
      {!imgWid ?
      <>
      <div className='avatar-info'>
      <p style={{fontSize:'20px'}}>남</p>
      <p style = {{fontSize:'20px'}}>{type }</p>
      <div className='avatar-ex'>
        <hr/>
      <p style={{fontSize : '17px'}}>
          사다리꼴 체형은 전체적으로 몸의 균형이 잘 맞는 체형입니다.</p>
           <p style={{fontSize : '17px'}}>  
          어깨와 가슴도 적당히 넓고, 골반도 너무 좁지 않은 아주 이상적인
          체형 입니다! </p>
          <hr/>
      </div>
      
          
      </div>
      
      </>
      :""}
      </div>
      {imgWid ?
      <>
      <div className='avatars'>
        <p style={{fontSize:'22px'}}>아바타</p>
        <hr/>
        <Slider {...settings}>
        {ava.map((item, index)=>
        <div key={index} >
          <img style={{width:'150px' , height:'150px' }} src={item.avatar_imgsrc} alt={`Slide ${index+1}`} ></img>
        </div>
        )}
        </Slider>
      </div>
      </>
      :<>
      <Codi/>
      </> }
    </div>
  )
}

export default Avatar