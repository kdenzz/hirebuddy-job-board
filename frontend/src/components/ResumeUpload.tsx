import { useCallback, useState } from "react";

interface ResumeUploadProps {
    onUpload: (roles: string[], jobsFromResume: any[]) => void;
}

export default function ResumeUpload({ onUpload }: ResumeUploadProps) {
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFile = useCallback(
        async (file: File) => {
            setError(null);
            setUploading(true);
            setFileName(file.name);
            const formData = new FormData();
            formData.append("resume", file);

            try {
                const res = await fetch("https://hirebuddy-job-board.onrender.com/api/resume/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                const data = await res.json();
                onUpload(data.roles || [], data.jobs || []);
            } catch (e: any) {
                console.error("Upload error:", e);
                setError("Failed to upload. Please try again.");
                onUpload([], []);
            } finally {
                setUploading(false);
            }
        },
        [onUpload]
    );

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

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex justify-center">
            <div
                className={`
                    w-full max-w-lg border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer 
                    ${dragOver ? "border-blue-400 bg-blue-50" : "border-blue-300 bg-white"}
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
                    className="flex flex-col items-center justify-center text-center space-y-3"
                >
                    {uploading ? (
                        <svg
                            className="animate-spin h-8 w-8 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                    ) : (
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
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 
                                12V3m0 0l-3.5 3.5M12 3l3.5 3.5"
                            />
                        </svg>
                    )}

                    <p className="text-blue-600 font-medium">
                        {uploading
                            ? "Uploading your resume..."
                            : "Drag & drop your resume here, or "}
                        {!uploading && <span className="underline">click to select</span>}
                    </p>

                    {fileName && !uploading && (
                        <p className="text-sm text-gray-500">Selected: {fileName}</p>
                    )}
                </label>

                {error && (
                    <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
                )}
            </div>
        </div>
    );
}
