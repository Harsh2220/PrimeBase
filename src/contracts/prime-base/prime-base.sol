// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignFactory {
    address public admin;
    mapping(uint => address) public campaigns;
    uint public campaignCount;
    mapping(address => bool) public registeredAdmins;

    uint256 public constant ADMIN_REGISTRATION_FEE = 0.01 ether;

    constructor() {
        admin = msg.sender;
        registeredAdmins[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(registeredAdmins[msg.sender], "Only registered admins can call this function");
        _;
    }

    event CampaignCreated(uint indexed campaignId, address campaignAddress);
    event AdminRegistered(address indexed newAdmin);

    function registerAsAdmin() public payable {
        require(msg.value == ADMIN_REGISTRATION_FEE, "Registration fee is 0.01 ETH");
        require(!registeredAdmins[msg.sender], "Already registered as admin");

        registeredAdmins[msg.sender] = true;
        emit AdminRegistered(msg.sender);
    }

    function createCampaign(
        string memory _imageURI,
        string memory _opponent1,
        string memory _opponent2,
        string memory _description,
        uint256 _minimumValue,
        uint _endTimestamp
    ) public onlyAdmin {
        Campaign newCampaign = new Campaign(
            _imageURI,
            _opponent1,
            _opponent2,
            _description,
            _minimumValue,
            _endTimestamp,
            msg.sender
        );
        campaigns[campaignCount] = address(newCampaign);
        emit CampaignCreated(campaignCount, address(newCampaign));
        campaignCount++;
    }

    function getAllCampaigns() public view returns (address[] memory) {
        address[] memory allCampaigns = new address[](campaignCount);
        for (uint i = 0; i < campaignCount; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function getVoteCounts(uint campaignId) public view returns (uint countOpponent1, uint countOpponent2) {
        require(campaignId < campaignCount, "Campaign does not exist");
        Campaign campaign = Campaign(campaigns[campaignId]);
        return campaign.getVoteCounts();
    }

    function getCampaignDetails(address campaignAddress) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        uint256,
        uint,
        uint8,
        bool,
        uint256[] memory,
        Campaign.Bet[] memory,
        uint[] memory
    ) {
        Campaign campaign = Campaign(campaignAddress);
        return campaign.getDetails();
    }
}

contract Campaign {
    struct Bet {
        address user;
        uint256 amount;
        uint8 opinion; // 1 for opponent1, 2 for opponent2
        uint timestamp;
    }

    address public admin;
    string public imageURI;
    string public opponent1;
    string public opponent2;
    string public description;
    uint256 public minimumValue;
    uint public endTimestamp;
    uint8 public winner; // 0 means no winner yet, 1 for opponent1, 2 for opponent2
    bool public isClosed;

    mapping(uint8 => uint256) public totalBets; // 1 for opponent1, 2 for opponent2
    Bet[] public bets;
    mapping(uint8 => uint) public voteCounts; // 1 for opponent1, 2 for opponent2

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier isOpen() {
        require(block.timestamp < endTimestamp, "Campaign has ended");
        require(!isClosed, "Campaign is closed");
        _;
    }

    event BetPlaced(address indexed user, uint256 amount, uint8 opinion, uint timestamp);
    event WinnerDeclared(uint8 winner);

    constructor(
        string memory _imageURI,
        string memory _opponent1,
        string memory _opponent2,
        string memory _description,
        uint256 _minimumValue,
        uint _endTimestamp,
        address _admin
    ) {
        admin = _admin;
        imageURI = _imageURI;
        opponent1 = _opponent1;
        opponent2 = _opponent2;
        description = _description;
        minimumValue = _minimumValue;
        endTimestamp = _endTimestamp;
    }

    function placeBet(uint8 _opinion) public payable isOpen {
        require(msg.value == minimumValue, "Bet amount must be equal to the minimum value");
        require(_opinion == 1 || _opinion == 2, "Invalid opinion");

        totalBets[_opinion] += msg.value;
        bets.push(Bet(msg.sender, msg.value, _opinion, block.timestamp));
        voteCounts[_opinion]++;

        emit BetPlaced(msg.sender, msg.value, _opinion, block.timestamp);
    }

    function declareWinner(uint8 _winner) public onlyAdmin {
        require(_winner == 1 || _winner == 2, "Invalid winner");
        require(!isClosed, "Campaign is already closed");

        winner = _winner;
        isClosed = true;
        emit WinnerDeclared(_winner);
        
        distributeFunds();
    }

    function distributeFunds() internal {
        uint256 totalPool = totalBets[1] + totalBets[2];
        uint256 winnerPool = totalBets[winner];

        for (uint i = 0; i < bets.length; i++) {
            if (bets[i].opinion == winner) {
                uint256 reward = (bets[i].amount * totalPool) / winnerPool;
                payable(bets[i].user).transfer(reward);
            }
        }
    }

    function getVoteCounts() public view returns (uint countOpponent1, uint countOpponent2) {
        return (voteCounts[1], voteCounts[2]);
    }

    function getTotalBets() public view returns (uint256[] memory) {
        uint256[] memory totalBetsArray = new uint256[](2);
        totalBetsArray[0] = totalBets[1];
        totalBetsArray[1] = totalBets[2];
        return totalBetsArray;
    }

    function getBets() public view returns (Bet[] memory) {
        return bets;
    }

    function getVoteCountsArray() public view returns (uint[] memory) {
        uint[] memory voteCountsArray = new uint[](2);
        voteCountsArray[0] = voteCounts[1];
        voteCountsArray[1] = voteCounts[2];
        return voteCountsArray;
    }

    function getDetails() public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        uint256,
        uint,
        uint8,
        bool,
        uint256[] memory,
        Bet[] memory,
        uint[] memory
    ) {
        return (
            imageURI,
            opponent1,
            opponent2,
            description,
            minimumValue,
            endTimestamp,
            winner,
            isClosed,
            getTotalBets(),
            getBets(),
            getVoteCountsArray()
        );
    }
}
