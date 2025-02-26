const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const getUserData = require("./jobs/getUserData");
const {updateScore, resetScore} = require("./jobs/updateScore");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Default user ID (replace with auth logic if needed)
const userId = "65d4a67bfc13ae5a90000000"; 

app.get("/api/user", async (req, res) => {
  const data = await getUserData(userId);
  res.json(data);
});

app.post("/api/update", async (req, res) => {
  const data = await updateScore(userId);
  res.json(data);
});
app.post("/api/reset", async (req, res) => {
  const data = await resetScore(userId);
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
