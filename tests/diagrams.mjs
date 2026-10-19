import {chromium} from 'playwright';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:5173/PantherFxSeminar/');
for(let i=0;i<6;i++){await page.locator('[data-chapter]').nth(i).click();for(const view of ['lesson','example','takeaway']){await page.locator(`[data-view="${view}"]`).click();if(await page.locator('.teaching-diagram svg').count()!==1)throw Error('Missing diagram');for(let s=0;s<3;s++){await page.locator(`[data-diagram-step="${s}"]`).click();if(await page.locator(`[data-diagram-step="${s}"]`).getAttribute('aria-pressed')!=='true')throw Error('Step control');}}}
if((await page.locator('body').innerText()).includes('Luxury. Precision.'))throw Error('Slogan remains');
await page.locator('[data-chapter]').nth(3).click();await page.screenshot({path:'/tmp/pantherfx-diagram.png',fullPage:true});
for(const width of [390,1440,1920]){await page.setViewportSize({width,height:1080});if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw Error('Page overflow');}
await page.locator('#present').click();if(!await page.locator('.teaching-diagram').isVisible())throw Error('Projector diagram hidden');await page.keyboard.press('Escape');
if(errors.length)throw Error(errors.join(';'));console.log('PASS: 18 topic slides, 54 diagram-step interactions, slogan removal, responsive layout, presentation diagrams');await browser.close();
