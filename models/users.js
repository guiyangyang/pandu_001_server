var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    userid:String,
    username:String,//用户名
    userphone:String,//手机号
    password:String,//密码
    email:String,//邮箱
    regtime:String,//注册时间
    logintime:String,//最近登录时间
    collections:Array,//我的收藏
    token:String
})

module.exports = mongoose.model('User',usersSchema,'users');