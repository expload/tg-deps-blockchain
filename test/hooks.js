const { client } = require('../index');

before(async function() {
    client.config.setData({
        defaultWorkchain: 0,
        servers: ["http://0.0.0.0"],
        log_verbose: true,
    });
    await client.setup();
});

after(function() {
    client.close();
});