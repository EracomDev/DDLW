import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Loader from "../../Component/Loader";
import "./Withdraw.css";
import axios from "axios";
import { ApiPaths } from "../../API";
const Withdraw = () => {
  const { ethereum } = window;
  const acc = localStorage.getItem("viewId");
  const [loading, setLoading] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState();
  const [withdrawalError, setWithdrawalError] = useState("");
  var uplineId = localStorage.getItem("upline");
  const requestAccount = localStorage.getItem("account");
  useEffect(() => {
    fatch_Details();
  }, []);

  async function fatch_Details() {
    setLoading(true);
    let MyWithdrawalApi = ApiPaths.WithdrawalApiFetch + acc;
    try {
      axios({
        method: "get",
        url: MyWithdrawalApi,
      })
        .then(function (response) {
          console.log(response);
          setWithdrawalData(response?.data);
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

  async function Withdrawal() {
    if (uplineId == 1) {
      setLoading(true);
      // let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (withdrawalAmount % 10 === 0) {
        setWithdrawalError("");
        try {
          axios({
            method: "post",
            url: ApiPaths.WithdrawalApi,
            data: {
              username: requestAccount,
              amount: withdrawalAmount,
            },
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              console.log("withdraw response", response);
              fatch_Details();
              if (response.data.res == "success") {
                alert("Withdrawal Success");
              } else {
                alert(response?.data?.message);
              }
              setLoading(false);
            })
            .catch(function (response) {
              console.log("withdraw catch", response);
              setLoading(false);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        setWithdrawalError("Amount should be multiple of $10");
        setLoading(false);
      }
    } else {
      alert("Login with your account");
    }
  }

  return (
    <React.Fragment>
      {loading === true ? <Loader /> : ""}
      <Container className="p-4">
        <h4 className="dashboardHeading">Withdraw</h4> 3``
        <Row>
          <Col lg="6" className="mt-4">
            <div className="card card-body">
              <div className="withdrawHeading">
                <p className="">Amount</p>
                <h5>
                  <span>$ </span>
                  {withdrawalData?.main_wallet}
                </h5>
              </div>
              <div className="form-group">
                <label htmlFor="FreezeAmount">Amount*</label>
                <input
                  type="number"
                  id="FreezeAmount"
                  className="inputMoney"
                  placeholder="Enter Amount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
                <p id="error">{withdrawalError}</p>
              </div>
              <div className="form-group">
                <center>
                  <button
                    className="btn btn-warning depositBtn"
                    onClick={Withdrawal}
                  >
                    Withdrawal
                  </button>
                </center>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default Withdraw;
