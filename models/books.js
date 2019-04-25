var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    id:String,//分类_列表类_时间戳+4位随机数
    title:String,//标题
    img:String,//时间戳+4位随机数_rshhh.png
    introduce:String,//简介
    link:String,//链接地址
    password:String,//密码
    linktype:String,//网盘类型
    effecttime:String,//有效时间
    sharenum:String,//分享次数
    userid:String,
    type:Array,
    // username:String,//上传用户名
    // userphone:String,//用户手机号
    uploadtime:String,//上传时间
    updatetime:String,//更新时间
    deletetime:String,//删除时间
});

module.exports = mongoose.model('Book',bookSchema);
