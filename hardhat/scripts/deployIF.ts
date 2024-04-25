import {ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Defender} from "@openzeppelin/defender-sdk";
async function main(){
    const credentials = {
        relayerApiKey: "8LXwyXwu7tuAHBmoJuXrqgrgCkJivSHc",
        relayerApiSecret: "JvrkosTBmxbU71x8di7uRMrisroN5MsrzAK2scTRLYRJ8TTkttroiD1zhzgpvBEg"
    };
    const def = new Defender(credentials);
    const provider = def.relaySigner.getProvider();
    const signer = await def.relaySigner.getSigner(provider);

    const invoiceFactory = await ethers.deployContract("InvoiceFactory");
    const factory = new ethers.ContractFactory(
        InvoiceFactoryJSON.abi,
        InvoiceFactoryJSON.bytecode,
        provider
    );
    await invoiceFactory.waitForDeployment();
    console.log(`InvoiceFactory deployed to ${invoiceFactory.target}`)
}

main().catch(console.error);