const express=require('express');
const serverless=require('serverless-http');

const app=express();

const router=express.Router();
const {surveyList}=require('../db/models/surveyList.server.model');


router.get('/json',(req,res)=>{

   
    

});

app.use('/',router);

module.exports.handler=serverless(app);

