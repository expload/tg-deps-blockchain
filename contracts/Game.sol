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

    mapping(address => mapping(bytes => uint)) bets;
    mapping(address => uint) prizes;
    mapping(address => bytes) refunds;

    function makeBet(bytes memory roomId) public payable {
        require(msg.value > 0, "Invalid bet size!");
        bets[msg.sender][roomId] = msg.value;
    }

    function getBet(address playerAddress, bytes memory roomId) public view returns(uint){
        return bets[playerAddress][roomId];
    }

    function givePrize(address winner, uint prizeSize) public {
        assertIsContractOwner();
        prizes[winner] += prizeSize;
    }

    function withdrawPrize() public {
        uint prize = prizes[msg.sender];
        require(prize > 0, "You have no prize to withdraw!");
        msg.sender.transfer(prize);
    }

    function refundBet(address playerAddress, bytes memory roomId) public {
        assertIsContractOwner();
        refunds[playerAddress] = roomId;
    }

    function withdrawRefund() public {
        uint refund = bets[msg.sender][refunds[msg.sender]];
        require(refund > 0, "You have nothing to refund!");
        msg.sender.transfer(refund);
    }
}