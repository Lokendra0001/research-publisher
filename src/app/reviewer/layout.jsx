import RoleGuard from '@/components/common/RoleGaurd'
import { PAGE_TITLES } from '@/utils/constant'
import React from 'react'

export const metadata = {
    title: PAGE_TITLES.REVIEWER,
}

const layout = ({ children }) => {
    return (
        <RoleGuard allowedRoles={['reviewer']}>
            {children}
        </RoleGuard>
    )
}

export default layout