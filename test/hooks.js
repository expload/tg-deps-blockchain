const { TONClient } = require('../index');

before(async function() {
    TONClient.shared.config.setData({
        defaultWorkchain: 0,
        servers: ["http://0.0.0.0"],
        log_verbose: true,
    });
    await TONClient.shared.setup();
});

after(function() {
    TONClient.shared.close();
});