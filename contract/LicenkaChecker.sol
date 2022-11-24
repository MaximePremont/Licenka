pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "./ILicenka.sol";

contract LicenkaChecker {

    ILicenka _licenka;

    constructor(address licenkaAddress) {
        _licenka = ILicenka(licenkaAddress);
    }

    modifier mustBeSubscribe(address owner, uint licenseId) {
        require(_licenka.verifySubscription(owner, licenseId), "Didn't subscribe");
        _;
    }
}