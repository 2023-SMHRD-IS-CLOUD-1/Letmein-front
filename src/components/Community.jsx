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
const Community = () => {
  const nav = useNavigate();
  const [searchKey , setSearchKey] = useState(""); 
    const [search, setSearch] = useState('writer'); 
    const searchRef = useRef(null);
    const {user_id} = useContext(UserContext);
    const [mylike, setMyLike] = useState([]);
    const handleChange = (event) => {
      setSearch(event.target.value);
    };
  
    const searchHandler = () =>{
        console.log("handler",searchRef.current.value)
        setSearchKey(searchRef.current.value);
    }

    const sortHandler = () => {
      axios.get("http://localhost:8090/letmein/sortLike")
      .then((res)=>{
        console.log(res.data)
      }).catch((error)=>{
        console.error(error)
      })
    }
  return (
    <div className='community-container'>
      <div className='search-container'>
       <Box sx={{ minWidth: 80 }}>
        <FormControl >
          <InputLabel id="demo-simple-select-label">검색</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={search}
            label="검색"
            onChange={handleChange}
            >
            <MenuItem value={'writer'}>작성자</MenuItem>
            <MenuItem value={'title'}>제목</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
      component="form"
      sx={{
        flexGrow: 1}} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="검색" variant="outlined"  sx={{ width: '330px' }} inputRef={searchRef}/>
      <IoSearch
          size={40}
          color="#555"
          style={{marginTop:'10px'}}
          onClick={searchHandler}></IoSearch>
    </Box>
        </div>
        <hr/>
        <div className='board-container'>
          <span onClick={sortHandler}>인기순</span>
          <button onClick={() => nav("/post")}>➕</button>
        </div>
        <CommunityMasonry searchKey={searchKey} search={search}/>
    </div>
  ) 
  }

export default Community