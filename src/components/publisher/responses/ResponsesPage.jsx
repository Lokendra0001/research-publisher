"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constant } from "@/utils/constant";
import { notify } from "@/utils/toast";
import { Mail, Phone, MapPin, MessageSquare, Search, Users, Plus, Ellipsis, ExternalLink, Eye } from "lucide-react";
import MessageDetail from "./MessageDetail";

const ResponsesPage = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [showModal, setShowModel] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${constant.SERVER_URL}admin/contact`,
                { withCredentials: true }
            );
            if (res.data.success) {
                setContacts(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            notify.error("Failed to load responses");
        } finally {
            setLoading(false);
        }
    };

    const filteredContacts = contacts.filter(c =>
        c.name?.toLowerCase().includes(filter.toLowerCase()) ||
        c.email?.toLowerCase().includes(filter.toLowerCase()) ||
        c.message?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="flex bg-white min-h-[calc(100vh-64px)]">
            <main className="flex-1 md:p-8 mt-5 min-w-0 overflow-x-hidden">
                <div className="bg-white p-2 md:p-6 shadow-sm rounded-lg border border-gray-200 min-h-[500px]">

                    {/* Header */}
                    <div className="border-b-2 border-border/50 pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                        <h1 className="text-xl md:text-2xl font-bold text-secondary flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                            User Responses & Enquiries
                        </h1>

                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search responses..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none "
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-text-primary/60 border border-border ">
                            <thead className="text-xs uppercase bg-gray-50 text-text-primary border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 w-12">No.</th>
                                    <th className="px-6 py-4 min-w-30 lg:min-w-auto">Name</th>
                                    <th className="px-6 py-4 min-w-30 lg:min-w-auto">Email</th>
                                    <th className="px-6 py-4 min-w-30 lg:min-w-auto">Mobile</th>
                                    <th className="px-6 py-4 min-w-30 lg:min-w-auto">Address</th>
                                    <th className="px-6 py-4 min-w-30 lg:min-w-auto">Message</th>
                                </tr>
                            </thead>

                            {loading ? (
                                <tbody className="animate-pulse">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="">
                                            {Array.from({ length: 6 }).map((_, j) => (
                                                <td key={j} className="px-6 py-4">
                                                    <div className="h-4 bg-border rounded w-full"></div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            ) : filteredContacts.length === 0 ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={6}>
                                            <div className="text-center py-12 text-text-primary/80 bg-gray-50 rounded-lg border border-dashed border-border">
                                                <Users className="w-12 h-12 mx-auto mb-3 opacity-20 text-primary" />
                                                <p>No responses found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                    {filteredContacts.map((contact, index) => (
                                        <tr
                                            key={contact.id}
                                            className="bg-primary-foreground border-b border-border hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 font-medium text-text-primary">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-text-primary">
                                                {contact.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-secondary" />
                                                    {contact.email || "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-secondary" />
                                                    {contact.mobile || "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-[200px] truncate">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-secondary" />
                                                    {contact.address || "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4  min-w-52">
                                                <p
                                                    className="line-clamp-1 text-ellipsis  text-gray-700 italic flex justify-between items-center"
                                                    title={contact.message}

                                                >
                                                    {contact.message}
                                                    <Eye className="w-3 h-3 lg:w-4 lg:h-4 shrink-0 text-secondary cursor-pointer" onClick={() => {
                                                        setMessage(contact.message)
                                                        setShowModel(true);
                                                    }} />
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </main>

            {showModal &&

                <MessageDetail message={message} onClose={setShowModel} />
            }
        </div>
    );
};

export default ResponsesPage;
