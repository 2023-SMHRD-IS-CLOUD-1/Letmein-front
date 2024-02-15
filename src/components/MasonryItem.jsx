import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MasonryItem = ({ item }) => {
  const imgRef = useRef(null);
  const nav = useNavigate();
  const GoDetail = () => {
    const post_num = item.postNum;
    nav(`/CommunityDetail/${post_num}`,{state:{item}})
  }
  useEffect(() => {
    console.log("마이페이지",item)
    const img = imgRef.current;
    if (img) {
      img.onload = () => {
        const height = img.clientHeight;
      };
    }
  }, [item]);

  return (
    <div className='masonry-item' >
      {item.postImgsrc != null ? (
        <img
          ref={imgRef}
          src={item.postImgsrc}
          className='masonry-content'
          alt={`Post ${item.post_num}`}
          style={{ width: '220px' }}
          onClick={GoDetail}
        />
      ) : (
        ""
      )}
      {item.post_imgsrc != null ? (
        <img
          ref={imgRef}
          src={item.post_imgsrc}
          className='masonry-content'
          alt={`Post ${item.post_num}`}
          style={{ width: '220px' }}
          onClick={GoDetail}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default MasonryItem;

