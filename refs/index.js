import xlsx from "xlsx";
const wb = xlsx.readFile('demo.xlsx');
const ws = wb.Sheets["Policies"];
const data = xlsx.utils.sheet_to_json(ws);

console.log(data)


// const newData = data.map((record) => {
//     console.log(record)
// })