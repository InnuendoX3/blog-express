const { expect } = require('chai')
const userModel = require('../models/user')

describe('Test for User model', () => {

  beforeEach(() => {
    userModel.clearDatabase()
  })

  it('Counting Users: Should return quantity of users: 36', async function (){
    this.timeout(5000)
    for(let i=0; i<16; i++) {
      await userModel.saveUser({ username: 'Test', password: 'asdf', role: 'Admin'})
    }
    const count = await userModel.countUsers()
    expect(count).to.be.a('number')
    expect(count).to.equal(16)
  })

})