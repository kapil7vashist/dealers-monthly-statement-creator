import xlsx from "xlsx";

// const wb = xlsx.readFile('demo.xlsx');
// const ws = wb.Sheets["Policies"];

// let workbook = xlsx.utils.book_new();

// let worksheet = xlsx.utils.aoa_to_sheet([
//     ['Dealer', 'Vikas Autowheels'],
//     ['Dealer Code', 'ACPL00006'],
//     ['Email', 'Insurancevaw@gmail.com'],
//     [],
//     ['Dealer Code', 'Dealer Name', 'Plan Type', 'No. of Policies', 'Plan Values', 'Total Dealer Benefit'],
//     ['ACPL00006', 'Vikas Autowheels'],
//     ['', '', 'CPA', "=COUNTIFS(Policies!$P:$P, $A$8, Policies!$AA:$AA, $C9)", "=SUMIFS(Policies!$U:$U, Policies!$P:$P, $A$8, Policies!$AA:$AA, $C9)", "=SUMIFS(Policies!$W:$W, Policies!$P:$P, $A$8, Policies!$AA:$AA, $C9)"],
//     ['', '', 'CPA + RSA + ADHC', "=COUNTIFS(Policies!$P:$P, $A$8, Policies!$AA:$AA, $C10)", "=SUMIFS(Policies!$U:$U, Policies!$P:$P, $A$8, Policies!$AA:$AA, $C10)", "=SUMIFS(Policies!$W:$W, Policies!$P:$P, $A$8, Policies!$AA:$AA, $C10)"],
//     ['', '', 'Total', "=SUM(D7:D8)", "=SUM(E7:E8)", "=SUM(F7:F8)"]
// ]);

// xlsx.utils.book_append_sheet(workbook, worksheet, 'DemoFile');
// xlsx.utils.book_append_sheet(workbook, ws, 'Policies');


// xlsx.writeFile(workbook, 'NewDataFile.xlsx')


let wb = [];



wb.push(['', '', 'CPA', "", "", ""],
    ['', '', 'CPA + RSA + ADHC', "", "", ""],
    ['', '', 'Total', "", "", ""]);


console.log(wb)