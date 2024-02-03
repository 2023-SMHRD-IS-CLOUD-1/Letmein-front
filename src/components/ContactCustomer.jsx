import React, { useState } from 'react'
import '../css/user.css'
import { useNavigate } from 'react-router-dom'

const ContactCustomer = () => {
    const nav = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [posts, setPosts] = useState([
        {id : 1, title : '첫 번째 문의글 예시', content : '첫 번째 문의글 예시 내용입니다.'}
       
    ])
    
    const handleSubmit = () => {
        console.log('제목값 : ', title, '내용값 : ', content);

        const newPost = {
            id : posts.length +1,
            title,
            content
        };

        setPosts([...posts, newPost]);
        setTitle('');
        setContent('');
    }

  return (
    <div className='mypage-container'>
        <fieldset>
            <h3 className='title'>FAQ</h3>
            <label>
                    <p className='left'>제목 :</p>
                    <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                    <p className='left'>내용 :</p>
                    <textarea name="content" cols="30" rows="10" value={content} onChange={e => setContent(e.target.value)} />
                </label>
            <button type='submit' className='write-btn' onClick={handleSubmit}>문의글 작성</button>
            <p className='title'></p>
        </fieldset>

        <fieldset className='contact-container'>
            <p className='title'></p>
                {posts.map(post=>(
                    <div key={post.id}>
                        {/* 문의글 상세페이지, 답변 달 수 있게 해야함  .. */}
                        <h4 onClick={()=>nav(`/contactPost?id=${post.id}`)}>Q. {post.title}</h4>
                        <p>: {post.content}</p>
                    </div>
                ))}
        </fieldset>
    </div>
  )
}
export default ContactCustomer