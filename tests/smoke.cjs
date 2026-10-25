const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
for(const mobile of [false,true]){
 const page=await browser.newPage(mobile?{viewport:{width:390,height:844},isMobile:true,hasTouch:true}:{});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(process.env.TEST_URL || 'http://127.0.0.1:8000');assert.equal(response.status(),200);
 assert.equal(await page.locator('#overlayTitle').innerText(),'BEREIT?');await page.locator('#start').click();await assert.equal(await page.locator('#overlay').isVisible(),false);
 await page.locator('[data-action="down"]').dispatchEvent('pointerdown',{pointerId:1});await page.locator('[data-action="down"]').dispatchEvent('pointerup',{pointerId:1});assert.equal(await page.locator('#score').innerText(),'1');
 await page.locator('#drop').click();assert.ok(Number(await page.locator('#score').innerText())>1);
 await page.locator('#pause').click();assert.equal(await page.locator('#overlayTitle').innerText(),'PAUSE');await page.locator('#start').click();assert.equal(await page.locator('#overlay').isVisible(),false);
 await page.locator('#restart').click();assert.equal(await page.locator('#score').innerText(),'0');
 await page.keyboard.press('ArrowDown');assert.equal(await page.locator('#score').innerText(),'1');
 if(mobile){await page.locator('#board').tap();const prevented=await page.locator('main').evaluate(el=>{const e=new Event('gesturestart',{cancelable:true});el.dispatchEvent(e);return e.defaultPrevented});assert.equal(prevented,true);assert.equal(await page.locator('#board').evaluate(el=>getComputedStyle(el).touchAction),'none');}
 assert.deepEqual(errors,[]);console.log((mobile?'Mobile':'Desktop')+': Start, Absenken, Hard Drop, Pause, Neustart, Tastatur und Fehlerfreiheit bestanden'+(mobile?'; Touch und Gesture-Zoom-Blockade bestanden':''));await page.close();
}await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
