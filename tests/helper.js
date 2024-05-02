const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', { name: 'Username' }).fill(username)
    await page.getByRole('textbox', { name: 'Password' }).fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create a new blog' }).click()
    await page.getByRole('textbox', { name: 'Title' }).fill(title)
    await page.getByRole('textbox', { name: 'Author' }).fill(author)
    await page.getByRole('textbox', { name: 'URL' }).fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
}
export { loginWith, createBlog }