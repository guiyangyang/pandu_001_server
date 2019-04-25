var express = require('express');
var router = express.Router();
var Book = require('./../models/books');
var Video = require('./../models/videos');
var jwt = require('jsonwebtoken');

router.get('/getLiterature',function (req,res,next) {
    
    console.log('req.headers')
    console.log(req.headers.authorization)
    let token = req.headers.authorization
    res.json({
        status:'200000',
        msg:'请求成功'
    })
  })


  module.exports = router;