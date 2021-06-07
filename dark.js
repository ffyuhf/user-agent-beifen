function injectDark(){
	let dark = Object.values(document.getElementById('myDark').sheet.cssRules)[0].cssRules[0].cssText, night = [
		"via_inject_css_night",
		"metaNight",
		"360browser_night_mode_style",
		"360browser_night_mode_style2",
		"mixiaba_css_id",
		"x_style_element_id"
	], observer = new MutationObserver( mus => {
		for (let mu of mus) {
			if (mu.addedNodes.length>0) {
				mu.addedNodes.forEach( ad => {
					if (night.includes(ad.id)) {
						ad.innerHTML = dark;
					}
				})
			}
		}
	}), opt = { childList: true, subtree: false };

	night.forEach( id => {
		let el = document.getElementById(id);
		if (el) el.innerHTML = dark;
	});

	observer.observe(document.documentElement,opt);
	observer.observe(document.head,opt);
}
module.exports = injectDark;
