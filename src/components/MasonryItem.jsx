import React, { useRef, useEffect } from 'react';

const MasonryItem = ({ item }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.onload = () => {
        const height = img.clientHeight;
        console.log(`이미지 ${item.post_num}의 높이:`, height);
        // 여기에서 이미지 높이를 다른 곳에 저장하거나 사용할 수 있습니다.
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
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default MasonryItem;

