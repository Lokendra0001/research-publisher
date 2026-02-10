'use client'
import React, { Suspense } from 'react'

import { Loader2 } from 'lucide-react'
import PaymentStatusContent from '@/components/author/receipt/PaymentStatusContent'

const Index = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <PaymentStatusContent />
        </Suspense>
    )
}

export default Index