import xlsx from "xlsx";

const createSummary = (obj) => {

    let maindata = [
        ['Dealer', `${obj.name}`],
        ['Dealer Code', `${obj.code}`],
        ['Email', `${obj.email}`],
        ['Make', `${obj.make}`],
        [],
        ['Dealer Code', 'Dealer Name', 'Plan Type', 'No. of Policies', 'Total Plan Values', 'Total Dealer Benefit'],
        [`${obj.code}`, `${obj.name}`],
        ['', '', 'CPA', "", "", ""],
        ['', '', 'CPA + RSA + ADHC', "", "", ""],
        ['', '', 'Total', "", "", ""]
    ]

    let wb = xlsx.utils.book_new();

    for (let i = 0; i < obj.subDealers.length; i++) {
        maindata.push([`${obj.subDealers[i].code}`, `${obj.subDealers[i].name}`],
            ['', '', 'CPA', "", "", ""],
            ['', '', 'CPA + RSA + ADHC', "", "", ""],
            ['', '', 'Total', "", "", ""]);
    }


    let worksheet = xlsx.utils.aoa_to_sheet(maindata);
    xlsx.utils.book_append_sheet(wb, worksheet, 'Summary');
    xlsx.writeFile(wb, `${obj.name}.xlsx`)

}


export default createSummary;
