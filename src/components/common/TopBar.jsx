"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { Trophy, ChevronDown, LogOut, LayoutDashboard, UserPlus, LogIn, Home } from "lucide-react";
import useUserDetail from "@/customHooks/useUserDetail";
import { logout } from "@/redux/slices/auth/authSliceThungs";
import { notify } from "@/utils/toast";

export default function TopBar() {
    const { isAuthenticated, role } = useUserDetail();
    const [isOpen, setIsOpen] = useState(false);
    const { loading } = useUserDetail();

    const dispatch = useDispatch();
    const router = useRouter();
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            router.push('/signin');
            setIsOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const pathname = usePathname();

    let bgClass = "bg-primary";

    // Only apply role-based colors if authenticated
    if (isAuthenticated && role) {
        if (pathname?.startsWith("/author") || pathname?.startsWith("/reviewer") || pathname?.startsWith("/publisher")) {
            bgClass = "bg-secondary";
        }
    }

    return (
        <div className={`${bgClass} text-text-secondary text-sm py-4 md:py-2 px-4 shadow-sm relative z-50 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between md:items-center gap-2">
                <div className="flex flex-col gap-2">

                    <Link href="/" className="flex gap-2 items-center">
                        <Home size={17} /> Home Page
                    </Link>
                    <p className="flex items-center gap-2 text-center md:text-left hover:opacity-90 transition-opacity">
                        <Trophy className="hidden md:block w-4 h-4 text-yellow-300" />
                        <span className="font-medium drop-shadow-sm text-start  text-xs md:text-base">
                            A Widely Indexed Open Access Peer Reviewed Multidisciplinary Quarterly Scholarly International Journal
                        </span>
                    </p>
                </div>

                <div className="relative self-end" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className=" flex items-center gap-2 cursor-pointer  bg-primary-blue/80   hover:bg-primary-blue border border-primary-blue text-text-secondary px-4 py-1.5 rounded-md transition-colors text-xs font-semibold uppercase tracking-wide"
                    >
                        {role ? role : "User"}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-primary-foreground rounded-md shadow-lg border border-border py-1 text- z-50 text-text-primary">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        href="/signup"
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        Register
                                    </Link>
                                    <Link
                                        href="/signin"
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 hover:text-(--primary)"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Login
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={`/${role}`}
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 hover:text-(--primary)"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        My Home
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        disabled={loading}
                                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${loading ? "cursor-not-allowed bg-border/60 opacity-75" : "hover:bg-red-50 "} text-danger/90 hover:text-danger text-left`}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {loading ? "Logging Out..." : "Logout"}
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
