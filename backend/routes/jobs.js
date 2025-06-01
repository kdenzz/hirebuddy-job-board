const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Keyword = require("../models/Keyword");

router.get("/", async (req, res) => {
    const q = (req.query.q || "").trim().toLowerCase();

    try {
        if (q) {
            // Increment keyword count
            await Keyword.findOneAndUpdate(
                { term: q },
                { $inc: { count: 1 } },
                { upsert: true }
            );
        }

        let jobs = [];

        if (!q) {
            jobs = await Job.find().limit(50);
        } else {
            // 🔍 Partial search using regex on relevant fields
            const regex = new RegExp(q, "i"); // i = case-insensitive

            jobs = await Job.find({
                $or: [
                    { job_title: { $regex: regex } },
                    { company_name: { $regex: regex } },
                    { job_location: { $regex: regex } },
                    { description: { $regex: regex } }
                ]
            }).limit(50);
        }

        res.json(jobs);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
