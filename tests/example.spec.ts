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
    // const button = page.getByText('Open')
    const button = page.locator('text=Open')
    await button.dblclick()
    await page.waitForTimeout(1000)

    // const refText = await page.locator('text=安安').innerText({ timeout: 2000 })
    // console.log('refText', refText)
    // expect(refText).toBe('安安')

    const newTodo = page.getByPlaceholder('gmail')
    await newTodo.fill('example@gmail.com')
    await newTodo.press('Enter')
    // console.log('button', button)
    // const submitBtn = page.getByRole('button', { name: 'Submit' })
    // expect(submitBtn).toBe('Submit')
    // await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
  })

  // 點按鈕觸發store改變畫面內容

  // 呼叫api預期回來 console

  // 呼叫api預期回來畫面
})
