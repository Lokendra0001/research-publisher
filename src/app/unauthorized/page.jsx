"use client"
import useUserDetail from '@/customHooks/useUserDetail'
import Link from 'next/link'
import React from 'react'

const UnauthorizedPage = () => {
    const { role } = useUserDetail();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-center px-4">
            <h1 className="text-6xl font-bold text-red-600 mb-4">401</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Unauthorized Page!</h2>

            <div className="mb-8">
                {/* Using a widely available funny electric shock meme as a placeholder for the "Old man connecting wires" request */}

                <p className="mt-2 text-sm text-gray-500 italic">(Unauthorized Access Attempt Detected)</p>
            </div>

            <Link
                href={`/${role}` || "/"}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    )
}

export default UnauthorizedPage