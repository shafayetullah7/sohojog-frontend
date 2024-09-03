'use client'
import { useRouter } from 'next/router';
import React from 'react';

const GooglePage = () => {
    const router = useRouter();
    const { token } = router.query;
    return (
        <div>

        </div>
    );
};

export default GooglePage;