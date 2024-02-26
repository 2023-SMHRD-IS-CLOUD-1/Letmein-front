import React from 'react'
import '../css/customer.css'
import FAQ from './FAQ'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
const ContactCustomer = () => {
// 고객센터 페이지 메인
    const [value, setValue] = React.useState('FAQ');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div className='customer-container'>
        <h4 style={{textAlign:'center', fontSize:'20px'}}>고객센터</h4>
        <Box sx={{ marginLeft : '150px', marginBottom:'30px'}}>
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
        >
            <Tab value="FAQ" label="FAQ" sx={{fontFamily:'Pretendard-Bold', fontSize : '20px'}}/>
            <Tab value="QUESTION" label="1:1 문의" sx={{fontFamily:'Pretendard-Bold', fontSize : '20px'}}/>
        </Tabs>
        </Box>
        <FAQ value={value}/>
    </div>
  )
}

export default ContactCustomer