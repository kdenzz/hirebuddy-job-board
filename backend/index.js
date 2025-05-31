// backend/index.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const jobRoutes = require("./routes/jobs");
const resumeRoutes = require("./routes/resume");
const keywordRoutes = require("./routes/keywords"); // ← require your new file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount your existing routes
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/keywords", keywordRoutes); // ← mount keywords here

// Connect to MongoDB and start listening
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(5000, () => console.log("🚀 Server listening on http://localhost:5000"));
    })
    .catch(console.error);
