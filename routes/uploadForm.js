var express = require('express');
var router = express.Router();
var Book = require('./../models/books');
var Video = require('./../models/videos');
var Epub = require('./../models/epubs');
var Epub = require('./../models/epubs');
var jwt = require('jsonwebtoken');
var fs = require('fs');
// var formidable = require('formidable')
// const querystring = require("querystring");

// var multiparty = require('multiparty');

// var baseUrl = 'http://127.0.0.1:3001/';
var baseUrl = 'http://yuedu.1539.ink/';

router.post('/',function(req,res,next){
    let reqData = req.body;
    if(reqData.coverimg == '' || reqData.coverimg == undefined){
      // if(reqData.type[0] == 'books'){
      //   reqData.img = baseUrl+'public/images/bookImg/book.jpg'
      // }
      // if(reqData.type[0] == 'videos'){
      //   reqData.img = baseUrl+'public/images/videoImg/video.jpg'
      // }
      
    }else{
     
      if(reqData.type[0] == 'books'){
        let path = 'public/images/bookImg/' +'books_'+ getRandomCharacter(4) + '.jpg';
        saveImg(reqData.coverimg,path);
        reqData.img = baseUrl + path;
      }
      if(reqData.type[0] == 'videos'){
        let path = 'public/images/videoImg/' +'videos_'+ getRandomCharacter(4) + '.jpg';
        saveImg(reqData.coverimg,path);
        reqData.img = baseUrl + path;
      }
      if(reqData.type[0] == 'epubs'){
        let path = 'public/images/epubImg/' +'epubs_'+ getRandomCharacter(4) + '.jpg';
        saveImg(reqData.coverimg,path);
        reqData.img = baseUrl + path;
      }
      
    }


    delete reqData.coverimg;
    delete reqData.pwdRadio;
    let dataInfo = reqData;
    dataInfo.id = reqData.type[0]+'_'+reqData.type[1]+'_'+getRandomCharacter(4);
    dataInfo.sharenum = '0';
    dataInfo.uploadtime = Date.now();
    if(reqData.type[0] == 'books'){  //上传 书籍
        Book.insertMany(dataInfo,function(err,doc){
            if(err){
              res.json({
                status:'500001',
                msg:'数据操作错误'
              })
            }else{
              res.json({
                status:'200000',
                msg:'上传成功',
                result:{}
              })
            }
          })
    }else if(reqData.type[0] == 'videos'){
      Video.insertMany(dataInfo,function(err,doc){
        if(err){
          res.json({
            status:'500001',
            msg:'数据操作错误'
          })
        }else{
          res.json({
            status:'200000',
            msg:'上传成功',
            result:{}
          })
        }
      })
    }else if(reqData.type[0] == 'epubs'){ // 上传 epub 封面信息
      Epub.insertMany(dataInfo,function(err,doc){
        if(err){
          res.json({
            status:'500001',
            msg:'数据操作错误'
          })
        }else{
          res.json({
            status:'200000',
            msg:'上传成功',
            result:{}
          })
        }
      })
    }else{
      res.json({
        status:'500003',
        msg:'上传失败'
      })
    }
    
})

//上传  epub电子书
router.post('/epub',function(req,res,next){
  console.log(req.body)
  
  
  res.json({
    status:'200000',
    msg:'上传成功',
    result:{
      // data:path
    }
  })
})
 
//上传图片
router.post('/upImg',function(req,res,next){
  let path = 'public/images/bookImg/' + Date.now() + '.jpg';
  let img = req.body.img;
  let img64 = img.replace(/^data:image\/\w+;base64,/,'');
  let dataBuffer = new Buffer(img64,'base64');
  fs.writeFile(path,dataBuffer,function(err){
    if(err){
      console.log(err)
    }else{
      res.json({
        status:'200000',
        msg:'图片上传成功',
        result:{
          data:path
        }
      })
    }
  })
  
})

function saveImg(base,path){

  let img64 = base.replace(/^data:image\/\w+;base64,/,'');
  let dataBuffer = new Buffer(img64,'base64');
  fs.writeFile(path,dataBuffer,function(err){
    if(err){
      console.log('图片写入失败!')
    }else{
      console.log('图片写入成功!')
    }
  })
}





//生成 userid
function createUserId(randomLength){
  return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
}
//生成随机 时间戳+多位字符
function getRandomCharacter(length){
 return  Date.now() + '_'+ Math.random().toString(36).substr(3,length);
}

module.exports = router;
