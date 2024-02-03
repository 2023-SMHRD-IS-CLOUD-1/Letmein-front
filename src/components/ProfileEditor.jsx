import React from 'react'
import { useState } from 'react'
import '../css/user.css'

const ProfileEditor = () => {
  const [userImg, setuserImg] = useState('기본 이미지 주소');


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    //  file : 선택한 이미지 파일
    const reader = new FileReader();
    // 선택한 이미지 파일을 브라우저에 띄우기 위해 FileReader 객체 사용
    //  FileReader : 웹 애플리케이션에서 비동기적으로 데이터를 읽어들이는 것을 가능하게 하는 객체 

    reader.onloadend = () => {
      setuserImg(reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className='mypage-container'>

      <fieldset align="center">
        <h2>프로필 수정</h2>

        <img src={userImg} alt="프로필 사진" />
        <br />
        <input type="file" onChange={handleImageUpload} />
        <br />
        <br />
        <hr />
        <table align='center'>
          <tbody>
            <tr>
              <th>ID</th>
              <td><input type="text" placeholder='아이디 입력' /></td>
            </tr>
            <tr>
              <th>PW</th>
              <td><input type="password" placeholder='비밀번호 입력' /></td>
            </tr>
            <tr>
              <th>PW CHECK</th>
              <td><input type="password" placeholder='비밀번호 재입력' /></td>
            </tr>
            <tr>
              <th>NICKNAME</th>
              <td><input type="text" placeholder='닉네임 입력' /></td>
            </tr>
            <tr>
              <th>EMAIL</th>
              <td><input type="text" placeholder='이메일 입력' /></td>
            </tr>
          </tbody>
        </table>
        <br />
        <button >수정</button>
        <button>회원탈퇴</button>
      </fieldset>

    </div>
  )
}

export default ProfileEditor