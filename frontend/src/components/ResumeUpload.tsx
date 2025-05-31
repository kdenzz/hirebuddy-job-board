// src/components/ResumeUpload.tsx
import React, { useCallback, useState } from "react";

interface ResumeUploadProps {
    // `onUpload` will be called with two arguments:
    // 1) an array of predicted roles (strings)
    // 2) an array of Job objects (if the backend returns matched jobs immediately)
    onUpload: (roles: string[], jobsFromResume: any[]) => void;
}

export default function ResumeUpload({ onUpload }: ResumeUploadProps) {
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // When a file is dropped or selected, this handles the upload
    const handleFile = useCallback(
        async (file: File) => {
            setError(null);
            const formData = new FormData();
            formData.append("resume", file);

            try {
                const res = await fetch("/api/resume/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) {
                    throw new Error(`Server returned ${res.status}`);
                }
                const data = await res.json();
                // `data.roles` = array of predicted roles, 
                // `data.jobs`  = array of job objects (if returned)
                onUpload(data.roles || [], data.jobs || []);
            } catch (e: any) {
                console.error("Upload error:", e);
                setError("Failed to upload. Please try again.");
                onUpload([], []);
            }
        },
        [onUpload]
    );

    // Drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = () => setDragOver(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    // File-input handler for “click to select”
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex justify-center">
            <div
                className={`
          w-full max-w-lg
          border-2 border-dashed 
          ${dragOver ? "border-blue-400" : "border-blue-300"}
          bg-white
          rounded-lg
          p-6
          transition-colors
        `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".pdf, .doc, .docx, .txt"
                    className="hidden"
                    id="resume-upload-input"
                    onChange={handleSelect}
                />

                <label
                    htmlFor="resume-upload-input"
                    className="cursor-pointer flex flex-col items-center justify-center text-center space-y-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0
                 003 3h10a3 3 0 003-3v-1M12 
                 12V3m0 0l-3.5 3.5M12 3l3.5
                 3.5"
                        />
                    </svg>
                    <p className="text-blue-600 font-medium">
                        Drag & drop your resume here, or <span className="underline">click to select</span>
                    </p>
                </label>

                {error && (
                    <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
                )}
            </div>
        </div>
    );
}
