function getTheme(){
	const stor = window.localStorage;
	let myl = document.getElementById('myLight'),
		syl = document.getElementById('stylight'),
		myd = document.getElementById('myDark'),
		syd = document.getElementById('stydark');
	syl.value = '';
	syd.value = '';
	if(stor.hasOwnProperty(uaData.styleKey)) {
		try {
			let data = JSON.parse(stor.getItem(uaData.styleKey));
			if (data.light) {
				myl.innerHTML = data.light;
				syl.value = data.light;
			} else {
				syl.value = Object.values(myl.sheet.cssRules)[0].cssText;
			}
			if (data.dark) {
				myd.innerHTML = data.dark;
				syd.value = data.dark;
			} else {
				syd.value = Object.values(myd.sheet.cssRules)[0].cssRules[0].cssText;
			}
		} catch(e) {
			alert(`存储数据异常，将会被清空...\n 内容:${stor.getItem(uaData.styleKey)}`);
			stor.removeItem(uaData.styleKey);
		}
	} else {
		syl.value = Object.values(myl.sheet.cssRules)[0].cssText;
		syd.value = Object.values(myd.sheet.cssRules)[0].cssRules[0].cssText;
	}
}
module.exports = getTheme;
