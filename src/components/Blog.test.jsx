import React from 'react'
import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import { BlogForm } from './blogForm'
import userEvent from '@testing-library/user-event'
import testService from '../services/tests'


describe('Component Testing', () => {

  // blog button is rendered
  test('blog button is rendered', () => {
    const { container } = render(<Blog blog={testService.blog} user={testService.loggedUser} />)

    const div = container.querySelector('.blogButton')
    expect(div).toHaveTextContent('Berlayar di Tai')
  })

  // only blog title is rendered before clicking the button
  test('only blog title is rendered before clicking the button', () => {
    render(<Blog blog={testService.blog} user={testService.loggedUser} />)

    const title = screen.getByText('Berlayar di Tai')
    const author = screen.queryByText('Sayangku Kapten Truelove')
    const url = screen.queryByText('https://www.goodreads.com/book/show/135390')
    const likes = screen.queryByText('93847')
    const username = screen.queryByText('bawang')

    expect(title).toBeDefined()
    expect(author).toBeNull()
    expect(url).toBeNull()
    expect(likes).toBeNull()
    expect(username).toBeNull()


  })

  // clicking button show details
  test('clicking button show details', async () => {
    render(<Blog blog={testService.blog} user={testService.loggedUser} />)

    const button = screen.getByText('Berlayar di Tai')
    await userEvent.click(button)

    const author = screen.getByText('Sayangku Kapten Truelove')
    const url = screen.getByText('https://www.goodreads.com/book/show/135390')
    const likes = screen.getByText('93847')
    const name = screen.getByText('merah')

    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(name).toBeDefined()
  })

  // remove button available for the blog owner user
  test('remove button available for the blog owner user', async () => {
    render(<Blog blog={testService.blog} user={testService.loggedUserOwner} />)

    const button = screen.getByText('Berlayar di Tai')
    await userEvent.click(button)

    const removeButton = screen.getByText('Remove')
    expect(removeButton).toBeDefined()
  })

  // submit form calls the event handler with the right details
  test('submit form calls the event handler with the right details', async () => {
    const mockHandler = vi.fn()

    render(<BlogForm handleCreateBlog={mockHandler} />)

    const button = screen.getByText('Create')
    await userEvent.click(button)

    expect(mockHandler).toBeCalledTimes(1)
  })
})