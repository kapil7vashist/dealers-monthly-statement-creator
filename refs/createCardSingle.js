import fetch from 'node-fetch';
const listID = '187255280';
const clickUpToken = 'pk_55254401_CWSAA0C7LHBQ8BRNFQUCO06EDGY8GM5I';


const singleCard = async (masterDealer, fileDetails) => {

    const fileLink = `https://docs.google.com/spreadsheets/d/${fileDetails.id}`;

    const textContent = JSON.stringify({
        viewReport: fileLink,
        ReportID: fileDetails.id,
        cb: masterDealer.combined_Balance
    }, null, 1);

    // console.log(masterDealer.combined_Balance);

    const fullDetail = {
        name: masterDealer.name + '- April 2022',
        text_content: textContent,
        status: masterDealer.combined_Balance >= 0 ? 'Pending' : 'Outstanding',
        tags: [`April 2022`, masterDealer.make]
    }

    for (let j = 0; j < masterDealer.paymentTerms.length; j++) {
        if (masterDealer.paymentTerms[j] != '')
            fullDetail.tags.push(masterDealer.paymentTerms[j])
    }


    await fetch(`https://api.clickup.com/api/v2/list/${listID}/task`, {
        method: 'POST',
        body: JSON.stringify(fullDetail),
        headers: {
            'authorization': `${clickUpToken}`,
            'content-type': 'application/json'
        }
    }).then(data => data.json()).then(data => console.log(data)).catch(err => console.log(err));
}


export default singleCard;