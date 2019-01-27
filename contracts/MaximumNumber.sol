pragma solidity >=0.4.0 <0.6.0;

contract MaximumNumber {
    uint[] private numbersDatabase;

    function sendNumber(uint number) public {
        numbersDatabase.push(number);
    }

    function winningNumber() public view returns (uint winningNumber_) {
        winningNumber_ = 0;
        for (uint i = 0; i < numbersDatabase.length; i++) {
            if (numbersDatabase[i] > winningNumber_) {
                winningNumber_ = numbersDatabase[i];
            }
        }
    }

    function reset() public {
        delete numbersDatabase;
    }
}