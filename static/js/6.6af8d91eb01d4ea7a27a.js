webpackJsonp([6],{YOyO:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("Dd8w"),a=s.n(r),c=s("Wlxp"),i=s("8stH"),o=s("T452"),n=s("6Xyt"),h=s("qwAB"),l=s("XEAW"),u=s("NYxO"),f=s("lIch"),v=s("F4+m"),y={name:"search",mixins:[v.b,v.d],created:function(){this.getHotKey()},data:function(){return{hotKey:[]}},computed:a()({},Object(u.c)(["searchHistory"]),{shortCut:function(){return this.hotKey.concat(this.searchHistory)}}),components:{SearchBox:c.a,Suggest:n.a,SearchList:f.a,scroll:h.a,Confirm:l.a},methods:a()({getHotKey:function(){var e=this;Object(i.a)().then(function(t){o.a===t.code&&(e.hotKey=t.data.hotkey.slice(0,10))})},clear:function(){this.$refs.confirm.show()},handlePlaylistMixin:function(){var e=this.playList.length>0?"60px":" ";this.$refs.searchResult.style.bottom=e,this.$refs.suggest.refresh(),this.$refs.shortcutWrapper.style.bottom=e,this.$refs.shortcut.refresh()}},Object(u.b)(["clearSearchHistory"])),watch:{query:function(e){var t=this;e||setTimeout(function(){t.$refs.shortcut.refresh()},20)}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search"},[s("div",{staticClass:"search-box-wrapper"},[s("search-box",{ref:"searchBox",on:{query:e.handleQuery}})],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[s("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:e.shortCut,refreshDelay:e.refreshDelay}},[s("div",[s("div",{staticClass:"hot-key"},[s("h1",{staticClass:"title"},[e._v("热门搜索")]),e._v(" "),s("ul",e._l(e.hotKey,function(t,r){return s("li",{key:r,staticClass:"item",on:{click:function(s){e.addQuery(t.k)}}},[s("span",[e._v(e._s(t.k))])])}))]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[s("h1",{staticClass:"title"},[s("span",{staticClass:"text"},[e._v("\n              搜索历史\n            ")]),e._v(" "),s("span",{staticClass:"clear",on:{click:e.clear}},[s("i",{staticClass:"icon-clear"})])]),e._v(" "),s("search-list",{attrs:{searches:e.searchHistory},on:{select:e.addQuery,delete:e.deleteSearchHistory}})],1)])])],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[s("suggest",{ref:"suggest",attrs:{query:e.query},on:{listenScroll:e.listenScroll,saveSearch:e.saveSearch}})],1),e._v(" "),s("confirm",{ref:"confirm",on:{confirm:e.clearSearchHistory}}),e._v(" "),s("router-view")],1)},staticRenderFns:[]};var p=s("VU/8")(y,d,!1,function(e){s("sI+4")},"data-v-fa9f5b56",null);t.default=p.exports},"sI+4":function(e,t){}});
//# sourceMappingURL=6.6af8d91eb01d4ea7a27a.js.map