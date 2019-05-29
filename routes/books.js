var express = require('express');
var router = express.Router();
var Book = require('./../models/books');

//文学历史
// router.post('/getLiterature',function (req,res,next) {
//     let pagenum = req.body.pagenum;
//     let pagesize = req.body.pagesize;
//     let searchType = req.body.type;
//     let searchContent = req.body.searchContent;
//     let skip = (pagenum - 1) * pagesize;
//     let total = '';
    
//     let literature = null;
//     if(searchContent){
//          literature = Book.find({type:['books', 'literature'],"title": new RegExp(searchContent,'i')});
//     }else{
//          literature = Book.find({type:['books', 'literature']});
//     }
//     literature.exec((err,doc) => {
//         if(err){
//             res.json({
//                 status:'500001',
//                 msg:'数据操作错误'
//             })
//         }else{
//            total = doc.length;
//            literature.sort({'uploadtime':-1}).skip(skip).limit(pagesize).exec((err,docs) => {
//             if(err){
//                 res.json({
//                     status:'500001',
//                     msg:'数据操作错误'
//                 })
//             }else{
//                 if(docs.length > 0){
//                     res.json({
//                         status:'200000',
//                         msg:'请求成功',
//                         result:{
//                             docs:docs,
//                             total:total
//                         }
//                     })
//                 }else{
//                     res.json({
//                         status:'200004',
//                         msg:'暂无数据',
//                     })
//                 } 
//             }
//         })
//         }
//     })
//   })
  //各类书籍  列表 
router.post('/getBooks',function (req,res,next) {
    let pagenum = req.body.pagenum;
    let pagesize = req.body.pagesize;
    let searchType = req.body.searchType;
    let searchContent = req.body.searchContent;
    let skip = (pagenum - 1) * pagesize;
    let total = '';
    let findType = null;
    switch(searchType){
        case 'literature':  //文学历史
          findType = ['books', 'literature']
          break;
        case 'novel':       //小说传记
          findType = ['books', 'novel']
          break;
        case 'technology':   //科技时尚
          findType = ['books', 'technology']
          break;
        case 'education':   //教育这薰
          findType = ['books', 'education']
          break;
        case 'others':       //其他
          findType = ['books', 'others']
          break;
        default :
          findType = 'all'

    }

    let books = null;
    if(searchContent && (findType == 'all')){
        books = Book.find({"title": new RegExp(searchContent,'i')});
    }else if(searchContent && (findType != 'all')){
        books = Book.find({'type':findType,"title": new RegExp(searchContent,'i')});
    }else if(searchContent == '' && (findType == 'all')){
        books = Book.find({});
    }else{
        books = Book.find({'type':findType});
    }
    books.exec((err,doc) => {
        if(err){
            res.json({
                status:'500001',
                msg:'数据操作错误'
            })
        }else{
           total = doc.length;
           books.sort({'uploadtime':-1}).skip(skip).limit(pagesize).exec((err,docs) => {
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