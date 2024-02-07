import React, { useContext, useRef, useState } from 'react'
import '../css/post.css'
import Img from '../images/postimg.png'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import AWS from 'aws-sdk'
import { useNavigate } from 'react-router-dom'
const Post = () => {
  const { user_id } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [acc, setAcc] = useState("");
  const [top, setTop] = useState("");
  const [pants, setPants] = useState("");
  const [shoe, setShoe] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef();

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

    AWS.config.update({
      accessKeyId: 'AKIA2UC3EBSVRKE3FREQ',
      secretAccessKey: '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',
      region: 'us-east-2'
    });
    const s3 = new AWS.S3();

    const uploadParams = {
      Bucket: 'letmein0229',
      Key: imgRef.current.files[0].name,
      Body: img
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);

        axios.post("http://localhost:8090/letmein/post", {
          post_title: title,
          post_content: content,
          post_acc: acc,
          post_top: top,
          post_pants: pants,
          post_shoe: shoe,
          user_id: user_id,
          post_imgsrc: `https://d1nypumamskciu.cloudfront.net/${imgRef.current.files[0].name}`
        }).then((res) => {
          console.log(res);
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className='post-container'>
      <div className='previewImg'>
        <img src={imgFile || Img} alt="코디 이미지를 업로드 해주세요" />
      </div>
      <div className='uploadImg'>
        <label htmlFor='profileImg'>파일선택</label>
        <input type='file' accept='image/*' id='profileImg' onChange={saveImgFile} ref={imgRef} />
      </div>
      <div className='input-container'>
        <p>제목 </p>
        <input type='text' placeholder='제목을 입력하세요' required onChange={(e) => setTitle(e.target.value)}></input>
        <p> 정보 </p>
        <input type='text' placeholder='체형, 몸무게 등의 정보를 남겨주세요' required onChange={(e) => setContent(e.target.value)}></input>
        <p>상의</p>
        <input type='text' placeholder='상의 정보를 입력해주세요' onChange={(e) => setTop(e.target.value)} required></input>
        <p>하의</p>
        <input type='text' placeholder='하의 정보를 입력해주세요' onChange={(e) => setPants(e.target.value)} required></input>
        <p>악세서리</p>
        <input type='text' placeholder='악세서리 정보를 입력해주세요' onChange={(e) => setAcc(e.target.value)} required></input>
        <p>신발</p>
        <input type='text' placeholder='신발 정보를 입력해주세요' onChange={(e) => setShoe(e.target.value)} required></input>
        <button onClick={handleSubmit} type='submit'>등록</button>
      </div>
    </div>
  );
};


export default Post;