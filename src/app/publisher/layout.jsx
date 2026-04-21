import RoleGuard from '@/components/common/RoleGaurd'
import { PAGE_TITLES } from '@/utils/constant'
import React from 'react'

export const metadata = {
    title: PAGE_TITLES.PUBLISHER,
}

const layout = ({ children }) => {
    return (
        <RoleGuard allowedRoles={["publisher"]}>
            {children}
        </RoleGuard>
    )
}

export default layout