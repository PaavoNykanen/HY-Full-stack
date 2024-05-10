const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'test user',
        password: 'test'
      }
    })
    
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {      
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })
})