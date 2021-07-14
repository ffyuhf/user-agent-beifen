function getPara(){
	let para = new URLSearchParams(location.search), flo;
	if (parseInt(para.get('base'))>0)
		uaData.设置.基础默认 = parseInt(para.get('base'));
	if (parseInt(para.get('dark'))>=0 && parseInt(para.get('dark'))<=2)
		uaData.设置.暗色主题 = parseInt(para.get('dark'));
	if (para.get('flag')) {
		flo = para.get('flag').replace(/[A-Z]+/,'').slice(0,1);
		if (flo) uaData.设置.数字记号 = flo;
	}
}
module.exports = getPara;
