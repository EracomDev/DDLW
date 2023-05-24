import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import { GiStarSwirl } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { BsPersonPlusFill, BsLightningFill } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { GiTakeMyMoney } from "react-icons/gi";
import { ethers } from "ethers";
import { MdAccountBalanceWallet } from "react-icons/md";
import PoolCard from "../../Component/PoolCard/PoolCard";
import Loader from "../../Component/Loader";
import CopyToClipboard from "../../Common/CopyToClipboard";
import Change from "../../Common/StringToSub";
import { IoCopyOutline } from "react-icons/io5";
import { SiStartrek } from "react-icons/si";
import Tree from "./../../Images/tree.png";
import { FaUserAlt, FaLink } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import axios from "axios";
import GetBalance from "../../Common/GetBalance";
import GetMaticBalance from "../../Common/GetMaticBalance";
import ContractDetails from "../../Contracts/ContractDetails";
import { useNavigate } from "react-router-dom";
import { ApiPaths } from "../../API";
const Dashboard = () => {
  const navigate = useNavigate();
  const { BigInt } = window;
  const { ethereum } = window;
  const [incomes, setIncomes] = useState([]);
  const [profile, setProfile] = useState([]);
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [depositValue, setDepositValue] = useState();
  const [walletAddress, setWalletAddress] = useState();
  const [maticBalance, setMaticBalace] = useState();
  const [balance, setBalance] = useState();
  const [depositError, setDepositError] = useState("");
  var x = 0;
  const acc = localStorage.getItem("viewId");
  let uplineId = localStorage.getItem("upline");
  const requestAccount = localStorage.getItem("account");
  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    let dashboardApi = ApiPaths.Dashboard + acc;
    console.log("dashboardApi", dashboardApi);
    try {
      axios({
        method: "get",
        url: dashboardApi,
      })
        .then(function (response) {
          console.log(response);
          setIncomes(response?.data?.incomes);
          setProfile(response?.data?.profile);
          Fetch(response);
          setLoading(false);
        })
        .catch(function (response) {
          console.log(response);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function Fetch(apiResponse) {
    // let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    // setWalletAddress(accounts[0]);
    setWalletAddress(requestAccount);

    const baldata = await GetBalance(apiResponse?.data?.profile?.username);
    // console.log('baldata', baldata);
    setBalance(baldata);

    const bnbBal = await GetMaticBalance(apiResponse?.data?.profile?.username);
    // console.log('bnbBal', bnbBal);
    setMaticBalace(bnbBal);
  }
  async function CheckBeforeDeposit() {
    setLoading(true);
    // let account = await ethereum.request({ method: 'eth_requestAccounts' });
    let balance = await GetBalance(requestAccount);
    let walletBalance = parseFloat(balance / 1e18);
    // console.log('balance', balance);
    if (uplineId == 1) {
      if (walletBalance >= depositValue) {
        if (depositValue < 100 || depositValue % 100 != 0) {
          setDepositError("Amount should be multiple of 100");
          setLoading(false);
        } else {
          setDepositError("");
          // let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          // console.log('2', accounts[0])
          // console.log('3', depositValue)
          try {
            axios({
              method: "post",
              url: ApiPaths.DepositApi,
              data: {
                username: requestAccount,
                amount: depositValue,
              },
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                // console.log('deposit', response);
                increaseAllowance(response.data);
              })
              .catch(function (response) {
                console.log("deposit", response);
                setLoading(false);
              });
          } catch (e) {
            console.log(e);
            setLoading(false);
          }
        }
      } else {
        setDepositError("Insufficient Fund");
        setLoading(false);
      }
    } else {
      alert("Login with your account");
      setLoading(false);
    }
  }
  async function increaseAllowance(regData) {
    let amount = BigInt(regData?.total_amount * 1e18);
    setLoading(true);
    const { ethereum } = window;
    const chekBal = true;
    if (chekBal == true) {
      if (ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const busdInstance = new ethers.Contract(
            ContractDetails.BUSD,
            ContractDetails.BUSD_ABI,
            signer
          );
          console.log("Instance : " + busdInstance);

          let inc = await busdInstance.increaseAllowance(
            ContractDetails.contract,
            amount,
            { value: ethers.utils.parseEther("0") }
          );
          await inc.wait();
          // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          register(regData);
          console.log("Tr Hash : " + inc.hash);
        } catch (error) {
          setLoading(false);
          console.log(error);
          setMsg(<span className="text-danger">Something Went Wrong</span>);
        }
      } else {
        setMsg(<span className="text-danger">Wallet Not Exist.</span>);
        setLoading(false);
      }
    } else {
      setMsg(<span className="text-danger">Insufficient Funds</span>);
      setLoading(false);
    }
  }

  async function register(apidata) {
    let add = JSON.parse(apidata.address);
    let amtval = JSON.parse(apidata.incomes);
    var amt = amtval[0] * 1e18;
    let amtArray = [];
    for (let i = 0; i < amtval.length; i++) {
      let kk = BigInt(amtval[i] * 1e18);
      amtArray.push(kk);
    }
    console.log("111", ContractDetails.BUSD);
    console.log("222", add);
    console.log("333", amtArray);
    setLoading(true);
    try {
      const userId = true;
      const { ethereum } = window;
      if (ethereum) {
        if (userId > 0) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contractinstance = new ethers.Contract(
            ContractDetails.contract,
            ContractDetails.contractABI,
            signer
          );
          console.log("Instance : " + contractinstance);
          let inc = await contractinstance.shareContribution(
            add,
            amtArray,
            ContractDetails.BUSD,
            { value: ethers.utils.parseEther("0") }
          );

          await inc.wait();
          console.log("Tr Hash : " + inc.hash);
          alert("success");
          try {
            axios({
              method: "post",
              url: ApiPaths.VerifyOrder,
              data: {
                order_id: apidata.order_id,
              },
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                console.log("verify", response);
                setLoading(false);
              })
              .catch(function (response) {
                console.log("verify", response);
                setLoading(false);
              });
          } catch (e) {
            console.log(e);
          }

          setLoading(false);
        } else {
          setLoading(false);
          setMsg(<span className="text-danger">Sponsor Not Exist</span>);
        }
      }
    } catch (error) {
      setMsg(<span className="text-danger">Something went wrong</span>);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      {loading === true ? <Loader /> : ""}
      <div className="topColor">
        <h4>Dashboard</h4>
      </div>
      <Row className="p-2" style={{ marginTop: "-90px" }}>
        <Col lg="12">
          <Row>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Direct Bonus"
                price={parseFloat(incomes?.directIncome)}
                bgColor="#AB47BC"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Daily Cashback"
                price={parseFloat(incomes?.roiIncome)}
                bgColor="#9FCC2E"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Booster Income"
                price={parseFloat(incomes?.boosterIncome)}
                bgColor="#FA9F1B"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Level Income"
                price={parseFloat(incomes?.levelIncome)}
                bgColor="#03A9F4"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Royality Income"
                price={parseFloat(incomes?.royaltyIncome)}
                bgColor="#9FCC2E"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Upline Bonus"
                price={parseFloat(incomes?.uplineIncome)}
                bgColor="#9FCC2E"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Achievement Bonus 1"
                price={parseFloat(incomes?.cto1Income)}
                bgColor="#9FCC2E"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Achievement Bonus 2"
                price={parseFloat(incomes?.cto2Income)}
                bgColor="#9FCC2E"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Investor Bonus"
                price={parseFloat(incomes?.cto3Income)}
                bgColor="#9FCC2E"
              />
            </Col>
            <Col lg="4" md="6" className="py-1">
              <PoolCard
                img={GiStarSwirl}
                title="Team Building Bonus"
                price={parseFloat(incomes?.teamMaintenceIncome)}
                bgColor="#9FCC2E"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="px-2">
        <Col lg="8" md="8">
          <Container id="detailCardContainer" className="mb20">
            <div className="detailCard">
              <p>
                <i>
                  <BiTime />
                </i>
                Platform Running time :
              </p>
              <span>{profile?.startTime}</span>
            </div>
            <div className="detailCard">
              <p>
                <i>
                  <TbCalendarTime />
                </i>
                Joining Time :{" "}
              </p>
              <span>{profile?.added_on}</span>
            </div>
            <div className="detailCard">
              <p>
                <i>
                  <BsPersonPlusFill />
                </i>
                Referrals :
              </p>
              <div>
                <span id="dashboardWalletAddress">{incomes?.directs}</span>
              </div>
            </div>
            <div className="detailCard">
              <p>
                <i>
                  <ImConnection />
                </i>
                Connection Status :
              </p>
              {walletAddress != null ? (
                <div>
                  <span className="d-none" id="dashboardWalletAddress">
                    {walletAddress}
                  </span>
                  <span className="text-success" style={{ color: "#23d551" }}>
                    {Change(walletAddress)}{" "}
                    <i
                      onClick={() => CopyToClipboard("dashboardWalletAddress")}
                    >
                      <IoCopyOutline />
                    </i>
                  </span>
                </div>
              ) : (
                <span className="text-success" style={{ color: "red" }}>
                  Not Connected
                </span>
              )}
            </div>
            <div className="detailCard">
              <p>
                <i>
                  <MdAccountBalanceWallet />
                </i>
                BNB Balance :
              </p>
              <span>{parseFloat(maticBalance / 1e18).toFixed(5)}</span>
            </div>
            <div className="detailCard">
              <p>
                <i>
                  <MdAccountBalanceWallet />
                </i>
                USDT Balance :
              </p>
              <span>{parseFloat(balance / 1e18).toFixed(2)}</span>
            </div>
            <div className="detailCard">
              <p>
                <i>
                  <GiTakeMyMoney />
                </i>
                My Deposit :
              </p>
              <div>
                <span>
                  <span>$ </span>
                  {parseFloat(profile?.totalDeposit).toFixed(2)}
                </span>
                <span></span>
              </div>
            </div>

            <div className="detailCard">
              <p>
                <i>
                  <MdAccountBalanceWallet />
                </i>
                Wallet Balance :
              </p>
              <span>{incomes.main_wallet}</span>
            </div>
          </Container>
        </Col>
        <Col lg="4" md="4" className="d-grid gap-20">
          <div className="card card-body">
            <img src={Tree} id="tree"></img>
            <center>
              <span className="depositHeading" style={{ fontSize: "20px" }}>
                Make Deposit
              </span>
            </center>
            <div className="form-group">
              <label htmlFor="depositAmount">Amount*</label>
              <input
                type="text"
                id="depositAmount"
                value={depositValue}
                onChange={(e) => setDepositValue(e.target.value)}
                className="inputMoney"
                placeholder="Enter Amount"
              />
              <p id="error">{depositError}</p>
            </div>
            <div className="form-group">
              <p id="note">
                Note: The deposit Value Should Be Greater Or Equal Then Your
                Previous Deposit
              </p>
              <center>
                <button
                  className="btn btn-warning depositBtn"
                  onClick={CheckBeforeDeposit}
                >
                  Deposit
                </button>
              </center>
            </div>
          </div>
        </Col>
      </Row>

      <Container fluid className="p-2">
        <div id="detailCardContainer">
          {/* <div className="detailCard">
            <p>
              <i>
                <MdAccountBalanceWallet />
              </i>
              BNB Balance :
            </p>
            <span>{parseFloat(maticBalance / 1e18).toFixed(5)}</span>
          </div>*/}
          {/* <div className="detailCard">
            <p>
              <i>
                <FaUserAlt />
              </i>
              User Id :
            </p>
            <span>{Change(profile?.username)}</span>
          </div> */}
          <div className="detailCard">
            <p className="d-none " id="dashUserId">
              {profile?.username}
            </p>
            <p>
              <i>
                <FaUserAlt />
              </i>
              User Id :
            </p>
            <span>
              {Change(profile?.username)}
              <i>
                <IoCopyOutline onClick={() => CopyToClipboard("dashUserId")} />
              </i>
            </span>
          </div>
          <div className="detailCard">
            <p>
              <i>
                <IoIosPeople />
              </i>
              My Team :
            </p>
            <span>{incomes?.generation}</span>
          </div>
          <div className="detailCard">
            <p>
              <i>
                <SiStartrek />
              </i>
              Trigger Status :
            </p>
            {profile?.trigger_status === true ? (
              <span>Enable</span>
            ) : (
              <span>Disable</span>
            )}
          </div>
          <div className="detailCard">
            <p>
              <i>
                <MdAccountBalanceWallet />
              </i>
              My Orders :
            </p>
            <span>{profile?.my_orders}</span>
          </div>
          {/* <div className="detailCard">
            <p>
              <i>
                <BsPersonPlusFill />
              </i>
              Sponsor :
            </p>
            <span id="refLink">
              {Change(profile?.sponsor?.username)}
            </span>
          </div> */}
          <div className="detailCard">
            <p className="d-none " id="dashSponsor">
              {profile?.sponsor?.username}
            </p>
            <p>
              <i>
                <BsPersonPlusFill />
              </i>
              Sponsor :
            </p>
            <span>
              {Change(profile?.sponsor?.username)}
              <i>
                <IoCopyOutline onClick={() => CopyToClipboard("dashSponsor")} />
              </i>
            </span>
          </div>
          <div className="detailCard">
            <p>
              <i>
                <BsLightningFill />
              </i>
              Booster Status :
            </p>
            <span id="refLink">
              {incomes.boosterIncome == 0 ? "Pending" : "Achieve"}
            </span>
          </div>
          <div className="detailCard">
            <p>
              <i>
                <BsPersonPlusFill />
              </i>
              My Directs :
            </p>
            <span className="d-none" id="refLink">
              {incomes?.directs}
            </span>
            <span>{incomes?.directs} </span>
          </div>
          <div className="detailCard">
            <p className="d-none " id="myLink">
              {profile?.id != 0
                ? window.location.origin + "/register?ref=" + profile?.username
                : "Not Register"}
            </p>
            <p>
              <i>
                <FaLink />
              </i>
              Referral Link :
            </p>
            <span>
              {Change(
                window.location.origin + "/register?ref=" + profile?.username
              )}{" "}
              <i>
                <IoCopyOutline onClick={() => CopyToClipboard("myLink")} />
              </i>
            </span>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};
export default Dashboard;
