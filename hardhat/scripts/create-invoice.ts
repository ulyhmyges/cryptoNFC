import {ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Status} from "../definition";
import {getSigner} from "@openzeppelin/hardhat-upgrades/dist/utils";
import {getContract, getDefender} from "./utils";
import {config} from "dotenv";
import {Signer} from "ethers";

config()
async function main(){

    const contract = await getContract(
        process.env.DEPLOYED_CONTRACT as string,
        InvoiceFactoryJSON.abi
    )

    const bill = {
        amount: ethers.parseEther("0.02"),
        status: ethers.parseUnits(`${Status.Fail}`),
        timestamp: "one day",
        transactionHash: "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D",
        customer: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        seller: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
    }
    const tx = await contract.createInvoice(bill);
    const w = tx.wait();
    //const def = getDefender();
    //const provider = def.relaySigner.getProvider();
    //const signer = await getSigner(provider) as Signer

    //const tx1 = await contract.getInvoice();
    //const w1 = tx1.wait();
}

main().catch(console.error);