"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { notify } from '../../utils/toast';
import { Loader2 } from 'lucide-react';
import { registerUser } from '@/redux/slices/auth/authSliceThungs';
import Input from '../common/Input';

const SignUp = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("author");
    const [cvFile, setCvFile] = useState(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password");

    const onSubmit = async (data) => {
        if ((role === 'reviewer') && !cvFile) {
            notify.error("Please upload your CV");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();

            // Core common fields
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('role', role);
            formData.append('mobile', data.mobile || '');
            formData.append('country', data.country || '');

            if (data.address) formData.append('address', data.address);
            if (data.designation) formData.append('designation', data.designation);

            if (role === 'author') {
                // Author specific logic
            } else if ((role === 'reviewer')) {
                formData.append('university', data.university || '');
                formData.append('institution', data.university || '');
                formData.append('affiliation', data.affiliation || '');
                formData.append('journalName', data.journalName || '');
                formData.append('researchInterests', data.researchInterests || '');

                if (cvFile) {
                    formData.append('cv', cvFile);
                }
            }

            const result = await dispatch(registerUser(formData)).unwrap();

            if (result?.isReviewer) {
                router.replace('/');
            } else if (result?.role) {
                router.replace(`/${result.role}`);
            }
        } catch (error) {
            console.error("Signup error:", error);
            notify.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto md:px-4 py-8 font-sans">
            <h1 className="text-3xl font-bold text-primary-blue mb-6">Sign Up / Register</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Registration Form */}
                <div className="flex-1">
                    {/* Tab Navigation */}
                    <div className="flex justify-start ">
                        <div className="flex space-x-1">
                            <button
                                type="button"
                                onClick={() => setRole('author')}
                                className={`px-8 py-2.5 font-bold text-sm rounded-t-md border-t border-l border-r transition-colors ${role === 'author'
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-border/50 text-text-primary/70 hover:bg-border border-border'
                                    }`}
                            >
                                Author
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('reviewer')}
                                className={`px-8 py-2.5 font-bold text-sm rounded-t-md border-t border-l border-r transition-colors ${(role === 'reviewer')
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-border/50 text-text-primary/70 hover:bg-border border-border'
                                    }`}
                            >
                                Reviewer
                            </button>
                         
                        </div>
                    </div>

                    {/* Main Form Container */}
                    <div className="border border-border rounded-tl-none rounded-sm">
                        {/* Form Header */}
                        <div className="bg-border/50 px-3 md:px-4 py-3 border-b border-border border-dotted mb-4">
                            <h2 className="text-lg font-bold text-text-primary/70">
                                <span className='capitalize'>{role}</span> Registration Form <span className="text-danger text-sm font-normal">(*Required)</span>
                            </h2>
                        </div>

                        {/* Form Content */}
                        <div className="px-3 md:px-6 pb-6 pt-2">
                            {/* Dashed Separator Line */}
                            <div className="border-b border-border border-dashed mb-6"></div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    {/* Full Name Field */}
                                    <div className="bg-border/50 p-4 rounded-sm">
                                        <div className="mb-1">
                                            <span className="text-danger mr-1">*</span>
                                            <label className="font-bold text-text-primary text-sm">Full Name</label>
                                        </div>
                                        <Input
                                            placeholder="enter full name here"
                                            type="text"
                                            {...register("name", { required: "Full Name is required" })}
                                            error={errors.name}
                                            className="bg-primary-foreground border-border h-10"
                                        />
                                    </div>

                                    {/* Email & Mobile */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-border/50 p-4 rounded-sm">
                                            <div className="mb-1">
                                                <span className="text-danger mr-1">*</span>
                                                <label className="font-bold text-text-primary text-sm">Email</label>
                                            </div>
                                            <Input
                                                placeholder="enter email here"
                                                type="email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                error={errors.email}
                                                className="bg-primary-foreground border-border h-10"
                                            />
                                        </div>
                                        <div className="bg-border/50 p-4 rounded-sm">
                                            <div className="mb-1">
                                                <span className="text-danger mr-1">*</span>
                                                <label className="font-bold text-text-primary text-sm">Mobile No.</label>
                                            </div>
                                            <Input
                                                placeholder="enter mobile number here"
                                                type="text"
                                                {...register("mobile", { required: "Mobile number is required" })}
                                                error={errors.mobile}
                                                className="bg-primary-foreground border-border h-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Address & Country */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-border/50 p-4 rounded-sm">
                                            <div className="mb-1">
                                                <label className="font-bold text-text-primary text-sm">Address</label>
                                            </div>
                                            <Input
                                                placeholder="enter address here"
                                                type="text"
                                                {...register("address")}
                                                className="bg-primary-foreground border-border h-10"
                                            />
                                        </div>
                                        <div className="bg-border/50 p-4 rounded-sm">
                                            <div className="mb-1">
                                                <span className="text-danger mr-1">*</span>
                                                <label className="font-bold text-text-primary text-sm">Country</label>
                                            </div>
                                            <select
                                                {...register("country", { required: "Country is required" })}
                                                className="w-full h-10 px-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring bg-primary-foreground"
                                            >
                                                <option value="">Select Country</option>
                                                <option value="India">India</option>
                                                <option value="USA">USA</option>
                                                <option value="UK">UK</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors.country && <p className="text-xs text-danger mt-1">{errors.country.message}</p>}
                                        </div>
                                    </div>

                                    {/* Designation */}
                                    <div className="bg-border/50 p-4 rounded-sm">
                                        <div className="mb-1">
                                            <label className="font-bold text-text-primary text-sm">Designation</label>
                                        </div>
                                        <Input
                                            placeholder="enter designation here"
                                            type="text"
                                            {...register("designation")}
                                            className="bg-primary-foreground border-border h-10"
                                        />
                                    </div>

                                    {/* Reviewer Specific Fields */}
                                    {(role === 'reviewer') && (
                                        <>
                                            {/* University & Affiliation */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-border/50 p-4 rounded-sm">
                                                    <div className="mb-1">
                                                        <span className="text-danger mr-1">*</span>
                                                        <label className="font-bold text-text-primary text-sm">University</label>
                                                    </div>
                                                    <Input
                                                        placeholder="enter university here"
                                                        type="text"
                                                        {...register("university", { required: "University is required" })}
                                                        error={errors.university}
                                                        className="bg-primary-foreground border-border h-10"
                                                    />
                                                </div>
                                                <div className="bg-border/50 p-4 rounded-sm">
                                                    <div className="mb-1">
                                                        <span className="text-danger mr-1">*</span>
                                                        <label className="font-bold text-text-primary text-sm">Affiliation</label>
                                                    </div>
                                                    <Input
                                                        placeholder="enter affiliation here"
                                                        type="text"
                                                        {...register("affiliation", { required: "Affiliation is required" })}
                                                        error={errors.affiliation}
                                                        className="bg-primary-foreground border-border h-10"
                                                    />
                                                </div>
                                            </div>

                                            {/* Journal Name & Upload CV */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-border/50 p-4 rounded-sm">
                                                    <div className="mb-1">
                                                        <span className="text-danger mr-1">*</span>
                                                        <label className="font-bold text-text-primary text-sm">Journal Name</label>
                                                    </div>
                                                    <Input
                                                        placeholder="enter journal name here"
                                                        type="text"
                                                        {...register("journalName", { required: "Journal Name is required" })}
                                                        error={errors.journalName}
                                                        className="bg-primary-foreground border-border h-10"
                                                    />
                                                </div>
                                                <div className="bg-border/50 p-4 rounded-sm">
                                                    <div className="mb-1">
                                                        <span className="text-danger mr-1">*</span>
                                                        <label className="font-bold text-text-primary text-sm">Upload CV</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <label className="cursor-pointer bg-primary/90 hover:bg-primary border border-border text-text-secondary px-3 py-2 rounded-sm text-sm font-bold transition-colors">
                                                            Choose file
                                                            <input
                                                                type="file"
                                                                accept=".pdf,.doc,.docx"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) setCvFile(file);
                                                                }}
                                                            />
                                                        </label>
                                                        <span className="text-muted-foreground text-sm">{cvFile ? cvFile.name : "No file chosen"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Research Interests */}
                                            <div className="bg-border/50 p-4 rounded-sm">
                                                <div className="mb-1">
                                                    <span className="text-danger mr-1">*</span>
                                                    <label className="font-bold text-text-primary text-sm">Research Interests</label>
                                                </div>
                                                <textarea
                                                    {...register("researchInterests", { required: "Research Interests are required" })}
                                                    rows={3}
                                                    placeholder="enter your research interests here"
                                                    className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y bg-primary-foreground"
                                                ></textarea>
                                                {errors.researchInterests && <p className="text-xs text-danger mt-1">{errors.researchInterests.message}</p>}
                                            </div>
                                        </>
                                    )}

                                    {/* Password Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-border/50 p-4 rounded-sm">
                                            <div className="mb-1">
                                                <span className="text-danger mr-1">*</span>
                                                <label className="font-bold text-text-primary text-sm">Password</label>
                                            </div>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 chars" } })}
                                                error={errors.password}
                                                className="bg-primary-foreground border-border h-10"
                                            />
                                        </div>
                                        <div className="bg-border/50 p-4 rounded-sm">
                                            <div className="mb-1">
                                                <span className="text-danger mr-1">*</span>
                                                <label className="font-bold text-text-primary text-sm">Re-Enter Password</label>
                                            </div>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                {...register("confirmPassword", {
                                                    required: "Confirm Password is required",
                                                    validate: val => val === password || "Passwords do not match"
                                                })}
                                                error={errors.confirmPassword}
                                                className="bg-primary-foreground border-border h-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-primary-blue/90 hover:bg-primary-blue text-primary-foreground px-6 py-2 rounded-sm text-sm font-bold cursor-pointer transition-colors disabled:opacity-70 flex items-center gap-2"
                                        >
                                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                            Register
                                        </button>
                                        <div className="text-sm text-text-primary/70">
                                            Already have an account? <Link href="/signin" className="text-primary-blue/70 hover:text-primary-blue hover:underline font-bold">Click Here</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
