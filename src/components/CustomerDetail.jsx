import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/customer.css'
import manage  from '../images/manage.png'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
const CustomerDetail = () => {
const { num } = useParams();
const [post, setPost] = useState('');
const nav = useNavigate();
const goBack = () => {
  nav("/contactCustomer")
}

useEffect(()=>{
    axios.post("http://localhost:8090/letmein/customerNum",{
        help_num : num
    }).then((res)=>{
        setPost(res.data[0])
    }).catch((error)=> 
    console.error(error))
},[num])
  return (
    <div className='cus-container'>
      <button onClick={goBack}>
        <ArrowBackIosRoundedIcon style={{fontSize:'30px' , color:'gray'}}/>
      </button>
      <h3 style={{marginLeft:'10px'}}>{post.help_title}</h3>
      <div className='customer-date'>
      <span>등록일</span>
      <span>|</span>
      <span>{post.post_at}</span>  
      </div>
      <hr/>
      <div className='customer-content'>
      <p>{post.help_content}</p>
      </div>
    
      {post.help_answer === 'N' ? 
        <>
        <div className='customer-answer'>
          <p>답변이 등록되지 않았습니다</p>
        </div>
        </>
        : 
        <>
          <div className='customer-answer'>
            <div className='customer-user'>
            <img src={manage}></img>
            <span style={{fontSize:'20px' , color:'40A2D8', fontWeight:'bold', marginLeft:'5px'}}>고객센터 담당자</span>
            <span style={{marginTop:'45px' , marginRight:'100px'}}>의 답변</span>
            </div>
            <p>{post.help_answer_content}</p>
            </div>

        </>
      }
    </div>
  )
}

export default CustomerDetail