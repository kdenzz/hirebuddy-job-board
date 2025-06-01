const mongoose = require('mongoose');
const fs = require('fs');
const readline = require('readline');
const Job = require('./models/Job');
require('dotenv').config();

async function seedJobs() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");

    await Job.deleteMany({});
    console.log("Old jobs cleared");

    const rl = readline.createInterface({
        input: fs.createReadStream('jobs.jsonl'),
        crlfDelay: Infinity
    });

    const jobs = [];

    for await (const line of rl) {
        try {
            const job = JSON.parse(line);

            // Fix: Add default description if missing
            if (!job.description) {
                console.warn("Missing description in job:", job.job_title || "Untitled Job");
                job.description = "No description provided";
            }

            jobs.push(job);
        } catch (e) {
            console.error("Invalid JSON line:", line);
        }
    }

    try {
        await Job.insertMany(jobs);
        console.log(`${jobs.length} jobs inserted!`);
    } catch (insertErr) {
        console.error("Error inserting jobs:", insertErr);
    } finally {
        mongoose.disconnect();
    }
}

seedJobs().catch(err => {
    console.error("Error seeding:", err);
    mongoose.disconnect();
});
