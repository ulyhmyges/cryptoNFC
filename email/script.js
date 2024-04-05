document.getElementById("send").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/send", {
    method: "POST",
    mode: "no-cors",
  });
  alert("email sent successfully");
});

async function connectWallet() {
  await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err);
    });
}

async function sendTransaction() {
  await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
        from: "0x37666e193fE2dA22AF16BcBB83D613eA86844068",
        value: "0x9184e72a",
      },
    ],
  });
}
