function swView(){
			if ('serviceWorker' in navigator && window.location.href.slice(0,5)==="https") {
				let opt = uaCode.sel(false,'#swopt'),
					stat = uaCode.sel(false,'#swstat'),
					btn = uaCode.sel(false,'#swreg');
				opt.classList.remove('none');
				navigator.serviceWorker.getRegistrations().then( regs => {
					if (regs.length===1) {
						caches.keys().then( vers => {
							vers.filter( ver => ver.slice(0,2)==='D_' || ver.slice(0,2)==='I_' ).map( i => {
								if (parseInt(i.slice(2)) !== uaData.版本.详细) {
									uaCode.toast('更新离线缓存...');
									caches.delete(i);
								}
							})
						});
						if (regs[0].installing) {
							stat.innerHTML = '正在安装';
						} else if (regs[0].waiting) {
							stat.innerHTML = '等待安装';
						} else if (regs[0].active) {
							stat.innerHTML = '已安装';
						}
						opt.classList.add('inst');
						btn.innerHTML = '卸载服务';
					} else {
						opt.classList.remove('inst');
						stat.innerHTML = '未安装';
						btn.innerHTML = '安装服务';
					}
					caches.keys().then( vers => { uaCode.sel(false,"#swlen").innerHTML = vers.length });
				})
			}
		}
module.exports = swView;
