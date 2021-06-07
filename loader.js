var loader = new Promise( resolve => {
	uaCode.sel(false,'#loadstr').innerHTML = (uaData.jslist.length===0) ?
		'数据列表加载失败 !' : '正在加载基本数据 ...';
	uaData.jslist.forEach( js => {
		let script=document.createElement('script');
			script.async = false;
			script.src = js;
			script.onerror = e => {
				uaCode.sel(false,'#loadstr').innerHTML = '数据加载失败 !';
				uaCode.toast(js + " 加载失败");
				window.stop();
			};
			script.onload = e => {
				uaData.jslist.splice(uaData.jslist.findIndex( v => v === js ),1);
				if (uaData.jslist.length===0) { resolve(); }
			}
		document.querySelector("head").appendChild(script);
	});
}).then( () => {
	const stor = window.localStorage;
	uaCode.sel(false,'#loadstr').innerHTML = '正在加载自定义数据 ...';
	if (stor.hasOwnProperty(uaData.storKey)) {
		try {
			let data = JSON.parse(stor.getItem(uaData.storKey));
			if (data.apps) {
				Object.assign(uaData.stor.apps,data.apps);
				加入("APP",data.apps);
			}
			if (data.flag) {
				Object.assign(uaData.stor.flag,data.flag);
				加入("标签",data.flag);
			}
		} catch(e) {
			alert(`存储数据异常，将会被清空...\n 内容:${stor.getItem(uaData.storKey)}`);
			stor.removeItem(uaData.storKey);
		}
	}
}).then(uaCode.init);
module.exports = loader;
