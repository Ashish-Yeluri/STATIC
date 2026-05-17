const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.post("/api/send-enquiry", async (req, res) => {
  const { fullName, phone, email, location, requirements } = req.body;

  console.log("📩 Sending email for:", fullName);

  try {
    const https = require("https");
    const querystring = require("querystring");

    const postData = querystring.stringify({
      from: `AL Home Decor <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Enquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 600px;">
          <h2 style="color: #c0392b; border-bottom: 2px solid #c0392b; padding-bottom: 8px;">New Enquiry Received</h2>
          <table style="width:100%; border-collapse: collapse; margin-top: 12px;">
            <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold;width:140px;">Name</td><td style="padding:10px;">${fullName}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;">Phone</td><td style="padding:10px;">${phone}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold;">Email</td><td style="padding:10px;">${email}</td></tr>
            <tr><td style="padding:10px;font-weight:bold;">Location</td><td style="padding:10px;">${location}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:10px;font-weight:bold;">Requirements</td><td style="padding:10px;">${requirements || "Not specified"}</td></tr>
          </table>
          <p style="margin-top:20px; font-size:12px; color:#999;">Sent via AL Home Decor Contact Form</p>
        </div>
      `,
    });

    const auth = Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString("base64");

    const options = {
      hostname: "api.mailgun.net",
      path: `/v3/${process.env.MAILGUN_DOMAIN}/messages`,
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const result = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => { data += chunk; });
        response.on("end", () => {
          resolve({ status: response.statusCode, body: data });
        });
      });
      request.on("error", reject);
      request.write(postData);
      request.end();
    });

    console.log("✉️  Mailgun status:", result.status);
    console.log("✉️  Mailgun response:", result.body);

    if (result.status !== 200) {
      return res.status(502).json({ message: "Failed to send email", detail: result.body });
    }

    return res.status(200).json({ message: "Email sent successfully!" });

  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
