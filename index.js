const express = require("express");
const { GoogleAdsApi } = require("google-ads-api");

const app = express();
app.use(express.json());

const client = new GoogleAdsApi({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  developer_token: process.env.DEVELOPER_TOKEN,
});

app.get("/", (req, res) => {
  res.send("API ONLINE 🚀");
});

// 🔥 FORMA CORRETA
app.post("/accounts", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: "refresh_token obrigatório" });
    }

    const customer = client.Customer({
      customer_id: "customers/0", // dummy
      refresh_token,
    });

    const result = await customer.listAccessibleCustomers();

    res.json({
      success: true,
      customers: result.resourceNames
    });

  } catch (error) {
    console.error("ERRO REAL:", error);

    res.status(500).json({
      error: error.message,
      details: error
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Rodando na porta " + PORT);
});
