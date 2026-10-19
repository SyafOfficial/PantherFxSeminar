import {chromium} from 'playwright';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage();await page.goto('http://127.0.0.1:5173/PantherFxSeminar/',{waitUntil:'domcontentloaded'});
const check=(ok,msg)=>{if(!ok)throw Error(msg)};
for(let i=0;i<6;i++){await page.locator('[data-chapter]').nth(i).click();for(const v of ['lesson','example','takeaway']){await page.locator(`[data-view="${v}"]`).click();check((await page.locator('.lead').textContent()).length>15,'content')}}
await page.locator('#next').click();check((await page.locator('h1').textContent()).includes('Trade with intention'),'closing');await page.keyboard.press('ArrowLeft');await page.locator('#present').click();check(await page.locator('body').evaluate(e=>e.classList.contains('presenting')),'presentation');await page.keyboard.press('Escape');check(await page.locator('body').evaluate(e=>!e.classList.contains('presenting')),'escape');await page.locator('.brand').click();
for(const [width,height] of [[1440,1000],[1920,1080],[390,844]]){await page.setViewportSize({width,height});check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow');await page.screenshot({path:`/tmp/pantherfx-${width}.png`,fullPage:true});}
console.log('PASS: six chapters, 18 content sections, closing, keyboard navigation, presentation, Escape, responsive widths');await browser.close();
