
 
const express = require('express');

const router = express.Router();


// include qisheet routes
   const qiSheet = require('./qiSheet');
   const qSheet = require('./qSheet');


   router.use('/qsheet',qSheet);
   router.use('/qiSheet',qiSheet);
   
// module exports
   module.exports = router;  
