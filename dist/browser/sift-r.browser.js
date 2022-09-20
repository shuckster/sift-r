/*
 * sift-r
 * v1.3.2
 * https://github.com/shuckster/sift-r
 * License: MIT
 */
var siftr=(()=>{var A=Object.defineProperty,ie=Object.defineProperties,le=Object.getOwnPropertyDescriptor,ce=Object.getOwnPropertyDescriptors,oe=Object.getOwnPropertyNames,I=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,ue=Object.prototype.propertyIsEnumerable;var T=(e,r,t)=>r in e?A(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,h=(e,r)=>{for(var t in r||(r={}))z.call(r,t)&&T(e,t,r[t]);if(I)for(var t of I(r))ue.call(r,t)&&T(e,t,r[t]);return e},y=(e,r)=>ie(e,ce(r));var C=(e,r)=>{for(var t in r)A(e,t,{get:r[t],enumerable:!0})},fe=(e,r,t,s)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of oe(r))!z.call(e,a)&&a!==t&&A(e,a,{get:()=>r[a],enumerable:!(s=le(r,a))||s.enumerable});return e};var ge=e=>fe(A({},"__esModule",{value:!0}),e);var Or={};C(Or,{byPattern:()=>fr,sift:()=>ur});var b={};C(b,{against:()=>Z,allOf:()=>V,anyOf:()=>$,cata:()=>Ve,deepEq:()=>Me,defined:()=>Ce,empty:()=>K,endsWith:()=>Xe,eq:()=>_,every:()=>qe,falsy:()=>er,firstOf:()=>Te,gt:()=>Ge,gte:()=>Je,hasOwn:()=>$e,inRange:()=>Qe,includedIn:()=>Ze,includes:()=>Ye,instanceOf:()=>Ee,isArray:()=>o,isDate:()=>xe,isFunction:()=>u,isNumber:()=>Y,isPojo:()=>f,isRegExp:()=>N,isStrictly:()=>_e,isString:()=>O,lastOf:()=>ze,lt:()=>He,lte:()=>Le,match:()=>Ne,not:()=>ke,otherwise:()=>Re,pluck:()=>We,some:()=>Ie,spread:()=>sr,startsWith:()=>Ue,truthy:()=>Ke,when:()=>De});var H=Object.defineProperty,j=Object.getOwnPropertySymbols,J=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable,G=(e,r,t)=>r in e?H(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,he=(e,r)=>{for(var t in r||(r={}))J.call(r,t)&&G(e,t,r[t]);if(j)for(var t of j(r))L.call(r,t)&&G(e,t,r[t]);return e},ye=(e,r)=>{var t={};for(var s in e)J.call(e,s)&&r.indexOf(s)<0&&(t[s]=e[s]);if(e!=null&&j)for(var s of j(e))r.indexOf(s)<0&&L.call(e,s)&&(t[s]=e[s]);return t},me=(e,r)=>{for(var t in r)H(e,t,{get:r[t],enumerable:!0})},S={};me(S,{instanceOf:()=>w,isArguments:()=>U,isArray:()=>de,isDate:()=>Oe,isFunction:()=>pe,isNumber:()=>Ae,isObject:()=>X,isPojo:()=>Pe,isRegExp:()=>je,isString:()=>be});var Q=Object.prototype,ve=Q.toString,P=e=>r=>typeof r===e,w=e=>r=>r instanceof e,{isArray:de}=Array,U=e=>ve.call(e)==="[object Arguments]",Oe=e=>w(Date)(e)&&!isNaN(e),pe=P("function"),be=P("string"),Ae=e=>e===e&&P("number")(e),X=e=>e!==null&&P("object")(e),je=w(RegExp),Pe=e=>e===null||!X(e)||U(e)?!1:Object.getPrototypeOf(e)===Q,{isArray:o,isDate:xe,isFunction:u,isNumber:Y}=S,{isPojo:f,isRegExp:N,isString:O,instanceOf:Ee}=S,{keys:m,entries:Se,assign:we}=Object;function Ne(e){return(...r)=>Z(...r)(e)}var Z=(...e)=>{let r;return t=>e.find(s=>{let a=s(t),{matched:n,value:g}=a||{};return[n,g].every(u)?n(t)&&(r=g(t),!0):a&&(r=a)})&&r},Re=e=>r=>({matched:()=>!0,value:()=>u(e)?e(r):e}),E=e=>r=>t=>({matched:()=>l(e,t,s=>t=s),value:()=>u(r)?O(t)&&N(e)?r(...Fe(t.match(e))):r(t):r}),De=(...e)=>{if(e.length===1){let[r]=e;return E(r)}if(e.length===2){let[r,t]=e;return E(r)(t)}if(e.length>2){let r=e.slice(-1)[0],t=e.slice(0,-1);return E(V(t))(r)}throw new Error("expected 1 or 2 arguments")},Fe=e=>{let{groups:r}=e;return r?[r,e]:[e]},l=(e,r,t)=>f(e)?m(e).every(s=>l(e[s],r==null?void 0:r[s],t)):o(e)?o(r)&&e.length===r.length&&e.every((s,a)=>l(s,r==null?void 0:r[a],t)):u(e)?e(r,t):O(r)&&N(e)?e.test(r):e===r||[e,r].every(Number.isNaN),We=(...e)=>(r,t)=>e.length===0||(u(e[0])?e[0](r):l(e[0],r,t))?(t(r),!0):!1,Be=(e,r)=>[e,r].every(f)?m(e).length===m(r).length:!0,_=e=>(r,t)=>Be(e,r)&&l(e,r,t),Me=e=>R(e,r=>f(r)?_(r):r),ke=e=>(r,t)=>!l(e,r,t),$=(...e)=>(r,t)=>e.flat().some(s=>l(s,r,t)),V=(...e)=>(r,t)=>e.flat().every(s=>l(s,r,t)),qe=e=>re(r=>r.every(t=>l(e,t))),Ie=e=>re(r=>r.some(t=>l(e,t))),Te=(...e)=>D((r,t)=>e.length<=r.length&&l(e,r.slice(0,e.length),t)),ze=(...e)=>D((r,t)=>e.length<=r.length&&l(e,r.slice(r.length-e.length),t)),K=e=>e!==e||!e&&e!==0&&e!==!1||o(e)&&!e.length||f(e)&&!m(e).length,Ce=e=>!K(e),Ge=e=>p(r=>r>e),He=e=>p(r=>r<e),Je=e=>p(r=>r>=e),Le=e=>p(r=>r<=e),Qe=(e,r)=>p(t=>t>=Math.min(e,r)&&t<=Math.max(e,r)),Ue=e=>ee(r=>r.startsWith(e)),Xe=e=>ee(r=>r.endsWith(e)),Ye=e=>D(r=>r.includes(e)),Ze=$,_e=e=>r=>r===e,$e=(...e)=>r=>f(r)&&(([t,s])=>t.length&&t.every(a=>s.includes(a)))([e.flat(),m(r)]),Ve=e=>{var r=e,{getValue:t}=r,s=ye(r,["getValue"]);return Se(s).reduce((a,[n,g])=>we(a,{[n]:x=>q=>({matched:()=>g(q),value:()=>u(x)?x(t(q)):x})}),{})},Ke=e=>!!e,er=e=>!e,rr=e=>(r,t)=>(r[t]=R(r[t],e),r),tr=e=>r=>R(r,e),R=(e,r)=>r(f(e)?m(e).reduce(rr(r),he({},e)):o(e)?e.map(tr(r)):e),sr=e=>new Proxy({},{get:()=>e}),ee=e=>r=>O(r)&&e(r),p=e=>r=>Y(r)&&e(r),re=e=>(r,t)=>o(r)&&e(r,t),D=e=>(r,t)=>(o(r)||O(r))&&e(r,t);var{match:F,against:W,when:i,otherwise:d}=b,{not:ar,allOf:B,firstOf:nr,every:te,gte:ir}=b,{isArray:c,isPojo:v,isFunction:lr,isString:cr}=b,ne=B(c,te(c),te({length:2})),or=B(v,e=>ne(Object.values(e)));function ur(e,...r){return F([e,...r])(i([or])(mr),i([v,v])(k),i([v,lr])(vr),i([v,c])(dr),i([ne])(gr),i([c,c])(M),i([c,ar(c)])(hr),i(B(nr(c),{length:ir(2)}))(yr),i([v])(([t])=>[{},t]),i([c])(([t])=>[[],t]),d(([t])=>[void 0,t]))}var fr=e=>W(i(e,r=>r),d(void 0)),M=([e,r])=>e.reduce(([t,s],a,n)=>F(a)(i(r[n])(g=>[[...t,g],s]),d(()=>[t,[...s,a]])),[[],[]]),gr=([e])=>M(e.reduce(([r,t],[s,a])=>[[...r,a],[...t,s]],[[],[]])),hr=([e,r])=>M([e,Array.from({length:e.length}).fill(r)]),yr=([e,...r])=>{let t=Array.from({length:r.length}).map(()=>[]),s=[];return e.forEach(W(...r.map((a,n)=>i(a)(se(t[n]))),d(se(s)))),[...t,s]},k=([e,r])=>Object.entries(e).reduce(([t,s],[a,n])=>F(n)(i(r[a])(()=>[y(h({},t),{[a]:n}),s]),d(()=>[t,y(h({},s),{[a]:n})])),[{},{}]),mr=([e])=>k(Object.entries(e).reduce(([r,t],[s,[a,n]])=>[y(h({},r),{[s]:n}),y(h({},t),{[s]:a})],[{},{}])),vr=([e,r])=>k([e,Object.keys(e).reduce((t,s)=>y(h({},t),{[s]:r}),{})]),dr=([e,r])=>{let t=Array.from({length:r.length}).map(()=>({})),s={};return Object.entries(e).forEach(W(...r.map((a,n)=>i([cr,a])(ae(t[n]))),d(ae(s)))),[...t,s]};function se(e){return r=>e.push(r)}function ae(e){return([r,t])=>Object.assign(e,{[r]:t})}return ge(Or);})();
