import dealersList from "./dealers.js"
import policiesList from "./policies.js"
import createFolder from "./assets/createFolders.js"
import findSubDealers from "./assets/subdealers.js";


const Dealers = await dealersList();
const policyData = await policiesList();


const dealersData = Dealers[0];
const cbsData = Dealers[1];

const masterDealers = [];

// Find The Master Dealer First Stores its Values in an Object and Continues to find the SubDealers of the Master Dealer ( if they exist )
const findMasterDealer = () => {
    for (let i = 1; i < dealersData.length; i++) {
        let codes = [];
        
            if (dealersData[i][15] == 'Dealer') {
                const dealerFound = {
                    code: dealersData[i][6],
                    name: dealersData[i][13],
                    email: dealersData[i][9],
                    make: dealersData[i][16],
                    subDealers: [],
                    id: dealersData[i][14],
                    policyTypes: [],
                    combined_Balance: parseFloat(cbsData[i][4]),
                    tp_before_tds: 0,
                    tds_on_tp: 0,
                    tp_after_tds: 0,
                    payout_adj_bal: 0,
                    total_gst: 0
                }

                codes.push(dealersData[i][6]);

                // 'findSubDealers' Function finds Sub-Dealers for Each Master Dealer.
                findSubDealers(dealerFound, codes, dealersData, policyData, masterDealers);
            
        }
    }
    console.log('All Files Created')
    // After Files for every Master Dealer has been created, 'createFolders' Function Calls for creation of Google Drive Folders
    createFolder(masterDealers);
}





findMasterDealer();


