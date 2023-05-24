import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Logo from "./../../Images/logo2.png"
import ConnectButton from '../../Component/ConnectButton';
import { useNavigate } from "react-router-dom"
import IdToAddress from '../../Common/IdToAddress';
import Loader from '../../Component/Loader';
import UserInfo from '../../Common/UserInfo';
import RegisterPage from '../RegisterPage/RegisterPage';
import axios from 'axios';
import { ApiPaths } from '../../API';

const Login = () => {
    const { ethereum } = window;
    const { BigInt } = window;
    const navigate = useNavigate();
    const [viweId, setViewId] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    async function viewLogin() {
        localStorage.setItem("viewId", viweId);
        setLoading(true);
        try {
            let myid = BigInt(viweId)
            const addr = await IdToAddress(myid);
            // console.log('5555555555555555555555555555555555555555', addr)
            // console.log(addr);
            if (addr !== '0x0000000000000000000000000000000000000000') {
                //alert('find');
                localStorage.setItem("viewId", viweId);
                localStorage.setItem("loginBy", 'view');
                localStorage.setItem('upline', 0);
                navigate("/dashboard")
                setLoading(false);
            } else {
                setMsg(<span className='text-danger'>Not Exist.</span>);
                setLoading(false);
            }
        } catch (error) {
            setMsg(<span className='text-danger'>Something went wrong</span>);
            setLoading(false);
        }
    }

    async function automaticLoginDB() {
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        let addr = accounts[0].toLowerCase()
        console.log('accounts', addr)
        try {
            axios({
                method: "post",
                url: ApiPaths.LoginApi,
                data: {
                    username: addr
                },
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    console.log('automaticLoginDB', response.data.user_id);
                    if (response?.data?.user_id > 0) {
                        localStorage.setItem("viewId", response?.data?.user_id);
                        localStorage.setItem('upline', 1);
                        navigate('/dashboard');
                    } else {
                        setMsg(<span className='text-danger'>User Not Exist</span>)
                    }
                })
                .catch(function (response) {
                    console.log(response);
                });
        } catch (e) {
            console.log(e)
        }
    }

    // async function automaticLogin() {
    //     setLoading(true);
    //     try {
    //         const { ethereum } = window;
    //         if (ethereum) {
    //             try {
    //                 const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    //                 console.log("Found an account! Address: ", accounts[0]);
    //                 const userInfo = await UserInfo(accounts[0]);
    //                 if (userInfo.userInfo.id > 0) {
    //                     localStorage.setItem("viewId", accounts[0]);
    //                     localStorage.setItem("loginBy", 'automatic');
    //                     localStorage.setItem('upline', 1);
    //                     navigate("/dashboard");
    //                     setLoading(false);
    //                 } else {
    //                     setMsg(<span className='text-danger'>Not Exist</span>);
    //                     setLoading(false);
    //                 }
    //             }
    //             catch (err) {
    //                 alert(err)
    //                 setLoading(false);
    //                 setMsg(<span className='text-danger'>Something went wrong</span>);
    //             }
    //         } else {
    //             setMsg(<span className='text-danger'>Wallet Not Exist</span>);
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         alert(error)
    //         setMsg(<span className='text-danger'>Something Went Wrong</span>);
    //         setLoading(false);
    //     }
    // }
    // useEffect(() => {
    //     const viewInput = document.getElementById('viewInput');
    //     viewInput.addEventListener("keypress", function (event) {
    //         if (event.key === "Enter") {
    //             event.preventDefault();
    //             document.getElementById("viewBtn").click();
    //         }
    //     });
    // }, [])

    return (
        <>
            {
                loading === true ? <Loader /> : ''
            }
            <div id='bgImage'>
                <Container id="logoContainer">
                    <img src={Logo} alt="logo.png" />
                    <ConnectButton />
                </Container>
                <div className="div">

                    <Container className="connectWalletContainer">
                        <Row className="connectWalletRow align-items-center">
                            <center>{msg}</center>
                            <Col md='12' className=" ">
                                <h4 className='heading'>AUTOMATIC REGISTRATION</h4>
                                <RegisterPage />
                                <p className='text-center m-0'>Already have an account ?</p>
                                <Link to='/' id="loginLink">Login</Link>
                            </Col>
                            <Col md='6' className="connectRegisterRight connectLoginRight connectRegisterLeft connectLoginLeft" >
                                {/* <h4 className='heading'>Login to your personal account</h4>  */}
                                {/* <input type="text" id="viewInput" onChange={(e) => setViewId(e.target.value)} placeholder="Enter User ID." /> */}
                                {/* <div className="registerButtons">
                                    <button className="viewing bgOrange" id="viewBtn" onClick={viewLogin}>View</button>
                                </div> */}
                                {/*                                
                                <p style={{ color: 'white' }}>To access all the functions of your personal account use Auto Login</p>
                                <Link className="loginBtn" onClick={automaticLoginDB}>Automatic Login</Link> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Login