import{b as Ce}from"./chunk-A5CBF33D.js";import{a as De,b as Be}from"./chunk-3LNKMQC7.js";import"./chunk-6TJ5HOZS.js";import"./chunk-ISADC5UE.js";import"./chunk-I6ACFXRE.js";import{Fa as we,Ga as Le,Ka as Fe,Wa as Me,fa as he,ha as be,ia as Ae,ja as ve,ka as Ee,na as Ie,o as _e,pa as xe,qa as Se,x as fe,ya as Te,z as ge,za as ye}from"./chunk-RL7JZA26.js";import{j as de,k as ue}from"./chunk-XHLRH3DP.js";import{H as j,I as h,J as x,K as S,L as oe,M as k,P as re,Z as b,_ as ae,aa as se,da as me,ha as le,k as Q,ka as ce,ma as pe,o as X,p as D,r as Z,s as ee,u as te,v as ie,x as ne}from"./chunk-EXGEWYYG.js";import{Aa as $,Ba as y,Ca as r,E as g,H as u,J as L,K as C,La as p,Ma as W,Na as d,O as A,Ob as J,P as v,Qa as Y,Ra as U,Rb as O,Sa as K,Xa as q,_ as s,eb as F,fb as M,ja as _,ka as H,la as c,qa as f,ra as N,sa as P,ta as R,tb as z,ua as m,va as l,w as G,wa as E,zb as I}from"./chunk-EUOB27Q6.js";var $e=e=>({enabled:e});function Oe(e,t){if(e&1&&(m(0,"div",14)(1,"h1"),p(2),l()()),e&2){let i=r();s(2),W(i.BreadcrumbEnum.AGREEMENTS)}}function je(e,t){if(e&1&&(m(0,"th",15),p(1),E(2,"p-sortIcon",17),l()),e&2){let i=t.$implicit;c("pSortableColumn",i.field),s(),d(" ",i.header," "),s(),c("field",i.field)}}function ke(e,t){if(e&1&&(m(0,"tr"),P(1,je,3,3,"th",15,N),m(3,"th",16),p(4),l()()),e&2){let i=t.$implicit,n=r();s(),R(i),s(3),d(" ",n.TableEnum.ACTIONS," ")}}function Ge(e,t){if(e&1&&p(0),e&2){let i=r(2).$implicit,n=r().$implicit;d(" ",n[i.field].unit.name," ")}}function He(e,t){if(e&1&&p(0),e&2){let i=r(2).$implicit,n=r().$implicit;d(" ",n[i.field].state.name," ")}}function We(e,t){if(e&1&&_(0,Ge,1,1)(1,He,1,1),e&2){let i,n=r().$implicit;f(0,(i=n.field)==="administrator"?0:i==="agreementState"?1:-1)}}function Ye(e,t){if(e&1&&(p(0),F(1,"customFormatDate")),e&2){let i=r(4).$implicit;d(" ",M(1,1,i.subscribedAt)," ")}}function Ue(e,t){if(e&1&&_(0,Ye,2,3),e&2){let i=r(3).$implicit;f(0,i.subscribedAt?0:-1)}}function Ke(e,t){if(e&1&&(p(0),F(1,"customFormatDate")),e&2){let i=r(4).$implicit;d(" ",M(1,1,i.endedAt)," ")}}function qe(e,t){e&1&&p(0," Indefinido ")}function ze(e,t){if(e&1&&_(0,Ke,2,3)(1,qe,1,0),e&2){let i=r(3).$implicit;f(0,i.endedAt?0:1)}}function Je(e,t){if(e&1&&(p(0),F(1,"yesNo")),e&2){let i=r(3).$implicit;d(" ",M(1,1,i.isFinancing)," ")}}function Qe(e,t){e&1&&E(0,"p-tag",20)}function Xe(e,t){e&1&&E(0,"p-tag",21)}function Ze(e,t){if(e&1&&_(0,Qe,1,0,"p-tag",20)(1,Xe,1,0),e&2){let i=r(3).$implicit;f(0,i.enabled?0:1)}}function et(e,t){if(e&1&&p(0),e&2){let i=r(2).$implicit,n=r().$implicit;d(" ",n[i.field]," ")}}function tt(e,t){if(e&1&&_(0,Ue,1,1)(1,ze,2,1)(2,Je,2,3)(3,Ze,2,1)(4,et,1,1),e&2){let i,n=r().$implicit;f(0,(i=n.field)==="subscribedAt"?0:i==="endedAt"?1:i==="isFinancing"?2:i==="enabled"?3:4)}}function it(e,t){if(e&1&&(m(0,"td"),_(1,We,2,1)(2,tt,5,1),l()),e&2){let i=t.$implicit,n=r().$implicit;s(),f(1,n[i.field]!=null&&n[i.field].id?1:-1),s(),f(2,n[i.field]!=null&&n[i.field].id?-1:2)}}function nt(e,t){if(e&1){let i=$();m(0,"tr",18),P(1,it,3,2,"td",null,N),m(3,"td",16)(4,"p-button",19),y("click",function(){let a=A(i).$implicit,o=r();return v(o.selectItem(a))}),l()()()}if(e&2){let i=t.$implicit,n=t.columns,a=t.rowIndex,o=r();c("pSelectableRow",i)("pSelectableRowIndex",a)("ngClass",q(4,$e,!i.enabled)),s(),R(n),s(3),c("icon",o.PrimeIcons.ELLIPSIS_V)}}function ot(e,t){if(e&1&&(m(0,"tr")(1,"td"),p(2),l()()),e&2){let i=t.$implicit,n=r();s(),H("colspan",i.length),s(),d(" ",n.messageService.paginatorNoRecordsFound," ")}}function rt(e,t){}function at(e,t){if(e&1&&E(0,"app-view",13),e&2){let i=r();c("id",i.selectedItem.id)}}var Ve=(()=>{let t=class t{constructor(){this.authService=u(pe),this.coreService=u(Z),this.agreementsHttpService=u(me),this.agreementsService=u(ne),this.router=u(J),this.breadcrumbService=u(te),this.PrimeIcons=Q,this.IconButtonActionEnum=S,this.SeverityButtonActionEnum=oe,this.LabelButtonActionEnum=x,this.BreadcrumbEnum=k,this.TableEnum=re,this.messageService=u(ee),this.messageDialogService=u(ie),this.buttonActions=[],this.isButtonActions=!1,this.columns=[],this.search=new _e(""),this.items=[],this.isVisibleAgreementView=!1,this.breadcrumbService.setItems([{label:k.AGREEMENTS}]),this.buildButtonActions(),this.buildColumns(),this.search.valueChanges.pipe(G(500)).subscribe(n=>{this.findAgreements()})}ngOnInit(){this.findAgreements()}findAgreements(){this.authService.role.code===j.NATIONAL_SUPERVISOR&&this.agreementsHttpService.findNationalAgreementsByOrigin().subscribe(n=>{this.items=n}),this.authService.role.code===j.INTERNATIONAL_SUPERVISOR&&this.agreementsHttpService.findInternationalAgreementsByOrigin().subscribe(n=>{this.items=n})}buildColumns(){this.columns=[{field:"number",header:b.number},{field:"internalNumber",header:b.internalNumber},{field:"name",header:b.name},{field:"administrator",header:se.header},{field:"agreementState",header:ae.state},{field:"subscribedAt",header:b.subscribedAt},{field:"endedAt",header:b.endedAt},{field:"isFinancing",header:b.isFinancing},{field:"enabled",header:b.enabled}]}buildButtonActions(){this.buttonActions=[{id:h.VIEW,label:x.VIEW,icon:S.VIEW,command:()=>{this.redirectViewAgreement()}},{id:h.COMPLETE,label:x.COMPLETE,icon:S.COMPLETE,command:()=>{this.selectedItem?.id&&this.redirectCompleteForm(this.selectedItem)}},{id:h.EDIT,label:x.UPDATE,icon:S.EDIT,command:()=>{this.selectedItem?.id&&this.redirectEditForm(this.selectedItem.id)}},{id:h.AGREEMENT_LOG,label:x.AGREEMENT_LOG,icon:S.AGREEMENT_LOG,command:()=>{this.selectedItem?.id&&this.redirectAgreementLogForm(this.selectedItem.id)}}]}redirectCreateForm(){this.agreementsService.clearAgreement(),this.router.navigate(["/core/agreements","register"])}redirectCompleteForm(n){this.router.navigate(["/core/agreements","register"])}redirectEditForm(n){this.router.navigate(["/core/agreements/update",n])}redirectViewAgreement(){this.messageDialogService.successCustom("Sitio en construcci\xF3n","Pronto estar\xE1 disponible")}redirectAgreementLogForm(n){this.router.navigate(["/core/agreements/log",n])}remove(n){}validateButtonActions(n){this.buildButtonActions(),n.enabled&&this.buttonActions.splice(this.buttonActions.findIndex(a=>a.id===h.COMPLETE),1),n.enabled||(this.buttonActions.splice(this.buttonActions.findIndex(a=>a.id===h.VIEW),1),this.buttonActions.splice(this.buttonActions.findIndex(a=>a.id===h.EDIT),1))}paginate(n){}selectItem(n){this.agreementsHttpService.findOne(n.id).subscribe(a=>{this.isButtonActions=!0,this.selectedItem=n,this.validateButtonActions(n),this.agreementsService.agreement=a})}};t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=L({type:t,selectors:[["app-agreement-list"]],decls:15,vars:18,consts:[["dt",""],[1,"p-toolbar-group-left"],[3,"click","icon","label","loading","severity"],[1,"ml-2",3,"click","icon","label","loading","severity"],[1,"p-toolbar-group-right"],["dataKey","id","styleClass","p-datatable-striped","paginatorPosition","both",3,"value","columns","paginator","rows","loading"],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["pTemplate","summary"],[3,"isHide","buttonActions","enabled"],["header","Convenio",3,"visibleChange","visible","modal"],[3,"id"],[1,"flex"],[3,"pSortableColumn"],[1,"text-center"],[3,"field"],[3,"pSelectableRow","pSelectableRowIndex","ngClass"],[3,"click","icon"],["severity","info","value","Registrado"],["severity","danger","value","En Proceso"]],template:function(a,o){if(a&1){let w=$();m(0,"p-toolbar")(1,"div",1)(2,"p-button",2),y("click",function(){return A(w),v(o.redirectCreateForm())}),l(),m(3,"p-button",3),y("click",function(){return A(w),v(o.findAgreements())}),l()(),E(4,"div",4),l(),m(5,"p-table",5,0),_(7,Oe,3,1,"ng-template",6)(8,ke,5,1,"ng-template",7)(9,nt,5,6,"ng-template",8)(10,ot,3,2,"ng-template",9)(11,rt,0,0,"ng-template",10),l(),m(12,"app-button-action",11),y("isHide",function(T){return A(w),v(o.isButtonActions=!T)}),l(),m(13,"p-dialog",12),K("visibleChange",function(T){return A(w),U(o.isVisibleAgreementView,T)||(o.isVisibleAgreementView=T),v(T)}),_(14,at,1,1,"app-view",13),l()}a&2&&(s(2),c("icon",o.IconButtonActionEnum.CREATE)("label",o.LabelButtonActionEnum.CREATE_AGREEMENT)("loading",o.coreService.isLoading)("severity",o.SeverityButtonActionEnum.CREATE),s(),c("icon",o.IconButtonActionEnum.SYNC)("label",o.LabelButtonActionEnum.SYNC)("loading",o.coreService.isLoading)("severity",o.SeverityButtonActionEnum.SYNC),s(2),c("value",o.items)("columns",o.columns)("paginator",!0)("rows",10)("loading",o.coreService.isLoading),s(7),c("buttonActions",o.buttonActions)("enabled",o.isButtonActions),s(),Y("visible",o.isVisibleAgreementView),c("modal",!0),s(),f(14,o.selectedItem&&o.isVisibleAgreementView?14:-1))},dependencies:[z,Fe,X,xe,de,be,Ae,Ee,ve,Te,we,De,le,ce],styles:[".enabled[_ngcontent-%COMP%]{background-color:var(--red-200)}"]});let e=t;return e})();var st=[{path:"agreement-list",component:Ve}],Ne=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=C({type:t}),t.\u0275inj=g({imports:[O.forChild(st),O]});let e=t;return e})();var Pe=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=C({type:e});static \u0275inj=g({imports:[I,D]})}return e})();var Re=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=C({type:e});static \u0275inj=g({imports:[I,D]})}return e})();var ni=(()=>{let t=class t{};t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=C({type:t}),t.\u0275inj=g({imports:[I,Ne,Me,Se,ue,he,Ie,Ce,ye,fe,ge,Le,Be,Pe,Re]});let e=t;return e})();export{ni as NationalSupervisorModule};
