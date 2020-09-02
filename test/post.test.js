const { expect } = require('chai')
const postModel = require('../models/post')

describe('Test for Post model', () => {

  beforeEach(() => {
    postModel.clearDatabase()
  })

  it('Should return count of posts from all on DB (3 st)', async () => {
    postModel.savePost({ title: 'test', content: 'test', ownerId: 'test' })
    postModel.savePost({ title: 'test1', content: 'test1', ownerId: 'test1' })
    postModel.savePost({ title: 'test11', content: 'test11', ownerId: 'test11' })

    const count = await postModel.countPosts()
    expect(count).to.be.a('number')
    expect(count).to.equal(3)
  })

  it('Should return count of posts from all on DB (106 st)', async () => {
    for(let i=0; i<106; i++) {
      postModel.savePost({ title: 'test', content: 'test', ownerId: 'test' })
    }

    const count = await postModel.countPosts()
    expect(count).to.be.a('number')
    expect(count).to.equal(106)
  })

})


