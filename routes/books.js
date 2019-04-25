var express = require('express');
var router = express.Router();
var Book = require('./../models/books');
var Video = require('./../models/videos');
var jwt = require('jsonwebtoken');

router.post('/getLiterature',function (req,res,next) {
    let pagenum = req.body.pagenum;
    let pagesize = req.body.pagesize;
    let skip = (pagenum - 1) * pagesize;
    let total = '';

    let literature = Book.find({type:['books', 'literature']});
    literature.exec((err,doc) => {
        if(err){
            res.json({
                status:'500001',
                msg:'数据操作错误'
            })
        }else{
           total = doc.length;
           literature.sort({'uploadtime':-1}).skip(skip).limit(pagesize).exec((err,docs) => {
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
                                result:{
                                    docs:docs,
                                    total:total
    
                                }
                            })
                        }else{
                            res.json({
                                status:'500004',
                                msg:'暂无数据',
                            })
                        }
                        
                    }
        })
        }
    })
    
   

    // Book.find({type:[ 'books', 'literature' ]}, function(err,docs){
    //     if(err){
    //         res.json({
    //             status:'500001',
    //             msg:'数据操作错误'
    //         })
    //     }else{
    //         if(docs.length > 0){
    //             res.json({
    //                 status:'200000',
    //                 msg:'请求成功',
    //                 result:docs
    //             })
    //         }else{
    //             res.json({
    //                 status:'500004',
    //                 msg:'暂无数据',
    //             })
    //         }
            
    //     }
    // })
  })


  module.exports = router;