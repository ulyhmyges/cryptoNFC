//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import "./Invoice.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./BillDefinition.sol";

contract InvoiceFactory is AccessControl {

    //bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address private STORE_RELAYER_ADDRESS = 0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D;
    address[] public deployedInvoice;

    constructor(address add) {
        STORE_RELAYER_ADDRESS = add;
        _grantRole(DEFAULT_ADMIN_ROLE, STORE_RELAYER_ADDRESS);
    }

    function createInvoice(BillDefinition.Bill memory bill) public onlyRole(DEFAULT_ADMIN_ROLE){
        address newInvoice = address(new Invoice(bill));
        deployedInvoice.push(newInvoice);
    }

    function getDeployedInvoice() public view returns (address[] memory){
        return deployedInvoice;
    }
}