import { NFC } from "nfc-pcsc";
import pretty from "./mini-logger.js";

const nfc = new NFC();

nfc.on("reader", (reader) => {
  console.log(`${reader.reader.name}  device attached`);

  // enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
  // when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
  // the response is available as card.data in the card event
  // see examples/basic.js line 17 for more info
  // reader.aid = 'F222222222';

  reader.on("card", async card => {
    // card is object containing following data
    // [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
    // [always] String standard: same as type
    // [only TAG_ISO_14443_3] String uid: tag uid
    // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

    console.log(`${reader.reader.name}  card detected`, card);

    try {

      // reader.read(blockNumber, length, blockSize = 4, packetSize = 16)
      // - blockNumber - memory block number where to start reading
      // - length - how many bytes to read
      // - blockSize - 4 for MIFARE Ultralight, 16 for MIFARE Classic
      // ! Caution! length must be divisible by blockSize (we have to read the whole block(s))

      const data = await reader.read(4, 4);

      pretty.info(`data read`, reader, data);

      const payload = data.readInt16BE(0);

      pretty.info(`data converted`, reader, payload);

    } catch (err) {
      pretty.error(`error when reading data`, reader, err);
    }

  });

  reader.on("card.off", (card) => {
    console.log(`${reader.reader.name}  card removed`, card);
  });

  reader.on("error", (err) => {
    console.log(`${reader.reader.name}  an error occurred`, err);
  });

  reader.on("end", () => {
    console.log(`${reader.reader.name}  device removed`);
  });
});

nfc.on("error", (err) => {
  console.log("an error occurred", err);
});
