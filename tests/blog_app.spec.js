const { test, describe, expect, beforeEach } = require('@playwright/test')
const { before } = require('node:test')
const { loginWith, createBlog } = require('./helper')


describe('Blog List app', () => {

  // before each
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'punainen',
        username: 'onion',
        password: 'sipuli'
      }
    })
    await page.goto('/')
  })

  // front page can be opened, login page by default
  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blog List')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Log in')).toBeVisible()
  })

  describe('logging in' , () => {
    // can log in with correct credentials
    test('can log in with correct credentials', async ({ page }) => {
      await loginWith(page, 'onion', 'sipuli')
      await expect(page.getByText('punainen logged in')).toBeVisible()
    })

    // cannot log in with incorrect credentials
    test('fails log in with invalid credentials', async ({ page }) => {
      await loginWith(page, 'onion', 'sipulay')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials invalid username or password')
      await expect(page.getByText('Log in')).toBeVisible()
    })
  })
  
  describe('when logged in', () => {

    // before each = log in first
    beforeEach(async ({ page }) => {
      await loginWith(page, 'onion', 'sipuli')
    })

    // can create a new blog
    test('can create a new blog', async ({ page }) => {
      await createBlog(page, 'this testing', 'indi cantik', 'indi-cantik.com')
      await expect(page.getByText('A new blog "this testing" by indi cantik added')).toBeVisible()
    })

     // blogs are ordered according to likes with the blog with the most likes being first
    test.only('blogs are ordered according to likes', async ({ page }) => {
      await createBlog(page, 'Abawabw', 'indi cantik', 'indi-cantik.com')
      await createBlog(page, 'Baporle', 'indi cantik', 'indi-cantik.com')
      await createBlog(page, 'Calleda', 'indi cantik', 'indi-cantik.com')

      await page.getByRole('button', { name: 'Abawabw' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByRole('button', { name: 'Abawabw' }).click()

      await page.getByRole('button', { name: 'Baporle' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await page.getByRole('button', { name: 'Baporle' }).click()

      await page.getByRole('button', { name: 'Calleda' }).click()
      await page.getByRole('button', { name: 'Like' }).click()

      const blogs = await page.$$('.blogButton')
      const blogText = await Promise.all(blogs.map(async blog => await blog.textContent()))
      await expect(blogText[2]).toContain('Abawabw')
      await expect(blogText[3]).toContain('Baporle')
      await expect(blogText[4]).toContain('Calleda')
    })

    describe('and a blog exists', () => {

      // before each
      beforeEach(async ({ page }) => {
        await createBlog(page, 'YES', 'indi cantik', 'indi-cantik.com')
      })

      // can delete a blog
      test('can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'YES' }).click()
        page.on('dialog', async dialog => {
          expect(dialog.message()).toContain('Remove blog "YES" by indi cantik')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(page.getByText('Blog "YES" by indi cantik removed')).toBeVisible()
      })

      // can like / edit a blog
      test('can like a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'YES' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
        await expect(page.getByText('Liked blog "YES" by indi cantik')).toBeVisible()
      })

      // cannot see remove button if not the creator
      test('cannot see remove button if not the creator', async ({ page }) => {
        await page.getByRole('button', { name: 'Saminamina' }).click()
        await expect(page.getByText('Remove')).toHaveCount(0)
      })  
    })
  })

})