import {Defender} from "@openzeppelin/defender-sdk";
import {ethers} from "hardhat";
import {getSigner} from "@openzeppelin/hardhat-upgrades/dist/utils";
import {config} from "dotenv";

config()
export function getDefender() {
    const credentials = {
        relayerApiKey: process.env.RELAYER_API_KEY,
        relayerApiSecret: process.env.RELAYER_API_SECRET,
    };
    
    return new Defender(credentials);
}

export function getContract(address: string, abi: any){
    return new ethers.Contract(address, abi, getSigner(getDefender().relaySigner.getProvider()));
}