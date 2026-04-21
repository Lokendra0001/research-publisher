import React from 'react'
import AuthorPage from "@/components/author/dashboard/Index"
import { PAGE_TITLES } from '@/utils/constant'

export const metadata = {
    title: PAGE_TITLES.AUTHOR,
}

const AuthorHome = () => {
    return (
       <AuthorPage />
    )
}

export default AuthorHome