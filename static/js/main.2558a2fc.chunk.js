(this["webpackJsonplfs-errors-dashboard"]=this["webpackJsonplfs-errors-dashboard"]||[]).push([[0],{150:function(e,n,t){e.exports={mainContainer:"Dashboard_mainContainer__AvxgX"}},151:function(e,n,t){e.exports=t.p+"static/media/lfs_logo.aaf7ea0d.png"},157:function(e,n,t){e.exports={container:"LoginBanner_container__kdXDu"}},175:function(e,n,t){e.exports=t(336)},180:function(e,n,t){},336:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(4),o=t.n(i),s=(t(180),t(181),t(85)),c=t(43),u=t(24),l=function(){throw Error("gauth is not initialized yet")},m={initialized:!1,isSignedIn:!1,profile:{},tokens:{},error:void 0,signIn:l,signOut:l},g={initialized:!1,client:void 0,error:void 0},d={active:!1,max:void 0,current:void 0,message:"Loading..."},f=Object(c.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,n=arguments.length>1?arguments[1]:void 0,t=n.signIn,a=n.signOut,r=n.error,i=n.profile,o=n.tokens;switch(n.type){case"AUTH_INIT":return Object(u.a)({},e,{initialized:!0,signIn:t,signOut:a});case"AUTH_INIT_ERROR":return Object(u.a)({},m,{error:r});case"AUTH_SIGN_IN":return Object(u.a)({},e,{isSignedIn:!0,profile:i,tokens:o});case"AUTH_SIGN_OUT":return Object(u.a)({},e,{isSignedIn:!1,profile:{},tokens:{}});default:return e}},mail:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,n=arguments.length>1?arguments[1]:void 0,t=n.client,a=n.error;switch(n.type){case"MAIL_INIT":return Object(u.a)({},e,{client:t,initialized:!0});case"MAIL_INIT_ERROR":return Object(u.a)({},g,{error:a});default:return e}},progress:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,n=arguments.length>1?arguments[1]:void 0,t=n.type,a=n.message,r=n.max,i=n.current;switch(t){case"PROGRESS_ACTIVATE":return Object(u.a)({},e,{active:!0,max:r,current:i,message:a});case"PROGRESS_INCREMENT":return Object(u.a)({},e,{current:e.current+1});case"PROGRESS_DEACTIVATE":return Object(u.a)({},e,{active:!1});default:return e}}}),p=t(17),v=t.n(p),I=t(25),h=t(170),E=t(150),_=t.n(E),b=t(16),S=t.n(b),O=function(e,n){var t=setInterval((function(){var a=e();a&&(clearInterval(t),n(a))}),100)},k=function(e){var n=e.currentUser.get();if(void 0===n)return{isSignedIn:!1,profile:{},tokens:{}};var t=n.getBasicProfile(),a=n.getAuthResponse();return{isSignedIn:n.isSignedIn(),profile:void 0===t?{}:{googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},tokens:void 0===a?{}:{idToken:a.id_token,accessToken:a.access_token}}},x=function(e){var n=e.clientId,t=e.hostedDomain,r=e.scope,i=e.onInitialized,o=e.onInitializationError,s=e.onSignedIn,c=e.onSignedOut;Object(a.useEffect)((function(){!function(e){var n=e.clientId,t=e.hostedDomain,a=e.scope,r=e.onInit,i=e.onError,o={client_id:n,cookie_policy:"single_host_origin",hosted_domain:t,fetch_basic_profile:!0,ux_mode:"popup",scope:a};O((function(){return window.gapi}),(function(e){e.load("auth2",(function(){return e.auth2.init(o).then(r,i)}),i)}))}({clientId:n,hostedDomain:t,scope:r,onInit:function(e){e.isSignedIn.listen((function(n){n?s(k(e)):c()}));i({signIn:function(){return e.signIn().then(S.a.noop,(function(e){return console.error("Got error:",e)}))},signOut:function(){return e.signOut().then(e.disconnect())}});var n=k(e);n.isSignedIn&&s(n)},onError:function(e){o(e)}})}),[])},w=t(53),y=t.n(w),N=t(340),j=t(341),T=t(151),A=t.n(T),C=t(65),R=t.n(C),z=t(337),B=function(e){var n=e.disabled,t=e.name,a=e.userPickLink,i=e.onSignOutClicked;return r.a.createElement("div",{className:R.a.container},r.a.createElement("div",{className:R.a.avatarContainer},r.a.createElement(z.a,{size:48,icon:"user",src:a})),r.a.createElement("div",{className:R.a.nameAndButtonContainer},r.a.createElement("div",{className:R.a.userNameSpan},t),n?r.a.createElement("span",null,"Sign out"):r.a.createElement("a",{href:"",onClick:function(e){e.preventDefault(),i()}},"Sign out")))},L=t(29),D=t.n(L),P=function(e){var n=e.name,t=e.imageUrl,a=e.isSignedIn,i=e.signOut;return r.a.createElement("header",{className:y.a.header},r.a.createElement(N.a,null,r.a.createElement(j.a,{span:12,offset:2},r.a.createElement("div",{className:y.a.logoContainer},r.a.createElement("img",{src:A.a,width:"48px",alt:"Logo",className:y.a.logo}),r.a.createElement("div",{className:y.a.titleContainer},r.a.createElement("h1",{className:y.a.logoTitle},"LFS Errors Dashboard"),"\xa0\xa0",r.a.createElement("a",{href:"https://github.com/burkov/lfs-errors-dashboard/releases/tag/v0.2.0",target:"_blank"},"v0.2.0"),"\xa0released ",D()("2020-02-24T12:25:52+03:00").fromNow()))),r.a.createElement(j.a,{offset:4,span:4},a&&r.a.createElement(B,{name:n,userPickLink:t,onSignOutClicked:i}))))},U=t(154),H=t(339),M=t(342),G=t(86),F=t.n(G),K=function(e){var n=e.current,t=e.max,a=e.message,i=e.errors,o=void 0!==n&&void 0!==t,s=o&&100*parseInt(n)/parseInt(t);return r.a.createElement("div",{className:F.a.container},r.a.createElement(U.a,{size:"large"}),r.a.createElement("p",{className:F.a.message},a),o&&r.a.createElement(H.a,{percent:s,status:"active"}),i.map((function(e){return r.a.createElement(M.a,{message:e,type:"error",className:F.a.errorAlert})})))},Y=t(157),q=t.n(Y),V=t(87),J=function(e){var n=e.onSignInClicked,t=e.disabled;return r.a.createElement("div",{className:q.a.container},r.a.createElement("p",null,"To start using the app sign in to your ",r.a.createElement("strong",null,"@jetbrains.com")," account"),r.a.createElement(V.a,{disabled:t,onClick:n},"Sign in"))},Q=t(169),W=t(338),X=t(158),$=t.n(X);D.a.extend($.a);var Z=[{title:"Last",dataIndex:"date",key:"date",render:function(e){var n=D()(e);return r.a.createElement(Q.a,{title:n.format(),placement:"bottom"},n.fromNow())}},{title:"# of similar",dataIndex:"number",key:"number"},{title:"Subject",dataIndex:"subject",key:"subject",render:function(e,n){var t=n.actions.open;return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{href:t,target:"_blank"},r.a.createElement(V.a,{icon:"link",type:"link"})),"\xa0",r.a.createElement("span",null,e.slice(0,160)))}}],ee=function(e){var n=e.messages;return r.a.createElement(r.a.Fragment,null,r.a.createElement(W.a,{rowKey:"subject",dataSource:n,columns:Z,size:"small",pagination:!1}))},ne=function(e){var n=e.apiKey,t=e.onInitialized,r=e.onInitializationError;Object(a.useEffect)((function(){!function(e){var n=e.apiKey,t=e.onInit,a=e.onError,r={apiKey:n,discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]};O((function(){return window.gapi}),(function(e){e.load("client",(function(){return e.client.init(r).then(t,a)}),a)}))}({apiKey:n,onInit:function(){t(window.gapi.client)},onError:r})}),[])},te=function(){var e=Object(I.a)(v.a.mark((function e(n,t){var a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!S.a.isEmpty(t)){e.next=2;break}return e.abrupt("return",[]);case 2:return a=n.newBatch(),t.forEach((function(e){a.add(n.request({path:"gmail/v1/users/me/messages/".concat(e),params:{format:"metadata",metadataHeaders:["Subject","Date"]}}))})),e.abrupt("return",new Promise((function(e,n){a.then((function(n){var t=n.result;e(S.a.map(S.a.values(t),(function(e){return S.a.get(e,"result")})))}),(function(e){return n(e)}))})));case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),ae=function(){var e=Object(I.a)(v.a.mark((function e(n){var t,a,r,i,o,s,c,u;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=void 0,a=[],r=D()().subtract(30,"day").format("YYYY/MM/DD"),i="(<jetprofile-prod-lfs-notifications.jetbrains.com>)";case 4:return e.next=6,n.gmail.users.messages.list({userId:"me",q:"list:".concat(i," after:").concat(r),pageToken:t});case 6:o=e.sent,s=o.result,c=s.messages,u=s.nextPageToken,a=a.concat(S.a.map(c,(function(e){return e.id}))),t=u;case 12:if(!S.a.isNil(t)){e.next=4;break}case 13:return e.abrupt("return",a);case 14:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),re=t(66),ie=t.n(re),oe=t(164),se=function(){var e=Object(I.a)(v.a.mark((function e(n){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=oe.a,e.next=3,ie.a.keys();case 3:return e.t1=e.sent,t=(0,e.t0)(e.t1),e.abrupt("return",S.a.filter(n,(function(e){return!t.has(e)})));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ce=function(e){return e.replace(/^(jetprofile-prod RT error: )/,"")},ue=function(){var e=Object(I.a)(v.a.mark((function e(n){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.map((function(e){var n=e.id,t=e.payload.headers,a=S.a.find(t,(function(e){return"date"===e.name.toLowerCase()})).value,r=S.a.find(t,(function(e){return"subject"===e.name.toLowerCase()})).value;return ie.a.setItem(n,{date:a,subject:ce(r)})})),e.next=3,Promise.all(t);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),le=function(){var e=Object(I.a)(v.a.mark((function e(n){var t,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(n.map(function(){var e=Object(I.a)(v.a.mark((function e(n){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=u.a,e.t1={},e.next=4,ie.a.getItem(n);case 4:return e.t2=e.sent,e.t3={actions:{open:"https://mail.google.com/mail/u/0/#inbox/".concat(n)}},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t3));case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()));case 2:return t=e.sent,a=S.a.values(S.a.groupBy(t,(function(e){return e.subject.slice(0,20)}))).map((function(e){e.forEach((function(e){e.timestamp=D()(e.date).unix()}));var n=S.a.maxBy(e,"timestamp");return Object(u.a)({},n,{number:e.length})})),e.abrupt("return",S.a.reverse(S.a.sortBy(a,"timestamp")));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),me=window.location.host.includes("localhost"),ge={onAuthInit:function(e){return{type:"AUTH_INIT",signIn:e.signIn,signOut:e.signOut}},onAuthInitError:function(e){return{type:"AUTH_INIT_ERROR",error:e}},onSignedIn:function(e){return{type:"AUTH_SIGN_IN",profile:e.profile,tokens:e.tokens}},onSignedOut:function(){return{type:"AUTH_SIGN_OUT"}},onMailInit:function(e){return{type:"MAIL_INIT",client:e}},onMailInitError:function(e){return{type:"MAIL_INIT_ERROR",error:e}},activateProgress:function(e){return{type:"PROGRESS_ACTIVATE",message:e.message,current:e.current,max:e.max}},incrementProgress:function(){return{type:"PROGRESS_INCREMENT"}},deactivateProgress:function(){return{type:"PROGRESS_DEACTIVATE"}}},de=Object(s.b)((function(e){var n=e.auth,t=n.initialized,a=n.isSignedIn,r=n.signIn,i=n.signOut,o=n.profile,s=n.error,c=e.mail,u=c.initialized,l=c.client,m=c.error,g=e.progress,d=g.active,f=g.current,p=g.max,v=g.message;return{initialized:t&&u&&!d&&S.a.isNil(s)&&S.a.isNil(m),auth:{isSignedIn:a,signIn:r,signOut:i,profile:o,error:s},mail:{client:l,error:m},progress:{active:d,current:f,max:p,message:v}}}),ge)((function(e){var n,t,i=e.initialized,o=e.auth,s=o.isSignedIn,c=o.signIn,u=o.signOut,l=o.profile,m=l.name,g=l.imageUrl,d=o.error,f=e.mail,p=f.client,E=f.error,b=e.progress,O=b.current,k=b.max,w=b.message,y=e.onAuthInit,N=e.onAuthInitError,j=e.onSignedIn,T=e.onSignedOut,A=e.onMailInit,C=e.onMailInitError,R=e.activateProgress,z=e.deactivateProgress,B=Object(a.useState)([]),L=Object(h.a)(B,2),D=L[0],U=L[1];return x({clientId:"797091362316-t4kt893ttu0ls2gdbjhbq7pn7g2r22tq.apps.googleusercontent.com",hostedDomain:"jetbrains.com",scope:"https://www.googleapis.com/auth/gmail.readonly",onSignedIn:j,onSignedOut:T,onInitialized:y,onInitializationError:N}),ne({apiKey:"AIzaSyD-QsOK6xDB1oECO1uEX-PCzi-FeauYGSo",onInitialized:A,onInitializationError:C}),n=Object(I.a)(v.a.mark((function e(){var n,t,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===p||!s){e.next=25;break}return R({message:"Loading emails..."}),e.next=4,me?ie.a.keys():ae(p);case 4:return n=e.sent,R({message:"Found ".concat(n.length," emails in LFS mail list")}),e.next=8,se(n);case 8:return t=e.sent,console.log("New emails: ".concat(t.length)),R({message:"Fetching ".concat(t.length," new emails")}),e.next=13,te(p,t);case 13:return a=e.sent,e.next=16,ue(a);case 16:return console.log("Done saving"),R({message:"Processing messages"}),e.t0=U,e.next=21,le(n);case 21:e.t1=e.sent,(0,e.t0)(e.t1),console.log("Done processing"),z();case 25:case"end":return e.stop()}}),e)}))),t=[p,s],Object(a.useEffect)((function(){!function(){var e=Object(I.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),t),r.a.createElement(r.a.Fragment,null,r.a.createElement(P,{name:m,imageUrl:g,isSignedIn:s,signOut:u}),r.a.createElement("main",{className:_.a.mainContainer},i?s?r.a.createElement(ee,{messages:D}):r.a.createElement(J,{onSignInClicked:c,disabled:!i}):r.a.createElement(K,{current:O,max:k,message:w,errors:S.a.compact([d,E])})))})),fe=t(165),pe=t(166),ve=Object(c.createStore)(f,Object(fe.composeWithDevTools)());var Ie=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(pe.a,null,r.a.createElement("title",null,"LFS errors dashboard")),r.a.createElement(s.a,{store:ve},r.a.createElement(de,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Ie,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},53:function(e,n,t){e.exports={header:"Header_header__3mObx",logoContainer:"Header_logoContainer__39AYI",logo:"Header_logo__2ins2",titleContainer:"Header_titleContainer__2q2gU",logoTitle:"Header_logoTitle__3xLCf"}},65:function(e,n,t){e.exports={container:"SignInSignOutBlock_container__2c2bM",userNameSpan:"SignInSignOutBlock_userNameSpan__3Fm_h",avatarContainer:"SignInSignOutBlock_avatarContainer__11L6Q",nameAndButtonContainer:"SignInSignOutBlock_nameAndButtonContainer__pxRSB"}},86:function(e,n,t){e.exports={container:"LoadingBanner_container__BeMk5",message:"LoadingBanner_message__2DQ7T",errorAlert:"LoadingBanner_errorAlert__3JNs6"}}},[[175,1,2]]]);
//# sourceMappingURL=main.2558a2fc.chunk.js.map