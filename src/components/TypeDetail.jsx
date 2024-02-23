
import { React, useState, useEffect, useContext } from "react";

import triangle from '../images/triangle.png'
import pear from '../images/pear.png'
import hourglass from '../images/hourglass.png'
import rectangle from '../images/rectangle.png'
import round from '../images/round.png'
import { UserContext } from "../context/UserContext";
const TypeDetail = () => {
  const {type, setType, gender, setGender} = useContext(UserContext)
  const [imgsrc, setImgsrc] = useState("");
  useEffect(()=>{
   if(type == "역삼각형"){
      setImgsrc(triangle)
   } else if(type == "삼각형"){
    setImgsrc(pear)
   } else if(type == "모래시계형"){
    setImgsrc(hourglass)
   } else if(type=="직사각형"){
    setImgsrc(rectangle)
   }else if(type == ""){
    setImgsrc(round)
   }
  },type)
  return (
    <div >
       <img src={imgsrc}></img>
    </div>
  )
}

export default TypeDetail