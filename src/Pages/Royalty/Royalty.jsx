import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Royalty.css";
import Loader from "../../Component/Loader";
import axios from "axios";
import { ApiPaths } from "../../API";

const Royalty = () => {
  const [loading, setLoading] = useState(false);
  const [royaltyData, setRoyaltyData] = useState([]);
  const acc = localStorage.getItem("viewId");

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    setLoading(true);
    let MyApi = ApiPaths.Royalty + acc;
    try {
      axios({
        method: "get",
        url: MyApi,
      })
        .then(function (response) {
          console.log("Royalty", response);
          setRoyaltyData(response.data);
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
  return (
    <>
      {loading === true ? <Loader /> : ""}
      <h4 className="dashboardHeading" style={{ marginTop: "20px" }}>
        Royalty
      </h4>
      <Container
        fluid
        className=" royaltyContainer"
        style={{ overflowX: "scroll" }}
      >
        <table className="tableSection">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Strong Leg</th>
              <th>Other Leg</th>
              <th>Royalty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Silver</td>
              <td>{royaltyData.topLeg} / 25,000</td>
              <td>{royaltyData.otherLeg} / 25,000</td>
              <td>1%</td>
              {royaltyData.rank1 === 0 ? (
                <td>Pending</td>
              ) : (
                <td className="bgGreen">Achieve</td>
              )}
            </tr>
            <tr>
              <td>Gold</td>
              <td>{royaltyData.topLeg} / 50,000</td>
              <td>{royaltyData.otherLeg} / 50,000</td>
              <td>1%</td>
              {royaltyData.rank2 === 0 ? (
                <td>Pending</td>
              ) : (
                <td className="bgGreen">Achieve</td>
              )}
            </tr>
            <tr>
              <td>Rubi</td>
              <td>{royaltyData.topLeg} / 1,00,000</td>
              <td>{royaltyData.otherLeg} / 1,00,000</td>
              <td>1%</td>
              {royaltyData.rank3 === 0 ? (
                <td>Pending</td>
              ) : (
                <td className="bgGreen">Achieve</td>
              )}
            </tr>
            <tr>
              <td>Emrald</td>
              <td>{royaltyData.topLeg} / 5,00,000</td>
              <td>{royaltyData.otherLeg} / 5,00,000</td>
              <td>1%</td>
              {royaltyData.rank4 === 0 ? (
                <td>Pending</td>
              ) : (
                <td className="bgGreen">Achieve</td>
              )}
            </tr>
            <tr>
              <td>Diamond</td>
              <td>{royaltyData.topLeg} / 25,00,000</td>
              <td>{royaltyData.otherLeg} / 25,00,000</td>
              <td>1%</td>
              {royaltyData.rank5 === 0 ? (
                <td>Pending</td>
              ) : (
                <td className="bgGreen">Achieve</td>
              )}
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default Royalty;
