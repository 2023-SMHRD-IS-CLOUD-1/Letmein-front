import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../context/UserContext'
import { TiInfoLarge } from "react-icons/ti";
import { FaTshirt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { PiPantsFill } from "react-icons/pi";
import DiamondIcon from '@mui/icons-material/Diamond';
import { GiConverseShoe } from "react-icons/gi";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import axios from 'axios';
const CommunityDetail = () => {
    const {user_id} =useContext(UserContext);
    const location = useLocation();
    const item = location.state.item;
    const nav = useNavigate();
    const [top, setTop] = useState("");
    const [pant , setPant] = useState("");
    const [acc, setAcc] = useState("");
    const [shoe, setShoe] = useState("");
    const [num, setNum] = useState("");
    const [nick, setNick] = useState("");
    const [like, setLike] = useState(false);
    const [cntLike , setCntLike] = useState(0);
    const [Idis, setIdIS] = useState(false);
    useEffect(() => {
        if(item.postTop != null){
            setTop(item.postTop)
        }if(item.postPants != null){
            setPant(item.postPants)
        }if(item.postShoe != null){
            setShoe(item.postShoe)
        }if(item.postAcc !=null){
            setAcc(item.postAcc)
        }
        setNum(item.postNum)
        // 글 작성자의 닉네임 조회
        axios.post("http://localhost:8090/letmein/nickFind",{
            user_id : item.userId
        }).then((res)=>{
            setNick(res.data[0].user_nick);
        }).catch((error)=>{
            console.error(error)
        })
    }, [item]);
    useEffect(()=>{
        axios.post("http://localhost:8090/letmein/countLike",{
            post_num : num
        }).then((res)=>{
            setCntLike(res.data);
        }).catch((error)=>{
            console.error(error)
        })
        
        axios.post("http://localhost:8090/letmein/countUser",{
            user_id : user_id
        }).then((res)=>{
            if(res.data.includes(num)){
                setIdIS(true)
            }
        }).catch((error)=>{
            console.error(error)
        })
    })
    // 좋아요

    const likeHandler = () => {
        if(user_id == ""){
            alert("로그인이 필요합니다.");
            nav("/login");
        }else if(!like){
            axios.post("http://localhost:8090/letmein/like",{
                post_num : num,
                user_id : user_id
            }).then((res)=>{
                setLike(true);
            }).catch((error)=>{
                console.error(error)
            })
        }
    }
    // 좋아요 취소
    const unLike = () =>{
        if(user_id == ""){
            alert("로그인이 필요합니다.");
            nav("/login");
        }else{
            axios.post("http://localhost:8090/letmein/unlike",{
                post_num : num,
                user_id : user_id
            }).then((res)=>{
                setLike(false);
                setIdIS(false)
            }).catch((error)=>{
                console.error(error)
            })
        }
    }

    const handleIconClick = () => {
        nav("/community")
    }
    // 글 수정
    const updateHandler = () => {
        console.log("item",item)
        nav(`/ComUpdate/${num}`,{state:{item}})
    }
    // 글 삭제
    const deleteHandler = () => {
        axios.post("http://localhost:8090/letmein/postDelete",{
            post_num : num,
        }).then((res)=>{
            alert("게시글이 삭제되었습니다")
            nav("/community")
        }).catch((error)=>{
            console.error(error)
        })
    }

  return (
    <div className='detail-container'>
       <div className='icon-container'>
            <ArrowBackIosRoundedIcon style={{color:'black', fontSize:'40px'}} onClick={handleIconClick}/>
        </div>
        <div className='image-container'>
            <img src={item.postImgsrc} alt="post-img" />
        </div>
        <div className='userIdcont'>
        <AccountCircleRoundedIcon style={{fontSize:'40px'}}/>
        <span style={{fontSize:'25px', marginTop:'-10px'}}>{nick}</span>
        <span>| </span>
        <span>@{item.userId}</span>
        {item.userId === user_id ? <> <MdEdit style={{fontSize:'30px'}} onClick={updateHandler}/>
        <MdDelete style={{fontSize:'30px'}} onClick={deleteHandler}/></> : ""}
       
        {like || Idis ?  <FcLike style={{fontSize:'30px'}} onClick={unLike}/>: <FcLikePlaceholder style={{fontSize:'30px'}} onClick={likeHandler}/>}
        {cntLike}
        </div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemAvatar>
                <Avatar><TiInfoLarge /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="제목" secondary={item.postTitle}/>
            </ListItem>
            <ListItem>
                <ListItemAvatar><Avatar><TiInfoLarge /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="신체 정보" secondary={item.postContent} />
            </ListItem>
            { ! top ? "" :
                <ListItem>
                    <ListItemAvatar><Avatar><FaTshirt/></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="상의" secondary={top} />
                </ListItem>
            }
            { ! pant ? "":
            <ListItem>
                <ListItemAvatar><Avatar><PiPantsFill /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="하의" secondary={pant} />
            </ListItem>
            }
            { ! acc ? "":
            <ListItem>
                <ListItemAvatar><Avatar><DiamondIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="액세서리" secondary={acc} />
            </ListItem>
            }
            { ! shoe ? "" :
            <ListItem>
                <ListItemAvatar><Avatar><GiConverseShoe /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="신발" secondary={shoe} />
            </ListItem>
            }
    </List>
    </div>
  );
}

export default CommunityDetail