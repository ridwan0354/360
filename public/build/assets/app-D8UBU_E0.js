var e=!1,t=!1,n=[],r=-1,i=!1,a=!1;function o(e){l(e)}function s(){a=!0}function c(){a=!1,d()}function l(e){n.includes(e)||(n.push(e),e._x_schedulerPriority!==void 0&&(i=!0)),d()}function u(e){let t=n.indexOf(e);t!==-1&&t>r&&n.splice(t,1)}function d(){if(!t&&!e){if(a)return;e=!0,queueMicrotask(f)}}function f(){e=!1,t=!0;for(let e=0;e<n.length;e++)i&&p(e),n[e](),r=e;n.length=0,r=-1,i=!1,t=!1}function p(e){let t=new Map,r=n.slice(e).sort((e,n)=>m(e,n,t));for(let t=0;t<r.length;t++)n[e+t]=r[t];i=!1}function m(e,t,n){return h(e)?h(t)?g(e._x_schedulerPriority.el,n)-g(t._x_schedulerPriority.el,n)||e._x_schedulerPriority.order-t._x_schedulerPriority.order:-1:+!!h(t)}function h(e){return e._x_schedulerPriority!==void 0}function g(e,t){if(t.has(e))return t.get(e);let n=0,r=e;for(;e;)n++,e=e._x_teleportBack?e._x_teleportBack:typeof ShadowRoot==`function`&&e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentElement;return t.set(r,n),n}var _,v,y,b,x=0,S=!0;function C(e){S=!1,e(),S=!0}function w(e){_=e.reactive,y=e.release,v=t=>e.effect(t,{scheduler:e=>{S?o(e):e()}}),b=e.raw}function T(e){v=e}function E(e){let t=()=>{};return[(n,r)=>{let i=r?.priority===`structural`?x++:void 0,a=v(n);return i!==void 0&&a!==void 0&&(a._x_schedulerPriority={el:e,order:i}),e._x_effects||(e._x_effects=new Set,e._x_runEffects=()=>{e._x_effects.forEach(e=>e())}),e._x_effects.add(a),t=()=>{a!==void 0&&(e._x_effects.delete(a),y(a))},a},()=>{t()}]}function D(e,t){let n=!0,r,i,a=v(()=>{let a=e(),o=JSON.stringify(a);if(!n&&(typeof a==`object`||a!==r)){let e=typeof r==`object`?JSON.parse(i):r;queueMicrotask(()=>{t(a,e)})}r=a,i=o,n=!1});return()=>{u(a),y(a)}}async function O(e){s();try{await e(),await Promise.resolve()}finally{c()}}var k=[],A=[],j=[];function M(e){j.push(e)}function N(e,t){typeof t==`function`?(e._x_cleanups||=[],e._x_cleanups.push(t)):(t=e,A.push(t))}function P(e){k.push(e)}function F(e,t,n){e._x_attributeCleanups||={},e._x_attributeCleanups[t]||(e._x_attributeCleanups[t]=[]),e._x_attributeCleanups[t].push(n)}function I(e,t){e._x_attributeCleanups&&Object.entries(e._x_attributeCleanups).forEach(([n,r])=>{(t===void 0||t.includes(n))&&(r.forEach(e=>e()),delete e._x_attributeCleanups[n])})}function ee(e){for(e._x_effects?.forEach(u);e._x_cleanups?.length;)e._x_cleanups.pop()()}var te=new MutationObserver(fe),ne=!1;function re(){te.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),ne=!0}function ie(){oe(),te.disconnect(),ne=!1}var ae=[];function oe(){let e=te.takeRecords();ae.push(()=>e.length>0&&fe(e));let t=ae.length;queueMicrotask(()=>{if(ae.length===t)for(;ae.length>0;)ae.shift()()})}function se(){for(;ae.length>0;)ae.shift()();let e=te.takeRecords();e.length>0&&fe(e)}function L(e){if(!ne)return e();ie();try{return e()}finally{re()}}var ce=!1,le=[];function ue(){ce=!0}function de(){ce=!1,fe(le),le=[]}function fe(e){if(ce){le=le.concat(e);return}let t=[],n=new Set,r=new Map,i=new Map;for(let a=0;a<e.length;a++)if(!e[a].target._x_ignoreMutationObserver&&(e[a].type===`childList`&&(e[a].removedNodes.forEach(e=>{e.nodeType===1&&e._x_marker&&n.add(e)}),e[a].addedNodes.forEach(e=>{e.nodeType===1&&(n.has(e)?n.delete(e):e._x_marker||t.push(e))})),e[a].type===`attributes`)){let t=e[a].target,n=e[a].attributeName,o=e[a].oldValue,s=()=>{r.has(t)||r.set(t,[]),r.get(t).push({name:n,value:t.getAttribute(n)})},c=()=>{i.has(t)||i.set(t,[]),i.get(t).push(n)};t.hasAttribute(n)&&o===null?s():t.hasAttribute(n)?(c(),s()):c()}i.forEach((e,t)=>{I(t,e)}),r.forEach((e,t)=>{k.forEach(n=>n(t,e))});for(let e of n)t.some(t=>t.contains(e))||A.forEach(t=>t(e));for(let e of t)e.isConnected&&j.forEach(t=>t(e));t=null,n=null,r=null,i=null}function pe(e){return ge(he(e))}function me(e,t,n){return e._x_dataStack=[t,...he(n||e)],()=>{e._x_dataStack=e._x_dataStack.filter(e=>e!==t)}}function he(e){return e._x_dataStack?e._x_dataStack:typeof ShadowRoot==`function`&&e instanceof ShadowRoot?he(e.host):e.parentNode?he(e.parentNode):[]}function ge(e){return new Proxy({objects:e},ve)}function _e(e,t){return e===null||e===Object.prototype?null:Object.prototype.hasOwnProperty.call(e,t)?e:_e(Object.getPrototypeOf(e),t)}var ve={ownKeys({objects:e}){return Array.from(new Set(e.flatMap(e=>Object.keys(e))))},has({objects:e},t){return t!=Symbol.unscopables&&e.some(e=>Object.prototype.hasOwnProperty.call(e,t)||Reflect.has(e,t))},get({objects:e},t,n){return t==`toJSON`?ye:Reflect.get(e.find(e=>Reflect.has(e,t))||{},t,n)},set({objects:e},t,n,r){let i;for(let n of e)if(i=_e(n,t),i)break;i||=e[e.length-1];let a=Object.getOwnPropertyDescriptor(i,t);return a?.set&&a?.get?a.set.call(r,n)||!0:Reflect.set(i,t,n)}};function ye(){return Reflect.ownKeys(this).reduce((e,t)=>(e[t]=Reflect.get(this,t),e),{})}function be(e,t=()=>{}){let n=e=>typeof e==`object`&&!Array.isArray(e)&&e!==null,r=(i,a=``)=>{Object.entries(Object.getOwnPropertyDescriptors(i)).forEach(([o,{value:s,enumerable:c}])=>{if(c===!1||s===void 0||typeof s==`object`&&s&&s.__v_skip)return;let l=a===``?o:`${a}.${o}`;typeof s==`object`&&s&&s._x_interceptor?i[o]=s.initialize(e,l,o,t):n(s)&&s!==i&&!(s instanceof Element)&&r(s,l)})};return r(e)}function R(e,t=()=>{}){let n={initialValue:void 0,_x_interceptor:!0,initialize(t,n,r,i){return e(this.initialValue,()=>xe(t,n),e=>Se(t,n,e),n,r,i)}};return t(n),e=>{if(typeof e==`object`&&e&&e._x_interceptor){let t=n.initialize.bind(n);n.initialize=(r,i,a,o)=>{let s=e.initialize(r,i,a,o);return n.initialValue=s,t(r,i,a,o)}}else n.initialValue=e;return n}}function xe(e,t){return t.split(`.`).reduce((e,t)=>e[t],e)}function Se(e,t,n){if(typeof t==`string`&&(t=t.split(`.`)),t.length===1)e[t[0]]=n;else if(t.length===0)throw error;else if(e[t[0]])return Se(e[t[0]],t.slice(1),n);else return e[t[0]]={},Se(e[t[0]],t.slice(1),n)}var Ce={};function z(e,t){Ce[e]=t}function we(e,t){let n=B(t);return Object.entries(Ce).forEach(([r,i])=>{Object.defineProperty(e,`$${r}`,{get(){return i(t,n)},enumerable:!1})}),e}function B(e){let[t,n]=rt(e),r={interceptor:R,...t};return N(e,n),r}function V(e,t,n,...r){try{return n(...r)}catch(n){Te(n,e,t)}}function Te(...e){return Ee(...e)}var Ee=Oe;function De(e){Ee=e}function Oe(e,t,n=void 0){e=Object.assign(e??{message:`No error message given.`},{el:t,expression:n}),console.warn(`Alpine Expression Error: ${e.message}

${n?`Expression: "`+n+`"

`:``}`,t),setTimeout(()=>{throw e},0)}var ke=!0;function Ae(e){let t=ke;ke=!1;let n=e();return ke=t,n}function je(e,t,n={}){let r;return Me(e,t)(e=>r=e,n),r}function Me(...e){return Ne(...e)}var Ne=()=>{};function Pe(e){Ne=e}var Fe;function Ie(e){Fe=e}function Le(e,t){let n={};we(n,e);let r=[n,...he(e)],i=typeof t==`function`?Re(r,t):Ve(r,t,e);return V.bind(null,e,t,i)}function Re(e,t){return(n=()=>{},{scope:r={},params:i=[],context:a}={})=>{ke?He(n,t.apply(ge([r,...e]),i)):He(n,t,ge([r,...e]),i)}}var ze={};function Be(e,t){if(ze[e])return ze[e];let n=Object.getPrototypeOf(async function(){}).constructor,r=/^[\n\s]*if.*\(.*\)/.test(e.trim())||/^(let|const)\s/.test(e.trim())?`(async()=>{ ${e} })()`:e,i=(()=>{try{let t=new n([`__self`,`scope`],`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);return Object.defineProperty(t,"name",{value:`[Alpine] ${e}`}),t}catch(n){return Te(n,t,e),Promise.resolve()}})();return ze[e]=i,i}function Ve(e,t,n){let r=Be(t,n);return(i=()=>{},{scope:a={},params:o=[],context:s}={})=>{r.result=void 0,r.finished=!1;let c=ge([a,...e]);if(typeof r==`function`){let e=r.call(s,r,c).catch(e=>Te(e,n,t));r.finished?(He(i,r.result,c,o,n),r.result=void 0):e.then(e=>{He(i,e,c,o,n)}).catch(e=>Te(e,n,t)).finally(()=>r.result=void 0)}}}function He(e,t,n,r,i){if(ke&&typeof t==`function`){let a=t.apply(n,r);a instanceof Promise?a.then(t=>He(e,t,n,r)).catch(e=>Te(e,i,t)):e(a)}else typeof t==`object`&&t instanceof Promise?t.then(t=>e(t)):e(t)}function Ue(...e){return Fe(...e)}function We(e,t,n={}){let r={};we(r,e);let i=[r,...he(e)],a=ge([n.scope??{},...i]),o=n.params??[];if(t.includes(`await`))return new(Object.getPrototypeOf(async function(){})).constructor([`scope`],`with (scope) { let __result = ${/^[\n\s]*if.*\(.*\)/.test(t.trim())||/^(let|const)\s/.test(t.trim())?`(async()=>{ ${t} })()`:t}; return __result }`).call(n.context,a);{let e=/^[\n\s]*if.*\(.*\)/.test(t.trim())||/^(let|const)\s/.test(t.trim())?`(()=>{ ${t} })()`:t,r=Function([`scope`],`with (scope) { let __result = ${e}; return __result }`).call(n.context,a);return typeof r==`function`&&ke?r.apply(a,o):r}}var Ge=`x-`;function Ke(e=``){return Ge+e}function qe(e){Ge=e}var Je={};function Ye(e,t){return Je[e]=t,{before(t){if(!Je[t]){console.warn(String.raw`Cannot find directive \`${t}\`. \`${e}\` will use the default order of execution`);return}let n=mt.indexOf(t);mt.splice(n>=0?n:mt.indexOf(`DEFAULT`),0,e)}}}function Xe(e){return Object.keys(Je).includes(e)}function Ze(e,t,n){if(t=Array.from(t),e._x_virtualDirectives){let n=Object.entries(e._x_virtualDirectives).map(([e,t])=>({name:e,value:t})),r=Qe(n);n=n.map(e=>r.find(t=>t.name===e.name)?{name:`x-bind:${e.name}`,value:`"${e.value}"`}:e),t=t.concat(n)}let r={};return t.map(st((e,t)=>r[e]=t)).filter(ut).map(ft(r,n)).sort(ht).map(t=>it(e,t))}function Qe(e){return Array.from(e).map(st()).filter(e=>!ut(e))}var $e=!1,et=new Map,tt=Symbol();function nt(e){$e=!0;let t=Symbol();tt=t,et.set(t,[]);let n=()=>{for(;et.get(t).length;)et.get(t).shift()();et.delete(t)};e(n),$e=!1,n()}function rt(e){let t=[],n=e=>t.push(e),[r,i]=E(e);return t.push(i),[{Alpine:rr,effect:r,cleanup:n,evaluateLater:Me.bind(Me,e),evaluate:je.bind(je,e)},()=>t.forEach(e=>e())]}function it(e,t){let n=Je[t.type]||(()=>{}),[r,i]=rt(e);F(e,t.original,i);let a=()=>{e._x_ignore||e._x_ignoreSelf||(n.inline&&n.inline(e,t,r),n=n.bind(n,e,t,r),$e?et.get(tt).push(n):n())};return a.runCleanups=i,a}var at=(e,t)=>({name:n,value:r})=>(n.startsWith(e)&&(n=n.replace(e,t)),{name:n,value:r}),ot=e=>e;function st(e=()=>{}){return({name:t,value:n})=>{let{name:r,value:i}=ct.reduce((e,t)=>t(e),{name:t,value:n});return r!==t&&e(r,t),{name:r,value:i}}}var ct=[];function lt(e){ct.push(e)}function ut({name:e}){return dt().test(e)}var dt=()=>RegExp(`^${Ge}([^:^.]+)\\b`);function ft(e,t){return({name:n,value:r})=>{n===r&&(r=``);let i=n.match(dt()),a=n.match(/:([a-zA-Z0-9\-_:]+)/),o=n.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],s=t||e[n]||n;return{type:i?i[1]:null,value:a?a[1]:null,modifiers:o.map(e=>e.replace(`.`,``)),expression:r,original:s}}}var pt=`DEFAULT`,mt=[`ignore`,`ref`,`id`,`data`,`anchor`,`bind`,`init`,`for`,`model`,`modelable`,`transition`,`show`,`if`,pt,`teleport`];function ht(e,t){let n=mt.indexOf(e.type)===-1?pt:e.type,r=mt.indexOf(t.type)===-1?pt:t.type;return mt.indexOf(n)-mt.indexOf(r)}function gt(e,t){if(typeof ShadowRoot==`function`&&e instanceof ShadowRoot){Array.from(e.children).forEach(e=>gt(e,t));return}let n=!1;if(t(e,()=>n=!0),n)return;let r=e.firstElementChild;for(;r;)gt(r,t,!1),r=r.nextElementSibling}var _t=!1;function vt(e,t=()=>{}){return(...n)=>_t?t(...n):e(...n)}function yt(e){return(...t)=>_t&&e(...t)}var bt=[];function xt(e){bt.push(e)}function St(e,t){bt.forEach(n=>n(e,t)),_t=!0,Et(()=>{Yt(t,(e,t)=>{t(e,()=>{})})}),_t=!1}var Ct=!1;function wt(e,t){t._x_dataStack||=e._x_dataStack,_t=!0,Ct=!0,Et(()=>{Tt(t)}),_t=!1,Ct=!1}function Tt(e){let t=!1;Yt(e,(e,n)=>{gt(e,(e,r)=>{if(t&&Gt(e))return r();t=!0,n(e,r)})})}function Et(e){let t=v;T((e,n)=>{let r=t(e);return y(r),()=>{}}),e(),T(t)}var Dt=0;function Ot(e,t){let n=e._x_deferInit;n||(n=e._x_deferInit={pending:0,ownsIgnore:!e._x_ignore,queuedAttributes:new Map},n.ownsIgnore&&(e._x_ignore=!0),Dt++),n.pending++,Promise.resolve(t).catch(t=>{try{Te(t,e)}catch(e){setTimeout(()=>{throw e},0)}}).then(()=>kt(e,n))}function kt(e,t){t.pending--,t.pending>0||(se(),t.pending>0||e._x_deferInit===t&&(delete e._x_deferInit,t.ownsIgnore&&delete e._x_ignore,Dt--,e.isConnected&&(Mt(t),Yt(e))))}function At(e,t){if(Dt===0)return!1;let n=Wt(e,e=>e._x_deferInit);return n?(jt(n._x_deferInit,e,t.map(({name:e})=>e)),!0):!1}function jt(e,t,n){let r=e.queuedAttributes.get(t);r&&r.marker===t._x_marker||(r={marker:t._x_marker,names:new Set},e.queuedAttributes.set(t,r)),n.forEach(e=>r.names.add(e))}function Mt(e){e.queuedAttributes.forEach((e,t)=>{if(!t.isConnected||!t._x_marker||t._x_marker!==e.marker)return;let n=Wt(t,e=>e._x_deferInit);if(n){jt(n._x_deferInit,t,Array.from(e.names));return}let r=Array.from(e.names).filter(e=>t.hasAttribute(e)).map(e=>({name:e,value:t.getAttribute(e)}));r.length!==0&&Ze(t,r).forEach(e=>e())})}xt((e,t)=>{Dt!==0&&e&&e.nodeType===1&&t&&t.nodeType===1&&Wt(e,e=>e._x_deferInit)&&(t._x_ignore=!0)});function Nt(e,t,n={},r={}){return e.dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0,composed:!0,cancelable:!0,...r}))}function Pt(e,...t){console.warn(`Alpine Warning: ${e}`,...t)}var Ft=!1;function It(){Ft&&Pt(`Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.`),Ft=!0,document.body||Pt("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),Nt(document,`alpine:init`),Nt(document,`alpine:initializing`),re(),M(e=>Yt(e,gt)),N(e=>Xt(e)),P((e,t)=>{At(e,t)||Ze(e,t).forEach(e=>e())}),Array.from(document.querySelectorAll(Bt().join(`,`))).filter(e=>!Ut(e.parentElement,!0)).forEach(e=>{Yt(e)}),Nt(document,`alpine:initialized`),setTimeout(()=>{Zt()})}var Lt=[],Rt=[];function zt(){return Lt.map(e=>e())}function Bt(){return Lt.concat(Rt).map(e=>e())}function Vt(e){Lt.push(e)}function Ht(e){Rt.push(e)}function Ut(e,t=!1){return Wt(e,e=>{if((t?Bt():zt()).some(t=>e.matches(t)))return!0})}function Wt(e,t){if(e){if(t(e))return e;if(e._x_teleportBack)return Wt(e._x_teleportBack,t);if(e.parentNode instanceof ShadowRoot)return Wt(e.parentNode.host,t);if(e.parentElement)return Wt(e.parentElement,t)}}function Gt(e){return zt().some(t=>e.matches(t))}var Kt=[];function qt(e){Kt.push(e)}var Jt=1;function Yt(e,t=gt,n=()=>{}){Wt(e,e=>e._x_ignore)||nt(()=>{t(e,(e,t)=>{e._x_marker||(n(e,t),Kt.forEach(n=>n(e,t)),Ze(e,e.attributes).forEach(e=>e()),e._x_ignore||(e._x_marker=Jt++),e._x_ignore&&t())})})}function Xt(e,t=gt){t(e,e=>{ee(e),I(e),delete e._x_marker})}function Zt(){[[`ui`,`dialog`,[`[x-dialog], [x-popover]`]],[`anchor`,`anchor`,[`[x-anchor]`]],[`sort`,`sort`,[`[x-sort]`]]].forEach(([e,t,n])=>{Xe(t)||n.some(t=>{if(document.querySelector(t))return Pt(`found "${t}", but missing ${e} plugin`),!0})})}var Qt=[],$t=!1;function en(e=()=>{}){return queueMicrotask(()=>{$t||setTimeout(()=>{tn()})}),new Promise(t=>{Qt.push(()=>{e(),t()})})}function tn(){for($t=!1;Qt.length;)Qt.shift()()}function nn(){$t=!0}function rn(e,t){return Array.isArray(t)?on(e,t.join(` `)):typeof t==`object`&&t?sn(e,t):typeof t==`function`?rn(e,t()):on(e,t)}function an(e){return e.split(/\s/).filter(Boolean)}function on(e,t){return t=t===!0?t=``:t||``,(t=>(e.classList.add(...t),()=>{e.classList.remove(...t)}))((t=>an(t).filter(t=>!e.classList.contains(t)).filter(Boolean))(t))}function sn(e,t){let n=Object.entries(t).flatMap(([e,t])=>t?an(e):!1).filter(Boolean),r=Object.entries(t).flatMap(([e,t])=>!t&&an(e)).filter(Boolean),i=[],a=[];return r.forEach(t=>{e.classList.contains(t)&&(e.classList.remove(t),a.push(t))}),n.forEach(t=>{e.classList.contains(t)||(e.classList.add(t),i.push(t))}),()=>{a.forEach(t=>e.classList.add(t)),i.forEach(t=>e.classList.remove(t))}}function cn(e,t){return typeof t==`object`&&t?ln(e,t):un(e,t)}function ln(e,t){let n={};return Object.entries(t).forEach(([t,r])=>{n[t]=e.style[t],t.startsWith(`--`)||(t=dn(t)),e.style.setProperty(t,r)}),setTimeout(()=>{e.style.length===0&&e.removeAttribute(`style`)}),()=>{cn(e,n)}}function un(e,t){let n=e.getAttribute(`style`,t);return e.setAttribute(`style`,t),()=>{e.setAttribute(`style`,n||``)}}function dn(e){return e.replace(/([a-z])([A-Z])/g,`$1-$2`).toLowerCase()}function fn(e,t=()=>{}){let n=!1;return function(){n?t.apply(this,arguments):(n=!0,e.apply(this,arguments))}}Ye(`transition`,(e,{value:t,modifiers:n,expression:r},{evaluate:i})=>{typeof r==`function`&&(r=i(r)),r!==!1&&(!r||typeof r==`boolean`?mn(e,n,t):pn(e,r,t))});function pn(e,t,n){hn(e,rn,``),{enter:t=>{e._x_transition.enter.during=t},"enter-start":t=>{e._x_transition.enter.start=t},"enter-end":t=>{e._x_transition.enter.end=t},leave:t=>{e._x_transition.leave.during=t},"leave-start":t=>{e._x_transition.leave.start=t},"leave-end":t=>{e._x_transition.leave.end=t}}[n](t)}function mn(e,t,n){hn(e,cn);let r=!t.includes(`in`)&&!t.includes(`out`)&&!n,i=r||t.includes(`in`)||[`enter`].includes(n),a=r||t.includes(`out`)||[`leave`].includes(n);t.includes(`in`)&&!r&&(t=t.filter((e,n)=>n<t.indexOf(`out`))),t.includes(`out`)&&!r&&(t=t.filter((e,n)=>n>t.indexOf(`out`)));let o=!t.includes(`opacity`)&&!t.includes(`scale`),s=o||t.includes(`opacity`),c=o||t.includes(`scale`),l=+!s,u=c?yn(t,`scale`,95)/100:1,d=yn(t,`delay`,0)/1e3,f=yn(t,`origin`,`center`),p=`opacity, transform`,m=yn(t,`duration`,150)/1e3,h=yn(t,`duration`,75)/1e3,g=`cubic-bezier(0.4, 0.0, 0.2, 1)`;i&&(e._x_transition.enter.during={transformOrigin:f,transitionDelay:`${d}s`,transitionProperty:p,transitionDuration:`${m}s`,transitionTimingFunction:g},e._x_transition.enter.start={opacity:l,transform:`scale(${u})`},e._x_transition.enter.end={opacity:1,transform:`scale(1)`}),a&&(e._x_transition.leave.during={transformOrigin:f,transitionDelay:`${d}s`,transitionProperty:p,transitionDuration:`${h}s`,transitionTimingFunction:g},e._x_transition.leave.start={opacity:1,transform:`scale(1)`},e._x_transition.leave.end={opacity:l,transform:`scale(${u})`})}function hn(e,t,n={}){e._x_transition||={enter:{during:n,start:n,end:n},leave:{during:n,start:n,end:n},in(n=()=>{},r=()=>{}){_n(e,t,{during:this.enter.during,start:this.enter.start,end:this.enter.end},n,r)},out(n=()=>{},r=()=>{}){_n(e,t,{during:this.leave.during,start:this.leave.start,end:this.leave.end},n,r)}}}window.Element.prototype._x_toggleAndCascadeWithTransitions=function(e,t,n,r){let i=document.visibilityState===`visible`?requestAnimationFrame:setTimeout,a=()=>i(n);t?e._x_transition&&(e._x_transition.enter||e._x_transition.leave)?e._x_transition.enter&&(Object.entries(e._x_transition.enter.during).length||Object.entries(e._x_transition.enter.start).length||Object.entries(e._x_transition.enter.end).length)?e._x_transition.in(n):a():e._x_transition?e._x_transition.in(n):a():(e._x_hidePromise=e._x_transition?new Promise((t,n)=>{e._x_transition.out(()=>{},()=>t(r)),e._x_transitioning&&e._x_transitioning.beforeCancel(()=>n({isFromCancelledTransition:!0}))}):Promise.resolve(r),queueMicrotask(()=>{let t=gn(e);t?(t._x_hideChildren||=[],t._x_hideChildren.push(e)):i(()=>{let t=e=>{let n=Promise.all([e._x_hidePromise,...(e._x_hideChildren||[]).map(t)]).then(([e])=>e?.());return delete e._x_hidePromise,delete e._x_hideChildren,n};t(e).catch(e=>{if(!e.isFromCancelledTransition)throw e})})}))};function gn(e){let t=e.parentNode;if(t)return t._x_hidePromise?t:gn(t)}function _n(e,t,{during:n,start:r,end:i}={},a=()=>{},o=()=>{}){if(e._x_transitioning&&e._x_transitioning.cancel(),Object.keys(n).length===0&&Object.keys(r).length===0&&Object.keys(i).length===0){a(),o();return}let s,c,l;vn(e,{start(){s=t(e,r)},during(){c=t(e,n)},before:a,end(){s(),l=t(e,i)},after:o,cleanup(){c(),l()}})}function vn(e,t){let n,r,i,a=fn(()=>{L(()=>{n=!0,r||t.before(),i||(t.end(),tn()),t.after(),e.isConnected&&t.cleanup(),delete e._x_transitioning})});e._x_transitioning={beforeCancels:[],beforeCancel(e){this.beforeCancels.push(e)},cancel:fn(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();a()}),finish:a},L(()=>{t.start(),t.during()}),nn(),requestAnimationFrame(()=>{if(n)return;let a=Number(getComputedStyle(e).transitionDuration.replace(/,.*/,``).replace(`s`,``))*1e3,o=Number(getComputedStyle(e).transitionDelay.replace(/,.*/,``).replace(`s`,``))*1e3;a===0&&(a=Number(getComputedStyle(e).animationDuration.replace(`s`,``))*1e3),L(()=>{t.before()}),r=!0,requestAnimationFrame(()=>{n||(L(()=>{t.end()}),tn(),setTimeout(e._x_transitioning.finish,a+o),i=!0)})})}function yn(e,t,n){if(e.indexOf(t)===-1)return n;let r=e[e.indexOf(t)+1];if(!r||t===`scale`&&isNaN(r))return n;if(t===`duration`||t===`delay`){let e=r.match(/([0-9]+)ms/);if(e)return e[1]}return t===`origin`&&[`top`,`right`,`left`,`center`,`bottom`].includes(e[e.indexOf(t)+2])?[r,e[e.indexOf(t)+2]].join(` `):r}function bn(e,t,n,r=[]){switch(e._x_bindings||=_({}),e._x_bindings[t]=n,t=r.includes(`camel`)?kn(t):t,t){case`value`:xn(e,n);break;case`style`:Cn(e,n);break;case`class`:Sn(e,n);break;case`selected`:case`checked`:wn(e,t,n);break;default:Tn(e,t,n)}}function xn(e,t){if(Bn(e))e.attributes.value===void 0&&(e.value=t);else if(zn(e))Number.isInteger(t)?e.value=t:!Array.isArray(t)&&typeof t!=`boolean`&&![null,void 0].includes(t)?e.value=String(t):e.checked=Array.isArray(t)?t.some(t=>An(t,e.value)):!!t;else if(e.tagName===`SELECT`)On(e,t);else if(e.tagName===`OPTION`)Tn(e,`value`,t);else{if(e.value===t&&(typeof t!=`object`||!t))return;e.value=t===void 0?``:t}}function Sn(e,t){e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedClasses=rn(e,t)}function Cn(e,t){e._x_undoAddedStyles&&e._x_undoAddedStyles(),e._x_undoAddedStyles=cn(e,t)}function wn(e,t,n){Tn(e,t,n),Dn(e,t,n)}function Tn(e,t,n){[null,void 0,!1].includes(n)&&Pn(t)?e.removeAttribute(t):(Nn(t)&&(n=t),Fn(n)&&(n=JSON.stringify(n)),En(e,t,n))}function En(e,t,n){e.getAttribute(t)!=n&&e.setAttribute(t,n)}function Dn(e,t,n){e[t]!==n&&(e[t]=n)}function On(e,t){let n=[].concat(t).map(e=>e+``);Array.from(e.options).forEach(e=>{e.selected=n.includes(e.value)})}function kn(e){return e.toLowerCase().replace(/-(\w)/g,(e,t)=>t.toUpperCase())}function An(e,t){return e==t}function jn(e){return[1,`1`,`true`,`on`,`yes`,!0].includes(e)?!0:[0,`0`,`false`,`off`,`no`,!1].includes(e)?!1:e?!!e:null}var Mn=new Set(`allowfullscreen.async.autofocus.autoplay.checked.controls.default.defer.disabled.formnovalidate.inert.ismap.itemscope.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.selected.shadowrootclonable.shadowrootdelegatesfocus.shadowrootserializable`.split(`.`));function Nn(e){return Mn.has(e)}function Pn(e){return![`aria-pressed`,`aria-checked`,`aria-expanded`,`aria-selected`].includes(e)}function Fn(e){return typeof e==`object`&&!!e}function In(e,t,n){return e._x_bindings&&e._x_bindings[t]!==void 0?e._x_bindings[t]:Rn(e,t,n)}function Ln(e,t,n,r=!0){if(e._x_bindings&&e._x_bindings[t]!==void 0)return e._x_bindings[t];if(e._x_inlineBindings&&e._x_inlineBindings[t]!==void 0){let n=e._x_inlineBindings[t];return n.extract=r,Ae(()=>je(e,n.expression))}return Rn(e,t,n)}function Rn(e,t,n){let r=e.getAttribute(t);return r===null?typeof n==`function`?n():n:r===``?!0:Nn(t)?!![t,`true`].includes(r):r}function zn(e){return e.type===`checkbox`||e.localName===`ui-checkbox`||e.localName===`ui-switch`}function Bn(e){return e.type===`radio`||e.localName===`ui-radio`}function Vn(e,t){let n;return function(){let r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){n=null,e.apply(r,i)},t)}}function Hn(e,t){let n;return function(){let r=this,i=arguments;n||(e.apply(r,i),n=!0,setTimeout(()=>n=!1,t))}}function Un({get:e,set:t},{get:n,set:r}){let i=!0,a,o=v(()=>{let o=e(),s=n();if(i)r(Wn(o)),i=!1;else{let e=JSON.stringify(o),n=JSON.stringify(s);e===a?e!==n&&t(Wn(s)):r(Wn(o))}a=JSON.stringify(e()),JSON.stringify(n())});return()=>{u(o),y(o)}}function Wn(e){return typeof e==`object`?JSON.parse(JSON.stringify(e)):e}function Gn(e){(Array.isArray(e)?e:[e]).forEach(e=>e(rr))}var Kn={},qn=!1;function Jn(e,t){if(qn||=(Kn=_(Kn),!0),t===void 0)return Kn[e];Kn[e]=t,typeof t==`object`&&t&&t._x_interceptor?Kn[e]=t.initialize(Kn,e,e,()=>{}):be(Kn[e]),typeof t==`object`&&t&&t.hasOwnProperty(`init`)&&typeof t.init==`function`&&Kn[e].init()}function Yn(){return Kn}var Xn={};function Zn(e,t){let n=typeof t==`function`?t:()=>t;return e instanceof Element?$n(e,n()):(Xn[e]=n,()=>{})}function Qn(e){return Object.entries(Xn).forEach(([t,n])=>{Object.defineProperty(e,t,{get(){return(...e)=>n(...e)}})}),e}function $n(e,t,n){let r=[];for(;r.length;)r.pop()();let i=Object.entries(t).map(([e,t])=>({name:e,value:t})),a=Qe(i);return i=i.map(e=>a.find(t=>t.name===e.name)?{name:`x-bind:${e.name}`,value:`"${e.value}"`}:e),Ze(e,i,n).map(e=>{r.push(e.runCleanups),e()}),()=>{for(;r.length;)r.pop()()}}var er={};function tr(e,t){er[e]=t}function nr(e,t){return Object.entries(er).forEach(([n,r])=>{Object.defineProperty(e,n,{get(){return(...e)=>r.bind(t)(...e)},enumerable:!1})}),e}var rr={get reactive(){return _},get release(){return y},get effect(){return v},get raw(){return b},get transaction(){return O},version:`3.17.5`,flushAndStopDeferringMutations:de,dontAutoEvaluateFunctions:Ae,disableEffectScheduling:C,startObservingMutations:re,stopObservingMutations:ie,setReactivityEngine:w,onAttributeRemoved:F,onAttributesAdded:P,closestDataStack:he,skipDuringClone:vt,onlyDuringClone:yt,addRootSelector:Vt,addInitSelector:Ht,setErrorHandler:De,interceptClone:xt,addScopeToNode:me,deferMutations:ue,mapAttributes:lt,evaluateLater:Me,interceptInit:qt,initInterceptors:be,injectMagics:we,setEvaluator:Pe,setRawEvaluator:Ie,mergeProxies:ge,extractProp:Ln,findClosest:Wt,onElRemoved:N,closestRoot:Ut,destroyTree:Xt,interceptor:R,transition:_n,setStyles:cn,mutateDom:L,deferInit:Ot,directive:Ye,entangle:Un,throttle:Hn,debounce:Vn,evaluate:je,evaluateRaw:Ue,initTree:Yt,nextTick:en,prefixed:Ke,prefix:qe,plugin:Gn,magic:z,store:Jn,start:It,clone:wt,cloneNode:St,bound:In,$data:pe,watch:D,walk:gt,data:tr,bind:Zn};function ir(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}Object.freeze({}),Object.freeze([]);var ar=Object.assign,or=Object.prototype.hasOwnProperty,sr=(e,t)=>or.call(e,t),cr=Array.isArray,lr=e=>mr(e)===`[object Map]`,ur=e=>typeof e==`string`,dr=e=>typeof e==`symbol`,fr=e=>typeof e==`object`&&!!e,pr=Object.prototype.toString,mr=e=>pr.call(e),hr=e=>mr(e).slice(8,-1),gr=e=>ur(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,_r=(e=>{let t=Object.create(null);return n=>t[n]||(t[n]=e(n))})(e=>e.charAt(0).toUpperCase()+e.slice(1)),vr=(e,t)=>!Object.is(e,t);function yr(e,...t){console.warn(`[Vue warn] ${e}`,...t)}var br,xr=new WeakSet,Sr=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,xr.has(this)&&(xr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Er(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Vr(this),kr(this);let e=br,t=Lr;br=this,Lr=!0;try{return this.fn()}finally{br!==this&&yr(`Active effect was not restored correctly - this is likely a Vue internal bug.`),Ar(this),br=e,Lr=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Nr(e);this.deps=this.depsTail=void 0,Vr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?xr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){jr(this)&&this.run()}get dirty(){return jr(this)}},Cr=0,wr,Tr;function Er(e,t=!1){e.flags|=8,t?(e.next=Tr,Tr=e):(e.next=wr,wr=e)}function Dr(){Cr++}function Or(){if(--Cr>0)return;if(Tr){let e=Tr;for(Tr=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;wr;){let t=wr;for(wr=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function kr(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Ar(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Nr(r),Pr(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function jr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Mr(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Mr(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Hr)||(e.globalVersion=Hr,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!jr(e))))return;e.flags|=2;let t=e.dep,n=br,r=Lr;br=e,Lr=!0;try{kr(e);let n=e.fn(e._value);(t.version===0||vr(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{br=n,Lr=r,Ar(e),e.flags&=-3}}function Nr(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subsHead===e&&(n.subsHead=i),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Nr(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Pr(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function Fr(e,t){e.effect instanceof Sr&&(e=e.effect.fn);let n=new Sr(e);t&&ar(n,t);try{n.run()}catch(e){throw n.stop(),e}let r=n.run.bind(n);return r.effect=n,r}function Ir(e){e.effect.stop()}var Lr=!0,Rr=[];function zr(){Rr.push(Lr),Lr=!1}function Br(){let e=Rr.pop();Lr=e===void 0||e}function Vr(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=br;br=void 0;try{t()}finally{br=e}}}var Hr=0,Ur=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Wr=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0,this.subsHead=void 0}track(e){if(!br||!Lr||br===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==br)t=this.activeLink=new Ur(br,this),br.deps?(t.prevDep=br.depsTail,br.depsTail.nextDep=t,br.depsTail=t):br.deps=br.depsTail=t,Gr(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=br.depsTail,t.nextDep=void 0,br.depsTail.nextDep=t,br.depsTail=t,br.deps===t&&(br.deps=e)}return br.onTrack&&br.onTrack(ar({effect:br},e)),t}trigger(e){this.version++,Hr++,this.notify(e)}notify(e){Dr();try{for(let t=this.subsHead;t;t=t.nextSub)t.sub.onTrigger&&!(t.sub.flags&8)&&t.sub.onTrigger(ar({effect:t.sub},e));for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Or()}}};function Gr(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Gr(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subsHead===void 0&&(e.dep.subsHead=e),e.dep.subs=e}}var Kr=new WeakMap,qr=Symbol(`Object iterate`),Jr=Symbol(`Map keys iterate`),Yr=Symbol(`Array iterate`);function Xr(e,t,n){if(Lr&&br){let r=Kr.get(e);r||Kr.set(e,r=new Map);let i=r.get(n);i||(r.set(n,i=new Wr),i.map=r,i.key=n),i.track({target:e,type:t,key:n})}}function Zr(e,t,n,r,i,a){let o=Kr.get(e);if(!o){Hr++;return}let s=o=>{o&&o.trigger({target:e,type:t,key:n,newValue:r,oldValue:i,oldTarget:a})};if(Dr(),t===`clear`)o.forEach(s);else{let i=cr(e),a=i&&gr(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Yr||!dr(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Yr)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(qr)),lr(e)&&s(o.get(Jr)));break;case`delete`:i||(s(o.get(qr)),lr(e)&&s(o.get(Jr)));break;case`set`:lr(e)&&s(o.get(qr))}}Or()}function Qr(e){let t=Li(e);return t===e?t:(Xr(t,`iterate`,Yr),Fi(e)?t:t.map(Ri))}function $r(e){return Xr(e=Li(e),`iterate`,Yr),e}function ei(e,t){return Pi(e)?Ni(e)?zi(Ri(t)):zi(t):Ri(t)}var ti={__proto__:null,[Symbol.iterator](){return ni(this,Symbol.iterator,e=>ei(this,e))},concat(...e){return Qr(this).concat(...e.map(e=>cr(e)?Qr(e):e))},entries(){return ni(this,`entries`,e=>(e[1]=ei(this,e[1]),e))},every(e,t){return ii(this,`every`,e,t,void 0,arguments)},filter(e,t){return ii(this,`filter`,e,t,e=>e.map(e=>ei(this,e)),arguments)},find(e,t){return ii(this,`find`,e,t,e=>ei(this,e),arguments)},findIndex(e,t){return ii(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return ii(this,`findLast`,e,t,e=>ei(this,e),arguments)},findLastIndex(e,t){return ii(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return ii(this,`forEach`,e,t,void 0,arguments)},includes(...e){return oi(this,`includes`,e)},indexOf(...e){return oi(this,`indexOf`,e)},join(e){return Qr(this).join(e)},lastIndexOf(...e){return oi(this,`lastIndexOf`,e)},map(e,t){return ii(this,`map`,e,t,void 0,arguments)},pop(){return si(this,`pop`)},push(...e){return si(this,`push`,e)},reduce(e,...t){return ai(this,`reduce`,e,t)},reduceRight(e,...t){return ai(this,`reduceRight`,e,t)},shift(){return si(this,`shift`)},some(e,t){return ii(this,`some`,e,t,void 0,arguments)},splice(...e){return si(this,`splice`,e)},toReversed(){return Qr(this).toReversed()},toSorted(e){return Qr(this).toSorted(e)},toSpliced(...e){return Qr(this).toSpliced(...e)},unshift(...e){return si(this,`unshift`,e)},values(){return ni(this,`values`,e=>ei(this,e))}};function ni(e,t,n){let r=$r(e),i=r[t]();return r!==e&&!Fi(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var ri=Array.prototype;function ii(e,t,n,r,i,a){let o=$r(e),s=o!==e&&!Fi(e),c=o[t];if(c!==ri[t]){let t=c.apply(e,a);return s?Ri(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,ei(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function ai(e,t,n,r){let i=$r(e),a=i!==e&&!Fi(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=ei(e,t)),n.call(this,t,ei(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?ei(e,c):c}function oi(e,t,n){let r=Li(e);Xr(r,`iterate`,Yr);let i=r[t](...n);return(i===-1||i===!1)&&Ii(n[0])?(n[0]=Li(n[0]),r[t](...n)):i}function si(e,t,n=[]){zr(),Dr();let r=Li(e)[t].apply(e,n);return Or(),Br(),r}var ci=ir(`__proto__,__v_isRef,__isVue`),li=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(dr));function ui(e){dr(e)||(e=String(e));let t=Li(this);return Xr(t,`has`,e),t.hasOwnProperty(e)}var di=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Oi:Di:i?Ei:Ti).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=cr(e);if(!r){let e;if(a&&(e=ti[t]))return e;if(t===`hasOwnProperty`)return ui}let o=Reflect.get(e,t,Bi(e)?e:n);if((dr(t)?li.has(t):ci(t))||(r||Xr(e,`get`,t),i))return o;if(Bi(o)){let e=a&&gr(t)?o:o.value;return r&&fr(e)?ji(e):e}return fr(o)?r?ji(o):Ai(o):o}},fi=class extends di{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=cr(e)&&gr(t);if(!this._isShallow){let r=Pi(i);if(!Fi(n)&&!Pi(n)&&(i=Li(i),n=Li(n)),!a&&Bi(i)&&!Bi(n))return r?(yr(`Set operation on key "${String(t)}" failed: target is readonly.`,e[t]),!0):(i.value=n,!0)}let o=a?Number(t)<e.length:sr(e,t),s=Reflect.set(e,t,n,Bi(e)?e:r);return e===Li(r)&&s&&(o?vr(n,i)&&Zr(e,`set`,t,n,i):Zr(e,`add`,t,n)),s}deleteProperty(e,t){let n=sr(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Zr(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return dr(t)&&li.has(t)||Xr(e,`has`,t),n}ownKeys(e){return Xr(e,`iterate`,cr(e)?`length`:qr),Reflect.ownKeys(e)}},pi=class extends di{constructor(e=!1){super(!0,e)}set(e,t){return yr(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0}deleteProperty(e,t){return yr(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0}},mi=new fi,hi=new pi,gi=e=>e,_i=e=>Reflect.getPrototypeOf(e);function vi(e,t,n){return function(...r){let i=this.__v_raw,a=Li(i),o=lr(a),s=e===`entries`||e===Symbol.iterator&&o,c=e===`keys`&&o,l=i[e](...r),u=n?gi:t?zi:Ri;return!t&&Xr(a,`iterate`,c?Jr:qr),ar(Object.create(l),{next(){let{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:s?[u(e[0]),u(e[1])]:u(e),done:t}}})}}function yi(e){return function(...t){{let n=t[0]?`on key "${t[0]}" `:``;yr(`${_r(e)} operation ${n}failed: target is readonly.`,Li(this))}return e===`delete`?!1:e===`clear`?void 0:this}}function bi(e,t){let n={get(n){let r=this.__v_raw,i=Li(r),a=Li(n);e||(vr(n,a)&&Xr(i,`get`,n),Xr(i,`get`,a));let{has:o}=_i(i),s=t?gi:e?zi:Ri;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&Xr(Li(t),`iterate`,qr),t.size},has(t){let n=this.__v_raw,r=Li(n),i=Li(t);return e||(vr(t,i)&&Xr(r,`has`,t),Xr(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=Li(a),s=t?gi:e?zi:Ri;return!e&&Xr(o,`iterate`,qr),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return ar(n,e?{add:yi(`add`),set:yi(`set`),delete:yi(`delete`),clear:yi(`clear`)}:{add(e){let n=Li(this),r=_i(n),i=Li(e),a=!t&&!Fi(e)&&!Pi(e)?i:e;return r.has.call(n,a)||vr(e,a)&&r.has.call(n,e)||vr(i,a)&&r.has.call(n,i)||(n.add(a),Zr(n,`add`,a,a)),this},set(e,n){t||Fi(n)||Pi(n)||(n=Li(n));let r=Li(this),{has:i,get:a}=_i(r),o=i.call(r,e);o?wi(r,i,e):(e=Li(e),o=i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?vr(n,s)&&Zr(r,`set`,e,n,s):Zr(r,`add`,e,n),this},delete(e){let t=Li(this),{has:n,get:r}=_i(t),i=n.call(t,e);i?wi(t,n,e):(e=Li(e),i=n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Zr(t,`delete`,e,void 0,a),o},clear(){let e=Li(this),t=e.size!==0,n=lr(e)?new Map(e):new Set(e),r=e.clear();return t&&Zr(e,`clear`,void 0,void 0,n),r}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=vi(r,e,t)}),n}function xi(e,t){let n=bi(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(sr(n,r)&&r in t?n:t,r,i)}var Si={get:xi(!1,!1)},Ci={get:xi(!0,!1)};function wi(e,t,n){let r=Li(n);if(r!==n&&t.call(e,r)){let t=hr(e);yr(`Reactive ${t} contains both the raw and reactive versions of the same object${t===`Map`?` as keys`:``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var Ti=new WeakMap,Ei=new WeakMap,Di=new WeakMap,Oi=new WeakMap;function ki(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Ai(e){return Pi(e)?e:Mi(e,!1,mi,Si,Ti)}function ji(e){return Mi(e,!0,hi,Ci,Di)}function Mi(e,t,n,r,i){if(!fr(e))return yr(`value cannot be made ${t?`readonly`:`reactive`}: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=ki(hr(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Ni(e){return Pi(e)?Ni(e.__v_raw):!!(e&&e.__v_isReactive)}function Pi(e){return!!(e&&e.__v_isReadonly)}function Fi(e){return!!(e&&e.__v_isShallow)}function Ii(e){return e?!!e.__v_raw:!1}function Li(e){let t=e&&e.__v_raw;return t?Li(t):e}var Ri=e=>fr(e)?Ai(e):e,zi=e=>fr(e)?ji(e):e;function Bi(e){return e?e.__v_isRef===!0:!1}z(`nextTick`,()=>en),z(`dispatch`,e=>Nt.bind(Nt,e)),z(`watch`,(e,{evaluateLater:t,cleanup:n})=>(e,r)=>{let i=t(e);n(D(()=>{let e;return i(t=>e=t),e},r))}),z(`store`,Yn),z(`data`,e=>pe(e)),z(`root`,e=>Ut(e)),z(`refs`,e=>(e._x_refs_proxy||=ge(Vi(e)),e._x_refs_proxy));function Vi(e){let t=[];return Wt(e,e=>{e._x_refs&&t.push(e._x_refs)}),t}var Hi={};function Ui(e){return Hi[e]||(Hi[e]=0),++Hi[e]}function Wi(e,t){return Wt(e,e=>{if(e._x_ids&&e._x_ids[t])return!0})}function Gi(e,t){e._x_ids||={},e._x_ids[t]||(e._x_ids[t]=Ui(t))}z(`id`,(e,{cleanup:t})=>(n,r=null)=>Ki(e,`${n}${r?`-${r}`:``}`,t,()=>{let t=Wi(e,n),i=t?t._x_ids[n]:Ui(n);return r?`${n}-${i}-${r}`:`${n}-${i}`})),xt((e,t)=>{e._x_id&&(t._x_id=e._x_id)});function Ki(e,t,n,r){if(e._x_id||={},e._x_id[t])return e._x_id[t];let i=r();return e._x_id[t]=i,n(()=>{delete e._x_id[t]}),i}z(`el`,e=>e),qi(`Focus`,`focus`,`focus`),qi(`Persist`,`persist`,`persist`);function qi(e,t,n){z(t,r=>Pt(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,r))}Ye(`modelable`,(e,{expression:t},{effect:n,evaluateLater:r,cleanup:i})=>{let a=r(t),o=()=>{let e;return a(t=>e=t),e},s=r(`${t} = __placeholder`),c=e=>s(()=>{},{scope:{__placeholder:e}});c(o()),queueMicrotask(()=>{if(!e._x_model)return;e._x_removeModelListeners.default();let t=e._x_model.get,n=e._x_model.setWithModifiers;i(Un({get(){return t()},set(e){n(e)}},{get(){return o()},set(e){c(e)}}))})}),Ye(`teleport`,(e,{modifiers:t,expression:n},{cleanup:r})=>{e.tagName.toLowerCase()!==`template`&&Pt(`x-teleport can only be used on a <template> tag`,e);let i=Yi(n),a=e.content.cloneNode(!0).firstElementChild;e._x_teleport=a,a._x_teleportBack=e,e.setAttribute(`data-teleport-template`,!0),a.setAttribute(`data-teleport-target`,!0),e._x_forwardEvents&&e._x_forwardEvents.forEach(t=>{a.addEventListener(t,t=>{t.stopPropagation(),e.dispatchEvent(new t.constructor(t.type,t))})}),me(a,{},e);let o=(e,t,n)=>{n.includes(`prepend`)?t.parentNode.insertBefore(e,t):n.includes(`append`)?t.parentNode.insertBefore(e,t.nextSibling):t.appendChild(e)};L(()=>{vt(()=>{o(a,i,t),Yt(a)})()}),e._x_teleportPutBack=()=>{let r=Yi(n);L(()=>{o(e._x_teleport,r,t)})},r(()=>L(()=>{a.remove(),Xt(a)}))});var Ji=document.createElement(`div`);function Yi(e){let t=vt(()=>document.querySelector(e),()=>Ji)();return t||Pt(`Cannot find x-teleport element for selector: "${e}"`),t}var Xi=()=>{};Xi.inline=(e,{modifiers:t},{cleanup:n})=>{t.includes(`self`)?e._x_ignoreSelf=!0:e._x_ignore=!0,n(()=>{t.includes(`self`)?delete e._x_ignoreSelf:delete e._x_ignore})},Ye(`ignore`,Xi),Ye(`effect`,vt((e,{expression:t},{effect:n})=>{n(Me(e,t))}));function Zi(e,t,n,r){let i=e,a=e=>r(e),o={},s=(e,t)=>n=>t(e,n);return n.includes(`dot`)&&(t=$i(t)),n.includes(`camel`)&&(t=ea(t)),n.includes(`capture`)&&(o.capture=!0),n.includes(`window`)&&(i=window),n.includes(`document`)&&(i=document),n.includes(`passive`)&&(o.passive=n[n.indexOf(`passive`)+1]!==`false`),a=Qi(n,a),n.includes(`prevent`)&&(a=s(a,(e,t)=>{t.preventDefault(),e(t)})),n.includes(`stop`)&&(a=s(a,(e,t)=>{t.stopPropagation(),e(t)})),n.includes(`once`)&&(a=s(a,(e,n)=>{e(n),i.removeEventListener(t,a,o)})),(n.includes(`away`)||n.includes(`outside`))&&(i=document,a=s(a,(t,n)=>{e.contains(n.target)||n.target.isConnected!==!1&&(e.offsetWidth<1&&e.offsetHeight<1||e._x_isShown!==!1&&t(n))})),n.includes(`self`)&&(a=s(a,(t,n)=>{n.target===e&&t(n)})),t===`submit`&&(a=s(a,(e,t)=>{t.target._x_pendingModelUpdates&&t.target._x_pendingModelUpdates.forEach(e=>e()),e(t)})),(ra(t)||ia(t))&&(a=s(a,(e,t)=>{oa(t,n)||e(t)})),i.addEventListener(t,a,o),()=>{i.removeEventListener(t,a,o)}}function Qi(e,t){if(e.includes(`debounce`)){let n=e[e.indexOf(`debounce`)+1]||`invalid-wait`,r=ta(n.split(`ms`)[0])?Number(n.split(`ms`)[0]):250;t=Vn(t,r)}if(e.includes(`throttle`)){let n=e[e.indexOf(`throttle`)+1]||`invalid-wait`,r=ta(n.split(`ms`)[0])?Number(n.split(`ms`)[0]):250;t=Hn(t,r)}return t}function $i(e){return e.replace(/-/g,`.`)}function ea(e){return e.toLowerCase().replace(/-(\w)/g,(e,t)=>t.toUpperCase())}function ta(e){return!Array.isArray(e)&&!isNaN(e)}function na(e){return[` `,`_`].includes(e)?e:e.replace(/([a-z])([A-Z])/g,`$1-$2`).replace(/[_\s]/,`-`).toLowerCase()}function ra(e){return[`keydown`,`keyup`].includes(e)}function ia(e){return[`contextmenu`,`click`,`mouse`].some(t=>e.includes(t))}var aa=[`window`,`document`,`prevent`,`stop`,`once`,`capture`,`self`,`away`,`outside`,`passive`,`dot`,`camel`,`preserve-scroll`,`blur`,`change`,`lazy`,`number`,`boolean`,`trim`,`fill`,`unintrusive`,`parent`];function oa(e,t){let n=t.filter((e,n)=>e===`false`&&t[n-1]===`passive`?!1:!aa.includes(e));if(n.includes(`debounce`)){let e=n.indexOf(`debounce`);n.splice(e,ta((n[e+1]||`invalid-wait`).split(`ms`)[0])?2:1)}if(n.includes(`throttle`)){let e=n.indexOf(`throttle`);n.splice(e,ta((n[e+1]||`invalid-wait`).split(`ms`)[0])?2:1)}if(n.length===0||n.length===1&&sa(e.key).includes(n[0]))return!1;let r=[`ctrl`,`shift`,`alt`,`meta`,`cmd`,`super`].filter(e=>n.includes(e));return n=n.filter(e=>!r.includes(e)),!(r.length>0&&r.filter(t=>((t===`cmd`||t===`super`)&&(t=`meta`),e[`${t}Key`])).length===r.length&&(ia(e.type)||sa(e.key).includes(n[0])))}function sa(e){if(!e)return[];e=na(e);let t={ctrl:`control`,slash:`/`,space:` `,spacebar:` `,cmd:`meta`,esc:`escape`,up:`arrow-up`,down:`arrow-down`,left:`arrow-left`,right:`arrow-right`,period:`.`,comma:`,`,equal:`=`,minus:`-`,underscore:`_`};return t[e]=e,Object.keys(t).map(n=>{if(t[n]===e)return n}).filter(e=>e)}Ye(`model`,(e,{modifiers:t,expression:n},{effect:r,cleanup:i})=>{let a=e;t.includes(`parent`)&&(a=Wt(e,t=>t!==e));let o=Me(a,n),s;s=typeof n==`string`?Me(a,`${n} = __placeholder`):typeof n==`function`&&typeof n()==`string`?Me(a,`${n()} = __placeholder`):()=>{};let c=()=>{let e;return o(t=>e=t),fa(e)?e.get():e},l=e=>{let t;o(e=>t=e),fa(t)?t.set(e):s(()=>{},{scope:{__placeholder:e}})};typeof n==`string`&&e.type===`radio`&&L(()=>{e.hasAttribute(`name`)||e.setAttribute(`name`,n)});let u=t.includes(`change`)||t.includes(`lazy`),d=t.includes(`blur`),f=t.includes(`enter`),p=u||d||f,m;if(_t)m=()=>{};else if(p){let n=[],r=n=>l(ca(e,t,n,c()));if(u&&n.push(Zi(e,`change`,t,r)),d&&(n.push(Zi(e,`blur`,t,r)),e.form)){let t=e.form,n=()=>r({target:e});t._x_pendingModelUpdates||=[],t._x_pendingModelUpdates.push(n),i(()=>{t._x_pendingModelUpdates&&t._x_pendingModelUpdates.splice(t._x_pendingModelUpdates.indexOf(n),1)})}f&&n.push(Zi(e,`keydown`,t,e=>{e.key===`Enter`&&r(e)})),m=()=>n.forEach(e=>e())}else m=Zi(e,e.tagName.toLowerCase()===`select`||[`checkbox`,`radio`].includes(e.type)?`change`:`input`,t,n=>{l(ca(e,t,n,c()))});if(t.includes(`fill`)&&([void 0,null,``].includes(c())||zn(e)&&Array.isArray(c())||e.tagName.toLowerCase()===`select`&&e.multiple)&&l(ca(e,t,{target:e},c())),e._x_removeModelListeners||={},e._x_removeModelListeners.default=m,i(()=>e._x_removeModelListeners.default()),e.form){let n=Zi(e.form,`reset`,[],n=>{en(()=>e._x_model&&e._x_model.set(ca(e,t,{target:e},c())))});i(()=>n())}if(e._x_model={get(){return c()},set(e){l(e)},setWithModifiers:Qi(t,l)},e._x_forceModelUpdate=t=>{t===void 0&&typeof n==`string`&&n.match(/\./)&&(t=``),L(()=>{zn(e)?e.checked=Array.isArray(t)?t.some(t=>t==e.value):!!t:Bn(e)?e.checked=typeof t==`boolean`?jn(e.value)===t:e.value==t:bn(e,`value`,t)})},e.tagName===`SELECT`){let t=new MutationObserver(()=>{e._x_forceModelUpdate(c())});t.observe(e,{childList:!0}),i(()=>t.disconnect())}r(()=>{let n=c();t.includes(`unintrusive`)&&document.activeElement.isSameNode(e)||e._x_forceModelUpdate(n)})});function ca(e,t,n,r){return L(()=>{if(n instanceof CustomEvent&&n.detail!==void 0)return n.detail!==null&&n.detail!==void 0?n.detail:n.target.value;if(zn(e)){if(Array.isArray(r)){let e=null;return e=t.includes(`number`)?la(n.target.value):t.includes(`boolean`)?jn(n.target.value):n.target.value,n.target.checked?r.includes(e)?r:r.concat([e]):r.filter(t=>!ua(t,e))}return n.target.checked}if(e.tagName.toLowerCase()===`select`&&e.multiple)return t.includes(`number`)?Array.from(n.target.selectedOptions).map(e=>la(e.value||e.text)):t.includes(`boolean`)?Array.from(n.target.selectedOptions).map(e=>jn(e.value||e.text)):Array.from(n.target.selectedOptions).map(e=>e.value||e.text);{let i;return i=Bn(e)?n.target.checked?n.target.value:r:n.target.value,t.includes(`number`)?la(i):t.includes(`boolean`)?jn(i):t.includes(`trim`)?i.trim():i}})}function la(e){let t=e?parseFloat(e):null;return da(t)?t:e}function ua(e,t){return e==t}function da(e){return!Array.isArray(e)&&!isNaN(e)}function fa(e){return typeof e==`object`&&!!e&&typeof e.get==`function`&&typeof e.set==`function`}Ye(`cloak`,e=>{if(_t)return e.removeAttribute(Ke(`cloak`));queueMicrotask(()=>L(()=>e.removeAttribute(Ke(`cloak`))))}),Ht(()=>`[${Ke(`init`)}]`),Ye(`init`,vt((e,{expression:t},{evaluate:n})=>typeof t==`string`?!!t.trim()&&n(t,{},!1):n(t,{},!1))),Ye(`text`,(e,{expression:t},{effect:n,evaluateLater:r})=>{let i=r(t);n(()=>{i(t=>{L(()=>{e.textContent=t})})})}),Ye(`html`,(e,{expression:t},{effect:n,evaluateLater:r})=>{let i=r(t);n(()=>{i(t=>{L(()=>{Array.from(e.children).forEach(e=>Xt(e)),e.innerHTML=t??``,e._x_ignoreSelf=!0,Yt(e),delete e._x_ignoreSelf})})},{priority:`structural`})}),lt(at(`:`,ot(Ke(`bind:`))));var pa=(e,{value:t,modifiers:n,expression:r,original:i},{effect:a,cleanup:o})=>{if(!t){let t={};Qn(t),Me(e,r)(t=>{$n(e,t,i)},{scope:t});return}if(t===`key`)return ma(e,r);if(e._x_inlineBindings&&e._x_inlineBindings[t]&&e._x_inlineBindings[t].extract)return;let s=Me(e,r);a(()=>s(i=>{i===void 0&&typeof r==`string`&&r.match(/\./)&&(i=``),L(()=>bn(e,t,i,n))})),o(()=>{e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedStyles&&e._x_undoAddedStyles()})};pa.inline=(e,{value:t,modifiers:n,expression:r})=>{t&&(e._x_inlineBindings||={},e._x_inlineBindings[t]={expression:r,extract:!1})},Ye(`bind`,pa);function ma(e,t){e._x_keyExpression=t}Vt(()=>`[${Ke(`data`)}]`);var ha=Symbol();Ye(`data`,(e,{expression:t},{cleanup:n})=>{if(_a(e))return;let r=e[ha];if(r?.expression===t)return;t=t===``?`{}`:t;let i={};we(i,e);let a={};nr(a,i);let o=je(e,t,{scope:a});(o===void 0||o===!0)&&(o={}),we(o,e);let s;if(r?.reactiveData){s=r.reactiveData,ga(s,o);let n={expression:t};e[ha]=n,queueMicrotask(()=>{e[ha]===n&&delete e[ha]})}else s=_(o);be(s,n);let c=me(e,s);vt(()=>{s.init&&je(e,s.init)})(),n(()=>{s.destroy&&je(e,s.destroy),c();let t={reactiveData:s};e[ha]=t,queueMicrotask(()=>{e[ha]===t&&delete e[ha]})})});function ga(e,t){Object.keys(t).forEach(n=>{let r=Object.getOwnPropertyDescriptor(t,n),i=Object.getOwnPropertyDescriptor(e,n);r.get||r.set||i?.get||i?.set?(i&&delete e[n],i||(e[n]=void 0),r.get||r.set?Object.defineProperty(e,n,r):e[n]=t[n]):e[n]=t[n]}),Object.keys(e).filter(e=>!Object.prototype.hasOwnProperty.call(t,e)).forEach(t=>delete e[t])}xt((e,t)=>{e._x_dataStack&&(t._x_dataStack=e._x_dataStack,t.setAttribute(`data-has-alpine-state`,!0))});function _a(e){return _t?Ct?!0:e.hasAttribute(`data-has-alpine-state`):!1}Ye(`show`,(e,{modifiers:t,expression:n},{effect:r})=>{let i=Me(e,n);e._x_doHide||=()=>{L(()=>{e.style.setProperty(`display`,`none`,t.includes(`important`)?`important`:void 0)})},e._x_doShow||=()=>{L(()=>{e.style.length===1&&e.style.display===`none`?e.removeAttribute(`style`):e.style.removeProperty(`display`)})};let a=()=>{e._x_doHide(),e._x_isShown=!1},o=()=>{e._x_doShow(),e._x_isShown=!0},s=()=>setTimeout(o),c=fn(e=>e?o():a(),t=>{typeof e._x_toggleAndCascadeWithTransitions==`function`?e._x_toggleAndCascadeWithTransitions(e,t,o,a):t?s():a()}),l,u=!0;r(()=>i(e=>{(u||e!==l)&&(t.includes(`immediate`)&&(e?s():a()),c(e),l=e,u=!1)}))}),Ye(`for`,vt((e,{expression:t},{effect:n,cleanup:r})=>{let i=ba(t),a=Me(e,i.items),o=Me(e,e._x_keyExpression||`index`);e._x_lookup=new Map,n(()=>ya(e,i,a,o),{priority:`structural`}),r(()=>{e._x_lookup.forEach(e=>L(()=>{Xt(e),e.remove()})),delete e._x_lookup,delete e._x_lastRenderedEl})}));function va(e){return t=>{Object.entries(t).forEach(([t,n])=>{e[t]=n})}}function ya(e,t,n,r){n(n=>{Sa(n)&&(n=Array.from({length:n},(e,t)=>t+1)),n??=[],n instanceof Set&&(n=Array.from(n)),n instanceof Map&&(n=Array.from(n));let i=e._x_lookup,a=new Map;e._x_lookup=a;let o=Ca(n),s=Object.entries(n).map(([s,c])=>{o||(s=parseInt(s));let l=xa(t,c,s,n),u;return r(t=>{typeof t==`object`&&Pt(`x-for key cannot be an object, it must be a string or an integer`,e),i.has(t)&&(a.set(t,i.get(t)),i.delete(t)),u=t},{scope:{index:s,...l}}),[u,l]});L(()=>{i.forEach(e=>{Xt(e),e.remove()});let t=new Set,n=e;s.forEach(([r,i])=>{if(a.has(r)){let e=a.get(r);e._x_refreshXForScope(i),n.nextElementSibling!==e&&(n.nextElementSibling&&e.replaceWith(n.nextElementSibling),n.after(e)),n=e,e._x_currentIfEl&&(e.nextElementSibling!==e._x_currentIfEl&&n.after(e._x_currentIfEl),n=e._x_currentIfEl);return}e.content.children.length>1&&Pt(`x-for templates require a single root element, additional elements will be ignored.`,e);let o=document.importNode(e.content,!0).firstElementChild,s=_(i);me(o,s,e),o._x_refreshXForScope=va(s),a.set(r,o),t.add(o),n.after(o),n=o}),t.forEach(e=>Yt(e)),n===e?delete e._x_lastRenderedEl:e._x_lastRenderedEl=n})})}function ba(e){let t=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,n=/^\s*\(|\)\s*$/g,r=e.match(/([\s\S]*?)\b(?:in|of)\b([\s\S]*)/);if(!r)return;let i={};i.items=r[2].trim();let a=r[1].replace(n,``).trim(),o=a.match(t);return o?(i.item=a.replace(t,``).trim(),i.index=o[1].trim(),o[2]&&(i.collection=o[2].trim())):i.item=a,i}function xa(e,t,n,r){let i={};return/^\[.*\]$/.test(e.item)&&Array.isArray(t)?e.item.replace(`[`,``).replace(`]`,``).split(`,`).map(e=>e.trim()).forEach((e,n)=>{i[e]=t[n]}):/^\{.*\}$/.test(e.item)&&!Array.isArray(t)&&typeof t==`object`?e.item.replace(`{`,``).replace(`}`,``).split(`,`).map(e=>e.trim()).forEach(e=>{i[e]=t[e]}):i[e.item]=t,e.index&&(i[e.index]=n),e.collection&&(i[e.collection]=r),i}function Sa(e){return typeof e!=`object`&&!isNaN(e)}function Ca(e){return typeof e==`object`&&!Array.isArray(e)}function wa(){}wa.inline=(e,{expression:t},{cleanup:n})=>{let r=Ut(e);r&&(r._x_refs||={},r._x_refs[t]=e,n(()=>delete r._x_refs[t]))},Ye(`ref`,wa),Ye(`if`,vt((e,{expression:t},{effect:n,cleanup:r})=>{e.tagName.toLowerCase()!==`template`&&Pt(`x-if can only be used on a <template> tag`,e);let i=Me(e,t),a=()=>{if(e._x_currentIfEl)return e._x_currentIfEl;let t=e.content.cloneNode(!0).firstElementChild;return me(t,{},e),L(()=>{e.after(t),Yt(t)}),e._x_currentIfEl=t,e._x_lastRenderedEl=t,e._x_undoIf=()=>{L(()=>{Xt(t),t.remove()}),delete e._x_currentIfEl,delete e._x_lastRenderedEl},t},o=()=>{e._x_undoIf&&(e._x_undoIf(),delete e._x_undoIf)};n(()=>i(e=>{e?a():o()}),{priority:`structural`}),r(()=>e._x_undoIf&&e._x_undoIf())})),Ye(`id`,(e,{expression:t},{evaluate:n})=>{n(t).forEach(t=>Gi(e,t))}),xt((e,t)=>{e._x_ids&&(t._x_ids=e._x_ids)}),lt(at(`@`,ot(Ke(`on:`)))),Ye(`on`,vt((e,{value:t,modifiers:n,expression:r},{cleanup:i})=>{let a=r?Me(e,r):()=>{};e.tagName.toLowerCase()===`template`&&(e._x_forwardEvents||=[],e._x_forwardEvents.includes(t)||e._x_forwardEvents.push(t));let o=Zi(e,t,n,e=>{a(()=>{},{scope:{$event:e},params:[e]})});i(()=>o())})),Ta(`Collapse`,`collapse`,`collapse`),Ta(`Intersect`,`intersect`,`intersect`),Ta(`Focus`,`trap`,`focus`),Ta(`Mask`,`mask`,`mask`);function Ta(e,t,n){Ye(t,r=>Pt(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`,r))}rr.setEvaluator(Le),rr.setRawEvaluator(We),rr.setReactivityEngine({reactive:Ai,effect:(e,t={})=>{let n;return n=Fr(e,{scheduler:()=>{n&&(t.scheduler?t.scheduler(n):n())}}),n},release:Ir,raw:Li});var Ea=rr,Da=1e3,Oa=1001,ka=1002,Aa=1003,ja=1004,Ma=1005,Na=1006,Pa=1007,Fa=1008,Ia=1009,La=1010,Ra=1011,za=1012,Ba=1013,Va=1014,Ha=1015,Ua=1016,Wa=1017,Ga=1018,Ka=1020,qa=35902,Ja=35899,Ya=1021,Xa=1022,Za=1023,Qa=1026,$a=1027,eo=1028,to=1029,no=1030,ro=1031,io=1033,ao=33776,oo=33777,so=33778,co=33779,lo=35840,uo=35841,fo=35842,po=35843,mo=36196,ho=37492,go=37496,_o=37488,vo=37489,yo=37490,bo=37491,xo=37808,So=37809,Co=37810,wo=37811,To=37812,Eo=37813,Do=37814,Oo=37815,ko=37816,Ao=37817,jo=37818,Mo=37819,No=37820,Po=37821,Fo=36492,Io=36494,Lo=36495,Ro=36283,zo=36284,Bo=36285,Vo=36286,Ho=2300,Uo=2301,Wo=2302,Go=2303,Ko=2400,qo=2401,Jo=2402,Yo=3200,Xo=`srgb`,Zo=`srgb-linear`,Qo=`linear`,$o=`srgb`,es=7680,ts=35044,ns=2e3;function rs(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function is(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function as(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function os(){let e=as(`canvas`);return e.style.display=`block`,e}var ss={};function cs(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ls(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=ls(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=ls(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function us(...e){let t=e.join(` `);t in ss||(ss[t]=!0,H(...e))}function ds(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var fs={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ps=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ms=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),hs=1234567,gs=Math.PI/180,_s=180/Math.PI;function vs(){let e=Math.random()*0xffffffff|0,t=Math.random()*0xffffffff|0,n=Math.random()*0xffffffff|0,r=Math.random()*0xffffffff|0;return(ms[e&255]+ms[e>>8&255]+ms[e>>16&255]+ms[e>>24&255]+`-`+ms[t&255]+ms[t>>8&255]+`-`+ms[t>>16&15|64]+ms[t>>24&255]+`-`+ms[n&63|128]+ms[n>>8&255]+`-`+ms[n>>16&255]+ms[n>>24&255]+ms[r&255]+ms[r>>8&255]+ms[r>>16&255]+ms[r>>24&255]).toLowerCase()}function ys(e,t,n){return Math.max(t,Math.min(n,e))}function bs(e,t){return(e%t+t)%t}function xs(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Ss(e,t,n){return e===t?0:(n-e)/(t-e)}function Cs(e,t,n){return(1-n)*e+n*t}function ws(e,t,n,r){return Cs(e,t,1-Math.exp(-n*r))}function Ts(e,t=1){return t-Math.abs(bs(e,t*2)-t)}function Es(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Ds(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Os(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ks(e,t){return e+Math.random()*(t-e)}function As(e){return e*(.5-Math.random())}function js(e){e!==void 0&&(hs=e);let t=hs+=0x6d2b79f5;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ms(e){return e*gs}function Ns(e){return e*_s}function Ps(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Fs(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Is(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ls(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:H(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Rs(e){switch(e.constructor){case Uint32Array:return 0xffffffff;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 0x7fffffff;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function zs(e,t){if(t.constructor===Float32Array)return e;let n=Rs(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Bs(e,t){if(t.constructor===Float32Array)return e;let n=Rs(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var Vs={DEG2RAD:gs,RAD2DEG:_s,generateUUID:vs,clamp:ys,euclideanModulo:bs,mapLinear:xs,inverseLerp:Ss,lerp:Cs,damp:ws,pingpong:Ts,smoothstep:Es,smootherstep:Ds,randInt:Os,randFloat:ks,randFloatSpread:As,seededRandom:js,degToRad:Ms,radToDeg:Ns,isPowerOfTwo:Ps,ceilPowerOfTwo:Fs,floorPowerOfTwo:Is,setQuaternionFromProperEuler:Ls,normalize:Bs,denormalize:zs},Hs=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ys(this.x,e.x,t.x),this.y=ys(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ys(this.x,e,t),this.y=ys(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ys(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ys(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Us=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ys(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gs.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gs.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ys(this.x,e.x,t.x),this.y=ys(this.y,e.y,t.y),this.z=ys(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ys(this.x,e,t),this.y=ys(this.y,e,t),this.z=ys(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ys(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ws.copy(this).projectOnVector(e),this.sub(Ws)}reflect(e){return this.sub(Ws.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ys(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ws=new W,Gs=new Us,G=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return us(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ks.makeScale(e,t)),this}rotate(e){return us(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ks.makeRotation(-e)),this}translate(e,t){return us(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ks.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ks=new G,qs=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Js=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ys(){let e={enabled:!0,workingColorSpace:Zo,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Zs(e.r),e.g=Zs(e.g),e.b=Zs(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Qs(e.r),e.g=Qs(e.g),e.b=Qs(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Qo:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Zo]:{primaries:t,whitePoint:r,transfer:Qo,toXYZ:qs,fromXYZ:Js,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Xo},outputColorSpaceConfig:{drawingBufferColorSpace:Xo}},[Xo]:{primaries:t,whitePoint:r,transfer:$o,toXYZ:qs,fromXYZ:Js,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Xo}}}),e}var Xs=Ys();function Zs(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Qs(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var $s,ec=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{$s===void 0&&($s=as(`canvas`)),$s.width=e.width,$s.height=e.height;let t=$s.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=$s}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=as(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Zs(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Zs(t[e]/255)*255):t[e]=Zs(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},tc=0,nc=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:tc++}),this.uuid=vs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(rc(r[t].image)):e.push(rc(r[t]))}else e=rc(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function rc(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?ec.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var ic=0,ac=new W,oc=class e extends ps{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Oa,i=Oa,a=Na,o=Fa,s=Za,c=Ia,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ic++}),this.uuid=vs(),this.name=``,this.source=new nc(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Hs(0,0),this.repeat=new Hs(1,1),this.center=new Hs(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ac).x}get height(){return this.source.getSize(ac).y}get depth(){return this.source.getSize(ac).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Da:e.x-=Math.floor(e.x);break;case Oa:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Da:e.y-=Math.floor(e.y);break;case Oa:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};oc.DEFAULT_IMAGE=null,oc.DEFAULT_MAPPING=300,oc.DEFAULT_ANISOTROPY=1;var sc=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ys(this.x,e.x,t.x),this.y=ys(this.y,e.y,t.y),this.z=ys(this.z,e.z,t.z),this.w=ys(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ys(this.x,e,t),this.y=ys(this.y,e,t),this.z=ys(this.z,e,t),this.w=ys(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ys(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},cc=class extends ps{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Na,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new sc(0,0,e,t),this.scissorTest=!1,this.viewport=new sc(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new oc({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Na,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new nc(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},lc=class extends cc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},uc=class extends oc{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Aa,this.minFilter=Aa,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},dc=class extends oc{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Aa,this.minFilter=Aa,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},fc=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/pc.setFromMatrixColumn(e,0).length(),i=1/pc.setFromMatrixColumn(e,1).length(),a=1/pc.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hc,e,gc)}lookAt(e,t,n){let r=this.elements;return yc.subVectors(e,t),yc.lengthSq()===0&&(yc.z=1),yc.normalize(),_c.crossVectors(n,yc),_c.lengthSq()===0&&(Math.abs(n.z)===1?yc.x+=1e-4:yc.z+=1e-4,yc.normalize(),_c.crossVectors(n,yc)),_c.normalize(),vc.crossVectors(yc,_c),r[0]=_c.x,r[4]=vc.x,r[8]=yc.x,r[1]=_c.y,r[5]=vc.y,r[9]=yc.y,r[2]=_c.z,r[6]=vc.z,r[10]=yc.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=pc.set(r[0],r[1],r[2]).length(),o=pc.set(r[4],r[5],r[6]).length(),s=pc.set(r[8],r[9],r[10]).length();i<0&&(a=-a),mc.copy(this);let c=1/a,l=1/o,u=1/s;return mc.elements[0]*=c,mc.elements[1]*=c,mc.elements[2]*=c,mc.elements[4]*=l,mc.elements[5]*=l,mc.elements[6]*=l,mc.elements[8]*=u,mc.elements[9]*=u,mc.elements[10]*=u,t.setFromRotationMatrix(mc),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ns,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ns,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},pc=new W,mc=new fc,hc=new W(0,0,0),gc=new W(1,1,1),_c=new W,vc=new W,yc=new W,bc=new fc,xc=new Us,Sc=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(ys(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-ys(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(ys(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-ys(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(ys(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-ys(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return bc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xc.setFromEuler(this),this.setFromQuaternion(xc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Sc.DEFAULT_ORDER=`XYZ`;var Cc=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},wc=0,Tc=new W,Ec=new Us,Dc=new fc,Oc=new W,kc=new W,Ac=new W,jc=new Us,Mc=new W(1,0,0),Nc=new W(0,1,0),Pc=new W(0,0,1),Fc={type:`added`},Ic={type:`removed`},Lc={type:`childadded`,child:null},Rc={type:`childremoved`,child:null},zc=class e extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wc++}),this.uuid=vs(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new Sc,r=new Us,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new fc},normalMatrix:{value:new G}}),this.matrix=new fc,this.matrixWorld=new fc,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ec.setFromAxisAngle(e,t),this.quaternion.multiply(Ec),this}rotateOnWorldAxis(e,t){return Ec.setFromAxisAngle(e,t),this.quaternion.premultiply(Ec),this}rotateX(e){return this.rotateOnAxis(Mc,e)}rotateY(e){return this.rotateOnAxis(Nc,e)}rotateZ(e){return this.rotateOnAxis(Pc,e)}translateOnAxis(e,t){return Tc.copy(e).applyQuaternion(this.quaternion),this.position.add(Tc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mc,e)}translateY(e){return this.translateOnAxis(Nc,e)}translateZ(e){return this.translateOnAxis(Pc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Dc.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oc.copy(e):Oc.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),kc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dc.lookAt(kc,Oc,this.up):Dc.lookAt(Oc,kc,this.up),this.quaternion.setFromRotationMatrix(Dc),r&&(Dc.extractRotation(r.matrixWorld),Ec.setFromRotationMatrix(Dc),this.quaternion.premultiply(Ec.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fc),Lc.child=e,this.dispatchEvent(Lc),Lc.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ic),Rc.child=e,this.dispatchEvent(Rc),Rc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Dc.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Dc.multiply(e.parent.matrixWorld)),e.applyMatrix4(Dc),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fc),Lc.child=e,this.dispatchEvent(Lc),Lc.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kc,e,Ac),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kc,jc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};zc.DEFAULT_UP=new W(0,1,0),zc.DEFAULT_MATRIX_AUTO_UPDATE=!0,zc.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Bc=class extends zc{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Vc={type:`move`},Hc=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vc)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Bc;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Uc={aliceblue:0xf0f8ff,antiquewhite:0xfaebd7,aqua:65535,aquamarine:8388564,azure:0xf0ffff,beige:0xf5f5dc,bisque:0xffe4c4,black:0,blanchedalmond:0xffebcd,blue:255,blueviolet:9055202,brown:0xa52a2a,burlywood:0xdeb887,cadetblue:6266528,chartreuse:8388352,chocolate:0xd2691e,coral:0xff7f50,cornflowerblue:6591981,cornsilk:0xfff8dc,crimson:0xdc143c,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:0xb8860b,darkgray:0xa9a9a9,darkgreen:25600,darkgrey:0xa9a9a9,darkkhaki:0xbdb76b,darkmagenta:9109643,darkolivegreen:5597999,darkorange:0xff8c00,darkorchid:0x9932cc,darkred:9109504,darksalmon:0xe9967a,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:0xff1493,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:0xb22222,floralwhite:0xfffaf0,forestgreen:2263842,fuchsia:0xff00ff,gainsboro:0xdcdcdc,ghostwhite:0xf8f8ff,gold:0xffd700,goldenrod:0xdaa520,gray:8421504,green:32768,greenyellow:0xadff2f,grey:8421504,honeydew:0xf0fff0,hotpink:0xff69b4,indianred:0xcd5c5c,indigo:4915330,ivory:0xfffff0,khaki:0xf0e68c,lavender:0xe6e6fa,lavenderblush:0xfff0f5,lawngreen:8190976,lemonchiffon:0xfffacd,lightblue:0xadd8e6,lightcoral:0xf08080,lightcyan:0xe0ffff,lightgoldenrodyellow:0xfafad2,lightgray:0xd3d3d3,lightgreen:9498256,lightgrey:0xd3d3d3,lightpink:0xffb6c1,lightsalmon:0xffa07a,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:0xb0c4de,lightyellow:0xffffe0,lime:65280,limegreen:3329330,linen:0xfaf0e6,magenta:0xff00ff,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:0xba55d3,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:0xc71585,midnightblue:1644912,mintcream:0xf5fffa,mistyrose:0xffe4e1,moccasin:0xffe4b5,navajowhite:0xffdead,navy:128,oldlace:0xfdf5e6,olive:8421376,olivedrab:7048739,orange:0xffa500,orangered:0xff4500,orchid:0xda70d6,palegoldenrod:0xeee8aa,palegreen:0x98fb98,paleturquoise:0xafeeee,palevioletred:0xdb7093,papayawhip:0xffefd5,peachpuff:0xffdab9,peru:0xcd853f,pink:0xffc0cb,plum:0xdda0dd,powderblue:0xb0e0e6,purple:8388736,rebeccapurple:6697881,red:0xff0000,rosybrown:0xbc8f8f,royalblue:4286945,saddlebrown:9127187,salmon:0xfa8072,sandybrown:0xf4a460,seagreen:3050327,seashell:0xfff5ee,sienna:0xa0522d,silver:0xc0c0c0,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:0xfffafa,springgreen:65407,steelblue:4620980,tan:0xd2b48c,teal:32896,thistle:0xd8bfd8,tomato:0xff6347,turquoise:4251856,violet:0xee82ee,wheat:0xf5deb3,white:0xffffff,whitesmoke:0xf5f5f5,yellow:0xffff00,yellowgreen:0x9acd32},Wc={h:0,s:0,l:0},Gc={h:0,s:0,l:0};function Kc(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<.5?t:n<2/3?e+(t-e)*6*(2/3-n):e}var qc=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xo){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Xs.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Xs.workingColorSpace){return this.r=e,this.g=t,this.b=n,Xs.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Xs.workingColorSpace){if(e=bs(e,1),t=ys(t,0,1),n=ys(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Kc(i,r,e+1/3),this.g=Kc(i,r,e),this.b=Kc(i,r,e-1/3)}return Xs.colorSpaceToWorking(this,r),this}setStyle(e,t=Xo){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xo){let n=Uc[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}copyLinearToSRGB(e){return this.r=Qs(e.r),this.g=Qs(e.g),this.b=Qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xo){return Xs.workingToColorSpace(Jc.copy(this),e),Math.round(ys(Jc.r*255,0,255))*65536+Math.round(ys(Jc.g*255,0,255))*256+Math.round(ys(Jc.b*255,0,255))}getHexString(e=Xo){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Xs.workingColorSpace){Xs.workingToColorSpace(Jc.copy(this),t);let n=Jc.r,r=Jc.g,i=Jc.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Xs.workingColorSpace){return Xs.workingToColorSpace(Jc.copy(this),t),e.r=Jc.r,e.g=Jc.g,e.b=Jc.b,e}getStyle(e=Xo){Xs.workingToColorSpace(Jc.copy(this),e);let t=Jc.r,n=Jc.g,r=Jc.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Wc),this.setHSL(Wc.h+e,Wc.s+t,Wc.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wc),e.getHSL(Gc);let n=Cs(Wc.h,Gc.h,t),r=Cs(Wc.s,Gc.s,t),i=Cs(Wc.l,Gc.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jc=new qc;qc.NAMES=Uc;var Yc=class extends zc{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sc,this.environmentIntensity=1,this.environmentRotation=new Sc,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xc=new W,Zc=new W,Qc=new W,$c=new W,el=new W,tl=new W,nl=new W,rl=new W,il=new W,al=new W,ol=new sc,sl=new sc,cl=new sc,ll=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Xc.subVectors(e,t),r.cross(Xc);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Xc.subVectors(r,t),Zc.subVectors(n,t),Qc.subVectors(e,t);let a=Xc.dot(Xc),o=Xc.dot(Zc),s=Xc.dot(Qc),c=Zc.dot(Zc),l=Zc.dot(Qc),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,$c)!==null&&$c.x>=0&&$c.y>=0&&$c.x+$c.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,$c)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,$c.x),s.addScaledVector(a,$c.y),s.addScaledVector(o,$c.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return ol.setScalar(0),sl.setScalar(0),cl.setScalar(0),ol.fromBufferAttribute(e,t),sl.fromBufferAttribute(e,n),cl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ol,i.x),a.addScaledVector(sl,i.y),a.addScaledVector(cl,i.z),a}static isFrontFacing(e,t,n,r){return Xc.subVectors(n,t),Zc.subVectors(e,t),Xc.cross(Zc).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xc.subVectors(this.c,this.b),Zc.subVectors(this.a,this.b),Xc.cross(Zc).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;el.subVectors(r,n),tl.subVectors(i,n),rl.subVectors(e,n);let s=el.dot(rl),c=tl.dot(rl);if(s<=0&&c<=0)return t.copy(n);il.subVectors(e,r);let l=el.dot(il),u=tl.dot(il);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(el,a);al.subVectors(e,i);let f=el.dot(al),p=tl.dot(al);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(tl,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return nl.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(nl,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(el,a).addScaledVector(tl,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ul=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fl.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fl.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fl.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,fl):fl.fromBufferAttribute(r,t),fl.applyMatrix4(e.matrixWorld),this.expandByPoint(fl);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),pl.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),pl.copy(e.boundingBox)),pl.applyMatrix4(e.matrixWorld),this.union(pl)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,fl),fl.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bl),xl.subVectors(this.max,bl),ml.subVectors(e.a,bl),hl.subVectors(e.b,bl),gl.subVectors(e.c,bl),_l.subVectors(hl,ml),vl.subVectors(gl,hl),yl.subVectors(ml,gl);let t=[0,-_l.z,_l.y,0,-vl.z,vl.y,0,-yl.z,yl.y,_l.z,0,-_l.x,vl.z,0,-vl.x,yl.z,0,-yl.x,-_l.y,_l.x,0,-vl.y,vl.x,0,-yl.y,yl.x,0];return!wl(t,ml,hl,gl,xl)||(t=[1,0,0,0,1,0,0,0,1],!wl(t,ml,hl,gl,xl))?!1:(Sl.crossVectors(_l,vl),t=[Sl.x,Sl.y,Sl.z],wl(t,ml,hl,gl,xl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fl).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fl).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(dl[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dl[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dl[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dl[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dl[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dl[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dl[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dl[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dl)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},dl=[new W,new W,new W,new W,new W,new W,new W,new W],fl=new W,pl=new ul,ml=new W,hl=new W,gl=new W,_l=new W,vl=new W,yl=new W,bl=new W,xl=new W,Sl=new W,Cl=new W;function wl(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Cl.fromArray(e,a);let o=i.x*Math.abs(Cl.x)+i.y*Math.abs(Cl.y)+i.z*Math.abs(Cl.z),s=t.dot(Cl),c=n.dot(Cl),l=r.dot(Cl);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Tl=new W,El=new Hs,Dl=0,Ol=class extends ps{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dl++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ts,this.updateRanges=[],this.gpuType=Ha,this.version=0,this._normalizationScale=e===void 0?void 0:Rs(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)El.fromBufferAttribute(this,t),El.applyMatrix3(e),this.setXY(t,El.x,El.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tl.fromBufferAttribute(this,t),Tl.applyMatrix3(e),this.setXYZ(t,Tl.x,Tl.y,Tl.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tl.fromBufferAttribute(this,t),Tl.applyMatrix4(e),this.setXYZ(t,Tl.x,Tl.y,Tl.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tl.fromBufferAttribute(this,t),Tl.applyNormalMatrix(e),this.setXYZ(t,Tl.x,Tl.y,Tl.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tl.fromBufferAttribute(this,t),Tl.transformDirection(e),this.setXYZ(t,Tl.x,Tl.y,Tl.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?zs(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Bs(e,this.array):Math.round(e*t)}},kl=class extends Ol{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Al=class extends Ol{constructor(e,t,n){super(new Uint32Array(e),t,n)}},jl=class extends Ol{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ml=new ul,Nl=new W,Pl=new W,Fl=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ml.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Nl.subVectors(e,this.center);let t=Nl.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Nl,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Nl.copy(e.center).add(Pl)),this.expandByPoint(Nl.copy(e.center).sub(Pl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Il=0,Ll=new fc,Rl=new zc,zl=new W,Bl=new ul,Vl=new ul,Hl=new W,Ul=class e extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Il++}),this.uuid=vs(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(rs(e)?Al:kl)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ll.makeRotationFromQuaternion(e),this.applyMatrix4(Ll),this}rotateX(e){return Ll.makeRotationX(e),this.applyMatrix4(Ll),this}rotateY(e){return Ll.makeRotationY(e),this.applyMatrix4(Ll),this}rotateZ(e){return Ll.makeRotationZ(e),this.applyMatrix4(Ll),this}translate(e,t,n){return Ll.makeTranslation(e,t,n),this.applyMatrix4(Ll),this}scale(e,t,n){return Ll.makeScale(e,t,n),this.applyMatrix4(Ll),this}lookAt(e){return Rl.lookAt(e),Rl.updateMatrix(),this.applyMatrix4(Rl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zl).negate(),this.translate(zl.x,zl.y,zl.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new jl(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ul);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Bl.setFromBufferAttribute(n),this.morphTargetsRelative?(Hl.addVectors(this.boundingBox.min,Bl.min),this.boundingBox.expandByPoint(Hl),Hl.addVectors(this.boundingBox.max,Bl.max),this.boundingBox.expandByPoint(Hl)):(this.boundingBox.expandByPoint(Bl.min),this.boundingBox.expandByPoint(Bl.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fl);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);else if(e){let n=this.boundingSphere.center;if(Bl.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Vl.setFromBufferAttribute(n),this.morphTargetsRelative?(Hl.addVectors(Bl.min,Vl.min),Bl.expandByPoint(Hl),Hl.addVectors(Bl.max,Vl.max),Bl.expandByPoint(Hl)):(Bl.expandByPoint(Vl.min),Bl.expandByPoint(Vl.max))}Bl.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Hl.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Hl));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Hl.fromBufferAttribute(a,t),o&&(zl.fromBufferAttribute(e,t),Hl.add(zl)),r=Math.max(r,n.distanceToSquared(Hl))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Ol(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let l=new W,u=new W,d=new W,f=new Hs,p=new Hs,m=new Hs,h=new W,g=new W;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new W,b=new W,x=new W,S=new W;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Ol(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Hl.fromBufferAttribute(e,t),Hl.normalize(),e.setXYZ(t,Hl.x,Hl.y,Hl.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Ol(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=t(i[e],r);n.setAttribute(e,a)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=t(o[e],r);i.push(n)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Wl=new W,Gl=new W,Kl=new G,ql=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Wl.subVectors(n,t).cross(Gl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Wl),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Kl.getNormalMatrix(e),r=this.coplanarPoint(Wl).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Jl=0,Yl=class extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jl++}),this.uuid=vs(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qc(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qc().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ql().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new Hs().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Hs().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Xl=new W,Zl=new W,Ql=new W,$l=new W,eu=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xl)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xl.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xl.copy(this.origin).addScaledVector(this.direction,t),Xl.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Zl.copy(e).add(t).multiplyScalar(.5),Ql.copy(t).sub(e).normalize(),$l.copy(this.origin).sub(Zl);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ql),o=$l.dot(this.direction),s=-$l.dot(Ql),c=$l.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Zl).addScaledVector(Ql,d),f}intersectSphere(e,t){if(e.radius<0)return null;Xl.subVectors(e.center,this.origin);let n=Xl.dot(this.direction),r=Xl.dot(Xl)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Xl)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,te=E-F*D,ne=O-P*A,re=k-F*A,ie=j-P*N,ae=M-F*N,oe=ie*re-ae*ne,se=ee*ae-te*ie,L=ne*te-re*ee;if(r){if(oe<0||se<0||L<0)return null}else if((oe<0||se<0||L<0)&&(oe>0||se>0||L>0))return null;let ce=oe+se+L;if(ce===0)return null;let le=I*(oe*D+se*A+L*N);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},tu=class extends Yl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new qc(0xffffff),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sc,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},nu=new fc,ru=new eu,iu=new Fl,au=new W,ou=new W,su=new W,cu=new W,lu=new W,uu=new W,du=new W,fu=new W,pu=class extends zc{constructor(e=new Ul,t=new tu){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){uu.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(lu.fromBufferAttribute(s,e),a?uu.addScaledVector(lu,r):uu.addScaledVector(lu.sub(t),r))}t.add(uu)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),iu.copy(n.boundingSphere),iu.applyMatrix4(i),ru.copy(e.ray).recast(e.near),iu.containsPoint(ru.origin)===!1&&(ru.intersectSphere(iu,au)===null||ru.origin.distanceToSquared(au)>(e.far-e.near)**2)||(nu.copy(i).invert(),ru.copy(e.ray).applyMatrix4(nu),(n.boundingBox===null||ru.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ru)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=hu(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=hu(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=hu(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=hu(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function mu(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;fu.copy(s),fu.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(fu);return l<n.near||l>n.far?null:{distance:l,point:fu.clone(),object:e}}function hu(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ou),e.getVertexPosition(c,su),e.getVertexPosition(l,cu);let u=mu(e,t,n,r,ou,su,cu,du);if(u){let e=new W;ll.getBarycoord(du,ou,su,cu,e),i&&(u.uv=ll.getInterpolatedAttribute(i,s,c,l,e,new Hs)),a&&(u.uv1=ll.getInterpolatedAttribute(a,s,c,l,e,new Hs)),o&&(u.normal=ll.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};ll.getNormal(ou,su,cu,t.normal),u.face=t,u.barycoord=e}return u}var gu=class extends oc{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Aa,l=Aa,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},_u=new Fl,vu=new Hs(.5,.5),yu=new W,bu=class{constructor(e=new ql,t=new ql,n=new ql,r=new ql,i=new ql,a=new ql){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ns,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_u.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_u.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_u)}intersectsSprite(e){return _u.center.set(0,0,0),_u.radius=.7071067811865476+vu.distanceTo(e.center),_u.applyMatrix4(e.matrixWorld),this.intersectsSphere(_u)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(yu.x=r.normal.x>0?e.max.x:e.min.x,yu.y=r.normal.y>0?e.max.y:e.min.y,yu.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yu)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},xu=new fc,Su=class e{constructor(){this.coordinateSystem=ns,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];xu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new bu),n[e].setFromProjectionMatrix(xu,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new bu),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Cu=class extends oc{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},wu=class extends oc{constructor(e,t,n=Va,r,i,a,o=Aa,s=Aa,c,l=Qa,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Tu=class extends wu{constructor(e,t=Va,n=301,r,i,a=Aa,o=Aa,s,c=Qa){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Eu=class extends oc{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Du=class e extends Ul{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new jl(c,3)),this.setAttribute(`normal`,new jl(l,3)),this.setAttribute(`uv`,new jl(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ou=class e extends Ul{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new jl(p,3)),this.setAttribute(`normal`,new jl(m,3)),this.setAttribute(`uv`,new jl(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ku=class e extends Ul{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new jl(p,3)),this.setAttribute(`normal`,new jl(m,3)),this.setAttribute(`uv`,new jl(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Au(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Mu(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Mu(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ju(e){let t={};for(let n=0;n<e.length;n++){let r=Au(e[n]);for(let e in r)t[e]=r[e]}return t}function Mu(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Nu(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Pu(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xs.workingColorSpace}var Fu={clone:Au,merge:ju},Iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ru=class extends Yl{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iu,this.fragmentShader=Lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Au(e.uniforms),this.uniformsGroups=Nu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new qc().setHex(r.value);break;case`v2`:this.uniforms[n].value=new Hs().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new sc().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new fc().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},zu=class extends Ru{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Bu=class extends Yl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Yo,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vu=class extends Yl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Hu(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Uu(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Wu=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];e:{t:{let a;n:{r:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break r;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break t}a=t.length;break n}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break t}a=n,n=0;break n}break e}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Gu=class extends Wu{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ko,endingEnd:Ko}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case qo:i=e,o=2*t-n;break;case Jo:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case qo:a=e,s=2*n-t;break;case Jo:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ku=class extends Wu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},qu=class extends Wu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ju=class extends Wu{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Zu(n,t,g,y,r);i[p]=Yu(x,o,_,b,m)}return i}};function Yu(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Xu(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Zu(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Yu(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Xu(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Qu=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Hu(t,this.TimeBufferType),this.values=Hu(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Hu(e.times,Array),values:Hu(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Uu(e.settings)&&(n.settings={inTangents:Hu(e.settings.inTangents,Array),outTangents:Hu(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new qu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ku(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Gu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ju(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ho:t=this.InterpolantFactoryMethodDiscrete;break;case Uo:t=this.InterpolantFactoryMethodLinear;break;case Wo:t=this.InterpolantFactoryMethodSmooth;break;case Go:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ho;case this.InterpolantFactoryMethodLinear:return Uo;case this.InterpolantFactoryMethodSmooth:return Wo;case this.InterpolantFactoryMethodBezier:return Go}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;Uu(this.settings)&&($u(this.settings.inTangents,e),$u(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Uu(this.settings)&&(ed(this.settings.inTangents,e),ed(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&is(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Wo,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,Uu(this.settings)&&(n.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),n}};function $u(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function ed(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Qu.prototype.ValueTypeName=``,Qu.prototype.TimeBufferType=Float32Array,Qu.prototype.ValueBufferType=Float32Array,Qu.prototype.DefaultInterpolation=Uo;var td=class extends Qu{constructor(e,t,n){super(e,t,n)}};td.prototype.ValueTypeName=`bool`,td.prototype.ValueBufferType=Array,td.prototype.DefaultInterpolation=Ho,td.prototype.InterpolantFactoryMethodLinear=void 0,td.prototype.InterpolantFactoryMethodSmooth=void 0;var nd=class extends Qu{constructor(e,t,n,r){super(e,t,n,r)}};nd.prototype.ValueTypeName=`color`;var rd=class extends Qu{constructor(e,t,n,r){super(e,t,n,r)}};rd.prototype.ValueTypeName=`number`;var id=class extends Wu{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Us.slerpFlat(i,0,a,c-o,a,c,s);return i}},ad=class extends Qu{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new id(this.times,this.values,this.getValueSize(),e)}};ad.prototype.ValueTypeName=`quaternion`,ad.prototype.InterpolantFactoryMethodSmooth=void 0;var od=class extends Qu{constructor(e,t,n){super(e,t,n)}};od.prototype.ValueTypeName=`string`,od.prototype.ValueBufferType=Array,od.prototype.DefaultInterpolation=Ho,od.prototype.InterpolantFactoryMethodLinear=void 0,od.prototype.InterpolantFactoryMethodSmooth=void 0;var sd=class extends Qu{constructor(e,t,n,r){super(e,t,n,r)}};sd.prototype.ValueTypeName=`vector`;var cd={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(ld(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!ld(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function ld(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var ud=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},dd=class{constructor(e){this.manager=e===void 0?ud:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},this.priority=`auto`,this.cache=`default`,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};dd.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var fd=new WeakMap,pd=class extends dd{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=cd.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=fd.get(a);e===void 0&&(e=[],fd.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=as(`img`);function s(){l(),t&&t(this);let n=fd.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}fd.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),cd.remove(`image:${e}`);let n=fd.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}fd.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),cd.add(`image:${e}`,o),i.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}},md=class extends dd{constructor(e){super(e)}load(e,t,n,r){let i=new oc,a=new pd(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},hd=new W,gd=new Us,_d=new W,vd=class extends zc{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new fc,this.projectionMatrix=new fc,this.projectionMatrixInverse=new fc,this.coordinateSystem=ns,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(hd,gd,_d),_d.x===1&&_d.y===1&&_d.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hd,gd,_d.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(hd,gd,_d),_d.x===1&&_d.y===1&&_d.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hd,gd,_d.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yd=new W,bd=new Hs,xd=new Hs,Sd=class extends vd{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=_s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){yd.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yd.x,yd.y).multiplyScalar(-e/yd.z),yd.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yd.x,yd.y).multiplyScalar(-e/yd.z)}getViewSize(e,t){return this.getViewBounds(e,bd,xd),t.subVectors(xd,bd)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(gs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Cd=class extends vd{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},wd=-90,Td=1,Ed=class extends zc{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Sd(wd,Td,e,t);r.layers=this.layers,this.add(r);let i=new Sd(wd,Td,e,t);i.layers=this.layers,this.add(i);let a=new Sd(wd,Td,e,t);a.layers=this.layers,this.add(a);let o=new Sd(wd,Td,e,t);o.layers=this.layers,this.add(o);let s=new Sd(wd,Td,e,t);s.layers=this.layers,this.add(s);let c=new Sd(wd,Td,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Dd=class extends Sd{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Od=`\\[\\]\\.:\\/`,kd=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ad=`[^\\[\\]\\.:\\/]`,jd=`[^`+Od.replace(`\\.`,``)+`]`,Md=`((?:WC+[\\/:])*)`.replace(`WC`,Ad),Nd=`(WCOD+)?`.replace(`WCOD`,jd),Pd=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ad),Fd=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ad),Id=RegExp(`^`+Md+Nd+Pd+Fd+`$`),Ld=[`material`,`materials`,`bones`,`map`],Rd=class{constructor(e,t,n){let r=n||zd.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},zd=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(kd,``)}static parseTrackName(e){let t=Id.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ld.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){U(`PropertyBinding: Trying to update property for track: `+n.nodeName+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};zd.Composite=Rd,zd.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},zd.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},zd.prototype.GetterByBindingType=[zd.prototype._getValue_direct,zd.prototype._getValue_array,zd.prototype._getValue_arrayElement,zd.prototype._getValue_toArray],zd.prototype.SetterByBindingTypeAndVersioning=[[zd.prototype._setValue_direct,zd.prototype._setValue_direct_setNeedsUpdate,zd.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[zd.prototype._setValue_array,zd.prototype._setValue_array_setNeedsUpdate,zd.prototype._setValue_array_setMatrixWorldNeedsUpdate],[zd.prototype._setValue_arrayElement,zd.prototype._setValue_arrayElement_setNeedsUpdate,zd.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[zd.prototype._setValue_fromArray,zd.prototype._setValue_fromArray_setNeedsUpdate,zd.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bd=new fc,Vd=class{constructor(e,t,n=0,r=1/0){this.ray=new eu(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Cc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):U(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Bd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bd),this}intersectObject(e,t=!0,n=[]){return Ud(e,this,n,t),n.sort(Hd),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Ud(e[r],this,n,t);return n.sort(Hd),n}};function Hd(e,t){return e.distance-t.distance}function Ud(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Ud(r[e],t,n,!0)}}(class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Wd(e,t,n,r){let i=Gd(r);switch(n){case Ya:return e*t;case eo:case to:return e*t/i.components*i.byteLength;case no:case ro:return e*t*2/i.components*i.byteLength;case Xa:return e*t*3/i.components*i.byteLength;case Za:case io:return e*t*4/i.components*i.byteLength;case ao:case oo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case so:case co:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case uo:case po:return Math.max(e,16)*Math.max(t,8)/4;case lo:case fo:return Math.max(e,8)*Math.max(t,8)/2;case mo:case ho:case _o:case vo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case go:case yo:case bo:case xo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case So:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Co:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case wo:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case To:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Eo:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Do:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ko:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ao:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case jo:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case No:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Po:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Fo:case Io:case Lo:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ro:case zo:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Bo:case Vo:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Gd(e){switch(e){case Ia:case La:return{byteLength:1,components:1};case za:case Ra:case Ua:return{byteLength:2,components:1};case Wa:case Ga:return{byteLength:2,components:4};case Va:case Ba:case Ha:return{byteLength:4,components:1};case qa:case Ja:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function Kd(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function qd(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var K={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},q={common:{diffuse:{value:new qc(0xffffff)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new Hs(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qc(0xffffff)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qc(0xffffff)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new qc(0xffffff)},opacity:{value:1},center:{value:new Hs(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},Jd={basic:{uniforms:ju([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.fog]),vertexShader:K.meshbasic_vert,fragmentShader:K.meshbasic_frag},lambert:{uniforms:ju([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new qc(0)},envMapIntensity:{value:1}}]),vertexShader:K.meshlambert_vert,fragmentShader:K.meshlambert_frag},phong:{uniforms:ju([q.common,q.specularmap,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.fog,q.lights,{emissive:{value:new qc(0)},specular:{value:new qc(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:K.meshphong_vert,fragmentShader:K.meshphong_frag},standard:{uniforms:ju([q.common,q.envmap,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.roughnessmap,q.metalnessmap,q.fog,q.lights,{emissive:{value:new qc(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag},toon:{uniforms:ju([q.common,q.aomap,q.lightmap,q.emissivemap,q.bumpmap,q.normalmap,q.displacementmap,q.gradientmap,q.fog,q.lights,{emissive:{value:new qc(0)}}]),vertexShader:K.meshtoon_vert,fragmentShader:K.meshtoon_frag},matcap:{uniforms:ju([q.common,q.bumpmap,q.normalmap,q.displacementmap,q.fog,{matcap:{value:null}}]),vertexShader:K.meshmatcap_vert,fragmentShader:K.meshmatcap_frag},points:{uniforms:ju([q.points,q.fog]),vertexShader:K.points_vert,fragmentShader:K.points_frag},dashed:{uniforms:ju([q.common,q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:K.linedashed_vert,fragmentShader:K.linedashed_frag},depth:{uniforms:ju([q.common,q.displacementmap]),vertexShader:K.depth_vert,fragmentShader:K.depth_frag},normal:{uniforms:ju([q.common,q.bumpmap,q.normalmap,q.displacementmap,{opacity:{value:1}}]),vertexShader:K.meshnormal_vert,fragmentShader:K.meshnormal_frag},sprite:{uniforms:ju([q.sprite,q.fog]),vertexShader:K.sprite_vert,fragmentShader:K.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:K.background_vert,fragmentShader:K.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:K.backgroundCube_vert,fragmentShader:K.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:K.cube_vert,fragmentShader:K.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:K.equirect_vert,fragmentShader:K.equirect_frag},distance:{uniforms:ju([q.common,q.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:K.distance_vert,fragmentShader:K.distance_frag},shadow:{uniforms:ju([q.lights,q.fog,{color:{value:new qc(0)},opacity:{value:1}}]),vertexShader:K.shadow_vert,fragmentShader:K.shadow_frag}};Jd.physical={uniforms:ju([Jd.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new Hs(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new qc(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new Hs},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new qc(0)},specularColor:{value:new qc(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new Hs},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:K.meshphysical_vert,fragmentShader:K.meshphysical_frag};var Yd={r:0,b:0,g:0},Xd=new fc,Zd=new G;Zd.set(-1,0,0,0,1,0,0,0,1);function Qd(e,t,n,r,i,a){let o=new qc(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new pu(new Du(1,1,1),new Ru({name:`BackgroundCubeMaterial`,uniforms:Au(Jd.backgroundCube.uniforms),vertexShader:Jd.backgroundCube.vertexShader,fragmentShader:Jd.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Xd.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Zd),l.material.toneMapped=Xs.getTransfer(i.colorSpace)!==$o,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new pu(new Ou(2,2),new Ru({name:`BackgroundMaterial`,uniforms:Au(Jd.background.uniforms),vertexShader:Jd.background.vertexShader,fragmentShader:Jd.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Xs.getTransfer(i.colorSpace)!==$o,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Yd,Pu(e)),n.buffers.color.setClear(Yd.r,Yd.g,Yd.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function $d(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ef(e,t,n){let r;this.setMode=function(e){r=e},this.render=function(t,i){e.drawArrays(r,t,i),n.update(i,r,1)},this.renderInstances=function(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))},this.renderMultiDraw=function(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}}function tf(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&H(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function nf(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ql,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var rf=class extends lc{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Cu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Du(5,5,5),i=new Ru({name:`CubemapFromEquirect`,uniforms:Au(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new pu(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Na),new Ed(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},af=256,of=3,sf=20,cf=256,lf=16,uf=3,df=new W,ff=new qc,pf=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ed(1,10,null),this._boxMesh=new pu(new Du(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=df}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(ff));let h=new Ed(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(af,Is(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?af:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=mf(e,!1,!1),n=Math.log2(e)-of;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=mf(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=bf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=yf()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=gf(),this._integrationMaterial=_f());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/lf);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-uf)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(cf*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=vf());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function mf(e,t,n){return new rf(e,{minFilter:Fa,generateMipmaps:t,type:Ua,colorSpace:Zo,depthBuffer:n})}function hf(e,t,n){return new Ru({name:e,uniforms:t,vertexShader:K.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function gf(){return hf(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${cf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function _f(){return hf(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:lf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function vf(){return hf(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${sf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function yf(){return hf(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function bf(){return hf(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function xf(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n))return s(t.get(n).texture,n.mapping);{let r=n.image;if(r&&r.height>0){let i=new rf(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new pf(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new pf(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Sf(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&us(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Cf(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Al:kl)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function wf(e,t,n){let r,i,a;this.setMode=function(e){r=e},this.setIndex=function(e){i=e.type,a=e.bytesPerElement},this.render=function(t,o){e.drawElements(r,o,i,t*a),n.update(o,r,1)},this.renderInstances=function(t,o,s){s!==0&&(e.drawElementsInstanced(r,o,i,t*a,s),n.update(o,r,s))},this.renderMultiDraw=function(e,a,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,a,0,i,e,0,o);let s=0;for(let e=0;e<o;e++)s+=a[e];n.update(s,r,1)}}function Tf(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ef(e,t,n){let r=new WeakMap,i=new sc;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new uc(h,p,m,u);g.type=Ha,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new Hs(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Df(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Of={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function kf(e,t,n,r,i,a){let o=new lc(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Ul;u.setAttribute(`position`,new jl([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new jl([0,2,0,0,2,0],2));let d=new zu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new pu(u,d),p=new Cd(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new lc(t,n,{type:Ua,depthBuffer:!1,stencilBuffer:!1}),c=new lc(t,n,{type:Ua,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new wu(t,n),a===!0&&(l.format=$a,l.type=Ka)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Xs.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Of[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Af=new oc,jf=new wu(1,1),Mf=new Tu(1),Nf=new uc,Pf=new dc,Ff=new Cu,If=[],Lf=[],Rf=new Float32Array(16),zf=new Float32Array(9),Bf=new Float32Array(4);function Vf(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=If[i];if(a===void 0&&(a=new Float32Array(i),If[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Hf(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Uf(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Wf(e,t){let n=Lf[t];n===void 0&&(n=new Int32Array(t),Lf[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Gf(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Kf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hf(n,t))return;e.uniform2fv(this.addr,t),Uf(n,t)}}function qf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Hf(n,t))return;e.uniform3fv(this.addr,t),Uf(n,t)}}function Jf(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hf(n,t))return;e.uniform4fv(this.addr,t),Uf(n,t)}}function Yf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hf(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Uf(n,t)}else{if(Hf(n,r))return;Bf.set(r),e.uniformMatrix2fv(this.addr,!1,Bf),Uf(n,r)}}function Xf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hf(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Uf(n,t)}else{if(Hf(n,r))return;zf.set(r),e.uniformMatrix3fv(this.addr,!1,zf),Uf(n,r)}}function Zf(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Hf(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Uf(n,t)}else{if(Hf(n,r))return;Rf.set(r),e.uniformMatrix4fv(this.addr,!1,Rf),Uf(n,r)}}function Qf(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function $f(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hf(n,t))return;e.uniform2iv(this.addr,t),Uf(n,t)}}function ep(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Hf(n,t))return;e.uniform3iv(this.addr,t),Uf(n,t)}}function tp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hf(n,t))return;e.uniform4iv(this.addr,t),Uf(n,t)}}function np(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function rp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Hf(n,t))return;e.uniform2uiv(this.addr,t),Uf(n,t)}}function ip(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Hf(n,t))return;e.uniform3uiv(this.addr,t),Uf(n,t)}}function ap(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Hf(n,t))return;e.uniform4uiv(this.addr,t),Uf(n,t)}}function op(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function sp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?op(jf):Af,n.setTexture2D(t||a,i)}function cp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Pf,i)}function lp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?op(Mf):Ff,n.setTextureCube(t||a,i)}function up(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Nf,i)}function dp(e){switch(e){case 5126:return Gf;case 35664:return Kf;case 35665:return qf;case 35666:return Jf;case 35674:return Yf;case 35675:return Xf;case 35676:return Zf;case 5124:case 35670:return Qf;case 35667:case 35671:return $f;case 35668:case 35672:return ep;case 35669:case 35673:return tp;case 5125:return np;case 36294:return rp;case 36295:return ip;case 36296:return ap;case 35678:case 36198:case 36298:case 36306:case 35682:return sp;case 35679:case 36299:case 36307:return cp;case 35680:case 36300:case 36308:case 36293:return lp;case 36289:case 36303:case 36311:case 36292:return up}}function fp(e,t){e.uniform1fv(this.addr,t)}function pp(e,t){let n=Vf(t,this.size,2);e.uniform2fv(this.addr,n)}function mp(e,t){let n=Vf(t,this.size,3);e.uniform3fv(this.addr,n)}function hp(e,t){let n=Vf(t,this.size,4);e.uniform4fv(this.addr,n)}function gp(e,t){let n=Vf(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function _p(e,t){let n=Vf(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function vp(e,t){let n=Vf(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function yp(e,t){e.uniform1iv(this.addr,t)}function bp(e,t){e.uniform2iv(this.addr,t)}function xp(e,t){e.uniform3iv(this.addr,t)}function Sp(e,t){e.uniform4iv(this.addr,t)}function Cp(e,t){e.uniform1uiv(this.addr,t)}function wp(e,t){e.uniform2uiv(this.addr,t)}function Tp(e,t){e.uniform3uiv(this.addr,t)}function Ep(e,t){e.uniform4uiv(this.addr,t)}function Dp(e,t,n){let r=this.cache,i=t.length,a=Wf(n,i);Hf(r,a)||(e.uniform1iv(this.addr,a),Uf(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?op(jf):Af;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Op(e,t,n){let r=this.cache,i=t.length,a=Wf(n,i);Hf(r,a)||(e.uniform1iv(this.addr,a),Uf(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Pf,a[e])}function kp(e,t,n){let r=this.cache,i=t.length,a=Wf(n,i);Hf(r,a)||(e.uniform1iv(this.addr,a),Uf(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?op(Mf):Ff;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Ap(e,t,n){let r=this.cache,i=t.length,a=Wf(n,i);Hf(r,a)||(e.uniform1iv(this.addr,a),Uf(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Nf,a[e])}function jp(e){switch(e){case 5126:return fp;case 35664:return pp;case 35665:return mp;case 35666:return hp;case 35674:return gp;case 35675:return _p;case 35676:return vp;case 5124:case 35670:return yp;case 35667:case 35671:return bp;case 35668:case 35672:return xp;case 35669:case 35673:return Sp;case 5125:return Cp;case 36294:return wp;case 36295:return Tp;case 36296:return Ep;case 35678:case 36198:case 36298:case 36306:case 35682:return Dp;case 35679:case 36299:case 36307:return Op;case 35680:case 36300:case 36308:case 36293:return kp;case 36289:case 36303:case 36311:case 36292:return Ap}}var Mp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dp(t.type)}},Np=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jp(t.type)}},Pp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Fp=/(\w+)(\])?(\[|\.)?/g;function Ip(e,t){e.seq.push(t),e.map[t.id]=t}function Lp(e,t,n){let r=e.name,i=r.length;for(Fp.lastIndex=0;;){let a=Fp.exec(r),o=Fp.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Ip(n,l===void 0?new Mp(s,e,t):new Np(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Pp(s),Ip(n,e)),n=e}}}var Rp=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Lp(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function zp(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Bp=37297,Vp=0;function Hp(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Up=new G;function Wp(e){Xs._getMatrix(Up,Xs.workingColorSpace,e);let t=`mat3( ${Up.elements.map(e=>e.toFixed(4))} )`;switch(Xs.getTransfer(e)){case Qo:return[t,`LinearTransferOETF`];case $o:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Gp(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Hp(e.getShaderSource(t),r)}return i}function Kp(e,t){let n=Wp(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var qp={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Jp(e,t){let n=qp[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Yp=new W;function Xp(){return Xs.getLuminanceCoefficients(Yp),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Yp.x.toFixed(4)}, ${Yp.y.toFixed(4)}, ${Yp.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Zp(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(em).join(`
`)}function Qp(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function $p(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function em(e){return e!==``}function tm(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function nm(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var rm=/^[ \t]*#include +<([\w\d./]+)>/gm;function im(e){return e.replace(rm,am)}function am(e,t){let n=K[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return im(n)}var om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sm(e){return e.replace(om,cm)}function cm(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function lm(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var um={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function dm(e){return um[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var fm={302:`ENVMAP_MODE_REFRACTION`};function pm(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:fm[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var mm={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function hm(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:mm[e.combine]||`ENVMAP_BLENDING_NONE`}function gm(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=dm(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=pm(n),d=hm(n),f=Zp(n),p=Qp(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(em).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(em).join(`
`),g.length>0&&(g+=`
`)):(h=[lm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(em).join(`
`),g=[lm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:K.tonemapping_pars_fragment,n.toneMapping===0?``:Jp(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,K.colorspace_pars_fragment,Kp(`linearToOutputTexel`,n.outputColorSpace),Xp(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(em).join(`
`)),o=im(o),o=tm(o,n),o=nm(o,n),s=im(s),s=tm(s,n),s=nm(s,n),o=sm(o),s=sm(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=zp(i,i.VERTEX_SHADER,v),x=zp(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Gp(i,b,`vertex`),n=Gp(i,x,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Rp(i,m),w=$p(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,Bp)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Vp++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var _m=0,vm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ym(e),t.set(e,n)),n}},ym=class{constructor(e){this.id=_m++,this.code=e,this.usedTimes=0}};function bm(e){return e===1030||e===37490||e===36285}function xm(e,t,n,r,i,a){let o=new Cc,s=new vm,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Jd[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,I=!!b,ee=I&&b.isPMREMTexture===!0,te=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,se=!!i.metalnessMap,L=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.diffuseRoughness>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=ce&&!!i.anisotropyMap,_e=le&&!!i.clearcoatMap,ve=le&&!!i.clearcoatNormalMap,ye=le&&!!i.clearcoatRoughnessMap,be=ue&&!!i.diffuseRoughnessMap,R=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,z=!!i.specularMap,we=!!i.specularColorMap,B=!!i.specularIntensityMap,V=he&&!!i.transmissionMap,Te=he&&!!i.thicknessMap,Ee=!!i.gradientMap,De=!!i.alphaMap,Oe=i.alphaTest>0,ke=!!i.alphaHash,Ae=!!i.extensions,je=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me=ee?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Ne={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Xs.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:I,envMapMode:I&&b.mapping,envMapPMREM:ee,envMapMaxLod:ee?Me.length-1:null,envMapSize:ee?Me[0].width:null,aoMap:te,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&bm(i.normalMap.format),metalnessMap:se,roughnessMap:L,anisotropy:ce,anisotropyMap:ge,clearcoat:le,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,diffuseRoughness:ue,diffuseRoughnessMap:be,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:R,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:z,specularColorMap:we,specularIntensityMap:B,transmission:he,transmissionMap:V,thicknessMap:Te,gradientMap:Ee,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:ke,combine:i.combine,mapUv:P&&p(i.map.channel),aoMapUv:te&&p(i.aoMap.channel),lightMapUv:ne&&p(i.lightMap.channel),bumpMapUv:re&&p(i.bumpMap.channel),normalMapUv:ie&&p(i.normalMap.channel),displacementMapUv:ae&&p(i.displacementMap.channel),emissiveMapUv:oe&&p(i.emissiveMap.channel),metalnessMapUv:se&&p(i.metalnessMap.channel),roughnessMapUv:L&&p(i.roughnessMap.channel),anisotropyMapUv:ge&&p(i.anisotropyMap.channel),clearcoatMapUv:_e&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:be&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:R&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&p(i.sheenRoughnessMap.channel),specularMapUv:z&&p(i.specularMap.channel),specularColorMapUv:we&&p(i.specularColorMap.channel),specularIntensityMapUv:B&&p(i.specularIntensityMap.channel),transmissionMapUv:V&&p(i.transmissionMap.channel),thicknessMapUv:Te&&p(i.thicknessMap.channel),alphaMapUv:De&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(ie||ce),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(P||De),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&Xs.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&Xs.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ae&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ae&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Jd[t];n=Fu.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new gm(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Sm(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Cm(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wm(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Tm(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Cm),r.length>1&&r.sort(t||wm),i.length>1&&i.sort(t||wm)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Em(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Tm,e.set(t,[i])):n>=r.length?(i=new Tm,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Dm(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new qc};break;case`SpotLight`:n={position:new W,direction:new W,color:new qc,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new qc,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new qc,groundColor:new qc};break;case`RectAreaLight`:n={color:new qc,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function Om(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Hs};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Hs,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var km=0;function Am(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function jm(e){let t=new Dm,n=Om(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new fc,o=new fc;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Am);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=q.LTC_FLOAT_1,r.rectAreaLTC2=q.LTC_FLOAT_2):(r.rectAreaLTC1=q.LTC_HALF_1,r.rectAreaLTC2=q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=km++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Mm(e){let t=new jm(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Nm(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Mm(e),t.set(n,[a])):r>=i.length?(a=new Mm(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Pm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Im=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Lm=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Rm=new fc,zm=new W,Bm=new W;function Vm(e,t,n){let r=new bu,i=new Hs,a=new Hs,o=new sc,s=new Bu,c=new Vu,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Ru({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Hs},radius:{value:4}},vertexShader:Pm,fragmentShader:Fm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ul;m.setAttribute(`position`,new Ol(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new pu(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new lc(i.x,i.y,{format:no,type:Ua,minFilter:Na,magFilter:Na,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new wu(i.x,i.y,Ha),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Qa,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Aa,d.map.depthTexture.magFilter=Aa}else l.isPointLight?(d.map=new rf(i.x),d.map.depthTexture=new Tu(i.x,Va)):(d.map=new lc(i.x,i.y),d.map.depthTexture=new wu(i.x,i.y,Va)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Qa,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Na,d.map.depthTexture.magFilter=Na):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Aa,d.map.depthTexture.magFilter=Aa);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&0xfffffffe?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),zm.setFromMatrixPosition(l.matrixWorld),e.position.copy(zm),Bm.copy(e.position),Bm.add(Im[t]),e.up.copy(Lm[t]),e.lookAt(Bm),e.updateMatrixWorld(),n.makeTranslation(-zm.x,-zm.y,-zm.z),Rm.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Rm,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new lc(i.x,i.y,{format:no,type:Ua}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Hm(e,t){function n(){let t=!1,n=new sc,r=null,i=new sc(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):L(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=fs[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):L(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new qc(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new sc().fromArray(te),ie=new sc().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),se(e.CULL_FACE),pe(0);function se(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function L(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(L(e.BLEND),g=!1);else if(g===!1&&(se(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?L(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):L(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?L(e.CULL_FACE):(se(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):L(e.POLYGON_OFFSET_FILL)}function ye(t){t?se(e.SCISSOR_TEST):L(e.SCISSOR_TEST)}function be(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function R(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function xe(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ae(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function Me(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Pe(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(0xffffffff),e.stencilFunc(e.ALWAYS,0,0xffffffff),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new qc(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:L,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:be,bindTexture:R,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:De,texImage3D:Oe,pixelStorei:Ae,getParameter:ke,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:z,texSubImage3D:we,compressedTexSubImage2D:B,compressedTexSubImage3D:V,scissor:je,viewport:Me,reset:Fe}}function Um(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Hs,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):as(`canvas`)}function v(e,t,n){let r=1,i=ve(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Qo:Xs.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),j(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),N(e)}function j(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function N(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let P=0;function F(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function I(t,i){let a=r.get(t);if(t.isVideoTexture&&ge(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{L(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ee(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?ce(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let te={[Da]:e.REPEAT,[Oa]:e.CLAMP_TO_EDGE,[ka]:e.MIRRORED_REPEAT},ne={[Aa]:e.NEAREST,[ja]:e.NEAREST_MIPMAP_NEAREST,[Ma]:e.NEAREST_MIPMAP_LINEAR,[Na]:e.LINEAR,[Pa]:e.LINEAR_MIPMAP_NEAREST,[Fa]:e.LINEAR_MIPMAP_LINEAR},re={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ie(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,te[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,te[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,te[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ne[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ne[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,re[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ae(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=F(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function oe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=oe(n.start,r.width,4),c=oe(t.start,r.width,4);n.start<=i+1&&a===c&&oe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function L(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ae(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Xs.getPrimaries(Xs.workingColorSpace),r=o.colorSpace===``?null:Xs.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=_e(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ie(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===$a,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&se(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=Wd(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Wd(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=ve(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=ve(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ce(t,o,s){if(o.image.length!==6)return;let c=ae(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Xs.getPrimaries(Xs.workingColorSpace),r=o.colorSpace===``?null:Xs.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=_e(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);ie(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===$a,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=ve(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),he(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,me(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ue(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;he(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);he(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,me(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function de(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ee(i.depthTexture,0):I(i.depthTexture,0);let u=c.__webglTexture,d=me(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)he(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)he(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function fe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)de(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?de(i.__webglFramebuffer[0],t,0):de(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ue(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ue(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}let pe=[];function me(e){return Math.min(i.maxSamples,e.samples)}function he(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function ge(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function _e(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Xs.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function ve(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=function(){let e=P;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),P+=1,e},this.resetTextureUnits=function(){P=0},this.getTextureUnits=function(){return P},this.setTextureUnits=function(e){P=e},this.setTexture2D=I,this.setTexture2DArray=function(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?L(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))},this.setTexture3D=function(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?L(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)},this.setTextureCube=ee,this.rebindTextures=function(t,n,i){let a=r.get(t);n!==void 0&&le(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&fe(t)},this.setupRenderTarget=function(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&he(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ue(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ie(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)le(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else le(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ie(c,a),le(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ie(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)le(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else le(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&fe(t)},this.updateRenderTargetMipmap=function(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}},this.updateMultisampleRenderTarget=function(t){if(t.samples>0){if(he(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(pe.length=0,pe.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&pe.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,pe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}},this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=le,this.useMultisampledRTT=he,this.dispose=function(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}}function Wm(e,t){function n(n,r=``){let i,a=Xs.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Gm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Km=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Eu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ru({vertexShader:Gm,fragmentShader:Km,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pu(new Ou(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Jm=class extends ps{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new qm,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new Hs,C=null,w=null,T=new Sd;T.viewport=new sc;let E=new Sd;E.viewport=new sc;let D=[T,E],O=new Dd,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Hc,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Hc,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Hc,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,te.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?$a:Qa,a=_.stencil?Ka:Va);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new lc(d.textureWidth,d.textureHeight,{format:Za,type:Ia,depthTexture:new wu(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new lc(f.framebufferWidth,f.framebufferHeight,{format:Za,type:Ia,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),te.setContext(r),te.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function P(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;P(O,i);for(let e=0;e<a.length;e++)P(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),F(e,O,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=_s*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let I=null;function ee(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Sd,o.layers.enable(n),o.viewport=new sc,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Eu,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}I&&I(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let te=new Kd;te.setAnimationLoop(ee),this.setAnimationLoop=function(e){I=e},this.dispose=function(){}}},Ym=new fc,Xm=new G;Xm.set(-1,0,0,0,1,0,0,0,1);function Zm(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Pu(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ym.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Xm),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Qm(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=h(o[e],s),r=n%16,i=r%t.boundary,a=r+i;n+=i,a!==0&&16-a<t.storage&&(n+=16-a),e===0&&(c=n),n+=t.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var $m=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),eh=null;function th(){return eh===null&&(eh=new gu($m,16,16,no,Ua),eh.name=`DFG_LUT`,eh.minFilter=Na,eh.magFilter=Na,eh.wrapS=Oa,eh.wrapT=Oa,eh.generateMipmaps=!1,eh.needsUpdate=!0),eh}var nh=class{constructor(e={}){let{canvas:t=os(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ia}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([io,ro,to]),g=new Set([Ia,Va,za,Ka,Wa,Ga]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Xo;let j=0,M=0,N=null,P=-1,F=null,I=new sc,ee=new sc,te=null,ne=new qc(0),re=0,ie=t.width,ae=t.height,oe=1,se=null,L=null,ce=new sc(0,0,ie,ae),le=new sc(0,0,ie,ae),ue=!1,de=new bu,fe=new Su,pe=!1,me=!1,he=new fc,ge=new W,_e=new sc,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function be(){return N===null?oe:1}let R=n;function xe(e,n){return t.getContext(e,n)}let Se,Ce,z,we,B,V,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,We,!1),t.addEventListener(`webglcontextrestored`,Ge,!1),t.addEventListener(`webglcontextcreationerror`,Ke,!1),R===null){let t=`webgl2`;if(R=xe(t,e),R===null)throw xe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}He()}catch(e){throw t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),U(`WebGLRenderer: `+e.message),e}function He(){Se=new Sf(R),Se.init(),ze=new Wm(R,Se),Ce=new tf(R,Se,e,ze),z=new Hm(R,Se),Ce.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=R.createFramebuffer(),k=R.createFramebuffer(),A=R.createFramebuffer(),we=new Tf(R),B=new Sm,V=new Um(R,Se,z,B,Ce,ze,we),Te=new xf(T),Ee=new qd(R),Be=new $d(R,Ee),De=new Cf(R,Ee,we,Be),Oe=new Df(R,De,Ee,Be,we),Ie=new Ef(R,Ce,V),Ne=new nf(B),ke=new xm(T,Te,Se,Ce,Be,Ne),Ae=new Zm(T,B),je=new Em,Me=new Nm(Se),Fe=new Qd(T,Te,z,Oe,p,s),Pe=new Vm(T,Oe,Ce),Ve=new Qm(R,we,Ce,z),Le=new ef(R,Se,we),Re=new wf(R,Se,we),we.programs=ke.programs,T.capabilities=Ce,T.extensions=Se,T.properties=B,T.renderLists=je,T.shadowMap=Pe,T.state=z,T.info=we}m!==1009&&(w=new kf(m,t.width,t.height,o,r,i));let Ue=new Jm(T,R);this.xr=Ue,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(e){e!==void 0&&(oe=e,this.setSize(ie,ae,!1))},this.getSize=function(e){return e.set(ie,ae)},this.setSize=function(e,n,r=!0){Ue.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(ie=e,ae=n,t.width=Math.floor(e*oe),t.height=Math.floor(n*oe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ie*oe,ae*oe).floor()},this.setDrawingBufferSize=function(e,n,r){ie=e,ae=n,oe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),z.viewport(I.copy(ce).multiplyScalar(be()).round())},this.getScissor=function(e){return e.copy(le)},this.setScissor=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),z.scissor(ee.copy(le).multiplyScalar(be()).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(e){z.setScissorTest(ue=e)},this.setOpaqueSort=function(e){se=e},this.setTransparentSort=function(e){L=e},this.getClearColor=function(e){return e.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Fe.getClearColor(),r=Fe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(0xffffffff)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),Fe.dispose(),je.dispose(),Me.dispose(),V.dispose(),B.dispose(),Te.dispose(),Oe.dispose(),De.dispose(),Be.dispose(),Ve.dispose(),ke.dispose(),Ue.dispose(),Ue.removeEventListener(`sessionstart`,$e),Ue.removeEventListener(`sessionend`,et),tt.stop()};function We(e){e.preventDefault(),cs(`WebGLRenderer: Context Lost.`),E=!0}function Ge(){cs(`WebGLRenderer: Context Restored.`),E=!1;let e=we.autoReset,t=Pe.enabled,n=Pe.autoUpdate,r=Pe.needsUpdate,i=Pe.type;He(),we.autoReset=e,Pe.enabled=t,Pe.autoUpdate=n,Pe.needsUpdate=r,Pe.type=i}function Ke(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function qe(e){let t=e.target;t.removeEventListener(`dispose`,qe),Je(t)}function Je(e){Ye(e),B.remove(e)}function Ye(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){ke.releaseProgram(e)}),e.isShaderMaterial&&ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ve);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ft(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=De.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Be.setup(i,r,s,n,c);let h,g=Le;if(c!==null&&(h=Ee.get(c),g=Re,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*be()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*be()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Se.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ee.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Xe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),pe===!0&&Ne.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ct(e,t,r),e.side=0,e.needsUpdate=!0,ct(e,t,r),e.side=2):ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Me.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),me=this.localClippingEnabled,pe=Ne.init(this.clippingPlanes,me),pe===!0&&Ne.setGlobalState(this.clippingPlanes,t),D!==null&&Pe.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Xe(o,n,t,e),r.add(o)}else Xe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Se.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ze=null;function Qe(e){Ze&&Ze(e)}function $e(){tt.stop()}function et(){tt.start()}let tt=new Kd;tt.setAnimationLoop(Qe),typeof self<`u`&&tt.setContext(self),this.setAnimationLoop=function(e){Ze=e,Ue.setAnimationLoop(e),e===null?tt.stop():tt.start()},Ue.addEventListener(`sessionstart`,$e),Ue.addEventListener(`sessionend`,et),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ue.enabled===!0&&Ue.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(t),t=Ue.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Me.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),he.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?fe.setFromArrayCamera(t):de.setFromProjectionMatrix(he,ns,t.reversedDepth),me=this.localClippingEnabled,pe=Ne.init(this.clippingPlanes,me),b=je.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,Ue.enabled===!0&&Ue.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&nt(e,t,-1/0,T.sortObjects)}nt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(se,L),ye=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,ye&&Fe.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),pe===!0&&Ne.beginShadows();let i=x.state.shadowsArray;if(Pe.render(i,e,t),pe===!0&&Ne.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++)it(n,r,e,i[t]);ye&&Fe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),ye&&Fe.render(e),rt(b,e,t)}N!==null&&M===0&&(V.updateMultisampleRenderTarget(N),V.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Be.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),pe===!0&&Ne.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function nt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?fe:de;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(he);let i=Oe.update(e),a=e.material;a.visible&&b.push(e,i,a,n,_e.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?fe:de;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Oe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),_e.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),_e.copy(e.boundingSphere.center)),_e.applyMatrix4(e.matrixWorld).applyMatrix4(he)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,_e.z,s,t)}}else a.visible&&b.push(e,i,a,n,_e.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)nt(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),pe===!0&&Ne.setGlobalState(T.clippingPlanes,n),r&&z.viewport(I.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Se.has(`EXT_color_buffer_half_float`)||Se.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new lc(1,1,{generateMipmaps:!0,type:e?Ua:Ia,minFilter:Fa,samples:Math.max(4,Ce.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Xs.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ne),re=T.getClearAlpha(),re<1&&T.setClearColor(0xffffff,.5),T.clear(),ye&&Fe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),pe===!0&&Ne.setGlobalState(T.clippingPlanes,r),at(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),Se.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ne,re),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ot(o,t,n,s,l,c)}}function ot(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function st(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function ct(e,t,n){t.isScene!==!0&&(t=ve);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=ke.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Te.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,qe),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return dt(e,s),d}else s.uniforms=ke.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ne.uniform),dt(e,s),r.needsLights=mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=st(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function lt(e,t,n,r,i){let a=B.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function ut(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Rp.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function dt(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t,n,r,i){t.isScene!==!0&&(t=ve),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Xs.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Te.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),b=x.state.lights;if(pe===!0&&(me===!0||e!==F)){let t=e===F&&r.id===P;Ne.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ne.numPlanes||v.numIntersection!==Ne.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===st(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?lt(r,t,i,s,h):ct(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(z.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==P&&(P=r.id,O=!0),E||F!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(R,`projectionMatrix`,e.projectionMatrix),A.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(R,ge.setFromMatrixPosition(e.matrixWorld)),Ce.logarithmicDepthBuffer&&A.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(R,`sunShadowMap`,b.state.sunShadowMap,V),b.state.directionalShadowMap.length>0&&A.setValue(R,`directionalShadowMap`,b.state.directionalShadowMap,V),b.state.spotShadowMap.length>0&&A.setValue(R,`spotShadowMap`,b.state.spotShadowMap,V),b.state.pointShadowMap.length>0&&A.setValue(R,`pointShadowMap`,b.state.pointShadowMap,V)),i.isSkinnedMesh){A.setOptional(R,i,`bindMatrix`),A.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(A.setOptional(R,i,`batchingTexture`),A.setValue(R,`batchingTexture`,i._matricesTexture,V),A.setOptional(R,i,`batchingIdTexture`),A.setValue(R,`batchingIdTexture`,i._indirectTexture,V),A.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&Ie.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=th()),O){if(A.setValue(R,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&pt(j,k),a&&r.fog===!0&&Ae.refreshFogUniforms(j,a),Ae.refreshMaterialUniforms(j,r,oe,ae,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}Rp.upload(R,ut(v),j,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Rp.upload(R,ut(v),j,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(R,`center`,i.center),A.setValue(R,`modelViewMatrix`,i.modelViewMatrix),A.setValue(R,`normalMatrix`,i.normalMatrix),A.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ve.update(n,w),Ve.bind(n,w)}}return w}function pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),ee.copy(e.scissor),te=e.scissorTest,z.viewport(I),z.scissor(ee),z.setScissorTest(te),P=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),ee.copy(e.scissor),te=e.scissorTest}else I.copy(ce).multiplyScalar(oe).floor(),ee.copy(le).multiplyScalar(oe).floor(),te=ue;if(n!==0&&(r=O),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(I),z.scissor(ee),z.setScissorTest(te),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}P=-1};function ht(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ce.textureFormatReadable(e.format),t.__typeReadable=Ce.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=ht(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,ze.convert(c),ze.convert(l),a)}finally{let e=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=ht(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,ze.convert(l),ze.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ds(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ze.convert(t.format),_=ze.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,k),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,z.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ns}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Xs._getDrawingBufferColorSpace(e),t.unpackColorSpace=Xs._getUnpackColorSpace()}},rh=class{constructor(e,t={}){this.container=e;let n=Math.max(1,e.clientWidth)/Math.max(1,e.clientHeight)<.72?82:75;this.options={initialYaw:t.initialYaw??0,initialPitch:t.initialPitch??0,initialFov:t.initialFov??n,onViewChange:t.onViewChange??null,onHotspotClick:t.onHotspotClick??null,onSpherePick:t.onSpherePick??null,onLoadState:t.onLoadState??null},this.lon=this.options.initialYaw,this.lat=this.options.initialPitch,this.fov=this.options.initialFov,this.baseFov=this.fov,this.vrMode=!1,this.gyroEnabled=!1,this.pickMode=!1,this.links=[],this.hotspotEls=[],this.isDragging=!1,this.dragMoved=!1,this.pointerDownX=0,this.pointerDownY=0,this.pointerDownLon=0,this.pointerDownLat=0,this.pointerDownUserYaw=0,this.pointerDownUserPitch=0,this.pinchDist=null,this.disposed=!1,this.loadToken=0,this.gyroBaseQuat=null,this.gyroYaw=0,this.gyroPitch=0,this.userYawOffset=0,this.userPitchOffset=0,this.textureCache=new Map,this.pendingLoads=new Map,this.maxCacheSize=10,this.walkAnim=null,this._initThree(),this._initHotspotLayers(),this._bindEvents(),this._animate()}_initThree(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.scene=new Yc,this.camera=new Sd(this.fov,e/t,.1,1100),this.camera.target=new W(0,0,0),this.leftCamera=new Sd(this.fov,e/2/t,.1,1100),this.rightCamera=new Sd(this.fov,e/2/t,.1,1100),this.renderer=new nh({antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(e,t),this.renderer.outputColorSpace=Xo,this.renderer.domElement.style.display=`block`,this.renderer.domElement.style.width=`100%`,this.renderer.domElement.style.height=`100%`,this.renderer.domElement.style.touchAction=`none`,this.container.innerHTML=``,this.container.style.position=`relative`,this.container.style.overflow=`hidden`,this.container.appendChild(this.renderer.domElement);let n=new ku(500,64,40);n.scale(-1,1,1),this.material=new tu({color:0xffffff}),this.sphere=new pu(n,this.material),this.scene.add(this.sphere);let r=new ku(494,64,40);r.scale(-1,1,1),this.nextMaterial=new tu({color:0xffffff,transparent:!0,opacity:0,depthWrite:!1}),this.nextSphere=new pu(r,this.nextMaterial),this.nextSphere.visible=!1,this.scene.add(this.nextSphere),this.textureLoader=new md,this.textureLoader.setCrossOrigin(`anonymous`)}_initHotspotLayers(){this.overlay=document.createElement(`div`),this.overlay.className=`pointer-events-none absolute inset-0 overflow-hidden z-10 transition-opacity duration-200`,this.container.appendChild(this.overlay),this.vrDivider=document.createElement(`div`),this.vrDivider.className=`hidden pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/40 z-20`,this.container.appendChild(this.vrDivider),this.vrReticles=document.createElement(`div`),this.vrReticles.className=`hidden pointer-events-none absolute inset-0 z-20`,this.vrReticles.innerHTML=`
            <div class="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-300/90 shadow"></div>
            <div class="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-amber-300/90 shadow"></div>
        `,this.container.appendChild(this.vrReticles)}_bindEvents(){let e=this.renderer.domElement;this._onPointerDown=e=>{(e.pointerType!==`touch`||e.isPrimary)&&(this.isDragging=!0,this.dragMoved=!1,this.pointerDownX=e.clientX,this.pointerDownY=e.clientY,this.pointerDownLon=this.lon,this.pointerDownLat=this.lat,this.pointerDownUserYaw=this.userYawOffset,this.pointerDownUserPitch=this.userPitchOffset)},this._onPointerMove=e=>{if(!this.isDragging)return;let t=e.clientX-this.pointerDownX,n=e.clientY-this.pointerDownY;(Math.abs(t)>4||Math.abs(n)>4)&&(this.dragMoved=!0,this._cancelWalkZoomIfInteracted());let r=.14*(this.fov/75);this.gyroEnabled?(this.userYawOffset=this._normalizeYaw(this.pointerDownUserYaw-t*r),this.userPitchOffset=Math.max(-45,Math.min(45,this.pointerDownUserPitch+n*r)),this.lon=this._normalizeYaw(this.gyroYaw+this.userYawOffset),this.lat=Math.max(-85,Math.min(85,this.gyroPitch+this.userPitchOffset))):(this.lon=this._normalizeYaw(this.pointerDownLon-t*r),this.lat=Math.max(-85,Math.min(85,this.pointerDownLat+n*r))),this._emitViewChange()},this._onPointerUp=e=>{if(this.isDragging&&!this.dragMoved&&this.pickMode&&this.options.onSpherePick){let t=this._screenToSpherical(e.clientX,e.clientY);t&&this.options.onSpherePick(t)}this.isDragging=!1},this._onWheel=e=>{e.preventDefault(),this.fov=Math.max(38,Math.min(100,this.fov+e.deltaY*.04)),this.baseFov=this.fov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this._emitViewChange()},this._onTouchStart=e=>{e.touches.length===2&&(this.pinchDist=this._touchDistance(e.touches[0],e.touches[1]))},this._onTouchMove=e=>{if(e.touches.length===2&&this.pinchDist!==null){let t=this._touchDistance(e.touches[0],e.touches[1]),n=this.pinchDist-t;this.pinchDist=t,this.fov=Math.max(38,Math.min(100,this.fov+n*.12)),this.baseFov=this.fov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this._emitViewChange()}},this._onTouchEnd=()=>{this.pinchDist=null};let t=new W(0,0,1),n=new W(0,1,0),r=new Us(-Math.sqrt(.5),0,0,Math.sqrt(.5)),i=new Us,a=new Sc;this._onDeviceOrientation=e=>{if(!this.gyroEnabled||e.alpha===null||e.beta===null||e.type===`deviceorientationabsolute`&&this._hasRelGyro)return;e.type===`deviceorientation`&&(this._hasRelGyro=!0);let o=window.screen?.orientation?.angle??window.orientation??0;a.set(Vs.degToRad(e.beta),Vs.degToRad(e.alpha),-Vs.degToRad(e.gamma||0),`YXZ`);let s=new Us().setFromEuler(a).multiply(r);if(s.multiply(i.setFromAxisAngle(t,-Vs.degToRad(o))),this.gyroBaseQuat===null){let e=new W(0,0,-1).applyQuaternion(s),t=Math.atan2(e.z,e.x);this.gyroBaseQuat=new Us().setFromAxisAngle(n,t-Vs.degToRad(this.lon)),this.userYawOffset=0,this.userPitchOffset=0}let c=this.gyroBaseQuat.clone().multiply(s),l=new W(0,0,-1).applyQuaternion(c).normalize();this.gyroYaw=this._normalizeYaw(Vs.radToDeg(Math.atan2(l.z,l.x))),this.gyroPitch=Vs.radToDeg(Math.asin(Math.max(-1,Math.min(1,l.y)))),this.walkAnim||(this.lon=this._normalizeYaw(this.gyroYaw+this.userYawOffset),this.lat=Math.max(-85,Math.min(85,this.gyroPitch+this.userPitchOffset)),this._emitViewChange())},this._onResize=()=>this.resize(),e.addEventListener(`pointerdown`,this._onPointerDown),window.addEventListener(`pointermove`,this._onPointerMove),window.addEventListener(`pointerup`,this._onPointerUp),e.addEventListener(`wheel`,this._onWheel,{passive:!1}),e.addEventListener(`touchstart`,this._onTouchStart,{passive:!0}),e.addEventListener(`touchmove`,this._onTouchMove,{passive:!0}),e.addEventListener(`touchend`,this._onTouchEnd),window.addEventListener(`resize`,this._onResize),window.addEventListener(`deviceorientation`,this._onDeviceOrientation),window.addEventListener(`deviceorientationabsolute`,this._onDeviceOrientation)}_touchDistance(e,t){return Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)}_normalizeYaw(e){return((e+180)%360+360)%360-180}_shortestYawDelta(e,t){return this._normalizeYaw(t-e)}_cancelWalkZoomIfInteracted(){this.walkAnim&&this.walkAnim.phase===`dolly`&&(this.walkAnim.focusYaw=null)}_screenToSpherical(e,t){let n=this.renderer.domElement.getBoundingClientRect(),r=(e-n.left)/n.width*2-1,i=-((t-n.top)/n.height)*2+1,a=new Vd;a.setFromCamera(new Hs(r,i),this.camera);let o=a.intersectObject(this.sphere);if(!o.length)return null;let s=o[0].point.clone().normalize(),c=Vs.radToDeg(Math.asin(Math.max(-1,Math.min(1,s.y)))),l=Vs.radToDeg(Math.atan2(s.z,s.x));return{yaw:Number(this._normalizeYaw(l).toFixed(2)),pitch:Number(c.toFixed(2))}}setPickMode(e){this.pickMode=!!e,this.renderer.domElement.style.cursor=this.pickMode?`crosshair`:`grab`,this.links.length&&this.setLinks(this.links)}preload(e,t=null){t&&this._loadTextureCached(t).catch(()=>{}),e&&this._loadTextureCached(e).catch(()=>{})}_touchCache(e,t){for(this.textureCache.has(e)&&this.textureCache.delete(e),this.textureCache.set(e,t);this.textureCache.size>this.maxCacheSize;){let e=this.textureCache.keys().next().value,t=this.textureCache.get(e);this.textureCache.delete(e),t&&t!==this.material.map&&t!==this.nextMaterial.map&&t.dispose()}}_loadTextureCached(e){if(!e)return Promise.reject(Error(`Missing texture URL`));if(this.textureCache.has(e)){let t=this.textureCache.get(e);return this._touchCache(e,t),Promise.resolve(t)}if(this.pendingLoads.has(e))return this.pendingLoads.get(e);let t=new Promise((t,n)=>{this.textureLoader.load(e,r=>{this.pendingLoads.delete(e),this.disposed?(r.dispose(),n(Error(`Viewer disposed`))):(r.colorSpace=Xo,r.minFilter=Na,r.magFilter=Na,this._touchCache(e,r),t(r))},void 0,t=>{this.pendingLoads.delete(e),n(t||Error(`Failed to load texture`))})});return this.pendingLoads.set(e,t),t}_commitTextureImmediate(e){this.sphere.rotation.y=0,this.nextSphere.visible=!1,this.nextMaterial.opacity=0,this.nextMaterial.map=null,this.material.map=e,this.material.needsUpdate=!0}_beginCrossfadeWithTexture(e,t,n,r){if(!this.material.map){this._commitTextureImmediate(e);return}let i=this.lon,a=this.lat;r?this.sphere.rotation.y=0:(this.lon=Number(t||0),this.lat=Math.max(-85,Math.min(85,Number(n||0)*.25)),this.gyroBaseQuat=null,this.userYawOffset=0,this.userPitchOffset=0,this.sphere.rotation.y=Vs.degToRad(i-this.lon)),this.nextMaterial.map=e,this.nextMaterial.opacity=0,this.nextMaterial.needsUpdate=!0,this.nextSphere.visible=!0;let o=r?a:0;this.walkAnim={phase:`crossfade`,startTime:performance.now(),duration:460,startFov:r?this.fov:Math.min(94,this.baseFov+10),endFov:this.baseFov,startLat:this.lat,endLat:o,preserveView:r}}setPhoto({fullUrl:e,thumbUrl:t=null,initialYaw:n=0,links:r=[],preserveView:i=!1,transition:a=!1,focusYaw:o=null,focusPitch:s=null}){let c=++this.loadToken,l=!!this.material.map,u=!!(a&&l&&!this.pickMode),d=Number(n||0);!u&&!i&&(this.lon=d,this.lat=0,this.gyroBaseQuat=null,this.userYawOffset=0,this.userPitchOffset=0,this.fov=this.baseFov,this.camera.fov=this.fov,this.camera.updateProjectionMatrix()),u?(this.overlay.style.opacity=`0`,this.walkAnim={phase:`dolly`,startTime:performance.now(),duration:210,startLon:this.lon,focusYaw:o==null?null:Number(o),startLat:this.lat,focusPitch:s==null?this.lat*.4:Number(s)*.45,startFov:this.fov,endFov:Math.max(40,this.baseFov-22)}):(this.walkAnim=null,this.overlay.style.opacity=`1`),this.setLinks(r);let f=this.textureCache.get(e);this.options.onLoadState&&this.options.onLoadState({loadingThumb:!f&&!!t,loadingFull:!f});let p=!1,m=(t,n)=>{if(this.disposed||c!==this.loadToken)return;if(!u){this._commitTextureImmediate(t),this.overlay.style.opacity=`1`,n&&this.options.onLoadState&&this.options.onLoadState({loadingThumb:!1,loadingFull:!1});return}if(p){this.walkAnim&&this.walkAnim.phase===`crossfade`&&this.nextSphere.visible?(this.nextMaterial.map=t,this.nextMaterial.needsUpdate=!0):this._commitTextureImmediate(t),n&&this.options.onLoadState&&this.options.onLoadState({loadingThumb:!1,loadingFull:!1});return}p=!0;let r=this.walkAnim?.phase===`dolly`?performance.now()-this.walkAnim.startTime:210,a=Math.max(0,175-r);setTimeout(()=>{if(this.disposed||c!==this.loadToken)return;let n=this.textureCache.get(e)||t;this._beginCrossfadeWithTexture(n,d,s,i),this.textureCache.has(e)&&this.options.onLoadState&&this.options.onLoadState({loadingThumb:!1,loadingFull:!1})},a)};f?(m(f,!0),this._emitViewChange()):(t&&this._loadTextureCached(t).then(t=>{this.disposed||c!==this.loadToken||(!this.textureCache.has(e)&&this.options.onLoadState&&this.options.onLoadState({loadingThumb:!1,loadingFull:!0}),m(t,!1))}).catch(()=>{}),this._loadTextureCached(e).then(e=>{m(e,!0)}).catch(()=>{this.options.onLoadState&&c===this.loadToken&&this.options.onLoadState({loadingThumb:!1,loadingFull:!1})}),this._emitViewChange())}setLinks(e=[]){this.links=e,this.overlay.innerHTML=``,this.hotspotEls=[];let t=this.vrMode?[0,1]:[0];for(let e of t)for(let t of this.links){let n=document.createElement(`button`);n.type=`button`;let r=`${t.to_pin_number?`#${t.to_pin_number} · `:``}${this._escapeHtml(t.label||t.to_pin_title||`Lanjut`)}`;this.pickMode?(n.className=`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform duration-150 hover:scale-110`,n.innerHTML=`
                        <div class="flex flex-col items-center gap-1">
                            <div class="w-10 h-10 rounded-full bg-amber-500/95 text-slate-950 shadow-xl ring-4 ring-white/40 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                                </svg>
                            </div>
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/90 text-white border border-white/25 shadow whitespace-nowrap">
                                ${r}
                            </span>
                        </div>
                    `):Number(t.pitch??0)<=-5?(n.className=`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer`,n.innerHTML=`
                        <div class="flex flex-col items-center">
                            <div class="kuula-ring-wrap relative flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                                 style="width: 62px; height: 62px;">
                                <span class="absolute inset-0 rounded-full border-[4px] border-white/90 shadow-[0_0_16px_rgba(0,0,0,0.55)] animate-ping" style="animation-duration: 2.6s;"></span>
                                <span class="relative flex items-center justify-center w-14 h-14 rounded-full border-[5px] border-white bg-slate-950/25 shadow-[0_6px_22px_rgba(0,0,0,0.65)] group-hover:border-amber-300 transition-colors">
                                    <span class="w-6 h-6 rounded-full border-[3.5px] border-white/95 bg-white/80 group-hover:bg-amber-300 transition-colors"></span>
                                </span>
                            </div>
                            <span class="-mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 text-white border border-white/25 shadow-lg whitespace-nowrap backdrop-blur-md group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-300 transition-colors">
                                ${r}
                            </span>
                        </div>
                    `):(n.className=`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer transition-transform duration-200 hover:scale-110`,n.innerHTML=`
                        <div class="flex flex-col items-center gap-1.5">
                            <div class="w-12 h-12 rounded-full bg-slate-950/55 border-2 border-white/90 text-white shadow-[0_6px_24px_rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-white transition-colors">
                                <svg class="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" stroke-width="2.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 14l7-7 7 7"/>
                                </svg>
                            </div>
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 text-white border border-white/25 shadow-lg whitespace-nowrap backdrop-blur-md group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                                ${r}
                            </span>
                        </div>
                    `);let i=n.querySelector(`.kuula-ring-wrap`);n.addEventListener(`click`,e=>{e.stopPropagation(),this.options.onHotspotClick&&this.options.onHotspotClick(t)}),this.overlay.appendChild(n),this.hotspotEls.push({btn:n,ringWrap:i,link:t,eyeIndex:e})}}setVrMode(e){this.vrMode=!!e,this.vrDivider.classList.toggle(`hidden`,!this.vrMode),this.vrReticles.classList.toggle(`hidden`,!this.vrMode),this.setLinks(this.links),this.resize()}async setGyroscope(e){if(e&&typeof DeviceOrientationEvent<`u`&&typeof DeviceOrientationEvent.requestPermission==`function`&&await DeviceOrientationEvent.requestPermission()!==`granted`)throw Error(`Izin sensor giroskop ditolak oleh browser.`);return this.gyroBaseQuat=null,this.userYawOffset=0,this.userPitchOffset=0,this.gyroEnabled=!!e,this.gyroEnabled}lookAt(e,t=0){this.lon=Number(e||0),this.lat=Math.max(-85,Math.min(85,Number(t||0))),this._emitViewChange()}getView(){return{yaw:this.lon,pitch:this.lat,fov:this.fov}}resize(){if(!this.container||this.disposed)return;let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.leftCamera.aspect=e/2/t,this.leftCamera.updateProjectionMatrix(),this.rightCamera.aspect=e/2/t,this.rightCamera.updateProjectionMatrix(),this.renderer.setSize(e,t)}_emitViewChange(){this.options.onViewChange&&this.options.onViewChange({yaw:this.lon,pitch:this.lat,fov:this.fov})}_sphericalToWorld(e,t,n=480){let r=Vs.degToRad(90-t),i=Vs.degToRad(e);return new W(n*Math.sin(r)*Math.cos(i),n*Math.cos(r),n*Math.sin(r)*Math.sin(i))}_updateHotspotPositions(){let e=this.container.clientWidth,t=this.container.clientHeight;if(!e||!t)return;let n=Math.max(24,Math.min(68,66+this.lat*.55));for(let r of this.hotspotEls){let i=this.vrMode?r.eyeIndex===0?this.leftCamera:this.rightCamera:this.camera,a=this._sphericalToWorld(r.link.yaw,r.link.pitch,450),o=new W;if(i.getWorldDirection(o),o.dot(a.clone().normalize())<=.12){r.btn.style.display=`none`;continue}let s=a.project(i);if(s.z>1)r.btn.style.display=`none`;else if(r.ringWrap&&(r.ringWrap.style.transform=`perspective(240px) rotateX(${n.toFixed(1)}deg)`),this.vrMode){let n=e/2,i=r.eyeIndex===0?0:n,a=i+(s.x+1)*.5*n,o=(-s.y+1)*.5*t;a<i+20||a>i+n-20||o<20||o>t-20?r.btn.style.display=`none`:(r.btn.style.display=`block`,r.btn.style.left=`${a}px`,r.btn.style.top=`${o}px`)}else{let n=(s.x+1)*.5*e,i=(-s.y+1)*.5*t;n<12||n>e-12||i<12||i>t-12?r.btn.style.display=`none`:(r.btn.style.display=`block`,r.btn.style.left=`${n}px`,r.btn.style.top=`${i}px`)}}}_stepWalkAnimation(){let e=this.walkAnim;if(!e)return;let t=performance.now(),n=Math.min(1,(t-e.startTime)/Math.max(1,e.duration)),r=1-(1-n)**3,i=n<.5?2*n*n:1-(-2*n+2)**2/2;if(e.phase===`dolly`){if(e.focusYaw!==null&&e.focusYaw!==void 0){let t=this._shortestYawDelta(e.startLon,e.focusYaw);this.lon=this._normalizeYaw(e.startLon+t*r),this.lat=Math.max(-85,Math.min(85,e.startLat+(e.focusPitch-e.startLat)*r))}this.fov=e.startFov+(e.endFov-e.startFov)*r,this.camera.fov=this.fov,this.camera.updateProjectionMatrix()}else if(e.phase===`crossfade`&&(this.nextMaterial.opacity=i,this.fov=e.startFov+(e.endFov-e.startFov)*r,this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),e.preserveView||(this.lat=e.startLat+(e.endLat-e.startLat)*r),n>=1)){let e=this.nextMaterial.map;this.walkAnim=null,this._commitTextureImmediate(e),this.overlay.style.opacity=`1`,this._emitViewChange()}}_animate(){if(this.disposed)return;requestAnimationFrame(()=>this._animate()),this._stepWalkAnimation();let e=Vs.degToRad(90-this.lat),t=Vs.degToRad(this.lon),n=new W(500*Math.sin(e)*Math.cos(t),500*Math.cos(e),500*Math.sin(e)*Math.sin(t));this.camera.position.set(0,0,0),this.camera.lookAt(n),this.camera.updateMatrixWorld();let r=this.container.clientWidth,i=this.container.clientHeight;if(this.vrMode){let e=Math.floor(r/2),t=new W().crossVectors(n.clone().normalize(),new W(0,1,0)).normalize();this.leftCamera.fov=this.fov,this.leftCamera.updateProjectionMatrix(),this.leftCamera.position.copy(t.clone().multiplyScalar(-.08)),this.leftCamera.lookAt(n),this.leftCamera.updateMatrixWorld(),this.rightCamera.fov=this.fov,this.rightCamera.updateProjectionMatrix(),this.rightCamera.position.copy(t.clone().multiplyScalar(.08)),this.rightCamera.lookAt(n),this.rightCamera.updateMatrixWorld(),this.renderer.setScissorTest(!0),this.renderer.setViewport(0,0,e,i),this.renderer.setScissor(0,0,e,i),this.renderer.render(this.scene,this.leftCamera),this.renderer.setViewport(e,0,r-e,i),this.renderer.setScissor(e,0,r-e,i),this.renderer.render(this.scene,this.rightCamera)}else this.renderer.setScissorTest(!1),this.renderer.setViewport(0,0,r,i),this.renderer.render(this.scene,this.camera);this._updateHotspotPositions()}_escapeHtml(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}destroy(){this.disposed=!0;let e=this.renderer?.domElement;e&&(e.removeEventListener(`pointerdown`,this._onPointerDown),e.removeEventListener(`wheel`,this._onWheel),e.removeEventListener(`touchstart`,this._onTouchStart),e.removeEventListener(`touchmove`,this._onTouchMove),e.removeEventListener(`touchend`,this._onTouchEnd)),window.removeEventListener(`pointermove`,this._onPointerMove),window.removeEventListener(`pointerup`,this._onPointerUp),window.removeEventListener(`resize`,this._onResize),window.removeEventListener(`deviceorientation`,this._onDeviceOrientation),window.removeEventListener(`deviceorientationabsolute`,this._onDeviceOrientation);for(let e of this.textureCache.values())e.dispose();this.textureCache.clear(),this.pendingLoads.clear(),this.material?.map&&this.material.map.dispose(),this.nextMaterial?.map&&this.nextMaterial.map.dispose(),this.material?.dispose(),this.nextMaterial?.dispose(),this.sphere?.geometry?.dispose(),this.nextSphere?.geometry?.dispose(),this.renderer?.dispose()}},ih=Math.PI/180;function ah(){return typeof window<`u`&&({}.toString.call(window)===`[object Window]`||{}.toString.call(window)===`[object global]`)}var oh=typeof global<`u`?global:typeof window<`u`?window:typeof WorkerGlobalScope<`u`?self:{},J={_global:oh,version:`10.11.0`,isBrowser:ah(),isUnminified:/param/.test(function(e){}.toString()),dblClickWindow:400,getAngle(e){return J.angleDeg?e*ih:e},enableTrace:!1,pointerEventsEnabled:!0,autoDrawEnabled:!0,hitOnDragEnabled:!1,capturePointerEventsEnabled:!1,legacyTextRendering:!1,pixelRatio:typeof window<`u`&&window.devicePixelRatio||1,dragDistance:3,angleDeg:!0,showWarnings:!0,dragButtons:[0,1],isDragging(){return J.DD.isDragging},isTransforming(){return J.Transformer?.isTransforming()??!1},isDragReady(){return!!J.DD.node},releaseCanvasOnDestroy:!0,document:oh.document,_injectGlobal(e){oh.Konva===void 0?oh.Konva=e:console.error(`Several Konva instances detected. It is not recommended to use multiple Konva instances in the same environment.`)}},sh=new Set,ch=(e,t=!1)=>{J[e.prototype.getClassName()]=e,t&&sh.add(e)};J.isBrowser&&J._injectGlobal(J);var lh=`Konva needs a canvas outside the browser. Import "konva/canvas-backend", "konva/skia-backend" or "konva/napi-backend", or call Konva.setCanvasBackend().`,uh=()=>{if(typeof document>`u`)throw Error(lh)},dh=class e{constructor(e){this.dirty=!1,this.m=e?e.slice():[1,0,0,1,0,0]}reset(){this.m[0]=1,this.m[1]=0,this.m[2]=0,this.m[3]=1,this.m[4]=0,this.m[5]=0}copy(){return new e(this.m)}copyInto(e){e.m[0]=this.m[0],e.m[1]=this.m[1],e.m[2]=this.m[2],e.m[3]=this.m[3],e.m[4]=this.m[4],e.m[5]=this.m[5]}point(e){let t=this.m;return{x:t[0]*e.x+t[2]*e.y+t[4],y:t[1]*e.x+t[3]*e.y+t[5]}}_getTransformedRect(e){let[t,n,r,i,a,o]=this.m,s=e.x,c=e.y,l=e.x+e.width,u=e.y+e.height,d=[t*s+r*c+a,t*l+r*c+a,t*l+r*u+a,t*s+r*u+a],f=[n*s+i*c+o,n*l+i*c+o,n*l+i*u+o,n*s+i*u+o],p=Math.min(d[0],d[1],d[2],d[3]),m=Math.min(f[0],f[1],f[2],f[3]);return{x:p,y:m,width:Math.max(d[0],d[1],d[2],d[3])-p,height:Math.max(f[0],f[1],f[2],f[3])-m}}translate(e,t){return this.m[4]+=this.m[0]*e+this.m[2]*t,this.m[5]+=this.m[1]*e+this.m[3]*t,this}scale(e,t){return this.m[0]*=e,this.m[1]*=e,this.m[2]*=t,this.m[3]*=t,this}rotate(e){let t=Math.cos(e),n=Math.sin(e),r=this.m[0]*t+this.m[2]*n,i=this.m[1]*t+this.m[3]*n,a=this.m[0]*-n+this.m[2]*t,o=this.m[1]*-n+this.m[3]*t;return this.m[0]=r,this.m[1]=i,this.m[2]=a,this.m[3]=o,this}getTranslation(){return{x:this.m[4],y:this.m[5]}}skew(e,t){let n=this.m[0]+this.m[2]*t,r=this.m[1]+this.m[3]*t,i=this.m[2]+this.m[0]*e,a=this.m[3]+this.m[1]*e;return this.m[0]=n,this.m[1]=r,this.m[2]=i,this.m[3]=a,this}multiply(e){let t=this.m[0]*e.m[0]+this.m[2]*e.m[1],n=this.m[1]*e.m[0]+this.m[3]*e.m[1],r=this.m[0]*e.m[2]+this.m[2]*e.m[3],i=this.m[1]*e.m[2]+this.m[3]*e.m[3],a=this.m[0]*e.m[4]+this.m[2]*e.m[5]+this.m[4],o=this.m[1]*e.m[4]+this.m[3]*e.m[5]+this.m[5];return this.m[0]=t,this.m[1]=n,this.m[2]=r,this.m[3]=i,this.m[4]=a,this.m[5]=o,this}isInvertible(){return this.m[0]*this.m[3]-this.m[1]*this.m[2]!==0}invert(){let e=1/(this.m[0]*this.m[3]-this.m[1]*this.m[2]),t=this.m[3]*e,n=-this.m[1]*e,r=-this.m[2]*e,i=this.m[0]*e,a=e*(this.m[2]*this.m[5]-this.m[3]*this.m[4]),o=e*(this.m[1]*this.m[4]-this.m[0]*this.m[5]);return this.m[0]=t,this.m[1]=n,this.m[2]=r,this.m[3]=i,this.m[4]=a,this.m[5]=o,this}getMatrix(){return this.m}decompose(){let e=this.m[0],t=this.m[1],n=this.m[2],r=this.m[3],i=this.m[4],a=this.m[5],o=e*r-t*n,s={x:i,y:a,rotation:0,scaleX:0,scaleY:0,skewX:0,skewY:0};if(e!=0||t!=0){let i=Math.sqrt(e*e+t*t);s.rotation=t>0?Math.acos(e/i):-Math.acos(e/i),s.scaleX=i,s.scaleY=o/i,s.skewX=o&&(e*n+t*r)/o,s.skewY=0}else(n!=0||r!=0)&&(s.rotation=Math.atan2(-n,r)+0,s.scaleY=Math.sqrt(n*n+r*r));return s.rotation=Y._getRotation(s.rotation),s}},fh=`[object Array]`,ph=`[object Number]`,mh=`[object String]`,hh=`[object Boolean]`,gh=Math.PI/180,_h=180/Math.PI,vh=`#`,yh=``,bh=`0`,xh=`Konva warning: `,Sh=`Konva error: `,Ch={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],transparent:[0,0,0,0],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},wh=typeof window<`u`?window:{},Th=new WeakMap,Eh=(e,t)=>{typeof e.requestAnimationFrame==`function`?e.requestAnimationFrame(t):typeof requestAnimationFrame<`u`?requestAnimationFrame(t):setTimeout(t,16)},Dh=new Map,Oh=Object.getPrototypeOf(Int8Array),kh=e=>{let t=e.trim();return t.indexOf(`,`)===-1?t.split(/\s*\/\s*|\s+/):t.split(/\s*,\s*/)},Ah=`[+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:e[+-]?\\d+)?`,jh=RegExp(`^(${Ah})(%?)$`,`i`),Mh=(e,t)=>{let n=jh.exec(e);if(!n)return NaN;let r=n[2]?Number(n[1])/100*t:Number(n[1]);return Math.min(Math.max(r,0),t)},Nh=/^#[0-9a-f]+$/i,Ph=RegExp(`^(${Ah})(deg|grad|rad|turn)?$`,`i`),Fh={deg:1,grad:.9,rad:_h,turn:360};function Ih(e,t){return Math.min(Math.max(e||0,0),t)}var Y={_isElement(e){return!!(e&&e.nodeType==1)},_isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)},_isPlainObject(e){return!!e&&e.constructor===Object},_isArray(e){return Object.prototype.toString.call(e)===fh},_isNumber(e){return Object.prototype.toString.call(e)===ph&&!isNaN(e)&&isFinite(e)},_isString(e){return Object.prototype.toString.call(e)===mh},_isBoolean(e){return Object.prototype.toString.call(e)===hh},isObject(e){return e instanceof Object},isValidSelector(e){if(typeof e!=`string`||!e)return!1;let t=e[0];return t===`#`||t===`.`||t===t.toUpperCase()},_sign(e){return e===0||e>0?1:-1},requestAnimFrame(e,t){let n=t&&!t.closed&&t||wh,r=Th.get(n);r||(r=[],Th.set(n,r),Eh(n,function(){Th.delete(n),r.forEach(function(e){e()})})),r.push(e)},createCanvasElement(){return uh(),document.createElement(`canvas`)},createImageElement(){return uh(),document.createElement(`img`)},createDOMMatrix(e){return new(Uh().getTransform()).constructor(e)},createPath2D(e){return new Path2D(e)},_urlToImage(e,t,n){let r=Y.createImageElement();r.onload=function(){t(r)},r.onerror=e=>{n?.(e instanceof Error?e:Error(`Unable to load image.`))},r.src=e},_rgbToHex(e,t,n){return((1<<24)+(e<<16)+(t<<8)+n).toString(16).slice(1)},_hexToRgb(e){e=e.replace(vh,yh);let t=parseInt(e,16);return{r:t>>16&255,g:t>>8&255,b:t&255}},getRandomColor(){let e=(Math.random()*0xffffff|0).toString(16);for(;e.length<6;)e=bh+e;return vh+e},isCanvasFarblingActive:Hh(()=>{let e;try{e=Y.createCanvasElement()}catch{return!1}e.width=10,e.height=10;let t=e.getContext(`2d`,{willReadFrequently:!0});t.clearRect(0,0,10,10),t.fillStyle=`#282828`,t.fillRect(0,0,10,10);let n=t.getImageData(0,0,10,10).data,r=!1;for(let e=0;e<100;e++)if(n[e*4]!==40||n[e*4+1]!==40||n[e*4+2]!==40||n[e*4+3]!==255){r=!0;break}return Y.releaseCanvas(e),r}),getHitColor(){let e=()=>Math.random()*256|0;return this.getHitColorKey(e(),e(),e())},getHitColorKey(e,t,n){let r=this.isCanvasFarblingActive()?5:3,i=e=>Math.round(e/r)*r;return vh+this._rgbToHex(i(e),i(t),i(n))},getSnappedHexColor(e){let{r:t,g:n,b:r}=this._hexToRgb(e);return this.getHitColorKey(t,n,r)},getRGB(e){let{r:t=0,g:n=0,b:r=0}=Y.colorToRGBA(e)??{};return{r:t,g:n,b:r}},colorToRGBA(e){e=(e||``).trim()||`black`;let t=Y._namedColorToRBA(e)||Y._hex3ColorToRGBA(e)||Y._hex4ColorToRGBA(e)||Y._hex6ColorToRGBA(e)||Y._hex8ColorToRGBA(e)||Y._rgbColorToRGBA(e)||Y._hslColorToRGBA(e);if(t&&[t.r,t.g,t.b,t.a].every(Y._isNumber))return t},_namedColorToRBA(e){let t=Ch[e.toLowerCase()];return t?{r:t[0],g:t[1],b:t[2],a:t.length>3?t[3]:1}:null},_rgbColorToRGBA(e){let t=/^rgba?\(([^)]*)\)$/i.exec(e);if(!t)return;let n=kh(t[1]);if(!(n.length<3||n.length>4))return{r:Mh(n[0],255),g:Mh(n[1],255),b:Mh(n[2],255),a:n.length>3?Mh(n[3],1):1}},_hex8ColorToRGBA(e){if(e.length===9&&Nh.test(e))return{r:parseInt(e.slice(1,3),16),g:parseInt(e.slice(3,5),16),b:parseInt(e.slice(5,7),16),a:parseInt(e.slice(7,9),16)/255}},_hex6ColorToRGBA(e){if(e.length===7&&Nh.test(e))return{r:parseInt(e.slice(1,3),16),g:parseInt(e.slice(3,5),16),b:parseInt(e.slice(5,7),16),a:1}},_hex4ColorToRGBA(e){if(e.length===5&&Nh.test(e))return{r:parseInt(e[1]+e[1],16),g:parseInt(e[2]+e[2],16),b:parseInt(e[3]+e[3],16),a:parseInt(e[4]+e[4],16)/255}},_hex3ColorToRGBA(e){if(e.length===4&&Nh.test(e))return{r:parseInt(e[1]+e[1],16),g:parseInt(e[2]+e[2],16),b:parseInt(e[3]+e[3],16),a:1}},_hslColorToRGBA(e){let t=/^hsla?\(([^)]*)\)$/i.exec(e);if(!t)return;let n=kh(t[1]);if(n.length<3||n.length>4)return;let r=Ph.exec(n[0]);if(!r)return;let i=r[2],a=Number(r[1])*(i?Fh[i.toLowerCase()]:1);if(!isFinite(a))return;let o=(a%360+360)%360/360,s=Mh(n[1],100)/100,c=Mh(n[2],100)/100,l=n.length>3?Mh(n[3],1):1,u=c<.5?c*(1+s):c+s-c*s,d=2*c-u,f=[0,0,0];for(let e=0;e<3;e++){let t=o+1/3*-(e-1);t<0&&t++,t>1&&t--;let n;n=6*t<1?d+(u-d)*6*t:2*t<1?u:3*t<2?d+(u-d)*(2/3-t)*6:d,f[e]=n*255}return{r:Math.round(f[0]),g:Math.round(f[1]),b:Math.round(f[2]),a:l}},_getPointsRect(e){let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a=0;a<e.length;a+=2){let o=e[a],s=e[a+1];isNaN(o)||(t=Math.min(t,o),r=Math.max(r,o)),isNaN(s)||(n=Math.min(n,s),i=Math.max(i,s))}return isFinite(t+n)?{x:t,y:n,width:r-t,height:i-n}:{x:0,y:0,width:0,height:0}},haveIntersection(e,t){return!(t.x>e.x+e.width||t.x+t.width<e.x||t.y>e.y+e.height||t.y+t.height<e.y)},cloneObject(e){let t={};for(let n in e)t[n]=Y._cloneValue(e[n]);return t},_cloneValue(e){return Y._isArray(e)?e.some(e=>typeof e==`object`)?e.map(Y._cloneValue):e.slice():Y._isPlainObject(e)?Y.cloneObject(e):e instanceof Oh?e.slice():e},cloneArray(e){return e.slice(0)},degToRad(e){return e*gh},radToDeg(e){return e*_h},_getRotation(e){return J.angleDeg?Y.radToDeg(e):e},_capitalize(e){let t=Dh.get(e);if(t!==void 0)return t;let n=e.charAt(0).toUpperCase()+e.slice(1);return Dh.set(e,n),n},throw(e){throw Error(Sh+e)},error(e){console.error(Sh+e)},warn(e){J.showWarnings&&console.warn(xh+e)},_batchEvents(e,t){if(!e)return t();let n=!1,r=!0;try{e(()=>{n||!r?Y.warn(`eventBatchFunc must call its argument exactly once, synchronously.`):(n=!0,t())})}finally{r=!1,n||Y.warn(`eventBatchFunc must call its argument synchronously.`)}},each(e,t){for(let n in e)t(n,e[n])},_inRange(e,t,n){return t<=e&&e<n},_getProjectionToSegment(e,t,n,r,i,a){let o,s,c,l=(e-n)*(e-n)+(t-r)*(t-r);if(l==0)o=e,s=t,c=(i-n)*(i-n)+(a-r)*(a-r);else{let u=((i-e)*(n-e)+(a-t)*(r-t))/l;u<0?(o=e,s=t,c=(e-i)*(e-i)+(t-a)*(t-a)):u>1?(o=n,s=r,c=(n-i)*(n-i)+(r-a)*(r-a)):(o=e+u*(n-e),s=t+u*(r-t),c=(o-i)*(o-i)+(s-a)*(s-a))}return[o,s,c]},_getProjectionToLine(e,t,n){let r=Y.cloneObject(e),i=Number.MAX_VALUE;return t.forEach(function(a,o){if(!n&&o===t.length-1)return;let s=t[(o+1)%t.length],c=Y._getProjectionToSegment(a.x,a.y,s.x,s.y,e.x,e.y),l=c[0],u=c[1],d=c[2];d<i&&(r.x=l,r.y=u,i=d)}),r},_prepareArrayForTween(e,t,n){let r=[],i=[];if(e.length>t.length){let n=t;t=e,e=n}for(let t=0;t<e.length;t+=2)r.push({x:e[t],y:e[t+1]});for(let e=0;e<t.length;e+=2)i.push({x:t[e],y:t[e+1]});let a=[];return i.forEach(function(e){let t=Y._getProjectionToLine(e,r,n);a.push(t.x),a.push(t.y)}),a},_prepareToStringify(e,t=new Set){let n=Y._isArray(e)?[]:{};t.add(e);for(let r of Object.keys(e)){let i=e[r];Y._isElement(i)||t.has(i)||(n[r]=Y._isPlainObject(i)||Y._isArray(i)?Y._prepareToStringify(i,t):i)}return t.delete(e),n},_assign(e,t){for(let n in t)e[n]=t[n];return e},_getEventType(e){return e.indexOf(`pointer`)>=0?`pointer`:e.indexOf(`touch`)>=0?`touch`:`mouse`},_getFirstPointerId(e){return e.touches?e.changedTouches[0].identifier:e.pointerId??999},releaseCanvas(...e){J.releaseCanvasOnDestroy&&e.forEach(e=>{e.width=0,e.height=0})},_cornerRadii(e,t,n){let r=Math.min(t,n)/2;if(typeof e==`number`){let t=Ih(e,r);return[t,t,t,t]}return[Ih(e[0],r),Ih(e[1],r),Ih(e[2],r),Ih(e[3],r)]},drawRoundedRectPath(e,t,n,r){let i=t<0?t:0,a=n<0?n:0;t=Math.abs(t),n=Math.abs(n);let[o,s,c,l]=Y._cornerRadii(r,t,n);e.moveTo(i+o,a),e.lineTo(i+t-s,a),e.arc(i+t-s,a+s,s,Math.PI*3/2,0,!1),e.lineTo(i+t,a+n-c),e.arc(i+t-c,a+n-c,c,0,Math.PI/2,!1),e.lineTo(i+l,a+n),e.arc(i+l,a+n-l,l,Math.PI/2,Math.PI,!1),e.lineTo(i,a+o),e.arc(i+o,a+o,o,Math.PI,Math.PI*3/2,!1)},drawRoundedPolygonPath(e,t,n,r,i){r=Math.abs(r);for(let a=0;a<n;a++){let o=t[(a-1+n)%n],s=t[a],c=t[(a+1)%n],l={x:s.x-o.x,y:s.y-o.y},u={x:c.x-s.x,y:c.y-s.y},d=Math.hypot(l.x,l.y),f=Math.hypot(u.x,u.y),p;p=typeof i==`number`?i:a<i.length?i[a]:0,p=Math.max(p,0),p=r*Math.cos(Math.PI/n)*Math.min(1,p/r*2);let m={x:l.x/d,y:l.y/d},h={x:u.x/f,y:u.y/f},g={x:s.x-m.x*p,y:s.y-m.y*p},_={x:s.x+h.x*p,y:s.y+h.y*p};a===0?e.moveTo(g.x,g.y):e.lineTo(g.x,g.y),e.arcTo(s.x,s.y,_.x,_.y,p)}}},Lh={name:`web`,createCanvas:Y.createCanvasElement},{createDOMMatrix:Rh,createPath2D:zh}=Y;function Bh(e){let{name:t,createCanvas:n,createImage:r}=e;Y.createCanvasElement=n,Y.createDOMMatrix=e.createDOMMatrix??Rh,Y.createPath2D=e.createPath2D??zh,Y.createImageElement=r||(()=>{throw Error(`Konva: the "${t}" canvas backend has no createImage(), so it can not load images.`)}),Lh={name:t,createCanvas:Y.createCanvasElement}}function Vh(){return Y.createCanvasElement===Lh.createCanvas?Lh.name===`web`&&typeof document>`u`?null:Lh.name:`custom`}typeof document>`u`&&typeof OffscreenCanvas<`u`&&Bh({name:`offscreen-canvas`,createCanvas:()=>new OffscreenCanvas(300,150),createImage:()=>{throw Error(`Konva: a Web Worker has no image element. Load the image with createImageBitmap() and pass the ImageBitmap to Konva.Image.`)}});function Hh(e){let t,n;return()=>(t!==Y.createCanvasElement&&(n=e(),t=Y.createCanvasElement),n)}var Uh=Hh(()=>Y.createCanvasElement().getContext(`2d`));function Wh(e){let t=[],n=e.length,r=Y;for(let i=0;i<n;i++){let n=e[i];r._isNumber(n)?n=Math.round(n*1e3)/1e3:r._isString(n)||(n+=``),t.push(n)}return t}var Gh=`,`,Kh=`(`,qh=`)`,Jh=`;`,Yh=`()`,Xh=`=`,Zh=`arc.arcTo.beginPath.bezierCurveTo.clearRect.clip.closePath.createLinearGradient.createPattern.createRadialGradient.drawImage.ellipse.fill.fillText.getImageData.createImageData.lineTo.moveTo.putImageData.quadraticCurveTo.rect.roundRect.restore.rotate.save.scale.setLineDash.setTransform.stroke.strokeText.transform.translate`.split(`.`),Qh=[`fillStyle`,`strokeStyle`,`shadowColor`,`shadowBlur`,`shadowOffsetX`,`shadowOffsetY`,`letterSpacing`,`lineCap`,`lineDashOffset`,`lineJoin`,`lineWidth`,`miterLimit`,`direction`,`font`,`textAlign`,`textBaseline`,`globalAlpha`,`globalCompositeOperation`,`imageSmoothingEnabled`,`imageSmoothingQuality`,`filter`],$h=100,eg=class{constructor(e){this.canvas=e,J.enableTrace&&(this.traceArr=[],this._enableTrace())}fillShape(e){e.fillEnabled()&&this._fill(e)}_fill(e){}strokeShape(e){e.hasStroke()&&this._stroke(e)}_stroke(e){}fillStrokeShape(e){e.attrs.fillAfterStrokeEnabled?(this.strokeShape(e),this.fillShape(e)):(this.fillShape(e),this.strokeShape(e))}getTrace(e,t){let n=this.traceArr,r=n.length,i=``,a,o,s,c;for(a=0;a<r;a++)o=n[a],s=o.method,s?(c=o.args,i+=s,e?i+=Yh:(t&&(c=c.map(e=>typeof e==`number`?Math.floor(e):e)),i+=Kh+c.join(Gh)+qh)):(i+=o.property,e||(i+=Xh+o.val)),i+=Jh;return i}clearTrace(){this.traceArr=[]}_trace(e){let t=this.traceArr,n;t.push(e),n=t.length,n>=$h&&t.shift()}reset(){let e=this.getCanvas().getPixelRatio();this.setTransform(+e,0,0,+e,0,0)}getCanvas(){return this.canvas}clear(e){let t=this.getCanvas();e?this.clearRect(e.x||0,e.y||0,e.width||0,e.height||0):this.clearRect(0,0,t.getWidth()/t.pixelRatio,t.getHeight()/t.pixelRatio)}_drawDeviceBuffer(e){let{x:t,y:n,width:r,height:i}=e._isolationRect;this.setTransform(1,0,0,1,0,0),this.imageSmoothingEnabled=!1,this.drawImage(e._canvas,0,0,r,i,t,n,r,i)}_applyLineCap(e){let t=e.attrs.lineCap;t&&this.setAttr(`lineCap`,t)}_getOpacity(e){if(!this._opacityRoot)return e.getAbsoluteOpacity();let t=e.opacity(),n=e.parent;for(;n&&n!==this._opacityRoot;)t*=n.opacity(),n=n.parent;return t}_applyOpacity(e){let t=this._getOpacity(e);t!==1&&this.setAttr(`globalAlpha`,t)}_applyLineJoin(e){let t=e.attrs.lineJoin;t&&this.setAttr(`lineJoin`,t)}_applyMiterLimit(e){let t=e.attrs.miterLimit;t!=null&&this.setAttr(`miterLimit`,t)}setAttr(e,t){this._context[e]=t}arc(e,t,n,r,i,a){this._context.arc(e,t,n,r,i,a)}arcTo(e,t,n,r,i){this._context.arcTo(e,t,n,r,i)}beginPath(){this._context.beginPath()}bezierCurveTo(e,t,n,r,i,a){this._context.bezierCurveTo(e,t,n,r,i,a)}clearRect(e,t,n,r){this._context.clearRect(e,t,n,r)}clip(...e){this._context.clip.apply(this._context,e)}closePath(){this._context.closePath()}createImageData(e,t){let n=arguments;if(n.length===2)return this._context.createImageData(e,t);if(n.length===1)return this._context.createImageData(e)}createLinearGradient(e,t,n,r){return this._context.createLinearGradient(e,t,n,r)}createPattern(e,t){return this._context.createPattern(e,t)}createRadialGradient(e,t,n,r,i,a){return this._context.createRadialGradient(e,t,n,r,i,a)}drawImage(e,t,n,r,i,a,o,s,c){let l=arguments,u=this._context;l.length===3?u.drawImage(e,t,n):l.length===5?u.drawImage(e,t,n,r,i):l.length===9&&u.drawImage(e,t,n,r,i,a,o,s,c)}ellipse(e,t,n,r,i,a,o,s){this._context.ellipse(e,t,n,r,i,a,o,s)}isPointInPath(e,t,n,r){return n?this._context.isPointInPath(n,e,t,r):this._context.isPointInPath(e,t,r)}fill(...e){this._context.fill.apply(this._context,e)}fillRect(e,t,n,r){this._context.fillRect(e,t,n,r)}strokeRect(e,t,n,r){this._context.strokeRect(e,t,n,r)}fillText(e,t,n,r){r?this._context.fillText(e,t,n,r):this._context.fillText(e,t,n)}measureText(e){return this._context.measureText(e)}getImageData(e,t,n,r){return this._context.getImageData(e,t,n,r)}lineTo(e,t){this._context.lineTo(e,t)}moveTo(e,t){this._context.moveTo(e,t)}rect(e,t,n,r){this._context.rect(e,t,n,r)}roundRect(e,t,n,r,i){this._context.roundRect(e,t,n,r,i)}putImageData(e,t,n){this._context.putImageData(e,t,n)}quadraticCurveTo(e,t,n,r){this._context.quadraticCurveTo(e,t,n,r)}restore(){this._context.restore()}rotate(e){this._context.rotate(e)}save(){this._context.save()}scale(e,t){this._context.scale(e,t)}setLineDash(e){this._context.setLineDash(e)}getLineDash(){return this._context.getLineDash()}setTransform(e,t,n,r,i,a){this._context.setTransform(e,t,n,r,i,a)}stroke(e){e?this._context.stroke(e):this._context.stroke()}strokeText(e,t,n,r){this._context.strokeText(e,t,n,r)}transform(e,t,n,r,i,a){this._context.transform(e,t,n,r,i,a)}translate(e,t){this._context.translate(e,t)}_enableTrace(){let e=this,t=Zh.length,n=this.setAttr,r,i,a=function(t){let n=e[t],r;e[t]=function(){return i=Wh(Array.prototype.slice.call(arguments,0)),r=n.apply(e,arguments),e._trace({method:t,args:i}),r}};for(r=0;r<t;r++)a(Zh[r]);e.setAttr=function(){n.apply(e,arguments);let t=arguments[0],r=arguments[1];(t===`shadowOffsetX`||t===`shadowOffsetY`||t===`shadowBlur`)&&(r/=this.canvas.getPixelRatio()),e._trace({property:t,val:r})}}_applyGlobalCompositeOperation(e){let t=e.attrs.globalCompositeOperation;t&&t!==`source-over`&&this.setAttr(`globalCompositeOperation`,t)}};Qh.forEach(function(e){Object.defineProperty(eg.prototype,e,{get(){return this._context[e]},set(t){this._context[e]=t}})});var tg=class extends eg{constructor(e,{willReadFrequently:t=!1}={}){super(e),this._context=e._canvas.getContext(`2d`,{willReadFrequently:t})}_getFillPattern(e){let t=this._context;return`patternQuality`in t&&(t.patternQuality=t.imageSmoothingEnabled?`good`:`nearest`),e._getFillPattern()}_getFillStyle(e){let t=e.fill();switch(e._getFillType(t)){case`color`:return t;case`pattern`:return this._getFillPattern(e);case`linear-gradient`:return e._getLinearGradient();case`radial-gradient`:return e._getRadialGradient()}}_fill(e){let t=this._getFillStyle(e);t!==void 0&&(this.setAttr(`fillStyle`,t),e._fillFunc(this))}_strokeLinearGradient(e){let t=e._toStyleSpace(e.getStrokeLinearGradientStartPoint()),n=e._toStyleSpace(e.getStrokeLinearGradientEndPoint());if(!e.getStrokeScaleEnabled()){let{a:e,b:r,c:i,d:a,e:o,f:s}=this._context.getTransform(),c=new dh([e,r,i,a,o,s]),l=this.canvas.getPixelRatio(),u=n.x-t.x,d=n.y-t.y,f=a*u-r*d,p=e*d-i*u,m=f*f+p*p,h=m?(u*u+d*d)*(e*a-r*i)/m:0;t=c.point(t),n={x:t.x+f*h,y:t.y+p*h},t={x:t.x/l,y:t.y/l},n={x:n.x/l,y:n.y/l}}let r=e.getStrokeLinearGradientColorStops(),i=this.createLinearGradient(t.x,t.y,n.x,n.y);if(r){for(let e=0;e<r.length;e+=2)i.addColorStop(r[e],r[e+1]);this.setAttr(`strokeStyle`,i)}}_applyStrokeStyle(e){e.strokeLinearGradientColorStops()?this._strokeLinearGradient(e):this.setAttr(`strokeStyle`,e.stroke())}_applyDecorationStyle(e){if(e.hasFill())this.strokeStyle=this._getFillStyle(e);else if(e.hasStroke())this._applyStrokeStyle(e);else return!1;return!0}_stroke(e){let t=e.dash(),n=e.getStrokeScaleEnabled();n||this.save(),this._applyLineCap(e),t&&e.dashEnabled()&&(this.setLineDash(t),this.setAttr(`lineDashOffset`,e.dashOffset())),this.setAttr(`lineWidth`,e.strokeWidth());let r=this.shadowColor,i=e.getShadowForStrokeEnabled();if(i||this.setAttr(`shadowColor`,`rgba(0,0,0,0)`),this._applyStrokeStyle(e),!n){let e=this.getCanvas().getPixelRatio();this.setTransform(e,0,0,e,0,0)}try{e._strokeFunc(this)}finally{i||this.setAttr(`shadowColor`,r),n||this.restore()}}_applyShadow(e){let t=e.getShadowRGBA()??`black`,n=e.getShadowBlur(),r=e.getShadowOffset(),i=e.getAbsoluteScale(),a=this.canvas.getPixelRatio(),o=i.x*a,s=i.y*a;this.setAttr(`shadowColor`,t),this.setAttr(`shadowBlur`,n*Math.min(Math.abs(o),Math.abs(s))),this.setAttr(`shadowOffsetX`,r.x*o),this.setAttr(`shadowOffsetY`,r.y*s)}},ng=class extends eg{constructor(e){super(e),this._context=e._canvas.getContext(`2d`,{willReadFrequently:!0})}_fill(e){this.save(),this.setAttr(`fillStyle`,e.colorKey),e._fillFuncHit(this),this.restore()}strokeShape(e){e.hasHitStroke()&&this._stroke(e)}_stroke(e){let t=e.getStrokeScaleEnabled();if(!t){this.save();let e=this.getCanvas().getPixelRatio();this.setTransform(e,0,0,e,0,0)}this._applyLineCap(e);let n=e.hitStrokeWidth(),r=n===`auto`?e.strokeWidth():n;this.setAttr(`lineWidth`,r),this.setAttr(`strokeStyle`,e.colorKey),e._strokeFuncHit(this),t||this.restore()}},rg=class{constructor(e){var t;this.pixelRatio=1,this.width=0,this.height=0,this._logicalWidth=0,this._logicalHeight=0,this.isCache=!1;let n=(e||{}).pixelRatio||J.pixelRatio||J._global.devicePixelRatio||1;this.pixelRatio=n,this._canvas=Y.createCanvasElement(),(t=this._canvas).style??(t.style={}),this._canvas.style.padding=`0`,this._canvas.style.margin=`0`,this._canvas.style.border=`0`,this._canvas.style.background=`transparent`,this._canvas.style.position=`absolute`,this._canvas.style.top=`0`,this._canvas.style.left=`0`}getContext(){return this.context}getPixelRatio(){return this.pixelRatio}setPixelRatio(e){this.pixelRatio=e,this.setSize(this._logicalWidth,this._logicalHeight)}setWidth(e){this.setSize(e,this._logicalHeight)}setHeight(e){this.setSize(this._logicalWidth,e)}getWidth(){return this.width}getHeight(){return this.height}_bitmapSize(e){return Math.floor((e||0)*this.pixelRatio)}setSize(e,t){isFinite(e??0)&&isFinite(t??0)||(Y.error(`Canvas size must be finite numbers, got ${e}x${t}. The canvas is left empty.`),e=t=0),e||=0,t||=0;let n=this.pixelRatio,r=this.getContext()._context,i=r.imageSmoothingEnabled;this._logicalWidth=e,this._logicalHeight=t,this.width=this._canvas.width=this._bitmapSize(e),this.height=this._canvas.height=this._bitmapSize(t),this._canvas.style.width=e+`px`,this._canvas.style.height=t+`px`,r.scale(n,n),r.imageSmoothingEnabled=i}setSizeIfChanged(e,t){(this.width!==this._bitmapSize(e)||this.height!==this._bitmapSize(t))&&this.setSize(e,t)}toDataURL(e,t){if(!this._canvas.toDataURL)throw Error(`Konva: this canvas can not make a data URL. In a Web Worker, use toBlob() instead.`);try{return this._canvas.toDataURL(e,t)}catch{try{return this._canvas.toDataURL()}catch(e){throw Y.error(`Unable to get data URL. `+e.message+` For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.`),e}}}},ig=class e extends rg{_prepareIsolationCanvas(t){let{a:n,b:r,c:i,d:a,e:o,f:s}=this.getContext()._context.getTransform(),c=this._isolationRect||this,l=0,u=0,d=c.width,f=c.height;if(t){let e=new dh([n,r,i,a,o,s])._getTransformedRect(t);l=Math.max(0,Math.floor(e.x)-1),u=Math.max(0,Math.floor(e.y)-1),d=Math.min(d,Math.ceil(e.x+e.width)+1)-l,f=Math.min(f,Math.ceil(e.y+e.height)+1)-u}d>0&&f>0||(l=u=0,d=f=1);let p=this._isolationCanvas||=new e({width:0,height:0,pixelRatio:this.pixelRatio});if(p.width<d||p.height<f){let e=this.pixelRatio,t=(t,n,r)=>Math.min(r,Math.ceil((n<t?Math.max(t,n*1.5):n)/e));p.setSize(t(d,p.width,this._logicalWidth),t(f,p.height,this._logicalHeight))}p._isolationRect={x:l,y:u,width:d,height:f};let m=p._isolationPeak;m.width=Math.max(m.width,d),m.height=Math.max(m.height,f);let h=p.getContext();h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,d,f),h.setTransform(n,r,i,a,o-l,s-u);let g=this.getContext();return h.imageSmoothingEnabled=g.imageSmoothingEnabled,h.imageSmoothingQuality=g.imageSmoothingQuality,h.direction=g.direction,p}_trimIsolationCanvas(){let e=this._isolationCanvas;if(!e)return;let t=e._isolationPeak;e._isolationLowFrames=e.width*e.height>4*t.width*t.height?e._isolationLowFrames+1:0,e._isolationLowFrames>=10?this._releaseIsolationCanvas():(t.width=t.height=0,e._trimIsolationCanvas())}_releaseIsolationCanvas(){let e=this._isolationCanvas;e&&(e._releaseIsolationCanvas(),Y.releaseCanvas(e._canvas),this._isolationCanvas=void 0)}setSize(e,t){this._releaseIsolationCanvas(),super.setSize(e,t)}constructor(e={width:0,height:0,willReadFrequently:!1}){super(e),this._isolationPeak={width:0,height:0},this._isolationLowFrames=0,this.context=new tg(this,{willReadFrequently:e.willReadFrequently}),this.setSize(e.width,e.height)}},ag=class extends rg{constructor(e={width:0,height:0}){super(e),this.hitCanvas=!0,this.context=new ng(this),this.context.imageSmoothingEnabled=!1,this.setSize(e.width,e.height)}},og={get isDragging(){let e=!1;return og._dragElements.forEach(t=>{t.dragStatus===`dragging`&&(e=!0)}),e},get node(){let e;for(let t of og._dragElements.values()){if(t.dragStatus===`dragging`)return t.node;e=t.node}return e},_dragElements:new Map,_listenToWindow(e){let t=t=>og._endDragBefore(t,e),n=t=>og._batchEvents(()=>og._drag(t,e),e),r=e=>og._batchEvents(()=>og._endDragAfter(e));e.addEventListener(`mouseup`,t,!0),e.addEventListener(`touchend`,t,!0),e.addEventListener(`touchcancel`,t,!0),e.addEventListener(`mousemove`,n),e.addEventListener(`touchmove`,n),e.addEventListener(`mouseup`,r,!1),e.addEventListener(`touchend`,r,!1),e.addEventListener(`touchcancel`,r,!1)},_batchEvents(e,t){if(!og._dragElements.size)return;let n=new Set;for(let{node:e}of og._dragElements.values()){let r=e.getStage();if(!r||t&&r._getOwnerWindow()!==t)continue;let i=r.eventBatchFunc();i&&n.add(i)}let r=e;for(let e of n){let t=r;r=()=>Y._batchEvents(e,t)}r()},_drag(e,t){let n=[],r=new Set;og._dragElements.forEach((i,a)=>{let{node:o}=i,s=o.getStage();if(t&&s._getOwnerWindow()!==t||(r.has(s)||(s.setPointersPositions(e),r.add(s)),i.pointerEventType&&i.pointerEventType!==s._pointerEventType))return;i.pointerId===void 0&&(i.pointerId=Y._getFirstPointerId(e),i.pointerEventType=s._pointerEventType,i.dragStatus===`dragging`&&s._cancelClick(i.pointerId,i.pointerEventType));let c=s._changedPointerPositions.find(e=>e.id===i.pointerId);if(c){if(i.dragStatus!==`dragging`){let t=o.dragDistance();if(Math.max(Math.abs(c.x-i.startPointerPos.x),Math.abs(c.y-i.startPointerPos.y))<t||(o.startDrag({evt:e}),!o.isDragging()))return}o._setDragPosition(e,i),n.push(o)}}),n.forEach(t=>{t.getStage()&&t.fire(`dragmove`,{type:`dragmove`,target:t,evt:e},!0)})},_endDragBefore(e,t,n){let r=[],i=new Set;og._dragElements.forEach((a,o)=>{let{node:s}=a;if(n&&a!==n&&a.pointerId!==n.pointerId)return;let c=s.getStage();if(!e||i.has(c)||t&&c._getOwnerWindow()!==t||(c.setPointersPositions(e),i.add(c)),n||(!e||!a.pointerEventType||a.pointerEventType===Y._getEventType(e.type))&&(a.pointerId===void 0||c._changedPointerPositions.some(e=>e.id===a.pointerId))){if(a.dragStatus===`ready`)og._dragElements.delete(o);else{c._cancelClick(a.pointerId,a.pointerEventType),a.dragStatus=`stopped`;let e=s.getLayer()||c;e&&r.indexOf(e)===-1&&r.push(e)}}}),r.forEach(e=>{e.draw()})},_endDragAfter(e,t){og._dragElements.forEach((n,r)=>{n.dragStatus!==`stopped`||t&&n!==t&&n.pointerId!==t.pointerId||(n.node.fire(`dragend`,{type:`dragend`,target:n.node,evt:e},!0),n.dragStatus!==`dragging`&&og._dragElements.delete(r))})}},sg=new Map,cg=J._global.PointerEvent!==void 0;function lg(e,t){let n=sg.get(e);return n&&(!t||n.stage===t)?n.shape:void 0}function ug(e,t,n){e._fire(t,{evt:new PointerEvent(t,{pointerId:n}),pointerId:n})}function dg(e,t){return sg.get(e)?.shape===t}function fg(e,t){var n;mg(e);let r=t.getStage();if(r&&(sg.set(e,{shape:t,stage:r}),cg)){try{(n=r.content)==null||n.setPointerCapture(e)}catch{}ug(t,`gotpointercapture`,e)}}function pg(e){sg.forEach(({shape:t,stage:n},r)=>{(t===e||n===e)&&mg(r)})}function mg(e,t){var n;let r=sg.get(e);if(!r||t&&r.shape!==t)return;let{shape:i,stage:a}=r;if(sg.delete(e),cg){try{(n=a.content)==null||n.releasePointerCapture(e)}catch{}ug(i,`lostpointercapture`,e)}}function hg(e){return Y._isString(e)?`"`+e+`"`:Object.prototype.toString.call(e)===`[object Number]`||Y._isBoolean(e)?e:Object.prototype.toString.call(e)}function gg(e){return e>255?255:e<0?0:Math.round(e)}function X(){if(J.isUnminified)return function(e,t){return Y._isNumber(e)||Y.warn(hg(e)+` is a not valid value for "`+t+`" attribute. The value should be a number.`),e}}function _g(e){if(J.isUnminified)return function(t,n){let r=Y._isNumber(t),i=Y._isArray(t)&&t.length==e;return!r&&!i&&Y.warn(hg(t)+` is a not valid value for "`+n+`" attribute. The value should be a number or Array<number>(`+e+`)`),t}}function vg(){if(J.isUnminified)return function(e,t){return Y._isNumber(e)||e===`auto`||Y.warn(hg(e)+` is a not valid value for "`+t+`" attribute. The value should be a number or "auto".`),e}}function yg(){if(J.isUnminified)return function(e,t){return Y._isString(e)||Y.warn(hg(e)+` is a not valid value for "`+t+`" attribute. The value should be a string.`),e}}function bg(){if(J.isUnminified)return function(e,t){let n=Y._isString(e),r=Object.prototype.toString.call(e)===`[object CanvasGradient]`||e&&e.addColorStop;return n||r||Y.warn(hg(e)+` is a not valid value for "`+t+`" attribute. The value should be a string or a native gradient.`),e}}function xg(){if(J.isUnminified)return function(e,t){return e instanceof Oh||(Y._isArray(e)?e.forEach(function(e){Y._isNumber(e)||Y.warn(`"`+t+`" attribute has non numeric element `+e+`. Make sure that all elements are numbers.`)}):Y.warn(hg(e)+` is a not valid value for "`+t+`" attribute. The value should be a array of numbers.`)),e}}function Sg(){if(J.isUnminified)return function(e,t){return e!==!0&&e!==!1&&Y.warn(hg(e)+` is a not valid value for "`+t+`" attribute. The value should be a boolean.`),e}}function Cg(e){if(J.isUnminified)return function(t,n){return t==null||Y.isObject(t)||Y.warn(hg(t)+` is a not valid value for "`+n+`" attribute. The value should be an object with properties `+e),t}}var wg=`get`,Tg=`set`,Z={addGetterSetter(e,t,n,r,i){Z.addGetter(e,t,n),Z.addSetter(e,t,r,i),Z.addOverloadedGetterSetter(e,t)},addGetter(e,t,n){let r=wg+Y._capitalize(t),i=Array.isArray(n),a=function(){let e=this.attrs[t];return e===void 0?i?n.slice():n:e};a._def=n,e.prototype[r]=e.prototype[r]||a},addSetter(e,t,n,r){let i=Tg+Y._capitalize(t);e.prototype[i]||Z.overWriteSetter(e,t,n,r)},overWriteSetter(e,t,n,r){let i=Tg+Y._capitalize(t);e.prototype[i]=function(e){return n&&e!=null&&(e=n.call(this,e,t)),this._setAttr(t,e),r&&r.call(this),this}},addComponentsGetterSetter(e,t,n,r,i){let a=n.length,o=Y._capitalize,s=wg+o(t),c=Tg+o(t),l=n.map(e=>t+o(e)),u=l.map(e=>wg+o(e));e.prototype[s]=function(){let e={};for(let t=0;t<a;t++){let r=this[u[t]];e[n[t]]=r?r.call(this):this.attrs[l[t]]}return e};let d=Cg(n);e.prototype[c]=function(e){let a=this[s]();r&&(e=r.call(this,e,t)),d&&d.call(this,e,t);for(let n in e)e.hasOwnProperty(n)&&this._setAttr(t+o(n),e[n]);return e||n.forEach(e=>{this._setAttr(t+o(e),void 0)}),this._fireChangeEvent(t,a,e),i&&i.call(this),this},Z.addOverloadedGetterSetter(e,t)},addOverloadedGetterSetter(e,t){let n=Y._capitalize(t),r=Tg+n,i=wg+n,a=function(){return arguments.length?(this[r](arguments[0]),this):this[i]()};e.prototype[t]=a},backCompat(e,t){Y.each(t,function(t,n){let r=e.prototype[n],i=wg+Y._capitalize(t),a=Tg+Y._capitalize(t);function o(){return Y.error(`"`+t+`" method is deprecated and will be removed soon. Use ""`+n+`" instead.`),r.apply(this,arguments)}e.prototype[t]=o,e.prototype[i]=o,e.prototype[a]=o})},afterSetFilter(){this._filterUpToDate=!1}};function Eg(e){let t=[],n=/(\w+)\(([^)]*)\)/g,r;for(;(r=n.exec(e))!==null;){let[,e,n]=r,i=Dg[e];if(!i){Y.warn(`CSS filter "${e}" is not supported in fallback mode. Consider using function filters for better compatibility.`);continue}let a=n.trim()===``?e===`blur`?0:1:parseFloat(n)/(n.includes(`%`)?100:1);t.push({fallback:i,value:a})}return function(e,n=1){for(let{fallback:r,value:i}of t)r(e,i,n)}}var Dg={};function Og(e,t){Dg[e]=t}for(let e of[`grayscale`,`sepia`,`invert`])Og(e,(t,n)=>{let r=Math.min(1,Math.max(0,n)),i=t.data;for(let t=0;t<i.length;t+=4){let n=i[t],a=i[t+1],o=i[t+2],s,c,l;e===`grayscale`?s=c=l=.2126*n+.7152*a+.0722*o:e===`sepia`?(s=.393*n+.769*a+.189*o,c=.349*n+.686*a+.168*o,l=.272*n+.534*a+.131*o):(s=255-n,c=255-a,l=255-o),i[t]=n+(s-n)*r,i[t+1]=a+(c-a)*r,i[t+2]=o+(l-o)*r}});var kg=`absoluteOpacity`,Ag=`absoluteTransform`,jg=`Change`,Mg=`children`,Ng=`konva`,Pg=`listening`,Fg=[`mouseenter`,`mouseleave`,`pointerenter`,`pointerleave`,`touchenter`,`touchleave`],Ig=`set`,Lg=`Shape`,Rg=` `,zg=`stage`,Bg=`transform`,Vg=`Stage`,Hg=`visible`,Ug=[`xChange.konva`,`yChange.konva`,`scaleXChange.konva`,`scaleYChange.konva`,`skewXChange.konva`,`skewYChange.konva`,`rotationChange.konva`,`offsetXChange.konva`,`offsetYChange.konva`,`transformsEnabledChange.konva`].join(Rg),Wg=1,Gg=/\s/,Kg=()=>!1;function qg(e){if(typeof e==`function`)return e;if(!e)return Kg;let t=[],n=[],r=[];for(let i of e.replace(/ /g,``).split(`,`))Y.isValidSelector(i)||(Y.warn(`Selector "`+i+`" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".`),Y.warn(`If you have a custom shape with such className, please change it to start with upper letter like "Triangle".`),Y.warn(`Konva is awesome, right?`)),i.charAt(0)===`#`?t.push(i.slice(1)):i.charAt(0)===`.`?n.push(i.slice(1)):r.push(i);return e=>{if(t.length&&t.indexOf(e.id())!==-1||r.length&&(r.indexOf(e.className)!==-1||r.indexOf(e.nodeType)!==-1))return!0;for(let t=0;t<n.length;t++)if(e.hasName(n[t]))return!0;return!1}}var Q=class e{constructor(e){this._id=Wg++,this.eventListeners={},this.attrs={},this.index=0,this.parent=null,this._cache={},this._canvasCache=null,this._batchingTransformChange=!1,this._needClearTransformCache=!1,this._filterUpToDate=!1,this._isUnderCache=!1,this._dragEventId=null,this._shouldFireChangeEvents=!1,this.setAttrs(e),this._shouldFireChangeEvents=!0}hasChildren(){return!1}_clearCache(e){(e===Bg||e===Ag)&&this._cache[e]?this._cache[e].dirty=!0:e?this._cache[e]=void 0:(this._cache={},this._attrsVersion!==void 0&&this._attrsVersion++)}_releaseCanvasCache(){let e=this._canvasCache;e&&(Y.releaseCanvas(e.scene._canvas,e.filter._canvas,...e.hit?[e.hit._canvas]:[]),this._canvasCache=null)}_getCache(e,t){let n=this._cache[e];return(n===void 0||(e===Bg||e===Ag)&&n.dirty===!0)&&(n=t.call(this),this._cache[e]=n),n}_getCanvasCache(){return this._canvasCache}_clearSelfAndDescendantCache(e){this._clearCache(e),(e===void 0||e===Ag)&&this.fire(`absoluteTransformChange`)}static _runAfterUpdateBatch(t){e._updateBatchDepth>0?e._pendingUpdates.add(t):t()}static _flushUpdateBatch(){if(e._updateBatchDepth>0)return;let t=e._pendingUpdates;t.size&&(e._pendingUpdates=new Set,t.forEach(e=>e()))}static _updateBatch(t){e._updateBatchDepth++;try{return t()}finally{e._updateBatchDepth--,e._flushUpdateBatch()}}static _beginUpdateBatch(){e._updateBatchDepth++;let t=!1;return()=>{t||(t=!0,e._updateBatchDepth--,e._flushUpdateBatch())}}clearCache(){return this._releaseCanvasCache(),this._clearSelfAndDescendantCache(),this._requestDraw(),this}cache(e){let t=e||{},n={};if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0){let e=this._isUnderCache;this._isUnderCache=!0,n=this.getClientRect({skipTransform:!0,relativeTo:this.getParent()||void 0}),this._isUnderCache=e}let r=t.x===void 0?Math.floor(n.x):t.x,i=t.y===void 0?Math.floor(n.y):t.y,a=Math.ceil(t.width||n.x+n.width-r),o=Math.ceil(t.height||n.y+n.height-i),s=t.pixelRatio,c=t.offset||0,l=t.drawBorder||!1,u=t.hitCanvasPixelRatio||1;if(a<=0||o<=0||!isFinite(r+i+a+o))return Y.error(`Can not cache the node. Its size is 0 or its bounds are not finite numbers (${r}, ${i}, ${a}x${o}). Caching is skipped.`),this;a+=c*2,o+=c*2,r-=c,i-=c;let d=new ig({pixelRatio:s,width:a,height:o}),f=new ig({pixelRatio:s,width:0,height:0,willReadFrequently:!0}),p=d.getContext();d.isCache=!0,this._releaseCanvasCache(),this._filterUpToDate=!1,t.imageSmoothingEnabled===!1&&(d.getContext()._context.imageSmoothingEnabled=!1,f.getContext()._context.imageSmoothingEnabled=!1),p.save(),p.translate(-r,-i),this._isUnderCache=!0,this._clearSelfAndDescendantCache(kg);try{this.drawScene(d,this)}catch(e){throw Y.releaseCanvas(d._canvas),e}finally{this._isUnderCache=!1,this._clearSelfAndDescendantCache(kg),p.restore(),d._releaseIsolationCanvas()}return l&&(p.save(),p.beginPath(),p.rect(0,0,a,o),p.closePath(),p.setAttr(`strokeStyle`,`red`),p.setAttr(`lineWidth`,5),p.stroke(),p.restore()),this._canvasCache={scene:d,filter:f,hit:null,hitConfig:{pixelRatio:u,width:a,height:o},x:r,y:i},this._clearSelfAndDescendantCache(),this._requestDraw(),this}_getCachedHitCanvas(e){if(e===this)return null;let t=this._getCanvasCache();if(!t)return null;if(t.hit)return t.hit;let n=new ag(t.hitConfig);n.isCache=!0;let r=n.getContext();return r.save(),r.translate(-t.x,-t.y),this.drawHit(n,this),r.restore(),t.hit=n,n}isCached(){return!!this._canvasCache}getClientRect(e){throw Error(`abstract "getClientRect" method call`)}_getCachedSceneRect(e){let t=e._forDrawing&&!this._isUnderCache&&this._getCanvasCache();if(!t)return;let n={x:t.x,y:t.y,width:t.scene.width/t.scene.pixelRatio,height:t.scene.height/t.scene.pixelRatio};return e.skipTransform?n:this._transformedRect(n,e.relativeTo)}_transformedRect(e,t){return this.getAbsoluteTransform(t)._getTransformedRect(e)}_drawCachedSceneCanvas(e){e.save(),e._applyOpacity(this),e._applyGlobalCompositeOperation(this);let t=this._getCanvasCache();e.translate(t.x,t.y);let n=this._getCachedSceneCanvas(),r=n.pixelRatio;e.drawImage(n._canvas,0,0,n.width/r,n.height/r),e.restore()}_drawCachedHitCanvas(e,t){let n=this._getCanvasCache();e.save(),e.translate(n.x,n.y),e.drawImage(t._canvas,0,0,t.width/t.pixelRatio,t.height/t.pixelRatio),e.restore()}_getCachedSceneCanvas(){let e=this.filters(),t=this._getCanvasCache(),n=t.scene,r=t.filter,i=r.getContext(),a,o,s,c;if(!e||e.length===0)return n;if(this._filterUpToDate)return r;let l=`filter`in i._context&&e.every(e=>typeof e==`string`),u=n.pixelRatio;if(r.setSizeIfChanged(n._logicalWidth,n._logicalHeight),l){let t=e.join(` `).replace(/url\((?:[^()"']|"[^"]*"|'[^']*')*\)|"[^"]*"|'[^']*'|([-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?)(px|em|rem|ex|ch|cap|ic|lh|rlh|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc)\b/gi,(e,t,n)=>t===void 0?e:`${Number(t)*u}${n}`);return i.clear(),i.save(),i.setAttr(`filter`,t),i.drawImage(n._canvas,0,0,n.getWidth()/u,n.getHeight()/u),i.restore(),this._filterUpToDate=!0,r}try{for(a=e.length,i.clear(),i.drawImage(n._canvas,0,0,n.getWidth()/u,n.getHeight()/u),o=i.getImageData(0,0,r.getWidth(),r.getHeight()),s=0;s<a;s++)c=e[s],typeof c==`string`&&(c=Eg(c)),c.call(this,o,u);i.putImageData(o,0,0)}catch(e){Y.error(`Unable to apply filter. `+e.message+` This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.`)}return this._filterUpToDate=!0,r}on(...e){this._prepareListeners();let t=e[0],n=e[1];if(e[2],e.length===3)return this._delegate.apply(this,e);let r=t.split(Rg);for(let e=0;e<r.length;e++){let t=r[e].split(`.`),i=t[0],a=t[1]||``;this.eventListeners[i]||(this.eventListeners[i]=[]),this.eventListeners[i].push({name:a,handler:n})}return this}_prepareListeners(){this===this.constructor.prototype&&(this.hasOwnProperty(`eventListeners`)||(this.eventListeners={}),e.protoListenerMap=new WeakMap)}off(e,t){this._prepareListeners();let n=(e||``).split(Rg),r=n.length,i,a,o,s,c,l;if(!e)for(a in this.eventListeners)this._off(a);for(i=0;i<r;i++)if(o=n[i],s=o.split(`.`),c=s[0],l=s[1],c)this.eventListeners[c]&&this._off(c,l,t);else for(a in this.eventListeners)this._off(a,l,t);return this}dispatchEvent(e){let t={target:this,type:e.type,evt:e};return this.fire(e.type,t),this}addEventListener(e,t){return this.on(e,function(e){t.call(this,e.evt)}),this}removeEventListener(e){return this.off(e),this}_delegate(e,t,n){let r=this,i=qg(t);return this.on(e,function(e){let t=e,a=e.target.findAncestors(i,!0,r);for(let t=0;t<a.length;t++)e=Y.cloneObject(e),e.currentTarget=a[t],n.call(a[t],e);e.cancelBubble&&(t.cancelBubble=!0)}),this}remove(){return this.isDragging()&&this.stopDrag(),og._dragElements.delete(this._id),og._dragElements.forEach((e,t)=>{this.isAncestorOf(e.node)&&og._dragElements.delete(t)}),this._remove(),this}_clearCaches(){this._clearSelfAndDescendantCache(Ag),this._clearSelfAndDescendantCache(kg),this._clearSelfAndDescendantCache(zg),this._clearSelfAndDescendantCache(Hg),this._clearSelfAndDescendantCache(Pg)}_remove(){let e=this.getParent();e&&e.children&&(e.children.splice(this.index,1),e._setChildrenIndices(),this.parent=null),this._clearCaches()}destroy(){return this._fire(`destroy`,{target:this}),pg(this),this.remove(),this.clearCache(),this}getAttr(e){let t=`get`+Y._capitalize(e);return Y._isFunction(this[t])?this[t]():this.attrs[e]}getAncestors(){let e=this.getParent(),t=[];for(;e;)t.push(e),e=e.getParent();return t}getAttrs(){return this.attrs||{}}setAttrs(e){return this._batchTransformChanges(()=>{let t,n;if(!e)return this;for(t in e)t!==Mg&&(n=Ig+Y._capitalize(t),Y._isFunction(this[n])?this[n](e[t]):this._setAttr(t,e[t]))}),this}isListening(){return this._getCache(Pg,this._isListening)}_isListening(e){if(!this.listening())return!1;let t=this.getParent();return t&&t!==e&&this!==e?t._isListening(e):!0}isVisible(){return this._getCache(Hg,this._isVisible)}_isVisible(e){if(!this.visible())return!1;let t=this.getParent();return t&&t!==e&&this!==e?t._isVisible(e):!0}shouldDrawHit(e){return e?this._isVisible(e)&&this._isListening(e):this.isListening()&&this.isVisible()}show(){return this.visible(!0),this}hide(){return this.visible(!1),this}getZIndex(){return this.index||0}getAbsoluteZIndex(){let e=this.getDepth(),t=this,n=0,r,i,a,o;function s(c){for(r=[],i=c.length,a=0;a<i;a++)o=c[a],n++,o.nodeType!==Lg&&(r=r.concat(o.children)),o._id===t._id&&(a=i);r.length>0&&r[0].getDepth()<=e&&s(r)}let c=this.getStage();return t.nodeType!==Vg&&c&&s(c.children),n}getDepth(){let e=0,t=this.parent;for(;t;)e++,t=t.parent;return e}_batchTransformChanges(t){this._batchingTransformChange?t():e._updateBatch(()=>{this._batchingTransformChange=!0;try{t()}finally{this._batchingTransformChange=!1,this._needClearTransformCache&&(this._needClearTransformCache=!1,this._clearCache(Bg),this._clearSelfAndDescendantCache(Ag))}})}setPosition(e){return this._batchTransformChanges(()=>{this.x(e.x),this.y(e.y)}),this}getPosition(){return{x:this.x(),y:this.y()}}getRelativePointerPosition(){let e=this.getStage();if(!e)return null;let t=e.getPointerPosition();if(!t)return null;let n=this.getAbsoluteTransform().copy();return n.invert(),n.point(t)}getAbsolutePosition(e){let t=this.getAbsoluteTransform(e).getMatrix(),n=new dh,r=this.offset();return n.m=t.slice(),n.translate(r.x,r.y),n.getTranslation()}setAbsolutePosition(e){let{x:t,y:n,...r}=this._clearTransform();this.attrs.x=t,this.attrs.y=n,this._clearCache(Bg);let i=this._getAbsoluteTransform().copy(),a=i.isInvertible();i.invert(),i.translate(e.x,e.y);let{x:o,y:s}=i.getTranslation();return this._setTransform(r),a?this.setPosition({x:this.attrs.x+o,y:this.attrs.y+s}):Y.warn(`Cannot set the absolute position: the absolute transform is not invertible (an ancestor has a zero scale).`),this._clearCache(Bg),this._clearSelfAndDescendantCache(Ag),this}_setTransform(e){let t;for(t in e)this.attrs[t]=e[t]}_clearTransform(){let e={x:this.x(),y:this.y(),rotation:this.rotation(),scaleX:this.scaleX(),scaleY:this.scaleY(),offsetX:this.offsetX(),offsetY:this.offsetY(),skewX:this.skewX(),skewY:this.skewY()};return this.attrs.x=0,this.attrs.y=0,this.attrs.rotation=0,this.attrs.scaleX=1,this.attrs.scaleY=1,this.attrs.offsetX=0,this.attrs.offsetY=0,this.attrs.skewX=0,this.attrs.skewY=0,e}move(e){let t=e.x,n=e.y,r=this.x(),i=this.y();return t!==void 0&&(r+=t),n!==void 0&&(i+=n),this.setPosition({x:r,y:i}),this}rotate(e){return this.rotation(this.rotation()+e),this}moveToTop(){if(!this.parent)return Y.warn(`Node has no parent. moveToTop function is ignored.`),!1;let e=this.index;return e<this.parent.children.length-1&&(this.parent.children.splice(e,1),this.parent.children.push(this),this.parent._setChildrenIndices(),!0)}moveUp(){if(!this.parent)return Y.warn(`Node has no parent. moveUp function is ignored.`),!1;let e=this.index;return e<this.parent.children.length-1&&(this.parent.children.splice(e,1),this.parent.children.splice(e+1,0,this),this.parent._setChildrenIndices(),!0)}moveDown(){if(!this.parent)return Y.warn(`Node has no parent. moveDown function is ignored.`),!1;let e=this.index;return e>0&&(this.parent.children.splice(e,1),this.parent.children.splice(e-1,0,this),this.parent._setChildrenIndices(),!0)}moveToBottom(){if(!this.parent)return Y.warn(`Node has no parent. moveToBottom function is ignored.`),!1;let e=this.index;return e>0&&(this.parent.children.splice(e,1),this.parent.children.unshift(this),this.parent._setChildrenIndices(),!0)}setZIndex(e){if(!this.parent)return Y.warn(`Node has no parent. zIndex parameter is ignored.`),this;(e<0||e>=this.parent.children.length)&&Y.warn(`Unexpected value `+e+` for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to `+(this.parent.children.length-1)+`.`);let t=this.index;return this.parent.children.splice(t,1),this.parent.children.splice(e,0,this),this.parent._setChildrenIndices(),this}getAbsoluteOpacity(){return this._getCache(kg,this._getAbsoluteOpacity)}_getAbsoluteOpacity(){let e=this.opacity(),t=this.getParent();return t&&!t._isUnderCache&&(e*=t.getAbsoluteOpacity()),e}moveTo(e){return this.getParent()!==e&&(this._remove(),e.add(this)),this}toObject(){let e=this.getAttrs(),t,n,r,i={attrs:{},className:this.getClassName()};for(t in e)n=e[t],n instanceof Oh&&(n=Array.from(n)),r=Y.isObject(n)&&!Y._isPlainObject(n)&&!Y._isArray(n),r||(this[`get`+Y._capitalize(t)]?._def!==n||t===`brightness`||t===`threshold`)&&(i.attrs[t]=t===`filters`&&Y._isArray(n)?n.filter(e=>typeof e==`string`):Y.isObject(n)?Y._prepareToStringify(n):n);return i}toJSON(){return JSON.stringify(this.toObject())}getParent(){return this.parent}findAncestors(e,t,n){let r=[],i=qg(e);t&&i(this)&&r.push(this);let a=this.parent;for(;a;){if(a===n)return r;i(a)&&r.push(a),a=a.parent}return r}isAncestorOf(e){return!1}findAncestor(e,t,n){return this.findAncestors(e,t,n)[0]}_isMatch(e){return qg(e)(this)}getLayer(){let e=this.getParent();return e?e.getLayer():null}getStage(){return this._getCache(zg,this._getStage)}_getStage(){let e=this.getParent();return e?e.getStage():null}fire(e,t,n){return t||={},t.target=t.target||this,n?this._fireAndBubble(e,t):this._fire(e,t),this}getAbsoluteTransform(e){return e||this._hasCachedAncestor()?this._getAbsoluteTransform(e):this._getCache(Ag,this._getCachedAbsoluteTransform)}_hasCachedAncestor(){let e=this.parent;for(;e;){if(e.isCached())return!0;e=e.parent}return!1}_getAbsoluteTransform(e){let t=new dh;return this===e?t:(this.parent&&this.parent!==e&&this.parent.getAbsoluteTransform(e).copyInto(t),this._multiplyOwnTransform(t))}_getCachedAbsoluteTransform(){let e=this._cache[Ag]||new dh;return this.parent?this.parent.getAbsoluteTransform().copyInto(e):e.reset(),this._multiplyOwnTransform(e),e.dirty=!1,e}_multiplyOwnTransform(e){let t=this.transformsEnabled();if(t===`all`)e.multiply(this.getTransform());else if(t===`position`){let t=this.attrs.x||0,n=this.attrs.y||0,r=this.attrs.offsetX||0,i=this.attrs.offsetY||0;e.translate(t-r,n-i)}return e}getAbsoluteScale(e){let t=this;for(;t;)t._isUnderCache&&(e=t),t=t.getParent();let n=this.getAbsoluteTransform(e).decompose();return{x:n.scaleX,y:n.scaleY}}getAbsoluteRotation(){return this.getAbsoluteTransform().decompose().rotation}getTransform(){return this._getCache(Bg,this._getTransform)}_getTransform(){let e=this._cache[Bg]||new dh;e.reset();let t=this.x(),n=this.y(),r=J.getAngle(this.rotation()),i=this.attrs.scaleX??1,a=this.attrs.scaleY??1,o=this.attrs.skewX||0,s=this.attrs.skewY||0,c=this.attrs.offsetX||0,l=this.attrs.offsetY||0;return(t!==0||n!==0)&&e.translate(t,n),r!==0&&e.rotate(r),(o!==0||s!==0)&&e.skew(o,s),(i!==1||a!==1)&&e.scale(i,a),(c!==0||l!==0)&&e.translate(-1*c,-1*l),e.dirty=!1,e}clone(e){let t=Y.cloneObject(this.attrs),n,r,i,a,o;for(n in e)t[n]=e[n];let s=new this.constructor(t);for(n in this.eventListeners)for(r=this.eventListeners[n],i=r.length,a=0;a<i;a++)o=r[a],o.name.indexOf(Ng)<0&&(s.eventListeners[n]||(s.eventListeners[n]=[]),s.eventListeners[n].push(o));return s}_toKonvaCanvas(e){e||={};let t=e.x===void 0||e.y===void 0||!e.width||!e.height?this.getClientRect():{x:0,y:0,width:0,height:0};isFinite(t.x+t.y+t.width+t.height)||Y.error(`Cannot find the bounds of the node to export, its client rect is ${t.x}, ${t.y}, ${t.width}x${t.height}. Check its position, size and points.`);let n=this.getStage(),r=e.x===void 0?Math.floor(t.x):e.x,i=e.y===void 0?Math.floor(t.y):e.y,a=e.pixelRatio||1,o=new ig({width:e.width||Math.max(0,Math.ceil(t.x+t.width-r))||(n?n.width():0),height:e.height||Math.max(0,Math.ceil(t.y+t.height-i))||(n?n.height():0),pixelRatio:a}),s=o.getContext();return e.imageSmoothingEnabled===!1&&(s._context.imageSmoothingEnabled=!1),s.save(),(r||i)&&s.translate(-1*r,-1*i),this.drawScene(o),s.restore(),o._releaseIsolationCanvas(),o}toCanvas(e){return this._toKonvaCanvas(e)._canvas}toDataURL(e){e||={};let t=e.mimeType||null,n=e.quality??null,r=this._toKonvaCanvas(e).toDataURL(t,n);return e.callback&&e.callback(r),r}toImage(e){return new Promise((t,n)=>{try{let{callback:r,...i}=e||{};Y._urlToImage(this.toDataURL(i),function(e){t(e),r?.(e)},n)}catch(e){n(e)}})}toBlob(e){return new Promise((t,n)=>{let r=r=>{var i;r?(t(r),(i=e?.callback)==null||i.call(e,r)):n(Error(`Konva: toBlob() failed, the canvas was not encoded`))};try{let t=this.toCanvas(e);t.convertToBlob?t.convertToBlob({type:e?.mimeType,quality:e?.quality}).then(r,n):t.toBlob(r,e?.mimeType,e?.quality)}catch(e){n(e)}})}setSize(e){return this.width(e.width),this.height(e.height),this}getSize(){return{width:this.width(),height:this.height()}}getClassName(){return this.className||this.nodeType}getType(){return this.nodeType}getDragDistance(){return this.attrs.dragDistance===void 0?this.parent?this.parent.getDragDistance():J.dragDistance:this.attrs.dragDistance}_off(e,t,n){let r=this.eventListeners[e],i,a,o;for(i=0;i<r.length;i++)if(a=r[i].name,o=r[i].handler,(a!==`konva`||t===`konva`)&&(!t||a===t)&&(!n||n===o)){if(r.splice(i,1),r.length===0){delete this.eventListeners[e];break}i--}}_fireChangeEvent(e,t,n){this._fire(e+jg,{oldVal:t,newVal:n})}addName(e){if(!this.hasName(e)){let t=this.name(),n=t?t+` `+e:e;this.name(n)}return this}hasName(e){if(!e)return!1;let t=this.name();if(!t)return!1;let n=t.indexOf(e);for(;n!==-1;){let r=n+e.length;if((n===0||Gg.test(t[n-1]))&&(r===t.length||Gg.test(t[r])))return!Gg.test(e);n=t.indexOf(e,n+1)}return!1}removeName(e){let t=(this.name()||``).split(/\s/g),n=t.indexOf(e);return n!==-1&&(t.splice(n,1),this.name(t.join(` `))),this}setAttr(e,t){let n=this[Ig+Y._capitalize(e)];return Y._isFunction(n)?n.call(this,t):this._setAttr(e,t),this}_addSubtreeObserver(t){(this._subtreeObservers??=new Set).add(t),e._subtreeObserverCount++}_removeSubtreeObserver(t){this._subtreeObservers?.delete(t)&&e._subtreeObserverCount--}_notifySubtreeChange(){if(e._subtreeObserverCount)for(let e=this;e;e=e.parent){let t=e._subtreeObservers;if(t)for(let n of t)n._onSubtreeChange(e)}}_requestDraw(){var e;(e=this.parent)==null||e._notifySubtreeChange(),J.autoDrawEnabled&&(this.getLayer()||this.getStage())?.batchDraw()}_setAttr(e,t){let n=this.attrs[e];(n!==t||Y.isObject(t))&&(t==null?delete this.attrs[e]:this.attrs[e]=t,this._attrsVersion!==void 0&&this._attrsVersion++,this._shouldFireChangeEvents&&this._fireChangeEvent(e,n,t),this._requestDraw())}_fireAndBubble(e,t,n){t&&this.nodeType===Lg&&(t.target=this);let r=Fg.indexOf(e)!==-1;if(!(r&&(n&&(this===n||this.isAncestorOf&&this.isAncestorOf(n))||this.nodeType===`Stage`&&!n))){this._fire(e,t);let i=r&&n&&n.isAncestorOf&&n.isAncestorOf(this)&&!n.isAncestorOf(this.parent);(t&&!t.cancelBubble||!t)&&this.parent&&this.parent.isListening()&&!i&&(n&&n.parent?this._fireAndBubble.call(this.parent,e,t,n):this._fireAndBubble.call(this.parent,e,t))}}_getProtoListeners(t){let n=Object.getPrototypeOf(this),r=e.protoListenerMap.get(n);r||(r={},e.protoListenerMap.set(n,r));let i=r[t];if(i===void 0){i=[];let e=new Set,n=Object.getPrototypeOf(this);for(;n;){let r=n.eventListeners?.[t]??[];for(let t=0;t<r.length;t++){let n=r[t];e.has(n)||(e.add(n),i.push(n))}n=Object.getPrototypeOf(n)}r[t]=i}return i}_fire(e,t){t||={},t.currentTarget=this,t.type=e;let n=this._getProtoListeners(e);if(n)for(let e=0;e<n.length;e++)n[e].handler.call(this,t);let r=this.eventListeners[e];if(r){let n=r.slice(),i=n.length;for(let e=0;e<n.length;e++)n[e].handler.call(this,t);let a=this.eventListeners[e];if(a)for(let e=i;e<a.length;e++)a[e].handler.call(this,t)}}draw(){return this.drawScene(),this.drawHit(),this}_createDragElement(e){let t=e?e.pointerId:void 0,n=this.getStage(),r=this.getAbsolutePosition();if(!n)return;let i=n._getPointerById(t)||n._changedPointerPositions[0]||r,a=e?.evt?.type?Y._getEventType(e.evt.type):n._pointerEventType,o=a!==`pointer`;og._dragElements.set(this._id,{node:this,startPointerPos:i,offset:{x:i.x-r.x,y:i.y-r.y},dragStatus:`ready`,pointerId:o?t??(`id`in i?i.id:void 0):void 0,pointerEventType:o?a:void 0,startEvent:e})}startDrag(e,t=!0){var n;og._dragElements.has(this._id)||this._createDragElement(e);let r=og._dragElements.get(this._id);r&&(r.dragStatus=`dragging`,(n=this.getStage())==null||n._cancelClick(r.pointerId,r.pointerEventType),this.fire(`dragstart`,{type:`dragstart`,target:this,evt:r.startEvent&&r.startEvent.evt||e&&e.evt},t))}_setDragPosition(e,t){let n=this.getStage()._getPointerById(t.pointerId);if(!n)return;let r={x:n.x-t.offset.x,y:n.y-t.offset.y},i=this.dragBoundFunc();if(i!==void 0){let t=i.call(this,r,e);if(!t)Y.warn(`dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.`);else if(!Y._isNumber(t.x)||!Y._isNumber(t.y)){Y.warn(`dragBoundFunc returned a position with a non-finite x or y (${t.x}, ${t.y}). The node was not moved.`);return}else r=t}let a=t.lastPos;a&&a.x===r.x&&a.y===r.y||(this.setAbsolutePosition(r),this._requestDraw()),t.lastPos=r}stopDrag(e){let t=og._dragElements.get(this._id);t&&(t.dragStatus=`stopped`,og._endDragBefore(e,void 0,t),og._endDragAfter(e,t))}setDraggable(e){this._setAttr(`draggable`,e),this._dragChange()}isDragging(){let e=og._dragElements.get(this._id);return e?e.dragStatus===`dragging`:!1}_listenDrag(){this._dragCleanup(),this.on(`mousedown.konva touchstart.konva`,function(e){if(!(e.evt.button===void 0||J.dragButtons.indexOf(e.evt.button)>=0)||og._dragElements.has(this._id))return;let t=!1;og._dragElements.forEach(e=>{this.isAncestorOf(e.node)&&(t=!0)}),t||this._createDragElement(e)})}_dragChange(){if(this.attrs.draggable)this._listenDrag();else{if(this._dragCleanup(),!this.getStage())return;let e=og._dragElements.get(this._id),t=e&&e.dragStatus===`dragging`,n=e&&e.dragStatus===`ready`;t?this.stopDrag():n&&og._dragElements.delete(this._id)}}_dragCleanup(){this.off(`mousedown.konva`),this.off(`touchstart.konva`)}isClientRectOnScreen(e={x:0,y:0}){let t=this.getStage();if(!t)return!1;let n={x:-e.x,y:-e.y,width:t.width()+2*e.x,height:t.height()+2*e.y};return Y.haveIntersection(n,this.getClientRect())}static create(e,t){return Y._isString(e)&&(e=JSON.parse(e)),this._createNode(e,t)}static _createNode(t,n){let r=e.prototype.getClassName.call(t),i=t.children,a,o,s;if(n&&(t.attrs.container=n),!J[r]){let e=i?`Group`:`Shape`;Y.warn(`Can not find a node with class name "`+r+`". Fallback to "${e}".`),r=e}if(a=new J[r](t.attrs),i)for(o=i.length,s=0;s<o;s++)a.add(e._createNode(i[s]));return a}};Q._subtreeObserverCount=0,Q._updateBatchDepth=0,Q._pendingUpdates=new Set,Q.protoListenerMap=new WeakMap,Q.prototype.nodeType=`Node`,Q.prototype._attrsAffectingSize=[],Q.prototype.on(Ug,function(){this._batchingTransformChange?this._needClearTransformCache=!0:(this._clearCache(Bg),this._clearSelfAndDescendantCache(Ag))}),Q.prototype.on(`visibleChange.konva`,function(){this._clearSelfAndDescendantCache(Hg)}),Q.prototype.on(`listeningChange.konva`,function(){this._clearSelfAndDescendantCache(Pg);for(let e=this.getParent();e;e=e.getParent()){let t=e._getCanvasCache();t?.hit&&(Y.releaseCanvas(t.hit._canvas),t.hit=null)}}),Q.prototype.on(`opacityChange.konva`,function(){this._clearSelfAndDescendantCache(kg)});var Jg=Z.addGetterSetter;Jg(Q,`zIndex`),Jg(Q,`absolutePosition`),Jg(Q,`position`),Jg(Q,`x`,0,X()),Jg(Q,`y`,0,X()),Jg(Q,`globalCompositeOperation`,`source-over`,yg()),Jg(Q,`opacity`,1,X()),Jg(Q,`name`,``,yg()),Jg(Q,`id`,``,yg()),Jg(Q,`rotation`,0,X()),Z.addComponentsGetterSetter(Q,`scale`,[`x`,`y`]),Jg(Q,`scaleX`,1,X()),Jg(Q,`scaleY`,1,X()),Z.addComponentsGetterSetter(Q,`skew`,[`x`,`y`]),Jg(Q,`skewX`,0,X()),Jg(Q,`skewY`,0,X()),Z.addComponentsGetterSetter(Q,`offset`,[`x`,`y`]),Jg(Q,`offsetX`,0,X()),Jg(Q,`offsetY`,0,X()),Jg(Q,`dragDistance`,void 0,X()),Jg(Q,`width`,0,X()),Jg(Q,`height`,0,X()),Jg(Q,`listening`,!0,Sg()),Jg(Q,`preventDefault`,!0,Sg()),Jg(Q,`filters`,void 0,function(e){return this._filterUpToDate=!1,e}),Jg(Q,`visible`,!0,Sg()),Jg(Q,`transformsEnabled`,`all`,yg()),Jg(Q,`size`),Jg(Q,`dragBoundFunc`),Jg(Q,`draggable`,!1,Sg()),Z.backCompat(Q,{rotateDeg:`rotate`,setRotationDeg:`setRotation`,getRotationDeg:`getRotation`});var Yg=class extends Q{constructor(){super(...arguments),this.children=[]}getChildren(e){let t=this.children||[];return e?t.filter(e):t.slice()}hasChildren(){return this.children.length>0}removeChildren(){return this._clearChildren(`remove`)}destroyChildren(){return this._clearChildren(`destroy`)}_clearChildren(e){return Q._updateBatch(()=>(this.children.forEach(t=>{t.parent=null,t.index=0,t[e]()}),this.children=[],this._notifySubtreeChange(),this._requestDraw(),this))}add(...e){if(e.length===0)return this;if(e.length>1){for(let t=0;t<e.length;t++)this.add(e[t]);return this}let t=e[0];return t.getParent()?(t.moveTo(this),this):(this._validateAdd(t),t.index=this.children.length,t.parent=this,t._clearCaches(),this.children.push(t),this._fire(`add`,{child:t}),this._notifySubtreeChange(),this._requestDraw(),this)}destroy(){return this.hasChildren()&&this.destroyChildren(),super.destroy(),this}find(e){return this._generalFind(e,!1)}findOne(e){let t=this._generalFind(e,!0);return t.length>0?t[0]:void 0}_generalFind(e,t){let n=[],r=qg(e);return this._descendants(e=>{let i=r(e);return i&&n.push(e),!!(i&&t)}),n}_descendants(e){let t=!1;for(let n of this.children)if(t=e(n),t||n.hasChildren()&&(t=n._descendants(e),t))return!0;return!1}toObject(){let e=Q.prototype.toObject.call(this);return e.children=[],this.children.forEach(t=>{e.children.push(t.toObject())}),e}isAncestorOf(e){let t=e.getParent();for(;t;){if(t._id===this._id)return!0;t=t.getParent()}return!1}clone(e){let t=Q.prototype.clone.call(this,e);return this.children.forEach(function(e){t.add(e.clone())}),t}getAllIntersections(e){let t=[];return this.find(`Shape`).forEach(n=>{n.isVisible()&&n.intersects(e)&&t.push(n)}),t}_clearSelfAndDescendantCache(e){var t;let n=e===void 0||e===`absoluteTransform`;n&&Q._updateBatchDepth++;try{if(super._clearSelfAndDescendantCache(e),e===`absoluteTransform`&&this.isCached())return;(t=this.children)==null||t.forEach(function(t){t._clearSelfAndDescendantCache(e)})}finally{n&&--Q._updateBatchDepth===0&&Q._flushUpdateBatch()}}_setChildrenIndices(){var e;(e=this.children)==null||e.forEach(function(e,t){e.index=t}),this._notifySubtreeChange(),this._requestDraw()}drawScene(e,t){let n=this.getLayer(),r=e||n&&n.getCanvas(),i=r&&r.getContext(),a=this._getCanvasCache(),o=a&&a.scene,s=t===this;if(!(t?this._isVisible(t):this.isVisible())&&!s)return this;if(o){i.save();let e=this.getAbsoluteTransform(t).getMatrix();i.transform(e[0],e[1],e[2],e[3],e[4],e[5]),this._drawCachedSceneCanvas(i),i.restore()}else this._drawChildren(`drawScene`,r,t);return this}drawHit(e,t){if(!this.shouldDrawHit(t))return this;let n=this.getLayer(),r=e||n&&n.hitCanvas,i=r&&r.getContext(),a=this._getCachedHitCanvas(t);if(a){i.save();let e=this.getAbsoluteTransform(t).getMatrix();i.transform(e[0],e[1],e[2],e[3],e[4],e[5]),this._drawCachedHitCanvas(i,a),i.restore()}else this._drawChildren(`drawHit`,r,t);return this}_drawChildren(e,t,n){let r=t&&t.getContext(),i=this.clipWidth(),a=this.clipHeight(),o=this.clipFunc(),s=typeof i==`number`&&typeof a==`number`||o,c=n===this;if(s){r.save();let e=this.getAbsoluteTransform(n),t=e.getMatrix();r.transform(t[0],t[1],t[2],t[3],t[4],t[5]),r.beginPath();let s;if(o)s=o.call(this,r,this);else{let e=this.clipX(),t=this.clipY();r.rect(e||0,t||0,i,a)}r.clip.apply(r,s),t=e.copy().invert().getMatrix(),r.transform(t[0],t[1],t[2],t[3],t[4],t[5])}let l=!c&&this.globalCompositeOperation()!==`source-over`&&e===`drawScene`;l&&(r.save(),r._applyGlobalCompositeOperation(this));try{this._drawChildNodes(e,t,n)}finally{l&&r.restore(),s&&r.restore()}}_drawChildNodes(e,t,n){var r;(r=this.children)==null||r.forEach(function(r){r[e](t,n)})}getClientRect(e={}){var t;let n=this._getCachedSceneRect(e);if(n)return n;let r=e.skipTransform,i=e.relativeTo,[a,o,s,c]=this.getAbsoluteTransform().getMatrix(),l=!r&&(e._forDrawing||a*c-o*s===0),u,d,f,p,m={x:1/0,y:1/0,width:0,height:0},h=this;return(t=this.children)==null||t.forEach(function(t){if(!t.visible())return;let n=t.getClientRect({relativeTo:l?i:h,_forDrawing:e._forDrawing,skipShadow:e.skipShadow,skipStroke:e.skipStroke});n.width===0&&n.height===0||!isFinite(n.x+n.y+n.width+n.height)||(u===void 0?(u=n.x,d=n.y,f=n.x+n.width,p=n.y+n.height):(u=Math.min(u,n.x),d=Math.min(d,n.y),f=Math.max(f,n.x+n.width),p=Math.max(p,n.y+n.height)))}),m=u===void 0?{x:0,y:0,width:0,height:0}:{x:u,y:d,width:f-u,height:p-d},!r&&!l?this._transformedRect(m,i):m}};Z.addComponentsGetterSetter(Yg,`clip`,[`x`,`y`,`width`,`height`]),Z.addGetterSetter(Yg,`clipX`,void 0,X()),Z.addGetterSetter(Yg,`clipY`,void 0,X()),Z.addGetterSetter(Yg,`clipWidth`,void 0,X()),Z.addGetterSetter(Yg,`clipHeight`,void 0,X()),Z.addGetterSetter(Yg,`clipFunc`);var Xg=`Stage`,Zg=`string`,Qg=`px`,$g=`mouseout`,e_=`mouseleave`,t_=`mouseover`,n_=`mouseenter`,r_=`mousemove`,i_=`mousedown`,a_=`mouseup`,o_=`pointermove`,s_=`pointerdown`,c_=`pointerup`,l_=`pointercancel`,u_=`lostpointercapture`,d_=`pointerout`,f_=`pointerleave`,p_=`pointerover`,m_=`pointerenter`,h_=`contextmenu`,g_=`touchstart`,__=`touchend`,v_=`touchmove`,y_=`touchcancel`,b_=`wheel`,x_=5,S_=[[n_,`_pointerenter`],[i_,`_pointerdown`],[r_,`_pointermove`],[a_,`_pointerup`],[e_,`_pointerleave`],[g_,`_pointerdown`],[v_,`_pointermove`],[__,`_pointerup`],[y_,`_pointercancel`],[t_,`_pointerover`],[b_,`_wheel`],[h_,`_contextmenu`],[s_,`_pointerdown`],[o_,`_pointermove`],[c_,`_pointerup`],[l_,`_pointercancel`],[f_,`_pointerleave`],[u_,`_lostpointercapture`]],C_={mouse:{[d_]:$g,[f_]:e_,[p_]:t_,[m_]:n_,[o_]:r_,[s_]:i_,[c_]:a_,[l_]:`mousecancel`,pointerclick:`click`,pointerdblclick:`dblclick`},touch:{[d_]:`touchout`,[f_]:`touchleave`,[p_]:`touchover`,[m_]:`touchenter`,[o_]:v_,[s_]:g_,[c_]:__,[l_]:y_,pointerclick:`tap`,pointerdblclick:`dbltap`},pointer:{[d_]:d_,[f_]:f_,[p_]:p_,[m_]:m_,[o_]:o_,[s_]:s_,[c_]:c_,[l_]:l_,pointerclick:`pointerclick`,pointerdblclick:`pointerdblclick`}},w_=e=>{let t=Y._getEventType(e);if(t===`pointer`)return J.pointerEventsEnabled&&C_.pointer;if(t===`touch`)return C_.touch;if(t===`mouse`)return C_.mouse};function T_(e={}){return(e.clipFunc||e.clipWidth||e.clipHeight)&&Y.warn(`Stage does not support clipping. Please use clip for Layers or Groups.`),e}var E_=`Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);`,D_=[],O_=new WeakSet,k_=e=>{e&&!O_.has(e)&&(O_.add(e),og._listenToWindow(e),e.document.addEventListener(`visibilitychange`,()=>{D_.forEach(e=>{e.batchDraw()})}))},A_=class extends Yg{constructor(e){super(T_(e)),this._pointerPositions=[],this._changedPointerPositions=[],this._pointerStates=new Map,this._lastClicks={},this._buildDOM(),this._bindContentEvents(),D_.push(this),this.on(`widthChange.konva heightChange.konva`,this._resizeDOM),this.on(`visibleChange.konva`,this._checkVisibility),this.on(`clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva`,()=>{T_(this.attrs)}),this._checkVisibility()}_validateAdd(e){let t=e.getType()===`Layer`,n=e.getType()===`FastLayer`;t||n||Y.throw(`You may only add layers to the stage.`)}_checkVisibility(){if(!this.content)return;let e=this.visible()?``:`none`;this.content.style.display=e}_getOwnerWindow(){return(this.content||this.container())?.ownerDocument?.defaultView||(J.isBrowser?window:null)}setContainer(e){if(typeof e===Zg){let t;if(e.charAt(0)===`.`){let t=e.slice(1);e=document.getElementsByClassName(t)[0]}else t=e.charAt(0)===`#`?e.slice(1):e,e=document.getElementById(t);if(!e)throw`Can not find container in document with id `+t}return this._setAttr(`container`,e),this.content&&(this.content.parentElement&&this.content.parentElement.removeChild(this.content),e.appendChild(this.content),k_(this._getOwnerWindow())),this}shouldDrawHit(){return!0}clear(){let e=this.children,t=e.length;for(let n=0;n<t;n++)e[n].clear();return this}clone(e){return e||={},e.container=typeof document<`u`&&document.createElement(`div`),Yg.prototype.clone.call(this,e)}destroy(){var e;super.destroy(),this._pointerStates.clear(),this._lastClicks={};let t=this.content;(e=t?.parentNode)==null||e.removeChild(t);let n=D_.indexOf(this);return n>-1&&D_.splice(n,1),Y.releaseCanvas(this.bufferHitCanvas._canvas),this}getPointerPosition(){let e=this._pointerPositions[0]||this._changedPointerPositions[0];return e?{x:e.x,y:e.y}:(Y.warn(E_),null)}_getPointerById(e){return this._pointerPositions.find(t=>t.id===e)}getPointersPositions(){return this._pointerPositions}getStage(){return this}getContent(){return this.content}_toKonvaCanvas(e){e={...e},e.x=e.x||0,e.y=e.y||0,e.width=e.width||this.width(),e.height=e.height||this.height();let t=new ig({width:e.width,height:e.height,pixelRatio:e.pixelRatio||1}),n=t.getContext()._context,r=this.children;return(e.x||e.y)&&n.translate(-1*e.x,-1*e.y),r.forEach(function(t){if(!t.isVisible())return;let r=t._toKonvaCanvas(e);n.drawImage(r._canvas,e.x,e.y,r.getWidth()/r.getPixelRatio(),r.getHeight()/r.getPixelRatio()),Y.releaseCanvas(r._canvas)}),t}getIntersection(e){if(!e)return null;let t=this.children,n=t.length-1;for(let r=n;r>=0;r--){let n=t[r].getIntersection(e);if(n)return n}return null}_resizeDOM(){let e=this.width(),t=this.height();this.content&&(this.content.style.width=e+Qg,this.content.style.height=t+Qg),this.children.forEach(n=>{n._setSize({width:e,height:t}),n.draw()})}add(e,...t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}super.add(e);let n=this.children.length;return n>x_&&Y.warn(`The stage has `+n+` layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.`),e._setSize({width:this.width(),height:this.height()}),e.draw(),J.isBrowser&&this.content.appendChild(e.canvas._canvas),this}getParent(){return null}getLayer(){return null}hasPointerCapture(e){return dg(e,this)}setPointerCapture(e){fg(e,this)}releaseCapture(e){mg(e,this)}getLayers(){return this.getChildren()}_bindContentEvents(){J.isBrowser&&S_.forEach(([e,t])=>{this.content.addEventListener(e,e=>{this._batchEvents(()=>this[t](e))},{passive:!1})})}_batchEvents(e){Y._batchEvents(this.eventBatchFunc(),e)}_pointerenter(e){this.setPointersPositions(e);let t=w_(e.type);t&&this._fire(t.pointerenter,{evt:e,target:this,currentTarget:this})}_pointerover(e){this.setPointersPositions(e);let t=w_(e.type);t&&this._fire(t.pointerover,{evt:e,target:this,currentTarget:this})}_pointerEventsEnabled(){if(J.hitOnDragEnabled)return!0;for(let{node:e,dragStatus:t}of og._dragElements.values())if(t===`dragging`&&e.getStage()===this)return!1;return!this.getLayers().some(e=>J.Transformer?._isLayerTransforming(e))}_cancelClick(e,t){let n=t?[t]:[`mouse`,`touch`,`pointer`];for(let t of n){let n=this._pointerStates.get(`${t}:${e}`);n&&(n.clickStartShape=void 0,n.relatedPointer&&(n.relatedPointer.clickStartShape=void 0))}}_pointerleave(e){let t=w_(e.type),n=Y._getEventType(e.type);if(!t)return;this.setPointersPositions(e);let r=this._changedPointerPositions[0]?.id,i=`${n}:${r}`,a=this._pointerStates.get(i),o=(a?.targetShape)?.getStage()===this?a.targetShape:void 0,s=this._pointerEventsEnabled()||e.pointerType===`touch`&&!a?.downPosition;s&&(a?.clickStartShape===void 0?this._pointerStates.delete(i):a.targetShape=void 0),o&&s?(o._fireAndBubble(t.pointerout,{evt:e,pointerId:r}),o._fireAndBubble(t.pointerleave,{evt:e,pointerId:r}),this._fire(t.pointerleave,{evt:e,target:this,currentTarget:this})):s&&(this._fire(t.pointerleave,{evt:e,target:this,currentTarget:this}),this._fire(t.pointerout,{evt:e,target:this,currentTarget:this})),this.pointerPos=null,this._pointerPositions=[],this._changedPointerPositions=[],this._pointerEventType=void 0}_pointerdown(e){let t=w_(e.type),n=Y._getEventType(e.type);if(!t)return;this.setPointersPositions(e);let r=!1;this._changedPointerPositions.forEach(i=>{let a=this.getIntersection(i),o=`${n}:${i.id}`,s={targetShape:this._pointerStates.get(o)?.targetShape,clickStartShape:a&&a.isListening()?a:null,lastClick:this._lastClicks[n],downPosition:i,pointerType:e.pointerType};if(this._pointerStates.delete(o),n!==`pointer`){for(let[e,t]of[...this._pointerStates].reverse())if(!(!e.startsWith(`pointer:`)||!t.downPosition||n===`touch`&&t.relatedPointer)&&(n===`mouse`?t.pointerType!==`touch`:t.pointerType===`touch`&&t.downPosition.x===i.x&&t.downPosition.y===i.y)){s.relatedPointer=t,t.relatedPointer=s,t.clickStartShape===void 0&&(s.clickStartShape=void 0);break}}this._pointerStates.set(o,s);for(let e of og._dragElements.values())e.dragStatus===`dragging`&&(e.pointerId===void 0||e.pointerEventType===n&&e.pointerId===i.id||e.pointerEventType===`mouse`&&n===`pointer`&&s.pointerType!==`touch`)&&e.node.getStage()===this&&(e.pointerId===void 0&&n!==`pointer`&&(e.pointerId=i.id,e.pointerEventType=n),this._cancelClick(i.id,n));if(!a||!a.isListening())return;J.capturePointerEventsEnabled&&a.setPointerCapture(i.id),a._fireAndBubble(t.pointerdown,{evt:e,pointerId:i.id}),r=!0;let c=e.type.indexOf(`touch`)>=0;a.preventDefault()&&e.cancelable&&c&&e.preventDefault()}),r||this._fire(t.pointerdown,{evt:e,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id})}_pointermove(e){let t=w_(e.type),n=Y._getEventType(e.type);if(!t)return;let r=e.type.indexOf(`touch`)>=0||e.pointerType===`touch`;if(e.cancelable&&r){for(let{node:t,dragStatus:n}of og._dragElements.values())if(n===`dragging`&&t.getStage()===this&&t.preventDefault()){e.preventDefault();break}}if(this.setPointersPositions(e),!this._pointerEventsEnabled())return;let i={},a=!1;this._changedPointerPositions.forEach(r=>{let o=`${n}:${r.id}`,s=this._pointerStates.get(o);s||(s={},this._pointerStates.set(o,s));let c=lg(r.id)||this.getIntersection(r),l=s.targetShape===c||s.targetShape?.getStage()===this?s.targetShape:void 0,u=r.id,d={evt:e,pointerId:u},f=l!==c;s.targetShape=c&&c.isListening()?c:void 0,f&&l&&(l._fireAndBubble(t.pointerout,{...d},c),l._fireAndBubble(t.pointerleave,{...d},c)),c&&c.isListening()?(a=!0,f&&(c._fireAndBubble(t.pointerover,{...d},l),c._fireAndBubble(t.pointerenter,{...d},l)),i[c._id]||(i[c._id]=!0,c._fireAndBubble(t.pointermove,{...d}))):l&&this._fire(t.pointerover,{evt:e,target:this,currentTarget:this,pointerId:u})}),a||this._fire(t.pointermove,{evt:e,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id})}_pointerup(e){let t=w_(e.type),n=Y._getEventType(e.type);if(!t)return;this.setPointersPositions(e);let r={},i=!1;this._changedPointerPositions.forEach(a=>{let o=`${n}:${a.id}`,s=this._pointerStates.get(o),c=s?.clickStartShape!==void 0,l=s?.clickStartShape;s?.targetShape&&n!==`touch`?this._pointerStates.set(o,{targetShape:s.targetShape}):this._pointerStates.delete(o);let u=lg(a.id)||this.getIntersection(a),d=u&&r[u._id];u&&(u.releaseCapture(a.id),r[u._id]=!0);let f=a.id,p={evt:e,pointerId:f},m=u&&u.isListening()?u:null,h=this._lastClicks[n],g=c&&(!m||l===m),_=g&&h&&s?.lastClick===h&&h.shape===m&&Date.now()-h.time<J.dblClickWindow;g&&(this._lastClicks[n]=_?void 0:{shape:m,time:Date.now()}),u&&u.isListening()?(i=!0,d||u._fireAndBubble(t.pointerup,{...p}),c&&l===u&&(u._fireAndBubble(t.pointerclick,{...p}),_&&u._fireAndBubble(t.pointerdblclick,{...p}))):(i||=(this._fire(t.pointerup,{evt:e,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id}),!0),c&&this._fire(t.pointerclick,{evt:e,target:this,currentTarget:this,pointerId:f}),_&&this._fire(t.pointerdblclick,{evt:e,target:this,currentTarget:this,pointerId:f})),n===`touch`&&(s?.targetShape)?.getStage()===this&&(s.targetShape._fireAndBubble(t.pointerout,{...p}),s.targetShape._fireAndBubble(t.pointerleave,{...p}))}),i||this._fire(t.pointerup,{evt:e,target:this,currentTarget:this,pointerId:this._changedPointerPositions[0].id}),e.cancelable&&n!==`touch`&&n!==`pointer`&&e.preventDefault()}_contextmenu(e){this.setPointersPositions(e);let t=this.getIntersection(this.getPointerPosition());t&&t.isListening()?t._fireAndBubble(h_,{evt:e}):this._fire(h_,{evt:e,target:this,currentTarget:this})}_wheel(e){this.setPointersPositions(e);let t=this.getIntersection(this.getPointerPosition());t&&t.isListening()?t._fireAndBubble(b_,{evt:e}):this._fire(b_,{evt:e,target:this,currentTarget:this})}_pointercancel(e){this.setPointersPositions(e);let t=w_(e.type);this._changedPointerPositions.forEach(n=>{let r=Y._getEventType(e.type),i=`${r}:${n.id}`;this._cancelClick(n.id,r);let a=this._pointerStates.get(i)?.targetShape;a&&r!==`touch`?this._pointerStates.set(i,{targetShape:a}):this._pointerStates.delete(i);let o=lg(n.id)||this.getIntersection(n),s={evt:e,pointerId:n.id};o?(t&&o._fireAndBubble(t.pointercancel,{...s}),o._fireAndBubble(c_,{...s})):t&&this._fire(t.pointercancel,{...s,target:this,currentTarget:this}),mg(n.id),t&&r===`touch`&&a?.getStage()===this&&(a._fireAndBubble(t.pointerout,{...s}),a._fireAndBubble(t.pointerleave,{...s}))})}_lostpointercapture(e){lg(e.pointerId,this)&&mg(e.pointerId)}setPointersPositions(e){let t=this._getContentPosition(),n=null,r=null;e||=window.event,e.touches===void 0?(this._pointerEventType=e.pointerId===void 0?`mouse`:`pointer`,n=(e.clientX-t.left)/t.scaleX,r=(e.clientY-t.top)/t.scaleY,this.pointerPos={x:n,y:r},this._pointerPositions=[{x:n,y:r,id:Y._getFirstPointerId(e)}],this._changedPointerPositions=[{x:n,y:r,id:Y._getFirstPointerId(e)}]):(this._pointerEventType=`touch`,this._pointerPositions=[],this._changedPointerPositions=[],Array.prototype.forEach.call(e.touches,e=>{this._pointerPositions.push({id:e.identifier,x:(e.clientX-t.left)/t.scaleX,y:(e.clientY-t.top)/t.scaleY})}),Array.prototype.forEach.call(e.changedTouches||e.touches,e=>{this._changedPointerPositions.push({id:e.identifier,x:(e.clientX-t.left)/t.scaleX,y:(e.clientY-t.top)/t.scaleY})}))}_setPointerPosition(e){Y.warn(`Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.`),this.setPointersPositions(e)}_getContentPosition(){if(!this.content||!this.content.getBoundingClientRect)return{top:0,left:0,scaleX:1,scaleY:1};let e=this.content.getBoundingClientRect();return{top:e.top,left:e.left,scaleX:e.width/this.content.clientWidth||1,scaleY:e.height/this.content.clientHeight||1}}_buildDOM(){if(this.bufferHitCanvas=new ag({pixelRatio:1,width:0,height:0}),!J.isBrowser)return;let e=this.container();if(!e)throw`Stage has no container. A container is required.`;e.innerHTML=``,this.content=e.ownerDocument.createElement(`div`),this.content.style.position=`relative`,this.content.style.userSelect=`none`,this.content.className=`konvajs-content`,this.content.setAttribute(`role`,`presentation`),e.appendChild(this.content),k_(this._getOwnerWindow()),this._resizeDOM()}cache(){return Y.warn(`Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.`),this}clearCache(){return this}batchDraw(){var e;return(e=this.children)==null||e.forEach(function(e){e.batchDraw()}),this}};A_.prototype.nodeType=Xg,ch(A_),Z.addGetterSetter(A_,`container`),Z.addGetterSetter(A_,`eventBatchFunc`);var j_=`hasShadow`,M_=`hasFill`,N_=`hasStroke`,P_=`shadowRGBA`,F_=`patternImage`,I_=`linearGradient`,L_=`radialGradient`,R_={};function z_(e){let t=this.attrs.fillRule;t?e.fill(t):e.fill()}var B_=1e-6;function V_(e){e.stroke()}function H_(){this._clearCache(j_)}function U_(){this._clearCache(M_)}function W_(){this._clearCache(N_)}function G_(){this._clearCache(P_)}function K_(){this._clearCache(F_)}function q_(){this._clearCache(I_)}function J_(){this._clearCache(L_)}var $=class e extends Q{constructor(e){super(e);let t,n=0;for(;t=Y.getHitColor(),!t||t in R_;)if(n++,n>=1e4){Y.warn(`Failed to find a unique color key for a shape. Konva may work incorrectly. Most likely your browser is using canvas farbling. Consider disabling it.`),t=Y.getRandomColor();break}this.colorKey=t,R_[t]=this}getContext(){return Y.warn(`shape.getContext() method is deprecated. Please do not use it.`),this.getLayer().getContext()}getCanvas(){return Y.warn(`shape.getCanvas() method is deprecated. Please do not use it.`),this.getLayer().getCanvas()}getSceneFunc(){return this.attrs.sceneFunc||this._sceneFunc}getHitFunc(){return this.attrs.hitFunc||this._hitFunc}hasShadow(){return this._getCache(j_,this._hasShadow)}_hasShadow(){return this.shadowEnabled()&&this.shadowOpacity()!==0&&!!(this.shadowColor()||this.shadowBlur()||this.shadowOffsetX()||this.shadowOffsetY())}_getFillType(e=this.fill()){let t=this.fillPriority();if(e&&t===`color`)return`color`;let n=this.fillPatternImage();if(n&&t===`pattern`)return`pattern`;let r=this.fillLinearGradientColorStops();if(r&&t===`linear-gradient`)return`linear-gradient`;let i=this.fillRadialGradientColorStops();if(i&&t===`radial-gradient`)return`radial-gradient`;if(e)return`color`;if(n)return`pattern`;if(r)return`linear-gradient`;if(i)return`radial-gradient`}_toStyleSpace(e){return this._styleTransform?this._styleTransform.point(e):e}_getFillPattern(){let e=this._getCache(F_,this._createFillPattern);return e&&this._setFillPatternTransform(e)}_createFillPattern(){if(this.fillPatternImage())return Uh().createPattern(this.fillPatternImage(),this.fillPatternRepeat()||`repeat`)}_setFillPatternTransform(e){if(e.setTransform){let t=this._styleTransform?.copy()||new dh;t.translate(this.fillPatternX(),this.fillPatternY()),t.rotate(J.getAngle(this.fillPatternRotation())),t.scale(this.fillPatternScaleX(),this.fillPatternScaleY()),t.translate(-1*this.fillPatternOffsetX(),-1*this.fillPatternOffsetY()),e.setTransform(Y.createDOMMatrix(t.getMatrix()))}return e}_getLinearGradient(){return this._styleTransform?this.__getLinearGradient():this._getCache(I_,this.__getLinearGradient)}__getLinearGradient(){let e=this.fillLinearGradientColorStops();if(e){let t=Uh(),n=this._toStyleSpace(this.fillLinearGradientStartPoint()),r=this._toStyleSpace(this.fillLinearGradientEndPoint()),i=t.createLinearGradient(n.x,n.y,r.x,r.y);for(let t=0;t<e.length;t+=2)i.addColorStop(e[t],e[t+1]);return i}}_getRadialGradient(){return this._styleTransform?this.__getRadialGradient():this._getCache(L_,this.__getRadialGradient)}__getRadialGradient(e=1){let t=this.fillRadialGradientColorStops();if(t){let n=Uh(),r=this._toStyleSpace(this.fillRadialGradientStartPoint()),i=this._toStyleSpace(this.fillRadialGradientEndPoint()),a=n.createRadialGradient(i.x+(r.x-i.x)*e,i.y+(r.y-i.y)*e,this.fillRadialGradientStartRadius()*e,i.x,i.y,this.fillRadialGradientEndRadius()*e);for(let e=0;e<t.length;e+=2)a.addColorStop(t[e],t[e+1]);return a}}getShadowRGBA(){return this._getCache(P_,this._getShadowRGBA)}_getShadowRGBA(){if(!this.hasShadow())return;let e=Y.colorToRGBA(this.shadowColor());if(e)return`rgba(`+e.r+`,`+e.g+`,`+e.b+`,`+e.a*(this.shadowOpacity()||1)+`)`}hasFill(){return this._getCache(M_,this._hasFill)}_hasFill(){return this.fillEnabled()&&!!(this.fill()||this.fillPatternImage()||this.fillLinearGradientColorStops()||this.fillRadialGradientColorStops())}hasStroke(){return this._getCache(N_,this._hasStroke)}_hasStroke(){return this.strokeEnabled()&&!!(this.strokeWidth()&&(this.stroke()||this.strokeLinearGradientColorStops()))}hasHitStroke(){let e=this.hitStrokeWidth();return e===`auto`?this.hasStroke():this.strokeEnabled()&&!!e}intersects(e){let t=this.getStage();if(!t)return!1;let n=t.bufferHitCanvas;return n.setSizeIfChanged(t.width(),t.height()),n.getContext().clear(),this.drawHit(n),n.context.getImageData(Math.floor(e.x),Math.floor(e.y),1,1).data[3]>0}destroy(){return Q.prototype.destroy.call(this),delete R_[this.colorKey],delete this.colorKey,this}_useBufferCanvas(e,t=this.getAbsoluteOpacity()){if(!(this.attrs.perfectDrawEnabled??!0))return!1;let n=e||this.hasFill(),r=this.hasStroke(),i=!this._isUnderCache&&t!==1;if(n&&r&&i)return!0;let a=this.hasShadow(),o=this.shadowForStrokeEnabled();return!!(n&&r&&a&&o)}setStrokeHitEnabled(e){Y.warn(`strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.`),e?this.hitStrokeWidth(`auto`):this.hitStrokeWidth(0)}getStrokeHitEnabled(){return this.hitStrokeWidth()!==0}getSelfRect(){let e=this.attrs.selfRectFunc;if(e)return{...e.call(this,this)};let t=this.size();return{x:this._centroid?-t.width/2:0,y:this._centroid?-t.height/2:0,width:t.width,height:t.height}}_getSelfRectForDrawing(){return this.getSelfRect()}getClientRect(e={}){let t=this._getCachedSceneRect(e);if(t)return t;let n=e.skipTransform,r=e.relativeTo,i=e._forDrawing,a=i?this._getSelfRectForDrawing():this.getSelfRect();i&&!this.strokeScaleEnabled()?a=this._transformedRect(a,r):(a.width<0||a.height<0)&&(a=new dh()._getTransformedRect(a));let o=!e.skipStroke&&this.hasStroke()?i?this._getStrokePadding()*2:this.strokeWidth():0,s=o,c=o,l;if(!i&&o&&!this.strokeScaleEnabled()){let e=this;for(;e&&!e.isCached()&&!e._isUnderCache;)e=e.parent;let[t,i,a,o]=this.getAbsoluteTransform(e).getMatrix(),u=Math.abs(t*o-i*a);if(u)s*=Math.hypot(a,o)/u,c*=Math.hypot(t,i)/u;else if(!n&&(s=c=0,l=e?e.getAbsoluteTransform().copy():new dh,r)){let e=r.getAbsoluteTransform(),[t,n,i,a]=e.getMatrix();l=t*a-n*i?e.copy().invert().multiply(l):new dh}}let u={x:a.x-s/2,y:a.y-c/2,width:a.width+s,height:a.height+c};if(i&&this.strokeScaleEnabled()&&(u=this._transformedRect(u,r)),!e.skipShadow&&this.hasShadow()){let e=i?this.getAbsoluteScale():{x:1,y:1},t=this.shadowOffsetX()*e.x,n=this.shadowOffsetY()*e.y,r=this.shadowBlur()*(i?2*Math.min(Math.abs(e.x),Math.abs(e.y)):1);u.x+=Math.min(0,t)-r,u.y+=Math.min(0,n)-r,u.width+=Math.abs(t)+r*2,u.height+=Math.abs(n)+r*2}if(i)return u;if(!n){let e=this._transformedRect(u,r);if(l){let[t,n,r,i]=l.getMatrix(),a=o*Math.hypot(t,r)/2,s=o*Math.hypot(n,i)/2;e.x-=a,e.y-=s,e.width+=a*2,e.height+=s*2}return e}return u}_getStrokePadding(e=this.miterLimit()||10){return this.attrs.sceneFunc&&(e=this.miterLimit()||10),Math.abs(this.strokeWidth())/2*Math.max(this.lineCap()===`square`?Math.SQRT2:1,(this.lineJoin()||`miter`)===`miter`?e:1)}drawScene(t,n){let r=this.getLayer(),i=t||r.getCanvas(),a=i.getContext(),o=this._getCanvasCache(),s=this.getSceneFunc(),c=this.hasShadow(),l=n===this;if(!(n?this._isVisible(n):this.isVisible())&&!l)return this;if(o){a.save();let e=this.getAbsoluteTransform(n).getMatrix();return a.transform(e[0],e[1],e[2],e[3],e[4],e[5]),this._drawCachedSceneCanvas(a),a.restore(),this}if(!s)return this;a.save();try{if(i.width&&i.height&&this._useBufferCanvas(void 0,a._getOpacity(this))){let t=!!a._opacityRoot||!!this.attrs.selfRectFunc&&this.getSelfRect===e.prototype.getSelfRect||!this.attrs.sceneFunc&&!this.attrs.charRenderFunc&&sh.has(this.constructor),r=i._prepareIsolationCanvas(t?this.getClientRect({_forDrawing:!0,relativeTo:n,skipShadow:!0}):void 0),o=r.getContext();o.save(),o._applyLineJoin(this),o._applyMiterLimit(this);let u=this.getAbsoluteTransform(n).getMatrix();o.transform(u[0],u[1],u[2],u[3],u[4],u[5]),s.call(this,o,this),o.restore(),c&&a._applyShadow(this),l||(a._applyOpacity(this),a._applyGlobalCompositeOperation(this)),a._drawDeviceBuffer(r)}else{if(a._applyLineJoin(this),a._applyMiterLimit(this),!l){let e=this.getAbsoluteTransform(n).getMatrix();a.transform(e[0],e[1],e[2],e[3],e[4],e[5]),a._applyOpacity(this),a._applyGlobalCompositeOperation(this)}c&&a._applyShadow(this),s.call(this,a,this)}}catch(e){throw i._releaseIsolationCanvas(),e}finally{a.restore()}return this}drawHit(e,t){if(!this.shouldDrawHit(t))return this;let n=this.getLayer(),r=e||n.hitCanvas,i=r&&r.getContext(),a=this.hitFunc()||this.sceneFunc(),o=this._getCachedHitCanvas(t);if(this.colorKey||Y.warn(`Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()`),o){i.save();let e=this.getAbsoluteTransform(t).getMatrix();return i.transform(e[0],e[1],e[2],e[3],e[4],e[5]),this._drawCachedHitCanvas(i,o),i.restore(),this}if(!a)return this;if(i.save(),i._applyLineJoin(this),i._applyMiterLimit(this),this!==t){let e=this.getAbsoluteTransform(t).getMatrix();i.transform(e[0],e[1],e[2],e[3],e[4],e[5])}try{a.call(this,i,this)}finally{i.restore()}return this}drawHitFromCache(e=0){let t=this._getCachedSceneCanvas(),n=this._getCachedHitCanvas(),r=n.getContext(),i=n.getWidth(),a=n.getHeight();r.clear(),r.drawImage(t._canvas,0,0,i/n.pixelRatio,a/n.pixelRatio);try{let t=r.getImageData(0,0,i,a),n=t.data,o=n.length,s=Y._hexToRgb(this.colorKey);for(let t=0;t<o;t+=4)n[t+3]>e?(n[t]=s.r,n[t+1]=s.g,n[t+2]=s.b,n[t+3]=255):n[t+3]=0;r.putImageData(t,0,0)}catch(e){Y.error(`Unable to draw hit graph from cached scene canvas. `+e.message)}return this}hasPointerCapture(e){return dg(e,this)}setPointerCapture(e){fg(e,this)}releaseCapture(e){mg(e,this)}};$.prototype._fillFunc=function(e){let t=this.fillRadialGradientScaleX(),n=this.fillRadialGradientScaleY();if(t===1&&n===1||this._getFillType()!==`radial-gradient`){z_.call(this,e);return}let r=Math.min(Math.abs(t),Math.abs(n));e.save();try{if(r<B_){let t=this.fillRadialGradientColorStops();e.setAttr(`fillStyle`,t[t.length-1])}else{let i=t/r,a=n/r,{x:o,y:s}=this.fillRadialGradientEndPoint();e.transform(i,0,0,a,o-i*o,s-a*s),r!==1&&e.setAttr(`fillStyle`,this.__getRadialGradient(r))}z_.call(this,e)}finally{e.restore()}},$.prototype._strokeFunc=V_,$.prototype._fillFuncHit=z_,$.prototype._strokeFuncHit=V_,$.prototype._centroid=!1,$.prototype.nodeType=`Shape`,ch($),$.prototype.on(`shadowColorChange.konva shadowBlurChange.konva shadowOffsetXChange.konva shadowOffsetYChange.konva shadowOpacityChange.konva shadowEnabledChange.konva`,H_),$.prototype.on(`shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva`,G_),$.prototype.on(`fillEnabledChange.konva fillChange.konva fillPatternImageChange.konva fillLinearGradientColorStopsChange.konva fillRadialGradientColorStopsChange.konva`,U_),$.prototype.on(`strokeEnabledChange.konva strokeWidthChange.konva strokeChange.konva strokeLinearGradientColorStopsChange.konva`,W_),$.prototype.on(`fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva`,K_),$.prototype.on(`fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva`,q_),$.prototype.on(`fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva`,J_),Z.addGetterSetter($,`stroke`,void 0,bg()),Z.addGetterSetter($,`strokeWidth`,2,X()),Z.addGetterSetter($,`fillAfterStrokeEnabled`,!1),Z.addGetterSetter($,`hitStrokeWidth`,`auto`,vg()),Z.addGetterSetter($,`strokeHitEnabled`,!0,Sg()),Z.addGetterSetter($,`perfectDrawEnabled`,!0,Sg()),Z.addGetterSetter($,`shadowForStrokeEnabled`,!0,Sg()),Z.addGetterSetter($,`lineJoin`),Z.addGetterSetter($,`lineCap`),Z.addGetterSetter($,`miterLimit`),Z.addGetterSetter($,`sceneFunc`),Z.addGetterSetter($,`hitFunc`),Z.addGetterSetter($,`selfRectFunc`),Z.addGetterSetter($,`dash`),Z.addGetterSetter($,`dashOffset`,0,X()),Z.addGetterSetter($,`shadowColor`,void 0,yg()),Z.addGetterSetter($,`shadowBlur`,0,X()),Z.addGetterSetter($,`shadowOpacity`,1,X()),Z.addComponentsGetterSetter($,`shadowOffset`,[`x`,`y`]),Z.addGetterSetter($,`shadowOffsetX`,0,X()),Z.addGetterSetter($,`shadowOffsetY`,0,X()),Z.addGetterSetter($,`fillPatternImage`),Z.addGetterSetter($,`fill`,void 0,bg()),Z.addGetterSetter($,`fillPatternX`,0,X()),Z.addGetterSetter($,`fillPatternY`,0,X()),Z.addGetterSetter($,`fillLinearGradientColorStops`),Z.addGetterSetter($,`strokeLinearGradientColorStops`),Z.addGetterSetter($,`fillRadialGradientStartRadius`,0),Z.addGetterSetter($,`fillRadialGradientEndRadius`,0),Z.addGetterSetter($,`fillRadialGradientColorStops`),Z.addComponentsGetterSetter($,`fillRadialGradientScale`,[`x`,`y`]),Z.addGetterSetter($,`fillRadialGradientScaleX`,1,X()),Z.addGetterSetter($,`fillRadialGradientScaleY`,1,X()),Z.addGetterSetter($,`fillPatternRepeat`,`repeat`),Z.addGetterSetter($,`fillEnabled`,!0),Z.addGetterSetter($,`strokeEnabled`,!0),Z.addGetterSetter($,`shadowEnabled`,!0),Z.addGetterSetter($,`dashEnabled`,!0),Z.addGetterSetter($,`strokeScaleEnabled`,!0),Z.addGetterSetter($,`fillPriority`,`color`),Z.addComponentsGetterSetter($,`fillPatternOffset`,[`x`,`y`]),Z.addGetterSetter($,`fillPatternOffsetX`,0,X()),Z.addGetterSetter($,`fillPatternOffsetY`,0,X()),Z.addComponentsGetterSetter($,`fillPatternScale`,[`x`,`y`]),Z.addGetterSetter($,`fillPatternScaleX`,1,X()),Z.addGetterSetter($,`fillPatternScaleY`,1,X()),Z.addComponentsGetterSetter($,`fillLinearGradientStartPoint`,[`x`,`y`]),Z.addComponentsGetterSetter($,`strokeLinearGradientStartPoint`,[`x`,`y`]),Z.addGetterSetter($,`fillLinearGradientStartPointX`,0),Z.addGetterSetter($,`strokeLinearGradientStartPointX`,0),Z.addGetterSetter($,`fillLinearGradientStartPointY`,0),Z.addGetterSetter($,`strokeLinearGradientStartPointY`,0),Z.addComponentsGetterSetter($,`fillLinearGradientEndPoint`,[`x`,`y`]),Z.addComponentsGetterSetter($,`strokeLinearGradientEndPoint`,[`x`,`y`]),Z.addGetterSetter($,`fillLinearGradientEndPointX`,0),Z.addGetterSetter($,`strokeLinearGradientEndPointX`,0),Z.addGetterSetter($,`fillLinearGradientEndPointY`,0),Z.addGetterSetter($,`strokeLinearGradientEndPointY`,0),Z.addComponentsGetterSetter($,`fillRadialGradientStartPoint`,[`x`,`y`]),Z.addGetterSetter($,`fillRadialGradientStartPointX`,0),Z.addGetterSetter($,`fillRadialGradientStartPointY`,0),Z.addComponentsGetterSetter($,`fillRadialGradientEndPoint`,[`x`,`y`]),Z.addGetterSetter($,`fillRadialGradientEndPointX`,0),Z.addGetterSetter($,`fillRadialGradientEndPointY`,0),Z.addGetterSetter($,`fillPatternRotation`,0),Z.addGetterSetter($,`fillRule`,void 0,yg()),Z.backCompat($,{dashArray:`dash`,getDashArray:`getDash`,setDashArray:`setDash`,drawFunc:`sceneFunc`,getDrawFunc:`getSceneFunc`,setDrawFunc:`setSceneFunc`,drawHitFunc:`hitFunc`,getDrawHitFunc:`getHitFunc`,setDrawHitFunc:`setHitFunc`});var Y_=`beforeDraw`,X_=`draw`,Z_=10,Q_=256;function $_(e,t){return e[t+3]>=128?R_[Y.getHitColorKey(e[t],e[t+1],e[t+2])]:void 0}var e1=class extends Yg{constructor(e){super(e),this.canvas=new ig,this.hitCanvas=new ag({pixelRatio:1}),this._waitingForDraw=!1,this.on(`visibleChange.konva`,this._checkVisibility),this._checkVisibility(),this.on(`imageSmoothingEnabledChange.konva`,this._setSmoothEnabled),this._setSmoothEnabled()}createPNGStream(){return this.canvas._canvas.createPNGStream()}getCanvas(){return this.canvas}getNativeCanvasElement(){return this.canvas._canvas}getHitCanvas(){return this.hitCanvas}getContext(){return this.getCanvas().getContext()}clear(e){return this.getContext().clear(e),this.getHitCanvas().getContext().clear(e),this}setZIndex(e){super.setZIndex(e);let t=this.getStage();return t&&t.content&&(t.content.removeChild(this.getNativeCanvasElement()),e<t.children.length-1?t.content.insertBefore(this.getNativeCanvasElement(),t.children[e+1].getCanvas()._canvas):t.content.appendChild(this.getNativeCanvasElement())),this}moveToTop(){Q.prototype.moveToTop.call(this);let e=this.getStage();return e&&e.content&&(e.content.removeChild(this.getNativeCanvasElement()),e.content.appendChild(this.getNativeCanvasElement())),!0}moveUp(){if(!Q.prototype.moveUp.call(this))return!1;let e=this.getStage();return!e||!e.content?!1:(e.content.removeChild(this.getNativeCanvasElement()),this.index<e.children.length-1?e.content.insertBefore(this.getNativeCanvasElement(),e.children[this.index+1].getCanvas()._canvas):e.content.appendChild(this.getNativeCanvasElement()),!0)}moveDown(){if(Q.prototype.moveDown.call(this)){let e=this.getStage();if(e){let t=e.children;e.content&&(e.content.removeChild(this.getNativeCanvasElement()),e.content.insertBefore(this.getNativeCanvasElement(),t[this.index+1].getCanvas()._canvas))}return!0}return!1}moveToBottom(){if(Q.prototype.moveToBottom.call(this)){let e=this.getStage();if(e){let t=e.children;e.content&&(e.content.removeChild(this.getNativeCanvasElement()),e.content.insertBefore(this.getNativeCanvasElement(),t[1].getCanvas()._canvas))}return!0}return!1}getLayer(){return this}remove(){var e,t;super.remove();let n=this.getNativeCanvasElement(),r=this.getHitCanvas()._canvas;return(e=n.parentNode)==null||e.removeChild(n),(t=r.parentNode)==null||t.removeChild(r),this}getStage(){return this.parent}_setSize({width:e,height:t}){return this.canvas.setSize(e,t),this._syncHitCanvasSize(),this._setSmoothEnabled(),this}_syncHitCanvasSize(){let e=this.isListening();this.hitCanvas.setSizeIfChanged((e?this.getWidth():0)||0,(e?this.getHeight():0)||0)}_validateAdd(e){let t=e.getType();t!==`Group`&&t!==`Shape`&&Y.throw(`You may only add groups and shapes to a layer.`)}_toKonvaCanvas(e){return e={...e},e.width=e.width||this.getWidth(),e.height=e.height||this.getHeight(),e.x=e.x===void 0?this.x():e.x,e.y=e.y===void 0?this.y():e.y,Q.prototype._toKonvaCanvas.call(this,e)}_checkVisibility(){this.visible()?this.canvas._canvas.style.display=`block`:this.canvas._canvas.style.display=`none`}_setSmoothEnabled(){this.getContext()._context.imageSmoothingEnabled=this.imageSmoothingEnabled()}getWidth(){if(this.parent)return this.parent.width()}setWidth(){Y.warn(`Can not change width of layer. Use "stage.width(value)" function instead.`)}getHeight(){if(this.parent)return this.parent.height()}setHeight(){Y.warn(`Can not change height of layer. Use "stage.height(value)" function instead.`)}batchDraw(){return this._waitingForDraw||(this._waitingForDraw=!0,Y.requestAnimFrame(()=>{this._waitingForDraw=!1,this.draw()},this.getStage()?._getOwnerWindow())),this}getIntersection(e){if(!this.isListening()||!this.isVisible())return null;let t=this._getIntersection(e);if(t.shape)return t.shape;if(!t.antialiased)return null;let n=this.hitCanvas.pixelRatio,r=Math.floor(e.x*n),i=Math.floor(e.y*n),a=e=>this.hitCanvas.context.getImageData(r-e,i-e,e*2+1,e*2+1).data,o=Z_,s=o*2+1,c=a(o),l=c[(o*s+o)*4+3];for(let e=1;e<=Q_;e++){e>o&&(o=Math.min(Q_,o*2),s=o*2+1,c=a(o));let t=0;for(let n=-e;n<=e;n++){let r=Math.abs(n)===e?1:e*2;for(let i=-e;i<=e;i+=r){let e=((n+o)*s+i+o)*4,r=$_(c,e);if(r)return r;t=Math.max(t,c[e+3])}}if(t<=l&&t!==255)return null;l=t}return null}_getIntersection(e){if(!this.hitCanvas.width||!this.hitCanvas.height)return{};let t=this.hitCanvas.pixelRatio,n=this.hitCanvas.context.getImageData(Math.floor(e.x*t),Math.floor(e.y*t),1,1).data,r=$_(n,0);return r?{shape:r}:n[3]>0?{antialiased:!0}:{}}drawScene(e,t){let n=this.getLayer(),r=e||n&&n.getCanvas();return this._fire(Y_,{node:this}),this.clearBeforeDraw()&&r.getContext().clear(),Yg.prototype.drawScene.call(this,r,t),r._trimIsolationCanvas(),this._fire(X_,{node:this}),this}shouldDrawHit(e){if(!super.shouldDrawHit(e))return!1;if(e||J.hitOnDragEnabled)return!0;let t=!1;return og._dragElements.forEach(e=>{e.dragStatus===`dragging`&&(e.node===this.getStage()||e.node.getLayer()===this)&&(t=!0)}),!t&&!J.Transformer?._isLayerTransforming(this)}drawHit(e,t){let n=this.getLayer(),r=e||n&&n.hitCanvas;return!e&&n&&(n._syncHitCanvasSize(),n.clearBeforeDraw()&&n.getHitCanvas().getContext().clear()),Yg.prototype.drawHit.call(this,r,t),this}enableHitGraph(){return this.hitGraphEnabled(!0),this}disableHitGraph(){return this.hitGraphEnabled(!1),this}setHitGraphEnabled(e){Y.warn(`hitGraphEnabled method is deprecated. Please use layer.listening() instead.`),this.listening(e)}getHitGraphEnabled(e){return Y.warn(`hitGraphEnabled method is deprecated. Please use layer.listening() instead.`),this.listening()}toggleHitCanvas(){if(!this.parent||!this.parent.content)return;let e=this.parent;this.hitCanvas._canvas.parentNode?e.content.removeChild(this.hitCanvas._canvas):e.content.appendChild(this.hitCanvas._canvas)}destroy(){return this.getCanvas()._releaseIsolationCanvas(),Y.releaseCanvas(this.getNativeCanvasElement(),this.getHitCanvas()._canvas),super.destroy()}};e1.prototype.nodeType=`Layer`,ch(e1),Z.addGetterSetter(e1,`imageSmoothingEnabled`,!0),Z.addGetterSetter(e1,`clearBeforeDraw`,!0),Z.addOverloadedGetterSetter(e1,`hitGraphEnabled`);var t1=class extends e1{constructor(e){super(e),this.listening(!1),Y.warn(`Konva.FastLayer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.`)}};t1.prototype.nodeType=`FastLayer`,ch(t1);var n1=class extends Yg{_validateAdd(e){let t=e.getType();t!==`Group`&&t!==`Shape`&&Y.throw(`You may only add groups and shapes to groups.`)}_drawChildNodes(e,t,n){if(e!==`drawScene`||!this.isolated()||n===this)return super._drawChildNodes(e,t,n);if(!t.width||!t.height)return;let r=t.getContext(),i=t._prepareIsolationCanvas(this.getClientRect({_forDrawing:!0,relativeTo:n})),a=i.getContext();a._opacityRoot=this,r.save();try{super._drawChildNodes(e,i,n),r._applyOpacity(this),r._drawDeviceBuffer(i)}catch(e){throw t._releaseIsolationCanvas(),e}finally{r.restore(),a._opacityRoot=void 0}}};Z.addGetterSetter(n1,`isolated`,!1,Sg()),n1.prototype.nodeType=`Group`,ch(n1);var r1=oh.performance?.now?()=>oh.performance.now():Date.now,i1=class e{constructor(t,n){this.id=e.animIdCounter++,this.frame={time:0,timeDiff:0,lastTime:r1(),frameRate:0},this.func=t,this.setLayers(n)}setLayers(e){return this.layers=e?[].concat(e):[],this}getLayers(){return this.layers}addLayer(e){let t=this.layers,n=t.length;for(let r=0;r<n;r++)if(t[r]._id===e._id)return!1;return this.layers.push(e),!0}isRunning(){return e.animations.has(this)}start(){return this.stop(),this.frame.timeDiff=0,this.frame.lastTime=r1(),e._addAnimation(this),this}stop(){return e._removeAnimation(this),this}_updateFrameObject(e){this.frame.timeDiff=e-this.frame.lastTime,this.frame.lastTime=e,this.frame.time+=this.frame.timeDiff,this.frame.frameRate=1e3/this.frame.timeDiff}static _addAnimation(e){this.animations.add(e),this._handleAnimation()}static _removeAnimation(e){this.animations.delete(e)}static _runFrames(){let e=new Set;Q._updateBatch(()=>{Array.from(this.animations).forEach(t=>{this.animations.has(t)&&(t._updateFrameObject(r1()),t.func&&t.func.call(t,t.frame)===!1||t.layers.forEach(t=>t&&e.add(t)))})}),e.forEach(e=>e.batchDraw())}static _animationLoop(){let t=e;t.animations.size?(t._runFrames(),Y.requestAnimFrame(t._animationLoop)):t.animRunning=!1}static _handleAnimation(){this.animRunning||(this.animRunning=!0,Y.requestAnimFrame(this._animationLoop))}};i1.animations=new Set,i1.animIdCounter=0,i1.animRunning=!1;var a1={node:1,duration:1,easing:1,onFinish:1,onUpdate:1,onReset:1,yoyo:1},o1=1,s1=2,c1=3,l1=[`fill`,`stroke`,`shadowColor`],u1=0;function d1(e){return Y.colorToRGBA(e)||Y.throw(`can not tween the color "`+e+`", because it is not a valid color.`)}function f1(e,t){return{r:t.r-e.r,g:t.g-e.g,b:t.b-e.b,a:t.a-e.a}}function p1(e,t,n){return`rgba(`+Math.round(e.r+t.r*n)+`,`+Math.round(e.g+t.g*n)+`,`+Math.round(e.b+t.b*n)+`,`+(e.a+t.a*n)+`)`}var m1=class{constructor(e,t,n,r,i,a,o){this.prop=e,this.propFunc=t,this.begin=r,this._pos=r,this.duration=a,this._change=0,this.prevPos=0,this.yoyo=o,this._time=0,this._position=0,this._startTime=0,this._finish=0,this.func=n,this._change=i-this.begin,this.pause()}fire(e){let t=this[e];t&&t()}setTime(e){e>this.duration?this.yoyo?(this._time=this.duration,this.reverse()):this.finish():e<0?this.yoyo?(this._time=0,this.play()):this.reset():(this._time=e,this.update())}getTime(){return this._time}setPosition(e){this.prevPos=this._pos,this.propFunc(e),this._pos=e}getPosition(e){return e===void 0&&(e=this._time),this.func(e,this.begin,this._change,this.duration)}play(){this.state=s1,this._startTime=this.getTimer()-this._time,this.fire(`onPlay`),this.onEnterFrame()}reverse(){this.state=c1,this._time=this.duration-this._time,this._startTime=this.getTimer()-this._time,this.fire(`onReverse`),this.onEnterFrame()}seek(e){this.pause(),this._time=e,this.update(),this.fire(`onSeek`)}reset(){this.pause(),this._time=0,this.update(),this.fire(`onReset`)}finish(){this.pause(),this._time=this.duration,this.update(),this.fire(`onFinish`)}update(){this.setPosition(this.getPosition(this._time)),this.fire(`onUpdate`)}onEnterFrame(){let e=this.getTimer()-this._startTime;this.state===s1?this.setTime(e):this.state===c1&&this.setTime(this.duration-e)}pause(){this.state=o1,this.fire(`onPause`)}getTimer(){return Date.now()}},h1=class e{constructor(t){let n=this,r=t.node,i=r._id,a=t.easing||g1.Linear,o=!!t.yoyo,s,c;s=t.duration===void 0?.3:t.duration===0?.001:t.duration,this.node=r,this._id=u1++;let l=r.getLayer()||(r instanceof J.Stage?r.getLayers():null);for(c in l||Y.error("Tween constructor have `node` that is not in a layer. Please add node into layer first."),this.anim=new i1(function(){n.tween.onEnterFrame()},l),this.tween=new m1(c,function(e){n._tweenFunc(e)},a,0,1,s*1e3,o),this._addListeners(),e.attrs[i]||(e.attrs[i]={}),e.attrs[i][this._id]||(e.attrs[i][this._id]={}),e.tweens[i]||(e.tweens[i]={}),t)a1[c]===void 0&&this._addAttr(c,t[c]);this.reset(),this.onFinish=t.onFinish,this.onReset=t.onReset,this.onUpdate=t.onUpdate}_addAttr(t,n){if(Y._isPlainObject(n)){for(let e in n)this._addAttr(t+Y._capitalize(e),n[e]);return}let r=this.node,i=r._id,a,o,s,c,l=e.tweens[i][t];l!==void 0&&delete e.attrs[i][l][t];let u=r.getAttr(t);if(Y._isArray(n)||Y._isArray(u)){if(a=[],c=u,s=n,u=Y._isArray(u)?u.slice():Array(n.length).fill(u||0),Y._isArray(n)||(n=Array(u.length).fill(n)),o=Math.max(n.length,u.length),t===`points`&&n.length!==u.length&&(n.length>u.length?u=Y._prepareArrayForTween(u,n,r.closed()):n=Y._prepareArrayForTween(n,u,r.closed())),t.endsWith(`ColorStops`))for(let e=0;e<o;e++)if(e%2==0)a.push((n[e]||0)-(u[e]||0));else{let t=d1(u[e]);u[e]=t,a.push(f1(t,d1(n[e])))}else for(let e=0;e<o;e++)a.push((n[e]||0)-(u[e]||0))}else l1.indexOf(t)===-1?a=n-u:(u=d1(u),a=f1(u,d1(n)));e.attrs[i][this._id][t]={start:u,diff:a,end:n,trueEnd:s,trueStart:c},e.tweens[i][t]=this._id}_tweenFunc(t){let n=this.node,r=e.attrs[n._id]?.[this._id],i,a,o,s,c,l,u,d;for(i in r){if(a=r[i],o=a.start,s=a.diff,d=a.end,Y._isArray(o)){if(c=[],u=Math.max(o.length,d.length),i.endsWith(`ColorStops`))for(l=0;l<u;l++)l%2==0?c.push((o[l]||0)+s[l]*t):c.push(p1(o[l],s[l],t));else for(l=0;l<u;l++)c.push((o[l]||0)+s[l]*t)}else c=l1.indexOf(i)===-1?o+s*t:p1(o,s,t);n.setAttr(i,c)}}_addListeners(){let t=`destroy.konva-tween${this._id}`,n=()=>this.destroy(),r=()=>{this.node.off(t).on(t,n),this.anim.start()};this.tween.onPlay=r,this.tween.onReverse=r,this.tween.onPause=()=>{this.node.off(t),this.anim.stop()};let i=(t,n)=>{let r=e.attrs[this.node._id]?.[this._id];if(r){for(let e in r)r[e][t]!==void 0&&this.node.setAttr(e,r[e][t]);n?.call(this)}};this.tween.onFinish=()=>i(`trueEnd`,this.onFinish),this.tween.onReset=()=>i(`trueStart`,this.onReset),this.tween.onUpdate=()=>{this.onUpdate&&this.onUpdate.call(this)}}play(){return this.tween.play(),this}reverse(){return this.tween.reverse(),this}reset(){return this.tween.reset(),this}seek(e){return this.tween.seek(e*1e3),this}pause(){return this.tween.pause(),this}finish(){return this.tween.finish(),this}destroy(){let t=this.node._id,n=this._id,r=e.attrs[t]?.[n],i=e.tweens[t];if(this.pause(),this.anim&&this.anim.stop(),r){if(i){for(let e in r)delete i[e];Object.keys(i).length===0&&delete e.tweens[t]}delete e.attrs[t][n],Object.keys(e.attrs[t]).length===0&&delete e.attrs[t]}}};h1.attrs={},h1.tweens={},Q.prototype.to=function(e){let t=e.onFinish,n=new h1({...e,node:this,onFinish(){n.destroy(),t&&t()}});return n.play(),n};var g1={BackEaseIn(e,t,n,r){return n*(e/=r)*e*(2.70158*e-1.70158)+t},BackEaseOut(e,t,n,r){return n*((e=e/r-1)*e*(2.70158*e+1.70158)+1)+t},BackEaseInOut(e,t,n,r){let i=1.70158;return(e/=r/2)<1?n/2*(e*e*(((i*=1.525)+1)*e-i))+t:n/2*((e-=2)*e*(((i*=1.525)+1)*e+i)+2)+t},ElasticEaseIn(e,t,n,r,i,a){let o=0;return e===0?t:(e/=r)===1?t+n:(a||=r*.3,!i||i<Math.abs(n)?(i=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/i),-(i*2**(10*--e)*Math.sin((e*r-o)*(2*Math.PI)/a))+t)},ElasticEaseOut(e,t,n,r,i,a){let o=0;return e===0?t:(e/=r)===1?t+n:(a||=r*.3,!i||i<Math.abs(n)?(i=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/i),i*2**(-10*e)*Math.sin((e*r-o)*(2*Math.PI)/a)+n+t)},ElasticEaseInOut(e,t,n,r,i,a){let o=0;return e===0?t:(e/=r/2)==2?t+n:(a||=.3*1.5*r,!i||i<Math.abs(n)?(i=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/i),e<1?-.5*(i*2**(10*--e)*Math.sin((e*r-o)*(2*Math.PI)/a))+t:i*2**(-10*--e)*Math.sin((e*r-o)*(2*Math.PI)/a)*.5+n+t)},BounceEaseOut(e,t,n,r){return(e/=r)<1/2.75?n*(7.5625*e*e)+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t},BounceEaseIn(e,t,n,r){return n-g1.BounceEaseOut(r-e,0,n,r)+t},BounceEaseInOut(e,t,n,r){return e<r/2?g1.BounceEaseIn(e*2,0,n,r)*.5+t:g1.BounceEaseOut(e*2-r,0,n,r)*.5+n*.5+t},EaseIn(e,t,n,r){return n*(e/=r)*e+t},EaseOut(e,t,n,r){return-n*(e/=r)*(e-2)+t},EaseInOut(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},StrongEaseIn(e,t,n,r){return n*(e/=r)*e*e*e*e+t},StrongEaseOut(e,t,n,r){return n*((e=e/r-1)*e*e*e*e+1)+t},StrongEaseInOut(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t},Linear(e,t,n,r){return n*e/r+t}},_1=Y._assign(J,{beginUpdateBatch:Q._beginUpdateBatch,setCanvasBackend:Bh,getCanvasBackend:Vh,Util:Y,Transform:dh,Node:Q,Container:Yg,Stage:A_,stages:D_,Layer:e1,FastLayer:t1,Group:n1,DD:og,Shape:$,shapes:R_,Animation:i1,Tween:h1,Easings:g1,Context:eg,Canvas:rg}),v1=class extends ${_sceneFunc(e){let t=J.getAngle(this.angle()),n=this.clockwise();e.beginPath(),e.arc(0,0,Math.abs(this.outerRadius()),0,t,n),e.arc(0,0,Math.abs(this.innerRadius()),t,0,!n),e.closePath(),e.fillStrokeShape(this)}getWidth(){return Math.abs(this.outerRadius())*2}getHeight(){return Math.abs(this.outerRadius())*2}setWidth(e){this.outerRadius(e/2)}setHeight(e){this.outerRadius(e/2)}getSelfRect(){let e=Math.abs(this.innerRadius()),t=Math.abs(this.outerRadius()),n=Math.min(e,t),r=Math.max(e,t),i=this.clockwise(),a=J.getAngle(this.angle());if(a%(Math.PI*2)==0)return a===0?{x:n,y:0,width:r-n,height:0}:{x:-r,y:-r,width:r*2,height:r*2};let o=Math.PI*2,s=i?-a:a,c=s>=o?o:(s%o+o)%o,l=Math.cos(Math.min(c,Math.PI)),u=Math.sin(Math.min(Math.max(Math.PI,c),3*Math.PI/2)),d=Math.sin(Math.min(c,Math.PI/2)),f=l*(l>0?n:r),p=+r,m=u*(u>0?n:r),h=d*(d>0?r:n);return{x:f,y:i?-1*h:m,width:p-f,height:h-m}}};v1.prototype._centroid=!0,v1.prototype.className=`Arc`,v1.prototype._attrsAffectingSize=[`innerRadius`,`outerRadius`,`angle`,`clockwise`],ch(v1,!0),Z.addGetterSetter(v1,`innerRadius`,0,X()),Z.addGetterSetter(v1,`outerRadius`,0,X()),Z.addGetterSetter(v1,`angle`,0,X()),Z.addGetterSetter(v1,`clockwise`,!1,Sg());var y1=[-.07652652113349734,.07652652113349734,-.22778585114164507,.22778585114164507,-.37370608871541955,.37370608871541955,-.5108670019508271,.5108670019508271,-.636053680726515,.636053680726515,-.7463319064601508,.7463319064601508,-.8391169718222188,.8391169718222188,-.912234428251326,.912234428251326,-.9639719272779138,.9639719272779138,-.9931285991850949,.9931285991850949],b1=[.15275338713072584,.15275338713072584,.14917298647260374,.14917298647260374,.14209610931838204,.14209610931838204,.13168863844917664,.13168863844917664,.11819453196151841,.11819453196151841,.10193011981724044,.10193011981724044,.08327674157670475,.08327674157670475,.06267204833410907,.06267204833410907,.04060142980038694,.04060142980038694,.017614007139152118,.017614007139152118],x1=(e,t,n)=>{let r=n/2,i=0;for(let n=0;n<y1.length;n++){let a=r*y1[n]+r;i+=b1[n]*C1(e,t,a)}return r*i},S1=(e,t,n=1)=>x1([e[0],e[0]+2/3*(e[1]-e[0]),e[2]+2/3*(e[1]-e[2]),e[2]],[t[0],t[0]+2/3*(t[1]-t[0]),t[2]+2/3*(t[1]-t[2]),t[2]],n);function C1(e,t,n){let r=1-n,i=r*r,a=2*r*n,o=n*n,s=i*(3*(e[1]-e[0]))+a*(3*(e[2]-e[1]))+o*(3*(e[3]-e[2])),c=i*(3*(t[1]-t[0]))+a*(3*(t[2]-t[1]))+o*(3*(t[3]-t[2]));return Math.sqrt(s*s+c*c)}var w1=(e,t,n)=>{let r=1,i=e/t,a=(e-n(i))/t,o=0;for(;r>.001;){let s=n(i+a),c=Math.abs(e-s)/t;if(c<r)r=c,i+=a;else{let o=n(i-a),s=Math.abs(e-o)/t;s<r?(r=s,i-=a):a/=2}if(o++,o>500)break}return i},T1=(e,t,n,r)=>{let i=1-r;return i*i*e+2*i*r*t+r*r*n},E1=(e,t,n,r,i,a)=>{let o=[];for(let s of[[e,n,i],[t,r,a]]){let c=(s[0]-s[1])/(s[0]-2*s[1]+s[2]);c>0&&c<1&&o.push(T1(e,n,i,c),T1(t,r,a,c))}return o},D1=(e,t,n,r,i)=>{let a=1-i;return a*a*a*e+3*a*a*i*t+3*a*i*i*n+i*i*i*r},O1=(e,t,n,r,i,a,o,s)=>{let c=[];for(let l of[[e,n,i,o],[t,r,a,s]]){let u=-3*l[0]+9*l[1]-9*l[2]+3*l[3],d=6*l[0]-12*l[1]+6*l[2],f=-3*l[0]+3*l[1],p=d*d-4*u*f;if(p<0)continue;let m=-(d+(d<0?-1:1)*Math.sqrt(p))/2;for(let l of[m/u,f/m])l>0&&l<1&&c.push(D1(e,n,i,o,l),D1(t,r,a,s,l))}return c};function k1(e,t,n,r,i,a,o){let s=Math.sqrt((n-e)**2+(r-t)**2),c=Math.sqrt((i-n)**2+(a-r)**2),l=s+c;if(l===0)return[n,r,n,r];let u=o*s/l,d=o*c/l;return[n-u*(i-e),r-u*(a-t),n+d*(i-e),r+d*(a-t)]}function A1(e,t){let n=e.length,r=[];for(let i=2;i<n-2;i+=2){let n=k1(e[i-2],e[i-1],e[i],e[i+1],e[i+2],e[i+3],t);isNaN(n[0])||(r.push(n[0]),r.push(n[1]),r.push(e[i]),r.push(e[i+1]),r.push(n[2]),r.push(n[3]))}return r}function j1(e){let t=[];for(let n=0;n+7<e.length;n+=6)t.push(e[n+6],e[n+7],...O1(e[n],e[n+1],e[n+2],e[n+3],e[n+4],e[n+5],e[n+6],e[n+7]));return t}var M1=class extends ${constructor(e){super(e),this.on(`pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva`,function(){this._clearCache(`tensionPoints`)})}_hasTension(){return this.tension()!==0&&this.points().length>4}_eachTensionSegment(e,t){let n=this.points(),r=n.length,i=this.closed(),a=this.getTensionPoints(),o=a.length,s=n[0],c=n[1],l=i?0:4;for(i||(e(s,c,a[0],a[1],a[2],a[3]),s=a[2],c=a[3]);l<o-2;){let e=a[l++],n=a[l++],r=a[l++],i=a[l++],o=a[l++],u=a[l++];t(s,c,e,n,r,i,o,u),s=o,c=u}i||e(s,c,a[o-2],a[o-1],n[r-2],n[r-1])}_getStrokePadding(e=this.points().length===4&&!this.closed()?1:void 0){return super._getStrokePadding(e)}_sceneFunc(e){let t=this.points(),n=t.length,r=this.closed(),i=this.bezier();if(!n)return;let a=0;if(e.beginPath(),e.moveTo(t[0],t[1]),this._hasTension())this._eachTensionSegment((t,n,r,i,a,o)=>e.quadraticCurveTo(r,i,a,o),(t,n,r,i,a,o,s,c)=>e.bezierCurveTo(r,i,a,o,s,c));else if(i)for(a=2;a<n;)e.bezierCurveTo(t[a++],t[a++],t[a++],t[a++],t[a++],t[a++]);else for(a=2;a<n;a+=2)e.lineTo(t[a],t[a+1]);r?(e.closePath(),e.fillStrokeShape(this)):e.strokeShape(this)}getTensionPoints(){return this._getCache(`tensionPoints`,this._getTensionPoints)}_getTensionPoints(){return this.closed()?this._getTensionPointsClosed():A1(this.points(),this.tension())}_getTensionPointsClosed(){let e=this.points(),t=e.length,n=this.tension(),r=k1(e[t-2],e[t-1],e[0],e[1],e[2],e[3],n),i=k1(e[t-4],e[t-3],e[t-2],e[t-1],e[0],e[1],n),a=A1(e,n);return[r[2],r[3]].concat(a).concat([i[0],i[1],e[t-2],e[t-1],i[2],i[3],r[0],r[1],e[0],e[1]])}getWidth(){return this.getSelfRect().width}getHeight(){return this.getSelfRect().height}getSelfRect(){let e=this.points();if(e.length<4)return{x:e[0]||0,y:e[1]||0,width:0,height:0};if(this._hasTension()){let t=[e[0],e[1]];this._eachTensionSegment((e,n,r,i,a,o)=>t.push(a,o,...E1(e,n,r,i,a,o)),(e,n,r,i,a,o,s,c)=>t.push(s,c,...O1(e,n,r,i,a,o,s,c))),e=t}else this.bezier()&&(e=[e[0],e[1],...j1(e)]);return Y._getPointsRect(e)}};M1.prototype.className=`Line`,M1.prototype._attrsAffectingSize=[`points`,`bezier`,`tension`,`closed`],ch(M1,!0),Z.addGetterSetter(M1,`closed`,!1),Z.addGetterSetter(M1,`bezier`,!1),Z.addGetterSetter(M1,`tension`,0,X()),Z.addGetterSetter(M1,`points`,[],xg());var N1={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},P1=Math.PI*2,F1=class e extends ${constructor(e){super(e),this.dataArray=[],this.pathLength=0,this._readDataAttribute(),this.on(`dataChange.konva`,function(){this._readDataAttribute()})}_readDataAttribute(){this.dataArray=e.parsePathData(this.data()),this.pathLength=e.getPathLength(this.dataArray)}_sceneFunc(e){let t=this.dataArray;e.beginPath();let n=!1;for(let r=0;r<t.length;r++){let i=t[r].command,a=t[r].points;switch(i){case`L`:e.lineTo(a[0],a[1]);break;case`M`:e.moveTo(a[0],a[1]);break;case`C`:e.bezierCurveTo(a[0],a[1],a[2],a[3],a[4],a[5]);break;case`Q`:e.quadraticCurveTo(a[0],a[1],a[2],a[3]);break;case`A`:e.ellipse(a[0],a[1],a[2],a[3],a[6],a[4],a[4]+a[5],!a[7]);break;case`z`:n=!0,e.closePath()}}!n&&!this.hasFill()?e.strokeShape(this):e.fillStrokeShape(this)}getWidth(){return this.getSelfRect().width}getHeight(){return this.getSelfRect().height}getSelfRect(){let t=[];return this.dataArray.forEach(function(n){if(n.command===`A`){let[r,i,a,o,s,c,l]=n.points,u=Math.cos(l),d=Math.sin(l),f=e.getPointOnEllipticalArc(r,i,a,o,s+c,l);t.push(n.start.x,n.start.y,f.x,f.y);let p=Math.atan2(-o*d,a*u),m=Math.atan2(o*u,a*d);[p,p+Math.PI,m,m+Math.PI].forEach(n=>{if(((n-s)*Math.sign(c)%P1+P1)%P1<Math.abs(c)){let s=e.getPointOnEllipticalArc(r,i,a,o,n,l);t.push(s.x,s.y)}})}else n.command===`C`?t.push(n.start.x,n.start.y,n.points[4],n.points[5],...O1(n.start.x,n.start.y,n.points[0],n.points[1],n.points[2],n.points[3],n.points[4],n.points[5])):n.command===`Q`?t.push(n.start.x,n.start.y,n.points[2],n.points[3],...E1(n.start.x,n.start.y,n.points[0],n.points[1],n.points[2],n.points[3])):t.push(...n.points)}),Y._getPointsRect(t)}getLength(){return this.pathLength}getPointAtLength(t){return e.getPointAtLengthOfDataArray(t,this.dataArray)}static getLineLength(e,t,n,r){return Math.sqrt((n-e)*(n-e)+(r-t)*(r-t))}static getPathLength(e){let t=0;for(let n=0;n<e.length;++n)t+=e[n].pathLength;return t}static getPointAtLengthOfDataArray(t,n,r){let i,a=r?.index??0,o=r?.offset??0,s=n.length;if(!s)return null;for(;a>0&&t<=o;)o-=n[--a].pathLength;for(t-=o;a<s&&t>n[a].pathLength;){let e=n[a].pathLength;t-=e,o+=e,++a}if(r&&a<s&&(r.index=a,r.offset=o),a===s&&(a--,t=n[a].pathLength),t<.01)return n[a].command===`M`?(i=n[a].points.slice(0,2),{x:i[0],y:i[1]}):{x:n[a].start.x,y:n[a].start.y};let c=n[a],l=c.points;switch(c.command){case`L`:case`z`:return e.getPointOnLine(t,c.start.x,c.start.y,l[0],l[1]);case`C`:return e.getPointOnCubicBezier(w1(t,c.pathLength,e=>x1([c.start.x,l[0],l[2],l[4]],[c.start.y,l[1],l[3],l[5]],e)),c.start.x,c.start.y,l[0],l[1],l[2],l[3],l[4],l[5]);case`Q`:return e.getPointOnQuadraticBezier(w1(t,c.pathLength,e=>S1([c.start.x,l[0],l[2]],[c.start.y,l[1],l[3]],e)),c.start.x,c.start.y,l[0],l[1],l[2],l[3]);case`A`:return e.getPointOnEllipticalArc(l[0],l[1],l[2],l[3],l[2]===l[3]?l[4]+l[5]*t/c.pathLength:e._walkArc(l,t).theta,l[6])}return null}static getPointOnLine(e,t,n,r,i,a,o){a??=t,o??=n;let s=this.getLineLength(t,n,r,i);if(s<1e-10)return{x:t,y:n};if(r===t)return{x:a,y:o+(i>n?e:-e)};let c=(i-n)/(r-t),l=Math.sqrt(e*e/(1+c*c))*(r<t?-1:1),u=c*l;if(Math.abs(o-n-c*(a-t))<1e-10)return{x:a+l,y:o+u};let d=((a-t)*(r-t)+(o-n)*(i-n))/(s*s),f=t+d*(r-t),p=n+d*(i-n),m=this.getLineLength(a,o,f,p),h=Math.sqrt(e*e-m*m),g=Math.sqrt(h*h/(1+c*c))*(r<t?-1:1),_=c*g;return{x:f+g,y:p+_}}static getPointOnCubicBezier(e,t,n,r,i,a,o,s,c){function l(e){return e*e*e}function u(e){return 3*e*e*(1-e)}function d(e){return 3*e*(1-e)*(1-e)}function f(e){return(1-e)*(1-e)*(1-e)}return{x:s*l(e)+a*u(e)+r*d(e)+t*f(e),y:c*l(e)+o*u(e)+i*d(e)+n*f(e)}}static getPointOnQuadraticBezier(e,t,n,r,i,a,o){function s(e){return e*e}function c(e){return 2*e*(1-e)}function l(e){return(1-e)*(1-e)}return{x:a*s(e)+r*c(e)+t*l(e),y:o*s(e)+i*c(e)+n*l(e)}}static getPointOnEllipticalArc(e,t,n,r,i,a){let o=Math.cos(a),s=Math.sin(a),c={x:n*Math.cos(i),y:r*Math.sin(i)};return{x:e+(c.x*o-c.y*s),y:t+(c.x*s+c.y*o)}}static parsePathData(e){if(!e)return[];let t=e,n=[`m`,`M`,`l`,`L`,`v`,`V`,`h`,`H`,`z`,`Z`,`c`,`C`,`q`,`Q`,`t`,`T`,`s`,`S`,`a`,`A`];t=t.replace(RegExp(` `,`g`),`,`);for(let e=0;e<n.length;e++)t=t.replace(new RegExp(n[e],`g`),`|`+n[e]);let r=t.split(`|`),i=[],a=[],o=0,s=0,c=0,l=0,u=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi,d;for(let e=1;e<r.length;e++){let t=r[e],n=t.charAt(0);for(t=t.slice(1),a.length=0;d=u.exec(t);)a.push(d[0]);let f=[],p=n===`A`||n===`a`?0:-1;for(let e=0,t=a.length;e<t;e++){let t=a[e];for(;(p===3||p===4)&&t.length>1&&(t[0]===`0`||t[0]===`1`);)f.push(+t[0]),p++,t=t.slice(1);let n=parseFloat(t);f.push(isNaN(n)?0:n),p>=0&&(p=(p+1)%7)}let m=0;for(;m<f.length&&!(f.length-m<N1[n.toLowerCase()]||n===`z`||n===`Z`);){let e=``,t=[],r=o,a=s,u,d,p,h,g,_,v,y,b,x;switch(n){case`l`:o+=f[m++],s+=f[m++],e=`L`,t.push(o,s);break;case`L`:o=f[m++],s=f[m++],t.push(o,s);break;case`m`:o+=f[m++],s+=f[m++],e=`M`,c=o,l=s,t.push(o,s),n=`l`;break;case`M`:o=f[m++],s=f[m++],e=`M`,c=o,l=s,t.push(o,s),n=`L`;break;case`h`:o+=f[m++],e=`L`,t.push(o,s);break;case`H`:o=f[m++],e=`L`,t.push(o,s);break;case`v`:s+=f[m++],e=`L`,t.push(o,s);break;case`V`:s=f[m++],e=`L`,t.push(o,s);break;case`C`:t.push(f[m++],f[m++],f[m++],f[m++]),o=f[m++],s=f[m++],t.push(o,s);break;case`c`:t.push(o+f[m++],s+f[m++],o+f[m++],s+f[m++]),o+=f[m++],s+=f[m++],e=`C`,t.push(o,s);break;case`S`:d=o,p=s,u=i[i.length-1],u?.command===`C`&&(d=o+(o-u.points[2]),p=s+(s-u.points[3])),t.push(d,p,f[m++],f[m++]),o=f[m++],s=f[m++],e=`C`,t.push(o,s);break;case`s`:d=o,p=s,u=i[i.length-1],u?.command===`C`&&(d=o+(o-u.points[2]),p=s+(s-u.points[3])),t.push(d,p,o+f[m++],s+f[m++]),o+=f[m++],s+=f[m++],e=`C`,t.push(o,s);break;case`Q`:t.push(f[m++],f[m++]),o=f[m++],s=f[m++],t.push(o,s);break;case`q`:t.push(o+f[m++],s+f[m++]),o+=f[m++],s+=f[m++],e=`Q`,t.push(o,s);break;case`T`:d=o,p=s,u=i[i.length-1],u?.command===`Q`&&(d=o+(o-u.points[0]),p=s+(s-u.points[1])),o=f[m++],s=f[m++],e=`Q`,t.push(d,p,o,s);break;case`t`:d=o,p=s,u=i[i.length-1],u?.command===`Q`&&(d=o+(o-u.points[0]),p=s+(s-u.points[1])),o+=f[m++],s+=f[m++],e=`Q`,t.push(d,p,o,s);break;case`A`:case`a`:if(h=Math.abs(f[m++]),g=Math.abs(f[m++]),_=f[m++],v=f[m++],y=f[m++],b=o,x=s,n===`a`?(o+=f[m++],s+=f[m++]):(o=f[m++],s=f[m++]),e=`A`,o===b&&s===x)continue;!h||!g?(e=`L`,t.push(o,s)):t=this.convertEndpointToCenterParameterization(b,x,o,s,v,y,h,g,_)}i.push({command:e||n,points:t,start:{x:r,y:a},pathLength:this.calcLength(r,a,e||n,t)})}(n===`z`||n===`Z`)&&(i.push({command:`z`,points:[c,l],start:{x:o,y:s},pathLength:this.getLineLength(o,s,c,l)}),o=c,s=l)}return i}static _walkArc(t,n){let[r,i,a,o,s,c]=t,l=Math.max(1,Math.ceil(Math.abs(c)/(Math.PI/180))),u=e.getPointOnEllipticalArc(r,i,a,o,s,0),d=s,f=0;for(let t=1;t<=l;t++){let p=s+c*t/l,m=e.getPointOnEllipticalArc(r,i,a,o,p,0),h=e.getLineLength(u.x,u.y,m.x,m.y);if(f+h>=n)return{theta:d+(p-d)*((n-f)/h),length:n};f+=h,u=m,d=p}return{theta:d,length:f}}static calcLength(t,n,r,i){let a=e;switch(r){case`L`:return a.getLineLength(t,n,i[0],i[1]);case`C`:return x1([t,i[0],i[2],i[4]],[n,i[1],i[3],i[5]],1);case`Q`:return S1([t,i[0],i[2]],[n,i[1],i[3]],1);case`A`:return a._walkArc(i,1/0).length}return 0}static convertEndpointToCenterParameterization(e,t,n,r,i,a,o,s,c){let l=Math.PI/180*c,u=Math.cos(l)*(e-n)/2+Math.sin(l)*(t-r)/2,d=-1*Math.sin(l)*(e-n)/2+Math.cos(l)*(t-r)/2,f=u*u/(o*o)+d*d/(s*s);f>1&&(o*=Math.sqrt(f),s*=Math.sqrt(f));let p=Math.sqrt((o*o*(s*s)-o*o*(d*d)-s*s*(u*u))/(o*o*(d*d)+s*s*(u*u)));i===a&&(p*=-1),isNaN(p)&&(p=0);let m=p*o*d/s,h=p*-s*u/o,g=(e+n)/2+Math.cos(l)*m-Math.sin(l)*h,_=(t+r)/2+Math.sin(l)*m+Math.cos(l)*h,v=function(e){return Math.sqrt(e[0]*e[0]+e[1]*e[1])},y=function(e,t){return(e[0]*t[0]+e[1]*t[1])/(v(e)*v(t))},b=function(e,t){return(e[0]*t[1]<e[1]*t[0]?-1:1)*Math.acos(y(e,t))},x=b([1,0],[(u-m)/o,(d-h)/s]),S=[(u-m)/o,(d-h)/s],C=[(-1*u-m)/o,(-1*d-h)/s],w=b(S,C);return y(S,C)<=-1&&(w=Math.PI),y(S,C)>=1&&(w=0),a===0&&w>0&&(w-=2*Math.PI),a===1&&w<0&&(w+=2*Math.PI),[g,_,o,s,x,w,l,a]}};F1.prototype.className=`Path`,F1.prototype._attrsAffectingSize=[`data`],ch(F1,!0),Z.addGetterSetter(F1,`data`);var I1=class extends M1{_getStrokePadding(){return super._getStrokePadding(this.pointerAtBeginning()||this.pointerAtEnding()?this.miterLimit()||10:void 0)}_sceneFunc(e){super._sceneFunc(e);let t=this.points(),n=t.length;if(n<4)return;let r=this.pointerLength(),i=this.pointerWidth();this.pointerAtEnding()&&(e.save(),e.beginPath(),e.translate(t[n-2],t[n-1]),e.rotate(this._getPointerAngle(!1)),e.moveTo(0,0),e.lineTo(-r,i/2),e.lineTo(-r,-i/2),e.closePath(),e.restore(),this.__fillStroke(e)),this.pointerAtBeginning()&&(e.save(),e.beginPath(),e.translate(t[0],t[1]),e.rotate(this._getPointerAngle(!0)),e.moveTo(0,0),e.lineTo(-r,i/2),e.lineTo(-r,-i/2),e.closePath(),e.restore(),this.__fillStroke(e))}_getPointerAngle(e){let t=this.points(),n=t.length,r=this.tension()!==0&&n>4,i=r?this.getTensionPoints():t,a=e?t[0]:t[n-2],o=e?t[1]:t[n-1],s=0,c=0;if(r&&e)s=a-(i[0]+i[2])/2,c=o-(i[1]+i[3])/2;else if(r){let e=i[i.length-4],t=i[i.length-3],n=i[i.length-2],r=i[i.length-1],l=F1.calcLength(e,t,`Q`,[n,r,a,o]),u=F1.getPointOnQuadraticBezier(l?Math.max(0,1-this.pointerLength()/l):0,e,t,n,r,a,o);s=a-u.x,c=o-u.y}for(let t=e?0:i.length-2;!s&&!c&&t>=0&&t<i.length;t+=e?2:-2)s=a-i[t],c=o-i[t+1];let l=Math.PI*2;return(Math.atan2(c,s)+l)%l}__fillStroke(e){let t=this.dashEnabled();t&&(this.attrs.dashEnabled=!1,e.setLineDash([])),e.fillStrokeShape(this),t&&(this.attrs.dashEnabled=!0)}getSelfRect(){let e=super.getSelfRect(),t=this.points();if(t.length<4)return e;let n=e.x,r=e.y,i=n+e.width,a=r+e.height;for(let e of[!1,!0]){if(!(e?this.pointerAtBeginning():this.pointerAtEnding()))continue;let o=e?0:t.length-2,s=this._getPointerAngle(e),c=Math.cos(s),l=Math.sin(s),u=t[o]-this.pointerLength()*c,d=t[o+1]-this.pointerLength()*l,f=Math.abs(this.pointerWidth()*l/2),p=Math.abs(this.pointerWidth()*c/2);n=Math.min(n,u-f),r=Math.min(r,d-p),i=Math.max(i,u+f),a=Math.max(a,d+p)}return{x:n,y:r,width:i-n,height:a-r}}};I1.prototype.className=`Arrow`,I1.prototype._attrsAffectingSize=[...M1.prototype._attrsAffectingSize,`pointerLength`,`pointerWidth`,`pointerAtBeginning`,`pointerAtEnding`],ch(I1,!0),Z.addGetterSetter(I1,`pointerLength`,10,X()),Z.addGetterSetter(I1,`pointerWidth`,10,X()),Z.addGetterSetter(I1,`pointerAtBeginning`,!1),Z.addGetterSetter(I1,`pointerAtEnding`,!0);var L1=class extends ${_getStrokePadding(){return super._getStrokePadding(1)}_sceneFunc(e){e.beginPath(),e.arc(0,0,Math.abs(this.attrs.radius||0),0,Math.PI*2,!1),e.closePath(),e.fillStrokeShape(this)}getWidth(){return Math.abs(this.radius())*2}getHeight(){return Math.abs(this.radius())*2}setWidth(e){this.radius(e/2)}setHeight(e){this.radius(e/2)}};L1.prototype._centroid=!0,L1.prototype.className=`Circle`,L1.prototype._attrsAffectingSize=[`radius`],ch(L1,!0),Z.addGetterSetter(L1,`radius`,0,X());var R1=class extends ${_getStrokePadding(){return super._getStrokePadding(1)}_sceneFunc(e){let t=Math.abs(this.radiusX()),n=Math.abs(this.radiusY());e.beginPath(),e.ellipse(0,0,t,n,0,0,Math.PI*2,!1),e.closePath(),e.fillStrokeShape(this)}getWidth(){return Math.abs(this.radiusX())*2}getHeight(){return Math.abs(this.radiusY())*2}setWidth(e){this.radiusX(e/2)}setHeight(e){this.radiusY(e/2)}};R1.prototype.className=`Ellipse`,R1.prototype._centroid=!0,R1.prototype._attrsAffectingSize=[`radiusX`,`radiusY`],ch(R1,!0),Z.addComponentsGetterSetter(R1,`radius`,[`x`,`y`]),Z.addGetterSetter(R1,`radiusX`,0,X()),Z.addGetterSetter(R1,`radiusY`,0,X());var z1=class e extends ${constructor(e){super(e),this._loadListener=()=>{this._requestDraw()},this.on(`imageChange.konva`,e=>{this._removeImageLoad(e.oldVal),this._setImageLoad()}),this._setImageLoad()}_setImageLoad(){var e;let t=this.image();t?.complete&&t.src||t?.readyState>=2||(e=t?.addEventListener)==null||e.call(t,`videoWidth`in t?`loadeddata`:`load`,this._loadListener)}_removeImageLoad(e){var t;(t=e?.removeEventListener)==null||t.call(e,`videoWidth`in e?`loadeddata`:`load`,this._loadListener)}destroy(){return this._removeImageLoad(this.image()),super.destroy(),this}_useBufferCanvas(e,t=this.getAbsoluteOpacity()){if(this.attrs.perfectDrawEnabled===!1)return!1;let n=!!this.cornerRadius(),r=this.hasShadow();return n&&r?!0:super._useBufferCanvas(!0,t)}_getStrokePadding(){return super._getStrokePadding(this.strokeScaleEnabled()?1:void 0)}_sceneFunc(e){let t=this.getWidth(),n=this.getHeight(),r=this.cornerRadius(),i=this.attrs.image;if((this.hasFill()||this.hasStroke()||r)&&(e.beginPath(),r?Y.drawRoundedRectPath(e,t,n,r):e.rect(0,0,t,n),e.closePath(),e.fillStrokeShape(this)),i){r&&e.clip();let a=this.attrs.cropWidth,o=this.attrs.cropHeight;a&&o?e.drawImage(i,this.cropX(),this.cropY(),a,o,0,0,t,n):e.drawImage(i,0,0,t,n)}}_hitFunc(e){let t=this.width(),n=this.height(),r=this.cornerRadius();e.beginPath(),r?Y.drawRoundedRectPath(e,t,n,r):e.rect(0,0,t,n),e.closePath(),e.fillStrokeShape(this)}getWidth(){let e=this.image();return this.attrs.width??e?.videoWidth??e?.width??0}getHeight(){let e=this.image();return this.attrs.height??e?.videoHeight??e?.height??0}static fromURL(t,n,r=null){let i=Y.createImageElement();i.onload=()=>{i.onload=i.onerror=null,n(new e({image:i}))},i.onerror=r,i.crossOrigin=`Anonymous`,i.src=t}};z1.prototype.className=`Image`,z1.prototype._attrsAffectingSize=[`image`],ch(z1,!0),Z.addGetterSetter(z1,`cornerRadius`,0,_g(4)),Z.addGetterSetter(z1,`image`),Z.addComponentsGetterSetter(z1,`crop`,[`x`,`y`,`width`,`height`]),Z.addGetterSetter(z1,`cropX`,0,X()),Z.addGetterSetter(z1,`cropY`,0,X()),Z.addGetterSetter(z1,`cropWidth`,0,X()),Z.addGetterSetter(z1,`cropHeight`,0,X());var B1=typeof Intl<`u`&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:`grapheme`}):null;function V1(e){return e/15}function H1(e){return B1?Array.from(B1.segment(e),e=>e.segment):e.match(/\p{RI}\p{RI}|\P{M}(?:\p{M}|\p{Emoji_Modifier}|\uFE0F|\u200D\P{M})*|\p{M}+/gu)||[]}var U1=`auto`,W1=`center`,G1=`inherit`,K1=`justify`,q1=`Change.konva`,J1=`2d`,Y1=`-`,X1=`left`,Z1=`text`,Q1=`Text`,$1=`top`,e0=`bottom`,t0=`middle`,n0=`normal`,r0=`px `,i0=` `,a0=`right`,o0=`rtl`,s0=`word`,c0=`char`,l0=`none`,u0=`…`,d0=/[\p{Script=Han}\u3000-\u30FF\uFF00-\uFF9F]/u,f0=/[\p{Pe}\p{Pf}\p{Pd}、。，．！？：；…・,.!?:;々〻ゝゞヽヾ〃｡､･％]/u,p0=/[\p{Ps}\p{Pi}]/u,m0=[`direction`,`fontFamily`,`fontSize`,`fontStyle`,`fontVariant`,`padding`,`align`,`verticalAlign`,`lineHeight`,`text`,`width`,`height`,`wrap`,`ellipsis`,`letterSpacing`],h0=Hh(()=>{let e=!1,t;try{t=Y.createCanvasElement(),t.width=10,t.height=10;let n=t.getContext(J1);if(n){n.globalAlpha=0,n.shadowColor=`black`,n.shadowBlur=5,n.shadowOffsetX=5,n.shadowOffsetY=5,n.fillStyle=`black`,n.font=`10px Arial`,n.fillText(`X`,0,10);let t=n.getImageData(0,0,10,10).data;for(let n=3;n<t.length;n+=4)if(t[n]>0){e=!0;break}}}catch{}finally{t&&Y.releaseCanvas(t)}return e});function g0(e){return e.split(`,`).map(e=>{e=e.trim();let t=e.indexOf(` `)>=0,n=e.indexOf(`"`)>=0||e.indexOf(`'`)>=0;return t&&!n&&(e=`"${e}"`),e}).join(`, `)}function _0(e){return e||={},e.fill||e.fillLinearGradientColorStops||e.fillRadialGradientColorStops||e.fillPatternImage?e:{...e,fill:`black`}}var v0=class extends ${constructor(e){super(_0(e)),this._partialTextX=0,this._partialTextY=0,this._baselineShift=0,this._setTextData()}_sceneFunc(e){let t=this.textArr,n=t.length;if(!this.text())return;let r=this.padding(),i=this.fontSize(),a=this.lineHeight()*i,o=this.direction(),s=this.align(),c=this.getWidth(),l=this.letterSpacing(),u=this.charRenderFunc(),d=this.textDecoration(),f=d.indexOf(`underline`)!==-1,p=d.indexOf(`line-through`)!==-1,m,h=a/2,g=t0;if(!J.legacyTextRendering){let e=this.measureSize(`M`);g=`alphabetic`,h=((e.fontBoundingBoxAscent??e.actualBoundingBoxAscent)-(e.fontBoundingBoxDescent??e.actualBoundingBoxDescent))/2+a/2}if(o===G1?o=e.direction:e.setAttr(`direction`,o),e.setAttr(`font`,this._getContextFont()),e.setAttr(`textBaseline`,g),e.setAttr(`textAlign`,X1),e.translate(r,this._getTextTop()),u){let t=e._getFillStyle(this);t!==void 0&&(e.fillStyle=t),this.hasStroke()&&e._applyStrokeStyle(this)}let _=u?e.fillStyle:void 0,v=u?e.strokeStyle:void 0,y=0;for(m=0;m<n;m++){let d=0,g=t[m],b=g.text,x=g.width,S=g.lastInParagraph;if(e.save(),s===a0?d+=c-x-r*2:s===W1&&(d+=(c-x-r*2)/2),f){e.save(),e.beginPath();let t=this._getUnderlineOffset(),n=d,a=h+0+t;e.moveTo(n,a);let o=s===K1&&!S?c-r*2:x;e.lineTo(n+Math.round(o),a),e.lineWidth=V1(i),e._applyDecorationStyle(this)&&e.stroke(),e.restore()}let C=d;if(o!==o0&&(l!==0||s===K1||u)){let t=b.split(` `).length-1,n=H1(b);for(let i=0;i<n.length;i++){let a=n[i];a===` `&&!S&&s===K1&&(d+=(c-r*2-x)/t),this._partialTextX=d,this._partialTextY=h+0,this._partialText=a;let o=e.measureText(a).width;if(u){e.save(),u({char:a,index:y,x:d,y:h+0,lineIndex:m,column:i,isLastInLine:i===n.length-1,width:o,context:e});let t=e.fillStyle;t!==_&&(this._partialFillStyle=t);let r=e.strokeStyle;r!==v&&(this._partialStrokeStyle=r)}e.fillStrokeShape(this),u&&(this._partialFillStyle=void 0,this._partialStrokeStyle=void 0,e.restore()),d+=o+l,y++}}else l!==0&&e.setAttr(`letterSpacing`,`${l}px`),this._partialTextX=d,this._partialTextY=h+0,this._partialText=b,e.fillStrokeShape(this);if(p){e.save(),e.beginPath();let t=J.legacyTextRendering?0:-Math.round(i/4),n=C;e.moveTo(n,h+0+t);let a=s===K1&&!S?c-r*2:x;e.lineTo(n+Math.round(a),h+0+t),e.lineWidth=V1(i),e._applyDecorationStyle(this)&&e.stroke(),e.restore()}e.restore(),n>1&&(h+=a)}}_getTextTop(){let e=this.padding(),t=this.getHeight()-this.textArr.length*this.lineHeight()*this.fontSize()-e*2,n=this.verticalAlign();return n===t0?e+t/2:n===e0?e+t:e}_getUnderlineOffset(){return this.underlineOffset()??Math.round(this.fontSize()/(J.legacyTextRendering?2:4))}getSelfRect(){let e=super.getSelfRect(),t=this.textArr.length;if(!t||this.textDecoration().indexOf(`underline`)===-1)return e;let n=this.fontSize(),r=this.lineHeight()*n,i=this._getTextTop()+t*r-r/2;return J.legacyTextRendering||(i+=this._baselineShift),i+=this._getUnderlineOffset()+V1(n)/2,e.height=Math.max(e.y+e.height,i)-e.y,e}_getSelfRectForDrawing(){let e=this.getSelfRect(),t=this.fontSize(),n=this.padding(),r=this.lineHeight()*t,i=this.getWidth()-n*2,a=this.align(),o=this.textArr.length*r,s=this._getTextTop(),c=e.x,l=e.x+e.width;for(let{text:e,width:t}of this.textArr){let r=n+(a===a0?i-t:a===W1?(i-t)/2:0),o=Math.min(0,this.letterSpacing())*e.length;c=Math.min(c,r+o),l=Math.max(l,r+t-o)}let u=this.textDecoration().includes(`underline`),d=Math.min(e.y,s+(u?Math.min(0,this._getUnderlineOffset()):0));return{x:c-t,y:d-t,width:l-c+t*2,height:Math.max(e.y+e.height,s+o)-d+t*2}}_hitFunc(e){let t=this.getWidth(),n=this.getHeight();e.beginPath(),e.rect(0,0,t,n),e.closePath(),e.fillStrokeShape(this)}setText(e){let t=Y._isString(e)?e:e==null?``:e+``;return this._setAttr(Z1,t),this}getWidth(){return this.attrs.width===U1||this.attrs.width===void 0?this.getTextWidth()+this.padding()*2:this.attrs.width}getHeight(){return this.attrs.height===U1||this.attrs.height===void 0?this.fontSize()*this.textArr.length*this.lineHeight()+this.padding()*2:this.attrs.height}getTextWidth(){return this.textWidth}getTextHeight(){return Y.warn(`text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.`),this.textHeight}measureSize(e){let t=Uh(),n=this.fontSize(),r;t.save(),t.font=this._getContextFont(),r=t.measureText(e),t.restore();let i=n/100;return{actualBoundingBoxAscent:r.actualBoundingBoxAscent??71.58203125*i,actualBoundingBoxDescent:r.actualBoundingBoxDescent??0,actualBoundingBoxLeft:r.actualBoundingBoxLeft??-7.421875*i,actualBoundingBoxRight:r.actualBoundingBoxRight??75.732421875*i,alphabeticBaseline:r.alphabeticBaseline??0,emHeightAscent:r.emHeightAscent??100*i,emHeightDescent:r.emHeightDescent??-20*i,fontBoundingBoxAscent:r.fontBoundingBoxAscent??91*i,fontBoundingBoxDescent:r.fontBoundingBoxDescent??21*i,hangingBaseline:r.hangingBaseline??72.80000305175781*i,ideographicBaseline:r.ideographicBaseline??-21*i,width:r.width,height:n}}_getContextFont(){return this.fontStyle()+i0+this.fontVariant()+i0+(this.fontSize()+r0)+g0(this.fontFamily())}_addTextLine(e){this.align()===K1&&(e=e.trim());let t=this._getTextWidth(e);return this.textArr.push({text:e,width:t,lastInParagraph:!1})}_getTextWidth(e,t){let n=this.letterSpacing(),r=n?n*(t??H1(e).length):0;return Uh().measureText(e).width+r}_setTextData(){let e=this.text().split(/\r?\n/),t=+this.fontSize(),n=this.lineHeight()*t,r=this.attrs.width,i=this.attrs.height,a=r!==U1&&r!==void 0,o=i!==U1&&i!==void 0,s=this.padding(),c=r-s*2,l=i-s*2,u=0,d=this.wrap(),f=d!==c0&&d!==l0,p=this.ellipsis(),m=this.measureSize(`M`);this._baselineShift=(m.fontBoundingBoxAscent-m.fontBoundingBoxDescent)/2,this.textArr=[];let h=Uh();h.font=this._getContextFont(),h.fontKerning=this.direction()!==o0&&(this.letterSpacing()!==0||this.align()===K1||this.charRenderFunc())?`none`:`auto`;let g=p?this._getTextWidth(u0):0;for(let t=0,r=e.length;t<r;++t){let i=e[t],s=this._getTextWidth(i);if(a&&s>c){let e=H1(i),a=e.length,d=0,m=t=>e.slice(d,t).join(``),h=t=>e[t]===i0||e[t+1]===i0||e[t]===Y1&&e[t+1]!==Y1||(d0.test(e[t])||d0.test(e[t+1]))&&!f0.test(e[t+1])&&!p0.test(e[t]),_=Math.max(1,Math.ceil(a*c/s));for(;d<a;){let i=p&&o&&u+n>l?g:0,s=e=>!(this._getTextWidth(m(e),e-d)+i>c),v=d,y=Math.min(a,d+_);for(;s(y)&&(v=y,y!==a);)y=Math.min(a,y+(y-d));for(;y-v>1;){let e=v+y>>>1;s(e)?v=e:y=e}if(v===d)break;if(v===a){this._addTextLine(m(a)),u+=n,o&&u+n>l&&t<r-1&&this._tryToAddEllipsisToLastLine();break}if(f){let e=v-1;for(;e>=d&&!h(e);)e--;e>=d&&(v=e+1)}if(this._addTextLine(m(v).trimRight()),u+=n,this._shouldHandleEllipsis(u)){this._tryToAddEllipsisToLastLine();break}for(d=v;d<a&&!e[d].trim();)d++}}else this._addTextLine(i),u+=n,o&&u+n>l&&t<r-1&&this._tryToAddEllipsisToLastLine();if(this.textArr[this.textArr.length-1]&&(this.textArr[this.textArr.length-1].lastInParagraph=!0),o&&u+n>l)break}this.textHeight=t,this.textWidth=this.textArr.reduce((e,t)=>Math.max(e,t.width),0)}_shouldHandleEllipsis(e){let t=+this.fontSize(),n=this.lineHeight()*t,r=this.attrs.height,i=r!==U1&&r!==void 0,a=r-this.padding()*2;return this.wrap()===l0||i&&e+n>a}_tryToAddEllipsisToLastLine(){let e=this.attrs.width,t=e!==U1&&e!==void 0,n=e-this.padding()*2,r=this.ellipsis(),i=this.textArr[this.textArr.length-1];if(!i||!r)return;let a=i.text+u0;if(t){let e=H1(i.text);for(;e.length&&this._getTextWidth(a)>n;)e.pop(),a=e.join(``)+u0;this._getTextWidth(a)>n&&(a=``)}i.text=a,i.width=this._getTextWidth(a)}getStrokeScaleEnabled(){return!0}_getStrokePadding(){return super._getStrokePadding(2)}_useBufferCanvas(e,t=this.getAbsoluteOpacity()){if(this.attrs.perfectDrawEnabled===!1)return!1;let n=this.textDecoration().indexOf(`underline`)!==-1||this.textDecoration().indexOf(`line-through`)!==-1,r=this.hasShadow();return n&&r||r&&t!==1&&h0()?!0:super._useBufferCanvas(e,t)}};v0.prototype._fillFunc=function(e){this._partialFillStyle&&e.setAttr(`fillStyle`,this._partialFillStyle),e.fillText(this._partialText,this._partialTextX,this._partialTextY)},v0.prototype._strokeFunc=function(e){e.setAttr(`miterLimit`,2),this._partialStrokeStyle&&e.setAttr(`strokeStyle`,this._partialStrokeStyle),e.strokeText(this._partialText,this._partialTextX,this._partialTextY)},v0.prototype.className=Q1,v0.prototype._attrsAffectingSize=m0.filter(e=>e!==`width`&&e!==`height`).concat([`textDecoration`,`underlineOffset`]),ch(v0,!0),v0.prototype.on(m0.map(e=>e+q1).join(` `),function(){this._setTextData()}),Z.overWriteSetter(v0,`width`,vg()),Z.overWriteSetter(v0,`height`,vg()),Z.addGetterSetter(v0,`direction`,G1),Z.addGetterSetter(v0,`fontFamily`,`Arial`),Z.addGetterSetter(v0,`fontSize`,12,X()),Z.addGetterSetter(v0,`fontStyle`,n0),Z.addGetterSetter(v0,`fontVariant`,n0),Z.addGetterSetter(v0,`padding`,0,X()),Z.addGetterSetter(v0,`align`,X1),Z.addGetterSetter(v0,`verticalAlign`,$1),Z.addGetterSetter(v0,`lineHeight`,1,X()),Z.addGetterSetter(v0,`wrap`,s0),Z.addGetterSetter(v0,`ellipsis`,!1,Sg()),Z.addGetterSetter(v0,`letterSpacing`,0,X()),Z.addGetterSetter(v0,`text`,``,yg()),Z.addGetterSetter(v0,`textDecoration`,``),Z.addGetterSetter(v0,`underlineOffset`,void 0,X()),Z.addGetterSetter(v0,`charRenderFunc`,void 0);var y0=[...v0.prototype._attrsAffectingSize,`width`,`height`,`pointerDirection`,`pointerWidth`,`pointerHeight`].map(e=>e+`Change.konva`).join(` `),b0=`none`,x0=`up`,S0=`right`,C0=`down`,w0=`left`,T0=class extends n1{constructor(e){super(e),this._sync=this._sync.bind(this),this.on(`add.konva`,function(e){e.child.off(y0,this._sync).on(y0,this._sync),this._sync()})}getText(){return this.find(`Text`)[0]}getTag(){return this.find(`Tag`)[0]}getWidth(){return this.getText().width()}getHeight(){return this.getText().height()}_sync(){let e=this.getText(),t=this.getTag(),n,r,i,a,o,s,c;if(e&&t){switch(n=e.width(),r=e.height(),i=t.pointerDirection(),a=t.pointerWidth(),c=t.pointerHeight(),o=0,s=0,i){case x0:o=n/2,s=-1*c;break;case S0:o=n+a,s=r/2;break;case C0:o=n/2,s=r+c;break;case w0:o=-1*a,s=r/2}t.setAttrs({x:-1*o,y:-1*s,width:n,height:r}),e.setAttrs({x:-1*o,y:-1*s})}}};T0.prototype.className=`Label`,ch(T0);var E0=class extends ${_sceneFunc(e){let t=this.width(),n=this.height(),r=this.pointerDirection(),i=this.pointerWidth(),a=this.pointerHeight(),o=this.cornerRadius(),[s,c,l,u]=Y._cornerRadii(o,t,n);e.beginPath(),e.moveTo(s,0),r===x0&&(e.lineTo((t-i)/2,0),e.lineTo(t/2,-1*a),e.lineTo((t+i)/2,0)),e.lineTo(t-c,0),e.arc(t-c,c,c,Math.PI*3/2,0,!1),r===S0&&(e.lineTo(t,(n-a)/2),e.lineTo(t+i,n/2),e.lineTo(t,(n+a)/2)),e.lineTo(t,n-l),e.arc(t-l,n-l,l,0,Math.PI/2,!1),r===C0&&(e.lineTo((t+i)/2,n),e.lineTo(t/2,n+a),e.lineTo((t-i)/2,n)),e.lineTo(u,n),e.arc(u,n-u,u,Math.PI/2,Math.PI,!1),r===w0&&(e.lineTo(0,(n+a)/2),e.lineTo(-1*i,n/2),e.lineTo(0,(n-a)/2)),e.lineTo(0,s),e.arc(s,s,s,Math.PI,Math.PI*3/2,!1),e.closePath(),e.fillStrokeShape(this)}getSelfRect(){let e=this.pointerWidth(),t=this.pointerHeight(),n=this.pointerDirection(),r=this.width(),i=this.height();return n===x0||n===C0?{x:Math.min(0,(r-e)/2),y:n===x0?-t:0,width:Math.max(r,e),height:i+t}:n===w0||n===S0?{x:n===w0?-e:0,y:Math.min(0,(i-t)/2),width:r+e,height:Math.max(i,t)}:{x:0,y:0,width:r,height:i}}};E0.prototype.className=`Tag`,ch(E0,!0),Z.addGetterSetter(E0,`pointerDirection`,b0),Z.addGetterSetter(E0,`pointerWidth`,0,X()),Z.addGetterSetter(E0,`pointerHeight`,0,X()),Z.addGetterSetter(E0,`cornerRadius`,0,_g(4));var D0=class extends ${_getStrokePadding(){return super._getStrokePadding(this.strokeScaleEnabled()?1:void 0)}_sceneFunc(e){let t=this.cornerRadius(),n=this.width(),r=this.height();e.beginPath(),t?Y.drawRoundedRectPath(e,n,r,t):e.rect(0,0,n,r),e.closePath(),e.fillStrokeShape(this)}};D0.prototype.className=`Rect`,ch(D0,!0),Z.addGetterSetter(D0,`cornerRadius`,0,_g(4));var O0=class extends ${_sceneFunc(e){let t=this._getPoints(),n=this.radius(),r=this.sides(),i=this.cornerRadius();if(t.length){if(e.beginPath(),i)Y.drawRoundedPolygonPath(e,t,r,n,i);else{e.moveTo(t[0].x,t[0].y);for(let n=1;n<t.length;n++)e.lineTo(t[n].x,t[n].y)}e.closePath(),e.fillStrokeShape(this)}}_getPoints(){let e=this.attrs.sides,t=this.attrs.radius||0,n=[];for(let r=0;r<e;r++)n.push({x:t*Math.sin(r*2*Math.PI/e),y:-1*t*Math.cos(r*2*Math.PI/e)});return n}getSelfRect(){let e=this._getPoints();if(!e.length)return{x:0,y:0,width:0,height:0};let t=e[0].x,n=e[0].x,r=e[0].y,i=e[0].y;return e.forEach(e=>{t=Math.min(t,e.x),n=Math.max(n,e.x),r=Math.min(r,e.y),i=Math.max(i,e.y)}),{x:t,y:r,width:n-t,height:i-r}}getWidth(){return this.radius()*2}getHeight(){return this.radius()*2}setWidth(e){this.radius(e/2)}setHeight(e){this.radius(e/2)}};O0.prototype.className=`RegularPolygon`,O0.prototype._centroid=!0,O0.prototype._attrsAffectingSize=[`radius`,`sides`],ch(O0,!0),Z.addGetterSetter(O0,`radius`,0,X()),Z.addGetterSetter(O0,`sides`,0,X()),Z.addGetterSetter(O0,`cornerRadius`,0,_g(4));var k0=Math.PI*2,A0=class extends ${_getStrokePadding(){return super._getStrokePadding(1)}_sceneFunc(e){let t=Math.abs(this.innerRadius()),n=Math.abs(this.outerRadius());e.beginPath(),e.arc(0,0,t,0,k0,!1),e.moveTo(n,0),e.arc(0,0,n,k0,0,!0),e.closePath(),e.fillStrokeShape(this)}getSelfRect(){let e=Math.max(Math.abs(this.innerRadius()),Math.abs(this.outerRadius()));return{x:-e,y:-e,width:e*2,height:e*2}}getWidth(){return Math.abs(this.outerRadius())*2}getHeight(){return Math.abs(this.outerRadius())*2}setWidth(e){this.outerRadius(e/2)}setHeight(e){this.outerRadius(e/2)}};A0.prototype.className=`Ring`,A0.prototype._centroid=!0,A0.prototype._attrsAffectingSize=[`innerRadius`,`outerRadius`],ch(A0,!0),Z.addGetterSetter(A0,`innerRadius`,0,X()),Z.addGetterSetter(A0,`outerRadius`,0,X());var j0=class extends ${constructor(e){super(e),this._updated=!0,this.anim=new i1(()=>{let e=this._updated;return this._updated=!1,e}),this.on(`animationChange.konva`,function(){this.frameIndex(0)}),this.on(`frameIndexChange.konva`,function(){this._updated=!0}),this.on(`frameRateChange.konva`,function(){this.anim.isRunning()&&(clearInterval(this.interval),this._setInterval())})}_getFrame(){let e=this.animation(),t=this.animations()?.[e],n=this.frameIndex(),r=n*4;if(!t||!Number.isInteger(n)||r<0||r+4>t.length)return;let i=this.frameOffsets()?.[e]||[];return{x:t[r],y:t[r+1],width:t[r+2],height:t[r+3],offsetX:i[n*2]||0,offsetY:i[n*2+1]||0}}_getStrokePadding(){return super._getStrokePadding(this.strokeScaleEnabled()?1:void 0)}_sceneFunc(e){let t=this._getFrame();if(!t)return;let{x:n,y:r,width:i,height:a,offsetX:o,offsetY:s}=t,c=this.image();(this.hasFill()||this.hasStroke())&&(e.beginPath(),e.rect(o,s,i,a),e.closePath(),e.fillStrokeShape(this)),c&&e.drawImage(c,n,r,i,a,o,s,i,a)}_hitFunc(e){let{x:t,y:n,width:r,height:i}=this.getSelfRect();e.beginPath(),e.rect(t,n,r,i),e.closePath(),e.fillShape(this)}getSelfRect(){let e=this._getFrame();return e?{x:e.offsetX,y:e.offsetY,width:e.width,height:e.height}:{x:0,y:0,width:0,height:0}}_useBufferCanvas(e,t=this.getAbsoluteOpacity()){return super._useBufferCanvas(!0,t)}_setInterval(){let e=this;this.interval=setInterval(function(){e._updateIndex()},1e3/this.frameRate())}start(){if(this.isRunning())return;let e=this.getLayer();this.anim.setLayers(e),this._setInterval(),this.anim.start()}stop(){this.anim.stop(),clearInterval(this.interval)}destroy(){return this.stop(),super.destroy()}isRunning(){return this.anim.isRunning()}_updateIndex(){let e=this.frameIndex(),t=this.animations()?.[this.animation()],n=t?t.length/4:0;this.frameIndex(e<n-1?e+1:0)}};j0.prototype.className=`Sprite`,ch(j0,!0),Z.addGetterSetter(j0,`animation`),Z.addGetterSetter(j0,`animations`),Z.addGetterSetter(j0,`frameOffsets`),Z.addGetterSetter(j0,`image`),Z.addGetterSetter(j0,`frameIndex`,0,X()),Z.addGetterSetter(j0,`frameRate`,17,X()),Z.backCompat(j0,{index:`frameIndex`,getIndex:`getFrameIndex`,setIndex:`setFrameIndex`});var M0=class extends ${_sceneFunc(e){let t=this.innerRadius(),n=this.outerRadius(),r=this.numPoints();e.beginPath(),e.moveTo(0,0-n);for(let i=1;i<r*2;i++){let a=i%2==0?n:t,o=a*Math.sin(i*Math.PI/r),s=-1*a*Math.cos(i*Math.PI/r);e.lineTo(o,s)}e.closePath(),e.fillStrokeShape(this)}getSelfRect(){let e=Math.max(Math.abs(this.innerRadius()),Math.abs(this.outerRadius()));return{x:-e,y:-e,width:e*2,height:e*2}}getWidth(){return this.outerRadius()*2}getHeight(){return this.outerRadius()*2}setWidth(e){this.outerRadius(e/2)}setHeight(e){this.outerRadius(e/2)}};M0.prototype.className=`Star`,M0.prototype._centroid=!0,M0.prototype._attrsAffectingSize=[`innerRadius`,`outerRadius`],ch(M0,!0),Z.addGetterSetter(M0,`numPoints`,5,X()),Z.addGetterSetter(M0,`innerRadius`,0,X()),Z.addGetterSetter(M0,`outerRadius`,0,X());var N0=``,P0=`normal`;function F0(e){e.fillText(this.partialText,0,0)}function I0(e){e.strokeText(this.partialText,0,0)}var L0=class extends ${constructor(e){super(e),this.dataArray=[],this._readDataAttribute(),this._setTextData()}_getTextPathLength(){return F1.getPathLength(this.dataArray)}_getPointAtLength(e,t){return!this.attrs.data||e>this.pathLength?null:F1.getPointAtLengthOfDataArray(e,this.dataArray,t)}_readDataAttribute(){this.dataArray=F1.parsePathData(this.attrs.data),this.pathLength=this._getTextPathLength()}_sceneFunc(e){e.setAttr(`font`,this._getContextFont()),e.setAttr(`textBaseline`,this.textBaseline()),e.setAttr(`textAlign`,`left`),e.save();let t=this.textDecoration(),n=this.fontSize(),r=this._getUnderlineOffset(),i=this.glyphInfo,a=t.indexOf(`underline`)!==-1,o=t.indexOf(`line-through`)!==-1;a&&e.beginPath();try{for(let t=0;t<i.length;t++){e.save();let n=i[t].p0,o=i[t].rotation;e.translate(n.x,n.y),e.rotate(o),this.partialText=i[t].text,this._styleTransform=new dh().rotate(-o).translate(-n.x,-n.y),e.fillStrokeShape(this),a&&(t===0&&e.moveTo(0,r),e.lineTo(i[t].width,r)),e.restore()}}finally{this._styleTransform=void 0}if(e.lineWidth=V1(n),a&&e._applyDecorationStyle(this)&&e.stroke(),o){e.beginPath();for(let t=0;t<i.length;t++){e.save();let n=i[t].p0;e.translate(n.x,n.y),e.rotate(i[t].rotation),t===0&&e.moveTo(0,0),e.lineTo(i[t].width,0),e.restore()}e._applyDecorationStyle(this)&&e.stroke()}e.restore()}_hitFunc(e){e.beginPath();let t=this.glyphInfo;if(t.length>=1){let n=t[0].p0;e.moveTo(n.x,n.y)}for(let n=0;n<t.length;n++){let r=t[n].p1;e.lineTo(r.x,r.y)}e.setAttr(`lineWidth`,this.fontSize()),e.setAttr(`strokeStyle`,this.colorKey),e.stroke()}getTextWidth(){return this.textWidth}getTextHeight(){return Y.warn(`text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.`),this.textHeight}setText(e){return v0.prototype.setText.call(this,e)}_getContextFont(){return v0.prototype._getContextFont.call(this)}_getTextSize(e){let t=Uh();t.save(),t.font=this._getContextFont(),t.fontKerning=`auto`;let n=t.measureText(e);return t.restore(),{width:n.width,height:parseInt(`${this.fontSize()}`,10)}}_setTextData(){let e=H1(this.text());this.direction()===`rtl`&&e.reverse();let t=this.kerningFunc(),n=[],r=0;for(let i=0;i<e.length;i++){let a=0;if(t&&i>0)try{a=t(e[i-1],e[i])*this.fontSize()}catch{}n.push({char:e[i],width:this._getTextSize(e[i]).width,kern:a}),r+=n[i].width+a}let{width:i,height:a}=this._getTextSize(this.attrs.text);if(this.textWidth=r,this.textHeight=a,this.glyphInfo=[],!this.attrs.data)return null;let o=this.letterSpacing(),s=this.align(),c=s===`justify`?this.text().split(` `).length-1:0,l=Math.max(0,r-i),u=Math.max(this.textWidth+(e.length-1)*o,0),d=0;s===`center`&&(d=Math.max(0,this.pathLength/2-u/2)),s===`right`&&(d=Math.max(0,this.pathLength-u));let f=d,p=this.dataArray.some((e,t)=>t>0&&e.command===`M`)?void 0:{index:0,offset:0};for(let t=0;t<n.length;t++){f+=n[t].kern;let r=this._getPointAtLength(f,p);if(!r)return;let i=n[t].char,a=n[t].width+(t<n.length-1?o:0);i===` `&&s===`justify`&&(a+=(this.pathLength-u)/c);let d=f+a,m=this._getPointAtLength(d>this.pathLength&&d-this.pathLength<=l?this.pathLength:d,p);if(!m)return;let h=F1.getLineLength(r.x,r.y,m.x,m.y),g=Math.atan2(m.y-r.y,m.x-r.x);this.glyphInfo.push({text:e[t],rotation:g,p0:r,p1:m,width:h}),f+=a}}getSelfRect(){if(!this.glyphInfo.length)return{x:0,y:0,width:0,height:0};let e=[];this.glyphInfo.forEach(function(t){e.push(t.p0.x),e.push(t.p0.y),e.push(t.p1.x),e.push(t.p1.y)});let t=Y._getPointsRect(e),n=this.fontSize(),r=t.x-n/2,i=t.y-n/2,a=t.x+t.width+n/2,o=t.y+t.height+n/2;if(this.textDecoration().indexOf(`underline`)!==-1){let e=V1(n),t=this._getUnderlineOffset()-e/2;this.glyphInfo.forEach(function(n){let s=new dh().translate(n.p0.x,n.p0.y).rotate(n.rotation)._getTransformedRect({x:0,y:t,width:n.width,height:e});r=Math.min(r,s.x),i=Math.min(i,s.y),a=Math.max(a,s.x+s.width),o=Math.max(o,s.y+s.height)})}return{x:r,y:i,width:a-r,height:o-i}}_getUnderlineOffset(){return this.fontSize()/2+1}getStrokeScaleEnabled(){return!0}_getSelfRectForDrawing(){let e=this.getSelfRect(),t=this.fontSize();return{x:e.x-t,y:e.y-t,width:e.width+t*2,height:e.height+t*2}}};L0.prototype._fillFunc=F0,L0.prototype._strokeFunc=I0,L0.prototype._fillFuncHit=F0,L0.prototype._strokeFuncHit=I0,L0.prototype.className=`TextPath`;var R0=[`text`,`fontSize`,`align`,`letterSpacing`,`kerningFunc`,`fontFamily`,`fontStyle`,`fontVariant`,`direction`];L0.prototype._attrsAffectingSize=R0.concat(`data`,`textDecoration`),ch(L0,!0),L0.prototype.on(`dataChange.konva`,function(){this._readDataAttribute(),this._setTextData()}),L0.prototype.on(R0.map(e=>e+`Change.konva`).join(` `),function(){this._setTextData()}),Z.addGetterSetter(L0,`data`),Z.addGetterSetter(L0,`fontFamily`,`Arial`),Z.addGetterSetter(L0,`fontSize`,12,X()),Z.addGetterSetter(L0,`fontStyle`,P0),Z.addGetterSetter(L0,`align`,`left`),Z.addGetterSetter(L0,`letterSpacing`,0,X()),Z.addGetterSetter(L0,`textBaseline`,`middle`),Z.addGetterSetter(L0,`fontVariant`,P0),Z.addGetterSetter(L0,`text`,N0),Z.addGetterSetter(L0,`textDecoration`,``),Z.addGetterSetter(L0,`kerningFunc`,void 0),Z.addGetterSetter(L0,`direction`,`inherit`);var z0=`tr-konva`,B0=[`resizeEnabledChange`,`rotateAnchorOffsetChange`,`rotateAnchorAngleChange`,`rotateEnabledChange`,`rotateModeChange`,`enabledAnchorsChange`,`anchorSizeChange`,`borderEnabledChange`,`shouldOverdrawWholeAreaChange`,`borderStrokeChange`,`borderStrokeWidthChange`,`borderDashChange`,`anchorStrokeChange`,`anchorStrokeWidthChange`,`anchorFillChange`,`anchorCornerRadiusChange`,`ignoreStrokeChange`,`anchorStyleFuncChange`,`paddingChange`].map(e=>e+`.${z0}`).join(` `),V0=`nodesRect`,H0=[`widthChange`,`heightChange`,`scaleXChange`,`scaleYChange`,`skewXChange`,`skewYChange`,`rotationChange`,`offsetXChange`,`offsetYChange`,`transformsEnabledChange`,`strokeWidthChange`,`strokeChange`,`selfRectFuncChange`,`strokeLinearGradientColorStopsChange`,`strokeScaleEnabledChange`,`strokeEnabledChange`,`draggableChange`],U0={"top-left":-45,"top-center":0,"top-right":45,"middle-right":-90,"middle-left":90,"bottom-left":-135,"bottom-center":180,"bottom-right":135},W0=`ontouchstart`in J._global,G0=[`rotater-top-left`,`rotater-top-right`,`rotater-bottom-left`,`rotater-bottom-right`];function K0(e){return e.startsWith(`rotater`)}var q0=Math.PI/12;function J0(e,t){let n=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g transform="rotate(${e} 12 12)" stroke-linejoin="round"><path d="M5 8 A11 11 0 0 1 16 19" fill="none" stroke="white" stroke-width="4"/><path d="M2 8 L6 4.5 L6 11.5 Z M16 22 L12.5 18 L19.5 18 Z" fill="black" stroke="white"/><path d="M5 8 A11 11 0 0 1 16 19" fill="none" stroke="black" stroke-width="1.5"/></g></svg>`;return`url("data:image/svg+xml,${encodeURIComponent(n)}") 12 12, ${t}`}function Y0(e,t,n){if(e===`rotater`)return n;if(K0(e)){let r=e.slice(8);return J0(Math.round(Y.radToDeg(t)+U0[r]-45),n)}t+=Y.degToRad(U0[e]||0);let r=(Y.radToDeg(t)%360+360)%360;return Y._inRange(r,337.5,360)||Y._inRange(r,0,22.5)?`ns-resize`:Y._inRange(r,22.5,67.5)?`nesw-resize`:Y._inRange(r,67.5,112.5)?`ew-resize`:Y._inRange(r,112.5,157.5)?`nwse-resize`:Y._inRange(r,157.5,202.5)?`ns-resize`:Y._inRange(r,202.5,247.5)?`nesw-resize`:Y._inRange(r,247.5,292.5)?`ew-resize`:Y._inRange(r,292.5,337.5)?`nwse-resize`:(Y.error(`Transformer has unknown angle for cursor detection: `+r),`pointer`)}var X0=[`top-left`,`top-center`,`top-right`,`middle-right`,`middle-left`,`bottom-left`,`bottom-center`,`bottom-right`];function Z0(e){return{x:e.x+e.width/2*Math.cos(e.rotation)+e.height/2*Math.sin(-e.rotation),y:e.y+e.height/2*Math.cos(e.rotation)+e.width/2*Math.sin(e.rotation)}}function Q0(e,t,n){let r=n.x+(e.x-n.x)*Math.cos(t)-(e.y-n.y)*Math.sin(t),i=n.y+(e.x-n.x)*Math.sin(t)+(e.y-n.y)*Math.cos(t);return{...e,rotation:e.rotation+t,x:r,y:i}}function $0(e,t){return Q0(e,t,Z0(e))}function ev(e,t,n){let r=t,i=n;for(let n=0;n<e.length;n++){let a=J.getAngle(e[n]),o=Math.abs(a-t)%(Math.PI*2),s=Math.min(o,Math.PI*2-o);s<i&&(i=s,r=a)}return r}function tv(e,t,n){let r=Y.degToRad(e.rotateAnchorAngle()),i=Math.sin(r),a=-Math.cos(r),o=t/2,s=n/2,c=1/0;a<0?c=Math.min(c,-s/a):a>0&&(c=Math.min(c,(n-s)/a)),i<0?c=Math.min(c,-o/i):i>0&&(c=Math.min(c,(t-o)/i));let l=o+i*c,u=s+a*c,d=e.rotateAnchorOffset()+e.padding();return{edgeX:l,edgeY:u,endX:l+i*d,endY:u+a*d}}var nv=new Set,rv=class extends n1{static _isLayerTransforming(e){for(let t of nv)if(t.getLayer()===e||t._nodes.some(t=>t.getLayer()===e))return!0;return!1}constructor(e){super(e),this._movingAnchorName=null,this._anchors={},this._transforming=!1,this._fitting=!1,this._transformWindow=null,this._elementsCreated=!1,this._updatePending=!1,this._createElements(),this._handleMouseMove=this._handleMouseMove.bind(this),this._handleMouseUp=this._handleMouseUp.bind(this),this.update=this.update.bind(this),this._syncUpdate=this._syncUpdate.bind(this),this.on(B0,e=>{e.type===`ignoreStrokeChange`&&this._resetTransformCache(),this.update()}),this.on(`rotationChange.${z0}`,()=>this._clearCache(V0)),this.getNode()&&this.update()}attachTo(e){return this.setNode(e),this}setNode(e){return Y.warn(`tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.`),this.setNodes([e])}getNode(){return this._nodes&&this._nodes[0]}_getEventNamespace(){return z0+this._id}setNodes(e=[]){this._nodes&&this._nodes.length&&this.detach();let t=new Set(e);for(let e of t)e.isAncestorOf(this)&&(Y.error(`Konva.Transformer cannot be an a child of the node you are trying to attach`),t.delete(e));let n=Array.from(t).filter(e=>{for(let n=e.getParent();n;n=n.getParent())if(t.has(n))return!1;return!0});return this._nodes=e=n,this._resetRotation(),this._nodes.forEach(e=>{let t=()=>{var t;this._fitting?(t=this._nodeRectCache)==null||t.delete(e):(this.nodes().length===1&&this.useSingleNodeRotation()&&this.rotation(this.nodes()[0].getAbsoluteRotation()),this._resetTransformCache(e),this.isDragging()||this._scheduleUpdate())};if(e._attrsAffectingSize.length){let n=e._attrsAffectingSize.map(e=>e+`Change.`+this._getEventNamespace()).join(` `);e.on(n,t)}e.on(H0.map(e=>e+`.${this._getEventNamespace()}`).join(` `),t),e.on(`absoluteTransformChange.${this._getEventNamespace()}`,t),e instanceof Yg&&e._addSubtreeObserver(this),e.on(`destroy.${this._getEventNamespace()}`,()=>{this._removeNode(e)}),this._proxyDrag(e)}),this._resetTransformCache(),this._elementsCreated&&this.update(),this}_proxyDrag(e){let t;e.on(`dragstart.${this._getEventNamespace()}`,n=>{t=e.getAbsolutePosition(),!this.isDragging()&&e!==this._back&&this.startDrag(n,!1)}),e.on(`dragmove.${this._getEventNamespace()}`,n=>{if(!t)return;let r=e.getAbsolutePosition(),i=r.x-t.x,a=r.y-t.y;this.nodes().forEach(t=>{if(t===e||t.isDragging())return;let r=t.getAbsolutePosition();t.setAbsolutePosition({x:r.x+i,y:r.y+a}),t.startDrag(n)}),t=null})}_detachNode(e){e.off(`.`+this._getEventNamespace()),e._removeSubtreeObserver(this)}_resetRotation(){let e=this._nodes.length===1&&this.useSingleNodeRotation();this.rotation(e?this._nodes[0].getAbsoluteRotation():0)}_removeNode(e){this._detachNode(e),this._nodes=this._nodes.filter(t=>t!==e),this._resetRotation(),this._resetTransformCache(e),this._scheduleUpdate()}getNodes(){return this._nodes||[]}getActiveAnchor(){return this._movingAnchorName}detach(){var e,t;(e=this._nodes)==null||e.forEach(e=>this._detachNode(e)),this._nodes=[],this._updatePending=!1,this._resetTransformCache(),(t=this.getLayer())==null||t.batchDraw()}_resetTransformCache(e){var t,n;e?(t=this._nodeRectCache)==null||t.delete(e):(n=this._nodeRectCache)==null||n.clear(),this._clearCache(V0),this._clearCache(`transform`),this._clearSelfAndDescendantCache(`absoluteTransform`)}_onSubtreeChange(e){var t;this._fitting||((!this._updatePending||this._cache[V0])&&this._resetTransformCache(e),Q._updateBatchDepth>0?this._scheduleUpdate():this._updatePending||(this._updatePending=!0,Y.requestAnimFrame(this._syncUpdate,this.getStage()?._getOwnerWindow()),(t=this.getLayer())==null||t.batchDraw()))}_syncUpdate(){this._updatePending&&!this._fitting&&!this.isDragging()&&this._update()}drawScene(e,t){return this._syncUpdate(),super.drawScene(e,t)}drawHit(e,t){return this._syncUpdate(),super.drawHit(e,t)}_getNodeRect(){return this._getCache(V0,this.__getNodeRect)}__getNodeRect(){if(!this.getNode())return{x:-1e8,y:-1e8,width:0,height:0,rotation:0};let e=J.getAngle(this.rotation()),t=this.ignoreStroke(),n=new dh;n.rotate(-e);let r=this._nodeRectCache||=new Map,i=1/0,a=1/0,o=-1/0,s=-1/0;for(let c of this.nodes()){let l=c instanceof $&&c.getSelfRect===$.prototype.getSelfRect&&!c.attrs.selfRectFunc&&!c._hasCachedAncestor(),u=l?c.width():0,d=l?c.height():0;l&&(c._attrsVersion??=0);let f=l?r.get(c):void 0;if(!f||f.rotation!==e||f.ignoreStroke!==t||f.version!==c._attrsVersion||f.width!==u||f.height!==d){let i=c.getAbsoluteTransform(),[a,o,s,p]=i.getMatrix(),m=a*p-o*s===0,h=c.getClientRect({skipTransform:!m,skipShadow:!0,skipStroke:t}),g=[{x:h.x,y:h.y},{x:h.x+h.width,y:h.y},{x:h.x+h.width,y:h.y+h.height},{x:h.x,y:h.y+h.height}];m&&(i=new dh),f={rotation:e,ignoreStroke:t,width:u,height:d,version:c._attrsVersion||0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};for(let e of g){let t=n.point(i.point(e));f.minX=Math.min(f.minX,t.x),f.minY=Math.min(f.minY,t.y),f.maxX=Math.max(f.maxX,t.x),f.maxY=Math.max(f.maxY,t.y)}l&&r.set(c,f)}i=Math.min(i,f.minX),a=Math.min(a,f.minY),o=Math.max(o,f.maxX),s=Math.max(s,f.maxY)}n.invert();let c=n.point({x:i,y:a});return{x:c.x,y:c.y,width:o-i,height:s-a,rotation:J.getAngle(this.rotation())}}getX(){return this._getNodeRect().x}getY(){return this._getNodeRect().y}getWidth(){return this._getNodeRect().width}getHeight(){return this._getNodeRect().height}_createElements(){this._createBack(),G0.forEach(e=>{this._createAnchor(e,`_rotate-zone`).setAttrs({fill:`transparent`,strokeEnabled:!1,visible:!1})}),X0.forEach(e=>{this._createAnchor(e)}),this._createAnchor(`rotater`),this._elementsCreated=!0}_createAnchor(e,t=`_anchor`){let n=new D0({stroke:`rgb(0, 161, 255)`,fill:`white`,strokeWidth:1,name:e+` `+t,dragDistance:0,draggable:!0,hitStrokeWidth:W0?10:`auto`});this._anchors[e]=n;let r=this;return n.on(`mousedown touchstart`,function(e){r._handleMouseDown(e)}),n.on(`dragstart`,e=>{n.stopDrag(),e.cancelBubble=!0}),n.on(`dragend`,e=>{e.cancelBubble=!0}),n.on(`mouseenter`,()=>{this.isTransforming()||(this._setAnchorCursor(e),this._cursorChange=!0)}),n.on(`mouseout`,()=>{this._cursorChange=!1,this.isTransforming()||n.getStage().content&&(n.getStage().content.style.cursor=``)}),this.add(n),n}_setAnchorCursor(e,t=J.getAngle(this.rotation())){let n=this.getStage()?.content;n&&(n.style.cursor=Y0(e,t,this.rotateAnchorCursor()))}_createBack(){let e=new $({name:`back`,width:0,height:0,sceneFunc(e,t){let n=t.getParent();if(!n.borderEnabled())return;let r=n.padding(),i=t.width(),a=t.height();if(e.beginPath(),e.rect(-r,-r,i+r*2,a+r*2),n.rotateEnabled()&&n.rotateLineVisible()&&n.rotateMode()!==`corners`){let t=tv(n,i,a);e.moveTo(t.edgeX,t.edgeY),e.lineTo(t.endX,t.endY)}e.fillStrokeShape(t)},hitFunc:(e,t)=>{if(!this.shouldOverdrawWholeArea())return;let n=this.padding();e.beginPath(),e.rect(-n,-n,t.width()+n*2,t.height()+n*2),e.fillStrokeShape(t)}});this._back=e,this.add(e),this._proxyDrag(e),e.on(`dragstart`,e=>{e.cancelBubble=!0}),e.on(`dragmove`,e=>{e.cancelBubble=!0}),e.on(`dragend`,e=>{e.cancelBubble=!0}),this.on(`dragmove`,e=>{this.update()})}_handleMouseDown(e){if(e.evt.button!==void 0&&!J.dragButtons.includes(e.evt.button)||this._transforming)return;this._movingAnchorName=e.target.name().split(` `)[0];let t=this._getNodeRect(),n=t.width,r=t.height,i=Math.sqrt(n**2+r**2);this.sin=Math.abs(r/i),this.cos=Math.abs(n/i);let a=this.getStage()?._getOwnerWindow();this._transformWindow=a||null,a&&(a.addEventListener(`mousemove`,this._handleMouseMove),a.addEventListener(`touchmove`,this._handleMouseMove),a.addEventListener(`mouseup`,this._handleMouseUp,!0),a.addEventListener(`touchend`,this._handleMouseUp,!0),a.addEventListener(`touchcancel`,this._handleMouseUp,!0)),this._transforming=!0,this._pointerId=e.pointerId??Y._getFirstPointerId(e.evt);let o=e.target.getAbsolutePosition(),s=e.target.getStage()._getPointerById(this._pointerId);if(this._anchorDragOffset={x:s.x-o.x,y:s.y-o.y},K0(this._movingAnchorName)){let e=Z0(t);this._rotateStart={pointerAngle:Math.atan2(s.y-e.y,s.x-e.x),rotation:t.rotation}}nv.add(this),this._fire(`transformstart`,{evt:e.evt,target:this.getNode()}),this._nodes.forEach(t=>{t._fire(`transformstart`,{evt:e.evt,target:t})})}_handleMouseMove(e){var t;(t=this.getStage())==null||t._batchEvents(()=>this._moveTransform(e))}_moveTransform(e){this._syncUpdate();let t,n,r,i=this._anchors[this._movingAnchorName],a=i.getStage();a.setPointersPositions(e);let o=a._getPointerById(this._pointerId);if(!o)return;let s={x:o.x-this._anchorDragOffset.x,y:o.y-this._anchorDragOffset.y},c=i.getAbsolutePosition();this.anchorDragBoundFunc()&&(s=this.anchorDragBoundFunc()(c,s,e)),i.setAbsolutePosition(s);let l=i.getAbsolutePosition();if(c.x===l.x&&c.y===l.y)return;if(K0(this._movingAnchorName)){let t=this._getNodeRect(),n=Z0(t),r=this._rotateStart,i={x:l.x+this._anchorDragOffset.x,y:l.y+this._anchorDragOffset.y},a=Math.atan2(i.y-n.y,i.x-n.x),o=r.rotation+a-r.pointerAngle,s;if(e.shiftKey&&this.shiftBehavior()!==`none`)s=Math.round(o/q0)*q0;else{let e=J.getAngle(this.rotationSnapTolerance());s=ev(this.rotationSnaps(),o,e)}this._movingAnchorName!==`rotater`&&this._setAnchorCursor(this._movingAnchorName,s);let c=$0(t,s-t.rotation);this._fitNodesInto(c,e);return}let u=this.shiftBehavior(),d;d=u===`inverted`?this.keepRatio()&&!e.shiftKey:u===`none`?this.keepRatio():this.keepRatio()||e.shiftKey;let f=this.centeredScaling()||e.altKey,p=!1;if(this._movingAnchorName===`top-left`){if(d){p=!0;let e=f?{x:this.width()/2,y:this.height()/2}:{x:this._anchors[`bottom-right`].x(),y:this._anchors[`bottom-right`].y()};r=Math.sqrt((e.x-i.x())**2+(e.y-i.y())**2);let a=this._anchors[`top-left`].x()>e.x?-1:1,o=this._anchors[`top-left`].y()>e.y?-1:1;t=r*this.cos*a,n=r*this.sin*o,this._anchors[`top-left`].x(e.x-t),this._anchors[`top-left`].y(e.y-n)}}else if(this._movingAnchorName===`top-center`)this._anchors[`top-left`].y(i.y());else if(this._movingAnchorName===`top-right`){if(d){p=!0;let e=f?{x:this.width()/2,y:this.height()/2}:{x:this._anchors[`bottom-left`].x(),y:this._anchors[`bottom-left`].y()};r=Math.sqrt((i.x()-e.x)**2+(e.y-i.y())**2);let a=this._anchors[`top-right`].x()<e.x?-1:1,o=this._anchors[`top-right`].y()>e.y?-1:1;t=r*this.cos*a,n=r*this.sin*o,this._anchors[`top-right`].x(e.x+t),this._anchors[`top-right`].y(e.y-n)}var m=i.position();this._anchors[`top-left`].y(m.y),this._anchors[`bottom-right`].x(m.x)}else if(this._movingAnchorName===`middle-left`)this._anchors[`top-left`].x(i.x());else if(this._movingAnchorName===`middle-right`)this._anchors[`bottom-right`].x(i.x());else if(this._movingAnchorName===`bottom-left`){if(d){p=!0;let e=f?{x:this.width()/2,y:this.height()/2}:{x:this._anchors[`top-right`].x(),y:this._anchors[`top-right`].y()};r=Math.sqrt((e.x-i.x())**2+(i.y()-e.y)**2);let a=e.x<i.x()?-1:1,o=i.y()<e.y?-1:1;t=r*this.cos*a,n=r*this.sin*o,i.x(e.x-t),i.y(e.y+n)}m=i.position(),this._anchors[`top-left`].x(m.x),this._anchors[`bottom-right`].y(m.y)}else if(this._movingAnchorName===`bottom-center`)this._anchors[`bottom-right`].y(i.y());else if(this._movingAnchorName===`bottom-right`){if(d){p=!0;let e=f?{x:this.width()/2,y:this.height()/2}:{x:this._anchors[`top-left`].x(),y:this._anchors[`top-left`].y()};r=Math.sqrt((i.x()-e.x)**2+(i.y()-e.y)**2);let a=this._anchors[`bottom-right`].x()<e.x?-1:1,o=this._anchors[`bottom-right`].y()<e.y?-1:1;t=r*this.cos*a,n=r*this.sin*o,this._anchors[`bottom-right`].x(e.x+t),this._anchors[`bottom-right`].y(e.y+n)}}else console.error(Error(`Wrong position argument of selection resizer: `+this._movingAnchorName));if(f=this.centeredScaling()||e.altKey,f){let e=this._anchors[`top-left`],t=this._anchors[`bottom-right`],n=e.x(),r=e.y(),i=this.getWidth()-t.x(),a=this.getHeight()-t.y();t.move({x:-n,y:-r}),e.move({x:i,y:a})}let h=this._anchors[`top-left`].getAbsolutePosition();t=h.x,n=h.y;let g=this._anchors[`bottom-right`].x()-this._anchors[`top-left`].x(),_=this._anchors[`bottom-right`].y()-this._anchors[`top-left`].y();this._fitNodesInto({x:t,y:n,width:g,height:_,rotation:J.getAngle(this.rotation())},e,p)}_handleMouseUp(e){let t=this.getStage();t&&(t.setPointersPositions(e),!t._changedPointerPositions.some(e=>e.id===this._pointerId))||(t?t._batchEvents(()=>this._removeEvents(e)):this._removeEvents(e))}getAbsoluteTransform(e){let t=this.getTransform();return e?e.getAbsoluteTransform().copy().invert().multiply(t):t}_removeEvents(e){var t;if(this._transforming){this._transforming=!1;let n=this.getStage()?.content;n&&!this._cursorChange&&(n.style.cursor=``);let r=this._transformWindow;this._transformWindow=null,r&&(r.removeEventListener(`mousemove`,this._handleMouseMove),r.removeEventListener(`touchmove`,this._handleMouseMove),r.removeEventListener(`mouseup`,this._handleMouseUp,!0),r.removeEventListener(`touchend`,this._handleMouseUp,!0),r.removeEventListener(`touchcancel`,this._handleMouseUp,!0));let i=this.getNode();nv.delete(this),this._fire(`transformend`,{evt:e,target:i}),(t=this.getLayer())==null||t.batchDraw(),i&&this._nodes.forEach(t=>{var n;t._fire(`transformend`,{evt:e,target:t}),(n=t.getLayer())==null||n.batchDraw()}),this._movingAnchorName=null}}_fitNodesInto(e,t,n=!1){this._fitting=!0;try{return this._doFitNodesInto(e,t,n)}finally{this._fitting=!1}}_doFitNodesInto(e,t,n=!1){let r=this._getNodeRect();if(!r.width||!r.height||Y._inRange(e.width,-this.padding()*2-1,1)||Y._inRange(e.height,-this.padding()*2-1,1)){this.update();return}let i=new dh;i.rotate(J.getAngle(this.rotation()));let a=n?0:this.padding()*2,o=null,s=null;if(this._movingAnchorName&&e.width<0&&this._movingAnchorName.indexOf(`left`)>=0){let t=i.point({x:-a,y:0});e.x+=t.x,e.y+=t.y,e.width+=a,o={axis:`width`,from:`left`,to:`right`,offset:t}}else if(this._movingAnchorName&&e.width<0&&this._movingAnchorName.indexOf(`right`)>=0){let t=i.point({x:a,y:0});e.width+=a,o={axis:`width`,from:`right`,to:`left`,offset:t}}if(this._movingAnchorName&&e.height<0&&this._movingAnchorName.indexOf(`top`)>=0){let t=i.point({x:0,y:-a});e.x+=t.x,e.y+=t.y,e.height+=a,s={axis:`height`,from:`top`,to:`bottom`,offset:t}}else if(this._movingAnchorName&&e.height<0&&this._movingAnchorName.indexOf(`bottom`)>=0){let t=i.point({x:0,y:a});e.height+=a,s={axis:`height`,from:`bottom`,to:`top`,offset:t}}if(this.boundBoxFunc()){let t=this.boundBoxFunc()(r,e);t?e=t:Y.warn(`boundBoxFunc returned falsy. You should return new bound rect from it!`)}for(let t of[o,s])t&&e[t.axis]<0&&this._movingAnchorName&&(this._movingAnchorName=this._movingAnchorName.replace(t.from,t.to),this._anchorDragOffset.x-=t.offset.x,this._anchorDragOffset.y-=t.offset.y);let c=1e7,l=new dh;l.translate(r.x,r.y),l.rotate(r.rotation),l.scale(r.width/c,r.height/c);let u=new dh,d=e.width/c,f=e.height/c;this.flipEnabled()===!1?(u.translate(e.x,e.y),u.rotate(e.rotation),u.translate(e.width<0?e.width:0,e.height<0?e.height:0),u.scale(Math.abs(d),Math.abs(f))):(u.translate(e.x,e.y),u.rotate(e.rotation),u.scale(d,f));let p=u.multiply(l.invert()),m=new Set;this._nodes.forEach(e=>{if(!e.getStage())return;let t=e.getParent().getAbsoluteTransform(),n=e.getTransform().copy();n.translate(e.offsetX(),e.offsetY());let r=new dh;r.multiply(t.copy().invert()).multiply(p).multiply(t).multiply(n);let i=r.decompose();e.setAttrs(i);let a=e.getLayer();a&&m.add(a)}),this.rotation(Y._getRotation(e.rotation)),this._nodes.forEach(e=>{this._fire(`transform`,{evt:t,target:e}),e._fire(`transform`,{evt:t,target:e})}),this._resetTransformCache(),this.update(),m.add(this.getLayer()),m.forEach(e=>e&&e.batchDraw())}_scheduleUpdate(){this._updatePending=!0,Q._runAfterUpdateBatch(this._syncUpdate)}forceUpdate(){this._resetTransformCache(),this.update()}update(){this._lastNodeRect=void 0,this._update()}_update(){var e;this._updatePending=!1;let t=this._getNodeRect();this._updateElements(t);let n=this.nodes().some(e=>e.draggable());this._back.draggable()!==n&&this._back.draggable(n);let r=this.anchorStyleFunc();r&&Object.values(this._anchors).forEach(e=>e.hasName(`_anchor`)&&r(e)),(e=this.getLayer())==null||e.batchDraw()}_updateElements(e){let t=this._lastNodeRect;if(t&&!this.anchorStyleFunc()&&e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height&&e.rotation===t.rotation)return;this._lastNodeRect={...e};let n=e.width,r=e.height,i=this.enabledAnchors(),a=this.resizeEnabled(),o=this.padding(),s=this.anchorSize();Object.values(this._anchors).filter(e=>e.hasName(`_anchor`)).forEach(e=>{e.setAttrs({width:s,height:s,offsetX:s/2,offsetY:s/2,stroke:this.anchorStroke(),strokeWidth:this.anchorStrokeWidth(),fill:this.anchorFill(),cornerRadius:this.anchorCornerRadius()})}),this._anchors[`top-left`].setAttrs({x:0,y:0,offsetX:s/2+o,offsetY:s/2+o,visible:a&&i.indexOf(`top-left`)>=0}),this._anchors[`top-center`].setAttrs({x:n/2,y:0,offsetY:s/2+o,visible:a&&i.indexOf(`top-center`)>=0}),this._anchors[`top-right`].setAttrs({x:n,y:0,offsetX:s/2-o,offsetY:s/2+o,visible:a&&i.indexOf(`top-right`)>=0}),this._anchors[`middle-left`].setAttrs({x:0,y:r/2,offsetX:s/2+o,visible:a&&i.indexOf(`middle-left`)>=0}),this._anchors[`middle-right`].setAttrs({x:n,y:r/2,offsetX:s/2-o,visible:a&&i.indexOf(`middle-right`)>=0}),this._anchors[`bottom-left`].setAttrs({x:0,y:r,offsetX:s/2+o,offsetY:s/2-o,visible:a&&i.indexOf(`bottom-left`)>=0}),this._anchors[`bottom-center`].setAttrs({x:n/2,y:r,offsetY:s/2-o,visible:a&&i.indexOf(`bottom-center`)>=0}),this._anchors[`bottom-right`].setAttrs({x:n,y:r,offsetX:s/2-o,offsetY:s/2-o,visible:a&&i.indexOf(`bottom-right`)>=0});let c=this.rotateMode(),l=tv(this,n,r);this._anchors.rotater.setAttrs({x:l.endX,y:l.endY,visible:this.rotateEnabled()&&c!==`corners`});let u=s*2,d=this.rotateEnabled()&&c!==`handle`,f=-o-u;G0.forEach(e=>{this._anchors[e].setAttrs({x:e.includes(`left`)?f:n+o,y:e.includes(`top`)?f:r+o,width:u,height:u,visible:d})}),this._back.setAttrs({width:n,height:r,visible:this.borderEnabled()||this.shouldOverdrawWholeArea(),stroke:this.borderStroke(),strokeWidth:this.borderStrokeWidth(),dash:this.borderDash(),x:0,y:0})}isTransforming(){return this._transforming}stopTransform(){this._transforming&&this._removeEvents()}destroy(){return this.getStage()&&this._cursorChange&&this.getStage().content&&(this.getStage().content.style.cursor=``),n1.prototype.destroy.call(this),this.detach(),this._removeEvents(),this}add(...e){return this._elementsCreated?(Y.error(`You cannot add external nodes to the Transformer. Use tr.nodes([node]) instead.`),this):super.add(...e)}toObject(){return Q.prototype.toObject.call(this)}clone(e){return Q.prototype.clone.call(this,e)}getClientRect(e){return this._syncUpdate(),this.nodes().length>0?super.getClientRect(e):{x:0,y:0,width:0,height:0}}};rv.isTransforming=()=>nv.size>0;function iv(e){return e instanceof Array||Y.warn(`enabledAnchors value should be an array`),e instanceof Array&&e.forEach(function(e){X0.indexOf(e)===-1&&Y.warn(`Unknown anchor name: `+e+`. Available names are: `+X0.join(`, `))}),e||[]}rv.prototype.className=`Transformer`,ch(rv),Z.addGetterSetter(rv,`enabledAnchors`,X0,iv),Z.addGetterSetter(rv,`flipEnabled`,!0,Sg()),Z.addGetterSetter(rv,`resizeEnabled`,!0),Z.addGetterSetter(rv,`anchorSize`,10,X()),Z.addGetterSetter(rv,`rotateEnabled`,!0),Z.addGetterSetter(rv,`rotateLineVisible`,!0),Z.addGetterSetter(rv,`rotationSnaps`,[]),Z.addGetterSetter(rv,`rotateAnchorOffset`,50,X()),Z.addGetterSetter(rv,`rotateAnchorAngle`,0,X()),Z.addGetterSetter(rv,`rotateAnchorCursor`,`crosshair`),Z.addGetterSetter(rv,`rotateMode`,`handle`),Z.addGetterSetter(rv,`rotationSnapTolerance`,5,X()),Z.addGetterSetter(rv,`borderEnabled`,!0),Z.addGetterSetter(rv,`anchorStroke`,`rgb(0, 161, 255)`),Z.addGetterSetter(rv,`anchorStrokeWidth`,1,X()),Z.addGetterSetter(rv,`anchorFill`,`white`),Z.addGetterSetter(rv,`anchorCornerRadius`,0,X()),Z.addGetterSetter(rv,`borderStroke`,`rgb(0, 161, 255)`),Z.addGetterSetter(rv,`borderStrokeWidth`,1,X()),Z.addGetterSetter(rv,`borderDash`),Z.addGetterSetter(rv,`keepRatio`,!0),Z.addGetterSetter(rv,`shiftBehavior`,`default`),Z.addGetterSetter(rv,`centeredScaling`,!1),Z.addGetterSetter(rv,`ignoreStroke`,!1),Z.addGetterSetter(rv,`padding`,0,X()),Z.addGetterSetter(rv,`nodes`),Z.addGetterSetter(rv,`node`),Z.addGetterSetter(rv,`boundBoxFunc`),Z.addGetterSetter(rv,`anchorDragBoundFunc`),Z.addGetterSetter(rv,`anchorStyleFunc`),Z.addGetterSetter(rv,`shouldOverdrawWholeArea`,!1),Z.addGetterSetter(rv,`useSingleNodeRotation`,!0),Z.backCompat(rv,{lineEnabled:`borderEnabled`,rotateHandlerOffset:`rotateAnchorOffset`,enabledHandlers:`enabledAnchors`});var av=class extends ${_sceneFunc(e){e.beginPath(),e.arc(0,0,Math.abs(this.radius()),0,J.getAngle(this.angle()),this.clockwise()),e.lineTo(0,0),e.closePath(),e.fillStrokeShape(this)}getWidth(){return Math.abs(this.radius())*2}getHeight(){return Math.abs(this.radius())*2}setWidth(e){this.radius(e/2)}setHeight(e){this.radius(e/2)}};av.prototype.className=`Wedge`,av.prototype._centroid=!0,av.prototype._attrsAffectingSize=[`radius`],ch(av,!0),Z.addGetterSetter(av,`radius`,0,X()),Z.addGetterSetter(av,`angle`,0,X()),Z.addGetterSetter(av,`clockwise`,!1),Z.backCompat(av,{angleDeg:`angle`,getAngleDeg:`getAngle`,setAngleDeg:`setAngle`});function ov(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var sv=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],cv=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function lv(e,t){return t===255?e:e*t/255}var uv=180;function dv(e,t){let n=e.data,r=e.width,i=e.height,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=t+t+1,E=r-1,D=i-1,O=t+1,k=O*(O+1)/2,A=new ov,j=t<=uv?sv[t]/2**cv[t]:1/(O*O),M=null,N=A,P=null,F=null;for(let e=1;e<T;e++)N=N.next=new ov,e===O&&(M=N);N.next=A,s=o=0;for(let e=0;e<i;e++){g=_=v=y=c=l=u=d=0,C=n[o+3],b=lv(n[o],C),x=lv(n[o+1],C),S=lv(n[o+2],C),f=O*b,p=O*x,m=O*S,h=O*C,c+=k*b,l+=k*x,u+=k*S,d+=k*C,N=A;for(let e=0;e<O;e++)N.r=b,N.g=x,N.b=S,N.a=C,N=N.next;for(let e=1;e<O;e++)a=o+((E<e?E:e)<<2),C=n[a+3],c+=(N.r=b=lv(n[a],C))*(w=O-e),l+=(N.g=x=lv(n[a+1],C))*w,u+=(N.b=S=lv(n[a+2],C))*w,d+=(N.a=C)*w,g+=b,_+=x,v+=S,y+=C,N=N.next;P=A,F=M;for(let e=0;e<r;e++)n[o]=Math.floor(c*j),n[o+1]=Math.floor(l*j),n[o+2]=Math.floor(u*j),n[o+3]=Math.floor(d*j),c-=f,l-=p,u-=m,d-=h,f-=P.r,p-=P.g,m-=P.b,h-=P.a,a=s+((a=e+t+1)<E?a:E)<<2,C=n[a+3],g+=P.r=lv(n[a],C),_+=P.g=lv(n[a+1],C),v+=P.b=lv(n[a+2],C),y+=P.a=C,c+=g,l+=_,u+=v,d+=y,P=P.next,f+=b=F.r,p+=x=F.g,m+=S=F.b,h+=C=F.a,g-=b,_-=x,v-=S,y-=C,F=F.next,o+=4;s+=r}for(let e=0;e<r;e++){_=v=y=g=l=u=d=c=0,o=e<<2,f=O*(b=n[o]),p=O*(x=n[o+1]),m=O*(S=n[o+2]),h=O*(C=n[o+3]),c+=k*b,l+=k*x,u+=k*S,d+=k*C,N=A;for(let e=0;e<O;e++)N.r=b,N.g=x,N.b=S,N.a=C,N=N.next;let s=Math.min(1,D)*r;for(let i=1;i<=t;i++)o=s+e<<2,c+=(N.r=b=n[o])*(w=O-i),l+=(N.g=x=n[o+1])*w,u+=(N.b=S=n[o+2])*w,d+=(N.a=C=n[o+3])*w,g+=b,_+=x,v+=S,y+=C,N=N.next,i<D&&(s+=r);o=e,P=A,F=M;for(let t=0;t<i;t++)a=o<<2,n[a+3]=C=Math.floor(d*j),C>0?(C=255/C,n[a]=Math.floor(c*j)*C,n[a+1]=Math.floor(l*j)*C,n[a+2]=Math.floor(u*j)*C):n[a]=n[a+1]=n[a+2]=0,c-=f,l-=p,u-=m,d-=h,f-=P.r,p-=P.g,m-=P.b,h-=P.a,a=e+((a=t+O)<D?a:D)*r<<2,c+=g+=P.r=n[a],l+=_+=P.g=n[a+1],u+=v+=P.b=n[a+2],d+=y+=P.a=n[a+3],P=P.next,f+=b=F.r,p+=x=F.g,m+=S=F.b,h+=C=F.a,g-=b,_-=x,v-=S,y-=C,F=F.next,o+=r}}var fv=function(e,t=1){let n=Math.round(Math.min(this.blurRadius(),uv)*t);n>0&&dv(e,n)};Og(`blur`,(e,t,n)=>{let r=Math.round(2*t*n);if(r<=0)return;let{width:i,height:a,data:o}=e,s=i*4,c=s+8,l={width:i+2,height:a+2,data:new Uint8ClampedArray(c*(a+2))};for(let e=0;e<a;e++)l.data.set(o.subarray(e*s,e*s+s),(e+1)*c+4);dv(l,r);for(let e=0;e<a;e++){let t=(e+1)*c+4;o.set(l.data.subarray(t,t+s),e*s)}}),Z.addGetterSetter(Q,`blurRadius`,0,X(),Z.afterSetFilter);var pv=function(e){let t=this.brightness()*255,n=e.data,r=n.length;for(let e=0;e<r;e+=4)n[e]+=t,n[e+1]+=t,n[e+2]+=t};Z.addGetterSetter(Q,`brightness`,0,X(),Z.afterSetFilter);var mv=function(e){hv(e,this.attrs.brightness===void 0?1:this.brightness())};Og(`brightness`,hv);function hv(e,t){let n=e.data,r=n.length;for(let e=0;e<r;e+=4)n[e]=Math.min(255,n[e]*t),n[e+1]=Math.min(255,n[e+1]*t),n[e+2]=Math.min(255,n[e+2]*t)}var gv=function(e){_v(e,((this.contrast()+100)/100)**2)};Og(`contrast`,_v);function _v(e,t){let n=e.data,r=n.length,i=150,a=150,o=150;for(let e=0;e<r;e+=4)i=n[e],a=n[e+1],o=n[e+2],i/=255,i-=.5,i*=t,i+=.5,i*=255,a/=255,a-=.5,a*=t,a+=.5,a*=255,o/=255,o-=.5,o*=t,o+=.5,o*=255,i=i<0?0:i>255?255:i,a=a<0?0:a>255?255:a,o=o<0?0:o>255?255:o,n[e]=i,n[e+1]=a,n[e+2]=o}Z.addGetterSetter(Q,`contrast`,0,X(),Z.afterSetFilter);var vv=function(e){let t=e.data,n=e.width,r=e.height,i=Math.min(1,Math.max(0,this.embossStrength?.call(this)??.5)),a=Math.min(1,Math.max(0,this.embossWhiteLevel?.call(this)??.5)),o={"top-left":315,top:270,"top-right":225,right:180,"bottom-right":135,bottom:90,"bottom-left":45,left:0},s=this.embossDirection?.call(this)??`top-left`,c=o[s];c===void 0&&(Y.warn(`Unknown emboss direction: "`+s+`". Using "top-left".`),c=o[`top-left`]);let l=!!(this.embossBlend?.call(this)??!1),u=i*10,d=a*255,f=c*Math.PI/180,p=Math.cos(f),m=-Math.sin(f),h=128/1020*u,g=new Float32Array(n*r);for(let e=0,n=0;n<t.length;n+=4,e++)g[e]=.2126*t[n]+.7152*t[n+1]+.0722*t[n+2];let _=[-1,0,1,-2,0,2,-1,0,1],v=[-1,-2,-1,0,0,0,1,2,1],y=e=>e<0?0:e>255?255:e;for(let e=0;e<r;e++)for(let i=0;i<n;i++){let a=0,o=0,s=0;for(let t=-1;t<=1;t++){let c=Math.max(0,Math.min(r-1,e+t))*n;for(let e=-1;e<=1;e++,s++){let t=g[c+Math.max(0,Math.min(n-1,i+e))];a+=t*_[s],o+=t*v[s]}}let c=e*n+i,u=y(d+(p*a+m*o)*h),f=c*4;if(l){let e=u-d;t[f]=y(t[f]+e),t[f+1]=y(t[f+1]+e),t[f+2]=y(t[f+2]+e)}else t[f]=t[f+1]=t[f+2]=u}return e};Z.addGetterSetter(Q,`embossStrength`,.5,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`embossWhiteLevel`,.5,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`embossDirection`,`top-left`,void 0,Z.afterSetFilter),Z.addGetterSetter(Q,`embossBlend`,!1,void 0,Z.afterSetFilter);function yv(e,t,n,r,i){let a=n-t,o=i-r;if(a===0)return r+o/2;if(o===0)return r;let s=(e-t)/a;return s=o*s+r,s}var bv=function(e){let t=e.data,n=t.length,r=t[0],i=r,a,o=t[1],s=o,c,l=t[2],u=l,d,f=this.enhance();if(f===0)return;for(let e=0;e<n;e+=4)a=t[e+0],a<r?r=a:a>i&&(i=a),c=t[e+1],c<o?o=c:c>s&&(s=c),d=t[e+2],d<l?l=d:d>u&&(u=d);i===r&&(i=255,r=0),s===o&&(s=255,o=0),u===l&&(u=255,l=0);let p,m,h,g,_,v;if(f>0)p=i+f*(255-i),m=r-f*+r,h=s+f*(255-s),g=o-f*+o,_=u+f*(255-u),v=l-f*+l;else{let e=(i+r)*.5;p=i+f*(i-e),m=r+f*(r-e);let t=(s+o)*.5;h=s+f*(s-t),g=o+f*(o-t);let n=(u+l)*.5;_=u+f*(u-n),v=l+f*(l-n)}for(let e=0;e<n;e+=4)t[e+0]=yv(t[e+0],r,i,m,p),t[e+1]=yv(t[e+1],o,s,g,h),t[e+2]=yv(t[e+2],l,u,v,_)};Z.addGetterSetter(Q,`enhance`,0,X(),Z.afterSetFilter);var xv=function(e){let t=e.data,n=t.length;for(let e=0;e<n;e+=4){let n=.34*t[e]+.5*t[e+1]+.16*t[e+2];t[e]=n,t[e+1]=n,t[e+2]=n}};Z.addGetterSetter(Q,`hue`,0,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`saturation`,0,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`luminance`,0,X(),Z.afterSetFilter);var Sv=function(e){let t=e.data,n=t.length,r=2**this.saturation(),i=(this.hue()%360+360)%360,a=this.luminance()*127,o=+r*Math.cos(i*Math.PI/180),s=+r*Math.sin(i*Math.PI/180),c=.299+.701*o+.168*s,l=.587-.587*o+.33*s,u=.114-.114*o-.497*s,d=.299-.299*o-.328*s,f=.587+.413*o+.035*s,p=.114-.114*o+.292*s,m=.299-.3*o+1.25*s,h=.587-.588*o-1.05*s,g=.114+.886*o-.203*s,_,v,y,b;for(let e=0;e<n;e+=4)_=t[e+0],v=t[e+1],y=t[e+2],b=t[e+3],t[e+0]=c*_+l*v+u*y+a,t[e+1]=d*_+f*v+p*y+a,t[e+2]=m*_+h*v+g*y+a,t[e+3]=b},Cv=function(e){let t=e.data,n=t.length,r=2**this.value(),i=2**this.saturation(),a=(this.hue()%360+360)%360,o=r*i*Math.cos(a*Math.PI/180),s=r*i*Math.sin(a*Math.PI/180),c=.299*r+.701*o+.168*s,l=.587*r-.587*o+.33*s,u=.114*r-.114*o-.497*s,d=.299*r-.299*o-.328*s,f=.587*r+.413*o+.035*s,p=.114*r-.114*o+.292*s,m=.299*r-.3*o+1.25*s,h=.587*r-.588*o-1.05*s,g=.114*r+.886*o-.203*s;for(let e=0;e<n;e+=4){let n=t[e+0],r=t[e+1],i=t[e+2],a=t[e+3];t[e+0]=c*n+l*r+u*i,t[e+1]=d*n+f*r+p*i,t[e+2]=m*n+h*r+g*i,t[e+3]=a}};Z.addGetterSetter(Q,`hue`,0,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`saturation`,0,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`value`,0,X(),Z.afterSetFilter);var wv=function(e){let t=e.data,n=t.length;for(let e=0;e<n;e+=4)t[e]=255-t[e],t[e+1]=255-t[e+1],t[e+2]=255-t[e+2]},Tv=function(e,t,n){let r=e.data,i=t.data,a=e.width,o=e.height,s=n.polarCenterX||a/2,c=n.polarCenterY||o/2,l=Math.sqrt(s*s+c*c),u=a-s,d=o-c,f=Math.sqrt(u*u+d*d);l=f>l?f:l;let p=o,m=a,h=360/m*Math.PI/180;for(let e=0;e<m;e+=1){let t=Math.sin(e*h),n=Math.cos(e*h);for(let o=0;o<p;o+=1){u=Math.floor(s+l*o/p*n),d=Math.floor(c+l*o/p*t);let f=(d*a+u)*4,m=r[f+0],h=r[f+1],g=r[f+2],_=r[f+3];f=(e+o*a)*4,i[f+0]=m,i[f+1]=h,i[f+2]=g,i[f+3]=_}}},Ev=function(e,t,n){let r=e.data,i=t.data,a=e.width,o=e.height,s=n.polarCenterX||a/2,c=n.polarCenterY||o/2,l=Math.sqrt(s*s+c*c),u=a-s,d=o-c,f=Math.sqrt(u*u+d*d);l=f>l?f:l;let p=o,m=a,h=n.polarRotation||0,g,_;for(u=0;u<a;u+=1)for(d=0;d<o;d+=1){let e=u-s,t=d-c,n=Math.sqrt(e*e+t*t)*p/l,o=(Math.atan2(t,e)*180/Math.PI+360+h)%360;o=o*m/360,g=Math.floor(o),_=Math.floor(n);let f=(_*a+g)*4,v=r[f+0],y=r[f+1],b=r[f+2],x=r[f+3];f=(d*a+u)*4,i[f+0]=v,i[f+1]=y,i[f+2]=b,i[f+3]=x}},Dv=function(e){let t=e.width,n=e.height,r,i,a,o,s,c,l,u,d,f,p=Math.round(this.kaleidoscopePower()),m=Math.round(this.kaleidoscopeAngle()),h=Math.floor(t*((m%360+360)%360)/360);if(p<1)return;let g={width:t,height:n,data:new Uint8ClampedArray(t*n*4)};Tv(e,g,{polarCenterX:t/2,polarCenterY:n/2});let _=t/2**p;for(;_<=8;)_*=2,--p;_=Math.ceil(_);let v=_,y=0,b=v,x=1;for(h+_>t&&(y=v,b=0,x=-1),i=0;i<n;i+=1)for(r=y;r!==b;r+=x)a=Math.round(r+h)%t,d=(t*i+a)*4,s=g.data[d+0],c=g.data[d+1],l=g.data[d+2],u=g.data[d+3],f=(t*i+r)*4,g.data[f+0]=s,g.data[f+1]=c,g.data[f+2]=l,g.data[f+3]=u;for(i=0;i<n;i+=1)for(v=Math.floor(_),o=0;o<p;o+=1){for(r=0;r<v+1;r+=1)d=(t*i+r)*4,s=g.data[d+0],c=g.data[d+1],l=g.data[d+2],u=g.data[d+3],f=(t*i+v*2-r-1)*4,g.data[f+0]=s,g.data[f+1]=c,g.data[f+2]=l,g.data[f+3]=u;v*=2}Ev(g,e,{polarRotation:0})};Z.addGetterSetter(Q,`kaleidoscopePower`,2,X(),Z.afterSetFilter),Z.addGetterSetter(Q,`kaleidoscopeAngle`,0,X(),Z.afterSetFilter);function Ov(e,t,n){let r=(n*e.width+t)*4,i=[];return i.push(e.data[r++],e.data[r++],e.data[r++],e.data[r++]),i}function kv(e,t){return Math.sqrt((e[0]-t[0])**2+(e[1]-t[1])**2+(e[2]-t[2])**2)}function Av(e){let t=[0,0,0];for(let n=0;n<e.length;n++)t[0]+=e[n][0],t[1]+=e[n][1],t[2]+=e[n][2];return t[0]/=e.length,t[1]/=e.length,t[2]/=e.length,t}function jv(e,t){let n=Ov(e,0,0),r=Ov(e,e.width-1,0),i=Ov(e,0,e.height-1),a=Ov(e,e.width-1,e.height-1);if(kv(n,r)<t&&kv(r,a)<t&&kv(a,i)<t&&kv(i,n)<t){let o=Av([r,n,a,i]),s=[];for(let n=0;n<e.width*e.height;n++){let r=kv(o,[e.data[n*4],e.data[n*4+1],e.data[n*4+2]]);s[n]=r<t?0:255}return s}}function Mv(e,t){for(let n=0;n<e.width*e.height;n++)e.data[4*n+3]=t[n]}function Nv(e,t,n){let r=[1,1,1,1,0,1,1,1,1],i=Math.round(Math.sqrt(r.length)),a=Math.floor(i/2),o=[];for(let s=0;s<n;s++)for(let c=0;c<t;c++){let l=s*t+c,u=0;for(let o=0;o<i;o++)for(let l=0;l<i;l++){let d=s+o-a,f=c+l-a;if(d>=0&&d<n&&f>=0&&f<t){let n=d*t+f,a=r[o*i+l];u+=e[n]*a}}o[l]=u===2040?255:0}return o}function Pv(e,t,n){let r=[1,1,1,1,1,1,1,1,1],i=Math.round(Math.sqrt(r.length)),a=Math.floor(i/2),o=[];for(let s=0;s<n;s++)for(let c=0;c<t;c++){let l=s*t+c,u=0;for(let o=0;o<i;o++)for(let l=0;l<i;l++){let d=s+o-a,f=c+l-a;if(d>=0&&d<n&&f>=0&&f<t){let n=d*t+f,a=r[o*i+l];u+=e[n]*a}}o[l]=u>=1020?255:0}return o}function Fv(e,t,n){let r=[1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],i=Math.round(Math.sqrt(r.length)),a=Math.floor(i/2),o=[];for(let s=0;s<n;s++)for(let c=0;c<t;c++){let l=s*t+c,u=0;for(let o=0;o<i;o++)for(let l=0;l<i;l++){let d=s+o-a,f=c+l-a;if(d>=0&&d<n&&f>=0&&f<t){let n=d*t+f,a=r[o*i+l];u+=e[n]*a}}o[l]=u}return o}var Iv=function(e){let t=jv(e,this.attrs.threshold??10);return t&&(t=Nv(t,e.width,e.height),t=Pv(t,e.width,e.height),t=Fv(t,e.width,e.height),Mv(e,t)),e};Z.addGetterSetter(Q,`threshold`,.5,X(),Z.afterSetFilter);var Lv=function(e){let t=this.noise()*255,n=e.data,r=n.length,i=t/2;for(let e=0;e<r;e+=4)n[e+0]+=i-2*i*Math.random(),n[e+1]+=i-2*i*Math.random(),n[e+2]+=i-2*i*Math.random()};Z.addGetterSetter(Q,`noise`,.2,X(),Z.afterSetFilter);var Rv=function(e,t=1){let n=Math.ceil(this.pixelSize()*t),r=e.width,i=e.height,a=Math.ceil(r/n),o=Math.ceil(i/n),s=e.data;if(n<=0)Y.error(`pixelSize value can not be <= 0`);else for(let e=0;e<a;e+=1)for(let t=0;t<o;t+=1){let a=0,o=0,c=0,l=0,u=e*n,d=Math.min(u+n,r),f=t*n,p=Math.min(f+n,i);for(let e=u;e<d;e+=1)for(let t=f;t<p;t+=1){let n=(r*t+e)*4,i=s[n+3];a+=s[n+0]*i,o+=s[n+1]*i,c+=s[n+2]*i,l+=i}l&&(a/=l,o/=l,c/=l),l/=(d-u)*(p-f);for(let e=u;e<d;e+=1)for(let t=f;t<p;t+=1){let n=(r*t+e)*4;s[n+0]=a,s[n+1]=o,s[n+2]=c,s[n+3]=l}}};Z.addGetterSetter(Q,`pixelSize`,8,X(),Z.afterSetFilter);var zv=function(e){let t=Math.round(this.levels()*254)+1,n=e.data,r=n.length,i=255/t;for(let e=0;e<r;e+=1)n[e]=Math.floor(n[e]/i)*i};Z.addGetterSetter(Q,`levels`,.5,X(),Z.afterSetFilter);var Bv=function(e){let t=e.data,n=t.length,r=this.red(),i=this.green(),a=this.blue();for(let e=0;e<n;e+=4){let n=(.34*t[e]+.5*t[e+1]+.16*t[e+2])/255;t[e]=n*r,t[e+1]=n*i,t[e+2]=n*a,t[e+3]=t[e+3]}};Z.addGetterSetter(Q,`red`,0,gg,Z.afterSetFilter),Z.addGetterSetter(Q,`green`,0,gg,Z.afterSetFilter),Z.addGetterSetter(Q,`blue`,0,gg,Z.afterSetFilter);var Vv=function(e){let t=e.data,n=t.length,r=this.red(),i=this.green(),a=this.blue(),o=this.alpha();for(let e=0;e<n;e+=4){let n=1-o;t[e]=r*o+t[e]*n,t[e+1]=i*o+t[e+1]*n,t[e+2]=a*o+t[e+2]*n}};Z.addGetterSetter(Q,`alpha`,1,e=>Math.min(1,Math.max(0,e)),Z.afterSetFilter);var Hv=function(e){let t=e.data,n=t.length;for(let e=0;e<n;e+=4){let n=t[e+0],r=t[e+1],i=t[e+2];t[e+0]=Math.min(255,n*.393+r*.769+i*.189),t[e+1]=Math.min(255,n*.349+r*.686+i*.168),t[e+2]=Math.min(255,n*.272+r*.534+i*.131)}},Uv=function(e){let t=e.data;for(let e=0;e<t.length;e+=4){let n=t[e],r=t[e+1],i=t[e+2];.2126*n+.7152*r+.0722*i>=128&&(t[e]=255-n,t[e+1]=255-r,t[e+2]=255-i)}return e},Wv=function(e){let t=this.threshold()*255,n=e.data,r=n.length;for(let e=0;e<r;e+=1)n[e]=n[e]<t?0:255};Z.addGetterSetter(Q,`threshold`,.5,X(),Z.afterSetFilter);var Gv=_1.Util._assign(_1,{Arc:v1,Arrow:I1,Circle:L1,Ellipse:R1,Image:z1,Label:T0,Tag:E0,Line:M1,Path:F1,Rect:D0,RegularPolygon:O0,Ring:A0,Sprite:j0,Star:M0,Text:v0,TextPath:L0,Transformer:rv,Wedge:av,Filters:{Blur:fv,Brightness:mv,Brighten:pv,Contrast:gv,Emboss:vv,Enhance:bv,Grayscale:xv,HSL:Sv,HSV:Cv,Invert:wv,Kaleidoscope:Dv,Mask:Iv,Noise:Lv,Pixelate:Rv,Posterize:zv,RGB:Bv,RGBA:Vv,Sepia:Hv,Solarize:Uv,Threshold:Wv}}),Kv=[{kind:`penerima_tamu`,label:`Penerima Tamu`,short:`Meja Tamu`,fill:`#E0F2FE`,stroke:`#0369A1`,w:150,h:56},{kind:`pelaminan`,label:`Area Pelaminan`,short:`Pelaminan`,fill:`#FEF3C7`,stroke:`#B45309`,w:220,h:78},{kind:`panggung_musik`,label:`Panggung Musik`,short:`Musik`,fill:`#DCFCE7`,stroke:`#15803D`,w:140,h:70},{kind:`meja_vip`,label:`Meja VIP / VVIP`,short:`VIP`,fill:`#F3E8FF`,stroke:`#7E22CE`,w:120,h:90},{kind:`photobooth`,label:`Photobooth / Gallery`,short:`Photo`,fill:`#FCE7F3`,stroke:`#BE185D`,w:130,h:64},{kind:`taman_gantung`,label:`Taman Gantung / Pergola`,short:`Pergola`,fill:`#ECFDF5`,stroke:`#047857`,w:130,h:110},{kind:`frame_screen`,label:`Layar Frame Screen`,short:`Screen`,fill:`#FFEDD5`,stroke:`#C2410C`,w:150,h:42},{kind:`centerpiece`,label:`Centerpiece Floral`,short:`Floral`,fill:`#FFE4E6`,stroke:`#E11D48`,w:96,h:96}],qv=class{constructor(e,t={}){this.container=e,this.width=1200,this.height=760,this.onChange=t.onChange??null,this.onSelect=t.onSelect??null,this.stage=new Gv.Stage({container:e,width:this.width,height:this.height}),this.bgLayer=new Gv.Layer,this.gridLayer=new Gv.Layer,this.mainLayer=new Gv.Layer,this.uiLayer=new Gv.Layer,this.stage.add(this.bgLayer),this.stage.add(this.gridLayer),this.stage.add(this.mainLayer),this.stage.add(this.uiLayer),this.transformer=new Gv.Transformer({rotateEnabled:!0,enabledAnchors:[`top-left`,`top-right`,`bottom-left`,`bottom-right`],borderStroke:`#C89D54`,anchorStroke:`#C89D54`,anchorFill:`#FFFFFF`,anchorSize:9}),this.uiLayer.add(this.transformer),this._drawBackgroundAndGrid(),this._bindStageEvents(),t.initialJson?this.loadJson(t.initialJson):this.addDefaultRoomTemplate()}_drawBackgroundAndGrid(){let e=new Gv.Rect({x:0,y:0,width:this.width,height:this.height,fill:`#F8FAFC`,listening:!1});this.bgLayer.add(e);for(let e=0;e<=this.width;e+=40)this.gridLayer.add(new Gv.Line({points:[e,0,e,this.height],stroke:`#E2E8F0`,strokeWidth:1,listening:!1}));for(let e=0;e<=this.height;e+=40)this.gridLayer.add(new Gv.Line({points:[0,e,this.width,e],stroke:`#E2E8F0`,strokeWidth:1,listening:!1}))}_bindStageEvents(){this.stage.on(`click tap`,e=>{if(e.target===this.stage){this.transformer.nodes([]),this.onSelect&&this.onSelect(null);return}let t=e.target.findAncestor(`.builder-item`,!0)||(e.target.hasName(`builder-item`)?e.target:null);t&&(this.transformer.nodes([t]),this.onSelect&&this.onSelect(t))})}addDefaultRoomTemplate(){this.addRoom({x:100,y:80,width:1e3,height:590,label:`Ruang Acara Utama`})}addRoom({x:e=140,y:t=110,width:n=460,height:r=320,label:i=`Ruangan`,fill:a=`#FFFFFF`,stroke:o=`#1E293B`}={}){let s=this._createItemGroup(`room`,{x:e,y:t,label:i,fill:a,stroke:o,width:n,height:r}),c=new Gv.Rect({width:n,height:r,fill:a,stroke:o,strokeWidth:3,cornerRadius:4}),l=new Gv.Text({text:i,x:12,y:10,fontSize:15,fontStyle:`bold`,fill:`#334155`});return s.add(c,l),this.mainLayer.add(s),this._selectGroup(s),this._emitChange(),s}addWall({x:e=200,y:t=260,width:n=220,height:r=10,label:i=`Dinding`}={}){let a=this._createItemGroup(`wall`,{x:e,y:t,label:i,width:n,height:r}),o=new Gv.Rect({width:n,height:r,fill:`#0F172A`,cornerRadius:2});return a.add(o),this.mainLayer.add(a),this._selectGroup(a),this._emitChange(),a}addDoor({kind:e=`door_in`,x:t=520,y:n=655,width:r=100,height:i=22}={}){let a=e===`door_in`,o=e===`door_closed`,s=o?`Pintu Tertutup`:a?`Pintu Masuk`:`Pintu Keluar`,c=o?`#FEE2E2`:a?`#DCFCE7`:`#FEF3C7`,l=o?`#DC2626`:a?`#16A34A`:`#EA580C`,u=this._createItemGroup(e,{x:t,y:n,label:s,fill:c,stroke:l,width:r,height:i}),d=new Gv.Rect({width:r,height:i,fill:c,stroke:l,strokeWidth:2,cornerRadius:6}),f=new Gv.Text({text:o?`X TERTUTUP`:a?`→ MASUK`:`← KELUAR`,width:r,height:i,align:`center`,verticalAlign:`middle`,fontSize:11,fontStyle:`bold`,fill:l});return u.add(d,f),this.mainLayer.add(u),this._selectGroup(u),this._emitChange(),u}addFlowArrow({x:e=420,y:t=420,label:n=`Alur Tamu`,color:r=`#16A34A`}={}){let i=this._createItemGroup(`flow_arrow`,{x:e,y:t,label:n,fill:r,stroke:r,width:120,height:34}),a=new Gv.Arrow({points:[0,17,110,17],pointerLength:14,pointerWidth:14,fill:r,stroke:r,strokeWidth:4});return i.add(a),this.mainLayer.add(i),this._selectGroup(i),this._emitChange(),i}addEventIcon(e,t=null,n=null){let r=Kv.find(t=>t.kind===e)||Kv[0],i=t??this.width/2-r.w/2+(Math.random()*60-30),a=n??this.height/2-r.h/2+(Math.random()*60-30),o=this._createItemGroup(`icon`,{x:i,y:a,width:r.w,height:r.h,label:r.label,iconKind:r.kind,fill:r.fill,stroke:r.stroke}),s=new Gv.Rect({width:r.w,height:r.h,fill:r.fill,stroke:r.stroke,strokeWidth:2,cornerRadius:10,shadowColor:`rgba(15, 23, 42, 0.12)`,shadowBlur:8,shadowOffsetY:3}),c=new Gv.Text({text:r.label,width:r.w,height:r.h,padding:8,align:`center`,verticalAlign:`middle`,fontSize:13,fontStyle:`bold`,fill:`#0F172A`});return o.add(s,c),this.mainLayer.add(o),this._selectGroup(o),this._emitChange(),o}_createItemGroup(e,t){let n=new Gv.Group({x:t.x,y:t.y,draggable:!0,name:`builder-item`});return n.setAttr(`builderMeta`,{id:t.id||`item_${Date.now()}_${Math.floor(Math.random()*1e3)}`,type:e,iconKind:t.iconKind||null,label:t.label||``,fill:t.fill||`#FFFFFF`,stroke:t.stroke||`#1E293B`,width:t.width||120,height:t.height||60}),n.on(`dragend transformend`,()=>this._emitChange()),n}_selectGroup(e){this.transformer.nodes([e]),this.onSelect&&this.onSelect(e)}updateSelectedLabel(e){let t=this.transformer.nodes();if(!t.length)return;let n=t[0],r=n.getAttr(`builderMeta`)||{};r.label=e,n.setAttr(`builderMeta`,r);let i=n.findOne(`Text`);i&&i.text(e),this.mainLayer.draw(),this._emitChange()}deleteSelected(){let e=this.transformer.nodes();e.length&&(e.forEach(e=>e.destroy()),this.transformer.nodes([]),this.onSelect&&this.onSelect(null),this._emitChange())}clearCanvas(){this.transformer.nodes([]),this.mainLayer.destroyChildren(),this.addDefaultRoomTemplate(),this._emitChange()}getItemsSummary(){return this.mainLayer.getChildren().map(e=>{let t=e.getAttr(`builderMeta`)||{},n=e.scaleX(),r=e.scaleY();return{...t,x:Math.round(e.x()),y:Math.round(e.y()),width:Math.round((t.width||120)*n),height:Math.round((t.height||60)*r),rotation:Math.round(e.rotation()),center_pct_x:Number(((e.x()+(t.width||120)*n/2)/this.width*100).toFixed(2)),center_pct_y:Number(((e.y()+(t.height||60)*r/2)/this.height*100).toFixed(2))}})}exportState(){this.transformer.nodes([]),this.uiLayer.hide();let e=this.stage.toDataURL({pixelRatio:1});return this.uiLayer.show(),{canvasJson:JSON.stringify({width:this.width,height:this.height,background:`#F8FAFC`,items:this.getItemsSummary()}),snapshotDataUrl:e,items:this.getItemsSummary()}}loadJson(e){try{let t=typeof e==`string`?JSON.parse(e):e;if(!t||!Array.isArray(t.items))return;this.transformer.nodes([]),this.mainLayer.destroyChildren();for(let e of t.items){let t=null;if(e.type===`room`)t=this.addRoom(e);else if(e.type===`wall`)t=this.addWall(e);else if(e.type===`door_in`||e.type===`door_out`||e.type===`door_closed`)t=this.addDoor({...e,kind:e.type});else if(e.type===`flow_arrow`)t=this.addFlowArrow({...e,color:e.stroke||`#16A34A`});else if(e.type===`icon`){t=this.addEventIcon(e.iconKind||`penerima_tamu`,e.x,e.y);let n=t.getAttr(`builderMeta`);n.label=e.label||n.label,t.setAttr(`builderMeta`,n);let r=t.findOne(`Text`);r&&e.label&&r.text(e.label)}t&&e.rotation&&t.rotation(e.rotation)}this.transformer.nodes([]),this._emitChange()}catch(e){console.warn(`Gagal memuat canvas JSON:`,e)}}_emitChange(){this.onChange&&this.onChange(this.getItemsSummary())}},Jv=class{constructor(e={}){this.videoEl=e.videoEl,this.overlayCanvas=e.overlayCanvas,this.onProgress=e.onProgress??null,this.onComplete=e.onComplete??null,this.onStatus=e.onStatus??null,this.onCapabilities=e.onCapabilities??null,this.targetStepDeg=25.7,this.targets=[],this.horizonFrames=[],this.capFrames=[],this.rawBlobs=[],this.serverStitchUrl=e.serverStitchUrl??null,this.csrfToken=e.csrfToken??null,this.currentYaw=0,this.currentPitch=0,this.currentRoll=0,this.cameraQuat=new Us,this.cameraForward=new W(1,0,0),this.cameraRight=new W(0,0,1),this.cameraUp=new W(0,1,0),this.qAlign=null,this.hasLiveCamera=!1,this.hasGyro=!1,this.stream=null,this.running=!1,this.isStitching=!1,this.captureCooldown=0,this.dwellTargetId=null,this.dwellStartMs=0,this.flashAlpha=0,this.lastHorizonCanvas=null,this._rebuildTargets(14)}_rebuildTargets(e){let t=360/e;this.targetStepDeg=t;let n=Array.from({length:e},(e,n)=>{let r=this._normYaw(n*t);return{id:`h-${n}`,ring:`horizon`,index:n,yaw:r,pitch:0,captured:!1,vec:this._yawPitchToVec(r,0)}}),r=Array.from({length:6},(e,t)=>{let n=this._normYaw(t*60);return{id:`u-${t}`,ring:`upper`,index:t,yaw:n,pitch:42,captured:!1,vec:this._yawPitchToVec(n,42)}}),i=Array.from({length:6},(e,t)=>{let n=this._normYaw(t*60);return{id:`d-${t}`,ring:`lower`,index:t,yaw:n,pitch:-42,captured:!1,vec:this._yawPitchToVec(n,-42)}});this.targets=[...n,...r,...i]}async start({gyroGranted:e=null}={}){if(this.running=!0,e===!0)this._bindGyro();else if(typeof DeviceOrientationEvent<`u`&&typeof DeviceOrientationEvent.requestPermission==`function`)try{await DeviceOrientationEvent.requestPermission()===`granted`&&this._bindGyro()}catch{}else`DeviceOrientationEvent`in window&&this._bindGyro();if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)try{this.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:`environment`},width:{ideal:1280},height:{ideal:720}},audio:!1}),this.videoEl.srcObject=this.stream,await this.videoEl.play(),this.hasLiveCamera=!0;let e=this.videoEl.videoWidth||720,t=this.videoEl.videoHeight||1280;this._rebuildTargets(e<t?14:12),this._notifyStatus(`Langkah 1: Putar mendatar ikuti bulatan KUNING. Lalu dongak (BIRU) & tunduk (UNGU) untuk plafon & lantai.`)}catch(e){this.hasLiveCamera=!1,this._rebuildTargets(12),this._notifyStatus(`Kamera tidak dapat dibuka (${e?.name||`izin ditolak`}). Mode Simulasi aktif.`)}else this.hasLiveCamera=!1,this._rebuildTargets(12),this._notifyStatus(window.isSecureContext?`Kamera perangkat tidak terdeteksi. Mode Simulasi 360° aktif.`:`Kamera browser butuh HTTPS. Buka lewat tautan HTTPS lokal atau pakai tombol Kamera Bawaan HP.`);this._updateManualVectors(),this._emitCapabilities(),this._emitProgress(),this._bindManualDrag(),this._loop()}async enableGyroFromGesture(){if(typeof DeviceOrientationEvent<`u`&&typeof DeviceOrientationEvent.requestPermission==`function`&&await DeviceOrientationEvent.requestPermission()!==`granted`)throw Error(`Izin sensor gerak ditolak.`);this._bindGyro(),this._emitCapabilities()}_bindGyro(){if(this._onGyro)return;let e=new W(0,0,1),t=new W(0,1,0),n=new Us(-Math.sqrt(.5),0,0,Math.sqrt(.5)),r=new Us,i=new Sc;this._onGyro=a=>{if(a.alpha===null||a.beta===null)return;this.hasGyro=!0;let o=window.screen?.orientation?.angle??window.orientation??0,s=Vs.degToRad(a.alpha),c=Vs.degToRad(a.beta),l=Vs.degToRad(a.gamma||0),u=Vs.degToRad(o);i.set(c,s,-l,`YXZ`);let d=new Us().setFromEuler(i);if(d.multiply(n),d.multiply(r.setFromAxisAngle(e,-u)),!this.qAlign){let e=new W(0,0,-1).applyQuaternion(d),n=Math.atan2(e.z,e.x);this.qAlign=new Us().setFromAxisAngle(t,n)}this.cameraQuat.copy(this.qAlign).multiply(d),this.cameraForward.set(0,0,-1).applyQuaternion(this.cameraQuat).normalize(),this.cameraRight.set(1,0,0).applyQuaternion(this.cameraQuat).normalize(),this.cameraUp.set(0,1,0).applyQuaternion(this.cameraQuat).normalize(),this.currentYaw=Vs.radToDeg(Math.atan2(this.cameraForward.z,this.cameraForward.x)),this.currentPitch=Vs.radToDeg(Math.asin(Math.max(-1,Math.min(1,this.cameraForward.y)))),this.currentRoll=Vs.radToDeg(Math.asin(Math.max(-1,Math.min(1,this.cameraRight.y)))),this._emitCapabilities()},window.addEventListener(`deviceorientation`,this._onGyro)}_updateManualVectors(){let e=Vs.degToRad(this.currentYaw),t=Vs.degToRad(this.currentPitch),n=Math.cos(t);this.cameraForward.set(n*Math.cos(e),Math.sin(t),n*Math.sin(e)).normalize();let r=new W(0,1,0);this.cameraRight.crossVectors(this.cameraForward,r).normalize(),this.cameraRight.lengthSq()<.001&&this.cameraRight.set(0,0,1),this.cameraUp.crossVectors(this.cameraRight,this.cameraForward).normalize(),this.currentRoll=0}_bindManualDrag(){let e=!1,t=0,n=0,r=0,i=0;this._onDown=a=>{this.hasGyro||(e=!0,t=a.clientX,n=a.clientY,r=this.currentYaw,i=this.currentPitch)},this._onMove=a=>{if(!e||this.hasGyro)return;let o=a.clientX-t,s=a.clientY-n;this.currentYaw=this._normYaw(r+o*.35),this.currentPitch=Math.max(-60,Math.min(60,i-s*.25)),this._updateManualVectors()},this._onUp=()=>{e=!1},this.overlayCanvas.addEventListener(`pointerdown`,this._onDown),window.addEventListener(`pointermove`,this._onMove),window.addEventListener(`pointerup`,this._onUp)}autoSweepDemo(){if(this.hasLiveCamera||this.isStitching)return;let e=this.targets.find(e=>!e.captured);e&&(this.currentYaw=e.yaw,this.currentPitch=e.pitch,this._updateManualVectors(),this.captureCurrentPose(e))}captureCurrentManual(){if(this.isStitching)return;let e=this._findNearestUncaptured(22);this.captureCurrentPose(e)}finishNow(){if(!this.isStitching){if(this.horizonFrames.length<3)throw Error(`Tangkap minimal 3 titik mendatar (bulatan kuning) terlebih dahulu.`);this._triggerStitch()}}_triggerStitch(){this.isStitching||(this.isStitching=!0,this.serverStitchUrl&&this.rawBlobs.length>=2?(this._notifyStatus(`Mengirim ${this.rawBlobs.length} foto ke Server OpenCV 3D untuk dijahit presisi...`),this._stitchOnServer().then(e=>{this.onComplete&&this.onComplete(e)}).catch(e=>{console.warn(`Server OpenCV stitch fallback:`,e),this._notifyStatus(`Fallback ke penjahitan lokal browser...`);try{let e=this.stitchEquirectangular();this.onComplete&&this.onComplete({dataUrl:e,previewToken:null,engine:`browser_fallback`})}catch(e){this.isStitching=!1,this._notifyStatus(`Gagal menjahit: ${e.message}`)}})):(this._notifyStatus(`Menyelaraskan sambungan, plafon & lantai 360°...`),setTimeout(()=>{try{let e=this.stitchEquirectangular();this.onComplete&&this.onComplete({dataUrl:e,previewToken:null,engine:`browser`})}catch(e){this.isStitching=!1,this._notifyStatus(`Gagal menjahit: ${e.message}`)}},40)))}async _stitchOnServer(){let e=new FormData,t=[];this.rawBlobs.forEach((n,r)=>{e.append(`frames[]`,n.blob,`frame_${String(r).padStart(3,`0`)}.jpg`),t.push(n.pose)}),e.append(`poses_json`,JSON.stringify(t));let n=await fetch(this.serverStitchUrl,{method:`POST`,headers:{Accept:`application/json`,...this.csrfToken?{"X-CSRF-TOKEN":this.csrfToken}:{}},body:e}),r=await n.json();if(!n.ok||!r.preview_url)throw Error(r.message||`Server OpenCV gagal menjahit.`);return{previewUrl:r.preview_url,previewToken:r.preview_token,engine:r.stitch_meta?.engine||`opencv_3d`}}_findNearestUncaptured(e=8){let t=null,n=1/0;for(let r of this.targets){if(r.captured)continue;let i=Math.max(-1,Math.min(1,this.cameraForward.dot(r.vec))),a=Vs.radToDeg(Math.acos(i));a<e&&a<n&&(t=r,n=a)}return t}captureCurrentPose(e=null){if(this.isStitching)return;let t=performance.now();if(t<this.captureCooldown)return;this.captureCooldown=t+350;let{frameW:n,frameH:r,estHfovDeg:i}=this._getCameraCaptureSpec(),a=document.createElement(`canvas`);a.width=n,a.height=r;let o=a.getContext(`2d`);this.hasLiveCamera&&this.videoEl.readyState>=2&&this.videoEl.videoWidth>0?o.drawImage(this.videoEl,0,0,n,r):this._renderSimulatedCameraView(o,n,r,this.currentYaw,this.currentPitch);let s=o.getImageData(0,0,n,r),c=e?e.ring:Math.abs(this.currentPitch)>22?this.currentPitch>0?`upper`:`lower`:`horizon`,l={w:n,h:r,pixels:s.data,estHfovDeg:i,ring:c,yawDeg:this.currentYaw,pitchDeg:this.currentPitch,rollDeg:this.currentRoll,fwd:this.cameraForward.clone(),right:this.cameraRight.clone(),up:this.cameraUp.clone()};c===`horizon`?(this.horizonFrames.push(l),this.lastHorizonCanvas=a):this.capFrames.push(l);let u=document.createElement(`canvas`);if(this.hasLiveCamera&&this.videoEl.readyState>=2&&this.videoEl.videoWidth>0){let e=this.videoEl.videoWidth,t=this.videoEl.videoHeight,n=Math.min(1,1080/Math.max(e,t));u.width=Math.round(e*n),u.height=Math.round(t*n),u.getContext(`2d`).drawImage(this.videoEl,0,0,u.width,u.height)}else u.width=n,u.height=r,u.getContext(`2d`).drawImage(a,0,0);let d={ring:c,yaw:this.currentYaw,pitch:this.currentPitch,roll:this.currentRoll};u.toBlob(e=>{e&&this.rawBlobs.push({blob:e,pose:d})},`image/jpeg`,.9),e&&(e.captured=!0),this.flashAlpha=.55,this._emitProgress(),this.targets.every(e=>e.captured)&&this._triggerStitch()}_getCameraCaptureSpec(){let e=this.videoEl?.videoWidth||this.overlayCanvas.clientWidth||640,t=this.videoEl?.videoHeight||this.overlayCanvas.clientHeight||480,n=e/Math.max(1,t),r=e<t?n<.65?48:54:64,i=e<t?640:480,a=i,o=Math.max(240,Math.round(i*n)),s=Math.tan(Vs.degToRad(r/2));return{frameW:o,frameH:a,estHfovDeg:r,tanHalfH:s,tanHalfV:s/Math.max(.3,n)}}stitchEquirectangular(){let e=[...this.horizonFrames];if(e.length===0)throw Error(`Belum ada foto mendatar yang tertangkap.`);let t=e=>(e%360+360)%360,n=[...e].sort((e,n)=>t(e.yawDeg)-t(n.yawDeg)),r=n[0].w,i=n[0].h,a=Vs.degToRad(n[0].estHfovDeg),o=r*.5/Math.tan(a*.5),s=n.map(e=>this._cylindricalWarpFrame(e,o)),c=s.map(e=>this._toDownscaledGray(e,.25)),l=s.map(e=>this._toDownscaledGray(e,.5)),u=[],d=[],f=0;for(let e=1;e<s.length;e++){let i=Math.max(8,t(n[e].yawDeg)-t(n[e-1].yawDeg));f+=i;let a=Math.max(r*.14,Math.min(r*.85,Vs.degToRad(i)*o)),s=this._alignPairMultiScale(c[e-1],c[e],l[e-1],l[e],a);u.push(s.dx),d.push(s.dy)}let p=360-t(n[n.length-1].yawDeg)+t(n[0].yawDeg),m=s.length>=8&&p<=68,h=0,g=0;if(m){let e=Math.max(r*.14,Math.min(r*.85,Vs.degToRad(p)*o)),t=this._alignPairMultiScale(c[c.length-1],c[0],l[l.length-1],l[0],e);h=t.dx,g=t.dy}let _=m?[...d,g]:[...d],v=_.reduce((e,t)=>e+t,0),y=_.length>0?v/_.length:0,b=[0],x=[0];for(let e=0;e<u.length;e++)b.push(b[e]+Math.max(Math.round(r*.12),u[e])),x.push(x[e]+Math.round(d[e]-y));let S=m?Math.max(r+32,b[b.length-1]+Math.max(Math.round(r*.12),h)):b[b.length-1]+r,C=Math.min(...x),w=Math.max(...x),T=-C,E=i+(w-C),D=new Float32Array(s.length).fill(1),O=new Float32Array(s.length).fill(0);for(let e=1;e<s.length;e++){let t=Math.max(0,r-(b[e]-b[e-1])),n=this._computeOverlapGain(s[e-1],s[e],b[e]-b[e-1],x[e]-x[e-1],t);O[e]=O[e-1]+Math.log(n)*.7}if(m){let e=Math.max(0,r-h),t=this._computeOverlapGain(s[s.length-1],s[0],h,x[0]-x[s.length-1],e),n=O[s.length-1]+Math.log(t)*.7;for(let e=0;e<s.length;e++)O[e]-=n*e/s.length}let k=O.reduce((e,t)=>e+t,0)/O.length;for(let e=0;e<s.length;e++)D[e]=Math.max(.75,Math.min(1.32,Math.exp(O[e]-k)));let A=new Uint8ClampedArray(S*E*4),j=new Uint8Array(S*E);for(let e=0;e<s.length;e++){let t=s[e],n=b[e],i=x[e]+T,a=D[e];if(e===0)this._blitFrameDirect(t,A,j,S,E,n,i,a,!1);else{let o=b[e]-b[e-1],s=Math.max(0,r-o);this._compositeWithSeam(t,A,j,S,E,n,i,s,a,!1,!1)}}if(m){let e=s.length-1,t=s[e],n=S-b[e],i=Math.max(0,r-n);i>=12&&this._compositeClosingTail(t,n,i,A,j,S,E,x[e]+T,D[e])}let M=m?Math.PI*2:Math.min(Math.PI*2,Vs.degToRad(Math.max(90,f+n[0].estHfovDeg))),N=m?S/(Math.PI*2):Math.max(o*.75,S/M),P=2048,F=1024,I=document.createElement(`canvas`);I.width=P,I.height=F;let ee=I.getContext(`2d`),te=ee.createImageData(P,F);return this._renderCylindricalBase(te.data,P,F,A,j,S,E,m,N,M,t(n[0].yawDeg)),this.capFrames.length>0&&this._blendCapFramesOntoEquirectangular(te.data,P,F,this.capFrames,N,r,i),ee.putImageData(te,0,0),I.toDataURL(`image/webp`,.9)}_cylindricalWarpFrame(e,t){let n=e.w,r=e.h,i=e.pixels,a=new Uint8ClampedArray(n*r*4),o=new Uint8Array(n*r),s=n*.5,c=r*.5,l=Vs.degToRad(Math.max(-12,Math.min(12,e.rollDeg||0))),u=Math.cos(l),d=Math.sin(l);for(let e=0;e<r;e++){let l=e-c,f=e*n;for(let e=0;e<n;e++){let p=(e-s)/t,m=Math.cos(p),h=t*Math.tan(p),g=l/m,_=h*u-g*d+s,v=h*d+g*u+c;if(_>=0&&_<n-1&&v>=0&&v<r-1){let t=_|0,r=v|0,s=_-t,c=v-r,l=(r*n+t)*4,u=l+4,d=l+n*4,p=d+4,m=(1-s)*(1-c),h=s*(1-c),g=(1-s)*c,y=s*c,b=(f+e)*4;a[b]=i[l]*m+i[u]*h+i[d]*g+i[p]*y,a[b+1]=i[l+1]*m+i[u+1]*h+i[d+1]*g+i[p+1]*y,a[b+2]=i[l+2]*m+i[u+2]*h+i[d+2]*g+i[p+2]*y,a[b+3]=255,o[f+e]=1}}}return{w:n,h:r,pixels:a,mask:o}}_toDownscaledGray(e,t){let n=Math.max(32,Math.round(e.w*t)),r=Math.max(32,Math.round(e.h*t)),i=new Float32Array(n*r),a=new Uint8Array(n*r);for(let o=0;o<r;o++){let r=Math.min(e.h-1,Math.round(o/t));for(let s=0;s<n;s++){let c=Math.min(e.w-1,Math.round(s/t)),l=r*e.w+c;if(e.mask[l]){let t=l*4;i[o*n+s]=.299*e.pixels[t]+.587*e.pixels[t+1]+.114*e.pixels[t+2],a[o*n+s]=1}}}return{w:n,h:r,gray:i,mask:a,scale:t}}_alignPairMultiScale(e,t,n,r,i){let a=this._searchAlign(e,t,i*.25,Math.round(e.w*.36),Math.round(e.h*.15),2),o=Math.round(a.dx*2),s=Math.round(a.dy*2),c=this._searchAlignAround(n,r,o,s,5,5);return{dx:Math.round(c.dx*2),dy:Math.round(c.dy*2),score:c.score}}_searchAlign(e,t,n,r,i,a){let o=Math.max(4,Math.floor(Math.max(e.w*.14,n-r))),s=Math.min(e.w-8,Math.ceil(Math.min(e.w*.86,n+r))),c=Math.round(n),l=0,u=1/0;for(let r=o;r<=s;r+=a)for(let o=-i;o<=i;o+=a){let i=this._evalPatchError(e,t,r,o,n);i<u&&(u=i,c=r,l=o)}return this._searchAlignAround(e,t,c,l,a,a,n)}_searchAlignAround(e,t,n,r,i,a,o=n){let s=Math.max(4,n-i),c=Math.min(e.w-8,n+i),l=Math.floor(e.h*.18),u=n,d=r,f=1/0;for(let n=s;n<=c;n++)for(let i=Math.max(-l,r-a);i<=Math.min(l,r+a);i++){let r=this._evalPatchError(e,t,n,i,o);r<f&&(f=r,u=n,d=i)}return{dx:u,dy:d,score:f}}_evalPatchError(e,t,n,r,i){let a=e.w,o=e.h,s=a-n;if(s<8)return 999;let c=Math.max(Math.floor(o*.08),-r),l=Math.min(Math.floor(o*.92),o-r),u=s>48?2:1,d=o>180?2:1,f=0,p=0,m=0;for(let i=c;i<l;i+=d){let o=(i+r)*a,c=i*a;for(let r=0;r<s;r+=u){let i=o+(n+r),a=c+r;e.mask[i]&&t.mask[a]&&(f+=e.gray[i],p+=t.gray[a],m++)}}if(m<25)return 999;let h=(f-p)/m,g=0;for(let i=c;i<l;i+=d){let o=(i+r)*a,c=i*a;for(let r=0;r<s;r+=u){let i=o+(n+r),a=c+r;e.mask[i]&&t.mask[a]&&(g+=Math.abs(e.gray[i]-t.gray[a]-h))}}let _=Math.abs(n-i)*.04+Math.abs(r)*.06;return g/m+_}_computeOverlapGain(e,t,n,r,i){if(i<10)return 1;let a=0,o=0,s=0,c=e.h,l=e.w;for(let u=Math.floor(c*.15);u<Math.floor(c*.85);u+=4){let d=u+r;if(!(d<0||d>=c))for(let r=4;r<i-4;r+=4){let i=n+r;if(i<0||i>=l)continue;let c=d*l+i,f=u*l+r;e.mask[c]&&t.mask[f]&&(a+=e.pixels[c*4]+e.pixels[c*4+1]+e.pixels[c*4+2],o+=t.pixels[f*4]+t.pixels[f*4+1]+t.pixels[f*4+2],s++)}}return s<20||o<100?1:Math.max(.75,Math.min(1.3,a/o))}_blitFrameDirect(e,t,n,r,i,a,o,s,c){let{w:l,h:u,pixels:d,mask:f}=e;for(let e=0;e<u;e++){let u=o+e;if(!(u<0||u>=i))for(let i=0;i<l;i++){let o=e*l+i;if(!f[o])continue;let p=a+i;if(c&&(p=(p%r+r)%r),p<0||p>=r)continue;let m=u*r+p,h=o*4,g=m*4;t[g]=Math.min(255,d[h]*s),t[g+1]=Math.min(255,d[h+1]*s),t[g+2]=Math.min(255,d[h+2]*s),t[g+3]=255,n[m]=1}}}_findOptimalSeam(e,t,n,r,i,a,o,s,c,l){let{w:u,h:d,pixels:f,mask:p}=o,m=new Int16Array(d).fill(Math.floor(c*.5));if(c<10)return m;let h=new Float32Array(d*c),g=Math.max(3,Math.floor(c*.14));for(let o=0;o<d;o++){let d=a+o,m=o*c;for(let a=0;a<c;a++){let _=i+a,v=s+a,y=10;if(d>=0&&d<r&&_>=0&&_<n&&v>=0&&v<u){let r=d*n+_,i=o*u+v;if(t[r]&&p[i]){let t=r*4,n=i*4;y=Math.abs(e[t]-f[n]*l)+Math.abs(e[t+1]-f[n+1]*l)+Math.abs(e[t+2]-f[n+2]*l)}else t[r]||(y=0)}if((a<g||a>=c-g)&&(y+=160),o===0)h[m+a]=y;else{let e=(o-1)*c,t=h[e+a];a>0&&h[e+a-1]<t&&(t=h[e+a-1]),a+1<c&&h[e+a+1]<t&&(t=h[e+a+1]),h[m+a]=y+t}}}let _=Math.floor(c*.5),v=1/0,y=(d-1)*c;for(let e=0;e<c;e++)h[y+e]<v&&(v=h[y+e],_=e);m[d-1]=_;for(let e=d-2;e>=0;e--){let t=m[e+1],n=e*c,r=t,i=h[n+t];t>0&&h[n+t-1]<i&&(i=h[n+t-1],r=t-1),t+1<c&&h[n+t+1]<i&&(r=t+1),m[e]=r}return m}_compositeWithSeam(e,t,n,r,i,a,o,s,c){let{w:l,h:u,pixels:d,mask:f}=e,p=Math.min(l,Math.max(0,s)),m=this._findOptimalSeam(t,n,r,i,a,o,e,0,p,c),h=Math.max(10,Math.min(26,Math.floor(p*.22)));for(let e=0;e<u;e++){let s=o+e;if(s<0||s>=i)continue;let u=m[e];for(let i=0;i<l;i++){let o=a+i;if(o<0||o>=r)continue;let m=e*l+i;if(!f[m])continue;let g=s*r+o,_=m*4,v=g*4,y=Math.min(255,d[_]*c),b=Math.min(255,d[_+1]*c),x=Math.min(255,d[_+2]*c);if(!n[g]){t[v]=y,t[v+1]=b,t[v+2]=x,t[v+3]=255,n[g]=1;continue}let S=1;if(i<p){let e=i-u;if(e<=-h)S=0;else if(e>=h)S=1;else{let t=(e+h)/(2*h);S=t*t*(3-2*t)}}if(S>.001){let e=1-S;t[v]=t[v]*e+y*S,t[v+1]=t[v+1]*e+b*S,t[v+2]=t[v+2]*e+x*S,t[v+3]=255}}}}_compositeClosingTail(e,t,n,r,i,a,o,s,c){let{w:l,h:u,pixels:d,mask:f}=e,p=Math.min(n,l-t,a);if(p<8)return;let m=this._findOptimalSeam(r,i,a,o,0,s,e,t,p,c),h=Math.max(10,Math.min(26,Math.floor(p*.24)));for(let e=0;e<u;e++){let n=s+e;if(n<0||n>=o)continue;let u=m[e];for(let o=0;o<p;o++){let s=t+o;if(s<0||s>=l)continue;let p=e*l+s;if(!f[p])continue;let m=n*a+o,g=p*4,_=m*4,v=Math.min(255,d[g]*c),y=Math.min(255,d[g+1]*c),b=Math.min(255,d[g+2]*c);if(!i[m]){r[_]=v,r[_+1]=y,r[_+2]=b,r[_+3]=255,i[m]=1;continue}let x=u-o,S;if(x>=h)S=1;else if(x<=-h)S=0;else{let e=(x+h)/(2*h);S=e*e*(3-2*e)}if(S>.001){let e=1-S;r[_]=r[_]*e+v*S,r[_+1]=r[_+1]*e+y*S,r[_+2]=r[_+2]*e+b*S,r[_+3]=255}}}}_renderCylindricalBase(e,t,n,r,i,a,o,s,c,l,u){let d=new Int16Array(a).fill(-1),f=new Int16Array(a).fill(-1),p=new Float32Array(a),m=new Float32Array(a),h=new Float32Array(a),g=new Float32Array(a),_=new Float32Array(a),v=new Float32Array(a),y=0,b=0,x=0,S=0,C=0,w=0,T=0,E=0;for(let e=0;e<a;e++){for(let t=0;t<o;t++)if(i[t*a+e]){d[e]=t;let n=(t*a+e)*4;p[e]=r[n],m[e]=r[n+1],h[e]=r[n+2],y+=p[e],b+=m[e],x+=h[e],S++;break}for(let t=o-1;t>=0;t--)if(i[t*a+e]){f[e]=t;let n=(t*a+e)*4;g[e]=r[n],_[e]=r[n+1],v[e]=r[n+2],C+=g[e],w+=_[e],T+=v[e],E++;break}}let D=S?y/S:195,O=S?b/S:195,k=S?x/S:195,A=E?C/E:145,j=E?w/E:142,M=E?T/E:138,N=e=>{let t=new Float32Array(a);for(let n=0;n<a;n++){let r=0,i=0;for(let t=-22;t<=22;t+=2){let o=s?((n+t)%a+a)%a:Math.max(0,Math.min(a-1,n+t));r+=e[o],i++}t[n]=r/i}return t},P=N(p),F=N(m),I=N(h),ee=N(g),te=N(_),ne=N(v),re=o*.5,ie=s?1:Math.min(1,l/(Math.PI*2)),ae=Math.round(t*ie),oe=u/360*t;for(let l=0;l<n;l++){let u=(.5-l/n)*Math.PI,p=re-c*(Math.abs(u)>1.48?Math.sign(u)*12:Math.tan(u)),m=l*t;for(let c=0;c<t;c++){let u=((c-oe)%t+t)%t,h;h=s?u/t*a:u<ae?u/Math.max(1,ae-1)*(a-1):(1-(u-ae)/Math.max(1,t-ae))*(a-1);let g=Math.max(0,Math.min(a-1,Math.floor(h))),_=s?(g+1)%a:Math.min(a-1,g+1),v=h-Math.floor(h),y=d[g]>=0?d[g]:0,b=f[g]>=0?f[g]:o-1,x=(m+c)*4;if(p>=y+1&&p<=b-1){let t=Math.max(0,Math.min(o-2,Math.floor(p))),n=t+1,s=p-t,c=t*a+g,l=t*a+_,u=n*a+g,d=n*a+_;if(i[c]&&i[l]&&i[u]&&i[d]){let t=(1-v)*(1-s),n=v*(1-s),i=(1-v)*s,a=v*s;e[x]=r[c*4]*t+r[l*4]*n+r[u*4]*i+r[d*4]*a,e[x+1]=r[c*4+1]*t+r[l*4+1]*n+r[u*4+1]*i+r[d*4+1]*a,e[x+2]=r[c*4+2]*t+r[l*4+2]*n+r[u*4+2]*i+r[d*4+2]*a,e[x+3]=255;continue}}if(l<n*.5){let t=Math.max(0,Math.min(1,(y-p)/Math.max(20,o*.55))),n=Math.min(1,t**.5);e[x]=P[g]*(1-n)+D*n,e[x+1]=F[g]*(1-n)+O*n,e[x+2]=I[g]*(1-n)+k*n}else{let t=Math.max(0,Math.min(1,(p-b)/Math.max(20,o*.55))),n=Math.min(1,t**.5);e[x]=ee[g]*(1-n)+A*n,e[x+1]=te[g]*(1-n)+j*n,e[x+2]=ne[g]*(1-n)+M*n}e[x+3]=255}}}_blendCapFramesOntoEquirectangular(e,t,n,r,i,a,o){let s=a*.5/Math.max(100,i),c=o*.5/Math.max(100,i),l=1/s,u=1/c,d=new Float32Array(t*n),f=new Float32Array(t*n),p=new Float32Array(t*n),m=new Float32Array(t*n),h=new Float32Array(t),g=new Float32Array(t);for(let e=0;e<t;e++){let n=e/t*Math.PI*2;h[e]=Math.cos(n),g[e]=Math.sin(n)}let _=[[0,Math.floor(n*.44)],[Math.floor(n*.56),n]];for(let e of r){let r=e.fwd.x,i=e.fwd.y,a=e.fwd.z,o=e.right.x,s=e.right.y,c=e.right.z,v=e.up.x,y=e.up.y,b=e.up.z,x=e.w,S=e.h,C=e.pixels,w=e.ring===`upper`?_[0]:_[1];for(let e=w[0];e<w[1];e++){let _=e/n*Math.PI,w=Math.sin(_),T=Math.cos(_),E=e*t;for(let e=0;e<t;e++){let t=w*h[e],n=T,_=w*g[e],D=t*r+n*i+_*a;if(D<=.35)continue;let O=(t*o+n*s+_*c)/D*l;if(O<=-1||O>=1)continue;let k=(t*v+n*y+_*b)/D*u;if(k<=-1||k>=1)continue;let A=1-Math.abs(O),j=1-Math.abs(k),M=A*A*j*j;if(M<=5e-4)continue;let N=(O*.5+.5)*(x-1),P=(-k*.5+.5)*(S-1),F=N|0,I=P|0,ee=F+1<x?F+1:F,te=I+1<S?I+1:I,ne=N-F,re=P-I,ie=(I*x+F)*4,ae=(I*x+ee)*4,oe=(te*x+F)*4,se=(te*x+ee)*4,L=(1-ne)*(1-re),ce=ne*(1-re),le=(1-ne)*re,ue=ne*re,de=E+e;d[de]+=(C[ie]*L+C[ae]*ce+C[oe]*le+C[se]*ue)*M,f[de]+=(C[ie+1]*L+C[ae+1]*ce+C[oe+1]*le+C[se+1]*ue)*M,p[de]+=(C[ie+2]*L+C[ae+2]*ce+C[oe+2]*le+C[se+2]*ue)*M,m[de]+=M}}}let v=Math.atan(o*.42/Math.max(100,i)),y=v*.65,b=v*1.05;for(let r of _)for(let i=r[0];i<r[1];i++){let r=Math.abs((.5-i/n)*Math.PI);if(r<=y)continue;let a=r>=b?1:(r-y)/Math.max(.01,b-y),o=a*a*(3-2*a),s=i*t;for(let n=0;n<t;n++){let t=s+n,r=m[t];if(r<=.001)continue;let i=o*Math.min(1,r*6),a=1-i,c=t*4;e[c]=e[c]*a+d[t]/r*i,e[c+1]=e[c+1]*a+f[t]/r*i,e[c+2]=e[c+2]*a+p[t]/r*i}}}_loop(){if(!this.running)return;requestAnimationFrame(()=>this._loop());let e=this.overlayCanvas,t=e.clientWidth||640,n=e.clientHeight||420;(e.width!==t||e.height!==n)&&(e.width=t,e.height=n);let r=e.getContext(`2d`);if(r.clearRect(0,0,t,n),this.hasLiveCamera||this._renderSimulatedCameraView(r,t,n,this.currentYaw,this.currentPitch),this.lastHorizonCanvas&&this.hasLiveCamera&&Math.abs(this.currentPitch)<18){let e=Math.round(t*.14),i=Math.round(this.lastHorizonCanvas.width*.14);r.save(),r.globalAlpha=.3,r.drawImage(this.lastHorizonCanvas,this.lastHorizonCanvas.width-i,0,i,this.lastHorizonCanvas.height,0,0,e,n),r.strokeStyle=`rgba(251, 191, 36, 0.65)`,r.lineWidth=1.5,r.beginPath(),r.moveTo(e,0),r.lineTo(e,n),r.stroke(),r.restore()}let i=Math.abs(this.currentPitch)<10&&Math.abs(this.currentRoll)<10;r.save(),r.strokeStyle=i?`rgba(52, 211, 153, 0.55)`:`rgba(251, 191, 36, 0.4)`,r.setLineDash([6,6]),r.lineWidth=1.5,r.beginPath(),r.moveTo(t*.14,n*.5),r.lineTo(t*.86,n*.5),r.stroke(),r.restore();let{tanHalfH:a,tanHalfV:o}=this._getCameraCaptureSpec();for(let e of this.targets){let i=e.vec.dot(this.cameraForward);if(i<=.15)continue;let s=e.vec.dot(this.cameraRight)/i/a,c=e.vec.dot(this.cameraUp)/i/o;if(Math.abs(s)>1.08||Math.abs(c)>1.08)continue;let l=t*.5+t*.5*s,u=n*.5-n*.5*c;r.beginPath(),r.arc(l,u,e.captured?12:17,0,Math.PI*2),e.captured?(r.fillStyle=`rgba(16, 185, 129, 0.9)`,r.strokeStyle=`#6EE7B7`):e.ring===`horizon`?(r.fillStyle=`rgba(245, 158, 11, 0.38)`,r.strokeStyle=`#FBBF24`):e.ring===`upper`?(r.fillStyle=`rgba(56, 189, 248, 0.34)`,r.strokeStyle=`#7DD3FC`):(r.fillStyle=`rgba(192, 132, 252, 0.34)`,r.strokeStyle=`#D8B4FE`),r.fill(),r.lineWidth=2.5,r.stroke(),e.captured&&(r.fillStyle=`#FFFFFF`,r.font=`bold 12px sans-serif`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillText(`✓`,l,u))}let s=this._findNearestUncaptured(8),c=0;if(s&&this.hasGyro&&!this.isStitching){let e=performance.now();this.dwellTargetId!==s.id&&(this.dwellTargetId=s.id,this.dwellStartMs=e),c=Math.min(1,(e-this.dwellStartMs)/240),c>=1&&(this.dwellTargetId=null,this.captureCurrentPose(s))}else this.dwellTargetId=null;r.beginPath(),r.arc(t/2,n/2,23,0,Math.PI*2),r.lineWidth=3,r.strokeStyle=s?`#10B981`:`rgba(255,255,255,0.9)`,r.stroke(),c>0&&(r.beginPath(),r.arc(t/2,n/2,23,-Math.PI/2,-Math.PI/2+c*Math.PI*2),r.lineWidth=4.5,r.strokeStyle=`#FBBF24`,r.stroke()),this.flashAlpha>.01&&(r.fillStyle=`rgba(255, 255, 255, ${this.flashAlpha})`,r.fillRect(0,0,t,n),this.flashAlpha*=.78),this.isStitching?(r.fillStyle=`rgba(9, 13, 22, 0.82)`,r.fillRect(0,0,t,n),r.fillStyle=`#FBBF24`,r.font=`bold 15px sans-serif`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillText(`Menyelaraskan Sambungan, Plafon & Lantai...`,t/2,n/2)):(r.fillStyle=`rgba(15, 23, 42, 0.72)`,r.fillRect(12,12,200,30),r.fillStyle=`#F8FAFC`,r.font=`600 12px sans-serif`,r.textAlign=`left`,r.textBaseline=`middle`,r.fillText(`Putaran ${Math.round(this.currentYaw)}° · Tegak ${Math.round(this.currentPitch)}°`,20,27))}_renderSimulatedCameraView(e,t,n,r,i){let a=-((r+180)/360)*t*2,o=n*.52+i/60*(n*.35),s=e.createLinearGradient(0,0,0,Math.max(20,o));s.addColorStop(0,`#1f1812`),s.addColorStop(1,`#4b3b2c`),e.fillStyle=s,e.fillRect(0,0,t,o);let c=e.createLinearGradient(0,o,0,n);c.addColorStop(0,`#5a4332`),c.addColorStop(1,`#261c14`),e.fillStyle=c,e.fillRect(0,o,t,n-o);for(let n=-4;n<=8;n++){let r=((n*220+a)%(t*2)+t*2)%(t*2)-t*.2;e.fillStyle=`#d6c3a5`,e.fillRect(r,o-120,22,130),e.fillStyle=`#c89d54`,e.fillRect(r-4,o-125,30,8),e.beginPath(),e.arc(r+110,o-140,20,0,Math.PI*2),e.fillStyle=`rgba(253, 230, 138, 0.75)`,e.fill()}}_yawPitchToVec(e,t){let n=Vs.degToRad(e),r=Vs.degToRad(t),i=Math.cos(r);return new W(i*Math.cos(n),Math.sin(r),i*Math.sin(n)).normalize()}_emitProgress(){if(!this.onProgress)return;let e=this.targets.filter(e=>e.ring===`horizon`&&e.captured).length,t=this.targets.filter(e=>e.ring===`horizon`).length,n=this.targets.filter(e=>e.ring===`upper`&&e.captured).length,r=this.targets.filter(e=>e.ring===`lower`&&e.captured).length;this.onProgress({captured:this.targets.filter(e=>e.captured).length,total:this.targets.length,horizonCaptured:e,horizonTotal:t,upperCaptured:n,lowerCaptured:r,framesCount:this.horizonFrames.length+this.capFrames.length,horizonFramesCount:this.horizonFrames.length})}_emitCapabilities(){this.onCapabilities&&this.onCapabilities({hasLiveCamera:this.hasLiveCamera,hasGyro:this.hasGyro})}_normYaw(e){return((e+180)%360+360)%360-180}_notifyStatus(e){this.onStatus&&this.onStatus(e)}stop(){this.running=!1,this.stream&&=(this.stream.getTracks().forEach(e=>e.stop()),null),this._onGyro&&window.removeEventListener(`deviceorientation`,this._onGyro),this._onDown&&this.overlayCanvas.removeEventListener(`pointerdown`,this._onDown),this._onMove&&window.removeEventListener(`pointermove`,this._onMove),this._onUp&&window.removeEventListener(`pointerup`,this._onUp)}};window.Alpine=Ea,window.Ruang360={Panorama360Viewer:rh,FloorplanCanvasBuilder:qv,BUILDER_ICON_LIBRARY:Kv,GuidedCamera360:Jv},Ea.start();