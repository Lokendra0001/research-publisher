"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../common/Input";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";

const CreateVolume = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        defaultValues: {
            year: "",
            description: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${constant.SERVER_URL}admin/volumes`, {
                year: Number(data.year),
                description: data.description
            }, { withCredentials: true });

            if (res.data.success) {
                notify.success(res.data.message);
                reset();
            } else {
                notify.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            notify.error(error?.response?.data?.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="space-y-2">
                <Input
                    label="Year"
                    type="number"
                    placeholder="Enter Year (e.g. 2026)"
                    error={errors.year}
                    className="rounded-none shadow-none focus:ring-0"
                    {...register("year", {
                        required: "Year is required",
                        min: { value: 2000, message: "Year must be 2000 or later" }
                    })}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Description (Optional)</label>
                <textarea
                    className="flex w-full border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 min-h-[100px] rounded-none shadow-none"
                    placeholder="Enter volume description..."
                    {...register("description")}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-secondary-foreground px-4 py-3 font-medium hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed rounded-none shadow-none"
            >
                {isSubmitting ? "Creating Volume..." : "Create Volume"}
            </button>
        </form>
    );
};

export default CreateVolume;
