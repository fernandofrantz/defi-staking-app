pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';


contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }

    function depositTokens(uint _amount) public {
        // Require staking ammount to be greater than zero
        require(_amount > 0, 'ammount cannot be 0');

        // Transfer tether to this contract for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBalance[msg.sender] += _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

    }


}