(window.webpackJsonpcoronavirus=window.webpackJsonpcoronavirus||[]).push([[0],{372:function(e,t,a){e.exports=a.p+"static/media/background.32f54de7.png"},423:function(e,t,a){e.exports=a(832)},430:function(e,t,a){},431:function(e,t,a){},432:function(e,t,a){e.exports=a.p+"static/media/coronavirus_logo.f28de6c4.png"},449:function(e,t){},451:function(e,t){},461:function(e,t){},463:function(e,t){},516:function(e,t){},517:function(e,t){},568:function(e,t){},832:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),l=a.n(c),o=a(113),i=(a(430),a(382)),s=a(889),u=(a(431),a(79)),m=a(866),d=a(48),h=a(878),f=a(137),p=a(7),v=a(869),b=a(871),g=a(63),y=[{label:"Home",pathname:"/"},{label:"By Country",pathname:"/by-country"},{label:"By State",pathname:"/by-state"},{label:"Projections",pathname:"/projections"}],E=a(872),C=a(371),j=a.n(C),S=a(873),O=a(891),k=a(892),x=a(877),P=a(875),w=a(834),N=a(876),I=a(432),D=Object(m.a)((function(e){return{appBar:{boxShadow:"none",backgroundColor:"white",borderBottom:"1px solid ".concat(e.palette.grey.A100)},flex:Object(d.a)({display:"flex"},e.breakpoints.down("sm"),{display:"flex",justifyContent:"space-evenly",alignItems:"center"}),link:{textDecoration:"none",color:"inherit"},logo:{width:220},logoContainer:{padding:14},iconContainer:Object(d.a)({display:"none"},e.breakpoints.down("sm"),{display:"block"}),iconButton:{float:"right"},tabContainer:Object(d.a)({margin:"auto",paddingRight:150},e.breakpoints.down("sm"),{display:"none"}),tabItem:{minWidth:"auto"}}}));function A(e){var t=D(),a=Object(n.useState)(0),c=Object(p.a)(a,2),l=c[0],o=c[1],i=Object(n.useState)(!1),s=Object(p.a)(i,2),u=s[0],m=s[1],d=function(e){m(!0)};return r.a.createElement(v.a,{position:"relative",color:"default",className:t.appBar},r.a.createElement(b.a,null,r.a.createElement(E.a,{container:!0,spacing:0,alignItems:"baseline"},r.a.createElement(E.a,{container:!0,item:!0,xs:12,className:t.flex,alignItems:"baseline"},r.a.createElement(g.a,{to:"/",className:t.link},r.a.createElement("div",{className:t.logoContainer},r.a.createElement("img",{className:t.logo,src:I,alt:"Coronavirus Statistics Logo"}))),!e.noTabs&&r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:t.iconContainer},r.a.createElement(S.a,{onClick:d,className:t.iconButton,color:"inherit","aria-label":"Menu"},r.a.createElement(j.a,null))),r.a.createElement("div",{className:t.tabContainer},r.a.createElement(O.a,{anchor:"right",open:u,onOpen:d,onClose:function(e){m(!1)}},r.a.createElement(v.a,{title:"Menu"}),r.a.createElement(P.a,null,y.map((function(t,a){return r.a.createElement(w.a,{component:g.a,to:{pathname:t.pathname,search:e.currentPath},button:!0,key:a},r.a.createElement(N.a,{primary:t.label}))})))),r.a.createElement(k.a,{value:function(){var t=y.map((function(t,a){return e.currentPath.split("/")[1]===t.pathname.split("/")[1]?a:0}));return Math.max.apply(Math,Object(f.a)(t))}()||l,indicatorColor:"primary",textColor:"primary",onChange:function(e,t){o(t)}},y.map((function(e,a){return r.a.createElement(x.a,{key:a,component:g.a,to:{pathname:e.pathname},styles:{root:t.tabItem},label:e.label})})))))))))}var B=Object(m.a)((function(e){return{footerContainer:{backgroundColor:"#333",width:"100%",marginTop:"auto",padding:e.spacing(2)},linkArea:{padding:70},linkHeader:{fontWeight:"bold",color:"#eee",paddingBottom:10},link:{textDecoration:"none",color:"#ccc"},bodyText:{color:"#ccc"},copyright:{color:"#ccc",marginLeft:"auto",marginRight:30}}}));function W(e){var t=B();return r.a.createElement("div",{className:t.footerContainer},r.a.createElement(E.a,{container:!0,spacing:0,alignItems:"baseline"},r.a.createElement(E.a,{container:!0,item:!0,xs:6,sm:3,className:t.flex,alignItems:"baseline"},r.a.createElement("div",{className:t.linkArea},r.a.createElement("div",{className:t.linkHeader},"Bar Charts"),r.a.createElement(g.a,{to:"/by-country",className:t.link},"By Country"),r.a.createElement("br",null),r.a.createElement(g.a,{to:"/by-state",className:t.link},"By State"),r.a.createElement("br",null))),r.a.createElement(E.a,{container:!0,item:!0,xs:6,sm:3,className:t.flex,alignItems:"baseline"},r.a.createElement("div",{className:t.linkArea},r.a.createElement("div",{className:t.linkHeader},"Line Charts"),r.a.createElement(g.a,{to:"/projections",className:t.link},"Projections"))),r.a.createElement(E.a,{container:!0,item:!0,xs:12,sm:6,className:t.flex,alignItems:"baseline"},r.a.createElement("div",{className:t.linkArea},r.a.createElement("div",{className:t.linkHeader},"Coronavirus Statistics"),r.a.createElement("div",{className:t.bodyText},"Coronavirus Statistics is a tool to help you analyze and understand the spread of the Coronavirus (COVID-19) disease in various countries of the world and states in the US.")),r.a.createElement("div",{className:t.copyright},"Copyright \xa9 2020 Coronavirus Statistics"))))}var T=a(372),z=a.n(T),M=Object(m.a)((function(e){return{root:{display:"flex",flexDirection:"column",minHeight:"100vh"},grid:Object(d.a)({width:1200,marginTop:40},e.breakpoints.down("sm"),{width:"calc(100% - 20px)"}),content:{padding:e.spacing(3),textAlign:"left",margin:"auto",color:e.palette.text.secondary},backgroundGraphic:{backgroundImage:"url(".concat(z.a,")"),width:"100%",height:700}}}));function L(e){var t=M(),a=e.contentWidth||900,n=e.contentBackgroundColor||"#fff";return r.a.createElement("div",{className:t.root,style:{backgroundColor:n}},r.a.createElement(h.a,null),r.a.createElement(A,{currentPath:e.currentPath}),r.a.createElement(E.a,{container:!0,spacing:0},r.a.createElement("div",{style:{width:a},className:t.content},e.children)),e.includeBackgroundGraphic?r.a.createElement("div",{className:t.backgroundGraphic}):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement(W,null))}var R=Object(m.a)((function(e){return{row:{display:"flex"},actionButton:{float:"right",textTransform:"uppercase",margin:e.spacing(1),width:152},blockCenter:{padding:e.spacing(2),textAlign:"center"},block:{padding:e.spacing(2)},inlining:{display:"inline-block",marginRight:10},buttonBar:{display:"flex"},alignRight:{display:"flex",justifyContent:"flex-end"},formControl:{float:"left",width:"100%"},noBorder:{borderBottomStyle:"hidden"},loadingState:{opacity:.05},loadingMessage:{position:"absolute",top:"40%",left:"40%"},title:{fontFamily:"Arial Narrow",fontSize:56,fontWeight:900,color:"#E66464",textTransform:"uppercase"},subtitle:{fontSize:24,color:"#444",padding:20}}}));function K(e){var t=e.location.pathname,a=R();return r.a.createElement(L,{currentPath:t,contentWidth:700,includeBackgroundGraphic:!0},r.a.createElement("div",{className:a.smallContainer},r.a.createElement("div",{className:a.blockCenter},r.a.createElement("div",{className:a.title},"Welcome To Coronavirus Statistics!"),r.a.createElement("div",{className:a.subtitle},"Use the menu above to find all kinds of statistics about Coronavirus (COVID-19)."))))}var U=a(41),G=a.n(U),Y=a(62),F=a(169),H=a(833),Z=a(884),Q=a(888),V=a(887),$=a(883),_=a(885),q=a(896),J=a(886),X=a(104),ee=a.n(X),te=a(14),ae=a(881),ne=a(898),re=a(882),ce=a(890),le=a(879),oe=a(880),ie=a(894),se=Object(m.a)((function(e){return{root:{flexGrow:1,padding:10},tableContainer:{maxHeight:640},formControl:{minWidth:120},title:{fontFamily:"Arial Narrow",fontSize:42,fontWeight:900,color:"#E66464",textTransform:"uppercase"},subtitle:{fontSize:24,color:"#444"}}})),ue=function(e){var t=e.location.pathname,a=Object(n.useState)([]),c=Object(p.a)(a,2),l=c[0],o=c[1],i=se(),s=r.a.useState(0),u=Object(p.a)(s,2),m=u[0],h=u[1],f=r.a.useState(10),v=Object(p.a)(f,2),b=v[0],g=v[1],y=r.a.useState("totalCases"),C=Object(p.a)(y,2),j=C[0],S=C[1],O=r.a.useState({cases:!0,deaths:!0,active:!0,recovered:!0}),k=Object(p.a)(O,2),x=k[0],P=k[1],w=function(e){P(Object(F.a)({},x,Object(d.a)({},e.target.name,e.target.checked)))},N=function(e){return e?parseInt(e.substring(1),10):0},I=function(e){var t={name:e.country,totalCases:e.cases.total,newCases:N(e.cases.new)};return x.deaths&&(t.priorDeaths=e.deaths.total-N(e.deaths.new),t.newDeaths=N(e.deaths.new)),x.active&&(t.nonCriticalCases=e.cases.active-e.cases.critical,t.criticalCases=e.cases.critical),x.recovered&&(t.recoveredCases=e.cases.recovered),t},D="name"===j?-1:1,A=l.map((function(e){return I(e)})).sort((function(e,t){return e[j]<t[j]?1*D:-1*D})),B=l.slice(0,10).filter((function(e){return"All"!==e.country})).map((function(e){return I(e)})).sort((function(e,t){return e[j]<t[j]?1*D:-1*D})),W=[{id:"name",label:"Country",minWidth:100}];function T(){return(T=Object(Y.a)(G.a.mark((function e(){var t;return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(t=ee()("GET","https://covid-193.p.rapidapi.com/statistics")).headers({"x-rapidapi-host":"covid-193.p.rapidapi.com","x-rapidapi-key":"4d6ca13f5fmsh9f19a8a950f47fbp1f836ajsn3031c33b0005"}),t.end((function(e){if(e.error)throw new Error(e.error);o(e.body.response)}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return W.push({id:"totalCases",label:"Total Cases",minWidth:60}),W.push({id:"newCases",label:"New Cases",minWidth:50}),x.deaths&&(W.push({id:"newDeaths",label:"New Deaths",minWidth:50}),W.push({id:"priorDeaths",label:"Prior Deaths",minWidth:50})),x.active&&(W.push({id:"criticalCases",label:"Critical Cases",minWidth:60}),W.push({id:"nonCriticalCases",label:"Non-Critical Cases",minWidth:60})),x.recovered&&W.push({id:"recoveredCases",label:"Recovered Cases",minWidth:60}),Object(n.useEffect)((function(){l.length<1&&function(){T.apply(this,arguments)}()})),r.a.createElement(L,{currentPath:t,contentWidth:1600,includeBackgroundGraphic:!1},r.a.createElement("div",{className:i.root},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12,sm:6},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12,sm:6},"Show:",r.a.createElement(le.a,{row:!0},r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:x.deaths,onChange:w,name:"deaths",color:"primary"}),label:"Deaths"}),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:x.active,onChange:w,name:"active",color:"primary"}),label:"Active"}),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:x.recovered,onChange:w,name:"recovered",color:"primary"}),label:"Recovered"}))),r.a.createElement(E.a,{item:!0,xs:12,sm:6},r.a.createElement(ae.a,{variant:"outlined",className:i.formControl},r.a.createElement(ne.a,{id:"sortBy"},"Sort By"),r.a.createElement(ce.a,{labelId:"sortBy",id:"sortBy",value:j,onChange:function(e){S(e.target.value)},label:"Sort By"},W.map((function(e){return r.a.createElement(re.a,{key:e.id,value:e.id},e.label)})))))),r.a.createElement(H.a,null,r.a.createElement($.a,{className:i.tableContainer},r.a.createElement(Z.a,{stickyHeader:!0,"aria-label":"sticky table"},r.a.createElement(_.a,null,r.a.createElement(J.a,null,W.map((function(e){return r.a.createElement(V.a,{key:e.id,align:e.align,style:{minWidth:e.minWidth}},e.label)})))),r.a.createElement(Q.a,null,A.slice(m*b,m*b+b).map((function(e){return r.a.createElement(J.a,{hover:!0,role:"checkbox",tabIndex:-1,key:e.name},W.map((function(t){var a=e[t.id];return r.a.createElement(V.a,{key:t.id,align:t.align},t.format&&"number"===typeof a?t.format(a):a)})))}))))),r.a.createElement(q.a,{rowsPerPageOptions:[10,25,100],component:"div",count:A.length,rowsPerPage:b,page:m,onChangePage:function(e,t){h(t)},onChangeRowsPerPage:function(e){g(+e.target.value),h(0)}}))),r.a.createElement(E.a,{item:!0,xs:12,sm:6},r.a.createElement(te.g,{width:"100%",aspect:1},r.a.createElement(te.b,{data:B,layout:"vertical",margin:{top:5,right:30,left:40,bottom:5}},r.a.createElement(te.c,{strokeDasharray:"3 3"}),r.a.createElement(te.i,{type:"number"}),r.a.createElement(te.j,{type:"category",dataKey:"name"}),r.a.createElement(te.h,null),r.a.createElement(te.d,null),r.a.createElement(te.a,{dataKey:"newDeaths",name:"New Deaths",stackId:"1",fill:"#e33"}),r.a.createElement(te.a,{dataKey:"priorDeaths",name:"Prior Deaths",stackId:"1",fill:"#f51"}),r.a.createElement(te.a,{dataKey:"criticalCases",name:"Critical Cases",stackId:"1",fill:"#f80"}),r.a.createElement(te.a,{dataKey:"nonCriticalCases",name:"Non-Critical Cases",stackId:"1",fill:"#fd3"}),r.a.createElement(te.a,{dataKey:"recoveredCases",name:"Recovered",stackId:"1",fill:"#7b4"})))))))},me=a(174),de=a.n(me),he=Object(m.a)((function(e){return{root:{flexGrow:1,padding:10},tableContainer:{maxHeight:640},formControl:{minWidth:120},title:{fontFamily:"Arial Narrow",fontSize:42,fontWeight:900,color:"#E66464",textTransform:"uppercase"},subtitle:{fontSize:24,color:"#444"}}})),fe=function(e){var t=e.location.pathname,a=Object(n.useState)([]),c=Object(p.a)(a,2),l=c[0],o=c[1],i=he(),s=r.a.useState(0),u=Object(p.a)(s,2),m=u[0],d=u[1],h=r.a.useState(10),f=Object(p.a)(h,2),v=f[0],b=f[1],g=r.a.useState("cases"),y=Object(p.a)(g,2),C=y[0],j=y[1],S=r.a.useState(""),O=Object(p.a)(S,2),k=O[0],x=O[1],P=r.a.useState("All"),w=Object(p.a)(P,2),N=w[0],I=w[1],D=function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var o=c.value;t.includes(o.date)||t.push(o.date)}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return t.sort(),t.reverse(),t}(l),A=function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var o=c.value;t.includes(o.state)||t.push(o.state)}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return t.sort(),t}(l),B=function(e){var t="";if(e&&e.length){var a=!0,n=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var o=c.value;o.date>t&&(t=o.date)}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}}return t},W="state"===C?-1:1,T=l.filter((function(e){return N===e.state||"All"===N})).filter((function(e){return k===e.date})).sort((function(e,t){return e[C]<t[C]?1*W:-1*W})),z=l.filter((function(e){return N===e.state||"All"===N})).filter((function(e){return k===e.date})).sort((function(e,t){return e[C]<t[C]?1*W:-1*W})),M=[{id:"state",label:"State",minWidth:100},{id:"date",label:"Date",minWidth:50},{id:"cases",label:"Cases",minWidth:60},{id:"deaths",label:"Deaths",minWidth:60},{id:"deathRate",label:"Death Rate %",minWidth:60}];function R(){return(R=Object(Y.a)(G.a.mark((function e(){return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ee()("GET","https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv").end((function(e){if(e.error)throw new Error(e.error);var t=de.a.parse(e.body,{header:!0,delimiter:","}).data.map((function(e){return{state:e.state,date:e.date,cases:parseInt(e.cases,10),deaths:parseInt(e.deaths,10),deathRate:Math.round(parseInt(e.deaths,10)/parseInt(e.cases,10)*1e4)/100}})),a=B(t);x(a),o(t)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){l.length<1&&function(){R.apply(this,arguments)}()})),r.a.createElement(L,{currentPath:t,contentWidth:1600,includeBackgroundGraphic:!1},r.a.createElement("div",{className:i.root},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12,sm:6},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12,sm:4},r.a.createElement(ae.a,{variant:"outlined",className:i.formControl},r.a.createElement(ne.a,{id:"selectedState"},"State"),r.a.createElement(ce.a,{labelId:"selectedState",id:"selectedState",value:N,onChange:function(e){I(e.target.value)},label:"State"},r.a.createElement(re.a,{key:"All",value:"All"},"All"),A.map((function(e){return r.a.createElement(re.a,{key:e,value:e},e)}))))),r.a.createElement(E.a,{item:!0,xs:12,sm:4},r.a.createElement(ae.a,{variant:"outlined",className:i.formControl},r.a.createElement(ne.a,{id:"selectedDate"},"Date"),r.a.createElement(ce.a,{labelId:"selectedDate",id:"selectedDate",value:k,onChange:function(e){x(e.target.value)},label:"Date"},D.map((function(e){return r.a.createElement(re.a,{key:e,value:e},e)}))))),r.a.createElement(E.a,{item:!0,xs:12,sm:4},r.a.createElement(ae.a,{variant:"outlined",className:i.formControl},r.a.createElement(ne.a,{id:"sortBy"},"Sort By"),r.a.createElement(ce.a,{labelId:"sortBy",id:"sortBy",value:C,onChange:function(e){j(e.target.value)},label:"Sort By"},M.filter((function(e){return"date"!==e.id})).map((function(e){return r.a.createElement(re.a,{key:e.id,value:e.id},e.label)})))))),r.a.createElement(H.a,null,r.a.createElement($.a,{className:i.tableContainer},r.a.createElement(Z.a,{stickyHeader:!0,"aria-label":"sticky table"},r.a.createElement(_.a,null,r.a.createElement(J.a,null,M.map((function(e){return r.a.createElement(V.a,{key:e.id,align:e.align,style:{minWidth:e.minWidth}},e.label)})))),r.a.createElement(Q.a,null,T.slice(m*v,m*v+v).map((function(e){return r.a.createElement(J.a,{hover:!0,role:"checkbox",tabIndex:-1,key:e.state,onClick:function(){!function(e){I(e.state)}(e)}},M.map((function(t){var a=e[t.id];return r.a.createElement(V.a,{key:t.id,align:t.align},t.format&&"number"===typeof a?t.format(a):a)})))}))))),r.a.createElement(q.a,{rowsPerPageOptions:[10,25,100],component:"div",count:T.length,rowsPerPage:v,page:m,onChangePage:function(e,t){d(t)},onChangeRowsPerPage:function(e){b(+e.target.value),d(0)}}))),r.a.createElement(E.a,{item:!0,xs:12,sm:6,style:{overflow:"scroll",height:800}},r.a.createElement(te.g,{width:"100%",aspect:.4},r.a.createElement(te.b,{data:z,layout:"vertical",margin:{top:5,right:30,left:60,bottom:5}},r.a.createElement(te.c,{strokeDasharray:"3 3"}),r.a.createElement(te.i,{type:"number"}),r.a.createElement(te.j,{type:"category",dataKey:"state"}),r.a.createElement(te.h,null),r.a.createElement(te.d,{layout:"horizontal",verticalAlign:"top",align:"center"}),r.a.createElement(te.a,{dataKey:"deaths",name:"Deaths",stackId:"1",fill:"#f51"}),r.a.createElement(te.a,{dataKey:"cases",name:"Cases",stackId:"1",fill:"#fd3"})))))))},pe=a(57),ve=a.n(pe),be=Object(m.a)((function(e){return{root:{flexGrow:1,padding:10},tableContainer:{maxHeight:640},formControl:{minWidth:120},title:{fontFamily:"Arial Narrow",fontSize:42,fontWeight:900,color:"#E66464",textTransform:"uppercase"},subtitle:{fontSize:24,color:"#444"}}})),ge=function(e){var t,a,c,l,o,i,s,u,m=e.location.pathname,h=Object(n.useState)([]),v=Object(p.a)(h,2),b=v[0],g=v[1],y=be(),C=r.a.useState("Alabama"),j=Object(p.a)(C,2),S=j[0],O=j[1],k=r.a.useState(7),x=Object(p.a)(k,2),P=x[0],w=x[1],N=r.a.useState(7),I=Object(p.a)(N,2),D=I[0],A=I[1],B=r.a.useState({cases:!0,casesLinear:!0,casesPercentage:!0,deaths:!1,deathsLinear:!1,deathsPercentage:!1}),W=Object(p.a)(B,2),T=W[0],z=W[1],M=function(e){var t=[],a=!0,n=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var o=c.value;t.includes(o.state)||t.push(o.state)}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}return t.sort(),t}(b),R=function(e){z(Object(F.a)({},T,Object(d.a)({},e.target.name,e.target.checked)))},K=function(e){return e.filter((function(e){return e.state===S})).map((function(e){return{state:e.state,date:e.date,dateUnix:ve()(e.date).unix(),cases:e.cases,deaths:e.deaths}})).sort((function(e,t){return e.date<t.date?-1:1}))}(b),U=function(e){var n=[];if("All"!==S){var r=function(e){var t="";if(e&&e.length){var a=!0,n=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(a=(c=l.next()).done);a=!0){var o=c.value;o.date>t&&(t=o.date)}}catch(i){n=!0,r=i}finally{try{a||null==l.return||l.return()}finally{if(n)throw r}}}return t}(e),m=ve()(r),d=ve()(m).subtract(P,"days"),h=ve()().add(D,"days").format("YYYY-MM-DD"),f=0,p=0,v=0,b=0,g=!0,y=!1,E=void 0;try{for(var C,j=e[Symbol.iterator]();!(g=(C=j.next()).done);g=!0){var O=C.value;O.state===S&&(m.isSame(O.date)?(f=O.cases,p=O.deaths):d.isSame(O.date)&&(v=O.cases,b=O.deaths))}}catch(B){y=!0,E=B}finally{try{g||null==j.return||j.return()}finally{if(y)throw E}}t=Math.round((f-v)/P),a=Math.round((p-b)/P),c=1+(f-v)/(v||1)/P,l=1+(p-b)/(b||1)/P,o="Projected Cases Linear (".concat(t,"/day)"),i="Projected Deaths Linear (".concat(a,"/day)"),s="Projected Cases Percentage (".concat(Math.round(100*(c-1)),"%/day)"),u="Projected Deaths Percentage (".concat(Math.round(100*(l-1)),"%/day)");for(var k=f,x=f,w=p,N=p,I=ve()(m);I.isBefore(h,"day");I.add(1,"days")){var A=I.format("YYYY-MM-DD");n.push({state:S,date:A,dateUnix:ve()(A).unix(),casesLinear:k,casesPercentage:x,deathsLinear:w,deathsPercentage:N}),k+=t,w+=a,x=Math.round(x*c),N=Math.round(N*l)}}return n}(b),H=[].concat(Object(f.a)(K),Object(f.a)(U));function Z(){return(Z=Object(Y.a)(G.a.mark((function e(){return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ee()("GET","https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv").end((function(e){if(e.error)throw new Error(e.error);var t=de.a.parse(e.body,{header:!0,delimiter:","}).data.map((function(e){return{state:e.state,date:e.date,cases:parseInt(e.cases,10),deaths:parseInt(e.deaths,10),deathRate:Math.round(parseInt(e.deaths,10)/parseInt(e.cases,10)*1e4)/100}}));g(t)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){b.length<1&&function(){Z.apply(this,arguments)}()})),r.a.createElement(L,{currentPath:m,contentWidth:1600,includeBackgroundGraphic:!1},r.a.createElement("div",{className:y.root},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12,sm:3},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(ae.a,{variant:"outlined",className:y.formControl},r.a.createElement(ne.a,{id:"selectedState"},"State"),r.a.createElement(ce.a,{labelId:"selectedState",id:"selectedState",value:S,onChange:function(e){O(e.target.value)},label:"State"},r.a.createElement(re.a,{key:"All",value:"All"},"All"),M.map((function(e){return r.a.createElement(re.a,{key:e,value:e},e)})))))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement("h3",null,"Projection Based On Last"),r.a.createElement(ae.a,{variant:"outlined",className:y.formControl},r.a.createElement(ne.a,{id:"projectLastDays"},"Number of Days"),r.a.createElement(ce.a,{labelId:"projectLastDays",id:"projectLastDays",value:P,onChange:function(e){w(e.target.value)},label:"Number Of Days"},r.a.createElement(re.a,{key:1,value:1},"1"),r.a.createElement(re.a,{key:2,value:2},"2"),r.a.createElement(re.a,{key:3,value:3},"3"),r.a.createElement(re.a,{key:4,value:4},"4"),r.a.createElement(re.a,{key:5,value:5},"5"),r.a.createElement(re.a,{key:6,value:6},"6"),r.a.createElement(re.a,{key:7,value:7},"7"),r.a.createElement(re.a,{key:10,value:10},"10"),r.a.createElement(re.a,{key:14,value:14},"14"),r.a.createElement(re.a,{key:30,value:30},"30"),r.a.createElement(re.a,{key:60,value:60},"60")))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement("h3",null,"Project Out Into Future"),r.a.createElement(ae.a,{variant:"outlined",className:y.formControl},r.a.createElement(ne.a,{id:"projectFutureDays"},"Number of Days"),r.a.createElement(ce.a,{labelId:"projectFutureDays",id:"projectFutureDays",value:D,onChange:function(e){A(e.target.value)},label:"Number Of Days"},r.a.createElement(re.a,{key:1,value:1},"1"),r.a.createElement(re.a,{key:2,value:2},"2"),r.a.createElement(re.a,{key:3,value:3},"3"),r.a.createElement(re.a,{key:4,value:4},"4"),r.a.createElement(re.a,{key:5,value:5},"5"),r.a.createElement(re.a,{key:6,value:6},"6"),r.a.createElement(re.a,{key:7,value:7},"7"),r.a.createElement(re.a,{key:10,value:10},"10"),r.a.createElement(re.a,{key:14,value:14},"14"),r.a.createElement(re.a,{key:30,value:30},"30"),r.a.createElement(re.a,{key:60,value:60},"60")))),r.a.createElement("h2",null,"Show"),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement("h3",null,"Cases"),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:T.cases,onChange:R,name:"cases",color:"primary"}),label:"Actual Cases"}),r.a.createElement("br",null),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:T.casesLinear,onChange:R,name:"casesLinear",color:"primary"}),label:o}),r.a.createElement("br",null),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:T.casesPercentage,onChange:R,name:"casesPercentage",color:"primary"}),label:s})),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement("h3",null,"Deaths"),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:T.deaths,onChange:R,name:"deaths",color:"primary"}),label:"Actual Deaths"}),r.a.createElement("br",null),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:T.deathsLinear,onChange:R,name:"deathsLinear",color:"primary"}),label:i}),r.a.createElement("br",null),r.a.createElement(oe.a,{control:r.a.createElement(ie.a,{checked:T.deathsPercentage,onChange:R,name:"deathsPercentage",color:"primary"}),label:u}))),r.a.createElement(E.a,{item:!0,xs:12,sm:9,style:{overflow:"scroll",height:800}},r.a.createElement(E.a,{container:!0,spacing:3},r.a.createElement(E.a,{item:!0,xs:12,sm:12},r.a.createElement(te.g,{width:"100%",aspect:15/9},r.a.createElement(te.f,{data:H,margin:{top:5,right:30,left:20,bottom:5}},r.a.createElement(te.i,{dataKey:"dateUnix",domain:["auto","auto"],name:"Date",tickFormatter:function(e){return ve.a.unix(e).format("YYYY-MM-DD")},type:"number"}),r.a.createElement(te.j,null),r.a.createElement(te.h,null),r.a.createElement(te.d,{layout:"horizontal",verticalAlign:"top",align:"center"}),T.cases&&r.a.createElement(te.e,{name:"Actual Cases",type:"monotone",dataKey:"cases",stroke:"#f80",strokeWidth:2,dot:r.a.createElement("div",null)}),T.casesLinear&&r.a.createElement(te.e,{name:o,type:"monotone",dataKey:"casesLinear",strokeDasharray:"5 5",stroke:"#f80",strokeWidth:2,dot:r.a.createElement("div",null)}),T.casesPercentage&&r.a.createElement(te.e,{name:s,type:"monotone",dataKey:"casesPercentage",strokeDasharray:"5 5",stroke:"#f80",strokeWidth:2,dot:r.a.createElement("div",null)}),T.deaths&&r.a.createElement(te.e,{name:"Actual Deaths",type:"monotone",dataKey:"deaths",stroke:"#e33",strokeWidth:2,dot:r.a.createElement("div",null)}),T.deathsLinear&&r.a.createElement(te.e,{name:i,type:"monotone",dataKey:"deathsLinear",stroke:"#e33",strokeDasharray:"5 5",strokeWidth:2,dot:r.a.createElement("div",null)}),T.deathsPercentage&&r.a.createElement(te.e,{name:u,type:"monotone",dataKey:"deathsPercentage",stroke:"#e33",strokeDasharray:"5 5",strokeWidth:2,dot:r.a.createElement("div",null)})))))))))},ye=a(42),Ee=Object(ye.a)();Ee.listen((function(e){o.a.set({page:e.pathname}),o.a.pageview(e.pathname)}));var Ce=function(e){return Object(n.useEffect)((function(){o.a.pageview(window.location.pathname)})),r.a.createElement(u.b,{history:Ee},r.a.createElement(u.c,null,r.a.createElement(u.a,{exact:!0,path:"/",component:K}),r.a.createElement(u.a,{exact:!0,path:"/by-country",component:ue}),r.a.createElement(u.a,{exact:!0,path:"/by-state",component:fe}),r.a.createElement(u.a,{exact:!0,path:"/projections",component:ge})))},je=a(177),Se=a(176),Oe=a(381);var ke=Object(Oe.a)((function(){var e=Object(n.useState)(0),t=Object(p.a)(e,2),a=t[0],r=t[1],c=function(){setTimeout((function(){window.scrollTo({behavior:"smooth",top:0})}),100)},l=["/analyze/business","/analyze/revenue","/analyze/service","/analyze/google","/analyze/analyzing","/analyze/result"],o=Object(n.useState)(!1),i=Object(p.a)(o,1)[0],s=Object(n.useState)(""),u=Object(p.a)(s,2),m=u[0],d=u[1],h=Object(n.useState)(!1),f=Object(p.a)(h,2),v=f[0],b=f[1],g=Object(n.useState)(""),y=Object(p.a)(g,2),E=y[0],C=y[1],j=Object(n.useState)(""),S=Object(p.a)(j,2),O=S[0],k=S[1],x=Object(n.useState)(""),P=Object(p.a)(x,2),w=P[0],N=P[1],I=Object(n.useState)(""),D=Object(p.a)(I,2),A=D[0],B=D[1],W=Object(n.useState)(""),T=Object(p.a)(W,2),z=T[0],M=T[1],L=Object(n.useState)(!1),R=Object(p.a)(L,2),K=R[0],U=R[1],F=Object(n.useState)(!1),H=Object(p.a)(F,2),Z=H[0],Q=H[1],V=function(e){Q(!1)},$=Object(n.useState)(""),_=Object(p.a)($,2),q=_[0],J=_[1],X=Object(n.useState)(!1),ee=Object(p.a)(X,2),te=ee[0],ae=ee[1],ne=function(){var e=Object(Y.a)(G.a.mark((function e(){return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,be("");case 2:return e.next=4,Ce(0);case 4:return e.next=6,ke("");case 6:return e.next=8,Be("");case 8:return e.next=10,Ue("");case 10:return e.next=12,$e("");case 12:return e.next=14,Xe("");case 14:return e.next=16,nt("");case 16:return e.next=18,me(-1);case 18:de();case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),re=Object(n.useState)([]),ce=Object(p.a)(re,2),le=ce[0],oe=ce[1],ie=Object(n.useState)(-1),se=Object(p.a)(ie,2),ue=se[0],me=se[1],de=function(e){Q(!0)},he=Object(n.useState)(""),fe=Object(p.a)(he,2),pe=fe[0],be=fe[1],ge=Object(n.useState)(0),ye=Object(p.a)(ge,2),Ee=ye[0],Ce=ye[1],je=Object(n.useState)(""),Se=Object(p.a)(je,2),Oe=Se[0],ke=Se[1],xe=Object(n.useState)(!1),Pe=Object(p.a)(xe,2),we=Pe[0],Ne=Pe[1],Ie=Object(n.useState)(""),De=Object(p.a)(Ie,2),Ae=De[0],Be=De[1],We=Object(n.useState)(!1),Te=Object(p.a)(We,2),ze=Te[0],Me=Te[1],Le=Object(n.useState)(""),Re=Object(p.a)(Le,2),Ke=Re[0],Ue=Re[1],Ge=Object(n.useState)(!1),Ye=Object(p.a)(Ge,2),Fe=Ye[0],He=Ye[1],Ze=Object(n.useState)(""),Qe=Object(p.a)(Ze,2),Ve=Qe[0],$e=Qe[1],_e=Object(n.useState)(""),qe=Object(p.a)(_e,2),Je=qe[0],Xe=qe[1],et=Object(n.useState)(""),tt=Object(p.a)(et,2),at=tt[0],nt=tt[1],rt=Object(n.useState)(!1),ct=Object(p.a)(rt,2),lt=ct[0],ot=ct[1],it=function(e){ot(!1)},st=function(){var e=Object(Y.a)(G.a.mark((function e(){return G.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,jt("");case 2:return e.next=4,xt("");case 4:return e.next=6,It("");case 6:return e.next=8,Lt("");case 8:return e.next=10,Zt("");case 10:return e.next=12,ea(0);case 12:return e.next=14,bt(-1);case 14:gt();case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ut=Object(n.useState)([]),mt=Object(p.a)(ut,2),dt=mt[0],ht=mt[1],ft=Object(n.useState)(-1),pt=Object(p.a)(ft,2),vt=pt[0],bt=pt[1],gt=function(e){ot(!0)},yt=Object(n.useState)(""),Et=Object(p.a)(yt,2),Ct=Et[0],jt=Et[1],St=Object(n.useState)(""),Ot=Object(p.a)(St,2),kt=Ot[0],xt=Ot[1],Pt=Object(n.useState)(""),wt=Object(p.a)(Pt,2),Nt=wt[0],It=wt[1],Dt=Object(n.useState)(!1),At=Object(p.a)(Dt,2),Bt=At[0],Wt=At[1],Tt=Object(n.useState)(""),zt=Object(p.a)(Tt,2),Mt=zt[0],Lt=zt[1],Rt=Object(n.useState)(!1),Kt=Object(p.a)(Rt,2),Ut=Kt[0],Gt=Kt[1],Yt=Object(n.useState)(""),Ft=Object(p.a)(Yt,2),Ht=Ft[0],Zt=Ft[1],Qt=Object(n.useState)(!1),Vt=Object(p.a)(Qt,2),$t=Vt[0],_t=Vt[1],qt=Object(n.useState)(""),Jt=Object(p.a)(qt,2),Xt=Jt[0],ea=Jt[1],ta=Object(n.useState)({}),aa=Object(p.a)(ta,2),na=aa[0],ra=aa[1];return{activeStep:a,setActiveStep:r,handleNext:function(e){e.history.push(l[a+1]),r(a+1),c()},handleBack:function(e){e.history.push(l[a-1]),5===a?e.history.push("/analyze/google"):r(a-1),c()},loading:i,url:m,handleUrlChange:function(e){return d(e.target.value)},urlInvalid:v,handleUrlBlur:function(){if(m){var e=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(String(m).toLowerCase());b(!e)}},industry:E,handleIndustryChange:function(e){return C(e)},businessType:O,handleBusinessTypeChange:function(e){return k(e.target.value)},businessSeasonality:w,handleBusinessSeasonalityChange:function(e){return N(e.target.value)},contactName:A,handleContactNameChange:function(e){return B(e.target.value)},contactEmail:z,handleContactEmailChange:function(e){return M(e.target.value)},contactEmailInvalid:K,handleContactEmailBlur:function(){if(z){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(z).toLowerCase());U(!e)}},revenueDialog:Z,closeRevenueDialog:V,annualRevenue:q,handleAnnualRevenueChange:function(e){return J(e.target.value)},annualRevenueInvalid:te,handleAnnualRevenueBlur:function(){if(q){var e=q.replace(/[,]+/g,"").trim(),t=parseInt(e);isNaN(t)||J(t),ae(!Number.isInteger(t))}},handleAddProduct:ne,handleDeleteProduct:function(e){return function(){oe(le.filter((function(t,a){return e!==a})))}},handleEditProduct:function(e){return function(){var t=le[e];be(t.name),Ce(t.percentage),ke(t.revenuePerTransaction),Be(t.profitMargin),Ue(t.quantitySold),$e(t.customerType),Xe(t.purchaseTimes),nt(t.purchaseInterval),me(e),de()}},productArray:le,currentProductIndex:ue,handleProductSubmit:function(e){var t={name:pe,percentage:Ee,revenuePerTransaction:Oe,profitMargin:Ae,quantitySold:Ke,customerType:Ve,purchaseTimes:Je,purchaseInterval:at};if(ue<0)oe(le.concat([t]));else{var a=le;a[ue]=t,oe(a)}V()},currentProductName:pe,handleCurrentProductNameChange:function(e){return be(e.target.value)},currentProductPercentage:Ee,handleCurrentProductPercentageChange:function(e,t){return Ce(t)},currentProductRevenuePerTransaction:Oe,handleCurrentProductRevenuePerTransactionChange:function(e){return ke(e.target.value)},currentProductRevenuePerTransactionInvalid:we,handleCurrentProductRevenuePerTransactionBlur:function(){if(Oe){var e=Oe.replace(/[,]+/g,"").trim(),t=parseInt(e);isNaN(t)||ke(t),Ne(!Number.isInteger(t))}},currentProductProfitMargin:Ae,handleCurrentProductProfitMarginChange:function(e){return Be(e.target.value)},currentProductProfitMarginInvalid:ze,handleCurrentProductProfitMarginBlur:function(){if(Ae){var e=Ae.replace(/[,]+/g,"").trim(),t=parseInt(e);isNaN(t)||Be(t),Me(!Number.isInteger(t))}},currentProductQuantitySold:Ke,handleCurrentProductQuantitySoldChange:function(e){return Ue(e.target.value)},currentProductQuantitySoldInvalid:Fe,handleCurrentProductQuantitySoldBlur:function(){if(Ke){var e=Ke.replace(/[,]+/g,"").trim(),t=parseInt(e);isNaN(t)||Ue(t),He(!Number.isInteger(t))}},currentProductCustomerType:Ve,handleCurrentProductCustomerTypeChange:function(e){return $e(e.target.value)},currentProductPurchaseTimes:Je,handleCurrentProductPurchaseTimesChange:function(e){return Xe(e.target.value)},currentProductPurchaseInterval:at,handleCurrentProductPurchaseIntervalChange:function(e){return nt(e.target.value)},serviceDialog:lt,closeServiceDialog:it,handleAddService:st,handleDeleteService:function(e){return function(){ht(dt.filter((function(t,a){return e!==a})))}},handleEditService:function(e){return function(){var t=dt[e];jt(t.type),xt(t.providerName),It(t.providerUrl),Lt(t.billingPerMonth),Zt(t.startedAt),ea(t.rating),bt(e),gt()}},serviceArray:dt,currentServiceIndex:vt,handleServiceSubmit:function(e){var t={type:Ct,providerName:kt,providerUrl:Nt,billingPerMonth:Mt,startedAt:Ht,rating:Xt};if(vt<0)ht(dt.concat([t]));else{var a=dt;a[vt]=t,ht(a)}it()},currentServiceType:Ct,handleCurrentServiceTypeChange:function(e){return jt(e.target.value)},currentServiceProviderName:kt,handleCurrentServiceProviderNameChange:function(e){return xt(e.target.value)},currentServiceProviderUrl:Nt,handleCurrentServiceProviderUrlChange:function(e){return It(e.target.value)},currentServiceProviderUrlInvalid:Bt,handleCurrentServiceProviderUrlBlur:function(){if(Nt){var e=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(String(Nt).toLowerCase());Wt(!e)}},currentServiceBillingPerMonth:Mt,handleCurrentServiceBillingPerMonthChange:function(e){return Lt(e.target.value)},currentServiceBillingPerMonthInvalid:Ut,handleCurrentServiceBillingPerMonthBlur:function(){if(Mt){var e=Mt.replace(/[,]+/g,"").trim(),t=parseInt(e);isNaN(t)||Lt(t),Gt(!Number.isInteger(t))}},currentServiceStartedAt:Ht,handleCurrentServiceStartedAtChange:function(e){return Zt(e.target.value)},currentServiceStartedAtInvalid:$t,handleCurrentServiceStartedAtBlur:function(){if(Ht){var e=ve()(Ht);_t(!e.isValid())}},currentServiceRating:Xt,handleCurrentServiceRatingChange:function(e,t){return ea(t)},timeline:na,handleTimelineChange:function(e){ra(e)}}})),xe=Object(i.a)({palette:{secondary:{main:je.a[900]},primary:{main:Se.a[700]}},typography:{useNextVariants:!0,fontFamily:['"Lato"',"sans-serif"].join(",")}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.initialize("UA-144299383-1"),l.a.render(r.a.createElement((function(){return r.a.createElement(ke.Provider,null,r.a.createElement(s.a,{theme:xe},r.a.createElement(Ce,null)))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[423,1,2]]]);
//# sourceMappingURL=main.bc829e06.chunk.js.map