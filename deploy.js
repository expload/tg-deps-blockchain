const { TONClient } = require('ton-client-node-js');
const GameContract = require('./contract/build/GameContract');
const { gameKeys } = require('./utils/secrets');

async function main(client) {
    const helloAddress = (await client.contracts.deploy({
        package: GameContract.package,
        constructorParams: {},
        keyPair: gameKeys,
    })).address;
    console.log(`Game contract was deployed at address: ${helloAddress}`);
}

(async () => {
    try {
        const client = new TONClient();
        client.config.setData({
            servers: ['http://0.0.0.0']
        });
        await client.setup();
        await main(client);
    } catch (error) {
        console.error(error);
    }
})();