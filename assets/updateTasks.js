import fetch from 'node-fetch';
// const listID = '187255280';
const clickUpToken = 'pk_55254401_CWSAA0C7LHBQ8BRNFQUCO06EDGY8GM5I';

const updateTask = async (tasks) => {
    let toUpdateTasks = [];
    let start = 0, end = 10;

    console.log("Inside Update Tasks")
    // console.log(tasks[0]);
    // console.log(tasks[0].textContent)

    while (start < tasks.length) {

        for (let i = start; i < end; i++) {
            let newName = tasks[i].name.replace(/ /g, '%20');
            let monthName = tasks[i].month.replace(/ /, '%20');

            let updatedTaskContent = JSON.stringify({
                ...tasks[i].textContent,
                'Upload Invoice': `https://docs.google.com/forms/d/e/1FAIpQLSf51wwkQyzg9-iJ_xEQwVWDxfab0NfG56Z8t1hnH5x0RN2tPQ/viewform?usp=pp_url&entry.627177021=${tasks[i].taskID}&entry.1749534098=${newName}&entry.1670392136=${tasks[i].textContent['Dealer Email']}&entry.61040866=${monthName}`,
            }, null, 2);

            let fullDetail = {
                text_content: updatedTaskContent,
                assignees: {
                    add: [
                        49358644
                    ],
                    rem: [

                    ]
                }
            }

            let ToUpdateTask = fetch(`https://api.clickup.com/api/v2/task/${tasks[i].taskID}`, {
                method: 'PUT',
                body: JSON.stringify(fullDetail),
                headers: {
                    'authorization': `${clickUpToken}`,
                    'content-type': 'application/json'
                }
            })

            toUpdateTasks.push(ToUpdateTask);
        }
        await Promise.all(toUpdateTasks).then(async (results) => {
            // // count++;
            // let jsonResults = [];
            // for (let i = 0; i < results.length; i++) {
            //     let jsonedData = await results[i].json();
            //     jsonResults.push(jsonedData);
            // }
            // return jsonResults;
        }).then(() => console.log('Batch of Cards Updated')).catch(err => console.log('Error in Updating: ', err.message));

        if ((tasks.length - end) < 10) {
            start = end;
            end += (tasks.length - end)
        } else {
            start = end;
            end += 10;
        }


        toUpdateTasks = [];

    }
}




export default updateTask;






