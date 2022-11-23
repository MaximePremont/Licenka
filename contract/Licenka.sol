pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./LicenkaPassword.sol";
import "./ILicenka.sol";

contract Licenka is ILicenka, licenkaPassword {

    using SafeMath for uint;

    IERC20 _busd;
    IERC20 _usdt;
    enum TokenIds { BUSD, USDT }

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
    uint _percentageFee = 10;

    //Licences
    mapping (uint => License) public licenses;
    mapping (address => uint[]) _licenseOwner;

    //Subscriptions
    mapping (uint => LicenseSubscribe) public subscriptions;
    mapping (address => uint[]) _subscriptionOwner;
    mapping (address => mapping(uint => uint))  _subcriptionIndex;

    constructor(address busdAdresse_, address usdtAdresse_) {
        _owner = msg.sender;
        _busd = IERC20(busdAdresse_);
        _usdt = IERC20(usdtAdresse_);
    }

    function createLicence(address owner, string memory name, uint price, uint duration) external {
        License memory license = License(name, owner, price, duration);
        licenses[_nextLicenseId] = license;
        _licenseOwner[owner].push(_nextLicenseId);
        _nextLicenseId++;
    }

    function _subscribe(address owner, uint licenseId, uint tokenId) internal {
        require(tokenId == uint(TokenIds.BUSD) || tokenId == uint(TokenIds.USDT), "Wrong token id"); // test the currency token
        IERC20 token = (tokenId == uint(TokenIds.BUSD)) ? _busd : _usdt;
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

        // require(_licenseSubcriber[owner][index].validTime == 0 || _licenseSubcriber[owner][index].validTime < block.timestamp, "Already subcribed");
        require(subscriptions[index].isInfinite == false, "Already subcribed");
        LicenseSubscribe memory subscription_ = subscriptions[index];
        if (license.duration == 0)
            subscriptions[index].isInfinite = true;
        else {
            uint rootTimestamp = subscription_.validTime < block.timestamp  ? block.timestamp : subscription_.validTime;
            subscriptions[index].validTime = rootTimestamp + license.duration;
        }
        token.transferFrom(owner, address(this), license.price);
        token.transfer(license.owner, license.price.mul(100 - _percentageFee).div(100));
    }

    function subscribe(uint licenseId, uint tokenId) external {
        _subscribe(msg.sender, licenseId, tokenId);
    }

    function subscribeWeb2(address owner, uint hash, uint licenseId, uint tokenId) external isPasswordSet(owner) isPasswordMatch(owner, hash) {
        _subscribe(owner, licenseId, tokenId);
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

    function verifySubscription(address owner, uint licenseId) external view returns(bool) {
        return _verifySubscription(owner, licenseId);
    }

    function verifySubscriptionWeb2(address owner, uint hash, uint licenseId) external view isPasswordSet(owner) isPasswordMatch(owner, hash) returns(bool) {
        return _verifySubscription(owner, licenseId);
    }

    function getLicenses(address owner) external view returns(uint[] memory) {
        return _licenseOwner[owner];
    }

    function getSubscriptions(address owner) external view returns(uint[] memory) {
        return _subscriptionOwner[owner];
    }
}