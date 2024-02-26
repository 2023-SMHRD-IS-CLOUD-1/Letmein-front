import * as React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import SearchIcon from '@mui/icons-material/Search';
const columns = [
  { field: 'id', headerName: 'ID', width: 150, editable: true },
  { field: 'name', headerName: 'Name', width: 150, editable: true },
];

export default function DataGridDemo() {
  const [rows, setRows] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);

  React.useEffect(() => {
    allUser();
  }, []);

  const allUser = () => {
    axios
      .get('http://3.36.68.187:8090/letmein/allUser')
      .then((res) => {
        const users = Object.values(res.data).map((item) => ({
          id: item.user_id,
          name: item.user_name,
          age: item.user_age,
        }));
        setRows(users);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchHandler = () => {
    axios
      .post('http://3.36.68.187:8090/letmein/UserSearch', {
        user_id: searchKey,
      })
      .then((res) => {
        const users = Object.values(res.data).map((item) => ({
          id: item.user_id,
          name: item.user_name,
          age: item.user_age,
        }));
        setRows(users);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteHandler = () => {
    console.log('실행');
    selectedRows.forEach((rowId) => {
      console.log(rowId)
      axios
        .post('http://3.36.68.187:8090/letmein/AdminDelete', {
          user_id: rowId,
        })
        .then((res) => {
          console.log(res);
          alert('탈퇴성공')
          allUser(); // 회원 탈퇴 후 유저 목록 다시 가져오기
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  return (
    <div >
      <Box sx={{ height: 400, width: '100%' }}>
        <div className='admin-search'>
          <TextField
            id='standard-basic'
            label='id'
            variant='standard'
            
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button onClick={searchHandler}>
            <SearchIcon style={{ marginTop: '15px' }} />
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          style={{fontFamily:'Pretendard-Medium', fontSize:'17px'}}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel)=>{
            setSelectedRows(selectionModel)
          }}
          disableRowSelectionOnClick
        />
      </Box>
      <Button className='graph-btn' onClick={deleteHandler} style={{fontFamily:'Pretendard-Bold', fontSize:'17px'}}>
        회원탈퇴
      </Button>
      </div>
  );
}