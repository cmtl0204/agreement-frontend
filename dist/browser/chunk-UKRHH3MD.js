import{sa as o,t as i}from"./chunk-CK22UZYV.js";import{H as e,Ob as c,f as u}from"./chunk-EUOB27Q6.js";var f=r=>u(void 0,null,function*(){return yield r.onExit()});var p=(r,s)=>{let t=e(c),a=e(o);if(console.log(r.url),!a.auth)return t.navigate(["/common/403"]),!1;let n=a.role;if(n){for(let m of r.data.roles)if(m.toUpperCase()===n.code.toUpperCase())return!0}return t.navigate(["/common/403"]),!1};var l=(r,s)=>{let t=e(i);return e(o).accessToken?!0:(t.unauthenticated(),!1)};export{f as a,p as b,l as c};
