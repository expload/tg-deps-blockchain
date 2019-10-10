
//
// This file was generated using TON Labs developer tools.
//
 
const abi = {
	"ABI version": 0,
	"functions": [{
		"name": "constructor",
		"inputs": [
		],
		"outputs": [
		]
	}, {
		"name": "assertIsContractOwner",
		"inputs": [
		],
		"outputs": [
		]
	}, {
		"name": "makeBet",
		"inputs": [
			{"name":"roomId","type":"uint256"}
		],
		"outputs": [
		]
	}, {
		"name": "getBet",
		"inputs": [
			{"name":"playerAddress","type":"uint256"},
			{"name":"roomId","type":"uint256"}
		],
		"outputs": [
			{"name":"value0","type":"uint256"}
		]
	}, {
		"name": "givePrize",
		"inputs": [
			{"name":"winner","type":"uint256"},
			{"name":"prizeSize","type":"uint256"}
		],
		"outputs": [
		]
	}, {
		"name": "withdrawPrize",
		"inputs": [
		],
		"outputs": [
		]
	}, {
		"name": "refundBet",
		"inputs": [
			{"name":"playerAddress","type":"uint256"},
			{"name":"roomId","type":"uint256"}
		],
		"outputs": [
		]
	}, {
		"name": "withdrawRefund",
		"inputs": [
		],
		"outputs": [
		]
	}]
};

const pkg = {
    abi,
    imageBase64: ''
};

class GameContract {
    constructor(client, address, keys) {
        this.client = client;
        this.address = address;
        this.keys = keys;
    }

    async deploy(constructorParams) {
        if (!this.keys) {
            this.keys = await this.client.crypto.ed25519Keypair();
        }
        this.address = (await this.client.contracts.deploy({
            package: pkg,
            constructorParams,
            keyPair: this.keys,
        })).address;
    }
        
    async run(functionName, input) {
        const result = await this.client.contracts.run({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }    
}

GameContract.package = pkg;

module.exports = GameContract;
