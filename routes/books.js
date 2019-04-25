var express = require('express');
var router = express.Router();
var Book = require('./../models/books');
var Video = require('./../models/videos');
var jwt = require('jsonwebtoken');

router.get('/getLiterature',function (req,res,next) {
    
    Book.find({type:[ 'books', 'literature' ]}, function(err,docs){
        if(err){
            res.json({
                status:'500001',
                msg:'数据操作错误'
            })
        }else{
            if(docs.length > 0){
                res.json({
                    status:'200000',
                    msg:'请求成功',
                    result:docs
                })
            }else{
                res.json({
                    status:'500004',
                    msg:'暂无数据',
                })
            }
            
        }
    })
  })


  module.exports = router;