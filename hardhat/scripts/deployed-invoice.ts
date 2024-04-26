import {ethers} from "hardhat";
import InvoiceFactoryJSON from "../artifacts/contracts/InvoiceFactory.sol/InvoiceFactory.json";
import {Defender} from "@openzeppelin/defender-sdk";
import {Status} from "../definition";
import {getSigner} from "@openzeppelin/hardhat-upgrades/dist/utils";
async function main(){

    const credentials = {
        relayerApiKey: "Dd9fHyfv6LfRi2zHEmeDxvrrbuix6eh8",
        relayerApiSecret: "3TSemsX8TH1hCd1RjzSRDmoaLYQ5KyDS7sWFbZbAwhn3MGMjw9fjVL6adeiTUXvs",

    };
    const def = new Defender(credentials);
    const provider = def.relaySigner.getProvider();
    const signer = await def.relaySigner.getSigner(provider);

    //const invoiceFactory = await ethers.deployContract("InvoiceFactory");
    // const factory = new ethers.ContractFactory(
    //     InvoiceFactoryJSON.abi,
    //     InvoiceFactoryJSON.bytecode,
    //     provider
    // );

    const contract = new ethers.Contract(
        "0x794623b0B84fdC9FE785F98B47BCc7B2A9E8b950",
        InvoiceFactoryJSON.abi,
        getSigner(provider))

    const bill = {
        amount: ethers.parseEther("0.01"),
        status: ethers.parseUnits(`${Status.Fail}`),
        timestamp: "today",
        transactionHash: "0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D",
        customer: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        seller: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
    }
    const tx = await contract.createInvoice(bill);
    //await invoiceFactory.waitForDeployment();
    //console.log(`InvoiceFactory deployed to ${invoiceFactory.target}`)
}

main().catch(console.error);