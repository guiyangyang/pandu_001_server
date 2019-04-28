var express = require('express');
var router = express.Router();
var Book = require('./../models/books');
var Video = require('./../models/videos');
var jwt = require('jsonwebtoken');

router.post('/getLiterature',function (req,res,next) {
    let pagenum = req.body.pagenum;
    let pagesize = req.body.pagesize;
    let searchType = req.body.type;
    let searchContent = req.body.searchContent;
    let skip = (pagenum - 1) * pagesize;
    let total = '';
    
    let literature = null;
    if(searchContent){
         literature = Book.find({type:['books', 'literature'],"title": new RegExp(searchContent,'i')});
    }else{
         literature = Book.find({type:['books', 'literature']});
    }
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
                        status:'200004',
                        msg:'暂无数据',
                    })
                } 
            }
        })
        }
    })
    
  })

  // 最新分享 
router.post('/getLatestShare',function(req,res,next){
      let size = req.body.size || 6;
      Book.find({}).sort({'uploadtime':-1}).limit(size).exec((err,docs) => {
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
                        data:docs
                    }
                })
            }else{
                res.json({
                    status:'200004',
                    msg:'暂无数据',
                })
            }  
        }
      })
    
  })
// 分享 次数
router.post('/addShareNum',function(req,res,next) {
    let id = req.body.id;
    Book.findOne({'id':id},(err,doc) => {
        if(err){
            res.json({
                status:'500001',
                msg:'数据操作错误'
            })
        }else{
            doc.sharenum++;           
            doc.save((err,docs)=>{
                if(err){
                    res.json({
                        status:'500001',
                        msg:'数据操作错误'
                    })
                }else{
                    res.json({
                        status:'200000',
                        msg:'分享数增加'
                    })
                }
            })
            

        }
     
    })
})
// 分享排行
router.post('/shareRank',function (req,res,next) {
    let size = req.body.size || 6;
    Book.find({}).sort({'sharenum':-1}).limit(size).exec((err,docs) => {
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
                        data:docs
                    }
                })
            }else{
                res.json({
                    status:'200004',
                    msg:'暂无数据',
                })
            }  
        }
    })
  })

  module.exports = router;