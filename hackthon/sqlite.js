var sqlite = require('sqlite');
var fs = require('fs');
var moment = require('moment');
var sql_template = `
    CREATE TABLE ImageData (
        CREATION_TIME Varchar,
        IMAGE_PATH Text,
        IMAGE_DATA Text,
        IMAGE_RECOGNITION_ID Varchar
      );`
    ];
 
function SQLiteInfra(dbname){
 
    this.dbname = dbname;
 
    function init(dbname){
        this.dbname = dbname;
        if(!fs.existsSync(dbname)){
            sqlite.open(dbname, { cached: true }).then( db => {
                loadTable(db, sql_template);
            });
        }
    }
     function loadTable(db, query){
         if(query.length > 0){
            let res = db.all(query.pop());
            res.then(result => {
                console.log('result', result);
                loadTable(db, query);
            })
           
         }
     }
    init(dbname);
 
    this.setImageData = function(data){
 
       // let setQuery = `INSERT INTO ImageData(`+Object.keys(data).join(',')+`) VALUES('`+ Object.values(data).join('\',\'') +`')`;
 
        sqlite.open(this.dbname, { cached: true }).then( db => {
            let res = db.all(setQuery);
            res.then(result => {
                console.log('result', result);
            })
        });
    }
 
    this.getImageData = function(data, cb){
        var data_str = '';
        if(data){
            data_str =  ` WHERE `+JSON.stringify(a).replace(/:/ig,'=').replace(',',' AND ').replace(/[\{\}]/ig,'');
        }
 
        let setQuery = `SELECT * FROM ImageData`+data_str;
 
        console.log(this.dbname);
 
        sqlite.open(this.dbname, { cached: true }).then( db => {
            let res = db.all(setQuery);
            res.then(result => {
                cb(result);
            })
        });
    }
 
    this.getGroupData = function(data, cb){
        var data_str = '';
        if(data){
            data_str =  ` WHERE `+JSON.stringify(a).replace(/:/ig,'=').replace(',',' AND ').replace(/[\{\}]/ig,'');
        }
 
        let setQuery = `SELECT * FROM GroupData`+data_str;
 

        sqlite.open(this.dbname, { cached: true }).then( db => {
            let res = db.all(setQuery);
            res.then(result => {
                cb(result);
            })
        });
    }
 
    this.getLocationData = function(data, cb){
        var data_str = '';
        if(data){
            data_str =  ` WHERE `+JSON.stringify(a).replace(/:/ig,'=').replace(',',' AND ').replace(/[\{\}]/ig,'');
        }
 
        let setQuery = `SELECT * FROM LocationData`+data_str;
 

        sqlite.open(this.dbname, { cached: true }).then( db => {
            let res = db.all(setQuery);
            res.then(result => {
                cb(result);
            })
        });
    }
 
    this.getTables = function(cb){
 
        let setQuery = `SELECT name FROM sqlite_master WHERE type='table'`;
        
        //console.log(setQuery);

        sqlite.open(this.dbname, { cached: true }).then( db => {
            let res = db.all(setQuery);
            res.then(result => {
                console.log(result);
        
                cb(result);
            })
        });
    }
}
 
// sqlite.open('./database.sqlite', { cached: true }).then( db => {
//     let res = db.all('SELECT name FROM sqlite_master WHERE type=\'table\'');
//     res.then(result => {
//         console.log('result', result);
//     })
// });
 
var db = new SQLiteInfra('./database_all.sqlite');
// db.setImageData({'CREATION_TIME': moment().format('x'),
//     'IMAGE_PATH': 'https://central-ui-assets-dev.s3.us-west-2.amazonaws.com/_1.png',
//     'IMAGE_DATA': '{"statusCode":200,"body":[{"faceId":"9e2088e7-8217-4609-8813-553cb84028e0","faceRectangle":{"top":47,"left":34,"width":37,"height":37},"faceAttributes":{"smile":0,"headPose":{"pitch":0,"roll":7.4,"yaw":-4.3},"gender":"male","age":27.2,"facialHair":{"moustache":0.2,"beard":0.2,"sideburns":0.3},"glasses":"NoGlasses","emotion":{"anger":0.003,"contempt":0.001,"disgust":0,"fear":0,"happiness":0,"neutral":0.993,"sadness":0.002,"surprise":0.001},"blur":{"blurLevel":"medium","value":0.74},"exposure":{"exposureLevel":"goodExposure","value":0.68},"noise":{"noiseLevel":"low","value":0},"makeup":{"eyeMakeup":false,"lipMakeup":true},"accessories":[],"occlusion":{"foreheadOccluded":false,"eyeOccluded":false,"mouthOccluded":false},"hair":{"bald":0.03,"invisible":false,"hairColor":[{"color":"black","confidence":1},{"color":"brown","confidence":0.88},{"color":"other","confidence":0.42},{"color":"gray","confidence":0.09},{"color":"red","confidence":0.09},{"color":"blond","confidence":0.03}]}}}],"headers":{"cache-control":"no-cache","pragma":"no-cache","content-length":"980","content-type":"application/json; charset=utf-8","expires":"-1","x-aspnet-version":"4.0.30319","x-powered-by":"ASP.NET","apim-request-id":"9d0b1e9d-7448-4dd3-bc43-f1890b44097e","strict-transport-security":"max-age=31536000; includeSubDomains; preload","x-content-type-options":"nosniff","date":"Fri, 06 Apr 2018 11:07:27 GMT","connection":"close"},"request":{"uri":{"protocol":"https:","slashes":true,"auth":null,"host":"westcentralus.api.cognitive.microsoft.com","port":443,"hostname":"westcentralus.api.cognitive.microsoft.com","hash":null,"search":"?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise","query":"returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise","pathname":"/face/v1.0/detect","path":"/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise","href":"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"},"method":"post","headers":{"Accept":"application/json","Content-Type":"application/json","Ocp-Apim-Subscription-Key":"e11e8886048f43e5af5044de24726f37","content-length":73}}}',
//     'IMAGE_RECOGNITION_ID': "9e2088e7-8217-4609-8813-553cb84028e0"});
// db.getImageData(null, console.log);
// db.getGroupData(null, console.log);
// db.getLocationData(null, console.log);
db.getTables(console.log);

//module.exports = SQLiteInfra;
 