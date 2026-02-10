"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Loader2, User, Mail, Briefcase, Building, FileText, Save, CheckCircle2, Award } from 'lucide-react';
import Image from 'next/image';

const UpdateProfile = () => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [preview, setPreview] = useState(null);

    // Form state
    const [initialData, setInitialData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        institution: '',
        university: '',
        department: '',
        designation: '',
        affiliation: '',
        orcidId: '',
        mobile: '',
        address: '',
        country: '',
        bio: '',
        researchInterests: '',
        profileImage: '',
        cvUrl: ''
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}users/me`, {
                withCredentials: true
            });

            if (res.data.success) {
                const user = res.data.data;
                const userData = {
                    name: user.name || '',
                    email: user.email || '',
                    role: user.role || 'author',
                    institution: user.institution || '',
                    university: user.university || '',
                    department: user.department || '',
                    designation: user.designation || '',
                    affiliation: user.affiliation || '',
                    orcidId: user.orcidId || '',
                    mobile: user.mobile || '',
                    address: user.address || '',
                    country: user.country || '',
                    bio: user.bio || '',
                    researchInterests: user.researchInterests || '',
                    profileImage: user.profileImage || '',
                    cvUrl: user.cvUrl || ''
                };
                setFormData(userData);
                setInitialData(userData);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            notify.error("Failed to load profile data.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        // Validation & Input Restriction
        if (name === 'mobile') {
            // Only numbers, max 10
            newValue = value.replace(/\D/g, '').slice(0, 10);
        } else if (name === 'orcidId') {
            // Only numbers, max 16
            newValue = value.replace(/\D/g, '').slice(0, 16);
        }

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const isDataChanged = () => {
        if (selectedProfile) return true;
        if (!initialData) return false;
        return JSON.stringify(formData) !== JSON.stringify(initialData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Checks
        if (formData.mobile && formData.mobile.length !== 10) {
            notify.error("Mobile number must be exactly 10 digits.");
            return;
        }

        if (formData.orcidId && formData.orcidId.length !== 16) {
            notify.error("ORCID ID must be exactly 16 digits.");
            return;
        }


        setSubmitting(true);
        try {
            const data = new FormData();

            // Append text fields
            Object.keys(formData).forEach(key => {
                if (key !== 'profileImage') {
                    data.append(key, formData[key]);
                }
            });

            // Append file if selected
            if (selectedProfile) {
                data.append('profile', selectedProfile);
            }

            const res = await axios.put(`${constant.SERVER_URL}users/me`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                notify.success("Profile updated successfully!");
                // Update local state with new image if returned
                if (res.data.data.profileImage) {
                    setFormData(prev => ({ ...prev, profileImage: res.data.data.profileImage }));
                }

                // Update initial data to sync with saved state
                const updatedData = { ...formData };
                if (res.data.data.profileImage) {
                    updatedData.profileImage = res.data.data.profileImage;
                }
                setInitialData(updatedData);

                setSelectedProfile(null);
            } else {
                notify.error(res.data.message || "Failed to update profile.");
            }
        } catch (error) {
            console.error("Update error:", error);
            notify.error(error.response?.data?.message || "An error occurred while updating profile.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!selectedProfile) return;

        const previewUrl = URL.createObjectURL(selectedProfile);
        console.log(previewUrl)

        setPreview(previewUrl)

        return () => URL.revokeObjectURL(previewUrl);
    }, [selectedProfile]);


    if (loading) {
        return (
            <div className="max-w-5xl mx-auto py-12 animate-pulse">
                {/* Header Skeleton */}
                <div className="flex items-end mb-10">
                    <div className="p-1 bg-gray-100 rounded-full">
                        <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white"></div>
                    </div>
                    <div className="mb-3 ml-4 space-y-2">
                        <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
                        <div className="h-5 w-24 bg-teal-50 rounded-full"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                            <div className="h-6 w-32 bg-gray-200 rounded"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-3 w-20 bg-gray-100 rounded"></div>
                                        <div className="h-10 w-full bg-gray-50 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                            <div className="h-6 w-48 bg-gray-200 rounded"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-100 rounded"></div>
                                        <div className="h-10 w-full bg-gray-50 rounded-lg"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                            <div className="h-6 w-40 bg-gray-200 rounded"></div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="h-4 w-20 bg-gray-100 rounded"></div>
                                    <div className="h-24 w-full bg-gray-50 rounded-lg"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-100 rounded"></div>
                                    <div className="h-20 w-full bg-gray-50 rounded-lg"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <div className="h-12 w-40 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 ">

            {/* Header Section */}
            <div className="relative ">

                <div className=" flex items-end">
                    <div className="p-1 bg-white rounded-full shadow-md">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white text-gray-400">
                            <div className="relative h-full w-full rounded-full overflow-hidden grid place-items-center">
                                {/* File input (always present) */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setSelectedProfile(file);
                                    }}
                                />

                                {/* Content */}
                                {preview || formData.profileImage ? (
                                    <img
                                        src={preview || formData.profileImage}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User className="w-12 h-12 text-muted-foreground" />
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="mb-3 ml-4">
                        <h1 className="text-2xl font-bold text-gray-900">{formData.name || 'Your Name'}</h1>
                        <p className="text-sm font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-block border border-teal-100">
                            {formData.designation || 'Scholar'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Personal Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-teal-500" />
                            Personal Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full px-3 py-2 text-sm border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
                                    />
                                    <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="+91..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Academic & Bio */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-6">

                        {/* Academic Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                                <Award className="w-5 h-5 text-teal-500" />
                                Academic Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        placeholder="University/Institute Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">University (Optional)</label>
                                    <input
                                        type="text"
                                        name="university"
                                        value={formData.university}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        placeholder="If different from Institution"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                {formData.role === 'reviewer' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                                        <input
                                            type="text"
                                            name="affiliation"
                                            value={formData.affiliation}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                {formData.role === 'reviewer' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ORCID ID</label>
                                        <input
                                            type="text"
                                            name="orcidId"
                                            value={formData.orcidId}
                                            onChange={handleChange}
                                            placeholder="0000-0000-0000-0000"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bio & Interests Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-teal-500" />
                                Professional Profile
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none text-sm"
                                        placeholder="Short professional biography..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Research Interests</label>
                                    <textarea
                                        name="researchInterests"
                                        value={formData.researchInterests}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none text-sm"
                                        placeholder="e.g. Artificial Intelligence, Machine Learning, Data Science..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={submitting || !isDataChanged()}
                                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:from-teal-700 hover:to-teal-800 transform active:scale-95 transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed font-medium"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
