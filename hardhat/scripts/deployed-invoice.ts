import {ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Defender} from "@openzeppelin/defender-sdk";
import {Status} from "../definition";
import {getSigner} from "@openzeppelin/hardhat-upgrades/dist/utils";
import {config} from "dotenv";
import {getContract} from "./utils";

config()
async function main(){


    const contract = getContract(process.env.STORE_RELAYER as string, InvoiceFactoryJSON.abi);

    const bill = {
        amount: ethers.parseEther("0.01"),
        status: ethers.parseUnits(`${Status.Fail}`),
        timestamp: "today",
        transactionHash: "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D",
        customer: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        seller: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
    }
    const tx = await contract.getDeployedInvoice();
    //await invoiceFactory.waitForDeployment();
    //console.log(`InvoiceFactory deployed to ${invoiceFactory.target}`)
}

//main().catch(console.error);

console.log(process.env.STORE_RELAYER)