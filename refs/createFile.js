import { google } from "googleapis";
import fs from "fs";
let auth, googleDrive;


const driveUpload = async (masterDealer) => {
    auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: 'https://www.googleapis.com/auth/drive'
    });

    const client = await auth.getClient();

    googleDrive = google.drive({ version: 'v3', auth: client });

    var fileMetadata = {
        name: `${masterDealer.name}- April 2022.xlsx`,
        mimeType: 'application/vnd.google-apps.spreadsheet',
        parents: ['1-bnwUcpFJSg2S3eOfP0NH-lmHBywFKgH']
    };

    var media = {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        body: fs.createReadStream(`./sheets/${masterDealer.name}- April 2022.xlsx`)
        // MimeTypeArray: ['application/vnd.google-apps.spreadsheet']
    };


    let fileDetails = { id: '' };


    await googleDrive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }).then(async (item) => {
        // console.log(item)
        console.log('ID is: ', item.data.id)
        fileDetails.id = item.data.id;
        console.log("Uploaded File")

        await singleCard(masterDealer, fileDetails)

        fs.unlinkSync(`./sheets/${masterDealer.name}- April 2022.xlsx`, (err) => {
            if (err) {
                console.log('Error in Unlink ', err.message)
            }
        });


    }).catch(err => {
        console.log('Error in GoogleDrive\n ', err.message)
    });





    // console.log('Deleted File')


}


// driveUpload();

export default driveUpload;