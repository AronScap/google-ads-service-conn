import express from "express";
import dotenv from "dotenv";
import { GoogleAdsApi } from "google-ads-api";

dotenv.config();

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

app.post("/accounts", async (req, res) => {
  try {
    const { refresh_token } = req.body;

    const customer = client.Customer({
      customer_id: process.env.CUSTOMER_ID,
      refresh_token,
    });

    const result = await customer.listAccessibleCustomers();

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Rodando na porta " + PORT);
});
