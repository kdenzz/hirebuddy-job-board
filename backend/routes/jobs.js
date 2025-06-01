// backend/routes/jobs.js

const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Keyword = require("../models/Keyword");




router.get("/", async (req, res) => {
    const q = (req.query.q || "").trim().toLowerCase();

    try {
        if (q) {
            await Keyword.findOneAndUpdate(
                { term: q },
                { $inc: { count: 1 } },
                { upsert: true }
            );
        }

        // 2️⃣ Fetch jobs (all or by text search)
        const jobs = !q
            ? await Job.find().limit(50)
            : await Job
                .find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .limit(50);

        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
