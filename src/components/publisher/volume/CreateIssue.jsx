"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../common/Input";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";

const FormSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded-none" />
            <div className="h-12 w-full bg-muted/60 rounded-none" />
        </div>
        <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded-none" />
            <div className="h-12 w-full bg-muted/60 rounded-none" />
        </div>
        <div className="space-y-2">
            <div className="h-4 w-32 bg-muted rounded-none" />
            <div className="h-24 w-full bg-muted/60 rounded-none" />
        </div>
        <div className="h-12 w-full bg-muted rounded-none mt-4" />
    </div>
);

const CreateIssue = () => {
    const [volumes, setVolumes] = useState([]);
    const [loadingVolumes, setLoadingVolumes] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            volumeId: "",
            issueNumber: "",
            description: "",
            year: ""
        }
    });

    const fetchVolumes = async () => {
        try {
            setLoadingVolumes(true);
            const res = await axios.get(`${constant.SERVER_URL}admin/volumes`, { withCredentials: true });
            if (res.data.success) {
                setVolumes(res.data.data);
            }
        } catch (error) {
            console.error(error);
            notify.error("Failed to load volumes");
        } finally {
            setLoadingVolumes(false);
        }
    };

    useEffect(() => {
        fetchVolumes();
    }, []);

    const selectedVolumeId = watch("volumeId");

    useEffect(() => {
        if (selectedVolumeId) {
            const vol = volumes.find(v => v.id === selectedVolumeId);
            if (vol) {
                setValue("year", vol.year);
            }
        }
    }, [selectedVolumeId, volumes, setValue]);

    const onSubmit = async (data) => {
        try {
            const year = volumes.find((volume) => volume.id == data?.volumeId)?.year;

            const res = await axios.post(`${constant.SERVER_URL}admin/issues`, {
                issueNumber: data?.issueNumber,
                volumeId: data?.volumeId,
                year,
            }, { withCredentials: true });

            if (res.data.success) {
                notify.success(res.data.message);
                reset();
            } else {
                notify.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            notify.error(err?.response?.data?.message || "Failed to create issue");
        }
    };

    if (loadingVolumes) {
        return <FormSkeleton />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">

            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Volume</label>
                <select
                    className={`flex h-12 w-full border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 rounded-none shadow-none ${errors.volumeId ? 'border-red-500' : ''}`}
                    {...register("volumeId", { required: "Please select a volume" })}
                >
                    <option value="">Select a Volume</option>
                    {volumes.map((vol) => (
                        <option key={vol.id} value={vol.id}>
                            Volume {vol.volumeNumber} ({vol.year})
                        </option>
                    ))}
                </select>
                {errors.volumeId && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.volumeId.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Issue</label>
                <select
                    className={`flex h-12 w-full border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 rounded-none shadow-none ${errors.issueNumber ? 'border-red-500' : ''}`}
                    {...register("issueNumber", { required: "Please select an issue" })}
                >
                    <option value="">Select Issue</option>
                    <option value="1">Issue 1 (Jan - Mar)</option>
                    <option value="2">Issue 2 (Apr - Jun)</option>
                    <option value="3">Issue 3 (Jul - Sep)</option>
                    <option value="4">Issue 4 (Oct - Dec)</option>
                </select>
                {errors.issueNumber && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.issueNumber.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Description (Optional)</label>
                <textarea
                    className="flex w-full border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 min-h-[100px] rounded-none shadow-none"
                    placeholder="Enter issue description..."
                    {...register("description")}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-secondary-foreground px-4 py-3 font-medium hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed rounded-none shadow-none"
            >
                {isSubmitting ? "Creating Issue..." : "Create Issue"}
            </button>
        </form>
    );
};

export default CreateIssue;
