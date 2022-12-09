const express=require('express');
const serverless=require('serverless-http');

const app=express();

const router=express.Router();
const surveyList}=require('../db/models/surveyList.server.model');


router.get('/json',(req,res)=>{

    // res.json({

    //     'hello':'hi!'

    // });
   
        return an array of the survey
        surveyList.find({}).then((surveyList)=>{
            res.send(surveyList);
        });
        
    
    
});

app.use('/.netlify/functions/api',router);

module.exports.handler=serverless(app);

