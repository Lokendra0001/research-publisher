"use client"
import React from 'react'
import PublisherDashboard from '@/components/publisher/dashboard/Index'

const PublisherPage = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto md:px-4 lg:px-8 py-8">
                <PublisherDashboard />
            </div>
        </div>
    )
}

export default PublisherPage