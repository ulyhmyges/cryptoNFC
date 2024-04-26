"use strict";

import { NFC, KEY_TYPE_A } from "nfc-pcsc";

const nfc = new NFC();

nfc.on("reader", (reader) => {
    console.log(`${reader.reader.name}  device attached`);

    reader.on("card", async (card) => {
        console.log(`card detected`, card);

        const key = "FFFFFFFFFFFF"; // key must be a 12-chars HEX string, an instance of Buffer, or array of bytes
        const keyType = KEY_TYPE_A;
        await reader.authenticate(1, keyType, key);
        // example write 12 bytes containing text in utf8
        try {
            const data = Buffer.allocUnsafe(16);
            data.fill(0);
            const text = String(255)
            data.write(text); // if text is longer than 12 bytes, it will be cut off
            reader.write(1, data, 16);
            //   await reader.write(4, data); // starts writing in block 4, continues to 5 and 6 in order to write 12 bytes

        } catch (err) {
            console.error(`error when writing data`, err);
        }

        try {
            // reader.read(blockNumber, length, blockSize = 4, packetSize = 16)
            const data = await reader.read(1, 16); // starts reading in block 4, continues to 5 and 6 in order to read 12 bytes
            console.log(`data read`, data);
            const payload = data.toString(); // utf8 is default encoding
            console.log(`data written: `, payload);
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
