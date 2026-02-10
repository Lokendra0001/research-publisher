import Image from "next/image";
import Link from "next/link";
import Sidebar from "../../common/Sidebar";
import Introduction from "./Introduction";
import CallPaper from "./CallPaper";
import React, { useState } from "react";

export default function HeroSection() {
    const [selectedBtn, setSelectedBtn] = useState("intro");

    const showContent = {
        "intro": <Introduction />,
        "call": <CallPaper />,
        "conference": ""
    }
    return (
        <div className="bg-primary-foreground py-10 min-h-screen">


            <div className="">

                {/* Main Content Area (3 Cols) */}
                <div className="space-y-8 ">

                    {/* Journal Info Card */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Journal Cover - using placeholder or the actual design logic */}
                        <div className="w-full md:w-1/3 bg-primary-blue p-1 flex items-center justify-center shadow-lg aspect-3/4 relative">
                            <div className="w-full h-full bg-primary-blue flex flex-col justify-between p-4 text-center text-primary-foreground border-4 border-primary-foreground">
                                <div className="text-xl font-serif font-bold">IJARMY</div>
                                <div className="text-xs uppercase tracking-widest mt-2 border-t border-b py-2 border-white/30">
                                    International Journal For Advanced Research in Multidisciplinary
                                </div>
                                <div className="mt-auto text-xs opacity-70">
                                    www.ijarmy.com
                                </div>
                            </div>
                        </div>

                        {/* Info Text */}
                        <div className="w-full md:w-2/3 space-y-4">
                            <h2 className="text-2xl font-bold text-(--primary) border-b pb-2">
                                Editor-in-Chief <br />
                                <span className="text-xl text-text-primary font-normal">IJARMY</span>
                            </h2>

                            <div className="space-y-2 text-sm md:text-base">
                                {[
                                    ["ISSN", "2583-794X (Online)", "text-text-primary"],
                                    ["Frequency", "Published Quarterly"],
                                    ["Open Access", "Free Accessible for Readers", null, "text-red-600 font-bold"],
                                    ["Review Process", "Double Blind Review by referees"],
                                    ["Acceptance Time", "15 weeks"],
                                    ["Publication Process", "Online"],
                                    ["Publisher", "Jump2Learn Publication, India"],
                                ].map(([label, value, labelClass, valueClass], i) => (
                                    <div key={i} className="grid grid-cols-3 gap-2">
                                        <span className={`font-semibold ${labelClass || "text-text-primary"}`}>
                                            {label}
                                        </span>
                                        <span className={`col-span-2 ${valueClass || ""}`}>
                                            {value}
                                        </span>
                                    </div>
                                ))}

                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 pt-4">
                                {[
                                    { label: "Call For Paper", id: "call" },
                                    { label: "Conference Info.", id: "conference" },
                                ].map((option, i) => (
                                    <React.Fragment key={i}>
                                        <button
                                            key={i}
                                            onClick={(e) => setSelectedBtn(option.id)}
                                            className={`${option.id == selectedBtn ? "bg-primary/90" : "bg-primary-blue/90 hover:bg-primary-blue"} text-white px-6 py-2 rounded-md font-semibold text-sm shadow-md  transition-colors`}
                                        >
                                            {option.label}
                                        </button>
                                        {i == 0 && <Link href={"/author/role?page=new_submission"}
                                            className={`bg-primary-blue/90 hover:bg-primary-blue focus:bg-primary text-white px-6 py-2 rounded-md font-semibold text-sm shadow-md  transition-colors`}
                                        >Online Submission</Link>}
                                    </React.Fragment>

                                ))}

                            </div>
                        </div>
                    </div>


                    {showContent[selectedBtn]}

                </div>


            </div>
        </div>
    );
}
