"use client";

import { useState } from "react";
import CreateVolume from "./CreateVolume";
import CreateIssue from "./CreateIssue";

export default function VolumeForm() {
    const [activeTab, setActiveTab] = useState("volume");

    return (
        <div className="my-15 max-w-lg mx-auto bg-white border border-border rounded-lg shadow-none">
            <div className="flex p-1 bg-muted/50 m-2 ">
                <button

                    onClick={() => setActiveTab("volume")}
                    className={`flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-none ${activeTab === "volume"
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                >
                    Create Volume
                </button>
                <button
                    onClick={() => setActiveTab("issue")}
                    className={`flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-none ${activeTab === "issue"
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        }`}
                >
                    Add Issue
                </button>
            </div>

            <div className="p-6 pt-2">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">
                        {activeTab === "volume" ? "New Volume" : "New Issue"}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {activeTab === "volume"
                            ? "Initialize a new volume for the coming year."
                            : "Add a new issue to an existing volume."}
                    </p>
                </div>

                {activeTab === "volume" ? <CreateVolume /> : <CreateIssue />}
            </div>
        </div>
    );
}
