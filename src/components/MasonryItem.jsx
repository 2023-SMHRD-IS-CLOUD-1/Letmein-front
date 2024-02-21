import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
const MasonryItem = ({ item }) => {
  const imgRef = useRef(null);
  const nav = useNavigate();
  const [showText, setShowText] = useState(false);
  const post_num = item.postNum;
  // 글 상세보기
  const GoDetail = () => {
    nav(`/CommunityDetail/${post_num}`,{state:{item}})
  }

  
  return (
    <div className='masonry-item' style={{ position: 'relative' }}>
        <img
          ref={imgRef}
          src={item.postImgsrc}
          className='masonry-content'
          alt={`Post ${item.post_num}`}
          style={{ width: '230px' }}
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
            {item.postTitle}
          </p>
        )}
   </div>

)
 }
export default MasonryItem;

