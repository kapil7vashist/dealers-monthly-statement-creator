import policyDetails from "./policydetails.js";


// Gets all the Sub-Dealers present for a Specific Master Dealer and updates the MasterDealer Object
const findSubDealers = (masterDealer, codes, dealersData, policyData, masterDealers) => {

    // console.log("inside FindSubDealers")

    for (let i = 0; i < dealersData.length; i++) {
        if (dealersData[i][15] == 'Sub Dealer' && dealersData[i][14] == masterDealer.id) {

            codes.push(dealersData[i][6]);

            masterDealer.subDealers.push({
                code: dealersData[i][6],
                name: dealersData[i][1],
                policyTypes: []
            });
        }
    }

    // Sends Data down to 'PolicyDetails' where Data is set to be put into the Excel sheet
    policyDetails(masterDealer, codes, policyData, masterDealers)

}



export default findSubDealers;