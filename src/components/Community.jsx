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

const Community = () => {
    const nav = useNavigate();
    const [searchKey , setSearchKey] = useState(""); 
    const [search, setSearch] = useState('writer'); 
    const searchRef = useRef(null);
    const {del, setDel, sortClk, setSortClk , sort, setSort} = useContext(UserContext);
    console.log("sortClk",sortClk);
    console.log("sort", sort)
    const handleChange = (event) => {
      setSearch(event.target.value);
    };
  
    const searchHandler = () =>{
        setSearchKey(searchRef.current.value);
        setDel(!del)
    }

    const deleteHandler = () =>{
        setDel(!del)
        searchRef.current.value = '';
    }
    const sortHandler = (event) => {
      setSort(event.target.value)
      if(event.target.value === 'like'){
        setSortClk(true);
      } else if (event.target.value==='recent') {
        setSortClk(false);
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
              <option value={'recent'} >최신순</option>
              <option value={'like'}>인기순</option>
              </>
              :
              <>
              <option value={'recent'}>최신순</option>
              <option value={'like'}>인기순</option>
              </>
              }

             
            </NativeSelect>
          </FormControl>
        </Box>
          <button onClick={() => nav("/post")}>➕</button>
        </div>
        
        {sortClk ? <ComSortMansory sort={sort} search={search} searchKey={searchKey}/> : 
        <CommunityMasonry searchKey={searchKey} search={search} />
        }

    </div>
  ) 
  }

export default Community