import{a as oe,b as re}from"./chunk-A5CBF33D.js";import{Ka as ge,Wa as Ce,fa as me,ha as ae,i as Q,ia as le,ja as se,ka as ce,m as X,na as pe,o as Z,pa as de,qa as ue,r as ee,x as te,y as ie,ya as _e,z as ne,za as fe}from"./chunk-RL7JZA26.js";import{j as z,k as J}from"./chunk-XHLRH3DP.js";import{I as A,J as u,K as _,L as O,M as B,P as Y,Z as E,_ as K,aa as W,da as q,k as V,o as H,r as U,s as j,u as G}from"./chunk-EXGEWYYG.js";import{Aa as $,Ba as b,Ca as m,E as v,H as f,J as F,K as S,La as p,Ma as P,Na as d,O as D,Ob as k,P as N,Rb as y,_ as r,ja as g,ka as R,la as c,qa as C,ra as T,sa as x,ta as I,ua as a,va as s,w,wa as h,zb as M}from"./chunk-EUOB27Q6.js";function ve(e,t){if(e&1&&(a(0,"div",11)(1,"h1"),p(2),s(),a(3,"div",12)(4,"p-inputGroup"),h(5,"p-button",13)(6,"input",14),s()()()),e&2){let n=m();r(2),P(n.BreadcrumbEnum.AGREEMENTS),r(3),c("icon",n.PrimeIcons.SEARCH),r(),c("formControl",n.search)}}function Se(e,t){if(e&1&&(a(0,"th",15),p(1),h(2,"p-sortIcon",17),s()),e&2){let n=t.$implicit;c("pSortableColumn",n.field),r(),d(" ",n.header," "),r(),c("field",n.field)}}function Te(e,t){if(e&1&&(a(0,"tr"),x(1,Se,3,3,"th",15,T),a(3,"th",16),p(4),s()()),e&2){let n=t.$implicit,i=m();r(),I(n),r(3),d(" ",i.TableEnum.ACTIONS," ")}}function xe(e,t){if(e&1&&p(0),e&2){let n=m(2).$implicit,i=m().$implicit;d(" ",i[n.field].unit.name," ")}}function Ie(e,t){if(e&1&&p(0),e&2){let n=m(2).$implicit,i=m().$implicit;d(" ",i[n.field].state.name," ")}}function ye(e,t){if(e&1&&g(0,xe,1,1)(1,Ie,1,1),e&2){let n,i=m().$implicit;C(0,(n=i.field)==="administrator"?0:n==="agreementState"?1:-1)}}function Be(e,t){e&1&&h(0,"p-tag",20)}function Le(e,t){if(e&1&&g(0,Be,1,0,"p-tag",20),e&2){let n=m(3).$implicit;C(0,n.suspendedAt?0:-1)}}function we(e,t){if(e&1&&p(0),e&2){let n=m(2).$implicit,i=m().$implicit;d(" ",i[n.field]," ")}}function Fe(e,t){if(e&1&&g(0,Le,1,1)(1,we,1,1),e&2){let n,i=m().$implicit;C(0,(n=i.field)==="isFinancing"?0:1)}}function De(e,t){if(e&1&&(a(0,"td"),g(1,ye,2,1)(2,Fe,2,1),s()),e&2){let n=t.$implicit,i=m().$implicit;r(),C(1,i[n.field]!=null&&i[n.field].id?1:-1),r(),C(2,i[n.field]!=null&&i[n.field].id?-1:2)}}function Ne(e,t){if(e&1){let n=$();a(0,"tr",18),x(1,De,3,2,"td",null,T),a(3,"td",16)(4,"p-button",19),b("click",function(){let l=D(n).$implicit,o=m();return N(o.selectItem(l))}),s()()()}if(e&2){let n=t.$implicit,i=t.columns,l=t.rowIndex,o=m();c("pSelectableRow",n)("pSelectableRowIndex",l),r(),I(i),r(3),c("icon",o.PrimeIcons.ELLIPSIS_V)}}function Re(e,t){if(e&1&&(a(0,"tr")(1,"td"),p(2),s()()),e&2){let n=t.$implicit,i=m();r(),R("colspan",n.length),r(),d(" ",i.messageService.paginatorNoRecordsFound," ")}}function $e(e,t){}var he=(()=>{let t=class t{constructor(){this.coreService=f(U),this.agreementsHttpService=f(q),this.router=f(k),this.breadcrumbService=f(G),this.PrimeIcons=V,this.IconButtonActionEnum=_,this.SeverityButtonActionEnum=O,this.LabelButtonActionEnum=u,this.BreadcrumbEnum=B,this.TableEnum=Y,this.messageService=f(j),this.buttonActions=this.buildButtonActions,this.isButtonActions=!1,this.columns=this.buildColumns,this.search=new Z(""),this.items=[],this.breadcrumbService.setItems([{label:B.AGREEMENTS}]),this.search.valueChanges.pipe(w(500)).subscribe(i=>{this.findAgreements()})}ngOnInit(){this.findAgreements()}findAgreements(){this.agreementsHttpService.findNationalAgreementsByOrigin().subscribe(i=>{this.items=i})}findOne(i){this.agreementsHttpService.findOne(i).subscribe(l=>{})}get buildColumns(){return[{field:"name",header:E.name},{field:"internalNumber",header:E.internalNumber},{field:"number",header:E.number},{field:"administrator",header:W.unit},{field:"endedAt",header:E.endedAt},{field:"agreementState",header:K.state}]}get buildButtonActions(){return[{id:A.UPDATE,label:u.VIEW,icon:_.UPDATE,command:()=>{this.selectedItem?.id&&this.redirectViewAgreement(this.selectedItem.id)}},{id:A.UPDATE,label:u.UPDATE,icon:_.UPDATE,command:()=>{this.selectedItem?.id&&this.redirectEditForm(this.selectedItem.id)}},{id:A.DELETE,label:u.DELETE,icon:_.DELETE,command:()=>{this.selectedItem?.id&&this.remove(this.selectedItem.id)}},{id:A.SUSPEND,label:u.SUSPEND,icon:_.SUSPEND,command:()=>{this.selectedItem?.id&&this.suspend(this.selectedItem.id)}},{id:A.REACTIVATE,label:u.REACTIVATE,icon:_.REACTIVATE,command:()=>{this.selectedItem?.id&&this.reactivate(this.selectedItem.id)}}]}redirectCreateForm(){this.router.navigate(["/core/international-supervisor/agreements","new"])}redirectEditForm(i){this.router.navigate(["/core/international-supervisor/agreements",i])}redirectViewAgreement(i){this.router.navigate(["/core/agreements/view"])}remove(i){}removeAll(){}suspend(i){}reactivate(i){}validateButtonActions(i){}paginate(i){}selectItem(i){this.isButtonActions=!0,this.selectedItem=i,this.validateButtonActions(i)}};t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=F({type:t,selectors:[["app-agreement-list"]],decls:12,vars:13,consts:[[1,"p-toolbar-group-left"],[3,"click","icon","label","loading","severity"],[1,"ml-2",3,"click","icon","label","loading","severity"],[1,"p-toolbar-group-right"],["dataKey","id","styleClass","p-datatable-striped",3,"value","columns","loading"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["pTemplate","summary"],[3,"isHide","buttonActions","enabled"],[1,"flex"],[1,"p-input-icon-right","ml-auto"],[3,"icon"],["type","text","pInputText","","placeholder","Buscar...",3,"formControl"],[3,"pSortableColumn"],[1,"text-center"],[3,"field"],[3,"pSelectableRow","pSelectableRowIndex"],[3,"click","icon"],["severity","danger","value","Suspendido",1,"mr-1"]],template:function(l,o){l&1&&(a(0,"p-toolbar")(1,"div",0)(2,"p-button",1),b("click",function(){return o.redirectCreateForm()}),s(),a(3,"p-button",2),b("click",function(){return o.findAgreements()}),s()(),h(4,"div",3),s(),a(5,"p-table",4),g(6,ve,7,3,"ng-template",5)(7,Te,5,1,"ng-template",6)(8,Ne,5,3,"ng-template",7)(9,Re,3,2,"ng-template",8)(10,$e,0,0,"ng-template",9),s(),a(11,"app-button-action",10),b("isHide",function(Ee){return o.isButtonActions=!Ee}),s()),l&2&&(r(2),c("icon",o.IconButtonActionEnum.CREATE)("label",o.LabelButtonActionEnum.CREATE)("loading",o.coreService.isLoading)("severity",o.SeverityButtonActionEnum.CREATE),r(),c("icon",o.IconButtonActionEnum.SYNC)("label",o.LabelButtonActionEnum.SYNC)("loading",o.coreService.isLoading)("severity",o.SeverityButtonActionEnum.SYNC),r(2),c("value",o.items)("columns",o.columns)("loading",o.coreService.isLoading),r(6),c("buttonActions",o.buttonActions)("enabled",o.isButtonActions))},dependencies:[ge,H,de,z,Q,X,ae,le,ce,se,oe,_e,ee,ie]});let e=t;return e})();var Pe=[{path:"agreement-list",component:he}],be=(()=>{let t=class t{};t.\u0275fac=function(l){return new(l||t)},t.\u0275mod=S({type:t}),t.\u0275inj=v({imports:[y.forChild(Pe),y]});let e=t;return e})();var At=(()=>{let t=class t{};t.\u0275fac=function(l){return new(l||t)},t.\u0275mod=S({type:t}),t.\u0275inj=v({imports:[M,Ce,be,ue,J,me,pe,re,fe,te,ne]});let e=t;return e})();export{At as ManagerModule};
