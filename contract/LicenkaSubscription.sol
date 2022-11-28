pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT License

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
* @dev Licenka is a contract that allows you to create a license.
*/
contract LicenkaSubscription {

    using SafeMath for uint;

    struct Subscription {
        address owner;
        uint validTime;
    }

    event SubscriptionCreate(address indexed owner, uint indexed licenseId);
    event SubscriptionExtend(address indexed owner, uint indexed subscriptionId, uint duration);

    uint _nextSubscriptionId = 1;

    mapping (uint => Subscription) public subscriptions;
    mapping (address => uint[]) _subscriptionOwner;
    mapping (address => mapping(uint => uint))  _subcriptionIndex;

    /**
    * @dev Subscription license must exist.
    */
    modifier subscriptionExist(uint subscriptionId) {
        require(0 < subscriptionId && subscriptionId < _nextSubscriptionId, "The subscription doesn't exist.");
        _;
    }

    /**
    * @dev Create a new subscription to a License.
    */
    function _mintSubscription(address sender, uint licenseId, uint duration) internal {
        subscriptions[_nextSubscriptionId] = Subscription(sender, (duration == 0) ? 0 : duration + block.timestamp);
        _subscriptionOwner[sender].push(_nextSubscriptionId);
        _subcriptionIndex[sender][licenseId] = _nextSubscriptionId;
        _nextSubscriptionId++;
    }

    /**
    * @dev Extend a subscription to a License.
    */
    function _extendSubscription(uint subscriptionId, uint duration) internal {
        Subscription memory subscription = subscriptions[subscriptionId];
        require(subscription.validTime != 0, "This subscription doesn't timeout.");
        if (subscription.validTime < block.timestamp)
            subscription.validTime = block.timestamp;
        subscription.validTime += duration;
        subscriptions[subscriptionId].validTime = subscription.validTime;
    }

    /**
    * @dev Subscribe to a license, if the sender is already subcribe it tries to extend his subscription.
    */
    function _subscribe(address sender, uint licenseId, uint duration) internal {
        uint subscriptionId = _subcriptionIndex[sender][licenseId];
        if (subscriptionId == 0) {
            _mintSubscription(sender, licenseId, duration);

            emit SubscriptionCreate(sender, licenseId);
        } else {
            _extendSubscription(subscriptionId, duration);

            emit SubscriptionExtend(sender, subscriptionId, duration);
        }

    }

    /**
    * @dev Verify if a wallet is subscribed to a license.
    */
    function _verifySubscription(address sender, uint licenseId) internal view returns(bool) {
        if (_subcriptionIndex[sender][licenseId] == 0)
            return false;
        uint index = _subcriptionIndex[sender][licenseId];
        Subscription memory subscription_ = subscriptions[index];
        if (subscription_.validTime == 0)
            return true;
        if (subscription_.validTime > block.timestamp)
            return true;
        return false;
    }

    /**
    * @dev Get senders' subscription ids.
    */
    function getSubscriptions(address sender) external view returns(uint[] memory) {
        return _subscriptionOwner[sender];
    }

    /**
    * @dev Get senders' subscription info to a license.
    */
    function getSubscription(address sender, uint licenseId) external view returns(uint) {
        return _subcriptionIndex[sender][licenseId];
    }
}