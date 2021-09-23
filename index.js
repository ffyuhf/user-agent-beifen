import 'normalize.css';
import styles from "./index.css";
const uaData = {
	base:{},
	apps:{},
	flag:{},
	count:{},
	text:new Map(),
	tagtext:{},
	tagfind:new Map(),
	index:"",
	jslist:[],
	touch:"ontouchend" in document,
	stor:{
		apps:{},
		flag:{}
	},
	storKey:"userAgentData",
	styleKey:"userAgentStyle",
	dark:false,
	osdark:window.matchMedia("(prefers-color-scheme: dark)"),
	styles:styles,
	版本:{
		描述:"5.1 Beta 7",
		详细:21092318,
	},
	设置:{
		基础默认:1,
		数字记号:"#",
        暗色主题:2,
	}
},
getPara = require('./para'),
getTheme = require('./gettheme'),
dark = require('./dark'),
swView = require('./swview');

window.uaData = uaData;
if(uaData.touch) { window.IndexSidebar = require('./indexSidebar'); }
window.uaCode = require('./uaCode');
window.加入 = require('./add');

document.querySelectorAll('p,div,input,span,button,label,textarea,select,form').forEach( n => {
	(n.id) && (uaData.styles[n.id]) && (n.id = uaData.styles[n.id]);
	(n.htmlFor) && (uaData.styles[n.htmlFor]) && (n.htmlFor = uaData.styles[n.htmlFor]);
	n.classList.forEach( c => uaData.styles[c] && n.classList.replace(c,uaData.styles[c]));
});

getPara(); getTheme(); dark();
加入("数据",[
"基础_良良.js",
"UA_良良.js",
"电脑_良良.js",
"快应用_良良.js",
"爬虫_良良.js",
]);
uaData.load = require('./loader');
swView();
