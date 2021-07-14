function injectDark(){
	let dark = (uaData.设置.暗色主题===0) ?
	Object.values(document.getElementById('myLight').sheet.cssRules)[0].cssText :
	Object.values(document.getElementById('myDark').sheet.cssRules)[0].cssRules[0].cssText, night = [
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
					if (night.includes(ad.id)) uaCode.injSty(ad,dark);
				})
			}
		}
	}), opt = { childList: true, subtree: false };

	night.forEach( id => {
		let ad = document.getElementById(id);
		if (ad) uaCode.injSty(ad,dark);
	});

	if (uaData.设置.暗色主题<2) document.querySelector('#myImportant').innerHTML = dark;

	observer.observe(document.documentElement,opt);
	observer.observe(document.head,opt);
}
module.exports = injectDark;
