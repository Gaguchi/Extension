!function(t){function e(e){for(var s,o,r=e[0],c=e[1],l=e[2],u=0,p=[];u<r.length;u++)o=r[u],i[o]&&p.push(i[o][0]),i[o]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);for(d&&d(e);p.length;)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],s=!0,r=1;r<n.length;r++){var c=n[r];0!==i[c]&&(s=!1)}s&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var s={},i={5:0},a=[];function o(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=s,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var r=window.webpackJsonp=window.webpackJsonp||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var d=c;a.push([217,0]),n()}({214:function(t,e,n){"use strict";var s=n(54);n.n(s).a},217:function(t,e,n){"use strict";n.r(e);var s=n(20),i=n(0),a=n(34),o=n(29),r=(n(74),n(9)),c=n.n(r),l=n(3),d=n(14),u={scripts:[],commands:[],domain:""},p={isApplied:l.a.get("isApplied")};l.a.hook(function(t){"isApplied"in t&&(p.isApplied=t.isApplied)});var m={components:{Icon:d.a},data:()=>({store:u,options:p,activeMenu:"scripts"}),computed:{commands(){return this.store.commands.map(function(t){var e=c()(t,2),n=e[0];return{name:e[1],key:n}})},scripts(){return this.store.scripts.map(function(t){return{name:t.custom.name||Object(i.h)(t.meta,"name"),data:t}})}},methods:{toggleMenu(t){this.activeMenu=this.activeMenu===t?null:t},getSymbolCheck:t=>`toggle-${t?"on":"off"}`,onToggle(){l.a.set("isApplied",!this.options.isApplied),this.checkReload()},onManage(){browser.runtime.openOptionsPage(),window.close()},onEditScript(t){browser.tabs.create({url:browser.runtime.getURL(`/options/index.html#scripts/${t.data.props.id}`)}),window.close()},onFindSameDomainScripts(){browser.tabs.create({url:"http://awe.acestream.me"})},onCommand(t){browser.tabs.sendMessage(this.store.currentTab.id,{cmd:"Command",data:t.key})},onToggleScript(t){var e=this,n=t.data,s=!n.config.enabled;Object(i.s)({cmd:"UpdateScriptInfo",data:{id:n.props.id,config:{enabled:s}}}).then(function(){n.config.enabled=s,e.checkReload()})},checkReload(){l.a.get("autoReload")&&browser.tabs.reload(this.store.currentTab.id)},onCreateScript(){var t=this.store,e=t.currentTab;(t.domain?Object(i.s)({cmd:"CacheNewScript",data:{url:e.url.split("#")[0].split("?")[0]}}):Promise.resolve()).then(function(t){var e=["scripts","_new",t].filter(Boolean).join("/");browser.tabs.create({url:browser.runtime.getURL(`/options/index.html#${e}`)}),window.close()})}}},f=(n(214),n(4)),v=Object(f.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-popup"},[n("div",{staticClass:"logo",class:{disabled:!t.options.isApplied}},[n("img",{attrs:{src:"/public/images/icon128.png"}})]),n("div",{staticClass:"menu-item",class:{disabled:!t.options.isApplied},on:{click:t.onToggle}},[n("icon",{attrs:{name:t.getSymbolCheck(t.options.isApplied)}}),n("div",{staticClass:"flex-1",domProps:{textContent:t._s(t.options.isApplied?t.i18n("menuScriptEnabled"):t.i18n("menuScriptDisabled"))}})],1),n("div",{staticClass:"menu"},[n("div",{staticClass:"menu-item",on:{click:t.onManage}},[n("icon",{attrs:{name:"cog"}}),n("div",{staticClass:"flex-1",domProps:{textContent:t._s(t.i18n("menuDashboard"))}})],1)]),n("div",{staticClass:"menu"},[n("div",{staticClass:"menu-item",on:{click:t.onCreateScript}},[n("icon",{attrs:{name:"code"}}),n("div",{staticClass:"flex-1",domProps:{textContent:t._s(t.i18n("menuNewScript"))}})],1)]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.store.domain,expression:"store.domain"}],staticClass:"menu"},[n("div",{staticClass:"menu-item",on:{click:t.onFindSameDomainScripts}},[n("icon",{attrs:{name:"search"}}),n("div",{staticClass:"flex-1",domProps:{textContent:t._s(t.i18n("menuFindScripts"))}})],1)]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.commands.length,expression:"commands.length"}],staticClass:"menu menu-commands",class:{expand:"commands"===t.activeMenu}},[n("div",{staticClass:"menu-item",on:{click:function(e){t.toggleMenu("commands")}}},[n("div",{staticClass:"flex-auto",domProps:{textContent:t._s(t.i18n("menuCommands"))}}),n("icon",{staticClass:"icon-collapse",attrs:{name:"arrow"}})],1),n("div",{staticClass:"submenu"},t._l(t.commands,function(e){return n("div",{staticClass:"menu-item",on:{click:function(n){t.onCommand(e)}}},[n("span",{domProps:{textContent:t._s(e.name)}})])}))]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.scripts.length,expression:"scripts.length"}],staticClass:"menu menu-scripts",class:{expand:"scripts"===t.activeMenu}},[n("div",{staticClass:"menu-item",on:{click:function(e){t.toggleMenu("scripts")}}},[n("div",{staticClass:"flex-auto",domProps:{textContent:t._s(t.i18n("menuMatchedScripts"))}}),n("icon",{staticClass:"icon-collapse",attrs:{name:"arrow"}})],1),n("div",{staticClass:"submenu"},t._l(t.scripts,function(e){return n("div",[n("div",{staticClass:"menu-item",class:{disabled:!e.data.config.enabled},on:{click:function(n){t.onToggleScript(e)}}},[n("icon",{attrs:{name:t.getSymbolCheck(e.data.config.enabled)}}),n("div",{staticClass:"flex-auto ellipsis",attrs:{title:e.name},domProps:{textContent:t._s(e.name)}})],1),n("div",{staticClass:"submenu-buttons"},[n("div",{staticClass:"submenu-button",on:{click:function(n){t.onEditScript(e)}}},[n("icon",{attrs:{name:"code"}})],1)])])}))])])},[],!1,null,null,null);v.options.__file="app.vue";var b=v.exports;o.c(),s.default.prototype.i18n=i.k;var h=document.createElement("div");document.body.appendChild(h),new s.default({render:function(t){return t(b)}}).$mount(h),Object.assign(a.a,{SetPopup(t,e){u.currentTab.id===e.tab.id&&(u.commands=t.menus,Object(i.s)({cmd:"GetMetas",data:t.ids}).then(function(t){u.scripts=t}))}}),browser.tabs.query({currentWindow:!0,active:!0}).then(function(t){var e={id:t[0].id,url:t[0].url};if(u.currentTab=e,browser.tabs.sendMessage(e.id,{cmd:"GetPopup"}),/^https?:\/\//i.test(e.url)){var n=e.url.match(/:\/\/([^/]*)/)[1];u.domain=o.a(n)||n}})},54:function(t,e,n){}});