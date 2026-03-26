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
      return res.status(400).json({
        error: "refresh_token obrigatório"
      });
    }

    // 🔐 1. GERAR ACCESS TOKEN
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: refresh_token,
        grant_type: "refresh_token"
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(500).json({
        error: "Erro ao gerar access_token",
        details: tokenData
      });
    }

    const access_token = tokenData.access_token;

    // 📊 2. LISTAR CONTAS GOOGLE ADS (FORMA CORRETA)
    const response = await fetch(
      "https://googleads.googleapis.com/v16/customers:listAccessibleCustomers",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "developer-token": process.env.DEVELOPER_TOKEN,
          "login-customer-id": process.env.CUSTOMER_ID
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      }
    );

    const data = await response.json();

    // 🔄 FORMATAR IDS
    const accounts = (data.resourceNames || []).map((item) =>
      item.replace("customers/", "")
    );

    res.json({
      success: true,
      accounts
    });

  } catch (error) {
    console.error("ERRO REAL:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

// 🚀 PORTA CORRETA PRA CLOUD
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Rodando na porta " + PORT);
});
