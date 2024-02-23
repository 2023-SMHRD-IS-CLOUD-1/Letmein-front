import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

// 커뮤니티 글 수정

const ComUpdate = () => {
    const nav = useNavigate();
    const location = useLocation();
    const item = location.state.item;
    const [title, setTitle] = useState(item.postTitle);
    const [content, setContent] = useState(item.postContent);
    const [acc, setAcc] = useState("");
    const [top, setTop] = useState("");
    const [pants, setPants] = useState("");
    const [shoe, setShoe] = useState("");
    const [post_num , setPostNum] = useState("");
    useEffect(()=>{
        if(item.postAcc != null) {
            setAcc(item.postAcc) 
         }
         if(item.postShoe != null) {
             setShoe(item.postShoe)
         }
         if(item.postPants != null) {
             setPants(item.postPants)
         }
         if(item.postShoe != null){
             setShoe(item.setShoe)
         }
         setPostNum(item.postNum)
    },[item])
   
    const handleSubmit  = () => {
        axios.post("postModify",{
            post_title : title,
            post_content : content,
            post_acc : acc,
            post_pants : pants,
            post_top : top,
            post_shoe : shoe,
            post_num : item.postNum
        }).then(()=>{
            alert("수정이 완료되았습니다.")
            nav("/community")
        })
    }
    const handleBack = () => {
        alert('커뮤니티로 다시 이동합니다');
        nav("/community");
    }
  return (
    <div className='update-container'>
        <h2>게시글 수정</h2>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '460px' },
          }}
          noValidate
          autoComplete="off"
        >
          < TextField id="standard-basic" label="제목" variant="standard" onChange={(e)=>setTitle(e.target.value)}
          defaultValue={item.postTitle} helperText={"제목을 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
          < TextField id="standard-basic" label="정보" variant="standard" onChange={(e)=>setContent(e.target.value)}
          defaultValue={item.postContent} helperText={"체형, 몸무게 등의 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
          < TextField id="standard-basic" label="상의" variant="standard" onChange={(e)=>setTop(e.target.value)}
          defaultValue = {item.postTop} helperText={"상의 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
          < TextField id="standard-basic" label="하의" variant="standard" onChange={(e)=>setPants(e.target.value)}
          defaultValue = {item.postPants} helperText={"하의 정보를 입력해주세요"} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
          < TextField id="standard-basic" label="액세서리" variant="standard" onChange={(e)=>setAcc(e.target.value)}
          helperText={"액세서리 정보를 입력해주세요"} defaultValue={item.postAcc} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
            < TextField id="standard-basic" label="신발" variant="standard" onChange={(e)=>setShoe(e.target.value)}
          helperText={"신발 정보를 입력해주세요"} defaultValue={item.postShoe} InputLabelProps={{
            style: { fontFamily: 'Pretendard-Bold', fontSize : '20px'}}}/>
        </Box>
        <button onClick={handleSubmit} type='submit'>수정</button>
        <button onClick={handleBack}>취소</button>
    </div>
  )
}

export default ComUpdate