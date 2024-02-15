import React, { useContext, useEffect, useState } from 'react';
import userImg from '../images/user.png';
import '../css/user.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import MasonryItem from './MasonryItem';
import Masonry from 'react-masonry-css';

const Mypage = () => {
  const nav = useNavigate();
  const { user_id, user_nick } = useContext(UserContext);
  const [postList, setPostList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    myPost();
  }, [pageNumber]); // pageNumber가 변경될 때마다 호출되도록 설정

  const myPost = () => {
    axios.post("http://localhost:8090/letmein/mypost", {
      user_id: user_id,
      page_number: pageNumber // 현재 페이지 번호를 백엔드로 전달
    })
    .then((res) => {
      console.log(res.data);
      // 스크롤이 끝까지 닿을 때마다 기존의 게시물 리스트에 추가하여 업데이트
      setPostList(prevPostList => [...prevPostList, ...res.data]);
    })
    .catch((error) => {
      console.error('나의 게시물 불러오기 실패', error);
    });
  }

// 페이지 전체 스크롤 이벤트 핸들러
const handleScroll = () => {
  const bottomMargin = 100; // 여유 마진 설정
  const bottom = window.innerHeight + window.scrollY+ 0.33331298828125 >= document.documentElement.scrollHeight - bottomMargin;
  console.log(bottom);
  console.log(window.innerHeight);
  console.log(window.scrollY);
  console.log(document.documentElement.scrollHeight);
  if (bottom) {
    console.log("확인2");
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  }
};
useEffect(() => {
  window.addEventListener("scroll", handleScroll); // 스크롤 이벤트를 document에 추가
  return () => {
    window.removeEventListener("scroll", handleScroll); // cleanup
  };
}, []);


  return (
    <div className='mypage-container'>
      <img className='userImg' src={userImg} alt="User"></img>
      <h2>{user_nick}</h2>
      <h4>{user_id}</h4>
      <button onClick={() => nav("/profileEditor")}>프로필 수정</button>
      <button onClick={() => nav("/contactCustomer")}>고객 문의</button>
      <div className='img-container'>
        <Masonry
          breakpointCols={2}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {postList.map((item, index) => (
            <div key={index}>
              <MasonryItem item={item} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default Mypage;
