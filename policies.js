import { google } from "googleapis"
import {
	currentMonthSheet,
	spreadsheetId,
} from './constants/constants.js'

let auth, googleSheets;

const policiesList = async () => {

	console.log('Running Function to get Sheets');
	
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
		spreadsheetId,
		range: 'Policies'
	});

	const sheet1Values = getRowsSheet1.data.values;
	const monthlyPolicies = [];

	// console.log(currentMonthSheet);
	for (let i = 1; i < sheet1Values.length; i++) {
		if (sheet1Values[i][80] == 'Active' && sheet1Values[i][70] == currentMonthSheet) {
			monthlyPolicies.push(sheet1Values[i]);
		}
	};

	console.log(monthlyPolicies.length);
	// console.log(currentMonthSheet);
	// return monthlyPolicies;

}
policiesList();

// export default policiesList;