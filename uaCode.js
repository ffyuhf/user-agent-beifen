function uaCode() {
			let lab,cas,lah,ntx,loc,pos=[0,0];
			function $$(cls) {
				for (let k of Object.keys(uaData.styles)) {
					if (cls.includes('#'+k) || cls.includes('.'+k)) {
						cls = cls.replace(new RegExp(k,'g'),uaData.styles[k]);
					}
				}
				return cls;
			}
			function $(all,sel) {
				return (all) ? document.querySelectorAll($$(sel)) : document.querySelector($$(sel));
			}
			
			function $_(name) {
				const list = $(true,`input[name="${name}"]:checked`);
				return list.length === 1 && list[0].type === "radio" ? list[0] : list;
			}
			
			function _(ele,del,nclass = "none") {
				if (del) {
					ele.classList.remove(uaData.styles[nclass] || nclass);
				} else {
					ele.classList.add(uaData.styles[nclass] || nclass);
				}
			}
			
			function __(prop) {
				return getComputedStyle(document.documentElement).getPropertyValue('--' + prop);
			}
			
			function getUpperHead(word) {
				const temp = word.slice(0,1).toUpperCase();
				return /^[A-Z]$/u.test(temp) ? temp : uaData.设置.数字记号;
			}
			
			function scanAll() {
				for (let ele of lah) {
					if (window.getComputedStyle(ele).display!=="none") {
						return true;
					}
				}
			}
			
			function scanForHead() {
				let found;
				cas.forEach( ele => {
					found = false;
					for (let la of lab) {
						if (getUpperHead(la.id) === ele.innerHTML && getComputedStyle(la).display !== "none") {
							found = true;
							break;
						}
					}
					_(ele,found);
				});
			}
			
			function tagConv(clas,fro,to) {
				if (clas.slice(0,1)==="_") {
					return (to) ? clas.slice(1) : "third" ;
				} else if (fro===to) {
					return clas;
				} else {
					return (fro) ? uaData.tagfind.get(clas) : uaData.flag[clas][0];
				}
			}
			
			function toast(text) {
				if (window.mbrowser && window.mbrowser.showToast) {
					window.mbrowser.showToast(text);
				} else if (window.via && window.via.toast) {
					window.via.toast(text);
				} else if (window._obj) {
					window._obj.toast(text);
				} else if (window.H5EXT) {
					window.H5EXT.cmd(99,text);
				} else if (window.meta) {
					window.meta.toast(text,3,null);
				} else if (window.mx_browser_obj && window.mx_browser_obj.showtip) {
					window.mx_browser_obj.showtip(text);
				} else if (window.JSInterface && window.JSInterface.syslog) {
					window.JSInterface.syslog(text);
				} else if (window.plugin) {
					window.plugin.makeToast(text);
				} else if (window.mdhtml) {
					window.mdhtml.mdts(text);
				} else {
					const toast = $(false,"#toast");
					toast.innerHTML = text;
					toast.className = uaData.styles.toasting;
				}
			}
			
			function spaceChecked(e = event) {
				switch (e.code) {
					case "Space":
					case "Enter":
						e.target.control.click();
						break;
					default:
						return;
				}
			}
			
			function genUA() {
				const baseUA = $_("mode").value === "add" ? 
							$(false,"textarea").value :
							uaData.base[$_("base").value].content,
					midSpace = /.+\s.+/u, win = $(false,"#ua");
				let prefixUA = "",
					preFollowUA = "",
					suffixUA = " ",
					sufFollowUA = "";
				$_("app").forEach( app => {
					const appo = uaData.apps[app.value];
					if (typeof appo.content === "object") {
						if (appo.content.qBasic) {
							appo.content = `${appo.content.qBasic} ${appo.content.qString} (${JSON.stringify({
								packageName: appo.content.qFrom,
								type: "url",
								extra: {
									scene: "recommend"
								}
							})})`;
						}
					}
					if (appo.prefix) {
						if (appo.followed) {
							preFollowUA = midSpace.test(appo.content) ?
											appo.content + preFollowUA :
											preFollowUA + appo.content ;
						} else {
							prefixUA = `${appo.content} ${prefixUA}`;
						}
					} else if (appo.content instanceof Array) {
						if (appo.followed) {
							preFollowUA = midSpace.test(appo.content[0]) ?
											appo.content[0] + preFollowUA :
											preFollowUA + appo.content[0] ;
							sufFollowUA = midSpace.test(appo.content[1]) ?
											sufFollowUA + appo.content[1] :
											appo.content[1] + sufFollowUA ;
						} else {
							prefixUA = `${appo.content[0]} ${prefixUA}`;
							suffixUA += `${appo.content[1]} `;
						}
					} else {
						if (appo.followed) {
							sufFollowUA = midSpace.test(appo.content) ?
											sufFollowUA + appo.content :
											appo.content + sufFollowUA ;
						} else {
							suffixUA += `${appo.content} `;
						}
					}
				});
				$(false,"textarea").value = prefixUA + preFollowUA + baseUA + sufFollowUA + suffixUA;
				issuesCheck();
				_(win,true);
				winActiv(win);
			}
			
			function makeIssue(issue,head) {
				let p = document.createElement('p');
				p.className = uaData.styles.issue;
				p.id = (head) ? uaData.styles.issueHead : '';
				p.innerHTML = issue;
				return p;
			}
			
			function issuesCheck() {
				var ver;
				const ua = $(false,"textarea").value, ibox = $(false,'#issues'),
					issue = [
								[ // #1 百度 页面 确认框
									( ua.includes('baiduboxapp/') && (
									/Android[^\s\)]* +[^\)]*\)+?/u.test(ua) || ( ver = /baiduboxapp\/\d*/.exec(ua)[0].replace('baiduboxapp/',''),
									ver === '' || ver >= 4 ))),
									'此 UA 可能会导致 百度部分页面 加载时弹出 确认/取消 对话框'
								],[ // #2 城通 下载按钮 失效
									ua.includes('baidu'),
									'此 UA 可能会导致大部分 城通网盘 下载按钮 失效'
								],[ // #3 iPhone 下载 APP 跳到 AppStore
									( ua.includes('iPhone') && ua.includes('AppleWebKit') ),
									'此 UA 可能会导致 百度搜索 下载 APP 跳转到苹果的 AppStore'
								],[ // #4 腾讯视频 页面 确认框
									( ua.includes('Android') && ua.includes('qqnews') ),
									'此 UA 可能会导致 腾讯视频播放页面 加载时弹出 确认/取消 对话框'
								],[ // #5 蓝奏云 mtt: 确认框
									( /\(.*Android.*\)/.test(ua) && ua.includes('MQQBrowser/') &&  ( ver = /MQQBrowser\/\d*/.exec(ua)[0].replace('MQQBrowser/',''), ver >= 5 )),
									'此 UA 可能会导致 蓝奏云部分页面 加载广告时弹出 确认/取消 对话框'
								],[ // #6 淘宝 windvine 确认框
									( ua.includes('Android') && /WindVane\/\d+\.\d+\.\d+/.test(ua) && ( ver = /WindVane\/\d+/.exec(ua)[0].replace('WindVane/',''), ver >= 1 )),
									'此 UA 可能会导致 淘宝部分页面 加载时弹出 确认/取消 对话框'
								]
							];
				let count = 0, hasHead = false;
				$(false,'#issues').innerHTML = '';
				issue.forEach( i => {
					if (i[0]) {
						count++;
						if (!hasHead) {
							ibox.appendChild(makeIssue('',true));
							hasHead = true;
						}
						ibox.appendChild(makeIssue(i[1],false));
					}
				});
				if (count>0) {
					$(false,'#issueHead').innerHTML = `检测到 ${count} 个问题 :`
				}
			}
			
			function makeFlagDiv(clas,box,chinese,opa) {
				const flag = document.createElement("b");
				flag.className = uaData.styles.flag;
				flag.innerHTML = tagConv(clas,chinese,true);
				clas = tagConv(clas,chinese,false);
				if (!box) { _(flag,false,`T${clas}`); }
				flag.style.cssText = `background-color:${uaData.flag[clas][1]};color:${uaData.flag[clas][2]};opacity:${opa}`;
				return flag;
			}
			
			function makeHeadandLink(first) {
				const head = document.createElement("div");
				Object.assign(head,{
					id: `i${first}`,
					innerHTML: first,
					className: uaData.styles.CaseHead
				});
				if(!uaData.touch) {
					const jump = document.createElement("a");
					Object.assign(jump,{
						href: `#i${first}`,
						innerHTML: first
					});
					$(false,"#ajump").appendChild(jump);
				} else {
					uaData.index += first;
				}
				return head;
			}
			
			function pushTagText(cls,app) {
				if (!uaData.tagtext[cls]) { uaData.tagtext[cls] = []; }
				uaData.tagtext[cls].push(app);
			}
			
			function parseClassinItem(lab,app) {
				let count = 0;
				if (uaData.apps[app].class.length===0) {
					pushTagText("no_tag",app);
					lab.className = "no_tag";
					return 1;
				} else {
					uaData.apps[app].class.forEach( cls => {
						if (cls.slice(0,1)==="_" || uaData.tagfind.has(cls)) {
							count += 1;
							lab.appendChild(makeFlagDiv(cls,false,true,1));
							cls = tagConv(cls,true,false);
							pushTagText(cls,app);
							_(lab,false,cls);
						} else {
							toast(`项目 "${app}" 被指定了不存在的标签 "${cls}" ...`);
							uaData.stor.apps[app].class.splice(
								uaData.stor.apps[app].class.findIndex( v => v === cls ),1
							);
							loc.setItem(uaData.storKey,JSON.stringify(uaData.stor));
							window.location.reload();
						}
					});
					return count;
				}
			}
			
			function newBox(type) {
				const box = document.createElement("span");
				box.className = `${uaData.styles.new_style} ${uaData.styles['new_'+type]}`;
				return box;
			}
			
			function makeItem() {
				let ofirst = "Z",cont = $(false,"#app_container");
				Object.keys(uaData.apps).sort().forEach( app => {
					uaData.text.set(app, uaData.apps[app].text);
					const lab = document.createElement("label"),
						box = document.createElement("input"),
						first = getUpperHead(app);
					Object.assign(lab, {
						id: app,
						tabIndex: 0,
						innerHTML: uaData.apps[app].text
					});
					lab.addEventListener('keydown', spaceChecked);
					uaData.count[app] = parseClassinItem(lab,app);
					Object.assign(box, {
						type: "checkbox",
						name: "app",
						value: app,
						className: uaData.styles.orig_box,
						tabIndex: -1
					});
					lab.appendChild(box);
					lab.appendChild(newBox("check"));
					if (first!==ofirst) {
						cont.appendChild(makeHeadandLink(first));
						ofirst = first;
					}
					cont.appendChild(lab);
				});
				cont.addEventListener('keydown',(e) => {
					if (e.code==="Space") {
						e.preventDefault();
					}
				});
				if (uaData.touch) {
					uaData.indexSidebar1 = new IndexSidebar({
						mounted: document.querySelector(`#${uaData.styles.appdiv}`)
					});
				} else {
					_($(false,'#ajump'),true);
				}
			}
			
			function makeFlaginBox() {
				Object.keys(uaData.flag).forEach( flag => {
					const lab = document.createElement("label"),
						box = document.createElement("input");
					lab.id = `L${flag}`;
					lab.tabIndex = 0;
					lab.addEventListener('keydown', spaceChecked);
					Object.assign(box, {
						type: "checkbox",
						name: "flag",
						id: `B${flag}`,
						value: flag,
						checked: true
					});
					box.addEventListener('change', e => tagClick(e.target.parentNode.id,true));
					lab.appendChild(box);
					lab.appendChild(makeFlagDiv(flag,true,false,1));
					$(false,"#classBox").appendChild(lab);
				});
			}
			
			function makeBaseRadio() {
				Object.keys(uaData.base).forEach( base => {
					const lab = document.createElement("label"),
						box = document.createElement("input");
					lab.for = base;
					lab.tabIndex = 0;
					lab.addEventListener('keydown', spaceChecked);
					Object.assign(box, {
						type: "radio",
						name: "base",
						id: base,
						value: base,
						className: uaData.styles.orig_box,
						tabIndex: -1
					});
					lab.appendChild(box);
					lab.appendChild(newBox("radio"));
					lab.innerHTML += uaData.base[base].text;
					$(false,"#baseopt").appendChild(lab);
					if ($(true,"#baseopt label").length===uaData.设置.基础默认) {
						$(false,`#${base}`).checked = true;
					}
				});
			}
			
			function winActiv(awin) {
				let wing = $(true,".win");
				wing.forEach( win => {
					if (win.style.zIndex>awin.style.zIndex) {
						win.style.zIndex--;
					}
				});
				awin.style.zIndex = wing.length + 1;
			}
			
			function dndWin() {
				let wing = $(true,".win"), unlock = () => document.onmousemove = null;
				wing.forEach( (win,i) => win.style.zIndex = i + 2 );
				if (uaData.touch) {
					wing.forEach( win => {
						win.addEventListener('touchstart', e => {
							if (e.target.nodeName!=="TEXTAREA" &&
								e.target.type!=="text" &&
								!$(false,'#issues').contains(e.target)) {
								pos = [
								(e.touches[0].clientX - win.offsetLeft),
								(e.touches[0].clientY - win.offsetTop)
								];
							}
							winActiv(win);
						},{ passive: true });
						win.addEventListener('touchmove', e => {
							if (e.target.nodeName!=="TEXTAREA" &&
								e.target.type!=="text" &&
								!$(false,'#issues').contains(e.target)) {
								win.style.left = (e.touches[0].clientX - pos[0]) + 'px';
								win.style.top = (e.touches[0].clientY - pos[1]) + 'px';
							}
							win.style.position = (
								parseInt(getComputedStyle(win)['right']) < 0 || 
								parseInt(getComputedStyle(win)['left']) < 0 ||
								parseInt(getComputedStyle(win)['bottom']) < 0) ?
							'fixed' : 'absolute' ;
						},{ passive: true });
					});
				} else {
					wing.forEach( win => {
						win.addEventListener('mousedown', e => {
							pos = [
							(e.clientX - win.offsetLeft),
							(e.clientY - win.offsetTop)
							];
							winActiv(win);
							document.onmousemove = e => {
								if(e.target.nodeName!=="TEXTAREA"&&e.target.type!=="text") {
									win.style.left = (e.clientX - pos[0]) + 'px';
									win.style.top = (e.clientY - pos[1]) + 'px';
								}
							};
							document.removeEventListener('mouseup', unlock);
							document.addEventListener('mouseup', unlock);
						});
					});
				}
			}
			
			function openWin(id) {
				let win = $(false,id);
				if (win.classList.contains(uaData.styles.none)) {
					_(win,true);
					winActiv(win);
				} else {
					_(win,false);
				}
			}
			
			function topwin(e) {
				let btn = e.target, win = btn.parentNode.parentNode;
				_(win,(win.classList.contains(uaData.styles.topwin)),uaData.styles.topwin);
				btn.style.backgroundColor = (win.classList.contains(uaData.styles.topwin)) ?
					__('theme-color-top-enable') : __('theme-color-top');
			}
			
			function filterExec(item,nclass) {
				let found;
				lab.forEach( ele => {
					found = false;
					for (let val of item) {
						if (val===ele.id) {
							found = true;
							break;
						}
					}
					_(ele,found,nclass);
				});
				scanForHead();
				_(ntx,!scanAll());
			}
			
			function filterResume(nclass) {
				lah.forEach( ele => { _(ele,true,nclass); });
				scanForHead();
				_(ntx,!scanAll());
			}
			
			function fltAppUA(e) {
				let word = e.target.value;
				if (word==="") {
					filterResume("none");
				} else {
					const item = [];
					for (let [k,v] of uaData.text) {
						v.toLowerCase().includes(word.toLowerCase()) && item.push(k);
					}
					filterExec(item,"none");
				}
			}
			
			function fltAppUASelected(e) {
				let btn = e.target;
				if (btn.innerHTML==="列出已选") {
					const item = [];
					$_("app").forEach( ele => item.push(ele.value));
					filterExec(item,"sel_none");
					btn.innerHTML = "列出全部";
				} else {
					filterResume("sel_none");
					btn.innerHTML = "列出已选";
				}
			}
			
			function fltAppUATag(clas,selected) {
				$(true,`.T${clas}`).forEach( tag => _(tag,selected) );
				if (uaData.tagtext[clas]) {
					uaData.tagtext[clas].forEach( id => {
						if (selected) {
							uaData.count[id]++;
						} else {
							uaData.count[id]--;
						}
					});
				}
				const item = Object.keys(uaData.count).filter(obj => uaData.count[obj]!==0);
				filterExec(item,"tag_none");
			}
			
			function tagClick(id,flt) {
				const box = $(false,`#${id} input`),
					flag = $(false,`#${id} .flag`);
				flag.style.opacity = (box.checked) ? 1 : .5;
				if (flt) {
					fltAppUATag(id.slice(1),box.checked);
					$(false,'#openClass').style.backgroundColor = ($(true,'#classBox input:not(:checked)').length===0) ? '' : __('tag-filtered');
				}
			}
			
			/* "添加" 窗口表单 相关 */
			
			function aform_tType(type) {
				return (type.slice(1)==="app") ? type.slice(0,1) : "t";
			}
			
			function aform_switchModify() {
				const type = aform_tType($_("atype").value),
					sel = $(false,`#${type}sell`),
					key = $(false,`#${type}keyl`),
					btn = $(false,'#anew'),
					ok = $(false,'#aok'),
					mod = (btn.innerHTML==="管理");
				_(key,!mod);
				_(sel,mod);
				btn.innerHTML = (mod) ? "添加" : "管理";
				ok.innerHTML = (mod) ? "确定" : "加入";
				aform_Clear();
			}
			
			function aform_switchCard() {
				const val = $_("atype").value,set = (val==="asty");
				_($(false,'#setlayer'),set);
				_($(false,'#addlayer'),!set);
				if (!set) {
					$(true,".atab").forEach( tab => {
						if (tab.id===`${val}t`) {
							_(tab,true);
							$(false,'#anew').innerHTML = "添加";
							aform_switchModify();
						} else {
							_(tab,false);
						}
					});
				}
			}
			
			function aform_switchBoth() {
				const val = ($_("apre").value==="both");
				$(true,".acont2").forEach( input => _(input,val) );
				_($(false,".acont1"),!val);
			}
			
			function aform_makeFlaginBox() {
				$(true,".classBox").forEach( sbox => {
					Object.keys(uaData.flag).forEach( flag => {
						if (flag!=="qapp" && flag!=="no_tag") {
							const lab = document.createElement("label"),
								box = document.createElement("input");
							lab.id = `${getUpperHead(sbox.id)}${flag}`;
							lab.tabIndex = 0;
							lab.addEventListener('keydown', spaceChecked);
							Object.assign(box, {
								type: "checkbox",
								name: "sflag",
								id: `${sbox.id.slice(0,1)}${flag}`,
								value: flag,
								checked: false
							});
							if (flag==="third") {
								box.addEventListener('change', e => {
									tagClick(e.target.parentNode.id,false);
									_($(false,`#${sbox.id}l`),box.checked);
								});
							} else {
								box.addEventListener('change', e => {
									tagClick(e.target.parentNode.id,false);
								});
							}
							lab.appendChild(box);
							lab.appendChild(makeFlagDiv(flag,true,false,0.5));
							sbox.appendChild(lab);
						}
					});
				});
			}
			
			function aform_updateFlagPreview() {
				const box = $(false,'#tclsbox'),
					txt = $(false,'#ttext').value;
				box.innerHTML = txt;
				_(box,txt!=="");
				box.style.cssText =
				`background-color:${$(false,'#tbgc').value};color:${$(false,'#tfgc').value}`;
			}
			
			function aform_Clear() {
				$(true,'#addtable input[type="text"]').forEach( i => {
					i.value = "";
					i.style.removeProperty('border-color');
				});
				$(false,'#tkds').style.removeProperty('border-color');
				$(true,".classBox input").forEach( c => { c.checked = false; });
				$(true,".classBox .flag").forEach( f => { f.style.opacity = .5; });
				$(true,".classPart label").forEach( t => { _(t,false); });
				$(true,'#apref,#afolf').forEach( r => { r.checked = true; });
				$(true,'.msel').forEach( s => { s.value = ""; });
				$(false,'#tbgc').value = '#000000';
				$(false,'#tfgc').value = '#ffffff';
				aform_updateFlagPreview();
				aform_switchBoth();
			}
			
			function aform_Check(type) {
				let a = true;
				$(true,`#${type}t input[type="text"]`).forEach( i => {
					i.style.removeProperty('border-color');
					if (getComputedStyle(i).display!=="none" &&
						getComputedStyle(i.parentNode).display!=="none" &&
						i.value==="") {
						if (i.id==="ttext") {
							$(false,'#tkds').style.borderColor = __('input-check-null');
						} else {
							i.style.borderColor = __('input-check-null');
						}
						a = false;
					}
				});
				return (a && $(false,'#anew').innerHTML==="管理") ? aform_KeyCheck(true) : a ;
			}
			
			function aform_KeyCheck(show) {
				const type = aform_tType($_('atype').value), test = /^\w+$/u;
				let inp = $(false,`#${type}key`), key = inp.value, bor = inp,
					src = (type==="t") ? 'flag' : 'apps';
				if (type==='t' && key.slice(0,1)==="_") {
					bor.style.borderColor = __('input-check-err');
					if(show){ toast('"_" 开头用于自定义标签'); }
					return false;
				}
				if (key in uaData[src]||key in uaData.stor[src]) {
					bor.style.borderColor = __('input-check-err');
					if(show){ toast('标识重复'); }
					return false;
				}
				if (key==="") {
					bor.style.removeProperty('border-color');
					return false;
				} else if (!test.test(key)) {
					bor.style.borderColor = __('input-check-err');
					if(show){ toast('输入错误'); }
					return false;
				} else {
					bor.style.borderColor = __('input-check-ok');
					return true;
				}
			}
			
			function aform_Add() {
				const atyp = $_("atype").value;
				let key,cont,obj,typr;
				if (!aform_Check(atyp)) { return; }
				typr = aform_tType(atyp);
				key = ($(false,'#anew').innerHTML==="管理") ?
					$(false,`#${typr}key`).value :
					$(false,`#${typr}sel`).value ;
				if (key==="" && $(false,'#anew').innerHTML==="添加") {
					toast("请选择需要修改的项目");
					return;
				}
				switch (typr) {
					case "a":
						cont = ($_("apre").value!=="both") ?  
							$(false,"#acont1").value : [
							$(false,"#acont2a").value,
							$(false,"#acont2b").value ];
						break;
					case "q":
						cont = {
							qBasic: $(false,"#qcont1").value,
							qFrom: $(false,"#qcont2").value,
							qString: $(false,"#qcont3").value,
						};
						break;
				}
				if (atyp==="atag") {
					obj = [
						$(false,'#ttext').value,
						$(false,'#tbgc').value,
						$(false,'#tfgc').value
					]
					Object.assign(uaData.stor.flag, { [`${key}`]: obj });
				} else {
					obj = {
						text: $(false,`#${typr}text`).value,
						prefix: (atyp==="qapp"||$_("apre").value==="both") ? false :
								($_("apre").value==='true'),
						followed: (atyp==="qapp") ? false : ($_("afol").value==='true'),
						content: (atyp==="qapp") ? {
							平台:cont.qBasic,
							来自:cont.qFrom,
							应用:cont.qString
						} : cont,
						class: []
					}
					
					$_("sflag").forEach( inp => {
						if(inp.id.slice(1)==="third") {
							obj.class.push("_" + $(false,`#${typr}thirdt`).value);
						} else {
							obj.class.push(tagConv(inp.id.slice(1),false,true));
						}
					});
					
					if (atyp==="qapp") {
						obj.class.push("快应用");
					}
					
					Object.assign(uaData.stor.apps, {
						[`${key}`]: {
							名称: obj.text,
							前置: (obj.prefix) ? "是" : "不是",
							无缝: (obj.followed) ? "是" : "不是",
							标签: obj.class,
							内容: obj.content
						}
					});
				}
				if ($(false,'#anew').innerHTML==="管理") {
					$(false,`#${typr}sel`).insertBefore(
						new Option((atyp==="atag") ?
							`${obj[0]} (${key})` : `${obj.text} (${key})`,
						key), $(false,`#${typr}sel`)[1]
					);
					aform_Clear();
				} else {
					$(false,`#${typr}sel option[value="${key}"]`).innerHTML = (atyp==="atag") ?
						`${obj[0]} (${key})` :`${obj.text} (${key})`;
					aform_Clear();
				}
				$(false,'#ssave').style.backgroundColor = __('data-need-save');
				if ($(false,'#aok').innerHTML==="加入") {
					toast('加入成功');
				} else {
					toast('修改成功');
				}
			}
			
			function aform_Modify() {
				const type = aform_tType($_("atype").value),
					item = $(false,`#${type}sel`).value;
				let obj,cobj,cont,chk;
				function tagParse(tags) {
					let ccls = [];
					tags.forEach( ct => {
						ccls.push((ct.slice(0,1)==="_") ? ct : uaData.tagfind.get(ct));
					});
					return ccls;
				}
				switch (type) {
					case "t" :
						obj = (uaData.stor.flag[item]) ? uaData.stor.flag[item] : uaData.flag[item];
						break;
					default:
						if (uaData.stor.apps[item]) {
							cobj = uaData.stor.apps[item];
							if (typeof cobj["内容"] === "object") {
								if (cobj["内容"] instanceof Array) {
									cont = [cobj["内容"][0],cobj["内容"][1]];
								} else {
									cont = {
										qBasic: cobj["内容"]["平台"],
										qFrom: cobj["内容"]["来自"],
										qString: cobj["内容"]["应用"]
									}
								}
							} else {
								cont = cobj["内容"];
							}
							obj = {
								text: cobj["名称"],
								prefix: (cobj["前置"]==="是") ? true : false,
								followed: (cobj["无缝"]==="是") ? true : false,
								class: tagParse(cobj["标签"]),
								content: cont
							}
						} else {
							obj = JSON.parse(JSON.stringify(uaData.apps[item]));
							obj.class = tagParse(obj.class);
						}
						break;
				}

				function tagSelect(id) {
					let box = $(false,`#${id} input`),
						flag = $(false,`#${id} .flag`);
					box.checked = true;
					flag.style.opacity = 1;
				}
				
				function clsSet(obj,type) {
					$(true,`#${type}clsbox input`).forEach( c => { c.checked = false; });
					$(true,`#${type}clsbox .flag`).forEach( f => { f.style.opacity = .5; });
					_($(false,`#${type}clsboxl`),false);
					obj.class.forEach( cls => {
						if (cls!=="qapp") {
							if (cls.slice(0,1)==="_") {
								tagSelect(`${type.toUpperCase()}third`);
								_($(false,`#${type}clsboxl`),true);
								$(false,`#${type}thirdt`).value = cls.slice(1);
							} else {
								tagSelect(`${type.toUpperCase()}${cls}`);
							}
						}
					});
				}
				
				switch (type) {
					case "a" :
						$(false,"#atext").value = obj.text;
						if (obj.content instanceof Array) {
							$(false,"#apreb").checked = true;
							aform_switchBoth();
							$(false,"#acont2a").value = obj.content[0];
							$(false,"#acont2b").value = obj.content[1];
						} else {
							chk = (obj.prefix) ? $(false,"#apret") : $(false,"#apref");
							chk.checked = true;
							aform_switchBoth();
							$(false,"#acont1").value = obj.content;
						}
						chk = (obj.followed) ? $(false,"#afolt") : $(false,"#afolf");
						chk.checked = true;
						clsSet(obj,type);
						break;
					case "q" :
						$(false,"#qtext").value = obj.text;
						$(false,"#qcont1").value = obj.content.qBasic;
						$(false,"#qcont2").value = obj.content.qFrom;
						$(false,"#qcont3").value = obj.content.qString;
						clsSet(obj,type);
						break;
					case "t" :
						$(false,"#ttext").value = obj[0];
						$(false,"#tbgc").value = obj[1];
						$(false,"#tfgc").value = obj[2];
						aform_updateFlagPreview();
						break;
				}
			}
			
			function aform_Delete() {
				let type = aform_tType($_("atype").value),
					sel = $(false,`#${type}sel`),
					val = sel.value,
					opt = $(false,`#${type}sel option[value="${val}"]`),
					item = (type==='t') ? uaData.stor.flag[val] : uaData.stor.apps[val];
				if ($(false,'#anew').innerHTML==="添加") {
					if (val) {
						if (item) {
							switch (type) {
								case "t" :
									delete uaData.stor.flag[val];
									break;
								default:
									delete uaData.stor.apps[val];
									break;
							}
							sel.removeChild(opt);
							aform_Clear();
							$(false,'#ssave').style.backgroundColor = __('data-need-save');
							toast('删除成功');
						} else {
							toast('不能删除自带项目');
						}
					} else {
						toast('没有选择项目');
					}
				} else {
					toast('只能在管理模式下删除项目');
				}
			}
		
			/* localStorage 相关 */
			
			function lsb_initOption() {
				let sel,opt;
				if (Object.keys(uaData.stor).length!==0) {
					if (uaData.stor.apps) {
						Object.keys(uaData.stor.apps).forEach( app => {
							opt = new Option(`${uaData.stor.apps[app].名称} (${app})`,app);
							sel = (uaData.stor.apps[app].内容.来自) ?
								$(false,'#qsel') : $(false,'#asel');
							if (sel.length===1) {
								sel.appendChild(opt);
							} else {
								sel.insertBefore(opt,sel[1]);
							}
						});
					}
					if (uaData.stor.flag) {
						Object.keys(uaData.stor.flag).forEach( tag => {
							opt = new Option(`${uaData.stor.flag[tag][0]} (${tag})`,tag);
							sel = $(false,'#tsel');
							if (sel.length===1) {
								sel.appendChild(opt);
							} else {
								sel.insertBefore(opt,sel[1]);
							}
						});
					}
				}
				Object.keys(uaData.apps).sort().forEach( app => {
					if (!uaData.stor.apps[app]) {
						sel = (uaData.apps[app].content.qFrom) ?
							$(false,'#qsel') : $(false,'#asel');
						sel.appendChild(new Option(`* ${uaData.apps[app].text} (${app})`,app));
					}
				});
				Object.keys(uaData.flag).sort().forEach( tag => {
					if (!uaData.stor.flag[tag]) {
						$(false,'#tsel').appendChild(
							new Option(`* ${uaData.flag[tag][0]} (${tag})`,tag));
					}
				});
			}
			
			function lsb_save() {
				if (Object.keys(uaData.stor.apps).length!==0 ||
					Object.keys(uaData.stor.flag).length!==0) {
					loc.setItem(uaData.storKey,JSON.stringify(uaData.stor));
				} else {
					window.localStorage.removeItem(uaData.storKey);
				}
				$(false,'#ssave').style.backgroundColor = '';
				toast('保存成功，下次刷新生效');
			}

			function lsb_export() {
				if (loc.hasOwnProperty(uaData.storKey)) {
					$(false,"#stordata").value = loc.getItem(uaData.storKey);
				} else {
					toast('没有自定义数据');
				}
			}
			
			function lsb_import() {
				if ($(false,"#stordata").value!=="") {
					try {
						const data = JSON.parse($(false,"#stordata").value);
						if (loc.hasOwnProperty(uaData.storKey)) {
							let odata = JSON.parse(loc.getItem(uaData.storKey));
							Object.keys(data).forEach( k => {
								if (odata[k]) {
									Object.assign(odata[k],data[k]);
								} else {
									odata[k] = data[k];
								}
							});
							loc.setItem(uaData.storKey,JSON.stringify(odata));
						} else {
							loc.setItem(uaData.storKey,JSON.stringify(data));
						}
						$(false,"#stordata").value = "";
						toast('导入成功');
					} catch(e) {
						if (e instanceof SyntaxError) {
							toast('导入失败:格式不正确');
						} else {
							toast(`导入失败:${e}`);
						}
					}
				} else {
					toast('没有输入数据');
				}
			}
			
			function lss_save() {
				let obj = {}, thm = {
					light: [
						Object.values($(false,'#myLight').sheet.cssRules)[0].cssText,
						$(false,'#stylight').value
					],
					dark: [
						Object.values($(false,'#myDark').sheet.cssRules)[0].cssRules[0].cssText,
						$(false,'#stydark').value
					]
				}
				Object.keys(thm).forEach( th => {
					if (thm[th][1]!=='' && thm[th][0]!==thm[th][1]) {
						Object.assign(obj, { [th]: (th==='dark') ? `@media (prefers-color-scheme: dark) {\n${thm[th][1]}\n}` : thm[th][1] });
					}
				})
				if (obj!=={}) {
					loc.setItem(uaData.styleKey,JSON.stringify(obj));
					toast('保存成功，下次刷新生效');
				} else {
					toast('内容没修改，不用保存');
				}
			}
			
			function swOpr() {
				let opt = uaCode.$(false,'#swopt'),
					stat = uaCode.$(false,'#swstat'),
					btn = uaCode.$(false,'#swreg'),
					swer = navigator.serviceWorker;
				swer.getRegistrations().then( regs => {
					if (regs.length>=1) {
						regs[0].unregister();
						opt.classList.remove('inst');
						stat.innerHTML = '未安装';
						btn.innerHTML = '安装服务';
					} else {
						swer.register('svcWorker.js').then( reg => {
							if (reg.installing) {
								stat.innerHTML = '正在安装，刷新后生效';
							} else if (reg.waiting) {
								stat.innerHTML = '等待安装';
							} else if (reg.active) {
								stat.innerHTML = '已安装';
							}
						});
						opt.classList.add('inst');
						btn.innerHTML = '卸载服务';
					}
				});
			}
			
			function cacheScan() {
				caches.keys().then( vers => { $(false,"#swlen").innerHTML = vers.length });
			}
			
			function previewUpdate() {
				let view = $(false,"#addprvw"), show,
					type = aform_tType($_("atype").value),
					spanGen = function(text,cls){
						let span = document.createElement('span');
						_(span,!1,cls);
						span.innerText = text;
						return span;
					};
				(view.childElementCount!==0) && (view.innerHTML='');
				if (type==='a') {
					let pre, base, suf;
					if ($_("apre").value==='both') {
						pre = $(false,"#acont2a").value;
						suf = $(false,"#acont2b").value;
					} else {
						($_("apre").value==='true') ?
							pre = $(false,"#acont1").value :
							suf = $(false,"#acont1").value;
					}
					pre = ($_("afol").value!=='true' && pre) ? pre + ' ' : pre;
					suf = ($_("afol").value!=='true' && suf) ? ' ' + suf : suf;
					if ($(false,"#atbs").checked) {
						base = uaData.base.tbs.content;
					} else if ($(false,"#ashort").checked) {
						base = uaData.base.short.content;
					} else if ($(false,"#apc").checked || $(false,"#aspider").checked) {
						base = '';
					} else {
						base = uaData.base.std.content;
					}
					(pre) && view.appendChild(spanGen(pre,'keycont'));
					view.appendChild(spanGen(base,'basecont'));
					(suf) && view.appendChild(spanGen(suf,'keycont'));
				} else {
					view.appendChild(spanGen($(false,"#qcont1").value+' ','qapplat'));
					view.appendChild(spanGen($(false,"#qcont3").value+' ','qapappl'));
					view.innerHTML += '({"packageName":"';
					view.appendChild(spanGen($(false,"#qcont2").value,'qapfrom'));
					view.innerHTML += '","type":"url","extra":{"scene":"recommend"}})';
				}
				if((aform_tType($_("atype").value)==='a' &&
					$_("apre").value==='both' &&
					$(false,"#acont2a").value==='' &&
					$(false,"#acont2b").value==='') || (
					aform_tType($_("atype").value)==='a' &&
					$_("apre").value!=='both' &&
					$(false,"#acont1").value==='') || (
					aform_tType($_("atype").value)==='q' &&
					$(false,"#qcont1").value==='' &&
					$(false,"#qcont2").value==='' &&
					$(false,"#qcont3").value==='') ||
					aform_tType($_("atype").value)==='t') {
						show = false;
					} else {
						show = true;
					}
				_(view,show);
				_($(false,"#nullprvw"),!show);
			}
			
			function addEvent() {
				function ee(el,ev,fn) { el.addEventListener(ev,fn); }
				$(true,'#modebox label').forEach( e => ee(e,'keydown', spaceChecked));
				ee($(false,'#openClass'),'click',openWin.bind(this,'#tagclass'));
				ee($(false,'#openUA'),'click',openWin.bind(this,'#ua'));
				ee($(false,'#search'),'input', fltAppUA.bind(this));
				ee($(false,'#btnHelp'),'click',()=>{window.location.href='https://gitee.com/lemon399/user-agent-share-page/blob/master/README.md'});
				ee($(false,'#btnCSel'),'click',()=>{$_('app').forEach( check => { check.checked = false; })});
				ee($(false,'#openNew'),'click',openWin.bind(this,'#addui'));
				ee($(false,'#btnSlst'),'click',fltAppUASelected.bind(this));
				ee($(false,'#btnGen'),'click',genUA);
				$(true,'.close').forEach( c => ee(c,'click',e => { e.target.parentNode.parentNode.classList.add(uaData.styles.none)}));
				$(true,'.topbutton').forEach( c => ee(c,'click',topwin.bind(this)));
				ee($(false,'.prev'),'click',openWin.bind(this,'#prvui'));
				ee($(false,'#useragent'),'input',issuesCheck);
				ee($(false,'#btnClUA'),'click',()=>{$(false,'#useragent').value = '';issuesCheck();});
				ee($(false,'#btnCpUA'),'click',()=>{$(false,'#useragent').select();document.execCommand('copy');});
				ee($(false,'#btnTgAl'),'click',()=>{$(true,'#classBox input:not(:checked)').forEach( b => { b.checked = true; tagClick(b.parentNode.id,true);});});
				ee($(false,'#btnTgRv'),'click',()=>{$(true,'#classBox input').forEach( b => { b.checked = (!b.checked); tagClick(b.parentNode.id,true);});});
				$(true,'#addtype label').forEach( e => ee(e,'keydown', spaceChecked));
				$(true,'#addtype input').forEach( e => ee(e,'change', aform_switchCard));
				$(true,'#addtype input').forEach( e => ee(e,'change', previewUpdate));
				$(true,'.key').forEach( e => ee(e,'input',aform_KeyCheck.bind(this,false)));
				$(true,'.msel').forEach( e => ee(e,'change',aform_Modify));
				$(true,'#aappt .msel,#qappt .msel').forEach( e => ee(e,'change',previewUpdate));
				$(true,'#apre label').forEach( e => ee(e,'keydown', spaceChecked));
				$(true,'#apre input').forEach( e => ee(e,'change', aform_switchBoth));
				$(true,'#afol label').forEach( e => ee(e,'keydown', spaceChecked));
				ee($(false,'#ttext'),'input', aform_updateFlagPreview);
				$(true,'#tbgc,#tfgc').forEach( e => ee(e,'change', aform_updateFlagPreview));
				ee($(false,'#aok'),'click',aform_Add);
				ee($(false,'#aclear'),'click',aform_Clear);
				ee($(false,'#anew'),'click',aform_switchModify);
				ee($(false,'#adel'),'click',aform_Delete);
				ee($(false,'#ssave'),'click',lsb_save);
				ee($(false,'#scopy'),'click',()=>{$(false,'#stordata').select();document.execCommand('copy');});
				ee($(false,'#sdele'),'click',()=>{$(false,'#stordata').value = '';});
				ee($(false,'#simp'),'click',lsb_import);
				ee($(false,'#sexp'),'click',lsb_export);
				ee($(false,'#sclr'),'click',()=>{window.localStorage.removeItem(uaData.storKey);toast('清空啦')});
				ee($(false,'#stysave'),'click',lss_save);
				ee($(false,'#styclr'),'click',()=>{window.localStorage.removeItem(uaData.styleKey);toast('清空啦，刷新后恢复默认主题')});
				ee($(false,'#swreg'),'click',swOpr);
				ee($(false,'#swclr'),'click',()=>{ caches.keys().then( vers => vers.map( i => caches.delete(i) )); cacheScan()});
				ee($(false,'#loaddiv'),'animationend',e=>_(e.target,false));
				$(true,'#acont1,#acont2a,#acont2b,#qcont1,#qcont2,#qcont3').forEach( e => ee(e,'input',previewUpdate));
				$(true,'#apre input,#afol input').forEach( e => ee(e,'change', previewUpdate));
				$(true,'#atbs,#ashort,#apc,#aspider').forEach( e => ee(e,'change',previewUpdate));
			}
			
			function init(){
				$(false,'#loadstr').innerHTML = '正在构建 ...';
				lsb_initOption();
				makeItem();
				makeFlaginBox();
				aform_makeFlaginBox();
				addEvent();
				makeBaseRadio();
				dndWin();
				$(false,'#loadstr').innerHTML = '正在初始化 ...';
				$(false,"#Raapp").checked = true;
				$(false,"#stordata").value = '';
				aform_Clear();
				$(false,"#search").value = '';
				$(false,"#version").innerHTML = `版本:${uaData.版本.描述}_${uaData.版本.详细} 总数:${Object.keys(uaData.apps).length}`;
				if (window.location.host.match('gitee.io')) {
					$(false,"#version").innerHTML += ' <i>由 Gitee 提供代码和网页托管服务</i>';
					$(false,"#version").onclick = () => {
						window.location.href='https://gitee.com/lemon399/user-agent-share-page';
					}
				}
				$(false,'#loadstr').innerHTML = '加载完成';
				_($(false,"#loaddiv"),false,"finish");
				lab = $(true,"#app_container label"),
				cas = $(true,"#app_container .CaseHead"),
				lah = $(true,"#app_container > label,.CaseHead"),
				ntx = $(false,"#nulltext"),
				loc = window.localStorage;
			}

			return {
				init: init,
				sel: $,
				toast: toast
			}
		}
module.exports = uaCode();
