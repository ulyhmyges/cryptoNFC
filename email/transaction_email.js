import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.zoho.eu",
  port: 587,
  secure: false,
  auth: {
    user: `nfc_test@zohomail.eu`,
    pass: `oJbVU6hNe389H4bGhQV4R8cA6`,
  },
});

export async function main() {
  const info = await transporter.sendMail({
    from: `nfc_test@zohomail.eu`, // sender address
    to: `hugo.grdpro@gmail.com`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
