var express = require('express');
var router = express.Router();
var Video = require('./../models/videos');

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
//          literature = Video.find({type:['videos', 'literature'],"title": new RegExp(searchContent,'i')});
//     }else{
//          literature = Video.find({type:['videos', 'literature']});
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
  //各类视频  列表 
router.post('/getVideos',function (req,res,next) {
    let pagenum = req.body.pagenum;
    let pagesize = req.body.pagesize;
    let searchType = req.body.searchType;
    let searchContent = req.body.searchContent;
    let skip = (pagenum - 1) * pagesize;
    let total = '';
    console.log('searchType')
    console.log(searchType)
    let findType = [];
    switch(searchType){
        case 'movies':  //文学历史
          findType = ['videos', 'movies']
          break;
        case 'teleplay':       //小说传记
          findType = ['videos', 'teleplay']
          break;
        case 'ITvideo':   //科技时尚
          findType = ['videos', 'ITvideo']
          break;
        case 'interest':   //教育这薰
          findType = ['videos', 'interest']
          break;
        case 'others':       //其他
          findType = ['videos', 'others']
          break;
        default :
          findType = ['videos', 'movies']

    }
    console.log('findType')
    console.log(findType)

    let videos = null;
    if(searchContent){
        videos = Video.find({'type':findType,"title": new RegExp(searchContent,'i')});
    }else{
        videos = Video.find({'type':findType});
    }
    videos.exec((err,doc) => {
        if(err){
            res.json({
                status:'500001',
                msg:'数据操作错误'
            })
        }else{
           total = doc.length;
           videos.sort({'uploadtime':-1}).skip(skip).limit(pagesize).exec((err,docs) => {
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
      Video.find({}).sort({'uploadtime':-1}).limit(size).exec((err,docs) => {
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
    Video.findOne({'id':id},(err,doc) => {
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
    Video.find({}).sort({'sharenum':-1}).limit(size).exec((err,docs) => {
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