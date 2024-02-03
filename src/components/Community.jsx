import React, { useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import Select from 'react-select';
import '../css/community.css';
import { useNavigate } from 'react-router-dom';
const Community = () => {
  
  const getCategoryOptions = () => [
    { value: 'writer', label: '작성자' },
    { value: 'title', label: '제목' }
  ];
  const getSort = () => [
    {value : 'update', label:"최신순"},
    {value : 'like' , label:"좋아요순"}
  ]
  const [selectSearch, setSelectSearch] = useState(getCategoryOptions()[0]);
  const [inputText , setInputText] = useState("");
  const [selectSort, setSelectSort] = useState(getSort()[0])
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 110, // 너비 조절
    }),
  };
  const inputSearch = ()=>{
    var search = inputText
    console.log(search)
  }
  const nav = useNavigate();
  return (
    <div className='community-container'>
      <Select
      options={getCategoryOptions()}
      onchange={(selectedOption)=>setSelectSort(selectedOption)}
      defaultValue={getCategoryOptions()[0]} styles={customStyles} className='search'
      />
      <div className='search-container'>
        <input type='text' placeholder='검색' onChange={(e)=>setInputText(e.target.value)}/>
        <IoSearch className='search-icon' onClick={inputSearch}/>
      </div>
      <Select
        options={getSort()}
        onChange={(selectedOption) => setSelectSearch(selectedOption)}
        defaultValue={getSort()[0]} styles={customStyles} className='sort'/>
      <button onClick={()=>nav("/post")}>➕</button>
    </div>
  );
};


export default Community