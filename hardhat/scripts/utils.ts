import {Defender} from "@openzeppelin/defender-sdk";
import {ethers} from "hardhat";
import {getSigner} from "@openzeppelin/hardhat-upgrades/dist/utils";
import {config} from "dotenv";
import {Signer} from "ethers";

config()
export function getDefender() {
    const credentials = {
        relayerApiKey: process.env.RELAYER_API_KEY,
        relayerApiSecret: process.env.RELAYER_API_SECRET,
    };

    return new Defender(credentials);
}

export async function getContract(address: string, abi: any){
    const defender = getDefender();
    const provider = defender.relaySigner.getProvider();
    const signer = await getSigner(provider) as Signer;
    return new ethers.Contract(address, abi, provider);
}