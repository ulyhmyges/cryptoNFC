import {expect} from "chai";
import {ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Bill, Status} from "../definition";
import { Defender } from "@openzeppelin/defender-sdk";

const credentials = {
    relayerApiKey: "6gYFS6y8RVxCVvYrkC9o5g79shRgf43Q",
    relayerApiSecret: "3H3fquZVLkL9NrEevm3JwWvStQ5tfvock8v3XRgDcFRJEZL7R169PwwhxTaZKNw4"
};

let myDefender: any, provider: any, signer: any;

let bill: any;
let owner0: any, owner1: any, owner2: any, owner3: any;
let contract: any;
let address: any;
const storeRelayer = "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D"
describe("InvoiceFactory contract", function() {
    // it("TEST deployment InvoiceFactory contract status", async function() {
    //     [owner0, owner1, owner2, owner3] = await ethers.getSigners();
    //     const factory = new ethers.ContractFactory(
    //         InvoiceFactoryJSON.abi,
    //         InvoiceFactoryJSON.bytecode,
    //         owner2
    //     );
    //     // owner1 = 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
    //
    //     contract = await factory.deploy(storeRelayer);
    //
    //     // The contract is not currentl live on the network yet, however
    //     // its address is ready for us
    //     address = await contract.getAddress();
    //
    //     // Wait until the contract has been deployed before interacting
    //     // with it; returns the receipt for the deployemnt transaction
    //     const txReceipt = await contract.deploymentTransaction()?.wait();
    //     expect(txReceipt?.status).to.equal(1, "Contract Invoice deployment failed");
    // })

    it("TEST createInvoice method SUCCESS", async function() {
        bill = {
            amount: ethers.parseEther("0.01"),
            status: ethers.parseUnits(`${Status.Fail}`),
            timestamp: "today",
            transactionHash: "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D",
            customer: "0x794623b0B84fdC9FE785F98B47BCc7B2A9E8b950",
            seller: "0x794623b0B84fdC9FE785F98B47BCc7B2A9E8b950"
        }
        myDefender = new Defender(credentials);

        provider = myDefender.relaySigner.getProvider();
        signer = await myDefender.relaySigner.getSigner(provider);
        const address ="0x794623b0B84fdC9FE785F98B47BCc7B2A9E8b950"
        const c = new ethers.Contract(address, InvoiceFactoryJSON.abi, signer);
        const res = await c.createInvoice(bill);
        console.log(res);
    })

    // it("TEST INVOICE_ROLE UnauthorizedAccount getInvoice method", async function() {
    //     await expect(contract.connect(owner3).getInvoice()).to.be.revertedWithCustomError(
    //         contract, "AccessControlUnauthorizedAccount"
    //     )
    // })
})
