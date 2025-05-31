// src/components/JobCard.tsx
import React from "react";

export type Job = {
    job_title: string;
    company_name: string;
    job_location: string;
    apply_link: string;
    description: string;
    source: string;
};

export default function JobCard({ job }: { job: Job }) {
    const initial = job.job_title.charAt(0).toUpperCase();

    return (
        <div className="relative bg-white border border-gray-200 rounded-2xl shadow p-6 pt-12 min-h-[200px]">
            {/* Avatar */}
            <div className="absolute -top-6 left-6">
                <div
                    className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500
                     flex items-center justify-center text-white font-bold text-lg"
                >
                    {initial}
                </div>
            </div>

            {/* Apply Now button */}
            <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-8 right-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium
                   px-4 py-2 rounded-lg inline-flex items-center space-x-1"
            >
                <span>Apply</span>
                <span>Now</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M14 3h7m0 0v7m0-7L10 14" />
                </svg>
            </a>

            {/* Title + Caret */}
            <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-blue-600 leading-snug">
                    {job.job_title}
                </h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>

            {/* Company */}
            <p className="text-sm text-blue-500 mt-1">{job.company_name}</p>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center text-gray-500 text-sm space-x-4">
                {/* Location */}
                <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 12.414a4 4
                     0 10-5.657 5.657l4.243 4.243a4 4
                     0 005.657-5.657zM15 11a3 3 0
                     11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.job_location}</span>
                </div>

                {/* Time Ago */}
                <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0
                     11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>1 day ago</span>
                </div>

                {/* Source */}
                <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12.293 2.293a1 1 0
                     011.414 0l4 4a1 1 0 010
                     1.414l-8 8a1 1 0
                     01-1.414-1.414L14.586
                     7H8a1 1 0 110-2h6.586
                     l-2.293-2.293a1 1 0
                     010-1.414zM5 12a1 1 0
                     011-1h2a1 1 0 110 2H7v4h4a1
                     1 0 110 2H6a1 1 0
                     01-1-1v-4z" />
                    </svg>
                    <span>{job.source}</span>
                </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-700 text-sm line-clamp-3">
                {job.description}
            </p>
        </div>
    );
}
