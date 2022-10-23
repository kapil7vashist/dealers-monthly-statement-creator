import { google } from "googleapis";
import fs from "fs";



const googleAuth = async () => {
    let auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: 'https://www.googleapis.com/auth/drive'
    });

    const client = await auth.getClient();

    let googleDrive = google.drive({ version: 'v3', auth: client });
    return googleDrive
}



const usePromiseAll = async () => {
    const googleDrive = await googleAuth();
    let files = fs.readdirSync("./sheets");
    let uploads;

    let start = 0;
    let limit = 30;
    // while (limit <= files.length) {

    uploads = [];

    for (let i = start; i < 20; i++) {

        if (files[i] === 'undefined') {
            break;
        }

        console.log('Entered For Loop', files[i])
        let fileMetadata = {
            name: files[i],
            mimeType: 'application/vnd.google-apps.spreadsheet',
            parents: ['1-bnwUcpFJSg2S3eOfP0NH-lmHBywFKgH']
        };

        let media = {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            body: fs.createReadStream(`./sheets/${files[i]}`)
        };


        const newUpload = googleDrive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name'
        });

        uploads.push(newUpload);

        // fs.unlinkSync(`./sheets/${files[i]}`, err => {
        //     if (err) {
        //         console.log('Error in Unlink')
        //     }
        // })
    }

    // start = limit;
    // limit += 30;

    console.log(files);
    console.log('Exited For Loop');
    await Promise.all(uploads).then((item) => {
        for (let i = 0; i < 20; i++) {
            if (`${item[i].data.name}.xlsx` === files[i]) {
                console.log('True', item[i].data.name);
            } else {
                console.log('false', item[i].data.name, uploads[i])
            }
        }
    }).catch(err => console.log(err.message));
    // }
}

usePromiseAll();
// console.log(files);

// = limit && limit <= files.length