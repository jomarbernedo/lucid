const eTaya = artifacts.require('./eTaya.sol')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('eTaya', ([owner, verifier, user]) => {
  let ETAYA

  before(async () => {
    ETAYA = await eTaya.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await ETAYA.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has an owner', async () => {
      const owner = await ETAYA.owner()
      assert.notEqual(owner, 0x0)
      assert.notEqual(owner, '')
      assert.notEqual(owner, null)
      assert.notEqual(owner, undefined)
    })

    it('owner should be verifier', async () => {
      const owner = await ETAYA.owner()
      const verifier = await ETAYA.verifier()
      assert.equal(owner, verifier)
    })
  })

  describe('new bet', async () => {
    let result

    before(async () => {
      result = await ETAYA.newBet('0xc9428337ccdf1ddfe350560760e1359939fafd4578a771b5cb13fd9ae9e7bf07', { from: user })
    })

    it('posts new bet to chain', async () => {
      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.isExisting, true, 'bet is posted')

      // FAILURE: bet must not be duplicate
      await await ETAYA.newBet('0xc9428337ccdf1ddfe350560760e1359939fafd4578a771b5cb13fd9ae9e7bf07', { from: user }).should.be.rejected;
    })
  })
})