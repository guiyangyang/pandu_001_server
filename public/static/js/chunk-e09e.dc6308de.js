(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e09e"],{"3GCQ":function(t,e,i){"use strict";var a=i("O5mT");i.n(a).a},"5zcG":function(t,e,i){},O5mT:function(t,e,i){},fhkZ:function(t,e,i){t.exports=i.p+"static/img/dshm.ac6ec4a.png"},p7LA:function(t,e,i){"use strict";var a=i("5zcG");i.n(a).a},uv4S:function(t,e,i){"use strict";i.r(e);i("vDqi");var a=i("x0N3"),s=i("ybcg"),n={name:"BooksVue",data:function(){return{dialogVisible:!1,dialogDetail:!1,getBookList:{},bookLists:[],param:{pagenum:1,pagesize:12,searchType:"others",searchContent:""},currentPage:1,total:100,latestShareList:[],shareRankList:[],radio1:""}},created:function(){this.dataInit()},filters:{dateToFormatter:function(t){return Object(s.a)(t)}},mounted:function(){},methods:{getBook:function(t){this.getBookList=this.bookLists[t],this.dialogVisible=!0,Object(a.a)({id:this.getBookList.id}).then(function(t){}).catch(function(t){console.log("err")})},dataInit:function(){this.getVideoLists(),this.getLatestShareList(),this.getShareRankList()},getVideoLists:function(){var t=this;Object(a.c)(this.param).then(function(e){"200000"==e.status&&(t.bookLists=e.result.docs,t.bookLists.forEach(function(t,e){""!=t.img&&void 0!=t.img||(t.img="jd.jpg")}),t.total=e.result.total),"200004"==e.status&&t.$message({message:"暂无数据，请稍后再试！",type:"success"})}).catch(function(t){console.log("err")})},getLatestShareList:function(){var t=this;Object(a.b)({size:10}).then(function(e){"200000"==e.status&&(t.latestShareList=e.result.data)}).catch(function(t){console.log("err")})},getShareRankList:function(){var t=this;Object(a.d)({size:6}).then(function(e){"200000"==e.status&&(t.shareRankList=e.result.data)}).catch(function(t){console.log("err")})},getDetails:function(t){this.getBookList=this.bookLists[t],this.dialogDetail=!0,this.getShareRankList()},handleCurrentChange:function(t){this.param.pagenum=t,this.getVideoLists()},searchBook:function(){if(""==this.param.searchContent.trim())return!1;this.param.pagenum=1,this.getVideoLists()},shareBook:function(t){this.getBookList=this.latestShareList[t],this.dialogVisible=!0}}},o=(i("p7LA"),i("3GCQ"),i("KHd+")),r=Object(o.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"literature-box"},[a("el-container",[a("el-main",[a("el-row",t._l(t.bookLists,function(e,i){return a("el-col",{key:i,attrs:{span:6}},[a("div",{staticClass:"book-col"},[a("div",{staticClass:"div-img"},[e.img.length>10?a("img",{attrs:{src:e.img,alt:""}}):a("div",{staticClass:"text-box"},[a("span",[t._v("video")])])]),t._v(" "),a("div",{staticClass:"book-name",attrs:{title:e.title}},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"bookbtn"},[a("span",{on:{click:function(e){t.getDetails(i)}}},[t._v("详情")]),t._v(" "),a("span",{on:{click:function(e){if(e.target!==e.currentTarget)return null;t.getBook(i)}}},[t._v("获取")])])])])})),t._v(" "),a("el-row",{staticClass:"fen-page"},[a("el-col",{attrs:{span:24}},[a("div",[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next","current-page":t.currentPage,"page-size":t.param.pagesize,total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)])],1),t._v(" "),a("el-dialog",{attrs:{title:"资源详情",visible:t.dialogDetail,width:"30%"},on:{"update:visible":function(e){t.dialogDetail=e}}},[a("div",{staticClass:"dialogdetail-box"},[a("div",[a("img",{attrs:{src:t.getBookList.img,alt:""}})]),t._v(" "),a("div",[a("div",{staticClass:"title"},[t._v("标题："),a("span",[t._v(t._s(t.getBookList.title))])]),t._v(" "),a("div",{staticClass:"introduce"},[a("div",[t._v(" 简介：")]),t._v(" "),a("div",[t._v(t._s(t.getBookList.introduce))])]),t._v(" "),a("div",{staticClass:"upload-time"},[t._v("上传时间:"+t._s(t._f("dateToFormatter")(t.getBookList.uploadtime)))])])])]),t._v(" "),a("el-dialog",{attrs:{title:"资源分享",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticClass:"dialog-box"},[a("img",{attrs:{src:"/static/bdwp.jpg",alt:""}}),t._v(" "),a("div",[t._v("分享链接：\n             "),a("a",{attrs:{href:t.getBookList.link,target:"_blank"}},[t._v(t._s(t.getBookList.link))])]),t._v(" "),a("div",[t._v("分享密码："+t._s(t.getBookList.password))])])])],1),t._v(" "),a("el-aside",{staticClass:"aside-container"},[a("div",[a("el-input",{attrs:{placeholder:"请输入关键词",clearable:"",size:"small"},model:{value:t.param.searchContent,callback:function(e){t.$set(t.param,"searchContent",e)},expression:"param.searchContent"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:t.searchBook},slot:"append"})],1)],1),t._v(" "),a("div",{staticClass:"latest-share"},[a("h3",[t._v("最新分享榜")]),t._v(" "),t._l(t.latestShareList,function(e,i){return a("div",{key:i,on:{click:function(e){t.shareBook(i)}}},[t._v("\n                "+t._s(t._f("dateToFormatter")(e.uploadtime))+" | "+t._s(e.title))])})],2),t._v(" "),a("div",{staticClass:"latest-share"},[a("h3",[t._v("最新排行榜")]),t._v(" "),t._l(t.shareRankList,function(e,i){return a("div",{key:i,on:{click:function(e){t.shareBook(i)}}},[t._v("\n                "+t._s(t._f("dateToFormatter")(e.uploadtime))+" | "+t._s(e.title))])})],2),t._v(" "),a("div",{staticClass:"appreciate"},[a("img",{attrs:{src:i("fhkZ"),alt:""}}),t._v(" "),a("span",[t._v("打赏1块钱，帮我买杯咖啡！")])])])],1)],1)},[],!1,null,"94ecb45a",null);r.options.__file="others.vue";e.default=r.exports},x0N3:function(t,e,i){"use strict";i.d(e,"c",function(){return s}),i.d(e,"b",function(){return n}),i.d(e,"a",function(){return o}),i.d(e,"d",function(){return r});var a=i("t3Un");function s(t){return Object(a.a)({url:"/videos/getVideos",method:"post",data:t})}function n(t){return Object(a.a)({url:"/videos/getLatestShare",method:"post",data:t})}function o(t){return Object(a.a)({url:"/videos/addShareNum",method:"post",data:t})}function r(t){return Object(a.a)({url:"/videos/shareRank",method:"post",data:t})}},ybcg:function(t,e,i){"use strict";i.d(e,"a",function(){return a});var a=function(t){if(!t)return"";var e=new Date(Number(t)),i=e.getFullYear(),a=e.getMonth()+1;a=s(a);var n=e.getDate();return i+"-"+a+"-"+(n=s(n))};function s(t){return t<10?"0"+t.toString():t}}}]);