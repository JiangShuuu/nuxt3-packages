import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/playwright')
})

test.describe('測試一', () => {
  test('進入頁面', ({ page }) => {
    expect(page.url()).toBe('http://localhost:3000/playwright')
  })

  // 拿 class 比對內容
  test('拿到第一個div', async ({ page }) => {
    const name = await page.innerText('.helloo')
    expect(name).toBe('安安')
  })

  // 點按鈕出現彈窗比對內容

  // 點按鈕觸發store改變畫面內容

  // 呼叫api預期回來 console

  // 呼叫api預期回來畫面
})
