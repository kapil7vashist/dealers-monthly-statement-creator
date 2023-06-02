import { google } from "googleapis"

let auth, googleSheets;
const dealerSheetID = '1EUZ1ecWS49UiYLUdnF_6GDZF5JBk1ms1hr-t5yoptS4';

const dealersList = async () => {
    auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    googleSheets = google.sheets({ version: 'v4', auth: client });


    const getRowsSheet1 = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: dealerSheetID,
        range: 'Sheet1'
    }).catch(err => console.log('Error in GetRowsSheet1'));


    const getRowsCBS = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: dealerSheetID,
        range: 'Combined Balance Sheet'
    }).catch(err => console.log('Error in GetRowsCBS'));



    const dealers = getRowsSheet1.data.values;
    const cbs = getRowsCBS.data.values;
    // console.log(values[0])
    return [dealers, cbs];

    // return dealers;
    // return cbs;
}


export default dealersList;