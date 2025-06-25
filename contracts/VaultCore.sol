// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol"; // 👈 Import this


contract VaultCore {
    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    struct Loan {
        address borrower;
        uint256 amount;
        bool repaid;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public loanId;

    event LoanIssued(address borrower, uint256 amount, uint256 loanId);

    function borrow(uint256 amount) internal {
        loans[loanId] = Loan(msg.sender, amount, false);
        emit LoanIssued(msg.sender, amount, loanId);
        loanId++;
    }

    function receiveLoanApproval(uint256 assetId, uint256 amount) external {
        borrow(amount);  // Called when AI or cross-chain message approves the loan
    }

    function checkHealth() external view returns (bool) {
        // Placeholder logic for health factor
        return true;
    }

    function getLatestETHPrice() public view returns (int) {
        (, int price,,,) = priceFeed.latestRoundData();
        return price;
    }
}

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory performData) {
        for (uint256 i = 0; i < loanId; i++) {
            if (!loans[i].repaid && _isUnhealthy(loans[i])) {
                return (true, abi.encode(i)); // Found bad loan
            }
        }
        return (false, "");
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 badLoanId = abi.decode(performData, (uint256));
        liquidateLoan(badLoanId);
    }

    function _isUnhealthy(Loan memory loan) internal view returns (bool) {
        // Simulate a failing health factor (later link to Chainlink price feeds)
        return loan.amount > 1 ether; // placeholder condition
    }

    function liquidateLoan(uint256 _loanId) public {
        require(!loans[_loanId].repaid, "Already repaid");
        loans[_loanId].repaid = true; // Mark as liquidated for now
        emit LoanLiquidated(_loanId);
    }

    event LoanLiquidated(uint256 loanId);

