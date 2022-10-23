// Get all the details for the MasterDealers and Make an object with required details and also an empty array for the SubDealers

import xlsx from "xlsx";
import dealers from "./dealers.js";
import policies from "./policies.js";
import getPolicies from "./getPolicies.js";
import createSummary from "./summary.js";


const dealerslist = await dealers();
const policieslist = await policies();

let masterDealers = [];
let masterData = [];

let masterCodes = [];

const findMasterDealer = () => {
    let dealerCodes = [];
    for (let i = 1; i < dealerslist.length; i++) {
        if (dealerslist[i][15] == 'Dealer') {
            const dealerFound = {
                code: dealerslist[i][6],
                name: dealerslist[i][13],
                email: dealerslist[i][9],
                make: dealerslist[i][16],
                subDealers: []
            }

            const masterDealerData = {
                code: dealerslist[i][6],
                id: dealerslist[i][14]
            }

            masterDealers.push(dealerFound);
            masterData.push(masterDealerData);
        }
    }

    findSubDealers();


}


const findSubDealers = () => {
    for (let i = 1; i < dealerslist.length; i++) {
        if (dealerslist[i][15] == 'Sub Dealer') {
            const MasterDealerID = dealerslist[i][14];
            for (let k = 0; k < masterData.length; k++) {
                if (masterData[k].id == MasterDealerID) {
                    const MasterCode = masterData[k].code;
                    for (let j = 0; j < masterDealers.length; j++) {
                        if (masterDealers[j].code == MasterCode) {

                            const subDealer = {
                                code: dealerslist[i][6],
                                name: dealerslist[i][1]
                            }

                            masterDealers[j].subDealers.push(subDealer);
                        }
                    }
                }
            }
        }
    }

    getIds();

}

const master = [{
    code: 'ACPL00003',
    name: 'Jain Motorcycle Company',
    email: 'jainmotorcycle.billing@gmail.com',
    make: 'Hero',
    subDealers: [
        { code: 'ACPL00030', name: 'Shiv Motors (JMC)' },
        { code: 'ACPL00031', name: 'Upadhayay Motors (JMC)' },
        { code: 'ACPL00032', name: 'Mahendra Motors (JMC)' },
        { code: 'ACPL00033', name: 'Radha Motors (JMC)' },
        { code: 'ACPL00034', name: 'Agrawal Auto Sales (JMC)' },
        { code: 'ACPL00035', name: 'SB Khandelwal Motors (JMC)' },
        { code: 'ACPL00052', name: 'Sarman Lal Agrawal (JMC)' },
        { code: 'ACPL00057', name: 'Pradip Auto (JMC)' }
    ]
}]

const getIds = () => {
    let objectIds;
    for (let i = 0; i < masterDealers.length; i++) {
        objectIds = [];
        objectIds.push(masterDealers[i].code);
        if (masterDealers[i].subDealers.length > 0) {
            for (let j = 0; j < masterDealers[i].subDealers.length; j++) {
                objectIds.push(masterDealers[i].subDealers[j].code);
            }
        }

        // console.log(objectIds);
        getPolicies(objectIds);
    }
}



findMasterDealer();
// getIds();
// createSummary(masterDealers[2])
// console.log(masterDealers[2])
// console.log(masterData[0])
// console.log(masterDealers.length)