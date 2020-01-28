//2020.01.28


pragma solidity 0.5.0;


contract eTaya {
    // purpose is to add a layer of security by creating an immutable history of:
    // (1) all bets made via the system; (2) all winning numbers and prized; (3) whether winnings have been claimed
    // utilized by admin to check veracity of claims
    // utilized by user to check winning numbers

    address public owner;
    address public verifier;

    constructor() public {
        owner = msg.sender;
        verifier = msg.sender;
    }
    
    modifier isOwner() { 
        require (owner == msg.sender);
         _;
    }

    modifier isVerifier() { 
        require (verifier == msg.sender);
         _;
    }

    function changeVerifier(address _verifier) external isVerifier{
        verifier = _verifier;
    }

    function changeOwner(address _owner) external isOwner{
        owner = _owner;
    }

    struct bet {
        bool isExisting;
        bool isClaimed;
    }

    // creates mapping of transaction hash to bet status
    // costs 25663 gas if queried by contract
    mapping (bytes32 => bet) internal BetsDB; 
//    mapping (bytes32 => bet) public BetsDB;

    event BetExisting(bool isExisting);
        
    // checks status of Bet
    // costs 26717 gas when called from contract
    function getBetStatus(bytes32 _txnHash) internal view returns(bool, bool) {
//    function getBet(bytes32 _txnHash) public view returns(bytes32, bool, bool) {
        
        //check if entry already in BetsDB
        require(BetsDB[_txnHash].isExisting, "Bet not yet posted.");

        return(
            BetsDB[_txnHash].isExisting,
            BetsDB[_txnHash].isClaimed
            );
    }

    // posts transaction hash to chain; maps to whether it claimed or not
    // inputs from app
    // emit event that bet has been posted
    // cost 47534 gas
    function newBet(bytes32 _txnHash) external returns(bytes32) {

        //to prevent multiple posting, first check if bet is already posted
        //check if entry already in BetsDB
        require(!BetsDB[_txnHash].isExisting, "Bet already posted.");

        //post the bet 
        BetsDB[_txnHash].isExisting = true;
        BetsDB[_txnHash].isClaimed = false;

        //emit event true
        emit BetExisting(BetsDB[_txnHash].isExisting);
        
        //return _txnHash
        return(_txnHash);
    }    
    
    event Claimed(bool isClaimed);
    

    // called by verifier to check whether claimant's bet is valid
    function verifyClaim(bytes32 _txnHash) external {
//        require(BetsDB[_txnHash].isExisting, "Bet is not existing.");
        emit BetExisting(BetsDB[_txnHash].isExisting);
    }

    // function to update whether winning bet has been claimed
    // identifying winning _txnHash to be carried out by frontend
    // function should only be called by PCSO verification app
    // function emits event to frontend that winnings have been claimed
    // costs 33819 gas
    function claimedWinnings(bytes32 _txnHash) external isVerifier {
        /* user presents QR code to PCSO; PCSO generates txnHash and passes it on to function
        function checks whether bet is valid (ie posted in blockchain) and whether 
        winnings have not yet claimed (ie isClaimed = false)
        when both tests have passed; function updates status to isClaimed = true */

        //check if entry already in BetsDB
        require(BetsDB[_txnHash].isExisting, "Bet is not existing.");

        // should only be updated if not yet claimed
        require(!BetsDB[_txnHash].isClaimed, "Winnings already claimed");
    
        BetsDB[_txnHash].isClaimed = true;
        
        emit Claimed(BetsDB[_txnHash].isClaimed);
    }
    

    struct winners {
        uint8[6] winningNumbers;
        uint prize;
        bool isExisting;
    }
    
    // since only 1 draw per day, we use the date as the key for the WinnersDB mapping
    mapping (uint => winners) internal WinnersDB;
    
    event WinnersPosted(
        uint indexed _drawdate,
        uint8[6] _winners,
        uint _prize
        );

    // posts winning numbers to chain
    // trigger an event that frontend watches
    // costs 145435 gas
    function postWinners(uint _drawdate, uint8[6] calldata _winners, uint _prize) external isVerifier {
        // check if winners already posted
        require(!WinnersDB[_drawdate].isExisting, "Winners already posted.");
        
        //post winners
        WinnersDB[_drawdate].winningNumbers = _winners;
        WinnersDB[_drawdate].prize = _prize;
        WinnersDB[_drawdate].isExisting = true;
        
        emit WinnersPosted(_drawdate, _winners, _prize);
    }
    
    // get winning numbers and prize for a specific drawdate
    // costs 30632 gas when called by a contract
    function getWinners(uint _drawdate) external returns(uint8[6] memory, uint) {
        
        // check if already posted
        require(WinnersDB[_drawdate].isExisting, "Winning numbers not yet available.");
        
        // return numbers
        return(
            WinnersDB[_drawdate].winningNumbers,
            WinnersDB[_drawdate].prize
            );

        emit WinnersPosted(_drawdate, 
                            WinnersDB[_drawdate].winningNumbers, 
                            WinnersDB[_drawdate].prize);


    }
}