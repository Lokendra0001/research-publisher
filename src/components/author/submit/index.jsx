"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
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
    X
} from "lucide-react";
import { notify } from "@/utils/toast";

const Submit = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const { paperId } = useParams();
    const { register, control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            abstract: "",
            keywords: "",
            category: "",
            researchType: "Original Research",
            coAuthors: []
        }
    });



    const { fields, append, remove } = useFieldArray({
        control,
        name: "coAuthors"
    });

    const getPaperDetail = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${constant.SERVER_URL}papers/${paperId}`, { withCredentials: true });
            const paperData = res.data.data;

            if (res.data.success) {

                reset({
                    title: paperData.title || "",
                    abstract: paperData.abstract || "",
                    keywords: Array.isArray(paperData.keywords)
                        ? paperData.keywords.join(", ")
                        : "",
                    category: paperData.category || "",
                    researchType: paperData.researchType || "Original Research",
                    coAuthors: paperData.coAuthors || []
                });
                setSelectedFile({ name: paperData.manuscriptName, url: paperData.manuscriptUrl, size: paperData.manuscriptSize })
            }
        } catch (error) {
            notify.error(error.message)
        } finally {
            setLoading(false)
        }
    }

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
            // 1. Prepare Metadata
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
            };

    

            for (let key in payload) {
                formData.append(key, payload[key])
            }

            if (selectedFile instanceof File) {
                formData.append('manuscript', selectedFile);
            }

            const request = paperId
                ? axios.put(`${constant.SERVER_URL}papers/${paperId}`, formData, { withCredentials: true })
                : axios.post(`${constant.SERVER_URL}papers/submit`, formData, { withCredentials: true });

            const res = await request;

            notify.success(res.data?.message);


            if (res.data.success) {
                router.push(`/author/papers/${paperId ?? res.data.data.id}`);
            }



        } catch (error) {
            console.error("Submission Error:", error);
            const msg = error.response?.data?.message || "An error occurred during submission.";
            notify.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (paperId) getPaperDetail();
    }, [paperId])


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-background to-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {paperId ? "Update" : "Submit"} Your Research
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Share your work with the global community. Please ensure your manuscript follows our submission guidelines.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
                    {/* Progress Indicator (Optional visual) */}
                    <div className="bg-secondary/30 h-1.5 w-full">
                        <div className="h-full bg-primary w-1/2 rounded-r-full" />
                        {/* dynamic width based on step if multipage, strictly keeping it 50% or full for now */}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">

                        {/* Section 1: Paper Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground pb-2 border-b border-border">
                                <FileText className="w-5 h-5 text-primary" />
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
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
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
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
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
                                        className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Social Sciences">Social Sciences</option>
                                        <option value="Physics">Physics</option>
                                        <option value="Mathematics">Mathematics</option>
                                        {/* Add more as needed */}
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
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
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
                                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                    placeholder="e.g. Machine Learning, Neural Networks, Optimization (comma separated)"
                                />
                                {errors.keywords && <span className="text-xs text-danger mt-1">{errors.keywords.message}</span>}
                            </div>
                        </div>

                        {/* Section 2: Authors */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-2 border-b border-border">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                                    <UserIcon className="w-5 h-5 text-primary" />
                                    Co-Authors
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => append({ name: "", email: "", institution: "" })}
                                    className="text-sm flex items-center gap-1 text-primary hover:text-primary/80 font-medium"
                                >
                                    <Plus className="w-4 h-4" /> Add Author
                                </button>
                            </div>

                            {fields.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">No co-authors added. You will be listed as the sole author.</p>
                            )}

                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start bg-secondary/20 p-4 rounded-lg border border-border/50">
                                        <div className="flex-1 w-full">
                                            <input
                                                {...register(`coAuthors.${index}.name`, { required: true })}
                                                placeholder="Name"
                                                className="w-full rounded-md border border-input px-3 py-1.5 text-sm"
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                {...register(`coAuthors.${index}.email`, { required: true })}
                                                placeholder="Email"
                                                type="email"
                                                className="w-full rounded-md border border-input px-3 py-1.5 text-sm"
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                {...register(`coAuthors.${index}.institution`, { required: true })}
                                                placeholder="Institution"
                                                className="w-full rounded-md border border-input px-3 py-1.5 text-sm"
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
                                <Upload className="w-5 h-5 text-primary" />
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
                                        <div className="p-4 bg-primary/10 rounded-full text-primary mb-2">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <span className="text-lg font-medium text-foreground">Click to upload manuscript</span>
                                        <span className="text-sm text-muted-foreground">PDF, DOC, DOCX (Max 10MB)</span>
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-center gap-4 bg-primary/5 p-4 rounded-xl border border-primary/20">
                                        <FileText className="w-8 h-8 text-primary" />
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
                                className="bg-primary text-primary-foreground text-lg px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {paperId ? "Updating" : "Submitting..."}
                                    </>
                                ) : (
                                    <>
                                        {paperId ? "Update" : "Submit"} Research
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

// Simple User Icon component for the co-author section
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

export default Submit;
