document.getElementById("send").addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/send", {
    method: "POST",
    mode: "no-cors",
  });
  alert("email sent successfully");
});

async function validTransaction() {
  await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((err) => {
      console.log(err);
    });
}
