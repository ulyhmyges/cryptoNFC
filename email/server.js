import express from "express";
import { main } from "./transaction_email.js";

const app = express();
const port = 3000;

app.post("/send", (req, res) => {
  main().catch(console.error);
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
