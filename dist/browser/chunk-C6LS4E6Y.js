import{c as Ye,d as ze,e as qe,f as Ge}from"./chunk-B4D6YCAJ.js";import{b as Ue}from"./chunk-ISADC5UE.js";import{c as Fe,e as we}from"./chunk-MV74T35C.js";import{A as Ae,Aa as ce,C as k,Pa as He,Q as x,R as Ie,Xa as Re,Z as De,_ as Be,ba as Ne,d as ne,da as Le,ha as A,ia as D,ja as j,m as he,na as Pe,q as Ee,qa as $e,ua as ke,va as oe,wa as Ve,x as Se,y as Te,ya as We,z as $}from"./chunk-XM7P77BR.js";import{e as be,j as ie,k as de,m as Me,n as Oe,r as je}from"./chunk-Q4NRACYW.js";import{$ as H,M as K,N as Q,O as X,Q as Z,S as ee,W as V,X as B,Y as v,Z as fe,_ as W,aa as _e,ba as P,ca as ve,ea as xe,fa as ye,k as J,ka as te,la as Ce,o as _,r as T,v as ge}from"./chunk-HDK6EBUC.js";import{Aa as L,Ba as z,Ca as d,E as R,H as y,J as f,K as U,La as l,Ma as g,Na as h,O as M,P as O,Qa as re,Ra as me,Rb as pe,Sa as le,Wa as I,_ as i,eb as q,fb as G,ja as u,ka as Y,la as r,qa as E,ra as S,sa as C,ta as b,ua as o,va as a,wa as c,yb as se,zb as ue}from"./chunk-EUOB27Q6.js";function pt(e,n){if(e&1&&(o(0,"div",9),c(1,"label",21)(2,"input",22),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.specialType),i(),r("value",t.agreement.specialType==null?null:t.agreement.specialType.name)("readonly",!0)}}function dt(e,n){if(e&1&&(o(0,"div",2)(1,"div",3),c(2,"label",4)(3,"input",5),a(),o(4,"div",6),c(5,"label",7)(6,"input",8),a(),o(7,"div",9),c(8,"label",10)(9,"input",11),a(),o(10,"div",9),c(11,"label",12)(12,"input",13),a(),o(13,"div",9),c(14,"label",14)(15,"input",15),a(),o(16,"div",9),c(17,"label",16)(18,"input",17),a(),u(19,pt,3,3,"div",9),o(20,"div",18),c(21,"label",19),o(22,"textarea",20),l(23,"          "),a()()()),e&2){let t=d();i(2),r("label",t.AgreementFormEnum.number),i(),r("value",t.agreement.number)("readonly",!0),i(2),r("label",t.AgreementFormEnum.name),i(),r("value",t.agreement.name)("readonly",!0),i(2),r("label",t.AgreementFormEnum.internalNumber),i(),r("value",t.agreement.internalNumber)("readonly",!0),i(2),r("label",t.AgreementStateEnum.state),i(),r("value",t.agreement.agreementState==null||t.agreement.agreementState.state==null?null:t.agreement.agreementState.state.name)("readonly",!0),i(2),r("label",t.AgreementFormEnum.origin),i(),r("value",t.agreement.origin==null?null:t.agreement.origin.name)("readonly",!0),i(2),r("label",t.AgreementFormEnum.type),i(),r("value",t.agreement.type==null?null:t.agreement.type.name)("readonly",!0),i(),E(19,t.agreement.specialType!=null&&t.agreement.specialType.name?19:-1),i(2),r("label",t.AgreementFormEnum.objective),i(),r("value",t.agreement.objective)("readonly",!0)}}var Qe=(()=>{let n=class n{constructor(){this.AgreementFormEnum=P,this.AgreementStateEnum=ve,this.AgreementSectionFormEnum=v}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-basic-data"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],[1,"p-fluid","grid"],[1,"field","col-8","xl:col-4","lg:col-4","md:col-4","sm:col-12"],["appLabel","","for","number",3,"label"],["pInputText","","id","number",3,"value","readonly"],[1,"field","col-4","xl:col-8","lg:col-4","md:col-8","sm:col-12"],["appLabel","","for","name",3,"label"],["pInputText","","id","name",3,"value","readonly"],[1,"field","col-12","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","","for","internalNumber",3,"label"],["pInputText","","id","internalNumber",3,"value","readonly"],["appLabel","","for","agreementState",3,"label"],["pInputText","","id","agreementState",3,"value","readonly"],["appLabel","","for","originId",3,"label"],["pInputText","","id","originId",3,"value","readonly"],["appLabel","","for","typeId",3,"label"],["pInputText","","id","typeId",3,"value","readonly"],[1,"field","col-12","xl:col-12","lg:col-12","md:col-12","sm:col-12"],["appLabel","","for","objective",3,"label"],["pInputTextarea","","id","objective",3,"value","readonly"],["appLabel","","for","specialTypeId",3,"label"],["pInputText","","id","specialTypeId",3,"value","readonly"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,dt,24,22,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.basicData)},dependencies:[k,_,$,x,oe]});let e=n;return e})();function st(e,n){if(e&1&&(o(0,"div",3),c(1,"label",4)(2,"input",5),q(3,"date"),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.endedAt),i(),r("value",G(3,3,t.agreement.endedAt))("readOnly",!0)}}function ut(e,n){if(e&1&&(o(0,"div",15),c(1,"label",4)(2,"textarea",17),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.endedReason),i(),r("value",t.agreement.endedReason)("readOnly",!0)}}function gt(e,n){if(e&1&&(o(0,"div",16),c(1,"label",4)(2,"input",5),a()),e&2){let t=d(2);i(),r("label",t.AgreementFormEnum.totalTerm),i(),r("value",t.agreement.totalTerm)("readOnly",!0)}}function ft(e,n){if(e&1){let t=L();o(0,"div",2)(1,"div",3),c(2,"label",4)(3,"input",5),q(4,"date"),a(),o(5,"div",3),c(6,"label",6)(7,"input",7),q(8,"date"),a(),o(9,"div",3),c(10,"label",4),o(11,"div",8)(12,"div",9)(13,"p-radioButton",10),le("ngModelChange",function(m){M(t);let s=d();return me(s.agreement.isFinishDate,m)||(s.agreement.isFinishDate=m),O(m)}),a(),o(14,"label",11),l(15,"S\xED"),a()(),o(16,"div",12)(17,"p-radioButton",13),le("ngModelChange",function(m){M(t);let s=d();return me(s.agreement.isFinishDate,m)||(s.agreement.isFinishDate=m),O(m)}),a(),o(18,"label",14),l(19,"No"),a()()()(),u(20,st,4,5,"div",3)(21,ut,3,3,"div",15)(22,gt,3,3,"div",16),a()}if(e&2){let t=d();i(2),r("label",t.AgreementFormEnum.subscribedAt),i(),r("value",G(4,16,t.agreement.subscribedAt))("readOnly",!0),i(3),r("label",t.AgreementFormEnum.startedAt),i(),r("value",G(8,18,t.agreement.startedAt))("readOnly",!0),i(3),r("label",t.AgreementFormEnum.isFinishDate),i(3),r("value",!0),re("ngModel",t.agreement.isFinishDate),r("disabled",!0),i(4),r("value",!1),re("ngModel",t.agreement.isFinishDate),r("disabled",!0),i(3),E(20,t.agreement.isFinishDate?20:-1),i(),E(21,t.agreement.isFinishDate?-1:21),i(),E(22,t.agreement.isFinishDate?22:-1)}}var Xe=(()=>{let n=class n{constructor(){this.AgreementFormEnum=P,this.AgreementSectionFormEnum=v}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-agreement-date"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],[1,"p-fluid","grid"],[1,"field","col-12","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","",3,"label"],["pInputText","",3,"value","readOnly"],["appLabel","","for","startedAt",3,"label"],["pInputText","","id","startedAt",3,"value","readOnly"],[1,"flex","align-items-center"],[1,"flex","align-items-center",2,"display","flex","align-items","center"],["id","isFinishDateYes","name","isFinishDate",3,"ngModelChange","value","ngModel","disabled"],["for","isFinishDateYes",1,"ml-2"],[1,"flex","align-items-center","ml-3",2,"display","flex","align-items","center"],["id","isFinishDateNo","name","isFinishDate",3,"ngModelChange","value","ngModel","disabled"],["for","isFinishDateNo",1,"ml-2"],[1,"field","col-12"],[1,"field","col-12","xl:col-12","lg:col-12","md:col-12","sm:col-12"],["pInputTextarea","",3,"value","readOnly"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,ft,23,20,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.agreementDate)},dependencies:[he,k,_,$,x,Ee,qe,oe,se]});let e=n;return e})();var Ze=()=>({width:"100%"});function vt(e,n){if(e&1&&(o(0,"th",6),l(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),h(" ",t.header," "),i(),r("field",t.field)}}function xt(e,n){if(e&1&&(o(0,"tr"),C(1,vt,3,3,"th",6,S),a()),e&2){let t=d(2);i(),b(t.internalInstitutionColumns)}}function yt(e,n){if(e&1&&(o(0,"tr")(1,"td"),l(2),a()()),e&2){let t=n.$implicit;i(2),g(t.position==null?null:t.position.name)}}function Ct(e,n){if(e&1&&C(0,yt,3,1,"tr",null,S),e&2){let t=n.$implicit;b(t.internalInstitutionDetails)}}function bt(e,n){if(e&1&&(o(0,"p-table",3),u(1,xt,3,0,"ng-template",4)(2,Ct,2,0,"ng-template",5),a()),e&2){let t=d();r("value",t.agreement.internalInstitutions)("tableStyle",I(2,Ze))}}function ht(e,n){if(e&1&&(o(0,"th",6),l(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),h(" ",t.header," "),i(),r("field",t.field)}}function Et(e,n){if(e&1&&(o(0,"tr"),C(1,ht,3,3,"th",6,S),a()),e&2){let t=d(3);i(),b(t.externalInstitutionsColumns)}}function St(e,n){if(e&1&&(o(0,"li"),l(1),a()),e&2){let t=n.$implicit;i(),h(" ",t.unit," ")}}function Tt(e,n){if(e&1&&(o(0,"li"),l(1),a()),e&2){let t=n.$implicit;i(),h(" ",t.position," ")}}function At(e,n){if(e&1&&(o(0,"tr")(1,"td"),l(2),a(),o(3,"td")(4,"ul"),C(5,St,2,1,"li",null,S),a()(),o(7,"td")(8,"ul"),C(9,Tt,2,1,"li",null,S),a()(),o(11,"td"),l(12),a()()),e&2){let t=n.$implicit;i(2),g(t.name),i(3),b(t.externalInstitutionDetails),i(4),b(t.externalInstitutionDetails),i(3),g(t.personType==null?null:t.personType.name)}}function Ft(e,n){if(e&1&&(o(0,"p-table",3),u(1,Et,3,0,"ng-template",4)(2,At,13,2,"ng-template",5),a()),e&2){let t=d(2);r("value",t.agreement.externalInstitutions)("tableStyle",I(2,Ze))}}function It(e,n){e&1&&u(0,Ft,3,3,"ng-template",1)}var et=(()=>{let n=class n{constructor(){this.coreService=y(T),this.externalInstitutionsColumns=[],this.internalInstitutionColumns=[],this.AgreementSectionFormEnum=v,this.buildExternalInstitutionsColumns(),this.buildInternalInstitutionsColumns()}buildInternalInstitutionsColumns(){this.internalInstitutionColumns=[{field:"position",header:fe.position}]}buildExternalInstitutionsColumns(){this.externalInstitutionsColumns=[{field:"name",header:W.name},{field:"unit",header:W.unit},{field:"position",header:W.position},{field:"personType",header:W.personType}]}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-appearer"]],inputs:{agreement:"agreement"},decls:4,vars:1,consts:[["header","Comparecientes - MINTUR"],["pTemplate","content"],["header","Comparecientes - Contraparte"],["styleClass","p-datatable-striped",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[3,"pSortableColumn"],[3,"field"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,bt,3,3,"ng-template",1),a(),o(2,"p-panel",2),u(3,It,1,0,null,1),a()),m&2&&(i(3),E(3,s.agreement.externalInstitutions?3:-1))},dependencies:[_,x,A,D,j]});let e=n;return e})();var Mt=(e,n)=>n.id,Ot=()=>({"min-width":"50rem"});function Bt(e,n){if(e&1&&(o(0,"tr")(1,"th"),l(2),a(),o(3,"th"),l(4),a(),o(5,"th"),l(6),a()()),e&2){let t=d(2);i(2),g(t.ObligationForEnum.institutionName),i(2),g(t.ObligationForEnum.type),i(2),g(t.ObligationDetailForEnum.description)}}function wt(e,n){if(e&1&&(o(0,"li"),l(1),a()),e&2){let t=n.$implicit;i(),h(" ",t.description," ")}}function Nt(e,n){if(e&1&&(o(0,"tr")(1,"td"),l(2),a(),o(3,"td"),l(4),a(),o(5,"td")(6,"ul"),C(7,wt,2,1,"li",null,Mt),a()()()),e&2){let t=n.$implicit;i(2),g(t.institutionName),i(2),g(t.type.name),i(3),b(t.obligationDetails)}}function Lt(e,n){if(e&1&&(o(0,"p-table",2),u(1,Bt,7,3,"ng-template",3)(2,Nt,9,2,"ng-template",4),a()),e&2){let t=d();r("value",t.agreement.obligations)("tableStyle",I(2,Ot))}}var tt=(()=>{let n=class n{constructor(){this.coreService=y(T),this.AgreementSectionFormEnum=v,this.ObligationForEnum=H,this.FinancingsFormEnum=B,this.ObligationDetailForEnum=_e}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-obligation"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Lt,3,3,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.obligation)},dependencies:[_,x,A]});let e=n;return e})();var $t=()=>({"min-width":"50rem"});function kt(e,n){if(e&1&&(o(0,"th",6),l(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),h(" ",t.header," "),i(),r("field",t.field)}}function jt(e,n){if(e&1&&(o(0,"tr"),C(1,kt,3,3,"th",6,S),a()),e&2){let t=d(2);i(),b(t.columns)}}function Vt(e,n){if(e&1&&(o(0,"tr")(1,"td"),l(2),a(),o(3,"td"),l(4),a(),o(5,"td"),l(6),a(),o(7,"td"),l(8),a()()),e&2){let t=n.$implicit;i(2),g(t.institutionName),i(2),g(t.budget),i(2),g(t.paymentMethod),i(2),g(t.source)}}function Wt(e,n){if(e&1&&(o(0,"tr")(1,"td"),l(2," No existen registros de Financiamientos "),a()()),e&2){let t=n.$implicit;i(),Y("colspan",t.length)}}function Ht(e,n){if(e&1&&(o(0,"p-table",2),u(1,jt,3,0,"ng-template",3)(2,Vt,9,4,"ng-template",4)(3,Wt,3,1,"ng-template",5),a()),e&2){let t=d();r("value",t.agreement.financings)("columns",t.columns)("tableStyle",I(3,$t))}}var nt=(()=>{let n=class n{constructor(){this.coreService=y(T),this.messageDialogService=y(ge),this.columns=[],this.FinancingsFormEnum=B,this.AgreementFormEnum=P,this.ObligationForEnum=H,this.AgreementSectionFormEnum=v,this.buildAddendumColumns()}buildAddendumColumns(){this.columns=[{field:"institutionName",header:H.institutionName},{field:"budget",header:B.budget},{field:"paymentMethod",header:B.paymentMethod},{field:"source",header:B.source}]}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-financing"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","columns","tableStyle"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"pSortableColumn"],[3,"field"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Ht,4,4,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.financing)},dependencies:[_,x,A,D,j]});let e=n;return e})();var zt=(e,n)=>n.id,qt=()=>({width:"100%"});function Gt(e,n){if(e&1&&(o(0,"th",6),l(1),c(2,"p-sortIcon",7),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),h(" ",t.header," "),i(),r("field",t.field)}}function Jt(e,n){if(e&1&&(o(0,"tr"),C(1,Gt,3,3,"th",6,S),o(3,"th"),l(4),a()()),e&2){let t=d(2);i(),b(t.addendumColumns),i(3),g(t.TableEnum.ACTIONS)}}function Kt(e,n){if(e&1){let t=L();o(0,"tr")(1,"td"),l(2),a(),o(3,"td"),l(4),a(),o(5,"td")(6,"p-button",8),z("click",function(){let m=M(t).$implicit,s=d(3);return O(s.download(m))}),a()()()}if(e&2){let t=n.$implicit,p=d().$implicit,m=d(2);i(2),g(p.description),i(2),g(t==null?null:t.name),i(2),r("icon",m.IconButtonActionEnum.DOWNLOAD)("pTooltip",m.LabelButtonActionEnum.DOWNLOAD)("severity",m.SeverityButtonActionEnum.DOWNLOAD)}}function Qt(e,n){if(e&1&&C(0,Kt,7,5,"tr",null,zt),e&2){let t=n.$implicit;b(t.files)}}function Xt(e,n){if(e&1&&(o(0,"tr")(1,"td"),l(2," No existen registros de Adendas "),a()()),e&2){let t=n.$implicit;i(),Y("colspan",t.length)}}function Zt(e,n){if(e&1&&(o(0,"p-table",2),u(1,Jt,5,1,"ng-template",3)(2,Qt,2,0,"ng-template",4)(3,Xt,3,1,"ng-template",5),a()),e&2){let t=d();r("value",t.agreement.addendums)("columns",t.addendumColumns)("tableStyle",I(3,qt))}}var it=(()=>{let n=class n{constructor(){this.coreService=y(T),this.AgreementSectionFormEnum=v,this.filesHttpService=y(te),this.addendumColumns=[],this.IconButtonActionEnum=Q,this.LabelButtonActionEnum=K,this.SeverityButtonActionEnum=X,this.TableEnum=ee,this.buildAddendumColumns()}buildAddendumColumns(){this.addendumColumns=[{field:"description",header:ye.description},{field:"file",header:V.name}]}download(p){this.filesHttpService.downloadFile(p)}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-addendum"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","columns","tableStyle"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"pSortableColumn"],[3,"field"],[3,"click","icon","pTooltip","severity"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,Zt,4,4,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.addendum)},dependencies:[ne,_,ie,x,A,D,j]});let e=n;return e})();function tn(e,n){if(e&1&&(o(0,"div",2)(1,"div",3),c(2,"label",4)(3,"input",5),a(),o(4,"div",6),c(5,"label",7)(6,"input",8),a(),o(7,"div",6),c(8,"label",9)(9,"input",10),a()()),e&2){let t=d();i(2),r("label",t.AdministratorFormEnum.user),i(),r("value",t.userName)("readOnly",!0),i(2),r("label",t.AdministratorFormEnum.unit),i(),r("value",t.agreement.administrator==null||t.agreement.administrator.unit==null?null:t.agreement.administrator.unit.name)("readOnly",!0),i(2),r("label",t.AdministratorFormEnum.position),i(),r("value",t.agreement.administrator==null||t.agreement.administrator.position==null?null:t.agreement.administrator.position.name)("readOnly",!0)}}var ot=(()=>{let n=class n{constructor(){this.AdministratorFormEnum=xe,this.AgreementSectionFormEnum=v,this.SkeletonEnum=Z,this.PrimeIcons=J}ngOnInit(){this.userName=`${this.agreement.administrator?.user?.name} ${this.agreement.administrator?.user?.lastname}`}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-agreement-administrator"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],[1,"p-fluid","grid"],[1,"field","col-12","xl:col-12","lg:col-12","md:col-12","sm:col-12"],["appLabel","","for","user",3,"label"],["pInputText","","id","user",3,"value","readOnly"],[1,"field","col-12","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","","for","unit",3,"label"],["pInputText","","id","unit",3,"value","readOnly"],["appLabel","","for","position",3,"label"],["pInputText","","id","position",3,"value","readOnly"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,tn,10,9,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.administrator)},dependencies:[k,_,$,x]});let e=n;return e})();var on=(e,n)=>n.field;function an(e,n){if(e&1&&(o(0,"th",5),l(1),a()),e&2){let t=n.$implicit;r("pSortableColumn",t.field),i(),h(" ",t.header," ")}}function rn(e,n){if(e&1&&(o(0,"tr"),C(1,an,2,2,"th",5,on),o(3,"th"),l(4),a()()),e&2){let t=n.$implicit,p=d(2);i(),b(t),i(3),g(p.TableEnum.ACTIONS)}}function mn(e,n){if(e&1){let t=L();o(0,"tr")(1,"td"),l(2),a(),o(3,"td"),l(4),a(),o(5,"td")(6,"p-button",6),z("click",function(){let m=M(t).$implicit,s=d(2);return O(s.download(m))}),a()()()}if(e&2){let t=n.$implicit,p=d(2);i(2),g(t.type.name),i(2),g(t.name),i(2),r("icon",p.IconButtonActionEnum.DOWNLOAD)("pTooltip",p.LabelButtonActionEnum.DOWNLOAD)("severity",p.SeverityButtonActionEnum.DOWNLOAD)}}function ln(e,n){if(e&1&&(o(0,"p-table",2),u(1,rn,5,1,"ng-template",3)(2,mn,7,5,"ng-template",4),a()),e&2){let t=d();r("value",t.agreement.enablingDocuments)("columns",t.columns)}}var at=(()=>{let n=class n{constructor(){this.filesHttpService=y(te),this.LabelButtonActionEnum=K,this.IconButtonActionEnum=Q,this.TableEnum=ee,this.SeverityButtonActionEnum=X,this.PrimeIcons=J,this.AgreementSectionFormEnum=v,this.types=[],this.columns=[],this.buildColumns()}ngOnInit(){}buildColumns(){this.columns=[{field:"type",header:V.type},{field:"name",header:V.name}]}download(p){this.filesHttpService.downloadFile(p)}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-document"]],inputs:{agreement:"agreement"},decls:2,vars:1,consts:[[3,"header"],["pTemplate","content"],["styleClass","p-datatable-striped",3,"value","columns"],["pTemplate","header"],["pTemplate","body"],[3,"pSortableColumn"],[3,"click","icon","pTooltip","severity"]],template:function(m,s){m&1&&(o(0,"p-panel",0),u(1,ln,3,2,"ng-template",1),a()),m&2&&r("header",s.AgreementSectionFormEnum.enablingDocument)},dependencies:[ne,_,ie,x,A,D]});let e=n;return e})();function dn(e,n){}function cn(e,n){if(e&1&&c(0,"app-basic-data",0)(1,"p-divider")(2,"app-agreement-date",0)(3,"p-divider")(4,"app-agreement-administrator",0)(5,"p-divider")(6,"app-appearer",0)(7,"p-divider")(8,"app-obligation",0)(9,"p-divider")(10,"app-financing",0)(11,"p-divider")(12,"app-document",0)(13,"p-divider")(14,"app-addendum",0),e&2){let t=d();r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement),i(2),r("agreement",t.agreement)}}var rt=(()=>{let n=class n{constructor(){this.agreementsHttpService=y(Ce),this.coreService=y(T),this.SkeletonEnum=Z}ngOnInit(){this.findAgreement()}findAgreement(){this.agreementsHttpService.findOne(this.id).subscribe(p=>{this.agreement=p})}};n.\u0275fac=function(m){return new(m||n)},n.\u0275cmp=f({type:n,selectors:[["app-view"]],inputs:{id:"id"},decls:2,vars:2,consts:[[3,"agreement"]],template:function(m,s){m&1&&u(0,dn,0,0)(1,cn,15,8),m&2&&(E(0,s.coreService.isLoading?-1:0),i(),E(1,s.agreement?1:-1))},dependencies:[Me,Qe,Xe,et,tt,nt,it,ot,at]});let e=n;return e})();var sn=[{path:"",component:rt}],mt=(()=>{let n=class n{};n.\u0275fac=function(m){return new(m||n)},n.\u0275mod=U({type:n}),n.\u0275inj=R({imports:[pe.forChild(sn),pe]});let e=n;return e})();var Qi=(()=>{let n=class n{};n.\u0275fac=function(m){return new(m||n)},n.\u0275mod=U({type:n}),n.\u0275inj=R({imports:[ue,Te,Re,de,Be,we,Oe,Ae,Fe,be,De,je,Ie,Ue,$e,We,mt,Pe,ce,He,Se,Le,ze,Ne,Ge,Ye,ke,Ve,de,ce]});let e=n;return e})();export{rt as a,Qi as b};
