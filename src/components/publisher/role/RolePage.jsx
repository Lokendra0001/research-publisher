"use client";
import React, { Suspense } from 'react';
import RoleContent from './RoleContent';



const RolePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RoleContent />
        </Suspense>
    );
};

export default RolePage;
