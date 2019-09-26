pragma solidity ^0.5.0;


/// @title Contract handling betting game in DePS
contract Game {

    /// @dev Contract owner (gameserver)
    address private contractOwner;

    constructor() public{
        contractOwner = msg.sender;
    }

    function assertIsContractOwner() public view {
        require(msg.sender == contractOwner); // TODO: add error message: "Only contract owner can do that!"
    }

    /// @dev Main bets storage: playerAddress => roomId =>betSize
    // As bytes type is yet unstable, we convert game's
    // internal room id's to `address` format
    mapping(address => mapping(address => uint)) bets;
    /// @dev Prizes storage: playerAddress => prizeSize
    mapping(address => uint) prizes;
    /// @dev Refunds storage: address => roomId
    // In case a game was cancelled for any reason, but
    // the player has already made a bet
    mapping(address => address) refunds;

    /// @dev Function to be called by players when joining a match
    function makeBet(address roomId) public payable {
        require(msg.value > 0); // TODO: add error message: "Invalid bet size!"
        bets[msg.sender][roomId] = msg.value;
    }

    /// @dev Used by gameserver to check if bets were made correctly
    function getBet(address playerAddress, address roomId) public view returns(uint){
        return bets[playerAddress][roomId];
    }

    /// @dev Gameserver-only function, called after match winner is selected
    function givePrize(address winner, uint prizeSize) public {
        assertIsContractOwner();
        prizes[winner] += prizeSize;
    }

    /// @dev Called by players to withdraw their past matches prizes
    function withdrawPrize() public {
        uint prize = prizes[msg.sender];
        require(prize > 0); // TODO: add error message: "You have no prize to withdraw!"
        msg.sender.transfer(prize);
    }


    /// @dev Gameserver-only function, called if the match was cancelled
    /// but bet(s) has already been made
    function refundBet(address playerAddress, address roomId) public {
        assertIsContractOwner();
        refunds[playerAddress] = roomId;
    }

    /// @dev Called by players to withdraw refunded money
    function withdrawRefund() public {
        uint refund = bets[msg.sender][refunds[msg.sender]];
        require(refund > 0); // TODO: add error message: "You have nothing to refund!"
        msg.sender.transfer(refund);
    }
}