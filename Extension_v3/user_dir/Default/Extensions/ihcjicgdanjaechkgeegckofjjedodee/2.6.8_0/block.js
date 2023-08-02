(()=>{var e={4846:e=>{let s,r=chrome||window.chrome||browser||window.browser;navigator.userAgent.includes("Edge/")&&(r=browser||window.browser);try{s=indexedDB||window.indexedDB}catch(e){s=null,console.log(`Error initializing indexedDB: ${e.message}`)}e.exports={chrome:r,indexedDB:s,performance:performance||window.performance,URL:URL||window.URL}}},s={};function r(a){var t=s[a];if(void 0!==t)return t.exports;var o=s[a]={exports:{}};return e[a](o,o.exports,r),o.exports}r.p="/",chrome||browser||(window.chrome=chrome||window.chrome||window.browser),r.p=(chrome||window.chrome).runtime.getURL(""),(()=>{"use strict";Object.freeze({LicenseStateUnknown:0,LicenseStateFree:1,LicenseStateTrial:2,LicenseStateTrialExpired:3,LicenseStateLicensed:4,LicenseStateLicenseExpired:5,LicenseStateLicenseGrace:6}),Object.freeze([2,4,6]);var e=r(4846);e.chrome.i18n.getUILanguage().split("-")[0];const s=(s,r=document)=>s.forEach((({id:s,msg:a,sub:t=null})=>{const o=r.getElementById(s);o&&(o.textContent=e.chrome.i18n.getMessage(a,t))}));Object.keys({agency:2,army:1,art:3,at:3,bazar:1,beauty:2,best:2,bid:3,bond:2,buzz:1,cam:2,casa:1,cc:1,center:2,cf:3,cfd:2,click:2,club:2,cool:3,cyou:1,date:2,deals:2,digital:3,download:3,enterprises:3,estate:3,expert:2,fit:2,ga:2,gay:3,gdn:3,gq:3,hair:3,help:2,hiv:1,house:2,icu:1,in:3,info:1,life:2,limited:3,link:3,lk:3,loan:2,me:3,men:2,ml:2,monster:2,network:2,one:3,online:2,party:2,press:2,pw:3,red:3,rest:2,report:3,review:2,rocks:2,ryukyu:1,sbs:3,services:2,sexy:2,shop:2,site:2,solutions:2,space:1,stream:3,store:3,su:3,surf:2,tech:3,tk:1,today:2,top:1,uno:1,vip:1,wang:1,website:3,win:3,work:2,ws:2,xxx:2,xyz:1,zone:2});const a=["apk","bin","com","dat","dll","exe","gadget","inf","jar","lnk","msi","pif","scf","scr","slk","bat","cgi","cmd","hta","js","jse","pl","ps1","ps1m","ps1xml","ps2","ps2xml","psc1","psc2","py","sh","vb","vba","vbe","vbs","vbscript","ws","wsc","wsf","doc","docm","docx","dot","dotm","dotx","pot","potm","potx","ppa","ppam","pps","ppsm","ppsx","ppt","pptm","pptx","xla","xlam","xls","xlsb","xlsm","xlsx","xlt","xltm","xltx","7z","arj","deb","gz","pkg","rar","rpm","tar","z","zip","dmg","iso"],t=[".bat.txt",".ps1.txt",".sh.txt",".py.txt"],o=new Map;o.set([...a,...t],"/wp-.*/"),o.set(["exe"],"/wp-(content|admin|includes)/"),new RegExp(`/\\d{10}\\w{6}\\.(${a.join("|")}|${t.map((e=>e.split(".").slice(1).join("\\."))).join("|")})`,"i");Object.defineProperty({},"browser",{writable:!0});Object.defineProperty({},"os",{writable:!0});Object.defineProperty({},"isMV3",{writable:!0});console.debug("BLOCK PAGE");let n={};const i=e=>{const s=(e=>{if(!e)return console.debug("UE: Params Error: No URL passed"),null;let s,r;try{s=new URL(e.toLowerCase().startsWith("blob:")?e.substring(5):e)}catch(s){const a=e.match("(https?:\\/\\/)?(.+)(\\/.+)+\\.([a-zA-Z0-9]+)\\/(.+)\\.([a-zA-Z0-9]+)");r=a&&a.length>=7?a[6]:null}return s&&(r=(s.pathname.endsWith(".")?s.pathname.slice(0,-1):s.pathname).split(".").slice(-1)[0]),r&&r.includes("/")?null:r&&r.toLowerCase()})(e),r=s?`http://${n.params.referrer.split(/^https?:\/\//)[1]}`:`http://${n.params.url.split(/^https?:\/\//)[1]}`;console.debug("Add exclusions was successful. Will redirect to: ",r),window.location.href=r};function c(){const e=document.getElementById("continue-always").checked;console.debug("BLOCK_MV2: Continue ",{continueAlways:e,url:n.params.url});let s=n.getExclusionConst(n.params.type);e?n.updateAllowListViaMessage(n.params,s):n.excludeTemporary(s)}function l(){if(n.params.prevUrl&&n.params.prevUrl.length>0)return window.location.replace(n.params.prevUrl);if(window.history.length>1)return window.history.go(-1);let s;try{s=new URL(n.params.referrer)}catch(e){}e.chrome.tabs.query({currentWindow:!0,active:!0},(r=>{s?e.chrome.tabs.query({currentWindow:!0,url:`${s.origin}/*`},(s=>{s[0].index&&e.chrome.tabs.highlight({tabs:s[0].index},(()=>{r[0].id&&e.chrome.tabs.remove(r[0].id)}))})):r[0].id&&e.chrome.tabs.remove(r[0].id)}))}n.typesAsPlural=e=>{switch(e){case"malware":case"ads":default:return e;case"scam":case"ad":return`${e}s`}},n.templateParameters=()=>{let e={},s=new URLSearchParams(window.location.search);for(let r of s)"null"===r[1]?e[r[0]]=null:"undefined"===r[1]?e[r[0]]=void 0:e[r[0]]=r[1];return e},n.params=n.templateParameters(),console.debug("BLOCK PAGE PARAMS: ",n.params),n.getExclusionConst=e=>{switch(e){case"malware":return"EXCLUSION_MALWARE";case"scam":return"EXCLUSION_SCAMS";case"ad":case"ads":return"EXCLUSION_ADS";default:console.error("The block page exclusion checkbox has not handled '"+n.params.type+"'")}},n.updateAllowListViaMessage=(s,r)=>{if(r){let a=["full-url-malware","malware-pattern"].includes(s.subtype)||"specific"===s.rules?s.url:s.host;$("#continue-always").is(":checked")?(console.debug("Checkbox switched on - requesting allow for "+r),e.chrome.runtime.sendMessage({type:"MSG_ADD_ALLOW",payload:{host:a,allow:r}},(function(e){!e||e.error?console.error(e?e.error:"NO RESPONSE!"):i(s.url)}))):(console.debug("Checkbox switched off - requesting block for "+r),e.chrome.runtime.sendMessage({type:"MSG_REM_ALLOW_SINGLE",payload:{host:a,exclusion:r}},(function(e){!e||e.error?console.error(e?e.error:"NO RESPONSE!"):console.debug("Remove exclusions was successful")})))}},n.excludeTemporary=s=>{if(!$("#mb-do-not-block").checked)return new Promise((s=>{null!==n.params.tabId?s(n.params.tabId):e.chrome.tabs.query({currentWindow:!0,active:!0},(function(e){s(e[0].id)}))})).then((r=>{e.chrome.runtime.sendMessage({type:"MSG_ADD_ALLOW_TEMPORARY",host:n.params.host,initiator:r,exclusion:s},(function(e){return!e||e.error?Promise.reject(e?e.error:null):Promise.resolve(e.success)}))})).then((()=>{i(n.params.url)})).catch((e=>{console.error(e)})),!1},n.getExplanationText=()=>{switch(n.params.subtype){case"adware":return e.chrome.i18n.getMessage("blockExplainAdware");case"compromised":return e.chrome.i18n.getMessage("blockExplainCompromised");case"exploit":return e.chrome.i18n.getMessage("blockExplainExploit");case"fraud":return e.chrome.i18n.getMessage("blockExplainFradulent");case"hijack":return e.chrome.i18n.getMessage("blockExplainHijack");case"malvertising":return e.chrome.i18n.getMessage("blockExplainMalvertising");case"malware":return e.chrome.i18n.getMessage("blockExplainMalware");case"pharma":return e.chrome.i18n.getMessage("blockExplainPharma");case"phishing":return e.chrome.i18n.getMessage("blockExplainPhishing");case"ransomware":return e.chrome.i18n.getMessage("blockExplainRansomware");case"reputation":return e.chrome.i18n.getMessage("blockExplainReputation");case"riskware":return e.chrome.i18n.getMessage("blockExplainRiskware");case"scam":return e.chrome.i18n.getMessage("blockExplainScam");case"spam":return e.chrome.i18n.getMessage("blockExplainSpam");case"spyware":return e.chrome.i18n.getMessage("blockExplainSpyware");case"trojan":return e.chrome.i18n.getMessage("blockExplainTrojan");case"worm":return e.chrome.i18n.getMessage("blockExplainWorm");default:return e.chrome.i18n.getMessage("blockExplainDefault")}},n.getExplanationLink=()=>{switch(n.params.subtype){case"adware":return"https://www.malwarebytes.com/adware/?guard=1&x-source=threatlearn";case"compromised":return"https://blog.malwarebytes.com/glossary/compromised/?guard=1&x-source=threatlearn";case"exploit":return"https://blog.malwarebytes.com/glossary/exploit/?guard=1&x-source=threatlearn";case"fraud":return"https://blog.malwarebytes.com/glossary/fraud/?guard=1&x-source=threatlearn";case"hijack":return"https://blog.malwarebytes.com/glossary/hijack/?guard=1&x-source=threatlearn";case"malvertising":return"https://blog.malwarebytes.com/glossary/malvertising/?guard=1&x-source=threatlearn";case"pharma":return"https://blog.malwarebytes.com/glossary/pharma/?guard=1&x-source=threatlearn";case"phishing":return"https://blog.malwarebytes.com/glossary/phishing/?guard=1&x-source=threatlearn";case"ransomware":return"https://www.malwarebytes.com/ransomware/?guard=1&x-source=threatlearn";case"reputation":case"malware":default:return"https://blog.malwarebytes.com/glossary/malware/?guard=1&x-source=threatlearn";case"riskware":return"https://blog.malwarebytes.com/glossary/riskware/?guard=1&x-source=threatlearn";case"scam":return"https://blog.malwarebytes.com/glossary/scam/?guard=1&x-source=threatlearn";case"spam":return"https://blog.malwarebytes.com/glossary/spam/?guard=1&x-source=threatlearn";case"spyware":return"https://www.malwarebytes.com/spyware/?guard=1&x-source=threatlearn";case"suspiciousPage":case"suspiciousDownload":case"suspiciousContent":case"suspicious":return"https://blog.malwarebytes.com/glossary/suspicious-activity/?guard=1&x-source=threatlearn";case"suspiciousTLD":return"https://blog.malwarebytes.com/glossary/TLD/?guard=1&x-source=threatlearn";case"trojan":return"https://blog.malwarebytes.com/glossary/trojan/?guard=1&x-source=threatlearn";case"worm":return"https://blog.malwarebytes.com/glossary/worm/?guard=1&x-source=threatlearn"}},n.humanReadableSubType=()=>n.params.subtype?"full-url-malware"===n.params.subtype?"malware":"suspiciousPage"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeSuspiciousPage"):"suspiciousTLD"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeSuspiciousTLD"):"suspiciousDownload"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeSuspiciousDownload"):"suspiciousContent"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeSuspiciousContent"):"malware-pattern"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeMalwarePattern"):"alertLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeAlertLoop"):"authRequiredLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeAuthRequiredLoop"):"createURLLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeCreateURLLoop"):"extensionInstall"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeExtensionInstall"):"fullScreenLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeFullScreenLoop"):"historyLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeHistoryLoop"):"notificationLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypeNotificationLoop"):"printLoop"===n.params.subtype?e.chrome.i18n.getMessage("humanReadableSubTypePrintLoop"):n.params.subtype:n.params.type;document.addEventListener("DOMContentLoaded",(function(){window.addEventListener("resize",(()=>{$("#mbbgb-inf").popup({inline:!0,hoverable:!0,lastResort:"bottom center"})})),function(){$("#mbbgb-inf").popup({inline:!0,hoverable:!0,lastResort:"bottom center"}),s([{id:"blocked-by-title",msg:"blockedByTitle"},{id:"block-explanation",msg:"mv3WebsiteBlockExplanation"},{id:"block-alert-text",msg:"mv3WebsiteBlockAlert"},{id:"block-alert-link",msg:"mv3WebsiteBlockMalwarebytesSupport"},{id:"block-go-back",msg:"mv3WebsiteBlockGoBack"},{id:"continue-button",msg:"mv3WebsiteBlockContinue"},{id:"block-continue-always",msg:"mv3WebsiteBlockContinueAlways"},{id:"block-level-up",msg:"mv3WebsiteBlockLevelUp"},{id:"block-level-up-info",msg:"mv3WebsiteBlockLevelUpInfo"},{id:"block-level-up-info-link",msg:"mv3WebsiteBlockLevelUpInfoLink"},{id:"block-level-up-info-contd",msg:"mv3WebsiteBlockLevelUpInfoContd"},{id:"block-get-started",msg:"mv3WebsiteBlockGetStarted"},{id:"block-learn-more",msg:"mv3WebsiteBlockLearnMore"},{id:"block-learn-more-link",msg:"mv3WebsiteBlockLearnMoreLink"}]);const r=n.params.subtype&&""!==n.params.subtype?n.humanReadableSubType():n.typesAsPlural(n.params.type);$("#block-reason").text(e.chrome.i18n.getMessage("websiteBlockHeader")+" "+r)}(),async function(){const s=document.getElementById("app-db-version"),r=e.chrome.runtime.getManifest().version,a=await(o="lastDBused",new Promise(((s,r)=>{e.chrome.storage.local.get(o,(a=>e.chrome.runtime.lastError?r(e.chrome.runtime.lastError):s("string"==typeof o?a[o]:a)))}))),t=`Heuristics: ${n.humanReadableSubType()}`;var o;s.textContent=`v${r} | ${null==a?t:a}`}(),function(){const e=document.querySelector("#block-url"),s=((e,s=2048)=>e.length>s?e.substr(0,s-1)+"...":e)(n.params.host);e.textContent=s}(),document.getElementById("go-back").addEventListener("click",l),document.getElementById("continue-button").addEventListener("click",c),e.chrome.runtime.sendMessage({type:"MSG_IS_NEEDING_NATIVE_MSG",parameters:{source:"blockPage"}},(r=>{e.chrome.runtime.lastError&&console.error("MBN: Chrome Runtime Failure: ",e.chrome.runtime.lastError),r&&r.needsIt&&($("#mbbgb-header-footer").animate({"max-height":"100%",opacity:1},800),s([{id:"nm-header",msg:"nativeMessagingHeader2"},{id:"nm-message",msg:"nativeMessagingMessage2"},{id:"decline-nm",msg:"buttonOptOut"},{id:"accept-nm",msg:"buttonOptIn"}]),[{id:"accept-nm",val:!0},{id:"decline-nm",val:!1}].forEach((({id:s,val:r})=>{document.getElementById(s).addEventListener("click",(async()=>{let s=r?await new Promise((s=>{e.chrome.permissions.request({permissions:["nativeMessaging"]},(e=>{console.log("MMPPNM: Permissions request resp: ",e),s(e)}))})):await new Promise((s=>{e.chrome.permissions.remove({permissions:["nativeMessaging"]},(e=>{e?(console.debug("MRNM: Successfully removed permissions"),s(!1)):(console.log("MRNM: Did not remove permissions... ",e),s(!0))}))}));e.chrome.runtime.sendMessage({type:"MSG_SETTINGS_SET",payload:{enableNativeMessaging:s}},(e=>{!e||e.error?console.error(e&&e.error):console.debug(`PR: Turned ${s?"on":"off"} Native Messaging`),document.getElementById("mbbgb-header-footer").style.display="none"}))}))})))}))}))})()})();