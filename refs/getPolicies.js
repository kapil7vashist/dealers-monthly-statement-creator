import policies from "./policies.js";
import generatePolicyData from "./generatePolicyData.js";
const policylist = await policies();

// console.log(policylist[0][30]);



let worksheet = [['Certificate No.','Period of Insurance','Name of Master Policy Holder','Name of Certificate Holder','DOB','Gender','Mobile','Email','Address','City','State','Pincode','Engine No.','Chassis No.','Nominee Name','IMD/Service Provider Code','IMD/Service Provider Name','Master Dealer Name','Dealer Type','Payment Terms','Plan','Net Receivable with TDS','Total Dealer(s) Benefit','Paid By','Month','Created At','Policy Type','Status']];

const getPolicies = (ids) => {
    // console.log('New Call ',ids);
    let count = 0;
    let masterName;
    for (let i = 0; i < policylist.length; i++) {
        let policyData = [];
        count=0;
        masterName = '';
        if(ids.includes(policylist[i][30]))            
        {
            count++;
            masterName = policylist[i][29];
            policyData.push(policylist[i][1]);
            policyData.push(policylist[i][4]);
            policyData.push(policylist[i][5]);
            policyData.push(policylist[i][6]);
            policyData.push(policylist[i][7]);
            policyData.push(policylist[i][8]);
            policyData.push(policylist[i][9]);
            policyData.push(policylist[i][10]);
            policyData.push(policylist[i][11]);
            policyData.push(policylist[i][12]);
            policyData.push(policylist[i][13]);
            policyData.push(policylist[i][14]);
            policyData.push(policylist[i][22]);
            policyData.push(policylist[i][23]);
            policyData.push(policylist[i][24]);
            policyData.push(policylist[i][30]);
            policyData.push(policylist[i][29]);
            policyData.push(policylist[i][35]);
            policyData.push(policylist[i][36]);
            policyData.push(policylist[i][37]);
            policyData.push(policylist[i][39]);
            policyData.push(policylist[i][47]);
            policyData.push(policylist[i][48]);
            policyData.push(policylist[i][69]);
            policyData.push(policylist[i][70]);
            policyData.push(policylist[i][71]);
            policyData.push(policylist[i][79]);
            policyData.push(policylist[i][80]);
            worksheet.push(policyData);
            policyData = [];
        }
    }
    if (count != 0) {
        generatePolicyData(worksheet,masterName);
    }
}


    export default getPolicies;



    // 1 - Certificate Number
    // console.log(policylist[0][1]);
    // // 2 - Period of Insurance
    // console.log(policylist[0][4]);
    // // 3 - Master Policy Holder
    // console.log(policylist[0][5]);
    // Name of certificate holder
    // console.log(policylist[0][6]);
    // // 5 - DOB
    // console.log(policylist[0][7]);
    // // 6 - Gender
    // console.log(policylist[0][8]);
    // // 7 - Mobile
    // console.log(policylist[0][9]);
    // // 8 - Email
    // console.log(policylist[0][10]);
    // // 9 - address
    // console.log(policylist[0][11]);
    // // 10 - city
    // console.log(policylist[0][12]);
    // // 11 - state
    // console.log(policylist[0][13]);
    // // 12 - Pincode
    // console.log(policylist[0][14]);
    // // 20 Engine
    // console.log(policylist[0][22]);
    // // 21  Chassis
    // console.log(policylist[0][23]);
    // // 22   nominee name
    // console.log(policylist[0][24]);
    // // 28 Imd Code
    // console.log(policylist[0][30]);
    // // 27 - IMD Name
    // console.log(policylist[0][29]);
    // // 33 - Master Dealer Name
    // console.log(policylist[0][35]);
    // // 34 - Dealer Type
    // console.log(policylist[0][36]);
    // // 35 - payment terms
    // console.log(policylist[0][37]);
    // // 37 - Plan
    // console.log(policylist[0][39]);
    // // 45 - net recievable with TDS
    // console.log(policylist[0][47]);
    // // 46 - total dealer benefit
    // console.log(policylist[0][48]);
    // // 61 - Paid By
    // console.log(policylist[0][69]);
    // // 62 Month
    // console.log(policylist[0][70]);
    // // 63 created at  
    // console.log(policylist[0][71]);
    // 79 Policy Type
    // 80 Status