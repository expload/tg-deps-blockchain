const { TONClient } = require('ton-client-node-js');

async function main(ton) {
}

(async () => {
    try {
        const ton = TONClient.shared;
        ton.config.setData({
            servers: ['http://0.0.0.0']
        });
        await ton.setup();
        await main(ton);
        console.log("Hello TON!");
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();