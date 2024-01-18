import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/playwright')
})

test.describe('測試一', () => {
  test('進入頁面', ({ page }) => {
    expect(page.url()).toBe('http://localhost:3000/playwright')
  })

  // 拿 class 比對內容
  test('拿到h1', async ({ page }) => {
    const h1Element = page.locator('h1')
    const h1Text = await h1Element.innerText()
    expect(h1Text).toBe('PlayWright Test')
  })

  // 點按鈕出現彈窗比對內容
  test('按紐觸發彈窗', ({ page }) => {
    console.log('page', page)
  })

  // 點按鈕觸發store改變畫面內容

  // 呼叫api預期回來 console

  // 呼叫api預期回來畫面
})
