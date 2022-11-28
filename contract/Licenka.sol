pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ILicenka.sol";
import "./LicenkaLicense.sol";
import "./LicenkaSubscription.sol";

/**
* @dev Licenka is a contract that allows you to create a license.
*/
contract Licenka is ILicenka, LicenkaLicense, LicenkaSubscription {

    using SafeMath for uint;

    IERC20 public token;

    address _owner;
    uint public fee = 3;

    /**
    * @dev Check if the caller is the owner of the contract.
    */
    modifier isOwner(address sender) {
        require(_owner == sender, "You are not the owner");
        _;
    }

    /**
    * @dev Init the contract with a token address, which will be the currency.
    */
    constructor(address tokenAdresse_) {
        _owner = msg.sender;
        token = IERC20(tokenAdresse_);
    }

    /**
    * @dev Set the fee percentage. Only callable by the owner.
    */
    function setFee(uint newFee) external isOwner(msg.sender) {
        require(0 <= newFee && newFee <= 100, "The fee must be between 0 and 100");
        fee = newFee;
    }

    /**
    * @dev Set the token address. Only callable by the owner.
    */
    function setToken(address token_) external isOwner(msg.sender) {
        token = IERC20(token_);
    }

    /**
    * @dev Transfert funds from the contract to a given address. Only callable by the owner.
    */
    function transferFunds(address dest, uint amount) external isOwner(msg.sender) {
        token.transfer(dest, amount);
    }

    /**
    * @dev Create a new license.
    */
    function createLicense(address owner, string memory name, uint price, uint duration) override external {
        _mintLicense(owner, name, price, duration);
    }

    /**
    * @dev Subscribe to a license.
    */
    function subscribe(uint licenseId) override external licenseExist(licenseId) licenseUnpaused(licenseId) {
        License memory license = licenses[licenseId];
        require(token.allowance(msg.sender, address(this)) >= license.price, "Didn't approve enough fund for the license"); //Test if the user has sufficient fund

        _subscribe(msg.sender, licenseId, license.duration);

        token.transferFrom(msg.sender, address(this), license.price);
        token.transfer(license.owner, license.price.mul(100 - fee).div(100));
    }

    /**
    * @dev Verify if a wallet is subscribed to a license.
    */
    function verifySubscription(address owner, uint licenseId) override external view licenseExist(licenseId) returns(bool) {
        return _verifySubscription(owner, licenseId);
    }
}