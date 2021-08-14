const convert = require('xml-js');
const request = require('request');
const fs = require('fs')

var requestUrl = `http://api.data.go.kr/openapi/tn_pubr_public_free_mlsv_api?serviceKey=w4WgRe0atRPd8sTRA1ca%2BWFFWFmvzG7mwOKRIoNtnUucJyKMjEzCfngxtf9BZaE5SYgG849atzzWO1L7mOyi5g%3D%3D&type=xml&numOfRows=100000`
var xmlFile = 'xml_data.xml'
var jsonFile = 'json_data.json'


request.get(requestUrl, (err,res,body) =>{
    if(err){
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200){
            var xmlResult = body // 기존 xml 파일
            fs.writeFile(xmlFile, xmlResult, 'utf8', function(error){
                console.log('complete write xml')
            });

            var jsonResult = convert.xml2json(xmlResult, {compact: true, spaces: 4}); // json 변환 결과
            fs.writeFile(jsonFile, jsonResult, 'utf8', function(error){
                console.log('complete write json')
            });
        }
    }
})