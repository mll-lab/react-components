"use strict";(self.webpackChunk_mll_lab_react_components=self.webpackChunk_mll_lab_react_components||[]).push([[4949],{"./src/notification/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>index_stories});var _a,_b,_c,react=__webpack_require__("./node_modules/react/index.js"),notification_notification=__webpack_require__("./node_modules/antd/lib/notification/index.js").default,__rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t};const index_stories={title:"notification",args:{level:"error",message:"some title",description:"some description"},argTypes:{level:{options:["info","success","warning","error"],control:{type:"inline-radio"}}}};var Default=function Default(args){var level=args.level,rest=__rest(args,["level"]);return react.createElement("button",{type:"button",onClick:function onClick(){notification_notification[level](rest)}},"Click Me!")};Default.parameters=Object.assign(Object.assign({},Default.parameters),{docs:Object.assign(Object.assign({},null===(_a=Default.parameters)||void 0===_a?void 0:_a.docs),{source:Object.assign({originalSource:'function Default(args) {\n  const {\n    level,\n    ...rest\n  } = args;\n  return <button type="button" onClick={() => {\n    notification[level](rest);\n  }}>\n      Click Me!\n    </button>;\n}'},null===(_c=null===(_b=Default.parameters)||void 0===_b?void 0:_b.docs)||void 0===_c?void 0:_c.source)})})}}]);