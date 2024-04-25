//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./BillDefinition.sol";

contract Invoice is ERC721, AccessControl {

    BillDefinition.Bill private invoicePaper;
    bytes32 public constant INVOICE_ROLE = keccak256("INVOICE_ROLE");

    constructor (BillDefinition.Bill memory bill) ERC721("Invoice", "BILL") {
        invoicePaper = bill;
        _grantRole(INVOICE_ROLE, invoicePaper.customer);
        _grantRole(INVOICE_ROLE, invoicePaper.seller);
    }

    function getInvoice() public view onlyRole(INVOICE_ROLE) returns (BillDefinition.Bill memory) {
        return invoicePaper;
    }

    // Explicit override to resolve ambiguity
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool)
    {
        return
            ERC721.supportsInterface(interfaceId) ||
            AccessControl.supportsInterface(interfaceId);
    }

// AccessControl.sol:71
//    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
//        return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
//    }

}