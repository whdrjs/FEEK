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
