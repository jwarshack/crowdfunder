pragma solidity >=0.4.22 <0.8.0;

contract Crowdfunder {

    string public name;

    uint public fundCount = 0;

    struct Fund {
        uint id;
        string name;
        address payable fundOwner;
        uint targetAmount;
        uint currentAmount;
    }

    event FundCreated(
        uint id,
        string name,
        address payable fundOwner,
        uint targetAmount,
        uint currentAmount
    );

    event DonationMade(
        uint indexed id,
        uint amount,
        address payable donor,
        address payable fundOwner

    );

    event FundDeleted(
        uint id,
        string name,
        address payable fundOwner,
        uint targetAmount,
        uint currentAmount
    );


    mapping(uint => Fund) public funds;

    constructor() public {
        name = "Crowdfunder";
    }
    

    function createFund(string memory _name, uint _targetAmount) public {
        require(bytes(_name).length > 0);
        require(_targetAmount > 0);
        fundCount++;

        funds[fundCount] = Fund(fundCount, _name, msg.sender, _targetAmount, 0);
        emit FundCreated(fundCount, _name, msg.sender, _targetAmount, 0);


    }

    function donate(uint _id) payable public  {
        Fund memory _fund = funds[_id];
        uint _deficit = _fund.targetAmount - _fund.currentAmount;
        require(_id > 0 && _id <= fundCount);
        require(msg.value > 0 && msg.value <= _deficit);
        require(msg.sender != _fund.fundOwner, "You can't donate to your own campaign.");

        address payable _fundOwner = _fund.fundOwner;
        _fundOwner.transfer(msg.value);
        _fund.currentAmount = _fund.currentAmount + msg.value;
        funds[_id] = _fund;


        emit DonationMade(_id, msg.value, msg.sender, _fundOwner);

    }




    function deleteFund(uint _id) public {
        require(_id > 0 && _id <= fundCount);
        

        Fund memory _fund = funds[_id];
        funds[_id] = funds[fundCount - 1];
        delete funds[fundCount - 1];
        fundCount--;


        emit FundDeleted(_id, _fund.name, _fund.fundOwner, _fund.targetAmount, _fund.currentAmount);

    }


}