const { TONClient } = require('ton-client-node-js');
const gamePackage = require('./Game/GamePackage');

const gameKeys = {
    public: '55d7bab463a6a3ef5e03bb5f975836ddfb589b9ccb00329be7da8ea981c5268a',
    secret: 'de93a97c7103c2d44e47972265cfdfe266fd28c8cadc4875804ee9f57cf786d6',
};

async function main(ton) {
    try {
        const gameAddress = (await ton.contracts.deploy({
            package: gamePackage,
            constructorParams: {},
            keyPair: gameKeys,
        })).address;
        console.log(`Hello contract was deployed at address: ${gameAddress}`);
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