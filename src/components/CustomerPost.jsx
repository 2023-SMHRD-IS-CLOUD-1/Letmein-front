import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CustomerPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {user_id, setId} = useContext(UserContext);
    const nav = useNavigate();

    const submitHandler = () => {
        axios.post("http://localhost:8090/letmein/customerPost",{
            help_title : title,
            help_content : content,
            user_id : user_id
        }).then((res)=>{
            console.log(res)
            alert("문의글이 성공적으로 등록되었습니다.")
            nav("/faq")
        }).catch((err)=>{
            console.error(err)
        })
    }

  return (
    <div>
        <div className='mypage-container'>
        <fieldset>
            <h3 className='title'>FAQ</h3>
           
            <label>
                    <p className='left '>제목 :</p>
                    <input type="text" name='title' onChange={(e)=>setTitle(e.target.value)} />
                </label>
                <label>
                    <p className='left'>내용 :</p>
                    <textarea name="content" cols="30" rows="10" onChange={(e)=>setContent(e.target.value)}/>
                </label>
            <button type='submit' className='write-btn' onClick={submitHandler}>문의글 작성</button>
            <p className='title'></p>
        </fieldset>

    </div>
    </div>
  )
}

export default CustomerPost