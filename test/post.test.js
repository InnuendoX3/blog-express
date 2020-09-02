const { expect } = require('chai')
const { countPosts } = require('../models/post')

describe('Post count', () => {
  it('Should return count of posts from all on DB', async () => {
      const count = await countPosts()
      expect(count).to.be.a('number')
      //expect(count).to.equal(11)
    })
})

