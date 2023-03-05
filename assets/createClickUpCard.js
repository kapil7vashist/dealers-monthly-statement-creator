import fetch from 'node-fetch';
import updateTask from './updateTasks.js';
const listID = '187255280';
const clickUpToken = 'pk_55254401_CWSAA0C7LHBQ8BRNFQUCO06EDGY8GM5I';
import {currentMonthSheet} from '../constants/constants.js';

const createCard = async (masterDealers) => {

    let start = 0, end = 10;
    let tasks = [];

    // console.log("Inside Create ClickUp Cards");

    while (start < masterDealers.length) {
        let cards = [];
        // console.log(masterDealers[0]);
        for (let i = start; i < end; i++) {
            if (masterDealers[i].uploaded && !masterDealers[i].paymentTerms.includes('Base Pay')) {
                let fileLink = `https://drive.google.com/drive/folders/${masterDealers[i].folderID}`;

                // const property = 'FinalPayout - BT';

                let netPayout = ((masterDealers[i].tp_after_tds - masterDealers[i].payout_adj_bal))
                netPayout = Math.round((netPayout + Number.EPSILON) * 100) / 100

                // console.log('Net Payout ', netPayout)


                let finalPayoutBT = (netPayout + masterDealers[i].total_gst);
                finalPayoutBT = Math.round((finalPayoutBT + Number.EPSILON) * 100) / 100
                // console.log('FinalPayoutBT ', finalPayoutBT);


                let finalPaymentTermString = '';
                for (let j = 0; j < masterDealers[i].paymentTerms.length; j++) {
                    if (j == 0 && masterDealers[i].paymentTerms.length == 1) {
                        finalPaymentTermString += `${masterDealers[i].paymentTerms[j]}`;
                    } else if (j == 0) {
                        finalPaymentTermString += `${masterDealers[i].paymentTerms[j]} / `;
                    } else if (j == (masterDealers[i].paymentTerms.length - 1)) {
                        finalPaymentTermString += `${masterDealers[i].paymentTerms[j]}`
                    }
                }




                const textContent = JSON.stringify({
                    'Folder ID': masterDealers[i].folderID,
                    'View Folder': fileLink,
                    'Upload Invoice': '',
                    'Reported | Total Payout Before TDS': `${Math.round((masterDealers[i].tp_before_tds + Number.EPSILON) * 100) / 100}`,
                    "Reported | TDS Amount On Total Payout": `${Math.round((masterDealers[i].tds_on_tp + Number.EPSILON) * 100) / 100}`,
                    'Reported | Total Payout After TDS': `${Math.round((masterDealers[i].tp_after_tds + Number.EPSILON) * 100) / 100}`,
                    'Reported | Payout Adjusted In Balance': `${Math.round((masterDealers[i].payout_adj_bal + Number.EPSILON) * 100) / 100}`,
                    'Reported | Net Payout': `${netPayout}`,
                    'Reported | GST': `${Math.round((masterDealers[i].total_gst + Number.EPSILON) * 100) / 100}`,
                    'Reported | Final Payout - BT': `${finalPayoutBT}`,
                    'Dealer ID': masterDealers[i].id,
                    'Dealer Email': masterDealers[i].email,
                    'Dealer Name': masterDealers[i].name,
                    'Month': currentMonthSheet,
                    'Payment Terms': finalPaymentTermString
                }, null, 2);

                // console.log(masterDealer.combined_Balance);

                let fullDetail = {
                    name: masterDealers[i].name,
                    text_content: textContent,
                    status: masterDealers[i].combined_Balance >= 0 ? 'Pending' : 'Outstanding',
                    tags: [currentMonthSheet, masterDealers[i].make]
                }

                for (let j = 0; j < masterDealers[i].paymentTerms.length; j++) {
                    if (masterDealers[i].paymentTerms[j] != '')
                        fullDetail.tags.push(masterDealers[i].paymentTerms[j])
                }


                const newCard = fetch(`https://api.clickup.com/api/v2/list/${listID}/task`, {
                    method: 'POST',
                    body: JSON.stringify(fullDetail),
                    headers: {
                        'authorization': `${clickUpToken}`,
                        'content-type': 'application/json'
                    }
                })

                cards.push(newCard)

            }
        }

        // console.log(cards.length);
        await Promise.all(cards).then(async (results) => {
            let jsonResults = [];
            for (let i = 0; i < results.length; i++) {
                let jsonedData = await results[i].json();
                jsonResults.push(jsonedData);
            }
            return jsonResults;
        }).then(async (data) => {
            data.sort((a, b) => a.name.localeCompare(b.name))
            // let tasks = [];
            // console.log(data[3]);
            for (let i = 0; i < data.length; i++) {
                // let name = data[i].name.split('-');
                const tasksDetails = { name: data[i].name, taskID: data[i].id, month: currentMonthSheet, textContent: JSON.parse(data[i].text_content) }
                tasks.push(tasksDetails);
            };

            console.log('Card Batch Uploaded');
        }).catch(err => console.log('Error: ', err.message));


        if ((masterDealers.length - end) < 10) {
            start = end;
            end += (masterDealers.length - end)
        } else {
            start = end;
            end += 10;
        }
    }


    // Takes a Timeout for 1 min as API limit for ClickUp is 100 Req/min.
    tasks.sort((a, b) => a.name.localeCompare(b.name))
    setTimeout(() => {
        updateTask(tasks);
    }, 60000);
}


export default createCard;



// setTimeout(() => {
//     updateTask(tasks);
// }, 60000);