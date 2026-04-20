const fs = require('fs/promises')

async function get_last_n_messages(room_name, n) {



    const file = await fs.readFile(`database/${room_name}.json`, 'utf-8');

    let data = await file;

    console.log(JSON.parse(data))

    let jsonData = JSON.parse(data);

    let messages_length = jsonData['messages'].length ;

    if (messages_length>n){
    jsonData['messages'].splice(0,messages_length - n);}
   

   return jsonData.messages;

}

module.exports = {get_last_n_messages}