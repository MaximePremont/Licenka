pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface ILicenka {
    function createLicence(address owner, string memory name, uint price, uint duration) external;

    function subscribe(uint licenseId) external;

    function subscribeWeb2(address owner, uint hash, uint licenseId) external;

    function verifySubscription(address owner, uint licenseId) external view returns(bool);

    function verifySubscriptionWeb2(address owner, uint hash, uint licenseId) external view returns(bool);

    function getLicenses(address owner) external view returns(uint[] memory);

    function getSubscriptions(address owner) external view returns(uint[] memory);
}