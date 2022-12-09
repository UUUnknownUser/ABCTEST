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

router.get('/json',(req,res)=>{

    res.json({

        'hello':'hi!'



    });




});

app.use('/',router);

module.exports.handler=serverless(app);

