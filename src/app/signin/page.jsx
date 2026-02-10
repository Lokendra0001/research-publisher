import PublicRoute from '@/components/common/PublicRoute'
import SignIn from '@/components/signIn/Index'
import React from 'react'

const page = () => {
    return (
        <PublicRoute >
            <SignIn />
        </PublicRoute>
    )
}

export default page