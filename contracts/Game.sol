pragma solidity ^0.5.0;

contract Game {

    address private contractOwner;

    constructor() public{
        contractOwner = msg.sender;
    }

    function assertIsContractOwner() public view {
        require(msg.sender == contractOwner); // TODO: add error message: "Only contract owner can do that!"
    }

    mapping(address => mapping(address => uint)) bets;
    mapping(address => uint) prizes;
    mapping(address => address) refunds;

    function makeBet(address roomId) public payable {
        require(msg.value > 0); // TODO: add error message: "Invalid bet size!"
        bets[msg.sender][roomId] = msg.value;
    }

    function getBet(address playerAddress, address roomId) public view returns(uint){
        return bets[playerAddress][roomId];
    }

    function givePrize(address winner, uint prizeSize) public {
        assertIsContractOwner();
        prizes[winner] += prizeSize;
    }

    function withdrawPrize() public {
        uint prize = prizes[msg.sender];
        require(prize > 0); // TODO: add error message: "You have no prize to withdraw!"
        msg.sender.transfer(prize);
    }

    function refundBet(address playerAddress, address roomId) public {
        assertIsContractOwner();
        refunds[playerAddress] = roomId;
    }

    function withdrawRefund() public {
        uint refund = bets[msg.sender][refunds[msg.sender]];
        require(refund > 0); // TODO: add error message: "You have nothing to refund!"
        msg.sender.transfer(refund);
    }
}