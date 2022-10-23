import { google } from "googleapis"

let auth, googleSheets;
const policiesJune = '1y5KC9CK9KcOSzp2hBSN66VGMlNnRA3f6ya71qX0aouM';

const policiesList = async () => {
    auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    googleSheets = google.sheets({ version: 'v4', auth: client });


    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: policiesJune,
        range: 'Policies'
    });

    
    const { values } = getRows.data;
    const monthlyPolicies = [];
    // Add a Code to Filter out Policies of Only Specific Month
    
    for(let i=1;i<values.length;i++){
        if(values[i][80]=='Active' && values[i][70]=='October 2022'){
            monthlyPolicies.push(values[i]);
    }}
    
    return monthlyPolicies;

}

export default policiesList;