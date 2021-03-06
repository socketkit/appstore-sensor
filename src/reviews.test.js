import reviews from './reviews.js'

describe('reviews', () => {
  test('should return proper reviews list', async (done) => {
    try {
      const results = await reviews({ id: 284882215, country: 'us', page: 1 })
      expect(results).toBeInstanceOf(Array)
      expect(results.length).toEqual(50)
    } catch (error) {
      expect(error).toBeUndefined()
    } finally {
      done()
    }
  })

  test('should throw error on missing id', async (done) => {
    try {
      await reviews({})
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Id should be defined')
    } finally {
      done()
    }
  })

  test('should throw error on invalid sort field', async (done) => {
    try {
      await reviews({ id: 284882215, sort_by: 'hello-world' })
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual(
        'Invalid sort field. Proper fields are mostRecent, mostHelpful.',
      )
    } finally {
      done()
    }
  })

  test('should throw error on invalid page', async (done) => {
    try {
      await reviews({ id: 284882215, page: 100 })
    } catch (error) {
      expect(error).toBeDefined()
      expect(error.message).toEqual('Page should be between 1 and 10.')
    } finally {
      done()
    }
  })

  test('should set request options', async (done) => {
    try {
      await reviews(
        { id: 284882215, country: 'us', page: 1 },
        { method: 'DELETE' },
      )
    } catch (error) {
      expect(error).toBeDefined()
    } finally {
      done()
    }
  })
})
