import React, { useRef, useState } from 'react'
import model from '../images/uploadimg.png'
import '../css/upload.css'
import { useNavigate } from 'react-router-dom';
import uploadImage from '../authUtils';
import TypeInfo from './TypeInfo';
import AWS from 'aws-sdk'
import Img from '../images/img.png'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
// 내 체형 업로드 --> 체형분석

const  Upload  = () => {
  const [imgFile, setImgFile] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef();

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

  const handleSubmit = () => {
    if (!imgFile) {
      alert('파일을 선택해주세요');
      return;
    }
  }
  return (
 
    <div className='upload-container'>
         <div className='previewImg'>
          <img src={imgFile || Img} alt="코디 이미지를 업로드 해주세요" />
          </div>
    <div className='uploadImg'>
    <label htmlFor='profileImg'>파일선택</label>
    <input type='file' accept='image/*' id='profileImg' onChange={saveImgFile} ref={imgRef} />
    </div>
      {/*분석 성공 하면 typeinfo로 가기 */}
      {!suc ? <><button className='upload-btn'>분석하러 가기💨💨</button> 
      
      {/* 분석 로드 */}
      <Stack sx={{ color: 'grey.500' , marginTop:'20px'}} spacing={2} direction="row">
      </Stack>
      </>
      : <TypeInfo/>}
      <CircularProgress color="inherit" />
      <TypeInfo/>
    </div>
)
  }

export default Upload;