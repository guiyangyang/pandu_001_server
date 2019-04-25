var express = require('express');
var router = express.Router();
var Book = require('./../models/books');
var Video = require('./../models/videos');
var jwt = require('jsonwebtoken');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/',function(req,res,next){
    let reqData = req.body;
    console.log(req.body);
    let dataInfo = reqData;
    dataInfo.id = reqData.type[0]+'_'+reqData.type[1]+'_'+getRandomCharacter(4);
    dataInfo.uploadtime = Date.now();
    delete dataInfo.pwdRadio
    console.log('dataInfo')
    console.log(dataInfo)
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
    }else{
      res.json({
        status:'500003',
        msg:'上传失败'
      })
    }
    
})





// router.post('/login',function(req,res,next){
//   var param = {
//     userphone:req.body.userphone,
//     password:req.body.password
//   }
//   console.log('param.userphone')
//   console.log(param.userphone)
//   User.find(param,function(err,doc){
//     if(err){
//       res.json({
//         status:'500001',
//         msg:'数据操作错误',
//       }) 
//     }else{
//       if(doc){
        
//         console.log('cookie')
//         // console.log(doc[0].userid)
//         console.log(doc[0])
//         // res.cookie('userId',doc[0].userid,{
//         //   path:'/',
//         //   maxAge:1000*60*60
//         // });
    
//         res.json({
//           status:'200000',
//           msg:'',
//           result:{
//             data:doc[0]
//           }
//         })
//       }
      
//     }
//   })
// })

//登出 接口
router.post('/logout',function(req,res,next){
  // res.cookie('userId','',{
  //   path:'/',
  //   maxAge:-1
  // })
  let token = req.body.token;
  console.log('logout token ')
  console.log(token)
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

  let userphone = req.body.userphone;
  let password = req.body.password;
  console.log(req.body.userphone)
  console.log(req.body.password)


  User.find({userphone:userphone}, (err,docs) => {
    if(err){
      res.json({
        status:'500001',
        msg:'数据操作错误'
      })
      return 
    }
    console.log('docs')
    console.log(docs)
    if(docs.length>0){
      if(docs[0].password !== password){
        res.json({
          status:'200002',
          msg:'密码错误'
        })
        return
      }


      let content = {userphone:userphone};
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
              msg:docs[0]

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
  let userphone = req.body.userphone
  let password = req.body.password

  User.find({userphone:userphone},(err,docs) => {
    // console.log('docs')
    // console.log(docs)
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

      let content = {userphone:userphone};
      let secretkey = 'suiyi';
      let token = jwt.sign(content, secretkey, {
        expiresIn:60*60*1
      })
      let regtime = new Date().getTime()
      let userInfo = {
        username:'',
        userid:createUserId(16),
        password:password,
        userphone:userphone,
        token:token,
        regtime:regtime
      }
      // let regUser = new User({
      //   username:'',
      //   userid:createUserId(16),
      //   password:password,
      //   userphone:userphone,
      //   token:token,
      //   regtime:regtime
      // },false)
      User.insertMany(userInfo,function(err,doc){
        // regUser.save(function(err,doc){
        // console.log('doc')
        // console.log(doc)
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
              userId:userInfo.userid
            }
          })
        }
      })
      // User.save();
      // docs.push(userInfo)
      // User(docs[0]).save((err) => {
      //   if(err){
      //     res.json({
      //       status:'500001',
      //       msg:'数据操作错误'
      //     })
      //   }else{
      //     res.json({
      //       status:'200000',
      //       msg:'',
      //       result:{
      //         token:token,
      //         userphone:docs[0].userphone,
      //         userid:docs[0].userid,
      //         msg:docs[0]

      //       }
      //     })
      //   }
      // })

    }

  })

})
//生成 userid
function createUserId(randomLength){
  return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
}
//生成随机 时间戳+多位字符
function getRandomCharacter(length){
 return  Date.now() +  Math.random().toString(36).substr(3,length);
}

module.exports = router;
