'use client'
import { constant } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import { setCredentials } from '@/redux/slices/auth/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import { fetchUser } from '@/redux/slices/auth/authSliceThungs';
import useUserDetail from '@/customHooks/useUserDetail';

const Provider = ({ children }) => {
    const dispatch = useDispatch();
    const { initialLoading } = useUserDetail();



    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>{children}</>
    )
}

export default Provider