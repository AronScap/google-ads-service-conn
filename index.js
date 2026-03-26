const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ONLINE 🚀");
});

app.post("/accounts", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: "refresh_token obrigatório" });
    }

    // 🔥 TROCA refresh_token por access_token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: refresh_token,
        grant_type: "1//03KnOpkGfswpuCgYIARAAGAMSNwF-L9Ir8y00ZDqXywkd7smB-Il-8wrVcsVplBR16PYYA7h2_khp4vz2ryPukjrmsulhdnas_SE"
      })
    });

    const tokenData = await tokenResponse.json();

    const access_token = tokenData.access_token;

    // 🔥 CHAMA GOOGLE ADS DIRETO
    const response = await fetch("https://googleads.googleapis.com/v16/customers:listAccessibleCustomers", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "developer-token": process.env.DEVELOPER_TOKEN
      }
    });

    const data = await response.json();

    res.json({
      success: true,
      accounts: data.resourceNames || []
    });

  } catch (error) {
    console.error("ERRO REAL:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Rodando na porta " + PORT);
});
