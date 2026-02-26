// AUTO-GENERATED — do not edit manually.
// Run: npm run build:react-embed to regenerate.

export const REACT_BUNDLE_JS = `(function(I,mt){"use strict";var oe={exports:{}},te={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ze;function ut(){if(ze)return te;ze=1;var r=I,n=Symbol.for("react.element"),t=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function c(l,m,h){var u,k={},E=null,g=null;h!==void 0&&(E=""+h),m.key!==void 0&&(E=""+m.key),m.ref!==void 0&&(g=m.ref);for(u in m)a.call(m,u)&&!o.hasOwnProperty(u)&&(k[u]=m[u]);if(l&&l.defaultProps)for(u in m=l.defaultProps,m)k[u]===void 0&&(k[u]=m[u]);return{\$\$typeof:n,type:l,key:E,ref:g,props:k,_owner:i.current}}return te.Fragment=t,te.jsx=c,te.jsxs=c,te}var re={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Se;function pt(){return Se||(Se=1,process.env.NODE_ENV!=="production"&&(function(){var r=I,n=Symbol.for("react.element"),t=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),l=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),u=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen"),A=Symbol.iterator,j="@@iterator";function f(s){if(s===null||typeof s!="object")return null;var d=A&&s[A]||s[j];return typeof d=="function"?d:null}var x=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function b(s){{for(var d=arguments.length,p=new Array(d>1?d-1:0),v=1;v<d;v++)p[v-1]=arguments[v];\$("error",s,p)}}function \$(s,d,p){{var v=x.ReactDebugCurrentFrame,P=v.getStackAddendum();P!==""&&(d+="%s",p=p.concat([P]));var O=p.map(function(z){return String(z)});O.unshift("Warning: "+d),Function.prototype.apply.call(console[s],console,O)}}var J=!1,xe=!1,y=!1,_=!1,R=!1,T;T=Symbol.for("react.module.reference");function W(s){return!!(typeof s=="string"||typeof s=="function"||s===a||s===o||R||s===i||s===h||s===u||_||s===g||J||xe||y||typeof s=="object"&&s!==null&&(s.\$\$typeof===E||s.\$\$typeof===k||s.\$\$typeof===c||s.\$\$typeof===l||s.\$\$typeof===m||s.\$\$typeof===T||s.getModuleId!==void 0))}function Fr(s,d,p){var v=s.displayName;if(v)return v;var P=d.displayName||d.name||"";return P!==""?p+"("+P+")":p}function qe(s){return s.displayName||"Context"}function H(s){if(s==null)return null;if(typeof s.tag=="number"&&b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof s=="function")return s.displayName||s.name||null;if(typeof s=="string")return s;switch(s){case a:return"Fragment";case t:return"Portal";case o:return"Profiler";case i:return"StrictMode";case h:return"Suspense";case u:return"SuspenseList"}if(typeof s=="object")switch(s.\$\$typeof){case l:var d=s;return qe(d)+".Consumer";case c:var p=s;return qe(p._context)+".Provider";case m:return Fr(s,s.render,"ForwardRef");case k:var v=s.displayName||null;return v!==null?v:H(s.type)||"Memo";case E:{var P=s,O=P._payload,z=P._init;try{return H(z(O))}catch{return null}}}return null}var G=Object.assign,ie=0,Be,Ze,\$e,Ue,We,Ye,Ke;function Je(){}Je.__reactDisabledLog=!0;function Rr(){{if(ie===0){Be=console.log,Ze=console.info,\$e=console.warn,Ue=console.error,We=console.group,Ye=console.groupCollapsed,Ke=console.groupEnd;var s={configurable:!0,enumerable:!0,value:Je,writable:!0};Object.defineProperties(console,{info:s,log:s,warn:s,error:s,group:s,groupCollapsed:s,groupEnd:s})}ie++}}function Dr(){{if(ie--,ie===0){var s={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:G({},s,{value:Be}),info:G({},s,{value:Ze}),warn:G({},s,{value:\$e}),error:G({},s,{value:Ue}),group:G({},s,{value:We}),groupCollapsed:G({},s,{value:Ye}),groupEnd:G({},s,{value:Ke})})}ie<0&&b("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var be=x.ReactCurrentDispatcher,ge;function le(s,d,p){{if(ge===void 0)try{throw Error()}catch(P){var v=P.stack.trim().match(/\\n( *(at )?)/);ge=v&&v[1]||""}return\`
\`+ge+s}}var ve=!1,ce;{var Vr=typeof WeakMap=="function"?WeakMap:Map;ce=new Vr}function He(s,d){if(!s||ve)return"";{var p=ce.get(s);if(p!==void 0)return p}var v;ve=!0;var P=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var O;O=be.current,be.current=null,Rr();try{if(d){var z=function(){throw Error()};if(Object.defineProperty(z.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(z,[])}catch(B){v=B}Reflect.construct(s,[],z)}else{try{z.call()}catch(B){v=B}s.call(z.prototype)}}else{try{throw Error()}catch(B){v=B}s()}}catch(B){if(B&&v&&typeof B.stack=="string"){for(var N=B.stack.split(\`
\`),M=v.stack.split(\`
\`),D=N.length-1,L=M.length-1;D>=1&&L>=0&&N[D]!==M[L];)L--;for(;D>=1&&L>=0;D--,L--)if(N[D]!==M[L]){if(D!==1||L!==1)do if(D--,L--,L<0||N[D]!==M[L]){var U=\`
\`+N[D].replace(" at new "," at ");return s.displayName&&U.includes("<anonymous>")&&(U=U.replace("<anonymous>",s.displayName)),typeof s=="function"&&ce.set(s,U),U}while(D>=1&&L>=0);break}}}finally{ve=!1,be.current=O,Dr(),Error.prepareStackTrace=P}var ee=s?s.displayName||s.name:"",X=ee?le(ee):"";return typeof s=="function"&&ce.set(s,X),X}function Lr(s,d,p){return He(s,!1)}function Mr(s){var d=s.prototype;return!!(d&&d.isReactComponent)}function de(s,d,p){if(s==null)return"";if(typeof s=="function")return He(s,Mr(s));if(typeof s=="string")return le(s);switch(s){case h:return le("Suspense");case u:return le("SuspenseList")}if(typeof s=="object")switch(s.\$\$typeof){case m:return Lr(s.render);case k:return de(s.type,d,p);case E:{var v=s,P=v._payload,O=v._init;try{return de(O(P),d,p)}catch{}}}return""}var ne=Object.prototype.hasOwnProperty,Ge={},Xe=x.ReactDebugCurrentFrame;function me(s){if(s){var d=s._owner,p=de(s.type,s._source,d?d.type:null);Xe.setExtraStackFrame(p)}else Xe.setExtraStackFrame(null)}function qr(s,d,p,v,P){{var O=Function.call.bind(ne);for(var z in s)if(O(s,z)){var N=void 0;try{if(typeof s[z]!="function"){var M=Error((v||"React class")+": "+p+" type \`"+z+"\` is invalid; it must be a function, usually from the \`prop-types\` package, but received \`"+typeof s[z]+"\`.This often happens because of typos such as \`PropTypes.function\` instead of \`PropTypes.func\`.");throw M.name="Invariant Violation",M}N=s[z](d,z,v,p,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(D){N=D}N&&!(N instanceof Error)&&(me(P),b("%s: type specification of %s \`%s\` is invalid; the type checker function must return \`null\` or an \`Error\` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",v||"React class",p,z,typeof N),me(null)),N instanceof Error&&!(N.message in Ge)&&(Ge[N.message]=!0,me(P),b("Failed %s type: %s",p,N.message),me(null))}}}var Br=Array.isArray;function je(s){return Br(s)}function Zr(s){{var d=typeof Symbol=="function"&&Symbol.toStringTag,p=d&&s[Symbol.toStringTag]||s.constructor.name||"Object";return p}}function \$r(s){try{return Qe(s),!1}catch{return!0}}function Qe(s){return""+s}function et(s){if(\$r(s))return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Zr(s)),Qe(s)}var tt=x.ReactCurrentOwner,Ur={key:!0,ref:!0,__self:!0,__source:!0},rt,at;function Wr(s){if(ne.call(s,"ref")){var d=Object.getOwnPropertyDescriptor(s,"ref").get;if(d&&d.isReactWarning)return!1}return s.ref!==void 0}function Yr(s){if(ne.call(s,"key")){var d=Object.getOwnPropertyDescriptor(s,"key").get;if(d&&d.isReactWarning)return!1}return s.key!==void 0}function Kr(s,d){typeof s.ref=="string"&&tt.current}function Jr(s,d){{var p=function(){rt||(rt=!0,b("%s: \`key\` is not a prop. Trying to access it will result in \`undefined\` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",d))};p.isReactWarning=!0,Object.defineProperty(s,"key",{get:p,configurable:!0})}}function Hr(s,d){{var p=function(){at||(at=!0,b("%s: \`ref\` is not a prop. Trying to access it will result in \`undefined\` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",d))};p.isReactWarning=!0,Object.defineProperty(s,"ref",{get:p,configurable:!0})}}var Gr=function(s,d,p,v,P,O,z){var N={\$\$typeof:n,type:s,key:d,ref:p,props:z,_owner:O};return N._store={},Object.defineProperty(N._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(N,"_self",{configurable:!1,enumerable:!1,writable:!1,value:v}),Object.defineProperty(N,"_source",{configurable:!1,enumerable:!1,writable:!1,value:P}),Object.freeze&&(Object.freeze(N.props),Object.freeze(N)),N};function Xr(s,d,p,v,P){{var O,z={},N=null,M=null;p!==void 0&&(et(p),N=""+p),Yr(d)&&(et(d.key),N=""+d.key),Wr(d)&&(M=d.ref,Kr(d,P));for(O in d)ne.call(d,O)&&!Ur.hasOwnProperty(O)&&(z[O]=d[O]);if(s&&s.defaultProps){var D=s.defaultProps;for(O in D)z[O]===void 0&&(z[O]=D[O])}if(N||M){var L=typeof s=="function"?s.displayName||s.name||"Unknown":s;N&&Jr(z,L),M&&Hr(z,L)}return Gr(s,N,M,P,v,tt.current,z)}}var ye=x.ReactCurrentOwner,st=x.ReactDebugCurrentFrame;function Q(s){if(s){var d=s._owner,p=de(s.type,s._source,d?d.type:null);st.setExtraStackFrame(p)}else st.setExtraStackFrame(null)}var Ne;Ne=!1;function ke(s){return typeof s=="object"&&s!==null&&s.\$\$typeof===n}function it(){{if(ye.current){var s=H(ye.current.type);if(s)return\`

Check the render method of \\\`\`+s+"\`."}return""}}function Qr(s){return""}var nt={};function ea(s){{var d=it();if(!d){var p=typeof s=="string"?s:s.displayName||s.name;p&&(d=\`

Check the top-level render call using <\`+p+">.")}return d}}function ot(s,d){{if(!s._store||s._store.validated||s.key!=null)return;s._store.validated=!0;var p=ea(d);if(nt[p])return;nt[p]=!0;var v="";s&&s._owner&&s._owner!==ye.current&&(v=" It was passed a child from "+H(s._owner.type)+"."),Q(s),b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',p,v),Q(null)}}function lt(s,d){{if(typeof s!="object")return;if(je(s))for(var p=0;p<s.length;p++){var v=s[p];ke(v)&&ot(v,d)}else if(ke(s))s._store&&(s._store.validated=!0);else if(s){var P=f(s);if(typeof P=="function"&&P!==s.entries)for(var O=P.call(s),z;!(z=O.next()).done;)ke(z.value)&&ot(z.value,d)}}}function ta(s){{var d=s.type;if(d==null||typeof d=="string")return;var p;if(typeof d=="function")p=d.propTypes;else if(typeof d=="object"&&(d.\$\$typeof===m||d.\$\$typeof===k))p=d.propTypes;else return;if(p){var v=H(d);qr(p,s.props,"prop",v,s)}else if(d.PropTypes!==void 0&&!Ne){Ne=!0;var P=H(d);b("Component %s declared \`PropTypes\` instead of \`propTypes\`. Did you misspell the property assignment?",P||"Unknown")}typeof d.getDefaultProps=="function"&&!d.getDefaultProps.isReactClassApproved&&b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named \`defaultProps\` instead.")}}function ra(s){{for(var d=Object.keys(s.props),p=0;p<d.length;p++){var v=d[p];if(v!=="children"&&v!=="key"){Q(s),b("Invalid prop \`%s\` supplied to \`React.Fragment\`. React.Fragment can only have \`key\` and \`children\` props.",v),Q(null);break}}s.ref!==null&&(Q(s),b("Invalid attribute \`ref\` supplied to \`React.Fragment\`."),Q(null))}}var ct={};function dt(s,d,p,v,P,O){{var z=W(s);if(!z){var N="";(s===void 0||typeof s=="object"&&s!==null&&Object.keys(s).length===0)&&(N+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var M=Qr();M?N+=M:N+=it();var D;s===null?D="null":je(s)?D="array":s!==void 0&&s.\$\$typeof===n?(D="<"+(H(s.type)||"Unknown")+" />",N=" Did you accidentally export a JSX literal instead of a component?"):D=typeof s,b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",D,N)}var L=Xr(s,d,p,P,O);if(L==null)return L;if(z){var U=d.children;if(U!==void 0)if(v)if(je(U)){for(var ee=0;ee<U.length;ee++)lt(U[ee],s);Object.freeze&&Object.freeze(U)}else b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else lt(U,s)}if(ne.call(d,"key")){var X=H(s),B=Object.keys(d).filter(function(la){return la!=="key"}),we=B.length>0?"{key: someKey, "+B.join(": ..., ")+": ...}":"{key: someKey}";if(!ct[X+we]){var oa=B.length>0?"{"+B.join(": ..., ")+": ...}":"{}";b(\`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />\`,we,X,oa,X),ct[X+we]=!0}}return s===a?ra(L):ta(L),L}}function aa(s,d,p){return dt(s,d,p,!0)}function sa(s,d,p){return dt(s,d,p,!1)}var ia=sa,na=aa;re.Fragment=a,re.jsx=ia,re.jsxs=na})()),re}var Pe;function ht(){return Pe||(Pe=1,process.env.NODE_ENV==="production"?oe.exports=ut():oe.exports=pt()),oe.exports}var e=ht();const Ce=I.createContext({theme:"dark",toggleTheme:()=>{}});function q(){return I.useContext(Ce)}function ft({children:r}){const[n,t]=I.useState(()=>typeof window<"u"&&localStorage.getItem("tf-theme")||"dark"),a=I.useCallback(()=>{const i=n==="dark"?"light":"dark";t(i),localStorage.setItem("tf-theme",i),document.documentElement.setAttribute("data-bs-theme",i),document.documentElement.setAttribute("data-tf-theme",i)},[n]);return e.jsx(Ce.Provider,{value:{theme:n,toggleTheme:a},children:r})}const Te={active:"Aktivní",inactive:"Neaktivní",soldout:"Vyprodáno"},xt={active:"success",inactive:"warning",soldout:"danger"},Ae=[{value:"active",label:"Aktivní"},{value:"inactive",label:"Neaktivní"},{value:"soldout",label:"Vyprodáno"}],_e={pending:"Čekající",processing:"Zpracování",shipped:"Odesláno",completed:"Dokončeno",cancelled:"Zrušeno"},bt={pending:"warning",processing:"info",shipped:"primary",completed:"success",cancelled:"danger"},Oe=[{value:"pending",label:"Čekající"},{value:"processing",label:"Zpracování"},{value:"shipped",label:"Odesláno"},{value:"completed",label:"Dokončeno"},{value:"cancelled",label:"Zrušeno"}],Ie={published:"Publikováno",draft:"Koncept",archived:"Archivováno"},gt={published:"success",draft:"warning",archived:"default"},Ee=[{value:"",label:"Všechny stavy"},{value:"published",label:"Publikováno"},{value:"draft",label:"Koncept"}],Fe={active:"Aktivní",hidden:"Skrytá"},vt={active:"success",hidden:"warning"},Re=[{value:"active",label:"Aktivní"},{value:"hidden",label:"Skrytá"}],jt=Object.freeze(Object.defineProperty({__proto__:null,auth:{headings:{login:"Přihlášení",loginSubtitle:"Přihlaste se do svého účtu",register:"Vytvořit účet",registerSubtitle:"Zaregistrujte se a začněte používat TypeForge"},form:{email:"Email",password:"Heslo",firstName:"Jméno",lastName:"Příjmení",confirmPassword:"Potvrzení hesla"},actions:{login:"Přihlásit se",register:"Zaregistrovat se"},links:{or:"nebo",noAccount:"Nemáte účet?",registerLink:"Registrovat se",hasAccount:"Už máte účet?",loginLink:"Přihlaste se",terms:"obchodními podmínkami",privacy:"zásadami ochrany osobních údajů"},nav:{features:"Funkce",howItWorks:"Jak to funguje",toggleTheme:"Přepnout téma",logout:"Odhlásit"}},blog:{headings:{admin:"Blog",create:"Nový článek",edit:"Upravit článek"},columns:{name:"Název",author:"Autor",category:"Kategorie",status:"Stav",date:"Datum",actions:"Akce"},actions:{newArticle:"Nový článek",edit:"Upravit",view:"Zobrazit",delete:"Smazat",createArticle:"Vytvořit článek",saveChanges:"Uložit změny",backToList:"Zpět na seznam",selectFromMedia:"Vybrat z médií",removeImage:"Odebrat obrázek",goToMedia:"Přejít do médií"},confirm:{deleteArticle:"Opravdu chcete smazat tento článek?"},empty:{articles:"Žádné články k zobrazení",noArticlesYet:"Zatím zde nejsou žádné články.",noImages:"Zatím nejsou nahrány žádné obrázky."},statuses:{published:"Publikováno",draft:"Koncept"},filters:{allStatuses:"Všechny stavy",published:"Publikované",drafts:"Koncepty"},form:{sections:{content:"Obsah článku",featuredImage:"Hlavní obrázek",settings:"Nastavení",selectImage:"Vybrat obrázek"},labels:{title:"Název článku",slug:"URL Slug",excerpt:"Výňatek",excerptHint:"Krátký popis článku pro náhled",content:"Obsah",status:"Stav",category:"Kategorie",readTime:"Doba čtení (min)",noImage:"Bez obrázku"},placeholders:{title:"Zadejte název článku",slug:"url-slug-clanku",excerpt:"Krátký popis článku...",content:"Celý obsah článku...",category:"např. Návody"}},public:{minRead:"min čtení",newsAndArticles:"Novinky a",articles:"Články",subtitle:"Nejnovější články, návody a novinky ze světa TypeForge. Naučte se nové techniky a zůstaňte v obraze.",nav:{features:"Funkce",article:"Článek",toggleTheme:"Přepnout téma",home:"Domů"}}},cart:{headings:{cart:"Váš košík",orderSummary:"Souhrn objednávky",yourOrder:"Vaše objednávka",shippingDetails:"Dodací údaje",paymentMethod:"Způsob platby",orderReview:"Přehled objednávky",thankYou:"Děkujeme za objednávku!"},columns:{product:"Produkt",quantity:"Množství",price:"Cena",total:"Celkem"},summary:{subtotal:"Mezisoučet",shipping:"Doprava",free:"Zdarma",total:"Celkem",freeShippingInfo:"Máte nárok na dopravu zdarma!"},actions:{checkout:"Pokračovat k platbě",continueShopping:"Pokračovat v nákupu",applyPromo:"Použít",backToCart:"Zpět do košíku",continueToPayment:"Pokračovat k platbě",backToShipping:"Zpět na doručení",reviewOrder:"Zkontrolovat objednávku",backToPayment:"Zpět na platbu",submitOrder:"Odeslat objednávku",continueShopping2:"Pokračovat v nákupu",goHome:"Na hlavní stránku"},promo:{label:"Slevový kód",placeholder:"Zadejte kód"},checkout:{secureCheckout:"Zabezpečený checkout",steps:{shipping:"Doručení",payment:"Platba",review:"Přehled",done:"Hotovo"},shipping:{subtitle:"Vyplňte adresu pro doručení vaší objednávky",contactInfo:"Kontaktní údaje",deliveryAddress:"Dodací adresa",deliveryMethod:"Způsob doručení",firstName:"Jméno *",lastName:"Příjmení *",email:"E-mail *",phone:"Telefon *",street:"Ulice a číslo popisné *",city:"Město *",zip:"PSČ *",country:"Země",countryCZ:"Česká republika",countrySK:"Slovensko",standardDelivery:"Standardní doručení",standardDeliveryDesc:"Doručení do 3-5 pracovních dnů",expressDelivery:"Expresní doručení",expressDeliveryDesc:"Doručení do 1-2 pracovních dnů",personalPickup:"Osobní odběr",personalPickupDesc:"Vyzvednete na naší prodejně v Praze"},payment:{subtitle:"Vyberte, jak chcete zaplatit",selectMethod:"Vyberte platební metodu",card:"Platební karta",cardDesc:"Visa, Mastercard, Maestro",bankTransfer:"Bankovní převod",bankTransferDesc:"Platba na účet před odesláním",cod:"Dobírka",codDesc:"Platba při převzetí + 39 Kč",paypal:"PayPal",paypalDesc:"Rychlá a bezpečná platba",cardNumber:"Číslo karty *",cardExpiry:"Platnost *",cardCvv:"CVV/CVC *",cardName:"Jméno na kartě *",billingInfo:"Fakturační údaje",sameAsShipping:"Stejná jako dodací adresa",differentBilling:"Jiná fakturační adresa",companyName:"Název firmy",ico:"IČO",dic:"DIČ"},review:{subtitle:"Zkontrolujte všechny údaje před odesláním",contactInfo:"Kontaktní údaje",deliveryAddress:"Dodací adresa",deliveryMethod:"Způsob doručení",paymentMethod:"Platební metoda",orderItems:"Položky objednávky",edit:"Upravit",termsAgreement:'Kliknutím na "Odeslat objednávku" souhlasím s obchodními podmínkami'},confirmation:{subtitle:"Vaše objednávka byla úspěšně přijata a bude brzy zpracována.",orderNumber:"Číslo objednávky",orderDate:"Datum objednávky",paymentMethod:"Způsob platby",deliveryMethod:"Způsob doručení",expectedDelivery:"Očekávané doručení",totalAmount:"Celková částka",confirmationSent:"Potvrzení objednávky jsme zaslali na"}},nav:{home:"Domů",article:"Článek",toggleTheme:"Přepnout téma"}},catalog:{headings:{products:"Produkty",productCreate:"Nový produkt",productEdit:"Upravit produkt",categories:"Kategorie",categoryCreate:"Nová kategorie",categoryEdit:"Upravit kategorii"},columns:{product:"Produkt",category:"Kategorie",price:"Cena",stock:"Skladem",status:"Stav",description:"Popis",productCount:"Produktů"},actions:{addProduct:"Přidat produkt",addCategory:"Přidat kategorii",edit:"Upravit",delete:"Smazat",createProduct:"Vytvořit produkt",createCategory:"Vytvořit kategorii",saveChanges:"Uložit změny",selectFromMedia:"Vybrat z médií",removeImage:"Odebrat obrázek",goToMedia:"Přejít do médií",addToGallery:"Přidat do galerie"},confirm:{deleteProduct:"Opravdu smazat produkt?",deleteCategory:"Opravdu smazat kategorii?"},filters:{allCategories:"Všechny kategorie",allStatuses:"Všechny stavy"},empty:{products:"Žádné produkty k zobrazení",categories:"Žádné kategorie k zobrazení",noImages:"Žádné obrázky v médiích. Nejprve nahrajte obrázky.",noGalleryImages:"Galerie je prázdná. Přidejte obrázky z médií."},form:{sections:{basicInfo:"Základní informace",priceStock:"Cena a sklad",categoryStatus:"Kategorie a stav",categoryInfo:"Informace o kategorii",settings:"Nastavení",featuredImage:"Hlavní obrázek",selectImage:"Vybrat obrázek",gallery:"Galerie obrázků",selectGalleryImages:"Vybrat obrázky do galerie"},labels:{productName:"Název produktu",categoryName:"Název kategorie",slug:"Slug",shortDescription:"Krátký popis",description:"Popis",price:"Cena (Kč)",oldPrice:"Původní cena (Kč)",stock:"Skladem (ks)",category:"Kategorie",status:"Stav",icon:"Ikona (Bootstrap Icon)",sortOrder:"Pořadí",noCategory:"Bez kategorie",noImage:"Žádný obrázek"},placeholders:{autoFromName:"automaticky z názvu",iconExamples:"např. box, phone, laptop",discountHint:"pro zobrazení slevy",categoryIconExamples:"např. tag, laptop, phone"}},statuses:{active:"Aktivní",inactive:"Neaktivní",soldout:"Vyprodáno",hidden:"Skrytá"}},common:{sidebar:{sections:{main:"Hlavní",eshop:"E-Shop",content:"Obsah"},items:{dashboard:"Dashboard",analytics:"Analytika",orders:"Objednávky",products:"Produkty",categories:"Kategorie",customers:"Zákazníci",warehouse:"Sklad",blog:"Blog",media:"Média"}},layout:{web:"Web",toggleSidebar:"Přepnout postranní panel",toggleTheme:"Přepnout téma"},confirm:{title:"Potvrdit akci",cancel:"Zrušit",confirm:"Potvrdit"},nav:{home:"Domů",features:"Funkce",article:"Článek",eshop:"E-Shop",admin:"Admin",toggleTheme:"Přepnout téma",logout:"Odhlásit"},footer:{brand:"TypeForge",tagline:"Moderní serverless web framework",links:{documentation:"Dokumentace",github:"GitHub",blog:"Blog",community:"Komunita"},copyright:"TypeForge. Všechna práva vyhrazena."},customers:{heading:"Zákazníci",columns:{name:"Jméno",email:"Email",orders:"Objednávek",totalSpent:"Celkem utraceno",registered:"Registrace"},empty:"Žádní zákazníci k zobrazení"},errors:{invalidRequest:"Neplatný požadavek",validationError:"Chyba validace",genericError:"Došlo k chybě, zkuste to znovu"}},dashboard:{headings:{dashboard:"Dashboard",analytics:"Analytika"},stats:{totalOrders:"Objednávek celkem",totalRevenue:"Celkové tržby",customers:"Zákazníků",productsInStock:"Produktů skladem",totalTurnover:"Celkový obrat",totalOrdersCount:"Celkem objednávek",averageOrder:"Průměrná objednávka",activeCarts:"Aktivních košíků",cartValue:"Hodnota košíků",cartItems:"Položek v košících",avgCartValue:"Průměrný košík"},badges:{pendingOrders:"čekajících objednávek",lowStock:"produktů s nízkým skladem",activeCarts:"aktivních košíků"},sections:{recentOrders:"Poslední objednávky",lowStock:"Nízký sklad",quickActions:"Rychlé akce",recentActivity:"Nedávná aktivita",monthlyRevenue:"Obrat po měsících",topProducts:"Nejprodávanější produkty",ordersByStatus:"Objednávky dle stavu",stockOverview:"Stav skladu",newCustomers:"Noví zákazníci",cartOverview:"Přehled košíků",topCartProducts:"Nejčastější produkty v košících"},actions:{viewAll:"Zobrazit vše",allProducts:"Všechny produkty"},columns:{number:"Číslo",customer:"Zákazník",products:"Produkty",amount:"Částka",status:"Stav",date:"Datum",product:"Produkt",price:"Cena",stock:"Skladem",month:"Měsíc",orderCount:"Objednávek",revenue:"Obrat",soldQty:"Prodáno ks",inCarts:"V košících",qty:"Ks celkem",value:"Hodnota"},empty:{orders:"Zatím žádné objednávky",activity:"Zatím žádná aktivita",noOrdersInMonths:"Žádné objednávky v posledních 6 měsících.",noSales:"Žádné prodeje zatím.",noOrders:"Žádné objednávky.",noProducts:"Žádné produkty.",noCustomers:"Žádní zákazníci zatím.",noCarts:"Žádné aktivní košíky."},activity:{orderCompleted:"objednávka dokončena",newOrder:"nová objednávka",orderCancelled:"objednávka zrušena",orderPrefix:"objednávka:",newCustomer:"Nový zákazník"},quickActions:{addProduct:"Přidat produkt",addProductDesc:"Vytvořit nový produkt",newOrder:"Nová objednávka",newOrderDesc:"Manuální vytvoření",newCustomer:"Nový zákazník",newCustomerDesc:"Přidat zákazníka",newArticle:"Nový článek",newArticleDesc:"Napsat blog post"},analyticsStatuses:{pending:"Čeká na zpracování",processing:"Zpracovává se",shipped:"Odesláno",delivered:"Doručeno",cancelled:"Zrušeno"},months:{"01":"Leden","02":"Únor","03":"Březen","04":"Duben","05":"Květen","06":"Červen","07":"Červenec","08":"Srpen","09":"Září",10:"Říjen",11:"Listopad",12:"Prosinec"}},media:{headings:{admin:"Média"},actions:{upload:"Nahrát soubor",open:"Otevřít",delete:"Smazat",uploadBtn:"Nahrát",cancelBtn:"Zrušit",close:"Zavřít"},confirm:{deleteFile:"Opravdu chcete smazat tento soubor?"},empty:{noMedia:"Žádná média k zobrazení",uploadHint:"Nahrajte první soubor pomocí tlačítka výše"},form:{uploadTitle:"Nahrát soubor",selectFile:"Vyberte soubor *",altText:"Alternativní text (pro obrázky)",altPlaceholder:"Popis obrázku pro přístupnost"},filters:{allTypes:"Všechny typy",images:"Obrázky",documents:"Dokumenty",videos:"Videa"}},orders:{headings:{admin:"Objednávky",create:"Nová objednávka"},columns:{number:"Číslo",customer:"Zákazník",products:"Produkty",amount:"Částka",status:"Stav",date:"Datum",actions:"Akce",product:"Produkt",quantity:"Množství",pricePerUnit:"Cena/ks",total:"Celkem",totalLabel:"Celkem:"},actions:{newOrder:"Nová objednávka",detail:"Detail",edit:"Upravit",createOrder:"Vytvořit objednávku",saveChanges:"Uložit změny",cancel:"Zrušit",backToList:"Zpět na seznam",addItem:"Přidat položku",removeItem:"Odebrat"},empty:{orders:"Žádné objednávky k zobrazení",items:"Žádné položky"},form:{sections:{customer:"Zákazník",items:"Položky objednávky",notes:"Poznámky",orderStatus:"Stav objednávky"},labels:{selectCustomer:"Vybrat zákazníka",noAssignment:"— Bez přiřazení / ruční zadání —",customerName:"Jméno zákazníka *",email:"Email *",shippingAddress:"Doručovací adresa",product:"Produkt",selectProduct:"— Vyberte produkt —",customItem:"Vlastní položka",itemName:"Název",qty:"Ks",pricePerUnit:"Cena/ks",notesPlaceholder:"Interní poznámky k objednávce..."}},detail:{sections:{items:"Položky objednávky",notes:"Poznámky",info:"Informace",customer:"Zákazník",shippingAddress:"Doručovací adresa"},labels:{status:"Stav",createdAt:"Datum vytvoření",updatedAt:"Poslední aktualizace",name:"Jméno",email:"Email"}},statuses:{filterAll:"Všechny stavy",filterPending:"Čekající",filterProcessing:"Zpracování",filterShipped:"Odeslané",filterCompleted:"Dokončené",filterCancelled:"Zrušené",pending:"Čeká",processing:"Zpracování",shipped:"Odesláno",completed:"Dokončeno",cancelled:"Zrušeno"}},shared:{statuses:{product:Te,order:_e,blog:Ie,category:Fe},filters:{product:Ae,order:Oe,blog:Ee,category:Re}},shop:{headings:{allProducts:"Všechny produkty"},hero:{badge:"Nová kolekce 2026",titleLine1:"Objevte náš",titleLine2:"prémiový výběr",subtitle:"Prozkoumejte naši exkluzivní kolekci produktů. Kvalita, styl a nejlepší ceny na jednom místě.",shopNow:"Nakupovat",categories:"Kategorie"},features:{freeShipping:"Doprava zdarma",warranty:"Záruka 2 roky",returnPolicy:"30 dní na vrácení",support:"24/7 podpora"},sections:{categories:"Kategorie",exploreCategories:"Prozkoumejte naše kategorie",findWhatYouNeed:"Najděte přesně to, co hledáte",recommended:"Doporučené",bestSelling:"Nejprodávanější produkty",customerChoice:"Výběr našich zákazníků"},newsletter:{title:"Odebírejte novinky",subtitle:"Získejte 10% slevu na první nákup a buďte první, kdo se dozví o novinkách.",placeholder:"Váš email...",subscribe:"Odebírat"},product:{quantity:"Množství:",addToCart:"Přidat do košíku",inStock:"Skladem",outOfStock:"Není skladem",freeShipping:"Doprava zdarma",warranty:"Záruka 2 roky",returnPolicy:"30 dní na vrácení",description:"Popis",sale:"Sleva"},category:{totalProducts:"produktů",noProducts:"V této kategorii zatím nejsou žádné produkty.",backToEshop:"Zpět na E-Shop"},empty:{noCategories:"Zatím žádné kategorie",noProducts:"Zatím žádné produkty"},nav:{home:"Domů",article:"Článek",eshop:"E-Shop",admin:"Admin",toggleTheme:"Přepnout téma"},footer:{tagline:"Kvalita za skvělé ceny"},breadcrumb:{home:"Domů",eshop:"E-Shop"}}},Symbol.toStringTag,{value:"Module"}));function C(r){return jt[r]}const yt={xs:"fs-6",sm:"",md:"fs-5",lg:"fs-4",xl:"fs-3"};function w({name:r,size:n,color:t,className:a}){const o=["bi",r.startsWith("bi-")?r:\`bi-\${r}\`,n?yt[n]:"",a].filter(Boolean).join(" ");return e.jsx("i",{className:o,style:t?{color:t}:void 0})}const Nt={default:"",success:"success",warning:"warning",info:"info",danger:"danger"};function Y({children:r,variant:n="default",icon:t,className:a}){const i=["status-badge",Nt[n],a].filter(Boolean).join(" ");return e.jsxs("span",{className:i,children:[t&&e.jsx(w,{name:t,className:"me-1"}),r]})}function kt({children:r}){return e.jsx("span",{className:"admin-nav-badge",children:r})}const wt={xs:{width:28,height:28,fontSize:"0.8rem"},sm:{width:32,height:32,fontSize:"0.9rem"},md:{width:40,height:40,fontSize:"1.1rem"},lg:{width:48,height:48,fontSize:"1.25rem"},xl:{width:56,height:56,fontSize:"1.4rem"}};function zt({size:r="md",className:n}){const{toggleTheme:t}=q(),a=["btn-theme-toggle",n].filter(Boolean).join(" ");return e.jsxs("button",{className:a,style:wt[r],onClick:t,title:"Přepnout téma",children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}function St(r){return[{title:r.sidebar.sections.main,items:[{path:"/admin",icon:"grid-1x2",label:r.sidebar.items.dashboard},{path:"/admin/analytics",icon:"bar-chart",label:r.sidebar.items.analytics}]},{title:r.sidebar.sections.eshop,items:[{path:"/admin/orders",icon:"cart3",label:r.sidebar.items.orders,badge:"12"},{path:"/admin/products",icon:"box-seam",label:r.sidebar.items.products},{path:"/admin/categories",icon:"folder",label:r.sidebar.items.categories}]},{title:r.sidebar.sections.content,items:[{path:"/admin/blog",icon:"journal-richtext",label:r.sidebar.items.blog},{path:"/admin/media",icon:"images",label:r.sidebar.items.media}]}]}function Pt(r){const n=r.split("/").filter(Boolean);return n.length>1?n[n.length-1]:"dashboard"}function Ct({activePage:r,sections:n,user:t={name:"Jan Novák",initials:"JN",role:"Administrátor"},onClose:a}){const i=C("common"),o=n??St(i);return e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"sidebar-close",onClick:a,children:e.jsx(w,{name:"x-lg"})}),e.jsxs("a",{href:"/admin",className:"admin-logo",children:[e.jsx(w,{name:"braces-asterisk",className:"text-gradient"}),e.jsx("span",{className:"text-gradient",children:"TypeForge"})]}),e.jsx("nav",{className:"admin-nav",children:o.map((c,l)=>e.jsxs("div",{className:"admin-nav-section",children:[e.jsx("div",{className:"admin-nav-label",children:c.title}),c.items.map(m=>{const u=Pt(m.path)===r;return e.jsxs("a",{href:m.path,className:\`admin-nav-item\${u?" active":""}\`,children:[e.jsx(w,{name:m.icon||"circle"}),e.jsx("span",{children:m.label}),m.badge&&e.jsx(kt,{children:m.badge})]},m.path)})]},l))}),e.jsxs("div",{className:"admin-user",children:[e.jsx("div",{className:"admin-user-avatar",children:t.initials}),e.jsxs("div",{className:"admin-user-info",children:[e.jsx("div",{className:"admin-user-name",children:t.name}),e.jsx("div",{className:"admin-user-role",children:t.role})]}),e.jsx(zt,{size:"sm"})]})]})}const Tt={primary:"btn-primary-tf",outline:"btn-outline-tf",ghost:"btn-ghost-tf",accent:"btn-accent-tf"},At={xs:"btn-xs",sm:"btn-sm",md:"",lg:"btn-lg",xl:"btn-xl"};function ue({children:r,variant:n="primary",size:t="md",icon:a,iconRight:i,href:o,type:c="button",disabled:l=!1,fullWidth:m=!1,onClick:h,className:u}){const k=[Tt[n],At[t],m?"w-100":"",u].filter(Boolean).join(" ");return o?e.jsxs("a",{href:o,className:k,onClick:h,children:[a&&e.jsx(w,{name:a,className:i?"":"me-2"}),r,i&&e.jsx(w,{name:i,className:"ms-2"})]}):e.jsxs("button",{type:c,className:k,disabled:l,onClick:h,children:[a&&e.jsx(w,{name:a,className:i?"":"me-2"}),r,i&&e.jsx(w,{name:i,className:"ms-2"})]})}function _t({placeholder:r="Hledat...",value:n,name:t,className:a,onChange:i}){const o=["admin-search",a].filter(Boolean).join(" ");return e.jsxs("div",{className:o,children:[e.jsx("i",{className:"bi bi-search"}),e.jsx("input",{type:"text",placeholder:r,defaultValue:n,name:t,onChange:i})]})}function Z({title:r,activePage:n,children:t,subtitle:a,headerActions:i,sidebarProps:o}){const[c,l]=I.useState(!1),m=C("common"),h=e.jsxs(e.Fragment,{children:[e.jsx(_t,{}),e.jsx(ue,{href:"/",variant:"outline",size:"sm",icon:"box-arrow-up-right",children:m.layout.web})]});return e.jsxs("div",{className:"admin-wrapper",children:[c&&e.jsx("div",{className:"sidebar-overlay open",onClick:()=>l(!1)}),e.jsx("aside",{className:\`admin-sidebar\${c?" open":""}\`,children:e.jsx(Ct,{activePage:n,onClose:()=>l(!1),...o})}),e.jsxs("main",{className:"admin-main",children:[e.jsxs("div",{className:"admin-header",children:[e.jsxs("div",{children:[e.jsx("button",{className:"mobile-menu-btn",onClick:()=>l(!0),children:e.jsx(w,{name:"list"})}),e.jsx("h1",{className:"admin-title",children:r})]}),e.jsx("div",{className:"admin-header-actions",children:i||h})]}),t]})]})}const Ot={purple:"purple",green:"green",blue:"blue",orange:"orange",muted:"",primary:"purple",accent:"green"};function It({icon:r,iconColor:n="purple",value:t,label:a,change:i,className:o}){const c=["stat-card",o].filter(Boolean).join(" ");return e.jsxs("div",{className:c,children:[e.jsxs("div",{className:"stat-header",children:[e.jsx("div",{className:\`stat-icon \${Ot[n]}\`,children:e.jsx(w,{name:r})}),i&&e.jsxs("div",{className:\`stat-change \${i.direction}\`,children:[e.jsx(w,{name:\`arrow-\${i.direction}\`})," ",i.value]})]}),e.jsx("div",{className:"stat-value",children:t}),e.jsx("div",{className:"stat-label",children:a})]})}function De({stats:r,columns:n=4}){const t=n===2?"col-md-6":n===3?"col-md-4":"col-md-6 col-lg-3";return e.jsx("div",{className:"row g-4 mb-4",children:r.map((a,i)=>e.jsx("div",{className:t,children:e.jsx(It,{...a})},i))})}function F({children:r,title:n,headerRight:t,className:a}){const i=["card-section",a].filter(Boolean).join(" "),o=n||t;return e.jsxs("div",{className:i,children:[o&&e.jsxs("div",{className:"card-section-header",children:[n&&e.jsx("h5",{className:"card-section-title",children:n}),t]}),r]})}function S(r){if(isNaN(r))return"0,00 Kč";const t=(Math.round(r*100)/100).toFixed(2),[a,i]=t.split(".");let o="";for(let c=0;c<a.length;c++)c>0&&(a.length-c)%3===0&&(o+=" "),o+=a[c];return o+","+i+" Kč"}function K(r){if(!r||r.length<10)return"-";const n=r.substring(0,4),t=r.substring(5,7),a=r.substring(8,10),i=Number(a),o=Number(t);return i>0&&o>0?\`\${i}. \${o}. \${n}\`:"-"}function Et(r){return Te[r]??r}function Ft(r){return xt[r]??"default"}function pe(r){return _e[r]??r}function he(r){return bt[r]??"default"}function Rt(r){return Ie[r]??r}function Dt(r){return gt[r]??"default"}function Vt(r){return Fe[r]??r}function Lt(r){return vt[r]??"default"}function fe(r){var i,o,c,l;if(!r)return"??";const n=r.trim().split(/\\s+/),t=((o=(i=n[0])==null?void 0:i[0])==null?void 0:o.toUpperCase())??"",a=((l=(c=n[1])==null?void 0:c[0])==null?void 0:l.toUpperCase())??"";return t+a||t||"??"}function Mt({stats:r,recentOrders:n,lowStockProducts:t}){const a=C("dashboard");return e.jsxs(Z,{title:a.headings.dashboard,activePage:"dashboard",children:[e.jsx(De,{stats:r}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(F,{title:a.sections.recentOrders,children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:a.columns.number}),e.jsx("th",{children:a.columns.customer}),e.jsx("th",{style:{textAlign:"right"},children:a.columns.amount}),e.jsx("th",{children:a.columns.status}),e.jsx("th",{children:a.columns.date})]})}),e.jsx("tbody",{children:n.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center text-muted-tf py-4",children:a.empty.orders})}):n.map(i=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("a",{href:\`/admin/orders/detail?id=\${i.id}\`,className:"order-id",children:i.orderNumber})}),e.jsx("td",{children:e.jsxs("div",{className:"order-customer",children:[e.jsx("div",{className:"order-avatar",children:fe(i.customerName)}),i.customerName]})}),e.jsx("td",{style:{textAlign:"right"},children:S(Number(i.totalAmount))}),e.jsx("td",{children:e.jsx(Y,{variant:he(i.status),children:pe(i.status)})}),e.jsx("td",{children:K(i.createdAt)})]},i.id))})]})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(F,{title:a.sections.lowStock,children:t.length===0?e.jsx("p",{className:"text-muted-tf",children:a.empty.noProducts}):t.map(i=>e.jsxs("div",{className:"d-flex justify-content-between align-items-center py-2",style:{borderBottom:"1px solid var(--tf-border)"},children:[e.jsx("a",{href:\`/admin/products/edit?id=\${i.id}\`,style:{color:"var(--tf-text)",textDecoration:"none"},children:i.name}),e.jsxs(Y,{variant:"danger",children:[i.stock," ks"]})]},i.id))})})]})]})}function qt({stats:r}){const n=C("dashboard");return e.jsxs(Z,{title:n.headings.analytics,activePage:"analytics",children:[e.jsx(De,{stats:r}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(F,{title:n.sections.monthlyRevenue,children:e.jsx("div",{className:"chart-placeholder",children:e.jsx("i",{className:"bi bi-bar-chart"})})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(F,{title:n.sections.topProducts,children:e.jsx("div",{className:"chart-placeholder",children:e.jsx("i",{className:"bi bi-pie-chart"})})})})]})]})}function V({children:r,label:n,required:t,error:a,hint:i,className:o}){const c=["form-group",a?"has-error":"",o].filter(Boolean).join(" ");return e.jsxs("div",{className:c,children:[n&&e.jsxs("label",{className:"form-label",children:[n,t&&e.jsx("span",{className:"text-danger ms-1",children:"*"})]}),r,a&&e.jsx("div",{className:"form-error text-danger small mt-1",children:a}),!a&&i&&e.jsx("div",{className:"form-hint text-muted-tf small mt-1",children:i})]})}function ae({options:r,name:n,value:t,placeholder:a,disabled:i,required:o,label:c,filter:l=!1,className:m,onChange:h}){const u=[l?"filter-select":"form-control",m].filter(Boolean).join(" "),k=e.jsxs("select",{name:n,disabled:i,required:o,className:u,onChange:h,defaultValue:t??"",children:[a&&e.jsx("option",{value:"",disabled:!0,children:a}),r.map(E=>e.jsx("option",{value:E.value,children:E.label},E.value))]});return c&&!l?e.jsx(V,{label:c,required:o,children:k}):k}function Ve({open:r,message:n,onConfirm:t,onCancel:a}){const i=C("common");return r?e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:a}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"2rem",maxWidth:400,width:"90%",textAlign:"center"},children:[e.jsx("p",{style:{marginBottom:"1.5rem",fontSize:"1rem"},children:n}),e.jsxs("div",{style:{display:"flex",gap:"1rem",justifyContent:"center"},children:[e.jsx("button",{className:"btn-outline-tf btn-sm",onClick:a,style:{padding:"0.5rem 1.5rem",borderRadius:8},children:i.confirm.cancel}),e.jsx("button",{className:"btn-primary-tf btn-sm",onClick:t,style:{padding:"0.5rem 1.5rem",borderRadius:8},children:i.confirm.confirm})]})]})]}):null}function se({columns:r,rows:n,actions:t,filters:a,addButton:i,emptyMessage:o="Žádné záznamy",className:c}){const[l,m]=I.useState(null),h=a&&a.length>0,u=t&&t.length>0,k=h||!!i,E=r.length+(u?1:0),g=j=>f=>{const x=new URLSearchParams(window.location.search),b=f.target.value;b?x.set(j,b):x.delete(j),window.location.search=x.toString()},A=(j,f)=>x=>{j.confirm&&(x.preventDefault(),m({url:j.href(f),message:j.confirm}))};return e.jsxs(e.Fragment,{children:[k&&e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"filter-bar mb-0",children:h&&a.map(j=>{const f=j.placeholder?[{value:"",label:j.placeholder},...j.options]:j.options;return e.jsx(ae,{filter:!0,options:f,name:j.name,value:j.value,onChange:g(j.name)},j.name)})}),i&&e.jsxs("a",{href:i.href,className:"btn-add",children:[e.jsx(w,{name:"plus-lg"})," ",i.label]})]}),e.jsx(F,{className:c,children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[r.map(j=>e.jsx("th",{style:{width:j.width,textAlign:j.align},children:j.label},j.key)),u&&e.jsx("th",{children:"Akce"})]})}),e.jsx("tbody",{children:n.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:E,className:"text-center text-muted-tf py-4",children:o})}):n.map((j,f)=>e.jsxs("tr",{children:[r.map(x=>{const b=j[x.key]??"",\$=x.render?x.render(b,j):b;return e.jsx("td",{style:{textAlign:x.align},children:\$},x.key)}),u&&e.jsx("td",{children:t.map((x,b)=>{const \$=x.href(j),J=["btn-action",x.variant==="danger"?"danger":""].filter(Boolean).join(" ");return e.jsx("a",{href:\$,className:J,title:x.title,onClick:x.confirm?A(x,j):void 0,children:e.jsx(w,{name:x.icon})},b)})})]},j.id||f))})]})}),e.jsx(Ve,{open:!!l,message:(l==null?void 0:l.message)||"",onConfirm:()=>{l&&(window.location.href=l.url)},onCancel:()=>m(null)})]})}function Bt({products:r,categories:n,statusFilter:t,categoryFilter:a}){const i=C("catalog"),o=[{key:"name",label:i.columns.product,width:"30%",render:(m,h)=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:m}),h.categoryName&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("small",{className:"text-muted-tf",children:h.categoryName})]})]})},{key:"price",label:i.columns.price,align:"right",render:m=>S(Number(m))},{key:"stock",label:i.columns.stock,align:"center"},{key:"status",label:i.columns.status,render:m=>e.jsx(Y,{variant:Ft(m),children:Et(m)})}],c=[{icon:"pencil",href:m=>\`/admin/products/edit?id=\${m.id}\`,title:i.actions.edit},{icon:"trash",href:m=>\`/admin/products/delete?id=\${m.id}\`,title:i.actions.delete,variant:"danger",confirm:i.confirm.deleteProduct}],l=[{name:"status",options:Ae,value:t,placeholder:i.filters.allStatuses},{name:"category",options:n,value:a,placeholder:i.filters.allCategories}];return e.jsx(Z,{title:i.headings.products,activePage:"products",children:e.jsx(se,{columns:o,rows:r,actions:c,filters:l,addButton:{label:i.actions.addProduct,href:"/admin/products/create"},emptyMessage:i.empty.products})})}function Le({sections:r,values:n={},error:t,submitLabel:a="Uložit",submitIcon:i="check-lg",backUrl:o,backLabel:c="Zpět",action:l}){const[m,h]=I.useState(n),u=f=>x=>{h(b=>({...b,[f]:x.target.value}))},k=r.filter(f=>(f.position??"main")==="main"),E=r.filter(f=>f.position==="sidebar");function g(f){const x=m[f.name]??"",b=f.type??"text";if(b==="hidden")return e.jsx("input",{type:"hidden",name:f.name,value:x},f.name);if(b==="textarea")return e.jsx(V,{label:f.label,required:f.required,hint:f.hint,children:e.jsx("textarea",{name:f.name,className:"form-control",rows:f.rows??3,placeholder:f.placeholder,required:f.required,value:x,onChange:u(f.name)})},f.name);if(b==="select"){const \$=(f.options??[]).map(J=>({value:J.value,label:J.label}));return e.jsx(V,{label:f.label,required:f.required,hint:f.hint,children:e.jsx(ae,{name:f.name,options:\$,value:x,placeholder:f.placeholder,required:f.required,onChange:u(f.name)})},f.name)}return e.jsx(V,{label:f.label,required:f.required,hint:f.hint,children:e.jsx("input",{type:b,name:f.name,className:"form-control",value:x,placeholder:f.placeholder,required:f.required,step:f.step,min:f.min,onChange:u(f.name)})},f.name)}function A(f){return f.some(b=>(b.colSpan??12)<12)?e.jsx("div",{className:"row g-3",children:f.map(b=>{const \$=b.colSpan??12;return(b.type??"text")==="hidden"?g(b):e.jsx("div",{className:\`col-md-\${\$}\`,children:g(b)},b.name)})}):e.jsx(e.Fragment,{children:f.map(b=>(b.type??"text")==="hidden"?g(b):e.jsx("div",{className:"mb-3",children:g(b)},b.name))})}function j(f){return f.map((x,b)=>e.jsx(F,{title:x.title,children:A(x.fields)},b))}return e.jsxs(e.Fragment,{children:[t&&e.jsx("div",{className:"alert alert-danger mb-4",children:t}),e.jsx("form",{method:"post",action:l,className:"admin-form",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-md-8",children:j(k)}),e.jsxs("div",{className:"col-md-4",children:[j(E),e.jsx(F,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(w,{name:i})," ",a]}),o&&e.jsx("a",{href:o,className:"btn btn-outline-tf btn-sm text-center",children:c})]})})]})]})})]})}function Zt({categories:r,values:n,error:t,isEdit:a=!1}){const i=C("catalog"),o=[{value:"active",label:i.statuses.active},{value:"inactive",label:i.statuses.inactive},{value:"soldout",label:i.statuses.soldout}],c=[{title:i.form.sections.basicInfo,position:"main",fields:[{name:"name",label:i.form.labels.productName,required:!0,colSpan:8},{name:"slug",label:i.form.labels.slug,colSpan:4,placeholder:i.form.placeholders.autoFromName},{name:"short_description",label:i.form.labels.shortDescription,type:"textarea",rows:2},{name:"description",label:i.form.labels.description,type:"textarea",rows:5}]},{title:i.form.sections.priceStock,position:"main",fields:[{name:"price",label:i.form.labels.price,type:"number",step:"0.01",min:"0",required:!0,colSpan:4},{name:"old_price",label:i.form.labels.oldPrice,type:"number",step:"0.01",min:"0",colSpan:4,placeholder:i.form.placeholders.discountHint},{name:"stock",label:i.form.labels.stock,type:"number",min:"0",colSpan:4}]},{title:i.form.labels.category,position:"sidebar",fields:[{name:"category_id",label:i.form.labels.category,type:"select",options:r,placeholder:i.form.labels.noCategory}]},{title:i.form.labels.status,position:"sidebar",fields:[{name:"status",label:i.form.labels.status,type:"select",options:o}]},{title:i.form.labels.icon,position:"sidebar",fields:[{name:"icon",label:i.form.labels.icon,placeholder:i.form.placeholders.iconExamples}]}];return e.jsx(Z,{title:a?i.headings.productEdit:i.headings.productCreate,activePage:"products",children:e.jsx(Le,{sections:c,values:n,error:t,submitLabel:a?i.actions.saveChanges:i.actions.createProduct,backUrl:"/admin/products"})})}function \$t({categories:r,statusFilter:n}){const t=C("catalog"),a=[{key:"name",label:t.columns.category,render:(c,l)=>e.jsxs("span",{className:"d-flex align-items-center gap-2",children:[e.jsx(w,{name:l.icon||"folder"}),e.jsx("strong",{children:c})]})},{key:"sortOrder",label:t.form.labels.sortOrder,align:"center"},{key:"status",label:t.columns.status,render:c=>e.jsx(Y,{variant:Lt(c),children:Vt(c)})}],i=[{icon:"pencil",href:c=>\`/admin/categories/edit?id=\${c.id}\`,title:t.actions.edit},{icon:"trash",href:c=>\`/admin/categories/delete?id=\${c.id}\`,title:t.actions.delete,variant:"danger",confirm:t.confirm.deleteCategory}],o=[{name:"status",options:Re,value:n,placeholder:t.filters.allStatuses}];return e.jsx(Z,{title:t.headings.categories,activePage:"categories",children:e.jsx(se,{columns:a,rows:r,actions:i,filters:o,addButton:{label:t.actions.addCategory,href:"/admin/categories/create"},emptyMessage:t.empty.categories})})}function Ut({values:r,error:n,isEdit:t=!1}){const a=C("catalog"),i=[{title:a.form.sections.categoryInfo,position:"main",fields:[{name:"name",label:a.form.labels.categoryName,required:!0,colSpan:8},{name:"slug",label:a.form.labels.slug,colSpan:4,placeholder:a.form.placeholders.autoFromName},{name:"description",label:a.form.labels.description,type:"textarea",rows:3}]},{title:a.form.sections.settings,position:"sidebar",fields:[{name:"status",label:a.form.labels.status,type:"select",options:[{value:"active",label:a.statuses.active},{value:"hidden",label:a.statuses.hidden}]},{name:"sort_order",label:a.form.labels.sortOrder,type:"number",min:"0"},{name:"icon",label:a.form.labels.icon,placeholder:a.form.placeholders.categoryIconExamples}]}];return e.jsx(Z,{title:t?a.headings.categoryEdit:a.headings.categoryCreate,activePage:"categories",children:e.jsx(Le,{sections:i,values:r,error:n,submitLabel:t?a.actions.saveChanges:a.actions.createCategory,backUrl:"/admin/categories"})})}function Wt({orders:r,statusFilter:n}){const t=C("orders"),a=[{key:"orderNumber",label:t.columns.number,render:(c,l)=>e.jsx("span",{className:"order-id",children:c})},{key:"customerName",label:t.columns.customer,render:c=>e.jsxs("div",{className:"order-customer",children:[e.jsx("div",{className:"order-avatar",children:fe(c)}),c]})},{key:"totalAmount",label:t.columns.amount,align:"right",render:c=>S(Number(c))},{key:"status",label:t.columns.status,render:c=>e.jsx(Y,{variant:he(c),children:pe(c)})},{key:"createdAt",label:t.columns.date,render:c=>K(c)}],i=[{icon:"eye",href:c=>\`/admin/orders/detail?id=\${c.id}\`,title:t.actions.detail},{icon:"pencil",href:c=>\`/admin/orders/edit?id=\${c.id}\`,title:t.actions.edit}],o=[{name:"status",options:Oe,value:n,placeholder:t.statuses.filterAll}];return e.jsx(Z,{title:t.headings.admin,activePage:"orders",children:e.jsx(se,{columns:a,rows:r,actions:i,filters:o,addButton:{label:t.actions.newOrder,href:"/admin/orders/create"},emptyMessage:t.empty.orders})})}function Yt({order:r,items:n}){const t=C("orders");return e.jsx(Z,{title:\`\${t.headings.admin} \${r.orderNumber}\`,activePage:"orders",headerActions:e.jsx(ue,{href:\`/admin/orders/edit?id=\${r.id}\`,variant:"outline",size:"sm",icon:"pencil",children:t.actions.edit}),children:e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-md-8",children:[e.jsxs(F,{title:t.detail.sections.items,children:[e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:t.columns.product}),e.jsx("th",{style:{textAlign:"center"},children:t.columns.quantity}),e.jsx("th",{style:{textAlign:"right"},children:t.columns.pricePerUnit}),e.jsx("th",{style:{textAlign:"right"},children:t.columns.total})]})}),e.jsx("tbody",{children:n.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.productName}),e.jsx("td",{style:{textAlign:"center"},children:a.quantity}),e.jsx("td",{style:{textAlign:"right"},children:S(Number(a.unitPrice))}),e.jsx("td",{style:{textAlign:"right"},children:e.jsx("strong",{children:S(Number(a.totalPrice))})})]},a.id))})]}),e.jsx("div",{className:"d-flex justify-content-end mt-3",children:e.jsxs("div",{style:{fontSize:"1.25rem",fontWeight:800},children:[t.columns.totalLabel," ",S(Number(r.totalAmount))]})})]}),r.notes&&e.jsx(F,{title:t.detail.sections.notes,children:e.jsx("p",{children:r.notes})})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsxs(F,{title:t.detail.sections.info,children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[t.detail.labels.status,":"]})," ",e.jsx(Y,{variant:he(r.status),children:pe(r.status)})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[t.detail.labels.createdAt,":"]})," ",K(r.createdAt)]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[t.detail.labels.name,":"]})," ",r.customerName]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("strong",{children:[t.detail.labels.email,":"]})," ",r.customerEmail]})]}),r.shippingAddress&&e.jsx(F,{title:t.detail.sections.shippingAddress,children:e.jsx("p",{children:r.shippingAddress})}),r.billingAddress&&e.jsx(F,{title:"Fakturacni adresa",children:e.jsx("p",{children:r.billingAddress})})]})]})})}function Kt({isEdit:r,orderId:n,data:t,availableProducts:a,availableCustomers:i,existingItems:o,error:c}){const l=C("orders"),[m,h]=I.useState(o&&o.length>0?o:[{productId:"",productName:"",quantity:"1",unitPrice:"0"}]),[u,k]=I.useState(t??{}),E=[{value:"pending",label:l.statuses.pending},{value:"processing",label:l.statuses.processing},{value:"completed",label:l.statuses.completed},{value:"cancelled",label:l.statuses.cancelled},{value:"returned",label:"Vraceno"}],g=y=>_=>{k(R=>({...R,[y]:_.target.value}))},A=y=>{const _=y.target.value;if(!_)return;const R=i.find(T=>T.id===_);R&&k(T=>({...T,customer_id:R.id,customer_name:\`\${R.firstName} \${R.lastName}\`,customer_email:R.email}))},j=(y,_,R)=>{h(T=>{const W=[...T];return W[y]={...W[y],[_]:R},W})},f=(y,_)=>{const R=a.find(T=>T.id===_);R?h(T=>{const W=[...T];return W[y]={...W[y],productId:R.id,productName:R.name,unitPrice:R.price},W}):j(y,"productId",_)},x=()=>{h(y=>[...y,{productId:"",productName:"",quantity:"1",unitPrice:"0"}])},b=y=>{h(_=>_.filter((R,T)=>T!==y))},\$=m.reduce((y,_)=>{const R=Number(_.quantity)||0,T=Number(_.unitPrice)||0;return y+R*T},0),J=i.map(y=>({value:y.id,label:\`\${y.firstName} \${y.lastName} (\${y.email})\`})),xe=a.map(y=>({value:y.id,label:\`\${y.name} - \${S(Number(y.price))}\`}));return e.jsxs(Z,{title:r?l.actions.edit:l.headings.create,activePage:"orders",children:[c&&e.jsx("div",{className:"alert alert-danger mb-4",children:c}),e.jsxs("form",{method:"post",children:[n&&e.jsx("input",{type:"hidden",name:"id",value:n}),e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs(F,{title:l.form.sections.customer,children:[e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:l.form.labels.selectCustomer,children:e.jsxs("select",{className:"form-control",onChange:A,defaultValue:"",children:[e.jsx("option",{value:"",children:l.form.labels.noAssignment}),J.map(y=>e.jsx("option",{value:y.value,children:y.label},y.value))]})})}),e.jsx("input",{type:"hidden",name:"customer_id",value:u.customer_id??""}),e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(V,{label:l.form.labels.customerName,required:!0,children:e.jsx("input",{type:"text",name:"customer_name",className:"form-control",required:!0,value:u.customer_name??"",onChange:g("customer_name")})})}),e.jsx("div",{className:"col-md-6",children:e.jsx(V,{label:l.form.labels.email,required:!0,children:e.jsx("input",{type:"email",name:"customer_email",className:"form-control",required:!0,value:u.customer_email??"",onChange:g("customer_email")})})})]}),e.jsxs("div",{className:"row g-3 mt-1",children:[e.jsx("div",{className:"col-md-6",children:e.jsx(V,{label:l.form.labels.shippingAddress,children:e.jsx("textarea",{name:"shipping_address",className:"form-control",rows:2,value:u.shipping_address??"",onChange:g("shipping_address")})})}),e.jsx("div",{className:"col-md-6",children:e.jsx(V,{label:"Fakturacni adresa",children:e.jsx("textarea",{name:"billing_address",className:"form-control",rows:2,value:u.billing_address??"",onChange:g("billing_address")})})})]})]}),e.jsxs(F,{title:l.form.sections.items,children:[e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:"35%"},children:l.columns.product}),e.jsx("th",{style:{width:"25%"},children:l.form.labels.itemName}),e.jsx("th",{style:{width:"10%",textAlign:"center"},children:l.columns.quantity}),e.jsx("th",{style:{width:"15%",textAlign:"right"},children:l.columns.pricePerUnit}),e.jsx("th",{style:{width:"10%",textAlign:"right"},children:l.columns.total}),e.jsx("th",{style:{width:"5%"}})]})}),e.jsx("tbody",{children:m.map((y,_)=>{const R=(Number(y.quantity)||0)*(Number(y.unitPrice)||0);return e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsxs("select",{className:"form-control",value:y.productId,onChange:T=>f(_,T.target.value),children:[e.jsx("option",{value:"",children:l.form.labels.customItem}),xe.map(T=>e.jsx("option",{value:T.value,children:T.label},T.value))]}),e.jsx("input",{type:"hidden",name:\`item_product_id_\${_}\`,value:y.productId})]}),e.jsxs("td",{children:[e.jsx("input",{type:"text",className:"form-control",placeholder:l.form.labels.itemName,value:y.productName,onChange:T=>j(_,"productName",T.target.value)}),e.jsx("input",{type:"hidden",name:\`item_name_\${_}\`,value:y.productName})]}),e.jsxs("td",{children:[e.jsx("input",{type:"number",className:"form-control",min:"1",style:{textAlign:"center"},value:y.quantity,onChange:T=>j(_,"quantity",T.target.value)}),e.jsx("input",{type:"hidden",name:\`item_qty_\${_}\`,value:y.quantity})]}),e.jsxs("td",{children:[e.jsx("input",{type:"number",className:"form-control",step:"0.01",min:"0",style:{textAlign:"right"},value:y.unitPrice,onChange:T=>j(_,"unitPrice",T.target.value)}),e.jsx("input",{type:"hidden",name:\`item_price_\${_}\`,value:y.unitPrice})]}),e.jsx("td",{style:{textAlign:"right",fontWeight:600},children:S(R)}),e.jsx("td",{children:m.length>1&&e.jsx("button",{type:"button",className:"btn-action danger",title:l.actions.removeItem,onClick:()=>b(_),children:e.jsx(w,{name:"x-lg"})})})]},_)})})]}),e.jsx("input",{type:"hidden",name:"item_count",value:String(m.length)}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:x,children:[e.jsx(w,{name:"plus-lg"})," ",l.actions.addItem]}),e.jsxs("div",{style:{fontSize:"1.25rem",fontWeight:800},children:[l.columns.totalLabel," ",S(\$)]})]})]}),e.jsx(F,{title:l.form.sections.notes,children:e.jsx(V,{label:l.form.labels.notesPlaceholder,children:e.jsx("textarea",{name:"notes",className:"form-control",rows:3,value:u.notes??"",onChange:g("notes")})})})]}),e.jsxs("div",{className:"col-lg-4",children:[e.jsx(F,{title:l.columns.status,children:e.jsx(V,{label:l.form.sections.orderStatus,children:e.jsx(ae,{name:"status",options:E,value:u.status??"pending",onChange:g("status")})})}),e.jsx(F,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(w,{name:"check-lg"})," ",r?l.actions.saveChanges:l.actions.createOrder]}),e.jsx("a",{href:"/admin/orders",className:"btn btn-outline-tf btn-sm text-center",children:l.actions.backToList})]})})]})]})]})]})}function Jt({posts:r,statusFilter:n}){const t=C("blog"),a=r.map(l=>({id:l.id,title:l.title,slug:l.slug,author:l.author,category:l.category,status:l.status,createdAt:l.createdAt})),i=[{key:"title",label:t.columns.name,width:"35%",render:(l,m)=>e.jsxs(e.Fragment,{children:[e.jsx("strong",{children:l}),e.jsx("br",{}),e.jsx("small",{className:"text-muted-tf",children:m.slug})]})},{key:"author",label:t.columns.author},{key:"category",label:t.columns.category},{key:"status",label:t.columns.status,render:l=>e.jsx(Y,{variant:Dt(l),children:Rt(l)})},{key:"createdAt",label:t.columns.date,render:l=>K(l)}],o=[{icon:"pencil",href:l=>\`/admin/blog/edit?id=\${l.id}\`,title:t.actions.edit},{icon:"eye",href:l=>\`/article?slug=\${l.slug}\`,title:t.actions.view},{icon:"trash",href:l=>\`/admin/blog/delete?id=\${l.id}\`,title:t.actions.delete,variant:"danger",confirm:t.confirm.deleteArticle}],c=[{name:"status",options:Ee,value:n,placeholder:t.filters.allStatuses}];return e.jsx(Z,{title:t.headings.admin,activePage:"blog",children:e.jsx(se,{columns:i,rows:a,actions:o,filters:c,addButton:{label:t.actions.newArticle,href:"/admin/blog/create"},emptyMessage:t.empty.articles})})}function Ht({isEdit:r,editId:n,values:t,allMedia:a=[],error:i}){const o=C("blog"),[c,l]=I.useState(t??{}),[m,h]=I.useState(!1),[u,k]=I.useState((t==null?void 0:t.featured_image)??""),E=[{value:"draft",label:o.statuses.draft},{value:"published",label:o.statuses.published},{value:"archived",label:"Archivovano"}],g=x=>b=>{l(\$=>({...\$,[x]:b.target.value}))},A=a.filter(x=>x.contentType.startsWith("image/")),j=x=>{k(x),h(!1)},f=()=>{k("")};return e.jsxs(Z,{title:r?o.headings.edit:o.headings.create,activePage:"blog",children:[i&&e.jsx("div",{className:"alert alert-danger mb-4",children:i}),e.jsxs("form",{method:"post",children:[n&&e.jsx("input",{type:"hidden",name:"id",value:n}),e.jsx("input",{type:"hidden",name:"featured_image",value:u}),e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs(F,{title:o.form.sections.content,children:[e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-md-8",children:e.jsx(V,{label:o.form.labels.title,required:!0,children:e.jsx("input",{type:"text",name:"title",className:"form-control",required:!0,placeholder:o.form.placeholders.title,value:c.title??"",onChange:g("title")})})}),e.jsx("div",{className:"col-md-4",children:e.jsx(V,{label:o.form.labels.slug,children:e.jsx("input",{type:"text",name:"slug",className:"form-control",placeholder:o.form.placeholders.slug,value:c.slug??"",onChange:g("slug")})})})]}),e.jsx("div",{className:"mb-3 mt-3",children:e.jsx(V,{label:o.form.labels.excerpt,children:e.jsx("textarea",{name:"excerpt",className:"form-control",rows:3,placeholder:o.form.placeholders.excerpt,value:c.excerpt??"",onChange:g("excerpt")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:o.form.labels.content,children:e.jsx("textarea",{name:"content",className:"form-control",rows:15,placeholder:o.form.placeholders.content,value:c.content??"",onChange:g("content")})})})]})}),e.jsxs("div",{className:"col-lg-4",children:[e.jsx(F,{title:o.form.sections.featuredImage,children:u?e.jsxs("div",{className:"mb-3",children:[e.jsx("img",{src:u,alt:o.form.sections.featuredImage,style:{width:"100%",borderRadius:8,objectFit:"cover",maxHeight:200}}),e.jsxs("div",{className:"d-flex gap-2 mt-2",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>h(!0),children:[e.jsx(w,{name:"arrow-repeat"})," ",o.actions.selectFromMedia]}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"var(--tf-danger)"},onClick:f,children:[e.jsx(w,{name:"x-lg"})," ",o.actions.removeImage]})]})]}):e.jsxs("div",{className:"text-center py-3",children:[e.jsx(w,{name:"image",size:"xl",className:"text-muted-tf"}),e.jsx("p",{className:"text-muted-tf small mt-2 mb-3",children:o.form.labels.noImage}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>h(!0),children:[e.jsx(w,{name:"images"})," ",o.actions.selectFromMedia]})]})}),e.jsxs(F,{title:o.form.sections.settings,children:[e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:o.form.labels.status,children:e.jsx(ae,{name:"status",options:E,value:c.status??"draft",onChange:g("status")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:o.form.labels.category,children:e.jsx("input",{type:"text",name:"category",className:"form-control",placeholder:o.form.placeholders.category,value:c.category??"",onChange:g("category")})})}),e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:o.form.labels.readTime,children:e.jsx("input",{type:"number",name:"read_time",className:"form-control",min:"1",value:c.read_time??"5",onChange:g("read_time")})})})]}),e.jsx(F,{children:e.jsxs("div",{className:"d-grid gap-2",children:[e.jsxs("button",{type:"submit",className:"btn-add w-100 justify-content-center",children:[e.jsx(w,{name:"check-lg"})," ",r?o.actions.saveChanges:o.actions.createArticle]}),e.jsx("a",{href:"/admin/blog",className:"btn btn-outline-tf btn-sm text-center",children:o.actions.backToList})]})})]})]})]}),m&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:()=>h(!1)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"1.5rem",maxWidth:700,width:"90%",maxHeight:"80vh",overflow:"auto"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:o.form.sections.selectImage}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>h(!1),children:e.jsx(w,{name:"x-lg"})})]}),A.length===0?e.jsxs("div",{className:"text-center text-muted-tf py-4",children:[e.jsx(w,{name:"images",size:"xl"}),e.jsx("p",{className:"mt-2",children:o.empty.noImages})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:"0.75rem"},children:A.map(x=>e.jsx("div",{onClick:()=>j(x.url),style:{cursor:"pointer",borderRadius:8,overflow:"hidden",border:u===x.url?"2px solid var(--tf-primary)":"2px solid transparent",aspectRatio:"1"},children:e.jsx("img",{src:x.url,alt:x.filename,style:{width:"100%",height:"100%",objectFit:"cover"}})},x.id))})]})]})]})}function Me(r){return r.startsWith("image/")?"file-earmark-image":r.startsWith("video/")?"file-earmark-play":r.startsWith("audio/")?"file-earmark-music":r.includes("pdf")?"file-earmark-pdf":"file-earmark"}function Gt(r,n){return n?n==="image"?r.startsWith("image/"):n==="video"?r.startsWith("video/"):n==="audio"?r.startsWith("audio/"):n==="document"?!r.startsWith("image/")&&!r.startsWith("video/")&&!r.startsWith("audio/"):!0:!0}function Xt({mediaItems:r,typeFilter:n}){const t=C("media"),[a,i]=I.useState(!1),[o,c]=I.useState(null),[l,m]=I.useState(null),h=[{value:"",label:t.filters.allTypes},{value:"image",label:t.filters.images},{value:"document",label:t.filters.documents},{value:"video",label:t.filters.videos},{value:"audio",label:"Audio"}],u=r.filter(g=>Gt(g.contentType,n)),k=g=>{const A=g.target.value,j=new URLSearchParams(window.location.search);A?j.set("type",A):j.delete("type"),window.location.search=j.toString()},E=g=>{m({url:\`/admin/media/delete?id=\${g.id}\`,message:t.confirm.deleteFile})};return e.jsxs(Z,{title:t.headings.admin,activePage:"media",headerActions:e.jsx(ue,{variant:"primary",size:"sm",icon:"upload",onClick:()=>i(!0),children:t.actions.upload}),children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"filter-bar mb-0",children:e.jsx(ae,{filter:!0,options:h,name:"type",value:n,onChange:k})}),e.jsxs("span",{className:"text-muted-tf small",children:[u.length," polozek"]})]}),e.jsx(F,{children:u.length===0?e.jsxs("div",{className:"text-center text-muted-tf py-5",children:[e.jsx(w,{name:"images",size:"xl"}),e.jsx("p",{className:"mt-2",children:t.empty.noMedia}),e.jsx("p",{className:"small",children:t.empty.uploadHint})]}):e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:"1rem"},children:u.map(g=>e.jsxs("div",{className:"media-grid-item",style:{position:"relative",borderRadius:12,overflow:"hidden",border:"1px solid var(--tf-border)",background:"var(--tf-surface)",aspectRatio:"1",cursor:"pointer"},children:[e.jsx("div",{style:{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:g.contentType.startsWith("image/")?e.jsx("img",{src:g.url,alt:g.filename,style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsxs("div",{className:"text-center",children:[e.jsx(w,{name:Me(g.contentType),size:"xl",className:"text-muted-tf"}),e.jsx("div",{className:"text-muted-tf small mt-1",style:{maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 0.5rem"},children:g.filename})]})}),e.jsxs("div",{className:"media-overlay",style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s",padding:"0.5rem"},onMouseEnter:A=>{A.currentTarget.style.opacity="1"},onMouseLeave:A=>{A.currentTarget.style.opacity="0"},children:[e.jsx("div",{style:{color:"#fff",fontSize:"0.75rem",textAlign:"center",marginBottom:"0.5rem",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:g.filename}),e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"#fff",borderColor:"rgba(255,255,255,0.5)",fontSize:"0.75rem",padding:"0.25rem 0.5rem"},onClick:A=>{A.stopPropagation(),c(g)},children:[e.jsx(w,{name:"eye"})," ",t.actions.open]}),e.jsxs("button",{type:"button",className:"btn-outline-tf btn-sm",style:{color:"#ff6b6b",borderColor:"rgba(255,107,107,0.5)",fontSize:"0.75rem",padding:"0.25rem 0.5rem"},onClick:A=>{A.stopPropagation(),E(g)},children:[e.jsx(w,{name:"trash"})," ",t.actions.delete]})]})]})]},g.id))})}),a&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"},onClick:()=>i(!1)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"2rem",maxWidth:450,width:"90%"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:t.form.uploadTitle}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>i(!1),children:e.jsx(w,{name:"x-lg"})})]}),e.jsxs("form",{method:"post",encType:"multipart/form-data",action:"/admin/media/upload",children:[e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:t.form.selectFile,required:!0,children:e.jsx("input",{type:"file",name:"file",className:"form-control",required:!0})})}),e.jsx("div",{className:"mb-3",children:e.jsx(V,{label:t.form.altText,children:e.jsx("input",{type:"text",name:"alt_text",className:"form-control",placeholder:t.form.altPlaceholder})})}),e.jsxs("div",{className:"d-flex gap-2 justify-content-end",children:[e.jsx("button",{type:"button",className:"btn-outline-tf btn-sm",onClick:()=>i(!1),children:t.actions.cancelBtn}),e.jsxs("button",{type:"submit",className:"btn-add",children:[e.jsx(w,{name:"upload"})," ",t.actions.uploadBtn]})]})]})]})]}),o&&e.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)"},onClick:()=>c(null)}),e.jsxs("div",{style:{position:"relative",background:"var(--tf-surface)",border:"1px solid var(--tf-border)",borderRadius:16,padding:"1.5rem",maxWidth:800,width:"90%",maxHeight:"85vh",overflow:"auto"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-3",children:[e.jsx("h5",{style:{margin:0},children:o.filename}),e.jsx("button",{type:"button",className:"btn-action",onClick:()=>c(null),children:e.jsx(w,{name:"x-lg"})})]}),o.contentType.startsWith("image/")?e.jsx("img",{src:o.url,alt:o.filename,style:{width:"100%",borderRadius:8,objectFit:"contain",maxHeight:"60vh"}}):e.jsxs("div",{className:"text-center py-4",children:[e.jsx(w,{name:Me(o.contentType),size:"xl"}),e.jsx("p",{className:"mt-2",children:o.filename}),e.jsxs("a",{href:o.url,target:"_blank",rel:"noopener noreferrer",className:"btn-outline-tf btn-sm",children:[e.jsx(w,{name:"download"})," Stahnout"]})]}),e.jsxs("div",{className:"text-muted-tf small mt-3",children:[e.jsxs("div",{children:["Typ: ",o.contentType]}),e.jsxs("div",{children:["Nahrano: ",K(o.createdAt)]})]})]})]}),e.jsx(Ve,{open:!!l,message:(l==null?void 0:l.message)||"",onConfirm:()=>{l&&(window.location.href=l.url)},onCancel:()=>m(null)})]})}const Qt=[{value:"active",label:"Aktivni"},{value:"inactive",label:"Neaktivni"}];function er(r){return r==="active"?"Aktivni":"Neaktivni"}function tr(r){return r==="active"?"success":"warning"}function rr({customers:r,statusFilter:n}){const t=C("common"),a=r.map(l=>({id:l.id,fullName:\`\${l.firstName} \${l.lastName}\`,firstName:l.firstName,lastName:l.lastName,email:l.email,phone:l.phone??"",company:l.company??"",status:l.status,createdAt:l.createdAt})),i=[{key:"fullName",label:t.customers.columns.name,width:"25%",render:(l,m)=>e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("div",{className:"avatar",style:{width:36,height:36,fontSize:"0.85rem",flexShrink:0},children:fe(l)}),e.jsx("div",{children:e.jsx("strong",{children:l})})]})},{key:"email",label:t.customers.columns.email},{key:"phone",label:"Telefon",render:l=>l||"-"},{key:"company",label:"Spolecnost",render:l=>l||"-"},{key:"status",label:"Stav",render:l=>e.jsx(Y,{variant:tr(l),children:er(l)})},{key:"createdAt",label:t.customers.columns.registered,render:l=>K(l)}],o=[{icon:"eye",href:l=>\`/admin/customers/detail?id=\${l.id}\`,title:"Detail"}],c=[{name:"status",options:Qt,value:n,placeholder:"Vsechny stavy"}];return e.jsx(Z,{title:t.customers.heading,activePage:"customers",children:e.jsx(se,{columns:i,rows:a,actions:o,filters:c,emptyMessage:t.customers.empty})})}const ar=\`
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
\`,sr=\`{
  "mcpServers": {
    "typeforge": {
      "command": "npx",
      "args": ["-y", "typeforge-mcp"],
      "env": {
        "TYPEFORGE_API_TOKEN": "your-api-token"
      }
    }
  }
}\`,ir=[{icon:"robot",title:"AI Asistent",desc:"Integrovaný AI asistent pro rychlejší vývoj a automatizaci."},{icon:"code-slash",title:"TypeScript nativně",desc:"Plná podpora TypeScriptu s kompilací do Lua pro maximální výkon."},{icon:"cloud-arrow-up",title:"Serverless deploy",desc:"Nasazení jedním příkazem bez správy infrastruktury."},{icon:"database",title:"Databáze & cache",desc:"PostgreSQL, Redis a vestavěná cache k dispozici okamžitě."},{icon:"diagram-3",title:"MCP Connector",desc:"Propojte svůj projekt s AI agenty přes standardní MCP protokol."},{icon:"share",title:"API & Integrace",desc:"REST API, JWT autentizace, email, PDF a další služby v základu."}],nr=[{title:"Vytvořte projekt",desc:"Inicializujte nový TypeForge projekt a nakonfigurujte služby."},{title:"Napište kód",desc:"Vyvíjejte v TypeScriptu s podporou AI asistenta a hot-reload."},{title:"Nasadte",desc:"Jedním příkazem nasaďte na serverless infrastrukturu."}],or=[{name:"Claude Code",icon:"terminal"},{name:"Cursor",icon:"cursor"},{name:"Windsurf",icon:"wind"},{name:"Cline",icon:"braces"}];function lr({userName:r}){const{toggleTheme:n}=q(),t=C("shop");return e.jsxs("div",{style:{background:"var(--tf-bg)",color:"var(--tf-text)",minHeight:"100vh"},children:[e.jsx("style",{children:ar}),e.jsx("nav",{className:"landing-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/#connector",className:"nav-link d-none d-md-inline",children:"MCP Connector"}),e.jsx("a",{href:"/#features",className:"nav-link d-none d-md-inline",children:"Features"}),e.jsx("a",{href:"/#how-it-works",className:"nav-link d-none d-md-inline",children:"Jak to funguje"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:t.nav.eshop}),e.jsx("a",{href:"/admin",className:"nav-link d-none d-md-inline",children:t.nav.admin}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:t.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),r?e.jsx("a",{href:"/logout",className:"btn-outline-tf btn-sm",children:"Odhlásit"}):e.jsx("a",{href:"/login",className:"btn-primary-tf btn-sm",children:"Přihlásit"})]})]})}),e.jsx("section",{className:"landing-hero",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"hero-badge",children:[e.jsx("i",{className:"bi bi-stars me-1"}),"Lorem ipsum dolor sit amet"]}),e.jsxs("h1",{className:"landing-hero-title",children:["Vytvářejte webové aplikace",e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:"rychleji než kdy dříve"})]}),e.jsx("p",{className:"landing-hero-subtitle",children:"TypeForge je moderní serverless framework pro TypeScript vývojáře. Kompilujte do Lua, nasazujte jedním příkazem a integrujte AI agenty."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"/register",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Začít zdarma"]}),e.jsxs("a",{href:"/#features",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-play-circle me-2"}),"Zjistit více"]})]}),e.jsxs("div",{className:"landing-prompt-box",children:[e.jsx("i",{className:"bi bi-chevron-right",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"npx create-typeforge-app my-project"}),e.jsx("span",{className:"cursor-blink"})]})]})}),e.jsx("section",{className:"landing-connector",id:"connector",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row align-items-center g-5",children:[e.jsxs("div",{className:"col-lg-6",children:[e.jsxs("div",{className:"section-label",children:[e.jsx("i",{className:"bi bi-plug"}),"MCP Connector"]}),e.jsx("h2",{className:"fw-bold mb-3",children:"Propojte svůj projekt s AI agenty"}),e.jsx("p",{className:"text-muted-tf mb-4",children:"Standardní Model Context Protocol umožňuje AI agentům pracovat s vaším projektem, spravovat databázi, nasazovat změny a mnohem více."}),e.jsx("div",{className:"d-flex flex-wrap gap-2",children:or.map(a=>e.jsxs("span",{className:"agent-badge",children:[e.jsx("i",{className:\`bi bi-\${a.icon}\`}),a.name]},a.name))})]}),e.jsx("div",{className:"col-lg-6",children:e.jsx("div",{className:"landing-code-block",children:e.jsx("pre",{children:sr})})})]})})}),e.jsx("section",{className:"landing-features",id:"features",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center mb-5",children:[e.jsxs("div",{className:"section-label justify-content-center",children:[e.jsx("i",{className:"bi bi-grid"}),"Features"]}),e.jsx("h2",{className:"fw-bold",children:"Vše co potřebujete"}),e.jsx("p",{className:"text-muted-tf",children:"Kompletní sada nástrojů pro moderní webový vývoj."})]}),e.jsx("div",{className:"row g-4",children:ir.map(a=>e.jsx("div",{className:"col-md-6 col-lg-4",children:e.jsxs("div",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:e.jsx("i",{className:\`bi bi-\${a.icon}\`})}),e.jsx("h5",{children:a.title}),e.jsx("p",{children:a.desc})]})},a.icon))})]})}),e.jsx("section",{className:"landing-how-it-works",id:"how-it-works",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"text-center mb-5",children:[e.jsxs("div",{className:"section-label justify-content-center",children:[e.jsx("i",{className:"bi bi-list-ol"}),"Jak to funguje"]}),e.jsx("h2",{className:"fw-bold",children:"Tři jednoduché kroky"})]}),e.jsx("div",{className:"row g-4",children:nr.map((a,i)=>e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"step-card",children:[e.jsx("div",{className:"step-number",children:i+1}),e.jsx("h5",{children:a.title}),e.jsx("p",{children:a.desc})]})},i))})]})}),e.jsx("section",{className:"container",children:e.jsxs("div",{className:"landing-cta",children:[e.jsx("h2",{children:"Připraveni začít?"}),e.jsx("p",{children:"Vytvořte si účet zdarma a začněte stavět během pár minut."}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"/register",className:"btn-primary-tf",style:{background:"#fff",color:"var(--tf-primary)"},children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Začít zdarma"]}),e.jsx("a",{href:"/blog",className:"btn-outline-tf",style:{borderColor:"rgba(255,255,255,0.3)",color:"#fff"},children:"Přečíst blog"})]})]})}),e.jsx("footer",{className:"landing-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const cr=\`
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
\`;function dr({error:r,emailValue:n}){const{toggleTheme:t}=q(),a=C("auth");return e.jsxs("div",{className:"login-wrapper",style:{position:"relative"},children:[e.jsx("style",{children:cr}),e.jsx("div",{className:"login-theme-toggle",children:e.jsxs("button",{className:"btn-theme-toggle",onClick:t,title:a.nav.toggleTheme,style:{width:36,height:36,fontSize:"1rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}),e.jsxs("div",{className:"login-card",children:[e.jsx("div",{className:"login-brand",children:e.jsxs("a",{href:"/",className:"text-decoration-none",children:[e.jsx("div",{className:"brand-icon",children:e.jsx("i",{className:"bi bi-shield-lock"})}),e.jsx("h4",{children:a.headings.login}),e.jsx("p",{children:a.headings.loginSubtitle})]})}),r&&e.jsxs("div",{className:"alert alert-danger d-flex align-items-center gap-2",style:{borderRadius:8,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-exclamation-triangle"}),r]}),e.jsxs("form",{method:"post",action:"/login",className:"login-form",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:a.form.email}),e.jsx("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"vas@email.cz",defaultValue:n||"",required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"password",children:a.form.password}),e.jsx("input",{type:"password",className:"form-control",id:"password",name:"password",placeholder:"Vaše heslo",required:!0})]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf w-100",style:{padding:"0.65rem",fontSize:"0.95rem"},children:[e.jsx("i",{className:"bi bi-box-arrow-in-right me-2"}),a.actions.login]})]}),e.jsx("div",{className:"login-divider",children:a.links.or}),e.jsxs("div",{className:"login-link",children:[a.links.noAccount," ",e.jsx("a",{href:"/register",children:a.links.registerLink})]})]})]})}const mr=\`
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
\`;function ur(r){if(!r)return 0;let n=0;return r.length>=6&&n++,r.length>=10&&n++,/[A-Z]/.test(r)&&/[a-z]/.test(r)&&n++,(/[0-9]/.test(r)||/[^A-Za-z0-9]/.test(r))&&n++,n}function pr({error:r,values:n={}}){const{toggleTheme:t}=q(),a=C("auth"),[i,o]=I.useState(""),c=ur(i);return e.jsxs("div",{className:"register-wrapper",style:{position:"relative"},children:[e.jsx("style",{children:mr}),e.jsx("div",{className:"register-theme-toggle",children:e.jsxs("button",{className:"btn-theme-toggle",onClick:t,title:a.nav.toggleTheme,style:{width:36,height:36,fontSize:"1rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})}),e.jsxs("div",{className:"register-card",children:[e.jsx("div",{className:"register-brand",children:e.jsxs("a",{href:"/",className:"text-decoration-none",children:[e.jsx("div",{className:"brand-icon",children:e.jsx("i",{className:"bi bi-person-plus"})}),e.jsx("h4",{children:a.headings.register}),e.jsx("p",{children:a.headings.registerSubtitle})]})}),r&&e.jsxs("div",{className:"alert alert-danger d-flex align-items-center gap-2",style:{borderRadius:8,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-exclamation-triangle"}),r]}),e.jsxs("form",{method:"post",action:"/register",className:"register-form",children:[e.jsxs("div",{className:"row g-3 mb-3",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("label",{className:"form-label",htmlFor:"firstName",children:a.form.firstName}),e.jsx("input",{type:"text",className:"form-control",id:"firstName",name:"firstName",placeholder:"Jan",defaultValue:n.firstName||"",required:!0,autoFocus:!0})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("label",{className:"form-label",htmlFor:"lastName",children:a.form.lastName}),e.jsx("input",{type:"text",className:"form-control",id:"lastName",name:"lastName",placeholder:"Novák",defaultValue:n.lastName||"",required:!0})]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:a.form.email}),e.jsx("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"vas@email.cz",defaultValue:n.email||"",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"password",children:a.form.password}),e.jsx("input",{type:"password",className:"form-control",id:"password",name:"password",placeholder:"Min. 6 znaků",required:!0,onChange:l=>o(l.target.value)}),e.jsx("div",{className:"password-strength",children:[1,2,3,4].map(l=>e.jsx("div",{className:\`bar\${c>=l?\` active-\${l}\`:""}\`},l))})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{className:"form-label",htmlFor:"passwordConfirm",children:a.form.confirmPassword}),e.jsx("input",{type:"password",className:"form-control",id:"passwordConfirm",name:"passwordConfirm",placeholder:"Zopakujte heslo",required:!0})]}),e.jsxs("div",{className:"mb-3 form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"terms",name:"terms",required:!0}),e.jsxs("label",{className:"form-check-label",htmlFor:"terms",children:["Souhlasím s ",e.jsx("a",{href:"/terms",children:a.links.terms})," a ",e.jsx("a",{href:"/privacy",children:a.links.privacy})]})]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf w-100",style:{padding:"0.65rem",fontSize:"0.95rem"},children:[e.jsx("i",{className:"bi bi-person-plus me-2"}),a.actions.register]})]}),e.jsx("div",{className:"register-divider",children:a.links.or}),e.jsxs("div",{className:"register-link",children:[a.links.hasAccount," ",e.jsx("a",{href:"/login",children:a.links.loginLink})]})]})]})}const hr=\`
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
\`;function fr({products:r,categories:n}){const{toggleTheme:t}=q(),a=C("shop");return e.jsxs("div",{className:"eshop-page",children:[e.jsx("style",{children:hr}),e.jsx("nav",{className:"shop-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:a.nav.home}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",style:{color:"var(--tf-text)"},children:a.nav.eshop}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:t,title:a.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"cart-badge-link text-decoration-none",children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("section",{className:"eshop-hero",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"eshop-badge",children:[e.jsx("i",{className:"bi bi-stars me-1"}),a.hero.badge]}),e.jsxs("h1",{children:[a.hero.titleLine1,e.jsx("br",{}),e.jsx("span",{className:"text-gradient",children:a.hero.titleLine2})]}),e.jsx("p",{children:a.hero.subtitle}),e.jsxs("div",{className:"d-flex gap-3 justify-content-center",children:[e.jsxs("a",{href:"#products",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),a.hero.shopNow]}),e.jsxs("a",{href:"#categories",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-grid me-2"}),a.hero.categories]})]})]})}),e.jsx("div",{className:"features-bar",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-3",children:[e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-truck"}),e.jsx("span",{children:a.features.freeShipping})]})}),e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:a.features.warranty})]})}),e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-arrow-return-left"}),e.jsx("span",{children:a.features.returnPolicy})]})}),e.jsx("div",{className:"col-6 col-lg-3",children:e.jsxs("div",{className:"feature-item",children:[e.jsx("i",{className:"bi bi-headset"}),e.jsx("span",{children:a.features.support})]})})]})})}),n.length>0&&e.jsxs("section",{className:"container mb-5",id:"categories",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-between mb-4",children:e.jsx("h3",{className:"fw-bold mb-0",children:a.sections.categories})}),e.jsx("div",{className:"row g-3",children:n.map(i=>e.jsx("div",{className:"col-6 col-md-4 col-lg-3",children:e.jsxs("a",{href:\`/category?slug=\${i.slug}\`,className:"category-card",children:[e.jsx("div",{className:"cat-icon",children:i.featuredImage?e.jsx("img",{src:i.featuredImage,alt:i.name}):e.jsx("i",{className:\`bi bi-\${i.icon||"grid"}\`})}),e.jsx("h6",{children:i.name}),e.jsxs("div",{className:"cat-count",children:[i.productCount," ",a.category.totalProducts]})]})},i.id))})]}),e.jsxs("section",{className:"container pb-5",id:"products",children:[e.jsxs("div",{className:"d-flex align-items-center justify-content-between mb-4",children:[e.jsx("h3",{className:"fw-bold mb-0",children:a.headings.allProducts}),e.jsxs("span",{className:"text-muted-tf",style:{fontSize:"0.9rem"},children:[r.length," ",a.category.totalProducts]})]}),r.length===0?e.jsxs("div",{className:"text-center py-5",children:[e.jsx("i",{className:"bi bi-bag-x",style:{fontSize:"3rem",color:"var(--tf-text-muted)"}}),e.jsx("p",{className:"text-muted-tf mt-3",children:a.empty.noProducts})]}):e.jsx("div",{className:"row g-4",children:r.map(i=>e.jsx("div",{className:"col-md-6 col-lg-3",children:e.jsxs("div",{className:"eshop-product-card",children:[e.jsx("a",{href:\`/product?slug=\${i.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"product-img",children:i.featuredImage?e.jsx("img",{src:i.featuredImage,alt:i.name}):e.jsx("i",{className:\`bi bi-\${i.icon||"box"}\`})})}),e.jsxs("div",{className:"product-body",children:[i.categoryName&&e.jsx("div",{className:"product-category-label",children:i.categoryName}),e.jsx("div",{className:"product-title",children:e.jsx("a",{href:\`/product?slug=\${i.slug}\`,children:i.name})}),e.jsxs("div",{className:"product-price-row",children:[e.jsx("span",{className:"price-current",children:S(Number(i.price))}),i.oldPrice&&e.jsx("span",{className:"price-old",children:S(Number(i.oldPrice))}),e.jsx("form",{method:"post",action:\`/cart/add?productId=\${i.id}&quantity=1\`,style:{display:"inline",marginLeft:"auto"},children:e.jsx("button",{type:"submit",className:"btn-add-cart",title:a.product.addToCart,children:e.jsx("i",{className:"bi bi-cart-plus"})})})]})]})]})},i.id))})]}),e.jsx("section",{className:"newsletter-section",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"newsletter-box",children:[e.jsx("i",{className:"bi bi-envelope",style:{fontSize:"2rem",color:"var(--tf-primary)",marginBottom:"0.75rem",display:"block"}}),e.jsx("h4",{children:a.newsletter.title}),e.jsx("p",{children:a.newsletter.subtitle}),e.jsxs("div",{className:"newsletter-input-group",children:[e.jsx("input",{type:"email",placeholder:a.newsletter.placeholder}),e.jsx("button",{className:"btn-primary-tf",children:a.newsletter.subscribe})]})]})})}),e.jsx("footer",{className:"eshop-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const xr=\`
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
\`;function br({product:r,galleryImages:n=[]}){const{toggleTheme:t}=q(),a=C("shop"),[i,o]=I.useState(1),[c,l]=I.useState(0),m=[];r.featuredImage&&m.push(r.featuredImage),n.forEach(g=>{g.url&&m.push(g.url)});const h=Number(r.price),u=r.oldPrice?Number(r.oldPrice):null,k=u&&u>h?Math.round((u-h)/u*100):null,E=Number(r.stock);return e.jsxs("div",{className:"product-page",children:[e.jsx("style",{children:xr}),e.jsx("nav",{className:"product-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:a.nav.eshop}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:t,title:a.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem"},children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("div",{className:"product-breadcrumb",children:e.jsx("div",{className:"container",children:e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/eshop",children:a.breadcrumb.eshop})}),r.categoryName&&e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:\`/category?slug=\${r.categorySlug||""}\`,children:r.categoryName})}),e.jsx("li",{className:"breadcrumb-item active",children:r.name})]})})})}),e.jsx("section",{className:"container pb-4",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-6",children:e.jsxs("div",{className:"product-gallery",children:[e.jsx("div",{className:"main-image",children:m.length>0?e.jsx("img",{src:m[c],alt:r.name}):e.jsx("i",{className:\`bi bi-\${r.icon||"box"} placeholder-icon\`})}),m.length>1&&e.jsx("div",{className:"thumbnails",children:m.map((g,A)=>e.jsx("div",{className:\`thumb\${A===c?" active":""}\`,onClick:()=>l(A),children:e.jsx("img",{src:g,alt:\`\${r.name} \${A+1}\`})},A))})]})}),e.jsx("div",{className:"col-lg-6",children:e.jsxs("div",{className:"product-info",children:[r.categoryName&&e.jsx("div",{className:"category-label",children:e.jsx("a",{href:\`/category?slug=\${r.categorySlug||""}\`,children:r.categoryName})}),e.jsx("h1",{children:r.name}),e.jsxs("div",{className:"price-row",children:[e.jsx("span",{className:"price-current",children:S(h)}),u&&e.jsx("span",{className:"price-old",children:S(u)}),k&&e.jsxs("span",{className:"price-discount",children:["-",k,"%"]})]}),r.shortDescription&&e.jsx("p",{className:"short-desc",children:r.shortDescription}),e.jsxs("form",{method:"post",action:\`/cart/add?productId=\${r.id}&quantity=\${i}\`,children:[e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("div",{className:"qty-selector",children:[e.jsx("button",{type:"button",onClick:()=>o(Math.max(1,i-1)),children:e.jsx("i",{className:"bi bi-dash"})}),e.jsx("div",{className:"qty-value",children:i}),e.jsx("button",{type:"button",onClick:()=>o(i+1),children:e.jsx("i",{className:"bi bi-plus"})})]}),e.jsx("input",{type:"hidden",name:"quantity",value:i})]}),e.jsxs("div",{className:"product-actions",children:[e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem",flex:1},children:[e.jsx("i",{className:"bi bi-cart-plus me-2"}),a.product.addToCart]}),e.jsx("button",{type:"button",className:"btn-wishlist",title:"Přidat do oblíbených",children:e.jsx("i",{className:"bi bi-heart"})})]})]}),e.jsxs("div",{className:"product-meta",children:[e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-truck"}),e.jsx("span",{children:a.product.freeShipping})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-box-seam"}),e.jsx("span",{children:E>0?\`\${a.product.inStock} (\${r.stock} ks)\`:a.product.outOfStock})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-shield-check"}),e.jsx("span",{children:a.product.warranty})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-arrow-return-left"}),e.jsx("span",{children:a.product.returnPolicy})]})]})]})})]})}),r.description&&e.jsx("section",{className:"product-description",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"desc-card",children:[e.jsx("h3",{children:a.product.description}),e.jsx("div",{className:"desc-content",dangerouslySetInnerHTML:{__html:r.description}})]})})}),e.jsx("footer",{className:"product-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const gr=\`
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
\`;function vr({title:r,category:n,products:t}){const{toggleTheme:a}=q(),i=C("shop");return e.jsxs("div",{className:"category-page",children:[e.jsx("style",{children:gr}),e.jsx("nav",{className:"cat-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:i.nav.eshop}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:a,title:i.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsx("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem"},children:e.jsx("i",{className:"bi bi-cart3"})})]})]})}),e.jsx("div",{className:"cat-breadcrumb",children:e.jsx("div",{className:"container",children:e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/eshop",children:i.breadcrumb.eshop})}),e.jsx("li",{className:"breadcrumb-item active",children:(n==null?void 0:n.name)||r})]})})})}),e.jsx("section",{className:"container",children:e.jsx("div",{className:"cat-header",children:e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[((n==null?void 0:n.icon)||(n==null?void 0:n.featuredImage))&&e.jsx("div",{className:"cat-icon-lg",children:n!=null&&n.featuredImage?e.jsx("img",{src:n.featuredImage,alt:(n==null?void 0:n.name)||r}):e.jsx("i",{className:\`bi bi-\${(n==null?void 0:n.icon)||"grid"}\`})}),e.jsxs("div",{children:[e.jsx("h1",{children:(n==null?void 0:n.name)||r}),(n==null?void 0:n.description)&&e.jsx("p",{children:n.description})]})]})})}),e.jsx("section",{className:"container",children:e.jsx("div",{className:"cat-sort-bar",children:e.jsxs("span",{className:"product-count",children:[t.length," ",i.category.totalProducts]})})}),e.jsx("section",{className:"container pb-5",children:t.length===0?e.jsxs("div",{className:"cat-empty",children:[e.jsx("i",{className:"bi bi-inbox"}),e.jsx("p",{children:i.category.noProducts}),e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),i.category.backToEshop]})]}):e.jsx("div",{className:"row g-4",children:t.map(o=>e.jsx("div",{className:"col-md-6 col-lg-4",children:e.jsxs("div",{className:"cat-product-card",children:[e.jsx("a",{href:\`/product?slug=\${o.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"img-wrap",children:o.featuredImage?e.jsx("img",{src:o.featuredImage,alt:o.name}):e.jsx("i",{className:\`bi bi-\${o.icon||"box"}\`})})}),e.jsxs("div",{className:"card-body",children:[o.categoryName&&e.jsx("div",{className:"cat-label",children:o.categoryName}),e.jsx("h5",{children:e.jsx("a",{href:\`/product?slug=\${o.slug}\`,children:o.name})}),o.shortDescription&&e.jsx("p",{className:"desc",children:o.shortDescription}),e.jsxs("div",{className:"price-row",children:[e.jsx("span",{className:"price-current",children:S(Number(o.price))}),o.oldPrice&&e.jsx("span",{className:"price-old",children:S(Number(o.oldPrice))}),e.jsx("form",{method:"post",action:\`/cart/add?productId=\${o.id}&quantity=1\`,style:{display:"inline",marginLeft:"auto"},children:e.jsx("button",{type:"submit",className:"btn-add",title:i.product.addToCart,children:e.jsx("i",{className:"bi bi-cart-plus"})})})]})]})]})},o.id))})}),e.jsx("footer",{className:"cat-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const jr=\`
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
\`;function yr({items:r}){const{toggleTheme:n}=q(),t=C("cart"),a=r.reduce((o,c)=>o+Number(c.quantity),0),i=r.reduce((o,c)=>o+Number(c.productPrice)*Number(c.quantity),0);return e.jsxs("div",{className:"cart-page",children:[e.jsx("style",{children:jr}),e.jsx("nav",{className:"cart-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:t.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]}),e.jsxs("a",{href:"/cart",className:"text-decoration-none",style:{color:"var(--tf-text)",fontSize:"1.2rem",position:"relative"},children:[e.jsx("i",{className:"bi bi-cart3"}),a>0&&e.jsx("span",{className:"cart-count-badge",children:a})]})]})]})}),e.jsx("div",{className:"cart-content",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"cart-header",children:[e.jsxs("h1",{children:[e.jsx("i",{className:"bi bi-cart3 me-3"}),t.headings.cart]}),e.jsxs("span",{className:"item-count",children:[a," položek"]})]}),r.length===0?e.jsxs("div",{className:"cart-empty",children:[e.jsx("i",{className:"bi bi-cart-x"}),e.jsx("h4",{children:"Váš košík je prázdný"}),e.jsx("p",{children:"Podívejte se na naše produkty a začněte nakupovat."}),e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),"Přejít na E-Shop"]})]}):e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:r.map((o,c)=>{const l=Number(o.productPrice),m=Number(o.quantity),h=l*m;return e.jsxs("div",{className:"cart-item",children:[e.jsx("div",{className:"item-img",children:o.productFeaturedImage?e.jsx("img",{src:o.productFeaturedImage,alt:o.productName}):e.jsx("i",{className:\`bi bi-\${o.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-details",children:[o.categoryName&&e.jsx("div",{className:"category-sm",children:o.categoryName}),e.jsx("h6",{children:o.productName}),e.jsxs("div",{className:"unit-price",children:[S(l)," / ks"]})]}),e.jsxs("div",{className:"item-qty",children:[e.jsx("form",{method:"post",action:\`/cart/update?productId=\${o.productId}&quantity=\${Math.max(1,m-1)}\`,style:{display:"inline"},children:e.jsx("button",{type:"submit",children:e.jsx("i",{className:"bi bi-dash"})})}),e.jsx("div",{className:"qty-val",children:m}),e.jsx("form",{method:"post",action:\`/cart/update?productId=\${o.productId}&quantity=\${m+1}\`,style:{display:"inline"},children:e.jsx("button",{type:"submit",children:e.jsx("i",{className:"bi bi-plus"})})})]}),e.jsx("div",{className:"item-total",children:S(h)}),e.jsx("a",{href:\`/cart/remove?productId=\${o.productId}\`,className:"item-remove",title:"Odebrat",children:e.jsx("i",{className:"bi bi-trash3"})})]},c)})}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"cart-summary",children:[e.jsx("h5",{children:t.headings.orderSummary}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"label",children:t.summary.subtotal}),e.jsx("span",{children:S(i)})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"label",children:t.summary.shipping}),e.jsx("span",{style:{color:"#22c55e"},children:t.summary.free})]}),e.jsxs("div",{className:"summary-total",children:[e.jsx("span",{children:t.summary.total}),e.jsx("span",{children:S(i)})]}),e.jsxs("div",{className:"summary-actions",children:[e.jsxs("a",{href:"/checkout",className:"btn-primary-tf w-100 text-center",style:{padding:"0.7rem"},children:[e.jsx("i",{className:"bi bi-lock me-2"}),t.actions.checkout]}),e.jsxs("a",{href:"/eshop",className:"continue-link",children:[e.jsx("i",{className:"bi bi-arrow-left me-1"}),t.actions.continueShopping]})]})]})})]})]})}),e.jsx("footer",{className:"cart-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Nr=\`
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
\`;function kr({items:r}){var h;const{toggleTheme:n}=q(),t=C("cart"),[a,i]=I.useState("standard"),o=[{id:"standard",name:t.checkout.shipping.standardDelivery,desc:t.checkout.shipping.standardDeliveryDesc,price:0},{id:"express",name:t.checkout.shipping.expressDelivery,desc:t.checkout.shipping.expressDeliveryDesc,price:99},{id:"pickup",name:t.checkout.shipping.personalPickup,desc:t.checkout.shipping.personalPickupDesc,price:0}],c=r.reduce((u,k)=>u+Number(k.productPrice)*Number(k.quantity),0),l=((h=o.find(u=>u.id===a))==null?void 0:h.price)||0,m=c+l;return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:Nr}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),t.checkout.secureCheckout]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:t.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"1"}),e.jsx("span",{children:t.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"2"}),e.jsx("span",{children:t.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:t.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:t.checkout.steps.done})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs("form",{method:"post",action:"/checkout/payment",children:[e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-person"}),t.checkout.shipping.contactInfo]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"firstName",children:t.checkout.shipping.firstName}),e.jsx("input",{type:"text",className:"form-control",id:"firstName",name:"firstName",placeholder:"Jan",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"lastName",children:t.checkout.shipping.lastName}),e.jsx("input",{type:"text",className:"form-control",id:"lastName",name:"lastName",placeholder:"Novák",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"email",children:t.checkout.shipping.email}),e.jsx("input",{type:"email",className:"form-control",id:"email",name:"email",placeholder:"vas@email.cz",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"phone",children:t.checkout.shipping.phone}),e.jsx("input",{type:"tel",className:"form-control",id:"phone",name:"phone",placeholder:"+420 123 456 789"})]})]})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-geo-alt"}),t.checkout.shipping.deliveryAddress]}),e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label",htmlFor:"street",children:t.checkout.shipping.street}),e.jsx("input",{type:"text",className:"form-control",id:"street",name:"street",placeholder:"Hlavní 123",required:!0})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"city",children:t.checkout.shipping.city}),e.jsx("input",{type:"text",className:"form-control",id:"city",name:"city",placeholder:"Praha",required:!0})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"zip",children:t.checkout.shipping.zip}),e.jsx("input",{type:"text",className:"form-control",id:"zip",name:"zip",placeholder:"110 00",required:!0})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"country",children:t.checkout.shipping.country}),e.jsxs("select",{className:"form-select",id:"country",name:"country",children:[e.jsx("option",{value:"CZ",children:t.checkout.shipping.countryCZ}),e.jsx("option",{value:"SK",children:t.checkout.shipping.countrySK}),e.jsx("option",{value:"DE",children:"Německo"}),e.jsx("option",{value:"AT",children:"Rakousko"}),e.jsx("option",{value:"PL",children:"Polsko"})]})]})]})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-truck"}),t.checkout.shipping.deliveryMethod]}),o.map(u=>e.jsxs("div",{className:\`shipping-option\${a===u.id?" selected":""}\`,onClick:()=>i(u.id),children:[e.jsx("div",{className:"option-radio"}),e.jsxs("div",{className:"option-info",children:[e.jsx("div",{className:"name",children:u.name}),e.jsx("div",{className:"desc",children:u.desc})]}),e.jsx("div",{className:"option-price",children:u.price===0?e.jsx("span",{style:{color:"#22c55e"},children:t.summary.free}):S(u.price)})]},u.id)),e.jsx("input",{type:"hidden",name:"shippingMethod",value:a})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/cart",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),t.actions.backToCart]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[t.actions.continueToPayment,e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:t.headings.yourOrder}),r.map((u,k)=>e.jsxs("div",{className:"summary-item",children:[e.jsx("div",{className:"item-thumb",children:u.productFeaturedImage?e.jsx("img",{src:u.productFeaturedImage,alt:u.productName}):e.jsx("i",{className:\`bi bi-\${u.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:u.productName}),e.jsxs("div",{className:"qty",children:[u.quantity,"x"]})]}),e.jsx("div",{className:"item-price",children:S(Number(u.productPrice)*Number(u.quantity))})]},k)),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:t.summary.subtotal}),e.jsx("span",{children:S(c)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:t.summary.shipping}),e.jsx("span",{children:l===0?t.summary.free:S(l)})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:t.summary.total}),e.jsx("span",{children:S(m)})]})]})]})})]})})})]})}const wr=\`
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
\`;function zr({items:r}){const{toggleTheme:n}=q(),t=C("cart"),[a,i]=I.useState("card"),[o,c]=I.useState(!0),l=[{id:"card",name:t.checkout.payment.card,desc:t.checkout.payment.cardDesc,icon:"credit-card"},{id:"bank",name:t.checkout.payment.bankTransfer,desc:t.checkout.payment.bankTransferDesc,icon:"bank"},{id:"cod",name:t.checkout.payment.cod,desc:t.checkout.payment.codDesc,icon:"cash-coin"},{id:"paypal",name:t.checkout.payment.paypal,desc:t.checkout.payment.paypalDesc,icon:"paypal"}],m=r.reduce((h,u)=>h+Number(u.productPrice)*Number(u.quantity),0);return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:wr}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),t.checkout.secureCheckout]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:t.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:t.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"2"}),e.jsx("span",{children:t.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:t.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:t.checkout.steps.done})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-4",children:[e.jsx("div",{className:"col-lg-8",children:e.jsxs("form",{method:"post",action:"/checkout/review",children:[e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-credit-card"}),t.checkout.payment.selectMethod]}),l.map(h=>e.jsxs("div",{className:\`payment-option\${a===h.id?" selected":""}\`,onClick:()=>i(h.id),children:[e.jsx("div",{className:"option-radio"}),e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:\`bi bi-\${h.icon}\`})}),e.jsxs("div",{className:"option-info",children:[e.jsx("div",{className:"name",children:h.name}),e.jsx("div",{className:"desc",children:h.desc})]})]},h.id)),e.jsx("input",{type:"hidden",name:"paymentMethod",value:a}),a==="card"&&e.jsx("div",{className:"card-form",children:e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label",htmlFor:"cardNumber",children:t.checkout.payment.cardNumber}),e.jsx("input",{type:"text",className:"form-control",id:"cardNumber",name:"cardNumber",placeholder:"1234 5678 9012 3456"})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"form-label",htmlFor:"cardExpiry",children:t.checkout.payment.cardExpiry}),e.jsx("input",{type:"text",className:"form-control",id:"cardExpiry",name:"cardExpiry",placeholder:"MM/RR"})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"form-label",htmlFor:"cardCvv",children:t.checkout.payment.cardCvv}),e.jsx("input",{type:"text",className:"form-control",id:"cardCvv",name:"cardCvv",placeholder:"123"})]}),e.jsxs("div",{className:"col-md-4",children:[e.jsx("label",{className:"form-label",htmlFor:"cardName",children:t.checkout.payment.cardName}),e.jsx("input",{type:"text",className:"form-control",id:"cardName",name:"cardName",placeholder:"Jan Novák"})]})]})})]}),e.jsxs("div",{className:"checkout-section",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-receipt"}),t.checkout.payment.billingInfo]}),e.jsxs("div",{className:"billing-toggle",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:"sameAsBilling",checked:o,onChange:h=>c(h.target.checked)}),e.jsx("label",{className:"form-check-label",htmlFor:"sameAsBilling",style:{color:"var(--tf-text)",fontSize:"0.9rem"},children:t.checkout.payment.sameAsShipping})]}),!o&&e.jsxs("div",{className:"row g-3 mt-1",children:[e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"company",children:t.checkout.payment.companyName}),e.jsx("input",{type:"text",className:"form-control",id:"company",name:"company",placeholder:"Název firmy"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"ico",children:t.checkout.payment.ico}),e.jsx("input",{type:"text",className:"form-control",id:"ico",name:"ico",placeholder:"12345678"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"dic",children:t.checkout.payment.dic}),e.jsx("input",{type:"text",className:"form-control",id:"dic",name:"dic",placeholder:"CZ12345678"})]}),e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label",htmlFor:"billingStreet",children:"Ulice a číslo popisné"}),e.jsx("input",{type:"text",className:"form-control",id:"billingStreet",name:"billingStreet",placeholder:"Hlavní 123"})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{className:"form-label",htmlFor:"billingCity",children:"Město"}),e.jsx("input",{type:"text",className:"form-control",id:"billingCity",name:"billingCity",placeholder:"Praha"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"billingZip",children:"PSČ"}),e.jsx("input",{type:"text",className:"form-control",id:"billingZip",name:"billingZip",placeholder:"110 00"})]}),e.jsxs("div",{className:"col-md-3",children:[e.jsx("label",{className:"form-label",htmlFor:"billingCountry",children:"Stát"}),e.jsxs("select",{className:"form-select",id:"billingCountry",name:"billingCountry",children:[e.jsx("option",{value:"CZ",children:"Česká republika"}),e.jsx("option",{value:"SK",children:"Slovensko"}),e.jsx("option",{value:"DE",children:"Německo"}),e.jsx("option",{value:"AT",children:"Rakousko"}),e.jsx("option",{value:"PL",children:"Polsko"})]})]})]})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/checkout",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),t.actions.backToShipping]}),e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[t.actions.reviewOrder,e.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]})}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:t.headings.yourOrder}),r.map((h,u)=>e.jsxs("div",{className:"summary-item",children:[e.jsx("div",{className:"item-thumb",children:h.productFeaturedImage?e.jsx("img",{src:h.productFeaturedImage,alt:h.productName}):e.jsx("i",{className:\`bi bi-\${h.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:h.productName}),e.jsxs("div",{className:"qty",children:[h.quantity,"x"]})]}),e.jsx("div",{className:"item-price",children:S(Number(h.productPrice)*Number(h.quantity))})]},u)),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:t.summary.subtotal}),e.jsx("span",{children:S(m)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:t.summary.shipping}),e.jsx("span",{style:{color:"#22c55e"},children:t.summary.free})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:t.summary.total}),e.jsx("span",{children:S(m)})]})]})]})})]})})})]})}const Sr=\`
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
\`;function Pr({items:r}){const{toggleTheme:n}=q(),t=C("cart"),a=r.reduce((i,o)=>i+Number(o.productPrice)*Number(o.quantity),0);return e.jsxs("div",{className:"checkout-page",children:[e.jsx("style",{children:Sr}),e.jsx("nav",{className:"checkout-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsxs("span",{className:"secure-label",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),t.checkout.secureCheckout]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:t.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:t.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:t.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step active",children:[e.jsx("div",{className:"step-num",children:"3"}),e.jsx("span",{children:t.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step",children:[e.jsx("div",{className:"step-num",children:"4"}),e.jsx("span",{children:t.checkout.steps.done})]})]})})}),e.jsx("div",{className:"checkout-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row g-4",children:[e.jsxs("div",{className:"col-lg-8",children:[e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-bag"}),t.checkout.review.orderItems]}),e.jsxs("a",{href:"/cart",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),t.checkout.review.edit]})]}),r.map((i,o)=>e.jsxs("div",{className:"review-item",children:[e.jsx("div",{className:"item-thumb",children:i.productFeaturedImage?e.jsx("img",{src:i.productFeaturedImage,alt:i.productName}):e.jsx("i",{className:\`bi bi-\${i.productIcon||"box"}\`})}),e.jsxs("div",{className:"item-info",children:[e.jsx("div",{className:"name",children:i.productName}),e.jsxs("div",{className:"qty",children:[i.quantity,"x ",S(Number(i.productPrice))]})]}),e.jsx("div",{className:"item-price",children:S(Number(i.productPrice)*Number(i.quantity))})]},o))]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-person"}),t.checkout.review.contactInfo]}),e.jsxs("a",{href:"/checkout",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),t.checkout.review.edit]})]}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Jméno"}),e.jsx("div",{className:"value",children:"Jan Novák"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"E-mail"}),e.jsx("div",{className:"value",children:"jan@email.cz"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Telefon"}),e.jsx("div",{className:"value",children:"+420 123 456 789"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"label",children:"Adresa"}),e.jsx("div",{className:"value",children:"Hlavní 123, Praha 110 00"})]})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-truck"}),t.checkout.review.deliveryMethod]}),e.jsxs("a",{href:"/checkout",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),t.checkout.review.edit]})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-truck",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"Standardní doprava (3-5 pracovních dní)"}),e.jsx("span",{className:"ms-auto fw-bold",style:{color:"#22c55e"},children:t.summary.free})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsxs("div",{className:"section-header",children:[e.jsxs("h5",{children:[e.jsx("i",{className:"bi bi-credit-card"}),t.checkout.review.paymentMethod]}),e.jsxs("a",{href:"/checkout/payment",className:"edit-link",children:[e.jsx("i",{className:"bi bi-pencil"}),t.checkout.review.edit]})]}),e.jsxs("div",{className:"d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-credit-card",style:{color:"var(--tf-primary)"}}),e.jsx("span",{children:"Platební karta (**** 3456)"})]})]}),e.jsxs("div",{className:"checkout-nav",children:[e.jsxs("a",{href:"/checkout/payment",className:"back-link",children:[e.jsx("i",{className:"bi bi-arrow-left"}),t.actions.backToPayment]}),e.jsx("form",{method:"post",action:"/checkout/confirm",style:{display:"inline"},children:e.jsxs("button",{type:"submit",className:"btn-primary-tf",style:{padding:"0.7rem 2rem"},children:[e.jsx("i",{className:"bi bi-check-circle me-2"}),t.actions.submitOrder]})})]}),e.jsxs("div",{className:"security-notice",children:[e.jsx("i",{className:"bi bi-shield-lock-fill"}),"Vaše data jsou chráněna šifrováním SSL a zpracovávána bezpečně."]})]}),e.jsx("div",{className:"col-lg-4",children:e.jsxs("div",{className:"order-summary-sidebar",children:[e.jsx("h5",{children:t.headings.orderSummary}),e.jsxs("div",{className:"summary-totals",children:[e.jsxs("div",{className:"row-total",children:[e.jsxs("span",{className:"label",children:[t.summary.subtotal," (",r.length,")"]}),e.jsx("span",{children:S(a)})]}),e.jsxs("div",{className:"row-total",children:[e.jsx("span",{className:"label",children:t.summary.shipping}),e.jsx("span",{style:{color:"#22c55e"},children:t.summary.free})]}),e.jsxs("div",{className:"grand-total",children:[e.jsx("span",{children:t.summary.total}),e.jsx("span",{children:S(a)})]})]})]})})]})})})]})}const Cr=\`
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
\`;function Tr(){const{toggleTheme:r}=q(),n=C("cart");return e.jsxs("div",{className:"confirmation-page",children:[e.jsx("style",{children:Cr}),e.jsx("nav",{className:"confirmation-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("button",{className:"btn-theme-toggle",onClick:r,title:n.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})}),e.jsx("div",{className:"checkout-progress",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"progress-steps",children:[e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:n.checkout.steps.shipping}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:n.checkout.steps.payment}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:n.checkout.steps.review}),e.jsx("div",{className:"step-line"})]}),e.jsxs("div",{className:"progress-step completed",children:[e.jsx("div",{className:"step-num",children:e.jsx("i",{className:"bi bi-check"})}),e.jsx("span",{children:n.checkout.steps.done})]})]})})}),e.jsx("div",{className:"confirmation-content",children:e.jsx("div",{className:"container",children:e.jsxs("div",{className:"confirmation-card",children:[e.jsx("div",{className:"confirmation-icon",children:e.jsx("i",{className:"bi bi-check-circle-fill"})}),e.jsx("h2",{children:n.headings.thankYou}),e.jsx("p",{className:"subtitle",children:n.checkout.confirmation.subtitle}),e.jsxs("div",{className:"confirmation-actions",children:[e.jsxs("a",{href:"/eshop",className:"btn-primary-tf",children:[e.jsx("i",{className:"bi bi-bag me-2"}),n.actions.continueShopping2]}),e.jsxs("a",{href:"/",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-house me-2"}),n.actions.goHome]})]})]})})}),e.jsx("footer",{className:"confirmation-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Ar=\`
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
\`;function _r({posts:r}){const{toggleTheme:n}=q(),t=C("blog");return e.jsxs("div",{className:"blog-list-page",children:[e.jsx("style",{children:Ar}),e.jsx("nav",{className:"blog-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:t.public.nav.home}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",style:{color:"var(--tf-text)"},children:"Blog"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:n,title:t.public.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("section",{className:"blog-header",children:e.jsxs("div",{className:"container",children:[e.jsxs("span",{className:"hero-badge",children:[e.jsx("i",{className:"bi bi-newspaper me-1"}),"Blog"]}),e.jsxs("h1",{children:[t.public.newsAndArticles," ",e.jsx("span",{className:"text-gradient",children:t.public.articles})]}),e.jsx("p",{children:t.public.subtitle})]})}),e.jsx("section",{className:"container",children:r.length===0?e.jsxs("div",{className:"blog-empty",children:[e.jsx("i",{className:"bi bi-journal-x"}),e.jsx("p",{children:t.empty.noArticlesYet})]}):e.jsx("div",{className:"blog-grid",children:r.map(a=>e.jsxs("div",{className:"blog-card",children:[e.jsx("a",{href:\`/article?slug=\${a.slug}\`,className:"text-decoration-none",children:e.jsx("div",{className:"card-img",children:a.featuredImage?e.jsx("img",{src:a.featuredImage,alt:a.title}):e.jsx("i",{className:"bi bi-file-earmark-text placeholder"})})}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"card-meta",children:[a.category&&e.jsx("span",{className:"category-badge",children:a.category}),e.jsx("span",{className:"date",children:K(a.createdAt)})]}),e.jsx("h5",{children:e.jsx("a",{href:\`/article?slug=\${a.slug}\`,children:a.title})}),a.excerpt&&e.jsx("p",{className:"excerpt",children:a.excerpt}),e.jsxs("div",{className:"card-footer-meta",children:[a.author?e.jsxs("span",{className:"author",children:[e.jsx("i",{className:"bi bi-person"}),a.author]}):e.jsx("span",{}),a.readTime?e.jsxs("span",{className:"read-time",children:[e.jsx("i",{className:"bi bi-clock"}),a.readTime]}):e.jsx("span",{})]})]})]},a.id))})}),e.jsx("footer",{className:"blog-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Or=\`
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
\`;function Ir({title:r,content:n,category:t,date:a,author:i,readTime:o,featuredImageUrl:c}){const{toggleTheme:l}=q(),m=C("blog");return e.jsxs("div",{className:"article-page",children:[e.jsx("style",{children:Or}),e.jsx("nav",{className:"article-navbar",children:e.jsxs("div",{className:"container d-flex align-items-center justify-content-between",children:[e.jsxs("a",{href:"/",className:"text-decoration-none d-flex align-items-center gap-2",children:[e.jsx("i",{className:"bi bi-braces-asterisk text-gradient"}),e.jsx("span",{className:"text-gradient fw-bold fs-5",children:"TypeForge"})]}),e.jsxs("div",{className:"d-flex align-items-center gap-3",children:[e.jsx("a",{href:"/",className:"nav-link d-none d-md-inline",children:m.public.nav.home}),e.jsx("a",{href:"/blog",className:"nav-link d-none d-md-inline",children:"Blog"}),e.jsx("a",{href:"/eshop",className:"nav-link d-none d-md-inline",children:"E-Shop"}),e.jsxs("button",{className:"btn-theme-toggle",onClick:l,title:m.public.nav.toggleTheme,style:{width:32,height:32,fontSize:"0.9rem"},children:[e.jsx("i",{className:"bi bi-moon"}),e.jsx("i",{className:"bi bi-sun"})]})]})]})}),e.jsx("header",{className:"article-header",children:e.jsxs("div",{className:"container",children:[t&&e.jsx("span",{className:"category-badge",children:t}),e.jsx("h1",{children:e.jsx("span",{className:"text-gradient",children:r})}),e.jsxs("div",{className:"article-meta",children:[a&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-calendar3"}),K(a)]}),i&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-person"}),i]}),o&&e.jsxs("span",{className:"meta-item",children:[e.jsx("i",{className:"bi bi-clock"}),o]})]})]})}),c&&e.jsx("div",{className:"article-featured-image",children:e.jsx("img",{src:c,alt:r})}),e.jsx("section",{className:"container",children:e.jsx("div",{className:"article-content-card",children:e.jsx("div",{className:"article-body",dangerouslySetInnerHTML:{__html:n}})})}),e.jsx("div",{className:"container text-center mb-4",children:e.jsxs("a",{href:"/blog",className:"btn-outline-tf",children:[e.jsx("i",{className:"bi bi-arrow-left me-2"}),m.actions.backToList]})}),e.jsx("footer",{className:"article-footer",children:e.jsx("div",{className:"container",children:e.jsxs("p",{children:["© ",new Date().getFullYear()," TypeForge. Všechna práva vyhrazena."]})})})]})}const Er={AdminDashboard:Mt,AdminAnalytics:qt,AdminProductList:Bt,AdminProductForm:Zt,AdminCategoryList:\$t,AdminCategoryForm:Ut,AdminOrderList:Wt,AdminOrderDetail:Yt,AdminOrderForm:Kt,AdminBlogList:Jt,AdminBlogForm:Ht,AdminMedia:Xt,AdminCustomerList:rr,Landing:lr,Login:dr,Register:pr,Eshop:fr,Product:br,Category:vr,Cart:yr,CheckoutShipping:kr,CheckoutPayment:zr,CheckoutReview:Pr,CheckoutConfirmation:Tr,BlogList:_r,Article:Ir};window.__REACT_RENDER__=(r,n,t)=>{const a=Er[r];if(!a){console.error(\`[TypeForge React] Unknown component: "\${r}"\`);return}const i=document.getElementById(t);if(!i){console.error(\`[TypeForge React] Container not found: "#\${t}"\`);return}mt.createRoot(i).render(e.jsx(ft,{children:e.jsx(a,{...n})}))}})(React,ReactDOM);
`;

export const REACT_BUNDLE_CSS = `.admin-wrapper{min-height:100vh;display:flex;max-width:100vw;overflow-x:hidden}.admin-sidebar{width:260px;flex-shrink:0;background:var(--tf-surface);border-right:1px solid var(--tf-border);position:fixed;top:0;left:0;height:100vh;padding:1.5rem;display:flex;flex-direction:column;z-index:1000}.admin-logo{display:flex;align-items:center;gap:.75rem;padding:.5rem 0 1.5rem;border-bottom:1px solid var(--tf-border);margin-bottom:1.5rem;text-decoration:none}.admin-logo i{font-size:1.5rem}.admin-logo span{font-weight:800;font-size:1.2rem}.admin-nav{flex:1;overflow-y:auto}.admin-nav-section{margin-bottom:1.5rem}.admin-nav-label{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--tf-text-muted);padding:0 .75rem;margin-bottom:.5rem}.admin-nav-item{display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:10px;color:var(--tf-text);text-decoration:none;transition:all .2s ease;margin-bottom:.25rem}.admin-nav-item:hover{background:#7c5cfc1a;color:var(--tf-primary-light)}.admin-nav-item.active{background:var(--tf-gradient);color:#fff}.admin-nav-item i{font-size:1.1rem;width:24px;text-align:center}.admin-nav-item span{font-weight:500;font-size:.95rem}.admin-nav-badge{margin-left:auto;padding:.2rem .5rem;border-radius:50px;font-size:.7rem;font-weight:700;background:var(--tf-accent);color:#0f0f17}.admin-user{padding-top:1rem;border-top:1px solid var(--tf-border);display:flex;align-items:center;gap:.75rem}.admin-user-avatar{width:40px;height:40px;border-radius:50%;background:var(--tf-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700}.admin-user-info{flex:1}.admin-user-name{font-weight:600;font-size:.9rem}.admin-user-role{font-size:.75rem;color:var(--tf-text-muted)}.admin-main{flex:1;min-width:0;margin-left:260px;padding:2rem;background:var(--tf-bg);overflow-x:hidden}.admin-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem}.admin-title{font-size:1.75rem;font-weight:800}.admin-header-actions{display:flex;align-items:center;gap:1rem}.admin-search{position:relative}.admin-search input{width:280px;padding:.6rem 1rem .6rem 2.5rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:10px;color:var(--tf-text);font-size:.9rem}.admin-search input:focus{border-color:var(--tf-primary);outline:none}.admin-search i{position:absolute;left:.85rem;top:50%;transform:translateY(-50%);color:var(--tf-text-muted)}.card-section{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:1.5rem;margin-bottom:1.5rem}.card-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.card-section-title{font-size:1.1rem;font-weight:700}.data-table{width:100%}.data-table th{text-align:left;padding:.75rem 1rem;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--tf-text-muted);border-bottom:1px solid var(--tf-border)}.data-table td{padding:1rem;font-size:.9rem;border-bottom:1px solid var(--tf-border);vertical-align:middle}.data-table tr:last-child td{border-bottom:none}.data-table tr:hover td{background:#7c5cfc08}.status-badge{display:inline-flex;padding:.3rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.status-badge.success{background:#06d6a026;color:var(--tf-accent)}.status-badge.warning{background:#fbbf2426;color:#fbbf24}.status-badge.info{background:#3b82f626;color:#60a5fa}.status-badge.danger{background:#ef444426;color:#ef4444}.btn-action{width:32px;height:32px;border-radius:8px;border:1px solid var(--tf-border);background:transparent;color:var(--tf-text-muted);cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center;margin-right:.25rem}.btn-action:hover{border-color:var(--tf-primary);color:var(--tf-primary);background:#7c5cfc1a}.btn-action.danger:hover{border-color:#ef4444;color:#ef4444;background:#ef44441a}.btn-add{padding:.6rem 1.25rem;border-radius:10px;font-weight:600;font-size:.9rem;background:var(--tf-gradient);color:#fff;border:none;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;gap:.5rem}.btn-add:hover{transform:translateY(-2px);box-shadow:0 4px 15px #7c5cfc4d}.stat-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:1.5rem;transition:all .3s ease}.stat-card:hover{border-color:#7c5cfc4d;transform:translateY(-2px)}.stat-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem}.stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem}.stat-icon.purple{background:#7c5cfc26;color:var(--tf-primary-light)}.stat-icon.green{background:#06d6a026;color:var(--tf-accent)}.stat-icon.blue{background:#3b82f626;color:#60a5fa}.stat-icon.orange{background:#fb923c26;color:#fb923c}.stat-value{font-size:2rem;font-weight:800;margin-bottom:.25rem}.stat-label{font-size:.9rem;color:var(--tf-text-muted)}.stat-change{font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:.25rem}.stat-change.up{color:var(--tf-accent)}.stat-change.down{color:#ef4444}.avatar{width:36px;height:36px;border-radius:50%;background:var(--tf-gradient-subtle);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:600;color:var(--tf-primary-light)}.order-customer{display:flex;align-items:center;gap:.75rem}.order-avatar{width:36px;height:36px;border-radius:50%;background:var(--tf-gradient);display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:600;color:#fff;flex-shrink:0}.order-id{font-weight:600;color:var(--tf-primary-light)}.order-status{display:inline-flex;padding:.3rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600}.order-status.completed{background:#06d6a026;color:var(--tf-accent)}.order-status.processing{background:#3b82f626;color:#60a5fa}.order-status.pending{background:#fbbf2426;color:#fbbf24}.order-status.cancelled{background:#ef444426;color:#ef4444}.filter-bar{display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.filter-select{padding:.5rem 1rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:8px;color:var(--tf-text);font-size:.9rem}.filter-select:focus{border-color:var(--tf-primary);outline:none}.pagination{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}.page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--tf-border);background:var(--tf-surface);color:var(--tf-text);font-weight:600;font-size:.9rem;cursor:pointer;transition:all .2s ease;display:inline-flex;align-items:center;justify-content:center}.page-btn:hover,.page-btn.active{border-color:var(--tf-primary);background:var(--tf-primary);color:#fff}.form-group{margin-bottom:1.25rem}.form-label{display:block;font-weight:600;font-size:.9rem;margin-bottom:.5rem;color:var(--tf-text)}.form-control{width:100%;padding:.75rem 1rem;background:var(--tf-bg);border:1px solid var(--tf-border);border-radius:10px;color:var(--tf-text);font-size:.95rem}.form-control:focus{border-color:var(--tf-primary);outline:none;box-shadow:0 0 0 3px #7c5cfc26}.form-switch{display:flex;align-items:center;gap:.75rem}.toggle-switch{width:48px;height:26px;background:var(--tf-border);border-radius:13px;position:relative;cursor:pointer;transition:background .2s ease}.toggle-switch.active{background:var(--tf-accent)}.toggle-switch:after{content:"";position:absolute;width:20px;height:20px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s ease}.toggle-switch.active:after{transform:translate(22px)}.media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:1rem}.media-item{aspect-ratio:1;background:var(--tf-bg);border:1px solid var(--tf-border);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s ease}.media-item:hover{border-color:var(--tf-primary);transform:scale(1.02)}.media-item i{font-size:2.5rem;color:var(--tf-text-muted)}.chart-placeholder{height:300px;background:var(--tf-bg);border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px dashed var(--tf-border)}.chart-placeholder i{font-size:3rem;color:var(--tf-text-muted)}.mobile-menu-btn{display:none;width:44px;height:44px;border-radius:10px;border:1px solid var(--tf-border);background:var(--tf-surface);color:var(--tf-text);font-size:1.25rem;cursor:pointer;align-items:center;justify-content:center}.sidebar-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#00000080;z-index:999}.sidebar-close{display:none;position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:8px;border:none;background:var(--tf-bg);color:var(--tf-text);font-size:1.25rem;cursor:pointer;align-items:center;justify-content:center}@media(max-width:992px){.mobile-menu-btn,.sidebar-close{display:flex}.admin-sidebar{transform:translate(-100%);transition:transform .3s ease}.admin-sidebar.open{transform:translate(0)}.sidebar-overlay.open{display:block}.admin-main{margin-left:0;padding:1rem}.admin-header{flex-direction:column;align-items:flex-start;gap:1rem}.admin-header>div:first-child{display:flex;align-items:center;gap:1rem;width:100%}.admin-title{font-size:1.35rem}.admin-header-actions{width:100%}.admin-search{flex:1}.admin-search input{width:100%}.stat-value{font-size:1.5rem}.data-table{display:block;overflow-x:auto}.filter-bar{flex-direction:column}.filter-select{width:100%}.card-section{padding:1rem}.card-section-header{flex-direction:column;align-items:flex-start;gap:.75rem}}@media(max-width:576px){.admin-main{padding:.75rem}.stat-card{padding:1rem}.stat-icon{width:40px;height:40px;font-size:1rem}.stat-value{font-size:1.25rem}.btn-add{width:100%;justify-content:center}.media-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}}.footer-tf{background:var(--tf-surface);border-top:1px solid var(--tf-border);padding:4rem 0 2rem;margin-top:auto}.footer-brand{display:flex;align-items:center;gap:.75rem;font-size:1.5rem;font-weight:800;margin-bottom:1rem}.footer-brand i{font-size:1.75rem}.footer-desc{color:var(--tf-text-muted);font-size:.95rem;line-height:1.7;margin-bottom:1.5rem;max-width:300px}.footer-social{display:flex;gap:.75rem}.footer-social-link{width:40px;height:40px;border-radius:10px;background:var(--tf-bg);border:1px solid var(--tf-border);display:flex;align-items:center;justify-content:center;color:var(--tf-text-muted);transition:all .2s ease}.footer-social-link:hover{border-color:var(--tf-primary);color:var(--tf-primary);transform:translateY(-2px)}.footer-title{font-weight:700;font-size:.9rem;margin-bottom:1.25rem;color:var(--tf-text)}.footer-links{list-style:none;padding:0;margin:0}.footer-links li{margin-bottom:.75rem}.footer-links a{color:var(--tf-text-muted);text-decoration:none;font-size:.9rem;transition:color .2s ease}.footer-links a:hover{color:var(--tf-primary-light)}.footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;margin-top:3rem;border-top:1px solid var(--tf-border)}.footer-copyright{color:var(--tf-text-muted);font-size:.85rem}.footer-bottom-links{display:flex;gap:1.5rem}.footer-bottom-links a{color:var(--tf-text-muted);text-decoration:none;font-size:.85rem;transition:color .2s ease}.footer-bottom-links a:hover{color:var(--tf-primary-light)}@media(max-width:768px){.footer-bottom{flex-direction:column;gap:1rem;text-align:center}}.page-wrapper{min-height:100vh}.pt-navbar{padding-top:6rem}.pb-section{padding-bottom:4rem}.product-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;overflow:hidden;transition:all .3s ease}.product-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px);box-shadow:0 8px 30px #00000026}.product-image{aspect-ratio:4/3;background:var(--tf-bg);display:flex;align-items:center;justify-content:center;position:relative}.product-badge{position:absolute;top:.75rem;right:.75rem;padding:.25rem .75rem;border-radius:50px;font-size:.75rem;font-weight:600;background:var(--tf-gradient);color:#fff}.product-body{padding:1.25rem}.product-category{font-size:.8rem;color:var(--tf-primary-light);font-weight:600;margin-bottom:.5rem}.product-title{font-weight:700;font-size:1rem;margin-bottom:.5rem;color:var(--tf-text)}.product-desc{font-size:.85rem;color:var(--tf-text-muted);margin-bottom:1rem}.product-footer{display:flex;align-items:center;justify-content:space-between}.product-price{font-weight:800;font-size:1.1rem;color:var(--tf-text)}.product-price-old{text-decoration:line-through;color:var(--tf-text-muted);font-size:.85rem;margin-left:.5rem}.btn-cart{width:36px;height:36px;border-radius:10px;border:1px solid var(--tf-border);background:transparent;color:var(--tf-text-muted);cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center}.btn-cart:hover{border-color:var(--tf-primary);color:var(--tf-primary);background:#7c5cfc1a}.category-card{display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:1.5rem 1rem;background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;transition:all .3s ease}.category-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px)}.category-icon{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem}.category-title{font-weight:700;font-size:.9rem;margin:0;color:var(--tf-text);text-align:center}.category-count{font-size:.8rem;color:var(--tf-text-muted)}.category-list-item{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;text-decoration:none;color:var(--tf-text);border-radius:8px;transition:all .2s ease}.category-list-item:hover,.category-list-item.active{background:#7c5cfc1a;color:var(--tf-primary-light)}.category-list-count{font-size:.8rem;color:var(--tf-text-muted)}.hero-section{padding:6rem 0 4rem}.hero-title{font-size:3.5rem;font-weight:800;line-height:1.1;margin-bottom:1.5rem}.hero-subtitle{font-size:1.25rem;color:var(--tf-text-muted);max-width:600px;line-height:1.7}.hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:50px;font-size:.85rem;font-weight:600;background:#7c5cfc26;color:var(--tf-primary-light);margin-bottom:1.5rem}.eshop-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.25rem;border-radius:50px;font-size:.85rem;font-weight:600;background:#06d6a026;color:var(--tf-accent);margin-bottom:1.5rem}.section-label{display:inline-flex;align-items:center;gap:.5rem;font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--tf-primary-light);margin-bottom:.75rem}.feature-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:2rem;transition:all .3s ease}.feature-card:hover{border-color:#7c5cfc4d;transform:translateY(-4px)}.feature-icon{width:56px;height:56px;border-radius:14px;background:#7c5cfc26;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--tf-primary-light);margin-bottom:1.25rem}.step-card{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:16px;padding:2rem;text-align:center}.step-number{width:48px;height:48px;border-radius:50%;background:var(--tf-gradient);color:#fff;font-weight:800;font-size:1.25rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem}.cta-section{background:var(--tf-surface);border:1px solid var(--tf-border);border-radius:24px;padding:4rem 2rem;margin:4rem 0}.navbar-tf{background:var(--tf-navbar-bg)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--tf-border);padding:1rem 0}.navbar-tf .navbar-brand{font-weight:800;font-size:1.25rem}.navbar-tf .nav-link{font-weight:500;color:var(--tf-text-muted)!important;transition:color .2s ease}.navbar-tf .nav-link:hover,.navbar-tf .nav-link.active{color:var(--tf-primary-light)!important}.alert-danger{background:#ef44441a;border:1px solid rgba(239,68,68,.3);color:#ef4444;border-radius:12px;padding:1rem 1.25rem}
`;
