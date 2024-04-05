import {config} from "dotenv";
import launchAPI from "./src/platforms/express/api";
import {MongooseUtil} from "./src/platforms/mongoose";

config({
    path: '.env'
});

async function main(){

    const mongo = await MongooseUtil.openConnection();
    launchAPI(mongo);
}

main().catch(console.error);

