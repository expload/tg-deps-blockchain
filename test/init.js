const { TONClient } = require('ton-client-node-js');

exports = async () => {
    TONClient.shared.config.setData({
        defaultWorkchain: 0,
        servers: ["http://0.0.0.0"],
        log_verbose: true,
    });
    await TONClient.shared.setup();
};