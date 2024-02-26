import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import '../css/upload.css'
import { PiPantsFill } from "react-icons/pi";
import { IoShirtSharp } from "react-icons/io5";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import TypeInfo from './TypeInfo';
import img from '../images/type.png'
import { FaQuestionCircle } from "react-icons/fa";
import size from '../images/size.png'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 체형 조절 -> 아바타 생성

const Type = () => {
  // 체형 분석후 성공하면 true로 바꾸기
  const [suc, setSuc] = useState(false);

  const [info, setInfo] = useState(false);

  // 성별 
  const [gender, setGender] = useState('female');
  // 상의 사이즈
  const [top,setTop] = useState(80);
  // 하의 사이즈
  const [pant,setPant] = useState(24);

  const nav = useNavigate();

  const infoHandler = () => {
    setInfo(!info)
  }
  
 
  return (
      <div className='type-container'>
        <img src={img} style={{width:'440px',height:'auto', marginBottom:'20px'}}></img>
          {!info ? 
        < FaQuestionCircle onClick={infoHandler} style={{marginLeft:'380px', fontSize : '40px' , color : "#787878"}}/>
          :
          <img src={size} onClick={infoHandler} style={{width:'400px', marginLeft : '20px'}}></img>
          }
          <div className='type-input'>
     <FormControl>
      <FormLabel id="demo-radio-buttons-group-label"><PiGenderIntersexBold fontSize={'40px'}/></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        aria-label="gender"
        value={gender}
        onChange={(e)=>setGender(e.target.value)}
        sx={{fontFamily:'Pretendard-Bold'}}
        >
        <div>
        <FormControlLabel value="female" control={<Radio sx={{color: '#79746C'}}/>} label="여" />
        <FormControlLabel value="male" control={<Radio sx={{color: '#79746C', fontFamily:'Pretendard-Bold'}}/>} label="남" />
        </div>
      </RadioGroup>
    </FormControl>
    <Box sx={{ width: '400px' , marginTop : '20px' }}>
    <IoShirtSharp fontSize={'40px'} color='rgba(0, 0, 0, 0.6)'/>
    <span style={{marginLeft : '10px', fontWeight:'bold'}}>80-110</span>
      <Slider
        aria-labelledby="discrete-slider-restrict"
        defaultValue={top}
        value={top}
        onChange={(e)=>setTop(e.target.value)}
        valueLabelDisplay="on"
        sx={{color: '#79746C', }}
        step={5}
        marks
        min={80}
        max={110}
      />
    </Box>
    <Box sx={{ width: '400px' }}>
    <PiPantsFill fontSize={'40px'} color='rgba(0, 0, 0, 0.6)'/>
    <span style={{marginLeft : '10px', fontWeight:'bold'}}>24-42</span>
      <Slider
        aria-labelledby="discrete-slider-restrict"
        defaultValue={pant}
        onChange={(e)=>setPant(e.target.value)}
        value={pant}
        valueLabelDisplay="on"
        step={1}
        marks
        sx={{color: '#79746C'}}
        min={24}
        max={42}
      />
    </Box>
    {!suc ? <button style={{fontFamily:'Pretendard-Medium', fontSize:'17px'}} >아바타 생성</button> : <TypeInfo/>}
    </div>
    </div>
  )
}

export default Type