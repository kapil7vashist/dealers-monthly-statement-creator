import xlsx from "xlsx";
// import { v4 } from "uuid";


const generatePolicyData = (data, name) => {
    const wb = xlsx.utils.book_new();
    const worksheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, worksheet, 'Sheet1');
    xlsx.writeFile(wb, `${name}.xlsx`)
}




export default generatePolicyData;