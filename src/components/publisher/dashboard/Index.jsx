"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { constant } from "@/utils/constant";
import Link from "next/link";
import {
    Layout,
    Megaphone,
    BarChart,
    ExternalLink,
    Image as ImageIcon,
    Edit,
    Globe,
    ArrowRight
} from "lucide-react";
import Image from "next/image";
import ReviewerDashboard from "@/components/reviewer/dashboard/Index";
import useUserDetail from "@/customHooks/useUserDetail";
import PublisherDashboard from "./DefaultDashboard"
import AuthorDashboard from "@/components/author/dashboard/HomePage"

// Decode HTML entities helper
const decodeEntities = (html) => {
    if (typeof document === 'undefined') return html || "";
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    let decoded = txt.value;
    if (decoded && (decoded.includes('&lt;') || decoded.includes('&gt;') || decoded.includes('&amp;'))) {
        txt.innerHTML = decoded;
        decoded = txt.value;
    }
    return decoded || "";
};

const Index = ({ }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const { role } = useUserDetail();

    const dashboard = {
        "author": <AuthorDashboard />,
        "publisher": <PublisherDashboard />,
        "reviewer": <ReviewerDashboard />
    }

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get(
                    `${constant.SERVER_URL}public/settings`,
                    { withCredentials: true }
                );

                if (res.data?.success && res.data?.data) {
                    // Check if at least one field has data
                    const d = res.data.data;
                    if (d.title || d.content || d.marqueeText || d.impactFactor || d.icon) {
                        setSettings(d);
                    }
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load dashboard settings");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // 🔹 Loading Skeleton
    if (loading) {
        return (
            <div className="p-2 md:p-8 max-w-6xl mx-auto space-y-8 animate-pulse min-h-screen">
                <div className="h-10 w-64 bg-gray-200 rounded-lg" />
                <div className="h-12 bg-gray-100 rounded-xl" />
                <div className="grid  lg:grid-cols-3 gap-6">
                    <div className="h-40 bg-gray-100 rounded-2xl" />
                    <div className="h-40 bg-gray-100 rounded-2xl" />
                    <div className="h-40 bg-gray-100 rounded-2xl" />
                </div>
            </div>
        );
    }

    // 🔹 If no data, show default dashboard
    if (!settings) {
        return dashboard[role]
    }

    return (
        <div className="py-4 md:py-8 max-w-7xl mx-auto space-y-4 md:space-y-10  ">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-2 md:pb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-black text-secondary tracking-tight flex items-center gap-2">
                        <Layout className="text-teal-600 " size={27} />
                        Home
                    </h1>
                    <p className="text-gray-500 font-medium text-sm md:text-base">Currently active configuration for the public home page.</p>
                </div>

            </div>

            {/* Real Marquee Section */}
            {settings.marqueeText && (
                <div className="relative group overflow-hidden bg-secondary py-4 shadow-xl shadow-blue-600/10">

                    <div className="animate-marquee inline-block whitespace-nowrap">
                        <span className="text-white font-bold text-lg px-8 flex items-center gap-4">
                            <Megaphone className="text-blue-200" size={20} />
                            {decodeEntities(settings.marqueeText)}
                            {settings.marqueeLink && (
                                <a
                                    href={decodeEntities(settings.marqueeLink)}
                                    target="_blank"
                                    className="bg-white/20 hover:bg-white/40 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/30 transition-colors inline-flex items-center gap-1"
                                >
                                    View Details <ArrowRight size={14} />
                                </a>
                            )}
                            <span className="mx-8 text-blue-300">•</span>
                            <Megaphone className="text-blue-200" size={20} />
                            {decodeEntities(settings.marqueeText)}
                            {settings.marqueeLink && (
                                <a
                                    href={decodeEntities(settings.marqueeLink)}
                                    target="_blank"
                                    className="bg-white/20 hover:bg-white/40 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/30 transition-colors inline-flex items-center gap-1"
                                >
                                    View Details <ArrowRight size={14} />
                                </a>
                            )}
                        </span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Hero Title and Content Card */}
                    <div className="bg-white rounded-xs border border-gray-100  overflow-hidden group  transition-all duration-500">
                        <div className="bg-teal-50 p-4 md:p-6 border-b border-teal-100/50 flex items-center justify-between">
                            <h2 className="text-xs font-black text-teal-600 uppercase tracking-widest">Headline & Narrative</h2>
                            <Globe size={18} className="text-teal-400" />
                        </div>
                        <div className="p-4 md:p-8 lg:p-10 space-y-6">
                            <h3 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
                                {decodeEntities(settings.title)}
                            </h3>
                            <div
                                className="prose prose-teal max-w-none text-gray-600 leading-relaxed text-sm md:text-lg"
                                dangerouslySetInnerHTML={{ __html: decodeEntities(settings.content) }}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats & Icon area */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Impact Factor Card */}
                    <div className="p-4 md:p-8 bg-secondary/10 rounded-xs relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className=" p-2 rounded-lg ">
                                    <BarChart size={24} />
                                </div>
                                <h3 className="font-bold uppercase tracking-widest  text-[10px]">Journal Metrics</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium ">Live Impact Factor</p>
                                <div className="text-4xl md:text-6xl font-black tracking-tighter">{settings.impactFactor || "0.00"}</div>
                            </div>
                        </div>
                        <BarChart size={120} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    {/* Attractive Asset Card (Icon) */}
                    {settings.icon && (
                        <div className="bg-white rounded-xs border border-gray-100 p-4 md:p-8 flex flex-col items-center justify-center text-center space-y-6 transition-all ">
                            <div className="bg-teal-50 w-full h-40 rounded-lg flex items-center justify-center relative overflow-hidden">
                                <div className="relative h-full w-full bg-red-300">
                                    <Image
                                        src={settings.icon}
                                        alt="Live Asset"
                                        fill
                                        unoptimized
                                        priority
                                        className=" object-cover drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2 w-full">
                                <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                                    <ImageIcon size={14} />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Published Identity</span>
                                </div>
                                <Link
                                    href={decodeEntities(settings?.iconLink)}
                                    className="text-xs font-mono text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100 truncate w-full">
                                    {decodeEntities(settings.iconLink)}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;
