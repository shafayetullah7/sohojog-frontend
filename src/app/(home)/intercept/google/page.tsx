'use client'
import { LocalStorageService } from '@/lib/helpers/access/Access';
import { redirect, useSearchParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const GooglePage = () => {
    // const router = useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token');

    useEffect(() => {
        if (token && typeof token === 'string') {
            LocalStorageService.getInstance().token = token;
            redirect('/dashboard');
        } else {
            redirect('/dashboard')
        }
    }, [token])

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};

export default GooglePage;