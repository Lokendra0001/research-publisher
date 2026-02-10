"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Trash2, Search, Users, UserCheck, PenBox } from 'lucide-react';
import Skeleton from './Skeleton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UsersPage = ({ role }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [deleting, setDeleting] = useState({});
    const isEditor = role == "editor";
    const tableHeaders = {
        "reviewer": [
            { label: 'No.', className: 'w-12' },
            { label: 'Reviewer Name' },
            { label: 'Email' },
            { label: 'Institution' },
            { label: 'Department' },
            { label: 'Actions', className: 'text-center w-24' },
        ],
        "author": [
            { label: 'No.', className: 'w-12' },
            { label: 'Author Name' },
            { label: 'Email' },
            { label: 'Institution' },
            { label: 'Department' },
            { label: 'Actions', className: 'text-center w-24' },
        ],

        "editor": [
            { label: 'No.', className: 'w-12' },
            { label: 'Editor Name' },
            { label: 'Email' },
            { label: 'Editor Role', className: 'min-w-40' },
            { label: 'Edit' },
            { label: 'Actions', className: 'text-center w-24' },
        ]

    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}admin/users?role=${role}`, { withCredentials: true });
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching ${role}:", error);
            notify.error(`Failed to load ${role}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId, userName) => {
        if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            setDeleting(prev => ({ ...prev, [userId]: true }));
            const res = await axios.delete(`${constant.SERVER_URL}admin/users/${userId}`, { withCredentials: true });

            if (res.data.success) {
                notify.success(res.data.message);
                setUsers(prev => prev.filter(r => r.id !== userId));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            notify.error(error.response?.data?.message || "Failed to delete user");
        } finally {
            setDeleting(prev => ({ ...prev, [userId]: false }));
        }
    };

    const filteredUsers = users.filter(r =>
        r.name.toLowerCase().includes(filter.toLowerCase()) ||
        r.email.toLowerCase().includes(filter.toLowerCase()) ||
        r.institution?.toLowerCase().includes(filter.toLowerCase()) ||
        r.designation?.toLowerCase().includes(filter.toLowerCase()) ||
        r?.editorRole?.toLowerCase().includes(filter.toLowerCase())
    );



    return (
        <div className="flex bg-primary-foreground min-h-[calc(100vh-64px)]">
            <main className="flex-1 md:p-8 min-w-0 overflow-x-hidden mt-5">
                <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
                    <div className="border-b-2 border-muted pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
                            <UserCheck className="w-6 h-6" /> Manage <span className='capitalize' > {role}</span>
                        </h1>
                        {/* Search Bar */}
                        <div className='flex items-center gap-2 '>
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder={`Search ${role}...`}
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            {isEditor &&
                                <>
                                    <Link href={"/publisher/editors/addEditor"} className='hidden md:block px-3 py-1.5 bg-secondary/90 hover:bg-secondary text-text-secondary font-semibold rounded-lg '>
                                        Add Editor
                                    </Link>
                                    <Link href={"/publisher/editors/addEditor"} className='block md:hidden px-3 py-1.5 bg-secondary/90 hover:bg-secondary text-text-secondary font-semibold rounded-lg '>
                                        Add
                                    </Link>
                                </>
                            }
                        </div>

                    </div>


                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-text-primary/70 border border-border rounded-lg">
                            <thead className="text-xs text-text-primary uppercase bg-gray-50 border-b border-border">
                                <tr>
                                    {tableHeaders[role].map((opt, idx) =>
                                        <th key={idx} className={`px-6 py-4  ${opt.className} ${idx !== 0 && role !== "editor" && "min-w-35 lg:min-w-auto"} `}>
                                            {opt.label}
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            {loading ? (
                                <tbody className="w-full animate-pulse">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index} className="border-b border-border last:border-b-0">
                                            <td className="px-6 py-4 w-16 ">
                                                <div className="h-4 bg-border rounded w-8"></div>
                                            </td>
                                            <td className="px-6 py-4 w-65">
                                                <div className="h-4 bg-border rounded w-20"></div>
                                            </td>
                                            <td className="px-6 py-4 w-50">
                                                <div className="h-4 bg-border rounded mb-2"></div>

                                            </td>
                                            <td className="px-6 py-4 ">
                                                <div className="h-4 bg-border rounded w-24"></div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="h-8  bg-border  "></div>
                                            </td>
                                            <td className="px-6 py-4 w-24 text-center">
                                                <div className="h-8 w-8 bg-border rounded-full mx-auto"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : filteredUsers.length === 0 ? (
                                <tbody>
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-text-primary/70 bg-gray-50 border border-dashed border-border">
                                            <Users className="w-12 h-12 mx-auto mb-3 opacity-20 text-secondary" />
                                            <p>No {role} found.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user.id} className="bg-primary-foreground border-b border-border hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-text-primary ">{index + 1}</td>
                                            <td className="px-6 py-4 font-medium text-text-primary min-w-40 lg:min-w-auto">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{isEditor ? user.editorRole : user.institution || '-'}</td>
                                            <td className="px-6 py-4">{isEditor ?
                                                <Link
                                                    href={`/publisher/editors/editeditor?id=${user.id}`}
                                                    className="inline-flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer text-warning hover:bg-warning/10"
                                                    title="Edit Editor"
                                                >
                                                    <PenBox className="w-5 h-5" />
                                                </Link>

                                                : user?.designation || '-'}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(user.id, user.name)}
                                                    disabled={deleting[user.id]}
                                                    className={`p-2 rounded-full cursor-pointer transition-colors ${deleting[user.id] ? 'bg-gray-100 text-gray-400' : 'text-danger hover:bg-red-50'}`}
                                                    title="Delete User"
                                                >
                                                    {deleting[user.id] ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></div>
                                                    ) : (
                                                        <Trash2 className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UsersPage;
