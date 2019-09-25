pragma solidity ^0.5.0;

/// @title Contract managing TON-DePS
contract Game {

    address public contractOwner;

    constructor() public{
        contractOwner = msg.sender;
    }

    function assertIsContractOwner() public view {
        require(msg.sender == contractOwner, "Only contract owner can do that!");
    }

    struct Bet {
        bytes roomId;
        uint amount;
    }

    mapping(address => Bet[]) playerBets;
    mapping(address => uint) betsAmount;

    function makeBet(bytes memory roomId, uint32 amount) public payable returns(uint) {
        uint betNumber = betsAmount[msg.sender];
        playerBets[msg.sender][betNumber] = Bet(roomId, amount);
        betsAmount[msg.sender] = betNumber + 1;
        return betNumber;
    }

    function getBet(address playerAddres, uint betNumber) public view returns(uint){
        return playerBets[playerAddres][betNumber].amount;
    }
}