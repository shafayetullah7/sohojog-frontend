'use client'
import React, { useEffect } from 'react';
import GroupChat from './components/GroupChat';
import useChatSocket from '@/_lib/hooks/useChatSocket';

const InboxPage = () => {
    // console.log("hello chat")
    const socket = useChatSocket()

    return (
        <div className='w-full h-full bg-white'>
            <GroupChat></GroupChat>
        </div>
    );
};

export default InboxPage;