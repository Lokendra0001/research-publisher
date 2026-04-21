import RoleGuard from '@/components/common/RoleGaurd'
import { PAGE_TITLES } from '@/utils/constant'
import React from 'react'

export const metadata = {
    title: PAGE_TITLES.AUTHOR,
}

const layout = ({ children }) => {
    return (
        <RoleGuard allowedRoles={["author"]}>
            {children}
        </RoleGuard>
    )
}

export default layout