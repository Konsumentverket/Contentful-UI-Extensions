(this["webpackJsonpkundo-category-selector"]=this["webpackJsonpkundo-category-selector"]||[]).push([[0],{114:function(e,t,n){},395:function(e,t,n){"use strict";n.r(t);var r=n(7),o=n(0),c=n.n(o),s=n(12),a=n(25),i=(n(111),n(112),n(113),n(114),n(21)),u=n.n(i),l=n(41),p=n(98),d=n(99),f=n(103),j=n(102),h=n(8),g=n(101),O=function(e){Object(f.a)(n,e);var t=Object(j.a)(n);function n(e){var r;return Object(p.a)(this,n),(r=t.call(this,e)).onConfigure=Object(l.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.props.sdk.app.getCurrentState();case 2:return t=e.sent,e.abrupt("return",{parameters:r.state.parameters,targetState:t});case 4:case"end":return e.stop()}}),e)}))),r.state={parameters:{}},e.sdk.app.onConfigure((function(){return r.onConfigure()})),r}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t,n=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.sdk.app.getParameters();case 2:t=e.sent,this.setState(t?{parameters:t}:this.state,(function(){n.props.sdk.app.setReady()}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(r.jsx)(h.Workbench,{className:Object(g.a)({margin:"80px"}),children:Object(r.jsxs)(h.Form,{children:[Object(r.jsx)(h.Heading,{children:"App Config"}),Object(r.jsx)(h.Paragraph,{children:"Welcome to your contentful app. This is your config page."})]})})}}]),n}(o.Component),b=n(26),m=function(e){var t,n=Object(o.useState)(!1),s=Object(b.a)(n,2),a=s[0],i=s[1],u=Object(o.useState)([]),l=Object(b.a)(u,2),p=l[0],d=l[1],f=Object(o.useState)(e.sdk.field.getValue()),j=Object(b.a)(f,2),g=j[0],O=j[1];if(c.a.useEffect((function(){var t=e.sdk.parameters.instance;fetch("https://kundo.se/api/properties/".concat(t.kundoSlug,".json")).then((function(e){return e.json()})).then((function(e){d(e[0].categories)}))}),[]),0===p.length)return null;console.log(e);var m=p.some((function(e){return e.slug===g}))?null===(t=p.find((function(e){return e.slug===g})))||void 0===t?void 0:t.heading_name:"V\xe4lj en kategori";return Object(r.jsx)(h.Dropdown,{isOpen:a,onClose:function(){return i(!1)},toggleElement:Object(r.jsx)(h.Button,{size:"small",buttonType:"muted",indicateDropdown:!0,onClick:function(){return i(!a)},children:m}),children:Object(r.jsxs)(h.DropdownList,{children:[Object(r.jsx)(h.DropdownListItem,{onClick:function(t){O(null),i(!1),e.sdk.field.setValue(null)},isTitle:!0,isActive:null==g,children:"V\xe4lj en kategori"}),p.map((function(t){return Object(r.jsx)(h.DropdownListItem,{onClick:function(n){O(t.slug),i(!1),e.sdk.field.setValue(t.slug)},isActive:t.slug===g,children:t.heading_name},t.slug)}))]})})};Object(a.init)((function(e){var t=document.getElementById("root");[{location:a.locations.LOCATION_APP_CONFIG,component:Object(r.jsx)(O,{sdk:e})},{location:a.locations.LOCATION_ENTRY_FIELD,component:Object(r.jsx)(m,{sdk:e})}].forEach((function(n){e.location.is(n.location)&&Object(s.render)(n.component,t)}))}))}},[[395,1,2]]]);
//# sourceMappingURL=main.8d6a92c9.chunk.js.map