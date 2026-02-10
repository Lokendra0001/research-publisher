'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ArrowLeft, UserPlus, Award, Lock, Save, Loader2, AlertCircle, MapPin } from 'lucide-react'
import { notify } from '@/utils/toast'
import { constant } from '@/utils/constant'
import axios from 'axios'
import Input from '@/components/common/Input' // Import common Input component

const editorRoles = [
    "Editor-in-Chief",
    "Managing Editor",
    "Technical Assistant",
    "Associate Editor",
    "Section Editor"
]

const AddEditor = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [tempPassword, setTempPassword] = useState(null)
    const searchParam = useSearchParams();
    const editorid = searchParam.get('id');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        if (editorid) {
            fetchEditorDetails();
        }
    }, [editorid]);

    const fetchEditorDetails = async () => {
        try {
            setIsFetching(true);
            const response = await axios.get(`${constant.SERVER_URL}admin/users/${editorid}`, {
                withCredentials: true
            });
            if (response.data.success) {
                const userData = response.data.data;
                reset({
                    name: userData.name,
                    email: userData.email,
                    address: userData.address || '',
                    editorRole: userData.editorRole || ''
                });
            }
        } catch (error) {
            console.error("Error fetching editor:", error);
            notify.error("Failed to load editor details");
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true)
        setTempPassword(null)
        try {
            let response;
            if (editorid) {
                // Update existing editor
                response = await axios.put(`${constant.SERVER_URL}admin/users/${editorid}/editor`, data, {
                    withCredentials: true
                })
            } else {
                // Create new editor
                response = await axios.post(`${constant.SERVER_URL}admin/addeditor`, data, {
                    withCredentials: true
                })
            }

            if (response.data.success) {
                notify.success(editorid ? "Editor updated successfully" : "Editor added successfully")
                if (!editorid) {
                    setTempPassword(response.data.data.temporaryPassword)
                    reset()
                } else {
                    router.push('/publisher/editors')
                }
            }
        } catch (error) {
            console.error(error)
            notify.error(error.response?.data?.error || "Failed to save editor")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background mt-5 md:mt-0 md:p-6 lg:p-10">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/publisher/editors"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        {isFetching ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-8 bg-gray-200 rounded w-48"></div>
                                <div className="h-4 bg-gray-200 rounded w-64"></div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-xl md:text-2xl font-bold text-foreground">{editorid ? "Edit Editor" : "Add New Editor"}</h1>
                                <p className=" text-muted-foreground text-xs md:text-sm">{editorid ? "Update editor details and role." : "Create a new editor account and assign a specific role."}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-border bg-gray-50/50">
                                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <UserPlus className="w-4 h-4 text-secondary" />
                                    {editorid ? "Update Details" : "Editor Details"}
                                </h2>
                            </div>

                            {isFetching ? (
                                <div className="p-2 md:p-6 space-y-6 animate-pulse">
                                    {/* Name Skeleton */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                                    </div>
                                    {/* Email Skeleton */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                                        <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                                    </div>
                                    {/* Role Skeleton */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                                        <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                                    </div>
                                    {/* Address Skeleton */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                        <div className="h-24 bg-gray-100 rounded-xl w-full"></div>
                                    </div>
                                    <div className="pt-4">
                                        <div className="h-11 bg-gray-200 rounded-lg w-full"></div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="p-2 md:p-6 space-y-6">

                                    {/* Name */}
                                    <Input
                                        label="Full Name"
                                        placeholder="e.g. Dr. Rajesh Kumar"
                                        error={errors.name}
                                        {...register("name", { required: "Full Name is required" })}
                                    />

                                    {/* Email */}
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="e.g. rajesh@university.edu"

                                        error={errors.email}
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />

                                    {/* Role Selection */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground ml-1">Editor Role</label>
                                        <div className="relative">
                                            <select
                                                {...register("editorRole", { required: "Please select an editor role" })}
                                                className={`flex h-12 w-full rounded-xl border border-input bg-background/50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary appearance-none text-foreground transition-all duration-200 ${errors.editorRole ? 'border-danger' : 'hover:border-secondary/50'}`}
                                            >
                                                <option value="">Select Role</option>
                                                {editorRoles.map((role) => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>

                                        </div>
                                        {errors.editorRole && <p className="text-xs text-danger font-medium ml-1 mt-1">{errors.editorRole.message}</p>}
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground ml-1">Address / Institution</label>
                                        <div className="relative">
                                            <textarea
                                                {...register("address", { required: "Address is required" })}
                                                rows={3}
                                                className={`flex w-full rounded-xl border border-input bg-background/50 px-4 py-3 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary resize-none transition-all duration-200 ${errors.address ? 'border-danger' : 'hover:border-secondary/50'}`}
                                                placeholder="e.g. Department of Computer Science, University of Delhi"
                                            />
                                            <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-4" />
                                        </div>
                                        {errors.address && <p className="text-xs text-danger font-medium ml-1 mt-1">{errors.address.message}</p>}
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm shadow-secondary/20"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    {editorid ? "Updating..." : "Adding Editor..."}
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    {editorid ? "Update Editor" : "Create Editor Account"}
                                                </>
                                            )}
                                        </button>
                                    </div>

                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="space-y-6">

                        {/* Success Card (Shows Temporary Password) */}
                        {tempPassword && (
                            <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm p-2 md:p-6 animate-in fade-in slide-in-from-top-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-green-100 rounded-lg shrink-0">
                                        <Lock className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-green-800">Account Created!</h3>
                                        <p className="text-sm text-green-700 mt-1 mb-3">
                                            Please copy the temporary password below and share it with the editor securely.
                                        </p>
                                        <div className="bg-white border border-green-200 rounded px-3 py-2 font-mono text-center text-lg font-bold tracking-wider select-all text-gray-800">
                                            {tempPassword}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-50 rounded-xl border border-blue-100 shadow-sm p-2 md:p-6">
                            <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-3">
                                <AlertCircle className="w-4 h-4" />
                                Wait, what happens next?
                            </h3>
                            <ul className="space-y-3 text-sm text-blue-800">
                                <li className="flex gap-2">
                                    <span className="shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
                                    The user will be created with the role "Editor".
                                </li>

                                <li className="flex gap-2">
                                    <span className="shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5" />
                                    You can manage their access and updating their details from the main Editors list.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditor