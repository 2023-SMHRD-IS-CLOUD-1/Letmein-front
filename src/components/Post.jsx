import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/post.css'
import Img from '../images/postimg.png'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import AWS from 'aws-sdk'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const Post = () => {
  const nav = useNavigate();

  // 글 작성
  const { user_id } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [acc, setAcc] = useState("");
  const [top, setTop] = useState("");
  const [pants, setPants] = useState("");
  const [shoe, setShoe] = useState("");
  const [date, setDate] = useState("");
  // 이미지 업로드
  const [imgFile, setImgFile] = useState("");
  const [img, setImg] = useState("");
  const imgRef = useRef();

  // 날짜 저장
  useEffect(()=>{
    const today = new Date();
    const formattedDate = today.toLocaleString('ko-KR').replace(/. /g, '-').replace(/:/g, '-');
    setDate(formattedDate)
  },[])

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
   
    // aws 이미지 업로드
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_CLIENT_ID,
      secretAccessKey: process.env.REACT_APP_SECRET,
      region: 'us-east-2'
    });
    const s3 = new AWS.S3();

    const uploadParams = {
      Bucket: 'letmein0229',
      Key: `folder/${user_id}${date}/${imgRef.current.files[0].name}`,
      Body: img
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        // boot -> db에 저장 
        axios.post("/post", {
          post_title: title,
          post_content: content,
          post_acc: acc,
          post_top: top,
          post_pants: pants,
          post_shoe: shoe,
          user_id: user_id,
          post_imgsrc: `https://d1nypumamskciu.cloudfront.net/folder/${user_id}${date}/${imgRef.current.files[0].name}`
        }).then((res) => {
          console.log(res);
          nav("/community")
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className='post-container'>
      <h2>게시글 등록</h2>
      <div className='previewImg'>
        <img src={imgFile || Img} alt="코디 이미지를 업로드 해주세요" />
      </div>
      <div className='uploadImg'>
        <label htmlFor='profileImg'>파일선택</label>
        <input type='file' accept='image/*' id='profileImg' onChange={saveImgFile} ref={imgRef} />
      </div>
      <div className='input-container'>
        
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: 'auto' },
            fontFamily:'Pretendard-Medium'
          }}
          noValidate
          autoComplete="off"
        >
          < TextField id="standard-basic" label="제목" variant="standard" onChange={(e)=>setTitle(e.target.value)}
          required autoFocus={!title} error={!title} helperText={!title ? "제목을 필수로 입력해주세요" : "제목을 입력해주세요"}
          style={{fontFamily:'Pretendard-Medium'}} InputLabelProps={{
            style: {
              fontFamily: 'Pretendard-Bold', fontSize : '23px'
            }
          }}
          />
          < TextField id="standard-basic" label="정보" variant="standard" onChange={(e)=>setContent(e.target.value)}
          required autoFocus={!content} error={!content} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '23px'}}}
          helperText={!content ? "체형, 몸무게 등의 정보를 입력해주세요" : "체형, 몸무게 등의 정보를 입력해주세요"}/>
          < TextField id="standard-basic" label="상의" variant="standard" onChange={(e)=>setTop(e.target.value)}
          helperText={"상의 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '23px'}}}/> 
          < TextField id="standard-basic" label="하의" variant="standard" onChange={(e)=>setPants(e.target.value)}
          helperText={"하의 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '23px'}}}/>
          < TextField id="standard-basic" label="액세서리" variant="standard" onChange={(e)=>setAcc(e.target.value)}
          helperText={"액세서리 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '23px'}}}/>
          < TextField id="standard-basic" label="신발" variant="standard" onChange={(e)=>setShoe(e.target.value)}
          helperText={"신발 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '23px'}}}/>
        </Box>
        <button style={{fontFamily:'Pretendard-Medium'}} onClick={handleSubmit} type='submit'>등록</button>
      </div>
    </div>
  );
};


export default Post;