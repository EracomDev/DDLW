import React, { useEffect, useState } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import Loader from "../../Component/Loader";
import IdToAddress from "../../Common/IdToAddress";
import GetBalance from "../../Common/GetBalance";
import GetMaticBalance from "../../Common/GetMaticBalance";
import UserInfo from "../../Common/UserInfo";
import axios from "axios";
import { ApiPaths } from "../../API";
import ContractDetails from "../../Contracts/ContractDetails";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { BigInt } = window;
  const [spons, setSponsor] = useState("");
  const contract = useSelector((state) => state.contract.value.contract);
  const contractABI = useSelector((state) => state.contract.value.contractABI);
  const [loading, setLoading] = useState(false);
  const [registerAmout, setRegisterAmout] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const { ethereum } = window;
  useEffect(() => {
    let len = window.location.href.length;
    const after = window.location.search.slice(
      window.location.search.indexOf("=") + 1
    );
    console.log("url here", after);
    setSponsor(after);
  }, []);

  async function CheckBalance() {
    try {
      let accounts = await ethereum.request({ method: "eth_requestAccounts" });

      const balance = await GetBalance(accounts[0]);
      let DaiBal = String(balance / 1e18);
      console.log("balance", DaiBal);

      // const maticBal = await GetMaticBalance(accounts[0]);
      // let MaticBal = String(maticBal / 1e18)
      // console.log("maticBal", MaticBal);

      if (DaiBal >= 25) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      setMsg(<span className="text-danger">Something Went Wrong</span>);
    }
  }

  const CheckSponsorExist = async () => {
    let res;
    try {
      axios({
        method: "post",
        url: ApiPaths.CheckSposorExist,
        data: {
          u_sponsor: spons,
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log("user exist", response);
        })
        .catch(function (response) {
          console.log(response);
        });
      return;
    } catch (e) {
      console.log(e);
    }
  };
  async function CheckBeforeRegister() {
    setLoading(true);
    if (spons.length > 0) {
      if (registerAmout < 100 || registerAmout % 100 != 0) {
        setMsg("Amount should be multiple of 100");
        setLoading(false);
      } else {
        try {
          setMsg("");
          let accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          let usdtBal = await GetBalance(accounts[0]);
          let usdtBalance = parseFloat(usdtBal / 1e18);
          // console.log('usdtBalance', usdtBalance);
          //console.log('1', spons)
          // console.log('2', accounts[0])
          // console.log('3', registerAmout)
          let ttlAmount = parseFloat(registerAmout) + 10;
          if (ttlAmount < usdtBalance) {
            try {
              axios({
                method: "post",
                url: ApiPaths.RegisterApi,
                data: {
                  u_sponsor: spons,
                  username: accounts[0],
                  amount: registerAmout,
                },
                headers: { "Content-Type": "multipart/form-data" },
              })
                .then(function (response) {
                  console.log(response);
                  if (response.data.res == "fail") {
                    setLoading(false);
                    setMsg(response.data.message);
                  } else {
                    increaseAllowance(response.data);
                  }
                })
                .catch(function (response) {
                  console.log(response);
                  setLoading(false);
                });
            } catch (e) {
              console.log(e);
            }
          } else {
            setMsg("Insufficient Funds");
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      }
    } else {
      setMsg("Invalid Sponsor Address");
      setLoading(false);
    }
  }
  async function increaseAllowance(regData) {
    let amount = BigInt(regData?.total_amount * 1e18);
    setLoading(true);
    const { ethereum } = window;
    if (spons.length > 0) {
      if (1 > 0) {
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
              const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });
              localStorage.setItem("viewId", accounts[0]);
              localStorage.setItem("loginBy", "automatic");
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
      } else {
        setLoading(false);
        setMsg(<span className="text-danger">Sponsor Not Exist</span>);
      }
    } else {
      setLoading(false);
      setMsg(<span className="text-danger">Enter Sponsor ID</span>);
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
      // let userEx = await CheckExist();
      // if (userEx == true) {
      // const userInfo = await UserInfo(spons);
      // const userId = String(userInfo?.userInfo?.id)
      const userId = 1;
      // console.log('userInfo', userInfo)
      // const userDeposit = parseFloat(userInfo?.userInfo?.totalDeposit / 1e18);
      // alert(userDeposit)
      // console.log('userInfo', userId)
      const { ethereum } = window;
      if (ethereum) {
        if (userId > 0) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contractinstance = new ethers.Contract(
            contract,
            contractABI,
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

          localStorage.setItem("upline", 1);
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          localStorage.setItem("loginBy", "automatic");

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
                localStorage.setItem("viewId", parseInt(response.data.user_id));
                navigate("/dashboard");
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
      // } else {
      //     setLoading(false);
      //     setMsg(<span className='text-danger'>User Already Exist</span>);
      // }
    } catch (error) {
      setMsg(<span className="text-danger">Something went wrong</span>);
      console.log(error);
      setLoading(false);
    }
  }

  const [msg, setMsg] = useState("");
  useEffect(() => {
    const viewInput = document.getElementById("sponsor");
    viewInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("registerBtn").click();
      }
    });
  }, []);

  async function CalculateTotalAmount(e) {
    setRegisterAmout(e.target.value);
    if (e.target.value.length === 0) {
      setTotalAmount(0);
    } else if (e.target.value % 100 === 0) {
      setTotalAmount(parseFloat(e.target.value) + 10);
    } else {
      setTotalAmount(0);
    }
  }
  return (
    <>
      {loading === true ? <Loader /> : ""}
      <span className="text-danger">{msg}</span>
      <div className="connectRegisterLeft">
        <label for="sponsor">Sponsor*</label>
        <input
          name="sponsor"
          type="text"
          placeholder="Enter Sponsor ID."
          value={spons}
          onChange={(e) => setSponsor(e.target.value)}
          id="sponsor"
        />
        <label for="amount">Amount*</label>
        <input
          name="amount"
          type="text"
          placeholder="Enter Amount"
          value={registerAmout}
          onChange={(e) => CalculateTotalAmount(e)}
          id="sponsor"
        />
        <p className="note">
          Amount should be multiple of 100 and Total payable amount will be 10$
          extra for team building bonus
        </p>
        <div className="totalRegisterAmountDiv">
          <p>Total Payable Amount</p>
          <p>{totalAmount}</p>
        </div>
        <div className="registerButtons">
          <button
            className="viewing bgOrange"
            id="registerBtn"
            onClick={CheckBeforeRegister}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
