// const APiArray  = {apipath: 'https://test.ddlw.io/API/' , RegisterApi: 'https://test.ddlw.io/API/register',LoginApi:'https://test.ddlw.io/API/register/login', CheckSposorExist:'https://test.ddlw.io/API/register/check_sponsor_exist' , DepositApi:'https://test.ddlw.io/API/register/upgrade' , VerifyOrder:'https://test.ddlw.io/API/register/verify_order', WithdrawalApi:'https://test.ddlw.io/API/withdrawal' }

// export const APiData = APiArray
 

// export default APiData

const basePath = 'https://test.ddlw.io/API/api';

export const ApiPaths = {
    RegisterApi: `${basePath}/register/`,
    LoginApi: `${basePath}/register/login/`,
    CheckSposorExist: `${basePath}/register/check_sponsor_exist/`,
    DepositApi:`${basePath}/register/upgrade/`,
    VerifyOrder: `${basePath}/register/verify_order/`,
    WithdrawalApi:`${basePath}/withdrawal`,
    WithdrawalApiFetch:`${basePath}/withdrawal/data?id=`,
    TopUsers: `${basePath}/topusers/data/`,
    Orders: `${basePath}/orders/data?id=`,
    Team: `${basePath}/team/data?id=`,
    Royalty: `${basePath}/royalty/data?id=`,
    Dashboard: `${basePath}/dashboard?id=`,
    TeamBusiness: `${basePath}/team/genBusiness?id=`,

}