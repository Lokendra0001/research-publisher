"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import useUserDetail from "@/customHooks/useUserDetail";

export default function Navigation() {
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const { isAuthenticated, role } = useUserDetail();
    const dropdownRef = useRef(null);


    const toggleDropdown = (label) => {
        if (activeDropdown === label) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(label);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        if (activeDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeDropdown]);

    const navLinks = {
        author: [
            { label: "Home", href: "/author" },
            { label: "Roles(Author)", href: "/author/role" },
            { label: "Update Profile", href: "/author/profile" },
            { label: "Contact Us", href: "/author/contact" },
        ],
        reviewer: [
            { label: "Home", href: "/reviewer" },
            { label: "Roles(Reviewer)", href: "/reviewer/role" },
            { label: "Update Profile", href: "/reviewer/profile" },
            { label: "Contact Us", href: "/reviewer/contact" },
        ],
        publisher: [
            { label: "Home", href: "/publisher" },
            { label: "Roles(Publisher)", href: "/publisher/role" },
            { label: "Authors", href: "/publisher/authors" },
            { label: "Reviewers", href: "/publisher/reviewers" },
            { label: "Editors", href: "/publisher/editors" },
            { label: "Responses", href: "/publisher/responses" },
            { label: "Volume", href: "/publisher/add-volume" },
            { label: "Paper", href: "/publisher/paper" },
            { label: "Payment History", href: "/publisher/payment-history" },
            { label: "Submission Fee", href: "/publisher/submission-fee" },
        ],
    };

    const guestLinks = [
        { label: "Home", href: "/" },
        { label: "Editorial Board", href: "/detail_editors" },
        { label: "Reviewers", href: "/detail_reviewers" },
        { label: "Current Issues", href: "/issues/current" },
        { label: "Past Issues", href: "/issues/past" },
        {
            label: "For Author Guideline",
            href: "#",
            hasDropdown: true,
            dropdownItems: [
                { label: "Author Guideline", href: "/guidelines/author" },
                { label: "Research Area", href: "/guidelines/research-area" },
                { label: "Correction Policy", href: "/guidelines/correction-policy" },
                { label: "Plagiarism Policy", href: "/guidelines/plagiarism-policy" }
            ]
        },
        { label: "Contact Us", href: "/contact" },
    ];

    // Default to guest links
    let currentLinks = guestLinks;

    // Only show role-based links if user is authenticated AND has that role
    if (isAuthenticated && role) {
        if (role === "author" && pathname?.startsWith("/author")) {
            currentLinks = navLinks.author;
        } else if (role === "reviewer" && pathname?.startsWith("/reviewer")) {
            currentLinks = navLinks.reviewer;
        } else if (role === "publisher" && pathname?.startsWith("/publisher")) {
            currentLinks = navLinks.publisher;
        }
    }

    let navBgClass = "bg-primary";

    // Only apply role-based colors if authenticated
    if (isAuthenticated && role) {
        if (pathname?.startsWith("/author") || pathname?.startsWith("/reviewer") || pathname?.startsWith("/publisher")) {
            navBgClass = "bg-secondary";
        }
    }

    return (
        <nav className={`${navBgClass} border-t border-orange-700/20 shadow-md sticky top-0 z-40 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 relative">
                <ul className="hidden lg:flex flex-wrap items-center ">
                    {currentLinks.map((link, index) => (
                        <li key={index} className={`relative group ${index !== currentLinks.length - 1 ? "border-r border-orange-400/30" : ""}`} ref={link.hasDropdown ? dropdownRef : null}>
                            {link.hasDropdown ? (
                                <button
                                    onClick={() => toggleDropdown(link.label)}
                                    className={`flex items-center gap-2 px-5 py-3 text-text-secondary font-medium text-sm md:text-base hover:bg-black/10 transition-colors whitespace-nowrap ${activeDropdown === link.label ? "bg-black/20" : ""}`}
                                >
                                    {link.icon && <link.icon className="w-4 h-4" />}
                                    {link.label}
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-2 px-5 py-3 text-text-secondary font-medium text-sm md:text-base hover:bg-black/10 transition-colors whitespace-nowrap ${pathname === link.href || link.isActive ? "bg-black/20" : ""}`}
                                >
                                    {link.icon && <link.icon className="w-4 h-4" />}
                                    {link.label}
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {link.hasDropdown && activeDropdown === link.label && (
                                <div className="absolute top-full left-0 bg-primary-foreground shadow-lg rounded-b-md min-w-[200px] border-t-2 border-primary z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <ul className="py-2">
                                        {link.dropdownItems.map((item, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    href={item.href}
                                                    className="block px-4 py-2 text-text-primary hover:bg-orange-50 hover:text-primary text-sm transition-colors"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>


            {/* Mobile Menu Button */}
            <div className="px-3 lg:hidden flex justify-between items-center py-3 border-b border-white/10">
                <span className="font-bold text-lg text-white">Menu</span>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Content (Vertical Accordion) */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <div className={`/95 backdrop-blur-sm border-t border-white/10 shadow-lg rounded-b-lg`}>
                    <ul className="flex flex-col">
                        {currentLinks.map((link, index) => (
                            <li key={index} className="border-b border-white/10 last:border-0">
                                {link.hasDropdown ? (
                                    <div className="flex flex-col">
                                        <button
                                            onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                                            className={`w-full flex items-center justify-between px-5 py-3 text-left text-sm font-medium transition-colors ${mobileDropdown === link.label ? 'text-white bg-white/10' : 'text-white/90 hover:bg-white/5'}`}
                                        >
                                            <span className="flex items-center gap-3">
                                                {link.icon && <link.icon className="w-4 h-4" />}
                                                {link.label}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 text-white/70 transition-transform duration-200 ${mobileDropdown === link.label ? "rotate-180 text-white" : ""}`}
                                            />
                                        </button>

                                        {/* Dropdown Content */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdown === link.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <ul className="bg-black/05 text-xs border-t border-white/5 py-1">
                                                {link.dropdownItems.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Link
                                                            href={item.href}
                                                            onClick={() => {
                                                                setMobileOpen(false);
                                                                setMobileDropdown(null);
                                                            }}
                                                            className="flex items-center gap-2 pl-8 pr-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-white/40"
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-white/40"></span>
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${pathname === link.href ? "text-white bg-white/10 border-l-4 border-white" : "text-white/90 hover:bg-white/5 border-l-4 border-transparent"}`}
                                    >
                                        {link.icon && <link.icon className="w-4 h-4" />}
                                        {link.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>
    );
}
