require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB error:", err));

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  type: String,
  college: String,
  location: String,
  link: String,
});

const Event = mongoose.model("Event", eventSchema);

app.get("/api/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/api/events", async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json({ message: "Event saved!" });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
