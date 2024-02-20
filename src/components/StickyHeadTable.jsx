import * as React from 'react';
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
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'num', label: '글번호', minWidth: 20 ,align: 'center' },
  { id: 'writer', label: '작성자', minWidth: 50 ,align: 'center'},
  {
    id: 'title',
    label: '제목',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'answer',
    label: '답변여부',
    minWidth: 10,
    align: 'center'
  }
];

function createData(num, writer, title, answer) {
  return { num, writer, title, answer };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const nav = useNavigate('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const goDetail = (event, num) => {
    console.log("실행", num);
    nav(`/customerDetail/${num}`)
  };

  useEffect(()=>{
    axios.get("http://localhost:8090/letmein/helpNo").
    then((res)=>{
        console.log(res)
        const newRows = res.data.map((item) => (
            createData(
                item.help_num,
                item.user_id,
                item.help_title,
                item.help_answer === 'N' ? "답변대기" : "답변완료"
            )
        ));
        setRows(newRows)
    }).catch((error)=>{
        console.error(error)
    })
  },[])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.num}>
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
  );
}
