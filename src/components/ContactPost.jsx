import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../css/user.css'
import { useNavigate } from 'react-router-dom'

const posts = [
    { id: 1, title: '첫 번째 문의글', content: '첫 번째 문의글 내용입니다.' },
    { id: 2, title: '두 번째 문의글', content: '두 번째 문의글 내용입니다.' }
];

const ContactPost = ({ posts }) => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  
    // posts가 undefined거나 null이 아닌 경우에만 find 메소드를 호출
    const post = posts ? posts.find(post => post.id === Number(id)) : undefined;
  
    const nav = useNavigate();

    const [adminText, setAdminText] = useState('');
    const handleSubmit = () => {
        console.log('관리자 답글 내용', adminText);
        nav("/contactCustomer");
    }

    return (
        <div>
            <fieldset>
                {post ? (
                    <>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </>
                ) : (
                    <p>해당하는 게시물이 없습니다.</p>
                )}
                <hr />
                <div className='mypage-container'>
                    <label>
                        <h3 className='admin'>관리자 답글</h3>
                        <textarea name="adminText" value={adminText} onChange={e => setAdminText(e.target.value)} id="adminText" cols="58" rows="10" ></textarea>
                    </label>
                    <button type='submit' onClick={handleSubmit}>답변등록</button>
                </div>
                {/* 관리자 답변 등록시 체크?표시 띄워지게 어케하지*/}
            </fieldset>
        </div>
    )
}

export default ContactPost
