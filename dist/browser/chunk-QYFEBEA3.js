import{c as Ue,d as Ye,e as qe,f as Ge}from"./chunk-TTPECDCB.js";import{b as ze}from"./chunk-OKUVFNC3.js";import{c as Fe,e as Be}from"./chunk-GGKMHMBW.js";import{Aa as se,B as k,Oa as He,P as x,Q as Ie,Sa as Re,U as De,V as Me,W as Oe,_ as we,ca as Ne,d as ie,ea as Le,ia as T,ja as D,ka as j,m as he,oa as Pe,p as Ee,ra as $e,ua as ke,va as ae,w as Se,wa as Ve,x as Te,y as $,ya as We,z as Ae}from"./chunk-PBIOFTA5.js";import{A as _e,B as P,C as ve,D as xe,E as ye,F as ne,G as be,l as K,m as Q,n as X,p as Z,r as ee,u as V,v as B,w as v,x as te,y as W,z as H}from"./chunk-4QCADNJD.js";import{e as Ce,j as oe,k as ce,p as je}from"./chunk-CSO23DVT.js";import{k as J,o as _,r as S,v as fe}from"./chunk-ZFS7MCCM.js";import{B as f,C as z,Da as p,Ea as g,Fa as E,G as M,H as O,Ia as me,Ja as le,Ka as pe,Kb as de,Oa as I,S as i,Ya as q,Za as G,ba as u,ca as U,da as r,ia as h,ja as F,ka as b,la as C,ma as o,na as a,oa as c,qb as ue,sa as L,sb as ge,ta as Y,ua as d,w as R,z as y}from"./chunk-3AQ5X5KI.js";function pt(e,n){if(e&1&&(o(0,"div",9),c(1,"label",21)(2,"input",22),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.specialType),i(),r("value",t.agreement.specialType==null?null:t.agreement.specialType.name)("readonly",!0)}}function dt(e,n){if(e&1&&(o(0,"div",2)(1,"div",3),c(2,"label",4)(3,"input",5),a(),o(4,"div",6),c(5,"label",7)(6,"input",8),a(),o(7,"div",9),c(8,"label",10)(9,"input",11),a(),o(10,"div",9),c(11,"label",12)(12,"input",13),a(),o(13,"div",9),c(14,"label",14)(15,"input",15),a(),o(16,"div",9),c(17,"label",16)(18,"input",17),a(),u(19,pt,3,3,"div",9),o(20,"div",18),c(21,"label",19),o(22,"textarea",20),p(23,"          "),a()()()),e&2){let t=d();i(2),r("label",t.AgreementFormEnum.number),i(),r("value",t.agreement.number)("readonly",!0),i(2),r("label",t.AgreementFormEnum.name),i(),r("value",t.agreement.name)("readonly",!0),i(2),r("label",t.AgreementFormEnum.internalNumber),i(),r("value",t.agreement.internalNumber)("readonly",!0),i(2),r("label",t.AgreementStateEnum.state),i(),r("value",t.agreement.agreementState==null||t.agreement.agreementState.state==null?null:t.agreement.agreementState.state.name)("readonly",!0),i(2),r("label",t.AgreementFormEnum.origin),i(),r("value",t.agreement.origin==null?null:t.agreement.origin.name)("readonly",!0),i(2),r("label",t.AgreementFormEnum.type),i(),r("value",t.agreement.type==null?null:t.agreement.type.name)("readonly",!0),i(),h(19,t.agreement.specialType!=null&&t.agreement.specialType.name?19:-1),i(2),r("label",t.AgreementFormEnum.objective),i(),r("value",t.agreement.objective)("readonly",!0)}}var Qe=(()=>{let n=class n{constructor(){this.AgreementFormEnum=P,this.AgreementStateEnum=ve,this.AgreementSectionFormEnum=v}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-basic-data"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],[1,"p-fluid","grid"],[1,"field","col-8","xl:col-4","lg:col-4","md:col-4","sm:col-12"],["appLabel","","for","number",3,"label"],["pInputText","","id","number",3,"value","readonly"],[1,"field","col-4","xl:col-8","lg:col-4","md:col-8","sm:col-12"],["appLabel","","for","name",3,"label"],["pInputText","","id","name",3,"value","readonly"],[1,"field","col-12","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","","for","internalNumber",3,"label"],["pInputText","","id","internalNumber",3,"value","readonly"],["appLabel","","for","agreementState",3,"label"],["pInputText","","id","agreementState",3,"value","readonly"],["appLabel","","for","originId",3,"label"],["pInputText","","id","originId",3,"value","readonly"],["appLabel","","for","typeId",3,"label"],["pInputText","","id","typeId",3,"value","readonly"],[1,"field","col-12","xl:col-12","lg:col-12","md:col-12","sm:col-12"],["appLabel","","for","objective",3,"label"],["pInputTextarea","","id","objective",3,"value","readonly"],["appLabel","","for","specialTypeId",3,"label"],["pInputText","","id","specialTypeId",3,"value","readonly"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,dt,24,22,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.basicData)},dependencies:[k,_,$,x,ae]});let e=n;return e})();function st(e,n){if(e&1&&(o(0,"div",3),c(1,"label",4)(2,"input",5),q(3,"date"),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.endedAt),i(),r("value",G(3,3,t.agreement.endedAt))("readOnly",!0)}}function ut(e,n){if(e&1&&(o(0,"div",15),c(1,"label",4)(2,"textarea",16),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.endedReason),i(),r("value",t.agreement.endedReason)("readOnly",!0)}}function gt(e,n){if(e&1&&(o(0,"div",15)(1,"label"),p(2,"Plazo total del convenio:"),a()(),o(3,"div",17),c(4,"label",4)(5,"input",5),a(),o(6,"div",17),c(7,"label",4)(8,"input",5),a(),o(9,"div",17),c(10,"label",4)(11,"input",5),a()),e&2){let t=d(2);i(4),r("label",t.AgreementFormEnum.yearTerm),i(),r("value",t.agreement.yearTerm)("readOnly",!0),i(2),r("label",t.AgreementFormEnum.monthTerm),i(),r("value",t.agreement.monthTerm)("readOnly",!0),i(2),r("label",t.AgreementFormEnum.dayTerm),i(),r("value",t.agreement.dayTerm)("readOnly",!0)}}function ft(e,n){if(e&1){let t=L();o(0,"div",2)(1,"div",3),c(2,"label",4)(3,"input",5),q(4,"date"),a(),o(5,"div",3),c(6,"label",6)(7,"input",7),q(8,"date"),a(),o(9,"div",3),c(10,"label",4),o(11,"div",8)(12,"div",9)(13,"p-radioButton",10),pe("ngModelChange",function(m){M(t);let s=d();return le(s.agreement.isFinishDate,m)||(s.agreement.isFinishDate=m),O(m)}),a(),o(14,"label",11),p(15,"S\xED"),a()(),o(16,"div",12)(17,"p-radioButton",13),pe("ngModelChange",function(m){M(t);let s=d();return le(s.agreement.isFinishDate,m)||(s.agreement.isFinishDate=m),O(m)}),a(),o(18,"label",14),p(19,"No"),a()()()(),u(20,st,4,5,"div",3)(21,ut,3,3,"div",15)(22,gt,12,9),a()}if(e&2){let t=d();i(2),r("label",t.AgreementFormEnum.subscribedAt),i(),r("value",G(4,16,t.agreement.subscribedAt))("readOnly",!0),i(3),r("label",t.AgreementFormEnum.startedAt),i(),r("value",G(8,18,t.agreement.startedAt))("readOnly",!0),i(3),r("label",t.AgreementFormEnum.isFinishDate),i(3),r("value",!0),me("ngModel",t.agreement.isFinishDate),r("disabled",!0),i(4),r("value",!1),me("ngModel",t.agreement.isFinishDate),r("disabled",!0),i(3),h(20,t.agreement.isFinishDate?20:-1),i(),h(21,t.agreement.isFinishDate?-1:21),i(),h(22,t.agreement.isFinishDate?22:-1)}}var Xe=(()=>{let n=class n{constructor(){this.AgreementFormEnum=P,this.AgreementSectionFormEnum=v}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-agreement-date"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],[1,"p-fluid","grid"],[1,"field","col-12","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","",3,"label"],["pInputText","",3,"value","readOnly"],["appLabel","","for","startedAt",3,"label"],["pInputText","","id","startedAt",3,"value","readOnly"],[1,"flex","align-items-center"],[1,"flex","align-items-center",2,"display","flex","align-items","center"],["id","isFinishDateYes","name","isFinishDate",3,"ngModelChange","value","ngModel","disabled"],["for","isFinishDateYes",1,"ml-2"],[1,"flex","align-items-center","ml-3",2,"display","flex","align-items","center"],["id","isFinishDateNo","name","isFinishDate",3,"ngModelChange","value","ngModel","disabled"],["for","isFinishDateNo",1,"ml-2"],[1,"field","col-12"],["pInputTextarea","",3,"value","readOnly"],[1,"field","col-12","xl:col-4","lg:col-4","md:col-4","sm:col-12"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,ft,23,20,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.agreementDate)},dependencies:[he,k,_,$,x,Ee,qe,ae,ue]});let e=n;return e})();var Ze=()=>({width:"100%"});function vt(e,n){if(e&1&&(o(0,"th",6),p(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),E(" ",t.header," "),i(),r("field",t.field)}}function xt(e,n){if(e&1&&(o(0,"tr"),b(1,vt,3,3,"th",6,F),a()),e&2){let t=d(2);i(),C(t.internalInstitutionColumns)}}function yt(e,n){if(e&1&&(o(0,"tr")(1,"td"),p(2),a(),o(3,"td"),p(4),a(),o(5,"td"),p(6),a()()),e&2){let t=n.$implicit,l=d().$implicit;i(2),g(l.name),i(2),g(t.position==null?null:t.position.name),i(2),g(l.personType==null?null:l.personType.name)}}function bt(e,n){if(e&1&&b(0,yt,7,3,"tr",null,F),e&2){let t=n.$implicit;C(t.internalInstitutionDetails)}}function Ct(e,n){if(e&1&&(o(0,"p-table",3),u(1,xt,3,0,"ng-template",4)(2,bt,2,0,"ng-template",5),a()),e&2){let t=d();r("value",t.agreement.internalInstitutions)("tableStyle",I(2,Ze))}}function ht(e,n){if(e&1&&(o(0,"th",6),p(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),E(" ",t.header," "),i(),r("field",t.field)}}function Et(e,n){if(e&1&&(o(0,"tr"),b(1,ht,3,3,"th",6,F),a()),e&2){let t=d(3);i(),C(t.externalInstitutionsColumns)}}function St(e,n){if(e&1&&(o(0,"tr")(1,"td"),p(2),a(),o(3,"td"),p(4),a(),o(5,"td"),p(6),a(),o(7,"td"),p(8),a()()),e&2){let t=n.$implicit,l=d().$implicit;i(2),g(l.name),i(2),g(t.position),i(2),g(t.unit),i(2),g(l.personType==null?null:l.personType.name)}}function Tt(e,n){if(e&1&&b(0,St,9,4,"tr",null,F),e&2){let t=n.$implicit;C(t.externalInstitutionDetails)}}function At(e,n){if(e&1&&(o(0,"p-table",3),u(1,Et,3,0,"ng-template",4)(2,Tt,2,0,"ng-template",5),a()),e&2){let t=d(2);r("value",t.agreement.externalInstitutions)("tableStyle",I(2,Ze))}}function Ft(e,n){e&1&&u(0,At,3,3,"ng-template",1)}var et=(()=>{let n=class n{constructor(){this.coreService=y(S),this.externalInstitutionsColumns=[],this.internalInstitutionColumns=[],this.AgreementSectionFormEnum=v,this.buildExternalInstitutionsColumns(),this.buildInternalInstitutionsColumns()}buildInternalInstitutionsColumns(){this.internalInstitutionColumns=[{field:"name",header:te.name},{field:"position",header:te.position},{field:"personType",header:te.personType}]}buildExternalInstitutionsColumns(){this.externalInstitutionsColumns=[{field:"name",header:W.name},{field:"position",header:W.position},{field:"unit",header:W.unit},{field:"personType",header:W.personType}]}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-appearer"]],inputs:{agreement:"agreement"},decls:4,vars:1,consts:[["header","Comparecientes - MINTUR"],["pTemplate","content"],["header","Comparecientes - Contraparte"],["styleClass","p-datatable-striped",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[3,"pSortableColumn"],[3,"field"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Ct,3,3,"ng-template",1),a(),o(2,"p-panel",2),u(3,Ft,1,0,null,1),a()),m&2&&(i(3),h(3,s.agreement.externalInstitutions?3:-1))},dependencies:[_,x,T,D,j]});let e=n;return e})();var Dt=(e,n)=>n.id,Mt=()=>({"min-width":"50rem"});function Ot(e,n){if(e&1&&(o(0,"tr")(1,"th"),p(2),a(),o(3,"th"),p(4),a(),o(5,"th"),p(6),a()()),e&2){let t=d(2);i(2),g(t.ObligationForEnum.institutionName),i(2),g(t.ObligationForEnum.type),i(2),g(t.ObligationDetailForEnum.description)}}function Bt(e,n){if(e&1&&(o(0,"li"),p(1),a()),e&2){let t=n.$implicit;i(),E(" ",t.description," ")}}function wt(e,n){if(e&1&&(o(0,"tr")(1,"td"),p(2),a(),o(3,"td"),p(4),a(),o(5,"td")(6,"ul"),b(7,Bt,2,1,"li",null,Dt),a()()()),e&2){let t=n.$implicit;i(2),g(t.institutionName),i(2),g(t.type.name),i(3),C(t.obligationDetails)}}function Nt(e,n){if(e&1&&(o(0,"p-table",2),u(1,Ot,7,3,"ng-template",3)(2,wt,9,2,"ng-template",4),a()),e&2){let t=d();r("value",t.agreement.obligations)("tableStyle",I(2,Mt))}}var tt=(()=>{let n=class n{constructor(){this.coreService=y(S),this.AgreementSectionFormEnum=v,this.ObligationForEnum=H,this.FinancingsFormEnum=B,this.ObligationDetailForEnum=_e}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-obligation"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Nt,3,3,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.obligation)},dependencies:[_,x,T]});let e=n;return e})();var Pt=()=>({"min-width":"50rem"});function $t(e,n){if(e&1&&(o(0,"th",6),p(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),E(" ",t.header," "),i(),r("field",t.field)}}function kt(e,n){if(e&1&&(o(0,"tr"),b(1,$t,3,3,"th",6,F),a()),e&2){let t=d(2);i(),C(t.columns)}}function jt(e,n){if(e&1&&(o(0,"tr")(1,"td"),p(2),a(),o(3,"td"),p(4),a(),o(5,"td"),p(6),a(),o(7,"td"),p(8),a()()),e&2){let t=n.$implicit;i(2),g(t.institutionName),i(2),g(t.budget),i(2),g(t.paymentMethod),i(2),g(t.source)}}function Vt(e,n){if(e&1&&(o(0,"tr")(1,"td"),p(2," No existen registros de Financiamientos "),a()()),e&2){let t=n.$implicit;i(),U("colspan",t.length)}}function Wt(e,n){if(e&1&&(o(0,"p-table",2),u(1,kt,3,0,"ng-template",3)(2,jt,9,4,"ng-template",4)(3,Vt,3,1,"ng-template",5),a()),e&2){let t=d();r("value",t.agreement.financings)("columns",t.columns)("tableStyle",I(3,Pt))}}var nt=(()=>{let n=class n{constructor(){this.coreService=y(S),this.messageDialogService=y(fe),this.columns=[],this.FinancingsFormEnum=B,this.AgreementFormEnum=P,this.ObligationForEnum=H,this.AgreementSectionFormEnum=v,this.buildAddendumColumns()}buildAddendumColumns(){this.columns=[{field:"institutionName",header:H.institutionName},{field:"budget",header:B.budget},{field:"paymentMethod",header:B.paymentMethod},{field:"source",header:B.source}]}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-financing"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","columns","tableStyle"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"pSortableColumn"],[3,"field"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Wt,4,4,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.financing)},dependencies:[_,x,T,D,j]});let e=n;return e})();var Ut=(e,n)=>n.id,Yt=()=>({width:"100%"});function qt(e,n){if(e&1&&(o(0,"th",6),p(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),E(" ",t.header," "),i(),r("field",t.field)}}function Gt(e,n){if(e&1&&(o(0,"tr"),b(1,qt,3,3,"th",6,F),o(3,"th"),p(4),a()()),e&2){let t=d(2);i(),C(t.addendumColumns),i(3),g(t.TableEnum.ACTIONS)}}function Jt(e,n){if(e&1){let t=L();o(0,"tr")(1,"td"),p(2),a(),o(3,"td"),p(4),a(),o(5,"td")(6,"p-button",8),Y("click",function(){let m=M(t).$implicit,s=d(3);return O(s.download(m))}),a()()()}if(e&2){let t=n.$implicit,l=d().$implicit,m=d(2);i(2),g(l.description),i(2),g(t==null?null:t.name),i(2),r("icon",m.IconButtonActionEnum.DOWNLOAD)("pTooltip",m.LabelButtonActionEnum.DOWNLOAD)("severity",m.SeverityButtonActionEnum.DOWNLOAD)}}function Kt(e,n){if(e&1&&b(0,Jt,7,5,"tr",null,Ut),e&2){let t=n.$implicit;C(t.files)}}function Qt(e,n){if(e&1&&(o(0,"tr")(1,"td"),p(2," No existen registros de Adendas "),a()()),e&2){let t=n.$implicit;i(),U("colspan",t.length)}}function Xt(e,n){if(e&1&&(o(0,"p-table",2),u(1,Gt,5,1,"ng-template",3)(2,Kt,2,0,"ng-template",4)(3,Qt,3,1,"ng-template",5),a()),e&2){let t=d();r("value",t.agreement.addendums)("columns",t.addendumColumns)("tableStyle",I(3,Yt))}}var it=(()=>{let n=class n{constructor(){this.coreService=y(S),this.AgreementSectionFormEnum=v,this.filesHttpService=y(ne),this.addendumColumns=[],this.IconButtonActionEnum=Q,this.LabelButtonActionEnum=K,this.SeverityButtonActionEnum=X,this.TableEnum=ee,this.buildAddendumColumns()}buildAddendumColumns(){this.addendumColumns=[{field:"description",header:ye.description},{field:"file",header:V.name}]}download(l){this.filesHttpService.downloadFile(l)}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-addendum"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","columns","tableStyle"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"pSortableColumn"],[3,"field"],[3,"click","icon","pTooltip","severity"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Xt,4,4,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.addendum)},dependencies:[ie,_,oe,x,T,D,j]});let e=n;return e})();function en(e,n){if(e&1&&(o(0,"div",2)(1,"div",3),c(2,"label",4)(3,"input",5),a(),o(4,"div",6),c(5,"label",7)(6,"input",8),a(),o(7,"div",6),c(8,"label",9)(9,"input",10),a()()),e&2){let t=d();i(2),r("label",t.AdministratorFormEnum.user),i(),r("value",t.userName)("readOnly",!0),i(2),r("label",t.AdministratorFormEnum.unit),i(),r("value",t.agreement.administrator==null||t.agreement.administrator.unit==null?null:t.agreement.administrator.unit.name)("readOnly",!0),i(2),r("label",t.AdministratorFormEnum.position),i(),r("value",t.agreement.administrator==null||t.agreement.administrator.position==null?null:t.agreement.administrator.position.name)("readOnly",!0)}}var ot=(()=>{let n=class n{constructor(){this.AdministratorFormEnum=xe,this.AgreementSectionFormEnum=v,this.SkeletonEnum=Z,this.PrimeIcons=J}ngOnInit(){this.userName=`${this.agreement.administrator?.user?.name} ${this.agreement.administrator?.user?.lastname}`}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-agreement-administrator"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],[1,"p-fluid","grid"],[1,"field","col-12","xl:col-12","lg:col-12","md:col-12","sm:col-12"],["appLabel","","for","user",3,"label"],["pInputText","","id","user",3,"value","readOnly"],[1,"field","col-12","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","","for","unit",3,"label"],["pInputText","","id","unit",3,"value","readOnly"],["appLabel","","for","position",3,"label"],["pInputText","","id","position",3,"value","readOnly"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,en,10,9,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.administrator)},dependencies:[k,_,$,x]});let e=n;return e})();var nn=(e,n)=>n.field;function on(e,n){if(e&1&&(o(0,"th",5),p(1),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),E(" ",t.header," ")}}function an(e,n){if(e&1&&(o(0,"tr"),b(1,on,2,2,"th",5,nn),o(3,"th"),p(4),a()()),e&2){let t=n.$implicit,l=d(2);i(),C(t),i(3),g(l.TableEnum.ACTIONS)}}function rn(e,n){if(e&1){let t=L();o(0,"tr")(1,"td"),p(2),a(),o(3,"td"),p(4),a(),o(5,"td")(6,"p-button",6),Y("click",function(){let m=M(t).$implicit,s=d(2);return O(s.download(m))}),a()()()}if(e&2){let t=n.$implicit,l=d(2);i(2),g(t.type.name),i(2),g(t.name),i(2),r("icon",l.IconButtonActionEnum.DOWNLOAD)("pTooltip",l.LabelButtonActionEnum.DOWNLOAD)("severity",l.SeverityButtonActionEnum.DOWNLOAD)}}function mn(e,n){if(e&1&&(o(0,"p-table",2),u(1,an,5,1,"ng-template",3)(2,rn,7,5,"ng-template",4),a()),e&2){let t=d();r("value",t.agreement.enablingDocuments)("columns",t.columns)}}var at=(()=>{let n=class n{constructor(){this.filesHttpService=y(ne),this.LabelButtonActionEnum=K,this.IconButtonActionEnum=Q,this.TableEnum=ee,this.SeverityButtonActionEnum=X,this.PrimeIcons=J,this.AgreementSectionFormEnum=v,this.types=[],this.columns=[],this.buildColumns()}ngOnInit(){}buildColumns(){this.columns=[{field:"type",header:V.type},{field:"name",header:V.name}]}download(l){this.filesHttpService.downloadFile(l)}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-document"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","columns"],["pTemplate","header"],["pTemplate","body"],[3,"pSortableColumn"],[3,"click","icon","pTooltip","severity"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,mn,3,2,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.enablingDocument)},dependencies:[ie,_,oe,x,T,D]});let e=n;return e})();function pn(e,n){}function dn(e,n){if(e&1&&c(0,"app-basic-data",0)(1,"p-divider")(2,"app-agreement-date",0)(3,"p-divider")(4,"app-agreement-administrator",0)(5,"p-divider")(6,"app-appearer",0)(7,"p-divider")(8,"app-obligation",0)(9,"p-divider")(10,"app-financing",0)(11,"p-divider")(12,"app-document",0)(13,"p-divider")(14,"app-addendum",0),e&2){let t=d();r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement)}}var rt=(()=>{let n=class n{constructor(){this.agreementsHttpService=y(be),this.coreService=y(S),this.SkeletonEnum=Z}ngOnInit(){this.findAgreement()}findAgreement(){this.agreementsHttpService.findOne(this.id).subscribe(l=>{this.agreement=l})}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-view"]],inputs:{id:"id"},decls:2,vars:2,consts:[[3,"agreement"]],template:function(m,s){m&1&&u(0,pn,0,0)(1,dn,15,8),m&2&&(h(0,s.coreService.isLoading?-1:0),i(),h(1,s.agreement?1:-1))},dependencies:[De,Qe,Xe,et,tt,nt,it,ot,at]});let e=n;return e})();var cn=[{path:"",component:rt}],mt=(()=>{let n=class n{};n.\u0275fac=function(m){return new(m||n)},n.\u0275mod=z({type:n}),n.\u0275inj=R({imports:[de.forChild(cn),de]});let e=n;return e})();var Ki=(()=>{let n=class n{};n.\u0275fac=function(m){return new(m||n)},n.\u0275mod=z({type:n}),n.\u0275inj=R({imports:[ge,Te,Re,ce,Oe,Be,Me,Ae,Fe,Ce,Ne,je,Ie,ze,$e,We,mt,Pe,se,He,Se,Le,Ye,we,Ge,Ue,ke,Ve,ce,se]});let e=n;return e})();export{rt as a,Ki as b};
