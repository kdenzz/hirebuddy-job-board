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

// your text index for fast searches
jobSchema.index(
    { job_title: 'text', description: 'text' },
    { weights: { job_title: 5, description: 1 }, name: 'TextIndex' }
);

module.exports = mongoose.model('Job', jobSchema);
