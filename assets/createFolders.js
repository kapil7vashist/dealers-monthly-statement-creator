import { google } from "googleapis";
// import fs from "fs";
import upload from "./driveUpload.js";

const googleAuth = async () => {
    let auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: 'https://www.googleapis.com/auth/drive'
    });

    const client = await auth.getClient();

    let googleDrive = google.drive({ version: 'v3', auth: client });
    return googleDrive
}



const createFolder = async (masterDealers) => {

    // console.log('Inside Create Folders');

    const googleDrive = await googleAuth();
    // let files = fs.readdirSync("./sheets");
    let start = 0, limit = 10;
    let promises = [];
    let foldersObj = [];

    while (start < masterDealers.length) {

        for (let i = start; (i < limit && i < masterDealers.length); i++) {
            // const folderID = `1-bnwUcpFJSg2S3eOfP0NH-lmHBywFKgH`;
            let fileMetadata = {
                name: `${masterDealers[i].name}`,
                mimeType: 'application/vnd.google-apps.folder',
                parents: ['1AT_zCbTsTZFpFciRRP-3L3c-ITbdu7RP']
            };

            const newReq = googleDrive.files.create({
                resource: fileMetadata,
                fields: 'id,name'
            });

            promises.push(newReq);
        }

        await Promise.all(promises).then(async (folders) => {
            for (let i = 0; i < folders.length; i++) {
                // console.log(folders[i].data.name + '<--Name && ID-->' + folders[i].data.id);
                const newObj = { folderID: folders[i].data.id, folderName: folders[i].data.name };
                foldersObj.push(newObj);
            }
            console.log("Folder Batch Created")
        })

        if ((masterDealers.length - limit) < 10) {
            start = limit;
            limit += (masterDealers.length - limit);
        } else {
            start = limit;
            limit += 10;
        }

        promises = [];
    }

    foldersObj.sort((a, b) => a.folderName.localeCompare(b.folderName))

    setTimeout(() => {
        upload(foldersObj, masterDealers);
    }, 60000);
}


// createFolder();
export default createFolder;