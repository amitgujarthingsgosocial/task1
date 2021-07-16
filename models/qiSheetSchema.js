
const mongoose = require('mongoose');

const qiSheetSchema = mongoose.Schema({

  topic:{ type: String },
  m :{ type:Number},
  n :{ type:Number},
  param:{type:mongoose.Schema.Types.Mixed },
  value:[{type:mongoose.Schema.Types.Mixed }]

});

module.exports = mongoose.model('qiSheet',qiSheetSchema);