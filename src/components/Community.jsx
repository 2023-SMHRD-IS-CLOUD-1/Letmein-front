import React from 'react'
// 커뮤니티 페이지 (게시물 작성, 스크린->(정렬,필터,검색))
const Community = () => {
  return (
    <div className='commuunity-container'>
        <input type='text' placeholder='검색'></input>
        <button>글쓰기</button>
    </div>
  )
}

export default Community