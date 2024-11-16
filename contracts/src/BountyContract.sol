// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

contract BountyContract is PermissionsEnumerable {
    uint256 public bountyCounter;

    struct Bounty {
        uint256 id;
        address creator;
        string description;
        string longitude;
        string latitude;
        uint256 payoutAmount;
        bool isActive;
        address applicant;
        string submissionCID; // IPFS CID for the submission
        bool isCompleted;
    }

    mapping(uint256 => Bounty) public bounties;

    event BountyCreated(uint256 indexed id, address indexed creator);
    event BountyApplied(uint256 indexed id, address indexed applicant);
    event BountySubmitted(uint256 indexed id, string submissionCID);
    event BountyCompleted(uint256 indexed id, address indexed applicant);
    event PayoutInitiated(uint256 indexed bountyId, address indexed applicant, uint256 payoutAmount);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createBounty(
        string memory _description,
        string memory _longitude,
        string memory _latitude,
        uint256 _payoutAmount
    ) external {
        require(_payoutAmount > 0, "Payout must be greater than zero");

        bountyCounter++;
        bounties[bountyCounter] = Bounty({
            id: bountyCounter,
            creator: msg.sender,
            description: _description,
            longitude: _longitude,
            latitude: _latitude,
            payoutAmount: _payoutAmount,
            isActive: true,
            applicant: address(0),
            submissionCID: "",
            isCompleted: false
        });

        emit BountyCreated(bountyCounter, msg.sender);
    }

    function applyForBounty(uint256 _bountyId) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isActive, "Bounty is not active");
        require(bounty.applicant == address(0), "Bounty already has an applicant");

        bounty.applicant = msg.sender;

        emit BountyApplied(_bountyId, msg.sender);
    }

    function submitBounty(uint256 _bountyId, string memory _submissionCID) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isActive, "Bounty is not active");
        require(bounty.applicant == msg.sender, "Only the applicant can submit");
        require(bytes(_submissionCID).length > 0, "Submission CID cannot be empty");

        bounty.submissionCID = _submissionCID;
        bounty.isCompleted = true;
        bounty.isActive = false;

        emit BountySubmitted(_bountyId, _submissionCID);
    }

    function completeBounty(uint256 _bountyId) external {
        Bounty storage bounty = bounties[_bountyId];
        require(bounty.isCompleted, "Bounty is not completed");
        require(bounty.creator == msg.sender, "Only the creator can complete the bounty");

        bounty.isActive = false;

        emit BountyCompleted(_bountyId, bounty.applicant);
        emit PayoutInitiated(_bountyId, bounty.applicant, bounty.payoutAmount);
    }
}