/*
 * sift-r
 * v1.1.2
 * https://github.com/shuckster/sift-r
 * License: MIT
 */
var S=Object.create;var A=Object.defineProperty,k=Object.defineProperties,p=Object.getOwnPropertyDescriptor,x=Object.getOwnPropertyDescriptors,E=Object.getOwnPropertyNames,h=Object.getOwnPropertySymbols,F=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var m=(t,s,n)=>s in t?A(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n,a=(t,s)=>{for(var n in s||(s={}))b.call(s,n)&&m(t,n,s[n]);if(h)for(var n of h(s))T.call(s,n)&&m(t,n,s[n]);return t},f=(t,s)=>k(t,x(s));var q=(t,s)=>{for(var n in s)A(t,n,{get:s[n],enumerable:!0})},l=(t,s,n,e)=>{if(s&&typeof s=="object"||typeof s=="function")for(let r of E(s))!b.call(t,r)&&r!==n&&A(t,r,{get:()=>s[r],enumerable:!(e=p(s,r))||e.enumerable});return t};var v=(t,s,n)=>(n=t!=null?S(F(t)):{},l(s||!t||!t.__esModule?A(n,"default",{value:t,enumerable:!0}):n,t)),z=t=>l(A({},"__esModule",{value:!0}),t);var U={};q(U,{sift:()=>J});module.exports=z(U);var j=v(require("match-iz"),1);const{match:O,against:C,when:i,otherwise:u}=j,{not:D}=j,{isArray:c,isPojo:y,isFunction:G,isString:H}=j,B=t=>c(t)&&t.every(c)&&t.every(s=>s.length===2),I=t=>y(t)&&B(Object.values(t));function J(t,s){return O(s?[t,s]:[t])(i([I])(N),i([y,y])(d),i([y,G])(Q),i([y,c])(R),i([B])(L),i([c,c])(P),i([c,D(c)])(M),i([y])(([n])=>[{},n]),i([c])(([n])=>[[],n]),u(([n])=>[void 0,n]))}const P=([t,s])=>t.reduce(([n,e],r,o)=>O(r)(i(s[o])(()=>[[...n,r],e]),u(()=>[n,[...e,r]])),[[],[]]),L=([t])=>P(t.reduce(([s,n],[e,r])=>[[...s,r],[...n,e]],[[],[]])),M=([t,s])=>P([t,Array.from({length:t.length}).fill(s)]),d=([t,s])=>Object.entries(t).reduce(([n,e],[r,o])=>O(o)(i(s[r])(()=>[f(a({},n),{[r]:o}),e]),u(()=>[n,f(a({},e),{[r]:o})])),[{},{}]),N=([t])=>d(Object.entries(t).reduce(([s,n],[e,[r,o]])=>[f(a({},s),{[e]:o}),f(a({},n),{[e]:r})],[{},{}])),Q=([t,s])=>d([t,Object.keys(t).reduce((n,e)=>f(a({},n),{[e]:s}),{})]),R=([t,s])=>{const n=Array.from({length:s.length}).map(()=>({})),e={};return Object.entries(t).forEach(C(...s.map((o,g)=>i([H,o])(r(n[g]))),u(r(e)))),[...n,e];function r(o){return([g,w])=>Object.assign(o,{[g]:w})}};0&&(module.exports={sift});
