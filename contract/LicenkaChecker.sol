pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "./ILicenka.sol";

contract LicenkaChecker {

    ILicenka _licenka;

    /**
    * @dev Add the address of the Licenka contract address.
    */
    constructor(address licenkaAddress) {
        _licenka = ILicenka(licenkaAddress);
    }

    /**
    * @dev Modifier to require a wallet to have a valid subscription to a license.
    */
    modifier mustBeSubscribe(address owner, uint licenseId) {
        require(_licenka.verifySubscription(owner, licenseId), "Didn't subscribe");
        _;
    }
}