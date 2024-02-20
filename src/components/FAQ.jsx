import React from 'react'
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import customerImage from '../images/customer.png';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { create } from '@mui/material/styles/createTransitions';
    const columns = [
        { id: 'num', label: '글번호', minWidth: 20 , align : 'center'},
        { id: 'user', label: '작성자', minWidth: 40 , align : 'center'},
        { id: 'title', label: '제목', minWidth: 150 , align : 'center'},
        {id: 'answer', label: '답변여부', minWidth: 20,align: 'center'},
      ];
      
      function createData(help_num, user, title, answer) {
        return { num: help_num, user, title, answer };
      }
      
      
      const FAQ = ({ value }) => {

        const {user_id, setId} = useContext(UserContext);
        const nav = useNavigate('');
        const [rows, setRows] = useState([]);
        const [data, setData] = useState(false)
        useEffect(() => {
          if (value === 'QUESTION') {
            axios.post("http://localhost:8090/letmein/customerAll", {
              user_id: user_id
            })
              .then((res) => {
                if (res.data.length === 0) {
                  setData(true);
                } else if (res.data.length > 0) {
                  const newRows = res.data.map((item) => (
                    createData(
                      item.help_num,
                      item.user_id,
                      item.help_title,
                      item.help_answer === 'N' ? "답변대기" : "답변완료"
                    )
                  ));
                  setRows(newRows);
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
        }, [value, user_id]);
        
            
            const goDetail = (event, num) => {
              console.log("실행", num);
              nav(`/customerDetail/${num}`)
            };
            
            const [page, setPage] = React.useState(0);
            const [rowsPerPage, setRowsPerPage] = React.useState(10);
            
            const handleChangePage = (event, newPage) => {
              setPage(newPage);
            };
            
            const handleChangeRowsPerPage = (event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            };

            const goPost = () => {
              nav("/customerPost")
            }

          return (
            <div className="faq-container">
              <img src={customerImage} style={{width:'480px'}}></img>
        {value === "FAQ"  ? (
          <div>
            <p className='question'>Q1. 체형 사진을 업로드하면 어떻게 체형을 분석하나요? 어저구 저저구</p>
            <p className='answer'>A. yolo를 이용해 체형을 분석해 아바타를 제작합니다</p>
          </div>
        ) : ""}
        {value === "QUESTION" && ! data ?  
          <>
          <button onClick={goPost}>문의글 등록</button>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead style={{backgroundColor:'blue'}}>
                    <TableRow key={rows.map((item)=>item.num)}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.num} >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} onClick={(event) => goDetail(event, row.num)}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          </>
        : ""}
        
        {value === "QUESTION" && data ? 
        <>
        <button onClick={goPost}>문의글 등록</button>
        <p style={{marginTop:'40px', textAlign:'center'}}>작성된 문의글이 없습니다</p> </>: ""}
       
    </div>
    );
  };
  
  export default FAQ;
  