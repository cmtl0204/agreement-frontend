import{Ba as n,t as u}from"./chunk-EWPJV5E5.js";import{H as o,Ob as i,f as c}from"./chunk-EUOB27Q6.js";var m=r=>c(void 0,null,function*(){return yield r.onExit()});var f=(r,p)=>{let t=o(i),e=o(n);if(!e.auth)return t.navigate(["/common/403"]),!1;let a=e.role;if(a){for(let s of r.data.roles)if(console.log(s.toUpperCase()),console.log(a.code.toUpperCase()),console.log(s.toUpperCase()===a.code.toUpperCase()),s.toUpperCase()===a.code.toUpperCase())return!0}return t.navigate(["/common/403"]),!1};var l=(r,p)=>{let t=o(u),e=o(n);return e.accessToken?!0:(e.removeLogin(),t.login(),!1)};export{m as a,f as b,l as c};
