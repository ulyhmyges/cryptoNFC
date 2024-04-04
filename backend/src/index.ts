import {config} from "dotenv";
import launchAPI from "./platforms/express/api";
import {MongooseUtil} from "./platforms/mongoose";

config({
    path: '.env'
});

async function main(){

    const mongo = await MongooseUtil.openConnection();
    launchAPI(mongo);
}

main().catch(console.error);

