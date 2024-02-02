import React, { useState } from 'react'

const Upload = () => {
    const [postImg, setPostImg] = useState([]);
    const [previewImg, setPreviesImg] = useState([]);
    function uploadFile(e){
        let fileArr = e.target.files;
        setPostImg(Array.from(fileArr));


    }
  return (
    <div>
    </div>
  )
}

export default Upload