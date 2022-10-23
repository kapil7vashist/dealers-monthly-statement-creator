import { google } from "googleapis";
import fs from "fs";
import createCard from "./createClickUpCard.js";

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
        parents: ['1-bnwUcpFJSg2S3eOfP0NH-lmHBywFKgH']
    };
    var media = {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        body: fs.createReadStream(`./sheets/${masterDealer.name}- April 2022.xlsx`)
    };


    googleDrive.files.create({
        resource: fileMetadata,
        media: media
    }).catch(err => {
        console.log(err.message)
    });

    let fileDetails;
    await googleDrive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id,name)'
    }).then(itm => { fileDetails = itm.data.files[0] }).catch(err => console.log(err.message));




    fs.unlinkSync(`./sheets/${masterDealer.name}- April 2022.xlsx`, (err) => {
        if (err) {
            console.log(err.message)
        }
    })

    createCard(masterDealer, fileDetails)
}



export default driveUpload;