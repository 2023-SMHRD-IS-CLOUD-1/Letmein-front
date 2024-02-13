import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import MasonryItem from './MasonryItem';
import Masonry from 'react-masonry-css'

const CommunityMasonry = ({searchKey, search}) => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:8090/letmein/selectAll")
    .then((res) => {
      const filteredData = res.data.filter(item => item.post_imgsrc !== null);
      console.log("Filtered data:", filteredData);
      setPostList(filteredData);
    }).catch((error) => {
      console.error(error);
    });
    
  }, []);
  
  useEffect(()=>{
    console.log(searchKey , search)
    if(searchKey!=""){
      if(search === 'writer'){
        searchWriter();
      }else if(search === 'title'){
        searchTitle();
      }
  }
},[searchKey,search])
  const searchWriter = () => {
    axios.post("http://localhost:8090/letmein/searchWriter",{
      user_id : searchKey
    }).then((res)=>{
      const filteredData = res.data.filter(item => item.post_imgsrc !== null);
      console.log("Filtered data:", filteredData);
      setPostList(filteredData);
    }).catch((error)=>{
      console.error(error)
    })
  }
  const searchTitle = () =>{
    axios.post("http://localhost:8090/letmein/searchTitle",{
      post_title : searchKey
    }).then((res)=>{
      const filteredData = res.data.filter(item => item.post_imgsrc !== null);
      console.log("Filtered data:", filteredData);
      setPostList(filteredData);
    }).catch((error)=>{
      console.error(error) 
    })
  }
 
  return (
    <div className='masonry'>
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
  );
}

export default CommunityMasonry;
