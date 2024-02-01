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

function App() {
  return (
    <div className="App">
      <Header/>
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

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
