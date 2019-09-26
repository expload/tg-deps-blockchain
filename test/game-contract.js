var assert = require('assert');
const { gameKeys, playerOne, playerTwo } = require('../utils/secrets');
const { TONClient } = require('../index');
const gamePackage = require('../contract/build/GamePackage');

const gameAddress = "b7e86e86a9561295482b20662581bf7f4db36d1684651b5004f30cb40ea7a746";
const richAddress = '0000000000000000000000000000000000000000000000000000000000000000';
const testRoomId = 123;

describe('Deploy contract', function() {
  it('should be able to deploy Game.sol contract to TON', async function() {
    const { contracts } = TONClient.shared;
    contracts.deploy({
        package: gamePackage,
        constructorParams: {},
        keyPair: gameKeys,
    }).then((result) => {
        assert.equal(result.address, gameAddress);
    });
  });
});

describe('Make bets', function() {
  it('should be able to make a bet and then get it', async function() {
    const { contracts } = TONClient.shared;

    await contracts.sendGrams({
      fromAccount: richAddress,
      toAccount: gameAddress,
      amount: 100,
    });

    const response = await contracts.run({
      address: gameAddress,
      abi: gamePackage.abi,
      functionName: 'makeBet',
      input: {roomId : testRoomId},
      keyPair: gameKeys,
    });

    console.log(response);
  })
})
