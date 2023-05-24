import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./HomeTable.css";
import Logo from "./../../Images/logo2.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Change from "../../Common/StringToSub";
import Loader from "../../Component/Loader";
import ConnectButton from "../../Component/ConnectButton";
import { ApiPaths } from "../../API";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useSelector } from "react-redux";
import { BsInfoCircleFill } from 'react-icons/bs'
import Marquee from "react-fast-marquee";
import PDF from './../../PDF/pdf.pdf'
const HomeTable = () => {
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  const [marquee1, setMarquee1] = useState([]);
  const [marquee2, setMarquee2] = useState([]);
  const [marquee3, setMarquee3] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ethereum } = window;
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const requestAccount = useSelector((state) => state.account.value);
  useEffect(() => {
    fatch_Details();
  }, []);

  async function fatch_Details() {
    try {
      axios({
        method: "get",
        url: ApiPaths.TopUsers,
      })
        .then(function (response) {
          console.log("details", response);
          setTableData1(response.data.array1);
          setTableData2(response.data.array2);
          setTableData3(response.data.array3);
          setMarquee1(response.data.marqueArray1);
          setMarquee2(response.data.marqueArray2);
          setMarquee3(response.data.marqueArray3);
        })
        .catch(function (response) {
          console.log(response);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function automaticLoginDB() {
    // alert(requestAccount);
    if (requestAccount != null) {
      setLoading(true);
      // let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      let addr = requestAccount.toLowerCase();
      console.log("accounts", addr);
      try {
        axios({
          method: "post",
          url: ApiPaths.LoginApi,
          data: {
            username: addr,
          },
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            console.log("automaticLoginDB", response.data.user_id);
            if (response?.data?.user_id > 0) {
              localStorage.setItem("viewId", response?.data?.user_id);
              localStorage.setItem("upline", 1);
              localStorage.setItem("account", requestAccount);
              navigate("/dashboard");
            } else {
              // setMsg(<span className='text-danger'>User Not Exist</span>)
              alert("User Not Exist");
              setLoading(false);
            }
          })
          .catch(function (response) {
            console.log(response);
            setLoading(false);
          });
      } catch (e) {
        console.log(e);
        alert("Something went wrong");
        setLoading(false);
      }
    } else {
      alert("Please Check Your Network");
      setLoading(false);
    }
  }

  return (
    <section className="mainHomeDiv">
      {loading === true ? <Loader /> : ""}
      <h1 id="CopiedMsg">Copied!</h1>
      <div>
        <div className="container-fluid">
          <div className="row title" style={{ marginBottom: "20px" }}></div>
        </div>

        <div className="container-fluid p-0 m-0 mt-20">
          <OwlCarousel
            items={1}
            className="owl-theme"
            loop
            nav
            autoplay={true}
            autoplayTimeout={2500}
            margin={8}
          >

            <div>
              <Container fluid className="p-0">
                <div className="slideDiv slideDiv1">
                  <h1>GET UP TO+300% OF YOUR DEPOSITS</h1>
                  <p>
                    Our smart contract provides two types of bonuses: one based
                    on the total number of active investors and another based on
                    personal retention, which increases depending on your base
                    income. You can earn a maximum yield of <span>+300%</span>{" "}
                    on each deposit. By investing in our smart contract, you
                    have the opportunity to triple your income.
                  </p>
                </div>
              </Container>
            </div>
            <div>
              <Container fluid className="p-0">
                <div className="slideDiv slideDiv2">
                  <h1>Direct Referral Bonus</h1>
                  <p>
                    Whenever you refer a new user and they invest any amount,
                    you will receive a <span>5%</span> bonus. This bonus will be
                    credited to your wallet and can be withdrawn when you choose
                    to do so
                  </p>
                </div>
              </Container>
            </div>
            <div>
              <Container fluid className="p-0">
                <div className="slideDiv slideDiv3">
                  <h1>DAILY CASH BACK</h1>
                  <p>
                    <span>0.70%</span> daily up to <span>3x</span>
                  </p>
                </div>
              </Container>
            </div>
            <div>
              <Container fluid className="p-0">
                <div className="slideDiv slideDiv4">
                  <h1>Booster Income</h1>
                  <p>
                    3 ID direct within 7 days with the same amount or above{" "}
                  </p>
                  <p>
                    Roi double 0.70 X2= <span>1.40$ </span>
                    daily
                  </p>
                </div>
              </Container>
            </div>
            <div>
              <Container fluid className="p-0">
                <div className="slideDiv slideDiv5">
                  <h1>Daily Team Bonus</h1>
                  <p>
                    1 to 10 level <span>10%</span> and 11 to 20 level{" "}
                    <span>5%</span>
                  </p>
                  <h5></h5>
                </div>
              </Container>
            </div>
            <div>
              <Container fluid className="p-0">
                <div className="slideDiv slideDiv6">
                  <h5>Royalty Income CTO 5%</h5>
                  <h5>Upline Bonus 5%</h5>
                  <h5>Daily Achievement Bonus 1-2%</h5>
                  <h5>Daily Achievement Bonus 2-2%</h5>
                  <h5>Daily Top Investor Bonus 1%</h5>
                  <h5>Global Team Building Bonus 1-20 level</h5>
                  <h5>Earning $1048575</h5>
                </div>
              </Container>
            </div>
          </OwlCarousel>
        </div>
        {/* <a className="pdfDiv" href={PDF} target="_black">
          <i><BsInfoCircleFill /> </i>
          <p>More Info</p>
        </a> */}
      </div>
      <Container>
        <div className="HomeTableLogoDiv">
          <img src={Logo} alt="" />
          <div>
            <a className="loginBtn" style={{ marginRight: "10px" }} href={PDF} target="_black">
              More Info
            </a>
            <Link className="loginBtn" onClick={automaticLoginDB}>
              Login
            </Link>
            <Link
              to="/register"
              className="loginBtn"
              style={{ margin: "0px 10px" }}
            >
              Register
            </Link>
            <ConnectButton />
          </div>
        </div>
      </Container>
      <Marquee className="marq">
        <h4>DAILY ACHIEVER 1</h4>
        {marquee1.map((x, i) => (
          <tr>
            <td>Star-{i + 1}</td>
            <td>Address : {Change(x.address)}</td>
            <td>Amount : {x.amount}</td>
          </tr>
        ))}
        <h4>DAILY ACHIEVER 2</h4>
        {marquee2.map((x, i) => (
          <tr>
            <td>Star-{i + 1}</td>
            <td>Address : {Change(x.address)}</td>
            <td>Amount : {x.amount}</td>
          </tr>
        ))}
        <h4>TOP INVESTOR OF THE DAY </h4>
        {marquee3.map((x, i) => (
          <tr>
            <td>Star-{i + 1}</td>
            <td>Address : {Change(x.address)}</td>
            <td>Amount : {x.amount}</td>
          </tr>
        ))}
      </Marquee>
      <h4 className="homeHeading m-0 mt-4">Daily Achiever 1</h4>
      <Container
        className="p-2 pt-4 scrollbar-none"
        style={{ overflowX: "scroll" }}
      >
        <table className=" homeTableTB">
          <thead>
            <tr>
              <th>Star</th>
              <th>Address</th>
              <th>Directs</th>
              <th>$</th>
            </tr>
          </thead>
          <tbody>
            {tableData1.map((x, i) => (
              <tr>
                <td>Star {i + 1}</td>
                <td>{Change(x.address)}</td>
                <td>{x.amount}</td>
                <td>{x.income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <h4 className="homeHeading m-0 mt-4">Daily Achiever 2</h4>
      <Container
        className="p-2 pt-4 scrollbar-none"
        style={{ overflowX: "scroll" }}
      >
        <table className=" homeTableTB">
          <thead>
            <tr>
              <th>Star</th>
              <th>Address</th>
              <th>Direct Business</th>
              <th>$</th>
            </tr>
          </thead>
          <tbody>
            {tableData2.map((x, i) => (
              <tr>
                <td>Star {i + 1}</td>
                <td>{Change(x.address)}</td>
                <td>{x.amount}</td>
                <td>{x.income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <h4 className="homeHeading m-0 mt-4">Top Investor of the Day</h4>
      <Container
        className="p-2 pt-4 scrollbar-none"
        style={{ overflowX: "scroll" }}
      >
        <table className=" homeTableTB">
          <thead>
            <tr>
              <th>Address</th>
              <th>Self Investment</th>
              <th>$</th>
            </tr>
          </thead>
          <tbody>
            {tableData3.map((x, i) => (
              <tr>
                <td>{Change(x.address)}</td>
                <td>{x.amount}</td>
                <td>{x.income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>

    </section>
  );
};

export default HomeTable;
