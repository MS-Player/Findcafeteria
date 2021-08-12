const convert = require('xml-js');
const request = require('request');

var requestUrl = `http://api.data.go.kr/openapi/tn_pubr_public_free_mlsv_api?serviceKey=w4WgRe0atRPd8sTRA1ca%2BWFFWFmvzG7mwOKRIoNtnUucJyKMjEzCfngxtf9BZaE5SYgG849atzzWO1L7mOyi5g%3D%3D&type=xml&numOfRows=100000`

request.get(requestUrl, (err,res,body) =>{
    if(err){
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200){
            var result = body // 기존 xml 파일
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4}); // json 변환 결과

            console.log(`${result}`)
            console.log(`${xmlToJson}`)
        }
    }
})