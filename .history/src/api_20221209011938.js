const express=require('express');
const serverless=require('serverless-http');

const app=express();

const router=express.Router();

router.get('/',req)


module.exports.handler=serverless(app);