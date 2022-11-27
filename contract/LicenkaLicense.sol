pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
* @dev Licenka is a contract that allows you to create a license.
*/
contract LicenkaLicense {

    using SafeMath for uint;

    struct License {
        address owner;
        string name;
        uint price;
        uint duration;
    }

    event LicenseCreate(address indexed owner, string indexed name, uint price, uint duration);
    event LicensePause(uint indexed licenseId, bool indexed isPaused);

    uint _nextLicenseId = 1;

    mapping (uint => License) public licenses;
    mapping (uint => bool) _licensePaused;
    mapping (address => uint[]) _licenseOwner;

    /**
    * @dev Modifier msg.sender musdt be the license owner.
    */
    modifier licenseOwner(uint licenseId) {
        require(licenses[licenseId].owner == msg.sender, "You are not the license owner.");
        _;
    }

    /**
    * @dev Modifier license must not be paused.
    */
    modifier licenseUnpaused(uint licenseId) {
        require(_licensePaused[licenseId] == false, "The license is paused.");
        _;
    }

    /**
    * @dev Modifier license must exist.
    */
    modifier licenseExist(uint licenseId) {
        require(0 < licenseId && licenseId < _nextLicenseId, "The license doesn't exist.");
        _;
    }

    /**
    * @dev Create a new license.
    */
    function _mintLicense(address owner, string memory name, uint price, uint duration) internal {
        License memory license = License(owner, name, price, duration);
        licenses[_nextLicenseId] = license;
        _licenseOwner[owner].push(_nextLicenseId);
        _nextLicenseId++;

        emit LicenseCreate(owner, name, price, duration);
    }

    /**
    * @dev Set a license pause value to false or true.
    */
    function setLicensePause(uint licenseId, bool isPaused) external licenseExist(licenseId) licenseOwner(licenseId) {
        _licensePaused[licenseId] = isPaused;

        emit LicensePause(licenseId, isPaused);
    }

    /**
    * @dev Get the licenses owned by a wallet.
    */
    function getLicenses(address owner) external view returns(uint[] memory) {
        return _licenseOwner[owner];
    }
}