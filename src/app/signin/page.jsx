import PublicRoute from '@/components/common/PublicRoute'
import SignIn from '@/components/signIn/Index'
import { PAGE_TITLES } from '@/utils/constant'
import React from 'react'

export const metadata = {
    title: PAGE_TITLES.SIGNIN,
}

const page = () => {
    return (
        <PublicRoute >
            <SignIn />
        </PublicRoute>
    )
}

export default page