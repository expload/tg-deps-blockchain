const { TONClient } = require('ton-client-node-js');

async function main() {
    return TONClient.shared.crypto.ed25519Keypair();
}

(async () => {
    try {
        const ton = TONClient.shared;
        ton.config.setData({
            servers: ['http://0.0.0.0']
        });
        await ton.setup();
        var keys = await main();
        console.log(keys);
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
})();