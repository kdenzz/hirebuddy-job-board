// backend/models/Job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        job_title: { type: String, required: true },
        company_name: { type: String, required: true },
        job_location: { type: String, required: true },
        apply_link: { type: String, required: true },
        description: { type: String, required: true },
        source: { type: String, required: true },
    },
    { timestamps: true }
);

JobSchema.index({
    job_title: "text",
    company_name: "text",
    job_location: "text",
    description: "text"
});
await Job.syncIndexes();


module.exports = mongoose.model('Job', jobSchema);
