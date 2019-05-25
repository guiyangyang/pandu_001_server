var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
//连接数据库 用户名 密码
// mongoose.connect('mongodb://127.0.0.1:19999/diskone')
mongoose.connect('mongodb://127.0.0.1:27017/diskone')
// mongoose.connect('mongodb://root:123456@127.0.0.1:27017/dumall')

//监听数据库连接 
mongoose.connection.on("connected",function () {
    console.log('mongodb connected success')
  })
mongoose.connection.on("error",function () {
    console.log('mongodb connected error')
  })

mongoose.connection.on("disconnected",function () {
    console.log('mongodb disconnected')
  })
//二级路由 处理逻辑
router.get('/',function (req,res,next) {
    // res.send('holle,good list .')
    Goods.find({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    })
  })  

module.exports = router;  