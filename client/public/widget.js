(function(){"use strict";const R={equals:(e,t)=>e===t};let ue=pe;const L=1,U=2,fe={owned:null,cleanups:null,context:null,owner:null};var b=null;let Z=null,p=null,v=null,T=null,z=0;function Me(e,t){const n=p,s=b,l=e.length===0,o=l?fe:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},i=l?e:()=>e(()=>W(()=>X(o)));b=o,p=null;try{return H(i,!0)}finally{p=n,b=s}}function E(e,t){t=t?Object.assign({},R,t):R;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=l=>(typeof l=="function"&&(l=l(n.value)),we(n,l));return[ge.bind(n),s]}function $(e,t,n){const s=ee(e,t,!1,L);D(s)}function de(e,t,n){ue=We;const s=ee(e,t,!1,L);(!n||!n.render)&&(s.user=!0),T?T.push(s):D(s)}function w(e,t,n){n=n?Object.assign({},R,n):R;const s=ee(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,D(s),ge.bind(s)}function W(e){if(p===null)return e();const t=p;p=null;try{return e()}finally{p=t}}function B(e){de(()=>W(e))}function he(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function ge(){if(this.sources&&this.state)if(this.state===L)D(this);else{const e=v;v=null,H(()=>G(this),!1),v=e}if(p){const e=this.observers?this.observers.length:0;p.sources?(p.sources.push(this),p.sourceSlots.push(e)):(p.sources=[this],p.sourceSlots=[e]),this.observers?(this.observers.push(p),this.observerSlots.push(p.sources.length-1)):(this.observers=[p],this.observerSlots=[p.sources.length-1])}return this.value}function we(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&H(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l],i=Z&&Z.running;i&&Z.disposed.has(o),(i?!o.tState:!o.state)&&(o.pure?v.push(o):T.push(o),o.observers&&ye(o)),i||(o.state=L)}if(v.length>1e6)throw v=[],new Error},!1)),t}function D(e){if(!e.fn)return;X(e);const t=b,n=p,s=z;p=b=e,Ne(e,e.value,s),p=n,b=t}function Ne(e,t,n){let s;try{s=e.fn(t)}catch(l){return e.pure&&(e.state=L,e.owned&&e.owned.forEach(X),e.owned=null),e.updatedAt=n+1,me(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?we(e,s):e.value=s,e.updatedAt=n)}function ee(e,t,n,s=L,l){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:null,pure:n};return b===null||b!==fe&&(b.owned?b.owned.push(o):b.owned=[o]),o}function q(e){if(e.state===0)return;if(e.state===U)return G(e);if(e.suspense&&W(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<z);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===L)D(e);else if(e.state===U){const s=v;v=null,H(()=>G(e,t[0]),!1),v=s}}function H(e,t){if(v)return e();let n=!1;t||(v=[]),T?n=!0:T=[],z++;try{const s=e();return Le(n),s}catch(s){n||(T=null),v=null,me(s)}}function Le(e){if(v&&(pe(v),v=null),e)return;const t=T;T=null,t.length&&H(()=>ue(t),!1)}function pe(e){for(let t=0;t<e.length;t++)q(e[t])}function We(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:q(s)}for(t=0;t<n;t++)q(e[t])}function G(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const l=s.state;l===L?s!==t&&(!s.updatedAt||s.updatedAt<z)&&q(s):l===U&&G(s,t)}}}function ye(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=U,n.pure?v.push(n):T.push(n),n.observers&&ye(n))}}function X(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const o=l.pop(),i=n.observerSlots.pop();s<l.length&&(o.sourceSlots[i]=s,l[s]=o,n.observerSlots[s]=i)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)X(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function me(e){throw e}function _(e,t){return W(()=>e(t||{}))}const Ie=e=>`Stale read from <${e}>.`;function O(e){const t=e.keyed,n=w(()=>e.when,void 0,{equals:(s,l)=>t?s===l:!s==!l});return w(()=>{const s=n();if(s){const l=e.children;return typeof l=="function"&&l.length>0?W(()=>l(t?s:()=>{if(!W(n))throw Ie("Show");return e.when})):l}return e.fallback},void 0,void 0)}const Be=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Oe=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Be]),je=new Set(["innerHTML","textContent","innerText","children"]),Ve=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Fe=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function De(e,t){const n=Fe[e];return typeof n=="object"?n[t]?n.$:void 0:n}const He=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Re={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Ue(e,t,n){let s=n.length,l=t.length,o=s,i=0,r=0,f=t[l-1].nextSibling,m=null;for(;i<l||r<o;){if(t[i]===n[r]){i++,r++;continue}for(;t[l-1]===n[o-1];)l--,o--;if(l===i){const C=o<s?r?n[r-1].nextSibling:n[o-r]:f;for(;r<o;)e.insertBefore(n[r++],C)}else if(o===r)for(;i<l;)(!m||!m.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[o-1]&&n[r]===t[l-1]){const C=t[--l].nextSibling;e.insertBefore(n[r++],t[i++].nextSibling),e.insertBefore(n[--o],C),t[l]=n[o]}else{if(!m){m=new Map;let d=r;for(;d<o;)m.set(n[d],d++)}const C=m.get(t[i]);if(C!=null)if(r<C&&C<o){let d=i,k=1,F;for(;++d<l&&d<o&&!((F=m.get(t[d]))==null||F!==C+k);)k++;if(k>C-r){const se=t[i];for(;r<C;)e.insertBefore(n[r++],se)}else e.replaceChild(n[r++],t[i++])}else i++;else t[i++].remove()}}}const be="_$DX_DELEGATE";function ze(e,t,n,s={}){let l;return Me(o=>{l=o,t===document?e():x(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{l(),t.textContent=""}}function y(e,t,n){let s;const l=()=>{const i=document.createElement("template");return i.innerHTML=e,n?i.content.firstChild.firstChild:i.content.firstChild},o=t?()=>(s||(s=l())).cloneNode(!0):()=>W(()=>document.importNode(s||(s=l()),!0));return o.cloneNode=o,o}function te(e,t=window.document){const n=t[be]||(t[be]=new Set);for(let s=0,l=e.length;s<l;s++){const o=e[s];n.has(o)||(n.add(o),t.addEventListener(o,Je))}}function P(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function qe(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function ve(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ge(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const l=n[0];e.addEventListener(t,n[0]=o=>l.call(e,n[1],o))}else e.addEventListener(t,n)}function Xe(e,t,n={}){const s=Object.keys(t||{}),l=Object.keys(n);let o,i;for(o=0,i=l.length;o<i;o++){const r=l[o];!r||r==="undefined"||t[r]||(xe(e,r,!1),delete n[r])}for(o=0,i=s.length;o<i;o++){const r=s[o],f=!!t[r];!r||r==="undefined"||n[r]===f||!f||(xe(e,r,!0),n[r]=f)}return n}function Ke(e,t,n){if(!t)return n?P(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let l,o;for(o in n)t[o]==null&&s.removeProperty(o),delete n[o];for(o in t)l=t[o],l!==n[o]&&(s.setProperty(o,l),n[o]=l);return n}function K(e,t={},n,s){const l={};return s||$(()=>l.children=j(e,t.children,l.children)),$(()=>t.ref&&t.ref(e)),$(()=>Ye(e,t,n,!0,l,!0)),l}function $e(e,t,n){return W(()=>e(t,n))}function x(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return j(e,t,s,n);$(l=>j(e,t(),l,n),s)}function Ye(e,t,n,s,l={},o=!1){t||(t={});for(const i in l)if(!(i in t)){if(i==="children")continue;l[i]=_e(e,i,null,l[i],n,o)}for(const i in t){if(i==="children"){s||j(e,t.children);continue}const r=t[i];l[i]=_e(e,i,r,l[i],n,o)}}function Qe(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function xe(e,t,n){const s=t.trim().split(/\s+/);for(let l=0,o=s.length;l<o;l++)e.classList.toggle(s[l],n)}function _e(e,t,n,s,l,o){let i,r,f,m,C;if(t==="style")return Ke(e,n,s);if(t==="classList")return Xe(e,n,s);if(n===s)return s;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const d=t.slice(3);s&&e.removeEventListener(d,s),n&&e.addEventListener(d,n)}else if(t.slice(0,10)==="oncapture:"){const d=t.slice(10);s&&e.removeEventListener(d,s,!0),n&&e.addEventListener(d,n,!0)}else if(t.slice(0,2)==="on"){const d=t.slice(2).toLowerCase(),k=He.has(d);if(!k&&s){const F=Array.isArray(s)?s[0]:s;e.removeEventListener(d,F)}(k||n)&&(Ge(e,d,n,k),k&&te([d]))}else if(t.slice(0,5)==="attr:")P(e,t.slice(5),n);else if((C=t.slice(0,5)==="prop:")||(f=je.has(t))||!l&&((m=De(t,e.tagName))||(r=Oe.has(t)))||(i=e.nodeName.includes("-")))C&&(t=t.slice(5),r=!0),t==="class"||t==="className"?ve(e,n):i&&!r&&!f?e[Qe(t)]=n:e[m||t]=n;else{const d=l&&t.indexOf(":")>-1&&Re[t.split(":")[0]];d?qe(e,d,t,n):P(e,Ve[t]||t,n)}return n}function Je(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const s=n[t];if(s&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?s.call(n,l,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function j(e,t,n,s,l){for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,i=s!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(t=t.toString()),i){let r=n[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),n=V(e,n,s,r)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||o==="boolean")n=V(e,n,s);else{if(o==="function")return $(()=>{let r=t();for(;typeof r=="function";)r=r();n=j(e,r,n,s)}),()=>n;if(Array.isArray(t)){const r=[],f=n&&Array.isArray(n);if(ne(r,t,n,l))return $(()=>n=j(e,r,n,s,!0)),()=>n;if(r.length===0){if(n=V(e,n,s),i)return n}else f?n.length===0?Ce(e,r,s):Ue(e,n,r):(n&&V(e),Ce(e,r));n=r}else if(t instanceof Node){if(Array.isArray(n)){if(i)return n=V(e,n,s,t);V(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function ne(e,t,n,s){let l=!1;for(let o=0,i=t.length;o<i;o++){let r=t[o],f=n&&n[o];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))l=ne(e,r,f)||l;else if(typeof r=="function")if(s){for(;typeof r=="function";)r=r();l=ne(e,Array.isArray(r)?r:[r],Array.isArray(f)?f:[f])||l}else e.push(r),l=!0;else{const m=String(r);f&&f.nodeType===3?(f.data=m,e.push(f)):e.push(document.createTextNode(m))}}return l}function Ce(e,t,n=null){for(let s=0,l=t.length;s<l;s++)e.insertBefore(t[s],n)}function V(e,t,n,s){if(n===void 0)return e.textContent="";const l=s||document.createTextNode("");if(t.length){let o=!1;for(let i=t.length-1;i>=0;i--){const r=t[i];if(l!==r){const f=r.parentNode===e;!o&&!i?f?e.replaceChild(l,r):e.insertBefore(l,n):f&&r.remove()}else o=!0}}else e.insertBefore(l,n);return[l]}const zt="",Ze=(e=1)=>new Promise(t=>{setTimeout(()=>{t(e)},e)}),Se={showControls:!1,shape:"square",height:150,width:150,scaleView:2,placement:"right",edgeMargins:10,isDragWidget:!0,playSize:10,playColor:"#fcaeee",playIconColors:"#fcaeee",showBorder:!0,borderColor:"#fcaeee",borderHoverColor:"#12ae1e",borderRadius:22,showTitle:!0,titleColor:"#fcaeee",titleAlign:"left",ctaShow:!0,ctaText:"Регистрация",ctaFontSize:14,ctaClickAction:"link",ctaOpenLink:"https://test.com",ctaOpenNewTab:!0,ctaClickSelector:"#selector",ctaButtonColor:"#aaa111",ctaTextColor:"#11a111",ctaBorderRadius:12,ctaTimeToShow:0,ctaIsFontWeight:"bold",сtaShowWhatsApp:!0,ctaWhatsAppNumber:"79228331011",ctaWhatsAppText:"Привет!",ctaShowTelegram:!0,ctaTelegramChannel:"root",ctaShowVk:!0,ctaVkLink:"root",showingPreview:!1,showingCondition:"immediately",showingAfterTime:1,showingSelector:"#show",showingAgainTime:10,showingAgainUnit:"seconds",showingAllPages:!0,showingOnlyPages:[],showingIgnorePages:["test.com"],enableVkPixel:!1,enableGoogleAnalytics:!1,enableYandexAnalytics:!1,yandexCounter:"123",enableExpandFullScreen:!1},[a,Ae]=E(Se),[et,Y]=E(!1),[Pe,tt]=E(null),nt=e=>{const{widget:t,plan:n}=e,{settings:s={},...l}=t;Ae({...Se,...s}),tt({...l,plan:n})},st=y('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15">'),lt=e=>(()=>{const t=st();return K(t,e,!0,!0),t})(),ot=y('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z">'),rt=e=>(()=>{const t=ot();return K(t,e,!0,!0),t})(),it=y('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z">'),ct=e=>(()=>{const t=it();return K(t,e,!0,!0),t})(),at=y('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12">'),ut=e=>(()=>{const t=at();return K(t,e,!0,!0),t})(),ft=e=>{const t=a();t.enableVkPixel&&window.VK?.Goal(e),t.enableGoogleAnalytics&&window.dataLayer?.push({event:e}),t.enableYandexAnalytics&&t.yandexCounter&&window.ym?.(t.yandexCounter,"reachGoal",e)},dt=()=>{ft("tw_open")},ht=y('<button class="m-auto transition-all px-2 py-2 w-full my-1 max-w-[300px] hover:opacity-90 cursor-pointer">'),gt=()=>{const e=t=>{t.preventDefault(),t.stopPropagation();const n=a(),s=n.ctaClickAction;s==="link"&&window.open(n.ctaOpenLink,n.ctaOpenNewTab?"_blank":"_self"),s==="scroll"&&document.getElementById(n.ctaClickSelector)?.scrollIntoView(),s==="code"&&window?.twCtaClick?.()};return _(O,{get when(){return a().ctaShow},get children(){const t=ht();return t.$$click=e,x(t,()=>a().ctaText),$(n=>{const s=a().ctaButtonColor,l=a().ctaTextColor,o=a().ctaBorderRadius+"px",i=a().ctaIsFontWeight?"bold":"normal",r=a().ctaFontSize+"px";return s!==n._v$&&((n._v$=s)!=null?t.style.setProperty("background",s):t.style.removeProperty("background")),l!==n._v$2&&((n._v$2=l)!=null?t.style.setProperty("color",l):t.style.removeProperty("color")),o!==n._v$3&&((n._v$3=o)!=null?t.style.setProperty("border-radius",o):t.style.removeProperty("border-radius")),i!==n._v$4&&((n._v$4=i)!=null?t.style.setProperty("font-weight",i):t.style.removeProperty("font-weight")),r!==n._v$5&&((n._v$5=r)!=null?t.style.setProperty("font-size",r):t.style.removeProperty("font-size")),n},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0}),t}})};te(["click"]);const wt=y('<a target="_blank"><img class="w-10" alt="Vk Logo">'),pt=y('<a target="_blank"><img class="w-10" alt="Telegram logo">'),yt=y('<a target="_blank"><img class="w-10" alt="Whatsapp logo">'),mt=y('<div class="flex items-center justify-center gap-4 my-2">'),bt=e=>{const t=w(()=>{const s=a().ctaWhatsAppNumber,l=a().ctaWhatsAppText;return`whatsapp://send?abid=${s}&text=${l}"`}),n=window.location.host.includes("localhost")?"http://localhost:3000":"https://trywidget.ru";return(()=>{const s=mt();return x(s,_(O,{get when(){return a().ctaShowVk},get children(){const l=wt(),o=l.firstChild;return P(o,"src",n+"/static/logos/vk.svg"),$(()=>P(l,"href",a().ctaVkLink)),l}}),null),x(s,_(O,{get when(){return a().ctaShowTelegram},get children(){const l=pt(),o=l.firstChild;return P(o,"src",n+"/static/logos/telegram.svg"),$(()=>P(l,"href","https://t.me/"+a().ctaTelegramChannel)),l}}),null),x(s,_(O,{get when(){return a().сtaShowWhatsApp},get children(){const l=yt(),o=l.firstChild;return P(o,"src",n+"/static/logos/whatsapp.svg"),$(()=>P(l,"href",t())),l}}),null),s})()},vt=y('<p class="z-10 absolute max-w-[calc(100%-64px)] left-2 right-6 top-2 w-full m-auto">Название виджета'),$t=e=>_(O,{get when(){return a().showTitle},get children(){const t=vt();return $(n=>{const s=a().titleColor,l=a().titleAlign;return s!==n._v$&&((n._v$=s)!=null?t.style.setProperty("color",s):t.style.removeProperty("color")),l!==n._v$2&&((n._v$2=l)!=null?t.style.setProperty("text-align",l):t.style.removeProperty("text-align")),n},{_v$:void 0,_v$2:void 0}),t}}),xt=y("<style>"),_t=y('<div draggable data-vidget-id="test"><div class="relative transition-all"><button class="close-icon absolute z-10 bg-slate-300/50 rounded-full w-6 h-6 flex items-center justify-center transition-[top,right] cursor-pointer"></button><div class="flex">'),Ct=y('<button class="absolute top-10 right-2 z-10 bg-slate-300/50 rounded-full w-6 h-6 flex items-center justify-center">'),St=y('<img class="absolute h-full w-full object-cover" alt="Превью">'),At=y('<video class="absolute left-1/2 top-1/2 h-full w-full object-cover" loop playsinline preload="auto" autoplay disablepictureinpicture>'),Pt=y('<div class="absolute z-10 left-2 right-2 flex flex-col bottom-0">'),kt=y('<div class="relative rounded-full overflow-hidden mb-1"><div class="w-full bg-black/80 h-[5px]"></div><div class="w-full bg-red-400 h-[3px] absolute top-[1px]">'),Tt=y('<a href="https://trywidget.ru" target="_blank" class="gap-2 bg-black/80 p-[4px] text-center text-white text-[12px] mt-1 -mx-2 -mb-3 w-[calc(100%+16px)] flex justify-center items-center"><img class="w-4 h-4" src="/static/logo.svg" alt="Логотип">Trywidget'),Q=4,Et=e=>{const t=a(),n=Pe();let s,l;const[o,i]=E(!1),[r,f]=E(!0),m=()=>{const c=a();s&&(s.style.bottom=c?.edgeMargins+"px",c.placement==="left"&&(s.style.left=c?.edgeMargins+"px",s.style.right="initial"),c.placement==="right"&&(s.style.right=c?.edgeMargins+"px",s.style.left="initial"))};de(()=>{m()}),B(()=>{window.addEventListener("resize",m)}),he(()=>{window.removeEventListener("resize",m)}),B(()=>{if(t.showingCondition==="immediately"&&f(!1),t.showingCondition==="time"){let c=setTimeout(()=>{f(()=>!1)},t.showingAfterTime*1e3);he(()=>clearInterval(c))}t.showingCondition==="intersection"&&setTimeout(()=>{const c=M=>{M[0].isIntersecting&&f(!1)};new IntersectionObserver(c).observe(document.querySelector(t.showingSelector))},1)});const C=c=>{i(!0),le(!1);const g=a();!o()&&l&&(l.currentTime=0),o()&&g.enableExpandFullScreen?(g.placement==="left"&&(s.style.left="0px"),g.placement==="right"&&(s.style.right="0px"),s.style.bottom="0px"):m(),dt()},d=w(()=>{const c=a();if(c.enableExpandFullScreen&&o())return document.documentElement.clientWidth;const g=document.documentElement.clientWidth-c.edgeMargins*2-Q*2;return o()?Math.min(c.width*c.scaleView-c.edgeMargins*3,g):Math.min(c.width,g)}),k=w(()=>{const c=a();if(c.enableExpandFullScreen&&o())return document.documentElement.clientHeight;const g=window.innerHeight-c.edgeMargins*2-Q*2;return o()?Math.min(c.height*c.scaleView,g):c.shape==="circle"?Math.min(c.width,g,d()):Math.min(c.height,g)}),[F,se]=E(!0),[ke,le]=E(!0),Lt=()=>{o()&&(se(c=>!c),F()?l?.play():l?.pause())},Wt=c=>{c.preventDefault(),c.stopPropagation(),le(g=>!g)},It=c=>{if(c.preventDefault(),c.stopPropagation(),!o()){Y(!1);return}i(!1),le(!0),l&&(l.currentTime=0)},[oe,Bt]=E(0),[Te,Ot]=E(0);B(()=>{l?.addEventListener("loadeddata",()=>{l&&Ot(l.duration)}),l?.addEventListener("timeupdate",()=>{l&&Bt(l.currentTime)})});const jt=w(()=>{const c=a();return c.enableExpandFullScreen?"0px":c.shape==="circle"&&!o()?"50%":c.borderRadius+"px"}),Vt=w(()=>(a().shape==="circle"&&!o()?d()/10:8)+"px"),Ft=w(()=>(a().shape==="circle"&&!o()?d()/2-12:8)+"px"),Dt=w(()=>a().showBorder?void 0:"none"),Ht=w(()=>{const c=a();return o()&&c.enableExpandFullScreen?"none":`${Q}px solid ${c.borderColor}`}),Rt=w(()=>{const c=a();return o()&&c.enableExpandFullScreen?"none":`${Q}px solid ${c.borderHoverColor}`});return[(()=>{const c=xt();return x(c,()=>`
            .vw-wrapper{
              border: ${Ht()};
            }

            .vw-wrapper:hover {
              transform: ${o()||a().enableExpandFullScreen?"":"translateY(-10px)"};
              border: ${Rt()};
            }

            .close-icon {
                display: ${!o()&&"none"};
            }
            .vw-wrapper:hover .close-icon{
              display: flex;
            }
          `),c})(),(()=>{const c=_t(),g=c.firstChild,M=g.firstChild,J=M.nextSibling;c.$$click=C;const Ee=s;return typeof Ee=="function"?$e(Ee,c):s=c,c.style.setProperty("overflow","hidden"),c.style.setProperty("background","inherit"),g.style.setProperty("transform-origin","bottom right"),M.$$click=It,x(M,(()=>{const u=w(()=>!!o());return()=>u()?_(lt,{class:"w-4"}):_(ut,{class:"w-4"})})()),x(g,(()=>{const u=w(()=>!!(o()&&a().showControls));return()=>u()&&(()=>{const h=Ct();return h.$$click=Wt,x(h,(()=>{const S=w(()=>!!ke());return()=>S()?_(ct,{class:"w-4"}):_(rt,{class:"w-4"})})()),h})()})(),J),x(g,(()=>{const u=w(()=>!!o());return()=>u()&&_($t,{})})(),J),x(J,(()=>{const u=w(()=>!!(a().showingPreview&&!o()));return()=>u()?(()=>{const h=St();return $(()=>P(h,"src",n?.video?.preview_image_url)),h})():(()=>{const h=At();h.$$click=Lt;const S=l;return typeof S=="function"?$e(S,h):l=h,h.style.setProperty("transform","translate(-50%,-50%)"),$(A=>{const I=n?.video?.url,N=ke();return I!==A._v$10&&P(h,"src",A._v$10=I),N!==A._v$11&&(h.muted=A._v$11=N),A},{_v$10:void 0,_v$11:void 0}),h})()})(),null),x(J,(()=>{const u=w(()=>!!o());return()=>u()&&(()=>{const h=Pt();return x(h,_(bt,{}),null),x(h,(()=>{const S=w(()=>oe()>a().ctaTimeToShow);return()=>S()&&_(gt,{})})(),null),x(h,(()=>{const S=w(()=>!!a().showControls);return()=>S()&&(()=>{const A=kt(),I=A.firstChild,N=I.nextSibling;return $(()=>oe()/Te()*100+"%"!=null?N.style.setProperty("width",oe()/Te()*100+"%"):N.style.removeProperty("width")),A})()})(),null),x(h,(()=>{const S=w(()=>n?.plan?.is_hide_logo!==!0);return()=>S()&&Tt()})(),null),$(()=>t.borderRadius/2+"px"!=null?h.style.setProperty("bottom",t.borderRadius/2+"px"):h.style.removeProperty("bottom")),h})()})(),null),$(u=>{const h=`vw-wrapper fixed transition-[border,transform,border-radius] ${o()?" ":" cursor-pointer"}`,S=Dt(),A=`bottom ${t.placement}`,I=jt(),N=r()?"none":"block",re=d()+"px",ie=k()+"px",ce=Vt(),ae=Ft();return h!==u._v$&&ve(c,u._v$=h),S!==u._v$2&&((u._v$2=S)!=null?c.style.setProperty("border",S):c.style.removeProperty("border")),A!==u._v$3&&((u._v$3=A)!=null?c.style.setProperty("transform-origin",A):c.style.removeProperty("transform-origin")),I!==u._v$4&&((u._v$4=I)!=null?c.style.setProperty("border-radius",I):c.style.removeProperty("border-radius")),N!==u._v$5&&((u._v$5=N)!=null?c.style.setProperty("display",N):c.style.removeProperty("display")),re!==u._v$6&&((u._v$6=re)!=null?g.style.setProperty("width",re):g.style.removeProperty("width")),ie!==u._v$7&&((u._v$7=ie)!=null?g.style.setProperty("height",ie):g.style.removeProperty("height")),ce!==u._v$8&&((u._v$8=ce)!=null?M.style.setProperty("top",ce):M.style.removeProperty("top")),ae!==u._v$9&&((u._v$9=ae)!=null?M.style.setProperty("right",ae):M.style.removeProperty("right")),u},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0,_v$7:void 0,_v$8:void 0,_v$9:void 0}),c})()]};te(["click"]);const Mt=async()=>{const e=document.querySelector("#tw_bubble"),t=e?.getAttribute("data-widget"),n=e?.getAttribute("data-url")||"https://trywiget.ru/api/public/widgets";try{return await(await fetch(n+t+"/")).json()}catch(s){console.log(s)}},Nt=()=>(B(async()=>{await Ze();const e=await Mt();nt(e)}),B(()=>{window.widget={setSettings:e=>{Ae({...a()||{},...e})}},document.querySelectorAll("[data-vidget-id]").forEach((e,t,n)=>{t!==n.length-2&&e.parentElement?.closest("div")?.remove()})}),B(()=>{let e=a();const t=window.location.origin,n=e?.showingOnlyPages||[],s=e?.showingIgnorePages||[];if(e?.showingAllPages){Y(!0);return}s.some(l=>l.includes(t))&&Y(!1),n.some(l=>l.includes(t))&&Y(!0)}),_(O,{get when(){return w(()=>!!(et()&&Pe()))()&&a()},get children(){return _(Et,{})}}));window.onload=()=>{const e=document.querySelector("body"),t=document.createElement("div");ze(()=>_(Nt,{}),t),e.appendChild(t)}})();

              (function(){var elementStyle=document.createElement('style');elementStyle.innerText=".fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-0{bottom:0}.left-1\\/2{left:50%}.left-2{left:.5rem}.right-2{right:.5rem}.right-6{right:1.5rem}.top-1\\/2{top:50%}.top-10{top:2.5rem}.top-2{top:.5rem}.top-\\[1px\\]{top:1px}.z-10{z-index:10}.m-auto{margin:auto}.-mx-2{margin-left:-.5rem;margin-right:-.5rem}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-2{margin-top:.5rem;margin-bottom:.5rem}.-mb-3{margin-bottom:-.75rem}.mb-1{margin-bottom:.25rem}.mt-1{margin-top:.25rem}.block{display:block}.flex{display:flex}.hidden{display:none}.h-4{height:1rem}.h-6{height:1.5rem}.h-\\[3px\\]{height:3px}.h-\\[5px\\]{height:5px}.h-full{height:100%}.w-10{width:2.5rem}.w-4{width:1rem}.w-6{width:1.5rem}.w-\\[calc\\(100\\%\\+16px\\)\\]{width:calc(100% + 16px)}.w-full{width:100%}.max-w-\\[300px\\]{max-width:300px}.max-w-\\[calc\\(100\\%-64px\\)\\]{max-width:calc(100% - 64px)}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.resize{resize:both}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:.5rem}.gap-4{gap:1rem}.overflow-hidden{overflow:hidden}.rounded-full{border-radius:9999px}.border{border-width:1px}.bg-black\\/80{background-color:#000c}.bg-red-400{--tw-bg-opacity: 1;background-color:rgb(248 113 113 / var(--tw-bg-opacity))}.bg-slate-300\\/50{background-color:#cbd5e180}.object-cover{-o-object-fit:cover;object-fit:cover}.p-\\[4px\\]{padding:4px}.px-2{padding-left:.5rem;padding-right:.5rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.text-center{text-align:center}.text-\\[12px\\]{font-size:12px}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.transition-\\[border\\,transform\\,border-radius\\]{transition-property:border,transform,border-radius;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-\\[top\\,right\\]{transition-property:top,right;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.hover\\:opacity-90:hover{opacity:.9}\n";document.head.appendChild(elementStyle)})()