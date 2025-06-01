// src/App.tsx
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ResumeUpload from "./components/ResumeUpload";
import JobCard from "./components/JobCard";

type Job = {
    job_title: string;
    company_name: string;
    job_location: string;
    apply_link: string;
    description: string;
    source: string;
};

export default function App() {
    // ─── STATE ───────────────────────────────────────────────────────────────────
    const [jobs, setJobs] = useState<Job[]>([]);
    const [query, setQuery] = useState<string>("");
    const [trending, setTrending] = useState<string[]>([]);

    // ─── FETCH JOBS ───────────────────────────────────────────────────────────────
    const fetchJobs = async (q = "") => {
        console.log("🔍 Fetching jobs from:", `https://hirebuddy-job-board.onrender.com/api/jobs?q=${encodeURIComponent(q)}`);
        try {
            // If the user typed something (q), the backend increments that keyword's count
            if (q.trim()) {
                await fetch(`https://hirebuddy-job-board.onrender.com/api/jobs?q=${encodeURIComponent(q)}`);
            }
            // Actually retrieve the job listings (text search or all)
            const res = await fetch(`https://hirebuddy-job-board.onrender.com/api/jobs?q=${encodeURIComponent(q)}`);
            const data: Job[] = await res.json();
            setJobs(data);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setJobs([]);
        }
    };

    // ─── ON MOUNT: load all jobs + trending keywords ───────────────────────────────
    useEffect(() => {
        fetchJobs(); // Load unfiltered job list

        // Load top‐10 keywords (terms only)
        fetch("https://hirebuddy-job-board.onrender.com/api/keywords")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: { term: string; count: number }[]) => {
                setTrending(data.map((k) => k.term));
            })
            .catch((err) => {
                console.error("Failed to load trending keywords:", err);
                setTrending([]);
            });
    }, []);

    // ─── HANDLER: when clicking a trending keyword pill ────────────────────────────
    const handleFilterClick = (term: string) => {
        setQuery(term);
        fetchJobs(term);
    };

    // ─── HANDLER: when resume is uploaded ──────────────────────────────────────────
    const handleResumeUpload = (_roles: string[], jobsFromResume: Job[]) => {
        if (jobsFromResume.length) {
            setJobs(jobsFromResume);
        } else {
            // If no matches from resume, just re‐fetch current query
            fetchJobs(query);
        }
    };

    // ─── RENDER ───────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50">
            {/* ─── HEADER/NAVBAR ────────────────────────────────────────────────────── */}
            <header className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo / Home */}
                    <span
                        className="text-2xl font-bold text-gray-800 cursor-pointer"
                        onClick={() => {
                            // Reset to all jobs
                            setQuery("");
                            fetchJobs("");
                        }}
                    >
                        HireBuddy
                    </span>

                    {/* Nav Links */}
                    <nav className="space-x-6">
                        <button
                            className={`${!query
                                ? "font-semibold text-gray-900"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                            onClick={() => {
                                setQuery("");
                                fetchJobs("");
                            }}
                        >
                            Jobs
                        </button>
                        <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => alert("Companies page will be built soon.")}
                        >
                            Companies
                        </button>
                        <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => alert("Salary page will be built soon.")}
                        >
                            Salary
                        </button>
                    </nav>

                    {/* Sign In */}
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        onClick={() => alert("Sign In page will be built soon.")}
                    >
                        Sign In
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
                {/* ─── HERO SECTION ────────────────────────────────────────────────────── */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold text-gray-900">Find Your Dream Job</h1>
                    <p className="text-gray-600">
                        Search thousands of job opportunities or upload your resume for AI-powered job matching
                    </p>
                </div>

                {/* ─── SEARCH BAR ────────────────────────────────────────────────────────── */}
                <div className="flex justify-center">
                    <SearchBar
                        value={query}
                        setValue={setQuery}
                        onSearch={(q: string) => {
                            setQuery(q);
                            fetchJobs(q);
                        }}
                    />
                </div>

                {/* ─── TRENDING KEYWORDS ─────────────────────────────────────────────────── */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {trending.length > 0 ? (
                        trending.map((term) => (
                            <button
                                key={term}
                                onClick={() => handleFilterClick(term)}
                                className={`px-4 py-2 rounded-full font-medium ${term === query
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                                    }`}
                            >
                                {term}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500">Loading trending searches…</p>
                    )}
                </div>

                {/* ─── RESUME UPLOAD CALLOUT ───────────────────────────────────────────── */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                    <div className="mx-auto mb-4 w-12 h-12 text-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-full w-full"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 
                   .8954-2 2 .8954 2 2 2z M4 20h16v-2a4 4 
                   0 00-4-4H8a4 4 0 00-4 4v2z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        AI-Powered Job Matching
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Upload your resume and get personalized job recommendations
                    </p>
                    <ResumeUpload onUpload={handleResumeUpload} />
                </div>

                {/* ─── JOB GRID (One job per row) ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                    {jobs.length > 0 ? (
                        jobs.map((job, i) => <JobCard key={i} job={job} />)
                    ) : (
                        <p className="text-center text-gray-500">No job listings to show.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
