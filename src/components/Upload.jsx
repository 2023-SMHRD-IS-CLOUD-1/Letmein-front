import React, { useRef, useState } from 'react'
import model from '../images/uploadimg.png'
import '../css/upload.css'
import { useNavigate } from 'react-router-dom';
import uploadImage from '../authUtils';
import TypeInfo from './TypeInfo';
import AWS from 'aws-sdk'

const  Upload  = () => {
  const nav = useNavigate();
  const imgRef = useRef();
  const [imgFile, setImgFile] = useState(null);
  
  const handleFileChange = (e) => {

    setImgFile(e.target.files[0]);
  }
  const handleUpload = () => {
    if(!imgFile){
      alert('파일을 선택해주세요')
      return;
    }
    console.log(imgFile)
    
    AWS.config.update({
      accessKeyId:'AKIA2UC3EBSVRKE3FREQ',
      secretAccessKey:'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',
      region:'us-east-2'
    });
    const s3 = new AWS.S3();

    const UploadParams = {
      Bucket : 'letmein0229',
      Key : imgFile.name,
      Body : imgFile,
    };
    s3.upload(UploadParams, (err,data)=>{
      if(err){
        console.error(err)
      } else {
        console.log(data)
      }
    })
  }


  
  return (
    <div className='upload-container'>
      <input type='file' onChange={handleFileChange}></input>
      <button onClick={handleUpload}>Upload</button>
      {<TypeInfo/>}
    </div>
)
  }

export default Upload;