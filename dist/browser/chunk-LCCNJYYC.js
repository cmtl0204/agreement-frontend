import{ja as d,s as l,y as m}from"./chunk-EXGEWYYG.js";import{Bb as u,Cb as c,D as o,Fb as h,G as p,m as i}from"./chunk-EUOB27Q6.js";function $(){return"[A-Za-z\xC1\xC9\xCD\xD3\xDA\xE1\xE9\xED\xF3\xFA\xD1\xF1s ]+"}function v(s){return new Date(s)}var A=(()=>{let n=class n{constructor(e,t){this.httpClient=e,this.messageService=t,this.API_URL=`${m.API_URL}/users`}create(e){let t=`${this.API_URL}`;return this.httpClient.post(t,e).pipe(i(r=>(this.messageService.success(r),r.data)))}findUsers(e=0,t=""){let r=this.API_URL,a=new u().append("pagination","true"),f=new c().append("page",e).append("search",t).append("limit","2");return this.httpClient.get(r,{headers:a,params:f}).pipe(i(g=>g))}findOne(e){let t=`${this.API_URL}/${e}`;return this.httpClient.get(t).pipe(i(r=>r.data))}findAllUsersLDAP(){let e=`${this.API_URL}/ldap`;return this.httpClient.get(e).pipe(i(t=>t.data))}update(e,t){let r=`${this.API_URL}/${e}`;return this.httpClient.put(r,t).pipe(i(a=>(this.messageService.success(a),a.data)))}reactivate(e){let t=`${this.API_URL}/${e}/reactivate`;return this.httpClient.put(t,null).pipe(i(r=>(this.messageService.success(r),r.data)))}remove(e){let t=`${this.API_URL}/${e}`;return this.httpClient.delete(t).pipe(i(r=>(this.messageService.success(r),r.data)))}removeAll(e){let t=`${this.API_URL}/remove-all`;return this.httpClient.patch(t,e).pipe(i(r=>(this.messageService.success(r),r.data)))}suspend(e){let t=`${this.API_URL}/${e}/suspend`;return this.httpClient.put(t,null).pipe(i(r=>(this.messageService.success(r),r.data)))}findCatalogues(){let e=`${this.API_URL}/catalogues`;return this.httpClient.get(e).pipe(i(t=>t.data))}};n.\u0275fac=function(t){return new(t||n)(p(h),p(l))},n.\u0275prov=o({token:n,factory:n.\u0275fac,providedIn:"root"});let s=n;return s})();export{$ as a,v as b,A as c};
