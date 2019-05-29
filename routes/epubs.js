var express = require('express');
var router = express.Router();
var Epub = require('./../models/epubs');

  //各类 epub 书籍  列表 
router.post('/getEpubs',function (req,res,next) {
    let pagenum = req.body.pagenum;
    let pagesize = req.body.pagesize;
    let searchType = req.body.searchType;
    let searchContent = req.body.searchContent || '';
    let skip = (pagenum - 1) * pagesize;
    let total = '';
    let findType = null;
    switch(searchType){
        case 'literature':  //文学历史
          findType = ['epubs', 'literature']
          break;
        case 'novel':       //小说传记
          findType = ['epubs', 'novel']
          break;
        case 'technology':   //科技时尚
          findType = ['epubs', 'technology']
          break;
        case 'education':   //教育这薰
          findType = ['epubs', 'education']
          break;
        case 'others':       //其他
          findType = ['epubs', 'others']
          break;
        default :
          findType = 'all'

    }

    let epubs = null;
    if(searchContent && (findType == 'all')){
        epubs = Epub.find({"title": new RegExp(searchContent,'i')});
    }else if(searchContent && (findType != 'all')){
        epubs = Epub.find({'type':findType,"title": new RegExp(searchContent,'i')});
    }else if(searchContent == '' && (findType == 'all')){
        epubs = Epub.find({});
    }else{
        epubs = Epub.find({'type':findType});
    }
    epubs.exec((err,doc) => {
        if(err){
            res.json({
                status:'500001',
                msg:'数据操作错误'
            })
        }else{
           total = doc.length;
           epubs.sort({'uploadtime':-1}).skip(skip).limit(pagesize).exec((err,docs) => {
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
      Epub.find({}).sort({'uploadtime':-1}).limit(size).exec((err,docs) => {
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
    Epub.findOne({'id':id},(err,doc) => {
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
    Epub.find({}).sort({'sharenum':-1}).limit(size).exec((err,docs) => {
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