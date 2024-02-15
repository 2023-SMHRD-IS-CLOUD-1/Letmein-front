import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MasonryItem from './MasonryItem';
import Masonry from 'react-masonry-css'
import { useInView } from 'react-intersection-observer';
import { IoTriangle } from "react-icons/io5";

const CommunityMasonry = ({searchKey, search}) => {
  const [ref, inView] = useInView();
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);
  const [err, setErr] = useState(false);
  const [List, setList] = useState([]);
  const [how, setHow] = useState(false);
  // 맨밑 스크롤 감지


  // 검색
  useEffect(()=>{
      if(searchKey!=""){
        if(search === 'writer'){
          searchWriter();
        }else if(search === 'title'){
          searchTitle();
        }
    console.log(searchKey , search)
  }
},[search, searchKey])
useEffect(()=>{
  if(inView){
    console.log(inView,"무한스크롤")
    ImgFethch();
  }
},[inView])
// 작성자 기준 검색
  const searchWriter = () => {
    axios.get(`http://localhost:8090/letmein/searchWriter?userId=${searchKey}&page=0`)
    .then((res)=>{
      console.log(res)
      if(res.data.length == 0){
        setErr(true)
      }else if(res.data.length>0){
        setErr(false);
        const imgSrcArray = res.data.map(item => item);
        setList(imgSrcArray)
        setHow(true);
      }
    }).catch((error)=>{
      console.error(error)
    })
  }
  // 제목 기준 검색
  const searchTitle = () =>{
    axios.get(`http://localhost:8090/letmein/searchTitle?postTitle=${searchKey}&page=0`)
    .then((res)=>{
      if(res.data.length == 0){
        setErr(true);
      }else if (res.data.length>0){
        setErr(false);
        const imgSrcArray = res.data.map(item => item);
        setList(imgSrcArray)
        setHow(true);
      }
    }).catch((error)=>{
      console.error(error) 
    })
  }
    // 전체 사진 조회 및 페이지 네이션
    const ImgFethch = () => {
      axios(`http://localhost:8090/letmein/selectAll?page=${page}&size=6`)
      .then((res) => {
        const filteredData = res.data.filter(item => item.post_imgsrc !== null);
        setPostList([...postList, ...filteredData]);
        setPage((page)=>page+1)
      }).catch((error) => {
        console.error(error);
      });
    }

  const goToTop = () => {
    window.scrollTo({ top : 0, behavior : "smooth"});
  };
  return (
    <div className='masonry'>
      {err ? <p style={{textAlign:'center', color:'red'}}>검색결과가 없습니다. 다시 시도 해주세요</p> : "" }
    <Masonry
    breakpointCols={2}
    className='my-masonry-grid'
    columnClassName='my-masonry-grid_column'>
      {!how ?  postList.map((item, index) => (
        <div key={index}>
        <MasonryItem item={item} />
        </div>
      )) : ""}
      {how ?  List.map((item, index) => (
        <div key={index}>
        <MasonryItem item={item} />
        </div>
      )) : ""}
      </Masonry>
      <button ref={ref} onClick={goToTop}>
      <IoTriangle style={{color:"white"}}/>
      </button>
      <div ref={ref}></div>
    </div>
  );
}

export default CommunityMasonry;
