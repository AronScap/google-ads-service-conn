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

// 🔥 LISTAR CONTAS (SEM CUSTOMER_ID)
app.post("/accounts", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ error: "refresh_token obrigatório" });
    }

    const customers = await client.listAccessibleCustomers(refresh_token);

    res.json({
      success: true,
      customers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Rodando na porta " + PORT);
});
