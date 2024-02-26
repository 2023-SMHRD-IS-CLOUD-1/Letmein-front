import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import '../css/community.css'
import { IoSearch } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityMasonry from './CommunityMasonry';
import React from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { IoCloseSharp } from "react-icons/io5";
import NativeSelect from '@mui/material/NativeSelect';
import ComSort from './ComSort';
import ComSortMansory from './ComSortMansory';
import '../fonts/Pretendard-Medium.ttf'

// 커뮤니티 메인 페이지
const Community = () => {
    const nav = useNavigate();
    const [searchKey , setSearchKey] = useState(""); 
    const [search, setSearch] = useState('writer'); 
    const searchRef = useRef(null);
    const {del, setDel, sortClk, setSortClk , sort, setSort ,user_id} = useContext(UserContext);
    const [msg, setMsg] = useState("");
    const handleChange = (event) => {
      setSearch(event.target.value);
    };
    // 검색
    const searchHandler = () =>{
        setSearchKey(searchRef.current.value);
        setDel(!del)
    }
    // 검색 취소
    const deleteHandler = () =>{
        setDel(!del)
        searchRef.current.value = '';
    }

    // 정렬
    const sortHandler = (event) => {
      setSort(event.target.value)
      if(event.target.value === 'like'){
        setSortClk(true);
      } else if (event.target.value==='recent') {
        setSortClk(false);
      }
      
    }

    useEffect(()=>{
      console.log(sort)
      if(sort==="like"){
        setMsg("인기순")
      } else if(sort === "recent"){
        setMsg("최신순")
      }
    },[sort])
   
    // 글 작성
    const postHandler = () => {
      if(user_id == ""){
        alert("로그인 후 작성하실 수 있습니다.")
        nav("/login")
      } else{
        nav("/post")
      }
    }

  return (
    <div className='community-container'>
      <div className='search-container'>
       <Box sx={{ minWidth: 80 }}>
        <FormControl >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={search}
            sx={{fontFamily:'Pretendard-Medium'}}
            onChange={handleChange}
            >
            <MenuItem sx={{fontFamily:'Pretendard-Medium', fontSize:'18px'}} value={'writer'}>작성자</MenuItem>
            <MenuItem sx={{fontFamily:'Pretendard-Medium', fontSize:'18px'}} value={'title'}>제목</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
      component="form"
      sx={{
        flexGrow: 1}} noValidate autoComplete="off">
      <TextField id="outlined-basic"  variant="outlined"  sx={{ width: '330px', fontFamily:'Pretendard-Medium' }} inputRef={searchRef}/>
      {del ?
      <>
      <IoSearch
          size={40}
          color="#555"
          style={{marginTop:'10px'}}
          onClick={searchHandler}></IoSearch>
      </>
       :<>
       <IoCloseSharp 
          size={40}
          color="#555"
          style={{marginTop:'10px'}}
          onClick={deleteHandler}

       />
       </>
       }
    </Box>
        </div>
        <hr/>
        <div className='board-container'>
        <Box sx={{width : 100 , marginLeft : 2 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{fontFamily:'Pretendard-Medium', fontSize:'20px'}}>
              정렬
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: '정렬',
                id: 'uncontrolled-native',
              }}
              sx={{fontFamily:'Pretendard-Medium'}}
              onChange={sortHandler}
            >
              {sort === 'like' ?
              <>
              <option value={sort=="like" ? "recent" : "like"} >{sort == 'like' ? "인기순" : "최신순"}</option>
              <option value={sort == "like" ? "recent" : "like"}>{sort == 'like' ? "최신순" : "인기순"}</option>
              </>
              :<>
                <option value={sort=="recent" ? "like" : "recent"} >{sort == 'recent' ? "인기순" : "최신순"}</option>
              <option value={sort == "recent" ? "recent" : "like"}>{sort == 'recent' ? "최신순" : "인기순"}</option>
              </>
              }

              
            
            </NativeSelect>
          </FormControl>
        </Box>
          <button onClick={postHandler}>➕</button>
        </div>
        
        {sortClk ? <ComSortMansory sort={sort} search={search} searchKey={searchKey}/> : 
        <CommunityMasonry searchKey={searchKey} search={search} />
        }

    </div>
  ) 
  }

export default Community