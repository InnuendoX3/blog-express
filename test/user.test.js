const { expect } = require('chai')
const userModel = require('../models/user')

describe('Test for User model', () => {

  beforeEach(() => {
    userModel.clearDatabase()
  })

  it('Should return quantity of users: 3', async () => {
    await userModel.saveUser({ username: 'Test', password: 'asdf', role: 'Admin'})
    await userModel.saveUser({ username: 'Test', password: 'asdf', role: 'User'})
    await userModel.saveUser({ username: 'Test', password: 'asdf', role: 'Admin'})

    const count = await userModel.countUsers()
    expect(count).to.be.a('number')
    expect(count).to.equal(3)
  })

  it('Should return quantity of users: 36', async function (){
    this.timeout(5000)
    for(let i=0; i<36; i++) {
      userModel.saveUser({ username: 'Test', password: 'asdf', role: 'Admin'})
    }
    const count = await userModel.countUsers()
    expect(count).to.be.a('number')
    expect(count).to.equal(36)
  })

})