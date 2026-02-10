"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

export default function PublicRoute({ children }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const role = useSelector(state => state.auth.role)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) return;

        if (role) {  // only redirect if role exists
            router.replace(`/${role}`);
        }
    }, [isAuthenticated, role]);


    if (isAuthenticated) return null

    return <>{children}</>
}
