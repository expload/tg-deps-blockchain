const { TONClient } = require('ton-client-node-js');
const gamePackage = require('./contract/build/GamePackage');
const { gameKeys } = require('./secrets');

async function main(ton) {
    try {
        const gameAddress = (await ton.contracts.deploy({
            package: gamePackage,
            constructorParams: {},
            keyPair: gameKeys,
        })).address;
        console.log(`Game contract was deployed at address: ${gameAddress}`);
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    try {
        const ton = TONClient.shared;
        ton.config.setData({
            servers: ['http://0.0.0.0']
        });
        await ton.setup();
        await main(ton);
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();