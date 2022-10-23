import xlsx from "xlsx";
const createSheet = async (worksheetData, masterDealer, paymentTerms, masterDealers) => {

    masterDealer = { paymentTerms, ...masterDealer }
    let paymentTermsString = '';
    for (let i = 0; i < paymentTerms.length; i++) {

        if (i == 0) {
            paymentTermsString += `${paymentTerms[i]} `;
        }
        else {
            paymentTermsString += `/ ${paymentTerms[i]} `;
        }
    }

    // console.log(paymentTermsString)


    const summaryData = [
        ['Dealer', `${masterDealer.name}`],
        ['Dealer Code', `${masterDealer.code}`],
        ['Registered Email', `${masterDealer.email}`],
        ['Payment Terms', `${paymentTermsString}`],
        ['Make', `${masterDealer.make}`],
        [],
        ['Dealer Code', 'Dealer Name', 'Plan Type', 'No. of Policies', 'Total Plan Value', 'Total Dealer Benefit']
    ];


    // Push the Master Dealer's Code and Name with Policy Type and other Columns if any Policy Type Exist
    let count = 8;
    let rowCount = 8;
    let intitalRow = 8;
    let policyCount = 0;
    let totalCols = [];
    if (masterDealer.policyTypes.length > 0) {
        policyCount = masterDealer.policyTypes.length;
        summaryData.push([`${masterDealer.code}`, `${masterDealer.name}`]);
        for (let i = 0; i < masterDealer.policyTypes.length; i++) {


            summaryData.push([
                '',
                '',
                `${masterDealer.policyTypes[i]}`,
                { f: `COUNTIFS(Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` },
                { f: `SUMIFS(Policies!$U:$U, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` },
                { f: `SUMIFS(Policies!$W:$W, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }]);

            rowCount++;
        }



        summaryData.push([
            '',
            '',
            'Total',
            { f: `SUM(D${count + 1}:D${count + policyCount})` },
            { f: `SUM(E${count + 1}:E${count + policyCount})` },
            { f: `SUM(F${count + 1}:F${count + policyCount})` }
        ]);



    } else {
        summaryData.push([`${masterDealer.code}`, `${masterDealer.name}`]);
        summaryData.push([
            '',
            '',
            'Total',
            0,
            0,
            0
        ]);
    }

    totalCols.push(count + policyCount + 1);



    // count += policyCount + 2;

    // Do the Same as Above for the subdealers if any 
    if (masterDealer.subDealers.length > 0) {
        for (let i = 0; i < masterDealer.subDealers.length; i++) {

            if (masterDealer.subDealers[i].policyTypes.length > 0) {
                rowCount += 2;
                intitalRow = rowCount;
                count += policyCount + 2;
                policyCount = masterDealer.subDealers[i].policyTypes.length;
                totalCols.push(count + policyCount + 1);
                summaryData.push([`${masterDealer.subDealers[i].code}`, `${masterDealer.subDealers[i].name}`]);

                for (let j = 0; j < masterDealer.subDealers[i].policyTypes.length; j++) {


                    summaryData.push(['', '', `${masterDealer.subDealers[i].policyTypes[j]}`, { f: `COUNTIFS(Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }, { f: `SUMIFS(Policies!$U:$U, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }, { f: `SUMIFS(Policies!$W:$W, Policies!$P:$P, $A$${intitalRow}, Policies!$AA:$AA, $C${rowCount + 1})` }]);



                    rowCount++;
                }


                summaryData.push(['', '', 'Total', { f: `SUM(D${count + 1}:D${count + policyCount})` }, { f: `SUM(E${count + 1}:E${count + policyCount})` }, { f: `SUM(F${count + 1}:F${count + policyCount})` }]);

            } else {
                rowCount += 2;
                intitalRow = rowCount;
                count += policyCount + 2;
                policyCount = masterDealer.subDealers[i].policyTypes.length;
                totalCols.push(count + policyCount + 1);
                summaryData.push([`${masterDealer.subDealers[i].code}`, `${masterDealer.subDealers[i].name}`]);
                summaryData.push(['', '', 'Total', 0, 0, 0]);
            }
        }
    }

    let totalFormula1 = '';
    let totalFormula2 = '';
    let totalFormula3 = '';
    for (let i = 0; i < totalCols.length; i++) {

        if (i == totalCols.length - 1) {
            totalFormula1 += `D${totalCols[i]}`;
            totalFormula2 += `E${totalCols[i]}`;
            totalFormula3 += `F${totalCols[i]}`;
        } else {
            totalFormula1 += `D${totalCols[i]}+`;
            totalFormula2 += `E${totalCols[i]}+`;
            totalFormula3 += `F${totalCols[i]}+`;

        }

    }


    summaryData.push(['', '', 'Grand Total', { f: `SUM(${totalFormula1})` }, { f: `SUM(${totalFormula2})` }, { f: `SUM(${totalFormula3})` }])


    const wb = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet(summaryData);

    const policyWorksheet = xlsx.utils.aoa_to_sheet(worksheetData)

    xlsx.utils.book_append_sheet(wb, worksheet, 'Summary');
    xlsx.utils.book_append_sheet(wb, policyWorksheet, 'Policies');
    xlsx.writeFile(wb, `./sheets/${masterDealer.name} - June 2022.xlsx`);


    // console.log(masterDealer);
    // await driveUpload(masterDealer);
    masterDealers.push(masterDealer);
    // upload(masterDealers);
    // console.log(masterDealer);

}


export default createSheet;