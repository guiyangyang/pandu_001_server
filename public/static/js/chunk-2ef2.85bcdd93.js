(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2ef2"],{"70sL":function(t,e,a){"use strict";var i=a("lB6Q");a.n(i).a},"9ioM":function(t,e,a){"use strict";a.d(e,"b",function(){return s}),a.d(e,"c",function(){return o}),a.d(e,"a",function(){return n}),a.d(e,"d",function(){return r});var i=a("t3Un");function s(t){return Object(i.a)({url:"/books/getBooks",method:"post",data:t})}function o(t){return Object(i.a)({url:"/books/getLatestShare",method:"post",data:t})}function n(t){return Object(i.a)({url:"/books/addShareNum",method:"post",data:t})}function r(t){return Object(i.a)({url:"/books/shareRank",method:"post",data:t})}},Lrcy:function(t,e,a){"use strict";var i=a("nMae");a.n(i).a},fhkZ:function(t,e,a){t.exports=a.p+"static/img/dshm.ac6ec4a.png"},lB6Q:function(t,e,a){},nMae:function(t,e,a){},s20a:function(t,e,a){"use strict";a.r(e);a("vDqi");var i=a("9ioM"),s=a("ybcg"),o={name:"BooksVue",data:function(){return{dialogVisible:!1,dialogDetail:!1,getBookList:{},bookLists:[],param:{pagenum:1,pagesize:12,searchType:"novel",searchContent:""},currentPage:1,total:100,latestShareList:[],shareRankList:[],radio1:""}},created:function(){this.dataInit()},filters:{dateToFormatter:function(t){return Object(s.a)(t)}},mounted:function(){},methods:{getBook:function(t){this.getBookList=this.bookLists[t],this.dialogVisible=!0,Object(i.a)({id:this.getBookList.id}).then(function(t){}).catch(function(t){console.log("err")})},dataInit:function(){this.getBookLists(),this.getLatestShareList(),this.getShareRankList()},getBookLists:function(){var t=this;Object(i.b)(this.param).then(function(e){"200000"==e.status&&(t.bookLists=e.result.docs,t.bookLists.forEach(function(t,e){""!=t.img&&void 0!=t.img||(t.img="jd.jpg")}),t.total=e.result.total),"200004"==e.status&&t.$message({message:"暂无数据，请稍后再试！",type:"success"})}).catch(function(t){console.log("err")})},getLatestShareList:function(){var t=this;Object(i.c)({size:10}).then(function(e){"200000"==e.status&&(t.latestShareList=e.result.data)}).catch(function(t){console.log("err")})},getShareRankList:function(){var t=this;Object(i.d)({size:6}).then(function(e){"200000"==e.status&&(t.shareRankList=e.result.data)}).catch(function(t){console.log("err")})},getDetails:function(t){this.getBookList=this.bookLists[t],this.dialogDetail=!0,this.getShareRankList()},handleCurrentChange:function(t){this.param.pagenum=t,this.getBookLists()},searchBook:function(){if(""==this.param.searchContent.trim())return!1;this.param.pagenum=1,this.getBookLists()},shareBook:function(t){this.getBookList=this.latestShareList[t],this.dialogVisible=!0}}},n=(a("Lrcy"),a("70sL"),a("KHd+")),r=Object(n.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"literature-box"},[i("el-container",[i("el-main",[i("el-row",t._l(t.bookLists,function(e,a){return i("el-col",{key:a,attrs:{span:6}},[i("div",{staticClass:"book-col"},[i("div",{staticClass:"div-img"},[e.img.length>10?i("img",{attrs:{src:e.img,alt:""}}):i("div",{staticClass:"text-box"},[i("span",[t._v(t._s(e.type[1]))])])]),t._v(" "),i("div",{staticClass:"book-name",attrs:{title:e.title}},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"bookbtn"},[i("span",{on:{click:function(e){t.getDetails(a)}}},[t._v("详情")]),t._v(" "),i("span",{on:{click:function(e){if(e.target!==e.currentTarget)return null;t.getBook(a)}}},[t._v("获取")])])])])})),t._v(" "),i("el-row",{staticClass:"fen-page"},[i("el-col",{attrs:{span:24}},[i("div",[i("el-pagination",{attrs:{background:"",layout:"prev, pager, next","current-page":t.currentPage,"page-size":t.param.pagesize,total:t.total},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)])],1),t._v(" "),i("el-dialog",{attrs:{title:"资源详情",visible:t.dialogDetail,width:"30%"},on:{"update:visible":function(e){t.dialogDetail=e}}},[i("div",{staticClass:"dialogdetail-box"},[i("div",[i("img",{attrs:{src:t.getBookList.img,alt:""}})]),t._v(" "),i("div",[i("div",{staticClass:"title"},[t._v("标题："),i("span",[t._v(t._s(t.getBookList.title))])]),t._v(" "),i("div",{staticClass:"introduce"},[i("div",[t._v(" 简介：")]),t._v(" "),i("div",[t._v(t._s(t.getBookList.introduce))])]),t._v(" "),i("div",{staticClass:"upload-time"},[t._v("上传时间:"+t._s(t._f("dateToFormatter")(t.getBookList.uploadtime)))])])])]),t._v(" "),i("el-dialog",{attrs:{title:"资源分享",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"dialog-box"},[i("img",{attrs:{src:"/static/bdwp.jpg",alt:""}}),t._v(" "),i("div",[t._v("分享链接：\n             "),i("a",{attrs:{href:t.getBookList.link,target:"_blank"}},[t._v(t._s(t.getBookList.link))])]),t._v(" "),i("div",[t._v("分享密码："+t._s(t.getBookList.password))])])])],1),t._v(" "),i("el-aside",{staticClass:"aside-container"},[i("div",[i("el-input",{attrs:{placeholder:"请输入关键词",clearable:"",size:"small"},model:{value:t.param.searchContent,callback:function(e){t.$set(t.param,"searchContent",e)},expression:"param.searchContent"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search",size:"small"},on:{click:t.searchBook},slot:"append"})],1)],1),t._v(" "),i("div",{staticClass:"latest-share"},[i("h3",[t._v("最新分享榜")]),t._v(" "),t._l(t.latestShareList,function(e,a){return i("div",{key:a,on:{click:function(e){t.shareBook(a)}}},[t._v("\n                "+t._s(t._f("dateToFormatter")(e.uploadtime))+" | "+t._s(e.title))])})],2),t._v(" "),i("div",{staticClass:"latest-share"},[i("h3",[t._v("最新排行榜")]),t._v(" "),t._l(t.shareRankList,function(e,a){return i("div",{key:a,on:{click:function(e){t.shareBook(a)}}},[t._v("\n                "+t._s(t._f("dateToFormatter")(e.uploadtime))+" | "+t._s(e.title))])})],2),t._v(" "),i("div",{staticClass:"appreciate"},[i("img",{attrs:{src:a("fhkZ"),alt:""}}),t._v(" "),i("span",[t._v("打赏1块钱，帮我买杯咖啡！")])])])],1)],1)},[],!1,null,"2d1d3cb6",null);r.options.__file="novel.vue";e.default=r.exports},ybcg:function(t,e,a){"use strict";a.d(e,"a",function(){return i});var i=function(t){if(!t)return"";var e=new Date(Number(t)),a=e.getFullYear(),i=e.getMonth()+1;i=s(i);var o=e.getDate();return a+"-"+i+"-"+(o=s(o))};function s(t){return t<10?"0"+t.toString():t}}}]);