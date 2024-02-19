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
import CommunityDetail from './components/CommunityDetail';
import ComUpdate from './components/ComUpdate';
import Detail from './components/Detail';
import ContactCustomer from './components/ContactCustomer';
import CustomerDetail from './components/CustomerDetail';
import CustomerPost from './components/CustomerPost';
import FAQ from './components/FAQ';
function App() {
  const [user_id, setId] = useState("");
  const [user_pw, setPw] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_name, setName] = useState("");
  const [user_nick, setNick] = useState("");
  const [searchKey , setSearchKey] = useState("");
  const [login, setLogin] = useState(false);
  const [del, setDel] = useState(true);
  const [sortClk, setSortClk] = useState(false);
  const [sort, setSort] = useState("");
  useEffect(()=>{
    Modal.setAppElement("#root");
  },[]);
  return (
    <UserContext.Provider value={{user_id, setId, user_pw, setPw, user_email, setEmail, user_name, setName, user_nick, setNick, login, setLogin
     ,searchKey , setSearchKey , del, setDel,sortClk , setSortClk , sort , setSort}}>
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
        <Route path='/CommunityDetail/:postId' element={<CommunityDetail />} />
        <Route path='/Detail/:post_id' element={<Detail />} />
        <Route path='/ComUpdate/:num' element={<ComUpdate/>} />
        <Route path='/contactCustomer' element={<ContactCustomer/>}/>
        <Route path='/customerDetail/:num' element={<CustomerDetail/>}/>
        <Route path='/customerPost' element={<CustomerPost/>}/>
        <Route path='/faq' element={<FAQ/>}/>
      </Routes>
      <Footer/>
    </div>
    </UserContext.Provider>
  );
}

export default App;
