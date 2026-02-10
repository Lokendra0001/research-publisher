import React from 'react'
import Signup from "@/components/signUp/index"
import PublicRoute from '@/components/common/PublicRoute'

function index() {
    return (
        <PublicRoute>
            <Signup />
        </PublicRoute>
    )
}

export default index