const bodyParser = require('body-parser');
const express =require('express');
var app = express();

const {mongoose} =require('../../db/mongoose')
let cors                = require('cors')
//load models
const {surveyList}=require('../../db/models/surveyList.server.model');

const {surveyResponse}=require('../../db/models/surveyResponse.server.model');
const {signUp}=require('../../db/models/signUp.server.model');

//middleware
app.use(bodyParser.json());

//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/*
const cors = require('cors');
const frontEndUrl = 'http://localhost:4200/';

app.use(cors({ origin:frontEndUrl}));
*/
//route
app.use(cors({ origin: '*'})) 
//GET survey list
app.get('/survey',(req,res)=>{
    //return an array of the survey
    surveyList.find({}).then((surveyList)=>{
        res.send(surveyList);
    });
    

})

//POST survey list
app.post('/survey',(req,res)=>{
    //create
    // let _id =req.body._id;
    // surveyList.init()
    let name =req.body.name;
    let author =req.body.author;
    let startDate=req.body.startDate;
    let endDate=req.body.endDate;
    let questions =req.body.questions;
   

    let newsurveyList = new surveyList({
       
        name,
        author,
        startDate,
        endDate,
        questions,
        

    });

    newsurveyList.save().then((listDoc)=>{
        //return the full list of survey
        res.send(listDoc);

    });

});





// update
// app.patch('/survey:id',(req,res)=>{
//     //update
//     let _id=req.params.id;
//     surveyList.findByIdAndUpdate({_id},{
//         $set:req.body
//     }).then(()=>{
//         res.sendStatus(200);
//     })

// })

// update
app.put('/survey/:id',(req,res)=>{
    let _id=req.params.id;
    console.log(_id)

    
    surveyList.findByIdAndUpdate(_id,{
        name:req.body.name,
        author:req.body.author,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        questions :req.body.questions,


    
    
    } ,function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            // res.sendStatus(200);
        }})
        
  
});


//del
app.delete('/survey/:id',(req,res)=>{
    //delete
    let _id=req.params.id;
    console.log(_id)
    surveyList.findByIdAndDelete({_id}).then((removedListDoc)=>{
        res.send(removedListDoc);
    });

});





/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

///////////////get response

//get list of q
app.get('/response',(req,res)=>{
 
    surveyResponse.find({}).then((surveyResponse)=>{
        res.send(surveyResponse);
    });

    
});


///////////////////////////////////////////////////////////////////////////////////////////
app.post('/response',(req,res)=>{
    
    surveyResponse.init()

    
 
    let newResponse = new surveyResponse({
        
      
        refId:req.body.refId,
        responseDate:req.body.responseDate,
      
        responses: req.body.responses
    });

  

    newResponse.save().then((listDoc2)=>{
        //return the full list of response
        console.log('save data: ',listDoc2)
        // res.send(listDoc2);
    });
});
   


app.get('/sign',(req,res)=>{
   
    signUp.find({}).then((signUp)=>{
        res.send(signUp);
    });

    
});

//login
app.post('/login',(req,res)=>{
    var userName = req.body.formGroup.UserName;
    var password = req.body.formGroup.Password;

    
    signUp.findOne({username:userName}, function(err,user){
        if(err){
            res.send({
                "Data": "NO",
                "Status": 0,
                "Message": "User not found"
              })
              
        }
        if (user && user.password === password){
           
            res.send({
                //Data is the token to access restricted page 
                "token": "dvcioljwefiosdfjweiofslkdgfjoiejfweiofjiojfsiodvjoiwefohisf",
                "Status": 200,
                "Message": "Login successful"
              })
            
          } else {
                res.send({
                "Data": "NO",
                "Status": 0,
                "Message": "Username or Password incorrect"
                
              })
              
          }      
    }) 
   
    


});
//Sign UP
app.post('/signup',async (req,res)=>{
    //create
    var username =req.body.UserName;
    var password =req.body.Password;
    var cfmpsw = req.body.CfmPassword;
    var email = req.body.Email
   
    

    if(password === cfmpsw){
        
        var newAcct = new signUp({
        username,
        password,
        email
        })
        try{
            const newaA = await signUp.create(newAcct);
            res.send({
                "Status": 200,
                "Message": "Account is created"
              })
        }
        catch(error){
            if(error.code === 11000){
                res.send({
                    "Status": 0,
                    "Message": "Duplicated"
                })
            }
        }

        
    }else{
        res.send({
            "Status": 0,
            "Message": "Password is not match"
          })
    }

    
});



const HOST='localhost'
const PORT=process.env.PORT|| 3000

app.listen(PORT)

console.log(`Server is running at http://${HOST}:${PORT}`)

