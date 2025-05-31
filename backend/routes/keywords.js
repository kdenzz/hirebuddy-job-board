const express = require("express");
const router = express.Router();

// ▶︎ This path must match your model’s filename exactly
const Keyword = require("../models/Keyword");

router.get("/", async (req, res) => {
    try {
        const top = await Keyword.find()    // ← if Keyword is a valid model, this works
            .sort({ count: -1 })
            .limit(10)
            .lean();

        return res.json(top.map(({ term, count }) => ({ term, count })));
    } catch (err) {
        console.error("Error fetching keywords:", err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
