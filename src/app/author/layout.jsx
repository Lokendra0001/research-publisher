import RoleGuard from '@/components/common/RoleGaurd'
import React from 'react'

const layout = ({ children }) => {
    return (
        <RoleGuard allowedRoles={["author"]}>
            {children}
        </RoleGuard>
    )
}

export default layout