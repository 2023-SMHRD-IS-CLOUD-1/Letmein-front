import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ComSort = ({item}) => {
    const imgRef = useRef(null);
    const nav = useNavigate();
    const [showText, setShowText] = useState(false);
    const post_num = item.post_num;
    // 글 상세보기
    const GoDetail = () => {
      nav(`/Detail/${post_num}`,{state:{item}})
    }
  return (
    <div className='masonry-item' style={{ position: 'relative' }}>
    <img
      ref={imgRef}
      src={item.post_imgsrc}
      className='masonry-content'
      alt={`Post ${item.post_num}`}
      style={{ width: '220px' }}
      onClick={GoDetail}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    />
    {showText && (
      <p
        style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          zIndex: '1',
          textAlign: 'center',
          width: '100%',
          color: 'white'
        }}
      >
        {item.post_title}
      </p>
    )}
</div>
  )
}

export default ComSort