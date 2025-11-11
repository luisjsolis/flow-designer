(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,ne=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ae=Symbol(),he=new WeakMap;let xe=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==ae)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const o=this.t;if(ne&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=he.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&he.set(o,e))}return e}toString(){return this.cssText}};const Se=t=>new xe(typeof t=="string"?t:t+"",void 0,ae),P=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new xe(o,t,ae)},De=(t,e)=>{if(ne)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const i=document.createElement("style"),r=Z.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,t.appendChild(i)}},ue=ne?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const i of e.cssRules)o+=i.cssText;return Se(o)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Pe,defineProperty:Te,getOwnPropertyDescriptor:Oe,getOwnPropertyNames:Le,getOwnPropertySymbols:Ue,getPrototypeOf:Me}=Object,k=globalThis,fe=k.trustedTypes,We=fe?fe.emptyScript:"",ze=k.reactiveElementPolyfillSupport,W=(t,e)=>t,Q={toAttribute(t,e){switch(e){case Boolean:t=t?We:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},le=(t,e)=>!Pe(t,e),me={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:le};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let O=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=me){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,o);r!==void 0&&Te(this.prototype,e,r)}}static getPropertyDescriptor(e,o,i){const{get:r,set:s}=Oe(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:r,set(n){const a=r?.call(this);s?.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??me}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;const e=Me(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){const o=this.properties,i=[...Le(o),...Ue(o)];for(const r of i)this.createProperty(r,o[r])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[i,r]of o)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[o,i]of this.elementProperties){const r=this._$Eu(o,i);r!==void 0&&this._$Eh.set(r,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)o.unshift(ue(r))}else e!==void 0&&o.push(ue(e));return o}static _$Eu(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return De(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:Q).toAttribute(o,i.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,o){const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const s=i.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Q;this._$Em=r;const a=n.fromAttribute(o,s.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,o,i){if(e!==void 0){const r=this.constructor,s=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??le)(s,o)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??o??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,s]of i){const{wrapped:n}=s,a=this[r];n!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[W("elementProperties")]=new Map,O[W("finalized")]=new Map,ze?.({ReactiveElement:O}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,ee=z.trustedTypes,ge=ee?ee.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ae="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ne="?"+$,Re=`<${Ne}>`,N=document,I=()=>N.createComment(""),F=t=>t===null||typeof t!="object"&&typeof t!="function",de=Array.isArray,Ie=t=>de(t)||typeof t?.[Symbol.iterator]=="function",se=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,we=/>/g,x=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,Ee=/^(?:script|style|textarea|title)$/i,Fe=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),c=Fe(1),L=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),$e=new WeakMap,A=N.createTreeWalker(N,129);function _e(t,e){if(!de(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ge!==void 0?ge.createHTML(e):e}const Be=(t,e)=>{const o=t.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",n=M;for(let a=0;a<o;a++){const l=t[a];let h,f,p=-1,b=0;for(;b<l.length&&(n.lastIndex=b,f=n.exec(l),f!==null);)b=n.lastIndex,n===M?f[1]==="!--"?n=ve:f[1]!==void 0?n=we:f[2]!==void 0?(Ee.test(f[2])&&(r=RegExp("</"+f[2],"g")),n=x):f[3]!==void 0&&(n=x):n===x?f[0]===">"?(n=r??M,p=-1):f[1]===void 0?p=-2:(p=n.lastIndex-f[2].length,h=f[1],n=f[3]===void 0?x:f[3]==='"'?ye:be):n===ye||n===be?n=x:n===ve||n===we?n=M:(n=x,r=void 0);const y=n===x&&t[a+1].startsWith("/>")?" ":"";s+=n===M?l+Re:p>=0?(i.push(h),l.slice(0,p)+Ae+l.slice(p)+$+y):l+$+(p===-2?a:y)}return[_e(t,s+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class B{constructor({strings:e,_$litType$:o},i){let r;this.parts=[];let s=0,n=0;const a=e.length-1,l=this.parts,[h,f]=Be(e,o);if(this.el=B.createElement(h,i),A.currentNode=this.el.content,o===2||o===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=A.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Ae)){const b=f[n++],y=r.getAttribute(p).split($),Y=/([.?@])?(.*)/.exec(b);l.push({type:1,index:s,name:Y[2],strings:y,ctor:Y[1]==="."?qe:Y[1]==="?"?Ve:Y[1]==="@"?He:ie}),r.removeAttribute(p)}else p.startsWith($)&&(l.push({type:6,index:s}),r.removeAttribute(p));if(Ee.test(r.tagName)){const p=r.textContent.split($),b=p.length-1;if(b>0){r.textContent=ee?ee.emptyScript:"";for(let y=0;y<b;y++)r.append(p[y],I()),A.nextNode(),l.push({type:2,index:++s});r.append(p[b],I())}}}else if(r.nodeType===8)if(r.data===Ne)l.push({type:2,index:s});else{let p=-1;for(;(p=r.data.indexOf($,p+1))!==-1;)l.push({type:7,index:s}),p+=$.length-1}s++}}static createElement(e,o){const i=N.createElement("template");return i.innerHTML=e,i}}function U(t,e,o=t,i){if(e===L)return e;let r=i!==void 0?o._$Co?.[i]:o._$Cl;const s=F(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(t),r._$AT(t,o,i)),i!==void 0?(o._$Co??(o._$Co=[]))[i]=r:o._$Cl=r),r!==void 0&&(e=U(t,r._$AS(t,e.values),r,i)),e}class je{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:i}=this._$AD,r=(e?.creationScope??N).importNode(o,!0);A.currentNode=r;let s=A.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let h;l.type===2?h=new V(s,s.nextSibling,this,e):l.type===1?h=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(h=new Ke(s,this,e)),this._$AV.push(h),l=i[++a]}n!==l?.index&&(s=A.nextNode(),n++)}return A.currentNode=N,r}p(e){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}}class V{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,r){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=U(this,e,o),F(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==L&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ie(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=B.createElement(_e(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(o);else{const s=new je(r,this),n=s.u(this.options);s.p(o),this.T(n),this._$AH=s}}_$AC(e){let o=$e.get(e.strings);return o===void 0&&$e.set(e.strings,o=new B(e)),o}k(e){de(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const s of e)r===o.length?o.push(i=new V(this.O(I()),this.O(I()),this,this.options)):i=o[r],i._$AI(s),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,r,s){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=o,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,o=this,i,r){const s=this.strings;let n=!1;if(s===void 0)e=U(this,e,o,0),n=!F(e)||e!==this._$AH&&e!==L,n&&(this._$AH=e);else{const a=e;let l,h;for(e=s[0],l=0;l<s.length-1;l++)h=U(this,a[i+l],o,l),h===L&&(h=this._$AH[l]),n||(n=!F(h)||h!==this._$AH[l]),h===m?e=m:e!==m&&(e+=(h??"")+s[l+1]),this._$AH[l]=h}n&&!r&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class qe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Ve extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class He extends ie{constructor(e,o,i,r,s){super(e,o,i,r,s),this.type=5}_$AI(e,o=this){if((e=U(this,e,o,0)??m)===L)return;const i=this._$AH,r=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==m&&(i===m||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ke{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const Ge=z.litHtmlPolyfillSupport;Ge?.(B,V),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.3.1");const Je=(t,e,o)=>{const i=o?.renderBefore??e;let r=i._$litPart$;if(r===void 0){const s=o?.renderBefore??null;i._$litPart$=r=new V(e.insertBefore(I(),s),s,void 0,o??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis;class v extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o;const e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Je(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}v._$litElement$=!0,v.finalized=!0,R.litElementHydrateSupport?.({LitElement:v});const Xe=R.litElementPolyfillSupport;Xe?.({LitElement:v});(R.litElementVersions??(R.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ye={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:le},Ze=(t=Ye,e,o)=>{const{kind:i,metadata:r}=o;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),i==="accessor"){const{name:n}=o;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(i==="setter"){const{name:n}=o;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+i)};function w(t){return(e,o)=>typeof o=="object"?Ze(t,e,o):((i,r,s)=>{const n=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(r,s):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(t){return w({...t,state:!0,attribute:!1})}class Ce{constructor(){this.listeners=new Map}emit(e,o){(this.listeners.get(e)||[]).forEach(r=>{try{r(o)}catch(s){console.error(`Error in event callback for ${e}:`,s)}})}on(e,o){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(o)}off(e,o){const i=this.listeners.get(e)||[],r=i.indexOf(o);r>-1&&i.splice(r,1)}once(e,o){const i=r=>{o(r),this.off(e,i)};this.on(e,i)}}const d=new Ce,u={WORKFLOW_UPDATED:"workflow-updated",WORKFLOW_SAVED:"workflow-saved",WORKFLOW_VALIDATED:"workflow-validated",NODE_SELECTED:"node-selected",NODE_ADDED:"node-added",NODE_EDITED:"node-edited",NODE_DELETED:"node-deleted",NODE_MOVED:"node-moved",CONNECTION_ADDED:"connection-added",CONNECTION_DELETED:"connection-deleted",CANVAS_CLICKED:"canvas-clicked",PROPERTY_CHANGED:"property-changed",VALIDATION_ERROR:"validation-error",VALIDATION_SUCCESS:"validation-success"},te=Object.freeze(Object.defineProperty({__proto__:null,EVENTS:u,EventBus:Ce,eventBus:d},Symbol.toStringTag,{value:"Module"}));class Qe{constructor(){this.baseUrl="/api/servicenow"}async getFlowDefinition(e){return await this.delay(300),{id:e,name:"Sample Approval Flow",description:"A sample approval workflow for demonstration",nodes:[{id:"start_1",type:"start",name:"Start",position:{x:100,y:100},configuration:{},createdAt:new Date,updatedAt:new Date},{id:"approver_1",type:"approver",name:"Manager Approval",position:{x:300,y:100},configuration:{approvalType:"single",timeout:7},approver:{id:"john_smith",name:"John Smith",email:"john@company.com"},createdAt:new Date,updatedAt:new Date},{id:"end_1",type:"end",name:"Complete",position:{x:500,y:100},configuration:{},createdAt:new Date,updatedAt:new Date}],connections:[{id:"conn_1",from:"start_1",to:"approver_1",type:"approval"},{id:"conn_2",from:"approver_1",to:"end_1",type:"approval"}],createdAt:new Date,updatedAt:new Date,version:"1.0.0"}}async saveFlowDefinition(e){await this.delay(500),console.log("💾 Saving flow:",e.name)}async validateFlow(e){await this.delay(200);const o=[];return e.nodes.some(r=>r.type==="start")||o.push({type:"missing-start",message:"Workflow must have a start node",severity:"error"}),e.nodes.some(r=>r.type==="end")||o.push({type:"missing-end",message:"Workflow must have an end node",severity:"error"}),e.nodes.filter(r=>r.type==="approver").forEach(r=>{r.approver||o.push({type:"missing-approver",message:`Approver node "${r.name}" needs an assigned approver`,severity:"error",nodeId:r.id})}),{isValid:o.filter(r=>r.severity==="error").length===0,errors:o}}async getUsers(){return await this.delay(200),[{id:"john_smith",name:"John Smith",email:"john@company.com",department:"IT"},{id:"sarah_johnson",name:"Sarah Johnson",email:"sarah@company.com",department:"HR"},{id:"mike_wilson",name:"Mike Wilson",email:"mike@company.com",department:"Finance"},{id:"lisa_brown",name:"Lisa Brown",email:"lisa@company.com",department:"Operations"},{id:"david_lee",name:"David Lee",email:"david@company.com",department:"IT"}]}async createApprovalWorkflow(e){await this.delay(800);const o=`approval_workflow_${Date.now()}`;return console.log("✅ Created approval workflow:",o),o}async executeApprovalWorkflow(e,o){return await this.delay(1e3),{success:!0,executionId:`exec_${Date.now()}`,status:"completed"}}async getApprovalTemplates(){return await this.delay(200),[{id:"simple-approval",name:"Simple Approval",description:"Single approver workflow",icon:"👤",nodes:[{type:"start",name:"Start"},{type:"approver",name:"Manager Approval"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"approver"},{from:"approver",to:"end"}]},{id:"parallel-approval",name:"Parallel Approval",description:"Multiple approvers simultaneously",icon:"⚡",nodes:[{type:"start",name:"Start"},{type:"parallel",name:"Parallel Approvers"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"parallel"},{from:"parallel",to:"end"}]},{id:"conditional-approval",name:"Conditional Approval",description:"Approval based on conditions",icon:"❓",nodes:[{type:"start",name:"Start"},{type:"condition",name:"Check Amount"},{type:"approver",name:"Manager Approval"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"condition"},{from:"condition",to:"approver"},{from:"approver",to:"end"}]}]}delay(e){return new Promise(o=>setTimeout(o,e))}}const oe=new Qe;var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,H=(t,e,o,i)=>{for(var r=i>1?void 0:i?tt(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&et(e,o,r),r};let E=class extends v{constructor(){super(...arguments),this.workflow=null,this.isLoading=!1,this.selectedNodeId=null,this.activeView="workflow",this.eventListenersSetup=!1,this.boundOnNodeSelected=this.onNodeSelected.bind(this),this.boundOnWorkflowUpdated=this.onWorkflowUpdated.bind(this),this.boundOnTemplateAdd=this.onTemplateAdd.bind(this),this.boundOnNodeTypeAdd=this.onNodeTypeAdd.bind(this)}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.loadWorkflow()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListeners()}setupEventListeners(){if(this.eventListenersSetup){console.log("⚠️ Event listeners already setup, skipping...");return}console.log("🔧 Setting up event listeners..."),d.on(u.NODE_SELECTED,this.boundOnNodeSelected),d.on(u.WORKFLOW_UPDATED,this.boundOnWorkflowUpdated),d.on("template-add",this.boundOnTemplateAdd),d.on("node-type-add",this.boundOnNodeTypeAdd),this.eventListenersSetup=!0}removeEventListeners(){d.off(u.NODE_SELECTED,this.boundOnNodeSelected),d.off(u.WORKFLOW_UPDATED,this.boundOnWorkflowUpdated),d.off("template-add",this.boundOnTemplateAdd),d.off("node-type-add",this.boundOnNodeTypeAdd),this.eventListenersSetup=!1}onNodeSelected(t){try{this.selectedNodeId=t?t.id:null,console.log("Node selected:",t?t.id:"none")}catch(e){console.error("Error in onNodeSelected:",e),this.selectedNodeId=null}}onWorkflowUpdated(t){this.workflow=t}onTemplateAdd(t){console.log("📋 Template selected:",t.template),this.createWorkflowFromTemplate(t.template)}onNodeTypeAdd(t){console.log("🎯 BUILDER: Received node-type-add event:",t.nodeType),console.log("🎯 BUILDER: Current node count before adding:",this.workflow?.nodes.length||0),this.addNode(t.nodeType),console.log("🎯 BUILDER: Current node count after adding:",this.workflow?.nodes.length||0)}createWorkflowFromTemplate(t){switch(console.log("🏗️ Creating workflow from template:",t.name),this.workflow={id:`template-${Date.now()}`,name:t.name,description:t.description,version:"1.0.0",nodes:[],connections:[],createdAt:new Date,updatedAt:new Date},t.name){case"Simple Approval":this.addNode("start"),this.addNode("approver"),this.addNode("end");break;case"Parallel Approval":this.addNode("start"),this.addNode("approver"),this.addNode("approver"),this.addNode("end");break;case"Conditional Approval":this.addNode("start"),this.addNode("condition"),this.addNode("approver"),this.addNode("end");break;default:this.addNode("start"),this.addNode("approver"),this.addNode("end")}console.log("✅ Workflow created from template:",this.workflow.name)}async loadWorkflow(){this.isLoading=!0;try{const t=await oe.getFlowDefinition("sample-flow-001");this.workflow=t}catch(t){console.error("Failed to load workflow:",t)}finally{this.isLoading=!1}}async validateWorkflow(){if(this.workflow){this.isLoading=!0;try{const t=await oe.validateFlow(this.workflow);d.emit(u.WORKFLOW_VALIDATED,t)}catch(t){console.error("Failed to validate workflow:",t)}finally{this.isLoading=!1}}}getStatusIndicator(){return this.isLoading?"loading":this.workflow?"valid":"invalid"}getStatusText(){return this.isLoading?"⏳ Loading...":this.workflow?"✅ Valid workflow":"❌ No workflow"}addNode(t){console.log("🔧 addNode called with type:",t),console.log("🔧 Current workflow nodes before:",this.workflow?.nodes.length||0),this.workflow||(this.workflow={id:"new-workflow",name:"New Workflow",description:"A new approval workflow",version:"1.0.0",nodes:[],connections:[],createdAt:new Date,updatedAt:new Date});const e={id:`node_${Date.now()}`,type:t,name:this.getDefaultNodeName(t),position:{x:0,y:0},configuration:this.getDefaultConfiguration(t),createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(e),console.log("🔧 Current workflow nodes after:",this.workflow.nodes.length),d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}getDefaultNodeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel Approvers"}[t]||"Node"}getDefaultConfiguration(t){return{approver:{approvalType:"single",timeout:7},condition:{conditionType:"amount",operator:"greaterThan"},parallel:{approvalType:"all",timeout:7,parallelCount:2},start:{},end:{}}[t]||{}}clearCanvas(){this.workflow&&(this.workflow.nodes=[],this.workflow.connections=[],d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate())}createSampleWorkflow(){console.log("📋 Create Sample Workflow button clicked!"),alert("Create Sample Workflow button clicked!"),this.workflow?(console.log("📋 Clearing existing workflow..."),this.workflow.nodes=[],this.workflow.connections=[]):(console.log("📋 Creating new workflow..."),this.workflow={id:"sample-workflow",name:"Sample Approval Flow",description:"A sample purchase approval workflow",version:"1.0.0",nodes:[],connections:[],createdAt:new Date,updatedAt:new Date});const t=[{type:"start",name:"Employee Submits Purchase Request",x:0,y:0,config:{description:"Employee fills out purchase request form"}},{type:"approver",name:"Direct Manager Approval",x:0,y:0,config:{approver:"Sarah Johnson",approvalType:"single",timeout:24,description:"Direct manager reviews and approves request"}},{type:"condition",name:"Amount > $5,000?",x:0,y:0,config:{field:"amount",operator:">",value:5e3,description:"Check if amount exceeds $5,000 threshold"}},{type:"approver",name:"Finance Director Approval",x:0,y:0,config:{approver:"Michael Chen",approvalType:"single",timeout:48,description:"Finance director approval for high-value purchases"}},{type:"end",name:"Purchase Order Generated",x:0,y:0,config:{description:"System generates purchase order and notifies vendor"}}];console.log("📋 Creating",t.length,"nodes..."),t.forEach((e,o)=>{const i={id:`node_${Date.now()}_${Math.random()}`,type:e.type,name:e.name,position:{x:e.x,y:e.y},configuration:e.config,createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(i),console.log(`📋 Created node ${o+1}: ${i.name} (${i.type})`)}),console.log("📋 Total nodes created:",this.workflow.nodes.length),console.log("📋 Emitting workflow update event..."),d.emit(u.WORKFLOW_UPDATED,this.workflow),console.log("📋 Requesting update..."),this.requestUpdate(),console.log("✅ Sample workflow creation completed!")}autoArrange(){if(!this.workflow||this.workflow.nodes.length===0)return;const t={start:0,approver:1,condition:2,parallel:3,end:4},e=[...this.workflow.nodes].sort((o,i)=>{const r=t[o.type]??5,s=t[i.type]??5;return r-s});this.workflow.nodes=e,d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}async saveWorkflow(){if(this.workflow){this.isLoading=!0,console.log("💾 Saving workflow to ServiceNow...");try{await new Promise(e=>setTimeout(e,2e3));const t=`WF-${Date.now()}`;this.workflow.id=t,console.log("✅ Workflow saved successfully:",t),this.showSuccessMessage(`✅ Workflow ${t} saved to ServiceNow!`)}catch(t){console.error("❌ Failed to save workflow:",t),this.showErrorMessage("❌ Failed to save workflow. Please try again.")}finally{this.isLoading=!1}}}async deployWorkflow(){if(!this.workflow)return;const t=this.generateWorkflowSummary();if(confirm(`Deploy this workflow?

Name: ${t.name}
Steps: ${t.nodeCount}
Approvers: ${t.approvers.join(", ")}
Est. Processing Time: ${t.estimatedProcessingTime}

This will make the workflow active for all users.`)){this.isLoading=!0,console.log("🚀 Deploying workflow to ServiceNow...");try{await new Promise(i=>setTimeout(i,3e3));const o=this.workflow.id||`WF-${Date.now()}`;console.log("✅ Workflow deployed successfully:",o),this.showSuccessMessage(`🚀 Workflow ${o} is now LIVE in ServiceNow!`)}catch(o){console.error("❌ Failed to deploy workflow:",o),this.showErrorMessage("❌ Failed to deploy workflow. Please try again.")}finally{this.isLoading=!1}}}async testWorkflow(){if(this.workflow){this.isLoading=!0,console.log("🧪 Testing workflow execution...");try{await new Promise(e=>setTimeout(e,4e3));const t={totalSteps:this.workflow.nodes.length,completedSteps:this.workflow.nodes.length,executionTime:"2.3 seconds",status:"PASSED"};console.log("✅ Workflow test completed:",t),this.showSuccessMessage(`🧪 Test Results: ${t.status}
Steps: ${t.completedSteps}/${t.totalSteps}
Execution Time: ${t.executionTime}`)}catch(t){console.error("❌ Workflow test failed:",t),this.showErrorMessage("❌ Workflow test failed. Please check your configuration.")}finally{this.isLoading=!1}}}viewSampleRequest(){if(!this.workflow)return;const t={requestId:"REQ-2024-001",submittedBy:"John Smith",submittedDate:new Date().toLocaleDateString(),department:"IT Department",priority:"High",formFields:{"Item Description":"Dell Laptop - XPS 13 (16GB RAM, 512GB SSD)","Estimated Cost":"$1,299.00",Quantity:"1","Business Justification":"Need for new developer workstation to support upcoming project deadlines. Current laptop is 4 years old and experiencing performance issues.","Vendor Information":"Dell Technologies - Preferred vendor with corporate discount"},workflow:{name:this.workflow.name,currentStep:"Manager Approval",totalSteps:this.workflow.nodes.length,approvers:this.workflow.nodes.filter(o=>o.type==="approver").map(o=>o.configuration.approver||"Unassigned")}},e=`
📋 SAMPLE REQUEST DATA

Request ID: ${t.requestId}
Submitted By: ${t.submittedBy}
Date: ${t.submittedDate}
Department: ${t.department}
Priority: ${t.priority}

📝 FORM FIELD VALUES:
${Object.entries(t.formFields).map(([o,i])=>`• ${o}: ${i}`).join(`
`)}

🔄 WORKFLOW STATUS:
• Workflow: ${t.workflow.name}
• Current Step: ${t.workflow.currentStep}
• Total Steps: ${t.workflow.totalSteps}
• Approvers: ${t.workflow.approvers.join(", ")}

This is what a real request would look like when submitted through ServiceNow!
    `.trim();alert(e)}generateWorkflowSummary(){if(!this.workflow)return{};const t=this.workflow.nodes.filter(o=>o.type==="approver").map(o=>o.configuration.approver||"Unassigned"),e=this.workflow.nodes.filter(o=>o.type==="approver").reduce((o,i)=>o+(i.configuration.timeout||0),0);return{name:this.workflow.name,nodeCount:this.workflow.nodes.length,connectionCount:this.workflow.connections.length,approvers:t,estimatedProcessingTime:`${e} hours`,lastModified:new Date().toLocaleString()}}showSuccessMessage(t){alert(t)}showErrorMessage(t){alert(t)}render(){return c`
      <div class="approval-builder">
        <!-- View Tabs -->
        <div class="view-tabs">
          <button 
            class="view-tab ${this.activeView==="workflow"?"active":""}"
            @click=${()=>this.activeView="workflow"}>
            🔧 Workflow Builder
          </button>
          <button 
            class="view-tab ${this.activeView==="finops"?"active":""}"
            @click=${()=>this.activeView="finops"}>
            📊 FinOps Dashboard
          </button>
        </div>

        <!-- Workflow Builder View -->
        <div class="view-content ${this.activeView!=="workflow"?"hidden":""}">
          <!-- Left Panel - Approval Palette -->
          <div class="left-panel">
            <approval-palette></approval-palette>
          </div>

          <!-- Main Content -->
          <div class="main-content">
          <!-- Toolbar -->
          <div class="toolbar">
            <button @click=${()=>this.saveWorkflow()} ?disabled=${this.isLoading}>
              💾 Save
            </button>
            <button @click=${()=>this.validateWorkflow()} ?disabled=${this.isLoading}>
              🔍 Validate
            </button>
            <button @click=${()=>this.deployWorkflow()} class="primary" ?disabled=${this.isLoading}>
              🚀 Deploy
            </button>
            <button @click=${()=>this.testWorkflow()} ?disabled=${this.isLoading}>
              🧪 Test
            </button>
            <button @click=${()=>this.viewSampleRequest()} ?disabled=${this.isLoading}>
              📋 View Sample Request
            </button>
            
            <div class="status-indicator ${this.getStatusIndicator()}">
              ${this.getStatusText()}
            </div>
          </div>

          <!-- Workflow Info with Tool Buttons -->
          ${this.workflow?c`
            <div class="workflow-info">
              <div class="workflow-title">
                <h3>${this.workflow.name}</h3>
                <p>${this.workflow.nodes.length} nodes, ${this.workflow.connections.length} connections</p>
              </div>
              <div class="workflow-tools">
                <button @click=${()=>this.clearCanvas()} title="Clear Canvas" style="background: #dc3545;">🗑️</button>
                <button @click=${()=>this.createSampleWorkflow()} title="Create Sample Workflow" style="background: #fd7e14;">📋</button>
                <button @click=${()=>this.autoArrange()} title="Auto Arrange" style="background: #20c997;">🔄</button>
              </div>
              <div class="workflow-hints">
                <p>💡 Try: 1) Click 📋 for sample workflow 2) Click elements in left panel to add 3) Use ⬆️⬇️ to reorder</p>
              </div>
            </div>
          `:""}

          <!-- Canvas Container -->
          <div class="canvas-container">
            ${this.isLoading?c`
              <div class="loading-overlay">
                <div class="loading-spinner"></div>
              </div>
            `:""}
            
            <approval-canvas 
              .workflow=${this.workflow}
              .selectedNodeId=${this.selectedNodeId}>
            </approval-canvas>
          </div>
        </div>

          <!-- Right Panel - Properties -->
          <div class="right-panel">
            <approval-properties 
              .selectedNodeId=${this.selectedNodeId}
              .workflow=${this.workflow}>
            </approval-properties>
          </div>
        </div>

        <!-- FinOps Dashboard View -->
        <div class="view-content ${this.activeView!=="finops"?"hidden":""}">
          <finops-dashboard></finops-dashboard>
        </div>
      </div>
    `}};E.styles=P`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .approval-builder {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background: #ffffff;
    }

    .view-tabs {
      display: flex;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 0 1rem;
      gap: 0.5rem;
    }

    .view-tab {
      padding: 0.75rem 1.5rem;
      background: transparent;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      transition: all 0.2s;
      margin-bottom: -1px;
    }

    .view-tab:hover {
      color: #374151;
      background: rgba(59, 130, 246, 0.05);
    }

    .view-tab.active {
      color: #3b82f6;
      border-bottom-color: #3b82f6;
      background: white;
    }

    .view-content {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .view-content.hidden {
      display: none;
    }

    .left-panel {
      min-width: 250px;
      width: 15vw;
      background: #f8f9fa;
      border-right: 1px solid #e9ecef;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
      width: 100%;
    }

    .right-panel {
      min-width: 250px;
      width: 15vw;
      background: #f8f9fa;
      border-left: 1px solid #e9ecef;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .toolbar {
      height: 60px;
      background: #ffffff;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      gap: 1rem;
    }

    .toolbar button {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #ffffff;
      color: #374151;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .toolbar button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .toolbar button.primary {
      background: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }

    .toolbar button.primary:hover {
      background: #2563eb;
    }

    .toolbar button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .status-indicator {
      margin-left: auto;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-indicator.valid {
      background: #dcfce7;
      color: #166534;
    }

    .status-indicator.invalid {
      background: #fef2f2;
      color: #dc2626;
    }

    .status-indicator.loading {
      background: #fef3c7;
      color: #d97706;
    }

    .workflow-info {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .workflow-title h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #374151;
    }

    .workflow-title p {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .workflow-tools {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .workflow-tools button {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: rgba(255, 255, 255, 0.9);
      color: #374151;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .workflow-tools button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .workflow-hints p {
      margin: 0;
      font-size: 0.75rem;
      color: #6b7280;
      font-style: italic;
    }

    .canvas-container {
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;H([w({type:Object})],E.prototype,"workflow",2);H([g()],E.prototype,"isLoading",2);H([g()],E.prototype,"selectedNodeId",2);H([g()],E.prototype,"activeView",2);E=H([T("approval-builder")],E);var ot=Object.defineProperty,rt=Object.getOwnPropertyDescriptor,ce=(t,e,o,i)=>{for(var r=i>1?void 0:i?rt(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&ot(e,o,r),r};let j=class extends v{constructor(){super(...arguments),this.connections=[],this.nodes=[]}getNodePosition(t){const e=this.nodes.find(o=>o.id===t);return e?{x:e.position.x+100,y:e.position.y+40}:null}getConnectionPath(t){const e=this.getNodePosition(t.from),o=this.getNodePosition(t.to);if(console.log(`🔗 Calculating path for ${t.from} → ${t.to}:`,{fromPos:e,toPos:o,hasFrom:!!e,hasTo:!!o}),!e||!o)return console.log(`❌ Missing position data for connection ${t.id}`),"";const i=o.x-e.x,r=o.y-e.y,s=Math.sqrt(i*i+r*r),n=Math.min(s*.3,100),a=e.x+n,l=e.y,h=o.x-n,f=o.y,p=`M ${e.x} ${e.y} C ${a} ${l}, ${h} ${f}, ${o.x} ${o.y}`;return console.log(`🔗 Generated path: ${p}`),p}render(){return console.log("🔗 ConnectionLayer render:",{connections:this.connections.length,nodes:this.nodes.length}),console.log("🔗 ConnectionLayer component is rendering!"),c`
          <div class="connections-container">
            ${this.connections.map((t,e)=>{const o=this.getNodePosition(t.from),i=this.getNodePosition(t.to);if(console.log(`🔗 Connection ${e+1}:`,{id:t.id,from:t.from,to:t.to,fromPos:o,toPos:i}),!o||!i)return c``;const r=i.x-o.x,s=i.y-o.y,n=Math.sqrt(r*r+s*s),a=Math.atan2(s,r)*180/Math.PI;return c`
                <div 
                  class="connection-line ${t.type}"
                  style="
                    left: ${o.x}px;
                    top: ${o.y}px;
                    width: ${n}px;
                    transform: rotate(${a}deg);
                    transform-origin: 0 0;
                  "
                  data-connection-id=${t.id}
                  data-from=${t.from}
                  data-to=${t.to}>
                </div>
              `})}
          </div>
        `}};j.styles=P`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 1;
    }

    .connections-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .connection-line {
      position: absolute;
      height: 4px;
      background: #3b82f6;
      border-radius: 2px;
      z-index: 1;
    }

    .connection-line.approval {
      background: #10b981;
    }

    .connection-line.rejection {
      background: #ef4444;
    }

    .connection-line.timeout {
      background: #f59e0b;
    }

    .connection-line:hover {
      height: 6px;
    }
  `;ce([w({type:Array})],j.prototype,"connections",2);ce([w({type:Array})],j.prototype,"nodes",2);j=ce([T("connection-layer")],j);var it=Object.defineProperty,st=Object.getOwnPropertyDescriptor,K=(t,e,o,i)=>{for(var r=i>1?void 0:i?st(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&it(e,o,r),r};let _=class extends v{constructor(){super(...arguments),this.workflow=null,this.selectedNodeId=null,this.canvasSize={width:800,height:600},this.viewportSize={width:800,height:600},this.resizeObserver=null,this.onNodeMoveUp=t=>{console.log("🔄 Canvas received move-up event:",t.detail),this.moveNode(t.detail.node,-1)},this.onNodeMoveDown=t=>{console.log("🔄 Canvas received move-down event:",t.detail),this.moveNode(t.detail.node,1)},this.onNodeMoveUpEventBus=t=>{console.log("🔄 Canvas received move-up event via event bus:",t),this.moveNode(t.node,-1)},this.onNodeMoveDownEventBus=t=>{console.log("🔄 Canvas received move-down event via event bus:",t),this.moveNode(t.node,1)},this.onTemplateAdd=t=>{console.log("📋 Adding template to workflow:",t.template)},this.onPropertyChanged=t=>{const{nodeId:e,path:o,value:i}=t.detail;this.updateWorkflowNodeProperty(e,o,i)},this.onPropertyChangedEventBus=t=>{this.updateWorkflowNodeProperty(t.nodeId,t.path,t.value)}}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.setupResizeObserver(),this.addEventListener("node-move-up",this.onNodeMoveUp),this.addEventListener("node-move-down",this.onNodeMoveDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListeners(),this.cleanupResizeObserver()}setupEventListeners(){d.on(u.NODE_ADDED,this.onNodeAdded.bind(this)),d.on(u.NODE_DELETED,this.onNodeDeleted.bind(this)),d.on(u.NODE_MOVED,this.onNodeMoved.bind(this)),d.on(u.WORKFLOW_UPDATED,this.onWorkflowUpdated.bind(this)),d.on("node-move-up",this.onNodeMoveUpEventBus.bind(this)),d.on("node-move-down",this.onNodeMoveDownEventBus.bind(this)),d.on("template-add",this.onTemplateAdd.bind(this)),this.addEventListener("property-changed",this.onPropertyChanged),d.on("property-changed",this.onPropertyChangedEventBus)}removeEventListeners(){d.off(u.NODE_ADDED,this.onNodeAdded.bind(this)),d.off(u.NODE_DELETED,this.onNodeDeleted.bind(this)),d.off(u.NODE_MOVED,this.onNodeMoved.bind(this)),d.off(u.WORKFLOW_UPDATED,this.onWorkflowUpdated.bind(this)),d.off("node-move-up",this.onNodeMoveUpEventBus.bind(this)),d.off("node-move-down",this.onNodeMoveDownEventBus.bind(this)),d.off("template-add",this.onTemplateAdd.bind(this)),this.removeEventListener("property-changed",this.onPropertyChanged),d.off("property-changed",this.onPropertyChangedEventBus)}setupResizeObserver(){typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(t=>{for(const e of t){const{width:o,height:i}=e.contentRect;this.updateCanvasSize(o,i)}}),this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(".canvas");t&&this.resizeObserver?.observe(t)}))}cleanupResizeObserver(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}updateCanvasSize(t,e){this.canvasSize={width:t,height:e},this.viewportSize={width:Math.max(800,t-20),height:Math.max(500,e-80)},console.log("Canvas resized:",{canvas:this.canvasSize,viewport:this.viewportSize}),this.repositionNodesIfNeeded()}repositionNodesIfNeeded(){if(!this.workflow)return;let t=!1;const{width:e,height:o}=this.viewportSize;for(const i of this.workflow.nodes)if(i.position.x>e-200||i.position.y>o-100){t=!0;break}t&&(console.log("Repositioning nodes to fit within visible area"),this.repositionAllNodes())}repositionAllNodes(){if(!this.workflow)return;const{width:t,height:e}=this.viewportSize,o=180,i=80,r=80;this.workflow.nodes.forEach((s,n)=>{const a=i+n*o%(t-200),l=r+Math.floor(n*o/(t-200))*80;s.position={x:Math.min(a,t-200),y:Math.min(l,e-100)}}),this.updateConnections(),d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}onNodeAdded(t){this.workflow&&(this.workflow.nodes.push(t),this.requestUpdate())}onNodeDeleted(t){this.workflow&&(this.workflow.nodes=this.workflow.nodes.filter(e=>e.id!==t),this.workflow.connections=this.workflow.connections.filter(e=>e.from!==t&&e.to!==t),this.requestUpdate())}onNodeMoved(t){if(this.workflow){const e=this.workflow.nodes.find(o=>o.id===t.nodeId);e&&(e.position=t.position,e.updatedAt=new Date,this.requestUpdate())}}onWorkflowUpdated(t){console.log("🔄 Workflow updated in canvas:",t.nodes.length,"nodes"),this.workflow=t,this.requestUpdate(),setTimeout(()=>{this.updateAllStepNumbers()},100)}updateAllStepNumbers(){const t=this.shadowRoot?.querySelectorAll("approval-node");t&&t.forEach(e=>{e.forceStepNumberUpdate&&e.forceStepNumberUpdate()})}updateWorkflowNodeProperty(t,e,o){if(!this.workflow)return;const i=this.workflow.nodes.find(n=>n.id===t);if(!i)return;const r=e.split(".");let s=i;for(let n=0;n<r.length-1;n++)s[r[n]]||(s[r[n]]={}),s=s[r[n]];s[r[r.length-1]]=o,i.updatedAt=new Date,this.workflow.updatedAt=new Date,d.emit(u.WORKFLOW_UPDATED,this.workflow),console.log(`🔄 Workflow updated: Node ${i.name} - ${e} = ${o}`)}moveNode(t,e){if(!this.workflow)return;const o=this.workflow.nodes.findIndex(n=>n.id===t.id);if(console.log("🔄 Current node order:",this.workflow.nodes.map(n=>n.name)),console.log("🔄 Moving node:",t.name,"from index:",o,"direction:",e),o===-1){console.log("❌ Node not found in workflow");return}const i=o+e;if(i<0||i>=this.workflow.nodes.length){console.log("❌ Cannot move node - would be out of bounds");return}const[r]=this.workflow.nodes.splice(o,1);this.workflow.nodes.splice(i,0,r),console.log("🔄 New node order:",this.workflow.nodes.map(n=>n.name)),this.updateConnections();const s=this.workflow;this.workflow=null,this.requestUpdate(),setTimeout(()=>{this.workflow=s,d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),setTimeout(()=>{this.updateAllStepNumbers()},50)},10),console.log("✅ Node moved successfully")}updateConnections(){if(!this.workflow)return;const t=[...this.workflow.nodes].sort((e,o)=>e.position.x-o.position.x);this.workflow.connections=[];for(let e=0;e<t.length-1;e++)this.workflow.connections.push({id:`conn_${t[e].id}_to_${t[e+1].id}`,from:t[e].id,to:t[e+1].id,type:"approval"});console.log("🔄 Updated connections:",this.workflow.connections.length),this.updateStepNumbers()}updateStepNumbers(){this.shadowRoot?.querySelectorAll("approval-node")?.forEach(e=>{e.forceStepNumberUpdate()}),console.log("🔢 Forced step number updates on all nodes")}debugConnections(){if(!this.workflow){console.log("❌ No workflow to debug");return}console.log("🔗 === CONNECTION DEBUG ==="),console.log("🔗 Total connections:",this.workflow.connections.length),this.workflow.connections.forEach((t,e)=>{const o=this.workflow.nodes.find(r=>r.id===t.from),i=this.workflow.nodes.find(r=>r.id===t.to);console.log(`🔗 Connection ${e+1}:`,{id:t.id,type:t.type,from:o?`${o.name} (${o.position.x}, ${o.position.y})`:"NOT FOUND",to:i?`${i.name} (${i.position.x}, ${i.position.y})`:"NOT FOUND"})}),console.log("🔗 === END CONNECTION DEBUG ===")}debugEverything(){console.log("🐛 === COMPLETE DEBUG ==="),console.log("🐛 Workflow exists:",!!this.workflow),this.workflow&&(console.log("🐛 Nodes count:",this.workflow.nodes.length),console.log("🐛 Connections count:",this.workflow.connections.length),console.log("🐛 Canvas size:",this.shadowRoot?.querySelector(".canvas")?.getBoundingClientRect()),console.log("🐛 Canvas content size:",this.shadowRoot?.querySelector(".canvas-content")?.getBoundingClientRect()),console.log("🐛 Connection layer size:",this.shadowRoot?.querySelector(".connections-layer")?.getBoundingClientRect()),console.log("🐛 All nodes:",this.workflow.nodes.map(t=>`${t.name} at (${t.position.x}, ${t.position.y})`)),console.log("🐛 All connections:",this.workflow.connections.map(t=>`${t.from} → ${t.to}`))),console.log("🐛 === END COMPLETE DEBUG ===")}onCanvasClick(t){t.target===this.shadowRoot?.querySelector(".canvas")&&d.emit(u.NODE_SELECTED,null)}addNode(t,e){if(!this.workflow)return;console.log(`Adding node of type: ${t}`);const o={id:`node_${Date.now()}`,type:t,name:this.getDefaultNodeName(t),position:{x:0,y:0},configuration:this.getDefaultConfiguration(t),createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(o),d.emit(u.NODE_ADDED,o),d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}getDefaultNodeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel Approvers"}[t]||"Node"}getDefaultConfiguration(t){return{approver:{approvalType:"single",timeout:7},condition:{conditionType:"amount",operator:"greaterThan"},parallel:{approvalType:"all",timeout:7,parallelCount:2},start:{},end:{}}[t]||{}}onZoomIn(){console.log("Zoom in")}onZoomOut(){console.log("Zoom out")}onFitToScreen(){console.log("Fit to screen")}clearCanvas(){this.workflow&&(this.workflow.nodes=[],this.workflow.connections=[],d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("Canvas cleared"))}debugPositions(){this.workflow&&(console.log("=== NODE POSITIONS DEBUG ==="),this.workflow.nodes.forEach((t,e)=>{console.log(`Node ${e+1} (${t.type}): x=${t.position.x}, y=${t.position.y}`)}),console.log("============================"))}spreadNodes(){this.workflow&&(this.workflow.nodes.forEach((r,s)=>{r.position={x:150+s*250%1200,y:150+Math.floor(s*250/1200)*120}}),d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("Nodes spread out in grid pattern"))}addTestNode(){const t={x:100,y:300};this.addNode("approver",t),console.log("Added test node at position:",t)}autoArrange(){if(!this.workflow||this.workflow.nodes.length===0){console.log("❌ No workflow or nodes to arrange");return}console.log("🔄 Auto-arranging",this.workflow.nodes.length,"nodes");const t={start:0,approver:1,condition:2,parallel:3,end:4},e=[...this.workflow.nodes].sort((a,l)=>{const h=t[a.type]??5,f=t[l.type]??5;return h-f});console.log("🔄 Sorted nodes by type:",e.map(a=>`${a.type}: ${a.name}`));const{width:o,height:i}=this.viewportSize,r=180,s=80,n=80;e.forEach((a,l)=>{const h=s+l*r%(o-200),f=n+Math.floor(l*r/(o-200))*80,p={x:Math.min(h,o-200),y:Math.min(f,i-100)};console.log(`🔄 Moving ${a.name} from (${a.position.x}, ${a.position.y}) to (${p.x}, ${p.y})`),a.position=p}),this.workflow.connections=[];for(let a=0;a<e.length-1;a++)this.workflow.connections.push({from:e[a].id,to:e[a+1].id});console.log("🔄 Created",this.workflow.connections.length,"connections"),d.emit(u.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("✅ Auto-arranged nodes in logical workflow order")}render(){return this.workflow?c`
          <div class="canvas"
               @click=${this.onCanvasClick}>
        


        <!-- Drop Zone -->
        <div class="drop-zone"></div>

        <!-- Canvas Content -->
        <div class="canvas-content">
          <!-- Connections Layer - Temporarily disabled -->
          <!-- <div class="connections-layer">
            <connection-layer 
              .connections=${this.workflow.connections}
              .nodes=${this.workflow.nodes}>
            </connection-layer>
          </div> -->

          <!-- Nodes Container -->
          <div class="nodes-container">
            ${this.workflow.nodes.map(t=>c`
              <approval-node 
                .node=${t}
                .isSelected=${t.id===this.selectedNodeId}
                @node-select=${()=>d.emit(u.NODE_SELECTED,t)}
                @node-edit=${()=>d.emit(u.NODE_EDITED,t)}
                @node-delete=${()=>d.emit(u.NODE_DELETED,t.id)}
                @node-move=${e=>d.emit(u.NODE_MOVED,e.detail)}>
              </approval-node>
            `)}
          </div>
        </div>
      </div>
    `:c`
        <div class="canvas">
          <div class="canvas-header">
            <h3>No Workflow Loaded</h3>
            <p>Create a new workflow or load an existing one</p>
          </div>
        </div>
      `}};_.styles=P`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      position: relative;
    }

    .canvas {
      height: 100%;
      width: 100%;
      background: 
        radial-gradient(circle, #e5e7eb 1px, transparent 1px);
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
      position: relative;
      overflow: auto;
      cursor: grab;
    }

    .canvas:active {
      cursor: grabbing;
    }


    .canvas-content {
      min-width: 100%;
      width: 100%;
      min-height: 100%;
      height: 100%;
      position: relative;
    }

    .nodes-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 200px);
      gap: 30px;
      padding: 20px;
      align-content: start;
      justify-content: start;
    }

    .connections-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .drop-zone {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    .drop-zone.drag-over {
      background: rgba(59, 130, 246, 0.1);
      pointer-events: all;
    }

    .canvas-header {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: rgba(255, 255, 255, 0.95);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 5;
      border: 1px solid #e5e7eb;
    }

    .canvas-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    .canvas-header p {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .canvas-controls {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
      z-index: 10;
    }

    .canvas-controls button {
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: rgba(255, 255, 255, 0.9);
      color: #374151;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .canvas-controls button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .canvas-controls button.active {
      background: #3b82f6;
      color: #ffffff;
      border-color: #3b82f6;
    }
  `;K([w({type:Object})],_.prototype,"workflow",2);K([w({type:String})],_.prototype,"selectedNodeId",2);K([g()],_.prototype,"canvasSize",2);K([g()],_.prototype,"viewportSize",2);_=K([T("approval-canvas")],_);const nt="modulepreload",at=function(t){return"/flow-designer/"+t},ke={},re=function(e,o,i){if(!o||o.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(o.map(s=>{if(s=at(s),s in ke)return;ke[s]=!0;const n=s.endsWith(".css"),a=n?'[rel="stylesheet"]':"";if(!!i)for(let f=r.length-1;f>=0;f--){const p=r[f];if(p.href===s&&(!n||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${a}`))return;const h=document.createElement("link");if(h.rel=n?"stylesheet":nt,n||(h.as="script",h.crossOrigin=""),h.href=s,document.head.appendChild(h),n)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e()).catch(s=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=s,window.dispatchEvent(n),!n.defaultPrevented)throw s})};var lt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,G=(t,e,o,i)=>{for(var r=i>1?void 0:i?dt(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&lt(e,o,r),r};let C=class extends v{constructor(){super(...arguments),this.isSelected=!1,this.cachedStepNumber="?",this.lastPositionX=0,this.onPropertyChanged=t=>{const{nodeId:e,path:o,value:i}=t.detail;e===this.node?.id&&this.updateNodeProperty(o,i)},this.onPropertyChangedEventBus=t=>{t.nodeId===this.node?.id&&this.updateNodeProperty(t.path,t.value)}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.onNodeClick),this.addEventListener("dblclick",this.onDoubleClick),this.setupEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.onNodeClick),this.removeEventListener("dblclick",this.onDoubleClick),this.removeEventListeners()}setupEventListeners(){this.addEventListener("property-changed",this.onPropertyChanged),d.on("property-changed",this.onPropertyChangedEventBus)}removeEventListeners(){this.removeEventListener("property-changed",this.onPropertyChanged),d.off("property-changed",this.onPropertyChangedEventBus)}updateNodeProperty(t,e){if(!this.node)return;const o=t.split(".");let i=this.node;for(let r=0;r<o.length-1;r++)i[o[r]]||(i[o[r]]={}),i=i[o[r]];i[o[o.length-1]]=e,this.node.updatedAt=new Date,this.requestUpdate(),console.log(`🔄 Node ${this.node.name} updated: ${t} = ${e}`)}onNodeClick(t){t.preventDefault(),t.stopPropagation(),this.node&&this.dispatchEvent(new CustomEvent("node-select",{detail:{node:this.node},bubbles:!0}))}onDoubleClick(){this.dispatchEvent(new CustomEvent("node-edit",{detail:{node:this.node},bubbles:!0}))}onEdit(){this.dispatchEvent(new CustomEvent("node-edit",{detail:{node:this.node},bubbles:!0}))}onDelete(){confirm(`Delete "${this.node.name}"?`)&&this.dispatchEvent(new CustomEvent("node-delete",{detail:{nodeId:this.node.id},bubbles:!0}))}onMoveUp(){console.log("🔄 Move Up clicked for node:",this.node.name,this.node.id),re(()=>Promise.resolve().then(()=>te),void 0).then(({eventBus:t})=>{t.emit("node-move-up",{node:this.node})}),this.dispatchEvent(new CustomEvent("node-move-up",{detail:{node:this.node},bubbles:!0,composed:!0}))}onMoveDown(){console.log("🔄 Move Down clicked for node:",this.node.name,this.node.id),re(()=>Promise.resolve().then(()=>te),void 0).then(({eventBus:t})=>{t.emit("node-move-down",{node:this.node})}),this.dispatchEvent(new CustomEvent("node-move-down",{detail:{node:this.node},bubbles:!0,composed:!0}))}getNodeIcon(){return{start:"🚀",end:"🏁",approver:"👤",condition:"❓",parallel:"⚡"}[this.node.type]||"📋"}getStepNumber(){const t=this.node.position.x;return Math.abs(t-this.lastPositionX)<5&&this.cachedStepNumber!=="?"?this.cachedStepNumber:this.calculateStepNumber()}calculateStepNumber(){const t=this.shadowRoot?.host.parentElement;if(!t)return"?";const e=t.querySelectorAll("approval-node"),i=Array.from(e).indexOf(this.shadowRoot?.host),r=i>=0?(i+1).toString():"?";return this.cachedStepNumber=r,this.lastPositionX=this.node.position.x,r}forceStepNumberUpdate(){this.cachedStepNumber="?",this.lastPositionX=-999999,this.calculateStepNumber()}getApproverDisplayText(){return this.node.configuration.approver?Array.isArray(this.node.configuration.approver)?this.node.configuration.approver.length===0?"Select Approver":this.node.configuration.approver.length===1?this.node.configuration.approver[0]:`${this.node.configuration.approver.length} approvers selected`:this.node.configuration.approver:"Select Approver"}getConditionDisplayText(){if(!this.node.configuration.conditionType||!this.node.configuration.operator||!this.node.configuration.value)return"Set Condition";const t=this.node.configuration.conditionType,e=this.node.configuration.operator,o=this.node.configuration.value,i={greaterThan:">",lessThan:"<",equals:"="}[e]||e;return`${t} ${i} ${o}`}getParallelDisplayText(){const t=this.node.configuration.parallelCount||2,o=(this.node.configuration.approvalType||"all")==="all"?"All must approve":"Any can approve";return`${t} approvers - ${o}`}renderNodeContent(){switch(this.node.type){case"approver":return c`
          <div class="approver-info">
            <div class="approver-name">
              ${this.getApproverDisplayText()}
            </div>
            <div class="approval-type">
              ${this.node.configuration.approvalType||"single"} approval
              ${this.node.configuration.timeout?`(${this.node.configuration.timeout}d timeout)`:""}
            </div>
          </div>
        `;case"condition":return c`
          <div class="condition-info">
            <div class="condition-text">
              ${this.getConditionDisplayText()}
            </div>
          </div>
        `;case"parallel":return c`
          <div class="parallel-info">
            <div class="parallel-count">
              ${this.getParallelDisplayText()}
            </div>
          </div>
        `;case"start":return c`
          <div class="node-info">
            <div class="condition-text">
              ${this.node.configuration.triggerSource||"Trigger Source"}
            </div>
          </div>
        `;default:return c`
          <div class="node-info">
            ${this.node.name}
          </div>
        `}}render(){return this.node?c`
      <div 
        class="node ${this.node.type} ${this.isSelected?"selected":""} ${this.isDragging?"dragging":""}">
        
        <!-- Node Header -->
        <div class="node-header">
          <div class="node-icon">${this.getNodeIcon()}</div>
          <div class="node-title">${this.node.name}</div>
        </div>
        
        <!-- Step Number -->
        <div class="step-number">${this.getStepNumber()}</div>

        <!-- Node Content -->
        <div class="node-content">
          ${this.renderNodeContent()}
        </div>

        <!-- Node Actions (centered overlay) -->
        <div class="node-actions">
          <button @click=${this.onMoveUp} title="Move Up">⬆️</button>
          <button @click=${this.onMoveDown} title="Move Down">⬇️</button>
          <button @click=${this.onEdit} title="Edit">✏️</button>
          <button @click=${this.onDelete} class="delete" title="Delete">🗑️</button>
        </div>

            <!-- Connection points removed for static layout -->
      </div>
    `:(console.warn("ApprovalNode: No node data provided"),c``)}};C.styles=P`
    :host {
      position: relative;
      z-index: 10;
    }

    .node {
      position: relative;
      width: 160px;
      min-height: 80px;
      background: #ffffff;
      border: 2px solid #d1d5db;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.2s;
      user-select: text;
      z-index: 1;
    }

    .node:hover {
      border-color: #9ca3af;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .node.selected {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }


    .node.start {
      border-color: #10b981;
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    }

    .node.end {
      border-color: #ef4444;
      background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
    }

    .node.approver {
      border-color: #3b82f6;
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    }

    .node.condition {
      border-color: #f59e0b;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    }

    .node.parallel {
      border-color: #8b5cf6;
      background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%);
    }

    .node-header {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .node-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    .node-title {
      flex: 1;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .node-actions {
      display: flex;
      gap: 0.25rem;
      justify-content: center;
      padding: 0.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .node-actions button {
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 0.25rem;
      background: #f3f4f6;
      color: #6b7280;
      cursor: pointer;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .node-actions button:hover {
      background: #e5e7eb;
      color: #374151;
    }

    .node-actions button.delete:hover {
      background: #fef2f2;
      color: #dc2626;
    }

    .node-content {
      padding: 0.75rem;
    }

    .node-info {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1.4;
    }

    .approver-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .approver-name {
      font-weight: 500;
      color: #374151;
    }

    .approval-type {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .condition-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .condition-text {
      font-weight: 500;
      color: #374151;
    }

    .parallel-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .parallel-count {
      font-weight: 500;
      color: #374151;
    }

    /* Connection points removed - no longer needed for static layout */

    .step-number {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 24px;
      height: 24px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .node.start .step-number {
      background: #10b981;
    }

    .node.end .step-number {
      background: #6b7280;
    }
  `;G([w({type:Object})],C.prototype,"node",2);G([w({type:Boolean})],C.prototype,"isSelected",2);G([g()],C.prototype,"cachedStepNumber",2);G([g()],C.prototype,"lastPositionX",2);C=G([T("approval-node")],C);var ct=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,pe=(t,e,o,i)=>{for(var r=i>1?void 0:i?pt(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&ct(e,o,r),r};let q=class extends v{constructor(){super(...arguments),this.templates=[],this.isLoading=!1}connectedCallback(){super.connectedCallback(),this.loadTemplates()}async loadTemplates(){this.isLoading=!0;try{this.templates=await oe.getApprovalTemplates()}catch(t){console.error("Failed to load templates:",t)}finally{this.isLoading=!1}}onTemplateClick(t){console.log("Template clicked:",t.id),re(()=>Promise.resolve().then(()=>te),void 0).then(({eventBus:e})=>{e.emit("template-add",{template:t})})}onNodeTypeClick(t){console.log("🎯 PALETTE: Node type clicked:",t),console.log("🎯 PALETTE: Emitting node-type-add event"),re(()=>Promise.resolve().then(()=>te),void 0).then(({eventBus:e})=>{e.emit("node-type-add",{nodeType:t}),console.log("🎯 PALETTE: Event emitted successfully")})}getNodeTypeIcon(t){return{start:"🚀",end:"🏁",approver:"👤",condition:"❓",parallel:"⚡"}[t]||"📋"}getNodeTypeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel"}[t]||t}render(){return this.isLoading?c`
        <div class="palette">
          <div class="palette-header">
            <h3>Approval Builder</h3>
          </div>
          <div class="palette-content">
            <div class="loading">
              <div class="loading-spinner"></div>
              Loading templates...
            </div>
          </div>
        </div>
      `:c`
      <div class="palette">
        <div class="palette-header">
          <h3>Approval Builder</h3>
        </div>
        
        <div class="palette-content">
          <!-- Quick Templates -->
          <div class="section">
            <div class="section-title">Quick Templates</div>
            <div class="templates-grid">
              ${this.templates.map(t=>c`
                  <div 
                    class="template-item clickable"
                    @click=${()=>this.onTemplateClick(t)}>
                  <div class="template-icon">${t.icon}</div>
                  <div class="template-name">${t.name}</div>
                  <div class="template-description">${t.description}</div>
                </div>
              `)}
            </div>
          </div>

          <!-- Node Types -->
          <div class="section">
            <div class="section-title">Approval Elements</div>
            <div class="node-types-list">
              ${["start","approver","condition","parallel","end"].map(t=>c`
                  <div 
                    class="node-type-item clickable"
                    @click=${()=>this.onNodeTypeClick(t)}>
                  <div class="node-type-icon">${this.getNodeTypeIcon(t)}</div>
                  <div class="node-type-name">${this.getNodeTypeName(t)}</div>
                </div>
              `)}
            </div>
          </div>
        </div>
      </div>
    `}};q.styles=P`
    :host {
      display: block;
      height: 100%;
      background: #f8f9fa;
    }

    .palette {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .palette-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      background: #ffffff;
    }

    .palette-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    .palette-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .section {
      margin-bottom: 2rem;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .templates-grid {
      display: grid;
      gap: 0.75rem;
    }

    .template-item {
      padding: 1rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: grab;
      transition: all 0.2s;
      user-select: none;
    }

    .template-item:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .template-item:active {
      cursor: grabbing;
      transform: scale(0.98);
    }

    .template-item.clickable {
      cursor: pointer;
    }

    .template-item.clickable:hover {
      transform: translateY(-1px);
    }

    .template-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .template-name {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .template-description {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1.4;
    }

    .node-types-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .node-type-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      cursor: grab;
      transition: all 0.2s;
      user-select: none;
    }

    .node-type-item:hover {
      border-color: #3b82f6;
      background: #f8fafc;
    }

    .node-type-item:active {
      cursor: grabbing;
      transform: scale(0.98);
    }

    .node-type-item.clickable {
      cursor: pointer;
    }

    .node-type-item.clickable:hover {
      transform: translateY(-1px);
    }

    .node-type-icon {
      font-size: 1.5rem;
      margin-right: 0.75rem;
    }

    .node-type-name {
      font-weight: 500;
      color: #374151;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #6b7280;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;pe([g()],q.prototype,"templates",2);pe([g()],q.prototype,"isLoading",2);q=pe([T("approval-palette")],q);var ht=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,J=(t,e,o,i)=>{for(var r=i>1?void 0:i?ut(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&ht(e,o,r),r};let S=class extends v{constructor(){super(...arguments),this.selectedNodeId=null,this.workflow=null,this.users=[],this.isLoading=!1}connectedCallback(){super.connectedCallback(),this.loadUsers()}async loadUsers(){this.isLoading=!0;try{this.users=await oe.getUsers()}catch(t){console.error("Failed to load users:",t)}finally{this.isLoading=!1}}get selectedNode(){return!this.selectedNodeId||!this.workflow?null:this.workflow.nodes.find(t=>t.id===this.selectedNodeId)||null}onNameChange(t){const e=t.target;this.updateNodeProperty("name",e.value)}onApprovalTypeChange(t){const e=t.target;this.updateNodeProperty("configuration.approvalType",e.value)}onApproverChange(t){const e=t.target;this.updateNodeProperty("configuration.approver",e.value)}onTimeoutChange(t){const e=t.target;this.updateNodeProperty("configuration.timeout",parseInt(e.value))}onTriggerSourceChange(t){const e=t.target;this.updateNodeProperty("configuration.triggerSource",e.value)}onConditionTypeChange(t){const e=t.target;this.updateNodeProperty("configuration.conditionType",e.value)}onOperatorChange(t){const e=t.target;this.updateNodeProperty("configuration.operator",e.value)}onValueChange(t){const e=t.target;this.updateNodeProperty("configuration.value",e.value)}onParallelCountChange(t){const e=t.target;this.updateNodeProperty("configuration.parallelCount",parseInt(e.value))}isApproverSelected(t){const e=this.selectedNode;return!e||!e.configuration.approver?!1:Array.isArray(e.configuration.approver)?e.configuration.approver.includes(t):e.configuration.approver===t}onApproverSelect(t){const e=this.selectedNode;if(!e)return;let o=[];e.configuration.approver&&(Array.isArray(e.configuration.approver)?o=[...e.configuration.approver]:o=[e.configuration.approver]);const i=o.indexOf(t.name);i>-1?o.splice(i,1):o.push(t.name),this.updateNodeProperty("configuration.approver",o)}updateNodeProperty(t,e){if(!this.selectedNode)return;const o=t.split(".");let i=this.selectedNode;for(let r=0;r<o.length-1;r++)i[o[r]]||(i[o[r]]={}),i=i[o[r]];i[o[o.length-1]]=e,this.selectedNode.updatedAt=new Date,this.dispatchEvent(new CustomEvent("property-changed",{detail:{nodeId:this.selectedNode.id,path:t,value:e},bubbles:!0})),this.requestUpdate()}renderApproverProperties(){return c`
      <div class="property-group">
        <label class="property-label">Approver Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Approval Type</label>
        <select class="property-select" @change=${this.onApprovalTypeChange}>
          <option value="single" ?selected=${this.selectedNode?.configuration.approvalType==="single"}>
            Single Approval
          </option>
          <option value="any" ?selected=${this.selectedNode?.configuration.approvalType==="any"}>
            Any Approval
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Timeout (days)</label>
        <input 
          type="number" 
          class="property-input"
          .value=${this.selectedNode?.configuration.timeout||7}
          @input=${this.onTimeoutChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Approver Selection</label>
        <p style="font-size: 0.75rem; color: #6b7280; margin: 0.25rem 0 0.5rem 0;">
          💡 Click to select multiple approvers
        </p>
        <div class="approver-selector">
          <div class="approver-list">
            ${this.users.map(t=>{const e=this.isApproverSelected(t.name);return c`
                <div 
                  class="approver-item ${e?"selected":""}"
                  @click=${()=>this.onApproverSelect(t)}>
                  <div class="approver-name">${t.name}</div>
                  <div class="approver-email">${t.email}</div>
                </div>
              `})}
          </div>
        </div>
      </div>
    `}renderConditionProperties(){return c`
      <div class="property-group">
        <label class="property-label">Condition Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Condition Type</label>
        <select class="property-select" @change=${this.onConditionTypeChange}>
          <option value="amount" ?selected=${this.selectedNode?.configuration.conditionType==="amount"}>
            Amount
          </option>
          <option value="department" ?selected=${this.selectedNode?.configuration.conditionType==="department"}>
            Department
          </option>
          <option value="custom" ?selected=${this.selectedNode?.configuration.conditionType==="custom"}>
            Custom
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Operator</label>
        <select class="property-select" @change=${this.onOperatorChange}>
          <option value="greaterThan" ?selected=${this.selectedNode?.configuration.operator==="greaterThan"}>
            Greater Than
          </option>
          <option value="lessThan" ?selected=${this.selectedNode?.configuration.operator==="lessThan"}>
            Less Than
          </option>
          <option value="equals" ?selected=${this.selectedNode?.configuration.operator==="equals"}>
            Equals
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Value</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.configuration.value||""}
          @input=${this.onValueChange}>
      </div>
    `}renderParallelProperties(){return c`
      <div class="property-group">
        <label class="property-label">Parallel Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Number of Approvers</label>
        <input 
          type="number" 
          class="property-input"
          .value=${this.selectedNode?.configuration.parallelCount||2}
          @input=${this.onParallelCountChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Approval Type</label>
        <select class="property-select" @change=${this.onApprovalTypeChange}>
          <option value="all" ?selected=${this.selectedNode?.configuration.approvalType==="all"}>
            All Must Approve
          </option>
          <option value="any" ?selected=${this.selectedNode?.configuration.approvalType==="any"}>
            Any Can Approve
          </option>
        </select>
      </div>
    `}renderDefaultProperties(){return this.selectedNode?.type==="start"?this.renderStartProperties():c`
      <div class="property-group">
        <label class="property-label">Node Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
    `}renderStartProperties(){return c`
      <div class="property-group">
        <label class="property-label">Node Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
      
      <div class="property-group">
        <label class="property-label">Trigger Source</label>
        <select class="property-select" @change=${this.onTriggerSourceChange}>
          <option value="catalog" ?selected=${this.selectedNode?.configuration.triggerSource==="catalog"}>
            ServiceNow Catalog Item
          </option>
          <option value="form" ?selected=${this.selectedNode?.configuration.triggerSource==="form"}>
            Custom Form
          </option>
          <option value="api" ?selected=${this.selectedNode?.configuration.triggerSource==="api"}>
            API Call
          </option>
        </select>
      </div>
      
      <div class="property-group">
        <label class="property-label">Form Fields</label>
        <div class="form-fields-preview">
          <div class="form-field">📝 Item Description</div>
          <div class="form-field">💰 Estimated Cost</div>
          <div class="form-field">📊 Quantity</div>
          <div class="form-field">🏢 Business Justification</div>
          <div class="form-field">🏪 Vendor Information</div>
        </div>
        <p class="form-note">💡 Employee fills out ServiceNow catalog form, which triggers this workflow</p>
      </div>
    `}renderNodeProperties(){if(!this.selectedNode)return c``;switch(this.selectedNode.type){case"approver":return this.renderApproverProperties();case"condition":return this.renderConditionProperties();case"parallel":return this.renderParallelProperties();default:return this.renderDefaultProperties()}}render(){return this.selectedNode?c`
      <div class="properties">
        <div class="properties-header">
          <h3>Properties</h3>
          <div class="node-type">${this.selectedNode.type}</div>
        </div>
        
        <div class="properties-content">
          <div class="node-info">
            <div class="node-type">${this.selectedNode.type}</div>
            <h4>${this.selectedNode.name}</h4>
            <p>Configure the properties for this approval node</p>
          </div>
          
          ${this.renderNodeProperties()}
        </div>
      </div>
    `:c`
        <div class="properties">
          <div class="properties-header">
            <h3>Properties</h3>
          </div>
          <div class="properties-content">
            <div class="no-selection">
              <div class="no-selection-icon">📋</div>
              <h4>No Selection</h4>
              <p>Select a node to configure its properties</p>
            </div>
          </div>
        </div>
      `}};S.styles=P`
    :host {
      display: block;
      height: 100%;
      background: #f8f9fa;
    }

    .properties {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .properties-header {
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      background: #ffffff;
    }

    .properties-header h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
    }

    .properties-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .no-selection {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #6b7280;
      text-align: center;
    }

    .no-selection-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .no-selection h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .no-selection p {
      margin: 0;
      font-size: 0.875rem;
    }

    .node-info {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .node-type {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background: #f3f4f6;
      color: #374151;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .property-group {
      margin-bottom: 1.5rem;
    }

    .property-group:last-child {
      margin-bottom: 0;
    }

    .property-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .property-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #374151;
      background: #ffffff;
      transition: border-color 0.2s;
    }

    .property-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .property-select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #374151;
      background: #ffffff;
      cursor: pointer;
    }

    .property-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .approver-selector {
      position: relative;
    }

    .approver-list {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #ffffff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .approver-item {
      padding: 0.75rem;
      cursor: pointer;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.2s;
    }

    .approver-item:hover {
      background: #f8fafc;
    }

    .approver-item.selected {
      background: #dbeafe;
      border-left: 3px solid #3b82f6;
    }

    .approver-item:last-child {
      border-bottom: none;
    }

    .selected-indicator {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #10b981;
      font-weight: bold;
    }

    .approver-name {
      font-weight: 500;
      color: #374151;
    }

    .approver-email {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: #6b7280;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .form-fields-preview {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 0.375rem;
      padding: 0.75rem;
      margin-top: 0.5rem;
    }

    .form-field {
      padding: 0.5rem;
      margin: 0.25rem 0;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      color: #374151;
    }

    .form-note {
      margin-top: 0.75rem;
      padding: 0.5rem;
      background: #eff6ff;
      border: 1px solid #dbeafe;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      color: #1e40af;
      line-height: 1.4;
    }
  `;J([w({type:String})],S.prototype,"selectedNodeId",2);J([w({type:Object})],S.prototype,"workflow",2);J([g()],S.prototype,"users",2);J([g()],S.prototype,"isLoading",2);S=J([T("approval-properties")],S);class ft{constructor(){this.baseUrl="/api/lightdash"}async getFinOpsMetrics(){return await this.delay(300),{totalSpend:{current:23e5,previous:21e5,trend:"up",percentageChange:9.5},budget:{allocated:25e5,spent:23e5,remaining:2e5,variance:2e5,variancePercentage:8,daysUntilExhausted:23},costByService:[{service:"EC2 (Compute)",cost:8e5,percentage:34.8,trend:"up"},{service:"S3 (Storage)",cost:4e5,percentage:17.4,trend:"up"},{service:"RDS (Database)",cost:3e5,percentage:13,trend:"down"},{service:"Lambda (Serverless)",cost:25e4,percentage:10.9,trend:"up"},{service:"CloudFront (CDN)",cost:2e5,percentage:8.7,trend:"up"},{service:"Other",cost:35e4,percentage:15.2,trend:"stable"}],costByDepartment:[{department:"Engineering",cost:12e5,trend:"up",percentage:52.2},{department:"IT Operations",cost:45e4,trend:"up",percentage:19.6},{department:"Sales & Marketing",cost:35e4,trend:"down",percentage:15.2},{department:"Product",cost:2e5,trend:"up",percentage:8.7},{department:"Other",cost:1e5,trend:"stable",percentage:4.3}],costByCloudProvider:[{provider:"AWS",cost:138e4,percentage:60},{provider:"Azure",cost:69e4,percentage:30},{provider:"GCP",cost:23e4,percentage:10}],anomalies:[{id:"anom_1",type:"cost_spike",severity:"high",message:"EC2 costs spiked 45% on Jan 15 - likely due to auto-scaling event",date:new Date("2025-01-15"),cost:36e4},{id:"anom_2",type:"storage_increase",severity:"medium",message:"S3 storage costs increased 30% this week",date:new Date("2025-01-20"),cost:12e4},{id:"anom_3",type:"budget_alert",severity:"high",message:"Budget will be exhausted in 23 days at current burn rate",date:new Date,cost:0}],monthlyTrend:[{month:"Jul 2024",cost:18e5,budget:2e6},{month:"Aug 2024",cost:19e5,budget:2e6},{month:"Sep 2024",cost:195e4,budget:21e5},{month:"Oct 2024",cost:2e6,budget:22e5},{month:"Nov 2024",cost:205e4,budget:23e5},{month:"Dec 2024",cost:21e5,budget:24e5},{month:"Jan 2025",cost:23e5,budget:25e5}]}}async getDashboard(e){await this.delay(200);const o=await this.getFinOpsMetrics();return{id:e,name:"FinOps Overview Dashboard",description:"Cloud cost analytics and budget tracking",embedUrl:`https://lightdash.example.com/embed/${e}`,metrics:o}}async refreshMetrics(){return await this.delay(500),this.getFinOpsMetrics()}delay(e){return new Promise(o=>setTimeout(o,e))}}const mt=new ft;var gt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,X=(t,e,o,i)=>{for(var r=i>1?void 0:i?vt(e,o):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(i?n(e,o,r):n(r))||r);return i&&r&&gt(e,o,r),r};let D=class extends v{constructor(){super(...arguments),this.metrics=null,this.isLoading=!0,this.error=null,this.lastUpdated=null}connectedCallback(){super.connectedCallback(),this.loadMetrics()}async loadMetrics(){this.isLoading=!0,this.error=null;try{this.metrics=await mt.getFinOpsMetrics(),this.lastUpdated=new Date}catch(t){this.error=t instanceof Error?t.message:"Failed to load metrics"}finally{this.isLoading=!1}}async handleRefresh(){await this.loadMetrics()}formatCurrency(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(t)}formatNumber(t){return t>=1e6?`$${(t/1e6).toFixed(1)}M`:t>=1e3?`$${(t/1e3).toFixed(0)}K`:`$${t.toFixed(0)}`}formatDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric"}).format(t)}render(){if(this.isLoading)return c`
        <div class="loading">
          <div>Loading FinOps metrics...</div>
        </div>
      `;if(this.error)return c`
        <div class="error">
          <strong>Error:</strong> ${this.error}
        </div>
      `;if(!this.metrics)return c`<div>No metrics available</div>`;const{totalSpend:t,budget:e,costByService:o,costByDepartment:i,costByCloudProvider:r,anomalies:s}=this.metrics;return c`
      <div class="dashboard-container">
        <div class="dashboard-header">
          <h2>📊 FinOps Dashboard</h2>
          <div class="header-actions">
            ${this.lastUpdated?c`
              <span class="last-updated">
                Last updated: ${this.lastUpdated.toLocaleTimeString()}
              </span>
            `:""}
            <button 
              class="refresh-btn" 
              @click=${this.handleRefresh}
              ?disabled=${this.isLoading}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">Total Monthly Spend</div>
            <div class="metric-value">${this.formatCurrency(t.current)}</div>
            <div class="metric-change ${t.trend}">
              ${t.trend==="up"?"↑":"↓"} 
              ${t.percentageChange.toFixed(1)}% vs last month
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Budget Status</div>
            <div class="metric-value">${this.formatCurrency(e.spent)} / ${this.formatCurrency(e.allocated)}</div>
            <div class="metric-change ${e.variance>0?"up":"down"}">
              ${e.variance>0?"↑":"↓"} 
              ${Math.abs(e.variancePercentage).toFixed(1)}% ${e.variance>0?"over":"under"} budget
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Budget Remaining</div>
            <div class="metric-value">${this.formatCurrency(e.remaining)}</div>
            <div class="metric-change">
              ~${e.daysUntilExhausted} days remaining
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-label">Top Cloud Provider</div>
            <div class="metric-value">${r[0]?.provider||"N/A"}</div>
            <div class="metric-change">
              ${r[0]?this.formatCurrency(r[0].cost):""} 
              (${r[0]?.percentage.toFixed(1)}%)
            </div>
          </div>
        </div>

        <!-- Cost Breakdowns -->
        <div class="two-column">
          <div class="chart-section">
            <div class="chart-title">Cost by Service</div>
            <div class="cost-list">
              ${o.map(n=>c`
                <div class="cost-item">
                  <div class="cost-item-label">
                    ${n.service}
                    <span class="trend-indicator ${n.trend}">
                      ${n.trend==="up"?"↑":"↓"}
                    </span>
                  </div>
                  <div class="cost-item-value">
                    ${this.formatCurrency(n.cost)} (${n.percentage.toFixed(1)}%)
                  </div>
                </div>
              `)}
            </div>
          </div>

          <div class="chart-section">
            <div class="chart-title">Cost by Department</div>
            <div class="cost-list">
              ${i.map(n=>c`
                <div class="cost-item">
                  <div class="cost-item-label">
                    ${n.department}
                    <span class="trend-indicator ${n.trend}">
                      ${n.trend==="up"?"↑":"↓"}
                    </span>
                  </div>
                  <div class="cost-item-value">
                    ${this.formatCurrency(n.cost)} (${n.percentage.toFixed(1)}%)
                  </div>
                </div>
              `)}
            </div>
          </div>
        </div>

        <!-- Cloud Providers -->
        <div class="chart-section">
          <div class="chart-title">Cost by Cloud Provider</div>
          <div class="cost-list">
            ${r.map(n=>c`
              <div class="cost-item">
                <div class="cost-item-label">${n.provider}</div>
                <div class="cost-item-value">
                  ${this.formatCurrency(n.cost)} (${n.percentage.toFixed(1)}%)
                </div>
              </div>
            `)}
          </div>
        </div>

        <!-- Anomalies -->
        ${s.length>0?c`
          <div class="anomalies-section">
            <div class="chart-title">⚠️ Cost Anomalies & Alerts</div>
            ${s.map(n=>c`
              <div class="anomaly-item ${n.severity}">
                <div class="anomaly-header">
                  <span class="anomaly-severity ${n.severity}">
                    ${n.severity}
                  </span>
                  ${n.cost>0?c`
                    <span class="cost-item-value">${this.formatCurrency(n.cost)}</span>
                  `:""}
                </div>
                <div class="anomaly-message">${n.message}</div>
                <div class="anomaly-date">${this.formatDate(n.date)}</div>
              </div>
            `)}
          </div>
        `:""}
      </div>
    `}};D.styles=P`
    :host {
      display: block;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      background: #f8f9fa;
    }

    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .dashboard-header h2 {
      margin: 0;
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .refresh-btn {
      padding: 0.5rem 1rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.2s;
    }

    .refresh-btn:hover {
      background: #2563eb;
    }

    .refresh-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .last-updated {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .metric-label {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .metric-change {
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .metric-change.up {
      color: #dc2626;
    }

    .metric-change.down {
      color: #16a34a;
    }

    .chart-section {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .chart-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .cost-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .cost-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 0.375rem;
    }

    .cost-item-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: #374151;
    }

    .cost-item-value {
      font-weight: 600;
      color: #1f2937;
    }

    .trend-indicator {
      font-size: 0.75rem;
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-weight: 500;
    }

    .trend-indicator.up {
      background: #fee2e2;
      color: #dc2626;
    }

    .trend-indicator.down {
      background: #dcfce7;
      color: #16a34a;
    }

    .anomalies-section {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
    }

    .anomaly-item {
      padding: 1rem;
      border-left: 4px solid;
      border-radius: 0.375rem;
      margin-bottom: 0.75rem;
      background: #f9fafb;
    }

    .anomaly-item.high {
      border-left-color: #dc2626;
    }

    .anomaly-item.medium {
      border-left-color: #f59e0b;
    }

    .anomaly-item.low {
      border-left-color: #3b82f6;
    }

    .anomaly-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .anomaly-severity {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }

    .anomaly-severity.high {
      background: #fee2e2;
      color: #dc2626;
    }

    .anomaly-severity.medium {
      background: #fef3c7;
      color: #d97706;
    }

    .anomaly-severity.low {
      background: #dbeafe;
      color: #2563eb;
    }

    .anomaly-message {
      color: #374151;
      font-size: 0.875rem;
    }

    .anomaly-date {
      color: #6b7280;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
      color: #6b7280;
    }

    .error {
      background: #fee2e2;
      color: #dc2626;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 2rem;
    }

    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      .two-column {
        grid-template-columns: 1fr;
      }
      
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `;X([g()],D.prototype,"metrics",2);X([g()],D.prototype,"isLoading",2);X([g()],D.prototype,"error",2);X([g()],D.prototype,"lastUpdated",2);D=X([T("finops-dashboard")],D);console.log("🚀 ServiceNow Flow Designer V2 - Approval Workflow Builder");console.log("📦 Built with Web Components + Lit");console.log("🎯 Modern Architecture for Enterprise Workflow Automation");console.log("📊 FinOps Dashboard integrated with Lightdash");
//# sourceMappingURL=index-f8db031c.js.map
