/*
 * sift-r
 * v1.1.4
 * https://github.com/shuckster/sift-r
 * License: MIT
 */
var l=Object.defineProperty,B=Object.defineProperties;var w=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var h=(t,s,n)=>s in t?l(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n,a=(t,s)=>{for(var n in s||(s={}))S.call(s,n)&&h(t,n,s[n]);if(d)for(var n of d(s))k.call(s,n)&&h(t,n,s[n]);return t},f=(t,s)=>B(t,w(s));import*as g from"match-iz";const{match:j,against:p,when:i,otherwise:A}=g,{not:x}=g,{isArray:c,isPojo:y,isFunction:E,isString:F}=g,m=t=>c(t)&&t.every(c)&&t.every(s=>s.length===2),T=t=>y(t)&&m(Object.values(t));function H(t,s){return j(s?[t,s]:[t])(i([T])(z),i([y,y])(P),i([y,E])(C),i([y,c])(D),i([m])(q),i([c,c])(O),i([c,x(c)])(v),i([y])(([n])=>[{},n]),i([c])(([n])=>[[],n]),A(([n])=>[void 0,n]))}const O=([t,s])=>t.reduce(([n,r],e,o)=>j(e)(i(s[o])(()=>[[...n,e],r]),A(()=>[n,[...r,e]])),[[],[]]),q=([t])=>O(t.reduce(([s,n],[r,e])=>[[...s,e],[...n,r]],[[],[]])),v=([t,s])=>O([t,Array.from({length:t.length}).fill(s)]),P=([t,s])=>Object.entries(t).reduce(([n,r],[e,o])=>j(o)(i(s[e])(()=>[f(a({},n),{[e]:o}),r]),A(()=>[n,f(a({},r),{[e]:o})])),[{},{}]),z=([t])=>P(Object.entries(t).reduce(([s,n],[r,[e,o]])=>[f(a({},s),{[r]:o}),f(a({},n),{[r]:e})],[{},{}])),C=([t,s])=>P([t,Object.keys(t).reduce((n,r)=>f(a({},n),{[r]:s}),{})]),D=([t,s])=>{const n=Array.from({length:s.length}).map(()=>({})),r={};return Object.entries(t).forEach(p(...s.map((o,u)=>i([F,o])(e(n[u]))),A(e(r)))),[...n,r];function e(o){return([u,b])=>Object.assign(o,{[u]:b})}};export{H as sift};
