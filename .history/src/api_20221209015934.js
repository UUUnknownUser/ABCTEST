const express=require('express');
const serverless=require('serverless-http');

const app=express();

const router=express.Router();







 


router.get('/json',(req,res)=>{

    res.json({

        'hello':'hi!'



    });




});

app.use('/',router);

module.exports.handler=serverless(app);

