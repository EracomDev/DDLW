import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';
import React from 'react';
import SideBar from './Pages/SideBar/SideBar';
import Login from './Pages/Login/Login';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import AdminWithdrawal from './Pages/AdminWithdrawal/AdminWithdrawal';
import HomeTable from './Pages/HomeTable/HomeTable';
function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route  path="/dashboard/*" element={<SideBar/>}></Route>
            <Route  path="/" element={<HomeTable/>}></Route>
            <Route  path="/register" element={<Login/>}></Route>
            {/* <Route  path="/register" element={<RegisterPage/>}></Route> */}
            <Route  path="/creater_wallet" element={<AdminWithdrawal/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
