import {defender, ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Defender} from "@openzeppelin/defender-sdk";
import {Status} from "../definition";
import {getSigner} from "@openzeppelin/hardhat-upgrades/dist/utils";
import {config} from "dotenv";
import {getContract, getDefender} from "./utils";
import {Signer} from "ethers";

config()
async function main(){

    //const contract = getContract(process.env.DEPLOYED_CONTRACT as string, InvoiceFactoryJSON.abi);
    //const signer = getSigner(getDefender().relaySigner.getProvider());
    const signer = await getSigner(getDefender().relaySigner.getProvider()) as Signer;

    const contract = new ethers.Contract(process.env.DEPLOYED_CONTRACT as string, InvoiceFactoryJSON.abi, signer);

    const tx = await contract.call("")
    const data = tx.wait();
    console.log("data: ", data);
}

main().catch(console.error);