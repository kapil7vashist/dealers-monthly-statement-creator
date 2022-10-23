import { google } from "googleapis"

let auth, googleSheets;
// const policiesApril = '1rk-204bbetV74zvTztMJf1b6Zj8rMtkYT6HU-XLK26Y';
const SheetID = '1r2LZitMLXmkezkE82hPXBw5llW2_jxoj';

const writeGSheet = async () => {
    auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    googleSheets = google.sheets({ version: 'v4', auth: client });


    const values = [['Name', 'RollNo', 'Batch'], ['Kapil Vashist', 'A40318040', '2018']]

    // const requestBody = { values };
    const data = [{
        range: 'Summary',
        values: values
    }]


    const requestBody = {
        data,
        valueInputOption: 'USER_ENTERED'
    }

    await googleSheets.spreadsheets.values.batchUpdate({
        spreadsheetId: SheetID,
        requestBody
    }).then(data => {
        console.log(data)
    }).catch((err) => console.log(err.message))

}

writeGSheet();
// policiesList();