import{ga as o,t as c}from"./chunk-LA37ACZB.js";import{Hb as i,f as u,z as e}from"./chunk-3AQ5X5KI.js";var f=r=>u(void 0,null,function*(){return yield r.onExit()});var p=(r,s)=>{let t=e(i),a=e(o);if(!a.auth)return t.navigate(["/common/403"]),!1;let n=a.role;if(n){for(let m of r.data.roles)if(m.toUpperCase()===n.code.toUpperCase())return!0}return t.navigate(["/common/403"]),!1};var d=(r,s)=>{let t=e(c);return e(o).accessToken?!0:(t.unauthenticated(),!1)};export{f as a,p as b,d as c};