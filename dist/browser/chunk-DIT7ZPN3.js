import{a as ge,b as ve}from"./chunk-JX547UQY.js";import{a as ue,b as fe}from"./chunk-MNTWIDOC.js";import{b as K}from"./chunk-OC2GBVCM.js";import{a as he,b as Ce}from"./chunk-TVII6QCG.js";import{b as Fe}from"./chunk-OKUVFNC3.js";import{a as de,b as $,c as pe,e as Se}from"./chunk-GGKMHMBW.js";import{A as R,B as M,P as H,Q as ce,Sa as ye,V as _e,W as we,b as j,ca as be,i as O,k as u,m as N,n as E,q as P,s as L,u as V,v as I,x as le,y as Z,z as me}from"./chunk-PBIOFTA5.js";import{J as B,K as F,s as G}from"./chunk-4QCADNJD.js";import{e as ae,j as T,k as se,p as xe}from"./chunk-CSO23DVT.js";import{k as b,o as D,r as x,s as y,t as A}from"./chunk-ZFS7MCCM.js";import{B as S,C as Y,Da as w,Ea as k,Fa as ie,Fb as ne,G as g,H as v,Kb as U,Oa as re,S as r,T as q,ba as _,da as o,ia as h,ma as n,na as s,oa as m,sa as C,sb as oe,ta as f,ua as l,w as W,z as c}from"./chunk-3AQ5X5KI.js";var Te=()=>"[\\w\\-]+(\\.[\\w\\-]+)";function Ae(t,i){if(t&1&&(n(0,"div",5)(1,"span",6),w(2),s()()),t&2){let e=l();r(2),k(e.authService.system)}}function Ge(t,i){if(t&1&&(n(0,"div",9),m(1,"app-progress-bar",16),s()),t&2){let e=l(2);r(),o("message",e.messageService.progressBarLogin)}}function Be(t,i){if(t&1){let e=C();n(0,"form",7),f("ngSubmit",function(){g(e);let a=l();return v(a.onSubmit())}),n(1,"div",8)(2,"h2"),w(3),s()(),n(4,"div",9),m(5,"label",10),n(6,"p-inputGroup"),m(7,"input",11),n(8,"p-inputGroupAddon"),w(9,"@turismo.gob.ec"),s()(),m(10,"small",12),s(),n(11,"div",9),m(12,"label",13)(13,"p-password",14)(14,"small",12),s(),_(15,Ge,2,1,"div",9),n(16,"div",9),m(17,"p-button",15),s()()}if(t&2){let e=l();o("formGroup",e.form),r(3),ie(" Ingreso al Sistema ",e.authService.systemShortName," "),r(2),o("label",e.LoginFormEnum.username)("required",e.usernameField),r(5),o("errors",e.usernameField.errors)("touched",e.usernameField.touched)("dirty",e.usernameField.dirty),r(2),o("label",e.LoginFormEnum.password)("required",e.passwordField),r(),o("feedback",!1),r(),o("errors",e.passwordField.errors)("touched",e.passwordField.touched)("dirty",e.passwordField.dirty),r(),h(15,e.coreService.isLoading?15:-1),r(2),o("icon",e.PrimeIcons.SIGN_IN)}}function je(t,i){if(t&1&&(n(0,"div",17),m(1,"p-button",18),s()),t&2){let e=l();r(),o("icon",e.PrimeIcons.DOWNLOAD)}}var Ve=(()=>{let i=class i{constructor(){this.authService=c(F),this.authHttpService=c(B),this.coreService=c(x),this.formBuilder=c(I),this.messageService=c(y),this.routesService=c(A),this.PrimeIcons=b,this.LoginFormEnum=G,this.authService.removeLogin(),this.buildForm()}buildForm(){this.form=this.formBuilder.group({username:[null,[u.required,u.pattern(Te())]],password:[null,[u.required]]})}onSubmit(){this.form.valid?this.login():(this.form.markAllAsTouched(),this.messageService.errorsFields())}login(){this.authService.removeLogin(),this.authHttpService.login(this.form.value).subscribe(p=>{if(this.authService.roles.length===0){this.messageService.errorCustom("Sin Rol","No cuenta con un rol asignado"),this.authService.removeLogin();return}this.routesService.roleSelect()})}get usernameField(){return this.form.controls.username}get passwordField(){return this.form.controls.password}};i.\u0275fac=function(a){return new(a||i)},i.\u0275cmp=S({type:i,selectors:[["app-login"]],decls:5,vars:0,consts:[[1,"grid"],[1,"col-12","xl:col-4","lg:col-4","md:col-6","sm:col-12"],["pTemplate","header"],["pTemplate","content"],["pTemplate","footer"],[1,"flex","align-items-center","gap-2"],[1,"font-bold"],[1,"p-fluid","grid",3,"ngSubmit","formGroup"],[1,"field","col-12","text-center"],[1,"field","col-12"],["for","username","appLabel","",3,"label","required"],["pInputText","","id","username","formControlName","username"],["appErrorMessage","",3,"errors","touched","dirty"],["for","password","appLabel","",3,"label","required"],["id","password","formControlName","password",3,"feedback"],["type","submit","label","Continuar",3,"icon"],[3,"message"],[1,"flex","flex-wrap","align-items-center","justify-content-between","gap-3"],["severity","info","label","Descargar Manual de Usuario",3,"icon"]],template:function(a,d){a&1&&(n(0,"div",0)(1,"p-panel",1),_(2,Ae,3,1,"ng-template",2)(3,Be,18,15,"ng-template",3)(4,je,2,1,"ng-template",4),s()())},dependencies:[P,O,N,E,L,V,j,R,M,D,T,Z,$,H,ue,ge],styles:[`body{background-image:url(/assets/images/pages/auth/login/login.jpg);background-size:cover}.p-panel-content{opacity:90%}.p-panel-header{opacity:70%}.p-panel-footer{opacity:80%}
`],encapsulation:2});let t=i;return t})();function Oe(t,i){if(t&1&&(n(0,"div",5)(1,"span",6),w(2),s()()),t&2){let e=l();r(2),k(e.authService.system)}}function He(t,i){if(t&1){let e=C();n(0,"div",9)(1,"p-button",15),f("click",function(){g(e);let a=l(2);return v(a.requestTransactionalCode())}),s()()}if(t&2){let e=l(2);r(),o("icon",e.PrimeIcons.SEND)("disabled",!e.usernameField.valid)}}function ze(t,i){if(t&1&&(n(0,"div",13),m(1,"label",16)(2,"input",17)(3,"small",12),s()),t&2){let e=l(2);r(),o("required",e.transactionalCodeField),r(2),o("errors",e.transactionalCodeField.errors)("touched",e.transactionalCodeField.touched)("dirty",e.transactionalCodeField.dirty)}}function We(t,i){if(t&1){let e=C();n(0,"div",13)(1,"p-button",18),f("click",function(){g(e);let a=l(2);return v(a.verifyTransactionalCode())}),s()()}if(t&2){let e=l(2);r(),o("icon",e.PrimeIcons.VERIFIED)("disabled",!e.isRequestTransactionalCode||!e.transactionalCodeField.valid)}}function Ye(t,i){if(t&1&&(n(0,"div",14)(1,"div",19),m(2,"label",20)(3,"p-password",21)(4,"small",12),s(),n(5,"div",19),m(6,"label",22)(7,"p-password",23)(8,"small",12),s()()),t&2){let e=l(2);r(2),o("label",e.LoginFormEnum.username)("required",e.passwordNewField),r(),o("feedback",!1),r(),o("errors",e.passwordNewField.errors)("touched",e.passwordNewField.touched)("dirty",e.passwordNewField.dirty),r(2),o("label",e.LoginFormEnum.passwordConfirmation)("required",e.passwordConfirmationField),r(),o("feedback",!1),r(),o("errors",e.passwordConfirmationField.errors)("touched",e.passwordConfirmationField.touched)("dirty",e.passwordConfirmationField.dirty)}}function Ze(t,i){if(t&1){let e=C();n(0,"div",13)(1,"p-button",24),f("click",function(){g(e);let a=l(2);return v(a.resetPassword())}),s()()}if(t&2){let e=l(2);r(),o("icon",e.PrimeIcons.KEY)}}function $e(t,i){t&1&&(n(0,"div",13),m(1,"app-progress-bar"),s())}function Ke(t,i){if(t&1){let e=C();n(0,"form",7),f("ngSubmit",function(){g(e);let a=l();return v(a.onSubmit())}),n(1,"div",8)(2,"h2"),w(3,"Recupera Contrase\xF1a"),s()(),n(4,"div",9),m(5,"label",10)(6,"input",11)(7,"small",12),s(),_(8,He,2,2,"div",9)(9,ze,4,4,"div",13)(10,We,2,2,"div",13)(11,Ye,9,12,"div",14)(12,Ze,2,1,"div",13)(13,$e,2,0,"div",13),s()}if(t&2){let e=l();o("formGroup",e.form),r(5),o("label",e.LoginFormEnum.username)("required",e.usernameField),r(2),o("errors",e.usernameField.errors)("touched",e.usernameField.touched)("dirty",e.usernameField.dirty),r(),h(8,e.isValidTransactionalCode?-1:8),r(),h(9,e.isRequestTransactionalCode&&!e.isValidTransactionalCode?9:-1),r(),h(10,e.isRequestTransactionalCode&&!e.isValidTransactionalCode?10:-1),r(),h(11,e.isValidTransactionalCode?11:-1),r(),h(12,e.isValidTransactionalCode?12:-1),r(),h(13,e.coreService.isLoading?13:-1)}}function Ue(t,i){if(t&1){let e=C();n(0,"div",25)(1,"p-button",26),f("click",function(){g(e);let a=l();return v(a.redirectLogin())}),s()()}if(t&2){let e=l();r(),o("raised",!0)("icon",e.PrimeIcons.ARROW_LEFT)}}var Ie=(()=>{let i=class i{constructor(){this.coreService=c(x),this.formBuilder=c(I),this.authHttpService=c(B),this.messageService=c(y),this.authService=c(F),this.routesService=c(A),this.PrimeIcons=b,this.isValidTransactionalCode=!1,this.isRequestTransactionalCode=!1,this.LoginFormEnum=G,this.buildForm()}ngOnInit(){}buildForm(){this.form=this.formBuilder.group({transactionalCode:[null,[u.required,u.minLength(6)]],passwordNew:[null,[u.required,u.minLength(8)]],passwordConfirmation:[null,[u.required]],username:[null,[u.required]]},{validators:K.passwordMatchValidator})}onSubmit(){this.form.valid?this.resetPassword():this.form.markAllAsTouched()}resetPassword(){this.authHttpService.resetPassword(this.form.value).subscribe(()=>this.routesService.login())}requestTransactionalCode(){this.usernameField.valid?(this.isRequestTransactionalCode=!1,this.transactionalCodeField.reset(),this.authHttpService.requestTransactionalCode(this.usernameField.value).subscribe(()=>this.isRequestTransactionalCode=!0)):this.usernameField.markAsTouched()}verifyTransactionalCode(){this.usernameField.valid?(this.isValidTransactionalCode=!1,this.authHttpService.verifyTransactionalCode(this.transactionalCodeField.value,this.usernameField.value).subscribe(()=>this.isValidTransactionalCode=!0)):this.transactionalCodeField.markAsTouched()}redirectLogin(){this.routesService.login()}get usernameField(){return this.form.controls.username}get transactionalCodeField(){return this.form.controls.transactionalCode}get passwordNewField(){return this.form.controls.passwordNew}get passwordConfirmationField(){return this.form.controls.passwordConfirmation}};i.\u0275fac=function(a){return new(a||i)},i.\u0275cmp=S({type:i,selectors:[["app-password-reset"]],decls:5,vars:0,consts:[[1,"grid"],[1,"col-12","xl:col-4","lg:col-4","md:col-6","sm:col-12"],["pTemplate","header"],["pTemplate","content"],["pTemplate","footer"],[1,"flex","align-items-center","gap-2"],[1,"font-bold"],[1,"p-fluid","grid",3,"ngSubmit","formGroup"],[1,"field","col-12","text-center"],[1,"field","col-12"],["for","username","appLabel","",3,"label","required"],["pInputText","","id","username","formControlName","username"],["appErrorMessage","",3,"errors","touched","dirty"],[1,"field"],[1,"formgrid","grid"],["label","Solicitar C\xF3digo","severity","info",3,"click","icon","disabled"],["for","transactionalCode","appLabel","","label","Ingrese el c\xF3digo enviado a su correo",3,"required"],["pInputText","","id","transactionalCode","formControlName","transactionalCode"],["severity","success","label","Validar C\xF3digo",3,"click","icon","disabled"],[1,"field","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["for","passwordNew","appLabel","",3,"label","required"],["id","passwordNew","formControlName","passwordNew",3,"feedback"],["for","passwordConfirmation","appLabel","",3,"label","required"],["id","passwordConfirmation","formControlName","passwordConfirmation",3,"feedback"],["label","Resetear Contrase\xF1a",3,"click","icon"],[1,"flex","flex-wrap","align-items-center","justify-content-between","gap-3"],["severity","secondary","label","Regresar al Login",1,"w-full",3,"click","raised","icon"]],template:function(a,d){a&1&&(n(0,"div",0)(1,"p-panel",1),_(2,Oe,3,1,"ng-template",2)(3,Ke,14,12,"ng-template",3)(4,Ue,2,2,"ng-template",4),s()())},dependencies:[P,O,N,E,L,V,j,R,M,D,T,Z,$,H],styles:[`body{background-image:url(/assets/images/pages/auth/login/password-reset.jpg);background-size:cover}.p-panel-content{opacity:90%}.p-panel-header{opacity:70%}.p-panel-footer{opacity:80%}
`],encapsulation:2});let t=i;return t})();var Je=()=>({"max-height":"200px"});function Qe(t,i){if(t&1&&(n(0,"div",5)(1,"span",6),w(2),s()()),t&2){let e=l();r(2),k(e.authService.system)}}function Xe(t,i){if(t&1){let e=C();n(0,"form",7),f("ngSubmit",function(){g(e);let a=l();return v(a.onSubmit())}),n(1,"div",8)(2,"h2"),w(3,"Seleccione un Rol"),s()(),n(4,"div",9),m(5,"label",10)(6,"p-listbox",11)(7,"small",12),s(),n(8,"div",9),m(9,"p-button",13),s()()}if(t&2){let e=l();o("formGroup",e.form),r(5),o("label",e.LoginFormEnum.roleSelect)("required",e.roleField),r(),o("options",e.roles)("listStyle",re(9,Je)),r(),o("errors",e.roleField.errors)("touched",e.roleField.touched)("dirty",e.roleField.dirty),r(2),o("icon",e.PrimeIcons.SIGN_IN)}}function et(t,i){if(t&1){let e=C();n(0,"div",14)(1,"p-button",15),f("click",function(){g(e);let a=l();return v(a.redirectLogin())}),s()()}if(t&2){let e=l();r(),o("raised",!0)("icon",e.PrimeIcons.ARROW_LEFT)}}var Re=(()=>{let i=class i{constructor(){this.coreService=c(x),this.formBuilder=c(I),this.messageService=c(y),this.authService=c(F),this.routesService=c(A),this.roles=[],this.LoginFormEnum=G,this.PrimeIcons=b,this.buildForm()}ngOnInit(){this.roles=this.authService.roles}buildForm(){this.form=this.formBuilder.group({role:[null,[u.required]],fiscalYear:[null],unit:[null]})}onSubmit(){this.form.valid?this.selectRole():(this.form.markAllAsTouched(),this.messageService.errorsFields())}selectRole(){this.authService.role=this.roleField.value,this.authService.selectDashboard()}redirectLogin(){this.routesService.login()}get roleField(){return this.form.controls.role}};i.\u0275fac=function(a){return new(a||i)},i.\u0275cmp=S({type:i,selectors:[["app-role-select"]],decls:5,vars:0,consts:[[1,"grid"],[1,"col-12","xl:col-4","lg:col-4","md:col-6","sm:col-12"],["pTemplate","header"],["pTemplate","content"],["pTemplate","footer"],[1,"flex","align-items-center","gap-2"],[1,"font-bold"],[1,"p-fluid","grid",3,"ngSubmit","formGroup"],[1,"field","col-12","text-center"],[1,"field","col-12"],["for","role","appLabel","",3,"label","required"],["id","role","formControlName","role","optionLabel","name",3,"options","listStyle"],["appErrorMessage","",3,"errors","touched","dirty"],["type","submit","label","Continuar",3,"icon"],[1,"flex","flex-wrap","align-items-center","justify-content-between","gap-3"],["severity","secondary","label","Regresar al Login",3,"click","raised","icon"]],template:function(a,d){a&1&&(n(0,"div",0)(1,"p-panel",1),_(2,Qe,3,1,"ng-template",2)(3,Xe,10,10,"ng-template",3)(4,et,2,2,"ng-template",4),s()())},dependencies:[P,N,E,L,V,R,M,D,T,H,he],styles:[`body{background-image:url(/assets/images/pages/auth/login/role.jpg);background-size:cover}.p-panel-content{opacity:90%}.p-panel-header{opacity:70%}.p-panel-footer{opacity:80%}
`],encapsulation:2});let t=i;return t})();var tt=[{path:"login",component:Ve},{path:"password-reset",component:Ie},{path:"role-select",component:Re}],Me=(()=>{let i=class i{};i.\u0275fac=function(a){return new(a||i)},i.\u0275mod=Y({type:i}),i.\u0275inj=W({imports:[U.forChild(tt),U]});let t=i;return t})();function it(t,i){if(t&1&&(n(0,"div",1),m(1,"app-progress-bar",12),s()),t&2){let e=l();r(),o("message",e.messageService.progressBarProcess)}}var Kt=(()=>{let i=class i{constructor(p,a,d,te,qe,ke){this.authHttpService=p,this.authService=a,this.activatedRoute=d,this.coreService=te,this.formBuilder=qe,this.messageService=ke,this.PrimeIcons=b,this.form=this.newForm()}ngOnInit(){}newForm(){return this.formBuilder.group({passwordConfirmation:[null,[u.required]],passwordNew:[null,[u.required,u.minLength(8)]],passwordOld:[null,[u.required]]},{validators:K.passwordMatchValidator})}onSubmit(){this.form.valid?this.changePassword():(this.form.markAllAsTouched(),this.messageService.errorsFields())}changePassword(){this.authHttpService.changePassword(this.authService.auth.id,this.form.value).subscribe(p=>{})}get passwordConfirmationField(){return this.form.controls.passwordConfirmation}get passwordNewField(){return this.form.controls.passwordNew}get passwordOldField(){return this.form.controls.passwordOld}};i.\u0275fac=function(a){return new(a||i)(q(B),q(F),q(ne),q(x),q(I),q(y))},i.\u0275cmp=S({type:i,selectors:[["app-password-change"]],decls:17,vars:18,consts:[[1,"p-fluid",3,"ngSubmit","formGroup"],[1,"field"],["for","passwordOld","appLabel","","label","Contrase\xF1a Anterior",3,"required"],["pPassword","","type","password","id","passwordOld","formControlName","passwordOld"],["appErrorMessage","",3,"errors","touched","dirty"],[1,"formgrid","grid"],[1,"field","xl:col-6","lg:col-6","md:col-6","sm:col-12"],["appLabel","","for","passwordNew","label","Nueva Contrase\xF1a",3,"required"],["pPassword","","type","password","id","passwordNew","formControlName","passwordNew",3,"feedback"],["appLabel","","for","passwordConfirmation","label","Repita la Contrase\xF1a",3,"required"],["pPassword","","type","password","id","passwordConfirmation","formControlName","passwordConfirmation",3,"feedback"],["type","submit","label","Cambiar Contrase\xF1a",3,"icon","loading"],[3,"message"]],template:function(a,d){a&1&&(n(0,"form",0),f("ngSubmit",function(){return d.onSubmit()}),n(1,"div",1),m(2,"label",2)(3,"input",3)(4,"small",4),s(),n(5,"div",5)(6,"div",6),m(7,"label",7)(8,"input",8)(9,"small",4),s(),n(10,"div",6),m(11,"label",9)(12,"input",10)(13,"small",4),s()(),n(14,"div",1),m(15,"p-button",11),s(),_(16,it,2,1,"div",1),s()),a&2&&(o("formGroup",d.form),r(2),o("required",d.passwordOldField),r(2),o("errors",d.passwordOldField.errors)("touched",d.passwordOldField.touched)("dirty",d.passwordOldField.dirty),r(3),o("required",d.passwordNewField),r(),o("feedback",!1),r(),o("errors",d.passwordNewField.errors)("touched",d.passwordNewField.touched)("dirty",d.passwordNewField.dirty),r(2),o("required",d.passwordConfirmationField),r(),o("feedback",!1),r(),o("errors",d.passwordConfirmationField.errors)("touched",d.passwordConfirmationField.touched)("dirty",d.passwordConfirmationField.dirty),r(2),o("icon",d.PrimeIcons.SAVE)("loading",d.coreService.isLoading),r(),h(16,d.coreService.isLoading?16:-1))},dependencies:[P,O,N,E,L,V,j,R,M,T,de],styles:[".loginForm[_ngcontent-%COMP%]{padding:5% 20% 20%}"]});let t=i;return t})();var yi=(()=>{let i=class i{};i.\u0275fac=function(a){return new(a||i)},i.\u0275mod=Y({type:i}),i.\u0275inj=W({imports:[oe,Me,le,ye,se,we,Se,_e,me,pe,ae,be,xe,ce,Fe,Ce,fe,ve]});let t=i;return t})();export{Kt as a,yi as b};
