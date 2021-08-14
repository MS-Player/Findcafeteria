const fs = require('fs')

fs.readFile('json_data.json', 'utf8', (err, data)=>{
    jsonData = JSON.parse(data).response.body.items.item;

    for(var len = 0; len < jsonData.length; len++) {
        date = JSON.stringify(jsonData[len].mlsvDate._text);
        jsonData[len].mlsvDate._text = date.replace(/\+/g, ',');
    }

    fs.writeFile('json_data.json', JSON.stringify(jsonData, null, 4), 'utf8', function(error){
        console.log('complete processing');
    });
});