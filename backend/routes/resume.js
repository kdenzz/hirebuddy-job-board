// backend/routes/resume.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Job = require('../models/Job');
const extractKeywords = require('../utils/parseResume');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('resume'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });

    // 1) Read the resume text
    const filePath = path.join(__dirname, '..', req.file.path);
    const content = fs.readFileSync(filePath, 'utf8');

    // 2) Predict roles
    const predictedRoles = extractKeywords(content);  // e.g. ["engineer","manager"]

    const jobLists = await Promise.all(
        predictedRoles.map(async (role) => {
            const regexMatches = await Job.find({
                $or: [
                    { job_title: { $regex: role, $options: "i" } },
                    { description: { $regex: role, $options: "i" } }
                ]
            }).limit(20);

            if (regexMatches.length > 0) return regexMatches;

            // fallback to $text search
            return await Job.find(
                { $text: { $search: role } },
                { score: { $meta: 'textScore' } }
            )
                .sort({ score: { $meta: 'textScore' } })
                .limit(20)
                .exec();
        })
    );


    // 4) Flatten & dedupe by _id
    const allJobs = jobLists.flat();
    const uniqueJobs = Array.from(
        new Map(allJobs.map(j => [j._id.toString(), j]))
            .values()
    );

    // 5) Return both the roles and the matched jobs
    res.json({ predictedRoles, jobs: uniqueJobs });
});

module.exports = router;
