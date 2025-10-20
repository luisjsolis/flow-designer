(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,ne=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,re=Symbol(),ce=new WeakMap;let $e=class{constructor(e,o,n){if(this._$cssResult$=!0,n!==re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o;const o=this.t;if(ne&&e===void 0){const n=o!==void 0&&o.length===1;n&&(e=ce.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ce.set(o,e))}return e}toString(){return this.cssText}};const Ee=t=>new $e(typeof t=="string"?t:t+"",void 0,re),T=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((n,i,r)=>n+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new $e(o,t,re)},Ce=(t,e)=>{if(ne)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(const o of e){const n=document.createElement("style"),i=Y.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=o.cssText,t.appendChild(n)}},pe=ne?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(const n of e.cssRules)o+=n.cssText;return Ee(o)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Se,defineProperty:De,getOwnPropertyDescriptor:Pe,getOwnPropertyNames:Oe,getOwnPropertySymbols:Te,getPrototypeOf:Le}=Object,_=globalThis,he=_.trustedTypes,ze=he?he.emptyScript:"",Ue=_.reactiveElementPolyfillSupport,U=(t,e)=>t,G={toAttribute(t,e){switch(e){case Boolean:t=t?ze:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},se=(t,e)=>!Se(t,e),ue={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:se};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=ue){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,o);i!==void 0&&De(this.prototype,e,i)}}static getPropertyDescriptor(e,o,n){const{get:i,set:r}=Pe(this.prototype,e)??{get(){return this[o]},set(s){this[o]=s}};return{get:i,set(s){const a=i?.call(this);r?.call(this,s),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ue}static _$Ei(){if(this.hasOwnProperty(U("elementProperties")))return;const e=Le(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(U("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(U("properties"))){const o=this.properties,n=[...Oe(o),...Te(o)];for(const i of n)this.createProperty(i,o[i])}const e=this[Symbol.metadata];if(e!==null){const o=litPropertyMetadata.get(e);if(o!==void 0)for(const[n,i]of o)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[o,n]of this.elementProperties){const i=this._$Eu(o,n);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)o.unshift(pe(i))}else e!==void 0&&o.push(pe(e));return o}static _$Eu(e,o){const n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,o=this.constructor.elementProperties;for(const n of o.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ce(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,n){this._$AK(e,n)}_$ET(e,o){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const r=(n.converter?.toAttribute!==void 0?n.converter:G).toAttribute(o,n.type);this._$Em=e,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,o){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const r=n.getPropertyOptions(i),s=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:G;this._$Em=i;const a=s.fromAttribute(o,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,o,n){if(e!==void 0){const i=this.constructor,r=this[e];if(n??(n=i.getPropertyOptions(e)),!((n.hasChanged??se)(r,o)||n.useDefault&&n.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,n))))return;this.C(e,o,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:n,reflect:i,wrapped:r},s){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??o??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,r]of n){const{wrapped:s}=r,a=this[i];s!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let e=!1;const o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(o)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[U("elementProperties")]=new Map,S[U("finalized")]=new Map,Ue?.({ReactiveElement:S}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=globalThis,J=M.trustedTypes,fe=J?J.createPolicy("lit-html",{createHTML:t=>t}):void 0,_e="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+$,Me=`<${ke}>`,A=document,W=()=>A.createComment(""),j=t=>t===null||typeof t!="object"&&typeof t!="function",ae=Array.isArray,Ie=t=>ae(t)||typeof t?.[Symbol.iterator]=="function",ie=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ve=/-->/g,ge=/>/g,k=RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,be=/"/g,xe=/^(?:script|style|textarea|title)$/i,Re=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),u=Re(1),D=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),ye=new WeakMap,x=A.createTreeWalker(A,129);function Ae(t,e){if(!ae(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return fe!==void 0?fe.createHTML(e):e}const We=(t,e)=>{const o=t.length-1,n=[];let i,r=e===2?"<svg>":e===3?"<math>":"",s=z;for(let a=0;a<o;a++){const l=t[a];let c,p,d=-1,y=0;for(;y<l.length&&(s.lastIndex=y,p=s.exec(l),p!==null);)y=s.lastIndex,s===z?p[1]==="!--"?s=ve:p[1]!==void 0?s=ge:p[2]!==void 0?(xe.test(p[2])&&(i=RegExp("</"+p[2],"g")),s=k):p[3]!==void 0&&(s=k):s===k?p[0]===">"?(s=i??z,d=-1):p[1]===void 0?d=-2:(d=s.lastIndex-p[2].length,c=p[1],s=p[3]===void 0?k:p[3]==='"'?be:me):s===be||s===me?s=k:s===ve||s===ge?s=z:(s=k,i=void 0);const w=s===k&&t[a+1].startsWith("/>")?" ":"";r+=s===z?l+Me:d>=0?(n.push(c),l.slice(0,d)+_e+l.slice(d)+$+w):l+$+(d===-2?a:w)}return[Ae(t,r+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class F{constructor({strings:e,_$litType$:o},n){let i;this.parts=[];let r=0,s=0;const a=e.length-1,l=this.parts,[c,p]=We(e,o);if(this.el=F.createElement(c,n),x.currentNode=this.el.content,o===2||o===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=x.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(_e)){const y=p[s++],w=i.getAttribute(d).split($),Z=/([.?@])?(.*)/.exec(y);l.push({type:1,index:r,name:Z[2],strings:w,ctor:Z[1]==="."?Fe:Z[1]==="?"?He:Z[1]==="@"?Be:te}),i.removeAttribute(d)}else d.startsWith($)&&(l.push({type:6,index:r}),i.removeAttribute(d));if(xe.test(i.tagName)){const d=i.textContent.split($),y=d.length-1;if(y>0){i.textContent=J?J.emptyScript:"";for(let w=0;w<y;w++)i.append(d[w],W()),x.nextNode(),l.push({type:2,index:++r});i.append(d[y],W())}}}else if(i.nodeType===8)if(i.data===ke)l.push({type:2,index:r});else{let d=-1;for(;(d=i.data.indexOf($,d+1))!==-1;)l.push({type:7,index:r}),d+=$.length-1}r++}}static createElement(e,o){const n=A.createElement("template");return n.innerHTML=e,n}}function P(t,e,o=t,n){if(e===D)return e;let i=n!==void 0?o._$Co?.[n]:o._$Cl;const r=j(e)?void 0:e._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(t),i._$AT(t,o,n)),n!==void 0?(o._$Co??(o._$Co=[]))[n]=i:o._$Cl=i),i!==void 0&&(e=P(t,i._$AS(t,e.values),i,n)),e}class je{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:o},parts:n}=this._$AD,i=(e?.creationScope??A).importNode(o,!0);x.currentNode=i;let r=x.nextNode(),s=0,a=0,l=n[0];for(;l!==void 0;){if(s===l.index){let c;l.type===2?c=new q(r,r.nextSibling,this,e):l.type===1?c=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(c=new qe(r,this,e)),this._$AV.push(c),l=n[++a]}s!==l?.index&&(r=x.nextNode(),s++)}return x.currentNode=A,i}p(e){let o=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,o),o+=n.strings.length-2):n._$AI(e[o])),o++}}class q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,n,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=P(this,e,o),j(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ie(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&j(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){const{values:o,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=F.createElement(Ae(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(o);else{const r=new je(i,this),s=r.u(this.options);r.p(o),this.T(s),this._$AH=r}}_$AC(e){let o=ye.get(e.strings);return o===void 0&&ye.set(e.strings,o=new F(e)),o}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());const o=this._$AH;let n,i=0;for(const r of e)i===o.length?o.push(n=new q(this.O(W()),this.O(W()),this,this.options)):n=o[i],n._$AI(r),i++;i<o.length&&(this._$AR(n&&n._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,n,i,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=r,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=v}_$AI(e,o=this,n,i){const r=this.strings;let s=!1;if(r===void 0)e=P(this,e,o,0),s=!j(e)||e!==this._$AH&&e!==D,s&&(this._$AH=e);else{const a=e;let l,c;for(e=r[0],l=0;l<r.length-1;l++)c=P(this,a[n+l],o,l),c===D&&(c=this._$AH[l]),s||(s=!j(c)||c!==this._$AH[l]),c===v?e=v:e!==v&&(e+=(c??"")+r[l+1]),this._$AH[l]=c}s&&!i&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Fe extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}}class He extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}}class Be extends te{constructor(e,o,n,i,r){super(e,o,n,i,r),this.type=5}_$AI(e,o=this){if((e=P(this,e,o,0)??v)===D)return;const n=this._$AH,i=e===v&&n!==v||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,r=e!==v&&(n===v||i);i&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class qe{constructor(e,o,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}}const Ve=M.litHtmlPolyfillSupport;Ve?.(F,q),(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.3.1");const Ke=(t,e,o)=>{const n=o?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const r=o?.renderBefore??null;n._$litPart$=i=new q(e.insertBefore(W(),r),r,void 0,o??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis;class g extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o;const e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ke(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}g._$litElement$=!0,g.finalized=!0,I.litElementHydrateSupport?.({LitElement:g});const Xe=I.litElementPolyfillSupport;Xe?.({LitElement:g});(I.litElementVersions??(I.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ze={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:se},Ye=(t=Ze,e,o)=>{const{kind:n,metadata:i}=o;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),n==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),n==="accessor"){const{name:s}=o;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(s,l,t)},init(a){return a!==void 0&&this.C(s,void 0,t,a),a}}}if(n==="setter"){const{name:s}=o;return function(a){const l=this[s];e.call(this,a),this.requestUpdate(s,l,t)}}throw Error("Unsupported decorator location: "+n)};function m(t){return(e,o)=>typeof o=="object"?Ye(t,e,o):((n,i,r)=>{const s=i.hasOwnProperty(r);return i.constructor.createProperty(r,n),s?Object.getOwnPropertyDescriptor(i,r):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(t){return m({...t,state:!0,attribute:!1})}class Ne{constructor(){this.listeners=new Map}emit(e,o){(this.listeners.get(e)||[]).forEach(i=>{try{i(o)}catch(r){console.error(`Error in event callback for ${e}:`,r)}})}on(e,o){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(o)}off(e,o){const n=this.listeners.get(e)||[],i=n.indexOf(o);i>-1&&n.splice(i,1)}once(e,o){const n=i=>{o(i),this.off(e,n)};this.on(e,n)}}const h=new Ne,f={WORKFLOW_UPDATED:"workflow-updated",WORKFLOW_SAVED:"workflow-saved",WORKFLOW_VALIDATED:"workflow-validated",NODE_SELECTED:"node-selected",NODE_ADDED:"node-added",NODE_EDITED:"node-edited",NODE_DELETED:"node-deleted",NODE_MOVED:"node-moved",CONNECTION_ADDED:"connection-added",CONNECTION_DELETED:"connection-deleted",CANVAS_CLICKED:"canvas-clicked",PROPERTY_CHANGED:"property-changed",VALIDATION_ERROR:"validation-error",VALIDATION_SUCCESS:"validation-success"},Q=Object.freeze(Object.defineProperty({__proto__:null,EVENTS:f,EventBus:Ne,eventBus:h},Symbol.toStringTag,{value:"Module"}));class Ge{constructor(){this.baseUrl="/api/servicenow"}async getFlowDefinition(e){return await this.delay(300),{id:e,name:"Sample Approval Flow",description:"A sample approval workflow for demonstration",nodes:[{id:"start_1",type:"start",name:"Start",position:{x:100,y:100},configuration:{},createdAt:new Date,updatedAt:new Date},{id:"approver_1",type:"approver",name:"Manager Approval",position:{x:300,y:100},configuration:{approvalType:"single",timeout:7},approver:{id:"john_smith",name:"John Smith",email:"john@company.com"},createdAt:new Date,updatedAt:new Date},{id:"end_1",type:"end",name:"Complete",position:{x:500,y:100},configuration:{},createdAt:new Date,updatedAt:new Date}],connections:[{id:"conn_1",from:"start_1",to:"approver_1",type:"approval"},{id:"conn_2",from:"approver_1",to:"end_1",type:"approval"}],createdAt:new Date,updatedAt:new Date,version:"1.0.0"}}async saveFlowDefinition(e){await this.delay(500),console.log("💾 Saving flow:",e.name)}async validateFlow(e){await this.delay(200);const o=[];return e.nodes.some(i=>i.type==="start")||o.push({type:"missing-start",message:"Workflow must have a start node",severity:"error"}),e.nodes.some(i=>i.type==="end")||o.push({type:"missing-end",message:"Workflow must have an end node",severity:"error"}),e.nodes.filter(i=>i.type==="approver").forEach(i=>{i.approver||o.push({type:"missing-approver",message:`Approver node "${i.name}" needs an assigned approver`,severity:"error",nodeId:i.id})}),{isValid:o.filter(i=>i.severity==="error").length===0,errors:o}}async getUsers(){return await this.delay(200),[{id:"john_smith",name:"John Smith",email:"john@company.com",department:"IT"},{id:"sarah_johnson",name:"Sarah Johnson",email:"sarah@company.com",department:"HR"},{id:"mike_wilson",name:"Mike Wilson",email:"mike@company.com",department:"Finance"},{id:"lisa_brown",name:"Lisa Brown",email:"lisa@company.com",department:"Operations"},{id:"david_lee",name:"David Lee",email:"david@company.com",department:"IT"}]}async createApprovalWorkflow(e){await this.delay(800);const o=`approval_workflow_${Date.now()}`;return console.log("✅ Created approval workflow:",o),o}async executeApprovalWorkflow(e,o){return await this.delay(1e3),{success:!0,executionId:`exec_${Date.now()}`,status:"completed"}}async getApprovalTemplates(){return await this.delay(200),[{id:"simple-approval",name:"Simple Approval",description:"Single approver workflow",icon:"👤",nodes:[{type:"start",name:"Start"},{type:"approver",name:"Manager Approval"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"approver"},{from:"approver",to:"end"}]},{id:"parallel-approval",name:"Parallel Approval",description:"Multiple approvers simultaneously",icon:"⚡",nodes:[{type:"start",name:"Start"},{type:"parallel",name:"Parallel Approvers"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"parallel"},{from:"parallel",to:"end"}]},{id:"conditional-approval",name:"Conditional Approval",description:"Approval based on conditions",icon:"❓",nodes:[{type:"start",name:"Start"},{type:"condition",name:"Check Amount"},{type:"approver",name:"Manager Approval"},{type:"end",name:"Complete"}],connections:[{from:"start",to:"condition"},{from:"condition",to:"approver"},{from:"approver",to:"end"}]}]}delay(e){return new Promise(o=>setTimeout(o,e))}}const R=new Ge;var Je=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,oe=(t,e,o,n)=>{for(var i=n>1?void 0:n?Qe(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&Je(e,o,i),i};let O=class extends g{constructor(){super(...arguments),this.workflow=null,this.isLoading=!1,this.selectedNodeId=null,this.boundOnNodeSelected=this.onNodeSelected.bind(this),this.boundOnWorkflowUpdated=this.onWorkflowUpdated.bind(this)}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.loadWorkflow()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListeners()}setupEventListeners(){h.on(f.NODE_SELECTED,this.boundOnNodeSelected),h.on(f.WORKFLOW_UPDATED,this.boundOnWorkflowUpdated)}removeEventListeners(){h.off(f.NODE_SELECTED,this.boundOnNodeSelected),h.off(f.WORKFLOW_UPDATED,this.boundOnWorkflowUpdated)}onNodeSelected(t){try{this.selectedNodeId=t?t.id:null,console.log("Node selected:",t?t.id:"none")}catch(e){console.error("Error in onNodeSelected:",e),this.selectedNodeId=null}}onWorkflowUpdated(t){this.workflow=t}async loadWorkflow(){this.isLoading=!0;try{const t=await R.getFlowDefinition("sample-flow-001");this.workflow=t}catch(t){console.error("Failed to load workflow:",t)}finally{this.isLoading=!1}}async saveWorkflow(){if(this.workflow){this.isLoading=!0;try{await R.saveFlowDefinition(this.workflow),h.emit(f.WORKFLOW_SAVED,this.workflow)}catch(t){console.error("Failed to save workflow:",t)}finally{this.isLoading=!1}}}async validateWorkflow(){if(this.workflow){this.isLoading=!0;try{const t=await R.validateFlow(this.workflow);h.emit(f.WORKFLOW_VALIDATED,t)}catch(t){console.error("Failed to validate workflow:",t)}finally{this.isLoading=!1}}}getStatusIndicator(){return this.isLoading?"loading":this.workflow?"valid":"invalid"}getStatusText(){return this.isLoading?"⏳ Loading...":this.workflow?"✅ Valid workflow":"❌ No workflow"}render(){return u`
      <div class="approval-builder">
        <!-- Left Panel - Approval Palette -->
        <div class="left-panel">
          <approval-palette></approval-palette>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Toolbar -->
          <div class="toolbar">
            <button @click=${this.saveWorkflow} ?disabled=${this.isLoading}>
              💾 Save
            </button>
            <button @click=${this.validateWorkflow} ?disabled=${this.isLoading}>
              🔍 Validate
            </button>
            <button class="primary" ?disabled=${this.isLoading}>
              ▶️ Test
            </button>
            
            <div class="status-indicator ${this.getStatusIndicator()}">
              ${this.getStatusText()}
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="canvas-container">
            ${this.isLoading?u`
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
    `}};O.styles=T`
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
  `;oe([m({type:Object})],O.prototype,"workflow",2);oe([b()],O.prototype,"isLoading",2);oe([b()],O.prototype,"selectedNodeId",2);O=oe([L("approval-builder")],O);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,le=(t,e,o,n)=>{for(var i=n>1?void 0:n?tt(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&et(e,o,i),i};let H=class extends g{constructor(){super(...arguments),this.connections=[],this.nodes=[]}getNodePosition(t){const e=this.nodes.find(o=>o.id===t);return e?{x:e.position.x+100,y:e.position.y+40}:null}getConnectionPath(t){const e=this.getNodePosition(t.from),o=this.getNodePosition(t.to);if(console.log(`🔗 Calculating path for ${t.from} → ${t.to}:`,{fromPos:e,toPos:o,hasFrom:!!e,hasTo:!!o}),!e||!o)return console.log(`❌ Missing position data for connection ${t.id}`),"";const n=o.x-e.x,i=o.y-e.y,r=Math.sqrt(n*n+i*i),s=Math.min(r*.3,100),a=e.x+s,l=e.y,c=o.x-s,p=o.y,d=`M ${e.x} ${e.y} C ${a} ${l}, ${c} ${p}, ${o.x} ${o.y}`;return console.log(`🔗 Generated path: ${d}`),d}render(){return console.log("🔗 ConnectionLayer render:",{connections:this.connections.length,nodes:this.nodes.length}),console.log("🔗 ConnectionLayer component is rendering!"),u`
          <div class="connections-container">
            ${this.connections.map((t,e)=>{const o=this.getNodePosition(t.from),n=this.getNodePosition(t.to);if(console.log(`🔗 Connection ${e+1}:`,{id:t.id,from:t.from,to:t.to,fromPos:o,toPos:n}),!o||!n)return u``;const i=n.x-o.x,r=n.y-o.y,s=Math.sqrt(i*i+r*r),a=Math.atan2(r,i)*180/Math.PI;return u`
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
        `}};H.styles=T`
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
  `;le([m({type:Array})],H.prototype,"connections",2);le([m({type:Array})],H.prototype,"nodes",2);H=le([L("connection-layer")],H);var ot=Object.defineProperty,it=Object.getOwnPropertyDescriptor,V=(t,e,o,n)=>{for(var i=n>1?void 0:n?it(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&ot(e,o,i),i};let N=class extends g{constructor(){super(...arguments),this.workflow=null,this.selectedNodeId=null,this.canvasSize={width:800,height:600},this.viewportSize={width:800,height:600},this.resizeObserver=null,this.onNodeMoveUp=t=>{console.log("🔄 Canvas received move-up event:",t.detail),this.moveNode(t.detail.node,-1)},this.onNodeMoveDown=t=>{console.log("🔄 Canvas received move-down event:",t.detail),this.moveNode(t.detail.node,1)},this.onNodeMoveUpEventBus=t=>{console.log("🔄 Canvas received move-up event via event bus:",t),this.moveNode(t.node,-1)},this.onNodeMoveDownEventBus=t=>{console.log("🔄 Canvas received move-down event via event bus:",t),this.moveNode(t.node,1)},this.onTemplateAdd=t=>{console.log("📋 Adding template to workflow:",t.template)},this.onNodeTypeAdd=t=>{console.log("➕ Adding node type to workflow:",t.nodeType),this.addNode(t.nodeType,{x:0,y:0})}}connectedCallback(){super.connectedCallback(),this.setupEventListeners(),this.setupResizeObserver(),this.addEventListener("node-move-up",this.onNodeMoveUp),this.addEventListener("node-move-down",this.onNodeMoveDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListeners(),this.cleanupResizeObserver()}setupEventListeners(){h.on(f.NODE_ADDED,this.onNodeAdded.bind(this)),h.on(f.NODE_DELETED,this.onNodeDeleted.bind(this)),h.on(f.NODE_MOVED,this.onNodeMoved.bind(this)),h.on("node-move-up",this.onNodeMoveUpEventBus.bind(this)),h.on("node-move-down",this.onNodeMoveDownEventBus.bind(this)),h.on("template-add",this.onTemplateAdd.bind(this)),h.on("node-type-add",this.onNodeTypeAdd.bind(this))}removeEventListeners(){h.off(f.NODE_ADDED,this.onNodeAdded.bind(this)),h.off(f.NODE_DELETED,this.onNodeDeleted.bind(this)),h.off(f.NODE_MOVED,this.onNodeMoved.bind(this))}setupResizeObserver(){typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(t=>{for(const e of t){const{width:o,height:n}=e.contentRect;this.updateCanvasSize(o,n)}}),this.updateComplete.then(()=>{const t=this.shadowRoot?.querySelector(".canvas");t&&this.resizeObserver?.observe(t)}))}cleanupResizeObserver(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}updateCanvasSize(t,e){this.canvasSize={width:t,height:e},this.viewportSize={width:Math.max(1e3,t-40),height:Math.max(600,e-100)},console.log("Canvas resized:",{canvas:this.canvasSize,viewport:this.viewportSize}),this.repositionNodesIfNeeded()}repositionNodesIfNeeded(){if(!this.workflow)return;let t=!1;const{width:e,height:o}=this.viewportSize;for(const n of this.workflow.nodes)if(n.position.x>e-250||n.position.y>o-100){t=!0;break}if(!t){const n=[...this.workflow.nodes].sort((i,r)=>i.position.x-r.position.x);for(let i=0;i<n.length-1;i++){const r=n[i];if(n[i+1].position.x-r.position.x<250){t=!0;break}}}t&&(console.log("Repositioning nodes to fit within visible area and prevent overlap"),this.repositionAllNodes())}repositionAllNodes(){if(!this.workflow)return;const{width:t,height:e}=this.viewportSize,o=180,n=80,i=80;this.workflow.nodes.forEach((r,s)=>{const a=n+s*o%(t-200),l=i+Math.floor(s*o/(t-200))*80;r.position={x:Math.min(a,t-200),y:Math.min(l,e-100)}}),this.updateConnections(),h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}onNodeAdded(t){this.workflow&&(this.workflow.nodes.push(t),this.requestUpdate())}onNodeDeleted(t){this.workflow&&(this.workflow.nodes=this.workflow.nodes.filter(e=>e.id!==t),this.workflow.connections=this.workflow.connections.filter(e=>e.from!==t&&e.to!==t),this.requestUpdate())}onNodeMoved(t){if(this.workflow){const e=this.workflow.nodes.find(o=>o.id===t.nodeId);e&&(e.position=t.position,e.updatedAt=new Date,this.requestUpdate())}}moveNode(t,e){if(!this.workflow)return;const o=[...this.workflow.nodes].sort((s,a)=>s.position.x-a.position.x),n=o.findIndex(s=>s.id===t.id);if(console.log("🔄 Current node order:",o.map(s=>`${s.name} (${s.position.x})`)),console.log("🔄 Moving node:",t.name,"from index:",n,"direction:",e),n===-1){console.log("❌ Node not found in sorted list");return}const i=n+e;if(i<0||i>=o.length){console.log("❌ Cannot move node - would be out of bounds");return}const r=t.position.x;t.position.x=o[i].position.x,o[i].position.x=r,console.log("🔄 New positions:",o.map(s=>`${s.name} (${s.position.x})`)),this.updateConnections(),h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}updateConnections(){if(!this.workflow)return;const t=[...this.workflow.nodes].sort((e,o)=>e.position.x-o.position.x);this.workflow.connections=[];for(let e=0;e<t.length-1;e++)this.workflow.connections.push({id:`conn_${t[e].id}_to_${t[e+1].id}`,from:t[e].id,to:t[e+1].id,type:"approval"});console.log("🔄 Updated connections:",this.workflow.connections.length),this.updateStepNumbers()}updateStepNumbers(){this.shadowRoot?.querySelectorAll("approval-node")?.forEach(e=>{e.forceStepNumberUpdate()}),console.log("🔢 Forced step number updates on all nodes")}debugConnections(){if(!this.workflow){console.log("❌ No workflow to debug");return}console.log("🔗 === CONNECTION DEBUG ==="),console.log("🔗 Total connections:",this.workflow.connections.length),this.workflow.connections.forEach((t,e)=>{const o=this.workflow.nodes.find(i=>i.id===t.from),n=this.workflow.nodes.find(i=>i.id===t.to);console.log(`🔗 Connection ${e+1}:`,{id:t.id,type:t.type,from:o?`${o.name} (${o.position.x}, ${o.position.y})`:"NOT FOUND",to:n?`${n.name} (${n.position.x}, ${n.position.y})`:"NOT FOUND"})}),console.log("🔗 === END CONNECTION DEBUG ===")}debugEverything(){console.log("🐛 === COMPLETE DEBUG ==="),console.log("🐛 Workflow exists:",!!this.workflow),this.workflow&&(console.log("🐛 Nodes count:",this.workflow.nodes.length),console.log("🐛 Connections count:",this.workflow.connections.length),console.log("🐛 Canvas size:",this.shadowRoot?.querySelector(".canvas")?.getBoundingClientRect()),console.log("🐛 Canvas content size:",this.shadowRoot?.querySelector(".canvas-content")?.getBoundingClientRect()),console.log("🐛 Connection layer size:",this.shadowRoot?.querySelector(".connections-layer")?.getBoundingClientRect()),console.log("🐛 All nodes:",this.workflow.nodes.map(t=>`${t.name} at (${t.position.x}, ${t.position.y})`)),console.log("🐛 All connections:",this.workflow.connections.map(t=>`${t.from} → ${t.to}`))),console.log("🐛 === END COMPLETE DEBUG ===")}onCanvasClick(t){t.target===this.shadowRoot?.querySelector(".canvas")&&h.emit(f.NODE_SELECTED,null)}addNode(t,e){if(!this.workflow)return;const o=this.workflow.nodes.length,n=180,i=80,r=80,{width:s,height:a}=this.viewportSize,l=i+o*n%(s-200),c=r+Math.floor(o*n/(s-200))*80,p={x:Math.min(l,s-200),y:Math.min(c,a-100)};console.log(`Adding node ${o+1} at position:`,p,"viewport:",this.viewportSize);const d={id:`node_${Date.now()}`,type:t,name:this.getDefaultNodeName(t),position:p,configuration:this.getDefaultConfiguration(t),createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(d),h.emit(f.NODE_ADDED,d),h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate()}getDefaultNodeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel Approvers"}[t]||"Node"}getDefaultConfiguration(t){return{approver:{approvalType:"single",timeout:7},condition:{conditionType:"amount",operator:"greaterThan"},parallel:{approvalType:"all",timeout:7,parallelCount:2},start:{},end:{}}[t]||{}}onZoomIn(){console.log("Zoom in")}onZoomOut(){console.log("Zoom out")}onFitToScreen(){console.log("Fit to screen")}clearCanvas(){this.workflow&&(this.workflow.nodes=[],this.workflow.connections=[],h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("Canvas cleared"))}debugPositions(){this.workflow&&(console.log("=== NODE POSITIONS DEBUG ==="),this.workflow.nodes.forEach((t,e)=>{console.log(`Node ${e+1} (${t.type}): x=${t.position.x}, y=${t.position.y}`)}),console.log("============================"))}spreadNodes(){this.workflow&&(this.workflow.nodes.forEach((i,r)=>{i.position={x:150+r*280%1200,y:150+Math.floor(r*280/1200)*120}}),h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("Nodes spread out in grid pattern"))}addTestNode(){const t={x:100,y:300};this.addNode("approver",t),console.log("Added test node at position:",t)}createSampleWorkflow(){if(!this.workflow)return;console.log("📋 Creating realistic demo workflow..."),this.workflow.nodes=[],this.workflow.connections=[];const t=[{type:"start",name:"Employee Submits Purchase Request",x:100,y:150,config:{description:"Employee fills out purchase request form"}},{type:"approver",name:"Direct Manager Approval",x:300,y:150,config:{approver:"Sarah Johnson",approvalType:"single",timeout:24,description:"Direct manager reviews and approves request"}},{type:"condition",name:"Amount > $5,000?",x:500,y:150,config:{field:"amount",operator:">",value:5e3,description:"Check if amount exceeds $5,000 threshold"}},{type:"approver",name:"Finance Director Approval",x:700,y:150,config:{approver:"Michael Chen",approvalType:"single",timeout:48,description:"Finance director approval for high-value purchases"}},{type:"end",name:"Purchase Order Generated",x:900,y:150,config:{description:"System generates purchase order and notifies vendor"}}];console.log("📋 Creating",t.length,"nodes..."),t.forEach((o,n)=>{const i={id:`node_${Date.now()}_${n}`,type:o.type,name:o.name,position:{x:o.x,y:o.y},configuration:o.config||this.getDefaultConfiguration(o.type),createdAt:new Date,updatedAt:new Date};this.workflow.nodes.push(i),console.log(`📋 Created node ${n+1}: ${i.name} at (${i.position.x}, ${i.position.y})`)});const e=[{id:`conn_${this.workflow.nodes[0].id}_to_${this.workflow.nodes[1].id}`,from:this.workflow.nodes[0].id,to:this.workflow.nodes[1].id,type:"approval"},{id:`conn_${this.workflow.nodes[1].id}_to_${this.workflow.nodes[2].id}`,from:this.workflow.nodes[1].id,to:this.workflow.nodes[2].id,type:"approval"},{id:`conn_${this.workflow.nodes[2].id}_to_${this.workflow.nodes[3].id}`,from:this.workflow.nodes[2].id,to:this.workflow.nodes[3].id,type:"approval"},{id:`conn_${this.workflow.nodes[3].id}_to_${this.workflow.nodes[4].id}`,from:this.workflow.nodes[3].id,to:this.workflow.nodes[4].id,type:"approval"}];this.workflow.connections=e,console.log("📋 Created",e.length,"connections"),console.log("📋 Final workflow:",{nodes:this.workflow.nodes.length,connections:this.workflow.connections.length}),h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("✅ Created sample approval workflow with proper order")}autoArrange(){if(!this.workflow||this.workflow.nodes.length===0){console.log("❌ No workflow or nodes to arrange");return}console.log("🔄 Auto-arranging",this.workflow.nodes.length,"nodes");const t={start:0,approver:1,condition:2,parallel:3,end:4},e=[...this.workflow.nodes].sort((a,l)=>{const c=t[a.type]??5,p=t[l.type]??5;return c-p});console.log("🔄 Sorted nodes by type:",e.map(a=>`${a.type}: ${a.name}`));const{width:o,height:n}=this.viewportSize,i=180,r=80,s=80;e.forEach((a,l)=>{const c=r+l*i%(o-200),p=s+Math.floor(l*i/(o-200))*80,d={x:Math.min(c,o-200),y:Math.min(p,n-100)};console.log(`🔄 Moving ${a.name} from (${a.position.x}, ${a.position.y}) to (${d.x}, ${d.y})`),a.position=d}),this.workflow.connections=[];for(let a=0;a<e.length-1;a++)this.workflow.connections.push({from:e[a].id,to:e[a+1].id});console.log("🔄 Created",this.workflow.connections.length,"connections"),h.emit(f.WORKFLOW_UPDATED,this.workflow),this.requestUpdate(),console.log("✅ Auto-arranged nodes in logical workflow order")}render(){return this.workflow?u`
          <div class="canvas"
               @click=${this.onCanvasClick}>
        
        <!-- Canvas Header -->
            <div class="canvas-header">
              <h3>${this.workflow.name}</h3>
              <p>${this.workflow.nodes.length} nodes, ${this.workflow.connections.length} connections</p>
              <p style="font-size: 0.75rem; color: #6b7280; margin: 0.25rem 0 0 0;">
                💡 Try: 1) Click 📋 for sample workflow 2) Click elements in left panel to add 3) Use ⬆️⬇️ to reorder
              </p>
              <p style="font-size: 0.7rem; color: #9ca3af; margin: 0.25rem 0 0 0;">
                📱 Viewport: ${this.viewportSize.width}×${this.viewportSize.height} | Canvas: ${this.canvasSize.width}×${this.canvasSize.height}
              </p>
            </div>

        <!-- Canvas Controls -->
        <div class="canvas-controls">
          <button @click=${()=>this.addNode("start",{x:0,y:0})} title="Add Start">🚀</button>
          <button @click=${()=>this.addNode("approver",{x:0,y:0})} title="Add Approver">👤</button>
          <button @click=${()=>this.addNode("condition",{x:0,y:0})} title="Add Condition">❓</button>
          <button @click=${()=>this.addNode("end",{x:0,y:0})} title="Add End">🏁</button>
          <button @click=${this.clearCanvas} title="Clear Canvas" style="background: #dc3545;">🗑️</button>
          <button @click=${this.spreadNodes} title="Spread Nodes" style="background: #17a2b8;">📐</button>
          <button @click=${this.debugPositions} title="Debug Positions" style="background: #28a745;">🐛</button>
          <button @click=${()=>this.addTestNode()} title="Add Test Node" style="background: #6f42c1;">🧪</button>
          <button @click=${this.createSampleWorkflow} title="Create Sample Workflow" style="background: #fd7e14;">📋</button>
          <button @click=${this.autoArrange} title="Auto Arrange" style="background: #20c997;">🔄</button>
              <button @click=${this.debugConnections} title="Debug Connections" style="background: #6c757d;">🔗</button>
              <button @click=${this.debugEverything} title="Debug Everything" style="background: #e83e8c;">🐛</button>
              <button @click=${this.onZoomOut} title="Zoom Out">🔍-</button>
              <button @click=${this.onZoomIn} title="Zoom In">🔍+</button>
              <button @click=${this.onFitToScreen} title="Fit to Screen">📐</button>
              <button @click=${this.repositionAllNodes} title="Fit to Viewport" style="background: #17a2b8;">📱</button>
        </div>

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
            ${this.workflow.nodes.map(t=>u`
              <approval-node 
                .node=${t}
                .isSelected=${t.id===this.selectedNodeId}
                @node-select=${()=>h.emit(f.NODE_SELECTED,t)}
                @node-edit=${()=>h.emit(f.NODE_EDITED,t)}
                @node-delete=${()=>h.emit(f.NODE_DELETED,t.id)}
                @node-move=${e=>h.emit(f.NODE_MOVED,e.detail)}>
              </approval-node>
            `)}
          </div>
        </div>
      </div>
    `:u`
        <div class="canvas">
          <div class="canvas-header">
            <h3>No Workflow Loaded</h3>
            <p>Create a new workflow or load an existing one</p>
          </div>
        </div>
      `}};N.styles=T`
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
  `;V([m({type:Object})],N.prototype,"workflow",2);V([m({type:String})],N.prototype,"selectedNodeId",2);V([b()],N.prototype,"canvasSize",2);V([b()],N.prototype,"viewportSize",2);N=V([L("approval-canvas")],N);const nt="modulepreload",rt=function(t){return"/flow-designer/"+t},we={},ee=function(e,o,n){if(!o||o.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(o.map(r=>{if(r=rt(r),r in we)return;we[r]=!0;const s=r.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!n)for(let p=i.length-1;p>=0;p--){const d=i[p];if(d.href===r&&(!s||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${a}`))return;const c=document.createElement("link");if(c.rel=s?"stylesheet":nt,s||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),s)return new Promise((p,d)=>{c.addEventListener("load",p),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};var st=Object.defineProperty,at=Object.getOwnPropertyDescriptor,K=(t,e,o,n)=>{for(var i=n>1?void 0:n?at(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&st(e,o,i),i};let E=class extends g{constructor(){super(...arguments),this.isSelected=!1,this.cachedStepNumber="?",this.lastPositionX=0}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.onNodeClick),this.addEventListener("dblclick",this.onDoubleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.onNodeClick),this.removeEventListener("dblclick",this.onDoubleClick)}onNodeClick(t){t.preventDefault(),t.stopPropagation(),this.node&&this.dispatchEvent(new CustomEvent("node-select",{detail:{node:this.node},bubbles:!0}))}onDoubleClick(){this.dispatchEvent(new CustomEvent("node-edit",{detail:{node:this.node},bubbles:!0}))}onEdit(){this.dispatchEvent(new CustomEvent("node-edit",{detail:{node:this.node},bubbles:!0}))}onDelete(){confirm(`Delete "${this.node.name}"?`)&&this.dispatchEvent(new CustomEvent("node-delete",{detail:{nodeId:this.node.id},bubbles:!0}))}onMoveUp(){console.log("🔄 Move Up clicked for node:",this.node.name,this.node.id),ee(()=>Promise.resolve().then(()=>Q),void 0).then(({eventBus:t})=>{t.emit("node-move-up",{node:this.node})}),this.dispatchEvent(new CustomEvent("node-move-up",{detail:{node:this.node},bubbles:!0,composed:!0}))}onMoveDown(){console.log("🔄 Move Down clicked for node:",this.node.name,this.node.id),ee(()=>Promise.resolve().then(()=>Q),void 0).then(({eventBus:t})=>{t.emit("node-move-down",{node:this.node})}),this.dispatchEvent(new CustomEvent("node-move-down",{detail:{node:this.node},bubbles:!0,composed:!0}))}getNodeIcon(){return{start:"🚀",end:"🏁",approver:"👤",condition:"❓",parallel:"⚡"}[this.node.type]||"📋"}getStepNumber(){const t=this.node.position.x;return Math.abs(t-this.lastPositionX)<5&&this.cachedStepNumber!=="?"?this.cachedStepNumber:this.calculateStepNumber()}calculateStepNumber(){const t=this.shadowRoot?.host.parentElement;if(!t)return"?";const e=t.querySelectorAll("approval-node"),n=Array.from(e).sort((r,s)=>{const a=r,l=s,c=a.node?.position?.x||parseInt(r.style.left)||0,p=l.node?.position?.x||parseInt(s.style.left)||0;return c-p}).indexOf(this.shadowRoot?.host),i=n>=0?(n+1).toString():"?";return this.cachedStepNumber=i,this.lastPositionX=this.node.position.x,i}forceStepNumberUpdate(){this.cachedStepNumber="?",this.lastPositionX=-999999,this.calculateStepNumber()}getApproverDisplayText(){return this.node.configuration.approver?Array.isArray(this.node.configuration.approver)?this.node.configuration.approver.length===0?"Select Approver":this.node.configuration.approver.length===1?this.node.configuration.approver[0]:`${this.node.configuration.approver.length} approvers selected`:this.node.configuration.approver:"Select Approver"}renderNodeContent(){switch(this.node.type){case"approver":return u`
          <div class="approver-info">
            <div class="approver-name">
              ${this.getApproverDisplayText()}
            </div>
            <div class="approval-type">
              ${this.node.configuration.approvalType||"single"} approval
            </div>
          </div>
        `;case"condition":return u`
          <div class="condition-info">
            <div class="condition-text">
              ${this.node.condition?.description||"Set Condition"}
            </div>
          </div>
        `;case"parallel":return u`
          <div class="parallel-info">
            <div class="parallel-count">
              ${this.node.configuration.parallelCount||2} approvers
            </div>
          </div>
        `;default:return u`
          <div class="node-info">
            ${this.node.name}
          </div>
        `}}render(){return this.node?u`
      <div 
        class="node ${this.node.type} ${this.isSelected?"selected":""} ${this.isDragging?"dragging":""}"
        style="left: ${this.node.position.x}px; top: ${this.node.position.y}px;">
        
        <!-- Node Header -->
        <div class="node-header">
          <div class="node-icon">${this.getNodeIcon()}</div>
          <div class="node-title">${this.node.name}</div>
          <div class="node-actions">
            <button @click=${this.onMoveUp} title="Move Up">⬆️</button>
            <button @click=${this.onMoveDown} title="Move Down">⬇️</button>
            <button @click=${this.onEdit} title="Edit">✏️</button>
            <button @click=${this.onDelete} class="delete" title="Delete">🗑️</button>
          </div>
        </div>
        
        <!-- Step Number -->
        <div class="step-number">${this.getStepNumber()}</div>

        <!-- Node Content -->
        <div class="node-content">
          ${this.renderNodeContent()}
        </div>

            <!-- Connection points removed for static layout -->
      </div>
    `:(console.warn("ApprovalNode: No node data provided"),u``)}};E.styles=T`
    :host {
      position: absolute;
      z-index: 10;
    }

    .node {
      position: absolute;
      width: 200px;
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
      opacity: 0;
      transition: opacity 0.2s;
    }

    .node:hover .node-actions {
      opacity: 1;
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
  `;K([m({type:Object})],E.prototype,"node",2);K([m({type:Boolean})],E.prototype,"isSelected",2);K([b()],E.prototype,"cachedStepNumber",2);K([b()],E.prototype,"lastPositionX",2);E=K([L("approval-node")],E);var lt=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,de=(t,e,o,n)=>{for(var i=n>1?void 0:n?dt(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&lt(e,o,i),i};let B=class extends g{constructor(){super(...arguments),this.templates=[],this.isLoading=!1}connectedCallback(){super.connectedCallback(),this.loadTemplates()}async loadTemplates(){this.isLoading=!0;try{this.templates=await R.getApprovalTemplates()}catch(t){console.error("Failed to load templates:",t)}finally{this.isLoading=!1}}onTemplateClick(t){console.log("Template clicked:",t.id),ee(()=>Promise.resolve().then(()=>Q),void 0).then(({eventBus:e})=>{e.emit("template-add",{template:t})})}onNodeTypeClick(t){console.log("Node type clicked:",t),ee(()=>Promise.resolve().then(()=>Q),void 0).then(({eventBus:e})=>{e.emit("node-type-add",{nodeType:t})})}getNodeTypeIcon(t){return{start:"🚀",end:"🏁",approver:"👤",condition:"❓",parallel:"⚡"}[t]||"📋"}getNodeTypeName(t){return{start:"Start",end:"End",approver:"Approver",condition:"Condition",parallel:"Parallel"}[t]||t}render(){return this.isLoading?u`
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
      `:u`
      <div class="palette">
        <div class="palette-header">
          <h3>Approval Builder</h3>
        </div>
        
        <div class="palette-content">
          <!-- Quick Templates -->
          <div class="section">
            <div class="section-title">Quick Templates</div>
            <div class="templates-grid">
              ${this.templates.map(t=>u`
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
              ${["start","approver","condition","parallel","end"].map(t=>u`
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
    `}};B.styles=T`
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
  `;de([b()],B.prototype,"templates",2);de([b()],B.prototype,"isLoading",2);B=de([L("approval-palette")],B);var ct=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,X=(t,e,o,n)=>{for(var i=n>1?void 0:n?pt(e,o):e,r=t.length-1,s;r>=0;r--)(s=t[r])&&(i=(n?s(e,o,i):s(i))||i);return n&&i&&ct(e,o,i),i};let C=class extends g{constructor(){super(...arguments),this.selectedNodeId=null,this.workflow=null,this.users=[],this.isLoading=!1}connectedCallback(){super.connectedCallback(),this.loadUsers()}async loadUsers(){this.isLoading=!0;try{this.users=await R.getUsers()}catch(t){console.error("Failed to load users:",t)}finally{this.isLoading=!1}}get selectedNode(){return!this.selectedNodeId||!this.workflow?null:this.workflow.nodes.find(t=>t.id===this.selectedNodeId)||null}onNameChange(t){const e=t.target;this.updateNodeProperty("name",e.value)}onApprovalTypeChange(t){const e=t.target;this.updateNodeProperty("configuration.approvalType",e.value)}onApproverChange(t){const e=t.target;this.updateNodeProperty("configuration.approver",e.value)}onTimeoutChange(t){const e=t.target;this.updateNodeProperty("configuration.timeout",parseInt(e.value))}onTriggerSourceChange(t){const e=t.target;this.updateNodeProperty("configuration.triggerSource",e.value)}onConditionTypeChange(t){const e=t.target;this.updateNodeProperty("configuration.conditionType",e.value)}onOperatorChange(t){const e=t.target;this.updateNodeProperty("configuration.operator",e.value)}onValueChange(t){const e=t.target;this.updateNodeProperty("configuration.value",e.value)}onParallelCountChange(t){const e=t.target;this.updateNodeProperty("configuration.parallelCount",parseInt(e.value))}isApproverSelected(t){const e=this.selectedNode;return!e||!e.configuration.approver?!1:Array.isArray(e.configuration.approver)?e.configuration.approver.includes(t):e.configuration.approver===t}onApproverSelect(t){const e=this.selectedNode;if(!e)return;let o=[];e.configuration.approver&&(Array.isArray(e.configuration.approver)?o=[...e.configuration.approver]:o=[e.configuration.approver]);const n=o.indexOf(t.name);n>-1?o.splice(n,1):o.push(t.name),this.updateNodeProperty("configuration.approver",o)}updateNodeProperty(t,e){if(!this.selectedNode)return;const o=t.split(".");let n=this.selectedNode;for(let i=0;i<o.length-1;i++)n[o[i]]||(n[o[i]]={}),n=n[o[i]];n[o[o.length-1]]=e,this.selectedNode.updatedAt=new Date,this.dispatchEvent(new CustomEvent("property-changed",{detail:{nodeId:this.selectedNode.id,path:t,value:e},bubbles:!0})),this.requestUpdate()}renderApproverProperties(){return u`
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
            ${this.users.map(t=>{const e=this.isApproverSelected(t.name);return u`
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
    `}renderConditionProperties(){return u`
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
    `}renderParallelProperties(){return u`
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
    `}renderDefaultProperties(){return this.selectedNode?.type==="start"?this.renderStartProperties():u`
      <div class="property-group">
        <label class="property-label">Node Name</label>
        <input 
          type="text" 
          class="property-input"
          .value=${this.selectedNode?.name||""}
          @input=${this.onNameChange}>
      </div>
    `}renderStartProperties(){return u`
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
    `}renderNodeProperties(){if(!this.selectedNode)return u``;switch(this.selectedNode.type){case"approver":return this.renderApproverProperties();case"condition":return this.renderConditionProperties();case"parallel":return this.renderParallelProperties();default:return this.renderDefaultProperties()}}render(){return this.selectedNode?u`
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
    `:u`
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
      `}};C.styles=T`
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
  `;X([m({type:String})],C.prototype,"selectedNodeId",2);X([m({type:Object})],C.prototype,"workflow",2);X([b()],C.prototype,"users",2);X([b()],C.prototype,"isLoading",2);C=X([L("approval-properties")],C);console.log("🚀 ServiceNow Flow Designer V2 - Approval Workflow Builder");console.log("📦 Built with Web Components + Lit");console.log("🎯 Modern Architecture for Enterprise Workflow Automation");
//# sourceMappingURL=index-a6c15503.js.map
