function 加入(box,obj) {
	switch (box) {
		case "标签":
			Object.assign(uaData.flag,obj);
			Object.keys(obj).forEach( key => uaData.tagfind.set(obj[key][0], key) );
			break;
		case "APP":
			Object.keys(obj).forEach( key => {
				let cont;
				if (typeof obj[key]["内容"] === "object") {
					if (obj[key]["内容"] instanceof Array) {
						cont = [obj[key]["内容"][0],obj[key]["内容"][1]];
					} else {
						cont = {
							qBasic: obj[key]["内容"]["平台"],
							qFrom: obj[key]["内容"]["来自"],
							qString: obj[key]["内容"]["应用"]
						}
					}
				} else {
					cont = obj[key]["内容"];
				}
				Object.assign(uaData.apps,{
					[key]: {
						text: obj[key]["名称"],
						prefix: (obj[key]["前置"]==="是") ? true : false,
						followed: (obj[key]["无缝"]==="是") ? true : false,
						class: obj[key]["标签"],
						content: cont
					}
				});
			});
			break;
		case "基础":
			Object.keys(obj).forEach( key => {
				if (key!=="默认项") {
					Object.assign(uaData.base,{
						[key]: {
							text: obj[key]["名称"],
							content: obj[key]["内容"]
						}
					});
				}
			});
			break;
		case "数据":
			obj.forEach( js => uaData.jslist.push(js) );
			break;
	}
}
module.exports = 加入;
