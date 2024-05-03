const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const biggerListWithBlogs = [
    {
      _id: '1',
      title: 'Test blog',
      author: 'Author name',
      url: 'www.con',
      likes: 1,
      __v: 0
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'MR Author',
      url: 'https://homepages.com',
      likes: 2,
      __v: 0
    },
    {
      _id: '3',
      title: 'Book',
      author: 'Edger',
      url: 'github.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '4',
      title: 'HY FullStack',
      author: 'Paavo Nykänen',
      url: 'jyu.fi',
      likes: 4,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerListWithBlogs)
    assert.strictEqual(result, 10)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const biggerListWithBlogs = [
    {
      _id: '1',
      title: 'Test blog',
      author: 'Author name',
      url: 'www.con',
      likes: 1,
      __v: 0
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'MR Author',
      url: 'https://homepages.com',
      likes: 2,
      __v: 0
    },
    {
      _id: '3',
      title: 'Book',
      author: 'Edger',
      url: 'github.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '4',
      title: 'HY FullStack',
      author: 'Paavo Nykänen',
      url: 'jyu.fi',
      likes: 4,
      __v: 0
    }
  ]

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, is that one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list is the highes like count blog', () => {
    const result = listHelper.favoriteBlog(biggerListWithBlogs)
    assert.deepStrictEqual(result, biggerListWithBlogs[3])
  })
})