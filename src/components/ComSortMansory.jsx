import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MasonryItem from './MasonryItem';
import Masonry from 'react-masonry-css'
import { useInView } from 'react-intersection-observer';
import { IoTriangle } from "react-icons/io5";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ComSort from './ComSort';
// 인기글 정렬 컴포넌트
const ComSortMansory = ({ searchKey, search, sort }) => {

    const [ref, inView] = useInView();
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);
  const [err, setErr] = useState(false);
  const [List, setList] = useState([]);
  const [how, setHow] = useState(false);
  const {del, setDel} = useContext(UserContext);
  const [chkSort, setChkSort] = useState(false);
    console.log(del, "del")
    useEffect(() => {
        if (searchKey != "") {
            if (search === 'writer') {
                searchWriter();
            } else if (search === 'title') {
                searchTitle();
            }
        }
    }, [search, searchKey])
    useEffect(() => {
        if (sort === 'like') {
            sortLike();
        }
    }, [sort])
    useEffect(()=>{
        if(del){
            sortLike();
            setErr(false);
        }
    },[del])
    // 제목기준 검색
    const searchTitle = () =>{
        axios.post(`http://localhost:8090/letmein/sortTitle`,{
            post_title : searchKey
        })
        .then((res)=>{
          if(res.data.length == 0){
            setErr(true);
            setDel(true);
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
      // 작성자 기준 검색
      const searchWriter = () => {
        axios.post(`http://localhost:8090/letmein/sortWriter`,{
            user_id : searchKey
        })
        .then((res)=>{
          if(res.data.length == 0){
            setErr(true)
            setDel(true);
          }else if(res.data.length>0){
            console.log(res.data)
            setErr(false);
            const imgSrcArray = res.data.map(item => item);
            setList(imgSrcArray)
            setHow(true);
          }
          }).catch((error)=>{
            console.error(error)
          })
        }
        // 전체글 인기정렬
        const sortLike = () => {
            if(del){
                axios.get(`http://localhost:8090/letmein/sortLike`)
                    .then((res) => {
                        setList("");
                        setHow(false);
                        setPostList([...postList, ...res.data]);
                        setPage((page)=>page+1)
                    }).catch((error) => {
                        console.error(error)
                    })
            }
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
                   {(del && !how )  && postList.map((item, index) => (
                    <div key={index}>
                        <ComSort item={item} />
                    </div>
                    ))}
                    {(how && !del ) && List.map((item, index) => (
                    <div key={index}>
                        <ComSort item={item} />
                    </div>
                    ))}
                </Masonry>
                <div ref={ref}>끝</div>
                <button onClick={goToTop}>
                <IoTriangle style={{color:"white"}}/>
                </button>
        </div>
    )
        }
export default ComSortMansory