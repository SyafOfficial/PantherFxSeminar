import {whatsappNumber} from './homework-config.js';
const form=document.querySelector('#homework');
const status=document.querySelector('#delivery-status');
status.textContent=whatsappNumber?'Your homework will open in your coach’s WhatsApp chat. Review it and tap Send there.':'After reviewing, open WhatsApp and choose your coach’s chat. Review the message and tap Send.';
function answers(){return 'PANTHERFX · SEMINAR HOMEWORK\n\n'+[...new FormData(form)].filter(([name])=>name!=='Consent').map(([name,value])=>`${name}\n${value||'(unanswered)'}`).join('\n\n')+(screenshot.files[0]?`\n\nChart screenshot: ${screenshot.files[0].name}\nI will attach this image separately in WhatsApp.`:'');}
form.addEventListener('submit',event=>{event.preventDefault();const body=answers();document.querySelector('#answer-preview').value=body;document.querySelector('#whatsapp-link').href=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`;document.querySelector('#answer-review').hidden=false;document.querySelector('#answer-review').scrollIntoView({behavior:'smooth'});document.querySelector('#whatsapp-link').focus();});
form.addEventListener('input',()=>{document.querySelector('#answer-review').hidden=true;});
document.querySelector('#copy-answers').addEventListener('click',async()=>{const preview=document.querySelector('#answer-preview');try{await navigator.clipboard.writeText(preview.value);document.querySelector('#copy-status').textContent='Copied. Paste into your coach’s chat and tap Send.';}catch{preview.focus();preview.select();document.querySelector('#copy-status').textContent='Select and copy the message above, then paste it into WhatsApp.';}});
document.querySelector('#download-answers').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([answers()],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='PantherFX-homework.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});

const screenshot=document.querySelector('#chart-screenshot');
const preview=document.querySelector('#screenshot-preview');
const image=document.querySelector('#chart-image');
const screenshotStatus=document.querySelector('#screenshot-status');
const chartFields=['chart-setup','chart-direction','chart-explanation'].map(id=>document.getElementById(id));
let previewUrl;
function clearScreenshot(message='No screenshot selected.'){if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=undefined;screenshot.value='';preview.hidden=true;image.removeAttribute('src');screenshotStatus.textContent=message;chartFields.forEach(field=>field.required=false);document.querySelector('#answer-review').hidden=true;}
screenshot.addEventListener('change',()=>{const file=screenshot.files[0];document.querySelector('#answer-review').hidden=true;if(!file){clearScreenshot();return;}if(!['image/png','image/jpeg','image/webp'].includes(file.type)){clearScreenshot('Please choose a PNG, JPG or WebP image.');return;}if(file.size>10*1024*1024){clearScreenshot('This file is too large. Choose an image under 10 MB.');return;}if(previewUrl)URL.revokeObjectURL(previewUrl);previewUrl=URL.createObjectURL(file);image.src=previewUrl;preview.hidden=false;screenshotStatus.textContent=`Selected: ${file.name}. Attach this image manually in WhatsApp.`;chartFields.forEach(field=>field.required=true);});
image.addEventListener('error',()=>clearScreenshot('This image could not be previewed. Please choose another screenshot.'));
document.querySelector('#remove-screenshot').addEventListener('click',()=>clearScreenshot());
