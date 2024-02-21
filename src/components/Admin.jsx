import React from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import '../css/admin.css'
import DataGridDemo from './DataGidDemo';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import StickyHeadTable from './StickyHeadTable';

// 관리자 페이지
const Admin = () => {
  
  return (
    <div className='admin-container'>
      <div className='graph'>
      <h3>User Info</h3>
        <DataGridDemo/>
      </div>
      <div className='graph'>
        <h3>고객문의함</h3>
        <StickyHeadTable/>
      </div>
    </div>
  )
}

export default Admin