import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Login from './components/Login'
import Join from './components/Join';
import FindId from './components/FindId';
import Avatar from './components/Avatar';
import Codi from './components/Codi';
import CodiDetail from './components/CodiDetail';
import Community from './components/Community';
import Post from './components/Post';
import PostDetail from './components/PostDetail';
import Mypage from './components/Mypage';
import Admin from './components/Admin';
import ProfileEditor from './components/ProfileEditor';
import Upload from './components/Upload';
import FindPw from './components/FindPw';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { UserContext } from './context/UserContext';

function App() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  useEffect(()=>{
    Modal.setAppElement("#root");
  },[]);
  return (
    <UserContext.Provider value={{id, setId, pw, setPw, email, setEmail, name, setName, nick, setNick}}>
    <div className="App">
      <Header/>
      <hr/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='join' element={<Join/>}/>
        <Route path='findId' element={<FindId/>}/>
        <Route path='avatar' element={<Avatar/>}/>
        <Route path='codi' element={<Codi/>}/>
        <Route path='CodiDetail' element={<CodiDetail/>}/>
        <Route path="community" element={<Community/>}/>
        <Route path='post' element={<Post/>}/>
        <Route path='postDetail' element={<PostDetail/>}/>
        <Route path='myPage' element={<Mypage/>}/>
        <Route path='admin' element={<Admin/>}/>
        <Route path='profileEditor' element={<ProfileEditor/>}/>
        <Route path='upload' element={<Upload/>}/>
        <Route path='findPw' element={<FindPw/>}/>
      </Routes>
      <Footer/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
