import Link from "next/link";
import { Download, FileText } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="space-y-6 w-full  mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:gap-0 lg:grid-cols-1 ">

            {/* Journal Update Widget */}
            <div className="border-2 border-primary bg-primary-foreground shadow-sm">
                <div className="bg-primary text-text-secondary px-3 py-2 font-bold text-lg">
                    Journal Update
                </div>
                <div className="p-4 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-primary-blue font-medium hover:underline break-all text-sm">
                                http://ijarmy.com/login.php
                            </a>
                        </li>
                        <li className="text-sm text-text-primary/80 border-t pt-2 mt-2">
                            New issue released! Submit your paper for the upcoming quarterly edition.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Impact Factor Widget */}
            <div className="border-2 border-primary bg-primary-foreground shadow-sm">
                <div className="bg-primary text-text-secondary px-3 py-2 font-bold text-lg">
                    Impact Factor
                </div>
                <div className="p-8 text-center">
                    <span className="text-4xl font-black text-text-primary/80">0</span>
                </div>
            </div>

            {/* Download Forms Widget */}
            <div className="border-2 border-primary bg-primary-foreground shadow-sm">
                <div className="bg-primary text-text-secondary px-3 py-2 font-bold text-lg">
                    Download Forms
                </div>
                <div className="p-0">
                    <Link href="#" className="flex items-center gap-2 px-4 py-3 border-b text-gray-700 hover:bg-gray-50 font-medium">
                        <FileText className="w-4 h-4 text-(--primary)" />
                        Copyright Form
                    </Link>
                    <Link href="#" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium">
                        <Download className="w-4 h-4 text-(--primary)" />
                        Paper Template
                    </Link>
                </div>
            </div>

        </div>
    );
}
