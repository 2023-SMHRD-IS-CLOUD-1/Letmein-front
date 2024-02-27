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
import model from '../images/model.jpg'
import Codi from './Codi'


// **아바타 페이지**
const Avatar = () => {
const [imgWid , setImgWid] = useState(false)
const {gender, setGender , type, setType, clickedImageSrc, setClickedImageSrc, codi, setCodi, codiImgSrc, setCodiImgSrc} = useContext(UserContext);
const [ava, setAva] = useState([]);
const [change, setChange] = useState("");
const [mainAvatar, setMainAvatar] = useState("")
// 메인 이미지 크기 조절
const imgHandler = () => {
  setImgWid(!imgWid);
}
const [avaFilter, setAvaFilter] = useState("");
const [filter, setFilter] = useState(false)
const [clk, setClk] = useState(false)
useEffect(()=>{
  setGender("1")
  setType("역삼각형")
},[])
// 아바타 불러오기 
  useEffect(()=> {
   axios.post("http://54.180.13.94:8090/letmein/avatar",{
    avatar_gender : gender
   }).then((res)=>{
    setAva(res.data)
    const main = res.data.filter(item => item.avatar_type == type)
    setMainAvatar(main[0].avatar_imgsrc)
    console.log("avatar", mainAvatar)
   }).catch((err)=>{
     console.error(err)
   })
  },[gender])

 
  // 슬라이드 세팅 
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 이미지 개수
    slidesToScroll: 4,
  };

  const setting = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



// 아바타 선택
const avataHandler = (e) => {
  setChange(e.target.value)
  console.log(e.target.value)
  if(e.target.value == "타원형"){
    setType("round")
  }
  avatarFilter(e.target.value); // 변경된 값(e.target.value)을 전달하여 필터링
}

// 체형별 아바타 필터
const avatarFilter = (value) => {
  setFilter(true)
  if(value === "pear"){ // 변경된 값(value)을 조건으로 사용
    const filteredArray = ava.filter((avatar) => avatar.avatar_type == '삼각형');
    setAvaFilter(filteredArray)
    setType("삼각형")
  }else if(value === "round"){
    const filteredArray = ava.filter((avatar) => avatar.avatar_type == '타원형');
    setAvaFilter(filteredArray)
    setType("타원형")
  }  else if(value === "triangle"){
    const filteredArray = ava.filter((avatar) => avatar.avatar_type == '역삼각형');
    setAvaFilter(filteredArray)
    setType("역삼각형")
  } else if(value === "rectangle"){
    const filteredArray = ava.filter((avatar) => avatar.avatar_type == '직사각형');
    setAvaFilter(filteredArray)
    setType("직사각형")
  } else if(value==="hourglass"){
    const val = gender === "0" ?"사다리꼴형" : "모래시계형"
      const filteredArray = ava.filter((avatar) => avatar.avatar_type === val);
      setAvaFilter(filteredArray)
      setType(val)
    }
  }

  return (
    <div className='avatar-container'>
      <div className='avatar-codi'> 
      {/* 메인 아바타 사진 */}
      {!codi ? 
      <img style={{width : !imgWid ? '200px' : '400px', marginLeft : !imgWid ? '10px' :'40px' }} src={clk ? clickedImageSrc : mainAvatar} onClick={imgHandler}></img>
      :
      // 코디 + 아바타 이미지
      <img style={{width : !imgWid ? '200px' : '400px', marginLeft : !imgWid ? '10px' :'40px' }} src={codiImgSrc}></img>
      }
      {!imgWid ?
      <>
      <div className='avatar-info'>
        {/* 유저 정보 성별, 타입 */}
      <p style={{fontSize:'20px', marginLeft:'10px'}}>{gender == 0 ? "남" : "여"}</p>
      <p style = {{fontSize:'20px', marginLeft:'10px'}}>{type }</p>
      <div className='avatar-plus'>
      <div className='avatar-ex'>
        {/* 체형 설명 글 */}
        {type == "사다리꼴" ?
        <>
         <p style={{fontSize : '17px'}}>
          사다리꼴 체형은 전체적으로 몸의 균형이 잘 맞는 체형입니다.</p>
           <p style={{fontSize : '17px'}}>  
          어깨와 가슴도 적당히 넓고, 골반도 너무 좁지 않은 아주 이상적인
          체형 입니다! </p>
        </>
        :""}
        {type == "역삼각형" ?<>
        <p style={{fontSize : '17px'}}>
            역삼각형 체형은 허리를 중심으로  하반신에 비해 상반신은 크고 넓어 보이고</p>
           <p style={{fontSize : '17px'}}>  
           일반적으로 허리가 굵고 짧아 다리가 긴 체형입니다 </p>
        </> :"" }
        {type == "직사각형" ?<>
        <p style={{fontSize : '17px'}}>
        직사각형 체형은 가슴에서 허리라인과 허리에서 </p>
           <p style={{fontSize : '17px'}}>  
           힙라인의 선의 굴곡이 완만한 직선형의 체형입니다 </p>
        </> :"" }
        {type == "모래시계형" ?<>
        <p style={{fontSize : '17px'}}>
        모래시계 체형은 선천적으로 균형잡힌 몸으로</p>
           <p style={{fontSize : '17px'}}>  
           허리 부분을 강조하면 타고난 균형을 강조할 수 있습니다! </p>
        </> :"" }
        {type == "삼각형" ? 
        <>
         <p style={{fontSize : '15px', marginTop:'25px'}}>
         삼각형 체형은 가슴과 어깨보다 넓은 큰 엉덩이가 특징입니다.</p>
           <p style={{fontSize : '15px', marginTop:'30px'}}>  
           우리나라에서 가장 많은 체형입니다! </p>
        </>
        :""}

        {type == "타원형" ? 
        <>
         <p style={{fontSize : '16px'}}>
         타원형 체형은  복부가 발달한 체형으로 등과 팔이 크고 둥글며</p>
           <p style={{fontSize : '16px'}}>  
           가슴과 몸통 허리, 복부, 엉덩이 등 신체의 중심부가  발달되어 신체에 살이 많아 보이는 체형입니다</p>
        </>
        :""}    
      </div>
      </div>
      </div>
      </>
      :""}
      </div>

      {imgWid ?
      <>
      <div className='avatars'>
        <p style={{fontSize:'22px'}}>아바타</p>
        {/* button 클릭시 해당하는 아바타 출력 */}
        <div className='avatar-type'>
          <button value='pear' onClick={avataHandler}>삼각형</button>
          <button value='round'  onClick={avataHandler}>타원형</button>
          <button value='triangle'  onClick={avataHandler}>역삼각형</button>
          <button value='rectangle'  onClick={avataHandler}>직사각형</button>
          <button value='hourglass'  onClick={avataHandler}>{gender == "0"?"사디리꼴형":"모래시계형" }</button>
        </div>
        {/* 모든 아바타 이미지 슬라이더 */}
          {!filter ?<>
            <Slider {...settings}>
              {ava.map((item, index)=>
              <div key={index} >
                <img style={{width:'150px' , height:'150px' }} src={item.avatar_imgsrc} alt={`Slide ${index+1}`}  
                onClick={() => {setClickedImageSrc(item.avatar_imgsrc); setClk(true); setType(item.avatar_type)}}></img>
              </div>
              )}
        </Slider>
          </> : <>
          {/* 체형별 필터링된 아바타 이미지 슬라이더 */}
          {avaFilter.length > 1 ? (
          <Slider {...setting}>
            {avaFilter.map((item, index) => (
              <div key={index}>
                <img
                  style={{ width: '150px', height: '150px' }}
                  src={item.avatar_imgsrc}
                  alt={`Slide ${index + 1}`}
                  onClick={() => {setClickedImageSrc(item.avatar_imgsrc); setClk(true)}}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div>
            <img
              style={{ width: '150px', height: '150px' }}
              src={avaFilter[0].avatar_imgsrc}
              alt={`Slide 1`}
              onClick={() => {setClickedImageSrc(avaFilter[0].avatar_imgsrc); setClk(true)}}
            />
          </div>
            )}


          </>}
       
      </div>
      </>
      :<>
      <Codi/>
      </> }
    </div>
  )
}

export default Avatar