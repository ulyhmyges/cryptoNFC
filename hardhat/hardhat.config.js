import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const RPC_URL_HOLESKY="https://rpc.holesky.ethpandaops.io"
const PRIVATE_KEY="5964d41e4a1c932120d92b8de90020d2f691c785039c1fff393136b09f94a59f"
const RELAYER_ADDRESS="0xC6A2907273Ab4157EB8594f471cB24F89aF71D3D"

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {},
    holesky: {
      url: `${RPC_URL_HOLESKY}`
    }
  }
};
          
export default config;