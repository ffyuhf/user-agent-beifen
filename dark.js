function injectDark(){
	let  dark = Object.values(uaCode.sel(!1,'#myDark').sheet.cssRules)[0].cssRules[0].cssText,
	light = Object.values(uaCode.sel(!1,'#myLight').sheet.cssRules)[0].cssText,
	force = (uaData.设置.暗色主题===0) ? light : dark,
	btnDark = uaCode.sel(!1,'#btnDark'),
	impSty = uaCode.sel(!1,'#myImportant'),
	night = [
		"via_inject_css_night",
		"metaNight",
        "yjbrowser_night_mode_style",
        "yjbrowser_night_mode_style2",
		"360browser_night_mode_style",
		"360browser_night_mode_style2",
		"mixiaba_css_id",
		"x_style_element_id",
        "x_link_element_id",
        "alook_theme",
        "miui_mini_night_mode",
        "preucbrowser_sheet_theme",
        "bnightThme",
        "sq_root_css"
	], observer = new MutationObserver( mus => {
		for (let mu of mus) {
			if (mu.addedNodes.length>0) {
				mu.addedNodes.forEach( ad => {
					if (night.includes(ad.id)) {
						uaCode.injSty(ad,force);
						uaData.dark = true;
						uaCode.dark();
					}
				})
			}
			if (mu.removedNodes.length>0) {
				mu.removedNodes.forEach( ad => {
					if (night.includes(ad.id)) {
						if (uaData.设置.暗色主题===2) {
							impSty.innerHTML = '';
						}
						uaData.dark = uaData.osdark.matches;
						uaCode.dark();
					}
				})
			}
		}
	}), opt = { childList: true, subtree: false };

	function patchStyle(css) {
		night.forEach( id => {
			let ad = document.getElementById(id);
			if (ad) {
				uaCode.injSty(ad,dark);
				uaCode.dark();
			}
		});
	}

	btnDark.onclick = () => {
		impSty.innerHTML = (uaData.dark) ? light : dark;
		patchStyle((uaData.dark) ? light : dark);
		uaData.dark = !uaData.dark;
		uaCode.dark();
	}

	uaData.osdark.onchange = e => {
		if (uaData.设置.暗色主题===2) impSty.innerHTML = '';
		uaData.dark = e.matches;
		uaCode.dark();
	}

	if (uaData.设置.暗色主题<2) {
		patchStyle(force);
		impSty.innerHTML = dark;
	}

	switch (uaData.设置.暗色主题) {
		case 0:
			uaData.dark = false;
			break;
		case 1:
			uaData.dark = true;
			break;
		default:
			uaData.dark = uaData.osdark.matches;
	}
	uaCode.dark();

	observer.observe(document.documentElement,opt);
	observer.observe(document.head,opt);
}
module.exports = injectDark;
