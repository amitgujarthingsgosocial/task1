
const express = require('express');

const router = express.Router();
const httpErrors = require('http-errors');

// include qiSheet model
   const qiSheetSchema = require('./../models/qiSheetSchema');
   const qSchema = require('../models/qSchema.js');

 
// create qisheet
   router.post('/add',async(req,res,next) => {

    try{

      const sheetFormat = { 

        topic : req.body.topic,
        m     : req.body.m,
        n     : req.body.n,
        param : req.body.param,
        value : req.body.value

      };

      const newSheet = new qiSheetSchema(sheetFormat);
      const savedSheet = await newSheet.save();

      res.status(200).
      json({ "status":200 ,"msg":"sheet created successfully" });

      //res.send(savedSheet);


    }catch(e){
      
      console.log(e);
    }
    
   });
   
// create qisheet 1
router.post('/add1',async(req,res,next) => {

  try{

    const sheetFormat = { 

      topic : req.body.topic,
      m     : req.body.m,
      n     : req.body.n,
      param : req.body.param,
      value : req.body.value

    };

    const newSheet = new qiSheetSchema(sheetFormat);
    const savedSheet = await newSheet.save();
     
    const update  = await  qSchema.
                          findByIdAndUpdate(req.body.qsheetId,{
                            $push: { 
                              sheets:
                               { topic: savedSheet.topic, path: savedSheet._id }
                             }}, { new: true }).select('sheets');

    const temp2  =   update  ;               
    // res.status(200).
    // json({ "status":200 ,"msg":"sheet created successfully" });

    res.send(temp2);


  }catch(e){
    
    console.log(e);
  }
  
 });




// delete qisheet
  router.delete('/delete1/:qId',async(req,res,next)=>{
          
    try{


    const response = await qiSheetSchema.
                        findByIdAndDelete(req.params.qId)
                        .select('_id');

      const temp = await qSchema.updateOne({},{
        $pull :{ sheets :{ path : response._id  } }
      });

      res.status(200).
      json({ "status":200 ,"msg":"sheet deleted successfully" });

    }catch(e)
    {
      console.log(e);
    }

  });

// fetch all qisheets   
   router.get('/getall',async(req,res,next)=>{
      
       const response = await qiSheetSchema.find();
      
       res.status(200).
       send(response);
 
   });


// fetch single qisheet   
  router.get('/getone/:qId',async(req,res,next) => {
          
   try{

      const response = await qiSheetSchema.
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


// update single qisheet  
router.patch('/update/:qId',async(req,res,next) => {
          
  try{

    
    const sheetFormat = { 

      topic : req.body.topic,
      m     : req.body.m,
      n     : req.body.n,
      param : req.body.param,
      value : req.body.value

    };
    
    const temp = await qiSheetSchema.
                       findByIdAndUpdate(req.params.qId,
                       sheetFormat);
                    

    res.status(200).
    json({ "status":200 ,"msg":"sheet updated successfully" });


   }catch(e)
   {
     res.send(e);
     console.log(e);
   }

 });




// module exports
   module.exports = router;  







 
  //  router.get('/', (req, res) =>
  //  qISchema
  //  .findById(req.query.qIid)
  //  .select(`m n topic sheets ${req.query.request}`)
   
  //  .then(qI => res.json(qI))
  //  .catch(err => console.log(err))
  // );
   
  // router.post('/', (req, res) => {
  //  function update(qIid, name, value, m, n, param, topic) {
  //  const toUpdate = {};
  //  name ? (toUpdate[['param.' + name]] = value) : '';
  //  m ? (toUpdate['m'] = m) : '';
  //  n ? (toUpdate['n'] = n) : '';
  //  param ? (toUpdate['param'] = param) : '';
  //  topic ? (toUpdate['topic'] = [topic]) : '';
  //  qISchema.findByIdAndUpdate(qIid, { $set: toUpdate }, { upsert: true }).select('_id').then(qI => res.send(qI._id));
  //  }
  //  ppSchema
  //  .findById(req.query.ppId)
  //  .select('qIid')
  //  .then(pp => {
  //  if (pp.qIid) {
  //  update(
  //  pp.qIid,
  //  req.body.name,
  //  req.body.value,
  //  req.body.m,
  //  req.body.n,
  //  req.body.param,
  //  req.body.topic
  //  );
  //  } else {
  //  qISchema
  //  .create({
  //  topic: req.body.topic,
  //  m: req.body.m,
  //  n: req.body.n
  //  })
  //  .then(qI => {
  //  ppSchema
  //  .findByIdAndUpdate(req.query.ppId, { $set: { qIid: qI._id } }).exec();
  //  res.send(qI._id);
  //  update(
  //  qI._id,
  //  req.body.name,
  //  req.body.value,
  //  req.body.m,
  //  req.body.n,
  //  req.body.param,
  //  req.body.topic
  //  );
  //  });
  //  }
  //  })
  //  .catch(err => console.log(err));
  // });
   
  // router.post('/updateTopic', (req, res) =>
  //  qISchema
  //  .findByIdAndUpdate(
  //  req.query.qIid,
  //  { $set: { [`topic.${req.body.toId}`]: req.body.value } },
  //  { new: true }
  //  )
  //  .select('topic')
   
  //  .then(qI => res.json(qI.topic))
  //  .catch(err => console.log(err))
  // );
   
  // router.post('/fill', (req, res) => {
  //  qISchema
  //  .findByIdAndUpdate(
  //  req.query.qIid,
  //  { $set: { [`value.${req.body.fId}.${req.body.name}`]: req.body.value } }
  //  ).select('value').then(() => res.end('updated')).catch(err => console.log(err));
  // });
   
  // router.post('/addSheet', (req, res) => {
  //  qiSheetSchema
  //  .create({
  //  topic: req.body.topic,
  //  m: req.body.m,
  //  n: req.body.n
  //  })
  //  .then(sheet =>

  //  qISchema
  //  .findByIdAndUpdate(
  //  req.query.qIid,
  //  {
  //  $push: { sheets: { topic: req.body.topic, path: sheet._id } }
  //  },
  //  { new: true }
  //  )
  //  .select('sheets')
  //  .then(qI => res.json(qI.sheets))

  //  )
  //  .catch(err => console.log(err));
  // });
   
  
  





