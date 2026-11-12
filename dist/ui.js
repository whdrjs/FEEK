// Native-control presentation, independent of the image-processing engine.
function refreshControls(){
  document.querySelectorAll('input[type="range"]').forEach(input=>{
    const min=Number(input.min||0),max=Number(input.max||100);
    input.style.setProperty('--fill',`${100*(Number(input.value)-min)/(max-min)}%`);
  });
  document.querySelectorAll('[data-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.classList.contains('active'))));
  document.querySelectorAll('[data-tool]').forEach(button=>button.setAttribute('aria-pressed',String(button.classList.contains('selected'))));
}
let scheduled=false;
function scheduleRefresh(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;refreshControls()})}
document.addEventListener('input',scheduleRefresh);
document.addEventListener('click',scheduleRefresh);
new MutationObserver(scheduleRefresh).observe(document.querySelector('aside'),{childList:true,subtree:true,characterData:true});
document.querySelectorAll('label.button').forEach(label=>{
  label.tabIndex=0;label.setAttribute('role','button');
  label.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();label.querySelector('input[type=file]').click()}});
});
document.querySelectorAll('[title]').forEach(button=>button.setAttribute('aria-label',button.title));
refreshControls();

// Keep detailed controls out of the photo area until a tool is requested.
const mobileMedia=matchMedia('(max-width:800px)');
const settingsPanel=document.querySelector('aside');
settingsPanel.id='editor-settings';
const settingsToggle=document.createElement('button');
settingsToggle.className='mobile-settings-toggle';
settingsToggle.type='button';
settingsToggle.setAttribute('aria-controls','editor-settings');
settingsPanel.prepend(settingsToggle);
function setSettingsOpen(open){
  settingsPanel.classList.toggle('mobile-open',open);
  settingsToggle.setAttribute('aria-expanded',String(open));
  settingsToggle.textContent=document.getElementById('paneltitle').textContent;
  requestAnimationFrame(()=>window.dispatchEvent(new Event('feek-panel-resize')));
}
settingsToggle.addEventListener('click',()=>setSettingsOpen(!settingsPanel.classList.contains('mobile-open')));
const toolNav=document.getElementById('nav');
// Clicking the current tab must not discard an uncommitted adjustment.
 toolNav.addEventListener('click',event=>{
  const button=event.target.closest('[data-tab]');
  if(!button||!mobileMedia.matches)return;
  if(button.classList.contains('active')){
    event.stopImmediatePropagation();
    setSettingsOpen(!settingsPanel.classList.contains('mobile-open'));
  }else requestAnimationFrame(()=>setSettingsOpen(true));
 },true);
// Manual landmark/source selection needs an unobstructed canvas.
for(const id of ['manual','source'])document.getElementById(id).addEventListener('click',()=>{
  if(mobileMedia.matches&&!document.getElementById('imagewrap').hidden)setSettingsOpen(false);
});
mobileMedia.addEventListener('change',()=>setSettingsOpen(false));
setSettingsOpen(false);
