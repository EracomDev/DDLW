import React, { useEffect, useState } from "react";
import "./MyTeam.css";
import { Container, Row, Col } from "react-bootstrap";
import { BiTime } from "react-icons/bi";
import { ImConnection } from "react-icons/im";
import Loader from "./../../Component/Loader";
import axios from "axios";
import { ApiPaths } from "../../API";
const MyTeam = () => {
  const { ethereum } = window;
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [acc, setAccount] = useState(localStorage.getItem("viewId"));
  const [teamData, setTeamData] = useState([]);

  const requestAccount = localStorage.getItem("account");
  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    let MyTeamApi = ApiPaths.Team + acc;
    try {
      axios({
        method: "get",
        url: MyTeamApi,
      })
        .then(function (response) {
          console.log(response);
          setTeamData(response.data);
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
    try {
      // let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(requestAccount);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      {loading === true ? <Loader /> : null}
      <div className="LatestDepositDiv">
        <h4 className="dashboardHeading">my team</h4>
        <Container id="detailCardContainer">
          <div className="detailCard">
            <p>
              <i>
                <BiTime />
              </i>
              Platform Running time :
            </p>
            <span>{teamData.startTime}</span>
          </div>
          <div className="detailCard">
            <p>
              <i>
                <ImConnection />
              </i>
              Connection status :
            </p>
            {walletAddress !== null ? (
              <span style={{ color: "green" }}>{walletAddress}</span>
            ) : (
              <span style={{ color: "red" }}>Wallet not Connected.</span>
            )}
          </div>
        </Container>
        <Container>
          <Row id="myTeamRow">
            <Col xs="6" lg="3" id="myTeamCol">
              <h1 style={{ color: "#1f818b" }}>{teamData.directs}</h1>
              <p>Direct Referrals</p>
            </Col>
            <Col xs="6" lg="3" id="myTeamCol">
              <h1 style={{ color: "green" }}>$ {teamData.myBusiness}</h1>
              <p>My Business </p>
            </Col>
            <Col xs="6" lg="3" id="myTeamCol">
              <h1 style={{ color: "rebeccapurple" }}>$ {teamData.myIncome}</h1>
              <p>My Income </p>
            </Col>
            <Col xs="6" lg="3" id="myTeamCol">
              <h1 style={{ color: "orange" }}>{teamData.generation}</h1>
              <p>Downline</p>
            </Col>
            <Col xs="6" lg="3" id="myTeamCol">
              <h1 style={{ color: "blue" }}>$ {teamData.myDeposits}</h1>
              <p>Sales</p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyTeam;
