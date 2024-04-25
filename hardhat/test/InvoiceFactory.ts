import {expect} from "chai";
import {ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Bill, Status} from "../definition";

let bill: any;
let owner0: any, owner1: any, owner2: any, owner3: any;
let contract: any;
let address: any;
const storeRelayer = "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D"
describe("InvoiceFactory contract", function() {
    it("TEST deployment InvoiceFactory contract status", async function() {
        [owner0, owner1, owner2, owner3] = await ethers.getSigners();
        const factory = new ethers.ContractFactory(
            InvoiceFactoryJSON.abi,
            InvoiceFactoryJSON.bytecode,
            owner2
        );
        // owner1 = 0x70997970c51812dc3a010c7d01b50e0d17dc79c8

        contract = await factory.deploy(storeRelayer);

        // The contract is not currentl live on the network yet, however
        // its address is ready for us
        address = await contract.getAddress();

        // Wait until the contract has been deployed before interacting
        // with it; returns the receipt for the deployemnt transaction
        const txReceipt = await contract.deploymentTransaction()?.wait();
        expect(txReceipt?.status).to.equal(1, "Contract Invoice deployment failed");
    })

    it("TEST createInvoice method SUCCESS", async function() {
        bill = {
            amount: ethers.parseEther("0.01"),
            status: ethers.parseUnits(`${Status.Fail}`),
            timestamp: "today",
            transactionHash: "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D",
            customer: await owner1.getAddress(),
            seller: await owner2.getAddress()
        }
        await contract.connect(owner3).createInvoice(bill);
    })

    // it("TEST INVOICE_ROLE UnauthorizedAccount getInvoice method", async function() {
    //     await expect(contract.connect(owner3).getInvoice()).to.be.revertedWithCustomError(
    //         contract, "AccessControlUnauthorizedAccount"
    //     )
    // })
})
