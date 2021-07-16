
 
const express = require('express');

const router = express.Router();


// include qisheet routes
   const qiSheet = require('./qiSheet');


   router.use('/qiSheet',qiSheet);


// module exports
   module.exports = router;  
