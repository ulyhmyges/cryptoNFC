import {HardhatUserConfig} from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

const STORE_RELAYER_ADDRESS ='0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D'
const API_KEY = "6gYFS6y8RVxCVvYrkC9o5g79shRgf43Q"
const API_SECRET= "3H3fquZVLkL9NrEevm3JwWvStQ5tfvock8v3XRgDcFRJEZL7R169PwwhxTaZKNw4"
export const RPC_URL_HOLESKY= "https://rpc.holesky.ethpandaops.io"
const PRIVATE_KEY="5964d41e4a1c932120d92b8de90020d2f691c785039c1fff393136b09f94a59f"
const RELAYER_ADDRESS="0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D"

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defender: {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    useDefenderDeploy: true,
  },
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    holesky: {
      url: `${RPC_URL_HOLESKY}`,
      chainId: 17000,
    }
  }
};
          
export default config;