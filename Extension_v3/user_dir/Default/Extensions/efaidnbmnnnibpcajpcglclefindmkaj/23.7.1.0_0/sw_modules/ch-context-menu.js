/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{communicate as e}from"./communicate.js";import{util as t}from"./util.js";import{analytics as n,events as o}from"../common/analytics.js";import{acroActions as a}from"./acro-actions.js";import{SETTINGS as r}from"./settings.js";import{dcLocalStorage as s,dcSessionStorage as i}from"../common/local-storage.js";import{floodgate as l}from"./floodgate.js";import{privateApi as c}from"./private-api.js";import{common as m}from"./common.js";import{userSubscription as E}from"./user-subscription.js";import{userDetailsAcrobat as d}from"./acrobatUserDetails.js";import{LOCAL_FTE_WINDOW as u}from"../common/constant.js";import{CACHE_PURGE_SCHEME as I}from"./constant.js";var p,f,_=new Promise((function(e){f=e})),g={},h=()=>e.getModule("acro-web2pdf"),T=()=>e.getModule("acro-gstate"),A=["http://*/*","https://*/*"];async function N({locale:e}={}){const n=s.getItem("appLocale"),o=s.getItem("installSource");if(["development","normal","sideload"].includes(o)){const o=new URL(m.getUninstallUrl());if(n)o.searchParams.append("locale",n);else if(e)o.searchParams.append("locale",e);else{let e=s.getItem("viewer-locale")||t.getFrictionlessLocale(chrome.i18n.getMessage("@@ui_locale"));o.searchParams.append("locale",e)}o.searchParams.append("theme",s.getItem("theme")||"auto"),o.searchParams.append("callingApp",chrome.runtime.id),chrome.runtime.setUninstallURL(o.href)}}async function w(e){try{e&&(e.reason===chrome.runtime.OnInstalledReason.UPDATE&&e.previousVersion!==chrome.runtime.getManifest().version?(t.verCmp(e.previousVersion,"15.1.3.30")<0?(n.event(n.e.LOCAL_STORAGE_MIGRATION_INIT),await async function(){let e;try{const o=await chrome.tabs.query({});await Promise.allSettled(o.map((({id:e})=>chrome.scripting.executeScript({target:{tabId:e},files:["content_scripts/injectCopyLSIframe.js"]})))),await t.sleep(300),e=await chrome.runtime.sendMessage({main_op:"copy-ls"}),o.map((({id:e})=>chrome.tabs.sendMessage(e,{content_op:"remove-lsCopy"}).catch((()=>null))))}catch(e){}finally{"succeed"!==e?(s.setItem("retryOnNextPage",!0),n.event(n.e.LOCAL_STORAGE_MIGRATION_FAILED)):n.event(n.e.LOCAL_STORAGE_MIGRATION_SUCCESS)}}()):n.event(n.e.LOCAL_STORAGE_ALREADY_MIGRATED),s.getItem("installVersion")||s.setItem("installVersion",e.previousVersion),s.setItem("installType",e.reason)):e.reason===chrome.runtime.OnInstalledReason.INSTALL&&((()=>{const e=`https://chrome.google.com/webstore/detail/*/${chrome.runtime.id}*`,t=`https://microsoftedge.microsoft.com/addons/detail/*/${chrome.runtime.id}*`;chrome.tabs.query({url:[e,t]},(e=>{if(chrome.runtime.lastError)p=null;else for(let t in e){const n=new URLSearchParams(new URL(e[t].url).search);if(n.has("mv")){p=encodeURIComponent(n.get("mv"));break}}}))})(),s.setItem("installVersion",chrome.runtime.getManifest().version),s.setItem("installType",e.reason)),s.getItem("offlineSupportDisable")||s.setItem("offlineSupportDisable",!0)),_.then((({env:o,msg:a})=>{if(s.setItem("installSource",o.installType),N(),e.reason===chrome.runtime.OnInstalledReason.UPDATE&&e.previousVersion!==chrome.runtime.getManifest().version)n.event(n.e.EXTENSION_UPDATE);else if(e.reason===chrome.runtime.OnInstalledReason.INSTALL){switch(n.event(n.e.EXTENSION_INSTALLED),o.installType){case"admin":n.event(n.e.EXTENSION_INSTALLED_ADMIN);break;case"development":n.event(n.e.EXTENSION_INSTALLED_DEVELOPMENT);break;case"other":n.event(n.e.EXTENSION_INSTALLED_OTHER);break;case"normal":c.isInstalledViaUpsell().then((e=>{if(e)n.event(n.e.EXTENSION_INSTALLED_UPSELL);else{n.event(n.e.EXTENSION_INSTALLED_DIRECT);let e="store_direct";p&&(e=decodeURIComponent(p)),n.event(n.e.EXTENSION_INSTALLED_SOURCE,{SOURCE:e})}}));break;case"sideload":n.event(n.e.EXTENSION_INSTALLED_SIDE_LOADED),a.installMonth&&a.installYear?n.event(n.e.EXTENSION_INSTALLED_SIDE_LOADED_MONTH_YEAR,{MONTH:a.installMonth,YEAR:a.installYear}):n.event(n.e.EXTENSION_INSTALLED_SIDE_LOADED_MONTH_YEAR,{MONTH:"None",YEAR:"None"}),r.IS_READER&&"win"===r.OS&&n.event(n.e.EXTENSION_INSTALLED_SIDE_LOADED_SOURCE,{SOURCE:a.source});break;default:n.event(n.e.EXTENSION_INSTALLED_DEFAULT)}!function(e){"false"!==s.getItem("fte")&&setTimeout((()=>{chrome.storage.managed.get("OpenHelpx",(function(o){const a=!o||"false"!==o.OpenHelpx;n.event(a?n.e.VIEWER_FTE_OPEN_HELPX_ENABLED:n.e.VIEWER_FTE_OPEN_HELPX_DISABLED),function(){try{s.getItem("pdfViewer")||(s.setItem("viewer-enabled-source","ownership-install"),s.setItem("pdfViewer","true"),c.setViewerState("enabled"),t.isEdge()?(E.initiateUserPolling(),n.event(n.e.USE_ACROBAT_IN_EDGE_AUTO_ENABLED)):n.event(n.e.USE_ACROBAT_IN_CHROME_AUTO_ENABLED))}catch(e){n.event(n.e.LOCAL_STORAGE_DISABLED)}}(),s.setItem("fte","false");const r=t.isEdge()&&("admin"===e.installType||"sideload"===e.installType);a&&!r&&async function(){let e=chrome.i18n.getMessage("@@ui_locale");["ca","da","en_GB","es","fi","hr","it","ko","nl","pt_BR","ru","sl","tr","zh_CN","cs","de","en_US","eu","fr","hu","ja","nb","pl","ro","sk","sv","uk","zh_TW"].includes(e)||(e="en_US");const n=t.isEdge()?"Edge":"Chrome";return`${m.getWelcomePdfUrlHost()}/dc-chrome-extension/mv/${e}/Acrobat-for-${n}.pdf`}().then((e=>t.createTab(e,(e=>{const t=(new Date).getTime();function o(t,a){e.id==t&&"complete"===a.status&&(n.event(n.e.WELCOME_PDF_LOADED),chrome.tabs.onUpdated.removeListener(o))}g={...e,timestamp:t},chrome.tabs.onUpdated.addListener(o)}))))}))}),2e3)}(o)}}))}catch(e){}}function S(){try{if(navigator.onLine||!1===s.getItem("offlineSupportDisable")){const e=s.getItem("pdfViewer"),t=s.getItem("killSwitch"),o=s.getItem("cdnUrl");"false"===e&&"on"===t&&async function(e){const t=new AbortController,n=t.signal;let o=!1;setTimeout((()=>{o||t.abort()}),5e3);const a=await fetch(e,{signal:n});if(o=!0,200===a.status)return await a.text();return new Error(a.statusText)}(o).then((e=>{-1===e.toString().indexOf("<meta name='killSwitch' content='off'/>")&&-1===e.toString().indexOf('<meta name="killSwitch" content="off"/>')||(s.setItem("pdfViewer",!0),c.setViewerState("enabled"),s.setItem("killSwitch","off"),n.event(n.e.VIEWER_KILL_SWITCH_OFF_SUCCESS))})).catch((e=>{n.event(n.e.VIEWER_KILL_SWITCH_OFF_FAILED)}))}}catch(e){n.event(n.e.VIEWER_KILL_SWITCH_OFF_FAILED)}}function L(e){return t&&t.isChromeOnlyMessage(e)&&t.isEdge()&&(e+="Edge"),t&&t.getTranslation?t.getTranslation(e):chrome.i18n.getMessage(e)}function R(e){return(e.title||L("web2pdfUntitledFileName")).replace(/[<>?:|\*"\/\\'&\.]/g,"")}function O(e,n){if(!e&&!n)return!1;try{const t=e.pageUrl||n.url,o=new URL(t);if(o.protocol&&["http:","https:"].includes(o.protocol))return!0}catch(e){t.consoleError(e)}return!1}function v(e,t){"convertPageContextMenu"===e.menuItemId?function(e,t){O(e,t)&&(n.event(n.e.CONTEXT_MENU_CONVERT_PAGE),h().handleConversionRequest({tabId:t.id,caller:T().web2pdfCaller.MENU,action:T().web2pdfAction.CONVERT,context:T().web2pdfContext.PAGE,url:e.pageUrl||t.url,domtitle:R(t)}))}(e,t):"appendPageContextMenu"===e.menuItemId?function(e,t){O(e,t)&&(n.event(n.e.CONTEXT_MENU_APPEND_PAGE),h().handleConversionRequest({tabId:t.id,caller:T().web2pdfCaller.MENU,action:T().web2pdfAction.APPEND,context:T().web2pdfContext.PAGE,url:e.pageUrl||t.url,domtitle:R(t)}))}(e,t):"convertLinkTargetToPDFContextMenu"===e.menuItemId?function(e,t){O(e,t)&&(n.event(n.e.CONTEXT_MENU_CONVERT_LINK),h().handleConversionRequest({tabId:t.id,caller:T().web2pdfCaller.MENU,action:T().web2pdfAction.CONVERT,context:T().web2pdfContext.LINK,url:e.linkUrl,domtitle:R(t)}))}(e,t):"appendLinkTargetToExistingPDFContextMenu"===e.menuItemId&&function(e,t){O(e,t)&&(n.event(n.e.CONTEXT_MENU_APPEND_LINK),h().handleConversionRequest({tabId:t.id,caller:T().web2pdfCaller.MENU,action:T().web2pdfAction.APPEND,context:T().web2pdfContext.LINK,url:e.linkUrl,domtitle:R(t)}))}(e,t)}function C(e){return t&&t.isChromeOnlyMessage(e)&&t.isEdge()&&(e+="Edge"),t&&t.getTranslation?t.getTranslation(e):chrome.i18n.getMessage(e)}function D(){const e="true"===s.getItem("pdfViewer")?"enabled":"disabled";c.setViewerState(e)}function b(e){const t=e.UsageMeasurement,n=t&&"false"===t.newValue?"false":"true";s.setItem("ANALYTICS_OPT_IN_ADMIN",n)}function M(){const e=s.getItem("pdfViewer");let t="neverTaken";"true"===e?t="enabled":"false"===e&&(t="disabled"),n.event(n.e.DEFAULT_OWNERSHIP_VIEWER_STATUS,{STATUS:t})}async function P(c){(async()=>{const e=await l.hasFlag("dc-cv-locale-option-page",I.NO_CALL);e&&!s.getItem("appLocale")&&s.setItem("appLocale",s.getItem("viewer-locale")||t.getFrictionlessLocale(chrome.i18n.getMessage("@@ui_locale"))),e||s.removeItem("appLocale")})(),async function(){try{const e=await chrome.extension.isAllowedFileSchemeAccess(),{tabId:t,url:a}=s.getItem("localFileFteData");if(s.removeItem("localFileFteData"),e&&t){const{url:e}=await chrome.tabs.get(t);if(e===a){n.event(o.LOCAL_FTE_PERMISSION_GRANTED),await chrome.tabs.reload(t);const e=await chrome.tabs.query({url:"file:///*"});for(let t in e){const{id:n,url:o}=e[t];o.toLowerCase().endsWith(".pdf")&&chrome.tabs.reload(n)}}}}catch(e){t.consoleError(e)}}(),setTimeout(D,1e4),function(){try{t.isEdge()&&s.setItem("IsRunningInEdge","true")}catch(e){}}(),async function(){if(!s.getItem("ANALYTICS_OPT_IN_ADMIN")){const e=await chrome.storage.managed.get("UsageMeasurement"),t=e&&"false"===e.UsageMeasurement?"false":"true";s.setItem("ANALYTICS_OPT_IN_ADMIN",t)}}(),i.getItem("startupComplete")||t.mimeReloadAllTabs(),a.getVersion((async o=>{const a=s.getItem("enableNewExtensionMenu");t.enableNewExtensionMenu(a),o.ver!==r.READER_VER&&o.ver!==r.ERP_READER_VER||(r.IS_READER=!0,r.IS_ACROBAT=!1,o.ver===r.ERP_READER_VER&&(r.IS_ERP_READER=!0),a||(o.ver===r.ERP_READER_VER?chrome.action.setTitle({title:C("web2pdfConvertButtonToolTipERPReader")}):chrome.action.setTitle({title:C("web2pdfOpenButtonText")}))),a||function(e){0!=e&&1!=e&&e!=r.READER_VER&&e!=r.ERP_READER_VER||chrome.action.setTitle({title:""})}(o.ver),s.getItem("adobeYoloEnable")&&r.ADOBE_YOLO_ENABLED&&!s.getWithTTL("adobe-yolo-freeze")&&d.updateUserDetails(),await async function(){const e=await chrome.runtime.getPlatformInfo();var t;r.OS=e.os,r.CHROME_VERSION=0,r.EXTENSION_VERSION=0;try{(t=navigator.userAgent.match(/Chrome\/([0-9]+)/))&&(r.CHROME_VERSION=+t[1])}catch(e){}try{r.EXTENSION_VERSION=chrome.runtime.getManifest().version}catch(e){}i.getItem("startupComplete")||("mac"===e.os?n.event(n.e.OS_MAC_OP):"win"===e.os&&n.event(n.e.OS_WIN_OP))}(),f({env:c,msg:o}),i.getItem("startupComplete")||(S(),function(t){const n=0==t||1==t&&!1===e.NMHConnStatus||t==r.READER_VER||t==r.ERP_READER_VER;chrome.contextMenus.removeAll((function(){r.IS_READER||n||(chrome.contextMenus.create({id:"convertPageContextMenu",title:L("web2pdfConvertPageContextMenu"),contexts:["page"],documentUrlPatterns:A}),chrome.contextMenus.create({id:"appendPageContextMenu",title:L("web2pdfAppendPageContextMenu"),contexts:["page"],documentUrlPatterns:A}),chrome.contextMenus.create({id:"convertLinkTargetToPDFContextMenu",title:L("web2pdfConvertLinkContextMenu"),contexts:["link"],documentUrlPatterns:A}),chrome.contextMenus.create({id:"appendLinkTargetToExistingPDFContextMenu",title:L("web2pdfAppendLinkContextMenu"),contexts:["link"],documentUrlPatterns:A}))}))}(o.ver),n.event(n.e.EXTENSION_STARTUP),setTimeout(M,1e4),i.setItem("startupComplete",!0))}))}function U(e){const{id:t,timestamp:o}=g,a=(new Date).getTime();e===t&&a-o<=15e3&&n.event(n.e.WELCOME_PDF_TAB_CLOSED);const r=s.getItem("signInExperimentShown");if(r){const{currTabId:t,timestamp:o}=JSON.parse(r),i=a-o,l="true"===s.getItem("signInExperimentSuppressed");e===t&&i<=15e3&&!l&&n.event(n.e.SIGN_IN_PROMPT_TAB_CLOSED),s.removeItem("signInExperimentShown"),s.removeItem("signInExperimentSuppressed")}}const x=e=>{const{height:t,width:n}=u;return{height:t,width:n,top:Math.round(.5*(e.height-t)+e.top),left:Math.round(.5*(e.width-n)+e.left)}},y=async({windowId:e})=>{const t=await chrome.windows.get(e);if("fullscreen"===t?.state||"locked-fullscreen"===t?.state)return;const{tabId:n,url:o}=s.getItem("localFileFteData"),[a]=await chrome.tabs.query({currentWindow:!0,active:!0}),r=s.getItem("localFteWindow");if(a&&a.id===n&&a.url===o){const{height:e,width:n,top:o,left:a}=x(t);await chrome.windows.update(r?.id,{height:e,width:n,left:a,top:o,focused:!0})}},F=async n=>{const o=await chrome.windows.get(n.windowId);if("fullscreen"===o?.state||"locked-fullscreen"===o?.state)return;const a=await l.hasFlag("dc-cv-local-file-fte"),r=await(async()=>{const e=t.isEdge(),n=`chrome-extension://${chrome.runtime.id}/*`,o=await chrome.tabs.query({url:n}),a=s.getWithTTL("localFteCooldown"),r=s.getItem("localFteCount")||0,i=s.getItem("localFteDontShowAgain"),l=await chrome.extension.isAllowedFileSchemeAccess();return!(e||l||o.length||i||a||r>=20)})();if(a&&n.url.toLowerCase().startsWith("file://")&&n.url.toLowerCase().endsWith(".pdf")&&r){const{height:t,width:a,top:r,left:i}=x(o);s.setItem("localFileFteData",{tabId:n.id,url:n.url});const l=await chrome.windows.create({height:t,width:a,left:i,top:r,focused:n.active,type:"popup",url:chrome.runtime.getURL("browser/js/local-fte.html")});s.setItem("localFteWindow",l),e.registerHandlers({closeLocalFte:()=>chrome.windows.remove(l.id)})}},V=async e=>{const{tabId:t}=s.getItem("localFileFteData");if(t===e){const e=s.getItem("localFteWindow");chrome.windows.remove(e?.id)}};e.registerHandlers({themeChange:N,localeChange:e=>N({locale:e.locale})});export{P as startup,w as registerActions,U as onWelcomeTabRemoved,v as contextMenuOnClickHandler,b as updateAnalyticsOptInAdmin,y as refocusLocalFteWindow,F as openLocalFteWindow,V as onLocalFileClosed};