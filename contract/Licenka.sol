pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./LicenkaPassword.sol";
import "./ILicenka.sol";

/**
* @dev Licenka is a contract that allows you to create a license.
*/
contract Licenka is ILicenka, licenkaPassword {

    using SafeMath for uint;

    IERC20 public token;

    struct License {
        string name;
        address owner;
        uint price;
        uint duration;
    }

    struct LicenseSubscribe {
        uint licenseId;
        uint validTime;
        bool isInfinite;
    }

    address _owner;
    uint _nextLicenseId = 1;
    uint _nextLicenseSubscriptionId = 1;
    uint percentageFee = 3;

    //Licences
    mapping (uint => License) public licenses;
    mapping (address => uint[]) _licenseOwner;

    //Subscriptions
    mapping (uint => LicenseSubscribe) public subscriptions;
    mapping (address => uint[]) _subscriptionOwner;
    mapping (address => mapping(uint => uint))  _subcriptionIndex;

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
        percentageFee = newFee;
    }

    /**
    * @dev Set the token address. Only callable by the owner.
    */
    function setToken(address token_) external isOwner(msg.sender) {
        token = IERC20(token_);
    }

    /**
    * @dev Transfert funds from the wallet to a given address. Only callable by the owner.
    */
    function transferFunds(address dest, uint amount) external isOwner(msg.sender) {
        token.transfer(dest, amount);
    }

    /**
    * @dev Create a new license.
    */
    function createLicence(address owner, string memory name, uint price, uint duration) external {
        License memory license = License(name, owner, price, duration);
        licenses[_nextLicenseId] = license;
        _licenseOwner[owner].push(_nextLicenseId);
        _nextLicenseId++;
    }


    function _subscribe(address owner, uint licenseId) internal {
        License memory license = licenses[licenseId];
        require(license.owner != address(0x0), "Wrong id number"); //Test if license id is valid
        require(token.allowance(owner, address(this)) >= license.price, "Didn't approve enough fund for the license"); //Test if the user has sufficient fund

        uint index = _subcriptionIndex[owner][licenseId];
        if (index == 0) { //if First time subscribing, add the licence to array
            subscriptions[_nextLicenseSubscriptionId] = LicenseSubscribe(licenseId, 0, false);
            _subscriptionOwner[owner].push(_nextLicenseSubscriptionId);
            _subcriptionIndex[owner][licenseId] = _nextLicenseSubscriptionId;
            index = _nextLicenseSubscriptionId;
            _nextLicenseSubscriptionId++;
        }

        require(subscriptions[index].isInfinite == false, "Already subcribed");
        LicenseSubscribe memory subscription_ = subscriptions[index];
        if (license.duration == 0)
            subscriptions[index].isInfinite = true;
        else {
            uint rootTimestamp = subscription_.validTime < block.timestamp  ? block.timestamp : subscription_.validTime;
            subscriptions[index].validTime = rootTimestamp + license.duration;
        }
        token.transferFrom(owner, address(this), license.price);
        token.transfer(license.owner, license.price.mul(100 - percentageFee).div(100));
    }

    /**
    * @dev Subscribe to a license. With your own wallet
    */
    function subscribe(uint licenseId) external {
        _subscribe(msg.sender, licenseId);
    }

    /**
    * @dev Create a new license. With the api call
    */
    function subscribeWeb2(address owner, uint hash, uint licenseId) external isPasswordSet(owner) isPasswordMatch(owner, hash) {
        _subscribe(owner, licenseId);
    }

    function _verifySubscription(address owner, uint licenseId) internal view returns(bool) {
        if (_subcriptionIndex[owner][licenseId] == 0)
            return false;
        uint index = _subcriptionIndex[owner][licenseId];
        LicenseSubscribe memory subscription_ = subscriptions[index];
        if (subscription_.isInfinite == true)
            return true;
        if (subscription_.validTime > block.timestamp)
            return true;
        return false;
    }

    /**
    * @dev Verify if a wallet owns a license.
    */
    function verifySubscription(address owner, uint licenseId) external view returns(bool) {
        return _verifySubscription(owner, licenseId);
    }

    /**
    * @dev Verify if a wallet owns a license. With the api call
    */
    function verifySubscriptionWeb2(address owner, uint hash, uint licenseId) external view isPasswordSet(owner) isPasswordMatch(owner, hash) returns(bool) {
        return _verifySubscription(owner, licenseId);
    }

    /**
    * @dev Get all owned licenses by a wallet.
    */
    function getLicenses(address owner) external view returns(uint[] memory) {
        return _licenseOwner[owner];
    }

    /**
    * @dev Get all owned subscriptions by a wallet.
    */
    function getSubscriptions(address owner) external view returns(uint[] memory) {
        return _subscriptionOwner[owner];
    }

    /**
    * @dev Get a wallet subscription for a given license.
    */
    function getSubscriptionIdForLicense(address owner, uint licenseId) external view returns(uint) {
        return _subcriptionIndex[owner][licenseId];
    }
}