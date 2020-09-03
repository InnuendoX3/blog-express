const { expect } = require('chai')
const postModel = require('../models/post')
const userModel = require('../models/user')

describe('Test for Post model', () => {

  beforeEach(() => {
    postModel.clearDatabase()
  })

  it('Counting Posts: Should return count of posts from all on DB (36 st)', async () => {
    for(let i=0; i<36; i++) {
      await postModel.savePost({ title: 'test', content: 'test', ownerId: 'test' })
    }

    const count = await postModel.countPosts()
    expect(count).to.be.a('number')
    expect(count).to.equal(36)
  })

  // Post.owner() ger dokumentet för ägaren av inlägget - TODO!
  it('Gets the owner document of a post', async () => {
    const user = await userModel.saveUser({ username: 'Juan', password: '12345', role: 'user' })
    const post = await postModel.savePost({ title: 'This test', content: 'Test test test test', ownerId: user._id })

    const owner = await postOwner(post._id)
    expect(owner).to.be.a('object')
    expect(owner).to.have.all.keys(['username', 'password', 'role', '_id'])
    expect(owner.username).to.equal('Juan')
    expect(owner.role).to.equal('user')
    expect(owner._id).to.equal(post.userOwner)

  })

})


