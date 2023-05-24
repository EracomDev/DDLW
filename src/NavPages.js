import React from 'react'
import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard'
import Deposit from './Pages/Deposit/Deposit'
import Withdraw from './Pages/Withdraw/Withdraw';
import SplitAccount from "./Pages/SplitAccount/SplitAccount";
import LatestDeposit from './Pages/LatestDeposit/LatestDeposit'
import MyTeam from './Pages/MyTeam/MyTeam'
import DepositDetails from './Pages/DepositDetails/DepositDetails'
import Royalty from './Pages/Royalty/Royalty';
import TeamBusiness from './Pages/TeamBusiness/TeamBusiness';
const NavPages = () => {
    return (
        <React.Fragment>
            <section style={{paddingTop:"60px"}}>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/deposit" element={<Deposit />}></Route>
                    <Route path="/withdraw" element={<Withdraw />}></Route>
                    <Route path="/split-account" element={<SplitAccount />}></Route>
                    <Route path="/latest-deposit" element={<LatestDeposit />}></Route>
                    <Route path="/myteam" element={<MyTeam />}></Route>
                    <Route path="/deposit-details" element={<DepositDetails />}></Route>
                    <Route path="/royalty" element={<Royalty />}></Route>
                    <Route path="/team_business" element={<TeamBusiness />}></Route>
                     
                </Routes>
            </section>
        </React.Fragment>
    )
}

export default NavPages