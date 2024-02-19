import React, { useContext, useEffect, useState } from 'react';
import userImg from '../images/user.png';
import '../css/user.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import MasonryItem from './MasonryItem';
import Masonry from 'react-masonry-css';
import ComSort from './ComSort';
import { IoTriangle } from "react-icons/io5";
import { useInView } from 'react-intersection-observer';

const Mypage = () => {
  const nav = useNavigate();
  const { user_id, user_nick } = useContext(UserContext);
  const [postList, setPostList] = useState([]);
  const [List, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [myWrite ,setMyWrite] = useState(false);
  const [mylikeList, setMyLikeList] = useState(false);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(0);
  console.log(inView)
  useEffect(() => {
    if(myWrite && inView){
      myPost();
    } else if(mylikeList){
      myLike();
    }
  }, [myWrite, mylikeList, inView]); // pageNumber가 변경될 때마다 호출되도록 설정
  // 내가 작성한 글
  const myPost = () => {
    setMyWrite(true);
    setMyLikeList(false);
    axios.get(`http://localhost:8090/letmein/searchWriter?page=${page}&size=6&userId=${user_id}`
       // 현재 페이지 번호를 백엔드로 전달
    )
    .then((res) => {
      console.log(res.data);
      // 스크롤이 끝까지 닿을 때마다 기존의 게시물 리스트에 추가하여 업데이트
      setList([...List, ...res.data]);
      setPage((page)=>page+1)
    })
    .catch((error) => {
      console.error('나의 게시물 불러오기 실패', error);
    });
  }
  // 내가 좋아요 한 글
  const myLike = () => {
    setMyWrite(false);
    setMyLikeList(true);
    axios.get(`http://localhost:8090/letmein/myLike?user_id=${user_id}`
    ).then((res)=>{
      setPostList(res.data);
    }).catch((error)=>{
      console.error(error)
    })
  }
// 페이지 전체 스크롤 이벤트 핸들러
const handleScroll = () => {
  const bottomMargin = 100; // 여유 마진 설정
  const bottom = window.innerHeight + window.scrollY+ 0.33331298828125 >= document.documentElement.scrollHeight - bottomMargin;
  if (bottom) {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  }
};
useEffect(() => {
  window.addEventListener("scroll", handleScroll); // 스크롤 이벤트를 document에 추가
  return () => {
    window.removeEventListener("scroll", handleScroll); // cleanup
  };
}, []);

const goToTop = () => {
  window.scrollTo({ top : 0, behavior : "smooth"});
};
  return (
    <div className='mypage-container'>
      <img className='userImg' src={userImg} alt="User"></img>
      <h2>{user_nick}</h2>
      <h4>{user_id}</h4>
      <button onClick={() => nav("/profileEditor")}>프로필 수정</button>
      <button onClick={() => nav("/contactCustomer")}>고객 문의</button>
      <div className='mypage-filter'>
        <span onClick={myPost}>📝</span>
        <span>|</span>
        <span onClick={myLike}>🤍</span>
      </div>
      <div className='img-container'>
        <Masonry
          breakpointCols={2}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {(myWrite && !mylikeList) && List.map((item, index) => (
            <div key={index}>
              <MasonryItem item={item} />
            </div>
          ))}
           {(mylikeList && !myWrite) && postList.map((item, index) => (
            <div key={index}>
              <ComSort item={item} />
            </div>
          ))}
        </Masonry>

      </div>
      <div className='masonry'>
      </div>
      {myWrite || mylikeList ?
      <>
      <div ref={ref}></div>
      <button onClick={goToTop} style={{backgroundColor:'black', marginLeft:'400px'}}>
        <IoTriangle style={{color:"white"}}/>
      </button>
      </>
      : ""}
    </div>
  );
}

export default Mypage;