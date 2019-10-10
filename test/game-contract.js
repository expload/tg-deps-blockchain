var assert = require('assert');
const { gameKeys, playerOne, playerTwo } = require('../utils/secrets');
const { client } = require('../index');
const GameContract = require('../contract/build/GameContract');

const gameAddress = "b7e86e86a9561295482b20662581bf7f4db36d1684651b5004f30cb40ea7a746";
const richAddress = '0000000000000000000000000000000000000000000000000000000000000000';
const testRoomId = 123;

describe('Deploy contract', function() {
  it('should be able to deploy Game.sol contract to TON', async function() {
    client.contracts.deploy({
        package: GameContract.package,
        constructorParams: {},
        keyPair: gameKeys,
    }).then((result) => {
        assert.equal(result.address, gameAddress);
    });
  });
});

describe('Make bets', function() {
  it('should be able to make a bet and then get it', async function() {
    await client.contracts.sendGrams({
      fromAccount: richAddress,
      toAccount: gameAddress,
      amount: 100,
    });

    const response = await client.contracts.run({
      address: gameAddress,
      abi: GameContract.package.abi,
      functionName: 'makeBet',
      input: {roomId : testRoomId},
      keyPair: gameKeys,
    });

    console.log(response);
  })
})
