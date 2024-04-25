
import { ethers, defender } from "hardhat";
import {Status} from "../definition";

async function main() {
    const storeRelayer = "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D"
    const IF_factory = await ethers.getContractFactory("InvoiceFactory");

    //const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess();

    //if (upgradeApprovalProcess.address === undefined) {
    //    throw new Error(`Upgrade approval process with id ${upgradeApprovalProcess.approvalProcessId} has no assigned address`);
    //}
    const bill = {
        amount: ethers.parseEther("0.01"),
        status: ethers.parseUnits(`${Status.Fail}`),
        timestamp: "today",
        transactionHash: "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D",
        customer: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        seller: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
    }
    const deployment = await defender.deployContract(IF_factory, [storeRelayer]);

    await deployment.waitForDeployment();

    console.log(`Contract deployed to ${await deployment.getAddress()}`);
    // => deployed to 0x794623b0B84fdC9FE785F98B47BCc7B2A9E8b950
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});