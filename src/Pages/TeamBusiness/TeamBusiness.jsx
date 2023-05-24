import React from 'react'
import { useState } from 'react'
import Loader from '../../Component/Loader';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { ApiPaths } from '../../API';

const TeamBusiness = () => {
    const [teamBus, setTeamBus] = useState([]);
    const [loading, setLoading] = useState(false);
    const acc = localStorage.getItem("viewId");
    useEffect(() => {
        fatch_Details();
    }, [])

    async function fatch_Details() {
        setLoading(true);
        let MyTeamApi = ApiPaths.TeamBusiness + acc;
        console.log(MyTeamApi);
        try {
            axios({
                method: "get",
                url: MyTeamApi,
            })
                .then(function (response) {
                    console.log("order details", response);
                    // setOrders(response?.data?.orders);
                    setTeamBus(response.data.team)
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
                <h4 className="dashboardHeading">Team Business</h4>
                <Container className="p-0 pt-4" style={{ overflowX: "scroll" }}>
                    <table className="tableSection">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Users</th>
                                <th>Business</th>
                                {/* <th>Action</th>   */}
                            </tr>
                        </thead>
                        <tbody>
                            {teamBus?.map((x, i) => (
                                <tr key={i}>
                                    <td>{x.level}</td>
                                    <td>{x.users}</td>
                                    <td>{x.business}</td>{" "}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default TeamBusiness