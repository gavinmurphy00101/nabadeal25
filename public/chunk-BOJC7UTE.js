import{c as g,i as h,j as p}from"./chunk-DFM4XHD4.js";var m=class{constructor(){this.m=new Map}reset(e){this.m=new Map(Object.entries(e))}get(e,o){let n=this.m.get(e);return n!==void 0?n:o}getBoolean(e,o=!1){let n=this.m.get(e);return n===void 0?o:typeof n=="string"?n==="true":!!n}getNumber(e,o){let n=parseFloat(this.m.get(e));return isNaN(n)?o!==void 0?o:NaN:n}set(e,o){this.m.set(e,o)}},r=new m,A=t=>{try{let e=t.sessionStorage.getItem(I);return e!==null?JSON.parse(e):{}}catch{return{}}},S=(t,e)=>{try{t.sessionStorage.setItem(I,JSON.stringify(e))}catch{return}},j=t=>{let e={};return t.location.search.slice(1).split("&").map(o=>o.split("=")).map(([o,n])=>{try{return[decodeURIComponent(o),decodeURIComponent(n)]}catch{return["",""]}}).filter(([o])=>W(o,b)).map(([o,n])=>[o.slice(b.length),n]).forEach(([o,n])=>{e[o]=n}),e},W=(t,e)=>t.substr(0,e.length)===e,b="ionic:",I="ionic-persist-config",F=t=>M(t),H=(t,e)=>(typeof t=="string"&&(e=t,t=void 0),F(t).includes(e)),M=(t=window)=>{if(typeof t>"u")return[];t.Ionic=t.Ionic||{};let e=t.Ionic.platforms;return e==null&&(e=t.Ionic.platforms=R(t),e.forEach(o=>t.document.documentElement.classList.add(`plt-${o}`))),e},R=t=>{let e=r.get("platform");return Object.keys(v).filter(o=>{let n=e==null?void 0:e[o];return typeof n=="function"?n(t):v[o](t)})},x=t=>l(t)&&!N(t),u=t=>!!(a(t,/iPad/i)||a(t,/Macintosh/i)&&l(t)),L=t=>a(t,/iPhone/i),U=t=>a(t,/iPhone|iPod/i)||u(t),y=t=>a(t,/android|sink/i),k=t=>y(t)&&!a(t,/mobile/i),B=t=>{let e=t.innerWidth,o=t.innerHeight,n=Math.min(e,o),s=Math.max(e,o);return n>390&&n<520&&s>620&&s<800},C=t=>{let e=t.innerWidth,o=t.innerHeight,n=Math.min(e,o),s=Math.max(e,o);return u(t)||k(t)||n>460&&n<820&&s>780&&s<1400},l=t=>D(t,"(any-pointer:coarse)"),T=t=>!l(t),N=t=>O(t)||_(t),O=t=>!!(t.cordova||t.phonegap||t.PhoneGap),_=t=>{let e=t.Capacitor;return!!(e!=null&&e.isNative)},J=t=>a(t,/electron/i),z=t=>{var e;return!!(!((e=t.matchMedia)===null||e===void 0)&&e.call(t,"(display-mode: standalone)").matches||t.navigator.standalone)},a=(t,e)=>e.test(t.navigator.userAgent),D=(t,e)=>{var o;return(o=t.matchMedia)===null||o===void 0?void 0:o.call(t,e).matches},v={ipad:u,iphone:L,ios:U,android:y,phablet:B,tablet:C,cordova:O,capacitor:_,electron:J,pwa:z,mobile:l,mobileweb:x,desktop:T,hybrid:N},d,K=t=>t&&p(t)||d,V=(t={})=>{if(typeof window>"u")return;let e=window.document,o=window,n=o.Ionic=o.Ionic||{},s={};t._ael&&(s.ael=t._ael),t._rel&&(s.rel=t._rel),t._ce&&(s.ce=t._ce),g(s);let f=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},A(o)),{persistConfig:!1}),n.config),j(o)),t);r.reset(f),r.getBoolean("persistConfig")&&S(o,f),M(o),n.config=r,n.mode=d=r.get("mode",e.documentElement.getAttribute("mode")||(H(o,"ios")?"ios":"md")),r.set("mode",d),e.documentElement.setAttribute("mode",d),e.documentElement.classList.add(d),r.getBoolean("_testing")&&r.set("animated",!1);let P=i=>{var c;return(c=i.tagName)===null||c===void 0?void 0:c.startsWith("ION-")},E=i=>["ios","md"].includes(i);h(i=>{for(;i;){let c=i.mode||i.getAttribute("mode");if(c){if(E(c))return c;P(i)&&console.warn('Invalid ionic mode: "'+c+'", expected: "ios" or "md"')}i=i.parentElement}return d})};export{r as a,F as b,H as c,K as d,V as e};
