import {ethers} from "hardhat";

async function testConnection() {
    const network = await ethers.provider.getNetwork();
    console.log(`Connected to network: ${network.name}`);
}

testConnection().catch(console.error);
