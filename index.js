import express from "express";
import dotenv from "dotenv";
import { GoogleAdsApi } from "google-ads-api";
 
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

app.listen(3000, () => {
  console.log("Rodando...");
});
