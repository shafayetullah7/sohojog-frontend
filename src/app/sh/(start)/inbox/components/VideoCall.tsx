'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { X, Mic, MicOff, VideoIcon, VideoOff, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Socket } from 'socket.io-client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/_lib/utils'

interface RemoteUser {
    name: string;
    avatar: string;
}

interface VideoCallProps {
    socket: Socket | null
    roomId: string
    onClose: () => void
    isAudioOnly: boolean
    remoteUser: RemoteUser
}

export default function VideoCall({ socket, roomId, onClose, isAudioOnly, remoteUser }: VideoCallProps) {
    /*
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [isAudioEnabled, setIsAudioEnabled] = useState(true)
    const [isVideoEnabled, setIsVideoEnabled] = useState(!isAudioOnly)
    const [isMinimized, setIsMinimized] = useState(false)
    const [audioLevel, setAudioLevel] = useState<number>(0)
    */
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [isAudioEnabled, setIsAudioEnabled] = useState(true)
    const [isVideoEnabled, setIsVideoEnabled] = useState(!isAudioOnly)
    const [isMinimized, setIsMinimized] = useState(false)
    const [audioLevel, setAudioLevel] = useState<number>(0)
    const isCallInitialized = useRef(false)

    const configuration = useMemo(() => ({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
        ],
    }), [])

    useEffect(() => {
        console.log({
            isAudioEnabled,
            isVideoEnabled,
            isMinimized,
            audioLevel
        })
    }, [isAudioEnabled, isVideoEnabled, isMinimized, audioLevel])

    /*
    const startCall = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: !isAudioOnly,
                audio: true
            })
            setLocalStream(stream)

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream
                localVideoRef.current.play().catch(error => console.error('Error playing local video:', error))
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
                    remoteVideoRef.current.play().catch(error => console.error('Error playing remote video:', error))
                }
            }

            // const offer = await peerConnection.createOffer()
            // await peerConnection.setLocalDescription(offer)
            // socket?.emit('offer', { roomId, offer })
        } catch (error) {
            console.error('Error starting call:', error)
        }
    }, [isAudioOnly, roomId, socket, configuration])
    */

    const startCall = useCallback(async () => {
        if (isCallInitialized.current) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: !isAudioOnly,
                audio: true
            })

            setLocalStream(stream)
            isCallInitialized.current = true;

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream
                localVideoRef.current.play().catch(error => console.error('Error playing local video:', error))
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
                    remoteVideoRef.current.play().catch(error => console.error('Error playing remote video:', error))
                }
            }
        } catch (error) {
            console.error('Error starting call:', error)
        }
    }, [isAudioOnly, roomId, socket, configuration]);

    

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



    const updateAudioLevel = useCallback(() => {
        if (localStream && isAudioEnabled) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(localStream);
            microphone.connect(analyser);
            analyser.fftSize = 256;
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const updateLevel = () => {
                analyser.getByteFrequencyData(dataArray);
                const level = Math.max(...dataArray) / 255; // Normalize to 0-1
                setAudioLevel(level);
                if (isAudioEnabled) {
                    requestAnimationFrame(updateLevel);
                }
            };
            updateLevel();
        } else {
            setAudioLevel(0);
        }
    }, [localStream, isAudioEnabled]);

    useEffect(() => {
        if (localStream && isAudioEnabled) {
            updateAudioLevel();
        }
    }, [localStream, isAudioEnabled, updateAudioLevel]);

    const toggleAudio = useCallback(() => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !isAudioEnabled;
                if (!track.enabled) {
                    track.stop(); // This will turn off the microphone when muting
                }
            });
            setIsAudioEnabled(!isAudioEnabled);
        }
    }, [localStream, isAudioEnabled]);

    const toggleVideo = useCallback(() => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !isVideoEnabled;
                track.stop(); // This will turn off the camera when disabling video
            });
            setIsVideoEnabled(!isVideoEnabled);
        }
    }, [localStream, isVideoEnabled]);

    const endCall = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop()
            })
        }
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close()
        }
        setLocalStream(null)
        setIsAudioEnabled(false)
        setIsVideoEnabled(false)
        onClose()
    }, [localStream, onClose])

    const toggleMinimized = useCallback(() => {
        setIsMinimized(prev => !prev)
    }, [])

    /*
    useEffect(() => {
        startCall()

        return () => {
            if (isCallInitialized.current) {
                endCall()
            }
        }
    }, [])
    */

    /*
    useEffect(() => {
        startCall()
        console.log('call started')
        return () => {
            console.log('call ended')
            endCall()
        }
    }, [startCall,endCall])
    */

    useEffect(() => {
        startCall()

        return () => {
            if (isCallInitialized.current) {
                endCall()
            }
        }
    }, [startCall, endCall])

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
                            {isAudioOnly ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage src={remoteUser.avatar} alt={remoteUser.name} />
                                        <AvatarFallback>{remoteUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            ) : (
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {!isAudioOnly && (
                                <div className="absolute bottom-2 right-2 w-20 h-20 bg-muted rounded overflow-hidden border-2 border-background">
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="absolute bottom-2 left-2 flex gap-1 items-center">
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
                                {isAudioEnabled && (
                                    <div className="w-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="bg-green-500 h-full"
                                            style={{ width: `${audioLevel * 100}%` }}
                                        />
                                    </div>
                                )}
                                {!isAudioOnly && (
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
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Full-screen view
                    <>
                        <div className={cn("grid gap-4", isAudioOnly ? "grid-cols-1" : "grid-cols-2")}>
                            {isAudioOnly ? (
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage src={remoteUser.avatar} alt={remoteUser.name} />
                                        <AvatarFallback>{remoteUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="mt-4 text-center">
                                        <h2 className="text-2xl font-semibold">{remoteUser.name}</h2>
                                        <p className="text-muted-foreground">Audio call</p>
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                            <p className="text-white text-sm">{remoteUser.name}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center gap-4 mt-4 items-center">
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
                            {isAudioEnabled && (
                                <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="bg-green-500 h-full"
                                        style={{ width: `${audioLevel * 100}%` }}
                                    />
                                </div>
                            )}
                            {!isAudioOnly && (
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
                            )}
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

