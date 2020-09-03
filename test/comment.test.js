const { expect } = require('chai')
const commentModel = require('../models/comment')

describe('Test for Commment model', () => {

  beforeEach(() => {
    commentModel.clearDatabase()
  })

  it('Counting Comments: Should return quantity of comments: 15', async () => {
    for(let i=0; i<15; i++) {
      await commentModel.saveComment({ text: 'Blabla', postId: '2fsedf2', ownerId: '2goj8d'})
    }
    const count = await commentModel.countComments()
    expect(count).to.be.a('number')
    expect(count).to.equal(15)
  })

})
