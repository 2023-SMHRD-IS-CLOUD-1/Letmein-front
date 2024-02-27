import React, { useContext, useEffect, useRef, useState } from 'react'
import model from '../images/uploadimg.png'
import '../css/upload.css'
import { useNavigate } from 'react-router-dom';
import uploadImage from '../authUtils';
import TypeInfo from './TypeInfo';
import AWS from 'aws-sdk'
import Img from '../images/img.png'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import up from '../images/upload.gif'
// 내 체형 업로드 --> 체형분석
const  Upload  = () => {
  const {type, setType, gender, setGender,user_id} = useContext(UserContext)
  const [imgFile, setImgFile] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef();
  const nav = useNavigate();
  // 체형 분석후 성공하면 true로 바꾸기
  const [suc, setSuc] = useState(false);
      
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setImg(file);
    };
  };

// 이미지 업로드 후 분석 실행 
  const GoAvatar = () => {
    if (!imgFile) {
      alert('파일을 선택해주세요');
      return;
    } else{
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_CLIENT_ID,
        secretAccessKey: process.env.REACT_APP_SECRET,
        region: 'us-east-2'
      });
      const s3 = new AWS.S3();
  
      const uploadParams = {
        Bucket: 'letmein0229',
        Key: "img.jpg",
        Body: img
      };
  
      s3.upload(uploadParams, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          //파이썬 요청
          axios.post("http://15.165.72.217:5000/upload")
          .then((res) => {
            console.log(res.data)
            setGender(res.data.gender)
            setType(res.data.body)
          setSuc(true)
      }).catch((err)=>{
        console.error('분석에러',err)
      })
      }
      });
    }
  
  }
  return (
 
    <div className='upload-container'>
      {/*분석 성공 하면 typeinfo로 가기 */}
         
      {!suc ? <>
        <div className='previewImg'>
          <img src={imgFile || Img} alt="코디 이미지를 업로드 해주세요" />
          </div>
          <div className='uploadImg'>
          <label htmlFor='profileImg'>파일선택</label>
          <input type='file' accept='image/*' id='profileImg' onChange={saveImgFile} ref={imgRef} />
          </div>
      <button className='upload-btn' onClick={GoAvatar}>분석하러 가기💨💨</button> 
      
      {/* 분석 로드 */}
      <Stack sx={{ color: 'grey.500' , marginTop:'20px'}} spacing={2} direction="row">
      </Stack>
      </>
      : <>
       <div className='result-container'>
        <img src={up}></img>
        <p style={{fontSize:'30px'}}>분석이 완료되었습니다.</p>
        <div className='result'>
        <p style={{fontSize:'20px'}}>성별 : {gender == 0 ? "남" : "여"}</p>
        <p style={{fontSize:'20px'}}>체형 : {type}</p>
        <p style={{fontSize:'17px', color:'#AE3A1E'}} onClick={()=>nav("/typeDetail")}>체형 정보가 궁금하시다면 "클릭"해보세요</p>
        </div>
        <p style={{fontSize:'20px'}}>분석 결과로 나만의 아바타를 제작해보세요</p>
        <button onClick={()=>nav("/avatar")}>Go</button>
    </div>
      </>}
    </div>
)
  }

export default Upload;