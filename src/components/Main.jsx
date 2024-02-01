import React from 'react'
import main from '../images/Main.jpg'
// 메인화면
const Main = () => {
  return (
    <div className='main-contaiver'>
      <hr/>
      <div style={{ position: 'relative', width: '480px', marginTop: '20px' }}>
        <img src={main} style={{ width: '100%' }} alt="Main" />
        <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
           M
        </p>
      </div>

    </div>
  )
}

export default Main