webpackJsonp([8],{d7CY:function(t,s){},"qP2/":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("Dd8w"),n=e.n(i),r=e("AyDw"),a=e("qwAB"),c=e("ZV4u"),o=e("RrnP"),l=e("NYxO"),u=e("F4+m"),h=e("PvFA"),d={name:"UserCenter",mixins:[u.b],components:{switches:r.a,scroll:a.a,SongList:c.a,NoResult:o.a},data:function(){return{switches:[{name:"我喜欢的"},{name:"最近听的"}],currentIndex:0}},computed:n()({},Object(l.c)(["playHistory","favoriteList"]),{showNoResult:function(){return 0===this.currentIndex?this.favoriteList.length<0:this.playHistory.length<0},currentTitle:function(){return 0===this.currentIndex?"暂无收藏歌曲":"最近无听歌记录"}}),methods:n()({selectItem:function(t){this.currentIndex=t},back:function(){this.$router.back()},random:function(){var t=0===this.currentIndex?this.favoriteList:this.playHistory;t.length&&(t=t.map(function(t){return new h.b(t)}),this.randomMusic({list:t}))},selectSong:function(t){this.insertSong(new h.b(t))},handlePlaylistMixin:function(){var t=this.playList.length>0?"60px":0;this.$refs.listWrapper.style.bottom=t,this.$refs.favoriteList&&this.$refs.favoriteList.refresh(),this.$refs.historyList&&this.$refs.historyList.refresh()}},Object(l.b)(["insertSong","randomMusic"]))},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"slide"}},[e("div",{staticClass:"user-center",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"back",on:{click:t.back}},[e("i",{staticClass:"icon-back"})]),t._v(" "),e("div",{staticClass:"switches-wrapper"},[e("switches",{attrs:{switches:t.switches,currentIndex:t.currentIndex},on:{switchesItem:t.selectItem}})],1),t._v(" "),e("div",{staticClass:"play-btn",on:{click:t.random}},[e("i",{staticClass:"icon-play"}),t._v(" "),e("span",{staticClass:"text"},[t._v("随机播放全部")])]),t._v(" "),e("div",{ref:"listWrapper",staticClass:"list-wrapper"},[0===t.currentIndex?e("scroll",{ref:"favoriteList",staticClass:"list-scroll",attrs:{data:t.favoriteList}},[e("div",{staticClass:"list-inner"},[e("song-list",{attrs:{songs:t.favoriteList},on:{select:t.selectSong}})],1)]):t._e(),t._v(" "),1===t.currentIndex?e("scroll",{ref:"historyList",staticClass:"list-scroll",attrs:{data:t.playHistory}},[e("div",{staticClass:"list-inner"},[e("song-list",{attrs:{songs:t.playHistory},on:{select:t.selectSong}})],1)]):t._e()],1),t._v(" "),t.showNoResult?e("div",{staticClass:"no-result-wrapper"},[e("no-result",{attrs:{title:t.currentTitle}})],1):t._e()])])},staticRenderFns:[]};var v=e("VU/8")(d,f,!1,function(t){e("d7CY")},"data-v-26c7c5a7",null);s.default=v.exports}});
//# sourceMappingURL=8.b69560161a880c2160ee.js.map