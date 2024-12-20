'use client'
import React, { useEffect } from 'react';
import GroupChat from './components/GroupChat';
import useChatSocket from '@/_lib/hooks/useChatSocket';

const InboxPage = () => {
    // console.log("hello")
    const socket = useChatSocket()
    useEffect(() => {
        if (!socket) {
            console.log('leaving')
            return;
        }

        socket.on("connect", () => {
            console.log("Connected to WebSocket server with ID:", socket?.id);
        });

        // Connection lost
        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server.");
        });
    }, [socket])
    return (
        <div className='w-full h-full bg-white'>
            <GroupChat></GroupChat>
        </div>
    );
};

export default InboxPage;