const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('./models/Job');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    });
async function seedJobs() {
    const fileStream = fs.createReadStream('jobs.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        try {
            const jobData = JSON.parse(line);
            const job = new Job(jobData);
            await job.save();
        } catch (err) {
            console.error("Error parsing or saving job:", err.message);
        }
    }

    console.log('✅ Done seeding jobs!');
    process.exit();
}

seedJobs();

const sanitize = (s) => s.replace(/\uFFFD/g, "").trim();

for await (const line of rl) {
    let jobData = JSON.parse(line);
    jobData.job_title = sanitize(jobData.job_title);
    jobData.company_name = sanitize(jobData.company_name);
    jobData.job_location = sanitize(jobData.job_location);
    jobData.description = sanitize(jobData.description);
    await new Job(jobData).save();
}