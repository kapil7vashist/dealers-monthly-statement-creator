import xlsx from "xlsx";
import createSheet from "./createsheet.js";

const policyDetails = (masterDealer, codes, policyData, masterDealers) => {

    // console.log("inside policyDetails")

    let worksheet = [['Certificate No.', 'Period of Insurance', 'Name of Master Policy Holder', 'Name of Certificate Holder', 'DOB', 'Gender', 'Mobile', 'Email', 'Address', 'City', 'State', 'Pincode', 'Engine No.', 'Chassis No.', 'Nominee Name', 'IMD/Service Provider Code', 'IMD/Service Provider Name', 'Master Dealer Name', 'Dealer Type', 'Payment Terms', 'Plan', 'Net Receivable with TDS', 'Total Dealer(s) Benefit', 'Paid By', 'Month', 'Created At', 'Policy Type', 'Status']];

    let paymentTerms = [];
    let count = 0;

    // Count for Policies Updated as it was originally set from 1, hence it led to skipping of the very first policy every month
    for (let i = 0; i < policyData.length; i++) {
        if (codes.includes(policyData[i][30]) && policyData[i][80] == 'Active') {


            masterDealer.tp_before_tds += parseFloat(policyData[i][57]);
            masterDealer.tds_on_tp += parseFloat(policyData[i][58]);
            masterDealer.tp_after_tds += parseFloat(policyData[i][59]);
            masterDealer.total_gst += parseFloat(policyData[i][45]);
            masterDealer.payout_adj_bal += parseFloat(policyData[i][61]);



            if (!paymentTerms.includes(policyData[i][37])) {
                paymentTerms.push(policyData[i][37]);
            }


            if (masterDealer.code == policyData[i][30]) {
                if (!masterDealer.policyTypes.includes(policyData[i][79])) {
                    masterDealer.policyTypes.push(policyData[i][79])
                }
            } else {
                for (let j = 0; j < masterDealer.subDealers.length; j++) {
                    if (masterDealer.subDealers[j].code == policyData[i][30]) {
                        if (!masterDealer.subDealers[j].policyTypes.includes(policyData[i][79])) {
                            masterDealer.subDealers[j].policyTypes.push(policyData[i][79]);
                        }
                    }
                }
            }

            count++;
            worksheet.push([policyData[i][1], policyData[i][4], policyData[i][5],
            policyData[i][6],
            policyData[i][7],
            policyData[i][8],
            policyData[i][9],
            policyData[i][10],
            policyData[i][11],
            policyData[i][12],
            policyData[i][13],
            policyData[i][14],
            policyData[i][22],
            policyData[i][23],
            policyData[i][24],
            policyData[i][30],
            policyData[i][29],
            policyData[i][35],
            policyData[i][36],
            policyData[i][37],
            parseFloat(policyData[i][39]),
            parseFloat(policyData[i][47]),
            parseFloat(policyData[i][48]),
            policyData[i][69],
            policyData[i][70],
            policyData[i][71],
            policyData[i][79],
            policyData[i][80]])
        }
    }

    if (count > 0) {
        createSheet(worksheet, masterDealer, paymentTerms, masterDealers);
    }
}


export default policyDetails;