const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'testuser', 'test')
    
        const notificationDiv = await page.locator('.notification')
        await expect(notificationDiv).toContainText('Logged in as testuser')
        await expect(notificationDiv).toHaveCSS('border-style', 'solid')    
        await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)') // Green
    
        await expect(page.getByText('blogs')).toBeVisible()
        await expect(page.getByText('testuser logged in')).toBeVisible()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).not.toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'testuser', 'wrong')
    
        const errorDiv = await page.locator('.notification')
        await expect(errorDiv).toContainText('wrong username or password')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')    
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') // Red
    
        await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'testuser', 'test')
    })
  
    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'a blog created by playwright', "Test User", "test.com")
        await expect(page.getByTestId(`blog-a blog created by playwright`)).toBeVisible()
        await expect(page.getByText("view")).toBeVisible()

        // Notification
        await expect(page.getByText('A new blog a blog created by playwright by Test User added')).toBeVisible()
    })
  })
})