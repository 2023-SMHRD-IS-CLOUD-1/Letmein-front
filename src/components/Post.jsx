import React, { useRef, useState } from 'react'
import '../css/post.css'
import Img from '../images/postimg.png'
// 글작성 
const Post = () => {
  // 이미지 업로드
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result)
    };
  };

  return (
    <div className='post-container'>
        <div className='previewImg'>
      <img src={imgFile || Img }  alt="코디 이미지를 업로드 해주세요" ></img>
      </div>
      <div className='uploadImg'>
        <label htmlFor='profileImg'>파일선택</label>
      <input type='file' accept='image/*' id='profileImg' onChange={saveImgFile}
      ref={imgRef}/>
      </div>
      <div className='input-container'>
        <p>제목 </p>
        <input type='text' placeholder='제목을 입력하세요'></input>
        <p> 정보 </p>
        <input type='text' placeholder='체형, 몸무게 등의 정보를 남겨주세요'></input>
        <div className='clothadd'> 
        <p>상의</p>
        <input type='text' placeholder='상의 정보를 입력해주세요'></input>
        <p>하의</p>
        <input type='text' placeholder='하의 정보를 입력해주세요'></input>
        <p>악세서리</p>
        <input type='text' placeholder='악세서리 정보를 입력해주세요'></input>
        <p>신발</p>
        <input type='text' placeholder='신발 정보를 입력해주세요'></input>
        <button>등록</button>
        </div>
      </div>
    </div>
  )
}

export default Post