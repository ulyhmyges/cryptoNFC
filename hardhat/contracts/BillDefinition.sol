//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

abstract contract BillDefinition {

    struct Bill {
        uint256 amount;
        uint8 status;
        string timestamp;
        address transactionHash;
        address customer;
        address seller;
    }
}