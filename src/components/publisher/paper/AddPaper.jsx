"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { constant } from "@/utils/constant";
import {
    Upload,
    FileText,
    Plus,
    Trash2,
    CheckCircle,
    Loader2,
    X,
    User as UserIconLib
} from "lucide-react";
import { notify } from "@/utils/toast";

const AddPaper = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [volumes, setVolumes] = useState([]);
    const [issues, setIssues] = useState([]);
    const [currentIssue, setCurrentIssues] = useState([])
    const [loadingVolumes, setLoadingVolumes] = useState(false);
    const [loadingIssues, setLoadingIssues] = useState(false);

    const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            abstract: "",
            keywords: "",
            category: "",
            researchType: "Original Research",
            authorName: "",
            authorEmail: "",
            coAuthors: [],
            volumeId: "",
            issueId: ""
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "coAuthors"
    });

    const watchedVolumeId = watch("volumeId");

    // Fetch Volumes
    useEffect(() => {
        const fetchVolumes = async () => {
            try {
                setLoadingVolumes(true);
                const res = await axios.get(`${constant.SERVER_URL}admin/volumes`, { withCredentials: true });
                if (res.data.success) {
                    setVolumes(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch volumes", error);
                notify.error("Failed to fetch volumes");
            } finally {
                setLoadingVolumes(false);
            }
        };
        const fetchIssues = async () => {
            try {
                setLoadingIssues(true);
                const res = await axios.get(`${constant.SERVER_URL}admin/issues`, { withCredentials: true });
                if (res.data.success) {

                    setIssues(res.data.issues);
                }
            } catch (error) {
                console.error("Failed to fetch issues", error);
                notify.error("Failed to fetch issues");
            } finally {
                setLoadingIssues(false);
            }
        };
        fetchVolumes();
        fetchIssues();
    }, []);


    useEffect(() => {
        if (watchedVolumeId && issues) {
            const cIssues = issues.filter(
                (issue) => String(issue.volumeId) === String(watchedVolumeId)
            );
            setCurrentIssues(cIssues);
        } else {
            setCurrentIssues([]);
        }
    }, [watchedVolumeId, issues]);



    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onSubmit = async (data) => {
        if (!selectedFile) {
            toast.error("Please upload a manuscript file.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();

            // Prepare Keywords
            const keywordArray = data.keywords
                .split(",")
                .map((k) => k.trim())
                .filter((k) => k.length > 0);

            const payload = {
                title: data.title,
                abstract: data.abstract,
                keywords: JSON.stringify(keywordArray),
                category: data.category,
                researchType: data.researchType,
                coAuthors: JSON.stringify(data.coAuthors),
                volumeId: data.volumeId,
                issueId: data.issueId,
                authorName: data.authorName, // Added
                authorEmail: data.authorEmail // Added
            };

            for (let key in payload) {
                formData.append(key, payload[key]);
            }

            if (selectedFile instanceof File) {
                formData.append('manuscript', selectedFile);
            }

            const res = await axios.post(`${constant.SERVER_URL}papers/submit`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                notify.success("Paper added successfully!");
                reset();
                setSelectedFile(null);
            }

        } catch (error) {
            console.error("Submission Error:", error);
            const msg = error.response?.data?.message || "An error occurred during submission.";
            notify.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent py-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                        Add New Paper
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Manually add a paper to a specific Volume and Issue.
                    </p>
                </div>

                {/* Form Container - Simple, no excessive shadows or borders, using plain bg-white or subtle simple container */}
                <div className="bg-transparent space-y-8">


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-0">

                        {/* Section 0: Volume & Issue Selection */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground pb-2 border-b border-border">
                                <FileText className="w-5 h-5 text-secondary" />
                                Publication Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Volume <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("volumeId", { required: "Volume is required" })}
                                        className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all placeholder:text-muted-foreground"
                                        disabled={loadingVolumes}
                                        style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    >
                                        <option value="">Select Volume</option>
                                        {volumes.map(vol => (
                                            <option key={vol.id} value={vol.id}>Volume {vol.volumeNumber} ({vol.year})</option>
                                        ))}
                                    </select>
                                    {errors.volumeId && <span className="text-xs text-danger mt-1">{errors.volumeId.message}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Issue <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("issueId", { required: "Issue is required" })}
                                        className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                        disabled={loadingIssues || !watchedVolumeId}
                                        style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    >
                                        <option value="">Select Issue</option>
                                        {currentIssue.map(issue => (
                                            <option key={issue.id} value={issue.id}>Issue {issue.issueNumber} ({issue.title})</option>
                                        ))}
                                    </select>
                                    {errors.issueId && <span className="text-xs text-danger mt-1">{errors.issueId.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Section 0.5: secondary Author Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground pb-2 border-b border-border">
                                <UserIconLib className="w-5 h-5 text-secondary" />
                                secondary Author Details
                            </h2>
                            <p className="text-sm text-muted-foreground">This user will be linked as the main author. If no account exists, one will be created.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Author Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("authorName", { required: "Author Name is required" })}
                                        className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                        style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                        placeholder="e.g. Dr. John Doe"
                                    />
                                    {errors.authorName && <span className="text-xs text-danger mt-1">{errors.authorName.message}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Author Email <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("authorEmail", {
                                            required: "Author Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                        style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                        placeholder="e.g. john.doe@university.edu"
                                    />
                                    {errors.authorEmail && <span className="text-xs text-danger mt-1">{errors.authorEmail.message}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Section 1: Paper Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground pb-2 border-b border-border">
                                <FileText className="w-5 h-5 text-secondary" />
                                Paper Details
                            </h2>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Paper Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                    style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    placeholder="e.g. Analysis of Quantum Entanglement..."
                                />
                                {errors.title && <span className="text-xs text-danger mt-1">{errors.title.message}</span>}
                            </div>

                            {/* Keywords & Type */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Research Type <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("researchType", { required: true })}
                                        className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                        style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    >
                                        <option value="Original Research">Original Research</option>
                                        <option value="Review Article">Review Article</option>
                                        <option value="Case Study">Case Study</option>
                                        <option value="Short Communication">Short Communication</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1">
                                        Category <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("category", { required: "Category is required" })}
                                        className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                        style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Social Sciences">Social Sciences</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Mathematics">Mathematics</option>
                                    </select>
                                    {errors.category && <span className="text-xs text-danger mt-1">{errors.category.message}</span>}
                                </div>
                            </div>

                            {/* Abstract */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Abstract <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    rows={6}
                                    {...register("abstract", { required: "Abstract is required", minLength: { value: 50, message: "Abstract must be at least 50 characters" } })}
                                    className="w-full bg-secondary rounded-none border border-input px-4 py-2 text-foreground  outline-none transition-all resize-none"
                                    style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    placeholder="Enter a concise summary of your research..."
                                />
                                {errors.abstract && <span className="text-xs text-danger mt-1">{errors.abstract.message}</span>}
                            </div>

                            {/* Keywords Input */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Keywords <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("keywords", { required: "Keywords are required" })}
                                    className="w-full bg-secondary rounded-none border-b border-input px-4 py-2 text-foreground focus:ring-0 focus:border-secondary outline-none transition-all"
                                    style={{ borderBottomWidth: '2px', background: 'transparent' }}
                                    placeholder="e.g. Machine Learning, Neural Networks, Optimization (comma separated)"
                                />
                                {errors.keywords && <span className="text-xs text-danger mt-1">{errors.keywords.message}</span>}
                            </div>
                        </div>

                        {/* Section 2: Authors */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                                    <UserIcon className="w-5 h-5 text-secondary" />
                                    Co-Authors
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => append({ name: "", email: "", institution: "" })}
                                    className="text-sm flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium"
                                >
                                    <Plus className="w-4 h-4" /> Add Author
                                </button>
                            </div>

                            {fields.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">Add co-authors if applicable.</p>
                            )}

                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start bg-secondary/20 p-4 rounded-lg border border-border/50">
                                        <div className="flex-1 w-full">
                                            <input
                                                {...register(`coAuthors.${index}.name`, { required: true })}
                                                placeholder="Name"
                                                className="w-full bg-transparent border-b border-input px-3 py-1.5 text-sm outline-none focus:border-secondary"
                                                style={{ borderBottomWidth: '1px' }}
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                {...register(`coAuthors.${index}.email`, { required: true })}
                                                placeholder="Email"
                                                type="email"
                                                className="w-full bg-transparent border-b border-input px-3 py-1.5 text-sm outline-none focus:border-secondary"
                                                style={{ borderBottomWidth: '1px' }}
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                {...register(`coAuthors.${index}.institution`, { required: true })}
                                                placeholder="Institution"
                                                className="w-full bg-transparent border-b border-input px-3 py-1.5 text-sm outline-none focus:border-secondary"
                                                style={{ borderBottomWidth: '1px' }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-danger hover:text-red-700 p-1.5"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 3: Manuscript Upload */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground pb-2 border-b border-border">
                                <Upload className="w-5 h-5 text-secondary" />
                                Manuscript File
                            </h2>

                            <div className="border-2 border-dashed border-border rounded-xl p-8 hover:bg-secondary/10 transition-colors text-center">
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {!selectedFile ? (
                                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                        <div className="p-4 bg-secondary/10 rounded-full text-secondary mb-2">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <span className="text-lg font-medium text-foreground">Click to upload manuscript</span>
                                        <span className="text-sm text-muted-foreground">PDF, DOC, DOCX (Max 10MB)</span>
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-center gap-4 bg-secondary/5 p-4 rounded-xl border border-secondary/20">
                                        <FileText className="w-8 h-8 text-secondary" />
                                        <div className="text-left">
                                            <p className="font-medium text-foreground">{selectedFile.name}</p>
                                            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFile(null)}
                                            className="p-1 hover:bg-danger/10 rounded-full text-muted-foreground hover:text-danger ml-2"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-6 border-t border-border flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-secondary text-secondary-foreground text-lg px-8 py-3 rounded-none font-bold shadow-none hover:bg-secondary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding Paper...
                                    </>
                                ) : (
                                    <>
                                        Add Paper
                                        <CheckCircle className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

// Simple User Icon component
function UserIcon({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

export default AddPaper;
