'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { X, Mic, MicOff, VideoIcon, VideoOff, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Socket } from 'socket.io-client'
import { cn } from '@/_lib/utils'

interface VideoCallProps {
    socket: Socket | null
    roomId: string
    onClose: () => void
}

export default function VideoCall2({ socket, roomId, onClose }: VideoCallProps) {
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [isAudioEnabled, setIsAudioEnabled] = useState(true)
    const [isVideoEnabled, setIsVideoEnabled] = useState(true)
    const [isMinimized, setIsMinimized] = useState(false)

    const configuration = useMemo(() => ({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ],
    }), []);

    useEffect(() => {
        if (!socket) return

        socket.on('offer', async ({ offer }) => {
            if (!peerConnectionRef.current) return
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer))
            const answer = await peerConnectionRef.current.createAnswer()
            await peerConnectionRef.current.setLocalDescription(answer)
            socket.emit('answer', { roomId, answer })
        })

        socket.on('answer', async ({ answer }) => {
            if (!peerConnectionRef.current) return
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer))
        })

        socket.on('iceCandidate', async ({ candidate }) => {
            if (!peerConnectionRef.current) return
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
        })

        return () => {
            socket.off('offer')
            socket.off('answer')
            socket.off('iceCandidate')
        }
    }, [socket, roomId])


    //   const startCall = 

    const startCall = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            setLocalStream(stream)

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream
            }

            const peerConnection = new RTCPeerConnection(configuration)
            peerConnectionRef.current = peerConnection

            stream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, stream)
            })

            peerConnection.onicecandidate = (event) => {
                if (event.candidate && socket) {
                    socket.emit('iceCandidate', { roomId, candidate: event.candidate })
                }
            }

            peerConnection.ontrack = (event) => {
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0]
                }
            }

            const offer = await peerConnection.createOffer()
            await peerConnection.setLocalDescription(offer)
            socket?.emit('offer', { roomId, offer })
        } catch (error) {
            console.error('Error starting call:', error)
        }
    }, [roomId, configuration, socket]);


    const toggleAudio = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !isAudioEnabled
            })
            setIsAudioEnabled(!isAudioEnabled)
        }
    }

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !isVideoEnabled
            })
            setIsVideoEnabled(!isVideoEnabled)
        }
    }

    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop())
        }
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close()
        }
        onClose()
    }

    const toggleMinimized = () => {
        setIsMinimized(!isMinimized)
    }

    useEffect(() => {
        startCall()
        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop())
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close()
            }
        }
    }, [localStream, startCall])

    return (
        <div
            className={cn(
                "fixed z-50 transition-all duration-300 ease-in-out",
                isMinimized
                    ? "bottom-4 right-4 w-72 rounded-lg shadow-lg"
                    : "inset-0 bg-black/80 flex items-center justify-center"
            )}
        >
            <div
                className={cn(
                    "bg-background relative",
                    isMinimized
                        ? "w-full h-40 rounded-lg"
                        : "p-4 rounded-lg max-w-4xl w-full"
                )}
            >
                <div className="absolute right-2 top-2 z-10 flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMinimized}
                        className="h-8 w-8"
                    >
                        {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={endCall}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {isMinimized ? (
                    // Minimized view
                    <div className="w-full h-full p-2">
                        <div className="relative w-full h-full bg-muted rounded overflow-hidden">
                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 right-2 w-20 h-20 bg-muted rounded overflow-hidden border-2 border-background">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-2 left-2 flex gap-1">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={toggleAudio}
                                    className="h-6 w-6 bg-background/50 backdrop-blur-sm"
                                >
                                    {isAudioEnabled ? (
                                        <Mic className="h-3 w-3" />
                                    ) : (
                                        <MicOff className="h-3 w-3" />
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={toggleVideo}
                                    className="h-6 w-6 bg-background/50 backdrop-blur-sm"
                                >
                                    {isVideoEnabled ? (
                                        <VideoIcon className="h-3 w-3" />
                                    ) : (
                                        <VideoOff className="h-3 w-3" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Full-screen view
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-white text-sm">You</p>
                                </div>
                            </div>
                            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-white text-sm">Remote User</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleAudio}
                            >
                                {isAudioEnabled ? (
                                    <Mic className="h-5 w-5" />
                                ) : (
                                    <MicOff className="h-5 w-5" />
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleVideo}
                            >
                                {isVideoEnabled ? (
                                    <VideoIcon className="h-5 w-5" />
                                ) : (
                                    <VideoOff className="h-5 w-5" />
                                )}
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={endCall}
                            >
                                End Call
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

