import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/playwright')
})

test.describe('測試一', () => {
  test('進入頁面', ({ page }) => {
    expect(page.url()).toBe('http://localhost:3000/playwright')
  })

  // 拿 class 比對內容
  test('拿到指定DOM', async ({ page }) => {
    const h1Element = page.locator('h1')
    const h1Text = await h1Element.innerText()
    expect(h1Text).toBe('PlayWright Test')
    // const getText = await page.locator('text=PlayWright Test').innerText()
    // expect(getText).toBe('PlayWright Test')
  })

  // 點按鈕出現彈窗比對內容
  test('按紐觸發彈窗', async ({ page }) => {
    // Other Select Function
    // const button = page.getByText('Open')
    // const button = page.getByRole('button', { name: 'Open' })

    // btn 點擊前需要等一下頁面, 不然 click 無法觸發
    await page.waitForTimeout(500)

    // 點擊開彈窗
    const button = page.locator('text=Open')
    const isBtnVisible = await button.isVisible()
    console.log('isBtnVisible', isBtnVisible)
    await button.click({
      force: true,
    })

    // 輸入input送出
    const Email = page.getByLabel('Email')
    const Password = page.getByLabel('Password')
    await Email.fill('user1@example.com')
    await Password.fill('12345678')
    const submitBtn = page.locator('text=Submit')
    await submitBtn.click({
      force: true,
    })

    // 對應結果
  })

  // 點按鈕觸發store改變畫面內容

  // 呼叫api預期回來 console

  // 呼叫api預期回來畫面
})
