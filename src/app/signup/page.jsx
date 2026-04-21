import React from 'react'
import Signup from "@/components/signUp/index"
import PublicRoute from '@/components/common/PublicRoute'
import { PAGE_TITLES } from '@/utils/constant'

export const metadata = {
    title: PAGE_TITLES.SIGNUP,
}

function index() {
    return (
        <PublicRoute>
            <Signup />
        </PublicRoute>
    )
}

export default index