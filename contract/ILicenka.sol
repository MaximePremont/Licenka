pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

interface ILicenka {
    function createLicense(address owner, string memory name, uint price, uint duration) external;

    function subscribe(uint licenseId) external;

    function verifySubscription(address owner, uint licenseId) external view returns(bool);
}