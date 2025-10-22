(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,re=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),ce=new WeakMap;let $e=class{constructor(e,o,i){if(this._$cssResult$=!0,i!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const o=this.t;if(re&&e===void 0){const i=o!==void 0&&o.length===1;i&&(e=ce.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ce.set(o,e))}return e}toString(){return this.cssText}};const Ee=t=>new $e(typeof t=="string"?t:t+"",void 0,ne),O=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((i,r,n)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[n+1],t[0]);return new $e(o,t,ne)},Ce=(t,e)=>{if(re)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const i=document.createElement("style"),r=G.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=o.cssText,t.appendChild(i)}},pe=re?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const i of e.cssRules)o+=i.cssText;return Ee(o)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Se,defineProperty:Pe,getOwnPropertyDescriptor:De,getOwnPropertyNames:Te,getOwnPropertySymbols:Oe,getPrototypeOf:Le}=Object,k=globalThis,he=k.trustedTypes,Ue=he?he.emptyScript:"",Me=k.reactiveElementPolyfillSupport,M=(t,e)=>t,Y={toAttribute(t,e){switch(e){case Boolean:t=t?Ue:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},se=(t,e)=>!Se(t,e),fe={attribute:!0,type:String,converter:Y,reflect:!1,useDefault:!1,hasChanged:se};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=fe){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,o);r!==void 0&&Pe(this.prototype,e,r)}}static getPropertyDescriptor(e,o,i){const{get:r,set:n}=De(this.prototype,e)??{get(){return this[o]},set(s){this[o]=s}};return{get:r,set(s){const a=r?.call(this);n?.call(this,s),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??fe}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const e=Le(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const o=this.properties,i=[...Te(o),...Oe(o)];for(const r of i)this.createProperty(r,o[r])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[i,r]of o)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[o,i]of this.elementProperties){const r=this._$Eu(o,i);r!==void 0&&this._$Eh.set(r,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)o.unshift(pe(r))}else e!==void 0&&o.push(pe(e));return o}static _$Eu(e,o){const i=o.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const i of o.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,i){this._$AK(e,i)}_$ET(e,o){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:Y).toAttribute(o,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,o){const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const n=i.getPropertyOptions(r),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Y;this._$Em=r;const a=s.fromAttribute(o,n.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,o,i){if(e!==void 0){const r=this.constructor,n=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??se)(n,o)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,o,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:i,reflect:r,wrapped:n},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??o??this[e]),n!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(o=void 0),this._$AL.set(e,o)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,n]of i){const{wrapped:s}=n,a=this[r];s!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(o)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[M("elementProperties")]=new Map,S[M("finalized")]=new Map,Me?.({ReactiveElement:S}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=globalThis,J=W.trustedTypes,ue=J?J.createPolicy("lit-html",{createHTML:t=>t}):void 0,ke="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+$,We=`<${Ae}>`,N=document,R=()=>N.createComment(""),I=t=>t===null||typeof t!="object"&&typeof t!="function",ae=Array.isArray,ze=t=>ae(t)||typeof t?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,ve=/>/g,A=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,we=/"/g,_e=/^(?:script|style|textarea|title)$/i,Re=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),f=Re(1),P=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),ye=new WeakMap,_=N.createTreeWalker(N,129);function Ne(t,e){if(!ae(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}const Ie=(t,e)=>{const o=t.length-1,i=[];let r,n=e===2?"<svg>":e===3?"<math>":"",s=U;for(let a=0;a<o;a++){const l=t[a];let p,u,c=-1,y=0;for(;y<l.length&&(s.lastIndex=y,u=s.exec(l),u!==null);)y=s.lastIndex,s===U?u[1]==="!--"?s=ge:u[1]!==void 0?s=ve:u[2]!==void 0?(_e.test(u[2])&&(r=RegExp("</"+u[2],"g")),s=A):u[3]!==void 0&&(s=A):s===A?u[0]===">"?(s=r??U,c=-1):u[1]===void 0?c=-2:(c=s.lastIndex-u[2].length,p=u[1],s=u[3]===void 0?A:u[3]==='"'?we:me):s===we||s===me?s=A:s===ge||s===ve?s=U:(s=A,r=void 0);const b=s===A&&t[a+1].startsWith("/>")?" ":"";n+=s===U?l+We:c>=0?(i.push(p),l.slice(0,c)+ke+l.slice(c)+$+b):l+$+(c===-2?a:b)}return[Ne(t,n+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class j{constructor({strings:e,_$litType$:o},i){let r;this.parts=[];let n=0,s=0;const a=e.length-1,l=this.parts,[p,u]=Ie(e,o);if(this.el=j.createElement(p,i),_.currentNode=this.el.content,o===2||o===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=_.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(ke)){const y=u[s++],b=r.getAttribute(c).split($),X=/([.?@])?(.*)/.exec(y);l.push({type:1,index:n,name:X[2],strings:b,ctor:X[1]==="."?Fe:X[1]==="?"?Be:X[1]==="@"?qe:te}),r.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:n}),r.removeAttribute(c));if(_e.test(r.tagName)){const c=r.textContent.split($),y=c.length-1;if(y>0){r.textContent=J?J.emptyScript:"";for(let b=0;b<y;b++)r.append(c[b],R()),_.nextNode(),l.push({type:2,index:++n});r.append(c[y],R())}}}else if(r.nodeType===8)if(r.data===Ae)l.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf($,c+1))!==-1;)l.push({type:7,index:n}),c+=$.length-1}n++}}static createElement(e,o){const i=N.createElement("template");return i.innerHTML=e,i}}function D(t,e,o=t,i){if(e===P)return e;let r=i!==void 0?o._$Co?.[i]:o._$Cl;const n=I(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(t),r._$AT(t,o,i)),i!==void 0?(o._$Co??(o._$Co=[]))[i]=r:o._$Cl=r),r!==void 0&&(e=D(t,r._$AS(t,e.values),r,i)),e}class je{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:i}=this._$AD,r=(e?.creationScope??N).importNode(o,!0);_.currentNode=r;let n=_.nextNode(),s=0,a=0,l=i[0];for(;l!==void 0;){if(s===l.index){let p;l.type===2?p=new q(n,n.nextSibling,this,e):l.type===1?p=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(p=new He(n,this,e)),this._$AV.push(p),l=i[++a]}s!==l?.index&&(n=_.nextNode(),s++)}return _.currentNode=N,r}p(e){let o=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,o),o+=i.strings.length-2):i._$AI(e[o])),o++}}class q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,i,r){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=D(this,e,o),I(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==P&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ze(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=j.createElement(Ne(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(o);else{const n=new je(r,this),s=n.u(this.options);n.p(o),this.T(s),this._$AH=n}}_$AC(e){let o=ye.get(e.strings);return o===void 0&&ye.set(e.strings,o=new j(e)),o}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let i,r=0;for(const n of e)r===o.length?o.push(i=new q(this.O(R()),this.O(R()),this,this.options)):i=o[r],i._$AI(n),r++;r<o.length&&(this._$AR(i&&i._$AB.nextSibling,r),o.length=r)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,i,r,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=o,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=g}_$AI(e,o=this,i,r){const n=this.strings;let s=!1;if(n===void 0)e=D(this,e,o,0),s=!I(e)||e!==this._$AH&&e!==P,s&&(this._$AH=e);else{const a=e;let l,p;for(e=n[0],l=0;l<n.length-1;l++)p=D(this,a[i+l],o,l),p===P&&(p=this._$AH[l]),s||(s=!I(p)||p!==this._$AH[l]),p===g?e=g:e!==g&&(e+=(p??"")+n[l+1]),this._$AH[l]=p}s&&!r&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Fe extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}}class Be extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}}class qe extends te{constructor(e,o,i,r,n){super(e,o,i,r,n),this.type=5}_$AI(e,o=this){if((e=D(this,e,o,0)??g)===P)return;const i=this._$AH,r=e===g&&i!==g||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==g&&(i===g||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class He{constructor(e,o,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}}const Ve=W.litHtmlPolyfillSupport;Ve?.(j,q),(W.litHtmlVersions??(W.litHtmlVersions=[])).push("3.3.1");const Ke=(t,e,o)=>{const i=o?.renderBefore??e;let r=i._$litPart$;if(r===void 0){const n=o?.renderBefore??null;i._$litPart$=r=new q(e.insertBefore(R(),n),n,void 0,o??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis;class v extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o;const e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ke(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}}v._$litElement$=!0,v.finalized=!0,z.litElementHydrateSupport?.({LitElement:v});const Xe=z.litElementPolyfillSupport;Xe?.({LitElement:v});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:se},Ye=(t=Ge,e,o)=>{const{kind:i,metadata:r}=o;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(o.name,t),i==="accessor"){const{name:s}=o;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(s,l,t)},init(a){return a!==void 0&&this.C(s,void 0,t,a),a}}}if(i==="setter"){const{name:s}=o;return function(a){const l=this[s];e.call(this,a),this.requestUpdate(s,l,t)}}throw Error("Unsupported decorator location: "+i)};function m(t){return(e,o)=>typeof o=="object"?Ye(t,e,o):((i,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),s?Object.getOwnPropertyDescriptor(r,n):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function w(t){return m({...t,state:!0,attribute:!1})}class xe{constructor(){this.listeners=new Map}emit(e,o){(this.listeners.get(e)||[]).forEach(r=>{try{r(o)}catch(n){console.error(`Error in event callback for ${e}:`,n)}})}on(e,o){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(o)}off(e,o){const i=this.listeners.get(e)||[],r=i.indexOf(o);r>-1&&i.splice(r,1)}once(e,o){const i=r=>{o(r),this.off(e,i)};this.on(e,i)}}const d=new xe,h={WORKFLOW_UPDATED:"workflow-updated",WORKFLOW_SAVED:"workflow-saved",WORKFLOW_VALIDATED:"workflow-validated",NODE_SELECTED:"node-selected",NODE_ADDED:"node-added",NODE_EDITED:"node-edited",NODE_DELETED:"node-deleted",NODE_MOVED:"node-moved",CONNECTION_ADDED:"connection-added",CONNECTION_DELETED:"connection-deleted",CANVAS_CLICKED:"canvas-clicked",PROPERTY_CHANGED:"property-changed",VALIDATION_ERROR:"validation-error",VALIDATION_SUCCESS:"validation-success"},Z=Object.freeze(Object.defineProperty({__proto__:null,EVENTS:h,EventBus:xe,eventBus:d},Symbol.toStringTag,{value:"Module"}));class Je{constructor(){this.baseUrl="/api/servicenow"}async getFlowDefinition(e){return await this.delay(300),{id:e,name:"Sample Approval Flow",description:"A sample approval workflow for demonstration",nodes:[{id:"start_1",type:"start",name:"Start",position:{x:100,y:100},configuration:{},createdAt:new Date,updatedAt:new Date},{id:"approver_1",type:"approver",name:"Manager Approval",position:{x:300,y:100},configuration:{approvalType:"single",timeout:7},approver:{id:"john_smith",name:"John Smith",email:"john@company.com"},createdAt:new Date,updatedAt:new Date},{id:"end_1",type:"end",name:"Complete",position:{x:500,y:100},configuration:{},createdAt:new Date,updatedAt:new Date}],connections:[{id:"conn_1",from:"start_1",to:"approver_1",type:"approval"},{id:"conn_2",from:"approver_1",to:"end_1",type:"approval"}],createdAt:new Date,updatedAt:new Date,version:"1.0.0"}}async saveFlowDefinition(e){await this.delay(500),console.log("💾 Saving flow:",e.name)}async validateFlow(e){await this.delay(200);const o=[];return e.nodes.some(r=>r.type==="start")||o.push({type:"missing-start",message:"Workflow must have a start node",severity:"error"}),e.nodes.some(r=>r.type==="end")||o.push({type:"missing-end",message:"Workflow must have an end node",severity:"error"}),e.nodes.filter(r=>r.type==="approver").forEach(r=>{r.approver||o.push({type:"missing-approver",message:`Approver node "${r.name}" needs an assigned approver`,severity:"error",nodeId:r.id})}),{isValid:o.filter(r=>r.severity==="error").length===0,errors:o}}async getUsers(){return await this.delay(200),[{id:"john_smith",name:"John Smith",email:"john@company.com",department:"IT"},{id:"sarah_johnson",name:"Sarah Johnson",email:"sarah@company.com",department:"HR"},{id:"mike_wilson",name:"Mike Wilson",email:"mike@company.com",department:"Finance"},{id:"lisa_brown",name:"Lisa Brown",email:"lisa@company.com",department:"Operations"},{id:"david_lee",name:"David Lee",email:"david@company.com",department:"IT"}]}async createApprovalWorkflow(e){await this.delay(800);const o=`approval_workflow_${Date.now()}`;return console.log("✅ Created approval workflow:",o),o}async executeApprovalWorkflow(e,o){return await this.delay(1e3),{success:!0,executionId:`exec_${Date.now()}`,status:"completed"}}async getApprovalTemplates(){return await this.delay(200),[{id:"simple-approval",name:"Simple Approval",description:"Single approver workflow",icon:"👤",nodes:[{type:"start",name:"Start"},{type:"approver",name:"Manager Approval"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"approver"},{from:"approver",to:"end"}]},{id:"parallel-approval",name:"Parallel Approval",description:"Multiple approvers simultaneously",icon:"⚡",nodes:[{type:"start",name:"Start"},{type:"parallel",name:"Parallel Approvers"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"parallel"},{from:"parallel",to:"end"}]},{id:"conditional-approval",name:"Conditional Approval",description:"Approval based on conditions",icon:"❓",nodes:[{type:"start",name:"Start"},{type:"condition",name:"Check Amount"},{type:"approver",name:"Manager Approval"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"condition"},{from:"condition",to:"approver"},{from:"approver",to:"end"}]}]}delay(e){return new Promise(o=>setTimeout(o,e))}}const Q=new Je;var Ze=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,oe=(t,e,o,i)=>{for(var r=i>1?void 0:i?Qe(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Ze(e,o,r),r};let T=class extends v{constructor(){super(...arguments),this.workflow=null,this.isLoading=!1,this.selectedNodeId=null,this.boundOnNodeSelected=this.onNodeSelected.bind(this),this.boundOnWorkflowUpdated=this.onWorkflowUpdated.bind(this)}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.loadWorkflow()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListeners()}setupEventListeners(){d.on(h.NODE_SELECTED,this.boundOnNodeSelected),d.on(h.WORKFLOW_UPDATED,this.boundOnWorkflowUpdated)}removeEventListeners(){d.off(h.NODE_SELECTED,this.boundOnNodeSelected),d.off(h.WORKFLOW_UPDATED,this.boundOnWorkflowUpdated)}onNodeSelected(t){try{this.selectedNodeId=t?t.id:null,console.log("Node selected:",t?t.id:"none")}catch(e){console.error("Error in onNodeSelected:",e),this.selectedNodeId=null}}onWorkflowUpdated(t){this.workflow=t}async loadWorkflow(){this.isLoading=!0;try{const t=await Q.getFlowDefinition("sample-flow-001");this.workflow=t}catch(t){console.error("Failed to load workflow:",t)}finally{this.isLoading=!1}}async validateWorkflow(){if(this.workflow){this.isLoading=!0;try{const t=await Q.validateFlow(this.workflow);d.emit(h.WORKFLOW_VALIDATED,t)}catch(t){console.error("Failed to validate workflow:",t)}finally{this.isLoading=!1}}}getStatusIndicator(){return this.isLoading?"loading":this.workflow?"valid":"invalid"}getStatusText(){return this.isLoading?"⏳ Loading...":this.workflow?"✅ Valid workflow":"❌ No workflow"}addNode(t){this.workflow||(this.workflow={id:"new-workflow",name:"New Workflow",description:"A new approval workflow",version:"1.0.0",nodes:[],connections:[],createdAt:new Date,updatedAt:new Date});const e={id:`node_${Date.now()}`,type:t,name:this.getDefaultNodeName(t),position:{x:0,y:0},configuration:this.getDefaultConfiguration(t),createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(e),d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}getDefaultNodeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel Approvers"}[t]||"Node"}getDefaultConfiguration(t){return{approver:{approvalType:"single",timeout:7},condition:{conditionType:"amount",operator:"greaterThan"},parallel:{approvalType:"all",timeout:7,parallelCount:2},start:{},end:{}}[t]||{}}clearCanvas(){this.workflow&&(this.workflow.nodes=[],this.workflow.connections=[],d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate())}createSampleWorkflow(){console.log("📋 Create Sample Workflow button clicked!"),alert("Create Sample Workflow button clicked!"),this.workflow?(console.log("📋 Clearing existing workflow..."),this.workflow.nodes=[],this.workflow.connections=[]):(console.log("📋 Creating new workflow..."),this.workflow={id:"sample-workflow",name:"Sample Approval Flow",description:"A sample purchase approval workflow",version:"1.0.0",nodes:[],connections:[],createdAt:new Date,updatedAt:new Date});const t=[{type:"start",name:"Employee Submits Purchase Request",x:0,y:0,config:{description:"Employee fills out purchase request form"}},{type:"approver",name:"Direct Manager Approval",x:0,y:0,config:{approver:"Sarah Johnson",approvalType:"single",timeout:24,description:"Direct manager reviews and approves request"}},{type:"condition",name:"Amount > $5,000?",x:0,y:0,config:{field:"amount",operator:">",value:5e3,description:"Check if amount exceeds $5,000 threshold"}},{type:"approver",name:"Finance Director Approval",x:0,y:0,config:{approver:"Michael Chen",approvalType:"single",timeout:48,description:"Finance director approval for high-value purchases"}},{type:"end",name:"Purchase Order Generated",x:0,y:0,config:{description:"System generates purchase order and notifies vendor"}}];console.log("📋 Creating",t.length,"nodes..."),t.forEach((e,o)=>{const i={id:`node_${Date.now()}_${Math.random()}`,type:e.type,name:e.name,position:{x:e.x,y:e.y},configuration:e.config,createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(i),console.log(`📋 Created node ${o+1}: ${i.name} (${i.type})`)}),console.log("📋 Total nodes created:",this.workflow.nodes.length),console.log("📋 Emitting workflow update event..."),d.emit(h.WORKFLOW_UPDATED,this.workflow),console.log("📋 Requesting update..."),this.requestUpdate(),console.log("✅ Sample workflow creation completed!")}autoArrange(){if(!this.workflow||this.workflow.nodes.length===0)return;const t={start:0,approver:1,condition:2,parallel:3,end:4},e=[...this.workflow.nodes].sort((o,i)=>{const r=t[o.type]??5,n=t[i.type]??5;return r-n});this.workflow.nodes=e,d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}async saveWorkflow(){if(this.workflow){this.isLoading=!0,console.log("💾 Saving workflow to ServiceNow...");try{await new Promise(e=>setTimeout(e,2e3));const t=`WF-${Date.now()}`;this.workflow.id=t,console.log("✅ Workflow saved successfully:",t),this.showSuccessMessage(`✅ Workflow ${t} saved to ServiceNow!`)}catch(t){console.error("❌ Failed to save workflow:",t),this.showErrorMessage("❌ Failed to save workflow. Please try again.")}finally{this.isLoading=!1}}}async deployWorkflow(){if(!this.workflow)return;const t=this.generateWorkflowSummary();if(confirm(`Deploy this workflow?

Name: ${t.name}
Steps: ${t.nodeCount}
Approvers: ${t.approvers.join(", ")}
Est. Processing Time: ${t.estimatedProcessingTime}

This will make the workflow active for all users.`)){this.isLoading=!0,console.log("🚀 Deploying workflow to ServiceNow...");try{await new Promise(i=>setTimeout(i,3e3));const o=this.workflow.id||`WF-${Date.now()}`;console.log("✅ Workflow deployed successfully:",o),this.showSuccessMessage(`🚀 Workflow ${o} is now LIVE in ServiceNow!`)}catch(o){console.error("❌ Failed to deploy workflow:",o),this.showErrorMessage("❌ Failed to deploy workflow. Please try again.")}finally{this.isLoading=!1}}}async testWorkflow(){if(this.workflow){this.isLoading=!0,console.log("🧪 Testing workflow execution...");try{await new Promise(e=>setTimeout(e,4e3));const t={totalSteps:this.workflow.nodes.length,completedSteps:this.workflow.nodes.length,executionTime:"2.3 seconds",status:"PASSED"};console.log("✅ Workflow test completed:",t),this.showSuccessMessage(`🧪 Test Results: ${t.status}
Steps: ${t.completedSteps}/${t.totalSteps}
Execution Time: ${t.executionTime}`)}catch(t){console.error("❌ Workflow test failed:",t),this.showErrorMessage("❌ Workflow test failed. Please check your configuration.")}finally{this.isLoading=!1}}}generateWorkflowSummary(){if(!this.workflow)return{};const t=this.workflow.nodes.filter(o=>o.type==="approver").map(o=>o.configuration.approver||"Unassigned"),e=this.workflow.nodes.filter(o=>o.type==="approver").reduce((o,i)=>o+(i.configuration.timeout||0),0);return{name:this.workflow.name,nodeCount:this.workflow.nodes.length,connectionCount:this.workflow.connections.length,approvers:t,estimatedProcessingTime:`${e} hours`,lastModified:new Date().toLocaleString()}}showSuccessMessage(t){alert(t)}showErrorMessage(t){alert(t)}render(){return f`
      <div class="approval-builder">
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
            
            <div class="status-indicator ${this.getStatusIndicator()}">
              ${this.getStatusText()}
            </div>
          </div>

          <!-- Workflow Info with Tool Buttons -->
          ${this.workflow?f`
            <div class="workflow-info">
              <div class="workflow-title">
                <h3>${this.workflow.name}</h3>
                <p>${this.workflow.nodes.length} nodes, ${this.workflow.connections.length} connections</p>
              </div>
              <div class="workflow-tools">
                <button @click=${()=>this.addNode("start")} title="Add Start">🚀</button>
                <button @click=${()=>this.addNode("approver")} title="Add Approver">👤</button>
                <button @click=${()=>this.addNode("condition")} title="Add Condition">❓</button>
                <button @click=${()=>this.addNode("end")} title="Add End">🏁</button>
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
            ${this.isLoading?f`
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
    `}};T.styles=O`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .approval-builder {
      display: flex;
      height: 100%;
      width: 100%;
      background: #ffffff;
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
  `;oe([m({type:Object})],T.prototype,"workflow",2);oe([w()],T.prototype,"isLoading",2);oe([w()],T.prototype,"selectedNodeId",2);T=oe([L("approval-builder")],T);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,le=(t,e,o,i)=>{for(var r=i>1?void 0:i?tt(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&et(e,o,r),r};let F=class extends v{constructor(){super(...arguments),this.connections=[],this.nodes=[]}getNodePosition(t){const e=this.nodes.find(o=>o.id===t);return e?{x:e.position.x+100,y:e.position.y+40}:null}getConnectionPath(t){const e=this.getNodePosition(t.from),o=this.getNodePosition(t.to);if(console.log(`🔗 Calculating path for ${t.from} → ${t.to}:`,{fromPos:e,toPos:o,hasFrom:!!e,hasTo:!!o}),!e||!o)return console.log(`❌ Missing position data for connection ${t.id}`),"";const i=o.x-e.x,r=o.y-e.y,n=Math.sqrt(i*i+r*r),s=Math.min(n*.3,100),a=e.x+s,l=e.y,p=o.x-s,u=o.y,c=`M ${e.x} ${e.y} C ${a} ${l}, ${p} ${u}, ${o.x} ${o.y}`;return console.log(`🔗 Generated path: ${c}`),c}render(){return console.log("🔗 ConnectionLayer render:",{connections:this.connections.length,nodes:this.nodes.length}),console.log("🔗 ConnectionLayer component is rendering!"),f`
          <div class="connections-container">
            ${this.connections.map((t,e)=>{const o=this.getNodePosition(t.from),i=this.getNodePosition(t.to);if(console.log(`🔗 Connection ${e+1}:`,{id:t.id,from:t.from,to:t.to,fromPos:o,toPos:i}),!o||!i)return f``;const r=i.x-o.x,n=i.y-o.y,s=Math.sqrt(r*r+n*n),a=Math.atan2(n,r)*180/Math.PI;return f`
                <div 
                  class="connection-line ${t.type}"
                  style="
                    left: ${o.x}px;
                    top: ${o.y}px;
                    width: ${s}px;
                    transform: rotate(${a}deg);
                    transform-origin: 0 0;
                  "
                  data-connection-id=${t.id}
                  data-from=${t.from}
                  data-to=${t.to}>
                </div>
              `})}
          </div>
        `}};F.styles=O`
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
  `;le([m({type:Array})],F.prototype,"connections",2);le([m({type:Array})],F.prototype,"nodes",2);F=le([L("connection-layer")],F);var ot=Object.defineProperty,it=Object.getOwnPropertyDescriptor,H=(t,e,o,i)=>{for(var r=i>1?void 0:i?it(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&ot(e,o,r),r};let x=class extends v{constructor(){super(...arguments),this.workflow=null,this.selectedNodeId=null,this.canvasSize={width:800,height:600},this.viewportSize={width:800,height:600},this.resizeObserver=null,this.onNodeMoveUp=t=>{console.log("🔄 Canvas received move-up event:",t.detail),this.moveNode(t.detail.node,-1)},this.onNodeMoveDown=t=>{console.log("🔄 Canvas received move-down event:",t.detail),this.moveNode(t.detail.node,1)},this.onNodeMoveUpEventBus=t=>{console.log("🔄 Canvas received move-up event via event bus:",t),this.moveNode(t.node,-1)},this.onNodeMoveDownEventBus=t=>{console.log("🔄 Canvas received move-down event via event bus:",t),this.moveNode(t.node,1)},this.onTemplateAdd=t=>{console.log("📋 Adding template to workflow:",t.template)},this.onNodeTypeAdd=t=>{console.log("➕ Adding node type to workflow:",t.nodeType),this.addNode(t.nodeType,{x:0,y:0})},this.onPropertyChanged=t=>{const{nodeId:e,path:o,value:i}=t.detail;this.updateWorkflowNodeProperty(e,o,i)},this.onPropertyChangedEventBus=t=>{this.updateWorkflowNodeProperty(t.nodeId,t.path,t.value)}}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.setupResizeObserver(),this.addEventListener("node-move-up",this.onNodeMoveUp),this.addEventListener("node-move-down",this.onNodeMoveDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListeners(),this.cleanupResizeObserver()}setupEventListeners(){d.on(h.NODE_ADDED,this.onNodeAdded.bind(this)),d.on(h.NODE_DELETED,this.onNodeDeleted.bind(this)),d.on(h.NODE_MOVED,this.onNodeMoved.bind(this)),d.on(h.WORKFLOW_UPDATED,this.onWorkflowUpdated.bind(this)),d.on("node-move-up",this.onNodeMoveUpEventBus.bind(this)),d.on("node-move-down",this.onNodeMoveDownEventBus.bind(this)),d.on("template-add",this.onTemplateAdd.bind(this)),d.on("node-type-add",this.onNodeTypeAdd.bind(this)),this.addEventListener("property-changed",this.onPropertyChanged),d.on("property-changed",this.onPropertyChangedEventBus)}removeEventListeners(){d.off(h.NODE_ADDED,this.onNodeAdded.bind(this)),d.off(h.NODE_DELETED,this.onNodeDeleted.bind(this)),d.off(h.NODE_MOVED,this.onNodeMoved.bind(this)),d.off(h.WORKFLOW_UPDATED,this.onWorkflowUpdated.bind(this)),this.removeEventListener("property-changed",this.onPropertyChanged),d.off("property-changed",this.onPropertyChangedEventBus)}setupResizeObserver(){typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(t=>{for(const e of t){const{width:o,height:i}=e.contentRect;this.updateCanvasSize(o,i)}}),this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(".canvas");t&&this.resizeObserver?.observe(t)}))}cleanupResizeObserver(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}updateCanvasSize(t,e){this.canvasSize={width:t,height:e},this.viewportSize={width:Math.max(800,t-20),height:Math.max(500,e-80)},console.log("Canvas resized:",{canvas:this.canvasSize,viewport:this.viewportSize}),this.repositionNodesIfNeeded()}repositionNodesIfNeeded(){if(!this.workflow)return;let t=!1;const{width:e,height:o}=this.viewportSize;for(const i of this.workflow.nodes)if(i.position.x>e-200||i.position.y>o-100){t=!0;break}t&&(console.log("Repositioning nodes to fit within visible area"),this.repositionAllNodes())}repositionAllNodes(){if(!this.workflow)return;const{width:t,height:e}=this.viewportSize,o=180,i=80,r=80;this.workflow.nodes.forEach((n,s)=>{const a=i+s*o%(t-200),l=r+Math.floor(s*o/(t-200))*80;n.position={x:Math.min(a,t-200),y:Math.min(l,e-100)}}),this.updateConnections(),d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}onNodeAdded(t){this.workflow&&(this.workflow.nodes.push(t),this.requestUpdate())}onNodeDeleted(t){this.workflow&&(this.workflow.nodes=this.workflow.nodes.filter(e=>e.id!==t),this.workflow.connections=this.workflow.connections.filter(e=>e.from!==t&&e.to!==t),this.requestUpdate())}onNodeMoved(t){if(this.workflow){const e=this.workflow.nodes.find(o=>o.id===t.nodeId);e&&(e.position=t.position,e.updatedAt=new Date,this.requestUpdate())}}onWorkflowUpdated(t){console.log("🔄 Workflow updated in canvas:",t.nodes.length,"nodes"),this.workflow=t,this.requestUpdate(),setTimeout(()=>{this.updateAllStepNumbers()},100)}updateAllStepNumbers(){const t=this.shadowRoot?.querySelectorAll("approval-node");t&&t.forEach(e=>{e.forceStepNumberUpdate&&e.forceStepNumberUpdate()})}updateWorkflowNodeProperty(t,e,o){if(!this.workflow)return;const i=this.workflow.nodes.find(s=>s.id===t);if(!i)return;const r=e.split(".");let n=i;for(let s=0;s<r.length-1;s++)n[r[s]]||(n[r[s]]={}),n=n[r[s]];n[r[r.length-1]]=o,i.updatedAt=new Date,this.workflow.updatedAt=new Date,d.emit(h.WORKFLOW_UPDATED,this.workflow),console.log(`🔄 Workflow updated: Node ${i.name} - ${e} = ${o}`)}moveNode(t,e){if(!this.workflow)return;const o=this.workflow.nodes.findIndex(n=>n.id===t.id);if(console.log("🔄 Current node order:",this.workflow.nodes.map(n=>n.name)),console.log("🔄 Moving node:",t.name,"from index:",o,"direction:",e),o===-1){console.log("❌ Node not found in workflow");return}const i=o+e;if(i<0||i>=this.workflow.nodes.length){console.log("❌ Cannot move node - would be out of bounds");return}const[r]=this.workflow.nodes.splice(o,1);this.workflow.nodes.splice(i,0,r),console.log("🔄 New node order:",this.workflow.nodes.map(n=>n.name)),this.updateConnections(),this.workflow={...this.workflow},d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),setTimeout(()=>{this.updateAllStepNumbers()},50),console.log("✅ Node moved successfully")}updateConnections(){if(!this.workflow)return;const t=[...this.workflow.nodes].sort((e,o)=>e.position.x-o.position.x);this.workflow.connections=[];for(let e=0;e<t.length-1;e++)this.workflow.connections.push({id:`conn_${t[e].id}_to_${t[e+1].id}`,from:t[e].id,to:t[e+1].id,type:"approval"});console.log("🔄 Updated connections:",this.workflow.connections.length),this.updateStepNumbers()}updateStepNumbers(){this.shadowRoot?.querySelectorAll("approval-node")?.forEach(e=>{e.forceStepNumberUpdate()}),console.log("🔢 Forced step number updates on all nodes")}debugConnections(){if(!this.workflow){console.log("❌ No workflow to debug");return}console.log("🔗 === CONNECTION DEBUG ==="),console.log("🔗 Total connections:",this.workflow.connections.length),this.workflow.connections.forEach((t,e)=>{const o=this.workflow.nodes.find(r=>r.id===t.from),i=this.workflow.nodes.find(r=>r.id===t.to);console.log(`🔗 Connection ${e+1}:`,{id:t.id,type:t.type,from:o?`${o.name} (${o.position.x}, ${o.position.y})`:"NOT FOUND",to:i?`${i.name} (${i.position.x}, ${i.position.y})`:"NOT FOUND"})}),console.log("🔗 === END CONNECTION DEBUG ===")}debugEverything(){console.log("🐛 === COMPLETE DEBUG ==="),console.log("🐛 Workflow exists:",!!this.workflow),this.workflow&&(console.log("🐛 Nodes count:",this.workflow.nodes.length),console.log("🐛 Connections count:",this.workflow.connections.length),console.log("🐛 Canvas size:",this.shadowRoot?.querySelector(".canvas")?.getBoundingClientRect()),console.log("🐛 Canvas content size:",this.shadowRoot?.querySelector(".canvas-content")?.getBoundingClientRect()),console.log("🐛 Connection layer size:",this.shadowRoot?.querySelector(".connections-layer")?.getBoundingClientRect()),console.log("🐛 All nodes:",this.workflow.nodes.map(t=>`${t.name} at (${t.position.x}, ${t.position.y})`)),console.log("🐛 All connections:",this.workflow.connections.map(t=>`${t.from} → ${t.to}`))),console.log("🐛 === END COMPLETE DEBUG ===")}onCanvasClick(t){t.target===this.shadowRoot?.querySelector(".canvas")&&d.emit(h.NODE_SELECTED,null)}addNode(t,e){if(!this.workflow)return;console.log(`Adding node of type: ${t}`);const o={id:`node_${Date.now()}`,type:t,name:this.getDefaultNodeName(t),position:{x:0,y:0},configuration:this.getDefaultConfiguration(t),createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(o),d.emit(h.NODE_ADDED,o),d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}getDefaultNodeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel Approvers"}[t]||"Node"}getDefaultConfiguration(t){return{approver:{approvalType:"single",timeout:7},condition:{conditionType:"amount",operator:"greaterThan"},parallel:{approvalType:"all",timeout:7,parallelCount:2},start:{},end:{}}[t]||{}}onZoomIn(){console.log("Zoom in")}onZoomOut(){console.log("Zoom out")}onFitToScreen(){console.log("Fit to screen")}clearCanvas(){this.workflow&&(this.workflow.nodes=[],this.workflow.connections=[],d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("Canvas cleared"))}debugPositions(){this.workflow&&(console.log("=== NODE POSITIONS DEBUG ==="),this.workflow.nodes.forEach((t,e)=>{console.log(`Node ${e+1} (${t.type}): x=${t.position.x}, y=${t.position.y}`)}),console.log("============================"))}spreadNodes(){this.workflow&&(this.workflow.nodes.forEach((r,n)=>{r.position={x:150+n*250%1200,y:150+Math.floor(n*250/1200)*120}}),d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("Nodes spread out in grid pattern"))}addTestNode(){const t={x:100,y:300};this.addNode("approver",t),console.log("Added test node at position:",t)}autoArrange(){if(!this.workflow||this.workflow.nodes.length===0){console.log("❌ No workflow or nodes to arrange");return}console.log("🔄 Auto-arranging",this.workflow.nodes.length,"nodes");const t={start:0,approver:1,condition:2,parallel:3,end:4},e=[...this.workflow.nodes].sort((a,l)=>{const p=t[a.type]??5,u=t[l.type]??5;return p-u});console.log("🔄 Sorted nodes by type:",e.map(a=>`${a.type}: ${a.name}`));const{width:o,height:i}=this.viewportSize,r=180,n=80,s=80;e.forEach((a,l)=>{const p=n+l*r%(o-200),u=s+Math.floor(l*r/(o-200))*80,c={x:Math.min(p,o-200),y:Math.min(u,i-100)};console.log(`🔄 Moving ${a.name} from (${a.position.x}, ${a.position.y}) to (${c.x}, ${c.y})`),a.position=c}),this.workflow.connections=[];for(let a=0;a<e.length-1;a++)this.workflow.connections.push({from:e[a].id,to:e[a+1].id});console.log("🔄 Created",this.workflow.connections.length,"connections"),d.emit(h.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("✅ Auto-arranged nodes in logical workflow order")}render(){return this.workflow?f`
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
            ${this.workflow.nodes.map(t=>f`
              <approval-node 
                .node=${t}
                .isSelected=${t.id===this.selectedNodeId}
                @node-select=${()=>d.emit(h.NODE_SELECTED,t)}
                @node-edit=${()=>d.emit(h.NODE_EDITED,t)}
                @node-delete=${()=>d.emit(h.NODE_DELETED,t.id)}
                @node-move=${e=>d.emit(h.NODE_MOVED,e.detail)}>
              </approval-node>
            `)}
          </div>
        </div>
      </div>
    `:f`
        <div class="canvas">
          <div class="canvas-header">
            <h3>No Workflow Loaded</h3>
            <p>Create a new workflow or load an existing one</p>
          </div>
        </div>
      `}};x.styles=O`
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
  `;H([m({type:Object})],x.prototype,"workflow",2);H([m({type:String})],x.prototype,"selectedNodeId",2);H([w()],x.prototype,"canvasSize",2);H([w()],x.prototype,"viewportSize",2);x=H([L("approval-canvas")],x);const rt="modulepreload",nt=function(t){return"/flow-designer/"+t},be={},ee=function(e,o,i){if(!o||o.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(o.map(n=>{if(n=nt(n),n in be)return;be[n]=!0;const s=n.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!i)for(let u=r.length-1;u>=0;u--){const c=r[u];if(c.href===n&&(!s||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${a}`))return;const p=document.createElement("link");if(p.rel=s?"stylesheet":rt,s||(p.as="script",p.crossOrigin=""),p.href=n,document.head.appendChild(p),s)return new Promise((u,c)=>{p.addEventListener("load",u),p.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>e()).catch(n=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=n,window.dispatchEvent(s),!s.defaultPrevented)throw n})};var st=Object.defineProperty,at=Object.getOwnPropertyDescriptor,V=(t,e,o,i)=>{for(var r=i>1?void 0:i?at(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&st(e,o,r),r};let E=class extends v{constructor(){super(...arguments),this.isSelected=!1,this.cachedStepNumber="?",this.lastPositionX=0,this.onPropertyChanged=t=>{const{nodeId:e,path:o,value:i}=t.detail;e===this.node?.id&&this.updateNodeProperty(o,i)},this.onPropertyChangedEventBus=t=>{t.nodeId===this.node?.id&&this.updateNodeProperty(t.path,t.value)}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.onNodeClick),this.addEventListener("dblclick",this.onDoubleClick),this.setupEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.onNodeClick),this.removeEventListener("dblclick",this.onDoubleClick),this.removeEventListeners()}setupEventListeners(){this.addEventListener("property-changed",this.onPropertyChanged),d.on("property-changed",this.onPropertyChangedEventBus)}removeEventListeners(){this.removeEventListener("property-changed",this.onPropertyChanged),d.off("property-changed",this.onPropertyChangedEventBus)}updateNodeProperty(t,e){if(!this.node)return;const o=t.split(".");let i=this.node;for(let r=0;r<o.length-1;r++)i[o[r]]||(i[o[r]]={}),i=i[o[r]];i[o[o.length-1]]=e,this.node.updatedAt=new Date,this.requestUpdate(),console.log(`🔄 Node ${this.node.name} updated: ${t} = ${e}`)}onNodeClick(t){t.preventDefault(),t.stopPropagation(),this.node&&this.dispatchEvent(new CustomEvent("node-select",{detail:{node:this.node},bubbles:!0}))}onDoubleClick(){this.dispatchEvent(new CustomEvent("node-edit",{detail:{node:this.node},bubbles:!0}))}onEdit(){this.dispatchEvent(new CustomEvent("node-edit",{detail:{node:this.node},bubbles:!0}))}onDelete(){confirm(`Delete "${this.node.name}"?`)&&this.dispatchEvent(new CustomEvent("node-delete",{detail:{nodeId:this.node.id},bubbles:!0}))}onMoveUp(){console.log("🔄 Move Up clicked for node:",this.node.name,this.node.id),ee(()=>Promise.resolve().then(()=>Z),void 0).then(({eventBus:t})=>{t.emit("node-move-up",{node:this.node})}),this.dispatchEvent(new CustomEvent("node-move-up",{detail:{node:this.node},bubbles:!0,composed:!0}))}onMoveDown(){console.log("🔄 Move Down clicked for node:",this.node.name,this.node.id),ee(()=>Promise.resolve().then(()=>Z),void 0).then(({eventBus:t})=>{t.emit("node-move-down",{node:this.node})}),this.dispatchEvent(new CustomEvent("node-move-down",{detail:{node:this.node},bubbles:!0,composed:!0}))}getNodeIcon(){return{start:"🚀",end:"🏁",approver:"👤",condition:"❓",parallel:"⚡"}[this.node.type]||"📋"}getStepNumber(){const t=this.node.position.x;return Math.abs(t-this.lastPositionX)<5&&this.cachedStepNumber!=="?"?this.cachedStepNumber:this.calculateStepNumber()}calculateStepNumber(){const t=this.shadowRoot?.host.parentElement;if(!t)return"?";const e=t.querySelectorAll("approval-node"),i=Array.from(e).indexOf(this.shadowRoot?.host),r=i>=0?(i+1).toString():"?";return this.cachedStepNumber=r,this.lastPositionX=this.node.position.x,r}forceStepNumberUpdate(){this.cachedStepNumber="?",this.lastPositionX=-999999,this.calculateStepNumber()}getApproverDisplayText(){return this.node.configuration.approver?Array.isArray(this.node.configuration.approver)?this.node.configuration.approver.length===0?"Select Approver":this.node.configuration.approver.length===1?this.node.configuration.approver[0]:`${this.node.configuration.approver.length} approvers selected`:this.node.configuration.approver:"Select Approver"}getConditionDisplayText(){if(!this.node.configuration.conditionType||!this.node.configuration.operator||!this.node.configuration.value)return"Set Condition";const t=this.node.configuration.conditionType,e=this.node.configuration.operator,o=this.node.configuration.value,i={greaterThan:">",lessThan:"<",equals:"="}[e]||e;return`${t} ${i} ${o}`}getParallelDisplayText(){const t=this.node.configuration.parallelCount||2,o=(this.node.configuration.approvalType||"all")==="all"?"All must approve":"Any can approve";return`${t} approvers - ${o}`}renderNodeContent(){switch(this.node.type){case"approver":return f`
          <div class="approver-info">
            <div class="approver-name">
              ${this.getApproverDisplayText()}
            </div>
            <div class="approval-type">
              ${this.node.configuration.approvalType||"single"} approval
              ${this.node.configuration.timeout?`(${this.node.configuration.timeout}d timeout)`:""}
            </div>
          </div>
        `;case"condition":return f`
          <div class="condition-info">
            <div class="condition-text">
              ${this.getConditionDisplayText()}
            </div>
          </div>
        `;case"parallel":return f`
          <div class="parallel-info">
            <div class="parallel-count">
              ${this.getParallelDisplayText()}
            </div>
          </div>
        `;case"start":return f`
          <div class="node-info">
            <div class="condition-text">
              ${this.node.configuration.triggerSource||"Trigger Source"}
            </div>
          </div>
        `;default:return f`
          <div class="node-info">
            ${this.node.name}
          </div>
        `}}render(){return this.node?f`
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
    `:(console.warn("ApprovalNode: No node data provided"),f``)}};E.styles=O`
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
  `;V([m({type:Object})],E.prototype,"node",2);V([m({type:Boolean})],E.prototype,"isSelected",2);V([w()],E.prototype,"cachedStepNumber",2);V([w()],E.prototype,"lastPositionX",2);E=V([L("approval-node")],E);var lt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,de=(t,e,o,i)=>{for(var r=i>1?void 0:i?dt(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&lt(e,o,r),r};let B=class extends v{constructor(){super(...arguments),this.templates=[],this.isLoading=!1}connectedCallback(){super.connectedCallback(),this.loadTemplates()}async loadTemplates(){this.isLoading=!0;try{this.templates=await Q.getApprovalTemplates()}catch(t){console.error("Failed to load templates:",t)}finally{this.isLoading=!1}}onTemplateClick(t){console.log("Template clicked:",t.id),ee(()=>Promise.resolve().then(()=>Z),void 0).then(({eventBus:e})=>{e.emit("template-add",{template:t})})}onNodeTypeClick(t){console.log("Node type clicked:",t),ee(()=>Promise.resolve().then(()=>Z),void 0).then(({eventBus:e})=>{e.emit("node-type-add",{nodeType:t})})}getNodeTypeIcon(t){return{start:"🚀",end:"🏁",approver:"👤",condition:"❓",parallel:"⚡"}[t]||"📋"}getNodeTypeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel"}[t]||t}render(){return this.isLoading?f`
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
      `:f`
      <div class="palette">
        <div class="palette-header">
          <h3>Approval Builder</h3>
        </div>
        
        <div class="palette-content">
          <!-- Quick Templates -->
          <div class="section">
            <div class="section-title">Quick Templates</div>
            <div class="templates-grid">
              ${this.templates.map(t=>f`
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
              ${["start","approver","condition","parallel","end"].map(t=>f`
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
    `}};B.styles=O`
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
  `;de([w()],B.prototype,"templates",2);de([w()],B.prototype,"isLoading",2);B=de([L("approval-palette")],B);var ct=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,K=(t,e,o,i)=>{for(var r=i>1?void 0:i?pt(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&ct(e,o,r),r};let C=class extends v{constructor(){super(...arguments),this.selectedNodeId=null,this.workflow=null,this.users=[],this.isLoading=!1}connectedCallback(){super.connectedCallback(),this.loadUsers()}async loadUsers(){this.isLoading=!0;try{this.users=await Q.getUsers()}catch(t){console.error("Failed to load users:",t)}finally{this.isLoading=!1}}get selectedNode(){return!this.selectedNodeId||!this.workflow?null:this.workflow.nodes.find(t=>t.id===this.selectedNodeId)||null}onNameChange(t){const e=t.target;this.updateNodeProperty("name",e.value)}onApprovalTypeChange(t){const e=t.target;this.updateNodeProperty("configuration.approvalType",e.value)}onApproverChange(t){const e=t.target;this.updateNodeProperty("configuration.approver",e.value)}onTimeoutChange(t){const e=t.target;this.updateNodeProperty("configuration.timeout",parseInt(e.value))}onTriggerSourceChange(t){const e=t.target;this.updateNodeProperty("configuration.triggerSource",e.value)}onConditionTypeChange(t){const e=t.target;this.updateNodeProperty("configuration.conditionType",e.value)}onOperatorChange(t){const e=t.target;this.updateNodeProperty("configuration.operator",e.value)}onValueChange(t){const e=t.target;this.updateNodeProperty("configuration.value",e.value)}onParallelCountChange(t){const e=t.target;this.updateNodeProperty("configuration.parallelCount",parseInt(e.value))}isApproverSelected(t){const e=this.selectedNode;return!e||!e.configuration.approver?!1:Array.isArray(e.configuration.approver)?e.configuration.approver.includes(t):e.configuration.approver===t}onApproverSelect(t){const e=this.selectedNode;if(!e)return;let o=[];e.configuration.approver&&(Array.isArray(e.configuration.approver)?o=[...e.configuration.approver]:o=[e.configuration.approver]);const i=o.indexOf(t.name);i>-1?o.splice(i,1):o.push(t.name),this.updateNodeProperty("configuration.approver",o)}updateNodeProperty(t,e){if(!this.selectedNode)return;const o=t.split(".");let i=this.selectedNode;for(let r=0;r<o.length-1;r++)i[o[r]]||(i[o[r]]={}),i=i[o[r]];i[o[o.length-1]]=e,this.selectedNode.updatedAt=new Date,this.dispatchEvent(new CustomEvent("property-changed",{detail:{nodeId:this.selectedNode.id,path:t,value:e},bubbles:!0})),this.requestUpdate()}renderApproverProperties(){return f`
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
            ${this.users.map(t=>{const e=this.isApproverSelected(t.name);return f`
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
    `}renderConditionProperties(){return f`
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
    `}renderParallelProperties(){return f`
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
    `}renderDefaultProperties(){return this.selectedNode?.type==="start"?this.renderStartProperties():f`
      <div class="property-group">
        <label class="property-label">Node Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
    `}renderStartProperties(){return f`
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
    `}renderNodeProperties(){if(!this.selectedNode)return f``;switch(this.selectedNode.type){case"approver":return this.renderApproverProperties();case"condition":return this.renderConditionProperties();case"parallel":return this.renderParallelProperties();default:return this.renderDefaultProperties()}}render(){return this.selectedNode?f`
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
    `:f`
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
      `}};C.styles=O`
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
  `;K([m({type:String})],C.prototype,"selectedNodeId",2);K([m({type:Object})],C.prototype,"workflow",2);K([w()],C.prototype,"users",2);K([w()],C.prototype,"isLoading",2);C=K([L("approval-properties")],C);console.log("🚀 ServiceNow Flow Designer V2 - Approval Workflow Builder");console.log("📦 Built with Web Components + Lit");console.log("🎯 Modern Architecture for Enterprise Workflow Automation");
//# sourceMappingURL=index-78869a34.js.map
