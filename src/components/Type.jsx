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
// 체형 조절 -> 아바타 생성

const Type = () => {
      // 체형 분석후 성공하면 true로 바꾸기
  const [suc, setSuc] = useState(false);

  return (
      <div className='type-container'>
        <img src={img} style={{width:'100%', marginBottom:'20px'}}></img>
     <FormControl>
      <FormLabel id="demo-radio-buttons-group-label"><PiGenderIntersexBold fontSize={'40px'}/></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        >
        <div>
        <FormControlLabel value="female" control={<Radio sx={{color: '#111454'}}/>} label="Female" />
        <FormControlLabel value="male" control={<Radio sx={{color: '#111454'}}/>} label="Male" />
        </div>
      </RadioGroup>
    </FormControl>
   
    <Box sx={{ width: '430px' }}>
    <IoShirtSharp fontSize={'40px'} color='rgba(0, 0, 0, 0.6)'/>
    <span style={{marginLeft:'150px', fontWeight:'bold'}}>80-110</span>
      <Slider
        aria-labelledby="discrete-slider-restrict"
        defaultValue={20}
        getAriaValueText={(value) => `${value}°C`}
        valueLabelDisplay="on"
        sx={{
            color: '#111454', // Slider의 색상을 빨간색으로 변경
          }}
        step={5}
        marks
        min={80}
        max={110}
      />
    </Box>
    <Box sx={{ width: '430px' }}>
    <PiPantsFill fontSize={'40px'} color='rgba(0, 0, 0, 0.6)'/>
    <span style={{marginLeft:'155px', fontWeight:'bold'}}>24-42</span>
      <Slider
        aria-labelledby="discrete-slider-restrict"
        defaultValue={20}
        getAriaValueText={(value) => `${value}°C`}
        valueLabelDisplay="on"
        step={1}
        marks
        sx={{color: '#111454'}}
        min={24}
        max={42}
      />
    </Box>
    {!suc ? <button style={{marginLeft:'140px'}}>분석하러 가기💨💨</button> : <TypeInfo/>}
    </div>
  )
}

export default Type