import React from 'react'
import main from '../images/Main.jpg'
import '../css/main.css'
// 메인화면
const Main = () => {
  return (
    <div className='main-contaiver'>
      <div style={{ position: 'relative', width: 'auto', marginTop: '20px' }}>
        <img src={main} style={{ width: '100%' }} alt="Main" />
        <p className='overlay-text'>
           Meet your own<br/>
           fashion coordinator<br/>
           at Let Me In
        </p>
        <div>
          <h1>FASHION</h1>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Main