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
	版本:{
		描述:"5.1 Beta 5",
		详细:21052523,
	},
	设置:{
		基础默认:1,
		数字记号:"#",
	}
};
window.uaData = uaData;
import styles from "./index.css";
uaData.styles = styles;
document.querySelectorAll('p,div,input,span,button,label,textarea,select').forEach( n => {
	(n.id) && (uaData.styles[n.id]) && (n.id = uaData.styles[n.id]);
	(n.htmlFor) && (uaData.styles[n.htmlFor]) && (n.htmlFor = uaData.styles[n.htmlFor]);
	n.classList.forEach( c => uaData.styles[c] && n.classList.replace(c,uaData.styles[c]));
});
if(uaData.touch) { window.IndexSidebar = require('./indexSidebar'); }
window.uaCode = require('./uaCode');
window.加入 = require('./add');
var getTheme = require('./gettheme');
getTheme();
var dark = require('./dark');
dark();
uaCode.sel(false,'#toast').addEventListener('animationend',e => {
	e.target.onclick = null;
	e.target.classList.remove(styles.toasting);
});
加入("数据",[
"基础_良良.js",
"UA_良良.js",
"电脑_良良.js",
"快应用_良良.js",
"爬虫_良良.js",
]);
uaData.load = require('./loader');
var swView = require('./swview');
swView();
