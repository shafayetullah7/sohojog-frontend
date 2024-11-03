'use client';

import { errorAlert } from "@/components/alerts/errorAlert";
import { useGetUser } from "@/hooks/getUser";
import { LocalStorageService } from "@/_lib/helpers/access/Access";
import { useSendOtpMutation } from "@/_lib/redux/api/api-features/common/auth-api/authApi";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useCallback } from "react";
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType";

type Props = {
    children: ReactNode;
};

export type TSendOtpData = { email: string }

const HomeLayout = ({ children }: Props) => {
    const { data: user, isLoading: isUserLoading, error: userError } = useGetUser();
    const [sendOtp, { isLoading: isOtpLoading }] = useSendOtpMutation();
    const LocalStorage = LocalStorageService.getInstance();
    const router = useRouter();
    const [otpSent, setOtpSent] = useState(false);
    const pathname = usePathname();

    // Function to handle OTP sending, memoized to prevent unnecessary re-creations
    const handleOtpSending = useCallback(async (email: string) => {
        try {
            const response = await sendOtp({ email }).unwrap();
            if (response.success) {
                router.replace('/verify-user');
            } else {
                errorAlert({
                    title: "Failed",
                    description: response.message || "Failed to send OTP to verify user",
                });
                router.replace('/sign-in');
            }
        } catch (err) {
            const axiosError = err as { data: TerrorResponse; status: number };
            errorAlert({
                title: "Failed",
                description: axiosError.data.message || "Failed to send OTP to verify user",
            });
            router.replace('/sign-in');
        }
    }, [router, sendOtp]);

    useEffect(() => {
        if (!LocalStorage.token) {
            router.replace('/sign-in');
            return;
        }

        if (isUserLoading) return; // Avoid unnecessary execution when loading

        if (user) {
            if (!user.verified && !otpSent) {
                handleOtpSending(user.email); // Call the OTP handler only if not verified
                setOtpSent(true); // Ensure OTP is sent only once
            } else if (user.verified) {
                if (!pathname.startsWith('/sh/')) {
                    router.replace(`/sh/${user.id}`);
                }
            }
        } else if (userError || !user) {
            router.replace('/sign-in');
        }
    }, [user, isUserLoading, userError, LocalStorage.token, handleOtpSending, router, otpSent, pathname]);

    if (isUserLoading || isOtpLoading || !user?.verified) {
        return <div>loading</div>; // Show loading indicator during OTP or user fetch
    }

    return <div>{children}</div>;
};

export default HomeLayout;
