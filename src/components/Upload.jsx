import React, { useRef, useState } from 'react'
import model from '../images/uploadimg.png'
import '../css/upload.css'
import { useNavigate } from 'react-router-dom';
import TypeInfo from './TypeInfo';
const Upload = () => {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result)
    };
  };
  const nav = useNavigate();
  return (
    <div className='upload-container'>
      <div className='previewImg'>
      <img src={imgFile || model}  alt="체형 이미지" ></img>
      </div>
      <div className='uploadImg'>
        <label htmlFor='profileImg'>파일선택</label>
      <input type='file' accept='image/*' id='profileImg' onChange={saveImgFile}
      ref={imgRef}/>
      </div>
      {<TypeInfo/>}
    </div>
)
  }

export default Upload;