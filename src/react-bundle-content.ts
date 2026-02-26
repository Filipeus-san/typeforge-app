export const REACT_BUNDLE_JS = `(function(p,La,We){"use strict";function qa(t){const a=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const r in t)if(r!=="default"){const n=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(a,r,n.get?n:{enumerable:!0,get:()=>t[r]})}}return a.default=t,Object.freeze(a)}const B=qa(p);function wt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var ot={exports:{}},Xe={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cr;function Ba(){if(cr)return Xe;cr=1;var t=p,a=Symbol.for("react.element"),r=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function l(o,d,u){var m,f={},g=null,b=null;u!==void 0&&(g=""+u),d.key!==void 0&&(g=""+d.key),d.ref!==void 0&&(b=d.ref);for(m in d)n.call(d,m)&&!i.hasOwnProperty(m)&&(f[m]=d[m]);if(o&&o.defaultProps)for(m in d=o.defaultProps,d)f[m]===void 0&&(f[m]=d[m]);return{\$\$typeof:a,type:o,key:g,ref:b,props:f,_owner:s.current}}return Xe.Fragment=r,Xe.jsx=l,Xe.jsxs=l,Xe}var Qe={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dr;function Va(){return dr||(dr=1,process.env.NODE_ENV!=="production"&&(function(){var t=p,a=Symbol.for("react.element"),r=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),o=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),f=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),b=Symbol.for("react.offscreen"),P=Symbol.iterator,j="@@iterator";function v(c){if(c===null||typeof c!="object")return null;var h=P&&c[P]||c[j];return typeof h=="function"?h:null}var N=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function E(c){{for(var h=arguments.length,C=new Array(h>1?h-1:0),I=1;I<h;I++)C[I-1]=arguments[I];L("error",c,C)}}function L(c,h,C){{var I=N.ReactDebugCurrentFrame,ne=I.getStackAddendum();ne!==""&&(h+="%s",C=C.concat([ne]));var oe=C.map(function(G){return String(G)});oe.unshift("Warning: "+h),Function.prototype.apply.call(console[c],console,oe)}}var V=!1,y=!1,T=!1,q=!1,ee=!1,Z;Z=Symbol.for("react.module.reference");function ge(c){return!!(typeof c=="string"||typeof c=="function"||c===n||c===i||ee||c===s||c===u||c===m||q||c===b||V||y||T||typeof c=="object"&&c!==null&&(c.\$\$typeof===g||c.\$\$typeof===f||c.\$\$typeof===l||c.\$\$typeof===o||c.\$\$typeof===d||c.\$\$typeof===Z||c.getModuleId!==void 0))}function Te(c,h,C){var I=c.displayName;if(I)return I;var ne=h.displayName||h.name||"";return ne!==""?C+"("+ne+")":C}function Pe(c){return c.displayName||"Context"}function ve(c){if(c==null)return null;if(typeof c.tag=="number"&&E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof c=="function")return c.displayName||c.name||null;if(typeof c=="string")return c;switch(c){case n:return"Fragment";case r:return"Portal";case i:return"Profiler";case s:return"StrictMode";case u:return"Suspense";case m:return"SuspenseList"}if(typeof c=="object")switch(c.\$\$typeof){case o:var h=c;return Pe(h)+".Consumer";case l:var C=c;return Pe(C._context)+".Provider";case d:return Te(c,c.render,"ForwardRef");case f:var I=c.displayName||null;return I!==null?I:ve(c.type)||"Memo";case g:{var ne=c,oe=ne._payload,G=ne._init;try{return ve(G(oe))}catch{return null}}}return null}var be=Object.assign,Ce=0,me,je,le,ze,x,w,F;function A(){}A.__reactDisabledLog=!0;function O(){{if(Ce===0){me=console.log,je=console.info,le=console.warn,ze=console.error,x=console.group,w=console.groupCollapsed,F=console.groupEnd;var c={configurable:!0,enumerable:!0,value:A,writable:!0};Object.defineProperties(console,{info:c,log:c,warn:c,error:c,group:c,groupCollapsed:c,groupEnd:c})}Ce++}}function U(){{if(Ce--,Ce===0){var c={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:be({},c,{value:me}),info:be({},c,{value:je}),warn:be({},c,{value:le}),error:be({},c,{value:ze}),group:be({},c,{value:x}),groupCollapsed:be({},c,{value:w}),groupEnd:be({},c,{value:F})})}Ce<0&&E("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var D=N.ReactCurrentDispatcher,\$;function W(c,h,C){{if(\$===void 0)try{throw Error()}catch(ne){var I=ne.stack.trim().match(/\\n( *(at )?)/);\$=I&&I[1]||""}return\`
\`+\$+c}}var Y=!1,M;{var ue=typeof WeakMap=="function"?WeakMap:Map;M=new ue}function k(c,h){if(!c||Y)return"";{var C=M.get(c);if(C!==void 0)return C}var I;Y=!0;var ne=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var oe;oe=D.current,D.current=null,O();try{if(h){var G=function(){throw Error()};if(Object.defineProperty(G.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(G,[])}catch(ke){I=ke}Reflect.construct(c,[],G)}else{try{G.call()}catch(ke){I=ke}c.call(G.prototype)}}else{try{throw Error()}catch(ke){I=ke}c()}}catch(ke){if(ke&&I&&typeof ke.stack=="string"){for(var K=ke.stack.split(\`
\`),ye=I.stack.split(\`
\`),pe=K.length-1,he=ye.length-1;pe>=1&&he>=0&&K[pe]!==ye[he];)he--;for(;pe>=1&&he>=0;pe--,he--)if(K[pe]!==ye[he]){if(pe!==1||he!==1)do if(pe--,he--,he<0||K[pe]!==ye[he]){var Se=\`
\`+K[pe].replace(" at new "," at ");return c.displayName&&Se.includes("<anonymous>")&&(Se=Se.replace("<anonymous>",c.displayName)),typeof c=="function"&&M.set(c,Se),Se}while(pe>=1&&he>=0);break}}}finally{Y=!1,D.current=oe,U(),Error.prepareStackTrace=ne}var Je=c?c.displayName||c.name:"",Ve=Je?W(Je):"";return typeof c=="function"&&M.set(c,Ve),Ve}function xe(c,h,C){return k(c,!1)}function Ee(c){var h=c.prototype;return!!(h&&h.isReactComponent)}function X(c,h,C){if(c==null)return"";if(typeof c=="function")return k(c,Ee(c));if(typeof c=="string")return W(c);switch(c){case u:return W("Suspense");case m:return W("SuspenseList")}if(typeof c=="object")switch(c.\$\$typeof){case d:return xe(c.render);case f:return X(c.type,h,C);case g:{var I=c,ne=I._payload,oe=I._init;try{return X(oe(ne),h,C)}catch{}}}return""}var Oe=Object.prototype.hasOwnProperty,Me={},jt=N.ReactDebugCurrentFrame;function He(c){if(c){var h=c._owner,C=X(c.type,c._source,h?h.type:null);jt.setExtraStackFrame(C)}else jt.setExtraStackFrame(null)}function rr(c,h,C,I,ne){{var oe=Function.call.bind(Oe);for(var G in c)if(oe(c,G)){var K=void 0;try{if(typeof c[G]!="function"){var ye=Error((I||"React class")+": "+C+" type \`"+G+"\` is invalid; it must be a function, usually from the \`prop-types\` package, but received \`"+typeof c[G]+"\`.This often happens because of typos such as \`PropTypes.function\` instead of \`PropTypes.func\`.");throw ye.name="Invariant Violation",ye}K=c[G](h,G,I,C,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(pe){K=pe}K&&!(K instanceof Error)&&(He(ne),E("%s: type specification of %s \`%s\` is invalid; the type checker function must return \`null\` or an \`Error\` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",I||"React class",C,G,typeof K),He(null)),K instanceof Error&&!(K.message in Me)&&(Me[K.message]=!0,He(ne),E("Failed %s type: %s",C,K.message),He(null))}}}var ar=Array.isArray;function it(c){return ar(c)}function nr(c){{var h=typeof Symbol=="function"&&Symbol.toStringTag,C=h&&c[Symbol.toStringTag]||c.constructor.name||"Object";return C}}function yt(c){try{return Nt(c),!1}catch{return!0}}function Nt(c){return""+c}function J(c){if(yt(c))return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",nr(c)),Nt(c)}var Re=N.ReactCurrentOwner,kt={key:!0,ref:!0,__self:!0,__source:!0},Oa,Aa;function Ki(c){if(Oe.call(c,"ref")){var h=Object.getOwnPropertyDescriptor(c,"ref").get;if(h&&h.isReactWarning)return!1}return c.ref!==void 0}function Hi(c){if(Oe.call(c,"key")){var h=Object.getOwnPropertyDescriptor(c,"key").get;if(h&&h.isReactWarning)return!1}return c.key!==void 0}function Gi(c,h){typeof c.ref=="string"&&Re.current}function Ji(c,h){{var C=function(){Oa||(Oa=!0,E("%s: \`key\` is not a prop. Trying to access it will result in \`undefined\` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",h))};C.isReactWarning=!0,Object.defineProperty(c,"key",{get:C,configurable:!0})}}function Xi(c,h){{var C=function(){Aa||(Aa=!0,E("%s: \`ref\` is not a prop. Trying to access it will result in \`undefined\` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",h))};C.isReactWarning=!0,Object.defineProperty(c,"ref",{get:C,configurable:!0})}}var Qi=function(c,h,C,I,ne,oe,G){var K={\$\$typeof:a,type:c,key:h,ref:C,props:G,_owner:oe};return K._store={},Object.defineProperty(K._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(K,"_self",{configurable:!1,enumerable:!1,writable:!1,value:I}),Object.defineProperty(K,"_source",{configurable:!1,enumerable:!1,writable:!1,value:ne}),Object.freeze&&(Object.freeze(K.props),Object.freeze(K)),K};function eo(c,h,C,I,ne){{var oe,G={},K=null,ye=null;C!==void 0&&(J(C),K=""+C),Hi(h)&&(J(h.key),K=""+h.key),Ki(h)&&(ye=h.ref,Gi(h,ne));for(oe in h)Oe.call(h,oe)&&!kt.hasOwnProperty(oe)&&(G[oe]=h[oe]);if(c&&c.defaultProps){var pe=c.defaultProps;for(oe in pe)G[oe]===void 0&&(G[oe]=pe[oe])}if(K||ye){var he=typeof c=="function"?c.displayName||c.name||"Unknown":c;K&&Ji(G,he),ye&&Xi(G,he)}return Qi(c,K,ye,ne,I,Re.current,G)}}var sr=N.ReactCurrentOwner,_a=N.ReactDebugCurrentFrame;function Ge(c){if(c){var h=c._owner,C=X(c.type,c._source,h?h.type:null);_a.setExtraStackFrame(C)}else _a.setExtraStackFrame(null)}var ir;ir=!1;function or(c){return typeof c=="object"&&c!==null&&c.\$\$typeof===a}function Ra(){{if(sr.current){var c=ve(sr.current.type);if(c)return\`

Check the render method of \\\`\`+c+"\`."}return""}}function to(c){return""}var Ia={};function ro(c){{var h=Ra();if(!h){var C=typeof c=="string"?c:c.displayName||c.name;C&&(h=\`

Check the top-level render call using <\`+C+">.")}return h}}function Fa(c,h){{if(!c._store||c._store.validated||c.key!=null)return;c._store.validated=!0;var C=ro(h);if(Ia[C])return;Ia[C]=!0;var I="";c&&c._owner&&c._owner!==sr.current&&(I=" It was passed a child from "+ve(c._owner.type)+"."),Ge(c),E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',C,I),Ge(null)}}function Da(c,h){{if(typeof c!="object")return;if(it(c))for(var C=0;C<c.length;C++){var I=c[C];or(I)&&Fa(I,h)}else if(or(c))c._store&&(c._store.validated=!0);else if(c){var ne=v(c);if(typeof ne=="function"&&ne!==c.entries)for(var oe=ne.call(c),G;!(G=oe.next()).done;)or(G.value)&&Fa(G.value,h)}}}function ao(c){{var h=c.type;if(h==null||typeof h=="string")return;var C;if(typeof h=="function")C=h.propTypes;else if(typeof h=="object"&&(h.\$\$typeof===d||h.\$\$typeof===f))C=h.propTypes;else return;if(C){var I=ve(h);rr(C,c.props,"prop",I,c)}else if(h.PropTypes!==void 0&&!ir){ir=!0;var ne=ve(h);E("Component %s declared \`PropTypes\` instead of \`propTypes\`. Did you misspell the property assignment?",ne||"Unknown")}typeof h.getDefaultProps=="function"&&!h.getDefaultProps.isReactClassApproved&&E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named \`defaultProps\` instead.")}}function no(c){{for(var h=Object.keys(c.props),C=0;C<h.length;C++){var I=h[C];if(I!=="children"&&I!=="key"){Ge(c),E("Invalid prop \`%s\` supplied to \`React.Fragment\`. React.Fragment can only have \`key\` and \`children\` props.",I),Ge(null);break}}c.ref!==null&&(Ge(c),E("Invalid attribute \`ref\` supplied to \`React.Fragment\`."),Ge(null))}}var \$a={};function Ma(c,h,C,I,ne,oe){{var G=ge(c);if(!G){var K="";(c===void 0||typeof c=="object"&&c!==null&&Object.keys(c).length===0)&&(K+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var ye=to();ye?K+=ye:K+=Ra();var pe;c===null?pe="null":it(c)?pe="array":c!==void 0&&c.\$\$typeof===a?(pe="<"+(ve(c.type)||"Unknown")+" />",K=" Did you accidentally export a JSX literal instead of a component?"):pe=typeof c,E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",pe,K)}var he=eo(c,h,C,ne,oe);if(he==null)return he;if(G){var Se=h.children;if(Se!==void 0)if(I)if(it(Se)){for(var Je=0;Je<Se.length;Je++)Da(Se[Je],c);Object.freeze&&Object.freeze(Se)}else E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Da(Se,c)}if(Oe.call(h,"key")){var Ve=ve(c),ke=Object.keys(h).filter(function(mo){return mo!=="key"}),lr=ke.length>0?"{key: someKey, "+ke.join(": ..., ")+": ...}":"{key: someKey}";if(!\$a[Ve+lr]){var co=ke.length>0?"{"+ke.join(": ..., ")+": ...}":"{}";E(\`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />\`,lr,Ve,co,Ve),\$a[Ve+lr]=!0}}return c===n?no(he):ao(he),he}}function so(c,h,C){return Ma(c,h,C,!0)}function io(c,h,C){return Ma(c,h,C,!1)}var oo=io,lo=so;Qe.Fragment=n,Qe.jsx=oo,Qe.jsxs=lo})()),Qe}var mr;function Wa(){return mr||(mr=1,process.env.NODE_ENV==="production"?ot.exports=Ba():ot.exports=Va()),ot.exports}var e=Wa();const ur=p.createContext({theme:"dark",toggleTheme:()=>{}});function Ne(){return p.useContext(ur)}function Ua({children:t}){const[a,r]=p.useState(()=>typeof window<"u"&&localStorage.getItem("tf-theme")||"dark"),n=p.useCallback(()=>{const s=a==="dark"?"light":"dark";r(s),localStorage.setItem("tf-theme",s),document.documentElement.setAttribute("data-bs-theme",s),document.documentElement.setAttribute("data-tf-theme",s)},[a]);return e.jsx(ur.Provider,{value:{theme:a,toggleTheme:n},children:t})}var Ct={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/var pr;function Ya(){return pr||(pr=1,(function(t){(function(){var a={}.hasOwnProperty;function r(){for(var i="",l=0;l<arguments.length;l++){var o=arguments[l];o&&(i=s(i,n(o)))}return i}function n(i){if(typeof i=="string"||typeof i=="number")return i;if(typeof i!="object")return"";if(Array.isArray(i))return r.apply(null,i);if(i.toString!==Object.prototype.toString&&!i.toString.toString().includes("[native code]"))return i.toString();var l="";for(var o in i)a.call(i,o)&&i[o]&&(l=s(l,o));return l}function s(i,l){return l?i?i+" "+l:i+l:i}t.exports?(r.default=r,t.exports=r):window.classNames=r})()})(Ct)),Ct.exports}var Za=Ya();const te=wt(Za),Ka=["xxl","xl","lg","md","sm","xs"],et=B.createContext({prefixes:{},breakpoints:Ka,minBreakpoint:"xs"}),{Consumer:po,Provider:fo}=et;function ce(t,a){const{prefixes:r}=p.useContext(et);return t||r[a]||a}function fr(){const{breakpoints:t}=p.useContext(et);return t}function hr(){const{minBreakpoint:t}=p.useContext(et);return t}function Ha(){const{dir:t}=p.useContext(et);return t==="rtl"}const se=B.forwardRef(({bsPrefix:t,className:a,as:r="div",...n},s)=>{const i=ce(t,"row"),l=fr(),o=hr(),d=\`\${i}-cols\`,u=[];return l.forEach(m=>{const f=n[m];delete n[m];let g;f!=null&&typeof f=="object"?{cols:g}=f:g=f;const b=m!==o?\`-\${m}\`:"";g!=null&&u.push(\`\${d}\${b}-\${g}\`)}),e.jsx(r,{ref:s,...n,className:te(a,i,...u)})});se.displayName="Row";function Ga({as:t,bsPrefix:a,className:r,...n}){a=ce(a,"col");const s=fr(),i=hr(),l=[],o=[];return s.forEach(d=>{const u=n[d];delete n[d];let m,f,g;typeof u=="object"&&u!=null?{span:m,offset:f,order:g}=u:m=u;const b=d!==i?\`-\${d}\`:"";m&&l.push(m===!0?\`\${a}\${b}\`:\`\${a}\${b}-\${m}\`),g!=null&&o.push(\`order\${b}-\${g}\`),f!=null&&o.push(\`offset\${b}-\${f}\`)}),[{...n,className:te(r,...l,...o)},{as:t,bsPrefix:a,spans:l}]}const S=B.forwardRef((t,a)=>{const[{className:r,...n},{as:s="div",bsPrefix:i,spans:l}]=Ga(t);return e.jsx(s,{...n,ref:a,className:te(r,!l.length&&i)})});S.displayName="Col";const gr={active:"Aktivní",inactive:"Neaktivní",soldout:"Vyprodáno"},Ja={active:"success",inactive:"warning",soldout:"danger"},br=[{value:"active",label:"Aktivní"},{value:"inactive",label:"Neaktivní"},{value:"soldout",label:"Vyprodáno"}],xr={pending:"Čekající",processing:"Zpracování",shipped:"Odesláno",completed:"Dokončeno",cancelled:"Zrušeno"},Xa={pending:"warning",processing:"info",shipped:"primary",completed:"success",cancelled:"danger"},vr=[{value:"pending",label:"Čekající"},{value:"processing",label:"Zpracování"},{value:"shipped",label:"Odesláno"},{value:"completed",label:"Dokončeno"},{value:"cancelled",label:"Zrušeno"}],jr={published:"Publikováno",draft:"Koncept",archived:"Archivováno"},Qa={published:"success",draft:"warning",archived:"default"},yr=[{value:"",label:"Všechny stavy"},{value:"published",label:"Publikováno"},{value:"draft",label:"Koncept"}],Nr={active:"Aktivní",hidden:"Skrytá"},en={active:"success",hidden:"warning"},kr=[{value:"active",label:"Aktivní"},{value:"hidden",label:"Skrytá"}],tn=Object.freeze(Object.defineProperty({__proto__:null,auth:{headings:{login:"Přihlášení",loginSubtitle:"Přihlaste se do svého účtu",register:"Vytvořit účet",registerSubtitle:"Zaregistrujte se a začněte používat TypeForge"},form:{email:"Email",password:"Heslo",firstName:"Jméno",lastName:"Příjmení",confirmPassword:"Potvrzení hesla"},actions:{login:"Přihlásit se",register:"Zaregistrovat se"},links:{or:"nebo",noAccount:"Nemáte účet?",registerLink:"Registrovat se",hasAccount:"Už máte účet?",loginLink:"Přihlaste se",terms:"obchodními podmínkami",privacy:"zásadami ochrany osobních údajů"},nav:{features:"Funkce",howItWorks:"Jak to funguje",toggleTheme:"Přepnout téma",logout:"Odhlásit"}},blog:{headings:{admin:"Blog",create:"Nový článek",edit:"Upravit článek"},columns:{name:"Název",author:"Autor",category:"Kategorie",status:"Stav",date:"Datum",actions:"Akce"},actions:{newArticle:"Nový článek",edit:"Upravit",view:"Zobrazit",delete:"Smazat",createArticle:"Vytvořit článek",saveChanges:"Uložit změny",backToList:"Zpět na seznam",selectFromMedia:"Vybrat z médií",removeImage:"Odebrat obrázek",goToMedia:"Přejít do médií"},confirm:{deleteArticle:"Opravdu chcete smazat tento článek?"},empty:{articles:"Žádné články k zobrazení",noArticlesYet:"Zatím zde nejsou žádné články.",noImages:"Zatím nejsou nahrány žádné obrázky."},statuses:{published:"Publikováno",draft:"Koncept"},filters:{allStatuses:"Všechny stavy",published:"Publikované",drafts:"Koncepty"},form:{sections:{content:"Obsah článku",featuredImage:"Hlavní obrázek",settings:"Nastavení",selectImage:"Vybrat obrázek"},labels:{title:"Název článku",slug:"URL Slug",excerpt:"Výňatek",excerptHint:"Krátký popis článku pro náhled",content:"Obsah",status:"Stav",category:"Kategorie",readTime:"Doba čtení (min)",noImage:"Bez obrázku"},placeholders:{title:"Zadejte název článku",slug:"url-slug-clanku",excerpt:"Krátký popis článku...",content:"Celý obsah článku...",category:"např. Návody"}},public:{minRead:"min čtení",newsAndArticles:"Novinky a",articles:"Články",subtitle:"Nejnovější články, návody a novinky ze světa TypeForge. Naučte se nové techniky a zůstaňte v obraze.",nav:{features:"Funkce",article:"Článek",toggleTheme:"Přepnout téma",home:"Domů"}}},cart:{headings:{cart:"Váš košík",orderSummary:"Souhrn objednávky",yourOrder:"Vaše objednávka",shippingDetails:"Dodací údaje",paymentMethod:"Způsob platby",orderReview:"Přehled objednávky",thankYou:"Děkujeme za objednávku!"},columns:{product:"Produkt",quantity:"Množství",price:"Cena",total:"Celkem"},summary:{subtotal:"Mezisoučet",shipping:"Doprava",free:"Zdarma",total:"Celkem",freeShippingInfo:"Máte nárok na dopravu zdarma!"},actions:{checkout:"Pokračovat k platbě",continueShopping:"Pokračovat v nákupu",applyPromo:"Použít",backToCart:"Zpět do košíku",continueToPayment:"Pokračovat k platbě",backToShipping:"Zpět na doručení",reviewOrder:"Zkontrolovat objednávku",backToPayment:"Zpět na platbu",submitOrder:"Odeslat objednávku",continueShopping2:"Pokračovat v nákupu",goHome:"Na hlavní stránku"},promo:{label:"Slevový kód",placeholder:"Zadejte kód"},checkout:{secureCheckout:"Zabezpečený checkout",steps:{shipping:"Doručení",payment:"Platba",review:"Přehled",done:"Hotovo"},shipping:{subtitle:"Vyplňte adresu pro doručení vaší objednávky",contactInfo:"Kontaktní údaje",deliveryAddress:"Dodací adresa",deliveryMethod:"Způsob doručení",firstName:"Jméno *",lastName:"Příjmení *",email:"E-mail *",phone:"Telefon *",street:"Ulice a číslo popisné *",city:"Město *",zip:"PSČ *",country:"Země",countryCZ:"Česká republika",countrySK:"Slovensko",standardDelivery:"Standardní doručení",standardDeliveryDesc:"Doručení do 3-5 pracovních dnů",expressDelivery:"Expresní doručení",expressDeliveryDesc:"Doručení do 1-2 pracovních dnů",personalPickup:"Osobní odběr",personalPickupDesc:"Vyzvednete na naší prodejně v Praze"},payment:{subtitle:"Vyberte, jak chcete zaplatit",selectMethod:"Vyberte platební metodu",card:"Platební karta",cardDesc:"Visa, Mastercard, Maestro",bankTransfer:"Bankovní převod",bankTransferDesc:"Platba na účet před odesláním",cod:"Dobírka",codDesc:"Platba při převzetí + 39 Kč",paypal:"PayPal",paypalDesc:"Rychlá a bezpečná platba",cardNumber:"Číslo karty *",cardExpiry:"Platnost *",cardCvv:"CVV/CVC *",cardName:"Jméno na kartě *",billingInfo:"Fakturační údaje",sameAsShipping:"Stejná jako dodací adresa",differentBilling:"Jiná fakturační adresa",companyName:"Název firmy",ico:"IČO",dic:"DIČ"},review:{subtitle:"Zkontrolujte všechny údaje před odesláním",contactInfo:"Kontaktní údaje",deliveryAddress:"Dodací adresa",deliveryMethod:"Způsob doručení",paymentMethod:"Platební metoda",orderItems:"Položky objednávky",edit:"Upravit",termsAgreement:'Kliknutím na "Odeslat objednávku" souhlasím s obchodními podmínkami'},confirmation:{subtitle:"Vaše objednávka byla úspěšně přijata a bude brzy zpracována.",orderNumber:"Číslo objednávky",orderDate:"Datum objednávky",paymentMethod:"Způsob platby",deliveryMethod:"Způsob doručení",expectedDelivery:"Očekávané doručení",totalAmount:"Celková částka",confirmationSent:"Potvrzení objednávky jsme zaslali na"}},nav:{home:"Domů",article:"Článek",toggleTheme:"Přepnout téma"}},catalog:{headings:{products:"Produkty",productCreate:"Nový produkt",productEdit:"Upravit produkt",categories:"Kategorie",categoryCreate:"Nová kategorie",categoryEdit:"Upravit kategorii"},columns:{product:"Produkt",category:"Kategorie",price:"Cena",stock:"Skladem",status:"Stav",description:"Popis",productCount:"Produktů"},actions:{addProduct:"Přidat produkt",addCategory:"Přidat kategorii",edit:"Upravit",delete:"Smazat",createProduct:"Vytvořit produkt",createCategory:"Vytvořit kategorii",saveChanges:"Uložit změny",selectFromMedia:"Vybrat z médií",removeImage:"Odebrat obrázek",goToMedia:"Přejít do médií",addToGallery:"Přidat do galerie"},confirm:{deleteProduct:"Opravdu smazat produkt?",deleteCategory:"Opravdu smazat kategorii?"},filters:{allCategories:"Všechny kategorie",allStatuses:"Všechny stavy"},empty:{products:"Žádné produkty k zobrazení",categories:"Žádné kategorie k zobrazení",noImages:"Žádné obrázky v médiích. Nejprve nahrajte obrázky.",noGalleryImages:"Galerie je prázdná. Přidejte obrázky z médií."},form:{sections:{basicInfo:"Základní informace",priceStock:"Cena a sklad",categoryStatus:"Kategorie a stav",categoryInfo:"Informace o kategorii",settings:"Nastavení",featuredImage:"Hlavní obrázek",selectImage:"Vybrat obrázek",gallery:"Galerie obrázků",selectGalleryImages:"Vybrat obrázky do galerie"},labels:{productName:"Název produktu",categoryName:"Název kategorie",slug:"Slug",shortDescription:"Krátký popis",description:"Popis",price:"Cena (Kč)",oldPrice:"Původní cena (Kč)",stock:"Skladem (ks)",category:"Kategorie",status:"Stav",icon:"Ikona (Bootstrap Icon)",sortOrder:"Pořadí",noCategory:"Bez kategorie",noImage:"Žádný obrázek"},placeholders:{autoFromName:"automaticky z názvu",iconExamples:"např. box, phone, laptop",discountHint:"pro zobrazení slevy",categoryIconExamples:"např. tag, laptop, phone"}},statuses:{active:"Aktivní",inactive:"Neaktivní",soldout:"Vyprodáno",hidden:"Skrytá"}},common:{sidebar:{sections:{main:"Hlavní",eshop:"E-Shop",content:"Obsah"},items:{dashboard:"Dashboard",analytics:"Analytika",orders:"Objednávky",products:"Produkty",categories:"Kategorie",customers:"Zákazníci",warehouse:"Sklad",blog:"Blog",media:"Média"}},layout:{web:"Web",toggleSidebar:"Přepnout postranní panel",toggleTheme:"Přepnout téma"},confirm:{title:"Potvrdit akci",cancel:"Zrušit",confirm:"Potvrdit"},nav:{home:"Domů",features:"Funkce",article:"Článek",eshop:"E-Shop",admin:"Admin",toggleTheme:"Přepnout téma",logout:"Odhlásit"},footer:{brand:"TypeForge",tagline:"Moderní serverless web framework",links:{documentation:"Dokumentace",github:"GitHub",blog:"Blog",community:"Komunita"},copyright:"TypeForge. Všechna práva vyhrazena."},customers:{heading:"Zákazníci",columns:{name:"Jméno",email:"Email",orders:"Objednávek",totalSpent:"Celkem utraceno",registered:"Registrace"},empty:"Žádní zákazníci k zobrazení"},errors:{invalidRequest:"Neplatný požadavek",validationError:"Chyba validace",genericError:"Došlo k chybě, zkuste to znovu"}},dashboard:{headings:{dashboard:"Dashboard",analytics:"Analytika"},stats:{totalOrders:"Objednávek celkem",totalRevenue:"Celkové tržby",customers:"Zákazníků",productsInStock:"Produktů skladem",totalTurnover:"Celkový obrat",totalOrdersCount:"Celkem objednávek",averageOrder:"Průměrná objednávka",activeCarts:"Aktivních košíků",cartValue:"Hodnota košíků",cartItems:"Položek v košících",avgCartValue:"Průměrný košík"},badges:{pendingOrders:"čekajících objednávek",lowStock:"produktů s nízkým skladem",activeCarts:"aktivních košíků"},sections:{recentOrders:"Poslední objednávky",lowStock:"Nízký sklad",quickActions:"Rychlé akce",recentActivity:"Nedávná aktivita",monthlyRevenue:"Obrat po měsících",topProducts:"Nejprodávanější produkty",ordersByStatus:"Objednávky dle stavu",stockOverview:"Stav skladu",newCustomers:"Noví zákazníci",cartOverview:"Přehled košíků",topCartProducts:"Nejčastější produkty v košících"},actions:{viewAll:"Zobrazit vše",allProducts:"Všechny produkty"},columns:{number:"Číslo",customer:"Zákazník",products:"Produkty",amount:"Částka",status:"Stav",date:"Datum",product:"Produkt",price:"Cena",stock:"Skladem",month:"Měsíc",orderCount:"Objednávek",revenue:"Obrat",soldQty:"Prodáno ks",inCarts:"V košících",qty:"Ks celkem",value:"Hodnota"},empty:{orders:"Zatím žádné objednávky",activity:"Zatím žádná aktivita",noOrdersInMonths:"Žádné objednávky v posledních 6 měsících.",noSales:"Žádné prodeje zatím.",noOrders:"Žádné objednávky.",noProducts:"Žádné produkty.",noCustomers:"Žádní zákazníci zatím.",noCarts:"Žádné aktivní košíky."},activity:{orderCompleted:"objednávka dokončena",newOrder:"nová objednávka",orderCancelled:"objednávka zrušena",orderPrefix:"objednávka:",newCustomer:"Nový zákazník"},quickActions:{addProduct:"Přidat produkt",addProductDesc:"Vytvořit nový produkt",newOrder:"Nová objednávka",newOrderDesc:"Manuální vytvoření",newCustomer:"Nový zákazník",newCustomerDesc:"Přidat zákazníka",newArticle:"Nový článek",newArticleDesc:"Napsat blog post"},analyticsStatuses:{pending:"Čeká na zpracování",processing:"Zpracovává se",shipped:"Odesláno",delivered:"Doručeno",cancelled:"Zrušeno"},months:{"01":"Leden","02":"Únor","03":"Březen","04":"Duben","05":"Květen","06":"Červen","07":"Červenec","08":"Srpen","09":"Září",10:"Říjen",11:"Listopad",12:"Prosinec"}},media:{headings:{admin:"Média"},actions:{upload:"Nahrát soubor",open:"Otevřít",delete:"Smazat",uploadBtn:"Nahrát",cancelBtn:"Zrušit",close:"Zavřít"},confirm:{deleteFile:"Opravdu chcete smazat tento soubor?"},empty:{noMedia:"Žádná média k zobrazení",uploadHint:"Nahrajte první soubor pomocí tlačítka výše"},form:{uploadTitle:"Nahrát soubor",selectFile:"Vyberte soubor *",altText:"Alternativní text (pro obrázky)",altPlaceholder:"Popis obrázku pro přístupnost"},filters:{allTypes:"Všechny typy",images:"Obrázky",documents:"Dokumenty",videos:"Videa"}},orders:{headings:{admin:"Objednávky",create:"Nová objednávka"},columns:{number:"Číslo",customer:"Zákazník",products:"Produkty",amount:"Částka",status:"Stav",date:"Datum",actions:"Akce",product:"Produkt",quantity:"Množství",pricePerUnit:"Cena/ks",total:"Celkem",totalLabel:"Celkem:"},actions:{newOrder:"Nová objednávka",detail:"Detail",edit:"Upravit",createOrder:"Vytvořit objednávku",saveChanges:"Uložit změny",cancel:"Zrušit",backToList:"Zpět na seznam",addItem:"Přidat položku",removeItem:"Odebrat"},empty:{orders:"Žádné objednávky k zobrazení",items:"Žádné položky"},form:{sections:{customer:"Zákazník",items:"Položky objednávky",notes:"Poznámky",orderStatus:"Stav objednávky"},labels:{selectCustomer:"Vybrat zákazníka",noAssignment:"— Bez přiřazení / ruční zadání —",customerName:"Jméno zákazníka *",email:"Email *",shippingAddress:"Doručovací adresa",product:"Produkt",selectProduct:"— Vyberte produkt —",customItem:"Vlastní položka",itemName:"Název",qty:"Ks",pricePerUnit:"Cena/ks",notesPlaceholder:"Interní poznámky k objednávce..."}},detail:{sections:{items:"Položky objednávky",notes:"Poznámky",info:"Informace",customer:"Zákazník",shippingAddress:"Doručovací adresa"},labels:{status:"Stav",createdAt:"Datum vytvoření",updatedAt:"Poslední aktualizace",name:"Jméno",email:"Email"}},statuses:{filterAll:"Všechny stavy",filterPending:"Čekající",filterProcessing:"Zpracování",filterShipped:"Odeslané",filterCompleted:"Dokončené",filterCancelled:"Zrušené",pending:"Čeká",processing:"Zpracování",shipped:"Odesláno",completed:"Dokončeno",cancelled:"Zrušeno"}},shared:{statuses:{product:gr,order:xr,blog:jr,category:Nr},filters:{product:br,order:vr,blog:yr,category:kr}},shop:{headings:{allProducts:"Všechny produkty"},hero:{badge:"Nová kolekce 2026",titleLine1:"Objevte náš",titleLine2:"prémiový výběr",subtitle:"Prozkoumejte naši exkluzivní kolekci produktů. Kvalita, styl a nejlepší ceny na jednom místě.",shopNow:"Nakupovat",categories:"Kategorie"},features:{freeShipping:"Doprava zdarma",warranty:"Záruka 2 roky",returnPolicy:"30 dní na vrácení",support:"24/7 podpora"},sections:{categories:"Kategorie",exploreCategories:"Prozkoumejte naše kategorie",findWhatYouNeed:"Najděte přesně to, co hledáte",recommended:"Doporučené",bestSelling:"Nejprodávanější produkty",customerChoice:"Výběr našich zákazníků"},newsletter:{title:"Odebírejte novinky",subtitle:"Získejte 10% slevu na první nákup a buďte první, kdo se dozví o novinkách.",placeholder:"Váš email...",subscribe:"Odebírat"},product:{quantity:"Množství:",addToCart:"Přidat do košíku",inStock:"Skladem",outOfStock:"Není skladem",freeShipping:"Doprava zdarma",warranty:"Záruka 2 roky",returnPolicy:"30 dní na vrácení",description:"Popis",sale:"Sleva"},category:{totalProducts:"produktů",noProducts:"V této kategorii zatím nejsou žádné produkty.",backToEshop:"Zpět na E-Shop"},empty:{noCategories:"Zatím žádné kategorie",noProducts:"Zatím žádné produkty"},nav:{home:"Domů",article:"Článek",eshop:"E-Shop",admin:"Admin",toggleTheme:"Přepnout téma"},footer:{tagline:"Kvalita za skvělé ceny"},breadcrumb:{home:"Domů",eshop:"E-Shop"}}},Symbol.toStringTag,{value:"Module"}));function ie(t){return tn[t]}const rn={xs:"fs-6",sm:"",md:"fs-5",lg:"fs-4",xl:"fs-3"};function H({name:t,size:a,color:r,className:n}){const i=["bi",t.startsWith("bi-")?t:\`bi-\${t}\`,a?rn[a]:"",n].filter(Boolean).join(" ");return e.jsx("i",{className:i,style:r?{color:r}:void 0})}const an={default:"",success:"success",warning:"warning",info:"info",danger:"danger"};function Ie({children:t,variant:a="default",icon:r,className:n}){const s=["status-badge",an[a],n].filter(Boolean).join(" ");return e.jsxs("span",{className:s,children:[r&&e.jsx(H,{name:r,className:"me-1"}),t]})}function nn({children:t}){return e.jsx("span",{className:"admin-nav-badge",children:t})}const sn={xs:{width:28,height:28,fontSize:"0.8rem"},sm:{width:32,height:32,fontSize:"0.9rem"},md:{width:40,height:40,fontSize:"1.1rem"},lg:{width:48,height:48,fontSize:"1.25rem"},xl:{width:56,height:56,fontSize:"1.4rem"}};function on({size:t="md",className:a}){const{toggleTheme:r}=Ne(),n=["btn-theme-toggle",a].filter(Boolean).join(" ");return e.jsxs("button",{className:n,style:sn[t],onClick:r,title:"Přepnout téma",children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}function ln(t){return[{title:t.sidebar.sections.main,items:[{path:"/admin",icon:"grid-1x2",label:t.sidebar.items.dashboard},{path:"/admin/analytics",icon:"bar-chart",label:t.sidebar.items.analytics}]},{title:t.sidebar.sections.eshop,items:[{path:"/admin/orders",icon:"cart3",label:t.sidebar.items.orders,badge:"12"},{path:"/admin/products",icon:"box-seam",label:t.sidebar.items.products},{path:"/admin/categories",icon:"folder",label:t.sidebar.items.categories}]},{title:t.sidebar.sections.content,items:[{path:"/admin/blog",icon:"journal-richtext",label:t.sidebar.items.blog},{path:"/admin/media",icon:"images",label:t.sidebar.items.media}]}]}function cn(t){const a=t.split("/").filter(Boolean);return a.length>1?a[a.length-1]:"dashboard"}function dn({activePage:t,sections:a,user:r={name:"Jan Novák",initials:"JN",role:"Administrátor"},onClose:n}){const s=ie("common"),i=a??ln(s);return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"sidebar-close",onClick:n,children:e.jsx(H,{name:"x-lg"})}),e.jsxs("a",{href:"/admin",className:"admin-logo",children:[e.jsx(H,{name:"braces-asterisk",className:"text-gradient"}),e.jsx("span",{className:"text-gradient",children:"TypeForge"})]}),e.jsx("nav",{className:"admin-nav",children:i.map((l,o)=>e.jsxs("div",{className:"admin-nav-section",children:[e.jsx("div",{className:"admin-nav-label",children:l.title}),l.items.map(d=>{const m=cn(d.path)===t;return e.jsxs("a",{href:d.path,className:\`admin-nav-item\${m?" active":""}\`,children:[e.jsx(H,{name:d.icon||"circle"}),e.jsx("span",{children:d.label}),d.badge&&e.jsx(nn,{children:d.badge})]},d.path)})]},o))}),e.jsxs("div",{className:"admin-user",children:[e.jsx("div",{className:"admin-user-avatar",children:r.initials}),e.jsxs("div",{className:"admin-user-info",children:[e.jsx("div",{className:"admin-user-name",children:r.name}),e.jsx("div",{className:"admin-user-role",children:r.role})]}),e.jsx(on,{size:"sm"})]})]})}const mn={primary:"btn-primary-tf",outline:"btn-outline-tf",ghost:"btn-ghost-tf",accent:"btn-accent-tf"},un={xs:"btn-xs",sm:"btn-sm",md:"",lg:"btn-lg",xl:"btn-xl"};function Et({children:t,variant:a="primary",size:r="md",icon:n,iconRight:s,href:i,type:l="button",disabled:o=!1,fullWidth:d=!1,onClick:u,className:m}){const f=[mn[a],un[r],d?"w-100":"",m].filter(Boolean).join(" ");return i?e.jsxs("a",{href:i,className:f,onClick:u,children:[n&&e.jsx(H,{name:n,className:s?"":"me-2"}),t,s&&e.jsx(H,{name:s,className:"ms-2"})]}):e.jsxs("button",{type:l,className:f,disabled:o,onClick:u,children:[n&&e.jsx(H,{name:n,className:s?"":"me-2"}),t,s&&e.jsx(H,{name:s,className:"ms-2"})]})}function pn({placeholder:t="Hledat...",value:a,name:r,className:n,onChange:s}){const i=["admin-search",n].filter(Boolean).join(" ");return e.jsxs("div",{className:i,children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{type:"text",placeholder:t,defaultValue:a,name:r,onChange:s})]})}function we({title:t,activePage:a,children:r,subtitle:n,headerActions:s,sidebarProps:i}){const[l,o]=p.useState(!1),d=ie("common"),u=e.jsxs(e.Fragment,{children:[e.jsx(pn,{}),e.jsx(Et,{href:"/",variant:"outline",size:"sm",icon:"box-arrow-up-right",children:d.layout.web})]});return e.jsxs("div",{className:"admin-wrapper",children:[l&&e.jsx("div",{className:"sidebar-overlay open",onClick:()=>o(!1)}),e.jsx("aside",{className:\`admin-sidebar\${l?" open":""}\`,children:e.jsx(dn,{activePage:a,onClose:()=>o(!1),...i})}),e.jsxs("main",{className:"admin-main",children:[e.jsxs("div",{className:"admin-header",children:[e.jsxs("div",{children:[e.jsx("button",{className:"mobile-menu-btn",onClick:()=>o(!0),children:e.jsx(H,{name:"list"})}),e.jsx("h1",{className:"admin-title",children:t})]}),e.jsx("div",{className:"admin-header-actions",children:s||u})]}),r]})]})}const fn={purple:"purple",green:"green",blue:"blue",orange:"orange",muted:"",primary:"purple",accent:"green"};function hn({icon:t,iconColor:a="purple",value:r,label:n,change:s,className:i}){const l=["stat-card",i].filter(Boolean).join(" ");return e.jsxs("div",{className:l,children:[e.jsxs("div",{className:"stat-header",children:[e.jsx("div",{className:\`stat-icon \${fn[a]}\`,children:e.jsx(H,{name:t})}),s&&e.jsxs("div",{className:\`stat-change \${s.direction}\`,children:[e.jsx(H,{name:\`arrow-\${s.direction}\`})," ",s.value]})]}),e.jsx("div",{className:"stat-value",children:r}),e.jsx("div",{className:"stat-label",children:n})]})}function wr({stats:t,columns:a=4}){const r=a===2?{md:6}:a===3?{md:4}:{md:6,lg:3};return e.jsx(se,{className:"g-4 mb-4",children:t.map((n,s)=>e.jsx(S,{...r,children:e.jsx(hn,{...n})},s))})}function de({children:t,title:a,headerRight:r,className:n}){const s=["card-section",n].filter(Boolean).join(" "),i=a||r;return e.jsxs("div",{className:s,children:[i&&e.jsxs("div",{className:"card-section-header",children:[a&&e.jsx("h5",{className:"card-section-title",children:a}),r]}),t]})}function Q(t){if(isNaN(t))return"0,00 Kč";const r=(Math.round(t*100)/100).toFixed(2),[n,s]=r.split(".");let i="";for(let l=0;l<n.length;l++)l>0&&(n.length-l)%3===0&&(i+=" "),i+=n[l];return i+","+s+" Kč"}function Fe(t){if(!t||t.length<10)return"-";const a=t.substring(0,4),r=t.substring(5,7),n=t.substring(8,10),s=Number(n),i=Number(r);return s>0&&i>0?\`\${s}. \${i}. \${a}\`:"-"}function gn(t){return gr[t]??t}function bn(t){return Ja[t]??"default"}function St(t){return xr[t]??t}function Tt(t){return Xa[t]??"default"}function xn(t){return jr[t]??t}function vn(t){return Qa[t]??"default"}function jn(t){return Nr[t]??t}function yn(t){return en[t]??"default"}function Pt(t){var s,i,l,o;if(!t)return"??";const a=t.trim().split(/\\s+/),r=((i=(s=a[0])==null?void 0:s[0])==null?void 0:i.toUpperCase())??"",n=((o=(l=a[1])==null?void 0:l[0])==null?void 0:o.toUpperCase())??"";return r+n||r||"??"}function Nn({stats:t,recentOrders:a,lowStockProducts:r}){const n=ie("dashboard");return e.jsxs(we,{title:n.headings.dashboard,activePage:"dashboard",children:[e.jsx(wr,{stats:t}),e.jsxs(se,{className:"g-4",children:[e.jsx(S,{md:8,children:e.jsx(de,{title:n.sections.recentOrders,children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:n.columns.number}),e.jsx("th",{children:n.columns.customer}),e.jsx("th",{style:{textAlign:"right"},children:n.columns.amount}),e.jsx("th",{children:n.columns.status}),e.jsx("th",{children:n.columns.date})]})}),e.jsx("tbody",{children:a.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center text-muted-tf py-4",children:n.empty.orders})}):a.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("a",{href:\`/admin/orders/detail?id=\${s.id}\`,className:"order-id",children:s.orderNumber})}),e.jsx("td",{children:e.jsxs("div",{className:"order-customer",children:[e.jsx("div",{className:"order-avatar",children:Pt(s.customerName)}),s.customerName]})}),e.jsx("td",{style:{textAlign:"right"},children:Q(Number(s.totalAmount))}),e.jsx("td",{children:e.jsx(Ie,{variant:Tt(s.status),children:St(s.status)})}),e.jsx("td",{children:Fe(s.createdAt)})]},s.id))})]})})}),e.jsx(S,{md:4,children:e.jsx(de,{title:n.sections.lowStock,children:r.length===0?e.jsx("p",{className:"text-muted-tf",children:n.empty.noProducts}):r.map(s=>e.jsxs("div",{className:"d-flex justify-content-between align-items-center py-2",style:{borderBottom:"1px solid var(--tf-border)"},children:[e.jsx("a",{href:\`/admin/products/edit?id=\${s.id}\`,style:{color:"var(--tf-text)",textDecoration:"none"},children:s.name}),e.jsxs(Ie,{variant:"danger",children:[s.stock," ks"]})]},s.id))})})]})]})}function kn({stats:t}){const a=ie("dashboard");return e.jsxs(we,{title:a.headings.analytics,activePage:"analytics",children:[e.jsx(wr,{stats:t}),e.jsxs(se,{className:"g-4",children:[e.jsx(S,{md:8,children:e.jsx(de,{title:a.sections.monthlyRevenue,children:e.jsx("div",{className:"chart-placeholder",children:e.jsx("i",{className:"bi bi-bar-chart"})})})}),e.jsx(S,{md:4,children:e.jsx(de,{title:a.sections.topProducts,children:e.jsx("div",{className:"chart-placeholder",children:e.jsx("i",{className:"bi bi-pie-chart"})})})})]})]})}var lt={exports:{}},ct={exports:{}},re={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cr;function wn(){if(Cr)return re;Cr=1;var t=typeof Symbol=="function"&&Symbol.for,a=t?Symbol.for("react.element"):60103,r=t?Symbol.for("react.portal"):60106,n=t?Symbol.for("react.fragment"):60107,s=t?Symbol.for("react.strict_mode"):60108,i=t?Symbol.for("react.profiler"):60114,l=t?Symbol.for("react.provider"):60109,o=t?Symbol.for("react.context"):60110,d=t?Symbol.for("react.async_mode"):60111,u=t?Symbol.for("react.concurrent_mode"):60111,m=t?Symbol.for("react.forward_ref"):60112,f=t?Symbol.for("react.suspense"):60113,g=t?Symbol.for("react.suspense_list"):60120,b=t?Symbol.for("react.memo"):60115,P=t?Symbol.for("react.lazy"):60116,j=t?Symbol.for("react.block"):60121,v=t?Symbol.for("react.fundamental"):60117,N=t?Symbol.for("react.responder"):60118,E=t?Symbol.for("react.scope"):60119;function L(y){if(typeof y=="object"&&y!==null){var T=y.\$\$typeof;switch(T){case a:switch(y=y.type,y){case d:case u:case n:case i:case s:case f:return y;default:switch(y=y&&y.\$\$typeof,y){case o:case m:case P:case b:case l:return y;default:return T}}case r:return T}}}function V(y){return L(y)===u}return re.AsyncMode=d,re.ConcurrentMode=u,re.ContextConsumer=o,re.ContextProvider=l,re.Element=a,re.ForwardRef=m,re.Fragment=n,re.Lazy=P,re.Memo=b,re.Portal=r,re.Profiler=i,re.StrictMode=s,re.Suspense=f,re.isAsyncMode=function(y){return V(y)||L(y)===d},re.isConcurrentMode=V,re.isContextConsumer=function(y){return L(y)===o},re.isContextProvider=function(y){return L(y)===l},re.isElement=function(y){return typeof y=="object"&&y!==null&&y.\$\$typeof===a},re.isForwardRef=function(y){return L(y)===m},re.isFragment=function(y){return L(y)===n},re.isLazy=function(y){return L(y)===P},re.isMemo=function(y){return L(y)===b},re.isPortal=function(y){return L(y)===r},re.isProfiler=function(y){return L(y)===i},re.isStrictMode=function(y){return L(y)===s},re.isSuspense=function(y){return L(y)===f},re.isValidElementType=function(y){return typeof y=="string"||typeof y=="function"||y===n||y===u||y===i||y===s||y===f||y===g||typeof y=="object"&&y!==null&&(y.\$\$typeof===P||y.\$\$typeof===b||y.\$\$typeof===l||y.\$\$typeof===o||y.\$\$typeof===m||y.\$\$typeof===v||y.\$\$typeof===N||y.\$\$typeof===E||y.\$\$typeof===j)},re.typeOf=L,re}var ae={};/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Er;function Cn(){return Er||(Er=1,process.env.NODE_ENV!=="production"&&(function(){var t=typeof Symbol=="function"&&Symbol.for,a=t?Symbol.for("react.element"):60103,r=t?Symbol.for("react.portal"):60106,n=t?Symbol.for("react.fragment"):60107,s=t?Symbol.for("react.strict_mode"):60108,i=t?Symbol.for("react.profiler"):60114,l=t?Symbol.for("react.provider"):60109,o=t?Symbol.for("react.context"):60110,d=t?Symbol.for("react.async_mode"):60111,u=t?Symbol.for("react.concurrent_mode"):60111,m=t?Symbol.for("react.forward_ref"):60112,f=t?Symbol.for("react.suspense"):60113,g=t?Symbol.for("react.suspense_list"):60120,b=t?Symbol.for("react.memo"):60115,P=t?Symbol.for("react.lazy"):60116,j=t?Symbol.for("react.block"):60121,v=t?Symbol.for("react.fundamental"):60117,N=t?Symbol.for("react.responder"):60118,E=t?Symbol.for("react.scope"):60119;function L(k){return typeof k=="string"||typeof k=="function"||k===n||k===u||k===i||k===s||k===f||k===g||typeof k=="object"&&k!==null&&(k.\$\$typeof===P||k.\$\$typeof===b||k.\$\$typeof===l||k.\$\$typeof===o||k.\$\$typeof===m||k.\$\$typeof===v||k.\$\$typeof===N||k.\$\$typeof===E||k.\$\$typeof===j)}function V(k){if(typeof k=="object"&&k!==null){var xe=k.\$\$typeof;switch(xe){case a:var Ee=k.type;switch(Ee){case d:case u:case n:case i:case s:case f:return Ee;default:var X=Ee&&Ee.\$\$typeof;switch(X){case o:case m:case P:case b:case l:return X;default:return xe}}case r:return xe}}}var y=d,T=u,q=o,ee=l,Z=a,ge=m,Te=n,Pe=P,ve=b,be=r,Ce=i,me=s,je=f,le=!1;function ze(k){return le||(le=!0,console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")),x(k)||V(k)===d}function x(k){return V(k)===u}function w(k){return V(k)===o}function F(k){return V(k)===l}function A(k){return typeof k=="object"&&k!==null&&k.\$\$typeof===a}function O(k){return V(k)===m}function U(k){return V(k)===n}function D(k){return V(k)===P}function \$(k){return V(k)===b}function W(k){return V(k)===r}function Y(k){return V(k)===i}function M(k){return V(k)===s}function ue(k){return V(k)===f}ae.AsyncMode=y,ae.ConcurrentMode=T,ae.ContextConsumer=q,ae.ContextProvider=ee,ae.Element=Z,ae.ForwardRef=ge,ae.Fragment=Te,ae.Lazy=Pe,ae.Memo=ve,ae.Portal=be,ae.Profiler=Ce,ae.StrictMode=me,ae.Suspense=je,ae.isAsyncMode=ze,ae.isConcurrentMode=x,ae.isContextConsumer=w,ae.isContextProvider=F,ae.isElement=A,ae.isForwardRef=O,ae.isFragment=U,ae.isLazy=D,ae.isMemo=\$,ae.isPortal=W,ae.isProfiler=Y,ae.isStrictMode=M,ae.isSuspense=ue,ae.isValidElementType=L,ae.typeOf=V})()),ae}var Sr;function Tr(){return Sr||(Sr=1,process.env.NODE_ENV==="production"?ct.exports=wn():ct.exports=Cn()),ct.exports}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var zt,Pr;function En(){if(Pr)return zt;Pr=1;var t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function n(i){if(i==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(i)}function s(){try{if(!Object.assign)return!1;var i=new String("abc");if(i[5]="de",Object.getOwnPropertyNames(i)[0]==="5")return!1;for(var l={},o=0;o<10;o++)l["_"+String.fromCharCode(o)]=o;var d=Object.getOwnPropertyNames(l).map(function(m){return l[m]});if(d.join("")!=="0123456789")return!1;var u={};return"abcdefghijklmnopqrst".split("").forEach(function(m){u[m]=m}),Object.keys(Object.assign({},u)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}return zt=s()?Object.assign:function(i,l){for(var o,d=n(i),u,m=1;m<arguments.length;m++){o=Object(arguments[m]);for(var f in o)a.call(o,f)&&(d[f]=o[f]);if(t){u=t(o);for(var g=0;g<u.length;g++)r.call(o,u[g])&&(d[u[g]]=o[u[g]])}}return d},zt}var Ot,zr;function At(){if(zr)return Ot;zr=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Ot=t,Ot}var _t,Or;function Ar(){return Or||(Or=1,_t=Function.call.bind(Object.prototype.hasOwnProperty)),_t}var Rt,_r;function Sn(){if(_r)return Rt;_r=1;var t=function(){};if(process.env.NODE_ENV!=="production"){var a=At(),r={},n=Ar();t=function(i){var l="Warning: "+i;typeof console<"u"&&console.error(l);try{throw new Error(l)}catch{}}}function s(i,l,o,d,u){if(process.env.NODE_ENV!=="production"){for(var m in i)if(n(i,m)){var f;try{if(typeof i[m]!="function"){var g=Error((d||"React class")+": "+o+" type \`"+m+"\` is invalid; it must be a function, usually from the \`prop-types\` package, but received \`"+typeof i[m]+"\`.This often happens because of typos such as \`PropTypes.function\` instead of \`PropTypes.func\`.");throw g.name="Invariant Violation",g}f=i[m](l,m,d,o,null,a)}catch(P){f=P}if(f&&!(f instanceof Error)&&t((d||"React class")+": type specification of "+o+" \`"+m+"\` is invalid; the type checker function must return \`null\` or an \`Error\` but returned a "+typeof f+". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."),f instanceof Error&&!(f.message in r)){r[f.message]=!0;var b=u?u():"";t("Failed "+o+" type: "+f.message+(b??""))}}}}return s.resetWarningCache=function(){process.env.NODE_ENV!=="production"&&(r={})},Rt=s,Rt}var It,Rr;function Tn(){if(Rr)return It;Rr=1;var t=Tr(),a=En(),r=At(),n=Ar(),s=Sn(),i=function(){};process.env.NODE_ENV!=="production"&&(i=function(o){var d="Warning: "+o;typeof console<"u"&&console.error(d);try{throw new Error(d)}catch{}});function l(){return null}return It=function(o,d){var u=typeof Symbol=="function"&&Symbol.iterator,m="@@iterator";function f(x){var w=x&&(u&&x[u]||x[m]);if(typeof w=="function")return w}var g="<<anonymous>>",b={array:N("array"),bigint:N("bigint"),bool:N("boolean"),func:N("function"),number:N("number"),object:N("object"),string:N("string"),symbol:N("symbol"),any:E(),arrayOf:L,element:V(),elementType:y(),instanceOf:T,node:ge(),objectOf:ee,oneOf:q,oneOfType:Z,shape:Pe,exact:ve};function P(x,w){return x===w?x!==0||1/x===1/w:x!==x&&w!==w}function j(x,w){this.message=x,this.data=w&&typeof w=="object"?w:{},this.stack=""}j.prototype=Error.prototype;function v(x){if(process.env.NODE_ENV!=="production")var w={},F=0;function A(U,D,\$,W,Y,M,ue){if(W=W||g,M=M||\$,ue!==r){if(d){var k=new Error("Calling PropTypes validators directly is not supported by the \`prop-types\` package. Use \`PropTypes.checkPropTypes()\` to call them. Read more at http://fb.me/use-check-prop-types");throw k.name="Invariant Violation",k}else if(process.env.NODE_ENV!=="production"&&typeof console<"u"){var xe=W+":"+\$;!w[xe]&&F<3&&(i("You are manually calling a React.PropTypes validation function for the \`"+M+"\` prop on \`"+W+"\`. This is deprecated and will throw in the standalone \`prop-types\` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."),w[xe]=!0,F++)}}return D[\$]==null?U?D[\$]===null?new j("The "+Y+" \`"+M+"\` is marked as required "+("in \`"+W+"\`, but its value is \`null\`.")):new j("The "+Y+" \`"+M+"\` is marked as required in "+("\`"+W+"\`, but its value is \`undefined\`.")):null:x(D,\$,W,Y,M)}var O=A.bind(null,!1);return O.isRequired=A.bind(null,!0),O}function N(x){function w(F,A,O,U,D,\$){var W=F[A],Y=me(W);if(Y!==x){var M=je(W);return new j("Invalid "+U+" \`"+D+"\` of type "+("\`"+M+"\` supplied to \`"+O+"\`, expected ")+("\`"+x+"\`."),{expectedType:x})}return null}return v(w)}function E(){return v(l)}function L(x){function w(F,A,O,U,D){if(typeof x!="function")return new j("Property \`"+D+"\` of component \`"+O+"\` has invalid PropType notation inside arrayOf.");var \$=F[A];if(!Array.isArray(\$)){var W=me(\$);return new j("Invalid "+U+" \`"+D+"\` of type "+("\`"+W+"\` supplied to \`"+O+"\`, expected an array."))}for(var Y=0;Y<\$.length;Y++){var M=x(\$,Y,O,U,D+"["+Y+"]",r);if(M instanceof Error)return M}return null}return v(w)}function V(){function x(w,F,A,O,U){var D=w[F];if(!o(D)){var \$=me(D);return new j("Invalid "+O+" \`"+U+"\` of type "+("\`"+\$+"\` supplied to \`"+A+"\`, expected a single ReactElement."))}return null}return v(x)}function y(){function x(w,F,A,O,U){var D=w[F];if(!t.isValidElementType(D)){var \$=me(D);return new j("Invalid "+O+" \`"+U+"\` of type "+("\`"+\$+"\` supplied to \`"+A+"\`, expected a single ReactElement type."))}return null}return v(x)}function T(x){function w(F,A,O,U,D){if(!(F[A]instanceof x)){var \$=x.name||g,W=ze(F[A]);return new j("Invalid "+U+" \`"+D+"\` of type "+("\`"+W+"\` supplied to \`"+O+"\`, expected ")+("instance of \`"+\$+"\`."))}return null}return v(w)}function q(x){if(!Array.isArray(x))return process.env.NODE_ENV!=="production"&&(arguments.length>1?i("Invalid arguments supplied to oneOf, expected an array, got "+arguments.length+" arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."):i("Invalid argument supplied to oneOf, expected an array.")),l;function w(F,A,O,U,D){for(var \$=F[A],W=0;W<x.length;W++)if(P(\$,x[W]))return null;var Y=JSON.stringify(x,function(ue,k){var xe=je(k);return xe==="symbol"?String(k):k});return new j("Invalid "+U+" \`"+D+"\` of value \`"+String(\$)+"\` "+("supplied to \`"+O+"\`, expected one of "+Y+"."))}return v(w)}function ee(x){function w(F,A,O,U,D){if(typeof x!="function")return new j("Property \`"+D+"\` of component \`"+O+"\` has invalid PropType notation inside objectOf.");var \$=F[A],W=me(\$);if(W!=="object")return new j("Invalid "+U+" \`"+D+"\` of type "+("\`"+W+"\` supplied to \`"+O+"\`, expected an object."));for(var Y in \$)if(n(\$,Y)){var M=x(\$,Y,O,U,D+"."+Y,r);if(M instanceof Error)return M}return null}return v(w)}function Z(x){if(!Array.isArray(x))return process.env.NODE_ENV!=="production"&&i("Invalid argument supplied to oneOfType, expected an instance of array."),l;for(var w=0;w<x.length;w++){var F=x[w];if(typeof F!="function")return i("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+le(F)+" at index "+w+"."),l}function A(O,U,D,\$,W){for(var Y=[],M=0;M<x.length;M++){var ue=x[M],k=ue(O,U,D,\$,W,r);if(k==null)return null;k.data&&n(k.data,"expectedType")&&Y.push(k.data.expectedType)}var xe=Y.length>0?", expected one of type ["+Y.join(", ")+"]":"";return new j("Invalid "+\$+" \`"+W+"\` supplied to "+("\`"+D+"\`"+xe+"."))}return v(A)}function ge(){function x(w,F,A,O,U){return be(w[F])?null:new j("Invalid "+O+" \`"+U+"\` supplied to "+("\`"+A+"\`, expected a ReactNode."))}return v(x)}function Te(x,w,F,A,O){return new j((x||"React class")+": "+w+" type \`"+F+"."+A+"\` is invalid; it must be a function, usually from the \`prop-types\` package, but received \`"+O+"\`.")}function Pe(x){function w(F,A,O,U,D){var \$=F[A],W=me(\$);if(W!=="object")return new j("Invalid "+U+" \`"+D+"\` of type \`"+W+"\` "+("supplied to \`"+O+"\`, expected \`object\`."));for(var Y in x){var M=x[Y];if(typeof M!="function")return Te(O,U,D,Y,je(M));var ue=M(\$,Y,O,U,D+"."+Y,r);if(ue)return ue}return null}return v(w)}function ve(x){function w(F,A,O,U,D){var \$=F[A],W=me(\$);if(W!=="object")return new j("Invalid "+U+" \`"+D+"\` of type \`"+W+"\` "+("supplied to \`"+O+"\`, expected \`object\`."));var Y=a({},F[A],x);for(var M in Y){var ue=x[M];if(n(x,M)&&typeof ue!="function")return Te(O,U,D,M,je(ue));if(!ue)return new j("Invalid "+U+" \`"+D+"\` key \`"+M+"\` supplied to \`"+O+"\`.\\nBad object: "+JSON.stringify(F[A],null,"  ")+\`
Valid keys: \`+JSON.stringify(Object.keys(x),null,"  "));var k=ue(\$,M,O,U,D+"."+M,r);if(k)return k}return null}return v(w)}function be(x){switch(typeof x){case"number":case"string":case"undefined":return!0;case"boolean":return!x;case"object":if(Array.isArray(x))return x.every(be);if(x===null||o(x))return!0;var w=f(x);if(w){var F=w.call(x),A;if(w!==x.entries){for(;!(A=F.next()).done;)if(!be(A.value))return!1}else for(;!(A=F.next()).done;){var O=A.value;if(O&&!be(O[1]))return!1}}else return!1;return!0;default:return!1}}function Ce(x,w){return x==="symbol"?!0:w?w["@@toStringTag"]==="Symbol"||typeof Symbol=="function"&&w instanceof Symbol:!1}function me(x){var w=typeof x;return Array.isArray(x)?"array":x instanceof RegExp?"object":Ce(w,x)?"symbol":w}function je(x){if(typeof x>"u"||x===null)return""+x;var w=me(x);if(w==="object"){if(x instanceof Date)return"date";if(x instanceof RegExp)return"regexp"}return w}function le(x){var w=je(x);switch(w){case"array":case"object":return"an "+w;case"boolean":case"date":case"regexp":return"a "+w;default:return w}}function ze(x){return!x.constructor||!x.constructor.name?g:x.constructor.name}return b.checkPropTypes=s,b.resetWarningCache=s.resetWarningCache,b.PropTypes=b,b},It}var Ft,Ir;function Pn(){if(Ir)return Ft;Ir=1;var t=At();function a(){}function r(){}return r.resetWarningCache=a,Ft=function(){function n(l,o,d,u,m,f){if(f!==t){var g=new Error("Calling PropTypes validators directly is not supported by the \`prop-types\` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw g.name="Invariant Violation",g}}n.isRequired=n;function s(){return n}var i={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:s,element:n,elementType:n,instanceOf:s,node:n,objectOf:s,oneOf:s,oneOfType:s,shape:s,exact:s,checkPropTypes:r,resetWarningCache:a};return i.PropTypes=i,i},Ft}var Fr;function zn(){if(Fr)return lt.exports;if(Fr=1,process.env.NODE_ENV!=="production"){var t=Tr(),a=!0;lt.exports=Tn()(t.isElement,a)}else lt.exports=Pn()();return lt.exports}var On=zn();const _=wt(On),An={type:_.string,tooltip:_.bool,as:_.elementType},dt=B.forwardRef(({as:t="div",className:a,type:r="valid",tooltip:n=!1,...s},i)=>e.jsx(t,{...s,ref:i,className:te(a,\`\${r}-\${n?"tooltip":"feedback"}\`)}));dt.displayName="Feedback",dt.propTypes=An;const Ae=B.createContext({}),Dt=B.forwardRef(({id:t,bsPrefix:a,className:r,type:n="checkbox",isValid:s=!1,isInvalid:i=!1,as:l="input",...o},d)=>{const{controlId:u}=p.useContext(Ae);return a=ce(a,"form-check-input"),e.jsx(l,{...o,ref:d,type:n,id:t||u,className:te(r,a,s&&"is-valid",i&&"is-invalid")})});Dt.displayName="FormCheckInput";const mt=B.forwardRef(({bsPrefix:t,className:a,htmlFor:r,...n},s)=>{const{controlId:i}=p.useContext(Ae);return t=ce(t,"form-check-label"),e.jsx("label",{...n,ref:s,htmlFor:r||i,className:te(a,t)})});mt.displayName="FormCheckLabel";function _n(t,a){return B.Children.toArray(t).some(r=>B.isValidElement(r)&&r.type===a)}const Dr=B.forwardRef(({id:t,bsPrefix:a,bsSwitchPrefix:r,inline:n=!1,reverse:s=!1,disabled:i=!1,isValid:l=!1,isInvalid:o=!1,feedbackTooltip:d=!1,feedback:u,feedbackType:m,className:f,style:g,title:b="",type:P="checkbox",label:j,children:v,as:N="input",...E},L)=>{a=ce(a,"form-check"),r=ce(r,"form-switch");const{controlId:V}=p.useContext(Ae),y=p.useMemo(()=>({controlId:t||V}),[V,t]),T=!v&&j!=null&&j!==!1||_n(v,mt),q=e.jsx(Dt,{...E,type:P==="switch"?"checkbox":P,ref:L,isValid:l,isInvalid:o,disabled:i,as:N});return e.jsx(Ae.Provider,{value:y,children:e.jsx("div",{style:g,className:te(f,T&&a,n&&\`\${a}-inline\`,s&&\`\${a}-reverse\`,P==="switch"&&r),children:v||e.jsxs(e.Fragment,{children:[q,T&&e.jsx(mt,{title:b,children:j}),u&&e.jsx(dt,{type:m,tooltip:d,children:u})]})})})});Dr.displayName="FormCheck";const ut=Object.assign(Dr,{Input:Dt,Label:mt});var \$t,\$r;function Rn(){if(\$r)return \$t;\$r=1;var t=process.env.NODE_ENV!=="production",a=function(){};if(t){var r=function(s,i){var l=arguments.length;i=new Array(l>1?l-1:0);for(var o=1;o<l;o++)i[o-1]=arguments[o];var d=0,u="Warning: "+s.replace(/%s/g,function(){return i[d++]});typeof console<"u"&&console.error(u);try{throw new Error(u)}catch{}};a=function(n,s,i){var l=arguments.length;i=new Array(l>2?l-2:0);for(var o=2;o<l;o++)i[o-2]=arguments[o];if(s===void 0)throw new Error("\`warning(condition, format, ...args)\` requires a warning message argument");n||r.apply(null,[s].concat(i))}}return \$t=a,\$t}var In=Rn();const Mr=wt(In),Lr=B.forwardRef(({bsPrefix:t,type:a,size:r,htmlSize:n,id:s,className:i,isValid:l=!1,isInvalid:o=!1,plaintext:d,readOnly:u,as:m="input",...f},g)=>{const{controlId:b}=p.useContext(Ae);return t=ce(t,"form-control"),process.env.NODE_ENV!=="production"&&Mr(b==null||!s,"\`controlId\` is ignored on \`<FormControl>\` when \`id\` is specified."),e.jsx(m,{...f,type:a,size:n,ref:g,readOnly:u,id:s||b,className:te(i,d?\`\${t}-plaintext\`:t,r&&\`\${t}-\${r}\`,a==="color"&&\`\${t}-color\`,l&&"is-valid",o&&"is-invalid")})});Lr.displayName="FormControl";const Fn=Object.assign(Lr,{Feedback:dt}),qr=B.forwardRef(({className:t,bsPrefix:a,as:r="div",...n},s)=>(a=ce(a,"form-floating"),e.jsx(r,{ref:s,className:te(t,a),...n})));qr.displayName="FormFloating";const Mt=B.forwardRef(({controlId:t,as:a="div",...r},n)=>{const s=p.useMemo(()=>({controlId:t}),[t]);return e.jsx(Ae.Provider,{value:s,children:e.jsx(a,{...r,ref:n})})});Mt.displayName="FormGroup";const Br=B.forwardRef(({as:t="label",bsPrefix:a,column:r=!1,visuallyHidden:n=!1,className:s,htmlFor:i,...l},o)=>{const{controlId:d}=p.useContext(Ae);a=ce(a,"form-label");let u="col-form-label";typeof r=="string"&&(u=\`\${u} \${u}-\${r}\`);const m=te(s,a,n&&"visually-hidden",r&&u);return process.env.NODE_ENV!=="production"&&Mr(d==null||!i,"\`controlId\` is ignored on \`<FormLabel>\` when \`htmlFor\` is specified."),i=i||d,r?e.jsx(S,{ref:o,as:"label",className:m,htmlFor:i,...l}):e.jsx(t,{ref:o,className:m,htmlFor:i,...l})});Br.displayName="FormLabel";const Vr=B.forwardRef(({bsPrefix:t,className:a,id:r,...n},s)=>{const{controlId:i}=p.useContext(Ae);return t=ce(t,"form-range"),e.jsx("input",{...n,type:"range",ref:s,className:te(a,t),id:r||i})});Vr.displayName="FormRange";const Wr=B.forwardRef(({bsPrefix:t,size:a,htmlSize:r,className:n,isValid:s=!1,isInvalid:i=!1,id:l,...o},d)=>{const{controlId:u}=p.useContext(Ae);return t=ce(t,"form-select"),e.jsx("select",{...o,size:r,ref:d,className:te(n,t,a&&\`\${t}-\${a}\`,s&&"is-valid",i&&"is-invalid"),id:l||u})});Wr.displayName="FormSelect";const Ur=B.forwardRef(({bsPrefix:t,className:a,as:r="small",muted:n,...s},i)=>(t=ce(t,"form-text"),e.jsx(r,{...s,ref:i,className:te(a,t,n&&"text-muted")})));Ur.displayName="FormText";const Yr=B.forwardRef((t,a)=>e.jsx(ut,{...t,ref:a,type:"switch"}));Yr.displayName="Switch";const Dn=Object.assign(Yr,{Input:ut.Input,Label:ut.Label}),Zr=B.forwardRef(({bsPrefix:t,className:a,children:r,controlId:n,label:s,...i},l)=>(t=ce(t,"form-floating"),e.jsxs(Mt,{ref:l,className:te(a,t),controlId:n,...i,children:[r,e.jsx("label",{htmlFor:n,children:s})]})));Zr.displayName="FloatingLabel";const \$n={_ref:_.any,validated:_.bool,as:_.elementType},Lt=B.forwardRef(({className:t,validated:a,as:r="form",...n},s)=>e.jsx(r,{...n,ref:s,className:te(t,a&&"was-validated")}));Lt.displayName="Form",Lt.propTypes=\$n;const R=Object.assign(Lt,{Group:Mt,Control:Fn,Floating:qr,Check:ut,Switch:Dn,Label:Br,Text:Ur,Range:Vr,Select:Wr,FloatingLabel:Zr});function fe({children:t,label:a,required:r,error:n,hint:s,className:i}){const l=["form-group",n?"has-error":"",i].filter(Boolean).join(" ");return e.jsxs("div",{className:l,children:[a&&e.jsxs(R.Label,{children:[a,r&&e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),t,n&&e.jsx("div",{className:"form-error text-danger small mt-1",children:n}),!n&&s&&e.jsx("div",{className:"form-hint text-muted-tf small mt-1",children:s})]})}function tt({options:t,name:a,value:r,placeholder:n,disabled:s,required:i,label:l,filter:o=!1,className:d,onChange:u}){if(o){const f=["filter-select",d].filter(Boolean).join(" ");return e.jsxs("select",{name:a,disabled:s,required:i,className:f,onChange:u,defaultValue:r??"",children:[n&&e.jsx("option",{value:"",disabled:!0,children:n}),t.map(g=>e.jsx("option",{value:g.value,children:g.label},g.value))]})}const m=e.jsxs(R.Select,{name:a,disabled:s,required:i,className:d,onChange:u,defaultValue:r??"",children:[n&&e.jsx("option",{value:"",disabled:!0,children:n}),t.map(f=>e.jsx("option",{value:f.value,children:f.label},f.value))]});return l?e.jsx(fe,{label:l,required:i,children:m}):m}const Ue=!!(typeof window<"u"&&window.document&&window.document.createElement);var qt=!1,Bt=!1;try{var Vt={get passive(){return qt=!0},get once(){return Bt=qt=!0}};Ue&&(window.addEventListener("test",Vt,Vt),window.removeEventListener("test",Vt,!0))}catch{}function Kr(t,a,r,n){if(n&&typeof n!="boolean"&&!Bt){var s=n.once,i=n.capture,l=r;!Bt&&s&&(l=r.__once||function o(d){this.removeEventListener(a,o,i),r.call(this,d)},r.__once=l),t.addEventListener(a,l,qt?n:i)}t.addEventListener(a,r,n)}function pt(t){return t&&t.ownerDocument||document}function Wt(t,a,r,n){var s=n&&typeof n!="boolean"?n.capture:n;t.removeEventListener(a,r,s),r.__once&&t.removeEventListener(a,r.__once,s)}var ft;function Hr(t){if((!ft&&ft!==0||t)&&Ue){var a=document.createElement("div");a.style.position="absolute",a.style.top="-9999px",a.style.width="50px",a.style.height="50px",a.style.overflow="scroll",document.body.appendChild(a),ft=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return ft}function Mn(){return p.useState(null)}function Ln(t){const a=p.useRef(t);return p.useEffect(()=>{a.current=t},[t]),a}function ht(t){const a=Ln(t);return p.useCallback(function(...r){return a.current&&a.current(...r)},[a])}const Gr=t=>!t||typeof t=="function"?t:a=>{t.current=a};function qn(t,a){const r=Gr(t),n=Gr(a);return s=>{r&&r(s),n&&n(s)}}function Jr(t,a){return p.useMemo(()=>qn(t,a),[t,a])}function Bn(t){const a=p.useRef(t);return a.current=t,a}function Vn(t){const a=Bn(t);p.useEffect(()=>()=>a.current(),[])}function Wn(t){var a=pt(t);return a&&a.defaultView||window}function Un(t,a){return Wn(t).getComputedStyle(t,a)}var Yn=/([A-Z])/g;function Zn(t){return t.replace(Yn,"-\$1").toLowerCase()}var Kn=/^ms-/;function gt(t){return Zn(t).replace(Kn,"-ms-")}var Hn=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)\$/i;function Gn(t){return!!(t&&Hn.test(t))}function Le(t,a){var r="",n="";if(typeof a=="string")return t.style.getPropertyValue(gt(a))||Un(t).getPropertyValue(gt(a));Object.keys(a).forEach(function(s){var i=a[s];!i&&i!==0?t.style.removeProperty(gt(s)):Gn(s)?n+=s+"("+i+") ":r+=gt(s)+": "+i+";"}),n&&(r+="transform: "+n+";"),t.style.cssText+=";"+r}function bt(t,a,r,n){return Kr(t,a,r,n),function(){Wt(t,a,r,n)}}function Jn(t,a,r,n){if(n===void 0&&(n=!0),t){var s=document.createEvent("HTMLEvents");s.initEvent(a,r,n),t.dispatchEvent(s)}}function Xn(t){var a=Le(t,"transitionDuration")||"",r=a.indexOf("ms")===-1?1e3:1;return parseFloat(a)*r}function Qn(t,a,r){r===void 0&&(r=5);var n=!1,s=setTimeout(function(){n||Jn(t,"transitionend",!0)},a+r),i=bt(t,"transitionend",function(){n=!0},{once:!0});return function(){clearTimeout(s),i()}}function Xr(t,a,r,n){r==null&&(r=Xn(t)||0);var s=Qn(t,r,n),i=bt(t,"transitionend",a);return function(){s(),i()}}function Ut(t){t===void 0&&(t=pt());try{var a=t.activeElement;return!a||!a.nodeName?null:a}catch{return t.body}}function Qr(t,a){if(t.contains)return t.contains(a);if(t.compareDocumentPosition)return t===a||!!(t.compareDocumentPosition(a)&16)}function es(){const t=p.useRef(!0),a=p.useRef(()=>t.current);return p.useEffect(()=>(t.current=!0,()=>{t.current=!1}),[]),a.current}function ts(t){const a=p.useRef(t);return a.current=t,a}function rs(t){const a=ts(t);p.useEffect(()=>()=>a.current(),[])}function as(t){const a=p.useRef(null);return p.useEffect(()=>{a.current=t}),a.current}function ns(t){const a=p.useRef(t);return p.useEffect(()=>{a.current=t},[t]),a}function De(t){const a=ns(t);return p.useCallback(function(...r){return a.current&&a.current(...r)},[a])}const ss="data-rr-ui-";function is(t){return\`\${ss}\${t}\`}function os(t=document){const a=t.defaultView;return Math.abs(a.innerWidth-t.documentElement.clientWidth)}const ea=is("modal-open");class Yt{constructor({ownerDocument:a,handleContainerOverflow:r=!0,isRTL:n=!1}={}){this.handleContainerOverflow=r,this.isRTL=n,this.modals=[],this.ownerDocument=a}getScrollbarWidth(){return os(this.ownerDocument)}getElement(){return(this.ownerDocument||document).body}setModalAttributes(a){}removeModalAttributes(a){}setContainerStyle(a){const r={overflow:"hidden"},n=this.isRTL?"paddingLeft":"paddingRight",s=this.getElement();a.style={overflow:s.style.overflow,[n]:s.style[n]},a.scrollBarWidth&&(r[n]=\`\${parseInt(Le(s,n)||"0",10)+a.scrollBarWidth}px\`),s.setAttribute(ea,""),Le(s,r)}reset(){[...this.modals].forEach(a=>this.remove(a))}removeContainerStyle(a){const r=this.getElement();r.removeAttribute(ea),Object.assign(r.style,a.style)}add(a){let r=this.modals.indexOf(a);return r!==-1||(r=this.modals.length,this.modals.push(a),this.setModalAttributes(a),r!==0)||(this.state={scrollBarWidth:this.getScrollbarWidth(),style:{}},this.handleContainerOverflow&&this.setContainerStyle(this.state)),r}remove(a){const r=this.modals.indexOf(a);r!==-1&&(this.modals.splice(r,1),!this.modals.length&&this.handleContainerOverflow&&this.removeContainerStyle(this.state),this.removeModalAttributes(a))}isTopModal(a){return!!this.modals.length&&this.modals[this.modals.length-1]===a}}const ta=p.createContext(Ue?window:void 0);ta.Provider;function Zt(){return p.useContext(ta)}const Kt=(t,a)=>Ue?t==null?(a||pt()).body:(typeof t=="function"&&(t=t()),t&&"current"in t&&(t=t.current),t&&("nodeType"in t||t.getBoundingClientRect)?t:null):null;function ls(t,a){const r=Zt(),[n,s]=p.useState(()=>Kt(t,r==null?void 0:r.document));if(!n){const i=Kt(t);i&&s(i)}return p.useEffect(()=>{},[a,n]),p.useEffect(()=>{const i=Kt(t);i!==n&&s(i)},[t,n]),n}const ra=t=>!t||typeof t=="function"?t:a=>{t.current=a};function cs(t,a){const r=ra(t),n=ra(a);return s=>{r&&r(s),n&&n(s)}}function Ht(t,a){return p.useMemo(()=>cs(t,a),[t,a])}const ds=typeof global<"u"&&global.navigator&&global.navigator.product==="ReactNative",aa=typeof document<"u"||ds?p.useLayoutEffect:p.useEffect;function ms(t){return t.code==="Escape"||t.keyCode===27}function us(){const t=B.version.split(".");return{major:+t[0],minor:+t[1],patch:+t[2]}}function xt(t){if(!t||typeof t=="function")return null;const{major:a}=us();return a>=19?t.props.ref:t.ref}function ps({children:t,in:a,onExited:r,mountOnEnter:n,unmountOnExit:s}){const i=p.useRef(null),l=p.useRef(a),o=De(r);p.useEffect(()=>{a?l.current=!0:o(i.current)},[a,o]);const d=Ht(i,xt(t)),u=p.cloneElement(t,{ref:d});return a?u:s||!l.current&&n?null:u}const fs=["onEnter","onEntering","onEntered","onExit","onExiting","onExited","addEndListener","children"];function hs(t,a){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(a.indexOf(n)>=0)continue;r[n]=t[n]}return r}function gs(t){let{onEnter:a,onEntering:r,onEntered:n,onExit:s,onExiting:i,onExited:l,addEndListener:o,children:d}=t,u=hs(t,fs);const m=p.useRef(null),f=Ht(m,xt(d)),g=V=>y=>{V&&m.current&&V(m.current,y)},b=p.useCallback(g(a),[a]),P=p.useCallback(g(r),[r]),j=p.useCallback(g(n),[n]),v=p.useCallback(g(s),[s]),N=p.useCallback(g(i),[i]),E=p.useCallback(g(l),[l]),L=p.useCallback(g(o),[o]);return Object.assign({},u,{nodeRef:m},a&&{onEnter:b},r&&{onEntering:P},n&&{onEntered:j},s&&{onExit:v},i&&{onExiting:N},l&&{onExited:E},o&&{addEndListener:L},{children:typeof d=="function"?(V,y)=>d(V,Object.assign({},y,{ref:f})):p.cloneElement(d,{ref:f})})}const bs=["component"];function xs(t,a){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(a.indexOf(n)>=0)continue;r[n]=t[n]}return r}const vs=B.forwardRef((t,a)=>{let{component:r}=t,n=xs(t,bs);const s=gs(n);return e.jsx(r,Object.assign({ref:a},s))});function js({in:t,onTransition:a}){const r=p.useRef(null),n=p.useRef(!0),s=De(a);return aa(()=>{if(!r.current)return;let i=!1;return s({in:t,element:r.current,initial:n.current,isStale:()=>i}),()=>{i=!0}},[t,s]),aa(()=>(n.current=!1,()=>{n.current=!0}),[]),r}function ys({children:t,in:a,onExited:r,onEntered:n,transition:s}){const[i,l]=p.useState(!a);a&&i&&l(!1);const o=js({in:!!a,onTransition:u=>{const m=()=>{u.isStale()||(u.in?n==null||n(u.element,u.initial):(l(!0),r==null||r(u.element)))};Promise.resolve(s(u)).then(m,f=>{throw u.in||l(!0),f})}}),d=Ht(o,xt(t));return i&&!a?null:p.cloneElement(t,{ref:d})}function na(t,a,r){return t?e.jsx(vs,Object.assign({},r,{component:t})):a?e.jsx(ys,Object.assign({},r,{transition:a})):e.jsx(ps,Object.assign({},r))}const Ns=["show","role","className","style","children","backdrop","keyboard","onBackdropClick","onEscapeKeyDown","transition","runTransition","backdropTransition","runBackdropTransition","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","renderDialog","renderBackdrop","manager","container","onShow","onHide","onExit","onExited","onExiting","onEnter","onEntering","onEntered"];function ks(t,a){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(a.indexOf(n)>=0)continue;r[n]=t[n]}return r}let Gt;function ws(t){return Gt||(Gt=new Yt({ownerDocument:t==null?void 0:t.document})),Gt}function Cs(t){const a=Zt(),r=t||ws(a),n=p.useRef({dialog:null,backdrop:null});return Object.assign(n.current,{add:()=>r.add(n.current),remove:()=>r.remove(n.current),isTopModal:()=>r.isTopModal(n.current),setDialogRef:p.useCallback(s=>{n.current.dialog=s},[]),setBackdropRef:p.useCallback(s=>{n.current.backdrop=s},[])})}const sa=p.forwardRef((t,a)=>{let{show:r=!1,role:n="dialog",className:s,style:i,children:l,backdrop:o=!0,keyboard:d=!0,onBackdropClick:u,onEscapeKeyDown:m,transition:f,runTransition:g,backdropTransition:b,runBackdropTransition:P,autoFocus:j=!0,enforceFocus:v=!0,restoreFocus:N=!0,restoreFocusOptions:E,renderDialog:L,renderBackdrop:V=X=>e.jsx("div",Object.assign({},X)),manager:y,container:T,onShow:q,onHide:ee=()=>{},onExit:Z,onExited:ge,onExiting:Te,onEnter:Pe,onEntering:ve,onEntered:be}=t,Ce=ks(t,Ns);const me=Zt(),je=ls(T),le=Cs(y),ze=es(),x=as(r),[w,F]=p.useState(!r),A=p.useRef(null);p.useImperativeHandle(a,()=>le,[le]),Ue&&!x&&r&&(A.current=Ut(me==null?void 0:me.document)),r&&w&&F(!1);const O=De(()=>{if(le.add(),M.current=bt(document,"keydown",W),Y.current=bt(document,"focus",()=>setTimeout(D),!0),q&&q(),j){var X,Oe;const Me=Ut((X=(Oe=le.dialog)==null?void 0:Oe.ownerDocument)!=null?X:me==null?void 0:me.document);le.dialog&&Me&&!Qr(le.dialog,Me)&&(A.current=Me,le.dialog.focus())}}),U=De(()=>{if(le.remove(),M.current==null||M.current(),Y.current==null||Y.current(),N){var X;(X=A.current)==null||X.focus==null||X.focus(E),A.current=null}});p.useEffect(()=>{!r||!je||O()},[r,je,O]),p.useEffect(()=>{w&&U()},[w,U]),rs(()=>{U()});const D=De(()=>{if(!v||!ze()||!le.isTopModal())return;const X=Ut(me==null?void 0:me.document);le.dialog&&X&&!Qr(le.dialog,X)&&le.dialog.focus()}),\$=De(X=>{X.target===X.currentTarget&&(u==null||u(X),o===!0&&ee())}),W=De(X=>{d&&ms(X)&&le.isTopModal()&&(m==null||m(X),X.defaultPrevented||ee())}),Y=p.useRef(),M=p.useRef(),ue=(...X)=>{F(!0),ge==null||ge(...X)};if(!je)return null;const k=Object.assign({role:n,ref:le.setDialogRef,"aria-modal":n==="dialog"?!0:void 0},Ce,{style:i,className:s,tabIndex:-1});let xe=L?L(k):e.jsx("div",Object.assign({},k,{children:B.cloneElement(l,{role:"document"})}));xe=na(f,g,{unmountOnExit:!0,mountOnEnter:!0,appear:!0,in:!!r,onExit:Z,onExiting:Te,onExited:ue,onEnter:Pe,onEntering:ve,onEntered:be,children:xe});let Ee=null;return o&&(Ee=V({ref:le.setBackdropRef,onClick:\$}),Ee=na(b,P,{in:!!r,appear:!0,mountOnEnter:!0,unmountOnExit:!0,children:Ee})),e.jsx(e.Fragment,{children:We.createPortal(e.jsxs(e.Fragment,{children:[Ee,xe]}),je)})});sa.displayName="Modal";const Es=Object.assign(sa,{Manager:Yt});function Ss(t,a){return t.classList?t.classList.contains(a):(" "+(t.className.baseVal||t.className)+" ").indexOf(" "+a+" ")!==-1}function Ts(t,a){t.classList?t.classList.add(a):Ss(t,a)||(typeof t.className=="string"?t.className=t.className+" "+a:t.setAttribute("class",(t.className&&t.className.baseVal||"")+" "+a))}var Ps=Function.prototype.bind.call(Function.prototype.call,[].slice);function Ye(t,a){return Ps(t.querySelectorAll(a))}function ia(t,a){return t.replace(new RegExp("(^|\\\\s)"+a+"(?:\\\\s|\$)","g"),"\$1").replace(/\\s+/g," ").replace(/^\\s*|\\s*\$/g,"")}function zs(t,a){t.classList?t.classList.remove(a):typeof t.className=="string"?t.className=ia(t.className,a):t.setAttribute("class",ia(t.className&&t.className.baseVal||"",a))}const Ze={FIXED_CONTENT:".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",STICKY_CONTENT:".sticky-top",NAVBAR_TOGGLER:".navbar-toggler"};class Os extends Yt{adjustAndStore(a,r,n){const s=r.style[a];r.dataset[a]=s,Le(r,{[a]:\`\${parseFloat(Le(r,a))+n}px\`})}restore(a,r){const n=r.dataset[a];n!==void 0&&(delete r.dataset[a],Le(r,{[a]:n}))}setContainerStyle(a){super.setContainerStyle(a);const r=this.getElement();if(Ts(r,"modal-open"),!a.scrollBarWidth)return;const n=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";Ye(r,Ze.FIXED_CONTENT).forEach(i=>this.adjustAndStore(n,i,a.scrollBarWidth)),Ye(r,Ze.STICKY_CONTENT).forEach(i=>this.adjustAndStore(s,i,-a.scrollBarWidth)),Ye(r,Ze.NAVBAR_TOGGLER).forEach(i=>this.adjustAndStore(s,i,a.scrollBarWidth))}removeContainerStyle(a){super.removeContainerStyle(a);const r=this.getElement();zs(r,"modal-open");const n=this.isRTL?"paddingLeft":"paddingRight",s=this.isRTL?"marginLeft":"marginRight";Ye(r,Ze.FIXED_CONTENT).forEach(i=>this.restore(n,i)),Ye(r,Ze.STICKY_CONTENT).forEach(i=>this.restore(s,i)),Ye(r,Ze.NAVBAR_TOGGLER).forEach(i=>this.restore(s,i))}}let Jt;function As(t){return Jt||(Jt=new Os(t)),Jt}function oa(t,a){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(a.indexOf(n)!==-1)continue;r[n]=t[n]}return r}function Xt(t,a){return Xt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Xt(t,a)}function _s(t,a){t.prototype=Object.create(a.prototype),t.prototype.constructor=t,Xt(t,a)}const la={disabled:!1};var Rs=process.env.NODE_ENV!=="production"?_.oneOfType([_.number,_.shape({enter:_.number,exit:_.number,appear:_.number}).isRequired]):null;process.env.NODE_ENV!=="production"&&_.oneOfType([_.string,_.shape({enter:_.string,exit:_.string,active:_.string}),_.shape({enter:_.string,enterDone:_.string,enterActive:_.string,exit:_.string,exitDone:_.string,exitActive:_.string})]);const ca=p.createContext(null);var Is=function(a){return a.scrollTop},rt="unmounted",qe="exited",\$e="entering",Be="entered",Qt="exiting",_e=(function(t){_s(a,t);function a(n,s){var i;i=t.call(this,n,s)||this;var l=s,o=l&&!l.isMounting?n.enter:n.appear,d;return i.appearStatus=null,n.in?o?(d=qe,i.appearStatus=\$e):d=Be:n.unmountOnExit||n.mountOnEnter?d=rt:d=qe,i.state={status:d},i.nextCallback=null,i}a.getDerivedStateFromProps=function(s,i){var l=s.in;return l&&i.status===rt?{status:qe}:null};var r=a.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(s){var i=null;if(s!==this.props){var l=this.state.status;this.props.in?l!==\$e&&l!==Be&&(i=\$e):(l===\$e||l===Be)&&(i=Qt)}this.updateStatus(!1,i)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var s=this.props.timeout,i,l,o;return i=l=o=s,s!=null&&typeof s!="number"&&(i=s.exit,l=s.enter,o=s.appear!==void 0?s.appear:l),{exit:i,enter:l,appear:o}},r.updateStatus=function(s,i){if(s===void 0&&(s=!1),i!==null)if(this.cancelNextCallback(),i===\$e){if(this.props.unmountOnExit||this.props.mountOnEnter){var l=this.props.nodeRef?this.props.nodeRef.current:We.findDOMNode(this);l&&Is(l)}this.performEnter(s)}else this.performExit();else this.props.unmountOnExit&&this.state.status===qe&&this.setState({status:rt})},r.performEnter=function(s){var i=this,l=this.props.enter,o=this.context?this.context.isMounting:s,d=this.props.nodeRef?[o]:[We.findDOMNode(this),o],u=d[0],m=d[1],f=this.getTimeouts(),g=o?f.appear:f.enter;if(!s&&!l||la.disabled){this.safeSetState({status:Be},function(){i.props.onEntered(u)});return}this.props.onEnter(u,m),this.safeSetState({status:\$e},function(){i.props.onEntering(u,m),i.onTransitionEnd(g,function(){i.safeSetState({status:Be},function(){i.props.onEntered(u,m)})})})},r.performExit=function(){var s=this,i=this.props.exit,l=this.getTimeouts(),o=this.props.nodeRef?void 0:We.findDOMNode(this);if(!i||la.disabled){this.safeSetState({status:qe},function(){s.props.onExited(o)});return}this.props.onExit(o),this.safeSetState({status:Qt},function(){s.props.onExiting(o),s.onTransitionEnd(l.exit,function(){s.safeSetState({status:qe},function(){s.props.onExited(o)})})})},r.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(s,i){i=this.setNextCallback(i),this.setState(s,i)},r.setNextCallback=function(s){var i=this,l=!0;return this.nextCallback=function(o){l&&(l=!1,i.nextCallback=null,s(o))},this.nextCallback.cancel=function(){l=!1},this.nextCallback},r.onTransitionEnd=function(s,i){this.setNextCallback(i);var l=this.props.nodeRef?this.props.nodeRef.current:We.findDOMNode(this),o=s==null&&!this.props.addEndListener;if(!l||o){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var d=this.props.nodeRef?[this.nextCallback]:[l,this.nextCallback],u=d[0],m=d[1];this.props.addEndListener(u,m)}s!=null&&setTimeout(this.nextCallback,s)},r.render=function(){var s=this.state.status;if(s===rt)return null;var i=this.props,l=i.children;i.in,i.mountOnEnter,i.unmountOnExit,i.appear,i.enter,i.exit,i.timeout,i.addEndListener,i.onEnter,i.onEntering,i.onEntered,i.onExit,i.onExiting,i.onExited,i.nodeRef;var o=oa(i,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return p.createElement(ca.Provider,{value:null},typeof l=="function"?l(s,o):p.cloneElement(p.Children.only(l),o))},a})(p.Component);_e.contextType=ca,_e.propTypes=process.env.NODE_ENV!=="production"?{nodeRef:_.shape({current:typeof Element>"u"?_.any:function(t,a,r,n,s,i){var l=t[a];return _.instanceOf(l&&"ownerDocument"in l?l.ownerDocument.defaultView.Element:Element)(t,a,r,n,s,i)}}),children:_.oneOfType([_.func.isRequired,_.element.isRequired]).isRequired,in:_.bool,mountOnEnter:_.bool,unmountOnExit:_.bool,appear:_.bool,enter:_.bool,exit:_.bool,timeout:function(a){var r=Rs;a.addEndListener||(r=r.isRequired);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return r.apply(void 0,[a].concat(s))},addEndListener:_.func,onEnter:_.func,onEntering:_.func,onEntered:_.func,onExit:_.func,onExiting:_.func,onExited:_.func}:{};function Ke(){}_e.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ke,onEntering:Ke,onEntered:Ke,onExit:Ke,onExiting:Ke,onExited:Ke},_e.UNMOUNTED=rt,_e.EXITED=qe,_e.ENTERING=\$e,_e.ENTERED=Be,_e.EXITING=Qt;function da(t,a){const r=Le(t,a)||"",n=r.indexOf("ms")===-1?1e3:1;return parseFloat(r)*n}function Fs(t,a){const r=da(t,"transitionDuration"),n=da(t,"transitionDelay"),s=Xr(t,i=>{i.target===t&&(s(),a(i))},r+n)}function Ds(t){t.offsetHeight}function \$s(t){return t&&"setState"in t?We.findDOMNode(t):t??null}const ma=p.forwardRef(({onEnter:t,onEntering:a,onEntered:r,onExit:n,onExiting:s,onExited:i,addEndListener:l,children:o,childRef:d,...u},m)=>{const f=p.useRef(null),g=Jr(f,d),b=T=>{g(\$s(T))},P=T=>q=>{T&&f.current&&T(f.current,q)},j=p.useCallback(P(t),[t]),v=p.useCallback(P(a),[a]),N=p.useCallback(P(r),[r]),E=p.useCallback(P(n),[n]),L=p.useCallback(P(s),[s]),V=p.useCallback(P(i),[i]),y=p.useCallback(P(l),[l]);return e.jsx(_e,{ref:m,...u,onEnter:j,onEntered:N,onEntering:v,onExit:E,onExited:V,onExiting:L,addEndListener:y,nodeRef:f,children:typeof o=="function"?(T,q)=>o(T,{...q,ref:b}):p.cloneElement(o,{ref:b})})});ma.displayName="TransitionWrapper";const Ms={[\$e]:"show",[Be]:"show"},at=B.forwardRef(({className:t,children:a,transitionClasses:r={},onEnter:n,...s},i)=>{const l={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,...s},o=p.useCallback((d,u)=>{Ds(d),n==null||n(d,u)},[n]);return e.jsx(ma,{ref:i,addEndListener:Fs,...l,onEnter:o,childRef:xt(a),children:(d,u)=>B.cloneElement(a,{...u,className:te("fade",t,a.props.className,Ms[d],r[d])})})});at.displayName="Fade";const ua=B.forwardRef(({className:t,bsPrefix:a,as:r="div",...n},s)=>(a=ce(a,"modal-body"),e.jsx(r,{ref:s,className:te(t,a),...n})));ua.displayName="ModalBody";const pa=B.createContext({onHide(){}}),er=B.forwardRef(({bsPrefix:t,className:a,contentClassName:r,centered:n,size:s,fullscreen:i,children:l,scrollable:o,...d},u)=>{t=ce(t,"modal");const m=\`\${t}-dialog\`,f=typeof i=="string"?\`\${t}-fullscreen-\${i}\`:\`\${t}-fullscreen\`;return e.jsx("div",{...d,ref:u,className:te(m,a,s&&\`\${t}-\${s}\`,n&&\`\${m}-centered\`,o&&\`\${m}-scrollable\`,i&&f),children:e.jsx("div",{className:te(\`\${t}-content\`,r),children:l})})});er.displayName="ModalDialog";const fa=B.forwardRef(({className:t,bsPrefix:a,as:r="div",...n},s)=>(a=ce(a,"modal-footer"),e.jsx(r,{ref:s,className:te(t,a),...n})));fa.displayName="ModalFooter";const Ls={"aria-label":_.string,onClick:_.func,variant:_.oneOf(["white"])},vt=B.forwardRef(({className:t,variant:a,"aria-label":r="Close",...n},s)=>e.jsx("button",{ref:s,type:"button",className:te("btn-close",a&&\`btn-close-\${a}\`,t),"aria-label":r,...n}));vt.displayName="CloseButton",vt.propTypes=Ls;const ha=B.forwardRef(({closeLabel:t="Close",closeVariant:a,closeButton:r=!1,onHide:n,children:s,...i},l)=>{const o=p.useContext(pa),d=ht(()=>{o==null||o.onHide(),n==null||n()});return e.jsxs("div",{ref:l,...i,children:[s,r&&e.jsx(vt,{"aria-label":t,variant:a,onClick:d})]})});ha.displayName="AbstractModalHeader";const ga=B.forwardRef(({bsPrefix:t,className:a,closeLabel:r="Close",closeButton:n=!1,...s},i)=>(t=ce(t,"modal-header"),e.jsx(ha,{ref:i,...s,className:te(a,t),closeLabel:r,closeButton:n})));ga.displayName="ModalHeader";const ba=(t=>B.forwardRef((a,r)=>e.jsx("div",{...a,ref:r,className:te(a.className,t)}))),qs=ba("h4"),xa=B.forwardRef(({className:t,bsPrefix:a,as:r=qs,...n},s)=>(a=ce(a,"modal-title"),e.jsx(r,{ref:s,className:te(t,a),...n})));xa.displayName="ModalTitle";function Bs(t){return e.jsx(at,{...t,timeout:null})}function Vs(t){return e.jsx(at,{...t,timeout:null})}const va=B.forwardRef(({bsPrefix:t,className:a,style:r,dialogClassName:n,contentClassName:s,children:i,dialogAs:l=er,"data-bs-theme":o,"aria-labelledby":d,"aria-describedby":u,"aria-label":m,show:f=!1,animation:g=!0,backdrop:b=!0,keyboard:P=!0,onEscapeKeyDown:j,onShow:v,onHide:N,container:E,autoFocus:L=!0,enforceFocus:V=!0,restoreFocus:y=!0,restoreFocusOptions:T,onEntered:q,onExit:ee,onExiting:Z,onEnter:ge,onEntering:Te,onExited:Pe,backdropClassName:ve,manager:be,...Ce},me)=>{const[je,le]=p.useState({}),[ze,x]=p.useState(!1),w=p.useRef(!1),F=p.useRef(!1),A=p.useRef(null),[O,U]=Mn(),D=Jr(me,U),\$=ht(N),W=Ha();t=ce(t,"modal");const Y=p.useMemo(()=>({onHide:\$}),[\$]);function M(){return be||As({isRTL:W})}function ue(J){if(!Ue)return;const Re=M().getScrollbarWidth()>0,kt=J.scrollHeight>pt(J).documentElement.clientHeight;le({paddingRight:Re&&!kt?Hr():void 0,paddingLeft:!Re&&kt?Hr():void 0})}const k=ht(()=>{O&&ue(O.dialog)});Vn(()=>{Wt(window,"resize",k),A.current==null||A.current()});const xe=()=>{w.current=!0},Ee=J=>{w.current&&O&&J.target===O.dialog&&(F.current=!0),w.current=!1},X=()=>{x(!0),A.current=Xr(O.dialog,()=>{x(!1)})},Oe=J=>{J.target===J.currentTarget&&X()},Me=J=>{if(b==="static"){Oe(J);return}if(F.current||J.target!==J.currentTarget){F.current=!1;return}N==null||N()},jt=J=>{P?j==null||j(J):(J.preventDefault(),b==="static"&&X())},He=(J,Re)=>{J&&ue(J),ge==null||ge(J,Re)},rr=J=>{A.current==null||A.current(),ee==null||ee(J)},ar=(J,Re)=>{Te==null||Te(J,Re),Kr(window,"resize",k)},it=J=>{J&&(J.style.display=""),Pe==null||Pe(J),Wt(window,"resize",k)},nr=p.useCallback(J=>e.jsx("div",{...J,className:te(\`\${t}-backdrop\`,ve,!g&&"show")}),[g,ve,t]),yt={...r,...je};yt.display="block";const Nt=J=>e.jsx("div",{role:"dialog",...J,style:yt,className:te(a,t,ze&&\`\${t}-static\`,!g&&"show"),onClick:b?Me:void 0,onMouseUp:Ee,"data-bs-theme":o,"aria-label":m,"aria-labelledby":d,"aria-describedby":u,children:e.jsx(l,{...Ce,onMouseDown:xe,className:n,contentClassName:s,children:i})});return e.jsx(pa.Provider,{value:Y,children:e.jsx(Es,{show:f,ref:D,backdrop:b,container:E,keyboard:!0,autoFocus:L,enforceFocus:V,restoreFocus:y,restoreFocusOptions:T,onEscapeKeyDown:jt,onShow:v,onHide:N,onEnter:He,onEntering:ar,onEntered:q,onExit:rr,onExiting:Z,onExited:it,manager:M(),transition:g?Bs:void 0,backdropTransition:g?Vs:void 0,renderBackdrop:nr,renderDialog:Nt})})});va.displayName="Modal";const ja=Object.assign(va,{Body:ua,Header:ga,Title:xa,Footer:fa,Dialog:er,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150});function ya({open:t,message:a,onConfirm:r,onCancel:n}){const s=ie("common");return e.jsx(ja,{show:t,onHide:n,centered:!0,size:"sm",children:e.jsxs(ja.Body,{className:"text-center py-4",children:[e.jsx("p",{style:{marginBottom:"1.5rem",fontSize:"1rem"},children:a}),e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"center"},children:[e.jsx("button",{className:"btn-outline-tf btn-sm",onClick:n,style:{padding:"0.5rem 1.5rem",borderRadius:8},children:s.confirm.cancel}),e.jsx("button",{className:"btn-primary-tf btn-sm",onClick:r,style:{padding:"0.5rem 1.5rem",borderRadius:8},children:s.confirm.confirm})]})]})})}function nt({columns:t,rows:a,actions:r,filters:n,addButton:s,emptyMessage:i="Žádné záznamy",className:l}){const[o,d]=p.useState(null),u=n&&n.length>0,m=r&&r.length>0,f=u||!!s,g=t.length+(m?1:0),b=j=>v=>{const N=new URLSearchParams(window.location.search),E=v.target.value;E?N.set(j,E):N.delete(j),window.location.search=N.toString()},P=(j,v)=>N=>{j.confirm&&(N.preventDefault(),d({url:j.href(v),message:j.confirm}))};return e.jsxs(e.Fragment,{children:[f&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"filter-bar mb-0",children:u&&n.map(j=>{const v=j.placeholder?[{value:"",label:j.placeholder},...j.options]:j.options;return e.jsx(tt,{filter:!0,options:v,name:j.name,value:j.value,onChange:b(j.name)},j.name)})}),s&&e.jsxs("a",{href:s.href,className:"btn-add",children:[e.jsx(H,{name:"plus-lg"})," ",s.label]})]}),e.jsx(de,{className:l,children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[t.map(j=>e.jsx("th",{style:{width:j.width,textAlign:j.align},children:j.label},j.key)),m&&e.jsx("th",{children:"Akce"})]})}),e.jsx("tbody",{children:a.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:g,className:"text-center text-muted-tf py-4",children:i})}):a.map((j,v)=>e.jsxs("tr",{children:[t.map(N=>{const E=j[N.key]??"",L=N.render?N.render(E,j):E;return e.jsx("td",{style:{textAlign:N.align},children:L},N.key)}),m&&e.jsx("td",{children:r.map((N,E)=>{const L=N.href(j),V=["btn-action",N.variant==="danger"?"danger":""].filter(Boolean).join(" ");return e.jsx("a",{href:L,className:V,title:N.title,onClick:N.confirm?P(N,j):void 0,children:e.jsx(H,{name:N.icon})},E)})})]},j.id||v))})]})}),e.jsx(ya,{open:!!o,message:(o==null?void 0:o.message)||"",onConfirm:()=>{o&&(window.location.href=o.url)},onCancel:()=>d(null)})]})}function Ws({products:t,categories:a,statusFilter:r,categoryFilter:n}){const s=ie("catalog"),i=[{key:"name",label:s.columns.product,width:"30%",render:(d,u)=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:d}),u.categoryName&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("small",{className:"text-muted-tf",children:u.categoryName})]})]})},{key:"price",label:s.columns.price,align:"right",render:d=>Q(Number(d))},{key:"stock",label:s.columns.stock,align:"center"},{key:"status",label:s.columns.status,render:d=>e.jsx(Ie,{variant:bn(d),children:gn(d)})}],l=[{icon:"pencil",href:d=>\`/admin/products/edit?id=\${d.id}\`,title:s.actions.edit},{icon:"trash",href:d=>\`/admin/products/delete?id=\${d.id}\`,title:s.actions.delete,variant:"danger",confirm:s.confirm.deleteProduct}],o=[{name:"status",options:br,value:r,placeholder:s.filters.allStatuses},{name:"category",options:a,value:n,placeholder:s.filters.allCategories}];return e.jsx(we,{title:s.headings.products,activePage:"products",children:e.jsx(nt,{columns:i,rows:t,actions:l,filters:o,addButton:{label:s.actions.addProduct,href:"/admin/products/create"},emptyMessage:s.empty.products})})}function tr(){return tr=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var r=arguments[a];for(var n in r)({}).hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},tr.apply(null,arguments)}function Na(t){return"default"+t.charAt(0).toUpperCase()+t.substr(1)}function Us(t){var a=Ys(t,"string");return typeof a=="symbol"?a:String(a)}function Ys(t,a){if(typeof t!="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,a);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}function Zs(t,a,r){var n=p.useRef(t!==void 0),s=p.useState(a),i=s[0],l=s[1],o=t!==void 0,d=n.current;return n.current=o,!o&&d&&i!==a&&l(a),[o?t:i,p.useCallback(function(u){for(var m=arguments.length,f=new Array(m>1?m-1:0),g=1;g<m;g++)f[g-1]=arguments[g];r&&r.apply(void 0,[u].concat(f)),l(u)},[r])]}function Ks(t,a){return Object.keys(a).reduce(function(r,n){var s,i=r,l=i[Na(n)],o=i[n],d=oa(i,[Na(n),n].map(Us)),u=a[n],m=Zs(o,l,t[u]),f=m[0],g=m[1];return tr({},d,(s={},s[n]=f,s[u]=g,s))},t)}const ka=ba("h4");ka.displayName="DivStyledAsH4";const wa=B.forwardRef(({className:t,bsPrefix:a,as:r=ka,...n},s)=>(a=ce(a,"alert-heading"),e.jsx(r,{ref:s,className:te(t,a),...n})));wa.displayName="AlertHeading";const Hs=["as","disabled"];function Gs(t,a){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(a.indexOf(n)>=0)continue;r[n]=t[n]}return r}function Js(t){return!t||t.trim()==="#"}function Ca({tagName:t,disabled:a,href:r,target:n,rel:s,role:i,onClick:l,tabIndex:o=0,type:d}){t||(r!=null||n!=null||s!=null?t="a":t="button");const u={tagName:t};if(t==="button")return[{type:d||"button",disabled:a},u];const m=g=>{if((a||t==="a"&&Js(r))&&g.preventDefault(),a){g.stopPropagation();return}l==null||l(g)},f=g=>{g.key===" "&&(g.preventDefault(),m(g))};return t==="a"&&(r||(r="#"),a&&(r=void 0)),[{role:i??"button",disabled:void 0,tabIndex:a?void 0:o,href:r,target:t==="a"?n:void 0,"aria-disabled":a||void 0,rel:t==="a"?s:void 0,onClick:m,onKeyDown:f},u]}const Xs=B.forwardRef((t,a)=>{let{as:r,disabled:n}=t,s=Gs(t,Hs);const[i,{tagName:l}]=Ca(Object.assign({tagName:r,disabled:n},s));return e.jsx(l,Object.assign({},s,i,{ref:a}))});Xs.displayName="Button";const Qs=["onKeyDown"];function ei(t,a){if(t==null)return{};var r={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(a.indexOf(n)>=0)continue;r[n]=t[n]}return r}function ti(t){return!t||t.trim()==="#"}const Ea=B.forwardRef((t,a)=>{let{onKeyDown:r}=t,n=ei(t,Qs);const[s]=Ca(Object.assign({tagName:"a"},n)),i=De(l=>{s.onKeyDown(l),r==null||r(l)});return ti(n.href)||n.role==="button"?e.jsx("a",Object.assign({ref:a},n,s,{onKeyDown:i})):e.jsx("a",Object.assign({ref:a},n,{onKeyDown:r}))});Ea.displayName="Anchor";const Sa=B.forwardRef(({className:t,bsPrefix:a,as:r=Ea,...n},s)=>(a=ce(a,"alert-link"),e.jsx(r,{ref:s,className:te(t,a),...n})));Sa.displayName="AlertLink";const Ta=B.forwardRef((t,a)=>{const{bsPrefix:r,show:n=!0,closeLabel:s="Close alert",closeVariant:i,className:l,children:o,variant:d="primary",onClose:u,dismissible:m,transition:f=at,...g}=Ks(t,{show:"onClose"}),b=ce(r,"alert"),P=ht(N=>{u&&u(!1,N)}),j=f===!0?at:f,v=e.jsxs("div",{role:"alert",...j?void 0:g,ref:a,className:te(l,b,d&&\`\${b}-\${d}\`,m&&\`\${b}-dismissible\`),children:[m&&e.jsx(vt,{onClick:P,"aria-label":s,variant:i}),o]});return j?e.jsx(j,{unmountOnExit:!0,...g,ref:void 0,in:n,children:v}):n?v:null});Ta.displayName="Alert";const st=Object.assign(Ta,{Link:Sa,Heading:wa});function Pa({sections:t,values:a={},error:r,submitLabel:n="Uložit",submitIcon:s="check-lg",backUrl:i,backLabel:l="Zpět",action:o}){const[d,u]=p.useState(a),m=v=>N=>{u(E=>({...E,[v]:N.target.value}))},f=t.filter(v=>(v.position??"main")==="main"),g=t.filter(v=>v.position==="sidebar");function b(v){const N=d[v.name]??"",E=v.type??"text";if(E==="hidden")return e.jsx("input",{type:"hidden",name:v.name,value:N},v.name);if(E==="textarea")return e.jsx(fe,{label:v.label,required:v.required,hint:v.hint,children:e.jsx(R.Control,{as:"textarea",name:v.name,rows:v.rows??3,placeholder:v.placeholder,required:v.required,value:N,onChange:m(v.name)})},v.name);if(E==="select"){const L=(v.options??[]).map(V=>({value:V.value,label:V.label}));return e.jsx(fe,{label:v.label,required:v.required,hint:v.hint,children:e.jsx(tt,{name:v.name,options:L,value:N,placeholder:v.placeholder,required:v.required,onChange:m(v.name)})},v.name)}return e.jsx(fe,{label:v.label,required:v.required,hint:v.hint,children:e.jsx(R.Control,{type:E,name:v.name,value:N,placeholder:v.placeholder,required:v.required,step:v.step,min:v.min,onChange:m(v.name)})},v.name)}function P(v){return v.some(E=>(E.colSpan??12)<12)?e.jsx(se,{className:"g-3",children:v.map(E=>{const L=E.colSpan??12;return(E.type??"text")==="hidden"?b(E):e.jsx(S,{md:L,children:b(E)},E.name)})}):e.jsx(e.Fragment,{children:v.map(E=>(E.type??"text")==="hidden"?b(E):e.jsx("div",{className:"mb-3",children:b(E)},E.name))})}function j(v){return v.map((N,E)=>e.jsx(de,{title:N.title,children:P(N.fields)},E))}return e.jsxs(e.Fragment,{children:[r&&e.jsx(st,{variant:"danger",className:"mb-4",children:r}),e.jsx("form",{method:"post",action:o,className:"admin-form",children:e.jsxs(se,{className:"g-4",children:[e.jsx(S,{md:8,children:j(f)}),e.jsxs(S,{md:4,children:[j(g),e.jsx(de,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(H,{name:s})," ",n]}),i&&e.jsx("a",{href:i,className:"btn btn-outline-tf btn-sm text-center",children:l})]})})]})]})})]})}function ri({categories:t,values:a,error:r,isEdit:n=!1}){const s=ie("catalog"),i=[{value:"active",label:s.statuses.active},{value:"inactive",label:s.statuses.inactive},{value:"soldout",label:s.statuses.soldout}],l=[{title:s.form.sections.basicInfo,position:"main",fields:[{name:"name",label:s.form.labels.productName,required:!0,colSpan:8},{name:"slug",label:s.form.labels.slug,colSpan:4,placeholder:s.form.placeholders.autoFromName},{name:"short_description",label:s.form.labels.shortDescription,type:"textarea",rows:2},{name:"description",label:s.form.labels.description,type:"textarea",rows:5}]},{title:s.form.sections.priceStock,position:"main",fields:[{name:"price",label:s.form.labels.price,type:"number",step:"0.01",min:"0",required:!0,colSpan:4},{name:"old_price",label:s.form.labels.oldPrice,type:"number",step:"0.01",min:"0",colSpan:4,placeholder:s.form.placeholders.discountHint},{name:"stock",label:s.form.labels.stock,type:"number",min:"0",colSpan:4}]},{title:s.form.labels.category,position:"sidebar",fields:[{name:"category_id",label:s.form.labels.category,type:"select",options:t,placeholder:s.form.labels.noCategory}]},{title:s.form.labels.status,position:"sidebar",fields:[{name:"status",label:s.form.labels.status,type:"select",options:i}]},{title:s.form.labels.icon,position:"sidebar",fields:[{name:"icon",label:s.form.labels.icon,placeholder:s.form.placeholders.iconExamples}]}];return e.jsx(we,{title:n?s.headings.productEdit:s.headings.productCreate,activePage:"products",children:e.jsx(Pa,{sections:l,values:a,error:r,submitLabel:n?s.actions.saveChanges:s.actions.createProduct,backUrl:"/admin/products"})})}function ai({categories:t,statusFilter:a}){const r=ie("catalog"),n=[{key:"name",label:r.columns.category,render:(l,o)=>e.jsxs("span",{className:"d-flex align-items-center gap-2",children:[e.jsx(H,{name:o.icon||"folder"}),e.jsx("strong",{children:l})]})},{key:"sortOrder",label:r.form.labels.sortOrder,align:"center"},{key:"status",label:r.columns.status,render:l=>e.jsx(Ie,{variant:yn(l),children:jn(l)})}],s=[{icon:"pencil",href:l=>\`/admin/categories/edit?id=\${l.id}\`,title:r.actions.edit},{icon:"trash",href:l=>\`/admin/categories/delete?id=\${l.id}\`,title:r.actions.delete,variant:"danger",confirm:r.confirm.deleteCategory}],i=[{name:"status",options:kr,value:a,placeholder:r.filters.allStatuses}];return e.jsx(we,{title:r.headings.categories,activePage:"categories",children:e.jsx(nt,{columns:n,rows:t,actions:s,filters:i,addButton:{label:r.actions.addCategory,href:"/admin/categories/create"},emptyMessage:r.empty.categories})})}function ni({values:t,error:a,isEdit:r=!1}){const n=ie("catalog"),s=[{title:n.form.sections.categoryInfo,position:"main",fields:[{name:"name",label:n.form.labels.categoryName,required:!0,colSpan:8},{name:"slug",label:n.form.labels.slug,colSpan:4,placeholder:n.form.placeholders.autoFromName},{name:"description",label:n.form.labels.description,type:"textarea",rows:3}]},{title:n.form.sections.settings,position:"sidebar",fields:[{name:"status",label:n.form.labels.status,type:"select",options:[{value:"active",label:n.statuses.active},{value:"hidden",label:n.statuses.hidden}]},{name:"sort_order",label:n.form.labels.sortOrder,type:"number",min:"0"},{name:"icon",label:n.form.labels.icon,placeholder:n.form.placeholders.categoryIconExamples}]}];return e.jsx(we,{title:r?n.headings.categoryEdit:n.headings.categoryCreate,activePage:"categories",children:e.jsx(Pa,{sections:s,values:t,error:a,submitLabel:r?n.actions.saveChanges:n.actions.createCategory,backUrl:"/admin/categories"})})}function si({orders:t,statusFilter:a}){const r=ie("orders"),n=[{key:"orderNumber",label:r.columns.number,render:(l,o)=>e.jsx("span",{className:"order-id",children:l})},{key:"customerName",label:r.columns.customer,render:l=>e.jsxs("div",{className:"order-customer",children:[e.jsx("div",{className:"order-avatar",children:Pt(l)}),l]})},{key:"totalAmount",label:r.columns.amount,align:"right",render:l=>Q(Number(l))},{key:"status",label:r.columns.status,render:l=>e.jsx(Ie,{variant:Tt(l),children:St(l)})},{key:"createdAt",label:r.columns.date,render:l=>Fe(l)}],s=[{icon:"eye",href:l=>\`/admin/orders/detail?id=\${l.id}\`,title:r.actions.detail},{icon:"pencil",href:l=>\`/admin/orders/edit?id=\${l.id}\`,title:r.actions.edit}],i=[{name:"status",options:vr,value:a,placeholder:r.statuses.filterAll}];return e.jsx(we,{title:r.headings.admin,activePage:"orders",children:e.jsx(nt,{columns:n,rows:t,actions:s,filters:i,addButton:{label:r.actions.newOrder,href:"/admin/orders/create"},emptyMessage:r.empty.orders})})}function ii({order:t,items:a}){const r=ie("orders");return e.jsx(we,{title:\`\${r.headings.admin} \${t.orderNumber}\`,activePage:"orders",headerActions:e.jsx(Et,{href:\`/admin/orders/edit?id=\${t.id}\`,variant:"outline",size:"sm",icon:"pencil",children:r.actions.edit}),children:e.jsxs(se,{className:"g-4",children:[e.jsxs(S,{md:8,children:[e.jsxs(de,{title:r.detail.sections.items,children:[e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:r.columns.product}),e.jsx("th",{style:{textAlign:"center"},children:r.columns.quantity}),e.jsx("th",{style:{textAlign:"right"},children:r.columns.pricePerUnit}),e.jsx("th",{style:{textAlign:"right"},children:r.columns.total})]})}),e.jsx("tbody",{children:a.map(n=>e.jsxs("tr",{children:[e.jsx("td",{children:n.productName}),e.jsx("td",{style:{textAlign:"center"},children:n.quantity}),e.jsx("td",{style:{textAlign:"right"},children:Q(Number(n.unitPrice))}),e.jsx("td",{style:{textAlign:"right"},children:e.jsx("strong",{children:Q(Number(n.totalPrice))})})]},n.id))})]}),e.jsx("div",{className:"d-flex justify-content-end mt-3",children:e.jsxs("div",{style:{fontSize:"1.25rem",fontWeight:800},children:[r.columns.totalLabel," ",Q(Number(t.totalAmount))]})})]}),t.notes&&e.jsx(de,{title:r.detail.sections.notes,children:e.jsx("p",{children:t.notes})})]}),e.jsxs(S,{md:4,children:[e.jsxs(de,{title:r.detail.sections.info,children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[r.detail.labels.status,":"]})," ",e.jsx(Ie,{variant:Tt(t.status),children:St(t.status)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[r.detail.labels.createdAt,":"]})," ",Fe(t.createdAt)]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[r.detail.labels.name,":"]})," ",t.customerName]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[r.detail.labels.email,":"]})," ",t.customerEmail]})]}),t.shippingAddress&&e.jsx(de,{title:r.detail.sections.shippingAddress,children:e.jsx("p",{children:t.shippingAddress})}),t.billingAddress&&e.jsx(de,{title:"Fakturacni adresa",children:e.jsx("p",{children:t.billingAddress})})]})]})})}function oi({isEdit:t,orderId:a,data:r,availableProducts:n,availableCustomers:s,existingItems:i,error:l}){const o=ie("orders"),[d,u]=p.useState(i&&i.length>0?i:[{productId:"",productName:"",quantity:"1",unitPrice:"0"}]),[m,f]=p.useState(r??{}),g=[{value:"pending",label:o.statuses.pending},{value:"processing",label:o.statuses.processing},{value:"completed",label:o.statuses.completed},{value:"cancelled",label:o.statuses.cancelled},{value:"returned",label:"Vraceno"}],b=T=>q=>{f(ee=>({...ee,[T]:q.target.value}))},P=T=>{const q=T.target.value;if(!q)return;const ee=s.find(Z=>Z.id===q);ee&&f(Z=>({...Z,customer_id:ee.id,customer_name:\`\${ee.firstName} \${ee.lastName}\`,customer_email:ee.email}))},j=(T,q,ee)=>{u(Z=>{const ge=[...Z];return ge[T]={...ge[T],[q]:ee},ge})},v=(T,q)=>{const ee=n.find(Z=>Z.id===q);ee?u(Z=>{const ge=[...Z];return ge[T]={...ge[T],productId:ee.id,productName:ee.name,unitPrice:ee.price},ge}):j(T,"productId",q)},N=()=>{u(T=>[...T,{productId:"",productName:"",quantity:"1",unitPrice:"0"}])},E=T=>{u(q=>q.filter((ee,Z)=>Z!==T))},L=d.reduce((T,q)=>{const ee=Number(q.quantity)||0,Z=Number(q.unitPrice)||0;return T+ee*Z},0),V=s.map(T=>({value:T.id,label:\`\${T.firstName} \${T.lastName} (\${T.email})\`})),y=n.map(T=>({value:T.id,label:\`\${T.name} - \${Q(Number(T.price))}\`}));return e.jsxs(we,{title:t?o.actions.edit:o.headings.create,activePage:"orders",children:[l&&e.jsx(st,{variant:"danger",className:"mb-4",children:l}),e.jsxs("form",{method:"post",children:[a&&e.jsx("input",{type:"hidden",name:"id",value:a}),e.jsxs(se,{className:"g-4",children:[e.jsxs(S,{lg:8,children:[e.jsxs(de,{title:o.form.sections.customer,children:[e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:o.form.labels.selectCustomer,children:e.jsxs(R.Select,{onChange:P,defaultValue:"",children:[e.jsx("option",{value:"",children:o.form.labels.noAssignment}),V.map(T=>e.jsx("option",{value:T.value,children:T.label},T.value))]})})}),e.jsx("input",{type:"hidden",name:"customer_id",value:m.customer_id??""}),e.jsxs(se,{className:"g-3",children:[e.jsx(S,{md:6,children:e.jsx(fe,{label:o.form.labels.customerName,required:!0,children:e.jsx(R.Control,{type:"text",name:"customer_name",required:!0,value:m.customer_name??"",onChange:b("customer_name")})})}),e.jsx(S,{md:6,children:e.jsx(fe,{label:o.form.labels.email,required:!0,children:e.jsx(R.Control,{type:"email",name:"customer_email",required:!0,value:m.customer_email??"",onChange:b("customer_email")})})})]}),e.jsxs(se,{className:"g-3 mt-1",children:[e.jsx(S,{md:6,children:e.jsx(fe,{label:o.form.labels.shippingAddress,children:e.jsx(R.Control,{as:"textarea",name:"shipping_address",rows:2,value:m.shipping_address??"",onChange:b("shipping_address")})})}),e.jsx(S,{md:6,children:e.jsx(fe,{label:"Fakturacni adresa",children:e.jsx(R.Control,{as:"textarea",name:"billing_address",rows:2,value:m.billing_address??"",onChange:b("billing_address")})})})]})]}),e.jsxs(de,{title:o.form.sections.items,children:[e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:"35%"},children:o.columns.product}),e.jsx("th",{style:{width:"25%"},children:o.form.labels.itemName}),e.jsx("th",{style:{width:"10%",textAlign:"center"},children:o.columns.quantity}),e.jsx("th",{style:{width:"15%",textAlign:"right"},children:o.columns.pricePerUnit}),e.jsx("th",{style:{width:"10%",textAlign:"right"},children:o.columns.total}),e.jsx("th",{style:{width:"5%"}})]})}),e.jsx("tbody",{children:d.map((T,q)=>{const ee=(Number(T.quantity)||0)*(Number(T.unitPrice)||0);return e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsxs(R.Select,{value:T.productId,onChange:Z=>v(q,Z.target.value),children:[e.jsx("option",{value:"",children:o.form.labels.customItem}),y.map(Z=>e.jsx("option",{value:Z.value,children:Z.label},Z.value))]}),e.jsx("input",{type:"hidden",name:\`item_product_id_\${q}\`,value:T.productId})]}),e.jsxs("td",{children:[e.jsx(R.Control,{type:"text",placeholder:o.form.labels.itemName,value:T.productName,onChange:Z=>j(q,"productName",Z.target.value)}),e.jsx("input",{type:"hidden",name:\`item_name_\${q}\`,value:T.productName})]}),e.jsxs("td",{children:[e.jsx(R.Control,{type:"number",min:"1",style:{textAlign:"center"},value:T.quantity,onChange:Z=>j(q,"quantity",Z.target.value)}),e.jsx("input",{type:"hidden",name:\`item_qty_\${q}\`,value:T.quantity})]}),e.jsxs("td",{children:[e.jsx(R.Control,{type:"number",step:"0.01",min:"0",style:{textAlign:"right"},value:T.unitPrice,onChange:Z=>j(q,"unitPrice",Z.target.value)}),e.jsx("input",{type:"hidden",name:\`item_price_\${q}\`,value:T.unitPrice})]}),e.jsx("td",{style:{textAlign:"right",fontWeight:600},children:Q(ee)}),e.jsx("td",{children:d.length>1&&e.jsx("button",{type:"button",className:"btn-action danger",title:o.actions.removeItem,onClick:()=>E(q),children:e.jsx(H,{name:"x-lg"})})})]},q)})})]}),e.jsx("input",{type:"hidden",name:"item_count",value:String(d.length)}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:N,children:[e.jsx(H,{name:"plus-lg"})," ",o.actions.addItem]}),e.jsxs("div",{style:{fontSize:"1.25rem",fontWeight:800},children:[o.columns.totalLabel," ",Q(L)]})]})]}),e.jsx(de,{title:o.form.sections.notes,children:e.jsx(fe,{label:o.form.labels.notesPlaceholder,children:e.jsx(R.Control,{as:"textarea",name:"notes",rows:3,value:m.notes??"",onChange:b("notes")})})})]}),e.jsxs(S,{lg:4,children:[e.jsx(de,{title:o.columns.status,children:e.jsx(fe,{label:o.form.sections.orderStatus,children:e.jsx(tt,{name:"status",options:g,value:m.status??"pending",onChange:b("status")})})}),e.jsx(de,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(H,{name:"check-lg"})," ",t?o.actions.saveChanges:o.actions.createOrder]}),e.jsx("a",{href:"/admin/orders",className:"btn btn-outline-tf btn-sm text-center",children:o.actions.backToList})]})})]})]})]})]})}function li({posts:t,statusFilter:a}){const r=ie("blog"),n=t.map(o=>({id:o.id,title:o.title,slug:o.slug,author:o.author,category:o.category,status:o.status,createdAt:o.createdAt})),s=[{key:"title",label:r.columns.name,width:"35%",render:(o,d)=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:o}),e.jsx("br",{}),e.jsx("small",{className:"text-muted-tf",children:d.slug})]})},{key:"author",label:r.columns.author},{key:"category",label:r.columns.category},{key:"status",label:r.columns.status,render:o=>e.jsx(Ie,{variant:vn(o),children:xn(o)})},{key:"createdAt",label:r.columns.date,render:o=>Fe(o)}],i=[{icon:"pencil",href:o=>\`/admin/blog/edit?id=\${o.id}\`,title:r.actions.edit},{icon:"eye",href:o=>\`/article?slug=\${o.slug}\`,title:r.actions.view},{icon:"trash",href:o=>\`/admin/blog/delete?id=\${o.id}\`,title:r.actions.delete,variant:"danger",confirm:r.confirm.deleteArticle}],l=[{name:"status",options:yr,value:a,placeholder:r.filters.allStatuses}];return e.jsx(we,{title:r.headings.admin,activePage:"blog",children:e.jsx(nt,{columns:s,rows:n,actions:i,filters:l,addButton:{label:r.actions.newArticle,href:"/admin/blog/create"},emptyMessage:r.empty.articles})})}function ci({isEdit:t,editId:a,values:r,allMedia:n=[],error:s}){const i=ie("blog"),[l,o]=p.useState(r??{}),[d,u]=p.useState(!1),[m,f]=p.useState((r==null?void 0:r.featured_image)??""),g=[{value:"draft",label:i.statuses.draft},{value:"published",label:i.statuses.published},{value:"archived",label:"Archivovano"}],b=N=>E=>{o(L=>({...L,[N]:E.target.value}))},P=n.filter(N=>N.contentType.startsWith("image/")),j=N=>{f(N),u(!1)},v=()=>{f("")};return e.jsxs(we,{title:t?i.headings.edit:i.headings.create,activePage:"blog",children:[s&&e.jsx(st,{variant:"danger",className:"mb-4",children:s}),e.jsxs("form",{method:"post",children:[a&&e.jsx("input",{type:"hidden",name:"id",value:a}),e.jsx("input",{type:"hidden",name:"featured_image",value:m}),e.jsxs(se,{className:"g-4",children:[e.jsx(S,{lg:8,children:e.jsxs(de,{title:i.form.sections.content,children:[e.jsxs(se,{className:"g-3",children:[e.jsx(S,{md:8,children:e.jsx(fe,{label:i.form.labels.title,required:!0,children:e.jsx(R.Control,{type:"text",name:"title",required:!0,placeholder:i.form.placeholders.title,value:l.title??"",onChange:b("title")})})}),e.jsx(S,{md:4,children:e.jsx(fe,{label:i.form.labels.slug,children:e.jsx(R.Control,{type:"text",name:"slug",placeholder:i.form.placeholders.slug,value:l.slug??"",onChange:b("slug")})})})]}),e.jsx("div",{className:"mb-3 mt-3",children:e.jsx(fe,{label:i.form.labels.excerpt,children:e.jsx(R.Control,{as:"textarea",name:"excerpt",rows:3,placeholder:i.form.placeholders.excerpt,value:l.excerpt??"",onChange:b("excerpt")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:i.form.labels.content,children:e.jsx(R.Control,{as:"textarea",name:"content",rows:15,placeholder:i.form.placeholders.content,value:l.content??"",onChange:b("content")})})})]})}),e.jsxs(S,{lg:4,children:[e.jsx(de,{title:i.form.sections.featuredImage,children:m?e.jsxs("div",{className:"mb-3",children:[e.jsx("img",{src:m,alt:i.form.sections.featuredImage,style:{width:"100%",borderRadius:8,objectFit:"cover",maxHeight:200}}),e.jsxs("div",{className:"d-flex gap-2 mt-2",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>u(!0),children:[e.jsx(H,{name:"arrow-repeat"})," ",i.actions.selectFromMedia]}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"var(--tf-danger)"},onClick:v,children:[e.jsx(H,{name:"x-lg"})," ",i.actions.removeImage]})]})]}):e.jsxs("div",{className:"text-center py-3",children:[e.jsx(H,{name:"image",size:"xl",className:"text-muted-tf"}),e.jsx("p",{className:"text-muted-tf small mt-2 mb-3",children:i.form.labels.noImage}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>u(!0),children:[e.jsx(H,{name:"images"})," ",i.actions.selectFromMedia]})]})}),e.jsxs(de,{title:i.form.sections.settings,children:[e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:i.form.labels.status,children:e.jsx(tt,{name:"status",options:g,value:l.status??"draft",onChange:b("status")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:i.form.labels.category,children:e.jsx(R.Control,{type:"text",name:"category",placeholder:i.form.placeholders.category,value:l.category??"",onChange:b("category")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:i.form.labels.readTime,children:e.jsx(R.Control,{type:"number",name:"read_time",min:"1",value:l.read_time??"5",onChange:b("read_time")})})})]}),e.jsx(de,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(H,{name:"check-lg"})," ",t?i.actions.saveChanges:i.actions.createArticle]}),e.jsx("a",{href:"/admin/blog",className:"btn btn-outline-tf btn-sm text-center",children:i.actions.backToList})]})})]})]})]}),d&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:()=>u(!1)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"1.5rem",maxWidth:700,width:"90%",maxHeight:"80vh",overflow:"auto"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:i.form.sections.selectImage}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>u(!1),children:e.jsx(H,{name:"x-lg"})})]}),P.length===0?e.jsxs("div",{className:"text-center text-muted-tf py-4",children:[e.jsx(H,{name:"images",size:"xl"}),e.jsx("p",{className:"mt-2",children:i.empty.noImages})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:"0.75rem"},children:P.map(N=>e.jsx("div",{onClick:()=>j(N.url),style:{cursor:"pointer",borderRadius:8,overflow:"hidden",border:m===N.url?"2px solid var(--tf-primary)":"2px solid transparent",aspectRatio:"1"},children:e.jsx("img",{src:N.url,alt:N.filename,style:{width:"100%",height:"100%",objectFit:"cover"}})},N.id))})]})]})]})}function za(t){return t.startsWith("image/")?"file-earmark-image":t.startsWith("video/")?"file-earmark-play":t.startsWith("audio/")?"file-earmark-music":t.includes("pdf")?"file-earmark-pdf":"file-earmark"}function di(t,a){return a?a==="image"?t.startsWith("image/"):a==="video"?t.startsWith("video/"):a==="audio"?t.startsWith("audio/"):a==="document"?!t.startsWith("image/")&&!t.startsWith("video/")&&!t.startsWith("audio/"):!0:!0}function mi({mediaItems:t,typeFilter:a}){const r=ie("media"),[n,s]=p.useState(!1),[i,l]=p.useState(null),[o,d]=p.useState(null),u=[{value:"",label:r.filters.allTypes},{value:"image",label:r.filters.images},{value:"document",label:r.filters.documents},{value:"video",label:r.filters.videos},{value:"audio",label:"Audio"}],m=t.filter(b=>di(b.contentType,a)),f=b=>{const P=b.target.value,j=new URLSearchParams(window.location.search);P?j.set("type",P):j.delete("type"),window.location.search=j.toString()},g=b=>{d({url:\`/admin/media/delete?id=\${b.id}\`,message:r.confirm.deleteFile})};return e.jsxs(we,{title:r.headings.admin,activePage:"media",headerActions:e.jsx(Et,{variant:"primary",size:"sm",icon:"upload",onClick:()=>s(!0),children:r.actions.upload}),children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"filter-bar mb-0",children:e.jsx(tt,{filter:!0,options:u,name:"type",value:a,onChange:f})}),e.jsxs("span",{className:"text-muted-tf small",children:[m.length," polozek"]})]}),e.jsx(de,{children:m.length===0?e.jsxs("div",{className:"text-center text-muted-tf py-5",children:[e.jsx(H,{name:"images",size:"xl"}),e.jsx("p",{className:"mt-2",children:r.empty.noMedia}),e.jsx("p",{className:"small",children:r.empty.uploadHint})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"1rem"},children:m.map(b=>e.jsxs("div",{className:"media-grid-item",style:{position:"relative",borderRadius:12,overflow:"hidden",border:"1px solid var(--tf-border)",background:"var(--tf-surface)",aspectRatio:"1",cursor:"pointer"},children:[e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:b.contentType.startsWith("image/")?e.jsx("img",{src:b.url,alt:b.filename,style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsxs("div",{className:"text-center",children:[e.jsx(H,{name:za(b.contentType),size:"xl",className:"text-muted-tf"}),e.jsx("div",{className:"text-muted-tf small mt-1",style:{maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 0.5rem"},children:b.filename})]})}),e.jsxs("div",{className:"media-overlay",style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s",padding:"0.5rem"},onMouseEnter:P=>{P.currentTarget.style.opacity="1"},onMouseLeave:P=>{P.currentTarget.style.opacity="0"},children:[e.jsx("div",{style:{color:"#fff",fontSize:"0.75rem",textAlign:"center",marginBottom:"0.5rem",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:b.filename}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"#fff",borderColor:"rgba(255,255,255,0.5)",fontSize:"0.75rem",padding:"0.25rem 0.5rem"},onClick:P=>{P.stopPropagation(),l(b)},children:[e.jsx(H,{name:"eye"})," ",r.actions.open]}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"#ff6b6b",borderColor:"rgba(255,107,107,0.5)",fontSize:"0.75rem",padding:"0.25rem 0.5rem"},onClick:P=>{P.stopPropagation(),g(b)},children:[e.jsx(H,{name:"trash"})," ",r.actions.delete]})]})]})]},b.id))})}),n&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:()=>s(!1)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"2rem",maxWidth:450,width:"90%"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:r.form.uploadTitle}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>s(!1),children:e.jsx(H,{name:"x-lg"})})]}),e.jsxs("form",{method:"post",encType:"multipart/form-data",action:"/admin/media/upload",children:[e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:r.form.selectFile,required:!0,children:e.jsx(R.Control,{type:"file",name:"file",required:!0})})}),e.jsx("div",{className:"mb-3",children:e.jsx(fe,{label:r.form.altText,children:e.jsx(R.Control,{type:"text",name:"alt_text",placeholder:r.form.altPlaceholder})})}),e.jsxs("div",{className:"d-flex gap-2 justify-content-end",children:[e.jsx("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>s(!1),children:r.actions.cancelBtn}),e.jsxs("button",{type:"submit",className:"btn-add",children:[e.jsx(H,{name:"upload"})," ",r.actions.uploadBtn]})]})]})]})]}),i&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"},onClick:()=>l(null)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"1.5rem",maxWidth:800,width:"90%",maxHeight:"85vh",overflow:"auto"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:i.filename}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>l(null),children:e.jsx(H,{name:"x-lg"})})]}),i.contentType.startsWith("image/")?e.jsx("img",{src:i.url,alt:i.filename,style:{width:"100%",borderRadius:8,objectFit:"contain",maxHeight:"60vh"}}):e.jsxs("div",{className:"text-center py-4",children:[e.jsx(H,{name:za(i.contentType),size:"xl"}),e.jsx("p",{className:"mt-2",children:i.filename}),e.jsxs("a",{href:i.url,target:"_blank",rel:"noopener noreferrer",className:"btn-outline-tf btn-sm",children:[e.jsx(H,{name:"download"})," Stahnout"]})]}),e.jsxs("div",{className:"text-muted-tf small mt-3",children:[e.jsxs("div",{children:["Typ: ",i.contentType]}),e.jsxs("div",{children:["Nahrano: ",Fe(i.createdAt)]})]})]})]}),e.jsx(ya,{open:!!o,message:(o==null?void 0:o.message)||"",onConfirm:()=>{o&&(window.location.href=o.url)},onCancel:()=>d(null)})]})}const ui=[{value:"active",label:"Aktivni"},{value:"inactive",label:"Neaktivni"}];function pi(t){return t==="active"?"Aktivni":"Neaktivni"}function fi(t){return t==="active"?"success":"warning"}function hi({customers:t,statusFilter:a}){const r=ie("common"),n=t.map(o=>({id:o.id,fullName:\`\${o.firstName} \${o.lastName}\`,firstName:o.firstName,lastName:o.lastName,email:o.email,phone:o.phone??"",company:o.company??"",status:o.status,createdAt:o.createdAt})),s=[{key:"fullName",label:r.customers.columns.name,width:"25%",render:(o,d)=>e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("div",{className:"avatar",style:{width:36,height:36,fontSize:"0.85rem",flexShrink:0},children:Pt(o)}),e.jsx("div",{children:e.jsx("strong",{children:o})})]})},{key:"email",label:r.customers.columns.email},{key:"phone",label:"Telefon",render:o=>o||"-"},{key:"company",label:"Spolecnost",render:o=>o||"-"},{key:"status",label:"Stav",render:o=>e.jsx(Ie,{variant:fi(o),children:pi(o)})},{key:"createdAt",label:r.customers.columns.registered,render:o=>Fe(o)}],i=[{icon:"eye",href:o=>\`/admin/customers/detail?id=\${o.id}\`,title:"Detail"}],l=[{name:"status",options:ui,value:a,placeholder:"Vsechny stavy"}];return e.jsx(we,{title:r.customers.heading,activePage:"customers",children:e.jsx(nt,{columns:s,rows:n,actions:i,filters:l,emptyMessage:r.customers.empty})})}const z=B.forwardRef(({bsPrefix:t,fluid:a=!1,as:r="div",className:n,...s},i)=>{const l=ce(t,"container"),o=typeof a=="string"?\`-\${a}\`:"-fluid";return e.jsx(r,{ref:i,...s,className:te(n,a?\`\${l}\${o}\`:l)})});z.displayName="Container";const gi=\`
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
\`,bi=\`{
  "mcpServers": {
    "typeforge": {
      "command": "npx",
      "args": ["-y", "typeforge-mcp"],
      "env": {
        "TYPEFORGE_API_TOKEN": "your-api-token"
      }
    }
  }
}\`,xi=[{icon:"robot",title:"AI Asistent",desc:"Integrovaný AI asistent pro rychlejší vývoj a automatizaci."},{icon:"code-slash",title:"TypeScript nativně",desc:"Plná podpora TypeScriptu s kompilací do Lua pro maximální výkon."},{icon:"cloud-arrow-up",title:"Serverless deploy",desc:"Nasazení jedním příkazem bez správy infrastruktury."},{icon:"database",title:"Databáze & cache",desc:"PostgreSQL, Redis a vestavěná cache k dispozici okamžitě."},{icon:"diagram-3",title:"MCP Connector",desc:"Propojte svůj projekt s AI agenty přes standardní MCP protokol."},{icon:"share",title:"API & Integrace",desc:"REST API, JWT autentizace, email, PDF a další služby v základu."}],vi=[{title:"Vytvořte projekt",desc:"Inicializujte nový TypeForge projekt a nakonfigurujte služby."},{title:"Napište kód",desc:"Vyvíjejte v TypeScriptu s podporou AI asistenta a hot-reload."},{title:"Nasadte",desc:"Jedním příkazem nasaďte na serverless infrastrukturu."}],ji=[{name:"Claude Code",icon:"terminal"},{name:"Cursor",icon:"cursor"},{name:"Windsurf",icon:"wind"},{name:"Cline",icon:"braces"}];function yi({userName:t}){const{toggleTheme:a}=Ne(),r=ie("shop");return e.jsxs("div",{style:{background:"var(--tf-bg)",color:"var(--tf-text)",minHeight:"100vh"},children:[e.jsx("style",{children:gi}),e.jsx("nav",{className:"landing-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/#connector",className:"nav-link d-none d-md-inline",children:"MCP Connector"}),e.jsx("a",{href:"/#features",className:"nav-link d-none d-md-inline",children:"Features"}),e.jsx("a",{href:"/#how-it-works",className:"nav-link d-none d-md-inline",children:"Jak to funguje"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:r.nav.eshop}),e.jsx("a",{href:"/admin",className:"nav-link d-none d-md-inline",children:r.nav.admin}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:r.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),t?e.jsx("a",{href:"/logout",className:"btn-outline-tf btn-sm",children:"Odhlásit"}):e.jsx("a",{href:"/login",className:"btn-primary-tf btn-sm",children:"Přihlásit"})]})]})}),e.jsx("section",{className:"landing-hero",children:e.jsxs(z,{children:[e.jsxs("span",{className:"hero-badge",children:[e.jsx("i",{className:"bi bi-stars me-1"}),"Lorem ipsum dolor sit amet"]}),e.jsxs("h1",{className:"landing-hero-title",children:["Vytvářejte webové aplikace",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"rychleji než kdy dříve"})]}),e.jsx("p",{className:"landing-hero-subtitle",children:"TypeForge je moderní serverless framework pro TypeScript vývojáře. Kompilujte do Lua, nasazujte jedním příkazem a integrujte AI agenty."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"/register",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Začít zdarma"]}),e.jsxs("a",{href:"/#features",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-play-circle me-2"}),"Zjistit více"]})]}),e.jsxs("div",{className:"landing-prompt-box",children:[e.jsx("i",{className:"bi bi-chevron-right",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"npx create-typeforge-app my-project"}),e.jsx("span",{className:"cursor-blink"})]})]})}),e.jsx("section",{className:"landing-connector",id:"connector",children:e.jsx(z,{children:e.jsxs(se,{className:"align-items-center g-5",children:[e.jsxs(S,{lg:6,children:[e.jsxs("div",{className:"section-label",children:[e.jsx("i",{className:"bi bi-plug"}),"MCP Connector"]}),e.jsx("h2",{className:"fw-bold mb-3",children:"Propojte svůj projekt s AI agenty"}),e.jsx("p",{className:"text-muted-tf mb-4",children:"Standardní Model Context Protocol umožňuje AI agentům pracovat s vaším projektem, spravovat databázi, nasazovat změny a mnohem více."}),e.jsx("div",{className:"d-flex flex-wrap gap-2",children:ji.map(n=>e.jsxs("span",{className:"agent-badge",children:[e.jsx("i",{className:\`bi bi-\${n.icon}\`}),n.name]},n.name))})]}),e.jsx(S,{lg:6,children:e.jsx("div",{className:"landing-code-block",children:e.jsx("pre",{children:bi})})})]})})}),e.jsx("section",{className:"landing-features",id:"features",children:e.jsxs(z,{children:[e.jsxs("div",{className:"text-center mb-5",children:[e.jsxs("div",{className:"section-label justify-content-center",children:[e.jsx("i",{className:"bi bi-grid"}),"Features"]}),e.jsx("h2",{className:"fw-bold",children:"Vše co potřebujete"}),e.jsx("p",{className:"text-muted-tf",children:"Kompletní sada nástrojů pro moderní webový vývoj."})]}),e.jsx(se,{className:"g-4",children:xi.map(n=>e.jsx(S,{md:6,lg:4,children:e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:e.jsx("i",{className:\`bi bi-\${n.icon}\`})}),e.jsx("h5",{children:n.title}),e.jsx("p",{children:n.desc})]})},n.icon))})]})}),e.jsx("section",{className:"landing-how-it-works",id:"how-it-works",children:e.jsxs(z,{children:[e.jsxs("div",{className:"text-center mb-5",children:[e.jsxs("div",{className:"section-label justify-content-center",children:[e.jsx("i",{className:"bi bi-list-ol"}),"Jak to funguje"]}),e.jsx("h2",{className:"fw-bold",children:"Tři jednoduché kroky"})]}),e.jsx(se,{className:"g-4",children:vi.map((n,s)=>e.jsx(S,{md:4,children:e.jsxs("div",{className:"step-card",children:[e.jsx("div",{className:"step-number",children:s+1}),e.jsx("h5",{children:n.title}),e.jsx("p",{children:n.desc})]})},s))})]})}),e.jsx(z,{as:"section",children:e.jsxs("div",{className:"landing-cta",children:[e.jsx("h2",{children:"Připraveni začít?"}),e.jsx("p",{children:"Vytvořte si účet zdarma a začněte stavět během pár minut."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"/register",className:"btn-primary-tf",style:{background:"#fff",color:"var(--tf-primary)"},children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Začít zdarma"]}),e.jsx("a",{href:"/blog",className:"btn-outline-tf",style:{borderColor:"rgba(255,255,255,0.3)",color:"#fff"},children:"Přečíst blog"})]})]})}),e.jsx("footer",{className:"landing-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Ni=\`
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
\`;function ki({error:t,emailValue:a}){const{toggleTheme:r}=Ne(),n=ie("auth");return e.jsxs("div",{className:"login-wrapper",style:{position:"relative"},children:[e.jsx("style",{children:Ni}),e.jsx("div",{className:"login-theme-toggle",children:e.jsxs("button",{className:"btn-theme-toggle",onClick:r,title:n.nav.toggleTheme,style:{width:36,height:36,fontSize:"1rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}),e.jsxs("div",{className:"login-card",children:[e.jsx("div",{className:"login-brand",children:e.jsxs("a",{href:"/",className:"text-decoration-none",children:[e.jsx("div",{className:"brand-icon",children:e.jsx("i",{className:"bi bi-shield-lock"})}),e.jsx("h4",{children:n.headings.login}),e.jsx("p",{children:n.headings.loginSubtitle})]})}),t&&e.jsxs(st,{variant:"danger",className:"d-flex align-items-center gap-2",style:{borderRadius:8,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-exclamation-triangle"}),t]}),e.jsxs("form",{method:"post",action:"/login",className:"login-form",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:n.form.email}),e.jsx(R.Control,{type:"email",id:"email",name:"email",placeholder:"vas@email.cz",defaultValue:a||"",required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"password",children:n.form.password}),e.jsx(R.Control,{type:"password",id:"password",name:"password",placeholder:"Vaše heslo",required:!0})]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf w-100",style:{padding:"0.65rem",fontSize:"0.95rem"},children:[e.jsx("i",{className:"bi bi-box-arrow-in-right me-2"}),n.actions.login]})]}),e.jsx("div",{className:"login-divider",children:n.links.or}),e.jsxs("div",{className:"login-link",children:[n.links.noAccount," ",e.jsx("a",{href:"/register",children:n.links.registerLink})]})]})]})}const wi=\`
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
\`;function Ci(t){if(!t)return 0;let a=0;return t.length>=6&&a++,t.length>=10&&a++,/[A-Z]/.test(t)&&/[a-z]/.test(t)&&a++,(/[0-9]/.test(t)||/[^A-Za-z0-9]/.test(t))&&a++,a}function Ei({error:t,values:a={}}){const{toggleTheme:r}=Ne(),n=ie("auth"),[s,i]=p.useState(""),l=Ci(s);return e.jsxs("div",{className:"register-wrapper",style:{position:"relative"},children:[e.jsx("style",{children:wi}),e.jsx("div",{className:"register-theme-toggle",children:e.jsxs("button",{className:"btn-theme-toggle",onClick:r,title:n.nav.toggleTheme,style:{width:36,height:36,fontSize:"1rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}),e.jsxs("div",{className:"register-card",children:[e.jsx("div",{className:"register-brand",children:e.jsxs("a",{href:"/",className:"text-decoration-none",children:[e.jsx("div",{className:"brand-icon",children:e.jsx("i",{className:"bi bi-person-plus"})}),e.jsx("h4",{children:n.headings.register}),e.jsx("p",{children:n.headings.registerSubtitle})]})}),t&&e.jsxs(st,{variant:"danger",className:"d-flex align-items-center gap-2",style:{borderRadius:8,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-exclamation-triangle"}),t]}),e.jsxs("form",{method:"post",action:"/register",className:"register-form",children:[e.jsxs(se,{className:"g-3 mb-3",children:[e.jsxs(S,{xs:6,children:[e.jsx("label",{className:"form-label",htmlFor:"firstName",children:n.form.firstName}),e.jsx(R.Control,{type:"text",id:"firstName",name:"firstName",placeholder:"Jan",defaultValue:a.firstName||"",required:!0,autoFocus:!0})]}),e.jsxs(S,{xs:6,children:[e.jsx("label",{className:"form-label",htmlFor:"lastName",children:n.form.lastName}),e.jsx(R.Control,{type:"text",id:"lastName",name:"lastName",placeholder:"Novák",defaultValue:a.lastName||"",required:!0})]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:n.form.email}),e.jsx(R.Control,{type:"email",id:"email",name:"email",placeholder:"vas@email.cz",defaultValue:a.email||"",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"password",children:n.form.password}),e.jsx(R.Control,{type:"password",id:"password",name:"password",placeholder:"Min. 6 znaků",required:!0,onChange:o=>i(o.target.value)}),e.jsx("div",{className:"password-strength",children:[1,2,3,4].map(o=>e.jsx("div",{className:\`bar\${l>=o?\` active-\${o}\`:""}\`},o))})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"passwordConfirm",children:n.form.confirmPassword}),e.jsx(R.Control,{type:"password",id:"passwordConfirm",name:"passwordConfirm",placeholder:"Zopakujte heslo",required:!0})]}),e.jsxs("div",{className:"mb-3 form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"terms",name:"terms",required:!0}),e.jsxs("label",{className:"form-check-label",htmlFor:"terms",children:["Souhlasím s ",e.jsx("a",{href:"/terms",children:n.links.terms})," a ",e.jsx("a",{href:"/privacy",children:n.links.privacy})]})]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf w-100",style:{padding:"0.65rem",fontSize:"0.95rem"},children:[e.jsx("i",{className:"bi bi-person-plus me-2"}),n.actions.register]})]}),e.jsx("div",{className:"register-divider",children:n.links.or}),e.jsxs("div",{className:"register-link",children:[n.links.hasAccount," ",e.jsx("a",{href:"/login",children:n.links.loginLink})]})]})]})}const Si=\`
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
\`;function Ti({products:t,categories:a}){const{toggleTheme:r}=Ne(),n=ie("shop");return e.jsxs("div",{className:"eshop-page",children:[e.jsx("style",{children:Si}),e.jsx("nav",{className:"shop-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:n.nav.home}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",style:{color:"var(--tf-text)"},children:n.nav.eshop}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:r,title:n.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"cart-badge-link text-decoration-none",children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("section",{className:"eshop-hero",children:e.jsxs(z,{children:[e.jsxs("span",{className:"eshop-badge",children:[e.jsx("i",{className:"bi bi-stars me-1"}),n.hero.badge]}),e.jsxs("h1",{children:[n.hero.titleLine1,e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:n.hero.titleLine2})]}),e.jsx("p",{children:n.hero.subtitle}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"#products",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),n.hero.shopNow]}),e.jsxs("a",{href:"#categories",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-grid me-2"}),n.hero.categories]})]})]})}),e.jsx("div",{className:"features-bar",children:e.jsx(z,{children:e.jsxs(se,{className:"g-3",children:[e.jsx(S,{xs:6,lg:3,children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-truck"}),e.jsx("span",{children:n.features.freeShipping})]})}),e.jsx(S,{xs:6,lg:3,children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:n.features.warranty})]})}),e.jsx(S,{xs:6,lg:3,children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-arrow-return-left"}),e.jsx("span",{children:n.features.returnPolicy})]})}),e.jsx(S,{xs:6,lg:3,children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-headset"}),e.jsx("span",{children:n.features.support})]})})]})})}),a.length>0&&e.jsxs(z,{as:"section",className:"mb-5",id:"categories",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-between mb-4",children:e.jsx("h3",{className:"fw-bold mb-0",children:n.sections.categories})}),e.jsx(se,{className:"g-3",children:a.map(s=>e.jsx(S,{xs:6,md:4,lg:3,children:e.jsxs("a",{href:\`/category?slug=\${s.slug}\`,className:"category-card",children:[e.jsx("div",{className:"cat-icon",children:s.featuredImage?e.jsx("img",{src:s.featuredImage,alt:s.name}):e.jsx("i",{className:\`bi bi-\${s.icon||"grid"}\`})}),e.jsx("h6",{children:s.name}),e.jsxs("div",{className:"cat-count",children:[s.productCount," ",n.category.totalProducts]})]})},s.id))})]}),e.jsxs(z,{as:"section",className:"pb-5",id:"products",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-between mb-4",children:[e.jsx("h3",{className:"fw-bold mb-0",children:n.headings.allProducts}),e.jsxs("span",{className:"text-muted-tf",style:{fontSize:"0.9rem"},children:[t.length," ",n.category.totalProducts]})]}),t.length===0?e.jsxs("div",{className:"text-center py-5",children:[e.jsx("i",{className:"bi bi-bag-x",style:{fontSize:"3rem",color:"var(--tf-text-muted)"}}),e.jsx("p",{className:"text-muted-tf mt-3",children:n.empty.noProducts})]}):e.jsx(se,{className:"g-4",children:t.map(s=>e.jsx(S,{md:6,lg:3,children:e.jsxs("div",{className:"eshop-product-card",children:[e.jsx("a",{href:\`/product?slug=\${s.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"product-img",children:s.featuredImage?e.jsx("img",{src:s.featuredImage,alt:s.name}):e.jsx("i",{className:\`bi bi-\${s.icon||"box"}\`})})}),e.jsxs("div",{className:"product-body",children:[s.categoryName&&e.jsx("div",{className:"product-category-label",children:s.categoryName}),e.jsx("div",{className:"product-title",children:e.jsx("a",{href:\`/product?slug=\${s.slug}\`,children:s.name})}),e.jsxs("div",{className:"product-price-row",children:[e.jsx("span",{className:"price-current",children:Q(Number(s.price))}),s.oldPrice&&e.jsx("span",{className:"price-old",children:Q(Number(s.oldPrice))}),e.jsx("form",{method:"post",action:\`/cart/add?productId=\${s.id}&quantity=1\`,style:{display:"inline",marginLeft:"auto"},children:e.jsx("button",{type:"submit",className:"btn-add-cart",title:n.product.addToCart,children:e.jsx("i",{className:"bi bi-cart-plus"})})})]})]})]})},s.id))})]}),e.jsx("section",{className:"newsletter-section",children:e.jsx(z,{children:e.jsxs("div",{className:"newsletter-box",children:[e.jsx("i",{className:"bi bi-envelope",style:{fontSize:"2rem",color:"var(--tf-primary)",marginBottom:"0.75rem",display:"block"}}),e.jsx("h4",{children:n.newsletter.title}),e.jsx("p",{children:n.newsletter.subtitle}),e.jsxs("div",{className:"newsletter-input-group",children:[e.jsx("input",{type:"email",placeholder:n.newsletter.placeholder}),e.jsx("button",{className:"btn-primary-tf",children:n.newsletter.subscribe})]})]})})}),e.jsx("footer",{className:"eshop-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Pi=\`
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
\`;function zi({product:t,galleryImages:a=[]}){const{toggleTheme:r}=Ne(),n=ie("shop"),[s,i]=p.useState(1),[l,o]=p.useState(0),d=[];t.featuredImage&&d.push(t.featuredImage),a.forEach(b=>{b.url&&d.push(b.url)});const u=Number(t.price),m=t.oldPrice?Number(t.oldPrice):null,f=m&&m>u?Math.round((m-u)/m*100):null,g=Number(t.stock);return e.jsxs("div",{className:"product-page",children:[e.jsx("style",{children:Pi}),e.jsx("nav",{className:"product-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:n.nav.eshop}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:r,title:n.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem"},children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("div",{className:"product-breadcrumb",children:e.jsx(z,{children:e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/eshop",children:n.breadcrumb.eshop})}),t.categoryName&&e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:\`/category?slug=\${t.categorySlug||""}\`,children:t.categoryName})}),e.jsx("li",{className:"breadcrumb-item active",children:t.name})]})})})}),e.jsx(z,{as:"section",className:"pb-4",children:e.jsxs(se,{className:"g-4",children:[e.jsx(S,{lg:6,children:e.jsxs("div",{className:"product-gallery",children:[e.jsx("div",{className:"main-image",children:d.length>0?e.jsx("img",{src:d[l],alt:t.name}):e.jsx("i",{className:\`bi bi-\${t.icon||"box"} placeholder-icon\`})}),d.length>1&&e.jsx("div",{className:"thumbnails",children:d.map((b,P)=>e.jsx("div",{className:\`thumb\${P===l?" active":""}\`,onClick:()=>o(P),children:e.jsx("img",{src:b,alt:\`\${t.name} \${P+1}\`})},P))})]})}),e.jsx(S,{lg:6,children:e.jsxs("div",{className:"product-info",children:[t.categoryName&&e.jsx("div",{className:"category-label",children:e.jsx("a",{href:\`/category?slug=\${t.categorySlug||""}\`,children:t.categoryName})}),e.jsx("h1",{children:t.name}),e.jsxs("div",{className:"price-row",children:[e.jsx("span",{className:"price-current",children:Q(u)}),m&&e.jsx("span",{className:"price-old",children:Q(m)}),f&&e.jsxs("span",{className:"price-discount",children:["-",f,"%"]})]}),t.shortDescription&&e.jsx("p",{className:"short-desc",children:t.shortDescription}),e.jsxs("form",{method:"post",action:\`/cart/add?productId=\${t.id}&quantity=\${s}\`,children:[e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("div",{className:"qty-selector",children:[e.jsx("button",{type:"button",onClick:()=>i(Math.max(1,s-1)),children:e.jsx("i",{className:"bi bi-dash"})}),e.jsx("div",{className:"qty-value",children:s}),e.jsx("button",{type:"button",onClick:()=>i(s+1),children:e.jsx("i",{className:"bi bi-plus"})})]}),e.jsx("input",{type:"hidden",name:"quantity",value:s})]}),e.jsxs("div",{className:"product-actions",children:[e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem",flex:1},children:[e.jsx("i",{className:"bi bi-cart-plus me-2"}),n.product.addToCart]}),e.jsx("button",{type:"button",className:"btn-wishlist",title:"Přidat do oblíbených",children:e.jsx("i",{className:"bi bi-heart"})})]})]}),e.jsxs("div",{className:"product-meta",children:[e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-truck"}),e.jsx("span",{children:n.product.freeShipping})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-box-seam"}),e.jsx("span",{children:g>0?\`\${n.product.inStock} (\${t.stock} ks)\`:n.product.outOfStock})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:n.product.warranty})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-arrow-return-left"}),e.jsx("span",{children:n.product.returnPolicy})]})]})]})})]})}),t.description&&e.jsx("section",{className:"product-description",children:e.jsx(z,{children:e.jsxs("div",{className:"desc-card",children:[e.jsx("h3",{children:n.product.description}),e.jsx("div",{className:"desc-content",dangerouslySetInnerHTML:{__html:t.description}})]})})}),e.jsx("footer",{className:"product-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Oi=\`
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
\`;function Ai({title:t,category:a,products:r}){const{toggleTheme:n}=Ne(),s=ie("shop");return e.jsxs("div",{className:"category-page",children:[e.jsx("style",{children:Oi}),e.jsx("nav",{className:"cat-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:s.nav.eshop}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:s.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem"},children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("div",{className:"cat-breadcrumb",children:e.jsx(z,{children:e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/eshop",children:s.breadcrumb.eshop})}),e.jsx("li",{className:"breadcrumb-item active",children:(a==null?void 0:a.name)||t})]})})})}),e.jsx(z,{as:"section",children:e.jsx("div",{className:"cat-header",children:e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[((a==null?void 0:a.icon)||(a==null?void 0:a.featuredImage))&&e.jsx("div",{className:"cat-icon-lg",children:a!=null&&a.featuredImage?e.jsx("img",{src:a.featuredImage,alt:(a==null?void 0:a.name)||t}):e.jsx("i",{className:\`bi bi-\${(a==null?void 0:a.icon)||"grid"}\`})}),e.jsxs("div",{children:[e.jsx("h1",{children:(a==null?void 0:a.name)||t}),(a==null?void 0:a.description)&&e.jsx("p",{children:a.description})]})]})})}),e.jsx(z,{as:"section",children:e.jsx("div",{className:"cat-sort-bar",children:e.jsxs("span",{className:"product-count",children:[r.length," ",s.category.totalProducts]})})}),e.jsx(z,{as:"section",className:"pb-5",children:r.length===0?e.jsxs("div",{className:"cat-empty",children:[e.jsx("i",{className:"bi bi-inbox"}),e.jsx("p",{children:s.category.noProducts}),e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),s.category.backToEshop]})]}):e.jsx(se,{className:"g-4",children:r.map(i=>e.jsx(S,{md:6,lg:4,children:e.jsxs("div",{className:"cat-product-card",children:[e.jsx("a",{href:\`/product?slug=\${i.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"img-wrap",children:i.featuredImage?e.jsx("img",{src:i.featuredImage,alt:i.name}):e.jsx("i",{className:\`bi bi-\${i.icon||"box"}\`})})}),e.jsxs("div",{className:"card-body",children:[i.categoryName&&e.jsx("div",{className:"cat-label",children:i.categoryName}),e.jsx("h5",{children:e.jsx("a",{href:\`/product?slug=\${i.slug}\`,children:i.name})}),i.shortDescription&&e.jsx("p",{className:"desc",children:i.shortDescription}),e.jsxs("div",{className:"price-row",children:[e.jsx("span",{className:"price-current",children:Q(Number(i.price))}),i.oldPrice&&e.jsx("span",{className:"price-old",children:Q(Number(i.oldPrice))}),e.jsx("form",{method:"post",action:\`/cart/add?productId=\${i.id}&quantity=1\`,style:{display:"inline",marginLeft:"auto"},children:e.jsx("button",{type:"submit",className:"btn-add",title:s.product.addToCart,children:e.jsx("i",{className:"bi bi-cart-plus"})})})]})]})]})},i.id))})}),e.jsx("footer",{className:"cat-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const _i=\`
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
\`;function Ri({items:t}){const{toggleTheme:a}=Ne(),r=ie("cart"),n=t.reduce((i,l)=>i+Number(l.quantity),0),s=t.reduce((i,l)=>i+Number(l.productPrice)*Number(l.quantity),0);return e.jsxs("div",{className:"cart-page",children:[e.jsx("style",{children:_i}),e.jsx("nav",{className:"cart-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:r.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsxs("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem",position:"relative"},children:[e.jsx("i",{className:"bi bi-cart3"}),n>0&&e.jsx("span",{className:"cart-count-badge",children:n})]})]})]})}),e.jsx("div",{className:"cart-content",children:e.jsxs(z,{children:[e.jsxs("div",{className:"cart-header",children:[e.jsxs("h1",{children:[e.jsx("i",{className:"bi bi-cart3 me-3"}),r.headings.cart]}),e.jsxs("span",{className:"item-count",children:[n," položek"]})]}),t.length===0?e.jsxs("div",{className:"cart-empty",children:[e.jsx("i",{className:"bi bi-cart-x"}),e.jsx("h4",{children:"Váš košík je prázdný"}),e.jsx("p",{children:"Podívejte se na naše produkty a začněte nakupovat."}),e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),"Přejít na E-Shop"]})]}):e.jsxs(se,{className:"g-4",children:[e.jsx(S,{lg:8,children:t.map((i,l)=>{const o=Number(i.productPrice),d=Number(i.quantity),u=o*d;return e.jsxs("div",{className:"cart-item",children:[e.jsx("div",{className:"item-img",children:i.productFeaturedImage?e.jsx("img",{src:i.productFeaturedImage,alt:i.productName}):e.jsx("i",{className:\`bi bi-\${i.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-details",children:[i.categoryName&&e.jsx("div",{className:"category-sm",children:i.categoryName}),e.jsx("h6",{children:i.productName}),e.jsxs("div",{className:"unit-price",children:[Q(o)," / ks"]})]}),e.jsxs("div",{className:"item-qty",children:[e.jsx("form",{method:"post",action:\`/cart/update?productId=\${i.productId}&quantity=\${Math.max(1,d-1)}\`,style:{display:"inline"},children:e.jsx("button",{type:"submit",children:e.jsx("i",{className:"bi bi-dash"})})}),e.jsx("div",{className:"qty-val",children:d}),e.jsx("form",{method:"post",action:\`/cart/update?productId=\${i.productId}&quantity=\${d+1}\`,style:{display:"inline"},children:e.jsx("button",{type:"submit",children:e.jsx("i",{className:"bi bi-plus"})})})]}),e.jsx("div",{className:"item-total",children:Q(u)}),e.jsx("a",{href:\`/cart/remove?productId=\${i.productId}\`,className:"item-remove",title:"Odebrat",children:e.jsx("i",{className:"bi bi-trash3"})})]},l)})}),e.jsx(S,{lg:4,children:e.jsxs("div",{className:"cart-summary",children:[e.jsx("h5",{children:r.headings.orderSummary}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"label",children:r.summary.subtotal}),e.jsx("span",{children:Q(s)})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"label",children:r.summary.shipping}),e.jsx("span",{style:{color:"#22c55e"},children:r.summary.free})]}),e.jsxs("div",{className:"summary-total",children:[e.jsx("span",{children:r.summary.total}),e.jsx("span",{children:Q(s)})]}),e.jsxs("div",{className:"summary-actions",children:[e.jsxs("a",{href:"/checkout",className:"btn-primary-tf w-100 text-center",style:{padding:"0.7rem"},children:[e.jsx("i",{className:"bi bi-lock me-2"}),r.actions.checkout]}),e.jsxs("a",{href:"/eshop",className:"continue-link",children:[e.jsx("i",{className:"bi bi-arrow-left me-1"}),r.actions.continueShopping]})]})]})})]})]})}),e.jsx("footer",{className:"cart-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Ii=\`
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
\`;function Fi({items:t}){var u;const{toggleTheme:a}=Ne(),r=ie("cart"),[n,s]=p.useState("standard"),i=[{id:"standard",name:r.checkout.shipping.standardDelivery,desc:r.checkout.shipping.standardDeliveryDesc,price:0},{id:"express",name:r.checkout.shipping.expressDelivery,desc:r.checkout.shipping.expressDeliveryDesc,price:99},{id:"pickup",name:r.checkout.shipping.personalPickup,desc:r.checkout.shipping.personalPickupDesc,price:0}],l=t.reduce((m,f)=>m+Number(f.productPrice)*Number(f.quantity),0),o=((u=i.find(m=>m.id===n))==null?void 0:u.price)||0,d=l+o;return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:Ii}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),r.checkout.secureCheckout]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:r.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx(z,{children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"1"}),e.jsx("span",{children:r.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"2"}),e.jsx("span",{children:r.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:r.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:r.checkout.steps.done})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx(z,{children:e.jsxs(se,{className:"g-4",children:[e.jsx(S,{lg:8,children:e.jsxs("form",{method:"post",action:"/checkout/payment",children:[e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-person"}),r.checkout.shipping.contactInfo]}),e.jsxs(se,{className:"g-3",children:[e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"firstName",children:r.checkout.shipping.firstName}),e.jsx(R.Control,{type:"text",id:"firstName",name:"firstName",placeholder:"Jan",required:!0})]}),e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"lastName",children:r.checkout.shipping.lastName}),e.jsx(R.Control,{type:"text",id:"lastName",name:"lastName",placeholder:"Novák",required:!0})]}),e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:r.checkout.shipping.email}),e.jsx(R.Control,{type:"email",id:"email",name:"email",placeholder:"vas@email.cz",required:!0})]}),e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"phone",children:r.checkout.shipping.phone}),e.jsx(R.Control,{type:"tel",id:"phone",name:"phone",placeholder:"+420 123 456 789"})]})]})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-geo-alt"}),r.checkout.shipping.deliveryAddress]}),e.jsxs(se,{className:"g-3",children:[e.jsxs(S,{xs:12,children:[e.jsx("label",{className:"form-label",htmlFor:"street",children:r.checkout.shipping.street}),e.jsx(R.Control,{type:"text",id:"street",name:"street",placeholder:"Hlavní 123",required:!0})]}),e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"city",children:r.checkout.shipping.city}),e.jsx(R.Control,{type:"text",id:"city",name:"city",placeholder:"Praha",required:!0})]}),e.jsxs(S,{md:3,children:[e.jsx("label",{className:"form-label",htmlFor:"zip",children:r.checkout.shipping.zip}),e.jsx(R.Control,{type:"text",id:"zip",name:"zip",placeholder:"110 00",required:!0})]}),e.jsxs(S,{md:3,children:[e.jsx("label",{className:"form-label",htmlFor:"country",children:r.checkout.shipping.country}),e.jsxs("select",{className:"form-select",id:"country",name:"country",children:[e.jsx("option",{value:"CZ",children:r.checkout.shipping.countryCZ}),e.jsx("option",{value:"SK",children:r.checkout.shipping.countrySK}),e.jsx("option",{value:"DE",children:"Německo"}),e.jsx("option",{value:"AT",children:"Rakousko"}),e.jsx("option",{value:"PL",children:"Polsko"})]})]})]})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-truck"}),r.checkout.shipping.deliveryMethod]}),i.map(m=>e.jsxs("div",{className:\`shipping-option\${n===m.id?" selected":""}\`,onClick:()=>s(m.id),children:[e.jsx("div",{className:"option-radio"}),e.jsxs("div",{className:"option-info",children:[e.jsx("div",{className:"name",children:m.name}),e.jsx("div",{className:"desc",children:m.desc})]}),e.jsx("div",{className:"option-price",children:m.price===0?e.jsx("span",{style:{color:"#22c55e"},children:r.summary.free}):Q(m.price)})]},m.id)),e.jsx("input",{type:"hidden",name:"shippingMethod",value:n})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/cart",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),r.actions.backToCart]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[r.actions.continueToPayment,e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})}),e.jsx(S,{lg:4,children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:r.headings.yourOrder}),t.map((m,f)=>e.jsxs("div",{className:"summary-item",children:[e.jsx("div",{className:"item-thumb",children:m.productFeaturedImage?e.jsx("img",{src:m.productFeaturedImage,alt:m.productName}):e.jsx("i",{className:\`bi bi-\${m.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:m.productName}),e.jsxs("div",{className:"qty",children:[m.quantity,"x"]})]}),e.jsx("div",{className:"item-price",children:Q(Number(m.productPrice)*Number(m.quantity))})]},f)),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:r.summary.subtotal}),e.jsx("span",{children:Q(l)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:r.summary.shipping}),e.jsx("span",{children:o===0?r.summary.free:Q(o)})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:r.summary.total}),e.jsx("span",{children:Q(d)})]})]})]})})]})})})]})}const Di=\`
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
\`;function \$i({items:t}){const{toggleTheme:a}=Ne(),r=ie("cart"),[n,s]=p.useState("card"),[i,l]=p.useState(!0),o=[{id:"card",name:r.checkout.payment.card,desc:r.checkout.payment.cardDesc,icon:"credit-card"},{id:"bank",name:r.checkout.payment.bankTransfer,desc:r.checkout.payment.bankTransferDesc,icon:"bank"},{id:"cod",name:r.checkout.payment.cod,desc:r.checkout.payment.codDesc,icon:"cash-coin"},{id:"paypal",name:r.checkout.payment.paypal,desc:r.checkout.payment.paypalDesc,icon:"paypal"}],d=t.reduce((u,m)=>u+Number(m.productPrice)*Number(m.quantity),0);return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:Di}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),r.checkout.secureCheckout]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:r.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx(z,{children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:r.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"2"}),e.jsx("span",{children:r.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:r.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:r.checkout.steps.done})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx(z,{children:e.jsxs(se,{className:"g-4",children:[e.jsx(S,{lg:8,children:e.jsxs("form",{method:"post",action:"/checkout/review",children:[e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-credit-card"}),r.checkout.payment.selectMethod]}),o.map(u=>e.jsxs("div",{className:\`payment-option\${n===u.id?" selected":""}\`,onClick:()=>s(u.id),children:[e.jsx("div",{className:"option-radio"}),e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:\`bi bi-\${u.icon}\`})}),e.jsxs("div",{className:"option-info",children:[e.jsx("div",{className:"name",children:u.name}),e.jsx("div",{className:"desc",children:u.desc})]})]},u.id)),e.jsx("input",{type:"hidden",name:"paymentMethod",value:n}),n==="card"&&e.jsx("div",{className:"card-form",children:e.jsxs(se,{className:"g-3",children:[e.jsxs(S,{xs:12,children:[e.jsx("label",{className:"form-label",htmlFor:"cardNumber",children:r.checkout.payment.cardNumber}),e.jsx(R.Control,{type:"text",id:"cardNumber",name:"cardNumber",placeholder:"1234 5678 9012 3456"})]}),e.jsxs(S,{md:4,children:[e.jsx("label",{className:"form-label",htmlFor:"cardExpiry",children:r.checkout.payment.cardExpiry}),e.jsx(R.Control,{type:"text",id:"cardExpiry",name:"cardExpiry",placeholder:"MM/RR"})]}),e.jsxs(S,{md:4,children:[e.jsx("label",{className:"form-label",htmlFor:"cardCvv",children:r.checkout.payment.cardCvv}),e.jsx(R.Control,{type:"text",id:"cardCvv",name:"cardCvv",placeholder:"123"})]}),e.jsxs(S,{md:4,children:[e.jsx("label",{className:"form-label",htmlFor:"cardName",children:r.checkout.payment.cardName}),e.jsx(R.Control,{type:"text",id:"cardName",name:"cardName",placeholder:"Jan Novák"})]})]})})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-receipt"}),r.checkout.payment.billingInfo]}),e.jsxs("div",{className:"billing-toggle",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"sameAsBilling",checked:i,onChange:u=>l(u.target.checked)}),e.jsx("label",{className:"form-check-label",htmlFor:"sameAsBilling",style:{color:"var(--tf-text)",fontSize:"0.9rem"},children:r.checkout.payment.sameAsShipping})]}),!i&&e.jsxs(se,{className:"g-3 mt-1",children:[e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"company",children:r.checkout.payment.companyName}),e.jsx(R.Control,{type:"text",id:"company",name:"company",placeholder:"Název firmy"})]}),e.jsxs(S,{md:3,children:[e.jsx("label",{className:"form-label",htmlFor:"ico",children:r.checkout.payment.ico}),e.jsx(R.Control,{type:"text",id:"ico",name:"ico",placeholder:"12345678"})]}),e.jsxs(S,{md:3,children:[e.jsx("label",{className:"form-label",htmlFor:"dic",children:r.checkout.payment.dic}),e.jsx(R.Control,{type:"text",id:"dic",name:"dic",placeholder:"CZ12345678"})]}),e.jsxs(S,{xs:12,children:[e.jsx("label",{className:"form-label",htmlFor:"billingStreet",children:"Ulice a číslo popisné"}),e.jsx(R.Control,{type:"text",id:"billingStreet",name:"billingStreet",placeholder:"Hlavní 123"})]}),e.jsxs(S,{md:6,children:[e.jsx("label",{className:"form-label",htmlFor:"billingCity",children:"Město"}),e.jsx(R.Control,{type:"text",id:"billingCity",name:"billingCity",placeholder:"Praha"})]}),e.jsxs(S,{md:3,children:[e.jsx("label",{className:"form-label",htmlFor:"billingZip",children:"PSČ"}),e.jsx(R.Control,{type:"text",id:"billingZip",name:"billingZip",placeholder:"110 00"})]}),e.jsxs(S,{md:3,children:[e.jsx("label",{className:"form-label",htmlFor:"billingCountry",children:"Stát"}),e.jsxs("select",{className:"form-select",id:"billingCountry",name:"billingCountry",children:[e.jsx("option",{value:"CZ",children:"Česká republika"}),e.jsx("option",{value:"SK",children:"Slovensko"}),e.jsx("option",{value:"DE",children:"Německo"}),e.jsx("option",{value:"AT",children:"Rakousko"}),e.jsx("option",{value:"PL",children:"Polsko"})]})]})]})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/checkout",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),r.actions.backToShipping]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[r.actions.reviewOrder,e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})}),e.jsx(S,{lg:4,children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:r.headings.yourOrder}),t.map((u,m)=>e.jsxs("div",{className:"summary-item",children:[e.jsx("div",{className:"item-thumb",children:u.productFeaturedImage?e.jsx("img",{src:u.productFeaturedImage,alt:u.productName}):e.jsx("i",{className:\`bi bi-\${u.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:u.productName}),e.jsxs("div",{className:"qty",children:[u.quantity,"x"]})]}),e.jsx("div",{className:"item-price",children:Q(Number(u.productPrice)*Number(u.quantity))})]},m)),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:r.summary.subtotal}),e.jsx("span",{children:Q(d)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:r.summary.shipping}),e.jsx("span",{style:{color:"#22c55e"},children:r.summary.free})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:r.summary.total}),e.jsx("span",{children:Q(d)})]})]})]})})]})})})]})}const Mi=\`
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
\`;function Li({items:t}){const{toggleTheme:a}=Ne(),r=ie("cart"),n=t.reduce((s,i)=>s+Number(i.productPrice)*Number(i.quantity),0);return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:Mi}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),r.checkout.secureCheckout]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:r.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx(z,{children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:r.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:r.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:r.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:r.checkout.steps.done})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx(z,{children:e.jsxs(se,{className:"g-4",children:[e.jsxs(S,{lg:8,children:[e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-bag"}),r.checkout.review.orderItems]}),e.jsxs("a",{href:"/cart",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),r.checkout.review.edit]})]}),t.map((s,i)=>e.jsxs("div",{className:"review-item",children:[e.jsx("div",{className:"item-thumb",children:s.productFeaturedImage?e.jsx("img",{src:s.productFeaturedImage,alt:s.productName}):e.jsx("i",{className:\`bi bi-\${s.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:s.productName}),e.jsxs("div",{className:"qty",children:[s.quantity,"x ",Q(Number(s.productPrice))]})]}),e.jsx("div",{className:"item-price",children:Q(Number(s.productPrice)*Number(s.quantity))})]},i))]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-person"}),r.checkout.review.contactInfo]}),e.jsxs("a",{href:"/checkout",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),r.checkout.review.edit]})]}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Jméno"}),e.jsx("div",{className:"value",children:"Jan Novák"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"E-mail"}),e.jsx("div",{className:"value",children:"jan@email.cz"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Telefon"}),e.jsx("div",{className:"value",children:"+420 123 456 789"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Adresa"}),e.jsx("div",{className:"value",children:"Hlavní 123, Praha 110 00"})]})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-truck"}),r.checkout.review.deliveryMethod]}),e.jsxs("a",{href:"/checkout",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),r.checkout.review.edit]})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-truck",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"Standardní doprava (3-5 pracovních dní)"}),e.jsx("span",{className:"ms-auto fw-bold",style:{color:"#22c55e"},children:r.summary.free})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-credit-card"}),r.checkout.review.paymentMethod]}),e.jsxs("a",{href:"/checkout/payment",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),r.checkout.review.edit]})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-credit-card",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"Platební karta (**** 3456)"})]})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/checkout/payment",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),r.actions.backToPayment]}),e.jsx("form",{method:"post",action:"/checkout/confirm",style:{display:"inline"},children:e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[e.jsx("i",{className:"bi bi-check-circle me-2"}),r.actions.submitOrder]})})]}),e.jsxs("div",{className:"security-notice",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),"Vaše data jsou chráněna šifrováním SSL a zpracovávána bezpečně."]})]}),e.jsx(S,{lg:4,children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:r.headings.orderSummary}),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsxs("span",{className:"label",children:[r.summary.subtotal," (",t.length,")"]}),e.jsx("span",{children:Q(n)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:r.summary.shipping}),e.jsx("span",{style:{color:"#22c55e"},children:r.summary.free})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:r.summary.total}),e.jsx("span",{children:Q(n)})]})]})]})})]})})})]})}const qi=\`
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
\`;function Bi(){const{toggleTheme:t}=Ne(),a=ie("cart");return e.jsxs("div",{className:"confirmation-page",children:[e.jsx("style",{children:qi}),e.jsx("nav",{className:"confirmation-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:t,title:a.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx(z,{children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:a.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:a.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:a.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:a.checkout.steps.done})]})]})})}),e.jsx("div",{className:"confirmation-content",children:e.jsx(z,{children:e.jsxs("div",{className:"confirmation-card",children:[e.jsx("div",{className:"confirmation-icon",children:e.jsx("i",{className:"bi bi-check-circle-fill"})}),e.jsx("h2",{children:a.headings.thankYou}),e.jsx("p",{className:"subtitle",children:a.checkout.confirmation.subtitle}),e.jsxs("div",{className:"confirmation-actions",children:[e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),a.actions.continueShopping2]}),e.jsxs("a",{href:"/",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-house me-2"}),a.actions.goHome]})]})]})})}),e.jsx("footer",{className:"confirmation-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Vi=\`
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
\`;function Wi({posts:t}){const{toggleTheme:a}=Ne(),r=ie("blog");return e.jsxs("div",{className:"blog-list-page",children:[e.jsx("style",{children:Vi}),e.jsx("nav",{className:"blog-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:r.public.nav.home}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",style:{color:"var(--tf-text)"},children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:r.public.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("section",{className:"blog-header",children:e.jsxs(z,{children:[e.jsxs("span",{className:"hero-badge",children:[e.jsx("i",{className:"bi bi-newspaper me-1"}),"Blog"]}),e.jsxs("h1",{children:[r.public.newsAndArticles," ",e.jsx("span",{className:"text-gradient",children:r.public.articles})]}),e.jsx("p",{children:r.public.subtitle})]})}),e.jsx(z,{as:"section",children:t.length===0?e.jsxs("div",{className:"blog-empty",children:[e.jsx("i",{className:"bi bi-journal-x"}),e.jsx("p",{children:r.empty.noArticlesYet})]}):e.jsx("div",{className:"blog-grid",children:t.map(n=>e.jsxs("div",{className:"blog-card",children:[e.jsx("a",{href:\`/article?slug=\${n.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"card-img",children:n.featuredImage?e.jsx("img",{src:n.featuredImage,alt:n.title}):e.jsx("i",{className:"bi bi-file-earmark-text placeholder"})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"card-meta",children:[n.category&&e.jsx("span",{className:"category-badge",children:n.category}),e.jsx("span",{className:"date",children:Fe(n.createdAt)})]}),e.jsx("h5",{children:e.jsx("a",{href:\`/article?slug=\${n.slug}\`,children:n.title})}),n.excerpt&&e.jsx("p",{className:"excerpt",children:n.excerpt}),e.jsxs("div",{className:"card-footer-meta",children:[n.author?e.jsxs("span",{className:"author",children:[e.jsx("i",{className:"bi bi-person"}),n.author]}):e.jsx("span",{}),n.readTime?e.jsxs("span",{className:"read-time",children:[e.jsx("i",{className:"bi bi-clock"}),n.readTime]}):e.jsx("span",{})]})]})]},n.id))})}),e.jsx("footer",{className:"blog-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Ui=\`
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
\`;function Yi({title:t,content:a,category:r,date:n,author:s,readTime:i,featuredImageUrl:l}){const{toggleTheme:o}=Ne(),d=ie("blog");return e.jsxs("div",{className:"article-page",children:[e.jsx("style",{children:Ui}),e.jsx("nav",{className:"article-navbar",children:e.jsxs(z,{className:"d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:d.public.nav.home}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:o,title:d.public.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("header",{className:"article-header",children:e.jsxs(z,{children:[r&&e.jsx("span",{className:"category-badge",children:r}),e.jsx("h1",{children:e.jsx("span",{className:"text-gradient",children:t})}),e.jsxs("div",{className:"article-meta",children:[n&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-calendar3"}),Fe(n)]}),s&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-person"}),s]}),i&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-clock"}),i]})]})]})}),l&&e.jsx("div",{className:"article-featured-image",children:e.jsx("img",{src:l,alt:t})}),e.jsx(z,{as:"section",children:e.jsx("div",{className:"article-content-card",children:e.jsx("div",{className:"article-body",dangerouslySetInnerHTML:{__html:a}})})}),e.jsx(z,{className:"text-center mb-4",children:e.jsxs("a",{href:"/blog",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),d.actions.backToList]})}),e.jsx("footer",{className:"article-footer",children:e.jsx(z,{children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Zi={AdminDashboard:Nn,AdminAnalytics:kn,AdminProductList:Ws,AdminProductForm:ri,AdminCategoryList:ai,AdminCategoryForm:ni,AdminOrderList:si,AdminOrderDetail:ii,AdminOrderForm:oi,AdminBlogList:li,AdminBlogForm:ci,AdminMedia:mi,AdminCustomerList:hi,Landing:yi,Login:ki,Register:Ei,Eshop:Ti,Product:zi,Category:Ai,Cart:Ri,CheckoutShipping:Fi,CheckoutPayment:\$i,CheckoutReview:Li,CheckoutConfirmation:Bi,BlogList:Wi,Article:Yi};window.__REACT_RENDER__=(t,a,r)=>{const n=Zi[t];if(!n){console.error(\`[TypeForge React] Unknown component: "\${t}"\`);return}const s=document.getElementById(r);if(!s){console.error(\`[TypeForge React] Container not found: "#\${r}"\`);return}La.createRoot(s).render(e.jsx(Ua,{children:e.jsx(n,{...a})}))}})(React,ReactDOM,ReactDOM);
`;
export const REACT_BUNDLE_CSS = `.admin-wrapper{min-height:100vh;display:flex;max-width:100vw;overflow-x:hidden}.admin-sidebar{width:260px;flex-shrink:0;background:var(--tf-surface);border-right:1px solid var(--tf-border);position:fixed;top:0;left:0;height:100vh;padding:1.5rem;display:flex;flex-direction:column;z-index:1000}.admin-logo{display:flex;align-items:center;gap:.75rem;padding:.5rem 0 1.5rem;border-bottom:1px solid var(--tf-border);margin-bottom:1.5rem;text-decoration:none}.admin-logo i{font-size:1.5rem}.admin-logo span{font-weight:800;font-size:1.2rem}.admin-nav{flex:1;overflow-y:auto}.admin-nav-section{margin-bottom:1.5rem}.admin-nav-label{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--tf-text-muted);padding:0 .75rem;margin-bottom:.5rem}.admin-nav-item{display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:10px;color:var(--tf-text);text-decoration:none;transition:all .2s ease;margin-bottom:.25rem}.admin-nav-item:hover{background:#7c5cfc1a;color:var(--tf-primary-light)}.admin-nav-item.active{background:var(--tf-gradient);color:#fff}.admin-nav-item i{font-size:1.1rem;width:24px;text-align:center}.admin-nav-item span{font-weight:500;font-size:.95rem}.admin-nav-badge{margin-left:auto;padding:.2rem .5rem;border-radius:50px;font-size:.7rem;font-weight:700;background:var(--tf-accent);color:#0f0f17}.admin-user{padding-top:1rem;border-top:1px solid var(--tf-border);display:flex;align-items:center;gap:.75rem}.admin-user-avatar{width:40px;height:40px;border-radius:50%;background:var(--tf-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700}.admin-user-info{flex:1}.admin-user-name{font-weight:600;font-size:.9rem}.admin-user-role{font-size:.75rem;color:var(--tf-text-muted)}.admin-main{flex:1;min-width:0;margin-left:260px;padding:2rem;background:var(--tf-bg);overflow-x:hidden}.admin-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem}.admin-title{font-size:1.75rem;font-weight:800}.admin-header-actions{display:flex;align-items:center;gap:1rem}.admin-search{position:relative}.admin-search input{width:280px;padding:.6rem 1rem .6rem 2.5rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:10px;color:var(--tf-text);font-size:.9rem}.admin-search input:focus{border-color:var(--tf-primary);outline:none}.admin-search i{position:absolute;left:.85rem;top:50%;transform:translateY(-50%);color:var(--tf-text-muted)}.card-section{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:1.5rem;margin-bottom:1.5rem}.card-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.card-section-title{font-size:1.1rem;font-weight:700}.data-table{width:100%}.data-table th{text-align:left;padding:.75rem 1rem;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--tf-text-muted);border-bottom:1px solid var(--tf-border)}.data-table td{padding:1rem;font-size:.9rem;border-bottom:1px solid var(--tf-border);vertical-align:middle}.data-table tr:last-child td{border-bottom:none}.data-table tr:hover td{background:#7c5cfc08}.status-badge{display:inline-flex;padding:.3rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.status-badge.success{background:#06d6a026;color:var(--tf-accent)}.status-badge.warning{background:#fbbf2426;color:#fbbf24}.status-badge.info{background:#3b82f626;color:#60a5fa}.status-badge.danger{background:#ef444426;color:#ef4444}.btn-action{width:32px;height:32px;border-radius:8px;border:1px solid var(--tf-border);background:transparent;color:var(--tf-text-muted);cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center;margin-right:.25rem}.btn-action:hover{border-color:var(--tf-primary);color:var(--tf-primary);background:#7c5cfc1a}.btn-action.danger:hover{border-color:#ef4444;color:#ef4444;background:#ef44441a}.btn-add{padding:.6rem 1.25rem;border-radius:10px;font-weight:600;font-size:.9rem;background:var(--tf-gradient);color:#fff;border:none;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;gap:.5rem}.btn-add:hover{transform:translateY(-2px);box-shadow:0 4px 15px #7c5cfc4d}.stat-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:1.5rem;transition:all .3s ease}.stat-card:hover{border-color:#7c5cfc4d;transform:translateY(-2px)}.stat-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem}.stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem}.stat-icon.purple{background:#7c5cfc26;color:var(--tf-primary-light)}.stat-icon.green{background:#06d6a026;color:var(--tf-accent)}.stat-icon.blue{background:#3b82f626;color:#60a5fa}.stat-icon.orange{background:#fb923c26;color:#fb923c}.stat-value{font-size:2rem;font-weight:800;margin-bottom:.25rem}.stat-label{font-size:.9rem;color:var(--tf-text-muted)}.stat-change{font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:.25rem}.stat-change.up{color:var(--tf-accent)}.stat-change.down{color:#ef4444}.avatar{width:36px;height:36px;border-radius:50%;background:var(--tf-gradient-subtle);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:600;color:var(--tf-primary-light)}.order-customer{display:flex;align-items:center;gap:.75rem}.order-avatar{width:36px;height:36px;border-radius:50%;background:var(--tf-gradient);display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:600;color:#fff;flex-shrink:0}.order-id{font-weight:600;color:var(--tf-primary-light)}.order-status{display:inline-flex;padding:.3rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.order-status.completed{background:#06d6a026;color:var(--tf-accent)}.order-status.processing{background:#3b82f626;color:#60a5fa}.order-status.pending{background:#fbbf2426;color:#fbbf24}.order-status.cancelled{background:#ef444426;color:#ef4444}.filter-bar{display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.filter-select{padding:.5rem 1rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:8px;color:var(--tf-text);font-size:.9rem}.filter-select:focus{border-color:var(--tf-primary);outline:none}.pagination{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}.page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--tf-border);background:var(--tf-surface);color:var(--tf-text);font-weight:600;font-size:.9rem;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center}.page-btn:hover,.page-btn.active{border-color:var(--tf-primary);background:var(--tf-primary);color:#fff}.form-group{margin-bottom:1.25rem}.form-label{display:block;font-weight:600;font-size:.9rem;margin-bottom:.5rem;color:var(--tf-text)}.form-control{width:100%;padding:.75rem 1rem;background:var(--tf-bg);border:1px solid var(--tf-border);border-radius:10px;color:var(--tf-text);font-size:.95rem}.form-control:focus{border-color:var(--tf-primary);outline:none;box-shadow:0 0 0 3px #7c5cfc26}.form-switch{display:flex;align-items:center;gap:.75rem}.toggle-switch{width:48px;height:26px;background:var(--tf-border);border-radius:13px;position:relative;cursor:pointer;transition:background .2s ease}.toggle-switch.active{background:var(--tf-accent)}.toggle-switch:after{content:"";position:absolute;width:20px;height:20px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s ease}.toggle-switch.active:after{transform:translate(22px)}.media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem}.media-item{aspect-ratio:1;background:var(--tf-bg);border:1px solid var(--tf-border);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.media-item:hover{border-color:var(--tf-primary);transform:scale(1.02)}.media-item i{font-size:2.5rem;color:var(--tf-text-muted)}.chart-placeholder{height:300px;background:var(--tf-bg);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px dashed var(--tf-border)}.chart-placeholder i{font-size:3rem;color:var(--tf-text-muted)}.mobile-menu-btn{display:none;width:44px;height:44px;border-radius:10px;border:1px solid var(--tf-border);background:var(--tf-surface);color:var(--tf-text);font-size:1.25rem;cursor:pointer;align-items:center;justify-content:center}.sidebar-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#00000080;z-index:999}.sidebar-close{display:none;position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:8px;border:none;background:var(--tf-bg);color:var(--tf-text);font-size:1.25rem;cursor:pointer;align-items:center;justify-content:center}@media(max-width:992px){.mobile-menu-btn,.sidebar-close{display:flex}.admin-sidebar{transform:translate(-100%);transition:transform .3s ease}.admin-sidebar.open{transform:translate(0)}.sidebar-overlay.open{display:block}.admin-main{margin-left:0;padding:1rem}.admin-header{flex-direction:column;align-items:flex-start;gap:1rem}.admin-header>div:first-child{display:flex;align-items:center;gap:1rem;width:100%}.admin-title{font-size:1.35rem}.admin-header-actions{width:100%}.admin-search{flex:1}.admin-search input{width:100%}.stat-value{font-size:1.5rem}.data-table{display:block;overflow-x:auto}.filter-bar{flex-direction:column}.filter-select{width:100%}.card-section{padding:1rem}.card-section-header{flex-direction:column;align-items:flex-start;gap:.75rem}}@media(max-width:576px){.admin-main{padding:.75rem}.stat-card{padding:1rem}.stat-icon{width:40px;height:40px;font-size:1rem}.stat-value{font-size:1.25rem}.btn-add{width:100%;justify-content:center}.media-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}}.footer-tf{background:var(--tf-surface);border-top:1px solid var(--tf-border);padding:4rem 0 2rem;margin-top:auto}.footer-brand{display:flex;align-items:center;gap:.75rem;font-size:1.5rem;font-weight:800;margin-bottom:1rem}.footer-brand i{font-size:1.75rem}.footer-desc{color:var(--tf-text-muted);font-size:.95rem;line-height:1.7;margin-bottom:1.5rem;max-width:300px}.footer-social{display:flex;gap:.75rem}.footer-social-link{width:40px;height:40px;border-radius:10px;background:var(--tf-bg);border:1px solid var(--tf-border);display:flex;align-items:center;justify-content:center;color:var(--tf-text-muted);transition:all .2s ease}.footer-social-link:hover{border-color:var(--tf-primary);color:var(--tf-primary);transform:translateY(-2px)}.footer-title{font-weight:700;font-size:.9rem;margin-bottom:1.25rem;color:var(--tf-text)}.footer-links{list-style:none;padding:0;margin:0}.footer-links li{margin-bottom:.75rem}.footer-links a{color:var(--tf-text-muted);text-decoration:none;font-size:.9rem;transition:color .2s ease}.footer-links a:hover{color:var(--tf-primary-light)}.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;margin-top:3rem;border-top:1px solid var(--tf-border)}.footer-copyright{color:var(--tf-text-muted);font-size:.85rem}.footer-bottom-links{display:flex;gap:1.5rem}.footer-bottom-links a{color:var(--tf-text-muted);text-decoration:none;font-size:.85rem;transition:color .2s ease}.footer-bottom-links a:hover{color:var(--tf-primary-light)}@media(max-width:768px){.footer-bottom{flex-direction:column;gap:1rem;text-align:center}}.page-wrapper{min-height:100vh}.pt-navbar{padding-top:6rem}.pb-section{padding-bottom:4rem}.product-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;overflow:hidden;transition:all .3s ease}.product-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px);box-shadow:0 8px 30px #00000026}.product-image{aspect-ratio:4/3;background:var(--tf-bg);display:flex;align-items:center;justify-content:center;position:relative}.product-badge{position:absolute;top:.75rem;right:.75rem;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600;background:var(--tf-gradient);color:#fff}.product-body{padding:1.25rem}.product-category{font-size:.8rem;color:var(--tf-primary-light);font-weight:600;margin-bottom:.5rem}.product-title{font-weight:700;font-size:1rem;margin-bottom:.5rem;color:var(--tf-text)}.product-desc{font-size:.85rem;color:var(--tf-text-muted);margin-bottom:1rem}.product-footer{display:flex;align-items:center;justify-content:space-between}.product-price{font-weight:800;font-size:1.1rem;color:var(--tf-text)}.product-price-old{text-decoration:line-through;color:var(--tf-text-muted);font-size:.85rem;margin-left:.5rem}.btn-cart{width:36px;height:36px;border-radius:10px;border:1px solid var(--tf-border);background:transparent;color:var(--tf-text-muted);cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.btn-cart:hover{border-color:var(--tf-primary);color:var(--tf-primary);background:#7c5cfc1a}.category-card{display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:1.5rem 1rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;transition:all .3s ease}.category-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px)}.category-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem}.category-title{font-weight:700;font-size:.9rem;margin:0;color:var(--tf-text);text-align:center}.category-count{font-size:.8rem;color:var(--tf-text-muted)}.category-list-item{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;text-decoration:none;color:var(--tf-text);border-radius:8px;transition:all .2s ease}.category-list-item:hover,.category-list-item.active{background:#7c5cfc1a;color:var(--tf-primary-light)}.category-list-count{font-size:.8rem;color:var(--tf-text-muted)}.hero-section{padding:6rem 0 4rem}.hero-title{font-size:3.5rem;font-weight:800;line-height:1.1;margin-bottom:1.5rem}.hero-subtitle{font-size:1.25rem;color:var(--tf-text-muted);max-width:600px;line-height:1.7}.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:50px;font-size:.85rem;font-weight:600;background:#7c5cfc26;color:var(--tf-primary-light);margin-bottom:1.5rem}.eshop-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:50px;font-size:.85rem;font-weight:600;background:#06d6a026;color:var(--tf-accent);margin-bottom:1.5rem}.section-label{display:inline-flex;align-items:center;gap:.5rem;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--tf-primary-light);margin-bottom:.75rem}.feature-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:2rem;transition:all .3s ease}.feature-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px)}.feature-icon{width:56px;height:56px;border-radius:14px;background:#7c5cfc26;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--tf-primary-light);margin-bottom:1.25rem}.step-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:2rem;text-align:center}.step-number{width:48px;height:48px;border-radius:50%;background:var(--tf-gradient);color:#fff;font-weight:800;font-size:1.25rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}.cta-section{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:24px;padding:4rem 2rem;margin:4rem 0}.navbar-tf{background:var(--tf-navbar-bg)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--tf-border);padding:1rem 0}.navbar-tf .navbar-brand{font-weight:800;font-size:1.25rem}.navbar-tf .nav-link{font-weight:500;color:var(--tf-text-muted)!important;transition:color .2s ease}.navbar-tf .nav-link:hover,.navbar-tf .nav-link.active{color:var(--tf-primary-light)!important}.alert-danger{background:#ef44441a;border:1px solid rgba(239,68,68,.3);color:#ef4444;border-radius:12px;padding:1rem 1.25rem}
`;
