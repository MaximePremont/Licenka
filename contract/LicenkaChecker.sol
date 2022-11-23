pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "./ILicenka.sol";

contract LicenkaChecker {

    ILicenka _licenka;
    // address _licenkaAddress;

    constructor(address licenkaAddress) {
        _licenka = ILicenka(licenkaAddress);
        // _licenkaAddress = licenkaAddress;
    }

    modifier mustBeSubscribe(address owner, uint licenseId) {
        // (bool success, bytes memory data) = _licenkaAddress.delegatecall(abi.encodeWithSignature("verifySubscription(address, uint)", owner, licenseId));
        require(_licenka.verifySubscription(owner, licenseId), "Didn't subscribe");
        _;
    }
}