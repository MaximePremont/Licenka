pragma solidity 0.8.9;
// SPDX-License-Identifier: MIT License

contract licenkaPassword {

    mapping(address => uint) _passwords;

    modifier isPasswordSet(address owner) {
        require(_passwords[owner] != 0, "Password not set");
        _;
    }

    modifier isPasswordMatch(address owner, uint hash) {
        require(_passwords[owner] == hash, "Password does not match");
        _;
    }

    function passwordSet(uint hash) external {
        _passwords[msg.sender] = hash;
    }

    function passwordMatch(address owner, uint hash) external view returns(bool){
        return _passwords[owner] == hash;
    }
}