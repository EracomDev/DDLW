import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loader from "../../Component/Loader";
import axios from "axios";
import { ApiPaths } from "../../API";
const DepositDetails = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const acc = localStorage.getItem("viewId");
  let cntr = 0;
  useEffect(() => {
    fatch_Details();
  }, []);

  async function fatch_Details() {
    setLoading(true);
    let MyTeamApi = ApiPaths.Orders + acc;
    console.log(MyTeamApi);
    try {
      axios({
        method: "get",
        url: MyTeamApi,
      })
        .then(function (response) {
          console.log("order details", response);
          setOrders(response?.data?.orders);
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
    <React.Fragment>
      {loading === true ? <Loader /> : ""}
      <div className="LatestDepositDiv">
        <h4 className="dashboardHeading">Deposit details</h4>
        <Container className="p-0 pt-4" style={{ overflowX: "scroll" }}>
          <table className="tableSection">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Amount</th>
                <th>Date & Time</th>
                {/* <th>Action</th>   */}
              </tr>
            </thead>
            <tbody>
              {orders?.map((x, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>$ {x.order_amount}</td>
                  <td>{x.added_on}</td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DepositDetails;
