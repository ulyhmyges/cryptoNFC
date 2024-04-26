"use strict";

import { NFC, KEY_TYPE_A } from "nfc-pcsc";

const nfc = new NFC();

nfc.on("reader", (reader) => {
    console.log(`${reader.reader.name}  device attached`);

    reader.on("card", async (card) => {
        console.log();
        console.log(`card detected`, card);

        const key = "FFFFFFFFFFFF"; // key must be a 12-chars HEX string, an instance of Buffer, or array of bytes
        const keyType = KEY_TYPE_A;
        await reader.authenticate(1, keyType, key);

        try {
            // reader.read(blockNumber, length, blockSize = 4, packetSize = 16)
            const data = await reader.read(1, 16); // starts reading in block 4, continues to 5 and 6 in order to read 12 bytes
            const payload = data.toString(); // utf8 is default encoding
            console.log(`data read: `, payload);
        } catch (err) {
            console.error(`error when reading data`, err);
        }
    });

    reader.on("error", (err) => {
        console.log(`${reader.reader.name}  an error occurred`, err);
    });

    reader.on("card.off", (card) => {
        console.log(`${reader.reader.name}  card removed`, card);
    });

    reader.on("end", () => {
        console.log(`${reader.reader.name}  device removed`);
    });
});

nfc.on("error", (err) => {
    console.log("an error occurred", err);
});
