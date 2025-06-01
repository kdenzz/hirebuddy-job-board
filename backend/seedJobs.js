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

    // Wrap async iteration in an IIFE
    await (async () => {
        for await (const line of rl) {
            try {
                const job = JSON.parse(line);
                jobs.push(job);
            } catch (e) {
                console.error("Invalid JSON line:", line);
            }
        }
    })();

    await Job.insertMany(jobs);
    console.log(`${jobs.length} jobs inserted!`);
    mongoose.disconnect();
}

seedJobs().catch(err => {
    console.error("Error seeding:", err);
    mongoose.disconnect();
});
