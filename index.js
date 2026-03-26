const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ONLINE 🚀");
});

app.post("/accounts", async (req, res) => {
  const { refresh_token } = req.body;

  res.json({
    message: "Funcionando 🚀",
    refresh_token
  });
});

// 🔥 CORRETO PARA CLOUD
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Rodando na porta " + PORT);
});
