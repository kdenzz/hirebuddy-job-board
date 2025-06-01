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

    await (async () => {
        for await (const line of rl) {
            try {
                const job = JSON.parse(line);

                // Validate required fields
                const requiredFields = ['job_title', 'company_name', 'job_location', 'apply_link', 'description', 'source'];
                const isValid = requiredFields.every(field => job[field]);

                if (isValid) {
                    jobs.push(job);
                } else {
                    console.warn("Skipping incomplete job:", job);
                }
            } catch (e) {
                console.error("Invalid JSON line:", line);
            }
        }
    })();

    try {
        await Job.insertMany(jobs);
        console.log(`${jobs.length} jobs inserted!`);
    } catch (err) {
        console.error("Error inserting jobs:", err);
    } finally {
        mongoose.disconnect();
    }
}

seedJobs().catch(err => {
    console.error("Error seeding:", err);
    mongoose.disconnect();
});
