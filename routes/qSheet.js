
const express = require('express');

const router = express.Router();
const httpErrors = require('http-errors');

// include qiSheet model
   const qSchema = require('../models/qSchema.js');

 
// create qIsheet
   router.post('/add',async(req,res,next) => {

    try{

      const sheetFormat = { 

        topic : req.body.topic,
        m     : req.body.m,
        n     : req.body.n,
        param : req.body.param,
        value : req.body.value,
        sheets: req.body.sheets

      };

      const newSheet = new qSchema(sheetFormat);
      const savedSheet = await newSheet.save();

      res.status(200).
      json({ "status":200 ,"msg":"q sheet created successfully" });

      //res.send(savedSheet);


    }catch(e){
      res.send(e);
      console.log(e);
    }
    
   });

// delete qIsheet
   router.delete('/delete/:qId',async(req,res,next)=>{
        
      try{


       const temp = await qSchema.
                          findByIdAndDelete(req.params.qId);

        res.status(200).
        json({ "status":200 ,"msg":"q sheet deleted successfully" });
  
      }catch(e)
      {
        console.log(e);
      }

   });

// fetch all qIsheets   
   router.get('/getall',async(req,res,next)=>{
      
       const response = await qSchema.find();
      
       res.status(200).
       send(response);
 
   });


// fetch single qIsheet   
  router.get('/getone/:qId',async(req,res,next) => {
          
   try{

      const response = await qSchema.
                             findById(req.params.qId)
                             .catch((e)=>{
                              console.log(e.status);
                              return new httpErrors.NotFound();
                             })
                             ;

      res.status(200).send(response);

    }catch(e)
    {
      res.send(e);
      console.log(e);
    }

  });


// update single qIsheet  
router.patch('/update/:qId',async(req,res,next) => {
          
  try{

    
    const sheetFormat = { 

      topic : req.body.topic,
      m     : req.body.m,
      n     : req.body.n,
      param : req.body.param,
      value : req.body.value

    };
    
    const temp = await qSchema.
                       findByIdAndUpdate(req.params.qId,
                       sheetFormat);
                    

    res.status(200).
    json({ "status":200 ,"msg":"q sheet updated successfully" });


   }catch(e)
   {
     res.send(e);
     console.log(e);
   }

 });



// module exports
   module.exports = router;  





