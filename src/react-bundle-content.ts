// AUTO-GENERATED — do not edit manually.
// Run: npm run build:react-embed to regenerate.

export const REACT_BUNDLE_JS = `(function(E,tr){"use strict";var ne={exports:{}},ee={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ke;function ar(){if(ke)return ee;ke=1;var t=E,s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,n=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function o(d,m,b){var N,g={},x=null,A=null;b!==void 0&&(x=""+b),m.key!==void 0&&(x=""+m.key),m.ref!==void 0&&(A=m.ref);for(N in m)a.call(m,N)&&!l.hasOwnProperty(N)&&(g[N]=m[N]);if(d&&d.defaultProps)for(N in m=d.defaultProps,m)g[N]===void 0&&(g[N]=m[N]);return{\$\$typeof:s,type:d,key:x,ref:A,props:g,_owner:n.current}}return ee.Fragment=i,ee.jsx=o,ee.jsxs=o,ee}var re={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var we;function sr(){return we||(we=1,process.env.NODE_ENV!=="production"&&(function(){var t=E,s=Symbol.for("react.element"),i=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),o=Symbol.for("react.provider"),d=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),N=Symbol.for("react.suspense_list"),g=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),A=Symbol.for("react.offscreen"),M=Symbol.iterator,k="@@iterator";function h(r){if(r===null||typeof r!="object")return null;var c=M&&r[M]||r[k];return typeof c=="function"?c:null}var j=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function u(r){{for(var c=arguments.length,p=new Array(c>1?c-1:0),f=1;f<c;f++)p[f-1]=arguments[f];\$("error",r,p)}}function \$(r,c,p){{var f=j.ReactDebugCurrentFrame,P=f.getStackAddendum();P!==""&&(c+="%s",p=p.concat([P]));var _=p.map(function(z){return String(z)});_.unshift("Warning: "+c),Function.prototype.apply.call(console[r],console,_)}}var K=!1,v=!1,C=!1,F=!1,T=!1,U;U=Symbol.for("react.module.reference");function Rt(r){return!!(typeof r=="string"||typeof r=="function"||r===a||r===l||T||r===n||r===b||r===N||F||r===A||K||v||C||typeof r=="object"&&r!==null&&(r.\$\$typeof===x||r.\$\$typeof===g||r.\$\$typeof===o||r.\$\$typeof===d||r.\$\$typeof===m||r.\$\$typeof===U||r.getModuleId!==void 0))}function Ft(r,c,p){var f=r.displayName;if(f)return f;var P=c.displayName||c.name||"";return P!==""?p+"("+P+")":p}function Ee(r){return r.displayName||"Context"}function J(r){if(r==null)return null;if(typeof r.tag=="number"&&u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r;switch(r){case a:return"Fragment";case i:return"Portal";case l:return"Profiler";case n:return"StrictMode";case b:return"Suspense";case N:return"SuspenseList"}if(typeof r=="object")switch(r.\$\$typeof){case d:var c=r;return Ee(c)+".Consumer";case o:var p=r;return Ee(p._context)+".Provider";case m:return Ft(r,r.render,"ForwardRef");case g:var f=r.displayName||null;return f!==null?f:J(r.type)||"Memo";case x:{var P=r,_=P._payload,z=P._init;try{return J(z(_))}catch{return null}}}return null}var H=Object.assign,se=0,Re,Fe,Oe,Ie,De,Ve,qe;function Le(){}Le.__reactDisabledLog=!0;function Ot(){{if(se===0){Re=console.log,Fe=console.info,Oe=console.warn,Ie=console.error,De=console.group,Ve=console.groupCollapsed,qe=console.groupEnd;var r={configurable:!0,enumerable:!0,value:Le,writable:!0};Object.defineProperties(console,{info:r,log:r,warn:r,error:r,group:r,groupCollapsed:r,groupEnd:r})}se++}}function It(){{if(se--,se===0){var r={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:H({},r,{value:Re}),info:H({},r,{value:Fe}),warn:H({},r,{value:Oe}),error:H({},r,{value:Ie}),group:H({},r,{value:De}),groupCollapsed:H({},r,{value:Ve}),groupEnd:H({},r,{value:qe})})}se<0&&u("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var xe=j.ReactCurrentDispatcher,fe;function oe(r,c,p){{if(fe===void 0)try{throw Error()}catch(P){var f=P.stack.trim().match(/\\n( *(at )?)/);fe=f&&f[1]||""}return\`
\`+fe+r}}var be=!1,le;{var Dt=typeof WeakMap=="function"?WeakMap:Map;le=new Dt}function Be(r,c){if(!r||be)return"";{var p=le.get(r);if(p!==void 0)return p}var f;be=!0;var P=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var _;_=xe.current,xe.current=null,Ot();try{if(c){var z=function(){throw Error()};if(Object.defineProperty(z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(z,[])}catch(L){f=L}Reflect.construct(r,[],z)}else{try{z.call()}catch(L){f=L}r.call(z.prototype)}}else{try{throw Error()}catch(L){f=L}r()}}catch(L){if(L&&f&&typeof L.stack=="string"){for(var y=L.stack.split(\`
\`),V=f.stack.split(\`
\`),O=y.length-1,D=V.length-1;O>=1&&D>=0&&y[O]!==V[D];)D--;for(;O>=1&&D>=0;O--,D--)if(y[O]!==V[D]){if(O!==1||D!==1)do if(O--,D--,D<0||y[O]!==V[D]){var Z=\`
\`+y[O].replace(" at new "," at ");return r.displayName&&Z.includes("<anonymous>")&&(Z=Z.replace("<anonymous>",r.displayName)),typeof r=="function"&&le.set(r,Z),Z}while(O>=1&&D>=0);break}}}finally{be=!1,xe.current=_,It(),Error.prepareStackTrace=P}var Q=r?r.displayName||r.name:"",G=Q?oe(Q):"";return typeof r=="function"&&le.set(r,G),G}function Vt(r,c,p){return Be(r,!1)}function qt(r){var c=r.prototype;return!!(c&&c.isReactComponent)}function ce(r,c,p){if(r==null)return"";if(typeof r=="function")return Be(r,qt(r));if(typeof r=="string")return oe(r);switch(r){case b:return oe("Suspense");case N:return oe("SuspenseList")}if(typeof r=="object")switch(r.\$\$typeof){case m:return Vt(r.render);case g:return ce(r.type,c,p);case x:{var f=r,P=f._payload,_=f._init;try{return ce(_(P),c,p)}catch{}}}return""}var ie=Object.prototype.hasOwnProperty,Me={},Ze=j.ReactDebugCurrentFrame;function de(r){if(r){var c=r._owner,p=ce(r.type,r._source,c?c.type:null);Ze.setExtraStackFrame(p)}else Ze.setExtraStackFrame(null)}function Lt(r,c,p,f,P){{var _=Function.call.bind(ie);for(var z in r)if(_(r,z)){var y=void 0;try{if(typeof r[z]!="function"){var V=Error((f||"React class")+": "+p+" type \`"+z+"\` is invalid; it must be a function, usually from the \`prop-types\` package, but received \`"+typeof r[z]+"\`.This often happens because of typos such as \`PropTypes.function\` instead of \`PropTypes.func\`.");throw V.name="Invariant Violation",V}y=r[z](c,z,f,p,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(O){y=O}y&&!(y instanceof Error)&&(de(P),u("%s: type specification of %s \`%s\` is invalid; the type checker function must return \`null\` or an \`Error\` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",f||"React class",p,z,typeof y),de(null)),y instanceof Error&&!(y.message in Me)&&(Me[y.message]=!0,de(P),u("Failed %s type: %s",p,y.message),de(null))}}}var Bt=Array.isArray;function ge(r){return Bt(r)}function Mt(r){{var c=typeof Symbol=="function"&&Symbol.toStringTag,p=c&&r[Symbol.toStringTag]||r.constructor.name||"Object";return p}}function Zt(r){try{return \$e(r),!1}catch{return!0}}function \$e(r){return""+r}function Ue(r){if(Zt(r))return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Mt(r)),\$e(r)}var We=j.ReactCurrentOwner,\$t={key:!0,ref:!0,__self:!0,__source:!0},Ye,Ke;function Ut(r){if(ie.call(r,"ref")){var c=Object.getOwnPropertyDescriptor(r,"ref").get;if(c&&c.isReactWarning)return!1}return r.ref!==void 0}function Wt(r){if(ie.call(r,"key")){var c=Object.getOwnPropertyDescriptor(r,"key").get;if(c&&c.isReactWarning)return!1}return r.key!==void 0}function Yt(r,c){typeof r.ref=="string"&&We.current}function Kt(r,c){{var p=function(){Ye||(Ye=!0,u("%s: \`key\` is not a prop. Trying to access it will result in \`undefined\` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",c))};p.isReactWarning=!0,Object.defineProperty(r,"key",{get:p,configurable:!0})}}function Jt(r,c){{var p=function(){Ke||(Ke=!0,u("%s: \`ref\` is not a prop. Trying to access it will result in \`undefined\` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",c))};p.isReactWarning=!0,Object.defineProperty(r,"ref",{get:p,configurable:!0})}}var Ht=function(r,c,p,f,P,_,z){var y={\$\$typeof:s,type:r,key:c,ref:p,props:z,_owner:_};return y._store={},Object.defineProperty(y._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(y,"_self",{configurable:!1,enumerable:!1,writable:!1,value:f}),Object.defineProperty(y,"_source",{configurable:!1,enumerable:!1,writable:!1,value:P}),Object.freeze&&(Object.freeze(y.props),Object.freeze(y)),y};function Gt(r,c,p,f,P){{var _,z={},y=null,V=null;p!==void 0&&(Ue(p),y=""+p),Wt(c)&&(Ue(c.key),y=""+c.key),Ut(c)&&(V=c.ref,Yt(c,P));for(_ in c)ie.call(c,_)&&!\$t.hasOwnProperty(_)&&(z[_]=c[_]);if(r&&r.defaultProps){var O=r.defaultProps;for(_ in O)z[_]===void 0&&(z[_]=O[_])}if(y||V){var D=typeof r=="function"?r.displayName||r.name||"Unknown":r;y&&Kt(z,D),V&&Jt(z,D)}return Ht(r,y,V,P,f,We.current,z)}}var ve=j.ReactCurrentOwner,Je=j.ReactDebugCurrentFrame;function X(r){if(r){var c=r._owner,p=ce(r.type,r._source,c?c.type:null);Je.setExtraStackFrame(p)}else Je.setExtraStackFrame(null)}var je;je=!1;function Ne(r){return typeof r=="object"&&r!==null&&r.\$\$typeof===s}function He(){{if(ve.current){var r=J(ve.current.type);if(r)return\`

Check the render method of \\\`\`+r+"\`."}return""}}function Xt(r){return""}var Ge={};function Qt(r){{var c=He();if(!c){var p=typeof r=="string"?r:r.displayName||r.name;p&&(c=\`

Check the top-level render call using <\`+p+">.")}return c}}function Xe(r,c){{if(!r._store||r._store.validated||r.key!=null)return;r._store.validated=!0;var p=Qt(c);if(Ge[p])return;Ge[p]=!0;var f="";r&&r._owner&&r._owner!==ve.current&&(f=" It was passed a child from "+J(r._owner.type)+"."),X(r),u('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',p,f),X(null)}}function Qe(r,c){{if(typeof r!="object")return;if(ge(r))for(var p=0;p<r.length;p++){var f=r[p];Ne(f)&&Xe(f,c)}else if(Ne(r))r._store&&(r._store.validated=!0);else if(r){var P=h(r);if(typeof P=="function"&&P!==r.entries)for(var _=P.call(r),z;!(z=_.next()).done;)Ne(z.value)&&Xe(z.value,c)}}}function ea(r){{var c=r.type;if(c==null||typeof c=="string")return;var p;if(typeof c=="function")p=c.propTypes;else if(typeof c=="object"&&(c.\$\$typeof===m||c.\$\$typeof===g))p=c.propTypes;else return;if(p){var f=J(c);Lt(p,r.props,"prop",f,r)}else if(c.PropTypes!==void 0&&!je){je=!0;var P=J(c);u("Component %s declared \`PropTypes\` instead of \`propTypes\`. Did you misspell the property assignment?",P||"Unknown")}typeof c.getDefaultProps=="function"&&!c.getDefaultProps.isReactClassApproved&&u("getDefaultProps is only used on classic React.createClass definitions. Use a static property named \`defaultProps\` instead.")}}function ra(r){{for(var c=Object.keys(r.props),p=0;p<c.length;p++){var f=c[p];if(f!=="children"&&f!=="key"){X(r),u("Invalid prop \`%s\` supplied to \`React.Fragment\`. React.Fragment can only have \`key\` and \`children\` props.",f),X(null);break}}r.ref!==null&&(X(r),u("Invalid attribute \`ref\` supplied to \`React.Fragment\`."),X(null))}}var er={};function rr(r,c,p,f,P,_){{var z=Rt(r);if(!z){var y="";(r===void 0||typeof r=="object"&&r!==null&&Object.keys(r).length===0)&&(y+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var V=Xt();V?y+=V:y+=He();var O;r===null?O="null":ge(r)?O="array":r!==void 0&&r.\$\$typeof===s?(O="<"+(J(r.type)||"Unknown")+" />",y=" Did you accidentally export a JSX literal instead of a component?"):O=typeof r,u("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",O,y)}var D=Gt(r,c,p,P,_);if(D==null)return D;if(z){var Z=c.children;if(Z!==void 0)if(f)if(ge(Z)){for(var Q=0;Q<Z.length;Q++)Qe(Z[Q],r);Object.freeze&&Object.freeze(Z)}else u("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Qe(Z,r)}if(ie.call(c,"key")){var G=J(r),L=Object.keys(c).filter(function(oa){return oa!=="key"}),ye=L.length>0?"{key: someKey, "+L.join(": ..., ")+": ...}":"{key: someKey}";if(!er[G+ye]){var na=L.length>0?"{"+L.join(": ..., ")+": ...}":"{}";u(\`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />\`,ye,G,na,G),er[G+ye]=!0}}return r===a?ra(D):ea(D),D}}function ta(r,c,p){return rr(r,c,p,!0)}function aa(r,c,p){return rr(r,c,p,!1)}var sa=aa,ia=ta;re.Fragment=a,re.jsx=sa,re.jsxs=ia})()),re}var ze;function ir(){return ze||(ze=1,process.env.NODE_ENV==="production"?ne.exports=ar():ne.exports=sr()),ne.exports}var e=ir();const Se=E.createContext({theme:"dark",toggleTheme:()=>{}});function q(){return E.useContext(Se)}function nr({children:t}){const[s,i]=E.useState(()=>typeof window<"u"&&localStorage.getItem("tf-theme")||"dark"),a=E.useCallback(()=>{const n=s==="dark"?"light":"dark";i(n),localStorage.setItem("tf-theme",n),document.documentElement.setAttribute("data-bs-theme",n),document.documentElement.setAttribute("data-tf-theme",n)},[s]);return e.jsx(Se.Provider,{value:{theme:s,toggleTheme:a},children:t})}const or={xs:"fs-6",sm:"",md:"fs-5",lg:"fs-4",xl:"fs-3"};function w({name:t,size:s,color:i,className:a}){const l=["bi",t.startsWith("bi-")?t:\`bi-\${t}\`,s?or[s]:"",a].filter(Boolean).join(" ");return e.jsx("i",{className:l,style:i?{color:i}:void 0})}const lr={default:"",success:"success",warning:"warning",info:"info",danger:"danger"};function W({children:t,variant:s="default",icon:i,className:a}){const n=["status-badge",lr[s],a].filter(Boolean).join(" ");return e.jsxs("span",{className:n,children:[i&&e.jsx(w,{name:i,className:"me-1"}),t]})}function cr({children:t}){return e.jsx("span",{className:"admin-nav-badge",children:t})}const dr={xs:{width:28,height:28,fontSize:"0.8rem"},sm:{width:32,height:32,fontSize:"0.9rem"},md:{width:40,height:40,fontSize:"1.1rem"},lg:{width:48,height:48,fontSize:"1.25rem"},xl:{width:56,height:56,fontSize:"1.4rem"}};function mr({size:t="md",className:s}){const{toggleTheme:i}=q(),a=["btn-theme-toggle",s].filter(Boolean).join(" ");return e.jsxs("button",{className:a,style:dr[t],onClick:i,title:"Přepnout téma",children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}const hr=[{title:"Hlavní",items:[{path:"/admin",icon:"grid-1x2",label:"Dashboard"},{path:"/admin/analytics",icon:"bar-chart",label:"Analytika"}]},{title:"E-Shop",items:[{path:"/admin/orders",icon:"cart3",label:"Objednávky",badge:"12"},{path:"/admin/products",icon:"box-seam",label:"Produkty"},{path:"/admin/categories",icon:"folder",label:"Kategorie"}]},{title:"Obsah",items:[{path:"/admin/blog",icon:"journal-richtext",label:"Blog"},{path:"/admin/media",icon:"images",label:"Média"}]}];function pr(t){const s=t.split("/").filter(Boolean);return s.length>1?s[s.length-1]:"dashboard"}function ur({activePage:t,sections:s=hr,user:i={name:"Jan Novák",initials:"JN",role:"Administrátor"},onClose:a}){return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"sidebar-close",onClick:a,children:e.jsx(w,{name:"x-lg"})}),e.jsxs("a",{href:"/admin",className:"admin-logo",children:[e.jsx(w,{name:"braces-asterisk",className:"text-gradient"}),e.jsx("span",{className:"text-gradient",children:"TypeForge"})]}),e.jsx("nav",{className:"admin-nav",children:s.map((n,l)=>e.jsxs("div",{className:"admin-nav-section",children:[e.jsx("div",{className:"admin-nav-label",children:n.title}),n.items.map(o=>{const m=pr(o.path)===t;return e.jsxs("a",{href:o.path,className:\`admin-nav-item\${m?" active":""}\`,children:[e.jsx(w,{name:o.icon||"circle"}),e.jsx("span",{children:o.label}),o.badge&&e.jsx(cr,{children:o.badge})]},o.path)})]},l))}),e.jsxs("div",{className:"admin-user",children:[e.jsx("div",{className:"admin-user-avatar",children:i.initials}),e.jsxs("div",{className:"admin-user-info",children:[e.jsx("div",{className:"admin-user-name",children:i.name}),e.jsx("div",{className:"admin-user-role",children:i.role})]}),e.jsx(mr,{size:"sm"})]})]})}const xr={primary:"btn-primary-tf",outline:"btn-outline-tf",ghost:"btn-ghost-tf",accent:"btn-accent-tf"},fr={xs:"btn-xs",sm:"btn-sm",md:"",lg:"btn-lg",xl:"btn-xl"};function me({children:t,variant:s="primary",size:i="md",icon:a,iconRight:n,href:l,type:o="button",disabled:d=!1,fullWidth:m=!1,onClick:b,className:N}){const g=[xr[s],fr[i],m?"w-100":"",N].filter(Boolean).join(" ");return l?e.jsxs("a",{href:l,className:g,onClick:b,children:[a&&e.jsx(w,{name:a,className:n?"":"me-2"}),t,n&&e.jsx(w,{name:n,className:"ms-2"})]}):e.jsxs("button",{type:o,className:g,disabled:d,onClick:b,children:[a&&e.jsx(w,{name:a,className:n?"":"me-2"}),t,n&&e.jsx(w,{name:n,className:"ms-2"})]})}function br({placeholder:t="Hledat...",value:s,name:i,className:a,onChange:n}){const l=["admin-search",a].filter(Boolean).join(" ");return e.jsxs("div",{className:l,children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{type:"text",placeholder:t,defaultValue:s,name:i,onChange:n})]})}function B({title:t,activePage:s,children:i,subtitle:a,headerActions:n,sidebarProps:l}){const[o,d]=E.useState(!1),m=e.jsxs(e.Fragment,{children:[e.jsx(br,{}),e.jsx(me,{href:"/",variant:"outline",size:"sm",icon:"box-arrow-up-right",children:"Web"})]});return e.jsxs("div",{className:"admin-wrapper",children:[o&&e.jsx("div",{className:"sidebar-overlay open",onClick:()=>d(!1)}),e.jsx("aside",{className:\`admin-sidebar\${o?" open":""}\`,children:e.jsx(ur,{activePage:s,onClose:()=>d(!1),...l})}),e.jsxs("main",{className:"admin-main",children:[e.jsxs("div",{className:"admin-header",children:[e.jsxs("div",{children:[e.jsx("button",{className:"mobile-menu-btn",onClick:()=>d(!0),children:e.jsx(w,{name:"list"})}),e.jsx("h1",{className:"admin-title",children:t})]}),e.jsx("div",{className:"admin-header-actions",children:n||m})]}),i]})]})}const gr={purple:"purple",green:"green",blue:"blue",orange:"orange",muted:"",primary:"purple",accent:"green"};function vr({icon:t,iconColor:s="purple",value:i,label:a,change:n,className:l}){const o=["stat-card",l].filter(Boolean).join(" ");return e.jsxs("div",{className:o,children:[e.jsxs("div",{className:"stat-header",children:[e.jsx("div",{className:\`stat-icon \${gr[s]}\`,children:e.jsx(w,{name:t})}),n&&e.jsxs("div",{className:\`stat-change \${n.direction}\`,children:[e.jsx(w,{name:\`arrow-\${n.direction}\`})," ",n.value]})]}),e.jsx("div",{className:"stat-value",children:i}),e.jsx("div",{className:"stat-label",children:a})]})}function Pe({stats:t,columns:s=4}){const i=s===2?"col-md-6":s===3?"col-md-4":"col-md-6 col-lg-3";return e.jsx("div",{className:"row g-4 mb-4",children:t.map((a,n)=>e.jsx("div",{className:i,children:e.jsx(vr,{...a})},n))})}function R({children:t,title:s,headerRight:i,className:a}){const n=["card-section",a].filter(Boolean).join(" "),l=s||i;return e.jsxs("div",{className:n,children:[l&&e.jsxs("div",{className:"card-section-header",children:[s&&e.jsx("h5",{className:"card-section-title",children:s}),i]}),t]})}function S(t){if(isNaN(t))return"0,00 Kč";const i=(Math.round(t*100)/100).toFixed(2),[a,n]=i.split(".");let l="";for(let o=0;o<a.length;o++)o>0&&(a.length-o)%3===0&&(l+=" "),l+=a[o];return l+","+n+" Kč"}function Y(t){if(!t||t.length<10)return"-";const s=t.substring(0,4),i=t.substring(5,7),a=t.substring(8,10),n=Number(a),l=Number(i);return n>0&&l>0?\`\${n}. \${l}. \${s}\`:"-"}const jr={active:"Aktivní",inactive:"Neaktivní",soldout:"Vyprodáno"},Nr={active:"success",inactive:"warning",soldout:"danger"};function yr(t){return jr[t]??t}function kr(t){return Nr[t]??"default"}const wr={pending:"Čekající",processing:"Zpracování",shipped:"Odesláno",completed:"Dokončeno",cancelled:"Zrušeno"},zr={pending:"warning",processing:"info",shipped:"info",completed:"success",cancelled:"danger"};function he(t){return wr[t]??t}function pe(t){return zr[t]??"default"}const Sr={published:"Publikováno",draft:"Koncept",archived:"Archivováno"},Pr={published:"success",draft:"warning",archived:"default"};function Cr(t){return Sr[t]??t}function Tr(t){return Pr[t]??"default"}function _r(t){return t==="active"?"Aktivní":"Neaktivní"}function Ar(t){return t==="active"?"success":"warning"}function ue(t){var n,l,o,d;if(!t)return"??";const s=t.trim().split(/\\s+/),i=((l=(n=s[0])==null?void 0:n[0])==null?void 0:l.toUpperCase())??"",a=((d=(o=s[1])==null?void 0:o[0])==null?void 0:d.toUpperCase())??"";return i+a||i||"??"}const Er=[{value:"active",label:"Aktivní"},{value:"inactive",label:"Neaktivní"},{value:"soldout",label:"Vyprodáno"}],Rr=[{value:"pending",label:"Čekající"},{value:"processing",label:"Zpracování"},{value:"shipped",label:"Odesláno"},{value:"completed",label:"Dokončeno"},{value:"cancelled",label:"Zrušeno"}],Fr=[{value:"published",label:"Publikováno"},{value:"draft",label:"Koncept"},{value:"archived",label:"Archivováno"}],Or=[{value:"active",label:"Aktivní"},{value:"inactive",label:"Neaktivní"}];function Ir({stats:t,recentOrders:s,lowStockProducts:i}){return e.jsxs(B,{title:"Dashboard",activePage:"dashboard",children:[e.jsx(Pe,{stats:t}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(R,{title:"Poslední objednávky",children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Objednávka"}),e.jsx("th",{children:"Zákazník"}),e.jsx("th",{style:{textAlign:"right"},children:"Částka"}),e.jsx("th",{children:"Stav"}),e.jsx("th",{children:"Datum"})]})}),e.jsx("tbody",{children:s.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center text-muted-tf py-4",children:"Žádné objednávky"})}):s.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("a",{href:\`/admin/orders/detail?id=\${a.id}\`,className:"order-id",children:a.orderNumber})}),e.jsx("td",{children:e.jsxs("div",{className:"order-customer",children:[e.jsx("div",{className:"order-avatar",children:ue(a.customerName)}),a.customerName]})}),e.jsx("td",{style:{textAlign:"right"},children:S(Number(a.totalAmount))}),e.jsx("td",{children:e.jsx(W,{variant:pe(a.status),children:he(a.status)})}),e.jsx("td",{children:Y(a.createdAt)})]},a.id))})]})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(R,{title:"Nízký sklad",children:i.length===0?e.jsx("p",{className:"text-muted-tf",children:"Žádné produkty s nízkým skladem"}):i.map(a=>e.jsxs("div",{className:"d-flex justify-content-between align-items-center py-2",style:{borderBottom:"1px solid var(--tf-border)"},children:[e.jsx("a",{href:\`/admin/products/edit?id=\${a.id}\`,style:{color:"var(--tf-text)",textDecoration:"none"},children:a.name}),e.jsxs(W,{variant:"danger",children:[a.stock," ks"]})]},a.id))})})]})]})}function Dr({stats:t}){return e.jsxs(B,{title:"Analytika",activePage:"analytics",children:[e.jsx(Pe,{stats:t}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(R,{title:"Přehled tržeb",children:e.jsx("div",{className:"chart-placeholder",children:e.jsx("i",{className:"bi bi-bar-chart"})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(R,{title:"Top produkty",children:e.jsx("div",{className:"chart-placeholder",children:e.jsx("i",{className:"bi bi-pie-chart"})})})})]})]})}function I({children:t,label:s,required:i,error:a,hint:n,className:l}){const o=["form-group",a?"has-error":"",l].filter(Boolean).join(" ");return e.jsxs("div",{className:o,children:[s&&e.jsxs("label",{className:"form-label",children:[s,i&&e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),t,a&&e.jsx("div",{className:"form-error text-danger small mt-1",children:a}),!a&&n&&e.jsx("div",{className:"form-hint text-muted-tf small mt-1",children:n})]})}function te({options:t,name:s,value:i,placeholder:a,disabled:n,required:l,label:o,filter:d=!1,className:m,onChange:b}){const N=[d?"filter-select":"form-control",m].filter(Boolean).join(" "),g=e.jsxs("select",{name:s,disabled:n,required:l,className:N,onChange:b,defaultValue:i??"",children:[a&&e.jsx("option",{value:"",disabled:!0,children:a}),t.map(x=>e.jsx("option",{value:x.value,children:x.label},x.value))]});return o&&!d?e.jsx(I,{label:o,required:l,children:g}):g}function Ce({open:t,message:s,onConfirm:i,onCancel:a}){return t?e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:a}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"2rem",maxWidth:400,width:"90%",textAlign:"center"},children:[e.jsx("p",{style:{marginBottom:"1.5rem",fontSize:"1rem"},children:s}),e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"center"},children:[e.jsx("button",{className:"btn-outline-tf btn-sm",onClick:a,style:{padding:"0.5rem 1.5rem",borderRadius:8},children:"Zrušit"}),e.jsx("button",{className:"btn-primary-tf btn-sm",onClick:i,style:{padding:"0.5rem 1.5rem",borderRadius:8},children:"Potvrdit"})]})]})]}):null}function ae({columns:t,rows:s,actions:i,filters:a,addButton:n,emptyMessage:l="Žádné záznamy",className:o}){const[d,m]=E.useState(null),b=a&&a.length>0,N=i&&i.length>0,g=b||!!n,x=t.length+(N?1:0),A=k=>h=>{const j=new URLSearchParams(window.location.search),u=h.target.value;u?j.set(k,u):j.delete(k),window.location.search=j.toString()},M=(k,h)=>j=>{k.confirm&&(j.preventDefault(),m({url:k.href(h),message:k.confirm}))};return e.jsxs(e.Fragment,{children:[g&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"filter-bar mb-0",children:b&&a.map(k=>{const h=k.placeholder?[{value:"",label:k.placeholder},...k.options]:k.options;return e.jsx(te,{filter:!0,options:h,name:k.name,value:k.value,onChange:A(k.name)},k.name)})}),n&&e.jsxs("a",{href:n.href,className:"btn-add",children:[e.jsx(w,{name:"plus-lg"})," ",n.label]})]}),e.jsx(R,{className:o,children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[t.map(k=>e.jsx("th",{style:{width:k.width,textAlign:k.align},children:k.label},k.key)),N&&e.jsx("th",{children:"Akce"})]})}),e.jsx("tbody",{children:s.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:x,className:"text-center text-muted-tf py-4",children:l})}):s.map((k,h)=>e.jsxs("tr",{children:[t.map(j=>{const u=k[j.key]??"",\$=j.render?j.render(u,k):u;return e.jsx("td",{style:{textAlign:j.align},children:\$},j.key)}),N&&e.jsx("td",{children:i.map((j,u)=>{const \$=j.href(k),K=["btn-action",j.variant==="danger"?"danger":""].filter(Boolean).join(" ");return e.jsx("a",{href:\$,className:K,title:j.title,onClick:j.confirm?M(j,k):void 0,children:e.jsx(w,{name:j.icon})},u)})})]},k.id||h))})]})}),e.jsx(Ce,{open:!!d,message:(d==null?void 0:d.message)||"",onConfirm:()=>{d&&(window.location.href=d.url)},onCancel:()=>m(null)})]})}function Vr({products:t,categories:s,statusFilter:i,categoryFilter:a}){const n=[{key:"name",label:"Produkt",width:"30%",render:(d,m)=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:d}),m.categoryName&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("small",{className:"text-muted-tf",children:m.categoryName})]})]})},{key:"price",label:"Cena",align:"right",render:d=>S(Number(d))},{key:"stock",label:"Sklad",align:"center"},{key:"status",label:"Stav",render:d=>e.jsx(W,{variant:kr(d),children:yr(d)})}],l=[{icon:"pencil",href:d=>\`/admin/products/edit?id=\${d.id}\`,title:"Upravit"},{icon:"trash",href:d=>\`/admin/products/delete?id=\${d.id}\`,title:"Smazat",variant:"danger",confirm:"Opravdu smazat tento produkt?"}],o=[{name:"status",options:Er,value:i,placeholder:"Všechny stavy"},{name:"category",options:s,value:a,placeholder:"Všechny kategorie"}];return e.jsx(B,{title:"Produkty",activePage:"products",children:e.jsx(ae,{columns:n,rows:t,actions:l,filters:o,addButton:{label:"Nový produkt",href:"/admin/products/create"},emptyMessage:"Žádné produkty"})})}function Te({sections:t,values:s={},error:i,submitLabel:a="Uložit",submitIcon:n="check-lg",backUrl:l,backLabel:o="Zpět",action:d}){const[m,b]=E.useState(s),N=h=>j=>{b(u=>({...u,[h]:j.target.value}))},g=t.filter(h=>(h.position??"main")==="main"),x=t.filter(h=>h.position==="sidebar");function A(h){const j=m[h.name]??"",u=h.type??"text";if(u==="hidden")return e.jsx("input",{type:"hidden",name:h.name,value:j},h.name);if(u==="textarea")return e.jsx(I,{label:h.label,required:h.required,hint:h.hint,children:e.jsx("textarea",{name:h.name,className:"form-control",rows:h.rows??3,placeholder:h.placeholder,required:h.required,value:j,onChange:N(h.name)})},h.name);if(u==="select"){const \$=(h.options??[]).map(K=>({value:K.value,label:K.label}));return e.jsx(I,{label:h.label,required:h.required,hint:h.hint,children:e.jsx(te,{name:h.name,options:\$,value:j,placeholder:h.placeholder,required:h.required,onChange:N(h.name)})},h.name)}return e.jsx(I,{label:h.label,required:h.required,hint:h.hint,children:e.jsx("input",{type:u,name:h.name,className:"form-control",value:j,placeholder:h.placeholder,required:h.required,step:h.step,min:h.min,onChange:N(h.name)})},h.name)}function M(h){return h.some(u=>(u.colSpan??12)<12)?e.jsx("div",{className:"row g-3",children:h.map(u=>{const \$=u.colSpan??12;return(u.type??"text")==="hidden"?A(u):e.jsx("div",{className:\`col-md-\${\$}\`,children:A(u)},u.name)})}):e.jsx(e.Fragment,{children:h.map(u=>(u.type??"text")==="hidden"?A(u):e.jsx("div",{className:"mb-3",children:A(u)},u.name))})}function k(h){return h.map((j,u)=>e.jsx(R,{title:j.title,children:M(j.fields)},u))}return e.jsxs(e.Fragment,{children:[i&&e.jsx("div",{className:"alert alert-danger mb-4",children:i}),e.jsx("form",{method:"post",action:d,className:"admin-form",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:k(g)}),e.jsxs("div",{className:"col-md-4",children:[k(x),e.jsx(R,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(w,{name:n})," ",a]}),l&&e.jsx("a",{href:l,className:"btn btn-outline-tf btn-sm text-center",children:o})]})})]})]})})]})}function qr({categories:t,values:s,error:i,isEdit:a=!1}){const l=[{title:"Základní informace",position:"main",fields:[{name:"name",label:"Název produktu",required:!0,colSpan:8},{name:"slug",label:"Slug",colSpan:4},{name:"short_description",label:"Krátký popis",type:"textarea",rows:2},{name:"description",label:"Popis",type:"textarea",rows:5}]},{title:"Cena a sklad",position:"main",fields:[{name:"price",label:"Cena (Kč)",type:"number",step:"0.01",min:"0",required:!0,colSpan:4},{name:"old_price",label:"Původní cena",type:"number",step:"0.01",min:"0",colSpan:4},{name:"stock",label:"Sklad (ks)",type:"number",min:"0",colSpan:4}]},{title:"Kategorie",position:"sidebar",fields:[{name:"category_id",label:"Kategorie",type:"select",options:t,placeholder:"Bez kategorie"}]},{title:"Stav",position:"sidebar",fields:[{name:"status",label:"Stav",type:"select",options:[{value:"active",label:"Aktivní"},{value:"inactive",label:"Neaktivní"},{value:"soldout",label:"Vyprodáno"}]}]},{title:"Ikona",position:"sidebar",fields:[{name:"icon",label:"Bootstrap ikona",placeholder:"box"}]}];return e.jsx(B,{title:a?"Upravit produkt":"Nový produkt",activePage:"products",children:e.jsx(Te,{sections:l,values:s,error:i,submitLabel:a?"Uložit změny":"Vytvořit produkt",backUrl:"/admin/products"})})}function Lr({categories:t,statusFilter:s}){const i=[{key:"name",label:"Kategorie",render:(l,o)=>e.jsxs("span",{className:"d-flex align-items-center gap-2",children:[e.jsx(w,{name:o.icon||"folder"}),e.jsx("strong",{children:l})]})},{key:"sortOrder",label:"Pořadí",align:"center"},{key:"status",label:"Stav",render:l=>e.jsx(W,{variant:Ar(l),children:_r(l)})}],a=[{icon:"pencil",href:l=>\`/admin/categories/edit?id=\${l.id}\`,title:"Upravit"},{icon:"trash",href:l=>\`/admin/categories/delete?id=\${l.id}\`,title:"Smazat",variant:"danger",confirm:"Opravdu smazat tuto kategorii?"}],n=[{name:"status",options:Or,value:s,placeholder:"Všechny stavy"}];return e.jsx(B,{title:"Kategorie",activePage:"categories",children:e.jsx(ae,{columns:i,rows:t,actions:a,filters:n,addButton:{label:"Nová kategorie",href:"/admin/categories/create"},emptyMessage:"Žádné kategorie"})})}function Br({values:t,error:s,isEdit:i=!1}){const a=[{title:"Základní informace",position:"main",fields:[{name:"name",label:"Název",required:!0,colSpan:8},{name:"slug",label:"Slug",colSpan:4},{name:"description",label:"Popis",type:"textarea",rows:3}]},{title:"Nastavení",position:"sidebar",fields:[{name:"status",label:"Stav",type:"select",options:[{value:"active",label:"Aktivní"},{value:"inactive",label:"Neaktivní"}]},{name:"sort_order",label:"Pořadí",type:"number",min:"0"},{name:"icon",label:"Ikona",placeholder:"folder"}]}];return e.jsx(B,{title:i?"Upravit kategorii":"Nová kategorie",activePage:"categories",children:e.jsx(Te,{sections:a,values:t,error:s,submitLabel:i?"Uložit změny":"Vytvořit kategorii",backUrl:"/admin/categories"})})}function Mr({orders:t,statusFilter:s}){const i=[{key:"orderNumber",label:"Objednávka",render:(l,o)=>e.jsx("span",{className:"order-id",children:l})},{key:"customerName",label:"Zákazník",render:l=>e.jsxs("div",{className:"order-customer",children:[e.jsx("div",{className:"order-avatar",children:ue(l)}),l]})},{key:"totalAmount",label:"Částka",align:"right",render:l=>S(Number(l))},{key:"status",label:"Stav",render:l=>e.jsx(W,{variant:pe(l),children:he(l)})},{key:"createdAt",label:"Datum",render:l=>Y(l)}],a=[{icon:"eye",href:l=>\`/admin/orders/detail?id=\${l.id}\`,title:"Detail"},{icon:"pencil",href:l=>\`/admin/orders/edit?id=\${l.id}\`,title:"Upravit"}],n=[{name:"status",options:Rr,value:s,placeholder:"Všechny stavy"}];return e.jsx(B,{title:"Objednávky",activePage:"orders",children:e.jsx(ae,{columns:i,rows:t,actions:a,filters:n,addButton:{label:"Nová objednávka",href:"/admin/orders/create"},emptyMessage:"Žádné objednávky"})})}function Zr({order:t,items:s}){return e.jsx(B,{title:\`Objednávka \${t.orderNumber}\`,activePage:"orders",headerActions:e.jsx(me,{href:\`/admin/orders/edit?id=\${t.id}\`,variant:"outline",size:"sm",icon:"pencil",children:"Upravit"}),children:e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-md-8",children:[e.jsxs(R,{title:"Položky objednávky",children:[e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Produkt"}),e.jsx("th",{style:{textAlign:"center"},children:"Množství"}),e.jsx("th",{style:{textAlign:"right"},children:"Cena/ks"}),e.jsx("th",{style:{textAlign:"right"},children:"Celkem"})]})}),e.jsx("tbody",{children:s.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:i.productName}),e.jsx("td",{style:{textAlign:"center"},children:i.quantity}),e.jsx("td",{style:{textAlign:"right"},children:S(Number(i.unitPrice))}),e.jsx("td",{style:{textAlign:"right"},children:e.jsx("strong",{children:S(Number(i.totalPrice))})})]},i.id))})]}),e.jsx("div",{className:"d-flex justify-content-end mt-3",children:e.jsxs("div",{style:{fontSize:"1.25rem",fontWeight:800},children:["Celkem: ",S(Number(t.totalAmount))]})})]}),t.notes&&e.jsx(R,{title:"Poznámky",children:e.jsx("p",{children:t.notes})})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsxs(R,{title:"Info",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("strong",{children:"Stav:"})," ",e.jsx(W,{variant:pe(t.status),children:he(t.status)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("strong",{children:"Datum:"})," ",Y(t.createdAt)]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("strong",{children:"Zákazník:"})," ",t.customerName]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("strong",{children:"Email:"})," ",t.customerEmail]})]}),t.shippingAddress&&e.jsx(R,{title:"Doručovací adresa",children:e.jsx("p",{children:t.shippingAddress})}),t.billingAddress&&e.jsx(R,{title:"Fakturační adresa",children:e.jsx("p",{children:t.billingAddress})})]})]})})}function \$r({isEdit:t,orderId:s,data:i,availableProducts:a,availableCustomers:n,existingItems:l,error:o}){const[d,m]=E.useState(l&&l.length>0?l:[{productId:"",productName:"",quantity:"1",unitPrice:"0"}]),[b,N]=E.useState(i??{}),g=[{value:"pending",label:"Cekajici"},{value:"processing",label:"Zpracovani"},{value:"completed",label:"Dokonceno"},{value:"cancelled",label:"Zruseno"},{value:"returned",label:"Vraceno"}],x=v=>C=>{N(F=>({...F,[v]:C.target.value}))},A=v=>{const C=v.target.value;if(!C)return;const F=n.find(T=>T.id===C);F&&N(T=>({...T,customer_id:F.id,customer_name:\`\${F.firstName} \${F.lastName}\`,customer_email:F.email}))},M=(v,C,F)=>{m(T=>{const U=[...T];return U[v]={...U[v],[C]:F},U})},k=(v,C)=>{const F=a.find(T=>T.id===C);F?m(T=>{const U=[...T];return U[v]={...U[v],productId:F.id,productName:F.name,unitPrice:F.price},U}):M(v,"productId",C)},h=()=>{m(v=>[...v,{productId:"",productName:"",quantity:"1",unitPrice:"0"}])},j=v=>{m(C=>C.filter((F,T)=>T!==v))},u=d.reduce((v,C)=>{const F=Number(C.quantity)||0,T=Number(C.unitPrice)||0;return v+F*T},0),\$=n.map(v=>({value:v.id,label:\`\${v.firstName} \${v.lastName} (\${v.email})\`})),K=a.map(v=>({value:v.id,label:\`\${v.name} - \${S(Number(v.price))}\`}));return e.jsxs(B,{title:t?"Upravit objednavku":"Nova objednavka",activePage:"orders",children:[o&&e.jsx("div",{className:"alert alert-danger mb-4",children:o}),e.jsxs("form",{method:"post",children:[s&&e.jsx("input",{type:"hidden",name:"id",value:s}),e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs(R,{title:"Zakaznik",children:[e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Vybrat existujiciho zakaznika",children:e.jsxs("select",{className:"form-control",onChange:A,defaultValue:"",children:[e.jsx("option",{value:"",children:"-- Vyberte zakaznika --"}),\$.map(v=>e.jsx("option",{value:v.value,children:v.label},v.value))]})})}),e.jsx("input",{type:"hidden",name:"customer_id",value:b.customer_id??""}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(I,{label:"Jmeno zakaznika",required:!0,children:e.jsx("input",{type:"text",name:"customer_name",className:"form-control",required:!0,value:b.customer_name??"",onChange:x("customer_name")})})}),e.jsx("div",{className:"col-md-6",children:e.jsx(I,{label:"Email",required:!0,children:e.jsx("input",{type:"email",name:"customer_email",className:"form-control",required:!0,value:b.customer_email??"",onChange:x("customer_email")})})})]}),e.jsxs("div",{className:"row g-3 mt-1",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(I,{label:"Dorucovaci adresa",children:e.jsx("textarea",{name:"shipping_address",className:"form-control",rows:2,value:b.shipping_address??"",onChange:x("shipping_address")})})}),e.jsx("div",{className:"col-md-6",children:e.jsx(I,{label:"Fakturacni adresa",children:e.jsx("textarea",{name:"billing_address",className:"form-control",rows:2,value:b.billing_address??"",onChange:x("billing_address")})})})]})]}),e.jsxs(R,{title:"Polozky objednavky",children:[e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:"35%"},children:"Produkt"}),e.jsx("th",{style:{width:"25%"},children:"Nazev"}),e.jsx("th",{style:{width:"10%",textAlign:"center"},children:"Mnozstvi"}),e.jsx("th",{style:{width:"15%",textAlign:"right"},children:"Cena/ks"}),e.jsx("th",{style:{width:"10%",textAlign:"right"},children:"Celkem"}),e.jsx("th",{style:{width:"5%"}})]})}),e.jsx("tbody",{children:d.map((v,C)=>{const F=(Number(v.quantity)||0)*(Number(v.unitPrice)||0);return e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsxs("select",{className:"form-control",value:v.productId,onChange:T=>k(C,T.target.value),children:[e.jsx("option",{value:"",children:"-- Vlastni --"}),K.map(T=>e.jsx("option",{value:T.value,children:T.label},T.value))]}),e.jsx("input",{type:"hidden",name:\`item_product_id_\${C}\`,value:v.productId})]}),e.jsxs("td",{children:[e.jsx("input",{type:"text",className:"form-control",placeholder:"Nazev polozky",value:v.productName,onChange:T=>M(C,"productName",T.target.value)}),e.jsx("input",{type:"hidden",name:\`item_name_\${C}\`,value:v.productName})]}),e.jsxs("td",{children:[e.jsx("input",{type:"number",className:"form-control",min:"1",style:{textAlign:"center"},value:v.quantity,onChange:T=>M(C,"quantity",T.target.value)}),e.jsx("input",{type:"hidden",name:\`item_qty_\${C}\`,value:v.quantity})]}),e.jsxs("td",{children:[e.jsx("input",{type:"number",className:"form-control",step:"0.01",min:"0",style:{textAlign:"right"},value:v.unitPrice,onChange:T=>M(C,"unitPrice",T.target.value)}),e.jsx("input",{type:"hidden",name:\`item_price_\${C}\`,value:v.unitPrice})]}),e.jsx("td",{style:{textAlign:"right",fontWeight:600},children:S(F)}),e.jsx("td",{children:d.length>1&&e.jsx("button",{type:"button",className:"btn-action danger",title:"Odebrat polozku",onClick:()=>j(C),children:e.jsx(w,{name:"x-lg"})})})]},C)})})]}),e.jsx("input",{type:"hidden",name:"item_count",value:String(d.length)}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:h,children:[e.jsx(w,{name:"plus-lg"})," Pridat polozku"]}),e.jsxs("div",{style:{fontSize:"1.25rem",fontWeight:800},children:["Celkem: ",S(u)]})]})]}),e.jsx(R,{title:"Poznamky",children:e.jsx(I,{label:"Poznamky k objednavce",children:e.jsx("textarea",{name:"notes",className:"form-control",rows:3,value:b.notes??"",onChange:x("notes")})})})]}),e.jsxs("div",{className:"col-lg-4",children:[e.jsx(R,{title:"Stav",children:e.jsx(I,{label:"Stav objednavky",children:e.jsx(te,{name:"status",options:g,value:b.status??"pending",onChange:x("status")})})}),e.jsx(R,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(w,{name:"check-lg"})," ",t?"Ulozit zmeny":"Vytvorit objednavku"]}),e.jsx("a",{href:"/admin/orders",className:"btn btn-outline-tf btn-sm text-center",children:"Zpet"})]})})]})]})]})]})}function Ur({posts:t,statusFilter:s}){const i=t.map(o=>({id:o.id,title:o.title,slug:o.slug,author:o.author,category:o.category,status:o.status,createdAt:o.createdAt})),a=[{key:"title",label:"Nazev",width:"35%",render:(o,d)=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:o}),e.jsx("br",{}),e.jsx("small",{className:"text-muted-tf",children:d.slug})]})},{key:"author",label:"Autor"},{key:"category",label:"Kategorie"},{key:"status",label:"Stav",render:o=>e.jsx(W,{variant:Tr(o),children:Cr(o)})},{key:"createdAt",label:"Datum",render:o=>Y(o)}],n=[{icon:"pencil",href:o=>\`/admin/blog/edit?id=\${o.id}\`,title:"Upravit"},{icon:"eye",href:o=>\`/article?slug=\${o.slug}\`,title:"Zobrazit"},{icon:"trash",href:o=>\`/admin/blog/delete?id=\${o.id}\`,title:"Smazat",variant:"danger",confirm:"Opravdu smazat tento clanek?"}],l=[{name:"status",options:Fr,value:s,placeholder:"Vsechny stavy"}];return e.jsx(B,{title:"Blog",activePage:"blog",children:e.jsx(ae,{columns:a,rows:i,actions:n,filters:l,addButton:{label:"Novy clanek",href:"/admin/blog/create"},emptyMessage:"Zadne clanky"})})}function Wr({isEdit:t,editId:s,values:i,allMedia:a=[],error:n}){const[l,o]=E.useState(i??{}),[d,m]=E.useState(!1),[b,N]=E.useState((i==null?void 0:i.featured_image)??""),g=[{value:"draft",label:"Koncept"},{value:"published",label:"Publikovano"},{value:"archived",label:"Archivovano"}],x=h=>j=>{o(u=>({...u,[h]:j.target.value}))},A=a.filter(h=>h.contentType.startsWith("image/")),M=h=>{N(h),m(!1)},k=()=>{N("")};return e.jsxs(B,{title:t?"Upravit clanek":"Novy clanek",activePage:"blog",children:[n&&e.jsx("div",{className:"alert alert-danger mb-4",children:n}),e.jsxs("form",{method:"post",children:[s&&e.jsx("input",{type:"hidden",name:"id",value:s}),e.jsx("input",{type:"hidden",name:"featured_image",value:b}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs(R,{title:"Obsah",children:[e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(I,{label:"Nazev",required:!0,children:e.jsx("input",{type:"text",name:"title",className:"form-control",required:!0,value:l.title??"",onChange:x("title")})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(I,{label:"Slug",children:e.jsx("input",{type:"text",name:"slug",className:"form-control",value:l.slug??"",onChange:x("slug")})})})]}),e.jsx("div",{className:"mb-3 mt-3",children:e.jsx(I,{label:"Vytah",children:e.jsx("textarea",{name:"excerpt",className:"form-control",rows:3,value:l.excerpt??"",onChange:x("excerpt")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Obsah",children:e.jsx("textarea",{name:"content",className:"form-control",rows:15,value:l.content??"",onChange:x("content")})})})]})}),e.jsxs("div",{className:"col-lg-4",children:[e.jsx(R,{title:"Hlavni obrazek",children:b?e.jsxs("div",{className:"mb-3",children:[e.jsx("img",{src:b,alt:"Hlavni obrazek",style:{width:"100%",borderRadius:8,objectFit:"cover",maxHeight:200}}),e.jsxs("div",{className:"d-flex gap-2 mt-2",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>m(!0),children:[e.jsx(w,{name:"arrow-repeat"})," Zmenit"]}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"var(--tf-danger)"},onClick:k,children:[e.jsx(w,{name:"x-lg"})," Odstranit"]})]})]}):e.jsxs("div",{className:"text-center py-3",children:[e.jsx(w,{name:"image",size:"xl",className:"text-muted-tf"}),e.jsx("p",{className:"text-muted-tf small mt-2 mb-3",children:"Zadny obrazek"}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>m(!0),children:[e.jsx(w,{name:"images"})," Vybrat z medii"]})]})}),e.jsxs(R,{title:"Nastaveni",children:[e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Stav",children:e.jsx(te,{name:"status",options:g,value:l.status??"draft",onChange:x("status")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Kategorie",children:e.jsx("input",{type:"text",name:"category",className:"form-control",placeholder:"Nazev kategorie",value:l.category??"",onChange:x("category")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Doba cteni (min)",children:e.jsx("input",{type:"number",name:"read_time",className:"form-control",min:"1",value:l.read_time??"5",onChange:x("read_time")})})})]}),e.jsx(R,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(w,{name:"check-lg"})," ",t?"Ulozit zmeny":"Vytvorit clanek"]}),e.jsx("a",{href:"/admin/blog",className:"btn btn-outline-tf btn-sm text-center",children:"Zrusit"})]})})]})]})]}),d&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:()=>m(!1)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"1.5rem",maxWidth:700,width:"90%",maxHeight:"80vh",overflow:"auto"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:"Vybrat obrazek"}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>m(!1),children:e.jsx(w,{name:"x-lg"})})]}),A.length===0?e.jsxs("div",{className:"text-center text-muted-tf py-4",children:[e.jsx(w,{name:"images",size:"xl"}),e.jsx("p",{className:"mt-2",children:"Zadne obrazky v mediich"})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:"0.75rem"},children:A.map(h=>e.jsx("div",{onClick:()=>M(h.url),style:{cursor:"pointer",borderRadius:8,overflow:"hidden",border:b===h.url?"2px solid var(--tf-primary)":"2px solid transparent",aspectRatio:"1"},children:e.jsx("img",{src:h.url,alt:h.filename,style:{width:"100%",height:"100%",objectFit:"cover"}})},h.id))})]})]})]})}const Yr=[{value:"",label:"Vse"},{value:"image",label:"Obrazky"},{value:"document",label:"Dokumenty"},{value:"video",label:"Videa"},{value:"audio",label:"Audio"}];function _e(t){return t.startsWith("image/")?"file-earmark-image":t.startsWith("video/")?"file-earmark-play":t.startsWith("audio/")?"file-earmark-music":t.includes("pdf")?"file-earmark-pdf":"file-earmark"}function Kr(t,s){return s?s==="image"?t.startsWith("image/"):s==="video"?t.startsWith("video/"):s==="audio"?t.startsWith("audio/"):s==="document"?!t.startsWith("image/")&&!t.startsWith("video/")&&!t.startsWith("audio/"):!0:!0}function Jr({mediaItems:t,typeFilter:s}){const[i,a]=E.useState(!1),[n,l]=E.useState(null),[o,d]=E.useState(null),m=t.filter(g=>Kr(g.contentType,s)),b=g=>{const x=g.target.value,A=new URLSearchParams(window.location.search);x?A.set("type",x):A.delete("type"),window.location.search=A.toString()},N=g=>{d({url:\`/admin/media/delete?id=\${g.id}\`,message:\`Opravdu smazat soubor "\${g.filename}"?\`})};return e.jsxs(B,{title:"Media",activePage:"media",headerActions:e.jsx(me,{variant:"primary",size:"sm",icon:"upload",onClick:()=>a(!0),children:"Nahrat soubor"}),children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"filter-bar mb-0",children:e.jsx(te,{filter:!0,options:Yr,name:"type",value:s,onChange:b})}),e.jsxs("span",{className:"text-muted-tf small",children:[m.length," polozek"]})]}),e.jsx(R,{children:m.length===0?e.jsxs("div",{className:"text-center text-muted-tf py-5",children:[e.jsx(w,{name:"images",size:"xl"}),e.jsx("p",{className:"mt-2",children:"Zadna media"})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"1rem"},children:m.map(g=>e.jsxs("div",{className:"media-grid-item",style:{position:"relative",borderRadius:12,overflow:"hidden",border:"1px solid var(--tf-border)",background:"var(--tf-surface)",aspectRatio:"1",cursor:"pointer"},children:[e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:g.contentType.startsWith("image/")?e.jsx("img",{src:g.url,alt:g.filename,style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsxs("div",{className:"text-center",children:[e.jsx(w,{name:_e(g.contentType),size:"xl",className:"text-muted-tf"}),e.jsx("div",{className:"text-muted-tf small mt-1",style:{maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 0.5rem"},children:g.filename})]})}),e.jsxs("div",{className:"media-overlay",style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s",padding:"0.5rem"},onMouseEnter:x=>{x.currentTarget.style.opacity="1"},onMouseLeave:x=>{x.currentTarget.style.opacity="0"},children:[e.jsx("div",{style:{color:"#fff",fontSize:"0.75rem",textAlign:"center",marginBottom:"0.5rem",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:g.filename}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"#fff",borderColor:"rgba(255,255,255,0.5)",fontSize:"0.75rem",padding:"0.25rem 0.5rem"},onClick:x=>{x.stopPropagation(),l(g)},children:[e.jsx(w,{name:"eye"})," Zobrazit"]}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"#ff6b6b",borderColor:"rgba(255,107,107,0.5)",fontSize:"0.75rem",padding:"0.25rem 0.5rem"},onClick:x=>{x.stopPropagation(),N(g)},children:[e.jsx(w,{name:"trash"})," Smazat"]})]})]})]},g.id))})}),i&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:()=>a(!1)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"2rem",maxWidth:450,width:"90%"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:"Nahrat soubor"}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>a(!1),children:e.jsx(w,{name:"x-lg"})})]}),e.jsxs("form",{method:"post",encType:"multipart/form-data",action:"/admin/media/upload",children:[e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Soubor",required:!0,children:e.jsx("input",{type:"file",name:"file",className:"form-control",required:!0})})}),e.jsx("div",{className:"mb-3",children:e.jsx(I,{label:"Alternativni text",children:e.jsx("input",{type:"text",name:"alt_text",className:"form-control",placeholder:"Popis obrazku"})})}),e.jsxs("div",{className:"d-flex gap-2 justify-content-end",children:[e.jsx("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>a(!1),children:"Zrusit"}),e.jsxs("button",{type:"submit",className:"btn-add",children:[e.jsx(w,{name:"upload"})," Nahrat"]})]})]})]})]}),n&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"},onClick:()=>l(null)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"1.5rem",maxWidth:800,width:"90%",maxHeight:"85vh",overflow:"auto"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:n.filename}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>l(null),children:e.jsx(w,{name:"x-lg"})})]}),n.contentType.startsWith("image/")?e.jsx("img",{src:n.url,alt:n.filename,style:{width:"100%",borderRadius:8,objectFit:"contain",maxHeight:"60vh"}}):e.jsxs("div",{className:"text-center py-4",children:[e.jsx(w,{name:_e(n.contentType),size:"xl"}),e.jsx("p",{className:"mt-2",children:n.filename}),e.jsxs("a",{href:n.url,target:"_blank",rel:"noopener noreferrer",className:"btn-outline-tf btn-sm",children:[e.jsx(w,{name:"download"})," Stahnout"]})]}),e.jsxs("div",{className:"text-muted-tf small mt-3",children:[e.jsxs("div",{children:["Typ: ",n.contentType]}),e.jsxs("div",{children:["Nahrano: ",Y(n.createdAt)]})]})]})]}),e.jsx(Ce,{open:!!o,message:(o==null?void 0:o.message)||"",onConfirm:()=>{o&&(window.location.href=o.url)},onCancel:()=>d(null)})]})}const Hr=[{value:"active",label:"Aktivni"},{value:"inactive",label:"Neaktivni"}];function Gr(t){return t==="active"?"Aktivni":"Neaktivni"}function Xr(t){return t==="active"?"success":"warning"}function Qr({customers:t,statusFilter:s}){const i=t.map(o=>({id:o.id,fullName:\`\${o.firstName} \${o.lastName}\`,firstName:o.firstName,lastName:o.lastName,email:o.email,phone:o.phone??"",company:o.company??"",status:o.status,createdAt:o.createdAt})),a=[{key:"fullName",label:"Zakaznik",width:"25%",render:(o,d)=>e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("div",{className:"avatar",style:{width:36,height:36,fontSize:"0.85rem",flexShrink:0},children:ue(o)}),e.jsx("div",{children:e.jsx("strong",{children:o})})]})},{key:"email",label:"Email"},{key:"phone",label:"Telefon",render:o=>o||"-"},{key:"company",label:"Spolecnost",render:o=>o||"-"},{key:"status",label:"Stav",render:o=>e.jsx(W,{variant:Xr(o),children:Gr(o)})},{key:"createdAt",label:"Registrace",render:o=>Y(o)}],n=[{icon:"eye",href:o=>\`/admin/customers/detail?id=\${o.id}\`,title:"Detail"}],l=[{name:"status",options:Hr,value:s,placeholder:"Vsechny stavy"}];return e.jsx(B,{title:"Zakaznici",activePage:"customers",children:e.jsx(ae,{columns:a,rows:i,actions:n,filters:l,emptyMessage:"Zadni zakaznici"})})}const et=\`
  .landing-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .landing-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .landing-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .landing-hero {
    padding: 8rem 0 5rem;
    text-align: center;
  }
  .landing-hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .landing-hero-subtitle {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
    max-width: 640px;
    margin: 0 auto 2rem;
  }
  .landing-prompt-box {
    max-width: 600px;
    margin: 2.5rem auto 0;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    color: var(--tf-text-muted);
    text-align: left;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .landing-prompt-box .cursor-blink {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background: var(--tf-primary);
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  .landing-connector {
    padding: 5rem 0;
  }
  .landing-code-block {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--tf-text);
    overflow-x: auto;
  }
  .landing-code-block pre {
    margin: 0;
    white-space: pre;
  }
  .agent-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 999px;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--tf-text);
  }
  .landing-features {
    padding: 5rem 0;
  }
  .feature-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 2rem;
    height: 100%;
    transition: border-color 0.2s, transform 0.2s;
  }
  .feature-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .feature-card h5 {
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
  }
  .feature-card p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .landing-how-it-works {
    padding: 5rem 0;
  }
  .step-card {
    text-align: center;
    padding: 2rem;
  }
  .step-number {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.25rem;
  }
  .step-card h5 {
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
  }
  .step-card p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .landing-cta {
    padding: 5rem 0;
    text-align: center;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    border-radius: 24px;
    margin: 3rem 0;
    color: #fff;
  }
  .landing-cta h2 {
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .landing-cta p {
    opacity: 0.9;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  .landing-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--tf-primary);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
  }
\`,rt=\`{
  "mcpServers": {
    "typeforge": {
      "command": "npx",
      "args": ["-y", "typeforge-mcp"],
      "env": {
        "TYPEFORGE_API_TOKEN": "your-api-token"
      }
    }
  }
}\`,tt=[{icon:"robot",title:"AI Asistent",desc:"Integrovaný AI asistent pro rychlejší vývoj a automatizaci."},{icon:"code-slash",title:"TypeScript nativně",desc:"Plná podpora TypeScriptu s kompilací do Lua pro maximální výkon."},{icon:"cloud-arrow-up",title:"Serverless deploy",desc:"Nasazení jedním příkazem bez správy infrastruktury."},{icon:"database",title:"Databáze & cache",desc:"PostgreSQL, Redis a vestavěná cache k dispozici okamžitě."},{icon:"diagram-3",title:"MCP Connector",desc:"Propojte svůj projekt s AI agenty přes standardní MCP protokol."},{icon:"share",title:"API & Integrace",desc:"REST API, JWT autentizace, email, PDF a další služby v základu."}],at=[{title:"Vytvořte projekt",desc:"Inicializujte nový TypeForge projekt a nakonfigurujte služby."},{title:"Napište kód",desc:"Vyvíjejte v TypeScriptu s podporou AI asistenta a hot-reload."},{title:"Nasadte",desc:"Jedním příkazem nasaďte na serverless infrastrukturu."}],st=[{name:"Claude Code",icon:"terminal"},{name:"Cursor",icon:"cursor"},{name:"Windsurf",icon:"wind"},{name:"Cline",icon:"braces"}];function it({userName:t}){const{toggleTheme:s}=q();return e.jsxs("div",{style:{background:"var(--tf-bg)",color:"var(--tf-text)",minHeight:"100vh"},children:[e.jsx("style",{children:et}),e.jsx("nav",{className:"landing-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/#connector",className:"nav-link d-none d-md-inline",children:"MCP Connector"}),e.jsx("a",{href:"/#features",className:"nav-link d-none d-md-inline",children:"Features"}),e.jsx("a",{href:"/#how-it-works",className:"nav-link d-none d-md-inline",children:"Jak to funguje"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsx("a",{href:"/admin",className:"nav-link d-none d-md-inline",children:"Admin"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:s,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),t?e.jsx("a",{href:"/logout",className:"btn-outline-tf btn-sm",children:"Odhlásit"}):e.jsx("a",{href:"/login",className:"btn-primary-tf btn-sm",children:"Přihlásit"})]})]})}),e.jsx("section",{className:"landing-hero",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"hero-badge",children:[e.jsx("i",{className:"bi bi-stars me-1"}),"Lorem ipsum dolor sit amet"]}),e.jsxs("h1",{className:"landing-hero-title",children:["Vytvářejte webové aplikace",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"rychleji než kdy dříve"})]}),e.jsx("p",{className:"landing-hero-subtitle",children:"TypeForge je moderní serverless framework pro TypeScript vývojáře. Kompilujte do Lua, nasazujte jedním příkazem a integrujte AI agenty."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"/register",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Začít zdarma"]}),e.jsxs("a",{href:"/#features",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-play-circle me-2"}),"Zjistit více"]})]}),e.jsxs("div",{className:"landing-prompt-box",children:[e.jsx("i",{className:"bi bi-chevron-right",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"npx create-typeforge-app my-project"}),e.jsx("span",{className:"cursor-blink"})]})]})}),e.jsx("section",{className:"landing-connector",id:"connector",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row align-items-center g-5",children:[e.jsxs("div",{className:"col-lg-6",children:[e.jsxs("div",{className:"section-label",children:[e.jsx("i",{className:"bi bi-plug"}),"MCP Connector"]}),e.jsx("h2",{className:"fw-bold mb-3",children:"Propojte svůj projekt s AI agenty"}),e.jsx("p",{className:"text-muted-tf mb-4",children:"Standardní Model Context Protocol umožňuje AI agentům pracovat s vaším projektem, spravovat databázi, nasazovat změny a mnohem více."}),e.jsx("div",{className:"d-flex flex-wrap gap-2",children:st.map(i=>e.jsxs("span",{className:"agent-badge",children:[e.jsx("i",{className:\`bi bi-\${i.icon}\`}),i.name]},i.name))})]}),e.jsx("div",{className:"col-lg-6",children:e.jsx("div",{className:"landing-code-block",children:e.jsx("pre",{children:rt})})})]})})}),e.jsx("section",{className:"landing-features",id:"features",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center mb-5",children:[e.jsxs("div",{className:"section-label justify-content-center",children:[e.jsx("i",{className:"bi bi-grid"}),"Features"]}),e.jsx("h2",{className:"fw-bold",children:"Vše co potřebujete"}),e.jsx("p",{className:"text-muted-tf",children:"Kompletní sada nástrojů pro moderní webový vývoj."})]}),e.jsx("div",{className:"row g-4",children:tt.map(i=>e.jsx("div",{className:"col-md-6 col-lg-4",children:e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:e.jsx("i",{className:\`bi bi-\${i.icon}\`})}),e.jsx("h5",{children:i.title}),e.jsx("p",{children:i.desc})]})},i.icon))})]})}),e.jsx("section",{className:"landing-how-it-works",id:"how-it-works",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center mb-5",children:[e.jsxs("div",{className:"section-label justify-content-center",children:[e.jsx("i",{className:"bi bi-list-ol"}),"Jak to funguje"]}),e.jsx("h2",{className:"fw-bold",children:"Tři jednoduché kroky"})]}),e.jsx("div",{className:"row g-4",children:at.map((i,a)=>e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"step-card",children:[e.jsx("div",{className:"step-number",children:a+1}),e.jsx("h5",{children:i.title}),e.jsx("p",{children:i.desc})]})},a))})]})}),e.jsx("section",{className:"container",children:e.jsxs("div",{className:"landing-cta",children:[e.jsx("h2",{children:"Připraveni začít?"}),e.jsx("p",{children:"Vytvořte si účet zdarma a začněte stavět během pár minut."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"/register",className:"btn-primary-tf",style:{background:"#fff",color:"var(--tf-primary)"},children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Začít zdarma"]}),e.jsx("a",{href:"/blog",className:"btn-outline-tf",style:{borderColor:"rgba(255,255,255,0.3)",color:"#fff"},children:"Přečíst blog"})]})]})}),e.jsx("footer",{className:"landing-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const nt=\`
  .login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tf-bg);
    padding: 2rem 1rem;
  }
  .login-card {
    width: 100%;
    max-width: 440px;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
  }
  .login-brand {
    text-align: center;
    margin-bottom: 2rem;
  }
  .login-brand .brand-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .login-brand h4 {
    color: var(--tf-text);
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .login-brand p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .login-form .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  .login-form .form-control {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
  .login-form .form-control:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .login-form .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .login-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .login-divider::before,
  .login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--tf-border);
  }
  .login-link {
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .login-link a {
    color: var(--tf-primary);
    text-decoration: none;
    font-weight: 500;
  }
  .login-link a:hover {
    text-decoration: underline;
  }
  .login-theme-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
\`;function ot({error:t,emailValue:s}){const{toggleTheme:i}=q();return e.jsxs("div",{className:"login-wrapper",style:{position:"relative"},children:[e.jsx("style",{children:nt}),e.jsx("div",{className:"login-theme-toggle",children:e.jsxs("button",{className:"btn-theme-toggle",onClick:i,title:"Přepnout téma",style:{width:36,height:36,fontSize:"1rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}),e.jsxs("div",{className:"login-card",children:[e.jsx("div",{className:"login-brand",children:e.jsxs("a",{href:"/",className:"text-decoration-none",children:[e.jsx("div",{className:"brand-icon",children:e.jsx("i",{className:"bi bi-shield-lock"})}),e.jsx("h4",{children:"Přihlášení"}),e.jsx("p",{children:"Vítejte zpět v TypeForge"})]})}),t&&e.jsxs("div",{className:"alert alert-danger d-flex align-items-center gap-2",style:{borderRadius:8,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-exclamation-triangle"}),t]}),e.jsxs("form",{method:"post",action:"/login",className:"login-form",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:"E-mail"}),e.jsx("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"vas@email.cz",defaultValue:s||"",required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"password",children:"Heslo"}),e.jsx("input",{type:"password",className:"form-control",id:"password",name:"password",placeholder:"Vaše heslo",required:!0})]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf w-100",style:{padding:"0.65rem",fontSize:"0.95rem"},children:[e.jsx("i",{className:"bi bi-box-arrow-in-right me-2"}),"Přihlásit se"]})]}),e.jsx("div",{className:"login-divider",children:"nebo"}),e.jsxs("div",{className:"login-link",children:["Nemáte účet? ",e.jsx("a",{href:"/register",children:"Zaregistrujte se"})]})]})]})}const lt=\`
  .register-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tf-bg);
    padding: 2rem 1rem;
  }
  .register-card {
    width: 100%;
    max-width: 520px;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
  }
  .register-brand {
    text-align: center;
    margin-bottom: 2rem;
  }
  .register-brand .brand-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--tf-primary), var(--tf-accent));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .register-brand h4 {
    color: var(--tf-text);
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .register-brand p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }
  .register-form .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  .register-form .form-control {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
  }
  .register-form .form-control:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .register-form .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .password-strength {
    display: flex;
    gap: 4px;
    margin-top: 0.5rem;
  }
  .password-strength .bar {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--tf-border);
    transition: background 0.3s;
  }
  .password-strength .bar.active-1 { background: #ef4444; }
  .password-strength .bar.active-2 { background: #f59e0b; }
  .password-strength .bar.active-3 { background: #22c55e; }
  .password-strength .bar.active-4 { background: #22c55e; }
  .register-divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .register-divider::before,
  .register-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--tf-border);
  }
  .register-link {
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .register-link a {
    color: var(--tf-primary);
    text-decoration: none;
    font-weight: 500;
  }
  .register-link a:hover {
    text-decoration: underline;
  }
  .register-theme-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
  .form-check-input:checked {
    background-color: var(--tf-primary);
    border-color: var(--tf-primary);
  }
  .form-check-label {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .form-check-label a {
    color: var(--tf-primary);
    text-decoration: none;
  }
\`;function ct(t){if(!t)return 0;let s=0;return t.length>=6&&s++,t.length>=10&&s++,/[A-Z]/.test(t)&&/[a-z]/.test(t)&&s++,(/[0-9]/.test(t)||/[^A-Za-z0-9]/.test(t))&&s++,s}function dt({error:t,values:s={}}){const{toggleTheme:i}=q(),[a,n]=E.useState(""),l=ct(a);return e.jsxs("div",{className:"register-wrapper",style:{position:"relative"},children:[e.jsx("style",{children:lt}),e.jsx("div",{className:"register-theme-toggle",children:e.jsxs("button",{className:"btn-theme-toggle",onClick:i,title:"Přepnout téma",style:{width:36,height:36,fontSize:"1rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}),e.jsxs("div",{className:"register-card",children:[e.jsx("div",{className:"register-brand",children:e.jsxs("a",{href:"/",className:"text-decoration-none",children:[e.jsx("div",{className:"brand-icon",children:e.jsx("i",{className:"bi bi-person-plus"})}),e.jsx("h4",{children:"Registrace"}),e.jsx("p",{children:"Vytvořte si účet v TypeForge"})]})}),t&&e.jsxs("div",{className:"alert alert-danger d-flex align-items-center gap-2",style:{borderRadius:8,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-exclamation-triangle"}),t]}),e.jsxs("form",{method:"post",action:"/register",className:"register-form",children:[e.jsxs("div",{className:"row g-3 mb-3",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("label",{className:"form-label",htmlFor:"firstName",children:"Jméno"}),e.jsx("input",{type:"text",className:"form-control",id:"firstName",name:"firstName",placeholder:"Jan",defaultValue:s.firstName||"",required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("label",{className:"form-label",htmlFor:"lastName",children:"Příjmení"}),e.jsx("input",{type:"text",className:"form-control",id:"lastName",name:"lastName",placeholder:"Novák",defaultValue:s.lastName||"",required:!0})]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:"E-mail"}),e.jsx("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"vas@email.cz",defaultValue:s.email||"",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"password",children:"Heslo"}),e.jsx("input",{type:"password",className:"form-control",id:"password",name:"password",placeholder:"Min. 6 znaků",required:!0,onChange:o=>n(o.target.value)}),e.jsx("div",{className:"password-strength",children:[1,2,3,4].map(o=>e.jsx("div",{className:\`bar\${l>=o?\` active-\${o}\`:""}\`},o))})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"passwordConfirm",children:"Potvrzení hesla"}),e.jsx("input",{type:"password",className:"form-control",id:"passwordConfirm",name:"passwordConfirm",placeholder:"Zopakujte heslo",required:!0})]}),e.jsxs("div",{className:"mb-3 form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"terms",name:"terms",required:!0}),e.jsxs("label",{className:"form-check-label",htmlFor:"terms",children:["Souhlasím s ",e.jsx("a",{href:"/terms",children:"podmínkami použití"})," a ",e.jsx("a",{href:"/privacy",children:"ochranou soukromí"})]})]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf w-100",style:{padding:"0.65rem",fontSize:"0.95rem"},children:[e.jsx("i",{className:"bi bi-person-plus me-2"}),"Zaregistrovat se"]})]}),e.jsx("div",{className:"register-divider",children:"nebo"}),e.jsxs("div",{className:"register-link",children:["Již máte účet? ",e.jsx("a",{href:"/login",children:"Přihlaste se"})]})]})]})}const mt=\`
  .eshop-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .shop-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .shop-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .shop-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .cart-badge-link {
    position: relative;
    color: var(--tf-text);
    font-size: 1.2rem;
  }
  .eshop-hero {
    padding: 8rem 0 4rem;
    text-align: center;
  }
  .eshop-hero h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .eshop-hero p {
    color: var(--tf-text-muted);
    font-size: 1.15rem;
    max-width: 560px;
    margin: 0 auto 2rem;
  }
  .features-bar {
    padding: 1.5rem 0;
    border-top: 1px solid var(--tf-border);
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 3rem;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    justify-content: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .feature-item i {
    color: var(--tf-primary);
    font-size: 1.25rem;
  }
  .category-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: border-color 0.2s, transform 0.2s;
    text-decoration: none;
    display: block;
    color: var(--tf-text);
    height: 100%;
  }
  .category-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
    color: var(--tf-text);
  }
  .category-card .cat-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: var(--tf-bg);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--tf-primary);
    margin-bottom: 0.75rem;
  }
  .category-card .cat-icon img {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    object-fit: cover;
  }
  .category-card h6 {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  .category-card .cat-count {
    color: var(--tf-text-muted);
    font-size: 0.8rem;
  }
  .eshop-product-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .eshop-product-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .eshop-product-card .product-img {
    height: 200px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .eshop-product-card .product-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .eshop-product-card .product-img i {
    font-size: 3rem;
    color: var(--tf-text-muted);
  }
  .eshop-product-card .product-body {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .eshop-product-card .product-category-label {
    font-size: 0.75rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }
  .eshop-product-card .product-title {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--tf-text);
  }
  .eshop-product-card .product-title a {
    color: inherit;
    text-decoration: none;
  }
  .eshop-product-card .product-price-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 0.75rem;
  }
  .eshop-product-card .price-current {
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--tf-text);
  }
  .eshop-product-card .price-old {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
  }
  .eshop-product-card .btn-add-cart {
    margin-left: auto;
    background: var(--tf-primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .eshop-product-card .btn-add-cart:hover {
    opacity: 0.85;
  }
  .newsletter-section {
    padding: 4rem 0;
    text-align: center;
  }
  .newsletter-section .newsletter-box {
    max-width: 500px;
    margin: 0 auto;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
  }
  .newsletter-section h4 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .newsletter-section p {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  .newsletter-input-group {
    display: flex;
    gap: 0.5rem;
  }
  .newsletter-input-group input {
    flex: 1;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.6rem 0.85rem;
    font-size: 0.9rem;
  }
  .newsletter-input-group input::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .eshop-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function ht({products:t,categories:s}){const{toggleTheme:i}=q();return e.jsxs("div",{className:"eshop-page",children:[e.jsx("style",{children:mt}),e.jsx("nav",{className:"shop-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:"Domů"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",style:{color:"var(--tf-text)"},children:"E-Shop"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:i,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"cart-badge-link text-decoration-none",children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("section",{className:"eshop-hero",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"eshop-badge",children:[e.jsx("i",{className:"bi bi-stars me-1"}),"Nová kolekce 2026"]}),e.jsxs("h1",{children:["Objevte náš",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"prémiový výběr"})]}),e.jsx("p",{children:"Kvalitní produkty za skvělé ceny. Doprava zdarma nad 1 000 Kč."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"#products",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),"Prohlédnout produkty"]}),e.jsxs("a",{href:"#categories",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-grid me-2"}),"Kategorie"]})]})]})}),e.jsx("div",{className:"features-bar",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-truck"}),e.jsx("span",{children:"Doprava zdarma"})]})}),e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:"Záruka 2 roky"})]})}),e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-arrow-return-left"}),e.jsx("span",{children:"30 dní na vrácení"})]})}),e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-headset"}),e.jsx("span",{children:"24/7 podpora"})]})})]})})}),s.length>0&&e.jsxs("section",{className:"container mb-5",id:"categories",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-between mb-4",children:e.jsx("h3",{className:"fw-bold mb-0",children:"Kategorie"})}),e.jsx("div",{className:"row g-3",children:s.map(a=>e.jsx("div",{className:"col-6 col-md-4 col-lg-3",children:e.jsxs("a",{href:\`/category?slug=\${a.slug}\`,className:"category-card",children:[e.jsx("div",{className:"cat-icon",children:a.featuredImage?e.jsx("img",{src:a.featuredImage,alt:a.name}):e.jsx("i",{className:\`bi bi-\${a.icon||"grid"}\`})}),e.jsx("h6",{children:a.name}),e.jsxs("div",{className:"cat-count",children:[a.productCount," produktů"]})]})},a.id))})]}),e.jsxs("section",{className:"container pb-5",id:"products",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-between mb-4",children:[e.jsx("h3",{className:"fw-bold mb-0",children:"Produkty"}),e.jsxs("span",{className:"text-muted-tf",style:{fontSize:"0.9rem"},children:[t.length," produktů"]})]}),t.length===0?e.jsxs("div",{className:"text-center py-5",children:[e.jsx("i",{className:"bi bi-bag-x",style:{fontSize:"3rem",color:"var(--tf-text-muted)"}}),e.jsx("p",{className:"text-muted-tf mt-3",children:"Zatím nemáme žádné produkty."})]}):e.jsx("div",{className:"row g-4",children:t.map(a=>e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"eshop-product-card",children:[e.jsx("a",{href:\`/product?slug=\${a.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"product-img",children:a.featuredImage?e.jsx("img",{src:a.featuredImage,alt:a.name}):e.jsx("i",{className:\`bi bi-\${a.icon||"box"}\`})})}),e.jsxs("div",{className:"product-body",children:[a.categoryName&&e.jsx("div",{className:"product-category-label",children:a.categoryName}),e.jsx("div",{className:"product-title",children:e.jsx("a",{href:\`/product?slug=\${a.slug}\`,children:a.name})}),e.jsxs("div",{className:"product-price-row",children:[e.jsx("span",{className:"price-current",children:S(Number(a.price))}),a.oldPrice&&e.jsx("span",{className:"price-old",children:S(Number(a.oldPrice))}),e.jsx("form",{method:"post",action:\`/cart/add?productId=\${a.id}&quantity=1\`,style:{display:"inline",marginLeft:"auto"},children:e.jsx("button",{type:"submit",className:"btn-add-cart",title:"Přidat do košíku",children:e.jsx("i",{className:"bi bi-cart-plus"})})})]})]})]})},a.id))})]}),e.jsx("section",{className:"newsletter-section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"newsletter-box",children:[e.jsx("i",{className:"bi bi-envelope",style:{fontSize:"2rem",color:"var(--tf-primary)",marginBottom:"0.75rem",display:"block"}}),e.jsx("h4",{children:"Odebírejte novinky"}),e.jsx("p",{children:"Buďte první, kdo se dozví o nových produktech a slevách."}),e.jsxs("div",{className:"newsletter-input-group",children:[e.jsx("input",{type:"email",placeholder:"Váš e-mail"}),e.jsx("button",{className:"btn-primary-tf",children:"Odebírat"})]})]})})}),e.jsx("footer",{className:"eshop-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const pt=\`
  .product-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .product-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .product-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .product-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .product-breadcrumb {
    padding: 6rem 0 1rem;
  }
  .product-breadcrumb .breadcrumb {
    margin: 0;
    font-size: 0.85rem;
  }
  .product-breadcrumb .breadcrumb-item a {
    color: var(--tf-text-muted);
    text-decoration: none;
  }
  .product-breadcrumb .breadcrumb-item a:hover {
    color: var(--tf-primary);
  }
  .product-breadcrumb .breadcrumb-item.active {
    color: var(--tf-text);
  }
  .product-gallery {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    overflow: hidden;
  }
  .product-gallery .main-image {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--tf-bg);
    overflow: hidden;
  }
  .product-gallery .main-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-gallery .main-image .placeholder-icon {
    font-size: 5rem;
    color: var(--tf-text-muted);
  }
  .product-gallery .thumbnails {
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    overflow-x: auto;
  }
  .product-gallery .thumb {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    border: 2px solid transparent;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }
  .product-gallery .thumb.active {
    border-color: var(--tf-primary);
  }
  .product-gallery .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-info .category-label {
    font-size: 0.8rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }
  .product-info .category-label a {
    color: inherit;
    text-decoration: none;
  }
  .product-info h1 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .product-info .price-row {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  .product-info .price-current {
    font-size: 2rem;
    font-weight: 700;
    color: var(--tf-text);
  }
  .product-info .price-old {
    font-size: 1.1rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
  }
  .product-info .price-discount {
    background: #22c55e;
    color: #fff;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .product-info .short-desc {
    color: var(--tf-text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .qty-selector {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--tf-bg);
  }
  .qty-selector button {
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    color: var(--tf-text);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .qty-selector button:hover {
    background: var(--tf-border);
  }
  .qty-selector .qty-value {
    width: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--tf-text);
    border-left: 1px solid var(--tf-border);
    border-right: 1px solid var(--tf-border);
    padding: 0.5rem 0;
  }
  .product-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-top: 1.5rem;
  }
  .btn-wishlist {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid var(--tf-border);
    background: transparent;
    color: var(--tf-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.1rem;
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-wishlist:hover {
    border-color: #ef4444;
    color: #ef4444;
  }
  .product-meta {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--tf-border);
  }
  .product-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    font-size: 0.9rem;
    color: var(--tf-text-muted);
  }
  .product-meta .meta-item i {
    width: 20px;
    text-align: center;
    color: var(--tf-primary);
  }
  .product-description {
    padding: 3rem 0;
  }
  .product-description .desc-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2rem;
  }
  .product-description h3 {
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .product-description .desc-content {
    color: var(--tf-text-muted);
    line-height: 1.7;
  }
  .product-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function ut({product:t,galleryImages:s=[]}){const{toggleTheme:i}=q(),[a,n]=E.useState(1),[l,o]=E.useState(0),d=[];t.featuredImage&&d.push(t.featuredImage),s.forEach(x=>{x.url&&d.push(x.url)});const m=Number(t.price),b=t.oldPrice?Number(t.oldPrice):null,N=b&&b>m?Math.round((b-m)/b*100):null,g=Number(t.stock);return e.jsxs("div",{className:"product-page",children:[e.jsx("style",{children:pt}),e.jsx("nav",{className:"product-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:i,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem"},children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("div",{className:"product-breadcrumb",children:e.jsx("div",{className:"container",children:e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/eshop",children:"E-Shop"})}),t.categoryName&&e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:\`/category?slug=\${t.categorySlug||""}\`,children:t.categoryName})}),e.jsx("li",{className:"breadcrumb-item active",children:t.name})]})})})}),e.jsx("section",{className:"container pb-4",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-6",children:e.jsxs("div",{className:"product-gallery",children:[e.jsx("div",{className:"main-image",children:d.length>0?e.jsx("img",{src:d[l],alt:t.name}):e.jsx("i",{className:\`bi bi-\${t.icon||"box"} placeholder-icon\`})}),d.length>1&&e.jsx("div",{className:"thumbnails",children:d.map((x,A)=>e.jsx("div",{className:\`thumb\${A===l?" active":""}\`,onClick:()=>o(A),children:e.jsx("img",{src:x,alt:\`\${t.name} \${A+1}\`})},A))})]})}),e.jsx("div",{className:"col-lg-6",children:e.jsxs("div",{className:"product-info",children:[t.categoryName&&e.jsx("div",{className:"category-label",children:e.jsx("a",{href:\`/category?slug=\${t.categorySlug||""}\`,children:t.categoryName})}),e.jsx("h1",{children:t.name}),e.jsxs("div",{className:"price-row",children:[e.jsx("span",{className:"price-current",children:S(m)}),b&&e.jsx("span",{className:"price-old",children:S(b)}),N&&e.jsxs("span",{className:"price-discount",children:["-",N,"%"]})]}),t.shortDescription&&e.jsx("p",{className:"short-desc",children:t.shortDescription}),e.jsxs("form",{method:"post",action:\`/cart/add?productId=\${t.id}&quantity=\${a}\`,children:[e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("div",{className:"qty-selector",children:[e.jsx("button",{type:"button",onClick:()=>n(Math.max(1,a-1)),children:e.jsx("i",{className:"bi bi-dash"})}),e.jsx("div",{className:"qty-value",children:a}),e.jsx("button",{type:"button",onClick:()=>n(a+1),children:e.jsx("i",{className:"bi bi-plus"})})]}),e.jsx("input",{type:"hidden",name:"quantity",value:a})]}),e.jsxs("div",{className:"product-actions",children:[e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem",flex:1},children:[e.jsx("i",{className:"bi bi-cart-plus me-2"}),"Přidat do košíku"]}),e.jsx("button",{type:"button",className:"btn-wishlist",title:"Přidat do oblíbených",children:e.jsx("i",{className:"bi bi-heart"})})]})]}),e.jsxs("div",{className:"product-meta",children:[e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-truck"}),e.jsx("span",{children:"Doprava zdarma nad 1 000 Kč"})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-box-seam"}),e.jsx("span",{children:g>0?\`Skladem (\${t.stock} ks)\`:"Momentálně nedostupné"})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:"Záruka 2 roky"})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-arrow-return-left"}),e.jsx("span",{children:"30 dní na vrácení"})]})]})]})})]})}),t.description&&e.jsx("section",{className:"product-description",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"desc-card",children:[e.jsx("h3",{children:"Popis produktu"}),e.jsx("div",{className:"desc-content",dangerouslySetInnerHTML:{__html:t.description}})]})})}),e.jsx("footer",{className:"product-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const xt=\`
  .category-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .cat-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .cat-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .cat-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .cat-breadcrumb {
    padding: 6rem 0 1rem;
  }
  .cat-breadcrumb .breadcrumb {
    margin: 0;
    font-size: 0.85rem;
  }
  .cat-breadcrumb .breadcrumb-item a {
    color: var(--tf-text-muted);
    text-decoration: none;
  }
  .cat-breadcrumb .breadcrumb-item a:hover {
    color: var(--tf-primary);
  }
  .cat-breadcrumb .breadcrumb-item.active {
    color: var(--tf-text);
  }
  .cat-header {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .cat-header .cat-icon-lg {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: var(--tf-primary);
    overflow: hidden;
    flex-shrink: 0;
  }
  .cat-header .cat-icon-lg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cat-header h1 {
    font-weight: 800;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .cat-header p {
    color: var(--tf-text-muted);
    font-size: 0.95rem;
    margin: 0;
  }
  .cat-sort-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding: 0.75rem 1rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
  }
  .cat-sort-bar .product-count {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .cat-product-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .cat-product-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .cat-product-card .img-wrap {
    height: 200px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .cat-product-card .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cat-product-card .img-wrap i {
    font-size: 3rem;
    color: var(--tf-text-muted);
  }
  .cat-product-card .card-body {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .cat-product-card .card-body .cat-label {
    font-size: 0.75rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.5rem;
  }
  .cat-product-card .card-body h5 {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .cat-product-card .card-body h5 a {
    color: var(--tf-text);
    text-decoration: none;
  }
  .cat-product-card .card-body .desc {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
    flex: 1;
  }
  .cat-product-card .price-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }
  .cat-product-card .price-current {
    font-weight: 700;
    font-size: 1.1rem;
  }
  .cat-product-card .price-old {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
    text-decoration: line-through;
  }
  .cat-product-card .btn-add {
    margin-left: auto;
    background: var(--tf-primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .cat-product-card .btn-add:hover {
    opacity: 0.85;
  }
  .cat-empty {
    text-align: center;
    padding: 4rem 2rem;
  }
  .cat-empty i {
    font-size: 3rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    display: block;
  }
  .cat-empty p {
    color: var(--tf-text-muted);
    margin-bottom: 1.5rem;
  }
  .cat-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function ft({title:t,category:s,products:i}){const{toggleTheme:a}=q();return e.jsxs("div",{className:"category-page",children:[e.jsx("style",{children:xt}),e.jsx("nav",{className:"cat-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem"},children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("div",{className:"cat-breadcrumb",children:e.jsx("div",{className:"container",children:e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/eshop",children:"E-Shop"})}),e.jsx("li",{className:"breadcrumb-item active",children:(s==null?void 0:s.name)||t})]})})})}),e.jsx("section",{className:"container",children:e.jsx("div",{className:"cat-header",children:e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[((s==null?void 0:s.icon)||(s==null?void 0:s.featuredImage))&&e.jsx("div",{className:"cat-icon-lg",children:s!=null&&s.featuredImage?e.jsx("img",{src:s.featuredImage,alt:(s==null?void 0:s.name)||t}):e.jsx("i",{className:\`bi bi-\${(s==null?void 0:s.icon)||"grid"}\`})}),e.jsxs("div",{children:[e.jsx("h1",{children:(s==null?void 0:s.name)||t}),(s==null?void 0:s.description)&&e.jsx("p",{children:s.description})]})]})})}),e.jsx("section",{className:"container",children:e.jsx("div",{className:"cat-sort-bar",children:e.jsxs("span",{className:"product-count",children:[i.length," produktů"]})})}),e.jsx("section",{className:"container pb-5",children:i.length===0?e.jsxs("div",{className:"cat-empty",children:[e.jsx("i",{className:"bi bi-inbox"}),e.jsx("p",{children:"V této kategorii zatím nejsou žádné produkty."}),e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Zpět na E-Shop"]})]}):e.jsx("div",{className:"row g-4",children:i.map(n=>e.jsx("div",{className:"col-md-6 col-lg-4",children:e.jsxs("div",{className:"cat-product-card",children:[e.jsx("a",{href:\`/product?slug=\${n.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"img-wrap",children:n.featuredImage?e.jsx("img",{src:n.featuredImage,alt:n.name}):e.jsx("i",{className:\`bi bi-\${n.icon||"box"}\`})})}),e.jsxs("div",{className:"card-body",children:[n.categoryName&&e.jsx("div",{className:"cat-label",children:n.categoryName}),e.jsx("h5",{children:e.jsx("a",{href:\`/product?slug=\${n.slug}\`,children:n.name})}),n.shortDescription&&e.jsx("p",{className:"desc",children:n.shortDescription}),e.jsxs("div",{className:"price-row",children:[e.jsx("span",{className:"price-current",children:S(Number(n.price))}),n.oldPrice&&e.jsx("span",{className:"price-old",children:S(Number(n.oldPrice))}),e.jsx("form",{method:"post",action:\`/cart/add?productId=\${n.id}&quantity=1\`,style:{display:"inline",marginLeft:"auto"},children:e.jsx("button",{type:"submit",className:"btn-add",title:"Přidat do košíku",children:e.jsx("i",{className:"bi bi-cart-plus"})})})]})]})]})},n.id))})}),e.jsx("footer",{className:"cat-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const bt=\`
  .cart-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .cart-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .cart-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .cart-count-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    background: var(--tf-primary);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-content {
    padding: 6rem 0 3rem;
  }
  .cart-header {
    margin-bottom: 2rem;
  }
  .cart-header h1 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }
  .cart-header .item-count {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .cart-empty {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
  }
  .cart-empty i {
    font-size: 4rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    display: block;
  }
  .cart-empty h4 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .cart-empty p {
    color: var(--tf-text-muted);
    margin-bottom: 1.5rem;
  }
  .cart-item {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .cart-item .item-img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .cart-item .item-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cart-item .item-img i {
    font-size: 2rem;
    color: var(--tf-text-muted);
  }
  .cart-item .item-details {
    flex: 1;
    min-width: 0;
  }
  .cart-item .item-details .category-sm {
    font-size: 0.75rem;
    color: var(--tf-primary);
    font-weight: 600;
    text-transform: uppercase;
  }
  .cart-item .item-details h6 {
    font-weight: 600;
    margin: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cart-item .item-details .unit-price {
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .cart-item .item-qty {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--tf-bg);
  }
  .cart-item .item-qty button {
    width: 34px;
    height: 34px;
    background: transparent;
    border: none;
    color: var(--tf-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-item .item-qty button:hover {
    background: var(--tf-border);
  }
  .cart-item .item-qty .qty-val {
    width: 40px;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    border-left: 1px solid var(--tf-border);
    border-right: 1px solid var(--tf-border);
    padding: 0.4rem 0;
    color: var(--tf-text);
  }
  .cart-item .item-total {
    font-weight: 700;
    font-size: 1rem;
    white-space: nowrap;
    min-width: 100px;
    text-align: right;
  }
  .cart-item .item-remove {
    color: var(--tf-text-muted);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.25rem;
    transition: color 0.2s;
  }
  .cart-item .item-remove:hover {
    color: #ef4444;
  }
  .cart-summary {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 1.5rem;
    position: sticky;
    top: 5rem;
  }
  .cart-summary h5 {
    font-weight: 700;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .cart-summary .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    font-size: 0.95rem;
  }
  .cart-summary .summary-row .label {
    color: var(--tf-text-muted);
  }
  .cart-summary .summary-total {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0 0;
    margin-top: 0.75rem;
    border-top: 1px solid var(--tf-border);
    font-weight: 700;
    font-size: 1.15rem;
  }
  .cart-summary .summary-actions {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .cart-summary .continue-link {
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    text-decoration: none;
    display: block;
  }
  .cart-summary .continue-link:hover {
    color: var(--tf-primary);
  }
  .cart-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function gt({items:t}){const{toggleTheme:s}=q(),i=t.reduce((n,l)=>n+Number(l.quantity),0),a=t.reduce((n,l)=>n+Number(l.productPrice)*Number(l.quantity),0);return e.jsxs("div",{className:"cart-page",children:[e.jsx("style",{children:bt}),e.jsx("nav",{className:"cart-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:s,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsxs("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem",position:"relative"},children:[e.jsx("i",{className:"bi bi-cart3"}),i>0&&e.jsx("span",{className:"cart-count-badge",children:i})]})]})]})}),e.jsx("div",{className:"cart-content",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"cart-header",children:[e.jsxs("h1",{children:[e.jsx("i",{className:"bi bi-cart3 me-3"}),"Nákupní košík"]}),e.jsxs("span",{className:"item-count",children:[i," položek"]})]}),t.length===0?e.jsxs("div",{className:"cart-empty",children:[e.jsx("i",{className:"bi bi-cart-x"}),e.jsx("h4",{children:"Váš košík je prázdný"}),e.jsx("p",{children:"Podívejte se na naše produkty a začněte nakupovat."}),e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),"Přejít na E-Shop"]})]}):e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:t.map((n,l)=>{const o=Number(n.productPrice),d=Number(n.quantity),m=o*d;return e.jsxs("div",{className:"cart-item",children:[e.jsx("div",{className:"item-img",children:n.productFeaturedImage?e.jsx("img",{src:n.productFeaturedImage,alt:n.productName}):e.jsx("i",{className:\`bi bi-\${n.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-details",children:[n.categoryName&&e.jsx("div",{className:"category-sm",children:n.categoryName}),e.jsx("h6",{children:n.productName}),e.jsxs("div",{className:"unit-price",children:[S(o)," / ks"]})]}),e.jsxs("div",{className:"item-qty",children:[e.jsx("form",{method:"post",action:\`/cart/update?productId=\${n.productId}&quantity=\${Math.max(1,d-1)}\`,style:{display:"inline"},children:e.jsx("button",{type:"submit",children:e.jsx("i",{className:"bi bi-dash"})})}),e.jsx("div",{className:"qty-val",children:d}),e.jsx("form",{method:"post",action:\`/cart/update?productId=\${n.productId}&quantity=\${d+1}\`,style:{display:"inline"},children:e.jsx("button",{type:"submit",children:e.jsx("i",{className:"bi bi-plus"})})})]}),e.jsx("div",{className:"item-total",children:S(m)}),e.jsx("a",{href:\`/cart/remove?productId=\${n.productId}\`,className:"item-remove",title:"Odebrat",children:e.jsx("i",{className:"bi bi-trash3"})})]},l)})}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"cart-summary",children:[e.jsx("h5",{children:"Souhrn objednávky"}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"label",children:"Mezisoučet"}),e.jsx("span",{children:S(a)})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"label",children:"Doprava"}),e.jsx("span",{style:{color:"#22c55e"},children:"Zdarma"})]}),e.jsxs("div",{className:"summary-total",children:[e.jsx("span",{children:"Celkem"}),e.jsx("span",{children:S(a)})]}),e.jsxs("div",{className:"summary-actions",children:[e.jsxs("a",{href:"/checkout",className:"btn-primary-tf w-100 text-center",style:{padding:"0.7rem"},children:[e.jsx("i",{className:"bi bi-lock me-2"}),"Pokračovat k objednávce"]}),e.jsxs("a",{href:"/eshop",className:"continue-link",children:[e.jsx("i",{className:"bi bi-arrow-left me-1"}),"Pokračovat v nákupu"]})]})]})})]})]})}),e.jsx("footer",{className:"cart-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const vt=\`
  .checkout-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .checkout-navbar {
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .checkout-navbar .secure-label {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-navbar .secure-label i {
    color: #22c55e;
  }
  .checkout-progress {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 2rem;
  }
  .progress-steps {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  .progress-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .progress-step.active {
    color: var(--tf-primary);
    font-weight: 600;
  }
  .progress-step.completed {
    color: #22c55e;
  }
  .progress-step .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .progress-step.active .step-num {
    background: var(--tf-primary);
    border-color: var(--tf-primary);
    color: #fff;
  }
  .progress-step.completed .step-num {
    background: #22c55e;
    border-color: #22c55e;
    color: #fff;
  }
  .progress-step .step-line {
    width: 40px;
    height: 2px;
    background: var(--tf-border);
    margin-left: 0.5rem;
  }
  .progress-step.completed .step-line {
    background: #22c55e;
  }
  .checkout-content {
    padding-bottom: 3rem;
  }
  .checkout-section {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .checkout-section h5 {
    font-weight: 700;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-section h5 i {
    color: var(--tf-primary);
  }
  .checkout-section .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.85rem;
    margin-bottom: 0.35rem;
  }
  .checkout-section .form-control,
  .checkout-section .form-select {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
  }
  .checkout-section .form-control:focus,
  .checkout-section .form-select:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .checkout-section .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .shipping-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--tf-border);
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.2s;
    margin-bottom: 0.75rem;
  }
  .shipping-option:hover {
    border-color: var(--tf-text-muted);
  }
  .shipping-option.selected {
    border-color: var(--tf-primary);
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.05);
  }
  .shipping-option .option-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--tf-border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .shipping-option.selected .option-radio {
    border-color: var(--tf-primary);
  }
  .shipping-option.selected .option-radio::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--tf-primary);
  }
  .shipping-option .option-info {
    flex: 1;
  }
  .shipping-option .option-info .name {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .shipping-option .option-info .desc {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .shipping-option .option-price {
    font-weight: 600;
    white-space: nowrap;
  }
  .order-summary-sidebar {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    position: sticky;
    top: 5rem;
  }
  .order-summary-sidebar h5 {
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .order-summary-sidebar .summary-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .order-summary-sidebar .summary-item .item-thumb {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .order-summary-sidebar .summary-item .item-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .order-summary-sidebar .summary-item .item-thumb i {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-item .item-info {
    flex: 1;
    min-width: 0;
    font-size: 0.85rem;
  }
  .order-summary-sidebar .summary-item .item-info .name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .order-summary-sidebar .summary-item .item-info .qty {
    color: var(--tf-text-muted);
    font-size: 0.8rem;
  }
  .order-summary-sidebar .summary-item .item-price {
    font-weight: 600;
    white-space: nowrap;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--tf-border);
  }
  .order-summary-sidebar .summary-totals .row-total {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals .row-total .label {
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-totals .grand-total {
    display: flex;
    justify-content: space-between;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--tf-border);
    font-weight: 700;
    font-size: 1.1rem;
  }
  .checkout-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
  .checkout-nav .back-link {
    color: var(--tf-text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-nav .back-link:hover {
    color: var(--tf-primary);
  }
\`,Ae=[{id:"standard",name:"Standardní doprava",desc:"Doručení za 3-5 pracovních dní",price:0},{id:"express",name:"Expresní doprava",desc:"Doručení do 24 hodin",price:99},{id:"pickup",name:"Osobní odběr",desc:"Odběr na pobočce Praha",price:0}];function jt({items:t}){var d;const{toggleTheme:s}=q(),[i,a]=E.useState("standard"),n=t.reduce((m,b)=>m+Number(b.productPrice)*Number(b.quantity),0),l=((d=Ae.find(m=>m.id===i))==null?void 0:d.price)||0,o=n+l;return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:vt}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),"Bezpečná platba"]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:s,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"1"}),e.jsx("span",{children:"Doprava"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"2"}),e.jsx("span",{children:"Platba"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:"Shrnutí"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:"Hotovo"})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs("form",{method:"post",action:"/checkout/payment",children:[e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-person"}),"Kontaktní údaje"]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"firstName",children:"Jméno"}),e.jsx("input",{type:"text",className:"form-control",id:"firstName",name:"firstName",placeholder:"Jan",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"lastName",children:"Příjmení"}),e.jsx("input",{type:"text",className:"form-control",id:"lastName",name:"lastName",placeholder:"Novák",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:"E-mail"}),e.jsx("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"vas@email.cz",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"phone",children:"Telefon"}),e.jsx("input",{type:"tel",className:"form-control",id:"phone",name:"phone",placeholder:"+420 123 456 789"})]})]})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-geo-alt"}),"Doručovací adresa"]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label",htmlFor:"street",children:"Ulice a číslo popisné"}),e.jsx("input",{type:"text",className:"form-control",id:"street",name:"street",placeholder:"Hlavní 123",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"city",children:"Město"}),e.jsx("input",{type:"text",className:"form-control",id:"city",name:"city",placeholder:"Praha",required:!0})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"zip",children:"PSČ"}),e.jsx("input",{type:"text",className:"form-control",id:"zip",name:"zip",placeholder:"110 00",required:!0})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"country",children:"Stát"}),e.jsxs("select",{className:"form-select",id:"country",name:"country",children:[e.jsx("option",{value:"CZ",children:"Česká republika"}),e.jsx("option",{value:"SK",children:"Slovensko"}),e.jsx("option",{value:"DE",children:"Německo"}),e.jsx("option",{value:"AT",children:"Rakousko"}),e.jsx("option",{value:"PL",children:"Polsko"})]})]})]})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-truck"}),"Způsob dopravy"]}),Ae.map(m=>e.jsxs("div",{className:\`shipping-option\${i===m.id?" selected":""}\`,onClick:()=>a(m.id),children:[e.jsx("div",{className:"option-radio"}),e.jsxs("div",{className:"option-info",children:[e.jsx("div",{className:"name",children:m.name}),e.jsx("div",{className:"desc",children:m.desc})]}),e.jsx("div",{className:"option-price",children:m.price===0?e.jsx("span",{style:{color:"#22c55e"},children:"Zdarma"}):S(m.price)})]},m.id)),e.jsx("input",{type:"hidden",name:"shippingMethod",value:i})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/cart",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),"Zpět do košíku"]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:["Pokračovat k platbě",e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:"Vaše objednávka"}),t.map((m,b)=>e.jsxs("div",{className:"summary-item",children:[e.jsx("div",{className:"item-thumb",children:m.productFeaturedImage?e.jsx("img",{src:m.productFeaturedImage,alt:m.productName}):e.jsx("i",{className:\`bi bi-\${m.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:m.productName}),e.jsxs("div",{className:"qty",children:[m.quantity,"x"]})]}),e.jsx("div",{className:"item-price",children:S(Number(m.productPrice)*Number(m.quantity))})]},b)),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:"Mezisoučet"}),e.jsx("span",{children:S(n)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:"Doprava"}),e.jsx("span",{children:l===0?"Zdarma":S(l)})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:"Celkem"}),e.jsx("span",{children:S(o)})]})]})]})})]})})})]})}const Nt=\`
  .checkout-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .checkout-navbar {
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .checkout-navbar .secure-label {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-navbar .secure-label i {
    color: #22c55e;
  }
  .checkout-progress {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 2rem;
  }
  .progress-steps {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  .progress-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .progress-step.active {
    color: var(--tf-primary);
    font-weight: 600;
  }
  .progress-step.completed {
    color: #22c55e;
  }
  .progress-step .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .progress-step.active .step-num {
    background: var(--tf-primary);
    border-color: var(--tf-primary);
    color: #fff;
  }
  .progress-step.completed .step-num {
    background: #22c55e;
    border-color: #22c55e;
    color: #fff;
  }
  .progress-step .step-line {
    width: 40px;
    height: 2px;
    background: var(--tf-border);
    margin-left: 0.5rem;
  }
  .progress-step.completed .step-line {
    background: #22c55e;
  }
  .checkout-content {
    padding-bottom: 3rem;
  }
  .checkout-section {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .checkout-section h5 {
    font-weight: 700;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-section h5 i {
    color: var(--tf-primary);
  }
  .checkout-section .form-label {
    color: var(--tf-text);
    font-weight: 500;
    font-size: 0.85rem;
    margin-bottom: 0.35rem;
  }
  .checkout-section .form-control,
  .checkout-section .form-select {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    color: var(--tf-text);
    border-radius: 8px;
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
  }
  .checkout-section .form-control:focus,
  .checkout-section .form-select:focus {
    border-color: var(--tf-primary);
    box-shadow: 0 0 0 3px rgba(var(--tf-primary-rgb, 124, 58, 237), 0.15);
  }
  .checkout-section .form-control::placeholder {
    color: var(--tf-text-muted);
    opacity: 0.6;
  }
  .payment-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--tf-border);
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.2s;
    margin-bottom: 0.75rem;
  }
  .payment-option:hover {
    border-color: var(--tf-text-muted);
  }
  .payment-option.selected {
    border-color: var(--tf-primary);
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.05);
  }
  .payment-option .option-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--tf-border);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .payment-option.selected .option-radio {
    border-color: var(--tf-primary);
  }
  .payment-option.selected .option-radio::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--tf-primary);
  }
  .payment-option .option-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--tf-text-muted);
  }
  .payment-option .option-info {
    flex: 1;
  }
  .payment-option .option-info .name {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .payment-option .option-info .desc {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .card-form {
    margin-top: 1rem;
    padding: 1.25rem;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 10px;
  }
  .billing-toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    font-size: 0.9rem;
  }
  .billing-toggle .form-check-input:checked {
    background-color: var(--tf-primary);
    border-color: var(--tf-primary);
  }
  .order-summary-sidebar {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    position: sticky;
    top: 5rem;
  }
  .order-summary-sidebar h5 {
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .order-summary-sidebar .summary-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }
  .order-summary-sidebar .summary-item .item-thumb {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .order-summary-sidebar .summary-item .item-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .order-summary-sidebar .summary-item .item-thumb i {
    font-size: 1.25rem;
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-item .item-info {
    flex: 1;
    min-width: 0;
    font-size: 0.85rem;
  }
  .order-summary-sidebar .summary-item .item-info .name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .order-summary-sidebar .summary-item .item-info .qty {
    color: var(--tf-text-muted);
    font-size: 0.8rem;
  }
  .order-summary-sidebar .summary-item .item-price {
    font-weight: 600;
    white-space: nowrap;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--tf-border);
  }
  .order-summary-sidebar .summary-totals .row-total {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals .row-total .label {
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-totals .grand-total {
    display: flex;
    justify-content: space-between;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--tf-border);
    font-weight: 700;
    font-size: 1.1rem;
  }
  .checkout-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
  .checkout-nav .back-link {
    color: var(--tf-text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-nav .back-link:hover {
    color: var(--tf-primary);
  }
\`,yt=[{id:"card",name:"Platební karta",desc:"Visa, Mastercard, Maestro",icon:"credit-card"},{id:"bank",name:"Bankovní převod",desc:"Platba převodem na účet",icon:"bank"},{id:"cod",name:"Dobírka",desc:"Platba při převzetí zásilky",icon:"cash-coin"},{id:"paypal",name:"PayPal",desc:"Platba přes PayPal účet",icon:"paypal"}];function kt({items:t}){const{toggleTheme:s}=q(),[i,a]=E.useState("card"),[n,l]=E.useState(!0),o=t.reduce((d,m)=>d+Number(m.productPrice)*Number(m.quantity),0);return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:Nt}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),"Bezpečná platba"]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:s,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Doprava"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"2"}),e.jsx("span",{children:"Platba"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:"Shrnutí"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:"Hotovo"})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs("form",{method:"post",action:"/checkout/review",children:[e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-credit-card"}),"Způsob platby"]}),yt.map(d=>e.jsxs("div",{className:\`payment-option\${i===d.id?" selected":""}\`,onClick:()=>a(d.id),children:[e.jsx("div",{className:"option-radio"}),e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:\`bi bi-\${d.icon}\`})}),e.jsxs("div",{className:"option-info",children:[e.jsx("div",{className:"name",children:d.name}),e.jsx("div",{className:"desc",children:d.desc})]})]},d.id)),e.jsx("input",{type:"hidden",name:"paymentMethod",value:i}),i==="card"&&e.jsx("div",{className:"card-form",children:e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label",htmlFor:"cardNumber",children:"Číslo karty"}),e.jsx("input",{type:"text",className:"form-control",id:"cardNumber",name:"cardNumber",placeholder:"1234 5678 9012 3456"})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"form-label",htmlFor:"cardExpiry",children:"Platnost"}),e.jsx("input",{type:"text",className:"form-control",id:"cardExpiry",name:"cardExpiry",placeholder:"MM/RR"})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"form-label",htmlFor:"cardCvv",children:"CVV"}),e.jsx("input",{type:"text",className:"form-control",id:"cardCvv",name:"cardCvv",placeholder:"123"})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"form-label",htmlFor:"cardName",children:"Jméno na kartě"}),e.jsx("input",{type:"text",className:"form-control",id:"cardName",name:"cardName",placeholder:"Jan Novák"})]})]})})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-receipt"}),"Fakturační adresa"]}),e.jsxs("div",{className:"billing-toggle",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"sameAsBilling",checked:n,onChange:d=>l(d.target.checked)}),e.jsx("label",{className:"form-check-label",htmlFor:"sameAsBilling",style:{color:"var(--tf-text)",fontSize:"0.9rem"},children:"Stejná jako doručovací adresa"})]}),!n&&e.jsxs("div",{className:"row g-3 mt-1",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"company",children:"Firma (volitelné)"}),e.jsx("input",{type:"text",className:"form-control",id:"company",name:"company",placeholder:"Název firmy"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"ico",children:"ICO"}),e.jsx("input",{type:"text",className:"form-control",id:"ico",name:"ico",placeholder:"12345678"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"dic",children:"DIC"}),e.jsx("input",{type:"text",className:"form-control",id:"dic",name:"dic",placeholder:"CZ12345678"})]}),e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label",htmlFor:"billingStreet",children:"Ulice a číslo popisné"}),e.jsx("input",{type:"text",className:"form-control",id:"billingStreet",name:"billingStreet",placeholder:"Hlavní 123"})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"billingCity",children:"Město"}),e.jsx("input",{type:"text",className:"form-control",id:"billingCity",name:"billingCity",placeholder:"Praha"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"billingZip",children:"PSČ"}),e.jsx("input",{type:"text",className:"form-control",id:"billingZip",name:"billingZip",placeholder:"110 00"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"billingCountry",children:"Stát"}),e.jsxs("select",{className:"form-select",id:"billingCountry",name:"billingCountry",children:[e.jsx("option",{value:"CZ",children:"Česká republika"}),e.jsx("option",{value:"SK",children:"Slovensko"}),e.jsx("option",{value:"DE",children:"Německo"}),e.jsx("option",{value:"AT",children:"Rakousko"}),e.jsx("option",{value:"PL",children:"Polsko"})]})]})]})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/checkout",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),"Zpět k dopravě"]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:["Pokračovat ke shrnutí",e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:"Vaše objednávka"}),t.map((d,m)=>e.jsxs("div",{className:"summary-item",children:[e.jsx("div",{className:"item-thumb",children:d.productFeaturedImage?e.jsx("img",{src:d.productFeaturedImage,alt:d.productName}):e.jsx("i",{className:\`bi bi-\${d.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:d.productName}),e.jsxs("div",{className:"qty",children:[d.quantity,"x"]})]}),e.jsx("div",{className:"item-price",children:S(Number(d.productPrice)*Number(d.quantity))})]},m)),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:"Mezisoučet"}),e.jsx("span",{children:S(o)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:"Doprava"}),e.jsx("span",{style:{color:"#22c55e"},children:"Zdarma"})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:"Celkem"}),e.jsx("span",{children:S(o)})]})]})]})})]})})})]})}const wt=\`
  .checkout-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .checkout-navbar {
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .checkout-navbar .secure-label {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-navbar .secure-label i {
    color: #22c55e;
  }
  .checkout-progress {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 2rem;
  }
  .progress-steps {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  .progress-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .progress-step.active {
    color: var(--tf-primary);
    font-weight: 600;
  }
  .progress-step.completed {
    color: #22c55e;
  }
  .progress-step .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .progress-step.active .step-num {
    background: var(--tf-primary);
    border-color: var(--tf-primary);
    color: #fff;
  }
  .progress-step.completed .step-num {
    background: #22c55e;
    border-color: #22c55e;
    color: #fff;
  }
  .progress-step .step-line {
    width: 40px;
    height: 2px;
    background: var(--tf-border);
    margin-left: 0.5rem;
  }
  .progress-step.completed .step-line {
    background: #22c55e;
  }
  .checkout-content {
    padding-bottom: 3rem;
  }
  .review-section {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .review-section .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .review-section .section-header h5 {
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .review-section .section-header h5 i {
    color: var(--tf-primary);
  }
  .review-section .section-header .edit-link {
    color: var(--tf-primary);
    text-decoration: none;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .review-section .section-header .edit-link:hover {
    text-decoration: underline;
  }
  .review-section .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
  .review-section .info-item .label {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
    margin-bottom: 0.15rem;
  }
  .review-section .info-item .value {
    font-size: 0.95rem;
    font-weight: 500;
  }
  .review-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--tf-border);
  }
  .review-item:last-child {
    border-bottom: none;
  }
  .review-item .item-thumb {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }
  .review-item .item-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .review-item .item-thumb i {
    font-size: 1.5rem;
    color: var(--tf-text-muted);
  }
  .review-item .item-info {
    flex: 1;
    min-width: 0;
  }
  .review-item .item-info .name {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .review-item .item-info .qty {
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
  .review-item .item-price {
    font-weight: 700;
    white-space: nowrap;
  }
  .order-summary-sidebar {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 12px;
    padding: 1.5rem;
    position: sticky;
    top: 5rem;
  }
  .order-summary-sidebar h5 {
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--tf-border);
  }
  .order-summary-sidebar .summary-totals .row-total {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
    font-size: 0.9rem;
  }
  .order-summary-sidebar .summary-totals .row-total .label {
    color: var(--tf-text-muted);
  }
  .order-summary-sidebar .summary-totals .grand-total {
    display: flex;
    justify-content: space-between;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--tf-border);
    font-weight: 700;
    font-size: 1.15rem;
  }
  .order-summary-sidebar .submit-actions {
    margin-top: 1.5rem;
  }
  .security-notice {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--tf-text-muted);
    font-size: 0.8rem;
    margin-top: 1rem;
    text-align: center;
    justify-content: center;
  }
  .security-notice i {
    color: #22c55e;
  }
  .checkout-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
  .checkout-nav .back-link {
    color: var(--tf-text-muted);
    text-decoration: none;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .checkout-nav .back-link:hover {
    color: var(--tf-primary);
  }
\`;function zt({items:t}){const{toggleTheme:s}=q(),i=t.reduce((a,n)=>a+Number(n.productPrice)*Number(n.quantity),0);return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:wt}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),"Bezpečná platba"]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:s,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Doprava"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Platba"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:"Shrnutí"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:"Hotovo"})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-bag"}),"Položky objednávky"]}),e.jsxs("a",{href:"/cart",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),"Upravit"]})]}),t.map((a,n)=>e.jsxs("div",{className:"review-item",children:[e.jsx("div",{className:"item-thumb",children:a.productFeaturedImage?e.jsx("img",{src:a.productFeaturedImage,alt:a.productName}):e.jsx("i",{className:\`bi bi-\${a.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:a.productName}),e.jsxs("div",{className:"qty",children:[a.quantity,"x ",S(Number(a.productPrice))]})]}),e.jsx("div",{className:"item-price",children:S(Number(a.productPrice)*Number(a.quantity))})]},n))]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-person"}),"Kontaktní údaje"]}),e.jsxs("a",{href:"/checkout",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),"Upravit"]})]}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Jméno"}),e.jsx("div",{className:"value",children:"Jan Novák"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"E-mail"}),e.jsx("div",{className:"value",children:"jan@email.cz"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Telefon"}),e.jsx("div",{className:"value",children:"+420 123 456 789"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Adresa"}),e.jsx("div",{className:"value",children:"Hlavní 123, Praha 110 00"})]})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-truck"}),"Způsob dopravy"]}),e.jsxs("a",{href:"/checkout",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),"Upravit"]})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-truck",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"Standardní doprava (3-5 pracovních dní)"}),e.jsx("span",{className:"ms-auto fw-bold",style:{color:"#22c55e"},children:"Zdarma"})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-credit-card"}),"Způsob platby"]}),e.jsxs("a",{href:"/checkout/payment",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),"Upravit"]})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-credit-card",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"Platební karta (**** 3456)"})]})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/checkout/payment",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),"Zpět k platbě"]}),e.jsx("form",{method:"post",action:"/checkout/confirm",style:{display:"inline"},children:e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[e.jsx("i",{className:"bi bi-check-circle me-2"}),"Odeslat objednávku"]})})]}),e.jsxs("div",{className:"security-notice",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),"Vaše data jsou chráněna šifrováním SSL a zpracovávána bezpečně."]})]}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:"Souhrn objednávky"}),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsxs("span",{className:"label",children:["Mezisoučet (",t.length," položek)"]}),e.jsx("span",{children:S(i)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:"Doprava"}),e.jsx("span",{style:{color:"#22c55e"},children:"Zdarma"})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:"Celkem"}),e.jsx("span",{children:S(i)})]})]})]})})]})})})]})}const St=\`
  .confirmation-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .confirmation-navbar {
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .checkout-progress {
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--tf-border);
    margin-bottom: 3rem;
  }
  .progress-steps {
    display: flex;
    justify-content: center;
    gap: 0;
    max-width: 600px;
    margin: 0 auto;
  }
  .progress-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    font-size: 0.85rem;
    color: var(--tf-text-muted);
  }
  .progress-step.completed {
    color: #22c55e;
  }
  .progress-step .step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }
  .progress-step.completed .step-num {
    background: #22c55e;
    border-color: #22c55e;
    color: #fff;
  }
  .progress-step .step-line {
    width: 40px;
    height: 2px;
    background: var(--tf-border);
    margin-left: 0.5rem;
  }
  .progress-step.completed .step-line {
    background: #22c55e;
  }
  .confirmation-content {
    padding-bottom: 4rem;
  }
  .confirmation-card {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 20px;
    padding: 3rem 2rem;
  }
  .confirmation-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(34, 197, 94, 0.1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .confirmation-icon i {
    font-size: 2.5rem;
    color: #22c55e;
  }
  .confirmation-card h2 {
    font-weight: 800;
    margin-bottom: 0.75rem;
  }
  .confirmation-card .subtitle {
    color: var(--tf-text-muted);
    font-size: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
  .confirmation-card .order-ref {
    display: inline-block;
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-family: monospace;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--tf-primary);
    margin: 1rem 0 1.5rem;
  }
  .confirmation-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 2rem;
  }
  .confirmation-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function Pt(){const{toggleTheme:t}=q();return e.jsxs("div",{className:"confirmation-page",children:[e.jsx("style",{children:St}),e.jsx("nav",{className:"confirmation-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:t,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Doprava"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Platba"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Shrnutí"}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:"Hotovo"})]})]})})}),e.jsx("div",{className:"confirmation-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"confirmation-card",children:[e.jsx("div",{className:"confirmation-icon",children:e.jsx("i",{className:"bi bi-check-circle-fill"})}),e.jsx("h2",{children:"Děkujeme za objednávku!"}),e.jsxs("p",{className:"subtitle",children:["Vaše objednávka byla úspěšně přijata.",e.jsx("br",{}),"Potvrzení jsme odeslali na váš e-mail."]}),e.jsxs("div",{className:"confirmation-actions",children:[e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),"Pokračovat v nákupu"]}),e.jsxs("a",{href:"/",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-house me-2"}),"Na hlavní stránku"]})]})]})})}),e.jsx("footer",{className:"confirmation-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Ct=\`
  .blog-list-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .blog-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .blog-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .blog-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .blog-header {
    padding: 8rem 0 3rem;
    text-align: center;
  }
  .blog-header h1 {
    font-size: 2.75rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
  }
  .blog-header p {
    color: var(--tf-text-muted);
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
  }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    padding-bottom: 3rem;
  }
  .blog-card {
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    display: flex;
    flex-direction: column;
  }
  .blog-card:hover {
    border-color: var(--tf-primary);
    transform: translateY(-2px);
  }
  .blog-card .card-img {
    height: 200px;
    background: var(--tf-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .blog-card .card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .blog-card .card-img .placeholder {
    font-size: 3rem;
    color: var(--tf-text-muted);
  }
  .blog-card .card-body {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .blog-card .card-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }
  .blog-card .card-meta .category-badge {
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.1);
    color: var(--tf-primary);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .blog-card .card-meta .date {
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .blog-card h5 {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  .blog-card h5 a {
    color: var(--tf-text);
    text-decoration: none;
  }
  .blog-card h5 a:hover {
    color: var(--tf-primary);
  }
  .blog-card .excerpt {
    color: var(--tf-text-muted);
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .blog-card .card-footer-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid var(--tf-border);
    font-size: 0.8rem;
    color: var(--tf-text-muted);
  }
  .blog-card .card-footer-meta .author {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .blog-card .card-footer-meta .read-time {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .blog-empty {
    text-align: center;
    padding: 4rem 2rem;
  }
  .blog-empty i {
    font-size: 3rem;
    color: var(--tf-text-muted);
    margin-bottom: 1rem;
    display: block;
  }
  .blog-empty p {
    color: var(--tf-text-muted);
  }
  .blog-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function Tt({posts:t}){const{toggleTheme:s}=q();return e.jsxs("div",{className:"blog-list-page",children:[e.jsx("style",{children:Ct}),e.jsx("nav",{className:"blog-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:"Domů"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",style:{color:"var(--tf-text)"},children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:s,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("section",{className:"blog-header",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"hero-badge",children:[e.jsx("i",{className:"bi bi-newspaper me-1"}),"Blog"]}),e.jsxs("h1",{children:["Novinky a ",e.jsx("span",{className:"text-gradient",children:"články"})]}),e.jsx("p",{children:"Nejnovější články o vývoji, technologiích a novinkách z TypeForge."})]})}),e.jsx("section",{className:"container",children:t.length===0?e.jsxs("div",{className:"blog-empty",children:[e.jsx("i",{className:"bi bi-journal-x"}),e.jsx("p",{children:"Zatím nemáme žádné články. Zkuste to později."})]}):e.jsx("div",{className:"blog-grid",children:t.map(i=>e.jsxs("div",{className:"blog-card",children:[e.jsx("a",{href:\`/article?slug=\${i.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"card-img",children:i.featuredImage?e.jsx("img",{src:i.featuredImage,alt:i.title}):e.jsx("i",{className:"bi bi-file-earmark-text placeholder"})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"card-meta",children:[i.category&&e.jsx("span",{className:"category-badge",children:i.category}),e.jsx("span",{className:"date",children:Y(i.createdAt)})]}),e.jsx("h5",{children:e.jsx("a",{href:\`/article?slug=\${i.slug}\`,children:i.title})}),i.excerpt&&e.jsx("p",{className:"excerpt",children:i.excerpt}),e.jsxs("div",{className:"card-footer-meta",children:[i.author?e.jsxs("span",{className:"author",children:[e.jsx("i",{className:"bi bi-person"}),i.author]}):e.jsx("span",{}),i.readTime?e.jsxs("span",{className:"read-time",children:[e.jsx("i",{className:"bi bi-clock"}),i.readTime]}):e.jsx("span",{})]})]})]},i.id))})}),e.jsx("footer",{className:"blog-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const _t=\`
  .article-page {
    background: var(--tf-bg);
    color: var(--tf-text);
    min-height: 100vh;
  }
  .article-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    background: rgba(var(--tf-surface-rgb, 30, 30, 46), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--tf-border);
    padding: 0.75rem 0;
  }
  .article-navbar .nav-link {
    color: var(--tf-text-muted);
    transition: color 0.2s;
    font-size: 0.9rem;
  }
  .article-navbar .nav-link:hover {
    color: var(--tf-text);
  }
  .article-header {
    padding: 7rem 0 2rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  .article-header .category-badge {
    display: inline-block;
    background: rgba(var(--tf-primary-rgb, 124, 58, 237), 0.1);
    color: var(--tf-primary);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.3rem 0.75rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 1rem;
  }
  .article-header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.25rem;
  }
  .article-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    color: var(--tf-text-muted);
    font-size: 0.9rem;
  }
  .article-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .article-meta .meta-item i {
    font-size: 0.95rem;
  }
  .article-featured-image {
    max-width: 900px;
    margin: 2rem auto;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--tf-border);
  }
  .article-featured-image img {
    width: 100%;
    height: auto;
    display: block;
  }
  .article-content-card {
    max-width: 800px;
    margin: 0 auto;
    background: var(--tf-surface);
    border: 1px solid var(--tf-border);
    border-radius: 16px;
    padding: 2.5rem;
    margin-bottom: 3rem;
  }
  .article-content-card .article-body {
    color: var(--tf-text);
    line-height: 1.8;
    font-size: 1rem;
  }
  .article-content-card .article-body h1,
  .article-content-card .article-body h2,
  .article-content-card .article-body h3,
  .article-content-card .article-body h4 {
    color: var(--tf-text);
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  .article-content-card .article-body h2 {
    font-size: 1.5rem;
  }
  .article-content-card .article-body h3 {
    font-size: 1.25rem;
  }
  .article-content-card .article-body p {
    margin-bottom: 1rem;
    color: var(--tf-text-muted);
  }
  .article-content-card .article-body a {
    color: var(--tf-primary);
    text-decoration: none;
  }
  .article-content-card .article-body a:hover {
    text-decoration: underline;
  }
  .article-content-card .article-body ul,
  .article-content-card .article-body ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: var(--tf-text-muted);
  }
  .article-content-card .article-body li {
    margin-bottom: 0.35rem;
  }
  .article-content-card .article-body blockquote {
    border-left: 3px solid var(--tf-primary);
    padding: 0.75rem 1.25rem;
    margin: 1.5rem 0;
    background: var(--tf-bg);
    border-radius: 0 8px 8px 0;
    color: var(--tf-text-muted);
    font-style: italic;
  }
  .article-content-card .article-body pre {
    background: var(--tf-bg);
    border: 1px solid var(--tf-border);
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.85rem;
    margin: 1.5rem 0;
  }
  .article-content-card .article-body code {
    background: var(--tf-bg);
    padding: 0.15rem 0.35rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: var(--tf-primary);
  }
  .article-content-card .article-body pre code {
    background: none;
    padding: 0;
    color: var(--tf-text);
  }
  .article-content-card .article-body img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }
  .article-footer {
    padding: 2rem 0;
    border-top: 1px solid var(--tf-border);
    text-align: center;
    color: var(--tf-text-muted);
    font-size: 0.85rem;
  }
\`;function At({title:t,content:s,category:i,date:a,author:n,readTime:l,featuredImageUrl:o}){const{toggleTheme:d}=q();return e.jsxs("div",{className:"article-page",children:[e.jsx("style",{children:_t}),e.jsx("nav",{className:"article-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:"Domů"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:d,title:"Přepnout téma",style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("header",{className:"article-header",children:e.jsxs("div",{className:"container",children:[i&&e.jsx("span",{className:"category-badge",children:i}),e.jsx("h1",{children:e.jsx("span",{className:"text-gradient",children:t})}),e.jsxs("div",{className:"article-meta",children:[a&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-calendar3"}),Y(a)]}),n&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-person"}),n]}),l&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-clock"}),l]})]})]})}),o&&e.jsx("div",{className:"article-featured-image",children:e.jsx("img",{src:o,alt:t})}),e.jsx("section",{className:"container",children:e.jsx("div",{className:"article-content-card",children:e.jsx("div",{className:"article-body",dangerouslySetInnerHTML:{__html:s}})})}),e.jsx("div",{className:"container text-center mb-4",children:e.jsxs("a",{href:"/blog",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),"Zpět na blog"]})}),e.jsx("footer",{className:"article-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Et={AdminDashboard:Ir,AdminAnalytics:Dr,AdminProductList:Vr,AdminProductForm:qr,AdminCategoryList:Lr,AdminCategoryForm:Br,AdminOrderList:Mr,AdminOrderDetail:Zr,AdminOrderForm:\$r,AdminBlogList:Ur,AdminBlogForm:Wr,AdminMedia:Jr,AdminCustomerList:Qr,Landing:it,Login:ot,Register:dt,Eshop:ht,Product:ut,Category:ft,Cart:gt,CheckoutShipping:jt,CheckoutPayment:kt,CheckoutReview:zt,CheckoutConfirmation:Pt,BlogList:Tt,Article:At};window.__REACT_RENDER__=(t,s,i)=>{const a=Et[t];if(!a){console.error(\`[TypeForge React] Unknown component: "\${t}"\`);return}const n=document.getElementById(i);if(!n){console.error(\`[TypeForge React] Container not found: "#\${i}"\`);return}tr.createRoot(n).render(e.jsx(nr,{children:e.jsx(a,{...s})}))}})(React,ReactDOM);
`;

export const REACT_BUNDLE_CSS = `.admin-wrapper{min-height:100vh;display:flex;max-width:100vw;overflow-x:hidden}.admin-sidebar{width:260px;flex-shrink:0;background:var(--tf-surface);border-right:1px solid var(--tf-border);position:fixed;top:0;left:0;height:100vh;padding:1.5rem;display:flex;flex-direction:column;z-index:1000}.admin-logo{display:flex;align-items:center;gap:.75rem;padding:.5rem 0 1.5rem;border-bottom:1px solid var(--tf-border);margin-bottom:1.5rem;text-decoration:none}.admin-logo i{font-size:1.5rem}.admin-logo span{font-weight:800;font-size:1.2rem}.admin-nav{flex:1;overflow-y:auto}.admin-nav-section{margin-bottom:1.5rem}.admin-nav-label{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--tf-text-muted);padding:0 .75rem;margin-bottom:.5rem}.admin-nav-item{display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:10px;color:var(--tf-text);text-decoration:none;transition:all .2s ease;margin-bottom:.25rem}.admin-nav-item:hover{background:#7c5cfc1a;color:var(--tf-primary-light)}.admin-nav-item.active{background:var(--tf-gradient);color:#fff}.admin-nav-item i{font-size:1.1rem;width:24px;text-align:center}.admin-nav-item span{font-weight:500;font-size:.95rem}.admin-nav-badge{margin-left:auto;padding:.2rem .5rem;border-radius:50px;font-size:.7rem;font-weight:700;background:var(--tf-accent);color:#0f0f17}.admin-user{padding-top:1rem;border-top:1px solid var(--tf-border);display:flex;align-items:center;gap:.75rem}.admin-user-avatar{width:40px;height:40px;border-radius:50%;background:var(--tf-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700}.admin-user-info{flex:1}.admin-user-name{font-weight:600;font-size:.9rem}.admin-user-role{font-size:.75rem;color:var(--tf-text-muted)}.admin-main{flex:1;min-width:0;margin-left:260px;padding:2rem;background:var(--tf-bg);overflow-x:hidden}.admin-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem}.admin-title{font-size:1.75rem;font-weight:800}.admin-header-actions{display:flex;align-items:center;gap:1rem}.admin-search{position:relative}.admin-search input{width:280px;padding:.6rem 1rem .6rem 2.5rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:10px;color:var(--tf-text);font-size:.9rem}.admin-search input:focus{border-color:var(--tf-primary);outline:none}.admin-search i{position:absolute;left:.85rem;top:50%;transform:translateY(-50%);color:var(--tf-text-muted)}.card-section{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:1.5rem;margin-bottom:1.5rem}.card-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.card-section-title{font-size:1.1rem;font-weight:700}.data-table{width:100%}.data-table th{text-align:left;padding:.75rem 1rem;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--tf-text-muted);border-bottom:1px solid var(--tf-border)}.data-table td{padding:1rem;font-size:.9rem;border-bottom:1px solid var(--tf-border);vertical-align:middle}.data-table tr:last-child td{border-bottom:none}.data-table tr:hover td{background:#7c5cfc08}.status-badge{display:inline-flex;padding:.3rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.status-badge.success{background:#06d6a026;color:var(--tf-accent)}.status-badge.warning{background:#fbbf2426;color:#fbbf24}.status-badge.info{background:#3b82f626;color:#60a5fa}.status-badge.danger{background:#ef444426;color:#ef4444}.btn-action{width:32px;height:32px;border-radius:8px;border:1px solid var(--tf-border);background:transparent;color:var(--tf-text-muted);cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center;margin-right:.25rem}.btn-action:hover{border-color:var(--tf-primary);color:var(--tf-primary);background:#7c5cfc1a}.btn-action.danger:hover{border-color:#ef4444;color:#ef4444;background:#ef44441a}.btn-add{padding:.6rem 1.25rem;border-radius:10px;font-weight:600;font-size:.9rem;background:var(--tf-gradient);color:#fff;border:none;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;gap:.5rem}.btn-add:hover{transform:translateY(-2px);box-shadow:0 4px 15px #7c5cfc4d}.stat-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:1.5rem;transition:all .3s ease}.stat-card:hover{border-color:#7c5cfc4d;transform:translateY(-2px)}.stat-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem}.stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem}.stat-icon.purple{background:#7c5cfc26;color:var(--tf-primary-light)}.stat-icon.green{background:#06d6a026;color:var(--tf-accent)}.stat-icon.blue{background:#3b82f626;color:#60a5fa}.stat-icon.orange{background:#fb923c26;color:#fb923c}.stat-value{font-size:2rem;font-weight:800;margin-bottom:.25rem}.stat-label{font-size:.9rem;color:var(--tf-text-muted)}.stat-change{font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:.25rem}.stat-change.up{color:var(--tf-accent)}.stat-change.down{color:#ef4444}.avatar{width:36px;height:36px;border-radius:50%;background:var(--tf-gradient-subtle);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:600;color:var(--tf-primary-light)}.order-customer{display:flex;align-items:center;gap:.75rem}.order-avatar{width:36px;height:36px;border-radius:50%;background:var(--tf-gradient);display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:600;color:#fff;flex-shrink:0}.order-id{font-weight:600;color:var(--tf-primary-light)}.order-status{display:inline-flex;padding:.3rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.order-status.completed{background:#06d6a026;color:var(--tf-accent)}.order-status.processing{background:#3b82f626;color:#60a5fa}.order-status.pending{background:#fbbf2426;color:#fbbf24}.order-status.cancelled{background:#ef444426;color:#ef4444}.filter-bar{display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.filter-select{padding:.5rem 1rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:8px;color:var(--tf-text);font-size:.9rem}.filter-select:focus{border-color:var(--tf-primary);outline:none}.pagination{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}.page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--tf-border);background:var(--tf-surface);color:var(--tf-text);font-weight:600;font-size:.9rem;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center}.page-btn:hover,.page-btn.active{border-color:var(--tf-primary);background:var(--tf-primary);color:#fff}.form-group{margin-bottom:1.25rem}.form-label{display:block;font-weight:600;font-size:.9rem;margin-bottom:.5rem;color:var(--tf-text)}.form-control{width:100%;padding:.75rem 1rem;background:var(--tf-bg);border:1px solid var(--tf-border);border-radius:10px;color:var(--tf-text);font-size:.95rem}.form-control:focus{border-color:var(--tf-primary);outline:none;box-shadow:0 0 0 3px #7c5cfc26}.form-switch{display:flex;align-items:center;gap:.75rem}.toggle-switch{width:48px;height:26px;background:var(--tf-border);border-radius:13px;position:relative;cursor:pointer;transition:background .2s ease}.toggle-switch.active{background:var(--tf-accent)}.toggle-switch:after{content:"";position:absolute;width:20px;height:20px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s ease}.toggle-switch.active:after{transform:translate(22px)}.media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem}.media-item{aspect-ratio:1;background:var(--tf-bg);border:1px solid var(--tf-border);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.media-item:hover{border-color:var(--tf-primary);transform:scale(1.02)}.media-item i{font-size:2.5rem;color:var(--tf-text-muted)}.chart-placeholder{height:300px;background:var(--tf-bg);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px dashed var(--tf-border)}.chart-placeholder i{font-size:3rem;color:var(--tf-text-muted)}.mobile-menu-btn{display:none;width:44px;height:44px;border-radius:10px;border:1px solid var(--tf-border);background:var(--tf-surface);color:var(--tf-text);font-size:1.25rem;cursor:pointer;align-items:center;justify-content:center}.sidebar-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#00000080;z-index:999}.sidebar-close{display:none;position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:8px;border:none;background:var(--tf-bg);color:var(--tf-text);font-size:1.25rem;cursor:pointer;align-items:center;justify-content:center}@media(max-width:992px){.mobile-menu-btn,.sidebar-close{display:flex}.admin-sidebar{transform:translate(-100%);transition:transform .3s ease}.admin-sidebar.open{transform:translate(0)}.sidebar-overlay.open{display:block}.admin-main{margin-left:0;padding:1rem}.admin-header{flex-direction:column;align-items:flex-start;gap:1rem}.admin-header>div:first-child{display:flex;align-items:center;gap:1rem;width:100%}.admin-title{font-size:1.35rem}.admin-header-actions{width:100%}.admin-search{flex:1}.admin-search input{width:100%}.stat-value{font-size:1.5rem}.data-table{display:block;overflow-x:auto}.filter-bar{flex-direction:column}.filter-select{width:100%}.card-section{padding:1rem}.card-section-header{flex-direction:column;align-items:flex-start;gap:.75rem}}@media(max-width:576px){.admin-main{padding:.75rem}.stat-card{padding:1rem}.stat-icon{width:40px;height:40px;font-size:1rem}.stat-value{font-size:1.25rem}.btn-add{width:100%;justify-content:center}.media-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}}.footer-tf{background:var(--tf-surface);border-top:1px solid var(--tf-border);padding:4rem 0 2rem;margin-top:auto}.footer-brand{display:flex;align-items:center;gap:.75rem;font-size:1.5rem;font-weight:800;margin-bottom:1rem}.footer-brand i{font-size:1.75rem}.footer-desc{color:var(--tf-text-muted);font-size:.95rem;line-height:1.7;margin-bottom:1.5rem;max-width:300px}.footer-social{display:flex;gap:.75rem}.footer-social-link{width:40px;height:40px;border-radius:10px;background:var(--tf-bg);border:1px solid var(--tf-border);display:flex;align-items:center;justify-content:center;color:var(--tf-text-muted);transition:all .2s ease}.footer-social-link:hover{border-color:var(--tf-primary);color:var(--tf-primary);transform:translateY(-2px)}.footer-title{font-weight:700;font-size:.9rem;margin-bottom:1.25rem;color:var(--tf-text)}.footer-links{list-style:none;padding:0;margin:0}.footer-links li{margin-bottom:.75rem}.footer-links a{color:var(--tf-text-muted);text-decoration:none;font-size:.9rem;transition:color .2s ease}.footer-links a:hover{color:var(--tf-primary-light)}.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;margin-top:3rem;border-top:1px solid var(--tf-border)}.footer-copyright{color:var(--tf-text-muted);font-size:.85rem}.footer-bottom-links{display:flex;gap:1.5rem}.footer-bottom-links a{color:var(--tf-text-muted);text-decoration:none;font-size:.85rem;transition:color .2s ease}.footer-bottom-links a:hover{color:var(--tf-primary-light)}@media(max-width:768px){.footer-bottom{flex-direction:column;gap:1rem;text-align:center}}.page-wrapper{min-height:100vh}.pt-navbar{padding-top:6rem}.pb-section{padding-bottom:4rem}.product-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;overflow:hidden;transition:all .3s ease}.product-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px);box-shadow:0 8px 30px #00000026}.product-image{aspect-ratio:4/3;background:var(--tf-bg);display:flex;align-items:center;justify-content:center;position:relative}.product-badge{position:absolute;top:.75rem;right:.75rem;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600;background:var(--tf-gradient);color:#fff}.product-body{padding:1.25rem}.product-category{font-size:.8rem;color:var(--tf-primary-light);font-weight:600;margin-bottom:.5rem}.product-title{font-weight:700;font-size:1rem;margin-bottom:.5rem;color:var(--tf-text)}.product-desc{font-size:.85rem;color:var(--tf-text-muted);margin-bottom:1rem}.product-footer{display:flex;align-items:center;justify-content:space-between}.product-price{font-weight:800;font-size:1.1rem;color:var(--tf-text)}.product-price-old{text-decoration:line-through;color:var(--tf-text-muted);font-size:.85rem;margin-left:.5rem}.btn-cart{width:36px;height:36px;border-radius:10px;border:1px solid var(--tf-border);background:transparent;color:var(--tf-text-muted);cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.btn-cart:hover{border-color:var(--tf-primary);color:var(--tf-primary);background:#7c5cfc1a}.category-card{display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:1.5rem 1rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;transition:all .3s ease}.category-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px)}.category-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem}.category-title{font-weight:700;font-size:.9rem;margin:0;color:var(--tf-text);text-align:center}.category-count{font-size:.8rem;color:var(--tf-text-muted)}.category-list-item{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;text-decoration:none;color:var(--tf-text);border-radius:8px;transition:all .2s ease}.category-list-item:hover,.category-list-item.active{background:#7c5cfc1a;color:var(--tf-primary-light)}.category-list-count{font-size:.8rem;color:var(--tf-text-muted)}.hero-section{padding:6rem 0 4rem}.hero-title{font-size:3.5rem;font-weight:800;line-height:1.1;margin-bottom:1.5rem}.hero-subtitle{font-size:1.25rem;color:var(--tf-text-muted);max-width:600px;line-height:1.7}.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:50px;font-size:.85rem;font-weight:600;background:#7c5cfc26;color:var(--tf-primary-light);margin-bottom:1.5rem}.eshop-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:50px;font-size:.85rem;font-weight:600;background:#06d6a026;color:var(--tf-accent);margin-bottom:1.5rem}.section-label{display:inline-flex;align-items:center;gap:.5rem;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--tf-primary-light);margin-bottom:.75rem}.feature-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:2rem;transition:all .3s ease}.feature-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px)}.feature-icon{width:56px;height:56px;border-radius:14px;background:#7c5cfc26;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--tf-primary-light);margin-bottom:1.25rem}.step-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:2rem;text-align:center}.step-number{width:48px;height:48px;border-radius:50%;background:var(--tf-gradient);color:#fff;font-weight:800;font-size:1.25rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}.cta-section{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:24px;padding:4rem 2rem;margin:4rem 0}.navbar-tf{background:var(--tf-navbar-bg)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--tf-border);padding:1rem 0}.navbar-tf .navbar-brand{font-weight:800;font-size:1.25rem}.navbar-tf .nav-link{font-weight:500;color:var(--tf-text-muted)!important;transition:color .2s ease}.navbar-tf .nav-link:hover,.navbar-tf .nav-link.active{color:var(--tf-primary-light)!important}.alert-danger{background:#ef44441a;border:1px solid rgba(239,68,68,.3);color:#ef4444;border-radius:12px;padding:1rem 1.25rem}
`;
