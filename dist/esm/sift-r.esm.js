/*
 * sift-r
 * v1.0.1
 * https://github.com/shuckster/sift-r
 * License: MIT
 */
var l=Object.defineProperty,w=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var h=(t,s,n)=>s in t?l(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n,a=(t,s)=>{for(var n in s||(s={}))k.call(s,n)&&h(t,n,s[n]);if(d)for(var n of d(s))p.call(s,n)&&h(t,n,s[n]);return t},y=(t,s)=>w(t,S(s));import*as g from"match-iz";const{match:j,against:x,when:i,otherwise:A}=g,{not:E}=g,{isArray:c,isPojo:f,isFunction:m,isString:F}=g,b=t=>c(t)&&t.every(c)&&t.every(s=>s.length===2)&&t.every(s=>m(s[0])),T=t=>f(t)&&b(Object.values(t));function H(t,s){return j(s?[t,s]:[t])(i([T])(z),i([f,f])(P),i([f,m])(C),i([f,c])(D),i([b])(q),i([c,c])(O),i([c,E(c)])(v),i([f])(([n])=>[{},n]),i([c])(([n])=>[[],n]),A(([n])=>[void 0,n]))}const O=([t,s])=>t.reduce(([n,e],r,o)=>j(r)(i(s[o])(()=>[[...n,r],e]),A(()=>[n,[...e,r]])),[[],[]]),q=([t])=>O(t.reduce(([s,n],[e,r])=>[[...s,r],[...n,e]],[[],[]])),v=([t,s])=>O([t,Array.from({length:t.length}).fill(s)]),P=([t,s])=>Object.entries(t).reduce(([n,e],[r,o])=>j(o)(i(s[r])(()=>[y(a({},n),{[r]:o}),e]),A(()=>[n,y(a({},e),{[r]:o})])),[{},{}]),z=([t])=>P(Object.entries(t).reduce(([s,n],[e,[r,o]])=>[y(a({},s),{[e]:o}),y(a({},n),{[e]:r})],[{},{}])),C=([t,s])=>P([t,Object.keys(t).reduce((n,e)=>y(a({},n),{[e]:s}),{})]),D=([t,s])=>{const n=Array.from({length:s.length}).map(()=>({})),e={};return Object.entries(t).forEach(x(...s.map((o,u)=>i([F,o])(r(n[u]))),A(r(e)))),[...n,e];function r(o){return([u,B])=>Object.assign(o,{[u]:B})}};export{H as sift};
