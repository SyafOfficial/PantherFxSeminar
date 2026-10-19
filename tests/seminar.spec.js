import {test,expect} from '@playwright/test';
test('seminar navigation, chapter content, keyboard, and presentation', async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:5173/PantherFxSeminar/');
 await expect(page.locator('h1')).toContainText('master the trader');
 for(let i=0;i<6;i++){
 await page.locator('[data-chapter]').nth(i).click();
 for(const section of ['lesson','example','takeaway']){await page.locator(`[data-view="${section}"]`).click();await expect(page.locator('.lead')).not.toBeEmpty();}
 }
 await page.locator('#next').click();await expect(page.locator('h1')).toContainText('Trade with intention');
 await page.keyboard.press('ArrowLeft');await expect(page.locator('.lead')).toContainText('Refine one thing');
 await page.locator('#present').click();await expect(page.locator('body')).toHaveClass('presenting');
 await page.keyboard.press('Escape');await expect(page.locator('body')).not.toHaveClass('presenting');
 await page.locator('.brand').click();await expect(page.locator('h1')).toContainText('master the trader');
 for(const [width,height] of [[1440,1000],[1920,1080],[390,844]]){await page.setViewportSize({width,height});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await page.screenshot({path:`/tmp/pantherfx-${width}.png`,fullPage:true});}
 expect(errors).toEqual([]);
});
