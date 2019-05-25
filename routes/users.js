var express = require('express');
var router = express.Router();
var User = require('./../models/users');
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登出 接口
router.post('/logout',function(req,res,next){
  
  let token = req.body.token;
  User.update({token:token}, {token:''}, function(err,doc){
     if(err){
       res.json({
         status:'500001',
         msg:'数据操作错误'
       })
     }else{
       res.json({
         status:'200000',
         msg:'登出成功'
       })
     }
  })
})



// token 登录
router.post('/login', (req,res,next) => {

  let username = req.body.username;
  let password = req.body.password;


  User.find({username:username}, (err,docs) => {
    if(err){
      res.json({
        status:'500001',
        msg:'数据操作错误'
      })
      return 
    }
    if(docs.length>0){
      if(docs[0].password !== password){
        res.json({
          status:'200002',
          msg:'密码错误'
        })
        return
      }


      let content = {username:username};
      let secretkey = 'suiyi';
      let token = jwt.sign(content, secretkey, {
        expiresIn:60*60*1
      })
      let logintime = new Date().getTime();
      docs[0].token = token;
      docs[0].logintime = logintime;
      User(docs[0]).save((err) => {
        if(err){
          res.json({
            status:'500001',
            msg:'数据操作错误'
          })
        }else{
          res.json({
            status:'200000',
            msg:'登录成功',
            result:{
              token:token,
              userphone:docs[0].userphone,
              userid:docs[0].userid,
              username:docs[0].username,
              email:docs[0].email

            }
          })
        }
      })
    }else{
         res.json({
           status:'200001',
           msg:'用户不存在'
         })
    }

  })
})


//注册
router.post('/register', (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  User.find({username:username},(err,docs) => {
  
    if(err){
      res.json({
        status:'500001',
        msg:'数据操作错误'
      })
      return false
    }
    if(docs.length>0){
       res.json({
         status:'200003',
         msg:'用户已注册'
       })
    }else {

      let content = {username:username};
      let secretkey = 'suiyi';
      let token = jwt.sign(content, secretkey, {
        expiresIn:60*60*1
      })
      let regtime = new Date().getTime()
      let userInfo = {
        userphone:'',
        userid:createUserId(16),
        password:password,
        username:username,
        token:token,
        regtime:regtime,
        email:''
      }
     
      User.insertMany(userInfo,function(err,doc){
      
        if(err){
          res.json({
            status:'500001',
            msg:'数据操作错误'
          })
        }else{
          res.json({
            status:'200000',
            msg:'注册成功',
            result:{
              token:userInfo.token,
              userphone:userInfo.userphone,
              userId:userInfo.userid,
              username:userInfo.username,
              email:userInfo.email
            }
          })
        }
      })
    }
  })

})

//修改个人资料
router.post('/modify',(req,res,next) => {
  let userphone = req.body.userphone;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({'username':username},(err,doc) => {
    if(err){
      res.json({
        status:'500001',
        msg:'数据操作错误'
      })
    }else{
      // if(username){
      //   doc.username = username;
      // }
      if(userphone){
        doc.userphone = userphone;
      }
      if(email){
        doc.email = email;
      }
      doc.password = password;
      doc.save((err,docs) =>{
        if(err){
          res.json({
            status:'500001',
            msg:'数据操作错误'
          })
        }else{
          res.json({
            status:'200000',
              msg:'修改成功'
          })
        }
      })
    }
  })
})


//生成 userid
function createUserId(randomLength){
  return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
}
module.exports = router;
