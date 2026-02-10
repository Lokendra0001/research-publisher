"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import useUserDetail from '@/customHooks/useUserDetail';

const Footer = () => {
    const pathname = usePathname();
    const { isAuthenticated, role } = useUserDetail();
    let navBgcolor = "bg-primary"


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };



    // Only apply role-based colors if authenticated
    if (isAuthenticated && role) {
        if (pathname?.startsWith("/author") || pathname?.startsWith("/reviewer") || pathname?.startsWith("/publisher")) {
            navBgcolor = "bg-secondary";
        }
    }


    return (
        <footer className={`${navBgcolor}  text-white py-4 mt-8 transition-colors duration-300  bottom-0`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
                <div className="w-full  text-xs md:text-sm font-medium">
                    Copyright© 2022 to Present IJARMY - All Right Reserved
                </div>
                <button
                    onClick={scrollToTop}
                    className="md:absolute right-4 p-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
