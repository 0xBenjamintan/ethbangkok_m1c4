// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/BountyContract.sol";

contract BountyContractTest is Test {
    BountyContract public bountyContract;
    address public creator = address(0x1);
    address public applicant = address(0x2);

    function setUp() public {
        bountyContract = new BountyContract();
        vm.deal(creator, 10 ether);
        vm.deal(applicant, 10 ether);
    }

    function testCreateBounty() public {
        vm.prank(creator);
        bountyContract.createBounty("Test Bounty", "100.0", "50.0", 1 ether);

    (
        uint256 id,
        address _creator,
        string memory description,
        string memory longitude,
        string memory latitude,
        uint256 payoutAmount,
        bool isActive,
        address _applicant,
        string memory submissionCID,
        bool isCompleted
    ) = bountyContract.bounties(1);

        assertEq(id, 1);
        assertEq(_creator, creator);
        assertEq(description, "Test Bounty");
        assertEq(longitude, "100.0");
        assertEq(latitude, "50.0");
        assertEq(payoutAmount, 1 ether);
        assertTrue(isActive);
        assertEq(_applicant, address(0));
        assertEq(submissionCID, "");
        assertFalse(isCompleted);
    }

    function testApplyForBounty() public {
        vm.prank(creator);
        bountyContract.createBounty("Test Bounty", "100.0", "50.0", 1 ether);

        vm.prank(applicant);
        bountyContract.applyForBounty(1);

        (, , , , , , , address _applicant, , ) = bountyContract.bounties(1);
        assertEq(_applicant, applicant);
    }

    function testSubmitBounty() public {
        vm.prank(creator);
        bountyContract.createBounty("Test Bounty", "100.0", "50.0", 1 ether);

    vm.prank(applicant);
        bountyContract.applyForBounty(1);

        vm.prank(applicant);
        bountyContract.submitBounty(1, "QmSubmissionCID");

    (
        ,
        ,
        ,
        ,
        ,
        ,
        bool isActive,
        ,
        string memory submissionCID,
        bool isCompleted
    ) = bountyContract.bounties(1);
        assertFalse(isActive);
        assertEq(submissionCID, "QmSubmissionCID");
        assertTrue(isCompleted);
    }

    function testCompleteBounty() public {
        vm.prank(creator);
        bountyContract.createBounty("Test Bounty", "100.0", "50.0", 1 ether);

        vm.prank(applicant);
    bountyContract.applyForBounty(1);

        vm.prank(applicant);
        bountyContract.submitBounty(1, "QmSubmissionCID");

        vm.prank(creator);
        bountyContract.completeBounty(1);

    (
        ,
        ,
        ,
        ,
        ,
        ,
        bool isActive,
        ,
        ,
        bool isCompleted
    ) = bountyContract.bounties(1);
        assertFalse(isActive);
        assertTrue(isCompleted);
    }
}