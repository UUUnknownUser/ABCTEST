const express=require('express');
const serverless=require('serverless-http');

const app=express();

const router=express.Router();

const {mongoose} =require('../db/mongoose')
let cors                = require('cors')
//load models
const {surveyList}=require('../db/models/surveyList.server.model');

const {surveyResponse}=require('../db/models/surveyResponse.server.model');
const {signUp}=require('../db/models/signUp.server.model');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(cors({ origin: '*'})) 

  router.get('/survey',(req,res)=>{
    //return an array of the survey
    surveyList.find({}).then((surveyList)=>{
        res.send(surveyList);
    });
    

})

router.get('/json',(req,res)=>{

    res.json({

        'hello':'hi!'



    });




});

app.use('/',router);

module.exports.handler=serverless(app);

