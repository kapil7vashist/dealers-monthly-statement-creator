// Find the SubDealers for the Master Dealer with the Specific ID

// const findSubDealers = (masterDealer, codes) => {

//     for (let i = 0; i < dealersData.length; i++) {
//         if (dealersData[i][15] == 'Sub Dealer' && dealersData[i][14] == masterDealer.id) {

//             codes.push(dealersData[i][6]);

//             masterDealer.subDealers.push({
//                 code: dealersData[i][6],
//                 name: dealersData[i][1],
//                 policyTypes: []
//             });
//         }
//     }
//     policyDetails(masterDealer, codes)

// }


// const policyDetails = (masterDealer, codes) => {
//     let worksheet = [['Certificate No.', 'Period of Insurance', 'Name of Master Policy Holder', 'Name of Certificate Holder', 'DOB', 'Gender', 'Mobile', 'Email', 'Address', 'City', 'State', 'Pincode', 'Engine No.', 'Chassis No.', 'Nominee Name', 'IMD/Service Provider Code', 'IMD/Service Provider Name', 'Master Dealer Name', 'Dealer Type', 'Payment Terms', 'Plan', 'Net Receivable with TDS', 'Total Dealer(s) Benefit', 'Paid By', 'Month', 'Created At', 'Policy Type', 'Status']];

//     let paymentTerms = [];
//     let count = 0;
//     for (let i = 1; i < policyData.length; i++) {
//         if (codes.includes(policyData[i][30]) && policyData[i][80] == 'Active') {


//             masterDealer.tp_before_tds += parseFloat(policyData[i][57]);
//             masterDealer.tds_on_tp += parseFloat(policyData[i][58]);
//             masterDealer.tp_after_tds += parseFloat(policyData[i][59]);
//             masterDealer.total_gst += parseFloat(policyData[i][45]);
//             masterDealer.payout_adj_bal += parseFloat(policyData[i][61]);



//             if (!paymentTerms.includes(policyData[i][37])) {
//                 paymentTerms.push(policyData[i][37]);
//             }


//             if (masterDealer.code == policyData[i][30]) {
//                 if (!masterDealer.policyTypes.includes(policyData[i][79])) {
//                     masterDealer.policyTypes.push(policyData[i][79])
//                 }
//             } else {
//                 for (let j = 0; j < masterDealer.subDealers.length; j++) {
//                     if (masterDealer.subDealers[j].code == policyData[i][30]) {
//                         if (!masterDealer.subDealers[j].policyTypes.includes(policyData[i][79])) {
//                             masterDealer.subDealers[j].policyTypes.push(policyData[i][79]);
//                         }
//                     }
//                 }
//             }

//             count++;
//             worksheet.push([policyData[i][1], policyData[i][4], policyData[i][5],
//             policyData[i][6],
//             policyData[i][7],
//             policyData[i][8],
//             policyData[i][9],
//             policyData[i][10],
//             policyData[i][11],
//             policyData[i][12],
//             policyData[i][13],
//             policyData[i][14],
//             policyData[i][22],
//             policyData[i][23],
//             policyData[i][24],
//             policyData[i][30],
//             policyData[i][29],
//             policyData[i][35],
//             policyData[i][36],
//             policyData[i][37],
//             parseFloat(policyData[i][39]),
//             parseFloat(policyData[i][47]),
//             parseFloat(policyData[i][48]),
//             policyData[i][69],
//             policyData[i][70],
//             policyData[i][71],
//             policyData[i][79],
//             policyData[i][80]])
//         }
//     }

//     if (count > 0) {
//         createSheet(worksheet, masterDealer, paymentTerms);
//     }
// }



// const createSheet = async (worksheetData, masterDealer, paymentTerms) => {

//     masterDealer = { paymentTerms, ...masterDealer }
//     let paymentTermsString = '';
//     for (let i = 0; i < paymentTerms.length; i++) {

//         if (i == 0) {
//             paymentTermsString += `${paymentTerms[i]} `;
//         }
//         else {
//             paymentTermsString += `/ ${paymentTerms[i]} `;
//         }
//     }

//     // console.log(paymentTermsString)


//     const summaryData = [
//         ['Dealer', `${masterDealer.name}`],
//         ['Dealer Code', `${masterDealer.code}`],
//         ['Registered Email', `${masterDealer.email}`],
//         ['Payment Terms', `${paymentTermsString}`],
//         ['Make', `${masterDealer.make}`],
//         [],
//         ['Dealer Code', 'Dealer Name', 'Plan Type', 'No. of Policies', 'Total Plan Value', 'Total Dealer Benefit']
//     ];


//     // Push the Master Dealer's Code and Name with Policy Type and other Columns if any Policy Type Exist
//     let count = 8;
//     let rowCount = 8;
//     let intitalRow = 8;
//     let policyCount = 0;
//     let totalCols = [];
//     if (masterDealer.policyTypes.length > 0) {
//         policyCount = masterDealer.policyTypes.length;
//         summaryData.push([`${masterDealer.code}`, `${masterDealer.name}`]);
//         for (let i = 0; i < masterDealer.policyTypes.length; i++) {


//             summaryData.push([
//                 '',
//                 '',
//                 `${masterDealer.policyTypes[i]}`,
//                 { f: `COUNTIFS(Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` },
//                 { f: `SUMIFS(Policies!$U:$U, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` },
//                 { f: `SUMIFS(Policies!$W:$W, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }]);

//             rowCount++;
//         }



//         summaryData.push([
//             '',
//             '',
//             'Total',
//             { f: `SUM(D${count + 1}:D${count + policyCount})` },
//             { f: `SUM(E${count + 1}:E${count + policyCount})` },
//             { f: `SUM(F${count + 1}:F${count + policyCount})` }
//         ]);



//     } else {
//         summaryData.push([`${masterDealer.code}`, `${masterDealer.name}`]);
//         summaryData.push([
//             '',
//             '',
//             'Total',
//             0,
//             0,
//             0
//         ]);
//     }

//     totalCols.push(count + policyCount + 1);



//     // count += policyCount + 2;

//     // Do the Same as Above for the subdealers if any
//     if (masterDealer.subDealers.length > 0) {
//         for (let i = 0; i < masterDealer.subDealers.length; i++) {

//             if (masterDealer.subDealers[i].policyTypes.length > 0) {
//                 rowCount += 2;
//                 intitalRow = rowCount;
//                 count += policyCount + 2;
//                 policyCount = masterDealer.subDealers[i].policyTypes.length;
//                 totalCols.push(count + policyCount + 1);
//                 summaryData.push([`${masterDealer.subDealers[i].code}`, `${masterDealer.subDealers[i].name}`]);

//                 for (let j = 0; j < masterDealer.subDealers[i].policyTypes.length; j++) {


//                     summaryData.push(['', '', `${masterDealer.subDealers[i].policyTypes[j]}`, { f: `COUNTIFS(Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }, { f: `SUMIFS(Policies!$U:$U, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }, { f: `SUMIFS(Policies!$W:$W, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }]);



//                     rowCount++;
//                 }


//                 summaryData.push(['', '', 'Total', { f: `SUM(D${count + 1}:D${count + policyCount})` }, { f: `SUM(E${count + 1}:E${count + policyCount})` }, { f: `SUM(F${count + 1}:F${count + policyCount})` }]);

//             } else {
//                 rowCount += 2;
//                 intitalRow = rowCount;
//                 count += policyCount + 2;
//                 policyCount = masterDealer.subDealers[i].policyTypes.length;
//                 totalCols.push(count + policyCount + 1);
//                 summaryData.push([`${masterDealer.subDealers[i].code}`, `${masterDealer.subDealers[i].name}`]);
//                 summaryData.push(['', '', 'Total', 0, 0, 0]);
//             }
//         }
//     }

//     let totalFormula1 = '';
//     let totalFormula2 = '';
//     let totalFormula3 = '';
//     for (let i = 0; i < totalCols.length; i++) {

//         if (i == totalCols.length - 1) {
//             totalFormula1 += `D${totalCols[i]}`;
//             totalFormula2 += `E${totalCols[i]}`;
//             totalFormula3 += `F${totalCols[i]}`;
//         } else {
//             totalFormula1 += `D${totalCols[i]}+`;
//             totalFormula2 += `E${totalCols[i]}+`;
//             totalFormula3 += `F${totalCols[i]}+`;

//         }

//     }


//     summaryData.push(['', '', 'Grand Total', { f: `SUM(${totalFormula1})` }, { f: `SUM(${totalFormula2})` }, { f: `SUM(${totalFormula3})` }])


//     const wb = xlsx.utils.book_new();
//     const worksheet = xlsx.utils.aoa_to_sheet(summaryData);

//     const policyWorksheet = xlsx.utils.aoa_to_sheet(worksheetData)

//     xlsx.utils.book_append_sheet(wb, worksheet, 'Summary');
//     xlsx.utils.book_append_sheet(wb, policyWorksheet, 'Policies');
//     xlsx.writeFile(wb, `./sheets/${masterDealer.name} - May 2022.xlsx`);


//     // console.log(masterDealer);
//     // await driveUpload(masterDealer);
//     masterDealers.push(masterDealer);
//     // upload(masterDealers);
//     // console.log(masterDealer);

// }


// console.log(masterDealers.length);
// findSubDealers({
//     code: 'ACPL00003',
//     name: 'Jain Motorcycle Company',
//     email: 'jainmotorcycle.billing@gmail.com',
//     make: 'Hero',
//     policyTypes: [],
//     subDealers: [],
//     id: '184Y3L-ZLT7vcLiFDItIcLa-18phpzEbgBCBDgt_LGCQ',
//     combined_Balance: -505060,
//     tp_before_tds: 0,
//     tds_on_tp: 0,
//     tp_after_tds: 0,
//     payout_adj_bal: 0,
//     total_gst: 0
// }, ['ACPL00003'])
// Sample Dealer

// {
//     code: 'ACPL00003',
//     name: 'Jain Motorcycle Company',
//     email: 'jainmotorcycle.billing@gmail.com',
//     make: 'Hero',
//     subDealers: [],
//     id: '184Y3L-ZLT7vcLiFDItIcLa-18phpzEbgBCBDgt_LGCQ'
//   }