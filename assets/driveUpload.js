import fs from 'fs';
import { google } from 'googleapis'
import createCard from "./createClickUpCard.js";

// const files = fs.readdirSync("./sheets");

const googleAuth = async () => {
    let auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: 'https://www.googleapis.com/auth/drive'
    });

    const client = await auth.getClient();

    let googleDrive = google.drive({ version: 'v3', auth: client });
    return googleDrive
}

const upload = async (foldersObj, masterDealers) => {
    const googleDrive = await googleAuth();
    let count = 0;
    let start = 0, end = 10;

    // console.log('inside upload files')
    await masterDealers.sort((a, b) => a.name.localeCompare(b.name))


    while (start < masterDealers.length) {
        let fileUploads = [];
        for (let i = start; (i < end && i < masterDealers.length); i++) {
            let fileMetadata = {
                name: `${masterDealers[i].name} - June 2022.xlsx`,
                mimeType: 'application/vnd.google-apps.spreadsheet',
                parents: [`${foldersObj[i].folderID}`]
            };

            let media = {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                body: fs.createReadStream(`./sheets/${masterDealers[i].name} - June 2022.xlsx`)
            };

            let newFile = googleDrive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id,name,parents'
            })

            fileUploads.push(newFile);
        }

        await Promise.all(fileUploads).then((items) => {
            for (let i = 0; i < items.length; i++) {
                for (let j = 0; j < masterDealers.length; j++) {
                    if (`${items[i].data.name}.xlsx` == `${masterDealers[j].name} - June 2022.xlsx`) {
                        count++;
                        fs.unlinkSync(`./sheets/${items[i].data.name}.xlsx`)
                        masterDealers[j] = { folderID: items[i].data.parents[0], uploaded: true, ...masterDealers[j] }
                    }
                }

            }
            console.log('File Batch Uploaded')
        }).catch(err => console.log('Error ', err.message));

        if ((masterDealers.length - end) < 10) {
            start = end;
            end += (masterDealers.length - end);
        } else {
            start = end;
            end += 10;
        }
    }


    for (let i = 0; i < 10; i++) {
        console.log(masterDealers);
    }

    createCard(masterDealers);
}


export default upload;







// .then(item => {
//     // console.log(item)
//     console.log('ID is: ', item.data.id)
//     // fileDetails.id = item.data.id;
//     console.log("Uploaded File")
// }).catch(err => {
//     console.log('Error in GoogleDrive\n ', err.message)
// });



// .then(item => {
//     let id = item.data.id;
//     masterDealers[i] = { sheetID: id, uploaded: true, ...masterDealers[i] };

//     console.log(`Upload ID: ${id} & Uploaded Value: ${masterDealers[i].uploaded}`)

//     fs.unlinkSync(`./sheets/${masterDealers[i].name}- June 2022.xlsx`, (err) => {
//         if (err) {
//             console.log('Error in Unlink ', err.message)
//         }
//     });
// }).catch(err => console.log('Error in Google API\n ', err.message));












// .then((file) => {
//     masterDealers[i] = { id: file.data.id, uploaded: true, ...masterDealers[i] }
//     console.log(`Upload ID: ${file.data.id}`)
//     fs.unlinkSync(`./sheets/${masterDealers[i].name}- June 2022.xlsx`, (err) => {
//         if (err) {
//             console.log('Can\'t delete File');
//         }
//     })
// });








// for (let i = 0; i < items.length; i++) {
//     for (let j = start; j < masterDealers.length; j++) {
//         if (`${items[i].data.name}.xlsx` == `${masterDealers[j].name}- June 2022.xlsx`) {
//             masterDealers[j] = { sheetID: items[i].data.id, uploaded: true, ...masterDealers[j] }
//             console.log(items[i].data.id);
//             console.log(masterDealers[j]);
//             console.log('Batch Uploaded');
//             count++;
//             fs.unlinkSync(`./sheets/${items[i].data.name}.xlsx`, (err) => {
//                 if (err) {
//                     console.log('Error in Deleting File')
//                 }
//             })
//         }
//     }
// }